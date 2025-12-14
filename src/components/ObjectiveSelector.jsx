// src/components/ObjectiveSelector.jsx
export default function ObjectiveSelector({ raceType, raceDistance, selectedObjective, onSelect }) {
  const objectives = getObjectivesForRace(raceType, raceDistance);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 text-gray-900">🎯 Choisis ton objectif</h3>
      <div className="grid grid-cols-1 gap-3">
        {objectives.map((objective) => (
          <button
            key={objective.id}
            onClick={() => onSelect(objective)}
            className={`p-4 rounded-lg border-2 transition text-left ${
              selectedObjective?.id === objective.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/50 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{objective.icon}</span>
                <span className="font-bold text-gray-900">{objective.name}</span>
              </div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {objective.level}
              </span>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Temps cible :</strong> {objective.targetTime}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Allure :</strong> {objective.pace}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {objective.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function getObjectivesForRace(raceType, raceDistance) {
  switch (raceType) {
    case '5 km':
      return [
        {
          id: 'debutant',
          name: 'Finir en Forme',
          level: 'Débutant Plus',
          icon: '🌟',
          targetTime: '< 30 min',
          pace: '6:00 min/km',
          weeklyKm: '20-30 km',
          sessionsPerWeek: 3,
          description: 'Pour débuter la compétition avec un bon chrono'
        },
        {
          id: 'bronze',
          name: 'Performance Solide',
          level: 'Intermédiaire',
          icon: '🥉',
          targetTime: '< 25 min',
          pace: '5:00 min/km',
          weeklyKm: '30-40 km',
          sessionsPerWeek: 4,
          description: 'Objectif accessible pour améliorer son chrono sur 5km'
        },
        {
          id: 'silver',
          name: 'Performance Confirmée',
          level: 'Confirmé',
          icon: '🥈',
          targetTime: '< 22 min',
          pace: '4:24 min/km',
          weeklyKm: '40-50 km',
          sessionsPerWeek: 5,
          description: 'Pour les coureurs réguliers cherchant un bon chrono'
        },
        {
          id: 'gold',
          name: 'Performance Élite',
          level: 'Avancé',
          icon: '🥇',
          targetTime: '< 20 min',
          pace: '4:00 min/km',
          weeklyKm: '50-60 km',
          sessionsPerWeek: 6,
          description: 'Objectif ambitieux pour coureurs expérimentés'
        }
      ];

    case '10 km':
      return [
        {
          id: 'debutant',
          name: 'Finir en Forme',
          level: 'Débutant Plus',
          icon: '🌟',
          targetTime: '< 60 min',
          pace: '6:00 min/km',
          weeklyKm: '25-35 km',
          sessionsPerWeek: 3,
          description: 'Premier 10km en compétition, finir sereinement'
        },
        {
          id: 'bronze',
          name: 'Sub 50 minutes',
          level: 'Intermédiaire',
          icon: '🥉',
          targetTime: '< 50 min',
          pace: '5:00 min/km',
          weeklyKm: '40-50 km',
          sessionsPerWeek: 4,
          description: 'Casser la barre des 50 minutes'
        },
        {
          id: 'silver',
          name: 'Sub 45 minutes',
          level: 'Confirmé',
          icon: '🥈',
          targetTime: '< 45 min',
          pace: '4:30 min/km',
          weeklyKm: '50-60 km',
          sessionsPerWeek: 5,
          description: 'Viser les 45 minutes pour un excellent chrono'
        },
        {
          id: 'gold',
          name: 'Sub 40 minutes',
          level: 'Avancé',
          icon: '🥇',
          targetTime: '< 40 min',
          pace: '4:00 min/km',
          weeklyKm: '60-70 km',
          sessionsPerWeek: 6,
          description: 'Performance de haut niveau amateur'
        }
      ];

    case 'Semi-Marathon':
      return [
        {
          id: 'debutant',
          name: 'Finir le Semi',
          level: 'Débutant Plus',
          icon: '🌟',
          targetTime: '< 2h00',
          pace: '5:41 min/km',
          weeklyKm: '35-45 km',
          sessionsPerWeek: 3,
          description: 'Finir ton premier semi-marathon avec confiance'
        },
        {
          id: 'bronze',
          name: 'Sub 1h45',
          level: 'Intermédiaire',
          icon: '🥉',
          targetTime: '< 1h45',
          pace: '4:58 min/km',
          weeklyKm: '50-60 km',
          sessionsPerWeek: 4,
          description: 'Finir sous 1h45 avec une préparation solide'
        },
        {
          id: 'silver',
          name: 'Sub 1h30',
          level: 'Confirmé',
          icon: '🥈',
          targetTime: '< 1h30',
          pace: '4:16 min/km',
          weeklyKm: '65-80 km',
          sessionsPerWeek: 5,
          description: 'Viser 1h30 pour un excellent niveau'
        },
        {
          id: 'gold',
          name: 'Sub 1h20',
          level: 'Avancé',
          icon: '🥇',
          targetTime: '< 1h20',
          pace: '3:47 min/km',
          weeklyKm: '80-100 km',
          sessionsPerWeek: 6,
          description: 'Performance élite amateur'
        }
      ];

    case 'Marathon':
      return [
        {
          id: 'debutant',
          name: 'Finir le Marathon',
          level: 'Débutant Plus',
          icon: '🌟',
          targetTime: '< 4h00',
          pace: '5:41 min/km',
          weeklyKm: '45-60 km',
          sessionsPerWeek: 4,
          description: 'Finir ton premier marathon, objectif réaliste'
        },
        {
          id: 'bronze',
          name: 'Sub 3h30',
          level: 'Intermédiaire',
          icon: '🥉',
          targetTime: '< 3h30',
          pace: '4:58 min/km',
          weeklyKm: '60-80 km',
          sessionsPerWeek: 4,
          description: 'Objectif solide pour marathonien confirmé'
        },
        {
          id: 'silver',
          name: 'Sub 3h15',
          level: 'Confirmé',
          icon: '🥈',
          targetTime: '< 3h15',
          pace: '4:37 min/km',
          weeklyKm: '80-100 km',
          sessionsPerWeek: 5,
          description: 'Performance de bon niveau amateur'
        },
        {
          id: 'gold',
          name: 'Sub 3h00',
          level: 'Avancé',
          icon: '🥇',
          targetTime: '< 3h00',
          pace: '4:16 min/km',
          weeklyKm: '100-120 km',
          sessionsPerWeek: 6,
          description: 'Le Graal du marathonien : sub 3h !'
        }
      ];

    case 'Trail':
      return [
        {
          id: 'debutant',
          name: 'Découverte Trail',
          level: 'Débutant Plus',
          icon: '🌟',
          targetTime: 'Finir à son rythme',
          pace: 'Confortable',
          weeklyKm: '30-40 km',
          sessionsPerWeek: 3,
          description: 'Découvrir le trail en prenant du plaisir'
        },
        {
          id: 'bronze',
          name: 'Finisher Solide',
          level: 'Intermédiaire',
          icon: '🥉',
          targetTime: 'Finir confortablement',
          pace: 'Variable selon D+',
          weeklyKm: '50-60 km',
          sessionsPerWeek: 4,
          description: 'Finir en gérant effort et nutrition'
        },
        {
          id: 'silver',
          name: 'Top 50%',
          level: 'Confirmé',
          icon: '🥈',
          targetTime: 'Top moitié classement',
          pace: 'Soutenue',
          weeklyKm: '65-80 km',
          sessionsPerWeek: 5,
          description: 'Viser la première moitié du classement'
        },
        {
          id: 'gold',
          name: 'Performance Elite',
          level: 'Avancé',
          icon: '🥇',
          targetTime: 'Top 20%',
          pace: 'Élevée',
          weeklyKm: '80-100 km',
          sessionsPerWeek: 6,
          description: 'Viser le top 20% avec entraînement intensif'
        }
      ];

    default:
      return [
        {
          id: 'debutant',
          name: 'Finir la course',
          level: 'Débutant Plus',
          icon: '🌟',
          targetTime: 'Objectif temps modéré',
          pace: '6:00 min/km',
          weeklyKm: '20-30 km',
          sessionsPerWeek: 3,
          description: 'Finir la course confortablement'
        }
      ];
  }
}
