# 🧪 TEST GUIDE - Comment Tester Shadow Muscle Localement

## Setup Local

```bash
cd /Users/macbookair/Desktop/shadow-muscle
python3 -m http.server 8000
# Ouvrez http://localhost:8000
```

---

## 🎮 Checklist Fonctionnalités (à Tester)

### 1️⃣ Progression Système

- [ ] Ouvrez l'app → devriez voir:
  - Header avec "Shadow Muscle"
  - Niveau 1, Rang "E - Survivant"
  - Streak: 0
  - Stats: Force 1, Endurance 1, etc.
  - XP Bar vide
  - 3 missions quotidiennes aléatoires

- [ ] Complétez une mission → devriez voir:
  - Bouton change de "Compléter" → "✓ Fait"
  - Animation popup "✓ [Mission Name] COMPLÉTÉE!"
  - XP progresse
  - Stats augmentent

- [ ] Complétez les 3 missions quotidiennes → devriez voir:
  - Toast rouge/orange "🔥 STREAK +1 ! 1 jours"
  - `missionStreak` augmente

- [ ] Atteignez level 2 → devriez voir:
  - Popup "LEVEL UP!"
  - Message spécial
  - Rang mise à jour

### 2️⃣ Notifications

- [ ] Clique "🔔 Activer les notifications" → devriez voir:
  - Navigateur demande permission "Allow/Block"
  - Clique "Allow"
  - Toast bleu/purple "Notifications activées! ✅"
  - Notification système "Shadow Muscle - Notifications activées avec succès! 🔔"

### 3️⃣ Missions Personnalisées

- [ ] Tapez dans le champ: `"100 tractions + force:2, aura:1"`
- [ ] Clique "Ajouter" → devriez voir:
  - Nouvelle section "Personnalisées"
  - Mission ajoutée avec 200 XP
  - Vous pouvez la compléter comme les autres

### 4️⃣ Interface & Animations

- [ ] Regardez les animations:
  - Shimmer sur le titre "Shadow Muscle" (continuous)
  - Progress bar animation quand XP change
  - Hover sur une mission → change couleur
  - Toast d'accueil glisse de haut en bas puis disparaît

- [ ] Testez responsive
  - Réduisez la fenêtre (mobile view)
  - L'app doit rester lisible et fonctionnelle

### 5️⃣ Daily Greeting (Nouveau!)

- [ ] Ouvrez l'app → devriez voir un toast du jour:
  - Lundi: "Lundi! Le jour du GRIND commence. Montre ta force! 💪"
  - Dimanche: "Dimanche... Un jour pour se reposer et méditer. 💜"
  - Message change chaque jour différent

### 6️⃣ Persistence (localStorage)

- [ ] Complétez une mission
- [ ] Actualisez la page (Cmd+R)
- [ ] Les données doivent être intact:
  - Même niveau
  - Même XP
  - Missions complétées gardent l'état ✓
  - Streak intact

### 7️⃣ Service Worker + Offline

- [ ] Ouvrez DevTools → Application tab
- [ ] Checker "Offline" mode
- [ ] L'app doit toujours marcher complètement
- [ ] Complétez une mission offline
- [ ] Actualisez → données persistent

---

## ⚠️ Ce qui ne devrait PAS être là

❌ **Bouton "🤖 Coach IA"** - Supprimé
❌ **Modal Coach IA** - Supprimée
❌ **Références Perplexity** - Supprimées
❌ **Mentions VAPID/Web Push** - Supprimées
❌ **Fichiers netlify/functions/** - En production, archivés localement

---

## 🔍 Test DevTools

### Console (F12 → Console tab)

```javascript
// Checkez que pas d'erreurs
// Doit être vide ou juste des logs standards
```

### Application → Service Workers

```
Service Worker doit être "Active and running"
```

### Application → Cache Storage

```
"shadow-muscle-v2" cache doit contenir les fichiers:
- index.html
- app.js
- style.css
- service-worker.js
- icon-192.png
- icon-512.png
- bg.svg
```

### Application → Local Storage

```
Cherchez la clé "shadowMuscle":
{
  "level": 1,
  "xp": 0,
  "stats": { ... },
  "customMissions": [ ... ]
}

+ missionStreak
+ lastMissionDay
+ lastDaily
+ lastStreakDay
+ lastGreeting
+ pushSubscription (si notifications activées)
```

---

## 📊 Performance Tests (Optionnel)

### Test Vitesse

```
Chaque action doit être <100ms:
- Compléter mission
- Ajouter mission personnalisée
- Clique notifications
```

### Test Mémoire

```
DevTools → Performance
Enregistrez une session:
- Complétez 5 missions
- Devrait pas avoir de fuites anormal
```

---

## 🎯 Test Cases Par Utilisateur Type

### Casual User
1. Ouvre l'app
2. Voit 3 missions quotidiennes
3. Complète une mission
4. Voit XP augmenter
5. ✅ Happy!

### Engaged Player
1. Complète les 3 missions
2. Voit streak +1 animation
3. Gère missions personnalisées
4. Suit progression level/rank
5. Active notifications
6. ✅ Very Happy!

### Power User
1. Ouvre DevTools
2. Vérifie Service Worker actif
3. Teste mode offline
4. Vérifie localStorage sync
5. Teste persistence across refreshes
6. ✅ Developer Happy!

---

## ✅ Checklist Avant Deploy

- [ ] Aucune erreur console (F12)
- [ ] Service Worker "Active and running"
- [ ] Missions visible (14 missions pool)
- [ ] Notifications button fonctionne
- [ ] Daily greeting apparaît
- [ ] localStorage persist bien
- [ ] Offline marche
- [ ] Responsive sur mobile view
- [ ] Pas de lags/animations blanches

---

## 🆘 Troubleshooting

### App not loading?
1. Vérifiez le serveur: `python3 -m http.server 8000`
2. Check: http://localhost:8000 (exatc)
3. DevTools → Console (erreurs?)

### Service Worker not registering?
1. Refresh (Cmd+Shift+R - hard refresh)
2. DevTools → Application → Service Workers
3. Doit montrer status "Active and running"

### Notifications permission denied?
1. Allez dans les settings du navigateur
2. Trouvez localhost → Change à "Allow"
3. Relancez l'app

### localStorage semble vide?
1. DevTools → Application → Local Storage
2. Clique sur "http://localhost:8000"
3. Devrait voir les clés (shadowMuscle, missionStreak, etc.)

### Missions pas faire la difficulté?
1. C'est normal! Chaque jour = 3 aléatoires de 14 total
2. Refresh l'app ou restart serveur pour nouvelles missions

---

## 📝 Notes

- **Locales data**: Si vous supprimez localStorage, tout réinitialise
- **Service Worker cache**: Peut être cached. Si changements pas apparaissent, hard refresh (Cmd+Shift+R)
- **Dark Theme**: C'est intentionnel (Solo Leveling vibes)
- **Keyboard OK?**: Test sur un mobile aussi (important pour PWA)

---

## 🎯 Test Summary

Si tout passe le checklist ci-dessus, vous êtes **100% prêt pour production**. 

Ensuite:
1. Commit & Push
2. Deploy sur Netlify
3. Test sur live site
4. Share le lien! 🚀

---

**Happy Testing! 🎮💜**
