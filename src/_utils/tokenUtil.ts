import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = () => {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  return { token, expiresAt };
};

export const generatePhoneVerificationToken = () => {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  return { token, expiresAt };
};
