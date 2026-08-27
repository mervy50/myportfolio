// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/trpc", () => ({
  trpc: {
    contact: { send: { useMutation: () => ({ mutateAsync: vi.fn(), isPending: false, isError: false }) } },
    portfolio: {
      projects: {
        list: { useQuery: () => ({ data: [{ id: 1, slug: "pitchlab", title: "Pitchlab", type: "Plateforme web", year: "2024", description: "Une description de projet suffisamment longue pour le test.", stack: ["Laravel", "PHP"], status: "Projet sélectionné" }] }) },
        bySlug: { useQuery: () => ({ data: { id: 1, slug: "pitchlab", title: "Pitchlab", type: "Plateforme web", year: "2024", description: "Une description de projet suffisamment longue pour le test.", stack: ["Laravel", "PHP"], status: "Projet sélectionné" } }) },
      },
      certifications: { list: { useQuery: () => ({ data: [{ id: 2, title: "KAS DIGIT", provider: "KAS", year: "2025", description: "Certification test.", attestationImageUrl: "/manus-storage/attestation.png" }] }) } },
      profile: { get: { useQuery: () => ({ data: { id: 1, name: "Merveille Elise LOKO-DADE", role: "Full-Stack Developer", bio: "Une présentation suffisamment longue pour le test.", email: "owner@example.com", github: "https://github.com/example", linkedin: "https://linkedin.com/example", photoUrl: null, aboutPhotoUrl: null, cvUrl: "/cv.pdf" } }) } },
      content: { get: { useQuery: () => ({ data: { headerBrand: "EDITED.", portfolioProjectsLabel: "Projets édités", portfolioCertificationsLabel: "Certifications éditées", portfolioTechStackLabel: "Tech édité", contactFormTitle: "Formulaire édité", contactNameLabel: "Nom édité", contactEmailLabel: "E-mail édité", contactMessageLabel: "Message édité", contactMessagePlaceholder: "Projet édité", contactSubmitLabel: "Envoyer édité", homeProjectsLabel: "Projets édités", homeTechnologiesLabel: "Technologies éditées", homeCuriosityLabel: "Curiosité éditée", homeProjectsCta: "Projets édités", homeAboutCtaLabel: "À propos édité", homeAvailability: "Disponible", homeTitleLine1: "Full-Stack", homeTitleLine2: "Developer.", homeAboutTitle: "Des idées utiles.", homeAboutAccent: "Du code qui compte.", homeAboutCta: "Découvrir", homeFeaturedTitle: "Ce que je construis", homeFeaturedAccent: "en ce moment.", homeContactTitle: "Un projet ?", homeContactAccent: "Parlons-en.", aboutTitleLine1: "Une développeuse", aboutTitleLine2: "orientée impact.", aboutAvailability: "Disponible", aboutLocation: "Porto-Novo, Bénin", aboutQuote: "Une citation.", aboutSkillsNote: "Compétences.", aboutEducationNote: "Formations.", portfolioTitleLine1: "Portfolio", portfolioTitleLine2: "Showcase", portfolioDescription: "Mes projets.", contactTitleLine1: "Construisons", contactTitleLine2: "quelque chose.", contactIntro: "Écrivez-moi.", footerBrand: "MERVYLKD.", footerCopy: "Avec soin.", navHomeLabel: "Accueil édité", navAboutLabel: "À propos", navPortfolioLabel: "Portfolio", navContactLabel: "Contact" } }) } },
      skills: { list: { useQuery: () => ({ data: [{ id: 1, groupName: "Frontend", name: "React.js", displayOrder: 0 }] }) } },
      education: { list: { useQuery: () => ({ data: [{ id: 1, title: "Licence", place: "Université", year: "2024", displayOrder: 0 }] }) } },
      analytics: { trackVisit: { useMutation: () => ({ mutate: vi.fn() }) }, trackCvDownload: { useMutation: () => ({ mutate: vi.fn() }) }, trackSocialClick: { useMutation: () => ({ mutate: vi.fn() }) } },
    },
  },
}));
import { Route, Switch } from "wouter";
import SiteLayout from "./SiteLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Portfolio from "../pages/Portfolio";
import ProjectDetail from "../pages/ProjectDetail";
import Contact from "../pages/Contact";

function PortfolioRoutes() {
  return <SiteLayout><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/portfolio/:slug" component={ProjectDetail} />
    <Route path="/contact" component={Contact} />
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

  expect(screen.queryByRole("link", { name: /Télécharger mon CV/ })).toBeNull();
  expect(screen.queryByText(/Disponible/)).toBeNull();
  await navigateFromMenu(user, "/about");
  expect(screen.getByRole("heading", { name: /Une développeuse/ })).toBeTruthy();
  expect(screen.queryByText(/Disponible/)).toBeNull();
  expect(screen.queryByText("01 / À propos")).toBeNull();
  expect(screen.getByRole("link", { name: /Télécharger mon CV/ }).getAttribute("href")).toBe("/cv.pdf");

  await navigateFromMenu(user, "/portfolio");
  expect(screen.getByRole("heading", { name: /Portfolio/ })).toBeTruthy();
  expect(screen.queryByText("02 / Portfolio")).toBeNull();

  await user.click(screen.getByRole("button", { name: "Prévisualiser Pitchlab" }));
  await user.click(screen.getByRole("link", { name: /Découvrir les détails/ }));

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

  it("affiche les contenus éditoriaux Home, Contact et les formations issus des requêtes publiques", async () => {
    window.history.pushState({}, "", "/about");
    render(<PortfolioRoutes />);
    expect(screen.getByText("EDITED.")).toBeTruthy();
    expect(screen.getByText("Licence")).toBeTruthy();
    expect(screen.getByText("Université")).toBeTruthy();
    expect(screen.getByText("2024")).toBeTruthy();
  });

  it("affiche les CTA Home et les labels Contact éditoriaux", async () => {
    window.history.pushState({}, "", "/");
    render(<PortfolioRoutes />);
    expect(screen.getByRole("link", { name: /Projets édités/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /À propos édité/ })).toBeTruthy();
    cleanup();
    window.history.pushState({}, "", "/contact");
    render(<PortfolioRoutes />);
    expect(screen.getByText("Formulaire édité")).toBeTruthy();
    expect(screen.getByPlaceholderText("Projet édité")).toBeTruthy();
    expect(screen.getByText("Porto-Novo, Bénin")).toBeTruthy();
    expect(screen.queryByText("04 / Contact")).toBeNull();
    expect(screen.queryByText("01")).toBeNull();
  });

  it("affiche les images d’attestation dans l’onglet Certifications", async () => {
    window.history.pushState({}, "", "/portfolio");
    const user = userEvent.setup();
    render(<PortfolioRoutes />);

    await user.click(screen.getByRole("tab", { name: "Certifications éditées" }));
    expect(screen.getByRole("img", { name: "Attestation de KAS DIGIT" }).getAttribute("src")).toBe("/manus-storage/attestation.png");
    expect(screen.getByRole("link", { name: /Voir l’attestation/ }).getAttribute("href")).toBe("/manus-storage/attestation.png");
  });
});
