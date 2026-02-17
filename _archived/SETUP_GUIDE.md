# SETUP GUIDE - Shadow Muscle PWA avec Push Notifications + Coach IA

## 📋 CHECKLIST RAPIDE

### PARTIE 1 : WEB PUSH NOTIFICATIONS

#### Étape 1 : Générer les clés VAPID
```bash
cd /Users/macbookair/Desktop/shadow-muscle
npm install
npx web-push generate-vapid-keys
```

Tu vas obtenir:
```
Public Key: BPxxxxxxxxxxxx...
Private Key: xxxxxxxxxxxxxxxx...
```

#### Étape 2 : Configurer les variables Netlify
- Vais sur https://app.netlify.com
- Sélectionne ton site Shadow Muscle
- Settings → Environment
- Ajoute ces 3 variables (copie-colle les valeurs générées):

| Variable | Valeur |
|----------|--------|
| `VAPID_PUBLIC_KEY` | Ta clé publique |
| `VAPID_PRIVATE_KEY` | Ta clé privée |
| `VAPID_SUBJECT` | `mailto:ton-email@example.com` |

#### Étape 3 : Mettre à jour app.js
Ligne ~270, remplace la VAPID_PUBLIC_KEY (hardcodée) par la vraie:
```javascript
const VAPID_PUBLIC_KEY = 'TA_CLE_PUBLIQUE_GENEREE';
```

#### Étape 4 : Déployer
```bash
git add .
git commit -m "Add Web Push Notifications"
git push
```

#### Étape 5 : Tester
1. Ouvre ton site Netlify
2. Clique sur "🔔 Notifications"
3. Autorise les notifications du navigateur
4. Tu devrais voir "Notifications activées avec succès ✅"

---

### PARTIE 2 : COACH IA (PERPLEXITY API)

#### Étape 1 : Obtenir une clé Perplexity
- Va sur https://www.perplexity.ai/
- Crée un compte ou connecte-toi
- Va sur les paramètres API
- Génère une clé (format: pxl_xxx...)

#### Étape 2 : Configurer la clé Netlify
- https://app.netlify.com → Settings → Environment
- Ajoute: `PERPLEXITY_API_KEY = pxl_xxx...`

#### Étape 3 : Mettre à jour app.js
Ligne ~355, remplace:
```javascript
const PERPLEXITY_API_KEY = localStorage.getItem('pplx_api_key') || 'YOUR_PERPLEXITY_API_KEY';
```

Par:
```javascript
const PERPLEXITY_API_KEY = 'pxl_TA_CLE_ICI';
```

OU mieux, pour plus de sécurité, récupère via une fonction Netlify (voir ci-dessous).

#### Étape 4 : Déployer et tester
```bash
git add .
git commit -m "Add Coach IA with Perplexity"
git push
```

Clique sur "🤖 Coach IA" et attends sa réponse !

---

## 🔐 SÉCURITÉ : UNE MEILLEURE APPROCHE

Au lieu de mettre les clés en dur dans app.js, utilise une Netlify Function:

### Créer une fonction `get-api-keys.js`

```javascript
// netlify/functions/get-api-keys.js
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      perplexityApiKey: process.env.PERPLEXITY_API_KEY
    })
  };
};
```

### Puis dans app.js:

```javascript
async coachAdvice() {
  // Récupérer la clé depuis la fonction
  const res = await fetch('/.netlify/functions/get-api-keys');
  const { perplexityApiKey } = await res.json();
  
  if (!perplexityApiKey) {
    alert('Clé API non configurée');
    return;
  }
  
  // ... reste du code avec perplexityApiKey
}
```

---

## 📡 TESTER LES WEB PUSH AVEC CURL

Si tu veux envoyer un push test directement:

```bash
# D'abord, récupère l'abonnement du user (il est en localStorage)
# Puis appelle la fonction Netlify:

curl -X POST https://ton-site.netlify.app/.netlify/functions/send-push \
  -H "Content-Type: application/json" \
  -d '{
    "subscriptions": [
      "{\"endpoint\":\"https://fcm.googleapis.com/...\",\"keys\":{\"p256dh\":\"...\",\"auth\":\"...\"}}"
    ],
    "title": "Test 🤖",
    "body": "Ceci est un test!"
  }'
```

---

## 🐛 DÉPANNAGE

| Problème | Solution |
|----------|----------|
| "Notifications non disponibles" | Vérifier que le site est en HTTPS (Netlify = ok par défaut) |
| "Clé API Perplexity invalide" | Vérifier dans Netlify Settings → Environment que la clé est bien configurée |
| Push ne marche pas | Vérifier que VAPID keys sont correctement générées et configurées |
| Coach IA très lent | L'API Perplexity peut prendre 5-10s, c'est normal |

---

## 📝 RÉSUMÉ DES FICHIERS MODIFIÉS

- ✅ `index.html` : Ajout boutons + modal Coach IA
- ✅ `app.js` : Méthodes `enableNotifications()` + `coachAdvice()`
- ✅ `service-worker.js` : Listeners push + notification
- ✅ `netlify/functions/send-push.js` : Fonction backend pour envoyer les push
- ✅ `package.json` : web-push dependency

---

**Bonne chance, Combattant ! 🔥**
