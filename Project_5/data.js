const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");

// Load pesan dari localStorage bang
let messages = JSON.parse(localStorage.getItem("chat")) || [];
messages.forEach(msg => addMessage(msg.text, msg.type));

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  addMessage(text, "sent");
  saveMessage(text, "sent");

  messageInput.value = "";

  // simulasi bot bahlil
  setTimeout(() => {
    addMessage("Y", "received");
    saveMessage("Y", "received");
  }, 1000);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(text, type) {
  messages.push({ text, type });
  localStorage.setItem("chat", JSON.stringify(messages));
}

// Kirim pakai Enter (tombol enter)
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
