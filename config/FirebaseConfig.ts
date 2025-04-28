// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_i2natp3fsensKkXdkF8kKp5gFZ13rdg",
  authDomain: "myapp1-a9d69.firebaseapp.com",
  projectId: "myapp1-a9d69",
  storageBucket: "myapp1-a9d69.firebasestorage.app",
  messagingSenderId: "514642771084",
  appId: "1:514642771084:web:b6e0b4ad7253d552e2cfa9",
  measurementId: "G-6FBMF29JHS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

