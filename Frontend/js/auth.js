// js/auth.js
import { auth, database } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const form = document.getElementById("auth-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form["email"].value;
  const phone = form["phone"].value;
  const password = form["password"].value;

  // If it's signup
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        email: email,
        phone: phone
      });

      alert("Signup successful!");
      window.location.href = "dashboard.html"; // redirect on login
    })
    .catch((error) => {
      // If account already exists, try logging in
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Login successful!");
          window.location.href = "dashboard.html";
        })
        .catch((err) => {
          alert(err.message);
        });
    });
});
