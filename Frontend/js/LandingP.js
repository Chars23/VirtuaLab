import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { app } from './firebase-config.js'; // Adjust path as needed

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Card click routing
  document.querySelectorAll(".os-card").forEach(card => {
    card.addEventListener("click", () => {
      const os = card.getAttribute("data-os");
      window.location.href = `/terminal/${os}`;
    });
  });

  // Chatbot toggle
  const chatbotToggle = document.getElementById("chatbot-toggle");
  chatbotToggle?.addEventListener("click", () => {
    const chatbotWindow = document.getElementById("chatbot-container");
    if (chatbotWindow) {
      chatbotWindow.style.display =
        chatbotWindow.style.display === "none" ? "block" : "none";
    } else {
      alert("Chatbot not yet loaded!");
    }
  });

  // Sidebar logic placeholder
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    alert("Sidebar logic goes here...");
  });

  // 🌙 Theme toggle
  const toggleBtn = document.getElementById("mode-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn?.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
