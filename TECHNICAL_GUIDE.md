# 🔧 Rég Technique - Système Bodyweight

## 📝 Vue d'ensemble Architecturale

Shadow Muscle utilise une **architecture simple vanilla (zéro dépendances)** avec:

- **Classe `ShadowMuscle`** - Logique métier complète
- **localStorage** - Persistence de données
- **Service Worker** - Support PWA
- **CSS Grid** - Responsive design
- **Notifications API** - Alertes utilisateur

---

## 🏗️ Arborescence des Fichiers

```
shadow-muscle/
├── index.html                    # Page principale
├── app.js                        # Logique métier (700+ lignes)
├── style.css                     # Styles (1200+ lignes)
├── service-worker.js             # PWA support
├── manifest.json                 # PWA manifest
├── BODYWEIGHT_SYSTEM.md          # Doc utilisateur complète
├── UPDATE_BODYWEIGHT.md          # Changelog détaillé
├── QUICKSTART_FR.md              # Guide démarrage rapide
├── TESTS.html                    # Checklist de tests
└── [autres fichiers existants]

```

---

## 🎮 Classe ShadowMuscle - Méthodes Principales

### **Constructeur**
```javascript
constructor() {
    // Initialise toutes les variables:
    - Niveau, XP, Stats
    - Missions (daily, weekly, monthly, custom)
    - Suivi d'exercices (semaine/mois)
    - Données complétées (weekly/monthly)
}
```

### **Système de Rangs**
```javascript
getRank(level)              // E, D, C, B, A, S
getRankBounds(level)        // {rank, minLevel, maxLevel}
getExercisesByRank(level)   // Retourne 4-5 exercices du rang
```

### **Système de Missions**
```javascript
generateDailyMissions()      // 3 exos aléatoires du rang/jour
generateWeeklyMissions()     // 3 missions hebdo (mise à jour auto)
generateMonthlyMissions()    // 3 défis mensuels (mise à jour auto)

completeMission(index, isDaily)     // Complète une mission
completeWeeklyMission(missionId)    // Valide mission hebdo
completeMonthlyMission(missionId)   // Valide défi mensuel
```

### **Suivi d'Exercices**
```javascript
trackExercise(exerciseName)  // Parse le nom et compte répétitions
getTotalPushupWeek()         // Retourne total pompes/semaine
getTotalSquatsWeek()         // Retourne total squats/semaine
```

### **XP et Progression**
```javascript
getXpForLevel(level)         // 400 + (level * 100)
addXP(amount, statBoost)     // Ajoute XP + stats + level up
showLevelUp()                // Affiche pop-up changement rang
```

### **Persistence**
```javascript
loadData()   // Charge depuis localStorage + réinitialise si semaine/mois change
saveData()   // Sauvegarde tout dans localStorage
```

### **UI**
```javascript
updateUI()           // Rafraîchit tout l'affichage
updateMissionsUI()   // Affiche 4 sections de missions
updateDaily()        // Vérif si nouvelles missions/semaine/mois à generer
```

### **Utilitaires**
```javascript
getWeekNumber()      // Calcule semaine de l'année
getPreviousDay()     // Retourne date d'hier
```

---

## 📊 Structure de Données

### **État Principal**
```javascript
{
    currentLevel: number (1-100+),
    currentXP: number,
    stats: {
        force: number,
        endurance: number,
        mental: number,
        discipline: number,
        aura: number
    },
    missionStreak: number,  // Jours consécutifs
}
```

### **Missions Journalières**
```javascript
[
    {
        name: string,
        xp: number,
        boost: {stat: number, ...},
        category: string,
        done: boolean  // Complétée ou pas?
    },
    ...
]
```

### **Missions Hebdomadaires**
```javascript
[
    {
        name: string,
        xp: number,
        boost: {stat: number, ...},
        progress: number,  // Actuel
        goal: number,      // Objectif
        id: string,        // Identifiant unique
        done: boolean (calculé),
    },
    ...
]
```

### **Missions Mensuelles**
```javascript
[
    {
        name: string,
        xp: number,
        boost: {stat: number, ...},
        progress: number,
        goal: number,
        id: string,
        badge: string,     // Emoji "🏆 Discipline"
        done: boolean (calculé),
    },
    ...
]
```

### **Suivi d'Exercices**
```javascript
exercisesThisWeek: {
    pushups: number,    // Total pompes cette semaine
    squats: number,     // Total squats cette semaine
    other: number,      // Autres exercices
    week: number        // Numéro de semaine (pour reset auto)
}

exercisesThisMonth: {
    pushups: number,
    squats: number,
    other: number,
    month: number       // Mois (0-11, pour reset auto)
}
```

### **localStorage Keys**
```javascript
localStorage.getItem('shadowMuscle')           // État principal JSON
localStorage.getItem('missionStreak')          // Streak numéro
localStorage.getItem('lastMissionDay')         // Date dernier jour
localStorage.getItem('lastDaily')              // Date dernières missions
localStorage.getItem('lastStreakDay')          // Date last streak day
localStorage.getItem('lastGreeting')           // Date dernier greeting
localStorage.getItem('exercisesThisWeek')      // JSON exos semaine
localStorage.getItem('exercisesThisMonth')     // JSON exos mois
localStorage.getItem('completedWeeklyMissions') // Missions hebdo validées
localStorage.getItem('completedMonthlyMissions')// Défis mensuels validés
localStorage.getItem('customMissions')         // Missions perso
```

---

## 🎯 Flux d'Exécution

### **Au Chargement (init())**
1. `loadData()` - Charger depuis localStorage
2. `registerSW()` - Enregistrer Service Worker
3. `updateUI()` - Afficher l'état
4. `generateDailyMissions()` - 3 exos du jour
5. `generateWeeklyMissions()` - Missions hebdo
6. `generateMonthlyMissions()` - Défis mensuels
7. `bindEvents()` - Lier les clics
8. `updateDaily()` - Vérif changements
9. `showDailyGreeting()` - Message du jour

### **À Chaque Clic "Compléter"**
1. `completeMission(index, isDaily)`
2. `trackExercise(name)` - Count pompes/squats
3. `addXP(xp, statBoost)` - Ajouter XP + stats
4. `allDailyMissionsCompleted()` - Vérif streak
5. `updateWeeklyMissions()` - Vérif missions hebdo
6. `updateMonthlyMissions()` - Vérif défis mensuels
7. `showMissionCompleted()` - Animation
8. `updateMissionsUI()` - Rafraîchir affichage
9. `saveData()` - Mettre à jour localStorage

### **À Minuit (updateDaily())**
1. Vérif si c'est un nouveau jour
2. `generateDailyMissions()` - Nouvelles missions
3. Gestion du streak 🔥
   - Si hier "lastStreakDay" → streak += 1
   - Sinon si pas hier → streak = 0
4. Vérif si nouvelle semaine
   - Si `week` changé → réinitialiser `exercisesThisWeek`
   - Réinitialiser `completedWeeklyMissions`
5. Vérif si nouveau mois
   - Si `month` changé → réinitialiser `exercisesThisMonth`
   - Réinitialiser `completedMonthlyMissions`

---

## 🔢 Formules Mathématiques

### **XP pour Niveau Up**
```javascript
getXpForLevel(level) = 400 + (level * 100)

Niveau 1:  500  XP
Niveau 5:  900  XP
Niveau 10: 1400 XP
Niveau 30: 3400 XP
Niveau 50: 5400 XP
Niveau 80: 8400 XP
Niveau 100: 10400 XP
```

### **Récompenses d'Exercices par Rang**

**Rang E:** 30-60 XP par mission
**Rang D:** 80-120 XP par mission
**Rang C:** 120-170 XP par mission
**Rang B:** 180-250 XP par mission
**Rang A:** 220-320 XP par mission
**Rang S:** 500-700 XP par mission

### **Semaine de l'Année**
```javascript
getWeekNumber() {
    const d = new Date();
    const firstDay = new Date(d.getFullYear(), 0, 1);
    const pastDays = (d - firstDay) / 86400000;
    return Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
}

Semaine 1: Jan 1-7
Semaine 52: Dec 26-31
```

---

## 🎨 HTML Structure

### **Sections Principales**
```html
<header>
    h1 "Shadow Muscle"
    #level "Niv. X"
    #rank "Rang X - Description"
    #streak "🔥 Streak: X"
</header>

<div id="xpBar">
    #xpProgress (width = %)
    #xpText "X / Y XP"
</div>

<section id="stats">
    .stat-grid
        #force, #endurance, #mental, #discipline, #aura
</section>

<section id="missions">
    #dailyMissions       (3 missions)
    #weeklyMissions      (3 missions + barre prog)
    #monthlyMissions     (3 missions + badge + barre prog)
    #customMissions      (X missions perso)
    #newMission (input)
    #addMission (button)
    #enableNotifs (button)
</section>

<section id="levelUpPopup" (hidden)
    h2 "LEVEL UP !"
    #levelUpText
    #closePopup
</section>
```

---

## 🎨 CSS Classes

### **Classes Principaux**
```css
.mission                /* Conteneur mission */
.mission.done           /* Mission complétée (grisée) */
.mission-btn            /* Bouton compléter */
.mission-btn:hover      /* Au survol */
.mission-btn:disabled   /* Bouton inactif */
.mission-progress       /* Barre/texte progression */
.xp-badge               /* Badge "+X XP" */
.stat                   /* Conteneur stat */
.stat-grid              /* Grille responsive */
```

### **Animations CSS**
```css
@keyframes slideDown     /* Notifications qui descendent */
@keyframes slideUp       /* Notifications qui remontent */
@keyframes streak-pop    /* Explosion streak 🔥 */
@keyframes streak-fade   /* Fade après 2.5s */
@keyframes shake         /* Shake streak broken */
@keyframes slide-in      /* Mission complétée arrive */
@keyframes slide-out     /* Mission complétée part */
```

---

## 🔐 Sécurité & Limites

### **localStorage Limitation**
- ~5-10MB par domaine
- Non chiffré
- Accessible via console
- À resetter manuel ou auto-reset par script

### **Validation**
- Pas de validation serveur (app locale)
- Utilisateurs peuvent tricher via console
- C'est intentionnel (c'est leur progression personnelle)

### **Données Persistantes**
- Les données ne quittent pas l'appareil
- Pas de cloud sync
- Si localStorage effacée → data perdue

---

## 🚀 Optimisations Possibles

### **Court Terme**
- [ ] Débougging localStorage sur les anciennes sessions
- [ ] Graphiques SVG de progression
- [ ] Meilleure détection de parsing d'exercices
- [ ] Léaderboard local (si multi-user)

### **Moyen Terme**
- [ ] Export/Import données en JSON
- [ ] Themes (dark/light/custom)
- [ ] Exercices personnalisés avec images
- [ ] Intégration Google Fit / Apple HealthKit

### **Long Terme**
- [ ] Backend Node.js + MongoDB
- [ ] Sync multi-device (cloud)
- [ ] Compétition / Leaderboards
- [ ] Trainer IA (recommandations)
- [ ] Intégration Apple Watch / Wear OS

---

## 🧪 Débugage

### **Console Commands**
```javascript
// Voir l'état complet:
console.log(app)

// Voir les données localStorage:
JSON.parse(localStorage.getItem('shadowMuscle'))

// Ajouter 1000 XP (tricher):
app.addXP(1000, {force: 10})

// Réinitialiser complètement:
localStorage.clear()
location.reload()

// Bypass le streak requis (test):
localStorage.setItem('lastStreakDay', new Date().toDateString())

// Voir exercices cette semaine:
app.exercisesThisWeek
```

---

## 📱 PWA Manifest

Le `manifest.json`` contient:
```json
{
    "name": "Shadow Muscle",
    "short_name": "Shadow Muscle",
    "display": "standalone",
    "start_url": "/",
    "theme_color": "#b700ff",
    "background_color": "#050409",
    "icons": [...]
}
```

Permet:
- ✅ Installation sur mobile
- ✅ Écran d'accueil
- ✅ Mode plein écran
- ✅ Icône personnalisée

---

## 🔔 Service Worker

Le `service-worker.js` gère:
- ✅ Chache des fichiers (offline support)
- ✅ Notifications push
- ✅ Sync en arrière-plan (si browser supporte)

---

## 💾 Export/Backup Manual

Pour sauvegarder vos données:

```javascript
// Dans console (F12):
const backup = localStorage.getItem('shadowMuscle');
console.log(backup);
// Copier le JSON complet
```

Pour restaurer:
```javascript
localStorage.setItem('shadowMuscle', '[VOTRE JSON]');
location.reload();
```

---

## 🎓 Pour Étendre le Code

### **Ajouter un Nouvel Exercice**

Dans `getExercisesByRank()`:
```javascript
{ 
    name: '100 box jumps', 
    xp: 150, 
    boost: { endurance: 3, aura: 1 },
    category: 'Explosif'
}
```

### **Ajouter un Nouveau Rang**

Modifier `getRank()`:
```javascript
if (level >= 101) return 'Z - Ultra Légende';
```

Modifier `getRankBounds()`:
```javascript
if (level >= 101) return { rank: 'Z', minLevel: 101, maxLevel: Infinity };
```

Ajouter exercices dans `getExercisesByRank()`:
```javascript
else if (level >= 101) {
    // Rang Z - Ultra Légende
    return [{ ...exercices ultra-difficiles... }];
}
```

### **Ajouter Notification Custom**

Copier ce pattern:
```javascript
showCustomNotif(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(...);
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        z-index: 998;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}
```

---

## ✅ Test Checklist

- [ ] localStorage clean → App initialise à Niv. 1
- [ ] Complétez 1 mission → XP apparaît
- [ ] Complétez 3 missions (jour 1) → Niv. 2
- [ ] Attendez jusqu'à jour 2 (minuit ou reload) → Nouvelles missions
- [ ] Complétez 5 jours consécutifs → Streakbonus activé + mission hebdo complétée
- [ ] Attendez 7 jours → Exo/semaine comptés
- [ ] Attendre niv. 6 → Rang D message pop-up
- [ ] Attendre niv. 16 → Rang C, exos changent
- [ ] Attendre 30 jours → Défi mensuel potentiel complété
- [ ] Vérifier localStorage persiste après reload
- [ ] Vérifier Service Worker enregistré (console)
- [ ] Vérifier PWA installable (menu mobile)
- [ ] Vérifier responsive on tablet/phone

---

**Code propre, efficace, et 100% vanilla - prêt pour production!** 🚀
