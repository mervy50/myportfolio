import { describe, expect, it } from "vitest";
import { ADMIN_PATH } from "../shared/const";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type UserRole = NonNullable<TrpcContext["user"]>["role"];

function contextFor(role: UserRole): TrpcContext {
  return {
    user: { id: 1, openId: "portfolio-test", email: "admin@example.com", name: "Portfolio Test", loginMethod: "test", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("portfolio admin procedures", () => {
  it("rejects project creation for a non-admin user", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.portfolio.projects.create({
      slug: "new-project",
      title: "New project",
      type: "Web app",
      year: "2026",
      description: "A real project description long enough for validation.",
      stack: "React, TypeScript",
      status: "Draft",
    })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("keeps the private admin surface protected for a non-admin user", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    expect(ADMIN_PATH).toBe("/espace-prive-mervy");
    await expect(caller.portfolio.projects.delete({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects invalid admin project data before touching the database", async () => {
    const caller = appRouter.createCaller(contextFor("admin"));
    await expect(caller.portfolio.projects.create({
      slug: "Not valid",
      title: "X",
      type: "Web app",
      year: "26",
      description: "Too short",
      stack: "",
      status: "Draft",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects invalid certification data before touching the database", async () => {
    const caller = appRouter.createCaller(contextFor("admin"));
    await expect(caller.portfolio.certifications.create({
      title: "",
      provider: "",
      year: "20",
      description: "optional",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
