import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createContactMessage } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const contactMessageInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(10).max(5000),
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

  contact: router({
    send: publicProcedure
      .input(contactMessageInput)
      .mutation(async ({ input }) => {
        const result = await createContactMessage(input);
        await notifyOwner({
          title: `Nouveau message de ${input.name}`,
          content: `Email : ${input.email}\n\n${input.message}`,
        });
        return { success: true as const, id: result.id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
