// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD1yM6n6HHB6iu2O5mIhLT77bkZEVI4YdE",
  authDomain: "learnloop-5f6fa.firebaseapp.com",
  projectId: "learnloop-5f6fa",
  storageBucket: "learnloop-5f6fa.firebasestorage.app",
  messagingSenderId: "720939358761",
  appId: "1:720939358761:web:e3bc37e3616ca818f75a38",
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)