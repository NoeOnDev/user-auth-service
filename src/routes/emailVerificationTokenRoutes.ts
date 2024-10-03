import { Router } from "express";
import {
  createToken,
  getToken,
  deleteToken,
} from "../controllers/emailVerificationTokenController";

const router = Router();

router.post("/", createToken);
router.get("/:token", getToken);
router.delete("/:token", deleteToken);

export default router;
