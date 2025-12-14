// src/components/TrainingProgram.jsx
import { useState } from 'react';

export default function TrainingProgram({ program, onClose }) {
  const [activeDay, setActiveDay] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

  if (!program) return null;

  const handleShare = async () => {
    const shareText = `🏃‍♂️ Mon Programme d'Entraînement

Course : ${program.raceName}
Distance : ${program.raceDistance}
Date : ${program.raceDate}
Objectif : ${program.objective.name} ${program.objective.icon}
Temps cible : ${program.targetTime}
Niveau : ${program.level}
Durée : ${program.duration}
Allure cible : ${program.targetPace}
Volume hebdo : ${program.weeklyKm}

Programme hebdomadaire :
${program.weeklySchedule.map(s => `${s.icon} ${s.day}: ${s.workout} (${s.duration})`).join('\n')}

💡 Conseils :
${program.tips.join('\n')}

Créé avec Running France 🇫🇷`;

    // Vérifier si l'API Web Share est disponible
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Programme d'entraînement - ${program.raceName}`,
          text: shareText,
        });
        setShareMessage('✅ Programme partagé avec succès !');
        setTimeout(() => setShareMessage(''), 3000);
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Fallback : copier dans le presse-papier
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback pour les navigateurs desktop
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareMessage('✅ Programme copié dans le presse-papier !');
      setTimeout(() => setShareMessage(''), 3000);
    }).catch(() => {
      setShareMessage('❌ Erreur lors de la copie');
      setTimeout(() => setShareMessage(''), 3000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">🏃‍♂️ Programme d'Entraînement</h2>
              <p className="text-white/90 text-sm">{program.raceName}</p>
              <p className="text-white/80 text-xs mt-1">
                📅 Course le {program.raceDate} • 📏 {program.raceDistance}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>
          
          {/* Objectif sélectionné */}
          <div className="mt-4 bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{program.objective.icon}</span>
              <span className="font-bold text-lg">{program.objective.name}</span>
            </div>
            <div className="text-sm text-white/90">
              Temps cible : {program.targetTime} • {program.weeklyKm}/semaine
            </div>
          </div>
          
          <div className="mt-3 flex gap-2 text-xs flex-wrap">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ⏱️ {program.duration}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              📊 {program.level}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ⏳ {program.weeksUntilRace} semaines restantes
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Message de partage */}
          {shareMessage && (
            <div className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg text-center">
              {shareMessage}
            </div>
          )}

          {/* Objectif et allure cible */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-lg mb-2 text-blue-900">🎯 Objectif</h3>
            <p className="text-blue-800 text-lg font-semibold">
              Allure cible : {program.targetPace}
            </p>
          </div>

          {/* Planning hebdomadaire */}
          <h3 className="text-xl font-bold mb-4">📅 Planning Hebdomadaire</h3>
          <div className="space-y-3 mb-6">
            {program.weeklySchedule.map((session, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  activeDay === index
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow'
                }`}
                onClick={() => setActiveDay(activeDay === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{session.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{session.day}</h4>
                      <p className="text-sm text-gray-600">{session.workout}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{session.duration}</p>
                    <p className="text-xs text-gray-500">{session.intensity}</p>
                  </div>
                </div>
                
                {activeDay === index && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                      <strong>Détails :</strong> {getSessionDetails(session.workout, program.raceDistance)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conseils */}
          <h3 className="text-xl font-bold mb-4">💡 Conseils de Préparation</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <ul className="space-y-2">
              {program.tips.map((tip, index) => (
                <li key={index} className="text-sm text-green-900">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Progression */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-900 mb-2">⚠️ Recommandations importantes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• N'augmente jamais ton volume de plus de 10% par semaine</li>
              <li>• Écoute ton corps : mieux vaut sauter une séance que se blesser</li>
              <li>• Teste ton équipement et ta nutrition pendant l'entraînement</li>
              <li>• Prévois une semaine d'affûtage (réduction volume) avant la course</li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              <span>📤</span>
              <span>Partager le programme</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper pour les détails des séances
function getSessionDetails(workout, distance) {
  if (workout.includes('Repos')) {
    return 'Journée de récupération essentielle pour permettre au corps de s\'adapter.';
  }
  if (workout.includes('facile') || workout.includes('fondamentale')) {
    return 'Course à allure conversationnelle, tu dois pouvoir parler facilement.';
  }
  if (workout.includes('Intervalle') || workout.includes('Fractionné') || workout.includes('VMA')) {
    return 'Alternance d\'efforts intenses et de récupération. Échauffement 15min + retour au calme 10min obligatoires.';
  }
  if (workout.includes('Tempo') || workout.includes('Seuil') || workout.includes('Allure')) {
    return 'Allure soutenue mais contrôlée, proche de ton allure objectif. Respiration plus difficile.';
  }
  if (workout.includes('longue')) {
    return 'Sortie en endurance pour développer la capacité aérobie. Rester à allure confortable.';
  }
  if (workout.includes('Côtes')) {
    return 'Renforcement musculaire et puissance. Montée dynamique, descente en récupération active.';
  }
  if (workout.includes('Récup') || workout.includes('récupération')) {
    return 'Séance très légère pour favoriser la récupération active. Allure très lente et confortable.';
  }
  if (workout.includes('Renforcement') || workout.includes('PPG')) {
    return 'Séance de préparation physique générale : gainage, squats, fentes, proprioception.';
  }
  if (workout.includes('éducatifs') || workout.includes('gammes')) {
    return 'Exercices techniques : montées de genoux, talons-fesses, foulées bondissantes.';
  }
  return 'Suivre les indications de durée et d\'intensité.';
}
