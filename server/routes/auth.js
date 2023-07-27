import { registerUser, loginUser, refreshUser } from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", refreshUser);
export default router;
