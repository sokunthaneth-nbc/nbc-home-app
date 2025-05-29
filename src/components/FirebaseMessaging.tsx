'use client';

import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyD2w59Xvhvns-2Z8qneCjE8SMCZ2NmOLR4',
  authDomain: 'nbc-home.firebaseapp.com',
  projectId: 'nbc-home',
  storageBucket: 'nbc-home.firebasestorage.app',
  messagingSenderId: '220397166397',
  appId: '1:220397166397:web:98d0ea57acd7bed872af54',
  measurementId: 'G-C3YYMTH471',
};

export default function FirebaseMessaging() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Firebase Messaging SW registered:', registration);

          const requestPermissionAndGetToken = async () => {
            try {
              const permission = await Notification.requestPermission();
              if (permission === 'granted') {
                const currentToken = await getToken(messaging, {
                  vapidKey:
                    'BAP18EnXm-e0NH2-uQqDhHARflD-79alIVLNk5PU8lCUaZv83bUBU6iSVOvVUONgoEJga_pgWMvVyf7EmSJodqk',
                  serviceWorkerRegistration: registration,
                });
                if (currentToken) {
                  console.log('FCM Token:', currentToken);
                  setToken(currentToken);
                  navigator.clipboard?.writeText(currentToken); // optional
                } else {
                  console.log('No registration token available.');
                }
              } else {
                console.error('Notification permission denied.');
              }
            } catch (error) {
              console.error('Error getting token:', error);
            }
          };

          // Trigger token request
          requestPermissionAndGetToken();

          // Handle foreground messages
          onMessage(messaging, (payload) => {
            console.log('Foreground message received:', payload);
            if (Notification.permission === 'granted') {
              new Notification(payload.notification?.title || 'Notification', {
                body: payload.notification?.body,
                icon: payload.notification?.icon || '/icon.png',
              });
            }
          });
        })
        .catch((err) => {
          console.error('Service worker registration failed:', err);
        });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="mb-12 font-semibold text-2xl">
          Welcome to my Next.js PWA with Firebase Messaging
        </h1>
        <button
          onClick={() => Notification.requestPermission()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Subscribe to Notifications
        </button>
        <div className="mt-4">
          <span className="font-bold text-lg">FCM Token:</span>{' '}
          <span className="break-all">{token}</span>
        </div>
      </div>
    </div>
  );
}
