// Fixes event names in MongoDB to match frontend eventData.ts titles
// Run: node fixEventNames.js

import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Haneef:Shaneef%4009@cluster0.tpx1emv.mongodb.net/pravaha";
await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB\n");

const db = mongoose.connection.db;

// Mapping: slug → correct eventName (must match frontend eventData.ts titles exactly)
const slugToCorrectName = {
    "paper-presentation": "Paper Presentation",
    "poster-presentation": "Poster Presentation",
    "logo-design": "Logo Design",
    "technical-quiz": "Technical Quiz",
    "ev-spark": "EV Spark",
    "circuit-twisting": "Circuit Twisting",
    "project-expo": "Project Expo",
    "coding-competition": "Coding Competition",
};

// Update each event document by slug
for (const [slug, correctName] of Object.entries(slugToCorrectName)) {
    const result = await db.collection("events").updateOne(
        { slug: { $regex: `^${slug}$`, $options: "i" } },
        { $set: { eventName: correctName } }
    );
    if (result.matchedCount > 0) {
        console.log(`✅ Updated slug "${slug}"  →  "${correctName}"`);
    } else {
        console.log(`⚠️  Not found: slug "${slug}" — skipping`);
    }
}

// Also fix any existing registrations that used old names
const oldToNew = {
    "BATTLE OF IDEAZ": "Paper Presentation",
    "BLUE PRINT": "Poster Presentation",
    "LOGO CRAFT": "Logo Design",
    "TECHNOZEN": "Technical Quiz",
    "EV SPARK": "EV Spark",
    "CIRCUIT TWISTING": "Circuit Twisting",
    "PRAGMA": "Project Expo",
    "CODETHON": "Coding Competition",
};

console.log("\n--- Fixing registrations ---");
for (const [oldName, newName] of Object.entries(oldToNew)) {
    const r = await db.collection("registrations").updateMany(
        { eventName: oldName },
        { $set: { eventName: newName } }
    );
    if (r.matchedCount > 0) {
        console.log(`✅ Registrations: "${oldName}" → "${newName}" (${r.matchedCount} docs)`);
    }
}

console.log("\n✅ Done! All event names updated.");
await mongoose.disconnect();
