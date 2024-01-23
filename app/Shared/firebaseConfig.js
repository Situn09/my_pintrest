// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
  authDomain: "printrest-583a8.firebaseapp.com",
  projectId: "printrest-583a8",
  storageBucket: "printrest-583a8.appspot.com",
  messagingSenderId: "423385614190",
  appId: "1:423385614190:web:bf95033005d2114dfe237f",
  measurementId: "G-SGCNGRTGT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;