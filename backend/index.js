import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";

import basicRoute from "./routes/basic.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import eventRoutes from "./routes/event.js";



const app = express();
const PORT = process.env.PORT || 5000;
/* ---------------------------------- */
/* FIX __dirname FOR ES MODULES */
/* ---------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------------------------- */
/* MIDDLEWARE */
/* ---------------------------------- */

app.set("trust proxy", 1);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

const corsOptions = {
   origin: [
    "https://pravaha-2k26.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

/* ---------------------------------- */
/* DB */
/* ---------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error(err));

/* ---------------------------------- */
/* API ROUTES */
/* ---------------------------------- */
app.use("/api/basic", basicRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/events", eventRoutes);

/* ---------------------------------- */
/* HEALTH CHECK */
/* ---------------------------------- */
app.get("/healthz", (req, res) => res.send("OK"));

/* ---------------------------------- */
/* SPA FALLBACK */
/* ---------------------------------- */
app.use((req, res) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.redirect("https://prvaha-2k26.vercel.app");
  }
  res.status(404).json({ success: false, message: "API route not found" });
});

console.log("ENV TEST:");
console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);


/* ---------------------------------- */
/* START SERVER (RENDER) */
/* ---------------------------------- 
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


