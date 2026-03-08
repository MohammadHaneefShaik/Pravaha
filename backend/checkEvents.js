import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Haneef:Shaneef%4009@cluster0.tpx1emv.mongodb.net/pravaha";
await mongoose.connect(MONGO_URI);

const db = mongoose.connection.db;
const events = await db.collection("events").find({}, { projection: { eventName: 1, slug: 1, _id: 0 } }).toArray();
const regNames = await db.collection("registrations").distinct("eventName");

const out = {
    events,
    registrationEventNames: regNames
};

process.stdout.write(JSON.stringify(out, null, 2) + "\n");
await mongoose.disconnect();
