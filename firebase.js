import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR0SNahrwbvHR5dAMdPHgzafPsROBOIJ0",
  authDomain: "campuscare-44431.firebaseapp.com",
  projectId: "campuscare-44431",
  storageBucket: "campuscare-44431.firebasestorage.app",
  messagingSenderId: "393260616938",
  appId: "1:393260616938:web:d7e1f199017a2e8ab59b93",
  measurementId: "G-7E3ETMBFNL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);