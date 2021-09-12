// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNx9AlpM8QdzSWBu-KECVYMaT5UA3rBR0",
  authDomain: "smart-shopping-list-8b219.firebaseapp.com",
  projectId: "smart-shopping-list-8b219",
  storageBucket: "smart-shopping-list-8b219.appspot.com",
  messagingSenderId: "860567892922",
  appId: "1:860567892922:web:1e1ba49dd56fabcfc06383",
  measurementId: "G-GG2J7EM9JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = firebase.firestore();

export { fb, firestore };
