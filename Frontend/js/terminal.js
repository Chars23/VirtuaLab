document.addEventListener("DOMContentLoaded", () => {
    const osCards = document.querySelectorAll(".os-card");
    const term = new Terminal();
    term.open(document.getElementById("terminal"));
  
    let socket;
  
    osCards.forEach((card) => {
      card.addEventListener("click", () => {
        const osType = card.getAttribute("data-os");
  
        if (socket) {
          socket.disconnect();
        }
  
        fetch(`/start-terminal?os=${osType}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to start terminal");
            return res.json();
          })
          .then((data) => {
            socket = io(`/ws/${data.session_id}`);
  
            socket.on("connect", () => {
              term.write(`\r\nConnected to ${osType}...\r\n`);
            });
  
            socket.on("terminal-output", (msg) => {
              term.write(msg);
            });
  
            term.onData((input) => {
              socket.emit("terminal-input", input);
            });
          })
          .catch((err) => {
            term.write(`\r\nError: ${err.message}\r\n`);
          });
      });
    });
  });
  