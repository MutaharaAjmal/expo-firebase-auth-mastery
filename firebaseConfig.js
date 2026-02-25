import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const firebaseConfig = {
  apiKey: "AIzaSyAiPEarcpDqKtcws-qA1WHP4O8KGPvnrnc",
  authDomain: "fir-expo-project-2e43e.firebaseapp.com",
  projectId: "fir-expo-project-2e43e",
  storageBucket: "fir-expo-project-2e43e.firebasestorage.app",
  messagingSenderId: "844610579412",
  appId: "1:844610579412:web:40600c72c738c604aec441",
  measurementId: "G-4T62ZTGQCR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
GoogleSignin.configure({
  webClientId:
    "844610579412-534k6lnc7890h1vfddu0fqkqntsv2do9.apps.googleusercontent.com",
  offlineAccess: true,
});
export { GoogleSignin };
