import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  const firebaseConfig = {
  apiKey: "AIzaSyCKGpfZelIXQcIzbDpYEDKwVqweRrkTJG8",
  authDomain: "wplace-b85eb.firebaseapp.com",
  projectId: "wplace-b85eb",
  storageBucket: "wplace-b85eb.firebasestorage.app",
  messagingSenderId: "856843206422",
  appId: "1:856843206422:web:706dedc03453d8643dda37",
  measurementId: "G-6N8X058CPH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
