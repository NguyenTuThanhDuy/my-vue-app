import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

let messaging: Messaging;
if (typeof window !== "undefined") {
  messaging = getMessaging(firebaseApp);
}

const fetchAndSaveToken = async () => {
  try {
    let token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_KEY,
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting permission or token", error);
  }
};

export { messaging, fetchAndSaveToken };
