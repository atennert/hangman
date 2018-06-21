const CACHE_NAME = 'hangman-atennert-$npm_version$',
  ALL_CACHES: any = [ // need any here for includes
    CACHE_NAME
  ];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache: any) => {
        return cache.addAll([
          'index.html',
          'index.js',
          'style.css',
          'icon-192.png',
          'icon-512.png',
          'manifest.json'
        ]);
      })
  );
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames: string[]) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName.startsWith('hangman-atennert')
              && !ALL_CACHES.includes(cacheName);
          }).map((cacheName) => caches.delete(cacheName))
        );
      })
  );
});

self.addEventListener('fetch', (event: any) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('index.html'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
