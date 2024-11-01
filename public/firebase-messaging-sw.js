importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCWRQFsPoPUH2UCNpjpmPzjYdWeDbE8gRk",
  authDomain: "manganotificationapp.firebaseapp.com",
  projectId: "manganotificationapp",
  storageBucket: "manganotificationapp.appspot.com",
  messagingSenderId: "952987087734",
  appId: "1:952987087734:web:9848642b9f8d7bda330057",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
