# 🔍 DIFFS - Avant/Après (Changements Clés)

## 1. app.js - Suppression Coach IA

### ❌ AVANT (supprimé)
```javascript
// ===== COACH IA (PERPLEXITY API) =====
async coachAdvice() {
    const coachOutput = document.getElementById('coachOutput');
    coachOutput.innerHTML = '<p style="opacity: 0.7;">⏳ Le Coach IA réfléchit...</p>';
    document.getElementById('coachModal').classList.remove('hidden');

    try {
        const playerInfo = `
Niveau: ${this.currentLevel}
Rang: ${this.getRank(this.currentLevel)}
...`;
        const prompt = `Tu es un coach...`;
        
        const response = await fetch('/.netlify/functions/coach-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        // ... 40 lignes de traitement d'erreur
    }
}
```

### ✅ APRÈS (supprimé complètement)
```javascript
// Complètement supprimé → zéro code IA
```

---

## 2. app.js - enableNotifications() Simplifiée

### ❌ AVANT (complexe)
```javascript
async enableNotifications() {
    // Vérifications
    if (!('serviceWorker' in navigator)) { alert(...) }
    if (!('PushManager' in window)) { alert(...) }
    
    // Demander permission
    let permission = Notification.permission;
    if (permission === 'default') {
        permission = await Notification.requestPermission();
    }
    
    // Récupérer le Service Worker
    const registration = await navigator.serviceWorker.ready;
    
    // Récupérer la VAPID Public Key (compliqué!)
    let VAPID_PUBLIC_KEY = 'BM6PpjbfVx_m8q7nC2X5...' // Fallback
    try {
        const configRes = await fetch('/.netlify/functions/get-config');
        if (configRes.ok) {
            const config = await configRes.json();
            if (config.vapidPublicKey) {
                VAPID_PUBLIC_KEY = config.vapidPublicKey;
            }
        }
    } catch (e) { 
        console.warn('Using fallback'); 
    }
    
    // Subscribe to push (Web Push API)
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    
    localStorage.setItem('pushSubscription', JSON.stringify(subscription));
    // ... plus de code
}

urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
```

### ✅ APRÈS (super simple)
```javascript
async enableNotifications() {
    // Check support
    if (!('Notification' in window)) {
        alert('Les notifications ne sont pas supportées');
        return;
    }
    
    if (Notification.permission === 'denied') {
        alert('Les notifications sont bloquées');
        return;
    }
    
    try {
        // Demander permission
        let permission = Notification.permission;
        if (permission === 'default') {
            permission = await Notification.requestPermission();
        }
        
        if (permission !== 'granted') {
            alert('Permission refusée');
            return;
        }
        
        // Afficher une notif locale simple
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification('Shadow Muscle', {
                body: 'Notifications activées avec succès ! 🔔',
                icon: './icon-192.png',
                badge: './icon-192.png',
                vibrate: [200, 100, 200],
                tag: 'shadow-muscle-welcome'
            });
        }
        
        // Toast
        this.showNotificationSuccess('Notifications activées ! ✅');
    } catch (error) {
        console.error(error);
        alert('Erreur: ' + error.message);
    }
}

// urlBase64ToUint8Array SUPPRIMÉ (plus besoin)
```

---

## 3. index.html - Suppression Coach IA

### ❌ AVANT
```html
<div style="margin-top: 16px; display: flex; gap: 8px;">
    <button id="enableNotifs" style="flex: 1; ...">🔔 Notifications</button>
    <button id="coachIA" style="flex: 1; ...">🤖 Coach IA</button>
</div>
</section>

<!-- TOUTE LA MODAL SUPPRIMÉE -->
<div id="coachModal" class="hidden" style="position: fixed; top: 0; ...">
    <div style="...">
        <h2 style="...">🤖 Coach IA</h2>
        <div id="coachOutput" style="..."></div>
        <button id="closeCoach" style="...">Fermer</button>
    </div>
</div>
```

### ✅ APRÈS
```html
<button id="enableNotifs" style="width: 100%; ...">🔔 Activer les notifications</button>
</section>

<!-- Modal supprimée complètement -->
```

---

## 4. app.js - generateDailyMissions() Améliorée

### ❌ AVANT (4 missions)
```javascript
generateDailyMissions() {
    const exercises = [
        { name: '50 pompes', xp: 100, boost: { force: 1 } },
        { name: '100 squats', xp: 120, boost: { endurance: 1 } },
        { name: '30 min méditation', xp: 80, boost: { mental: 1 } },
        { name: '20 min shadow boxing', xp: 150, boost: { discipline: 2, aura: 1 } }
    ];
    this.dailyMissions = exercises.sort(() => Math.random() - 0.5).slice(0, 3);
    this.updateMissionsUI();
}
```

### ✅ APRÈS (14 missions)
```javascript
generateDailyMissions() {
    // Pool de missions variées avec difficulté progressive
    const exercises = [
        // FORCE (3)
        { name: '50 pompes', xp: 100, boost: { force: 1 } },
        { name: '30 pompes explosives', xp: 110, boost: { force: 2, aura: 1 } },
        { name: '100 pompes d\'une main', xp: 200, boost: { force: 3 } },
        
        // ENDURANCE (3)
        { name: '100 squats', xp: 120, boost: { endurance: 1 } },
        { name: '50 squats profonds', xp: 140, boost: { endurance: 2, mental: 1 } },
        { name: '200 squats', xp: 180, boost: { endurance: 3 } },
        
        // MENTAL (3)
        { name: '30 min méditation', xp: 80, boost: { mental: 1 } },
        { name: '1h de lecture "Solo Leveling"', xp: 120, boost: { mental: 2, discipline: 1 } },
        { name: '30 min yoga', xp: 90, boost: { mental: 1, endurance: 1 } },
        
        // DISCIPLINE & AURA (3)
        { name: '20 min shadow boxing', xp: 150, boost: { discipline: 2, aura: 1 } },
        { name: '30 min sparring', xp: 170, boost: { discipline: 2, force: 1, aura: 2 } },
        { name: '15 min cardio intensif', xp: 130, boost: { endurance: 2, discipline: 1 } },
        
        // COMBO puissant (2)
        { name: 'Full Body Workout', xp: 250, boost: { force: 1, endurance: 1, mental: 1, discipline: 1, aura: 1 } },
        { name: 'Défi matinal', xp: 160, boost: { discipline: 2, force: 1, aura: 1 } },
    ];
    
    this.dailyMissions = exercises.sort(() => Math.random() - 0.5).slice(0, 3);
    this.updateMissionsUI();
}
```

---

## 5. app.js - Ajout showDailyGreeting()

### ✅ NOUVEAU
```javascript
showDailyGreeting() {
    const today = new Date().toDateString();
    const lastGreeting = localStorage.getItem('lastGreeting');
    
    if (lastGreeting === today) return; // Déjà montré
    
    const dayOfWeek = new Date().getDay();
    const greetings = [
        { day: 0, msg: "Dimanche... Un jour pour se reposer et méditer. 💜", icon: "🧘" },
        { day: 1, msg: "Lundi! Le jour du GRIND commence. Montre ta force! 💪", icon: "⚡" },
        { day: 2, msg: "Mardi: Jour de discipline. Chaque muscle compte.", icon: "🔥" },
        // ... + 4 jours
    ];
    
    const greeting = greetings.find(g => g.day === dayOfWeek);
    if (greeting) {
        this.showGreetingNotification(greeting.icon + " " + greeting.msg);
        localStorage.setItem('lastGreeting', today);
    }
}

showGreetingNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(0,217,255,0.3), rgba(183,0,255,0.3));
        ...
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 5000);
}
```

---

## 6. index.html - updateMissionsUI() avec Badges XP

### ❌ AVANT
```javascript
updateMissionsUI() {
    const dailyDiv = document.getElementById('dailyMissions');
    dailyDiv.innerHTML = '<h3>Quotidiennes</h3>' + this.dailyMissions.map((m, i) => `
        <div class="mission">
            <span>${m.name} (+${m.xp} XP)</span>
            <button onclick="app.completeMission(${i}, true)">${m.done ? '✓' : 'Compléter'}</button>
        </div>
    `).join('');
}
```

### ✅ APRÈS
```javascript
updateMissionsUI() {
    const dailyDiv = document.getElementById('dailyMissions');
    dailyDiv.innerHTML = '<h3>Quotidiennes</h3>' + this.dailyMissions.map((m, i) => `
        <div class="mission ${m.done ? 'done' : ''}">
            <span>${m.name} <span class="xp-badge">+${m.xp} XP</span></span>
            <button onclick="app.completeMission(${i}, true)" class="mission-btn">${m.done ? '✓ Fait' : 'Compléter'}</button>
        </div>
    `).join('');
}
```

---

## 7. style.css - Ajout Animations

### ✅ NOUVEAU
```css
@keyframes slideDown {
    0% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
    100% { transform: translateX(-50%) translateY(0); opacity: 1; }
}

@keyframes slideUp {
    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
    100% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.mission.done {
    opacity: 0.65;
    border-color: rgba(0,217,255,0.05);
}

.mission.done span {
    text-decoration: line-through;
    color: rgba(255,255,255,0.5);
}

.xp-badge {
    background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75em;
    font-weight: 700;
    margin-left: 8px;
    box-shadow: 0 0 12px rgba(0,217,255,0.3);
}
```

---

## 8. package.json - Suppression Dépendances

### ❌ AVANT
```json
{
  "name": "shadow-muscle",
  "version": "1.0.0",
  "description": "Shadow Muscle - PWA de coaching musculaire",
  "main": "app.js",
  "scripts": {
    "dev": "netlify dev",
    "build": "echo 'No build step needed for vanilla PWA'"
  },
  "dependencies": {
    "web-push": "^3.6.7"
  }
}
```

### ✅ APRÈS
```json
{
  "name": "shadow-muscle",
  "version": "1.0.0",
  "description": "Shadow Muscle - PWA de coaching musculaire (Vanilla JS, zero dependencies)",
  "main": "index.html",
  "scripts": {
    "start": "python3 -m http.server 8000"
  }
}
```

---

## 9. service-worker.js - Meilleur notificationclick

### ✅ AMÉLIORÉ
```javascript
// Avant: Cherchait par URL (fragile)
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (let i = 0; i < clientList.length; i++) {
                if (clientList[i].url === '/' && 'focus' in clientList[i]) {
                    return clientList[i].focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// Après: Plus robuste
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});
```

---

## 📊 Résumé des Diffs

| Fichier | Avant | Après | Delta |
|---------|-------|-------|-------|
| app.js | 442 lignes | 380 lignes | -62 lignes (-14%) |
| index.html | 60 lignes | 55 lignes | -5 lignes |
| service-worker.js | 112 lignes | 112 lignes | ~12 lignes modifiées |
| style.css | 330 lignes | 346 lignes | +16 lignes (animations) |
| package.json | 13 lignes | 8 lignes | -5 lignes |
| node_modules | web-push | (aucun) | -1 dépendance |

---

**Bilan**: Plus simple, plus lisible, plus performant. Zéro impact sur les fonctionnalités core! 💜
