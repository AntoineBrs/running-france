export default function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Tout', icon: '🏃' },
    { id: '5km', label: '5 km', icon: '🥉' },
    { id: '10km', label: '10 km', icon: '🥈' },
    { id: 'semi', label: 'Semi', icon: '🥇' },
    { id: 'marathon', label: 'Marathon', icon: '🏆' },
    { id: 'trail', label: 'Trail', icon: '⛰️' },
  ];

  return (
    <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
            activeFilter === filter.id
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 border border-gray-200'
          }`}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
