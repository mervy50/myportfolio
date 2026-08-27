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
  deletePortfolioProject: vi.fn(),
  deletePortfolioSkill: vi.fn(),
  getPortfolioProjectBySlug: vi.fn(),
  getPortfolioProfile: vi.fn(),
  deletePortfolioProfile: vi.fn(),
  listPortfolioCertifications: vi.fn(),
  listPortfolioProjects: vi.fn(),
  listPortfolioSkills: vi.fn(),
  reorderPortfolioProjects: vi.fn(),
  upsertPortfolioProfile: vi.fn(),
  updatePortfolioCertification: vi.fn(),
  updatePortfolioProject: vi.fn(),
  updatePortfolioSkill: vi.fn(),
  uploadPortfolioCertificationAttestation: vi.fn(),
  getPortfolioSiteContent: vi.fn(),
  upsertPortfolioSiteContent: vi.fn(),
  listPortfolioEducation: vi.fn(),
  createPortfolioEducation: vi.fn(),
  updatePortfolioEducation: vi.fn(),
  deletePortfolioEducation: vi.fn(),
  reorderPortfolioEducation: vi.fn(),
}));

vi.mock("./db", () => mocks);
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function context(role: "admin" | "user" = "admin"): TrpcContext {
  return { user: { id: 1, openId: "owner", email: "owner@example.com", name: "Owner", loginMethod: "oauth", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as never, res: {} as never };
}

describe("profile, skills and project ordering", () => {
  beforeEach(() => vi.clearAllMocks());

  it("reads the public profile and grouped skills", async () => {
    const profile = { id: 1, name: "Merveille", role: "Full-Stack Developer", bio: "Une présentation suffisamment longue pour le portfolio.", email: "mervylokodade50@gmail.com", github: "https://github.com/mervy50", linkedin: "https://linkedin.com/in/mervyloko", photoUrl: null, cvUrl: null, updatedAt: new Date() };
    mocks.getPortfolioProfile.mockResolvedValue(profile);
    mocks.listPortfolioSkills.mockResolvedValue([{ id: 1, groupName: "Frontend", name: "React.js", displayOrder: 0, createdAt: new Date(), updatedAt: new Date() }]);
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.portfolio.profile.get()).resolves.toEqual(profile);
    await expect(caller.portfolio.skills.list()).resolves.toHaveLength(1);
  });

  it("updates profile and performs skill CRUD as admin", async () => {
    mocks.upsertPortfolioProfile.mockResolvedValue({ id: 1 });
    mocks.createPortfolioSkill.mockResolvedValue({ id: 4 });
    mocks.updatePortfolioSkill.mockResolvedValue({ id: 4 });
    mocks.deletePortfolioSkill.mockResolvedValue({ id: 4 });
    mocks.deletePortfolioProfile.mockResolvedValue({ id: 1 });
    const caller = appRouter.createCaller(context());
    const profile = { name: "Merveille Elise", role: "Full-Stack Developer", bio: "Une présentation suffisamment longue pour le portfolio.", email: "mervylokodade50@gmail.com", github: "https://github.com/mervy50", linkedin: "https://linkedin.com/in/merveille-loko-dade-8728b1352/", photoUrl: "", cvUrl: "" };
    await expect(caller.portfolio.profile.update(profile)).resolves.toEqual({ id: 1 });
    const skillWithLogo = { groupName: "Frontend", name: "React.js", iconKey: "react", iconColor: "#61DAFB", iconUrl: "", displayOrder: 0 };
    await expect(caller.portfolio.skills.create(skillWithLogo)).resolves.toEqual({ id: 4 });
    expect(mocks.createPortfolioSkill).toHaveBeenCalledWith(skillWithLogo);
    await expect(caller.portfolio.skills.create({ ...skillWithLogo, iconColor: "aqua" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.portfolio.skills.update({ id: 4, data: { name: "React 19" } })).resolves.toEqual({ id: 4 });
    await expect(caller.portfolio.skills.delete({ id: 4 })).resolves.toEqual({ id: 4 });
    await expect(caller.portfolio.profile.delete()).resolves.toEqual({ id: 1 });
  });

  it("persists project ordering and rejects ordering for a regular user", async () => {
    mocks.reorderPortfolioProjects.mockResolvedValue({ updated: 2 });
    const adminCaller = appRouter.createCaller(context());
    await expect(adminCaller.portfolio.projects.reorder({ order: [{ id: 2, displayOrder: 0 }, { id: 1, displayOrder: 1 }] })).resolves.toEqual({ updated: 2 });
    const userCaller = appRouter.createCaller(context("user"));
    await expect(userCaller.portfolio.projects.reorder({ order: [{ id: 1, displayOrder: 0 }] })).rejects.toThrow();
    expect(mocks.reorderPortfolioProjects).toHaveBeenCalledTimes(1);
  });

  it("enregistre les événements publics et réserve les statistiques à l’admin", async () => {
    mocks.createPortfolioAnalyticsEvent.mockResolvedValue({ id: 12 });
    mocks.getPortfolioAnalyticsStats.mockResolvedValue({ totals: { visits: 4, cvDownloads: 2, githubClicks: 6, linkedinClicks: 3 }, recent: { visits: 3, cvDownloads: 1, githubClicks: 4, linkedinClicks: 2 }, daily: [] });
    const publicCaller = appRouter.createCaller(context("user"));
    await expect(publicCaller.portfolio.analytics.trackVisit({ sessionId: "session-1234567890", path: "/about" })).resolves.toEqual({ id: 12 });
    await expect(publicCaller.portfolio.analytics.trackCvDownload({ sessionId: "session-1234567890", path: "/" })).resolves.toEqual({ id: 12 });
    await expect(publicCaller.portfolio.analytics.trackSocialClick({ sessionId: "session-1234567890", path: "/contact", platform: "github" })).resolves.toEqual({ id: 12 });
    await expect(publicCaller.portfolio.analytics.trackSocialClick({ sessionId: "session-1234567890", path: "/contact", platform: "linkedin" })).resolves.toEqual({ id: 12 });
    await expect(publicCaller.portfolio.analytics.stats()).rejects.toThrow();
    await expect(appRouter.createCaller(context()).portfolio.analytics.stats()).resolves.toEqual({ totals: { visits: 4, cvDownloads: 2, githubClicks: 6, linkedinClicks: 3 }, recent: { visits: 3, cvDownloads: 1, githubClicks: 4, linkedinClicks: 2 }, daily: [] });
    expect(mocks.createPortfolioAnalyticsEvent).toHaveBeenNthCalledWith(1, { eventType: "visit", sessionId: "session-1234567890", path: "/about" });
    expect(mocks.createPortfolioAnalyticsEvent).toHaveBeenNthCalledWith(2, { eventType: "cv_download", sessionId: "session-1234567890", path: "/" });
    expect(mocks.createPortfolioAnalyticsEvent).toHaveBeenNthCalledWith(3, { eventType: "github_click", sessionId: "session-1234567890", path: "/contact" });
    expect(mocks.createPortfolioAnalyticsEvent).toHaveBeenNthCalledWith(4, { eventType: "linkedin_click", sessionId: "session-1234567890", path: "/contact" });
  });

  it("importe une attestation uniquement pour un administrateur", async () => {
    mocks.uploadPortfolioCertificationAttestation.mockResolvedValue({ key: "portfolio/certifications/attestations/test.png", url: "/manus-storage/portfolio/certifications/attestations/test.png" });
    const payload = { fileName: "attestation.png", mimeType: "image/png" as const, dataUrl: "data:image/png;base64,ZmFrZQ==" };
    const adminCaller = appRouter.createCaller(context());
    const userCaller = appRouter.createCaller(context("user"));
    await expect(adminCaller.portfolio.certifications.uploadAttestation(payload)).resolves.toEqual({ key: "portfolio/certifications/attestations/test.png", url: "/manus-storage/portfolio/certifications/attestations/test.png" });
    await expect(userCaller.portfolio.certifications.uploadAttestation(payload)).rejects.toThrow();
    expect(mocks.uploadPortfolioCertificationAttestation).toHaveBeenCalledWith(payload);
  });

  it("consulte et gère la boîte de réception uniquement pour un administrateur", async () => {
    const message = { id: 5, name: "Visiteur", email: "visiteur@example.com", message: "Bonjour, je souhaite échanger sur un projet.", isRead: false, createdAt: new Date() };
    mocks.listContactMessages.mockResolvedValue([message]);
    mocks.updateContactMessageRead.mockResolvedValue({ id: 5, isRead: true });
    mocks.deleteContactMessage.mockResolvedValue({ id: 5 });
    const adminCaller = appRouter.createCaller(context());
    const userCaller = appRouter.createCaller(context("user"));
    await expect(adminCaller.contact.inbox.list()).resolves.toEqual([message]);
    await expect(adminCaller.contact.inbox.markRead({ id: 5, isRead: true })).resolves.toEqual({ id: 5, isRead: true });
    await expect(adminCaller.contact.inbox.delete({ id: 5 })).resolves.toEqual({ id: 5 });
    await expect(userCaller.contact.inbox.list()).rejects.toThrow();
    await expect(userCaller.contact.inbox.markRead({ id: 5, isRead: true })).rejects.toThrow();
    expect(mocks.updateContactMessageRead).toHaveBeenCalledWith(5, true);
    expect(mocks.deleteContactMessage).toHaveBeenCalledWith(5);
  });
});
