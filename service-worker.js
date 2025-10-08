const CACHE_NAME = 'papa-games-cache-v1';
const urlsToCache = [
    '/',
    '/ruffle/ruffle.js',
    '/swfs/candyc.swf',
    '/swfs/jacksmith.swf',
    '/swfs/papasbakeria.swf',
    '/swfs/papasburgeria.swf',
    '/swfs/papascheeseria_102.swf',
    '/swfs/papascupcakeria.swf',
    '/swfs/papasdonuteria.swf',
    '/swfs/papasfreezeria.swf',
    '/swfs/papashotdoggeria.swf',
    '/swfs/papaspancakeria.swf',
    '/swfs/papaspastaria.swf',
    '/swfs/papaspizzeria_v2.swf',
    '/swfs/papasscooperia_v102.swf',
    '/swfs/papassushiria.swf',
    '/swfs/papastacomia.swf',
    '/swfs/papaswingeria.swf'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
