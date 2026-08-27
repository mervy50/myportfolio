// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/components/ui/sonner", () => ({ Toaster: () => null }));
vi.mock("./components/SiteLayout", () => ({ default: ({ children }: { children: React.ReactNode }) => <div data-testid="public-shell">{children}</div> }));
vi.mock("./pages/Admin", () => ({ default: () => <main data-testid="admin-page">Admin sécurisé</main> }));
vi.mock("./pages/Home", () => ({ default: () => <main>Accueil</main> }));
vi.mock("./pages/About", () => ({ default: () => <main>À propos</main> }));
vi.mock("./pages/Contact", () => ({ default: () => <main>Contact</main> }));
vi.mock("./pages/Portfolio", () => ({ default: () => <main>Portfolio</main> }));
vi.mock("./pages/ProjectDetail", () => ({ default: () => <main>Projet</main> }));
vi.mock("./pages/NotFound", () => ({ default: () => <main>Introuvable</main> }));

import App from "./App";

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
});

describe("routage admin", () => {
  it("isole /admin du layout public", () => {
    window.history.pushState({}, "", "/admin");
    render(<App />);

    expect(screen.getByTestId("admin-page")).toBeTruthy();
    expect(screen.queryByTestId("public-shell")).toBeNull();
  });

  it("conserve le layout public sans lien Admin sur les routes publiques", () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getByTestId("public-shell")).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Admin" })).toBeNull();
  });
});
