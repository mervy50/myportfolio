import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createContactMessage: vi.fn(), deleteContactMessage: vi.fn(), listContactMessages: vi.fn(), updateContactMessageRead: vi.fn(),
  createPortfolioCertification: vi.fn(), createPortfolioAnalyticsEvent: vi.fn(), getPortfolioAnalyticsStats: vi.fn(), createPortfolioProject: vi.fn(), deletePortfolioCertification: vi.fn(), deletePortfolioProject: vi.fn(), getPortfolioProjectBySlug: vi.fn(), getPortfolioProfile: vi.fn(), deletePortfolioProfile: vi.fn(), listPortfolioCertifications: vi.fn(), listPortfolioProjects: vi.fn(), listPortfolioSkills: vi.fn(), reorderPortfolioProjects: vi.fn(), updatePortfolioCertification: vi.fn(), updatePortfolioProject: vi.fn(), upsertPortfolioProfile: vi.fn(), createPortfolioSkill: vi.fn(), deletePortfolioSkill: vi.fn(), updatePortfolioSkill: vi.fn(), uploadPortfolioCertificationAttestation: vi.fn(),
  getPortfolioSiteContent: vi.fn(),
  upsertPortfolioSiteContent: vi.fn(),
  listPortfolioEducation: vi.fn(),
  createPortfolioEducation: vi.fn(),
  updatePortfolioEducation: vi.fn(),
  deletePortfolioEducation: vi.fn(),
  reorderPortfolioEducation: vi.fn(),
}));

vi.mock("./db", () => mocks);
vi.mock("./_core/notification", () => ({ notifyOwner: vi.fn() }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const content = {
  headerBrand: "LOKO-DADE.", portfolioProjectsLabel: "Projets", portfolioCertificationsLabel: "Certifications", portfolioTechStackLabel: "Tech Stack", contactFormTitle: "Envoyer un message", contactNameLabel: "Votre nom", contactEmailLabel: "Votre adresse e-mail", contactMessageLabel: "Votre message", contactMessagePlaceholder: "Décrivez votre projet", contactSubmitLabel: "Envoyer", homeProjectsLabel: "Projets réalisés", homeTechnologiesLabel: "Technologies", homeCuriosityLabel: "Curiosité", homeProjectsCta: "Voir mes projets", homeAboutCtaLabel: "À propos de moi", homeAvailability: "Disponible", homeTitleLine1: "Full-Stack", homeTitleLine2: "Developer.",
  homeAboutTitle: "Des idées utiles.", homeAboutAccent: "Du code qui compte.", homeAboutCta: "Découvrir", homeFeaturedTitle: "Ce que je construis", homeFeaturedAccent: "en ce moment.", homeContactTitle: "Un projet ?", homeContactAccent: "Parlons-en.",
  aboutTitleLine1: "Une développeuse", aboutTitleLine2: "orientée impact.", aboutAvailability: "Disponible", aboutLocation: "Bénin", aboutQuote: "Une citation.", aboutSkillsNote: "Compétences.", aboutEducationNote: "Formations.",
  portfolioTitleLine1: "Portfolio", portfolioTitleLine2: "Showcase", portfolioDescription: "Mes projets.", contactTitleLine1: "Construisons", contactTitleLine2: "quelque chose.", contactIntro: "Écrivez-moi.", footerBrand: "MERVYLKD.", footerCopy: "Avec soin.", navHomeLabel: "Accueil", navAboutLabel: "À propos", navPortfolioLabel: "Portfolio", navContactLabel: "Contact",
};

const adminContext = (): TrpcContext => ({
  user: { id: 1, openId: "owner", email: "owner@example.com", name: "Owner", loginMethod: "oauth", role: "admin", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: {} as never, res: {} as never,
});
const publicContext = (): TrpcContext => ({ user: null, req: {} as never, res: {} as never });

describe("portfolio editorial procedures", () => {
  it("publie le contenu et protège sa modification", async () => {
    mocks.getPortfolioSiteContent.mockResolvedValue(content);
    mocks.upsertPortfolioSiteContent.mockResolvedValue({ id: 1 });
    await expect(appRouter.createCaller(publicContext()).portfolio.content.get()).resolves.toEqual(content);
    await expect(appRouter.createCaller(publicContext()).portfolio.content.update(content)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(appRouter.createCaller(adminContext()).portfolio.content.update(content)).resolves.toEqual({ id: 1 });
  });

  it("gère les formations et valide une année sur quatre chiffres", async () => {
    const education = { title: "Licence", place: "Université", year: "2026", displayOrder: 0 };
    mocks.listPortfolioEducation.mockResolvedValue([education]);
    mocks.createPortfolioEducation.mockResolvedValue({ id: 2 });
    mocks.updatePortfolioEducation.mockResolvedValue({ id: 2 });
    mocks.deletePortfolioEducation.mockResolvedValue({ id: 2 });
    mocks.reorderPortfolioEducation.mockResolvedValue({ success: true });
    const caller = appRouter.createCaller(adminContext());
    await expect(appRouter.createCaller(publicContext()).portfolio.education.list()).resolves.toEqual([education]);
    await expect(caller.portfolio.education.create(education)).resolves.toEqual({ id: 2 });
    await expect(caller.portfolio.education.update({ id: 2, data: { year: "2025" } })).resolves.toEqual({ id: 2 });
    await expect(caller.portfolio.education.delete({ id: 2 })).resolves.toEqual({ id: 2 });
    await expect(caller.portfolio.education.reorder({ order: [{ id: 2, displayOrder: 0 }] })).resolves.toEqual({ success: true });
    await expect(caller.portfolio.education.create({ ...education, year: "26" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
