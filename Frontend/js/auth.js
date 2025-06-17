// js/auth.js
import { auth, database } from "./firebase-config.js";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {ref,set} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

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
      window.location.href = "LandingP.html"; // redirect on login
    })
    .catch((error) => {
        // Only attempt login if it's a "user already exists" type of error
        if (error.code === "auth/email-already-in-use") {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              alert("Login successful!");
              window.location.href = "LandingP.html";
            })
            .catch((err) => {
              alert(`Login failed: ${err.message}`);
            });
        } else {
          alert(`Signup failed: ${error.message}`);
        }
      });
})