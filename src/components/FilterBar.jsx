export default function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Toutes', icon: '🏃', color: 'purple' },
    { id: '5km', label: '5 km', icon: '⚡', color: 'yellow' },
    { id: '10km', label: '10 km', icon: '🔥', color: 'orange' },
    { id: 'semi', label: 'Semi', icon: '💪', color: 'blue' },
    { id: 'marathon', label: 'Marathon', icon: '🏆', color: 'red' },
    { id: 'trail', label: 'Trail', icon: '⛰️', color: 'green' },
  ];

  const getColorClasses = (color, isActive) => {
    if (isActive) {
      const activeColors = {
        purple: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/50 border-2 border-purple-700',
        yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl shadow-yellow-500/50 border-2 border-yellow-600',
        orange: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/50 border-2 border-orange-600',
        blue: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/50 border-2 border-blue-700',
        red: 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-xl shadow-red-500/50 border-2 border-red-700',
        green: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-green-500/50 border-2 border-green-700',
      };
      return activeColors[color];
    }
    return 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg';
  };

  return (
    <div className="sticky top-0 z-20 bg-white border-y-2 border-gray-200 -mx-4 px-4 py-4 mb-4 shadow-md">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm whitespace-nowrap transition-all duration-300 transform ${
              getColorClasses(filter.color, activeFilter === filter.id)
            } ${
              activeFilter === filter.id ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <span className="text-xl filter drop-shadow-md">{filter.icon}</span>
            <span className="drop-shadow-sm">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
