self.addEventListener("install", event => {
    event.waitUntil(precache())
})

self.addEventListener("fetch", event => {
    const request = event.request
    //solo get
    if(request.method !== "GET"){
        return
    }

    //buscar en cache
    event.respondWith(cachedResponse(request))

    //update cache
    event.waitUntil(updateCache())

})

async function precache(){
    const cache = await caches.open("v1")
    return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/MediaPlayer.js',
        '/assets/plugins/AutoPause.ts',
        '/assets/plugins/AutoPlay.js',
        '/assets/index.css',
        '/assets/BigBuckBunny.mp4'
    ])
}

async function cachedResponse(request){
    const cache = await caches.open("v1")
    const response = await cache.match(request)

    return response || fetch(request)
}

async function updateCache(request){
    const cache = await caches.open("v1")
    const response = await fetch(request)

    return cache.put(request,response)
}