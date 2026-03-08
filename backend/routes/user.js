import express from "express";
const Router = express.Router();

import upload, { uploadAbstract } from "../middlewares/upload.js";
import {
    registerForEvent,
    getAllRegistrations,
    updatePaymentStatus,
    submitAbstract,
    checkAbstractStatus,
    completePayment,
    updateAbstractStatus,
} from "../controllers/user.js";

// Existing routes
Router.get("/getRegistrations", getAllRegistrations);
Router.post("/updatePaymentStatus", updatePaymentStatus);
Router.post(
    "/sendRegistrationData",
    upload.single("screenshot"),
    registerForEvent
);

// Paper Presentation — Abstract flow (Step 1 & 2)
Router.post(
    "/submitAbstract",
    uploadAbstract.single("abstract"),
    submitAbstract
);
Router.get("/checkAbstractStatus", checkAbstractStatus);
Router.post(
    "/completePayment",
    upload.single("screenshot"),
    completePayment
);

// Admin action — update abstract status
Router.post("/updateAbstractStatus", updateAbstractStatus);

// Proxy raw Cloudinary abstract file so browser can render it as PDF
Router.get("/proxyAbstract", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("Missing url");

    // Only allow Cloudinary URLs
    if (!url.startsWith("https://res.cloudinary.com/")) {
        return res.status(403).send("Forbidden");
    }

    try {
        const response = await fetch(url);
        if (!response.ok) return res.status(502).send("Failed to fetch file");

        const buffer = await response.arrayBuffer();
        const bytes = Buffer.from(buffer);

        // Detect file type from URL extension
        const ext = url.split("?")[0].split(".").pop().toLowerCase();
        const mimeMap = { pdf: "application/pdf", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
        const contentType = mimeMap[ext] || "application/pdf";

        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", "inline");
        res.setHeader("Content-Length", bytes.length);
        res.send(bytes);
    } catch (err) {
        console.error("❌ Abstract proxy error:", err);
        res.status(500).send("Proxy error");
    }
});

export default Router;
