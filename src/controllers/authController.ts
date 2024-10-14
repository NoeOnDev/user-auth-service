import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { AppError } from "../_utils/appError";

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await authService.login(email, password);
    res.status(200).json({ message: "2FA code sent to your phone" });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const verify2FA = async (req: Request, res: Response) => {
  const { userId, code } = req.body;

  try {
    const token = await authService.verify2FA(userId, code);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
