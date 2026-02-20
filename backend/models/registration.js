import { Schema, model } from "mongoose";

const registrationSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    registerNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    collegeName: { type: String, required: true },

    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    eventName: { type: String, required: true },
    department: { type: String },
    //year: { type: Number, min: 1, max: 5 },
     // 🔁 changed from Number to String
    year: { type: String },

    registrationStatus: {
      type: String,
      enum: ["registered", "cancelled", "attended"],
      default: "registered"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },

    transactionId: { type: String, unique: true },

    paymentScreenshot: { type: String, required: true },
    paymentScreenshotId: { type: String, required: true }
  },
  { timestamps: true }
);

export default model("RegistrationModel", registrationSchema);
