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
    year: { type: String },

    /* =====================
       MEMBER (TEAM) FIELDS
    ===================== */
    memberCount: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },

    member2: {
      fullName: { type: String },
      registerNumber: { type: String },
      phoneNumber: { type: String },
      email: { type: String },
      collegeName: { type: String },
      branch: { type: String },
      studyYear: { type: String },
    },

    /* =====================
       ABSTRACT (PAPER PRESENTATION)
    ===================== */
    abstractFile: { type: String },        // Cloudinary URL
    abstractFileId: { type: String },      // Cloudinary public_id
    abstractStatus: {
      type: String,
      enum: ["not_required", "pending", "accepted", "rejected"],
      default: "not_required",
    },

    /* =====================
       REGISTRATION STATUS
    ===================== */
    registrationStatus: {
      type: String,
      enum: ["registered", "cancelled", "attended"],
      default: "registered"
    },

    /* =====================
       PAYMENT FIELDS
       (optional — filled in step 2 for paper-presentation)
    ===================== */
    paymentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    transactionId: { type: String },   // duplicate check handled in controller
    paymentScreenshot: { type: String },
    paymentScreenshotId: { type: String },
  },
  { timestamps: true }
);

export default model("RegistrationModel", registrationSchema);
