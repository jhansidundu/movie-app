// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBtQ2qKd7JNybgU5QbfyyRUDkETGCCCVU",
  authDomain: "fir-one-c9ab9.firebaseapp.com",
  projectId: "fir-one-c9ab9",
  storageBucket: "fir-one-c9ab9.appspot.com",
  messagingSenderId: "893507556200",
  appId: "1:893507556200:web:b041f34b1db97e6bd5fcdd",
  measurementId: "G-SPV76QT7KE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
