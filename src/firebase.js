// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDddPdGt4sSSCPcSc-vmnL7KEii6c6GA0w",
  authDomain: "chat-bot-e3f77.firebaseapp.com",
  projectId: "chat-bot-e3f77",
  storageBucket: "chat-bot-e3f77.firebasestorage.app",
  messagingSenderId: "581200545222",
  appId: "1:581200545222:web:2fba7c2432dac357dd9ec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);