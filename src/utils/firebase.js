// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXXG9oTvFcaB13UQuzDLvJRKNL4tjHZPE",
  authDomain: "bigflixgpt.firebaseapp.com",
  projectId: "bigflixgpt",
  storageBucket: "bigflixgpt.firebasestorage.app",
  messagingSenderId: "926831134729",
  appId: "1:926831134729:web:7cf3da30cfa6b6f84250d8",
  measurementId: "G-N41YJEG28D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
