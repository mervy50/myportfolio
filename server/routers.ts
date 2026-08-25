import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import {
  createContactMessage,
  createPortfolioCertification,
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

const certificationInput = z.object({
  title: z.string().trim().min(2).max(200),
  provider: z.string().trim().min(2).max(160),
  year: z.string().trim().regex(/^\d{4}$/).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional(),
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
    certifications: router({
      list: publicProcedure.query(listPortfolioCertifications),
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
  }),
});

export type AppRouter = typeof appRouter;
