import express from "express";
const router = express.Router();

import { sayHii } from "../controllers/basic.js";

router.get("/", sayHii);

export default router;
