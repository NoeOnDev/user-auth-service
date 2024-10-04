import { twilioClient } from "../_config/twilio.config";
import { env } from "../_config/env.config";

export const sendWhatsAppVerification = async (phone: string, code: string) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your verification code is: ${code}`,
      from: `whatsapp:${env.twilio.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${phone}`,
    });

    return message;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    throw new Error("Failed to send WhatsApp message");
  }
};
