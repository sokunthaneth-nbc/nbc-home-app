importScripts(
    'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
  );
  
  // Initialize the Firebase app in the service worker by passing in
  firebase.initializeApp({
    apiKey: 'AIzaSyBx6qHD0SMEUWB002chHD8gh9Yg6QJ2oj8',
    authDomain: 'test-pwa-f4697.firebaseapp.com',
    projectId: 'test-pwa-f4697',
    storageBucket: 'test-pwa-f4697.appspot.com',
    messagingSenderId: '977535000083',
    appId: '1:977535000083:web:af1754cd67768b0d3fa9e6',
  });
  
  // Retrieve messages so that it can handle background
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(payload => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png',
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  