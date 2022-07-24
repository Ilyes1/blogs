// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANBP6TWo6pNrSjCcxXp7rOiFR0hVJpiFY",
  authDomain: "social-media-7a28f.firebaseapp.com",
  projectId: "social-media-7a28f",
  storageBucket: "social-media-7a28f.appspot.com",
  messagingSenderId: "808602809232",
  appId: "1:808602809232:web:c0f2de6f529af939923915",
  measurementId: "G-030KZNY8CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const storage = getStorage(app);