// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFo96n1i5TnduXvosY4rP1KP8nfTyLTQ8",
  authDomain: "mygames-72ae2.firebaseapp.com",
  databaseURL: "https://mygames-72ae2-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "mygames-72ae2",
  storageBucket: "mygames-72ae2.appspot.com",
  messagingSenderId: "495772620295",
  appId: "1:495772620295:web:92039a14e32d2e3a3f7ca2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);


