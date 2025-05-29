const CACHE_NAME = 'my-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/images/booking.png',
    '/images/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((cachedResponse) => {
            if(cachedResponse) {
                return cachedResponse; // Return cached response if available
            }
            return fetch(event.request).catch(() => {
                // Return index.html if network request fails
                return caches.match('/index.html');
            });
        })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if(cache !== CACHE_NAME) {
                        return caches.delete(cache); // Clean up old caches
                    }
                })
            );
        })
    );
});

// Late Long
// self.addEventListener('message', (event) => {
//     console.log("event", event)
//     // Check if the message contains location data
//     if (event.data && event.data.latitude && event.data.longitude) {
//         const { latitude, longitude } = event.data;
//         console.log(`Received location: Latitude: ${latitude}, Longitude: ${longitude}`);

//         // Handle the location data (e.g., store it, send it to a server, etc.)
//         // You could add your logic here, such as saving the coordinates.
//     }
// });

// Optionally handle fetch events
self.addEventListener('fetch', (event) => {
    // Handle fetch events here if needed
});

// notification
// Register the service worker

self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
    if (event.data) {
        event.data.json().then(data => {
            console.log('Push data:', data);
            const title = data.notification.title || 'Default Title';
            const options = {
                body: data.notification.body || 'Default body',
                // icon: 'icon.png', // Your icon URL
            };
            event.waitUntil(self.registration.showNotification(title, options));
        }).catch(err => {
            console.error('Failed to parse push data:', err);
        });
    } else {
        console.warn('No data in push event');
    }
});


self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        // clients.openWindow('https://your-url.com') // URL to open on notification click
        clients.openWindow(self.location.href)

    );
});


