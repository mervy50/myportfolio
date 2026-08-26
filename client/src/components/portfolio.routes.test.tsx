// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/trpc", () => ({
  trpc: {
    portfolio: {
      projects: {
        list: { useQuery: () => ({ data: [{ id: 1, slug: "pitchlab", title: "Pitchlab", type: "Plateforme web", year: "2024", description: "Une description de projet suffisamment longue pour le test.", stack: ["Laravel", "PHP"], status: "Projet sélectionné" }] }) },
        bySlug: { useQuery: () => ({ data: { id: 1, slug: "pitchlab", title: "Pitchlab", type: "Plateforme web", year: "2024", description: "Une description de projet suffisamment longue pour le test.", stack: ["Laravel", "PHP"], status: "Projet sélectionné" } }) },
      },
      certifications: { list: { useQuery: () => ({ data: undefined }) } },
      profile: { get: { useQuery: () => ({ data: undefined }) } },
      skills: { list: { useQuery: () => ({ data: [{ id: 1, groupName: "Frontend", name: "React.js", displayOrder: 0 }] }) } },
      analytics: { trackVisit: { useMutation: () => ({ mutate: vi.fn() }) }, trackCvDownload: { useMutation: () => ({ mutate: vi.fn() }) } },
    },
  },
}));
import { Route, Switch } from "wouter";
import SiteLayout from "./SiteLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Portfolio from "../pages/Portfolio";
import ProjectDetail from "../pages/ProjectDetail";

function PortfolioRoutes() {
  return <SiteLayout><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/portfolio/:slug" component={ProjectDetail} />
  </Switch></SiteLayout>;
}

async function navigateFromMenu(user: ReturnType<typeof userEvent.setup>, label: string) {
  if (window.innerWidth <= 760) {
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
  }
  await user.click(screen.getByRole("navigation", { name: "Navigation principale" }).querySelector(`a[href="${label}"]`) as HTMLAnchorElement);
}

async function runJourney(viewport: number) {
  window.innerWidth = viewport;
  window.history.pushState({}, "", "/");
  const user = userEvent.setup();
  render(<PortfolioRoutes />);

  await navigateFromMenu(user, "/about");
  expect(screen.getByRole("heading", { name: /Une développeuse/ })).toBeTruthy();

  await navigateFromMenu(user, "/portfolio");
  expect(screen.getByRole("heading", { name: /Portfolio/ })).toBeTruthy();

  await user.click(screen.getByRole("button", { name: "Prévisualiser Pitchlab" }));
  await user.click(screen.getByRole("link", { name: /Ouvrir l’étude de cas/ }));

  expect(window.location.pathname).toBe("/portfolio/pitchlab");
  expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeTruthy();
  expect(screen.getByRole("heading", { name: /Pitchlab/ })).toBeTruthy();
}

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
});

describe("portfolio route transitions", () => {
  it("completes the desktop journey Accueil → À propos → Détail projet", async () => {
    await runJourney(1280);
  });

  it("completes the mobile journey Accueil → À propos → Détail projet", async () => {
    await runJourney(390);
  });
});
