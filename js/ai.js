// Gemini Developer API via Firebase AI Logic
import { app } from "./database.js";
import { getAI, getGenerativeModel, GoogleAIBackend } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-ai.js";

// Initialize Gemini Developer API backend (uses API key from Firebase Console - do NOT add key to code)
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Model for text generation
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

async function generateLinuxSuggestion() {
  const outputEl = document.getElementById("ai-story");
  const inputEl = document.getElementById("ai-input");

  if (!outputEl) return;

  const userText = (inputEl?.value || "").trim();

  // Base instruction: only talk about Linux distros, be short
  const basePrompt =
    "You recommend Linux distributions. Only answer with Linux distro suggestions and maybe 1–2 reasons. " +
    "Keep the answer very short (maximum 2 short sentences).";

  const prompt = userText
    ? `${basePrompt}\nUser needs: ${userText}`
    : `${basePrompt}\nUser needs: beginner-friendly general-purpose desktop.`;

  try {
    outputEl.innerText = "Generating suggestion...";

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    outputEl.innerText = text || "No suggestion received. Try again.";
  } catch (error) {
    console.error("Error while calling AI:", error);
    outputEl.innerText =
      "AI error: " + (error.message || "Please check Firebase AI Logic configuration and try again.");
  }
}

// Wire up the Generate button after DOM is ready (script is loaded with defer)
const generateBtn = document.getElementById("ai-generate-btn");
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    generateLinuxSuggestion();
  });
}
