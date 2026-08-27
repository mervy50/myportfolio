import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  exchangeCodeForToken: vi.fn(),
  getUserInfo: vi.fn(),
  createSessionToken: vi.fn(),
  upsertUser: vi.fn(),
}));

vi.mock("./_core/sdk", () => ({ sdk: mocks }));
vi.mock("./db", () => ({ upsertUser: mocks.upsertUser }));

import { ADMIN_PATH, encodeOAuthState } from "../shared/const";
import { registerOAuthRoutes } from "./_core/oauth";

function createRouteApp() {
  let handler: ((req: any, res: any) => Promise<void>) | undefined;
  return {
    app: { get: vi.fn((_path: string, routeHandler: typeof handler) => { handler = routeHandler; }) },
    getHandler: () => handler,
  };
}

describe("OAuth admin callback", () => {
  it("crée une session et revient sur le panel demandé", async () => {
    mocks.exchangeCodeForToken.mockResolvedValue({ accessToken: "access-token" });
    mocks.getUserInfo.mockResolvedValue({ openId: "owner-open-id", name: "Owner", email: "owner@example.com", platform: "google" });
    mocks.createSessionToken.mockResolvedValue("session-token");
    mocks.upsertUser.mockResolvedValue(undefined);
    const { app, getHandler } = createRouteApp();
    registerOAuthRoutes(app as any);
    const state = encodeOAuthState({ redirectUri: "https://portfolio.example/api/oauth/callback", nonce: "nonce-1234567890", returnPath: ADMIN_PATH });
    const response = { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis(), clearCookie: vi.fn(), cookie: vi.fn(), redirect: vi.fn() };

    await getHandler()?.({ query: { code: "authorization-code", state }, headers: { cookie: "__Host-oauth_state=nonce-1234567890" }, protocol: "https" }, response);

    expect(mocks.upsertUser).toHaveBeenCalledOnce();
    expect(mocks.createSessionToken).toHaveBeenCalledWith("owner-open-id", expect.objectContaining({ name: "Owner" }));
    expect(response.cookie).toHaveBeenCalledWith("app_session_id", "session-token", expect.objectContaining({ sameSite: "lax", secure: true, httpOnly: true }),);
    expect(response.redirect).toHaveBeenCalledWith(302, ADMIN_PATH);
  });
});
