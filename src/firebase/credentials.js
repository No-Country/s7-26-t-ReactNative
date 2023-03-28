// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzhKKnOHwslR7tRmIPHGodYUkV0H4fF0c",
  authDomain: "app-torneo.firebaseapp.com",
  projectId: "app-torneo",
  storageBucket: "app-torneo.appspot.com",
  messagingSenderId: "695569550237",
  appId: "1:695569550237:web:2e3e825839616a0d62fd74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const mainCollection = "Users"
export const teamsCollection = "equipos"
export const tournamentCollection = "torneos"
export const playersCollection = "jugadores"
export const fixtureCollection = "fixture"
