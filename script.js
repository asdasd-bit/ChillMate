
const apiKey = "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";
const chatBox = document.getElementById("chatBox");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message, "user");
  input.value = "";

  appendMessage("ChillMate", "Typing...", "bot");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openchat/openchat-3.5",
      messages: [
        { role: "system", content: "You are ChillMate, a cheerful and supportive chatbot who helps users feel better." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Oops! Something went wrong.";
  document.querySelector(".bot:last-of-type").textContent = "ChillMate: " + reply;
}

function appendMessage(sender, text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.textContent = sender + ": " + text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
