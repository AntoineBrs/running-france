// src/services/raceScraperService.js

/**
 * Ce service pourrait être un backend Node.js qui scrape:
 * - https://www.finishers.com
 * - https://followmysport.com
 * - https://www.klikego.com
 * - https://www.livetrail.net
 * 
 * IMPORTANT: Le scraping direct depuis le frontend ne fonctionne pas à cause du CORS.
 * Tu dois créer un backend pour ça.
 */

export const REAL_RACE_SOURCES = {
  finishers: 'https://www.finishers.com/calendrier',
  followmysport: 'https://followmysport.com',
  klikego: 'https://www.klikego.com/calendrier/running',
  ahotu: 'https://www.ahotu.com/running/calendar/france',
};

/**
 * Pour implémenter ceci, tu dois:
 * 1. Créer un backend Express.js
 * 2. Utiliser Puppeteer ou Cheerio pour scraper
 * 3. Stocker les données dans une base MongoDB/PostgreSQL
 * 4. Exposer une API REST
 */

export const fetchRacesFromBackend = async (bounds, zoom) => {
  try {
    // Remplace cette URL par ton propre backend
    const response = await fetch('http://localhost:3001/api/races', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bounds, zoom })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Backend non disponible:', error);
    return [];
  }
};
