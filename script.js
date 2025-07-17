async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user">🧍‍♂️ ${msg}</div>`;
  chat.innerHTML += `<div class="bot" id="typing">🤖: Thinking...</div>`;
  chat.scrollTop = chat.scrollHeight;
  input.value = "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-username.github.io/ChillMate_Chatbot/",
        "X-Title": "ChillMate"
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b:free",
        messages: [
          { role: "system", content: "You are ChillMate, a friendly mental health support bot." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Something went wrong.";
    document.getElementById("typing").outerHTML = `<div class="bot">🤖: ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (error) {
    document.getElementById("typing").outerHTML = `<div class="bot">⚠️ Error: ${error.message}</div>`;
  }
}
