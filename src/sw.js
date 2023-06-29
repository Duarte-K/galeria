let CACHE_NAME = "gallery";

let FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./css/styles.min.css",
    "./js/index.min.js",
    "./js/service/api.min.js",
];

self.addEventListener("install", (event) => {
    console.log("Service worker instalado");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    console.log("Service worker está realizou o fetch");
    event.respondWith(
        fetch(event.request).then((response) => {
            if (response) {
                return response;
            }

            return event.request;
        })
    );
});
