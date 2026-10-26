import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Gemini API Initialize
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fallback chain: Pehle fastest model, phir thoda powerful
const MODEL_CHAIN = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-2.5-flash"];

// 1. Purana Chat Route
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    let lastError = null;
    let replyText = null;

    for (const modelName of MODEL_CHAIN) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: "You are a professional AI assistant for MMA Tradex LLP. MMA Tradex develops proprietary AI tech, secures it under IPR, and monetizes it through Consultancy and Product Upgrades. Reply in the same language the user used (Hindi, English, or Hinglish). Keep replies short, helpful, and steer towards our AI & IPR consultancy."
        });
        const result = await model.generateContent(message);
        replyText = result.response.text();
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!replyText) throw lastError || new Error("All models failed");
    res.status(200).json({ reply: replyText });

  } catch (error) {
    res.status(500).json({ error: "AI is currently busy." });
  }
});

// 2. Naya Route: AI Project Estimator
router.post("/estimate", async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) return res.status(400).json({ error: "Project idea is required" });

    let lastError = null;
    let resultData = null;

    for (const modelName of MODEL_CHAIN) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: { 
            responseMimeType: "application/json" // <-- AI ko force kiya JSON format me reply karne ke liye
          }
        });

        const prompt = `
          You are a Senior Project Manager at MMA Tradex LLP (an AI & IPR consultancy).
          A client wants to build the following project: "${idea}"
          
          Provide a professional project estimate in STRICT JSON format. Do not use markdown.
          The JSON must have exactly these keys:
          {
            "projectName": "Short catchy name for the project",
            "overview": "2-3 line summary of how we will approach this",
            "timeline": "Estimated timeline (e.g., '8 - 12 Weeks')",
            "budget": "Estimated cost range in INR (e.g., '₹1,50,000 - ₹2,50,000')",
            "techStack": ["React", "Node.js", "MongoDB", "Gemini AI"], // array of 4-6 relevant technologies
            "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] // array of 4 core modules
          }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        
        // Parse the JSON string returned by AI
        resultData = JSON.parse(text);
        break; 
      } catch (error) {
        lastError = error;
      }
    }

    if (!resultData) throw lastError || new Error("All models failed");
    res.status(200).json({ estimate: resultData });

  } catch (error) {
    console.error("Estimator Error:", error);
    res.status(500).json({ error: "Failed to generate estimate. Please try again." });
  }
});

export default router;