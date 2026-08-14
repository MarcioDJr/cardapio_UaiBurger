const CACHE_NAME = 'uai-burger-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // Se você tiver arquivos CSS, imagens de lanches ou JS separados, adicione os nomes aqui também
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para carregar mais rápido
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrar, senão busca na internet
        return response || fetch(event.request);
      })
  );
});
