import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENROUTE_API_KEY;
const BASE_URL = 'https://api.openrouteservice.org/v2';

export const generateRoute = async (lat, lng, distance) => {
  try {
    // Génère un point aléatoire dans un rayon pour créer une boucle
    const bearing = Math.random() * 360;
    const distanceKm = distance / 2000; // Demi-distance en km
    const lat2 = lat + (distanceKm / 111) * Math.cos(bearing * Math.PI / 180);
    const lng2 = lng + (distanceKm / (111 * Math.cos(lat * Math.PI / 180))) * Math.sin(bearing * Math.PI / 180);

    const response = await axios.post(
      `${BASE_URL}/directions/foot-walking/geojson`,
      {
        coordinates: [[lng, lat], [lng2, lat2], [lng, lat]],
        preference: 'recommended',
        units: 'm'
      },
      {
        headers: {
          'Authorization': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      coordinates: response.data.features[0].geometry.coordinates,
      distance: response.data.features[0].properties.segments.reduce(
        (sum, seg) => sum + seg.distance, 0
      ),
      duration: response.data.features[0].properties.segments.reduce(
        (sum, seg) => sum + seg.duration, 0
      )
    };
  } catch (error) {
    console.error('Erreur OpenRouteService:', error);
    throw error;
  }
};
