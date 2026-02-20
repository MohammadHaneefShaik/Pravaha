import RegistrationModel from "../models/registration.js";
import EventModel from "../models/event.js";
import mailer from "../service/mailer.js";

const { sendPaymentApprovalMail, transactionRejectedMail } = mailer;

/* =========================
   GET ALL REGISTRATIONS
========================= */
export async function getAllRegistrations(req, res) {
  try {
    const registrations = await RegistrationModel.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: registrations,
    });
  } catch (err) {
    console.error("❌ Fetch registrations error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

/* =========================
   UPDATE PAYMENT STATUS
========================= */
export async function updatePaymentStatus(req, res) {
  try {
    const { registrationId, paymentStatus, email, fullName, eventName, transactionId } =
      req.body;

    if (!registrationId || !paymentStatus) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const updated = await RegistrationModel.findByIdAndUpdate(
      registrationId,
      { paymentStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }
    if (paymentStatus === "approved") {

      try {

        await sendPaymentApprovalMail({
          to: email,
          fullName,
          eventName,
          transactionId,
        });

        console.log("✅ Approval mail sent");

      }

      catch (mailErr) {

        console.error("❌ Approval Mail failed:", mailErr.message);

      }

    }

    else if (paymentStatus === "rejected") {

      try {

        await transactionRejectedMail({
          to: email,
          fullName,
          eventName,
          transactionId,
        });

        console.log("✅ Reject mail sent");

      }

      catch (mailErr) {

        console.error("❌ Reject Mail failed:", mailErr.message);

      }

    }


    return res.json({
      success: true,
      message: "Payment status updated successfully",
    });
  } catch (err) {
    console.error("❌ Update payment status error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

/* =========================
   REGISTER FOR EVENT (FIXED)
========================= */
export async function registerForEvent(req, res) {
  try {
    console.log("========== NEW REGISTRATION ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const data = req.body;
    const screenshot = req.file;

    /* ================= CHECK SCREENSHOT ================= */
    if (!screenshot) {
      console.log("❌ Screenshot missing");
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

    /* ================= CHECK REQUIRED FIELDS ================= */
    const requiredFields = [
      "fullName",
      "registerNumber",
      "email",
      "phoneNumber",
      "collegeName",
      "branch",
      "studyYear",
      "transactionId",
      "eventName",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`❌ Missing field: ${field}`);
        return res.status(400).json({
          success: false,
          message: `${field} is missing`,
        });
      }
    }

    /* ================= FIND EVENT ================= */
    console.log("Searching event:", data.eventName);

    const eventData = await EventModel.findOne({
      eventName: data.eventName,
    });

    console.log("Event found:", eventData);

    if (!eventData) {
      console.log("❌ Event not found in DB");
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    /* ================= CHECK TRANSACTION ================= */
    const txnExists = await RegistrationModel.findOne({
      transactionId: data.transactionId,
    });

    if (txnExists) {
      console.log("❌ Transaction already used");
      return res.status(400).json({
        success: false,
        message: "Transaction ID already used",
      });
    }

    /* ================= CHECK DUPLICATE REGISTRATION ================= */
    const alreadyRegistered = await RegistrationModel.findOne({
      email: data.email,
      eventId: eventData._id,
    });

    if (alreadyRegistered) {
      console.log("❌ User already registered");
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event",
      });
    }

    /* ================= SAVE REGISTRATION ================= */
    console.log("Saving registration...");

    const savedRegistration = await RegistrationModel.create({
      fullName: data.fullName,
      registerNumber: data.registerNumber,
      email: data.email,
      phone: data.phoneNumber,
      collegeName: data.collegeName,
      department: data.branch,
      year: data.studyYear,
      transactionId: data.transactionId,
      eventId: eventData._id,
      eventName: eventData.eventName,
      paymentScreenshot: screenshot.path,
      paymentScreenshotId: screenshot.filename,
      registrationStatus: "registered",
      paymentStatus: "pending",
    });

    console.log("✅ Registration saved:", savedRegistration);

    /* ================= SUCCESS RESPONSE ================= */
    return res.json({
      success: true,
      message: "Registration submitted for verification",
      data: savedRegistration,
    });

  } catch (err) {
    console.error("❌ Registration error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
