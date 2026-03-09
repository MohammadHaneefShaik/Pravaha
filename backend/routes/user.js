import express from "express";
import https from "https";
import http from "http";
const Router = express.Router();

import upload, { uploadAbstract } from "../middlewares/upload.js";
import {
    registerForEvent,
    getAllRegistrations,
    updatePaymentStatus,
    submitAbstract,
    submitPaperRegistration,
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
Router.post("/submitPaperRegistration", submitPaperRegistration);
Router.get("/checkAbstractStatus", checkAbstractStatus);
Router.post(
    "/completePayment",
    upload.single("screenshot"),
    completePayment
);

// Admin action — update abstract status
Router.post("/updateAbstractStatus", updateAbstractStatus);

// Proxy raw Cloudinary abstract file so browser can render it as PDF
// Uses https.get with redirect following — more reliable than fetch for Cloudinary raw URLs

function fetchAndPipe(url, res, redirectCount = 0) {
    if (redirectCount > 5) return res.status(502).send("Too many redirects");

    const client = url.startsWith("https") ? https : http;
    client.get(url, (cloudRes) => {
        // Follow redirects (Cloudinary raw files often 302 redirect)
        if ([301, 302, 303, 307, 308].includes(cloudRes.statusCode) && cloudRes.headers.location) {
            return fetchAndPipe(cloudRes.headers.location, res, redirectCount + 1);
        }

        if (cloudRes.statusCode !== 200) {
            return res.status(502).send("Failed to fetch file from Cloudinary");
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
        res.setHeader("Access-Control-Allow-Origin", "*");
        cloudRes.pipe(res);
    }).on("error", (err) => {
        console.error("❌ Abstract proxy error:", err.message);
        res.status(500).send("Proxy error");
    });
}

Router.get("/proxyAbstract", (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("Missing url");
    if (!url.startsWith("https://res.cloudinary.com/")) return res.status(403).send("Forbidden");

    fetchAndPipe(url, res);
});

export default Router;
