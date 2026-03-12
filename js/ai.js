// Gemini Developer API via Firebase AI Logic
import { app } from "./database.js";
import { auth } from "./database.js";
import { getAI, getGenerativeModel, GoogleAIBackend } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-ai.js";

// Initialize Gemini Developer API backend (uses API key from Firebase Console - do NOT add key to code)
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Model for text generation
const model = getGenerativeModel(ai, { model: "gemini-3-flash-preview" });

//gemini-3-flash-preview
//gemini-2.5-flash
//gemini-2.5-flash-lite

const generateTimestamps = [];
const requestWindowMs = 5 * 60 * 1000; // 5 minutes
const maxRequestsPerWindow = 2; // max 2 requests per 5 minutes per user

async function generateLinuxSuggestion() {
  // require user presence in localStorage
  if (!isUserStored()) {
    const outputEl = document.getElementById("ai-story");
    if (outputEl) {
      outputEl.innerText = "You must be logged in to generate suggestions.";
    }
    return;
  }

  const userId = localStorage.getItem('last_uid');
  if (!userId) {
    const outputEl = document.getElementById("ai-story");
    if (outputEl) {
      outputEl.innerText = "User ID not found.";
    }
    return;
  }

  const storageKey = `ai_requests_${userId}`;
  let requestData = JSON.parse(localStorage.getItem(storageKey)) || { count: 0, lastReset: 0 };

  const now = Date.now();

  // Reset count if window has passed
  if (now - requestData.lastReset > requestWindowMs) {
    requestData.count = 0;
    requestData.lastReset = now;
  }

  if (requestData.count >= maxRequestsPerWindow) {
    const outputEl = document.getElementById("ai-story");
    if (outputEl) {
      outputEl.innerText = "Rate limit exceeded ⚠️ Wait 5 minutes before trying again!";
    }
    return;
  }

  // Increment count
  requestData.count++;
  localStorage.setItem(storageKey, JSON.stringify(requestData));

  const outputEl = document.getElementById("ai-story");
  const inputEl = document.getElementById("ai-input");

  if (!outputEl) return;

  const userText = (inputEl?.value || "").trim();

  // Base instruction: only talk about Linux distros, be short
  const basePrompt =
    "You recommend Linux distributions. Only answer with Linux distro suggestions and maybe 1–2 reasons. " +
    "Keep the answer very short (maximum 2 short sentences). If the user ask for something that is not linux never answear.";

  const prompt = userText
    ? `${basePrompt}\nUser needs: ${userText}`
    : `${basePrompt}\nUser needs: beginner-friendly general-purpose desktop.`;

  try {
    outputEl.innerText = "Generating suggestion for you...";

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

// Wire up the Generate / Clear buttons after DOM is ready (script is loaded with defer)
// helpers to check login state
function isUserStored() {
  // we treat presence of last_uid as indication of logged-in user
  return !!localStorage.getItem('last_uid');
}

// disable/enable controls based on login state
function updateAIControls() {
  const loggedIn = isUserStored();
  if (generateBtn) generateBtn.disabled = !loggedIn;
  if (aiInputEl) aiInputEl.disabled = !loggedIn;
  if (clearBtn) clearBtn.disabled = !loggedIn;
  const outputEl = document.getElementById("ai-story");
  if (outputEl && !loggedIn) {
    outputEl.innerText = "Please login to use the AI suggestion feature.";
  }
}

const generateBtn = document.getElementById("ai-generate-btn");
const aiInputEl = document.getElementById("ai-input");
const clearBtn = document.getElementById("ai-clear-btn");

// run initial state
updateAIControls();

definition_wrapper: if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    generateLinuxSuggestion();
  });
}

if (aiInputEl) {
  aiInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      generateLinuxSuggestion();
    }
  });
}

if (clearBtn && aiInputEl) {
  clearBtn.addEventListener("click", () => {
    aiInputEl.value = "";
    aiInputEl.focus();
  });
}

// watch for changes to localStorage (login/logout) so we can update controls
window.addEventListener('storage', () => {
  updateAIControls();
});
