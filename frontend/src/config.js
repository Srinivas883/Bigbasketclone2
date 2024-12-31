// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import {getAuth} from "firebase/auth" // import authentication power

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASb9wXhjDU2FvR7Iqz7gut8-uzcnoXwss",
  authDomain: "learnbasic-98bcc.firebaseapp.com",
  projectId: "learnbasic-98bcc",
  storageBucket: "learnbasic-98bcc.firebasestorage.app",
  messagingSenderId: "1057042383560",
  appId: "1:1057042383560:web:222625688c2d32523e5bfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app) // give authentication power to app

export default auth

