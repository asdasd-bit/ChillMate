const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user"><span>🧍</span> ${msg}</div>`;
  input.value = "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chillmate.github.io",
        "X-Title": "ChillMate"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are ChillMate, a friendly and caring chatbot that helps users feel better." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "⚠️ Sorry, I couldn't understand that.";
    chat.innerHTML += `<div class="bot"><span>🤖</span>: ${reply}</div>`;
  } catch (error) {
    console.error(error);
    chat.innerHTML += `<div class="bot"><span>🤖</span>: ❌ Something went wrong.</div>`;
  }
}
