# 📋 CODE REFERENCE - Shadow Muscle

## 🎯 Fichiers Critiques

### Frontend (Navigateur)
```
index.html          → Interface utilisateur (70 lignes)
app.js              → Logique du jeu (classe ShadowMuscle) (380+ lignes)
service-worker.js   → Cache offline & notifications locales (110+ lignes)
style.css           → Thème & animations (350+ lignes)
manifest.json       → Config PWA (icônes, metadata)
```

### Aucun backend/Netlify Functions (version simple!)
- ✅ 100% client-side
- ✅ 0 dépendances npm
- ✅ 0 coûts serveur

---

## 🔄 Flows Principaux

### 1️⃣ User Complète une Mission
```
User clique "Compléter"
    ↓
completeMission(index, isDaily)
    ↓
Marque mission.done = true
    ↓
addXP(amount, statBoost)
    ↓
Update UI + localStorage.saveData()
    ↓
Si toutes missions quotidiennes finies → Streak +1 🔥
```

### 2️⃣ User Clique "🔔 Notifications"
```
User clicks button
    ↓
enableNotifications()
    ↓
Demande Notification.requestPermission()
    ↓
User autorise ou refuse
    ↓
Si granted:
  - registration.showNotification()
  - Toast "Notifications activées ✅"
    ↓
localStorage.pushSubscription (optionnel, pour futur)
```

### 3️⃣ Missions Quotidiennes Changent
```
Chaque jour (new Date().toDateString() différent):
    ↓
generateDailyMissions()
    ↓
Pioche 3 missions aléatoires du pool
    ↓
updateMissionsUI() refresh l'affichage
    ↓
Streak logic: poursuit ou break selon si tu as joué hier
```

---

## 📊 Architecture des Données

### localStorage keys
```json
{
  "shadowMuscle": {
    "level": 1,
    "xp": 150,
    "stats": { 
      "force": 1, 
      "endurance": 2, 
      "mental": 1, 
      "discipline": 1, 
      "aura": 1
    },
    "customMissions": [...]
  },
  "missionStreak": 5,
  "lastMissionDay": "Mon Feb 15 2026",
  "lastDaily": "Mon Feb 15 2026",
  "lastStreakDay": "Mon Feb 15 2026",
  "lastGreeting": "Mon Feb 15 2026",
  "pushSubscription": "{...}" // optionnel
}
```

---

## 🎨 Classes & Méthodes Clés

### `class ShadowMuscle`

#### Initialization
- `constructor()` → Charge les données, init UI
- `init()` → Enregistre SW, setup events
- `registerSW()` → Activate Service Worker

#### Données
- `loadData()` → Charge du localStorage
- `saveData()` → Sauvegarde tout
- `updateUI()` → Rafraîchir l'interface

#### Progression
- `addXP(amount, statBoost)` → Ajoute XP, boosts stats
- `generateDailyMissions()` → Pool de 14 missions, piocher 3
- `completeMission(index, isDaily)` → Mark done + XP
- `updateDaily()` → Gère streaks et resets

#### Leveling
- `getRank(level)` → E-Rank → S-Rank → Shadow Monarch
- `getRank(level)` → Retourne le titre du rang
- `getLevelUpMessage(level)` → Message spécial par level

#### UI/UX
- `updateMissionsUI()` → Render missions list
- `showLevelUp()` → Popup "LEVEL UP"
- `showMissionCompleted(mission)` → Toast ✓
- `showStreakNotification()` → Toast 🔥 STREAK
- `showStreakBrokenNotification()` → Sad toast 💔
- `showDailyGreeting()` → Message du jour

#### Notifications
- `enableNotifications()` → Demande permission + Show toast
- `showNotificationSuccess(msg)` → Toast simple

---

## 🎪 Pool de Missions (generateDailyMissions)

**14 missions disponibles** dans `generateDailyMissions()` :

**FORCE (3 missions)**
- 50 pompes (100 XP)
- 30 pompes explosives (110 XP)
- 100 pompes d'une main (200 XP)

**ENDURANCE (3 missions)**
- 100 squats (120 XP)
- 50 squats profonds (140 XP)
- 200 squats (180 XP)

**MENTAL (3 missions)**
- 30 min méditation (80 XP)
- 1h lecture Solo Leveling (120 XP)
- 30 min yoga (90 XP)

**DISCIPLINE / AURA (3 missions)**
- 20 min shadow boxing (150 XP)
- 30 min sparring (170 XP)
- 15 min cardio (130 XP)

**COMBO (2 missions)**
- Full Body Workout (250 XP, tous stats +1)
- Défi matinal (160 XP, discipline+discipline, force+aura)

---

## 🔔 Notification API (Native HTML5)

```javascript
// Demander permission
const permission = await Notification.requestPermission();
// "granted" | "denied" | "default"

// Afficher (via Service Worker)
registration.showNotification('Shadow Muscle', {
  body: 'Message...',
  icon: './icon-192.png',
  badge: './icon-192.png',
  vibrate: [200, 100, 200],
  tag: 'unique-id'
});

// Listener dans service-worker.js
self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Focus or open app window
});
```

---

## 🎨 Animations CSS

### Disponibles
- `slideDown` / `slideUp` (0.5s)
- `slide-in` / `slide-out` (0.4s)
- `streak-pop` (0.5s) + `streak-fade` (0.4s)
- `shake` (0.5s)
- `shimmer`, `glow-pulse`, `progress-pulse`

### Utilisées dans app.js
```javascript
notif.style.animation = 'slideDown 0.5s ease-out, slideUp 0.5s ease-in 4.5s forwards';
```

---

## 📱 Service Worker (offline + notifications)

### Cache Strategy
```javascript
// Own files: Cache-first (fast offline)
if (url.origin === location.origin) {
  return caches.match(request) || fetch(request);
}

// External: Network-first (fresh content)
fetch(request).catch(() => caches.match(request));
```

### Notification Listener
```javascript
self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Focus existing window or open new one
});
```

---

## 🎯 Syntaxe Missions Personnalisées

```javascript
// User input: "100 tractions + force:3, aura:1"
// Parsing:
const parts = input.split('+');
const name = "100 tractions";
const boost = { force: 3, aura: 1 };
```

---

## 📈 XP Formula

```javascript
getXpForLevel(level) {
  return 500 + (level * 150);
}
// Level 1 → 650 XP needed
// Level 10 → 2000 XP needed
// Level 100 → 15500 XP needed
```

---

## 🎮 Gameplay Loop (Daily)

```
1. App ouvre
   ↓
2. Check si new day via localStorage
   ↓
3. Si oui → new 3 daily missions
   ↓
4. Check streaks (yesterday? → +1)
   ↓
5. Show greeting message du jour
   ↓
6. User grinde missions
   ↓
7. Complète → XP, stats up
   ↓
8. Toutes les 3 finies? → Streak +1 🔥
   ↓
9. Level up? → Special message popup
   ↓
10. localStorage.saveData() continu
```

---

## 🚨 Dépannage

### "Les notifications ne s'affichent pas"
- Vérifier `Notification.permission === 'granted'`
- Service Worker enregistré? (check DevTools → Application)
- HTTPS ou localhost?

### "localStorage plein?"
- Max ~5MB par domaine
- Shadow Muscle utilise ~2KB
- Risk mort: non

### "Streaks cassées inopinément?"
- Check localStorage: `lastStreakDay` vs aujourd'hui
- Compte juste 1 jour avant = streak +1
- 2+ jours = reset

---

## 🔐 Sécurité & Privacy

✅ **100% Client-Side**
- Pas de serveur (sauf Netlify hosting)
- Zéro tracking
- Zéro ads
- Zéro dossier utilisateur
- localStorage chiffré par navigateur

---

## 📚 Ressources

- [MDN - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN - Notification API](https://developer.mozilla.org/en-US/docs/Web/API/notification)
- [PWA Basics](https://web.dev/progressive-web-apps/)
- [Web.dev - localStorage](https://web.dev/storage-for-the-web/)

---

**C'est tout! Build ton propre Shadow Muscle. 💜**
