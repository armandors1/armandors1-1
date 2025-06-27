import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0MkcbzP4ygxaVgTxJckNP42J4YqvxFy0",
    authDomain: "login-56fda.firebaseapp.com",
    projectId: "login-56fda",
    storageBucket: "login-56fda.firebasestorage.app",
    messagingSenderId: "21549012582",
    appId: "1:21549012582:web:93c4020cfbc6741a877fa7",
    measurementId: "G-SVNXXJ2N4T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Aqui cria a instância do Firestore

export { app, auth, db };
