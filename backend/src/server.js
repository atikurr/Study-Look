import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import auth from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// ==========================================
// ALLOWED CORS ORIGINS
// ==========================================

const allowedOrigins = [
  ...(process.env.CLIENT_URL || "").split(","),
  "http://localhost:5173",
  "https://study-look.vercel.app",
]
  .map((origin) => origin.trim())
  .filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin
      // (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(
        "Blocked CORS origin:",
        origin
      );

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());
app.use(cookieParser());

// ==========================================
// CUSTOM AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// BETTER AUTH ROUTES
// ==========================================

app.all(
  "/api/auth/*splat",
  toNodeHandler(auth)
);

// ==========================================
// ROOM ROUTES
// ==========================================

app.use("/api/rooms", roomRoutes);

// ==========================================
// BOOKING ROUTES
// ==========================================

app.use("/api/bookings", bookingRoutes);

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudyNook server is running",
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `StudyNook server running on port ${PORT}`
  );
});