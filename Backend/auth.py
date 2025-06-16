// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7ip7ongnIi3BLv099U6v9QqjPNKGHBkk",
  authDomain: "virtualab-c7af9.firebaseapp.com",
  databaseURL: "https://virtualab-c7af9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "virtualab-c7af9",
  storageBucket: "virtualab-c7af9.firebasestorage.app",
  messagingSenderId: "312682265130",
  appId: "1:312682265130:web:67f7c9053b203cadb06153",
  measurementId: "G-ETK5XLJDYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);