const AI_API_URL = "https://icy-smoke-2b2c.vp5vy7g7db.workers.dev";
const AI_SESSION_KEY = "han-atlas-session-v2";

function getAiSessionId() {
  let id = localStorage.getItem(AI_SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(AI_SESSION_KEY, id);
  }
  return id;
}

window.HAN_ATLAS_AI = {
  async ask(messages) {
    const response = await fetch(`${AI_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-session-id": getAiSessionId()
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "AI жауабы алынбады.");
    return data.reply;
  }
};
