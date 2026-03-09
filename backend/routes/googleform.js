import express from "express";
import RegistrationModel from "../models/registration.js";
import EventModel from "../models/event.js";

const Router = express.Router();

/* ============================================================
   POST /api/googleform/webhook
   Called by Google Apps Script onFormSubmit trigger.
   Payload: { email, eventName, fileUrl, responseId }
============================================================ */
Router.post("/webhook", async (req, res) => {
    try {
        const { email, eventName, fileUrl, responseId } = req.body;

        console.log("📋 Google Form webhook received:", req.body);

        // Basic validation
        if (!email || !fileUrl) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: email and fileUrl",
            });
        }

        // Deduplicate — ignore if we already processed this responseId
        if (responseId) {
            const alreadyProcessed = await RegistrationModel.findOne({
                googleFormResponseId: responseId,
            });
            if (alreadyProcessed) {
                console.log("⚠️ Duplicate form response, skipping:", responseId);
                return res.json({
                    success: true,
                    message: "Already processed",
                    duplicate: true,
                });
            }
        }

        // Find registration by email (and optionally eventName)
        const query = { email: email.toLowerCase().trim() };
        if (eventName) {
            // Try exact match first
            const eventData = await EventModel.findOne({ eventName });
            if (eventData) query.eventId = eventData._id;
        }

        // Find the most recent abstract-type registration for this email
        let registration = await RegistrationModel.findOne({
            email: email.toLowerCase().trim(),
            abstractStatus: { $in: ["pending", "not_required", "rejected"] },
        }).sort({ createdAt: -1 });

        if (!registration) {
            // Fallback: any registration for this email
            registration = await RegistrationModel.findOne({
                email: email.toLowerCase().trim(),
            }).sort({ createdAt: -1 });
        }

        if (!registration) {
            console.log("❌ No registration found for:", email);
            return res.status(404).json({
                success: false,
                message: "No registration found for this email. Please register first on the website.",
            });
        }

        // Update the registration with the Google Drive file URL
        registration.googleFormFileUrl = fileUrl;
        if (responseId) registration.googleFormResponseId = responseId;

        // If abstract was "not_required", upgrade to "pending" so admin can review
        if (
            registration.abstractStatus === "not_required" ||
            !registration.abstractStatus
        ) {
            registration.abstractStatus = "pending";
        }

        await registration.save();

        console.log(
            "✅ Google Form file linked to registration:",
            registration._id,
            "→",
            fileUrl
        );

        return res.json({
            success: true,
            message: "Form response linked to registration successfully",
            registrationId: registration._id,
        });
    } catch (err) {
        console.error("❌ Google Form webhook error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
});

export default Router;
