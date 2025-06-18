import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwAZShJD4kX0ByrH71i2Gy5dEwSCeqzE0",
  authDomain: "eventgctu.firebaseapp.com",
  projectId: "eventgctu",
  storageBucket: "eventgctu.firebasestorage.app",
  messagingSenderId: "991450479105",
  appId: "1:991450479105:web:c52c6517c9da98bec89e00",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
