// src/services/trainingProgramService.js

/**
 * Génère un programme d'entraînement personnalisé selon l'objectif
 */
export const generateTrainingProgram = (race, objective) => {
  const raceDate = new Date(race.date);
  const today = new Date();
  const weeksUntilRace = Math.ceil((raceDate - today) / (1000 * 60 * 60 * 24 * 7));
  
  let program = {};
  
  switch (race.type) {
    case '5 km':
      program = generate5kProgram(weeksUntilRace, race, objective);
      break;
    case '10 km':
      program = generate10kProgram(weeksUntilRace, race, objective);
      break;
    case 'Semi-Marathon':
      program = generateSemiProgram(weeksUntilRace, race, objective);
      break;
    case 'Marathon':
      program = generateMarathonProgram(weeksUntilRace, race, objective);
      break;
    case 'Trail':
      program = generateTrailProgram(weeksUntilRace, race, objective);
      break;
    default:
      program = generate10kProgram(weeksUntilRace, race, objective);
  }
  
  return {
    ...program,
    raceName: race.name,
    raceDate: race.date,
    raceDistance: race.distance,
    weeksUntilRace,
    objective
  };
};

// Programme 5km selon objectif
const generate5kProgram = (weeksUntilRace, race, objective) => {
  const baseProgram = {
    debutant: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course facile continue', duration: '20-25 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'Repos ou marche active', duration: '30 min', intensity: 'Très légère', icon: '🚶' },
        { day: 'Jeudi', workout: 'Fractionné doux : 6x2min rapide', duration: '30 min', intensity: 'Modérée', icon: '⚡' },
        { day: 'Vendredi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Samedi', workout: 'Course facile', duration: '25 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Dimanche', workout: 'Sortie longue facile', duration: '35-40 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 30min (6:00/km)',
        '💧 Bien s\'hydrater avant et après',
        '🔥 Progression douce et régulière',
        '📈 Volume hebdo : 20-30 km',
        '😊 Prendre du plaisir avant tout'
      ]
    },
    bronze: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos ou marche active', duration: '30 min', intensity: 'Très légère', icon: '🚶' },
        { day: 'Mardi', workout: 'Endurance facile', duration: '30-35 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA courte : 8x400m (R: 1min30)', duration: '40 min', intensity: 'Élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Vendredi', workout: 'Tempo run 20min à 5:15/km', duration: '30 min', intensity: 'Modérée à élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou yoga', duration: '30 min', intensity: 'Légère', icon: '🧘' },
        { day: 'Dimanche', workout: 'Sortie longue facile', duration: '45-50 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 25min (5:00/km)',
        '💧 Hydratation : Bien s\'hydrater avant la course',
        '🔥 Séances VMA : Indispensables 1x/semaine',
        '📈 Volume hebdo : 30-40 km'
      ]
    },
    silver: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + 6x100m', duration: '40 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 10x400m (R: 1min)', duration: '45 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récupération active', duration: '25 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Seuil : 2x2000m à 4:30/km', duration: '35 min', intensity: 'Élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou renforcement', duration: '30 min', intensity: 'Légère', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue progressive', duration: '55-65 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 22min (4:24/km)',
        '💧 Hydratation stratégique pré-course',
        '🔥 2 séances qualité/semaine obligatoires',
        '📈 Volume hebdo : 40-50 km',
        '⚡ Travail VMA primordial'
      ]
    },
    gold: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + éducatifs + 8x100m', duration: '45 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA longue : 6x1000m (R: 2min)', duration: '50 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing récupération', duration: '30 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Seuil : 3x1500m à 4:05/km', duration: '40 min', intensity: 'Très élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Récup ou renfo + core', duration: '35 min', intensity: 'Légère', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue avec accélérations', duration: '65-75 min', intensity: 'Modérée à élevée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 20min (4:00/km)',
        '💧 Plan hydratation/nutrition précis',
        '🔥 3 séances qualité/semaine',
        '📈 Volume hebdo : 50-60 km',
        '⚡ Travail VMA + seuil intensif',
        '🏋️ PPG 2x/semaine'
      ]
    }
  };

  const selectedProgram = baseProgram[objective.id] || baseProgram.debutant;
  
  return {
    level: objective.level,
    duration: '8 semaines',
    weeklySchedule: selectedProgram.weeklySchedule,
    tips: selectedProgram.tips,
    targetPace: objective.pace,
    targetTime: objective.targetTime,
    weeklyKm: objective.weeklyKm
  };
};

// Programme 10km selon objectif
const generate10kProgram = (weeksUntilRace, race, objective) => {
  const baseProgram = {
    debutant: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course facile', duration: '30 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'Repos ou marche', duration: '30 min', intensity: 'Très légère', icon: '🚶' },
        { day: 'Jeudi', workout: 'Fractionné léger : 5x3min', duration: '35 min', intensity: 'Modérée', icon: '⚡' },
        { day: 'Vendredi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Samedi', workout: 'Course facile', duration: '30 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Dimanche', workout: 'Sortie longue', duration: '50-60 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 60min (6:00/km)',
        '💧 S\'hydrater régulièrement',
        '🔥 Progression douce',
        '📈 Volume hebdo : 25-35 km',
        '😊 Écouter son corps'
      ]
    },
    bronze: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance fondamentale', duration: '40 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'Fractionné : 8x800m (R: 2min)', duration: '50 min', intensity: 'Élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récupération active', duration: '30 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Tempo 25min à 5:10/km', duration: '40 min', intensity: 'Modérée à élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou renforcement', duration: '30 min', intensity: 'Légère', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue', duration: '65-75 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 50min (5:00/km)',
        '💧 Hydratation régulière',
        '🔥 1 séance VMA/semaine minimum',
        '📈 Volume hebdo : 40-50 km'
      ]
    },
    silver: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + 8x100m', duration: '45 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 10x1000m (R: 1min30)', duration: '55 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récupération', duration: '35 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Seuil : 2x4km à 4:35/km', duration: '50 min', intensity: 'Élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou PPG', duration: '40 min', intensity: 'Légère', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue progressive', duration: '75-90 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 45min (4:30/km)',
        '💧 Stratégie hydratation testée',
        '🔥 2 séances qualité/semaine',
        '📈 Volume hebdo : 50-60 km',
        '⚡ Alternance VMA/seuil'
      ]
    },
    gold: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos + étirements', duration: '20 min', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + éducatifs + 10x100m', duration: '50 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 12x1000m (R: 1min)', duration: '60 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing récupération', duration: '40 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Seuil : 3x3km à 4:05/km', duration: '55 min', intensity: 'Très élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Récup ou renfo intense', duration: '45 min', intensity: 'Modérée', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue avec variations', duration: '85-100 min', intensity: 'Modérée à élevée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 40min (4:00/km)',
        '💧 Plan nutrition/hydratation précis',
        '🔥 3 séances qualité/semaine',
        '📈 Volume hebdo : 60-70 km',
        '⚡ VMA + seuil poussés',
        '🏋️ Renforcement 2x/semaine',
        '💤 Sommeil optimal crucial'
      ]
    }
  };

  const selectedProgram = baseProgram[objective.id] || baseProgram.debutant;
  
  return {
    level: objective.level,
    duration: '12 semaines',
    weeklySchedule: selectedProgram.weeklySchedule,
    tips: selectedProgram.tips,
    targetPace: objective.pace,
    targetTime: objective.targetTime,
    weeklyKm: objective.weeklyKm
  };
};

// Programme Semi-Marathon selon objectif
const generateSemiProgram = (weeksUntilRace, race, objective) => {
  const baseProgram = {
    debutant: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course facile', duration: '40 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'Repos ou marche', duration: '30 min', intensity: 'Très légère', icon: '🚶' },
        { day: 'Jeudi', workout: 'Fractionné doux : 6x4min', duration: '45 min', intensity: 'Modérée', icon: '⚡' },
        { day: 'Vendredi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Samedi', workout: 'Course facile', duration: '40 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Dimanche', workout: 'Sortie longue', duration: '75-90 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 2h00 (5:41/km)',
        '💧 S\'hydrater tous les 5 km',
        '🍌 Tester la nutrition',
        '📈 Volume hebdo : 35-45 km',
        '🔥 Progression progressive'
      ]
    },
    bronze: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + éducatifs', duration: '50 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 8x1000m (R: 2min)', duration: '60 min', intensity: 'Élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing récupération', duration: '40 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Allure semi : 2x5km à 5:00/km', duration: '60 min', intensity: 'Élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou natation', duration: '30 min', intensity: 'Croisée', icon: '🏊' },
        { day: 'Dimanche', workout: 'Sortie longue', duration: '90-110 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 1h45 (4:58/km)',
        '💧 S\'hydrater tous les 5 km',
        '🍌 Tester la nutrition en course',
        '📈 Volume hebdo : 50-60 km',
        '🔥 Sortie longue progressive obligatoire'
      ]
    },
    silver: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos complet', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + gammes + 8x100m', duration: '55 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 10x1200m (R: 1min30)', duration: '70 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récupération active', duration: '45 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Seuil : 3x4km à 4:20/km', duration: '65 min', intensity: 'Très élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou vélo', duration: '45 min', intensity: 'Croisée', icon: '🚴' },
        { day: 'Dimanche', workout: 'Sortie longue 22-26 km', duration: '110-130 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 1h30 (4:16/km)',
        '💧 Stratégie hydratation éprouvée',
        '🍝 Surcharge glucidique 3 jours avant',
        '📈 Volume hebdo : 65-80 km',
        '🔥 Travail au seuil primordial',
        '🧘 Mental : visualisation positive'
      ]
    },
    gold: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos + massage', duration: '30 min', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + éducatifs + 10x100m', duration: '60 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 12x1000m (R: 1min)', duration: '75 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing lent', duration: '50 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Allure spé : 4x5km à 3:50/km', duration: '70 min', intensity: 'Très élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Récup ou PPG poussé', duration: '50 min', intensity: 'Modérée', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue 28-32 km', duration: '130-150 min', intensity: 'Modérée à élevée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 1h20 (3:47/km)',
        '💧 Hydratation millimètrée',
        '🍌 Gels énergétiques testés',
        '📈 Volume hebdo : 80-100 km',
        '🔥 3 séances qualité/semaine',
        '🏋️ Renfo 2-3x/semaine',
        '💤 Repos et récup prioritaires',
        '🧘 Prépa mentale intensive'
      ]
    }
  };

  const selectedProgram = baseProgram[objective.id] || baseProgram.debutant;
  
  return {
    level: objective.level,
    duration: '16 semaines',
    weeklySchedule: selectedProgram.weeklySchedule,
    tips: selectedProgram.tips,
    targetPace: objective.pace,
    targetTime: objective.targetTime,
    weeklyKm: objective.weeklyKm
  };
};

// Programme Marathon selon objectif
const generateMarathonProgram = (weeksUntilRace, race, objective) => {
  const baseProgram = {
    debutant: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course facile', duration: '45 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'Repos ou marche', duration: '30 min', intensity: 'Très légère', icon: '🚶' },
        { day: 'Jeudi', workout: 'Fractionné doux : 5x5min', duration: '50 min', intensity: 'Modérée', icon: '⚡' },
        { day: 'Vendredi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Samedi', workout: 'Course facile', duration: '45 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Dimanche', workout: 'Sortie longue 18-25 km', duration: '120-150 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 4h00 (5:41/km)',
        '💧 Hydratation testée',
        '🍌 Nutrition : barres + gels',
        '📈 Volume hebdo : 45-60 km',
        '🔥 Sortie longue chaque semaine',
        '🛌 Repos essentiel'
      ]
    },
    bronze: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos + étirements', duration: '20 min', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance fondamentale', duration: '60 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 10x1000m (R: 2min)', duration: '70 min', intensity: 'Élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing récup', duration: '45 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Allure marathon : 2x8km à 5:00/km', duration: '85 min', intensity: 'Élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou vélo', duration: '45 min', intensity: 'Croisée', icon: '🚴' },
        { day: 'Dimanche', workout: 'Sortie longue 25-30 km', duration: '140-160 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 3h30 (4:58/km)',
        '💧 Hydratation tous les 5 km testée',
        '🍌 Nutrition : gels dès km 20',
        '📈 Volume hebdo : 60-80 km',
        '🏃 Sortie longue 1x/semaine obligatoire',
        '🛌 Sommeil : 8h minimum'
      ]
    },
    silver: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos + massage', duration: '30 min', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + éducatifs', duration: '65 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 12x1200m (R: 1min30)', duration: '80 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing lent régénération', duration: '50 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Allure spé : 3x7km à 4:40/km', duration: '90 min', intensity: 'Très élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Repos ou natation', duration: '45 min', intensity: 'Croisée', icon: '🏊' },
        { day: 'Dimanche', workout: 'Sortie longue 30-35 km', duration: '160-180 min', intensity: 'Modérée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 3h15 (4:37/km)',
        '💧 Plan hydratation précis',
        '🍝 Nutrition glucidique optimisée',
        '📈 Volume hebdo : 80-100 km',
        '🔥 2-3 séances qualité/semaine',
        '🏋️ PPG 1-2x/semaine',
        '💤 Récupération prioritaire'
      ]
    },
    gold: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos + massage + étirements', duration: '40 min', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Endurance + gammes + 10x100m', duration: '70 min', intensity: 'Faible', icon: '🏃' },
        { day: 'Mercredi', workout: 'VMA : 15x1000m (R: 1min)', duration: '85 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Footing récup très lent', duration: '55 min', intensity: 'Très légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Seuil marathon : 2x10km à 4:20/km', duration: '95 min', intensity: 'Très élevée', icon: '🏃‍♂️' },
        { day: 'Samedi', workout: 'Récup ou PPG intense', duration: '50 min', intensity: 'Modérée', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie longue 35-38 km', duration: '170-190 min', intensity: 'Modérée à élevée', icon: '🏃‍♀️' }
      ],
      tips: [
        '🎯 Objectif : Sub 3h00 (4:16/km) - Le Graal !',
        '💧 Hydratation/nutrition au gramme près',
        '🍌 Stratégie énergétique testée',
        '📈 Volume hebdo : 100-120 km',
        '🔥 3 séances qualité/semaine',
        '🏋️ Renforcement 2-3x/semaine',
        '💤 Sommeil optimal : 8-9h',
        '🧘 Préparation mentale poussée',
        '🏥 Suivi médical recommandé'
      ]
    }
  };

  const selectedProgram = baseProgram[objective.id] || baseProgram.debutant;
  
  return {
    level: objective.level,
    duration: '20 semaines',
    weeklySchedule: selectedProgram.weeklySchedule,
    tips: selectedProgram.tips,
    targetPace: objective.pace,
    targetTime: objective.targetTime,
    weeklyKm: objective.weeklyKm
  };
};

// Programme Trail selon objectif
const generateTrailProgram = (weeksUntilRace, race, objective) => {
  const baseProgram = {
    debutant: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course nature facile', duration: '40 min', intensity: 'Faible', icon: '⛰️' },
        { day: 'Mercredi', workout: 'Repos ou marche', duration: '30 min', intensity: 'Très légère', icon: '🚶' },
        { day: 'Jeudi', workout: 'Petites côtes : 5x1min30', duration: '40 min', intensity: 'Modérée', icon: '⚡' },
        { day: 'Vendredi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Samedi', workout: 'Renforcement léger', duration: '30 min', intensity: 'Légère', icon: '💪' },
        { day: 'Dimanche', workout: 'Sortie nature longue', duration: '90-110 min', intensity: 'Modérée', icon: '🏔️' }
      ],
      tips: [
        '🎯 Objectif : Finir à son rythme',
        '💧 Sac hydratation 1L minimum',
        '🍫 Barres énergétiques',
        '📈 Dénivelé hebdo : 800-1200m D+',
        '👟 Chaussures trail adaptées',
        '😊 Prendre du plaisir'
      ]
    },
    bronze: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course nature vallonnée', duration: '50 min', intensity: 'Modérée', icon: '⛰️' },
        { day: 'Mercredi', workout: 'Côtes courtes : 8x2min', duration: '55 min', intensity: 'Élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récupération plat', duration: '40 min', intensity: 'Légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Renforcement + core', duration: '45 min', intensity: 'Modérée', icon: '💪' },
        { day: 'Samedi', workout: 'Trail technique modéré', duration: '80 min', intensity: 'Modérée', icon: '🥾' },
        { day: 'Dimanche', workout: 'Sortie longue montagne', duration: '120-150 min', intensity: 'Modérée', icon: '🏔️' }
      ],
      tips: [
        '🎯 Objectif : Finir confortablement',
        '💧 Sac hydratation 1.5L minimum',
        '🍫 Nutrition : barres + fruits secs',
        '📈 Dénivelé hebdo : 1200-1800m D+',
        '👟 Chaussures trail adaptées'
      ]
    },
    silver: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos', duration: '-', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Course nature + éducatifs', duration: '55 min', intensity: 'Modérée', icon: '⛰️' },
        { day: 'Mercredi', workout: 'Côtes longues : 6x4min', duration: '65 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récup plat', duration: '45 min', intensity: 'Légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Renfo + pliométrie', duration: '50 min', intensity: 'Élevée', icon: '💪' },
        { day: 'Samedi', workout: 'Trail technique soutenu', duration: '100 min', intensity: 'Élevée', icon: '🥾' },
        { day: 'Dimanche', workout: 'Sortie longue montagne', duration: '150-180 min', intensity: 'Modérée à élevée', icon: '🏔️' }
      ],
      tips: [
        '🎯 Objectif : Top 50% classement',
        '💧 Stratégie hydratation éprouvée',
        '🍬 Plan nutrition précis',
        '📈 Dénivelé hebdo : 1800-2500m D+',
        '👟 Chaussures + bâtons trail',
        '🧭 Reconnaissance parcours'
      ]
    },
    gold: {
      weeklySchedule: [
        { day: 'Lundi', workout: 'Repos + massage', duration: '30 min', intensity: 'Repos', icon: '💤' },
        { day: 'Mardi', workout: 'Nature + gammes + côtes courtes', duration: '60 min', intensity: 'Modérée', icon: '⛰️' },
        { day: 'Mercredi', workout: 'Côtes : 8x5min intensif', duration: '75 min', intensity: 'Très élevée', icon: '⚡' },
        { day: 'Jeudi', workout: 'Récup active plat', duration: '50 min', intensity: 'Légère', icon: '🚶‍♂️' },
        { day: 'Vendredi', workout: 'Renfo intense + explosivité', duration: '60 min', intensity: 'Très élevée', icon: '💪' },
        { day: 'Samedi', workout: 'Trail technique poussé', duration: '120 min', intensity: 'Très élevée', icon: '🥾' },
        { day: 'Dimanche', workout: 'Sortie ultra montagne', duration: '180-240 min', intensity: 'Élevée', icon: '🏔️' }
      ],
      tips: [
        '🎯 Objectif : Top 20% - Performance élite',
        '💧 Hydratation millimètrée',
        '🍌 Nutrition optimisée (gels + solide)',
        '📈 Dénivelé hebdo : 2500-3500m D+',
        '👟 Matériel pro (chaussures + bâtons)',
        '🧭 Reconnaissance complète',
        '🏋️ Renfo 3x/semaine',
        '💤 Récupération maximale'
      ]
    }
  };

  const selectedProgram = baseProgram[objective.id] || baseProgram.debutant;
  
  return {
    level: objective.level,
    duration: '14 semaines',
    weeklySchedule: selectedProgram.weeklySchedule,
    tips: selectedProgram.tips,
    targetPace: objective.pace,
    targetTime: objective.targetTime,
    weeklyKm: objective.weeklyKm
  };
};
