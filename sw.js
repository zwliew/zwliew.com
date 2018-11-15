// Version 1.1.2
const CACHE_NAME = 'zwliew';
const URLS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/src/styles.css',
  '/src/components/route-nav.js',
  '/src/components/article-summary.js',
  '/src/components/expandable-content.js',
  '/src/content.js',
  '/src/router.js',
  '/src/theme.js',
  '/src/eventBus.js',
  '/src/utils.js',
  '/img/profile.webp',
];

self.addEventListener('install', (event) => (
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  )
));

self.addEventListener('activate', (event) => (
  event.waitUntil(self.clients.claim())
));

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(event.request))
      .then(response => response || fetch(event.request))
  );
});
