/* global process */

const allowedScenarios = new Set(["restaurant", "bus", "shop", "hospital", "office"]);
const timeoutMs = 10000;
const modelName = "gemini-3.7-flash";


const systemInstruction = `You are a friendly, patient Kannada tutor for beginners.

The chosen scenario will be provided separately. Read the entire conversation and respond to the user's latest message, not an earlier message.

IMPORTANT BEHAVIOUR:
1. If the user asks a question, answer that question directly.
2. If the user asks what a Kannada phrase means, explain its meaning simply.
3. If the user says they do not understand, explain differently using easier words. Do not repeat the same explanation.
4. If the user answers during a roleplay, respond naturally as the other person in that scenario.
5. If the user greets you, respond to the greeting instead of asking an unrelated question.
6. If the user writes in English or Kannada transliteration, understand their intended meaning and respond appropriately.
7. If their Kannada is incorrect, gently correct it without discouraging them.
8. Never repeat the same reply or question unnecessarily. Remember what has already been discussed and make the next response relevant.
9. Ask a follow-up question only when it naturally continues the conversation.
10. Use simple, natural, spoken Kannada suitable for a beginner. Keep the response short and friendly.

Return valid JSON only, with exactly these fields:
{
  "kannada": "Your Kannada response",
  "transliteration": "Kannada written using English letters",
  "english": "The English meaning or explanation",
  "suggestions": [
    {"kannada": "...", "transliteration": "...", "english": "..."},
    {"kannada": "...", "transliteration": "...", "english": "..."},
    {"kannada": "...", "transliteration": "...", "english": "..."}
  ]
}

Suggestions must be three relevant, natural replies the learner could use next. Do not make all three suggestions identical or unrelated to the conversation.`;


function cleanResponse(value) {
  const fields = ["kannada", "transliteration", "english"];
  if (!value || typeof value !== "object" || !fields.every((field) => typeof value[field] === "string" && value[field].trim())) return null;
  if (!Array.isArray(value.suggestions) || value.suggestions.length !== 3 || !value.suggestions.every((item) => item && fields.every((field) => typeof item[field] === "string" && item[field].trim()))) return null;
  return {
    kannada: value.kannada.trim(),
    transliteration: value.transliteration.trim(),
    english: value.english.trim(),
    suggestions: value.suggestions.map((item) => ({ kannada: item.kannada.trim(), transliteration: item.transliteration.trim(), english: item.english.trim() })),
  };
}

function parseModelJson(text) {
  const stripped = text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  return cleanResponse(JSON.parse(stripped));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    console.error("[api/chat] Invalid JSON request body.");
    return res.status(400).json({ error: "Invalid JSON request body." });
  }
  const { scenario, messages, mode } = body || {};
  const validMessages = Array.isArray(messages) && messages.length > 0 && messages.length <= 20 && messages.every((message) =>
    message && ["user", "assistant"].includes(message.role) && typeof message.content === "string" && message.content.trim() && message.content.length <= 500
  );
  if (!allowedScenarios.has(scenario) || !validMessages || messages.at(-1)?.role !== "user" || (mode && mode !== "mission-rephrase")) {
    console.error("[api/chat] Rejected invalid request.", { scenario, messageCount: Array.isArray(messages) ? messages.length : 0, mode });
    return res.status(400).json({ error: "Please provide a valid scenario and conversation." });
  }
  if (!process.env.GEMINI_API_KEY) {
    console.error("[api/chat] GEMINI_API_KEY is not configured.");
    return res.status(503).json({ error: "AI practice is not configured yet." });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const contents = messages.map((message) => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: message.content.trim() }] }));
    if (contents[0]?.role !== "user") {
      contents.unshift({ role: "user", parts: [{ text: "Begin this beginner conversation naturally." }] });
    }
    const rephraseInstruction = mode === "mission-rephrase"
      ? " The user is requesting a simpler rephrase. Keep the exact meaning, make it shorter than the source line, and put only that alternate wording in the Kannada field."
      : "";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `${systemInstruction} The chosen scenario is: ${scenario}.${rephraseInstruction}` }] },
        contents,
        generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
      }),
    });
    if (!response.ok) {
  const errorBody = await response.text();

  console.error("[api/chat] Gemini request failed.", {
    modelName,
    status: response.status,
    statusText: response.statusText,
    details: errorBody
  });

  throw new Error(`Gemini request failed with status ${response.status}`);
}
    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
    if (!text) {
      console.error("[api/chat] Gemini returned no text candidate.", { modelName, finishReason: payload?.candidates?.[0]?.finishReason });
      throw new Error("Gemini returned no text");
    }
    const reply = parseModelJson(text);
    if (!reply) {
      console.error("[api/chat] Gemini returned JSON with an invalid reply shape.", { modelName });
      throw new Error("Gemini returned invalid JSON");
    }
    return res.status(200).json({ ...reply, source: "ai" });
  } catch (error) {
    console.error("[api/chat] AI reply failed.", { modelName, name: error?.name, message: error?.message });
    return res.status(502).json({
  error: "The AI tutor is temporarily unavailable. Please try again.",
  debug: error?.message || "Unknown error",
});
  } finally {
    clearTimeout(timer);
  }
}
