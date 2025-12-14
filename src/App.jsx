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
  const [activePage, setActivePage] = useState('map'); // 'map' ou 'favorites'
  const [showObjectiveSelector, setShowObjectiveSelector] = useState(false);
  const [selectedRaceForObjective, setSelectedRaceForObjective] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    const filtered = filterRacesByType(visibleRaces, activeFilter);
    setAllRaces(filtered);
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

  const handleSaveRace = (race) => {
    setSavedRaces(prev => {
      const isSaved = prev.some(r => r.id === race.id);
      if (isSaved) {
        // Retirer des favoris
        return prev.filter(r => r.id !== race.id);
      } else {
        // Ajouter aux favoris et afficher le sélecteur d'objectif
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Localisation en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Carte */}
      {activePage === 'map' && (
        <div className="min-h-screen bg-gray-50 pb-20">
          <header className="bg-primary text-white p-4 shadow-lg">
            <h1 className="text-2xl font-bold">🏃‍♂️ Running France</h1>
            <p className="text-sm opacity-90">
              {racesLoading ? 'Chargement...' : `${allRaces.length} course${allRaces.length > 1 ? 's' : ''} réelle${allRaces.length > 1 ? 's' : ''}`}
              {mapZoom < 6 ? ' en France' : ' dans la zone'}
            </p>
          </header>

          <main className="p-4">
            <Map 
              center={userLocation}
              routes={routes}
              facilities={facilities}
              races={allRaces}
              onBoundsChange={handleBoundsChange}
            />

            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
              ✅ <strong>Astuce :</strong> Ajoute une course en favoris ❤️ pour obtenir un programme d'entraînement personnalisé !
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">
                Courses à venir {racesLoading && <span className="text-sm">⏳</span>}
                {mapZoom < 6 && <span className="text-sm font-normal text-gray-600 ml-2">(toute la France)</span>}
              </h2>
              <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              
              <div className="mt-4">
                {racesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-gray-600">Chargement des courses...</p>
                  </div>
                ) : allRaces.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune course trouvée dans cette zone.</p>
                    <p className="text-sm mt-2">Essaye de dézoomer la carte ou de changer de région !</p>
                  </div>
                ) : (
                  allRaces.map(race => (
                    <RaceCard
                      key={race.id}
                      race={race}
                      userLocation={userLocation}
                      onSave={handleSaveRace}
                      isSaved={savedRaces.some(r => r.id === race.id)}
                    />
                  ))
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedRaceForObjective.name}</h2>
                <p className="text-sm text-gray-600">{selectedRaceForObjective.distance} • {selectedRaceForObjective.date}</p>
              </div>
              <button
                onClick={() => setShowObjectiveSelector(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <ObjectiveSelector
              raceType={selectedRaceForObjective.type}
              raceDistance={selectedRaceForObjective.distance}
              selectedObjective={selectedObjective}
              onSelect={handleObjectiveSelect}
            />
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
