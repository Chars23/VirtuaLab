// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7ip7ongnIi3BLv099U6v9QqjPNKGHBkk",
  authDomain: "virtualab-c7af9.firebaseapp.com",
  databaseURL: "https://virtualab-c7af9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "virtualab-c7af9",
  storageBucket: "virtualab-c7af9.appspot.com",
  messagingSenderId: "312682265130",
  appId: "1:312682265130:web:67f7c9053b203cadb06153",
  measurementId: "G-ETK5XLJDYC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
