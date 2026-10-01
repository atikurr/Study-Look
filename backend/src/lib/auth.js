import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

dotenv.config();

// ==========================================
// MongoDB
// ==========================================

const client = new MongoClient(
  process.env.MONGODB_URI
);

const db = client.db("studynook");

// ==========================================
// Trusted Origins
// ==========================================

const trustedOrigins = [
  ...(process.env.CLIENT_URL || "").split(","),

  "http://localhost:5173",

  "https://study-look.vercel.app",
]
  .map((origin) => origin.trim())
  .filter(Boolean);

// Remove duplicate origins
const uniqueTrustedOrigins = [
  ...new Set(trustedOrigins),
];

// ==========================================
// Better Auth
// ==========================================

const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: uniqueTrustedOrigins,

  // ========================================
  // Email / Password Authentication
  // ========================================

  emailAndPassword: {
    enabled: true,
  },

  // ========================================
  // Google Authentication
  // ========================================

  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // ========================================
  // Production Cookie Settings
  // ========================================

  advanced: {
    useSecureCookies:
      process.env.NODE_ENV === "production",
  },
});

export default auth;