// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyAHF2uMo65moutEWAHLVQiEOFe0csWAGPY',
  authDomain: 'lettuce-know.firebaseapp.com',
  projectId: 'lettuce-know',
  storageBucket: 'lettuce-know.appspot.com',
  messagingSenderId: '1093714899778',
  appId: '1:1093714899778:web:10a9da4aba7b9a01390edb',
  measurementId: 'G-35Q9CH23RW',
};

let fb = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { fb, firestore };
