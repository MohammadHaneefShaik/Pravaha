import express from "express";
const Router = express.Router();

import upload, { uploadAbstract } from "../middlewares/upload.js";
import {
    registerForEvent,
    getAllRegistrations,
    updatePaymentStatus,
    submitAbstract,
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
Router.get("/checkAbstractStatus", checkAbstractStatus);
Router.post(
    "/completePayment",
    upload.single("screenshot"),
    completePayment
);

// Admin action — update abstract status
Router.post("/updateAbstractStatus", updateAbstractStatus);

export default Router;
