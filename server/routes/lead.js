import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

// Lead save karne ka route
router.post("/", async (req, res) => {
  try {
    const { name, email, summary } = req.body;
    const newLead = new Lead({ name, email, summary });
    await newLead.save();
    res.status(201).json({ success: true, message: "Lead captured!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save lead." });
  }
});

// Admin ke liye leads fetch karne ka route
router.get("/", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;