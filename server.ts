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
    const { taskTitle, taskCategory, verificationType, imageBase64, customPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided for validation" });
    }

    const ai = getAiClient();
    
    // Clean base64 string from data URI prefix
    const match = imageBase64.match(/^data:([^;]+);base64,(w*)/);
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const systemInstruction = `
      You are the AI Habit Guardian of the dynamic sandbox garden environment "Seasons & Habits".
      Your primary role is to audit uploaded images, watches, screens, or photos to verify whether they depict legitimate visual claims of completing specific task actions.
      
      You must be highly accurate but encouraging. Do not let users exploit or upload unrelated images (like random avatars, landscapes, stock photos, or walls) to cheat.

      Validation requirements for core tasks:
      1. "Daily Walk": The user must upload a screenshot of their steps on their phone or watch. Read the steps count text. It MUST show AT LEAST 5000 (5k) steps. If steps are missing or less than 5000, reject it with an explanation of how many steps you found.
      2. "Drink Water": The user must show a picture of them drinking water, holding a water cup/glass/bottle, or a water container actively being used. Verify if it is real/legitimate before approving.
      3. "Study Session" or "Reading": The user must upload a picture of written notes, open textbooks, highlighting, e-readers, educational summaries, code files, or paper progress. If it's a solid/blank page, reject.
      4. "Practice Instrument": The user must show a picture or active screenshot/camera capture of them playing a musical instrument (piano, violin, guitar, flute, brass, drums, etc.).
      5. "Coding": The user must upload a screenshot of an active coding editor, IDE (VSCode, PyCharm, etc.), terminal compiling scripts, github push screens, or programming code snippets.
      6. "Custom habits": Audit the image against the habit title "${taskTitle || "custom routine"}" and category "${taskCategory || "HEALTH"}". Ensure the image actually justifies this habit.

      Return JSON formatting with exact schema:
      {
        "success": boolean,
        "reason": "string"
      }
    `;

    const userPrompt = `
      Please verify the completion of this habit.
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
              description: "True if the visual proof is legitimate and complies with criteria (e.g. >=5k steps for Walk), false otherwise.",
            },
            reason: {
              type: Type.STRING,
              description: "A human-styled, motivating, explanation of your findings (max 120 characters). Mention what you analyzed, steps count if seen, why it was approved or why it was rejected.",
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
      success: true, // Fail-open to avoid locking gameplay during API transient errors
      reason: "API Connection issue, but we will let you harvest this habit! Keep up the good work!"
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
