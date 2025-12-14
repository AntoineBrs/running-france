import { calculateDistance } from '../utils/geolocation';

export default function RaceCard({ race, userLocation, onSave, isSaved }) {
  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    race.lat,
    race.lng
  ).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-900">{race.name}</h4>
          <p className="text-sm text-gray-600">{race.city}</p>
        </div>
        <button
          onClick={() => onSave(race)}
          className="text-2xl"
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>
      
      {/* Badge de la distance de la course */}
      <div className="bg-primary text-white px-3 py-2 rounded-lg inline-block mb-3 font-bold text-lg">
        🏃 {race.distance}
      </div>
      
      <div className="flex gap-4 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          📅 {race.date}
        </span>
        <span className="flex items-center gap-1">
          📍 {distance} km de toi
        </span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          {race.type}
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          👥 {race.participants.toLocaleString()}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {race.price}
        </span>
      </div>

      {race.website && (
        <a
          href={race.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
        >
          🌐 Voir le site officiel
        </a>
      )}
    </div>
  );
}
