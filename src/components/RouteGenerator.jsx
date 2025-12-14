import { useState } from 'react';

export default function RouteGenerator({ onGenerate, loading }) {
  const [distance, setDistance] = useState(5000);

  const distances = [
    { label: '3 km', value: 3000 },
    { label: '5 km', value: 5000 },
    { label: '8 km', value: 8000 },
    { label: '10 km', value: 10000 },
    { label: '15 km', value: 15000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Générer un parcours</h3>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {distances.map((d) => (
          <button
            key={d.value}
            onClick={() => setDistance(d.value)}
            className={`py-2 px-3 rounded-lg font-medium transition ${
              distance === d.value 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => onGenerate(distance)}
        disabled={loading}
        className="w-full bg-secondary text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Génération...' : 'Générer le parcours'}
      </button>
    </div>
  );
}
