import express from "express";
import jwt from "jsonwebtoken";
import { fromNodeHeaders } from "better-auth/node";

import auth from "../lib/auth.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Create assignment JWT
 * JWT payload:
 * {
 *   userId: user._id
 * }
 */
router.post("/token", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = jwt.sign(
      {
        userId: session.user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "JWT token created successfully",
    });
  } catch (error) {
    console.error("JWT token creation failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create JWT token",
    });
  }
});

/**
 * Get current logged-in user
 * Protected route
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      return res.status(401).json({
        success: false,
        message: "User session not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: session.user,
    });
  } catch (error) {
    console.error("Get current user failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
});

/**
 * Logout
 * Clear assignment JWT cookie
 */
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

export default router;