import { Router } from "express";
import {
  createCode,
  verifyPhone,
  incrementFailedAttempts,
} from "../controllers/phoneVerificationCodeController";

const router = Router();

router.post("/create", createCode);
router.post("/verify", verifyPhone);
router.post("/increment-failed-attempts", incrementFailedAttempts);

export default router;
