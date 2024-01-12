import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDNbM61Lt7aEwuLD7ltUZ1oGsWMihi8wkQ",
  authDomain: "fir-auth-df758.firebaseapp.com",
  projectId: "fir-auth-df758",
  storageBucket: "fir-auth-df758.appspot.com",
  messagingSenderId: "233913889466",
  appId: "1:233913889466:web:3ff7f0cee260d581a38883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);