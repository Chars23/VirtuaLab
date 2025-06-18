import { auth, database } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';
// Login page interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate form inputs on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = 'none';
        });
    });
    // Form validation styling
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', handleLogin);
    form.addEventListener('submit', function(e) {
        const submitBtn = document.querySelector('.login-submit-btn');
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.innerHTML = 'Signing in...';
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 200);
    });
});
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

async function handleLogin(event) {
  event.preventDefault();

  const email = event.target.querySelector('input[type="email"]').value;
  const phone = event.target.querySelector('input[type="tel"]').value;
  const password = event.target.querySelector('input[type="password"]').value;

  if (!email || !phone || !password) {
    alert('Please fill in all fields');
    return;
  }

  const submitBtn = event.target.querySelector('.login-submit-btn');
  submitBtn.innerHTML = 'Signing in...';
  submitBtn.disabled = true;

  try {
    // Try to sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'LandingP.html';
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      try {
        // If user doesn't exist, create one
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save to Realtime Database
        await set(ref(database, 'users/' + user.uid), {
          email: email,
          phone: phone,
          createdAt: new Date().toISOString()
        });

        window.location.href = 'LandingP.html';
      } catch (signupError) {
        console.error(signupError);
        alert(signupError.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'SignUp/ Login';
      }
    } else {
      console.error(error);
      alert(error.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'SignUp/ Login';
    }
  }
}
