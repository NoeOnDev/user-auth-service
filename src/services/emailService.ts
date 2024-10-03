import { transporter } from "../_config/transporter.config";
import { env } from "../_config/env.config";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `http://localhost:9020/api/v1/email-verification-tokens?token=${token}`;

  const mailOptions = {
    from: env.email.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Please verify your email address by clicking on the following link: ${verificationUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Please verify your email address by clicking on the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Verify Email
        </a>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
