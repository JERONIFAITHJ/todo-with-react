// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7CqhjyqX4DyNlB813JjCPxdsfM2HzM04",
  authDomain: "todo-list-84b83.firebaseapp.com",
  projectId: "todo-list-84b83",
  storageBucket: "todo-list-84b83.appspot.com",
  messagingSenderId: "452772456417",
  appId: "1:452772456417:web:059b310e2977ef2a7b14a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
