# MMA Tradex LLP — MERN Website

Full MERN stack version of the MMA Tradex LLP website (AI Technology Development / IPR).
Fully responsive React frontend + Express/MongoDB backend for the contact form.

## Structure

```
mma-tradex-mern/
├── client/          React app (Vite)
└── server/          Express + MongoDB API
```

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env    # then fill in your MongoDB URI
npm run dev              # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev               # starts on http://localhost:5173
```

The frontend calls `POST /api/contact` on the backend to store contact form
submissions in MongoDB. During local dev, Vite proxies `/api` calls to
`http://localhost:5000` (see `vite.config.js`).

## Environment variables (server/.env)

```
MONGO_URI=mongodb://127.0.0.1:27017/mma-tradex
PORT=5000
CLIENT_URL=http://localhost:5173
```

## Responsiveness

All layout is built with CSS Grid/Flexbox + `clamp()` for fluid type, and
breakpoints at 900px / 760px / 560px. No fixed pixel widths are used for
containers, so it works from small mobile screens up to large desktops.
