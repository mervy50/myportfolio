import { describe, expect, it } from "vitest";

describe("configuration Resend", () => {
  it("authentifie une clé restreinte sans envoyer d’e-mail réel", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY doit être configurée pour valider Resend").toBeTruthy();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const body = await response.text();
    expect(response.status, body).toBeGreaterThanOrEqual(400);
    expect(response.status, body).not.toBe(401);
    expect(response.status, body).not.toBe(403);
  }, 15_000);
});
