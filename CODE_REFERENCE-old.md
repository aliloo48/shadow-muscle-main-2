# 📋 RÉSUMÉ COMPLET DU CODE

## 🎯 FICHIERS CRITIQUES À CONNAÎTRE

### Frontend (ce que tu as à l'écran)
```
index.html          → Boutons + Modal du Coach IA (lignes ~45-65)
app.js              → Logique push + coach (lignes ~265-400)
service-worker.js   → Listeners push (lignes ~60-100)
style.css           → (Inchangé, styling existant est ok)
```

### Backend (Netlify Functions / Serverless)
```
netlify/functions/send-push.js   → Envoyer notifications push
netlify/functions/coach-ai.js    → Appel sécurisé à Perplexity
netlify/functions/get-config.js  → Récupérer config (VAPID key)
```

### Config & Documentation
```
package.json                        → node dependencies (web-push)
.env.example                        → Template pour variables
.gitignore                          → Ignore les secrets
SETUP_GUIDE.md                      → Instructions détaillées
DEPLOYMENT_CHECKLIST.md             → Checklist à suivre
README.md                           → Doc générale
```

### Utilitaires
```
test-push.html                      → Page pour tester les notifications
```

---

## 🔄 FLOW COMPLET - Comment ça marche

### 1️⃣ USER CLIQUE "🔔 NOTIFICATIONS"
```
User clicks "🔔 Notifications"
    ↓
app.js: enableNotifications()
    ↓
Demande de permission au navigateur
    ↓
getUserMedia + PushManager.subscribe()
    ↓
Appel avec VAPID_PUBLIC_KEY (récupérée via get-config.js OU hardcodée)
    ↓
Service Worker reçoit l'abonnement
    ↓
Sauvegarde en localStorage: { endpoint, keys: { p256dh, auth } }
    ↓
"Notifications activées ! ✅"
```

### 2️⃣ USER CLIQUE "🤖 COACH IA"
```
User clicks "🤖 Coach IA"
    ↓
app.js: coachAdvice()
    ↓
Construit prompt avec stats du joueur
    ↓
POST vers netlify/functions/coach-ai avec { prompt }
    ↓
coach-ai.js:
  - Récupère PERPLEXITY_API_KEY de process.env ✅ (SÉCURISÉ)
  - Appelle https://api.perplexity.ai/chat/completions
  - Retourne le message au front
    ↓
app.js affiche réponse dans la modal
    ↓
User voit 3 missions générées par l'IA ✨
```

### 3️⃣ ADMIN ENVOIE UN PUSH (optionnel)
```
Via test-push.html OU fetch depuis autre endroit:
    ↓
POST à netlify/functions/send-push
  Body: { subscriptions: [...], title, body }
    ↓
send-push.js:
  - Récupère VAPID_PRIVATE_KEY de process.env ✅ (SÉCURISÉ)
  - Appelle webpush.sendNotification() pour chaque user
  - Retourne { results: [...] }
    ↓
Service Worker reçoit l'event 'push'
    ↓
service-worker.js: showNotification()
    ↓
Notification système apparaît sur l'appareil de l'user 🔔
```

---

## 📊 VARIABLES D'ENVIRONNEMENT NETLIFY

Ces 4 doivent être configurées dans Netlify Settings → Environment:

```yaml
VAPID_PUBLIC_KEY:         BPxxx...  (Généré avec web-push)
VAPID_PRIVATE_KEY:        xxx...    (Généré avec web-push)
VAPID_SUBJECT:            mailto:email@example.com
PERPLEXITY_API_KEY:       pxl_xxx...  (De Perplexity API)
```

⚠️ **JAMAIS** estas variables ne doivent être en dur dans le code.

---

## 🔑 CLÉS ET GÉNÉRATIONS

### Générer VAPID Keys (UNE FOIS SEULEMENT)
```bash
npx web-push generate-vapid-keys
```

Output:
```
Public Key: BPxxxxxxxxxxx...
Private Key: xxxxxxxxxxxxxxx...
```

→ Ajoute ces 2 à Netlify Environment

### Obtenir Perplexity API Key
1. Va https://www.perplexity.ai/
2. Settings → API
3. Crée une clé
4. Format: `pxl_xxxxxxxx...`
5. Ajoute à Netlify Environment

---

## 🚀 FLUX DE DÉPLOIEMENT

```
Local dev:
  npm install
  ↓
Générer VAPID keys
  ↓
Config Netlify Environment (4 variables)
  ↓
Code modifié (index.html, app.js, service-worker.js)
  ↓
git add . && git commit && git push
  ↓
Netlify auto-builds & deploys
  ↓
Check deploy logs (si erreur)
  ↓
Test sur le site live
  ↓
✅ DONE
```

---

## 🧪 TESTS ESSENTIELS

| Feature | Test | Succès = |
|---------|------|----------|
| Web Push | Clique 🔔 → Authorize → message ✅ | "Notifications activées" + abonnement en localStorage |
| Coach IA | Clique 🤖 → Attends 10s → Modal | Voir 3 missions en français |
| Push Send | test-push.html → Envoyer | Notification système arrive |

---

## 🐛 DEBUGGING

### Voir les abonnements push
```javascript
// Dans la console (F12):
const sub = JSON.parse(localStorage.getItem('pushSubscription'));
console.log(sub);
```

### Voir les logs Netlify Functions
```
https://app.netlify.com
→ Sélectionne ton site
→ Functions tab
→ Clique sur la function (send-push ou coach-ai)
→ Vois les logs d'exécution
```

### Tester l'API Perplexity en direct
```bash
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer pxl_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{"role":"user","content":"Hello"}]
  }'
```

### Vérifier que Service Worker écoute les push
```javascript
// Dans console (depuis l'app):
navigator.serviceWorker.ready.then(reg => {
  console.log('SW ready:', reg);
  reg.pushManager.getSubscription().then(sub => console.log('Subscription:', sub));
});
```

---

## 📈 PROCHAINES ÉTAPES (Optionnelles)

1. **Plannifier les notifications** : Ajouter une cron job (ex. 8h du matin)
2. **Analytics** : Tracker qui a cliqué sur les notifications
3. **Customisations** : Ajouter un formulaire pour paramétrer le coach IA
4. **Service Worker avancé** : Sync des notifications offline
5. **Tests automatisés** : Jest pour les functions Netlify

---

## 📚 RESSOURCES

- [Web Push API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Netlify Functions Doc](https://docs.netlify.com/functions/overview/)
- [Perplexity API Doc](https://docs.perplexity.ai/)
- [web-push npm](https://github.com/web-push-libs/web-push)

---

**END OF DOCUMENTATION**

Questions? Check SETUP_GUIDE.md or DEPLOYMENT_CHECKLIST.md 🚀
