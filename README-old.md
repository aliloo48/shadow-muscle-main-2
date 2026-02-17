# 🤖 Shadow Muscle - PWA Coaching Feature Complete

## 📦 NOUVELLES FEATURES

### 1. 🔔 **Web Push Notifications**
- Double-click pour activer les notifications
- Abonnement sauvegardé localement
- Service Worker écoute les push events
- Fonction Netlify pour envoyer les notifications

### 2. 🤖 **Coach IA (Perplexity API)**
- Analyse le profil du joueur (niveau, stats, streak)
- Génère 3 missions personnalisées via IA
- Réponse en français
- Clé API sécurisée côté serveur

---

## ⚙️ INSTALLATION RAPIDE

### ÉTAPE 1️⃣ : Générer les clés VAPID
```bash
npm install
npx web-push generate-vapid-keys
```

Copie les clés générées (tu vas en avoir besoin).

### ÉTAPE 2️⃣ : Configurer Netlify Environment
1. Va sur https://app.netlify.com
2. Sélectionne ton site **Shadow Muscle**
3. Settings → Environment variables
4. Ajoute ces 3 variables:

| Variable | Valeur |
|----------|--------|
| `VAPID_PUBLIC_KEY` | *[Clé publique générée]* |
| `VAPID_PRIVATE_KEY` | *[Clé privée générée]* |
| `VAPID_SUBJECT` | `mailto:ton-email@example.com` |
| `PERPLEXITY_API_KEY` | *[Clé de https://perplexity.ai]* |

### ÉTAPE 3️⃣ : Mettre à jour app.js (ligne ~275)
```javascript
const VAPID_PUBLIC_KEY = 'TA_CLE_PUBLIQUE_ICI'; // Remplace par ta clé générée
```

### ÉTAPE 4️⃣ : Déployer
```bash
git add .
git commit -m "Add Push Notifications & Coach IA"
git push
```

---

## 🧪 TESTER LES FEATURES

### Test Web Push
1. Ouvre ton site Netlify
2. Clique sur le bouton **"🔔 Notifications"**
3. Autorise les notifications du navigateur
4. Tu devrais voir: *"Notifications activées avec succès ✅"*

### Test Coach IA
1. Clique sur le bouton **"🤖 Coach IA"**
2. Attends 5-10 secondes (l'API répond)
3. Tu dois voir 3 missions personnalisées

### Test Push avec Page Test (optionnel)
1. Va sur `https://ton-site.netlify.app/test-push.html`
2. Clique sur "Afficher mon abonnement"
3. Remplis le titre + message
4. Clique "Envoyer test push"

---

## 📁 FICHIERS CRÉÉS/MODIFIÉS

```
shadow-muscle/
├── app.js  ✏️ (Ajout: enableNotifications() + coachAdvice())
├── index.html  ✏️ (Ajout: boutons push + modal Coach)
├── service-worker.js  ✏️ (Ajout: listeners push)
├── netlify/
│   └── functions/
│       ├── send-push.js  📄 (NOUVEAU - envoyer les push)
│       └── coach-ai.js  📄 (NOUVEAU - appel à Perplexity)
├── package.json  ✏️ (Nouvelle dépendance: web-push)
├── test-push.html  📄 (NOUVEAU - page de test)
├── .env.example  📄 (NOUVEAU - template variables)
├── SETUP_GUIDE.md  📄 (NOUVEAU - instructions détaillées)
└── README.md  📄 (Ce fichier)
```

---

## 🔐 SÉCURITÉ - CE QUI EST FAIT

✅ **Clé API Perplexity** : Stockée côté serveur (Netlify Function), jamais exposée au front  
✅ **VAPID Keys** : Métadonnées sécurisées pour Web Push  
✅ **No env credentials in code** : Variables lues depuis process.env  
✅ **CORS headers** : Configurés sur toutes les functions

---

## 🚨 DÉPANNAGE

| Problème | Solution |
|----------|----------|
| "Method not allowed" sur push | Vérifier que la fonction Netlify existe et est deployée |
| "PERPLEXITY_API_KEY not configured" | Ajouter la variable dans Netlify Settings → Environment |
| Coach IA très lent | Normal, l'API prend 5-10s. Attends. |
| Push rejeté (401) | Vérifier que VAPID_PUBLIC_KEY est correcte |
| "Notifications non disponibles" | Doit être HTTPS (Netlify = ok par défaut) |

---

## 📚 DOCUMENTATION DES FUNCTIONS

### `send-push.js`
Endpoint: `POST /.netlify/functions/send-push`

**Body:**
```json
{
  "subscriptions": ["[JSON subscription string]"],
  "title": "Titre de la notification",
  "body": "Corps du message"
}
```

**Response:**
```json
{
  "message": "Notifications sent",
  "results": [{ "success": true }, ...]
}
```

### `coach-ai.js`
Endpoint: `POST /.netlify/functions/coach-ai`

**Body:**
```json
{
  "prompt": "Tu es un coach de... [le prompt au complet]"
}
```

**Response:**
```json
{
  "message": "Le texte de réponse du coach IA"
}
```

---

## 🎯 PROCHAINES AMÉLIORATIONS POSSIBLES

- [ ] Planifier des notifications pour l'heure précise
- [ ] Intégrer les actions de notification ("Marquer comme fait")
- [ ] Analytics des push cliqués
- [ ] Modèle IA personnalisé pour coach
- [ ] Historique des conseils du coach

---

## 👤 AUTEUR

Code généré pour **Shadow Muscle** - Une PWA de coaching musculaire Solo Leveling-themed  
**Date:** 15 février 2026  
**Tech:** Vanilla JS + Netlify Functions + Web Push API + Perplexity LLM

---

**Bonne chance, Combattant ! 🔥**
