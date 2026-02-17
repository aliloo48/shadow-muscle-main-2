const CACHE_NAME = 'shadow-muscle-v2';
const ASSETS = [
  './',              // important pour iOS/local
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './bg.svg'
];

// Installation : pré-cache tous les fichiers nécessaires
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW install - caching assets', CACHE_NAME);
      return cache.addAll(ASSETS);
    })
  );
  // iOS aime bien quand on active direct
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches et prise de contrôle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('SW activate - deleting old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch : offline-first pour nos fichiers
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Pour nos propres fichiers (même origine), servez d'abord le cache (cache-first)
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  // Pour les ressources externes : network-first then fallback to cache
  event.respondWith(
    fetch(request).then(res => {
      return res;
    }).catch(() => caches.match(request))
  );
});

// ===== WEB PUSH NOTIFICATIONS =====
self.addEventListener('push', event => {
  let notificationData = {
    title: '🤖 Shadow Muscle',
    body: 'Une nouvelle mission t\'attend, Combattant !',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'shadow-muscle-push',
    requireInteraction: false
  };

  // Si la notification contient des données JSON
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        title: data.title || notificationData.title,
        body: data.body || notificationData.body
      };
    } catch (e) {
      // Si ce n'est pas du JSON, utiliser le texte brut
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Gérer le clic sur la notification
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Si une fenêtre est déjà ouverte, la focus
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      // Sinon, ouvrir une nouvelle fenêtre
      return clients.openWindow('/');
    })
  );
});
