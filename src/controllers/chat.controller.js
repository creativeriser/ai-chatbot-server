import { getChatResponse } from "../services/gemini.service.js";

export async function handleChat(req, res) {
  const { message, history, image } = req.body;

  if ((!message || typeof message !== "string" || !message.trim()) && !image) {
    return res.status(400).json({ error: "Message or image is required." });
  }

  try {
    const reply = await getChatResponse(history || [], message, image);
    return res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return res.status(500).json({
      error: "Something went wrong while talking to Gemini. Check your API key and try again.",
    });
  }
}
