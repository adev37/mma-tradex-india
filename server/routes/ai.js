import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Gemini API Initialize
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fallback chain: Pehle fastest model, phir thoda powerful
const MODEL_CHAIN = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-2.5-flash"];

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    let lastError = null;
    let replyText = null;

    // Har model ko ek-ek karke try karo
    for (const modelName of MODEL_CHAIN) {
      try {
        console.log(`🤖 Trying model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: "You are a professional AI assistant for MMA Tradex LLP. MMA Tradex develops proprietary AI tech, secures it under IPR, and monetizes it through Consultancy and Product Upgrades. Reply in the same language the user used (Hindi, English, or Hinglish). Keep replies short, helpful, and steer towards our AI & IPR consultancy."
        });

        const result = await model.generateContent(message);
        replyText = result.response.text();
        
        // Agar yahan tak pahunche, matlab model ne kaam kar diya
        console.log(`✅ Success with model: ${modelName}`);
        break; // Loop se bahar nikal jao

      } catch (error) {
        console.log(`❌ Model ${modelName} failed:`, error.message);
        lastError = error;
        // Agle model pe try karo
      }
    }

    // Agar saare models fail ho gaye
    if (!replyText) {
      throw lastError || new Error("All models failed");
    }

    res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({ error: "AI is currently busy. Please try again." });
  }
});

export default router;