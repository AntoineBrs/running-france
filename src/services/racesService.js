// src/services/racesService.js
import axios from 'axios';

// Base de données de courses françaises (à enrichir)
const FRENCH_RACES_DB = [
  // Paris et Île-de-France
  { id: 1, name: "Marathon de Paris", type: "Marathon", city: "Paris", lat: 48.8566, lng: 2.3522, date: "2026-04-05", participants: 50000, price: "90€" },
  { id: 2, name: "Semi-Marathon de Paris", type: "Semi-Marathon", city: "Paris", lat: 48.8606, lng: 2.3376, date: "2026-03-08", participants: 40000, price: "45€" },
  { id: 3, name: "10km de Paris Centre", type: "10 km", city: "Paris", lat: 48.8529, lng: 2.3499, date: "2026-02-15", participants: 15000, price: "25€" },
  { id: 4, name: "La Parisienne", type: "10 km", city: "Paris", lat: 48.8738, lng: 2.2950, date: "2026-09-13", participants: 30000, price: "30€" },
  { id: 5, name: "Course du Château de Versailles", type: "10 km", city: "Versailles", lat: 48.8049, lng: 2.1204, date: "2026-05-17", participants: 8000, price: "28€" },
  
  // Lyon et région
  { id: 6, name: "Run in Lyon", type: "10 km", city: "Lyon", lat: 45.7640, lng: 4.8357, date: "2026-10-03", participants: 25000, price: "32€" },
  { id: 7, name: "Marathon de Lyon", type: "Marathon", city: "Lyon", lat: 45.7485, lng: 4.8467, date: "2026-10-04", participants: 12000, price: "70€" },
  
  // Marseille et PACA
  { id: 8, name: "Marathon de Marseille", type: "Marathon", city: "Marseille", lat: 43.2965, lng: 5.3698, date: "2026-04-12", participants: 10000, price: "65€" },
  { id: 9, name: "Semi-Marathon de Nice", type: "Semi-Marathon", city: "Nice", lat: 43.7102, lng: 7.2620, date: "2026-04-19", participants: 8000, price: "40€" },
  { id: 10, name: "10km de Cannes", type: "10 km", city: "Cannes", lat: 43.5528, lng: 7.0174, date: "2026-06-21", participants: 5000, price: "22€" },
  
  // Bordeaux et Sud-Ouest
  { id: 11, name: "Marathon de Bordeaux", type: "Marathon", city: "Bordeaux", lat: 44.8378, lng: -0.5792, date: "2026-11-07", participants: 9000, price: "68€" },
  { id: 12, name: "10km de Bordeaux", type: "10 km", city: "Bordeaux", lat: 44.8412, lng: -0.5800, date: "2026-05-24", participants: 12000, price: "26€" },
  { id: 13, name: "Marathon du Médoc", type: "Marathon", city: "Pauillac", lat: 45.1981, lng: -0.7493, date: "2026-09-12", participants: 8500, price: "85€" },
  
  // Toulouse
  { id: 14, name: "Marathon de Toulouse", type: "Marathon", city: "Toulouse", lat: 43.6047, lng: 1.4442, date: "2026-10-25", participants: 10000, price: "65€" },
  { id: 15, name: "10km de Toulouse", type: "10 km", city: "Toulouse", lat: 43.6045, lng: 1.4440, date: "2026-05-31", participants: 15000, price: "24€" },
  
  // Nantes et Ouest
  { id: 16, name: "Marathon de Nantes", type: "Marathon", city: "Nantes", lat: 47.2184, lng: -1.5536, date: "2026-04-26", participants: 7000, price: "60€" },
  { id: 17, name: "10km de Nantes", type: "10 km", city: "Nantes", lat: 47.2173, lng: -1.5534, date: "2026-03-21", participants: 10000, price: "23€" },
  
  // Lille et Nord
  { id: 18, name: "Semi-Marathon de Lille", type: "Semi-Marathon", city: "Lille", lat: 50.6292, lng: 3.0573, date: "2026-09-06", participants: 12000, price: "38€" },
  { id: 19, name: "10km de Lille", type: "10 km", city: "Lille", lat: 50.6311, lng: 3.0569, date: "2026-05-10", participants: 8000, price: "22€" },
  
  // Strasbourg et Est
  { id: 20, name: "Strasbourg Running Tour", type: "Semi-Marathon", city: "Strasbourg", lat: 48.5734, lng: 7.7521, date: "2026-10-10", participants: 9000, price: "42€" },
  { id: 21, name: "10km de Strasbourg", type: "10 km", city: "Strasbourg", lat: 48.5839, lng: 7.7455, date: "2026-06-14", participants: 7000, price: "25€" },
  
  // Rennes et Bretagne
  { id: 22, name: "Marathon Vert de Rennes", type: "Marathon", city: "Rennes", lat: 48.1173, lng: -1.6778, date: "2026-10-18", participants: 6000, price: "58€" },
  { id: 23, name: "Tout Rennes Court", type: "10 km", city: "Rennes", lat: 48.1119, lng: -1.6743, date: "2026-05-03", participants: 12000, price: "20€" },
  
  // Montpellier
  { id: 24, name: "Marathon de Montpellier", type: "Marathon", city: "Montpellier", lat: 43.6108, lng: 3.8767, date: "2026-03-28", participants: 7500, price: "62€" },
  { id: 25, name: "10km de Montpellier", type: "10 km", city: "Montpellier", lat: 43.6045, lng: 3.8820, date: "2026-09-20", participants: 9000, price: "24€" },
  
  // Trails et courses nature
  { id: 26, name: "UTMB Mont-Blanc", type: "Trail", city: "Chamonix", lat: 45.9237, lng: 6.8694, date: "2026-08-28", participants: 10000, price: "250€" },
  { id: 27, name: "Trail de la Côte d'Azur", type: "Trail", city: "Saint-Tropez", lat: 43.2677, lng: 6.6407, date: "2026-07-12", participants: 3000, price: "55€" },
  { id: 28, name: "Course de la Muraille de Chine", type: "10 km", city: "Carcassonne", lat: 43.2132, lng: 2.3536, date: "2026-06-28", participants: 4000, price: "28€" },
  
  // Autres grandes villes
  { id: 29, name: "Semi de Grenoble", type: "Semi-Marathon", city: "Grenoble", lat: 45.1885, lng: 5.7245, date: "2026-04-25", participants: 6000, price: "38€" },
  { id: 30, name: "10km de Toulon", type: "10 km", city: "Toulon", lat: 43.1242, lng: 5.9280, date: "2026-05-17", participants: 5000, price: "22€" },
  { id: 31, name: "Semi-Marathon de Reims", type: "Semi-Marathon", city: "Reims", lat: 49.2583, lng: 4.0317, date: "2026-10-11", participants: 5500, price: "35€" },
  { id: 32, name: "Marathon de La Rochelle", type: "Marathon", city: "La Rochelle", lat: 46.1603, lng: -1.1511, date: "2026-11-28", participants: 8000, price: "63€" },
  { id: 33, name: "10km d'Annecy", type: "10 km", city: "Annecy", lat: 45.8992, lng: 6.1294, date: "2026-07-05", participants: 7000, price: "26€" },
  { id: 34, name: "Marathon de Metz", type: "Marathon", city: "Metz", lat: 49.1193, lng: 6.1757, date: "2026-09-27", participants: 4500, price: "55€" },
  { id: 35, name: "Semi de Dijon", type: "Semi-Marathon", city: "Dijon", lat: 47.3220, lng: 5.0415, date: "2026-10-17", participants: 4000, price: "36€" },
  
  // 5km populaires
  { id: 36, name: "5km de Paris Bastille", type: "5 km", city: "Paris", lat: 48.8532, lng: 2.3690, date: "2026-06-07", participants: 8000, price: "15€" },
  { id: 37, name: "5km de Lyon Confluence", type: "5 km", city: "Lyon", lat: 45.7423, lng: 4.8183, date: "2026-07-18", participants: 6000, price: "15€" },
  { id: 38, name: "5km de Marseille Vieux Port", type: "5 km", city: "Marseille", lat: 43.2951, lng: 5.3742, date: "2026-08-15", participants: 5000, price: "12€" },
  { id: 39, name: "5km de Bordeaux Quais", type: "5 km", city: "Bordeaux", lat: 44.8404, lng: -0.5805, date: "2026-09-05", participants: 4500, price: "14€" },
  { id: 40, name: "5km de Nice Promenade", type: "5 km", city: "Nice", lat: 43.6950, lng: 7.2653, date: "2026-06-20", participants: 4000, price: "13€" },
];

/**
 * Calcule la distance entre deux points GPS (formule Haversine)
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Récupère les courses visibles selon les limites de la carte
 * @param {Object} bounds - Les limites de la carte {north, south, east, west}
 * @param {number} zoom - Niveau de zoom actuel
 * @returns {Array} - Liste des courses dans la zone visible
 */
export const getRacesInBounds = (bounds, zoom) => {
  // Si zoom < 6 (très dézoomé), on montre toutes les courses de France
  if (zoom < 6) {
    return FRENCH_RACES_DB;
  }

  // Sinon, filtrer les courses dans les limites de la carte
  return FRENCH_RACES_DB.filter(race => {
    return race.lat >= bounds.south &&
           race.lat <= bounds.north &&
           race.lng >= bounds.west &&
           race.lng <= bounds.east;
  });
};

/**
 * Récupère les courses dans un rayon donné
 * @param {number} lat - Latitude du centre
 * @param {number} lng - Longitude du centre
 * @param {number} radiusKm - Rayon en kilomètres
 * @returns {Array} - Liste des courses dans le rayon
 */
export const getRacesNearby = (lat, lng, radiusKm = 50) => {
  return FRENCH_RACES_DB.filter(race => {
    const distance = calculateDistance(lat, lng, race.lat, race.lng);
    return distance <= radiusKm;
  }).sort((a, b) => {
    const distA = calculateDistance(lat, lng, a.lat, a.lng);
    const distB = calculateDistance(lat, lng, b.lat, b.lng);
    return distA - distB;
  });
};

/**
 * Filtre les courses par type
 */
export const filterRacesByType = (races, type) => {
  if (type === 'all') return races;
  if (type === '5km') return races.filter(r => r.type === '5 km');
  if (type === '10km') return races.filter(r => r.type === '10 km');
  if (type === 'semi') return races.filter(r => r.type === 'Semi-Marathon');
  if (type === 'marathon') return races.filter(r => r.type === 'Marathon');
  if (type === 'trail') return races.filter(r => r.type === 'Trail');
  return races;
};
