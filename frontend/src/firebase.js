// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfPk9G2SuesNl2gjHyipkgyNe6GkRRvts",
  authDomain: "image-gallery-56275.firebaseapp.com",
  projectId: "image-gallery-56275",
  storageBucket: "image-gallery-56275.appspot.com",
  messagingSenderId: "561182724228",
  appId: "1:561182724228:web:a319f51b60d001e8b772d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };