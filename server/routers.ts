import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import {
  createContactMessage,
  deleteContactMessage,
  listContactMessages,
  updateContactMessageRead,
  createPortfolioCertification,
  createPortfolioAnalyticsEvent,
  getPortfolioAnalyticsStats,
  createPortfolioProject,
  deletePortfolioCertification,
  deletePortfolioProject,
  getPortfolioProjectBySlug,
  getPortfolioProfile,
  deletePortfolioProfile,
  listPortfolioCertifications,
  listPortfolioProjects,
  listPortfolioSkills,
  reorderPortfolioProjects,
  updatePortfolioCertification,
  updatePortfolioProject,
  upsertPortfolioProfile,
  createPortfolioSkill,
  deletePortfolioSkill,
  updatePortfolioSkill,
  uploadPortfolioCertificationAttestation,
  getPortfolioSiteContent,
  upsertPortfolioSiteContent,
  listPortfolioEducation,
  createPortfolioEducation,
  updatePortfolioEducation,
  deletePortfolioEducation,
  reorderPortfolioEducation,
} from "./db";
import { sendContactEmail } from "./mail";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const contactMessageInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(10).max(5000),
});

const idInput = z.object({ id: z.number().int().positive() });
const projectInput = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(160),
  type: z.string().trim().min(2).max(160),
  year: z.string().trim().regex(/^\d{4}$/),
  description: z.string().trim().min(10).max(5000),
  stack: z.string().trim().min(2).max(500),
  status: z.string().trim().min(2).max(120),
  githubUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  detailTagline: z.string().trim().max(240).optional().or(z.literal("")),
  detailHeadline: z.string().trim().max(500).optional().or(z.literal("")),
  detailBody: z.string().trim().max(5000).optional().or(z.literal("")),
  detailFeatures: z.string().trim().max(2000).optional().or(z.literal("")),
});
const profileInput = z.object({
  name: z.string().trim().min(2).max(200),
  role: z.string().trim().min(2).max(160),
  bio: z.string().trim().min(20).max(5000),
  email: z.string().trim().email().max(320),
  github: z.string().trim().url().max(320),
  linkedin: z.string().trim().url().max(320),
  photoUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  aboutPhotoUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  cvUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
});
const skillInput = z.object({
  groupName: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(120),
  displayOrder: z.number().int().min(0).default(0),
});
const reorderInput = z.object({ order: z.array(z.object({ id: z.number().int().positive(), displayOrder: z.number().int().min(0) })).min(1).max(100) });
const analyticsEventInput = z.object({ sessionId: z.string().trim().min(16).max(128), path: z.string().trim().min(1).max(200) });
const adminAccessDeniedInput = z.object({ path: z.string().trim().startsWith("/").max(160), reason: z.enum(["unauthenticated", "not_admin"]) });
const deniedAccessAlertByOrigin = new Map<string, number>();
const DENIED_ACCESS_ALERT_WINDOW_MS = 15 * 60 * 1000;

const getRequestOrigin = (req: { headers?: Record<string, string | string[] | undefined>; ip?: string }): string => {
  const forwarded = req.headers?.["x-forwarded-for"];
  return typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.ip || "unknown";
};
const socialClickInput = analyticsEventInput.extend({ platform: z.enum(["github", "linkedin"]) });
const siteContentInput = z.object({
  headerBrand: z.string().trim().min(1).max(120), portfolioProjectsLabel: z.string().trim().min(1).max(80), portfolioCertificationsLabel: z.string().trim().min(1).max(80), portfolioTechStackLabel: z.string().trim().min(1).max(80), contactFormTitle: z.string().trim().min(1).max(120), contactNameLabel: z.string().trim().min(1).max(120), contactEmailLabel: z.string().trim().min(1).max(120), contactMessageLabel: z.string().trim().min(1).max(120), contactMessagePlaceholder: z.string().trim().min(1).max(240), contactSubmitLabel: z.string().trim().min(1).max(120), homeProjectsLabel: z.string().trim().min(1).max(120), homeTechnologiesLabel: z.string().trim().min(1).max(120), homeCuriosityLabel: z.string().trim().min(1).max(120), homeProjectsCta: z.string().trim().min(1).max(120), homeAboutCtaLabel: z.string().trim().min(1).max(120), homeAvailability: z.string().trim().min(2).max(240), homeTitleLine1: z.string().trim().min(1).max(160), homeTitleLine2: z.string().trim().min(1).max(160), homeAboutTitle: z.string().trim().min(1).max(240), homeAboutAccent: z.string().trim().min(1).max(240), homeAboutCta: z.string().trim().min(1).max(160), homeFeaturedTitle: z.string().trim().min(1).max(240), homeFeaturedAccent: z.string().trim().min(1).max(240), homeContactTitle: z.string().trim().min(1).max(240), homeContactAccent: z.string().trim().min(1).max(240), aboutTitleLine1: z.string().trim().min(1).max(160), aboutTitleLine2: z.string().trim().min(1).max(160), aboutAvailability: z.string().trim().min(1).max(240), aboutLocation: z.string().trim().min(1).max(240), aboutQuote: z.string().trim().min(1).max(500), aboutSkillsNote: z.string().trim().min(1).max(500), aboutEducationNote: z.string().trim().min(1).max(500), portfolioTitleLine1: z.string().trim().min(1).max(160), portfolioTitleLine2: z.string().trim().min(1).max(160), portfolioDescription: z.string().trim().min(1).max(500), contactTitleLine1: z.string().trim().min(1).max(160), contactTitleLine2: z.string().trim().min(1).max(160), contactIntro: z.string().trim().min(1).max(500), footerBrand: z.string().trim().min(1).max(120), footerCopy: z.string().trim().min(1).max(240), navHomeLabel: z.string().trim().min(1).max(80), navAboutLabel: z.string().trim().min(1).max(80), navPortfolioLabel: z.string().trim().min(1).max(80), navContactLabel: z.string().trim().min(1).max(80),
});
const educationInput = z.object({ title: z.string().trim().min(2).max(240), place: z.string().trim().min(2).max(160), year: z.string().trim().regex(/^\d{4}$/).optional().or(z.literal("")), displayOrder: z.number().int().min(0).default(0) });

const certificationInput = z.object({
  title: z.string().trim().min(2).max(200),
  provider: z.string().trim().min(2).max(160),
  year: z.string().trim().regex(/^\d{4}$/).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional(),
  attestationImageUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
});
const certificationAttestationUploadInput = z.object({
  fileName: z.string().trim().min(1).max(200),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  dataUrl: z.string().max(11_200_000),
});

const toPublicProject = (project: Awaited<ReturnType<typeof listPortfolioProjects>>[number]) => ({
  ...project,
  stack: project.stack.split(",").map(item => item.trim()).filter(Boolean),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  portfolio: router({
    security: router({
      reportAdminAccessDenied: publicProcedure.input(adminAccessDeniedInput).mutation(async ({ ctx, input }) => {
        const origin = getRequestOrigin(ctx.req);
        const now = Date.now();
        const lastAlert = deniedAccessAlertByOrigin.get(origin) ?? 0;
        if (now - lastAlert < DENIED_ACCESS_ALERT_WINDOW_MS) return { notified: false, throttled: true } as const;
        deniedAccessAlertByOrigin.set(origin, now);
        const userAgent = String(ctx.req.headers?.["user-agent"] || "inconnu").slice(0, 240);
        const notified = await notifyOwner({
          title: "Accès admin refusé",
          content: `Chemin : ${input.path}\nMotif : ${input.reason}\nOrigine : ${origin}\nNavigateur : ${userAgent}`,
        });
        return { notified, throttled: false } as const;
      }),
    }),
    content: router({
      get: publicProcedure.query(getPortfolioSiteContent),
      update: adminProcedure.input(siteContentInput).mutation(async ({ input }) => upsertPortfolioSiteContent(input)),
    }),
    education: router({
      list: publicProcedure.query(listPortfolioEducation),
      create: adminProcedure.input(educationInput).mutation(async ({ input }) => createPortfolioEducation(input)),
      update: adminProcedure.input(idInput.extend({ data: educationInput.partial() })).mutation(async ({ input }) => updatePortfolioEducation(input.id, input.data)),
      delete: adminProcedure.input(idInput).mutation(async ({ input }) => deletePortfolioEducation(input.id)),
      reorder: adminProcedure.input(reorderInput).mutation(async ({ input }) => reorderPortfolioEducation(input.order)),
    }),
    profile: router({
      get: publicProcedure.query(getPortfolioProfile),
      update: adminProcedure.input(profileInput).mutation(async ({ input }) => upsertPortfolioProfile(input)),
      delete: adminProcedure.mutation(deletePortfolioProfile),
    }),
    skills: router({
      list: publicProcedure.query(listPortfolioSkills),
      create: adminProcedure.input(skillInput).mutation(async ({ input }) => createPortfolioSkill(input)),
      update: adminProcedure.input(idInput.extend({ data: skillInput.partial() })).mutation(async ({ input }) => updatePortfolioSkill(input.id, input.data)),
      delete: adminProcedure.input(idInput).mutation(async ({ input }) => deletePortfolioSkill(input.id)),
    }),
    projects: router({
      list: publicProcedure.query(async () => (await listPortfolioProjects()).map(toPublicProject)),
      bySlug: publicProcedure.input(z.object({ slug: z.string().min(2).max(120) })).query(async ({ input }) => {
        const project = await getPortfolioProjectBySlug(input.slug);
        return project ? toPublicProject(project) : null;
      }),
      create: adminProcedure.input(projectInput).mutation(async ({ input }) => createPortfolioProject(input)),
      update: adminProcedure.input(idInput.extend({ data: projectInput.partial() })).mutation(async ({ input }) => updatePortfolioProject(input.id, input.data)),
      delete: adminProcedure.input(idInput).mutation(async ({ input }) => deletePortfolioProject(input.id)),
      reorder: adminProcedure.input(reorderInput).mutation(async ({ input }) => reorderPortfolioProjects(input.order)),
    }),
    analytics: router({
      trackVisit: publicProcedure.input(analyticsEventInput).mutation(async ({ input }) => createPortfolioAnalyticsEvent({ eventType: "visit", sessionId: input.sessionId, path: input.path })),
      trackCvDownload: publicProcedure.input(analyticsEventInput).mutation(async ({ input }) => createPortfolioAnalyticsEvent({ eventType: "cv_download", sessionId: input.sessionId, path: input.path })),
      trackSocialClick: publicProcedure.input(socialClickInput).mutation(async ({ input }) => createPortfolioAnalyticsEvent({ eventType: input.platform === "github" ? "github_click" : "linkedin_click", sessionId: input.sessionId, path: input.path })),
      stats: adminProcedure.query(getPortfolioAnalyticsStats),
    }),
    certifications: router({
      list: publicProcedure.query(listPortfolioCertifications),
      uploadAttestation: adminProcedure.input(certificationAttestationUploadInput).mutation(async ({ input }) => uploadPortfolioCertificationAttestation(input)),
      create: adminProcedure.input(certificationInput).mutation(async ({ input }) => createPortfolioCertification(input)),
      update: adminProcedure.input(idInput.extend({ data: certificationInput.partial() })).mutation(async ({ input }) => updatePortfolioCertification(input.id, input.data)),
      delete: adminProcedure.input(idInput).mutation(async ({ input }) => deletePortfolioCertification(input.id)),
    }),
  }),

  contact: router({
    send: publicProcedure
      .input(contactMessageInput)
      .mutation(async ({ input }) => {
        const result = await createContactMessage(input);
        await sendContactEmail(input);
        await notifyOwner({
          title: `Nouveau message de ${input.name}`,
          content: `Email : ${input.email}\n\n${input.message}`,
        });
        return { success: true as const, id: result.id };
      }),
    inbox: router({
      list: adminProcedure.query(listContactMessages),
      markRead: adminProcedure.input(idInput.extend({ isRead: z.boolean() })).mutation(async ({ input }) => updateContactMessageRead(input.id, input.isRead)),
      delete: adminProcedure.input(idInput).mutation(async ({ input }) => deleteContactMessage(input.id)),
    }),
  }),
});

export type AppRouter = typeof appRouter;
