# 🚀 Guide de Déploiement - Shadow Muscle

Déploie ton app sur **Netlify** (gratuit, HTTPS automatique, auto-redeploy).

---

## Prérequis

- [ ] Compte GitHub (pour le repo)
- [ ] Compte Netlify (connexion GitHub gratuite)
- [ ] Code source poussé sur GitHub

---

## Étape 1: Prépare le repo local

```bash
# Make sure everything is committed
git add .
git commit -m "Initial Shadow Muscle commit"
git push
```

---

## Étape 2: Connecte à Netlify

### Option A : Via le site Netlify (plus simple)

1. Va sur https://app.netlify.com
2. Clique **"New site from Git"**
3. Sélectionne **GitHub**
4. Choisis ton repo `shadow-muscle`
5. Clique **"Deploy"**

Voilà! Netlify va:
- Détecter le `index.html`
- Servir l'app automatiquement
- Donner une URL : `shadow-muscle-xyz.netlify.app`
- Auto-redeploy à chaque `git push`

### Option B : CLI Netlify

```bash
npm install -g netlify-cli

netlify deploy --prod
```

---

## Étape 3: Vérifie la version live

1. Ouvre `https://ton-app.netlify.app`
2. Teste les missions
3. Teste les notifications (clique le bouton 🔔)
4. Installe sur mobile (menu navigateur → "Ajouter à l'écran d'accueil")

---

## Mise à jour (code changes)

Après avoir modifié le code:

```bash
git add .
git commit -m "feat: add new missions"
git push
```

**Netlify redéploie automatiquement en ~30 secondes** ✅

---

## Configuration personnalisée (optionnel)

Si tu veux un domaine custom:

1. Dans Netlify, va **Settings → Domain management**
2. Ajoute ton domaine custom (ou achète en via Netlify)
3. Configure le DNS

---

## 🔗 Ressources

- [Netlify Docs](https://docs.netlify.com/)
- [PWA - Web.dev](https://web.dev/progressive-web-apps/)
- [Service Workers - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

**That's it! Ton app est live. 🎉**
