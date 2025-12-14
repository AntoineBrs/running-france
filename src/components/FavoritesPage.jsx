// src/components/FavoritesPage.jsx
import { calculateDistance } from '../utils/geolocation';

export default function FavoritesPage({ savedRaces, userLocation, onViewProgram, onRemoveRace }) {
  if (savedRaces.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-primary text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold">❤️ Mes Favoris</h1>
          <p className="text-sm opacity-90">Aucune course favorite pour le moment</p>
        </header>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-6xl mb-4">🏃‍♂️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Pas encore de favoris</h2>
          <p className="text-gray-600 text-center max-w-md">
            Explore la carte et ajoute des courses à tes favoris en cliquant sur le ❤️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">❤️ Mes Favoris</h1>
        <p className="text-sm opacity-90">
          {savedRaces.length} course{savedRaces.length > 1 ? 's' : ''} sauvegardée{savedRaces.length > 1 ? 's' : ''}
        </p>
      </header>

      <main className="p-4">
        <div className="space-y-4">
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
                className="bg-white rounded-lg shadow-md p-4 border-2 border-red-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{race.name}</h3>
                    <p className="text-sm text-gray-600">{race.city}</p>
                  </div>
                  <button
                    onClick={() => onRemoveRace(race)}
                    className="text-2xl hover:scale-110 transition"
                    title="Retirer des favoris"
                  >
                    💔
                  </button>
                </div>

                {/* Badge de distance */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-2 rounded-lg inline-block mb-3 font-bold text-base">
                  🏃 {race.distance}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{race.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{distance} km de toi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{race.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💰</span>
                    <span className="font-semibold text-green-600">{race.price}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onViewProgram(race)}
                    className="flex-1 bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    📋 Programme d'entraînement
                  </button>
                  {race.website && (
                    <a
                      href={race.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
                    >
                      🌐 Site officiel
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistiques */}
        <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
          <h3 className="font-bold text-gray-900 mb-3">📊 Tes Statistiques</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-primary">{savedRaces.length}</div>
              <div className="text-gray-600 text-xs">Course{savedRaces.length > 1 ? 's' : ''}</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-secondary">
                {savedRaces.filter(r => r.type === 'Marathon').length}
              </div>
              <div className="text-gray-600 text-xs">Marathon{savedRaces.filter(r => r.type === 'Marathon').length > 1 ? 's' : ''}</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-orange-500">
                {savedRaces.filter(r => r.type === 'Semi-Marathon').length}
              </div>
              <div className="text-gray-600 text-xs">Semi</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {savedRaces.filter(r => r.type === 'Trail').length}
              </div>
              <div className="text-gray-600 text-xs">Trail{savedRaces.filter(r => r.type === 'Trail').length > 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
