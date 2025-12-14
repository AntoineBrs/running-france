import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents, Circle } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icône personnalisée pour les courses avec badge de distance
const createRaceIcon = (type) => {
  let color = 'red';
  if (type === '5 km') color = 'green';
  if (type === '10 km') color = 'blue';
  if (type === 'Semi-Marathon') color = 'orange';
  if (type === 'Marathon') color = 'red';
  if (type === 'Trail') color = 'violet';

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function MapEventHandler({ onBoundsChange }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      }, zoom);
    },
    zoomend: () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      }, zoom);
    }
  });
  return null;
}

export default function Map({ center, routes, facilities, generatedRoute, races, onBoundsChange }) {
  return (
    <div className="h-[60vh] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={6} className="h-full w-full">
        <MapUpdater center={center} />
        <MapEventHandler onBoundsChange={onBoundsChange} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={center}>
          <Popup>📍 Vous êtes ici</Popup>
        </Marker>

        {/* Marqueurs des courses avec distance affichée */}
        {races && races.map((race) => (
          <Marker 
            key={race.id} 
            position={[race.lat, race.lng]}
            icon={createRaceIcon(race.type)}
          >
            <Popup>
              <div className="text-sm min-w-[200px]">
                <strong className="text-base block mb-2">{race.name}</strong>
                
                {/* Badge de distance de la course */}
                <div className="bg-primary text-white px-2 py-1 rounded-md inline-block mb-2 font-bold">
                  🏃 {race.type}
                </div>
                
                <div className="space-y-1 text-gray-700">
                  <div>📅 {race.date}</div>
                  <div>📍 {race.city}</div>
                  <div>👥 {race.participants.toLocaleString()} participants</div>
                  <div className="font-semibold text-green-600">💰 {race.price}</div>
                </div>
                
                {race.website && (
                  <a
                    href={race.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-primary text-white px-3 py-1 rounded text-xs hover:bg-primary/90"
                  >
                    🌐 Site officiel
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {routes.map((route, idx) => (
          <Polyline 
            key={`route-${idx}`}
            positions={route.coordinates}
            color="green"
            weight={3}
            opacity={0.6}
          />
        ))}

        {facilities.map((facility) => (
          facility.coordinates && (
            <Marker 
              key={facility.id} 
              position={[facility.coordinates[0], facility.coordinates[1]]}
            >
              <Popup>
                <strong>{facility.name}</strong><br/>
                {facility.type}<br/>
                {facility.city}
              </Popup>
            </Marker>
          )
        ))}

        {generatedRoute && (
          <Polyline 
            positions={generatedRoute.coordinates.map(coord => [coord[1], coord[0]])}
            color="blue"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}
