import { Resend } from "resend";
import type { InsertContactMessage } from "../drizzle/schema";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL;
const receiver = process.env.CONTACT_RECEIVER_EMAIL;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function verifyResendConfiguration() {
  if (!resend || !resendFrom || !receiver) {
    throw new Error("Resend configuration is incomplete");
  }
  return true;
}

export async function sendContactEmail(message: InsertContactMessage) {
  verifyResendConfiguration();

  const { error } = await resend!.emails.send({
    from: resendFrom!,
    to: [receiver!],
    replyTo: message.email,
    subject: `[Portfolio] Nouveau message de ${message.name}`,
    text: `Nouveau message reçu depuis le portfolio.\n\nNom : ${message.name}\nEmail : ${message.email}\n\nMessage :\n${message.message}`,
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }
}
