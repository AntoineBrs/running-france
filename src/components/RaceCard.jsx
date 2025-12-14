import { calculateDistance } from '../utils/geolocation';

export default function RaceCard({ race, userLocation, onSave, isSaved }) {
  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    race.lat,
    race.lng
  ).toFixed(1);

  const raceDate = new Date(race.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = raceDate < today;

  // Calcul des jours restants
  const daysUntil = Math.ceil((raceDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 mb-4 border-2 border-gray-200 overflow-hidden ${isPast ? 'opacity-60' : ''}`}>
      {/* Gradient décoratif en fond */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative">
        {/* Header avec titre et favori */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-bold text-lg text-gray-900 leading-tight">{race.name}</h4>
              {isPast && (
                <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full font-bold">
                  Passée
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1 font-medium">
              <span>📍</span>
              {race.city}
            </p>
          </div>
          <button
            onClick={() => onSave(race)}
            className="text-3xl hover:scale-125 transition-transform duration-200 active:scale-95 filter drop-shadow-md"
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
        
        {/* Badge distance avec design moderne et contraste élevé */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl mb-4 font-bold text-base shadow-lg">
          <span className="text-xl">🏃</span>
          <span>{race.distance}</span>
        </div>
        
        {/* Informations date et distance avec fond contrasté */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-xl p-3">
            <div className="text-xs text-gray-600 font-semibold mb-1">📅 Date</div>
            <div className="font-bold text-gray-900 text-sm">{race.date}</div>
            {!isPast && daysUntil <= 30 && (
              <div className="text-xs text-indigo-600 font-bold mt-1 bg-indigo-50 px-2 py-0.5 rounded-full inline-block">
                Dans {daysUntil} jour{daysUntil > 1 ? 's' : ''}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-xl p-3">
            <div className="text-xs text-gray-600 font-semibold mb-1">📍 Distance</div>
            <div className="font-bold text-gray-900 text-sm">{distance} km</div>
            <div className="text-xs text-gray-500 font-medium mt-1">de toi</div>
          </div>
        </div>

        {/* Tags avec contrastes améliorés */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-indigo-200">
            {race.type}
          </span>
          <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-blue-200">
            👥 {race.participants.toLocaleString()}
          </span>
          <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-green-200">
            💰 {race.price}
          </span>
        </div>

        {/* Bouton site officiel avec contraste élevé */}
        {race.website && (
          <a
            href={race.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transition-all duration-300 group/btn"
          >
            <span>🌐</span>
            <span>Voir le site officiel</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
