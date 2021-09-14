const staticCacheName = 'static-cache-v1';
const imageCacheName = 'image-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';

const staticAssets = [
    './',
    './index.html',
    './style.css',
    './icon.png',
    './image-placeholder.png',
    './favicon.ico',
    './index.min.js',
    './manifest.json',
];

self.addEventListener('install', async () => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async () => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    if (event.request.destination === 'image' && event.request.url.includes('userapi.com')) {
        event.respondWith(imageCache(event.request));
    } else {
        if (event.request.url.includes('api.vk.com/method/')) {
            event.respondWith(networkFirst(event.request));
        } else {
            event.respondWith(cacheFirst(event.request));
        }
    }
});

async function networkFirst(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const networkResponse = await fetch(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (e) {
        return cache.match(req)
    }
}

async function imageCache(req) {
    const cache = await caches.open(imageCacheName);
    const cachedResponse = await cache.match(req);
    if (cachedResponse) return cachedResponse;
    try {
        const networkResponse = await fetch(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    }
    catch (error) {console.error(`Failed to fetch ${req.url}`)}
}

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    try {return await fetch(req)}
    catch (error) {console.error(`Failed to fetch ${req.url}`)}
}