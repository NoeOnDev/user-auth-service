import { Sequelize } from "sequelize-typescript";
import { env } from "./env.config";
import { User } from "../models/userModel";
import { EmailVerificationToken } from "../models/emailVerificationTokenModel";
import { PhoneVerificationCode } from "../models/phoneVerificationCodeModel";

export const sequelize = new Sequelize({
  database: env.db.DB_NAME,
  dialect: "postgres",
  username: env.db.DB_USER,
  password: env.db.DB_PASSWORD,
  host: env.db.DB_HOST,
  port: env.db.DB_PORT,
  models: [User, EmailVerificationToken, PhoneVerificationCode],
  logging: false,
});
