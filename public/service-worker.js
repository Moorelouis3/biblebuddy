const CACHE_VERSION = "v3-2026-02-19";
const CACHE_NAME = `biblebuddy-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  // Add static asset paths here, e.g. '/icon.png', '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});
const CACHE_VERSION = "v4-2026-02-19";
const CACHE_NAME = `biblebuddy-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  // Add static asset paths here, e.g. '/icon.png', '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Network-first for navigation (HTML)
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(req)
        .then(res => {
          return res;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }
  // Cache-first for static assets
  if (STATIC_ASSETS.some(asset => req.url.endsWith(asset))) {
    event.respondWith(
      caches.match(req).then(res => res || fetch(req))
    );
    return;
  }
  // Default: just fetch
  event.respondWith(fetch(req));
});
