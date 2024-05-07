// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJL6ePiv4EdzpqfJOe61erF69QApe7hXE",
  authDomain: "toy-dazzle.firebaseapp.com",
  projectId: "toy-dazzle",
  storageBucket: "toy-dazzle.appspot.com",
  messagingSenderId: "138489724000",
  appId: "1:138489724000:web:79cdeb8aa92a2e3ece1705",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

const auth = getAuth(app);

export { auth, fireDB };
