import { calculateDistance } from '../utils/geolocation';

export default function FavoritesPage({ savedRaces, userLocation, onViewProgram, onRemoveRace }) {
  if (savedRaces.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
        <header className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">❤️</span>
              <h1 className="text-2xl font-bold">Mes Favoris</h1>
            </div>
            <p className="text-sm text-white/90">Aucune course favorite pour le moment</p>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-8xl mb-6">🏃‍♂️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Pas encore de favoris</h2>
          <p className="text-gray-600 text-center max-w-md mb-6 text-base">
            Explore la carte et ajoute des courses à tes favoris en cliquant sur le ❤️
          </p>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-sm text-gray-700 max-w-md shadow-lg">
            <span className="font-bold">💡 Astuce :</span> Chaque favori te donnera accès à un programme d'entraînement personnalisé !
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      <header className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">❤️</span>
            <h1 className="text-2xl font-bold">Mes Favoris</h1>
          </div>
          <p className="text-sm text-white/90">
            <span className="font-semibold">{savedRaces.length}</span> course{savedRaces.length > 1 ? 's' : ''} sauvegardée{savedRaces.length > 1 ? 's' : ''}
          </p>
        </div>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        <div className="space-y-4 mb-6">
          {savedRaces.map((race) => {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              race.lat,
              race.lng
            ).toFixed(1);

            return (
              <div
                key={race.id}
                className="bg-white rounded-2xl shadow-lg p-5 border-2 border-pink-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{race.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{race.city}</p>
                  </div>
                  <button
                    onClick={() => onRemoveRace(race)}
                    className="text-3xl hover:scale-125 transition-transform filter drop-shadow-md"
                    title="Retirer des favoris"
                  >
                    💔
                  </button>
                </div>

                {/* Badge de distance */}
                <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-2 rounded-xl inline-block mb-3 font-bold text-base shadow-lg">
                  🏃 {race.distance}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                    <div className="text-xs text-gray-600 font-semibold">📅 Date</div>
                    <div className="font-bold text-gray-900">{race.date}</div>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                    <div className="text-xs text-gray-600 font-semibold">📍 Distance</div>
                    <div className="font-bold text-gray-900">{distance} km</div>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                    <div className="text-xs text-gray-600 font-semibold">👥 Coureurs</div>
                    <div className="font-bold text-gray-900">{race.participants.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                    <div className="text-xs text-gray-600 font-semibold">💰 Prix</div>
                    <div className="font-bold text-green-700">{race.price}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onViewProgram(race)}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    📋 Programme d'entraînement
                  </button>
                  {race.website && (
                    <a
                      href={race.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all text-center border-2 border-gray-300"
                    >
                      🌐 Site officiel
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistiques avec meilleur contraste */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
            <span>📊</span>
            <span>Tes Statistiques</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-indigo-700">{savedRaces.length}</div>
              <div className="text-indigo-800 font-bold text-xs mt-1">Course{savedRaces.length > 1 ? 's' : ''}</div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-300 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-red-700">
                {savedRaces.filter(r => r.type === 'Marathon').length}
              </div>
              <div className="text-red-800 font-bold text-xs mt-1">Marathon{savedRaces.filter(r => r.type === 'Marathon').length > 1 ? 's' : ''}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-orange-700">
                {savedRaces.filter(r => r.type === 'Semi-Marathon').length}
              </div>
              <div className="text-orange-800 font-bold text-xs mt-1">Semi</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-green-700">
                {savedRaces.filter(r => r.type === 'Trail').length}
              </div>
              <div className="text-green-800 font-bold text-xs mt-1">Trail{savedRaces.filter(r => r.type === 'Trail').length > 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
