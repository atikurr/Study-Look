import express from "express";
import jwt from "jsonwebtoken";
import { fromNodeHeaders } from "better-auth/node";

import auth from "../lib/auth.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const isProduction =
  process.env.NODE_ENV === "production";

// ==========================================
// COOKIE OPTIONS
// ==========================================

const getCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});

// ==========================================
// CREATE JWT
// ==========================================

router.post("/token", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing.");

      return res.status(500).json({
        success: false,
        message: "JWT configuration is missing.",
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

    res.cookie(
      "token",
      token,
      getCookieOptions()
    );

    return res.status(200).json({
      success: true,
      message: "JWT token created successfully.",
    });
  } catch (error) {
    console.error(
      "JWT token creation failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create JWT token.",
    });
  }
});

// ==========================================
// GET CURRENT USER
// Protected by JWT
// ==========================================

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session?.user) {
        return res.status(401).json({
          success: false,
          message: "User session not found.",
        });
      }

      return res.status(200).json({
        success: true,
        user: session.user,
      });
    } catch (error) {
      console.error(
        "Get current user failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to get current user.",
      });
    }
  }
);

// ==========================================
// LOGOUT
// ==========================================

router.post(
  "/logout",
  async (req, res) => {
    try {
      // Clear our JWT cookie
      res.clearCookie(
        "token",
        getCookieOptions()
      );

      // Also sign out from Better Auth
      try {
        await auth.api.signOut({
          headers: fromNodeHeaders(
            req.headers
          ),
        });
      } catch (authError) {
        console.error(
          "Better Auth signout warning:",
          authError.message
        );
      }

      return res.status(200).json({
        success: true,
        message: "Logout successful.",
      });
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Logout failed.",
      });
    }
  }
);

export default router;