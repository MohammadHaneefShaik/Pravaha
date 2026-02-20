import express from "express";
const router = express.Router();

import { handleAdminLogin, handleAdminLogout,handleAdminMe } from "../controllers/admin.js";
import adminAuth from "../middlewares/adminAuth.js";


router.post("/login", handleAdminLogin);
router.get("/logout", handleAdminLogout);
router.get("/me", adminAuth, handleAdminMe);

export default router;
