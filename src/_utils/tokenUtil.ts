import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = () => {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  return { token, expiresAt };
};
