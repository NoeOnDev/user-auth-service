import { User } from "../models/userModel";

export const filterUserFields = (user: User) => {
  return {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    created_at: user.createdAt,
  };
};
