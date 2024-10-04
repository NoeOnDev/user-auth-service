import { Request, Response } from "express";
import { PhoneVerificationTokenService } from "../services/phoneVerificationCodeService";
import { AppError } from "../_utils/appError";

const phoneVerificationTokenService = new PhoneVerificationTokenService();

export const createCode = async (req: Request, res: Response) => {
  const { phone, user_id } = req.body;

  try {
    const token = await phoneVerificationTokenService.createCode(
      phone,
      user_id
    );
    res.status(201).json(token);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const verifyPhone = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const isValid = await phoneVerificationTokenService.verifyPhone(code);
    if (isValid) {
      res.status(200).json({ message: "Phone verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid or expired code" });
    }
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
