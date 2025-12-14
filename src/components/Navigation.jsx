// src/components/Navigation.jsx
export default function Navigation({ activePage, onPageChange, favoritesCount }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => onPageChange('map')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition ${
            activePage === 'map'
              ? 'text-primary bg-primary/5'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          <span className="text-2xl mb-1">🗺️</span>
          <span className="text-xs font-medium">Carte</span>
        </button>

        <button
          onClick={() => onPageChange('favorites')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition relative ${
            activePage === 'favorites'
              ? 'text-primary bg-primary/5'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          <span className="text-2xl mb-1">❤️</span>
          <span className="text-xs font-medium">Favoris</span>
          {favoritesCount > 0 && (
            <span className="absolute top-2 right-1/4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
