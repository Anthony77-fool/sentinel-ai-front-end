// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgeRbyDFFy8QsM0cE9FxsFzHwhhzwNzXw",
  authDomain: "sentinelai-8ed87.firebaseapp.com",
  projectId: "sentinelai-8ed87",
  storageBucket: "sentinelai-8ed87.firebasestorage.app",
  messagingSenderId: "1085095823252",
  appId: "1:1085095823252:web:80ccce5725498e3c4c7181",
  measurementId: "G-LNFQDZQ3B1"
};

// Initialize Firebase  
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//console.log("Data getting received from getAuth function: ", auth);

export const googleProvider = new GoogleAuthProvider();