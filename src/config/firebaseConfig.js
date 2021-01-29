import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB8AS5DygKVAgOoD2bfsKBg3YxeAJFBOl8",
  authDomain: "bunnyworld-b439a.firebaseapp.com",
  projectId: "bunnyworld-b439a",
  storageBucket: "bunnyworld-b439a.appspot.com",
  messagingSenderId: "544559857649",
  appId: "1:544559857649:web:fceea184c7bd9e5f398e50",
  measurementId: "G-PYP8MNSL0P"
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
