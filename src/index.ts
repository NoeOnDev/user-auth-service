import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_utils/ormConnection";
import userRoutes from "./routes/userRoutes";
import emailVerificationTokenRoutes from "./routes/emailVerificationTokenRoutes";
import phoneVerificationCodeRoutes from "./routes/phoneVerificationCodeRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/email-verification-tokens", emailVerificationTokenRoutes);
app.use("/api/v1/phone-verification-codes", phoneVerificationCodeRoutes);
app.use("/api/v1/auth", authRoutes); //Routes for login and signup

app.use((_req, res, _next) => {
  res.status(404).json({ error: "Not Found" });
});

app.get("/", (_req, res) => {
  res.send("Welcome to the users API 🚀");
});

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
