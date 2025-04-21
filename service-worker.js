self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('ai-shop-cache').then((cache) => 
      cache.addAll(['./', './index.html', './cart.html'])
    )
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});