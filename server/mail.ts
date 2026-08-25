import nodemailer from "nodemailer";
import type { InsertContactMessage } from "../drizzle/schema";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_APP_PASSWORD;
const smtpFrom = process.env.SMTP_FROM || smtpUser;
const receiver = process.env.CONTACT_RECEIVER_EMAIL;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  requireTLS: true,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

export async function verifySmtpConnection() {
  if (!smtpHost || !smtpUser || !smtpPassword) {
    throw new Error("SMTP configuration is incomplete");
  }
  await transporter.verify();
  return true;
}

export async function sendContactEmail(message: InsertContactMessage) {
  if (!smtpHost || !smtpUser || !smtpPassword || !smtpFrom || !receiver) {
    throw new Error("SMTP configuration is incomplete");
  }

  await transporter.sendMail({
    from: smtpFrom,
    to: receiver,
    replyTo: message.email,
    subject: `[Portfolio] Nouveau message de ${message.name}`,
    text: `Nouveau message reçu depuis le portfolio.\n\nNom : ${message.name}\nEmail : ${message.email}\n\nMessage :\n${message.message}`,
  });
}
