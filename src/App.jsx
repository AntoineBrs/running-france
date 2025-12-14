import { useState, useEffect } from 'react';
import Map from './components/Map';
import FilterBar from './components/FilterBar';
import RaceCard from './components/RaceCard';
import TrainingProgram from './components/TrainingProgram';
import FavoritesPage from './components/FavoritesPage';
import Navigation from './components/Navigation';
import ObjectiveSelector from './components/ObjectiveSelector';
import { getUserLocation } from './utils/geolocation';
import { getNearbyPaths } from './services/overpassService';
import { getSportsFacilities } from './services/dataEsService';
import { getRacesFromMultipleSources, filterRacesByType } from './services/realRacesService';
import { generateTrainingProgram } from './services/trainingProgramService';

function App() {
  const [userLocation, setUserLocation] = useState({ lat: 46.603354, lng: 1.888334 });
  const [routes, setRoutes] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [savedRaces, setSavedRaces] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [allRaces, setAllRaces] = useState([]);
  const [visibleRaces, setVisibleRaces] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapZoom, setMapZoom] = useState(6);
  const [racesLoading, setRacesLoading] = useState(false);
  const [activeProgram, setActiveProgram] = useState(null);
  const [activePage, setActivePage] = useState('map');
  const [showObjectiveSelector, setShowObjectiveSelector] = useState(false);
  const [selectedRaceForObjective, setSelectedRaceForObjective] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    const filtered = filterRacesByType(visibleRaces, activeFilter);
    const sorted = sortRacesByDate(filtered);
    setAllRaces(sorted);
  }, [activeFilter, visibleRaces]);

  useEffect(() => {
    if (mapBounds) {
      loadRealRaces(mapBounds, mapZoom);
    }
  }, [mapBounds, mapZoom]);

  const initApp = async () => {
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      await loadNearbyData(location);
    } catch (error) {
      console.error('Erreur géolocalisation:', error);
      setUserLocation({ lat: 46.603354, lng: 1.888334 });
    } finally {
      setLocationLoading(false);
    }
  };

  const loadNearbyData = async (location) => {
    try {
      const [paths, sportsFacilities] = await Promise.all([
        getNearbyPaths(location.lat, location.lng, 5),
        getSportsFacilities(location.lat, location.lng, 5)
      ]);
      setRoutes(paths);
      setFacilities(sportsFacilities);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  };

  const loadRealRaces = async (bounds, zoom) => {
    setRacesLoading(true);
    try {
      const realRaces = await getRacesFromMultipleSources(bounds, zoom);
      setVisibleRaces(realRaces);
      console.log(`✅ ${realRaces.length} courses réelles chargées`);
    } catch (error) {
      console.error('Erreur chargement courses:', error);
      setVisibleRaces([]);
    } finally {
      setRacesLoading(false);
    }
  };

  const handleBoundsChange = (bounds, zoom) => {
    setMapBounds(bounds);
    setMapZoom(zoom);
  };

  const sortRacesByDate = (races) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [...races].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      const isAPast = dateA < today;
      const isBPast = dateB < today;
      
      if (isAPast && !isBPast) return 1;
      if (!isAPast && isBPast) return -1;
      
      return dateA - dateB;
    });
  };

  const handleSaveRace = (race) => {
    setSavedRaces(prev => {
      const isSaved = prev.some(r => r.id === race.id);
      if (isSaved) {
        return prev.filter(r => r.id !== race.id);
      } else {
        setSelectedRaceForObjective(race);
        setShowObjectiveSelector(true);
        return [...prev, race];
      }
    });
  };

  const handleRemoveRace = (race) => {
    setSavedRaces(prev => prev.filter(r => r.id !== race.id));
  };

  const handleViewProgram = (race) => {
    setSelectedRaceForObjective(race);
    setShowObjectiveSelector(true);
  };

  const handleObjectiveSelect = (objective) => {
    setSelectedObjective(objective);
    const program = generateTrainingProgram(selectedRaceForObjective, objective);
    setActiveProgram(program);
    setShowObjectiveSelector(false);
  };

  if (locationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-white"></div>
            <span className="absolute text-3xl filter drop-shadow-lg">🏃</span>
          </div>
          <p className="text-white font-bold text-xl drop-shadow-lg">Localisation en cours...</p>
          <p className="text-white/90 text-base mt-2 font-semibold drop-shadow-md">Préparation de ton expérience</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Carte */}
      {activePage === 'map' && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
          {/* Header moderne avec gradient - CONTRASTE AMÉLIORÉ */}
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-2xl relative overflow-hidden">
            {/* Décorations en fond - plus visibles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full -ml-16 -mb-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl filter drop-shadow-lg">🏃‍♂️</span>
                <h1 className="text-3xl font-black drop-shadow-lg">Running France</h1>
              </div>
              <p className="text-base text-white font-semibold drop-shadow-md">
                {racesLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin text-xl">⏳</span>
                    <span>Chargement...</span>
                  </span>
                ) : (
                  <>
                    <span className="font-black text-lg">{allRaces.length}</span> course{allRaces.length > 1 ? 's' : ''} réelle{allRaces.length > 1 ? 's' : ''}
                    <span className="text-white/90 font-medium">
                      {mapZoom < 6 ? ' • En France' : ' • Dans la zone'}
                    </span>
                  </>
                )}
              </p>
            </div>
          </header>

          <main className="p-4 max-w-7xl mx-auto">
            {/* Carte */}
            <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border-4 border-white">
              <Map 
                center={userLocation}
                routes={routes}
                facilities={facilities}
                races={allRaces}
                onBoundsChange={handleBoundsChange}
              />
            </div>

            {/* Message d'astuce avec contraste amélioré */}
            <div className="mb-6 bg-white border-l-4 border-green-600 rounded-xl p-5 shadow-xl border-2 border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">Astuce</h3>
                  <p className="text-sm text-gray-700 font-medium">
                    Ajoute une course en favoris <span className="text-xl">❤️</span> pour obtenir un programme d'entraînement personnalisé !
                  </p>
                </div>
              </div>
            </div>

            {/* Section courses */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-3xl">📅</span>
                <span>
                  Courses à venir
                  {racesLoading && <span className="text-base ml-2 animate-pulse">⏳</span>}
                </span>
                {mapZoom < 6 && (
                  <span className="text-base font-medium text-gray-600 ml-2">(toute la France)</span>
                )}
              </h2>

              {/* Filtres */}
              <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              
              {/* Liste des courses */}
              <div className="mt-6">
                {racesLoading ? (
                  <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 text-center py-16">
                    <div className="relative inline-flex items-center justify-center mb-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
                      <span className="absolute text-2xl">🏃</span>
                    </div>
                    <p className="text-gray-800 font-bold text-lg">Chargement des courses...</p>
                  </div>
                ) : allRaces.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 text-center py-16 px-4">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune course trouvée</h3>
                    <p className="text-gray-700 mb-4 font-medium">Essaye de dézoomer la carte ou de changer de région !</p>
                    <div className="inline-flex gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-semibold">
                      <span>💡</span>
                      <span>Utilise les filtres pour affiner ta recherche</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allRaces.map(race => (
                      <RaceCard
                        key={race.id}
                        race={race}
                        userLocation={userLocation}
                        onSave={handleSaveRace}
                        isSaved={savedRaces.some(r => r.id === race.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Page Favoris */}
      {activePage === 'favorites' && (
        <FavoritesPage
          savedRaces={savedRaces}
          userLocation={userLocation}
          onViewProgram={handleViewProgram}
          onRemoveRace={handleRemoveRace}
        />
      )}

      {/* Navigation */}
      <Navigation
        activePage={activePage}
        onPageChange={setActivePage}
        favoritesCount={savedRaces.length}
      />

      {/* Modal de sélection d'objectif */}
      {showObjectiveSelector && selectedRaceForObjective && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl z-10 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black mb-2 drop-shadow-lg">{selectedRaceForObjective.name}</h2>
                  <p className="text-base text-white font-bold drop-shadow-md">
                    {selectedRaceForObjective.distance} • {selectedRaceForObjective.date}
                  </p>
                </div>
                <button
                  onClick={() => setShowObjectiveSelector(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-all hover:scale-110 active:scale-95"
                >
                  <span className="text-3xl font-bold drop-shadow-lg">✕</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <ObjectiveSelector
                raceType={selectedRaceForObjective.type}
                raceDistance={selectedRaceForObjective.distance}
                selectedObjective={selectedObjective}
                onSelect={handleObjectiveSelect}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Programme d'Entraînement */}
      {activeProgram && (
        <TrainingProgram
          program={activeProgram}
          onClose={() => setActiveProgram(null)}
        />
      )}
    </>
  );
}

export default App;
