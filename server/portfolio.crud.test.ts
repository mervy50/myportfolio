import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  listContactMessages: vi.fn(),
  updateContactMessageRead: vi.fn(),
  deleteContactMessage: vi.fn(),
  createPortfolioAnalyticsEvent: vi.fn(),
  getPortfolioAnalyticsStats: vi.fn(),
  createPortfolioCertification: vi.fn(),
  getPortfolioProfile: vi.fn(),
  deletePortfolioProfile: vi.fn(),
  createPortfolioProject: vi.fn(),
  deletePortfolioCertification: vi.fn(),
  deletePortfolioProject: vi.fn(),
  getPortfolioProjectBySlug: vi.fn(),
  listPortfolioCertifications: vi.fn(),
  listPortfolioProjects: vi.fn(),
  listPortfolioSkills: vi.fn(),
  reorderPortfolioProjects: vi.fn(),
  upsertPortfolioProfile: vi.fn(),
  createPortfolioSkill: vi.fn(),
  deletePortfolioSkill: vi.fn(),
  updatePortfolioSkill: vi.fn(),
  updatePortfolioCertification: vi.fn(),
  updatePortfolioProject: vi.fn(),
}));

vi.mock("./db", () => mocks);
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const project = { id: 1, slug: "pitchlab", title: "Pitchlab", type: "Plateforme web", year: "2024", description: "Une plateforme utile avec une description suffisamment longue.", stack: "Laravel, PHP", status: "Publié", createdAt: new Date(), updatedAt: new Date() };
const certification = { id: 2, title: "LABIS — Data Analysis", provider: "LABIS", year: "2025", description: "Formation en analyse de données.", createdAt: new Date(), updatedAt: new Date() };

function context(): TrpcContext {
  return { user: { id: 1, openId: "owner", email: "owner@example.com", name: "Owner", loginMethod: "oauth", role: "admin", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as never, res: {} as never };
}

describe("portfolio CRUD procedures", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lists projects and exposes a project by slug", async () => {
    mocks.listPortfolioProjects.mockResolvedValue([project]);
    mocks.getPortfolioProjectBySlug.mockResolvedValue(project);
    const caller = appRouter.createCaller(context());
    await expect(caller.portfolio.projects.list()).resolves.toEqual([{ ...project, stack: ["Laravel", "PHP"] }]);
    await expect(caller.portfolio.projects.bySlug({ slug: "pitchlab" })).resolves.toEqual({ ...project, stack: ["Laravel", "PHP"] });
  });

  it("creates, updates and deletes a project", async () => {
    mocks.createPortfolioProject.mockResolvedValue({ id: 7 });
    mocks.updatePortfolioProject.mockResolvedValue({ id: 7 });
    mocks.deletePortfolioProject.mockResolvedValue({ id: 7 });
    const caller = appRouter.createCaller(context());
    const input = { slug: "new-project", title: "New project", type: "Web app", year: "2026", description: "Une description assez longue pour passer la validation.", stack: "React, TypeScript", status: "Publié" };
    await expect(caller.portfolio.projects.create(input)).resolves.toEqual({ id: 7 });
    await expect(caller.portfolio.projects.update({ id: 7, data: { title: "Updated project" } })).resolves.toEqual({ id: 7 });
    await expect(caller.portfolio.projects.delete({ id: 7 })).resolves.toEqual({ id: 7 });
    expect(mocks.createPortfolioProject).toHaveBeenCalledWith(input);
    expect(mocks.updatePortfolioProject).toHaveBeenCalledWith(7, { title: "Updated project" });
    expect(mocks.deletePortfolioProject).toHaveBeenCalledWith(7);
  });

  it("creates, updates and deletes a certification", async () => {
    mocks.createPortfolioCertification.mockResolvedValue({ id: 8 });
    mocks.updatePortfolioCertification.mockResolvedValue({ id: 8 });
    mocks.deletePortfolioCertification.mockResolvedValue({ id: 8 });
    mocks.listPortfolioCertifications.mockResolvedValue([certification]);
    const caller = appRouter.createCaller(context());
    const input = { title: "New certification", provider: "LABIS", year: "2026", description: "Description valide." };
    await expect(caller.portfolio.certifications.list()).resolves.toEqual([certification]);
    await expect(caller.portfolio.certifications.create(input)).resolves.toEqual({ id: 8 });
    await expect(caller.portfolio.certifications.update({ id: 8, data: { provider: "New provider" } })).resolves.toEqual({ id: 8 });
    await expect(caller.portfolio.certifications.delete({ id: 8 })).resolves.toEqual({ id: 8 });
  });

  it("propagates database failures on project reads and mutations", async () => {
    mocks.listPortfolioProjects.mockRejectedValue(new Error("List unavailable"));
    mocks.getPortfolioProjectBySlug.mockRejectedValue(new Error("Lookup unavailable"));
    mocks.updatePortfolioProject.mockRejectedValue(new Error("Update unavailable"));
    mocks.deletePortfolioProject.mockRejectedValue(new Error("Delete unavailable"));
    const caller = appRouter.createCaller(context());
    await expect(caller.portfolio.projects.list()).rejects.toThrow("List unavailable");
    await expect(caller.portfolio.projects.bySlug({ slug: "pitchlab" })).rejects.toThrow("Lookup unavailable");
    await expect(caller.portfolio.projects.update({ id: 1, data: { title: "Updated" } })).rejects.toThrow("Update unavailable");
    await expect(caller.portfolio.projects.delete({ id: 1 })).rejects.toThrow("Delete unavailable");
  });

  it("propagates database failures on certification mutations", async () => {
    mocks.createPortfolioCertification.mockRejectedValue(new Error("Create certification unavailable"));
    mocks.updatePortfolioCertification.mockRejectedValue(new Error("Update certification unavailable"));
    mocks.deletePortfolioCertification.mockRejectedValue(new Error("Delete certification unavailable"));
    const caller = appRouter.createCaller(context());
    const input = { title: "New certification", provider: "LABIS", year: "2026", description: "Description valide." };
    await expect(caller.portfolio.certifications.create(input)).rejects.toThrow("Create certification unavailable");
    await expect(caller.portfolio.certifications.update({ id: 2, data: { provider: "Updated provider" } })).rejects.toThrow("Update certification unavailable");
    await expect(caller.portfolio.certifications.delete({ id: 2 })).rejects.toThrow("Delete certification unavailable");
  });
});
