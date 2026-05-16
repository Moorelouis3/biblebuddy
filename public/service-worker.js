const CACHE_VERSION = "v7-2026-05-16-mobile-shell";
const CACHE_NAME = `biblebuddy-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/offline.html",
  "/manifest.json",
  "/louis/NewNewBibleBuddyIcon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
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

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Network-first for navigation (HTML). This keeps the installed mobile app
  // from getting stuck on an old dashboard shell after a deploy.
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(req)
        .then(res => res)
        .catch(async () => {
          const offline = await caches.match('/offline.html');
          return offline || new Response("Bible Buddy is offline. Reconnect and try again.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        })
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

self.addEventListener("push", (event) => {
  const payload = event.data ? event.data.json() : {};
  const title = payload.title || "Bible Buddy";
  const body = typeof payload.body === "string" ? payload.body : "";
  const options = {
    body,
    icon: "/louis/NewNewBibleBuddyIcon.png",
    badge: "/louis/NewNewBibleBuddyIcon.png",
    data: {
      url: payload.url || "/dashboard",
      notificationId: payload.notificationId || null,
      type: payload.type || "notification",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }

      return undefined;
    })
  );
});
