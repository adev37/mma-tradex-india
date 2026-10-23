import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// 1. Normal Contact Form Submit (Jo pehle se tha)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// 2. Admin Route: Saare messages dekhne ke liye
router.get("/messages", async (req, res) => {
  try {
    // Request header me se password nikalo
    const adminKey = req.headers["x-admin-key"];
    
    // Check karo ki password .env wale password se match kar raha hai ya nahi
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    // Saare messages fetch karo (latest sabse pehle)
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

export default router;