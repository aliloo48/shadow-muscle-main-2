# 📚 Documentation Index - Shadow Muscle

Bienvenue! Voici un guide pour naviguer la doc.

---

## 🎯 Je veux...

### ... Commencer rapidement
→ **Lis** [`QUICK_START.md`](QUICK_START.md) (5 min)

### ... Comprendre le code
→ **Lis** [`CODE_REFERENCE.md`](CODE_REFERENCE.md) (15 min)

### ... Voir les changements (v2.0)
→ **Lis** [`DIFFS.md`](DIFFS.md) (10 min)

### ... Déployer l'app
→ **Lis** [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) (5 min)

### ... La documentation complète
→ **Lis** [`README.md`](README.md) (20 min)

### ... Tracer ce qu'a changé
→ **Lis** [`CHANGELOG.md`](CHANGELOG.md) (10 min)

---

## 📁 Structure des Fichiers

```
shadow-muscle/
├── 🎮 CORE APP
│   ├── index.html              (User Interface)
│   ├── app.js                  (Game Logic - Classe ShadowMuscle)
│   ├── style.css               (Design & Animations)
│   ├── service-worker.js       (Offline + Notifications)
│   ├── manifest.json           (PWA Config)
│   ├── icon-192.png            (App Icon)
│   ├── icon-512.png            (App Icon large)
│   └── bg.svg                  (Background)
│
├── 📦 DEPENDENCIES
│   ├── package.json            (No dependencies! ✨)
│   └── package-lock.json       (Locked versions)
│
├── 📚 DOCUMENTATION
│   ├── README.md               ← START HERE (full overview)
│   ├── QUICK_START.md          ← Fast 5min guide
│   ├── CODE_REFERENCE.md       ← Technical details
│   ├── DIFFS.md                ← Before/After code
│   ├── CHANGELOG.md            ← What changed in v2.0
│   ├── DEPLOYMENT_CHECKLIST.md ← Deploy to Netlify
│   └── INDEX.md                ← This file
│
├── 📦 ARCHIVED (old stuff)
│   ├── netlify/                (Backend functions - archived)
│   ├── SETUP_GUIDE.md          (Old complex setup - archived)
│   ├── README-old.md           (Old docs)
│   ├── DEPLOYMENT_CHECKLIST-old.md
│   └── CODE_REFERENCE-old.md
│
└── ⚙️ CONFIG
    ├── .gitignore             (Git ignore rules)
    └── .env.example           (Env template - not used in v2.0)
```

---

## 🚀 Parcours Typique Utilisateur

### Day 1: Découverte
1. **Lis** `README.md` → Comprendre le concept
2. **Lis** `QUICK_START.md` → Installer et démarrer
3. **Lance** l'app → Complète une mission
4. **Grinde** → Gagne des XP et stats

### Day 2: Customisation
1. **Lis** `CODE_REFERENCE.md` → Comprendre la structure
2. **Ajoute** tes propres missions
3. **Modifie** les couleurs/styles (CSS)
4. **Teste** localement

### Day 3: Déploiement
1. **Lis** `DEPLOYMENT_CHECKLIST.md` → Steps exactes
2. **Push** sur Netlify → Auto-déploie
3. **Teste** sur le livesite
4. **Partage** le lien (ton app est public!)

### Day 4+: Maintenance
1. **Check** `CHANGELOG.md` si tu veux comprendre les changements
2. **Modifie** le code selon tes envies
3. **Git push** → Netlify redéploie automatiquement

---

## 🎓 Learning Path par Niveau

### Level 1: Casual User
```
QUICK_START.md    → 5 min
README.md         → 20 min
Total: 25 minutes
```

### Level 2: Dev interessé
```
QUICK_START.md    → 5 min
README.md         → 20 min
CODE_REFERENCE.md → 15 min
DIFFS.md          → 10 min
Total: 50 minutes
```

### Level 3: Advanced Developer
```
Tout ce qui est ci-dessus +
CODE_REFERENCE.md (deep dive) → 30 min
Code source (app.js, service-worker.js) → 45 min
Expérimenter localement → 60 min
Total: 3-4 heures
```

---

## 🔍 FAQ Rapide

### Q: Qu'est-ce qu'il y a dans `_archived/`?
**A**: Ancien code lié à l'IA (Coach IA) et setup complexe. Archivé mais conservé si besoin futur.

### Q: Puis-je réactiver le Coach IA?
**A**: Oui! Les fichiers sont dans `_archived/netlify/`. Voir `CHANGELOG.md` pour le contexte.

### Q: Où sont les changements majeurs v2.0?
**A**: Voir `DIFFS.md` pour avant/après code, ou `CHANGELOG.md` pour résumé.

### Q: Comment je déploie?
**A**: `DEPLOYMENT_CHECKLIST.md` - 5 étapes simples.

### Q: Les données sont où?
**A**: localStorage du navigateur. 100% client-side. Zéro cloud.

### Q: Ça marche offline?
**A**: Oui! Service Worker cache tout. Works even without internet.

---

## 📞 Quick Links

| Besoin | Fichier | Durée |
|--------|---------|-------|
| Commencer | QUICK_START.md | 5 min |
| Comprendre | README.md | 20 min |
| Détails tech | CODE_REFERENCE.md | 15 min |
| Voir diffs | DIFFS.md | 10 min |
| Déployer | DEPLOYMENT_CHECKLIST.md | 5 min |
| Historique | CHANGELOG.md | 10 min |
| Naviguer | INDEX.md (ce fichier) | 5 min |

---

## 🎯 Résumé une ligne par fichier

| Fichier | Contenu |
|---------|---------|
| **QUICK_START.md** | 60-sec setup + basic usage |
| **README.md** | Complete feature overview |
| **CODE_REFERENCE.md** | Technical deep dive |
| **DIFFS.md** | Before/After code snippets |
| **CHANGELOG.md** | What changed in v2.0 |
| **DEPLOYMENT_CHECKLIST.md** | Deploy to Netlify steps |
| **INDEX.md** | This navigation guide |

---

## 🚀 Next Steps

1. **Pick** un fichier de la table ci-dessus
2. **Read** basé sur ton niveau/besoin
3. **Explore** le code source après
4. **Modify** et **Deploy** quand tu es ready

---

## 💜 Dernière Chose

Shadow Muscle est:
- ✅ 100% Vanilla JS (0 frameworks)
- ✅ 0 dépendances npm
- ✅ Deployable en 1 click (Netlify)
- ✅ Complet et fully-functional
- ✅ Themé Solo Leveling epic

**You're ready to grind! Let's go! 🔥**

---

**Last updated**: Feb 15, 2026 | Version: 2.0 (Clean)
