import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("studynook");

// CLIENT_URL can hold one or more comma-separated origins
const trustedOrigins = [
  ...(process.env.CLIENT_URL || "").split(","),
  "http://localhost:5173",
]
  .map((origin) => origin.trim())
  .filter(Boolean);

const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});

export default auth;