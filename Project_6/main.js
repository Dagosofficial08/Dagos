const chat = document.getElementById("cardChat");
const input = document.getElementById("message");
const btnSend = document.getElementById("sendBtn");

let messages = JSON.parse(localStorage.getItem("chat")) || [];

messages.forEach(msg => addMessage(msg));

btnSend.addEventListener("click", sendMessage)
input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    const userMessage = {
        text: text,
        sender: "user"
    }

    messages.push(userMessage);
    saveChat();
    addMessage(userMessage);

    input.value = "";

    setTimeout(() => {
        botReply(text);
    }, 1000)
}

function botReply(userText) {
    let reply;

    if (userText.toLowerCase().includes("halo")) {
        reply = "Apa coba?!";
    } else if (userText.toLowerCase().includes("apa kabarmu?")) {
        reply = "Baik aja, mwhehehe";
    } else if (userText.toLowerCase().includes("apa kegiatan?")) {
        reply = "Kayak biasa, nganggur. Nunggu 19 juta lapangan pekerjaan ngk nongol2 wkwkw";
    } else if (userText.toLowerCase().includes("wkwk semangatlah yah")) {
        reply = "Aman Bal";
    } else {
        reply = "Maksudnya?";
    }

    const botMessage = {
        text: reply,
        sender: "bot"
    }

    messages.push(botMessage);
    saveChat();
    addMessage(botMessage)
}

function saveChat() {
    localStorage.setItem("chat", JSON.stringify(messages));
}

function addMessage(msg) {
  const div = document.createElement("div");
  div.className = `message ${msg.sender}`;
  div.textContent = msg.text;
  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;
}
