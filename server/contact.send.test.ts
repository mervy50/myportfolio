import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createContactMessage: vi.fn(),
  notifyOwner: vi.fn(),
}));

vi.mock("./db", () => ({ createContactMessage: mocks.createContactMessage }));
vi.mock("./_core/notification", () => ({ notifyOwner: mocks.notifyOwner }));

import { appRouter } from "./routers";

const caller = () => appRouter.createCaller({
  user: null,
  req: {} as never,
  res: {} as never,
});

describe("contact.send", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createContactMessage.mockResolvedValue({ id: 42 });
    mocks.notifyOwner.mockResolvedValue(true);
  });

  it("enregistre le message et notifie la propriétaire", async () => {
    const result = await caller().contact.send({
      name: "Merveille",
      email: "mervylokodade50@gmail.com",
      message: "Je souhaite discuter d’un projet web.",
    });

    expect(result).toEqual({ success: true, id: 42 });
    expect(mocks.createContactMessage).toHaveBeenCalledOnce();
    expect(mocks.notifyOwner).toHaveBeenCalledOnce();
  });

  it("retourne une erreur quand la base est indisponible", async () => {
    mocks.createContactMessage.mockRejectedValueOnce(new Error("Database unavailable"));

    await expect(caller().contact.send({
      name: "Merveille",
      email: "mervylokodade50@gmail.com",
      message: "Je souhaite discuter d’un projet web.",
    })).rejects.toThrow("Database unavailable");
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });
});
