import { Router } from "express";
import {
  createCode,
  verifyPhone,
} from "../controllers/phoneVerificationCodeController";

const router = Router();

router.post("/create", createCode);
router.post("/verify", verifyPhone);

export default router;
