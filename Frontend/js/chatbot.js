document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatLog = document.getElementById("chat-log");
    
    chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    
    javascript
    Copy
    Edit
    appendMessage("You", message);
    chatInput.value = "";
    
    try {
      const response = await fetch("/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    
      const data = await response.json();
      appendMessage("Bot", data.response);
    } catch (error) {
      console.error("Error contacting chatbot:", error);
      appendMessage("Bot", "Sorry, something went wrong.");
    }
    });
    
    function appendMessage(sender, message) {
    const bubble = document.createElement("div");
    bubble.className = sender === "You" ? "chat-msg user" : "chat-msg bot";
    bubble.innerHTML = <strong>${sender}:</strong>${message};
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    }
    });