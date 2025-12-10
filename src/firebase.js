// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "the-capsule-info340.firebaseapp.com",
  databaseURL: "https://the-capsule-info340-default-rtdb.firebaseio.com",
  projectId: "the-capsule-info340",
  storageBucket: "the-capsule-info340.appspot.com",
  messagingSenderId: "YOUR_SENDER",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
