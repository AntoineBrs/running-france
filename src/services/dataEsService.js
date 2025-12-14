import axios from 'axios';

const BASE_URL = 'https://equipements.sports.gouv.fr/api/records/1.0/search/';

export const getSportsFacilities = async (lat, lng, radiusKm = 5) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        dataset: 'data-es',
        q: 'athlétisme OR course OR piste',
        geofilter: {
          distance: `${lat},${lng},${radiusKm * 1000}`
        },
        rows: 50
      }
    });

    return response.data.records.map(record => ({
      id: record.recordid,
      name: record.fields.inst_nom || 'Installation sportive',
      type: record.fields.equip_type_nom,
      city: record.fields.inst_com_nom,
      coordinates: record.fields.inst_coordonnees
    }));
  } catch (error) {
    console.error('Erreur API Data ES:', error);
    return [];
  }
};
