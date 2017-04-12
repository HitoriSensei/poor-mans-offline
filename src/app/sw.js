self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1')
            .then(function(cache) {
                return cache.addAll([
                    '/app/',
                    '/app/index.html',
                    '/app/style.css',
                    '/app/sw.js',
                    '/app/images/icon.png',
                    '/app/index.js'
                ]);
            })
            .then(() => {
                console.log("[sw loaded]")
            })
    );
});

self.addEventListener('fetch', function(event) {
    var response;
    console.log("[sw request]", event)
    event.respondWith(
        event.request.url.match(/localhost:3001/)
            ? fetch(event.request)
            : caches.match(event.request)
                .then(
                    (response) => {
                        console.log("[sw loaded from cache]", response)
                        return response
                    }
                )
                .catch(() => {
                    console.log("[sw asking web]", event)
                    return fetch(event.request)
                })
    );
});