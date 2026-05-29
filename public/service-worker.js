const CACHE_VERSION = "v15-2026-05-29-audio-streaming-fix";
const CACHE_NAME = `biblebuddy-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `biblebuddy-runtime-${CACHE_VERSION}`;
const MEDIA_CACHE_NAME = `biblebuddy-media-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/offline.html",
  "/manifest.json",
  "/NewNewNewIconNew.png",
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
      Promise.all(
        keys
          .filter(key => ![CACHE_NAME, RUNTIME_CACHE_NAME, MEDIA_CACHE_NAME].includes(key))
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data?.type === "CACHE_BIBLE_YEAR_OFFLINE") {
    const urls = Array.isArray(event.data.urls) ? event.data.urls.filter((url) => typeof url === "string") : [];
    const mediaUrls = Array.isArray(event.data.mediaUrls)
      ? event.data.mediaUrls.filter((url) => typeof url === "string" && !url.startsWith("/api/tts/bible-year/day/"))
      : [];
    event.waitUntil(
      Promise.all([
        caches.open(RUNTIME_CACHE_NAME).then((cache) =>
          Promise.allSettled(urls.map((url) => cache.add(new Request(url, { credentials: "same-origin" })))),
        ),
        caches.open(MEDIA_CACHE_NAME).then((cache) =>
          Promise.allSettled(mediaUrls.map((url) => cache.add(new Request(url, { credentials: "same-origin" })))),
        ),
      ])
    );
  }
  if (event.data?.type === "CLEAR_BIBLE_YEAR_OFFLINE") {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("biblebuddy-media-"))
            .map((key) => caches.delete(key)),
        ),
      ),
    );
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isBibleYearAudio = sameOrigin && url.pathname.startsWith("/api/tts/bible-year/day/");
  const isMediaAsset = /\.(mp3|m4a|aac|wav|ogg|mp4|webm)$/i.test(url.pathname);
  const isNextStatic = sameOrigin && url.pathname.startsWith("/_next/static/");
  const isStaticAsset =
    sameOrigin &&
    (isNextStatic || /\.(js|css|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname));

  // Network-first for navigation (HTML). This keeps the installed mobile app
  // from getting stuck on an old dashboard shell after a deploy.
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(req)
        .then(async (res) => {
          if (sameOrigin && res && res.ok) {
            const cache = await caches.open(RUNTIME_CACHE_NAME);
            cache.put(req, res.clone());
          }
          return res;
        })
        .catch(async () => {
          const cachedPage = await caches.match(req);
          if (cachedPage) return cachedPage;
          const cachedDashboard = await caches.match('/dashboard');
          if (cachedDashboard) return cachedDashboard;
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
  // Bible Year audio uses short-lived signed URLs behind the API route. Do not
  // cache the redirect response, or mobile playback can get stuck on stale media.
  if (isBibleYearAudio) {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first for app bundles and stable downloaded media.
  if (isStaticAsset || isMediaAsset) {
    const cacheName = isMediaAsset ? MEDIA_CACHE_NAME : RUNTIME_CACHE_NAME;
    event.respondWith(
      caches.open(cacheName).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        const response = await fetch(req);
        if (response && response.ok) {
          cache.put(req, response.clone());
        }
        return response;
      })
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
    icon: "/NewNewNewIconNew.png",
    badge: "/NewNewNewIconNew.png",
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
