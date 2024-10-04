import { Request, Response } from "express";
import { EmailVerificationTokenService } from "../services/emailVerificationTokenService";
import { AppError } from "../_utils/appError";

const emailVerificationTokenService = new EmailVerificationTokenService();

export const createToken = async (req: Request, res: Response) => {
  try {
    const token = await emailVerificationTokenService.createToken(req.body);
    res.status(201).json(token);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getToken = async (req: Request, res: Response) => {
  try {
    const token = await emailVerificationTokenService.getToken(
      req.params.token
    );
    if (token) {
      res.json(token);
    } else {
      res.status(404).json({ error: "Token not found" });
    }
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteToken = async (req: Request, res: Response) => {
  try {
    const deletedRows = await emailVerificationTokenService.deleteToken(
      req.params.token
    );
    if (deletedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Token not found" });
    }
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const isVerified = await emailVerificationTokenService.verifyEmail(token);
    if (isVerified) {
      res.status(200).json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid or expired token" });
    }
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
