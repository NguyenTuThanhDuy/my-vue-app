import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCWRQFsPoPUH2UCNpjpmPzjYdWeDbE8gRk",
  authDomain: "manganotificationapp.firebaseapp.com",
  projectId: "manganotificationapp",
  storageBucket: "manganotificationapp.appspot.com",
  messagingSenderId: "952987087734",
  appId: "1:952987087734:web:9848642b9f8d7bda330057",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

const fetchAndSaveToken = async () => {
  try {
    let token = await getToken(messaging, {
      vapidKey:
        "BLFsDh_vgKniJ-u9BBMXHxEVas9D_hHPfjGWFlsOI9cKpYYKBRnf-OP1RBpAT5lQWacW-h9r5JrpxROABMH4c9I",
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting permission or token", error);
  }
};

export { messaging, fetchAndSaveToken };
