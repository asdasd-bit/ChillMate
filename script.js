const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

async function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;

  // Show user message
  chat.innerHTML += `<div class="user">🧑: ${msg}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  // Show thinking...
  chat.innerHTML += `<div class="bot" id="typing">🤖: Thinking...</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
      "Content-Type": "application/json",
        "HTTP-Referer": "https://your-github-username.github.io/ChillMate_Chatbot/", // Update this
        "X-Title": "ChillMate"
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b:free", // Or try gpt-3.5:free if supported
        messages: [
          { role: "system", content: "You are ChillMate, a friendly mental health support bot." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await response.json();
    document.getElementById("typing").remove();

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't think of a reply.";
    chat.innerHTML += `<div class="bot">🤖: ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (error) {
    document.getElementById("typing").remove();
    chat.innerHTML += `<div class="bot">🤖: Error: ${error.message}</div>`;
  }
}
