const socket = io("http://localhost:3000");
const chat = document.getElementById("cardChat");
const input = document.getElementById("message");
const btnSend = document.getElementById("sendBtn");

let messages = JSON.parse(localStorage.getItem("chat")) || [];
messages.forEach(msg => addMessage(msg));

// Dengar chat baru dari server
socket.on("new-message", (msg) => {
  addMessage(msg);
  messages.push(msg);
  saveChat();
});

// Kirim pesan
btnSend.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

    const userMessage = { text, sender: "user", time };
    addMessage(userMessage);       // tampil di UI
    messages.push(userMessage);    // simpan di localStorage
    saveChat();

    input.value = "";

    // Kirim ke server
    socket.emit("send-message", { text, sender: "user", time });

    // Bot reply (opsional, bisa server handle)
    setTimeout(() => botReply(text), 500);
}

function botReply(userText) {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

    let reply;
    if (userText.toLowerCase().includes("halo")) reply = "Halo juga, raffi...";
    else if (userText.toLowerCase().includes("apa kabarmu?")) reply = "Baik aja, mwhehehe";
    else reply = "Maksudnya?";

    const botMessage = { text: reply, sender: "bot", time };
    addMessage(botMessage);
    messages.push(botMessage);
    saveChat();

    // Bisa juga emit ke server kalau mau semua client lihat bot
    socket.emit("send-message", botMessage);
}

function saveChat() {
    localStorage.setItem("chat", JSON.stringify(messages));
}

function addMessage(msg) {
    const div = document.createElement("div");
    div.className = `message ${msg.sender}`;

    const texts = document.createElement("span");
    texts.className = "text";
    texts.textContent = msg.text;

    const times = document.createElement("span");
    times.className = "time";
    times.textContent = msg.time || "";

    div.appendChild(texts);
    div.appendChild(times);
    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}
