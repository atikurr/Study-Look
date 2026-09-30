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

app.use(
  cors({
    origin: "http://localhost:5173",
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