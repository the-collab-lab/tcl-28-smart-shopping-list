// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyCOq3qrkFz2XJK_-2kiUB-G3bhm1DxxLHo',
  authDomain: 'tcl-28-shopping-list.firebaseapp.com',
  projectId: 'tcl-28-shopping-list',
  storageBucket: 'tcl-28-shopping-list.appspot.com',
  messagingSenderId: '499603825685',
  appId: '1:499603825685:web:e1385df4cdcd43ec1a9a1c',
};

let fb = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { fb, firestore };
