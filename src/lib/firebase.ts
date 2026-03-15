import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD5IQ3tw9B4Qq5W2-GKd4EnxMOVqS31Nyw",
  authDomain: "safelink-88497.firebaseapp.com",
  projectId: "safelink-88497",
  storageBucket: "safelink-88497.firebasestorage.app",
  messagingSenderId: "622268402787",
  appId: "1:622268402787:web:26a5467a89887cb265fc56",
  measurementId: "G-04MQREPT88",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
