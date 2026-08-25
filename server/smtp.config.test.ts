import { describe, expect, it } from "vitest";
import { verifySmtpConnection } from "./mail";

describe("SMTP configuration", () => {
  it("exposes the Gmail SMTP configuration without logging the password", () => {
    expect(process.env.SMTP_HOST).toBe("smtp.gmail.com");
    expect(process.env.SMTP_PORT).toBe("587");
    expect(process.env.SMTP_USER).toBe("mervylokodade50@gmail.com");
    expect(process.env.SMTP_FROM).toBe("mervylokodade50@gmail.com");
    expect(process.env.CONTACT_RECEIVER_EMAIL).toBe("mervylokodade50@gmail.com");
    expect(process.env.SMTP_APP_PASSWORD).toBeTruthy();
    expect(process.env.SMTP_APP_PASSWORD).not.toBe("ta_cle_application_gmail");
  });

  it.skipIf(process.env.SMTP_LIVE_TEST !== "1")("authenticates against Gmail without sending an email", async () => {
    await expect(verifySmtpConnection()).resolves.toBe(true);
  }, 20_000);
});
