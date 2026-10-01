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

// Allowed origins come from the CLIENT_URL environment variable
// (comma-separated). Localhost is always allowed for development.
const allowedOrigins = [
  ...(process.env.CLIENT_URL || "").split(","),
  "http://localhost:5173",
]
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Same-origin requests and tools like Postman send no Origin header
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Custom auth routes
app.use("/api/auth", authRoutes);

// Better Auth routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Room routes
app.use("/api/rooms", roomRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudyNook server is running",
  });
});

app.listen(PORT, () => {
  console.log(`StudyNook server running on port ${PORT}`);
});