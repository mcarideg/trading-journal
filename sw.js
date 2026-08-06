// sw-v4.js — sin caché (network-only). Cada carga va directo a red.
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => { clients.forEach(client => client.navigate(client.url)); })
  );
});

// Sin intercepción de fetch = todo va directo a red
