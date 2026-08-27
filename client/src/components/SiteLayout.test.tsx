// @vitest-environment jsdom
import React from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const analyticsMocks = vi.hoisted(() => ({ trackVisit: vi.fn(), trackSocialClick: vi.fn() }));

vi.mock("@/lib/trpc", () => ({ trpc: { portfolio: { profile: { get: { useQuery: () => ({ data: { email: "owner@example.com", github: "https://github.com/example", linkedin: "https://linkedin.com/example" } }) } }, content: { get: { useQuery: () => ({ data: null }) } }, analytics: { trackVisit: { useMutation: () => ({ mutate: analyticsMocks.trackVisit }) }, trackSocialClick: { useMutation: () => ({ mutate: analyticsMocks.trackSocialClick }) } } } } }));
import SiteLayout from "./SiteLayout";

function renderLayout() {
  window.history.pushState({}, "", "/");
  return render(<SiteLayout><main>Contenu</main></SiteLayout>);
}

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
  vi.clearAllMocks();
});

describe("SiteLayout navigation", () => {
  it("wraps route content with the page transition contract", () => {
    renderLayout();
    expect(document.querySelector(".page-transition")).not.toBeNull();
    const stylesheet = readFileSync(path.resolve(import.meta.dirname, "../index.css"), "utf8");
    expect(stylesheet).toContain(".page-transition { animation: pageEnter");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce) {");
    expect(stylesheet).toContain("@keyframes sectionReveal");
    expect(stylesheet).toContain(".aqua-button:active::after");
  });

  it("does not track visits from the private admin route", () => {
    window.history.pushState({}, "", "/espace-prive-mervy");
    render(<SiteLayout><main>Admin</main></SiteLayout>);

    expect(analyticsMocks.trackVisit).not.toHaveBeenCalled();
  });

  it("navigates with a click and no longer displays section numbers", async () => {
    const user = userEvent.setup();
    renderLayout();
    const navigation = screen.getByRole("navigation", { name: "Navigation principale" });
    const initialFrame = document.querySelector(".page-frame");

    expect(within(navigation).queryByText(/0[1-4]/)).toBeNull();
    expect(screen.queryByRole("link", { name: "Admin" })).toBeNull();
    await user.click(within(navigation).getByRole("link", { name: "À propos" }));

    expect(window.location.pathname).toBe("/about");
    expect(document.querySelector(".page-frame")).not.toBe(initialFrame);
  });

  it("varies transition classes for forward and return navigation", async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(within(screen.getByRole("navigation", { name: "Navigation principale" })).getByRole("link", { name: "À propos" }));
    expect(document.querySelector(".page-transition")?.classList.contains("page-transition--forward")).toBe(true);

    await user.click(screen.getByRole("link", { name: "Accueil" }));
    expect(document.querySelector(".page-transition")?.classList.contains("page-transition--return")).toBe(true);
  });

  it("opens the mobile menu and supports keyboard activation", async () => {
    const user = userEvent.setup();
    renderLayout();
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    const navigation = screen.getByRole("navigation", { name: "Navigation principale" });

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(navigation.classList.contains("is-open")).toBe(true);

    const contactLink = within(navigation).getByRole("link", { name: "Contact" });
    contactLink.focus();
    expect(document.activeElement).toBe(contactLink);
    await user.keyboard("{Enter}");

    expect(window.location.pathname).toBe("/contact");
    expect(screen.getByRole("button", { name: "Ouvrir le menu" }).getAttribute("aria-expanded")).toBe("false");
  });

  it("navigates through every mobile navigation link and closes the menu", async () => {
    const user = userEvent.setup();
    renderLayout();
    const routes = [["Accueil", "/"], ["À propos", "/about"], ["Portfolio", "/portfolio"], ["Contact", "/contact"]] as const;

    for (const [label, route] of routes) {
      const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
      await user.click(toggle);
      const navigation = screen.getByRole("navigation", { name: "Navigation principale" });
      await user.click(within(navigation).getByRole("link", { name: label }));
      expect(window.location.pathname).toBe(route);
      expect(screen.getByRole("button", { name: "Ouvrir le menu" }).getAttribute("aria-expanded")).toBe("false");
    }
  });

  it("activates the mobile menu with Enter and Space from keyboard focus", async () => {
    const user = userEvent.setup();
    renderLayout();
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });

    toggle.focus();
    expect(document.activeElement).toBe(toggle);
    const stylesheet = readFileSync(path.resolve(import.meta.dirname, "../index.css"), "utf8");
    expect(stylesheet).toContain("button:focus-visible, a:focus-visible");
    await user.keyboard("{Enter}");
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    toggle.focus();
    await user.keyboard(" ");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
