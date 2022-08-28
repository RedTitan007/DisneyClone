// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKhg8t-hUE15V2yo8M_6g6q3nSjG4ddxs",
  authDomain: "disneyplus-hotstar-clone-eab89.firebaseapp.com",
  projectId: "disneyplus-hotstar-clone-eab89",
  storageBucket: "disneyplus-hotstar-clone-eab89.appspot.com",
  messagingSenderId: "923623237210",
  appId: "1:923623237210:web:0c442efb09195251581a63",       
  measurementId: "G-91SVEXPLHN",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); /* To Import Database */
const auth = getAuth(firebaseApp);
const provider =new GoogleAuthProvider(); /* To Get the Popup */
const storage = getStorage(firebaseApp); /* To import Storage like images,videos */

export { auth, provider, storage,signInWithPopup, GoogleAuthProvider };

export default db;
