import { Router } from "express";
import {
  createToken,
  getToken,
  deleteToken,
  verifyEmail,
} from "../controllers/emailVerificationTokenController";

const router = Router();

router.post("/", createToken);
router.get("/:token", getToken);
router.delete("/:token", deleteToken);
router.get("/verify/:token", verifyEmail);

export default router;
