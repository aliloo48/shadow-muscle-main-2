# ⚡ QUICK START - Shadow Muscle

## Installation (60 secondes)

### Local Dev
```bash
# 1. Ouvre le dossier
cd shadow-muscle

# 2. Lance un serveur
python3 -m http.server 8000

# 3. Ouvre http://localhost:8000
```

### Deploy sur Netlify (gratuit)
```bash
# 1. Push ton code
git add .
git commit -m "Shadow Muscle"
git push

# 2. Connecte à Netlify
# - Va https://app.netlify.com
# - New site from Git → Sélectionne ton repo
# - Déployé! ✅

# Chaque push auto-redéploie en 30s
```

---

## Utilisation Basique

### 1️⃣ Crée un profil (auto)
- Ouvre l'app
- Tout est sauvegardé automatiquement

### 2️⃣ Complète des missions
```
🎯 Missions quotidiennes (3 par jour)
- Clique "Compléter" après avoir fait la mission
- Gagne des XP et des stats

📝 Missions perso (customize)
- Syntaxe: "100 tractions + force:2, aura:1"
- 200 XP par défaut
```

### 3️⃣ Grinde pour monter
```
Niveaux: 1 → 100
Rangs: E → D → C → B → A → S → Shadow Monarch
Chaque rank = message special + new milestone
```

### 4️⃣ Active les notifications (opt.)
```
- Clique 🔔 "Activer les notifications"
- Navigateur demande permission
- Clique "Autoriser"
- Notifications confirmées ✅
```

---

## Stats

| Stat | Effets |
|------|--------|
| **Force** | Power level |
| **Endurance** | Stamina |
| **Mental** | Willpower (lucidité) |
| **Discipline** | Dedication |
| **Aura** | Overall energy |

Chaque mission boosté 1-3 stats.

---

## Streak 🔥

```
Complète toutes les 3 quotidiennes du jour
→ +1 Streak (continue le lendemain)
→ Cassé si tu manques 1 jour
→ Toast de confirmation
```

---

## Données

✅ **Tout est sauvegardé localement** (localStorage)
- Zéro cloud
- Zéro tracking
- 100% privé

Pour backup : DevTools → Application → Local Storage → Copy JSON

---

## Customisation

### Ajouter tes propres missions
```
Exemple: "50 abdos + mental:1"
```

### Changer les missions de base
```javascript
// Dans app.js → generateDailyMissions()
{ name: 'Ma mission', xp: 100, boost: { force: 1 } }
```

### Changer les couleurs
```css
/* Dans style.css → :root */
--accent-blue: #00d9ff;
--accent-purple: #b700ff;
```

---

## Debug

### Missions pas apparaître?
```
1. Rafraîchir (Cmd+R ou F5)
2. DevTools → Console (errors?)
3. Check LocalStorage (DevTools → Application)
```

### Service Worker not working?
```
DevTools → Application → Service Workers
Doit être "Active and running"
```

### Notifications bloquées?
```
Browser settings → Notifications
Cherche "localhost" ou ton domaine
Clique "Allow"
```

---

## Qu'est-ce qui a changé (v2.0)?

- ✅ Suppression complète de l'IA (Coach IA gone)
- ✅ Notifications 100% locales (pas de backend)
- ✅ 14 missions au lieu de 4
- ✅ Accueil quotidien personnalisé
- ✅ Code simplifié (40% plus petit)
- ✅ Zéro dépendances npm
- ✅ Déploiement ultra-simple

---

## Fichiers Importants

```
index.html          → Interface
app.js              → Logique (classe ShadowMuscle)
service-worker.js   → Offline + notifications
style.css           → Look & feel
manifest.json       → PWA config
README.md           → Full docs
```

---

## Roadmap (Futur)

- [ ] Badges & Achievements
- [ ] Quêtes long-terme
- [ ] Leaderboard local
- [ ] Export stats (image)
- [ ] Coach IA (optionnel, si besoin)

---

## Support

- **Questions?** → Vois README.md ou CODE_REFERENCE.md
- **Bugs?** → Check DIFFS.md pour comprendre les changements
- **Archived files?** → Dans dossier `_archived/`

---

**Ready to grind? 💪💜**

*L'important c'est pas la destination, c'est le grind qu'on fait en chemin.*
