// server.js
import 'dotenv/config';

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";
import aiRoutes from "./routes/ai.js"; // <-- AI Route Import

connectDB();

const app = express();

// CORS - Multiple Origins
const allowedOrigins = [
  'https://mmatradex.com',
  'https://www.mmatradex.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'x-admin-key']
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// SAARE ROUTES YAHAN AAYENGE (404 HANDLER SE PEHLE)
// ==========================================
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes); // <-- YE LINE YAHAN AAYEGI

app.get("/health", (req, res) => res.send("OK"));

app.get("/", (req, res) => {
  res.send("MMA Tradex LLP API is running.");
});

// ==========================================
// 404 ERROR HANDLER (SABSE LAST ME)
// ==========================================
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Allowed origins:`, allowedOrigins);
});