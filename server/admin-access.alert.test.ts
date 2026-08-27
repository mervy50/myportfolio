import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const { notifyOwner } = vi.hoisted(() => ({ notifyOwner: vi.fn() }));
vi.mock("./_core/notification", () => ({ notifyOwner }));

import { appRouter } from "./routers";

function context(ip: string): TrpcContext {
  return {
    user: null,
    req: { ip, headers: { "user-agent": "Vitest browser" } } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("alertes d’accès admin", () => {
  it("notifie la propriétaire lors d’un accès refusé", async () => {
    notifyOwner.mockResolvedValueOnce(true);
    const caller = appRouter.createCaller(context("198.51.100.10"));

    await expect(caller.portfolio.security.reportAdminAccessDenied({ path: "/espace-prive-mervy", reason: "unauthenticated" })).resolves.toEqual({ notified: true, throttled: false });
    expect(notifyOwner).toHaveBeenCalledWith(expect.objectContaining({ title: "Accès admin refusé", content: expect.stringContaining("198.51.100.10") }));
  });

  it("limite les notifications répétées pour une même origine", async () => {
    const caller = appRouter.createCaller(context("198.51.100.10"));

    await expect(caller.portfolio.security.reportAdminAccessDenied({ path: "/espace-prive-mervy", reason: "not_admin" })).resolves.toEqual({ notified: false, throttled: true });
    expect(notifyOwner).toHaveBeenCalledTimes(1);
  });
});
