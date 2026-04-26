// Service Worker - giver offline-evne til app-skallen
const CACHE = 'elpris-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // Network first for API calls (vi vil altid have friske priser)
  if (e.request.url.includes('elprisenligenu.dk')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // Cache first for app-skallen
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
