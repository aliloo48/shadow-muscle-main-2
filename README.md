# 💪 Shadow Muscle - PWA de Coaching Musculaire

Une application PWA (Progressive Web App) de suivi de musculation avec theme **Solo Leveling**. Grind, augmente tes stats, atteins le Shadow Monarch rank! 

---

## ✨ Caractéristiques

### 🎮 **Système de progression RPG**
- **Niveaux et Expérience** : Gagne de l'XP en complétant des missions
- **Stats dynamiques** : Force, Endurance, Mental, Discipline, Aura
- **Rank système** : E → D → C → B → A → S → Shadow Monarch
- **Streak de missions** : Bonus pour la continuité quotidienne

### 🎯 **Missions flexibles**
- **Missions quotidiennes** : 3 missions aléatoires chaque jour
- **Missions personnalisées** : Crée tes propres défis avec récompenses
- **Exemples intégrés** : Pompes, squats, méditation, shadow boxing, etc.
- **XP adapté** : Les missions complexes offrent plus de récompenses

### 🔔 **Notifications locales**
- Demande simple et propre des permissions
- Toast de confirmation et d'événements
- Sauvegarde de l'état d'activation dans localStorage
- Compatible avec tous les navigateurs modernes

### 🎨 **UI moderne et thématisée**
- Theme **Blue/Purple Neon** inspiré de Solo Leveling
- Animations fluides (shimmer, glow, popup)
- Responsive design (mobile-first)
- Dark mode par défaut

### 📱 **PWA Full Stack**
- **Installation desktop/mobile** : Icône sur l'écran d'accueil
- **Service Worker** : Fonctionne hors ligne
- **Cache offline** : Accès même sans internet
- **Manifest.json** : Intégration OS native

---

## 🚀 Installation & Usage

### Local (Dev)

```bash
# Clone ou ouvre le repo
git clone https://github.com/TON_REPO/shadow-muscle.git
cd shadow-muscle

# Ouvre dans VS Code ou un serveur local
python -m http.server 8000
# Puis ouvre http://localhost:8000
```

### Deploy (Netlify - Gratuit)

```bash
# Si tu as un repo GitHub
git add .
git commit -m "feat: Shadow Muscle - Fitness RPG"
git push

# Connecte le repo à Netlify (auto deploy à chaque push)
```

---

## 📖 Guide Utilisateur

### Commencer

1. **Ouvre l'app** → Crée un profil (auto-sauvegardé)
2. **Complète les missions quotidiennes** → Gagne des XP & stats
3. **Ajoute des missions perso** → Plus de flexibilité
4. **Grind jusqu'au top** → Shadow Monarch !

### Systématique de XP

```
Missions quotidiennes : 80-150 XP chacune
Missions perso : 200 XP (ajustable via la syntaxe)
Boosters de stat : Chaque mission boost 1-3 stats
```

### Syntaxe missions perso

```
Exemple: "100 tractions + force:3, aura:1"
Résultat: Mission 200 XP qui donne +3 Force, +1 Aura
```

---

## 🎛️ Fichiers Clés

```
index.html                  → UI principale
app.js                      → Logique du jeu (classe ShadowMuscle)
style.css                   → Thème & animations
service-worker.js           → Cache offline & notifications locales
manifest.json               → Config PWA
```

---

## 🔔 Notifications (Version Simple)

L'app utilise les **Notifications Locales** natives du navigateur (pas de backend requis).

### Comment ça marche

1. Clique **"🔔 Activer les notifications"**
2. Le navigateur demande la permission
3. Clique "Autoriser" (ou "Allow")
4. Les notifications de l'app s'affichent maintenant

### Types de notifications

- ✅ **Missions complétées** : Toast de confirmation
- 🔥 **Streak atteinte** : Notification rouge/orange
- 💜 **Accueil quotidien** : Message du jour (ex: "Lundi, le GRIND commence!")
- 💔 **Streak cassée** : Alert si tu manques un jour

---

## 🎯 Prochaines Améliorations (Roadmap)

- [ ] **Système de quêtes** : Quêtes longues durée vs missions quotidiennes
- [ ] **Badges & Achievements** : Débloquer en atteignant des jalons
- [ ] **Leaderboard local** : Stats personnelles avancées
- [ ] **Partage de stats** : Export en image pour le flex
- [ ] **Coach IA optionnel** : Intégration Perplexity API (futur)
- [ ] **Synchronisation cloud** : Sauvegarder entre appareils

---

## 🛠️ Tech Stack

- **Frontend** : Vanilla JS (ES6), HTML5, CSS3
- **Storage** : localStorage (client-side)
- **Offline** : Service Worker + Cache API
- **Notifications** : Notification API native
- **Deploy** : Netlify (gratuit)

---

## 📱 Système de Rangs

```
E → D → C → B → A → S → Shadow Monarch
```

Chaque rang a ses propres messages de déblocage (Solo Leveling vibes 💜).

---

## 💾 Données Sauvegardées

```javascript
{
  level: number,
  xp: number,
  stats: { force, endurance, mental, discipline, aura },
  customMissions: Array,
  missionStreak: number,
  lastMissionDay: string (Date)
}
```

Tout est stocké localement → **100% privé, zéro tracking**.

---

## 🎨 Customisation

### Changer le thème

Modifie les variables CSS dans `:root` de `style.css`:

```css
:root {
    --accent-red: #ff3b30;      /* Rouge néon */
    --accent-blue: #00d9ff;     /* Bleu néon */
    --accent-purple: #b700ff;   /* Violet */
    /* ... etc ... */
}
```

### Ajouter des missions de base

Modifie l'array `exercises` dans `app.js` - `generateDailyMissions()`:

```javascript
{ name: 'Ma mission', xp: 100, boost: { force: 1 } }
```

---

## 🆘 Troubleshooting

| Problème | Solution |
|----------|----------|
| Pas d'icône sur écran d'accueil | Ajouter via le menu navigateur (voir manifest.json) |
| Service Worker non actif | Vérifier que https:// (ou localhost) |
| Notifications bloquées | Autoriser dans les paramètres du navigateur |
| Données perdues | Vérifier localStorage (DevTools → Application) |

---

## 📄 License

Gratuit pour usage personnel. Feel free to fork & modify!

---

**Build by a Solo Leveler 💪✨**

*"L'important c'est pas la destination, c'est le grind qu'on fait en chemin."*
