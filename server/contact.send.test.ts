import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createContactMessage: vi.fn(),
  listContactMessages: vi.fn(),
  updateContactMessageRead: vi.fn(),
  deleteContactMessage: vi.fn(),
  createPortfolioAnalyticsEvent: vi.fn(),
  getPortfolioAnalyticsStats: vi.fn(),
  createPortfolioCertification: vi.fn(),
  createPortfolioProject: vi.fn(),
  createPortfolioSkill: vi.fn(),
  deletePortfolioCertification: vi.fn(),
  deletePortfolioSkill: vi.fn(),
  deletePortfolioProject: vi.fn(),
  getPortfolioProjectBySlug: vi.fn(),
  getPortfolioProfile: vi.fn(),
  deletePortfolioProfile: vi.fn(),
  listPortfolioCertifications: vi.fn(),
  listPortfolioSkills: vi.fn(),
  listPortfolioProjects: vi.fn(),
  reorderPortfolioProjects: vi.fn(),
  upsertPortfolioProfile: vi.fn(),
  updatePortfolioCertification: vi.fn(),
  updatePortfolioSkill: vi.fn(),
  updatePortfolioProject: vi.fn(),
  notifyOwner: vi.fn(),
}));

vi.mock("./db", () => ({
  createContactMessage: mocks.createContactMessage,
  listContactMessages: mocks.listContactMessages,
  updateContactMessageRead: mocks.updateContactMessageRead,
  deleteContactMessage: mocks.deleteContactMessage,
  createPortfolioAnalyticsEvent: mocks.createPortfolioAnalyticsEvent,
  getPortfolioAnalyticsStats: mocks.getPortfolioAnalyticsStats,
  createPortfolioCertification: mocks.createPortfolioCertification,
  createPortfolioProject: mocks.createPortfolioProject,
  createPortfolioSkill: mocks.createPortfolioSkill,
  deletePortfolioCertification: mocks.deletePortfolioCertification,
  deletePortfolioSkill: mocks.deletePortfolioSkill,
  deletePortfolioProject: mocks.deletePortfolioProject,
  getPortfolioProjectBySlug: mocks.getPortfolioProjectBySlug,
  getPortfolioProfile: mocks.getPortfolioProfile,
  deletePortfolioProfile: mocks.deletePortfolioProfile,
  listPortfolioCertifications: mocks.listPortfolioCertifications,
  listPortfolioSkills: mocks.listPortfolioSkills,
  listPortfolioProjects: mocks.listPortfolioProjects,
  reorderPortfolioProjects: mocks.reorderPortfolioProjects,
  upsertPortfolioProfile: mocks.upsertPortfolioProfile,
  updatePortfolioCertification: mocks.updatePortfolioCertification,
  updatePortfolioSkill: mocks.updatePortfolioSkill,
  updatePortfolioProject: mocks.updatePortfolioProject,
  getPortfolioSiteContent: vi.fn(),
  upsertPortfolioSiteContent: vi.fn(),
  listPortfolioEducation: vi.fn(),
  createPortfolioEducation: vi.fn(),
  updatePortfolioEducation: vi.fn(),
  deletePortfolioEducation: vi.fn(),
  reorderPortfolioEducation: vi.fn(),
}));
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
