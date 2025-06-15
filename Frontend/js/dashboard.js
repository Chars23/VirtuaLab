document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".os-card");
    const chatbotToggle = document.getElementById("chatbot-toggle");
  
    // Launch terminal when a card is clicked
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const os = card.getAttribute("data-os");
        // Redirect to a dynamic terminal URL (or trigger socket)
        window.location.href = `/terminal/${os}`;
      });
    });
  
    // Chatbot toggle
    chatbotToggle.addEventListener("click", () => {
      const chatbotWindow = document.getElementById("chatbot-container");
      if (chatbotWindow) {
        chatbotWindow.style.display =
          chatbotWindow.style.display === "none" ? "block" : "none";
      } else {
        alert("Chatbot not yet loaded!");
      }
    });
  
    // (Optional) Sidebar toggle
    const menuBtn = document.querySelector(".menu-btn");
    menuBtn?.addEventListener("click", () => {
      alert("Sidebar logic goes here...");
      // You can expand this to open a real sidebar later
    });
  });
  