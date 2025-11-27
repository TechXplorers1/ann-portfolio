// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Gly16-gpe6kvweSq5OH3vLV0Nof2y7c",
  authDomain: "ann-portfolio-9940a.firebaseapp.com",
  projectId: "ann-portfolio-9940a",
  storageBucket: "ann-portfolio-9940a.firebasestorage.app",
  messagingSenderId: "60084508386",
  appId: "1:60084508386:web:a93cada97e2acfdf8f70bb",
  measurementId: "G-T458S452DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);