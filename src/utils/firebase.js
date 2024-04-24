// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYbE7MZ4Z8MMHfTaXX37AnjnLBduX3a0o",
  authDomain: "drive-clone-a95d0.firebaseapp.com",
  projectId: "drive-clone-a95d0",
  storageBucket: "drive-clone-a95d0.appspot.com",
  messagingSenderId: "455013183337",
  appId: "1:455013183337:web:bef73bf3dca99e3913d7f8",
  measurementId: "G-XY7N21CXMK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
