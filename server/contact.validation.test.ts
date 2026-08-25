import { describe, expect, it } from "vitest";
import { contactMessageInput } from "./routers";

describe("contactMessageInput", () => {
  it("accepts a valid contact message", () => {
    const result = contactMessageInput.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Bonjour, je souhaite parler d’un projet web.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects malformed email and short messages", () => {
    const result = contactMessageInput.safeParse({
      name: "A",
      email: "not-an-email",
      message: "Court",
    });
    expect(result.success).toBe(false);
  });
});
