const CACHE_NAME = "v1";

const CACHE_ASSETS = [
    "../index.html",
    "../pictures.html",
    "./index.min.js",
    "./service/api.min.js",
    "../css/styles.min.css",
];

self.addEventListener("install", (e) => {
    console.log("Service worker installed");

    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (e) => {
    console.log("Service worker activated");

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Service worker clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (e) => {
    console.log("Service worker fetching");

    e.respondWith(
        fetch(e.request).catch(() => {
            console.log("Erro");
            caches.match(e.request);
        })
    );
});
