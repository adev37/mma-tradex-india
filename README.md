# MMA Tradex LLP — MERN Website & AI Portal

A complete, production-ready full-stack web application for **MMA Tradex LLP**, an AI Technology Development and Intellectual Property Rights (IPR) consultancy firm. 

This platform goes beyond a standard business website by integrating real-time AI capabilities to help clients estimate projects, analyze IPR potential, and communicate seamlessly.

## 🚀 Key Features

*   **Modern UI/UX:** Built with React + Tailwind CSS, featuring a fully responsive design, Dark/Light mode toggle, and smooth scroll animations.
*   **AI Project Estimator:** Clients can describe their idea, and the Gemini AI generates a professional project scope, timeline, budget, and tech stack.
*   **AI IPR Analyzer:** Evaluates the novelty and patentability of an invention, providing a structured report.
*   **AI Smart Compose:** Enhances contact form messages into professional, polite emails.
*   **AI Chatbot:** A multilingual, voice-enabled AI assistant for instant queries.
*   **PDF Report Generation:** Clients can download their IPR analysis report as a professional PDF.
*   **Secure Admin Dashboard:** A hidden portal (accessible via logo double-click or `/admin` route) to view contact inquiries, AI chat leads, and IPR analysis summaries.
*   **Lead Management:** Captures user details and AI-generated chat summaries into MongoDB.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS (Custom Dark/Light Theme)
*   React Router DOM
*   jsPDF & html2canvas-pro (PDF Generation)
*   Web Speech API (Voice Input)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose
*   Google Gemini AI API (`@google/generative-ai`)
*   CORS, Dotenv

## 📁 Folder Structure
mma-tradex-india/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── components/
│ │ │ ├── layout/ # Header, Footer
│ │ │ ├── sections/ # Hero, WhatWeDo, Estimator, IprAnalyzer, etc.
│ │ │ └── ui/ # AIChatbot, Buttons, Cards
│ │ ├── hooks/ # useScrollAnimation
│ │ ├── pages/ # AdminDashboard
│ │ ├── theme.css # Custom Color Variables
│ │ └── App.jsx
└── server/ # Express backend
├── config/ # db.js
├── models/ # Contact.js, Lead.js
├── routes/ # contact.js, lead.js, ai.js
└── server.js

text

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/adev37/mma-tradex-india.git
cd mma-tradex-india
2. Backend Setup
bash
cd server
npm install
Create a .env file in the server directory:

env
PORT=10000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
ADMIN_SECRET_KEY=your_secret_admin_password
GEMINI_API_KEY=your_google_gemini_api_key
Run the backend:

bash
npm run dev
3. Frontend Setup
bash
cd ../client
npm install
Create a .env file in the client directory:

env
VITE_API_URL=http://localhost:10000
Run the frontend:

bash
npm run dev
🔒 Admin Access
Navigate to /admin route directly.

Or double-click the company logo on the homepage.

Enter the ADMIN_SECRET_KEY to access the dashboard.

Built with ❤️ for MMA Tradex LLP.