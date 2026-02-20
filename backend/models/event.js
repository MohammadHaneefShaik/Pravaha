import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    upiId: {
      type: String,
      required: true,
    },

    // ✅ NEW FIELD: Category
    category: {
      type: String,
      required: true,
      enum: ["technical", "non-technical"],
      lowercase: true,
    },

    // OPTIONAL: event type (optional sub classification)
    eventType: {
      type: String,
      enum: ["individual", "team"],
      default: "individual",
    },

    registeredUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "RegistrationModel",
      },
    ],
  },
  { timestamps: true }
);

export default model("Event", eventSchema, "events");
