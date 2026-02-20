import express from "express";
const Router = express.Router();

import upload from "../middlewares/upload.js";
import {
    registerForEvent,
    getAllRegistrations,
    updatePaymentStatus
} from "../controllers/user.js";

// Routes
Router.get("/getRegistrations", getAllRegistrations);
Router.post("/updatePaymentStatus", updatePaymentStatus);

Router.post(
    "/sendRegistrationData",
    upload.single("screenshot"),
    registerForEvent
);

export default Router;
