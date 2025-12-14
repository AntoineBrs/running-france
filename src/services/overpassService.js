import axios from 'axios';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

export const getNearbyPaths = async (lat, lng, radiusKm = 5) => {
  const radiusMeters = radiusKm * 1000;
  
  const query = `
    [out:json];
    (
      way["highway"~"path|footway|track|cycleway"]["surface"!="paved"](around:${radiusMeters},${lat},${lng});
      way["route"="hiking"](around:${radiusMeters},${lat},${lng});
    );
    out geom;
  `;

  try {
    const response = await axios.post(OVERPASS_URL, query, {
      headers: { 'Content-Type': 'text/plain' }
    });

    return response.data.elements.map(element => ({
      id: element.id,
      type: element.tags?.highway || element.tags?.route || 'path',
      name: element.tags?.name || 'Sentier sans nom',
      coordinates: element.geometry?.map(node => [node.lat, node.lon]) || []
    }));
  } catch (error) {
    console.error('Erreur Overpass API:', error);
    return [];
  }
};
