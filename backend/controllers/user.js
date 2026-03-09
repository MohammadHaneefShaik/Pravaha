import RegistrationModel from "../models/registration.js";
import EventModel from "../models/event.js";
import mailer from "../service/mailer.js";

const { sendPaymentApprovalMail, transactionRejectedMail, abstractAcceptedMail, abstractRejectedMail } = mailer;

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

    // Collect all member emails to notify
    const emailTargets = [{ to: email, fullName }];
    if (updated.member2?.email) {
      emailTargets.push({ to: updated.member2.email, fullName: updated.member2.fullName || fullName });
    }

    if (paymentStatus === "approved") {
      for (const target of emailTargets) {
        try {
          await sendPaymentApprovalMail({
            to: target.to,
            fullName: target.fullName,
            eventName,
            transactionId,
          });
          console.log(`✅ Approval mail sent to ${target.to}`);
        } catch (mailErr) {
          console.error("❌ Approval Mail failed:", mailErr.message);
        }
      }
    } else if (paymentStatus === "rejected") {
      for (const target of emailTargets) {
        try {
          await transactionRejectedMail({
            to: target.to,
            fullName: target.fullName,
            eventName,
            transactionId,
          });
          console.log(`✅ Reject mail sent to ${target.to}`);
        } catch (mailErr) {
          console.error("❌ Reject Mail failed:", mailErr.message);
        }
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
   REGISTER FOR EVENT (SINGLE-STEP, non-paper-presentation)
========================= */
export async function registerForEvent(req, res) {
  try {
    console.log("========== NEW REGISTRATION ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const data = req.body;
    const screenshot = req.file;

    if (!screenshot) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

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
        return res.status(400).json({
          success: false,
          message: `${field} is missing`,
        });
      }
    }

    const eventData = await EventModel.findOne({ eventName: data.eventName });
    if (!eventData) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const txnExists = await RegistrationModel.findOne({ transactionId: data.transactionId });
    if (txnExists) {
      return res.status(400).json({ success: false, message: "Transaction ID already used" });
    }

    const alreadyRegistered = await RegistrationModel.findOne({
      email: data.email,
      eventId: eventData._id,
    });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "You are already registered for this event" });
    }

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
      abstractStatus: "not_required",
      teamName: data.teamName || undefined,  // project title for Project Expo
      // Member 2 (for team events other than paper-presentation)
      memberCount: data.member2_fullName ? 2 : 1,
      member2: data.member2_fullName
        ? {
          fullName: data.member2_fullName,
          registerNumber: data.member2_registerNumber,
          phoneNumber: data.member2_phoneNumber,
          email: data.member2_email,
          collegeName: data.member2_collegeName,
          branch: data.member2_branch,
          studyYear: data.member2_studyYear,
        }
        : undefined,
    });

    console.log("✅ Registration saved:", savedRegistration);

    return res.json({
      success: true,
      message: "Registration submitted for verification",
      data: savedRegistration,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

/* =========================
   SUBMIT ABSTRACT (Paper Presentation — Step 1)
========================= */
export async function submitAbstract(req, res) {
  try {
    console.log("========== ABSTRACT SUBMISSION ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const data = req.body;
    const abstractFile = req.file;

    if (!abstractFile) {
      return res.status(400).json({
        success: false,
        message: "Abstract file is required",
      });
    }

    const requiredFields = [
      "fullName", "registerNumber", "email",
      "phoneNumber", "collegeName", "branch", "studyYear", "eventName",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ success: false, message: `${field} is missing` });
      }
    }

    const eventData = await EventModel.findOne({ eventName: data.eventName });
    if (!eventData) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if already submitted an abstract for this event
    const alreadySubmitted = await RegistrationModel.findOne({
      email: data.email,
      eventId: eventData._id,
    });
    if (alreadySubmitted) {
      // Return the existing registration ID so the user can track status
      return res.json({
        success: true,
        message: "Already submitted",
        registrationId: alreadySubmitted._id,
        abstractStatus: alreadySubmitted.abstractStatus,
      });
    }

    const memberCount = parseInt(data.memberCount) || 1;

    const savedRegistration = await RegistrationModel.create({
      fullName: data.fullName,
      registerNumber: data.registerNumber,
      email: data.email,
      phone: data.phoneNumber,
      collegeName: data.collegeName,
      department: data.branch,
      year: data.studyYear,
      teamName: data.teamName || undefined,
      eventId: eventData._id,
      eventName: eventData.eventName,
      abstractFile: abstractFile.path,
      abstractFileId: abstractFile.filename,
      abstractStatus: "pending",
      registrationStatus: "registered",
      paymentStatus: "pending",
      memberCount,
      member2: memberCount === 2
        ? {
          fullName: data.member2_fullName,
          registerNumber: data.member2_registerNumber,
          phoneNumber: data.member2_phoneNumber,
          email: data.member2_email,
          collegeName: data.member2_collegeName,
          branch: data.member2_branch,
          studyYear: data.member2_studyYear,
        }
        : undefined,
    });

    console.log("✅ Abstract submitted:", savedRegistration._id);

    return res.json({
      success: true,
      message: "Abstract submitted successfully. Awaiting review.",
      registrationId: savedRegistration._id,
    });
  } catch (err) {
    console.error("❌ Abstract submission error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

/* =========================
   SUBMIT PAPER REGISTRATION (Form-only, no file upload — Step 1)
   Abstract goes through Google Form separately.
========================= */
export async function submitPaperRegistration(req, res) {
  try {
    console.log("========== PAPER REGISTRATION (form-only) ==========");
    console.log("BODY:", req.body);

    const data = req.body;

    const requiredFields = [
      "fullName", "registerNumber", "email",
      "phoneNumber", "collegeName", "branch", "studyYear", "eventName",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ success: false, message: `${field} is missing` });
      }
    }

    const eventData = await EventModel.findOne({ eventName: data.eventName });
    if (!eventData) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if already submitted for this event
    const alreadySubmitted = await RegistrationModel.findOne({
      email: data.email,
      eventId: eventData._id,
    });
    if (alreadySubmitted) {
      return res.json({
        success: true,
        message: "Already submitted",
        registrationId: alreadySubmitted._id,
        abstractStatus: alreadySubmitted.abstractStatus,
      });
    }

    const memberCount = parseInt(data.memberCount) || 1;

    const savedRegistration = await RegistrationModel.create({
      fullName: data.fullName,
      registerNumber: data.registerNumber,
      email: data.email,
      phone: data.phoneNumber,
      collegeName: data.collegeName,
      department: data.branch,
      year: data.studyYear,
      teamName: data.teamName || undefined,
      eventId: eventData._id,
      eventName: eventData.eventName,
      abstractStatus: "pending",
      registrationStatus: "registered",
      paymentStatus: "pending",
      memberCount,
      member2: memberCount === 2
        ? {
          fullName: data.member2_fullName,
          registerNumber: data.member2_registerNumber,
          phoneNumber: data.member2_phoneNumber,
          email: data.member2_email,
          collegeName: data.member2_collegeName,
          branch: data.member2_branch,
          studyYear: data.member2_studyYear,
        }
        : undefined,
    });

    console.log("✅ Paper registration saved:", savedRegistration._id);

    return res.json({
      success: true,
      message: "Registration submitted successfully. Awaiting abstract review.",
      registrationId: savedRegistration._id,
    });
  } catch (err) {
    console.error("❌ Paper registration error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

/* =========================
   CHECK ABSTRACT STATUS (Paper Presentation)
========================= */
export async function checkAbstractStatus(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Registration ID is required" });
    }

    const reg = await RegistrationModel.findById(id).select(
      "abstractStatus email fullName eventName paymentStatus transactionId"
    );

    if (!reg) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    return res.json({
      success: true,
      abstractStatus: reg.abstractStatus,
      paymentStatus: reg.paymentStatus,
      email: reg.email,
      fullName: reg.fullName,
      eventName: reg.eventName,
    });
  } catch (err) {
    console.error("❌ Check abstract status error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

/* =========================
   COMPLETE PAYMENT (Paper Presentation — Step 2)
========================= */
export async function completePayment(req, res) {
  try {
    console.log("========== COMPLETE PAYMENT ==========");
    const data = req.body;
    const screenshot = req.file;

    if (!screenshot) {
      return res.status(400).json({ success: false, message: "Payment screenshot is required" });
    }

    const { registrationId, transactionId } = data;

    if (!registrationId || !transactionId) {
      return res.status(400).json({ success: false, message: "Registration ID and transaction ID are required" });
    }

    const reg = await RegistrationModel.findById(registrationId);
    if (!reg) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    if (reg.abstractStatus !== "accepted") {
      return res.status(403).json({
        success: false,
        message: "Abstract has not been accepted yet. Payment is not allowed.",
      });
    }

    if (reg.transactionId) {
      return res.status(400).json({ success: false, message: "Payment already submitted" });
    }

    // Check duplicate transaction ID globally
    const txnExists = await RegistrationModel.findOne({ transactionId });
    if (txnExists) {
      return res.status(400).json({ success: false, message: "Transaction ID already used" });
    }

    reg.transactionId = transactionId;
    reg.paymentScreenshot = screenshot.path;
    reg.paymentScreenshotId = screenshot.filename;
    reg.paymentStatus = "pending";
    await reg.save();

    console.log("✅ Payment completed for:", registrationId);

    return res.json({
      success: true,
      message: "Payment submitted for verification",
    });
  } catch (err) {
    console.error("❌ Complete payment error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

/* =========================
   UPDATE ABSTRACT STATUS (Admin Action)
========================= */
export async function updateAbstractStatus(req, res) {
  try {
    const { registrationId, abstractStatus, email, fullName, eventName } = req.body;

    if (!registrationId || !abstractStatus) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(abstractStatus)) {
      return res.status(400).json({ success: false, message: "Invalid abstract status" });
    }

    const updated = await RegistrationModel.findByIdAndUpdate(
      registrationId,
      { abstractStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    // Collect all member emails to notify
    const emailTargets = [{ to: email, fullName }];
    if (updated.member2?.email) {
      emailTargets.push({ to: updated.member2.email, fullName: updated.member2.fullName || fullName });
    }

    if (abstractStatus === "accepted") {
      for (const target of emailTargets) {
        try {
          await abstractAcceptedMail({ to: target.to, fullName: target.fullName, eventName });
          console.log(`✅ Abstract acceptance mail sent to ${target.to}`);
        } catch (mailErr) {
          console.error("❌ Abstract acceptance mail failed:", mailErr.message);
        }
      }
    } else if (abstractStatus === "rejected") {
      for (const target of emailTargets) {
        try {
          await abstractRejectedMail({ to: target.to, fullName: target.fullName, eventName });
          console.log(`✅ Abstract rejection mail sent to ${target.to}`);
        } catch (mailErr) {
          console.error("❌ Abstract rejection mail failed:", mailErr.message);
        }
      }
    }

    return res.json({ success: true, message: `Abstract ${abstractStatus} successfully` });
  } catch (err) {
    console.error("❌ Update abstract status error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
