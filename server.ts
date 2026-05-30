import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up json parser with a high limit for base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Lazy init of Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI features might fail.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "placeholder",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

/**
 * API: Calculate Habit worth / rewards
 * Based on title, category, verification type, target
 * Returns rewardCoins, rewardXp, and a beautiful personalized subtitle
 */
app.post("/api/habits/calculate-reward", async (req, res) => {
  try {
    const { title, category, verificationType, target } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const ai = getAiClient();
    const prompt = `
      You are the game designer of gamified Habit RPG system "Seasons & Habits".
      The user is creating a custom habit. You must reward coins and XP proportional to the task difficulty, its category, target repetition, and verification type.
      
      User's Custom Habit request:
      - Title: "${title}"
      - Category: "${category || "HEALTH"}"
      - Verification Method: "${verificationType || "image"}"
      - Target Repetitions per day: ${target || 1}

      Balance Principles:
      - rewardCoins should be between 30 and 300.
      - rewardXp should be between 10 and 100.
      - Image or video validation requires visual work, so reward more coins/XP than a basic timer.
      - Higher targets (e.g. 5x progress) should scale up the single-action value cleanly.
      - Return a descriptive, inspiring, or atmospheric "subtitle" (maximum 40 characters) that tells the user how this helps their virtual garden / personal growth, utilizing high-quality tone (e.g. "Water the mind's sprouting thoughts", "Nourish your inner strength").

      Respond with formal JSON conforming to the structure:
      {
        "rewardCoins": number,
        "rewardXp": number,
        "subtitle": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rewardCoins: {
              type: Type.INTEGER,
              description: "Proportional coin payout, 30 to 300.",
            },
            rewardXp: {
              type: Type.INTEGER,
              description: "Proportional XP reward, 10 to 100.",
            },
            subtitle: {
              type: Type.STRING,
              description: "A motivating, custom subtitle under 45 characters.",
            }
          },
          required: ["rewardCoins", "rewardXp", "subtitle"],
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in reward calculation:", error);
    // Fallback safe values to prevent blocking
    res.json({
      rewardCoins: 50,
      rewardXp: 15,
      subtitle: "Personal custom habit routines"
    });
  }
});

/**
 * API: Verify Habit with AI
 */
app.post("/api/habits/verify", async (req, res) => {
  try {
    const { taskTitle, taskCategory, verificationType, imageBase64, isSandboxPreset, presetExpectedType, customPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided for validation" });
    }

    // 1. Sandbox Preset Bypass Handler (for instant high-reliability visual test sandbox consistency)
    if (isSandboxPreset) {
      if (presetExpectedType === "valid") {
        return res.json({
          success: true,
          reason: `[Sandbox Approved] Legitimate proof confirmed for "${taskTitle}". Visual elements match criteria perfectly!`
        });
      } else {
        return res.json({
          success: false,
          reason: `[Sandbox Rejected] Insufficient proof for "${taskTitle}". The steps count or activity context does not meet rules.`
        });
      }
    }

    const ai = getAiClient();
    
    // Clean base64 string from data URI prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const systemInstruction = `
      You are the highly sophisticated, un-bypassable AI Habit Guardian of the sandbox garden "Seasons & Habits".
      Your absolute mandate is to perform strict, genuine auditing of user uploaded images, photos, and screenshots.
      
      CRITICAL AUDITING DIRECTIVES:
      1. You must be completely skeptical and accurate. Do NOT let users cheat. If the image is a solid color block, a blank colored square, a simple gradient, a landscape, or a random object (e.g., uploading a wall, a single leaf, a generic illustration, a cat, or keyboard for a step counter), you MUST REJECT it immediately.
      2. If you are unsure or the image is ambiguous, default to REJECTED. Only approve when there is active visual evidence of the specific task action.

      STRICT HARVEST REQUIREMENT CHECKS:
      - "Daily Walk" / "Walk": Look explicitly for step counter text panels, health dashboards, smartwatch displays (Apple Health, Fitbit, Garmin) with clear numerals. Read the numbers carefully. It MUST display AT LEAST 5000 (5,000) steps. If steps are missing or less than 5000, reject it. You must specify the steps you found in the reason.
      - "Drink Water" / "Water": Look for a glass, jar, container, or bottle with water, or someone drinking. Reject plain graphics, scenery, or general unrelated shots.
      - "Study Session" / "Reading": Look for visible words, printed sheets, highlighting, reading glasses, code editors, or learning progress. If it is high-contrast texture or solid colors, reject.
      - "Practice Instrument": Look for instruments (acoustic/electric guitars, keyboards, drums, flutes, etc.). Reject if no musical equipment is present.
      - "Coding" / "Code": Look for code formatting (numbered line lanes, keyword syntaxes, code tags, programming editor windows). Reject any standard text or terminal screen without lines of code.
      - For custom routines of other categories: The image must provide active visual justification validating the specific activity described by "${taskTitle || "custom routine"}".

      Return JSON formatting with exact schema:
      {
        "success": boolean,
        "reason": "string"
      }
    `;

    const userPrompt = `
      Evaluate this visual upload very strictly.
      - Habit Title: "${taskTitle}"
      - Habit Category: "${taskCategory}"
      - Verification Type: "${verificationType}"

      Additional instructions:
      ${customPrompt || "Check if the image legitimately matches the habit category and title guidelines."}
    `;

    const imagePart = {
      inlineData: {
        mimeType: "image/png",
        data: cleanBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, userPrompt],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            success: {
              type: Type.BOOLEAN,
              description: "True if visual validation is strictly met, false otherwise.",
            },
            reason: {
              type: Type.STRING,
              description: "Detailed, motivating, explanation of findings (max 120 characters). Mention seen steps/items and the exact reason for passing or failing.",
            },
          },
          required: ["success", "reason"],
        },
      },
    });

    const parsedResult = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedResult);
  } catch (error: any) {
    console.error("Error in image verification:", error);
    res.json({
      success: false,
      reason: "Visual capture analysis timed out or could not parse. Please try uploading a clearer, higher-resolution photo!"
    });
  }
});

// Vite Setup / Production serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
