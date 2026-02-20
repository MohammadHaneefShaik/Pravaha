import { Router } from "express";
import Event from "../models/event.js";
import mongoose from "mongoose";
const router = Router();

// get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json({ success: true, data: events });
});

router.get("/:slug", async (req, res) => {
  console.log("DB NAME:", Event.db.name);
  console.log("COLLECTION:", Event.collection.name);
  console.log("SLUG RECEIVED:", req.params.slug);
  console.log("MONGO HOST:", mongoose.connection.host);

  const event = await Event.findOne({ slug: req.params.slug });

  console.log("EVENT FOUND:", event);

  if (!event) {
    return res.status(404).json({ success: false, message: "Event not found" });
  }

  res.json({ success: true, data: event });
});

export default router;
