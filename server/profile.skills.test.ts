import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createContactMessage: vi.fn(),
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
    await expect(caller.portfolio.skills.create({ groupName: "Frontend", name: "React.js", displayOrder: 0 })).resolves.toEqual({ id: 4 });
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
});
