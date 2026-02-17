# 🚀 CHECKLIST - DÉPLOYER SHADOW MUSCLE AVEC PUSH + COACH IA

## PRÉ-REQUIS
- [ ] Node.js + npm installés locally
- [ ] Compte Netlify (gratuit)
- [ ] Compte Perplexity API (free tier dispo)
- [ ] Git configuré sur ta machine

---

## PHASE 1️⃣ : SETUP LOCAL

### 1. Installer les dépendances
```bash
cd /Users/macbookair/Desktop/shadow-muscle
npm install
```

### 2. Générer les clés VAPID
```bash
npx web-push generate-vapid-keys
```

**Sauvegarde ces deux valeurs quelque part :**
- `Public Key: BPxxxxxxxxxxx...`
- `Private Key: xxxxxxxxxxxxxxx...`

### 3. Créer un `.env` local (optionnel pour dev)
```
VAPID_PUBLIC_KEY=ta_clé_publique_ici
VAPID_PRIVATE_KEY=ta_clé_privée_ici
VAPID_SUBJECT=mailto:ton-email@example.com
PERPLEXITY_API_KEY=pxl_ta_clé_ici
```

---

## PHASE 2️⃣ : OBTENIR LES CLÉS API

### Perplexity API
1. Va sur https://www.perplexity.ai/
2. Connecte-toi ou crée un compte
3. Accès settings → API
4. Génère une clé (format: `pxl_xxx...`)
5. Copie-la quelque part

---

## PHASE 3️⃣ : CONFIGURER NETLIFY

### 1. Aller sur Netlify Settings
- URL: `https://app.netlify.com/sites/ton-site-shadow-muscle/settings/deploys`
- Ou: Settings → Environment variables

### 2. Ajouter les 4 variables d'environnement
Clique sur "Edit variables" et ajoute:

| Clé | Valeur |
|-----|--------|
| `VAPID_PUBLIC_KEY` | *[Ta clé publique générée]* |
| `VAPID_PRIVATE_KEY` | *[Ta clé privée générée]* |
| `VAPID_SUBJECT` | `mailto:ton-email@example.com` |
| `PERPLEXITY_API_KEY` | *[Ta clé Perplexity]* |

**Clique "SAVE"**

---

## PHASE 4️⃣ : METTRE À JOUR LE CODE (si pas encore fait)

### app.js ligne ~275
```javascript
// Cette ligne récupère maintenant depuis get-config.js, donc pas besoin de la changer
// Si tu veux la hardcoder pour faster init:
const VAPID_PUBLIC_KEY = 'TA_CLE_PUBLIQUE_ICI';
```

Sinon, laisse tel quel (il récupère depuis la function).

---

## PHASE 5️⃣ : DÉPLOYER

### Git Commit et Push
```bash
git add .
git commit -m "feat: Add Web Push Notifications & Coach IA

- Web Push with VAPID keys
- Coach IA with Perplexity API
- Netlify Functions for secure API calls
- Push notification test page"

git push
```

Netlify va **automatiquement** redéployer. Attends ~30 secondes.

### Vérifier le déploiement
- Va sur https://app.netlify.com
- Clique sur ton site
- Attends à gauche que le déploiement soit vert ✅
- Sinon, clique sur "Deploy logs" pour voir l'erreur

---

## PHASE 6️⃣ : TESTER SUR LE SITE LIVE

### Test 1: Web Push
1. Ouvre https://ton-site.netlify.app
2. **Clique sur "🔔 Notifications"**
3. Le navigateur va te demander la permission
4. Clique "Allow" (ou "Autoriser")
5. Tu devrais voir: **"Notifications activées avec succès ✅"**

✅ Si tu vois ça = **Web Push is working !**

### Test 2: Coach IA
1. **Clique sur "🤖 Coach IA"**
2. Attends 5-10 secondes (l'API Perplexity répond)
3. Une modal popup avec 3 missions générées par l'IA
4. Le texte doit être en français et personnalisé

✅ Si tu vois des missions = **Coach IA is working !**

### Test 3: Page test (optionnel)
1. Va sur https://ton-site.netlify.app/test-push.html
2. **Clique "Afficher mon abonnement"**
   - Si tu vois du JSON = ✅ Abonnement stocké
   - Si c'est vide = Clique d'abord sur 🔔 dans l'app
3. Dans "Endpoint Netlify", entre: `https://ton-site.netlify.app/`
4. **Clique "Envoyer test push"**
5. Tu vas recevoir une notification système du navigateur
   - Si elle apparaît = ✅ Backend push is working !

---

## 🆘 SI ÇA MARCHE PAS

### "Clé API Perplexity non configurée"
```
1. Va dans Netlify Settings → Environment
2. Vérifie que PERPLEXITY_API_KEY est là et bien formée
3. Nettoie le cache du navigateur (Cmd+Shift+Delete)
4. Recharge la page (Cmd+Shift+R)
```

### "Method not allowed" / "404" sur send-push
```
1. Va dans Netlify Deploys
2. Clique sur le dernier déploiement
3. Regarde les "Deploy logs" pour les erreurs
4. Si erreur TypeScript/npm: npm install dans le dossier root
5. Redeploy manuellement
```

### Coach IA ne répond pas
```
1. Vérifie la clé PERPLEXITY_API_KEY est correcte dans Netlify
2. Ouvre les DevTools (F12) → Console
3. Regarde les erreurs réseau
4. L'API peut être lente, attends 10-15 secondes
```

### "Push rejeté lors du subscribe"
```
1. Vérifier que VAPID_PUBLIC_KEY est correcte
2. VAPID keys doivent être un pair valide (généré ensemble)
3. Nettoyer localStorage:
   - DevTools → Application → Local Storage
   - Supprime "pushSubscription"
   - Relance l'app
```

---

## ✅ FINAL CHECKLIST

- [ ] npm install local
- [ ] web-push generate-vapid-keys
- [ ] VAPID keys + Perplexity API key obtenus
- [ ] 4 variables ajoutées dans Netlify Settings
- [ ] Code comittes et pushé à Git
- [ ] Netlify a redéployé (check status vert ✅)
- [ ] Test 🔔 Web Push = succès
- [ ] Test 🤖 Coach IA = succès
- [ ] (Optionnel) Test page test-push.html = succès

---

## 📞 SUPPORT

Si tu as des questions:
1. Regarde les erreurs dans Netlify Deployment logs
2. Regarde la console du navigateur (F12)
3. Relis le SETUP_GUIDE.md

---

**YOU ARE READY, COMBATTANT ! 🔥**
**Deploy et prends la Couronne ! 👑**
