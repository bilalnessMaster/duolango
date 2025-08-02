import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";


export const relessonRouter = createTRPCRouter({
  getLesson: protectedProcedure.input(z.object({
    lessonId: z.string(),
    unitId: z.string(),
  })).query(async ({ ctx, input }) => {

    const lesson = await ctx.db.lesson.findUnique({
      where: {
        id: input.lessonId,
        unitId: input.unitId,
      },
      include: {
        question: {
          include: {
            options: true
          }
        }
      }
    })

    return { lesson }
  }),
  saveProgress: protectedProcedure.input(z.object({
    completed: z.boolean(),
  })).mutation(async ({ ctx, input }) => {

    const user = ctx.session.user
    if (input.completed) {
      await ctx.db.progress.update({
        where: {
          userId: user.id!!
        },
        data: {
          hearts: {
            increment: 1
          },
        }
      })
    }

  }),
  getProgress: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const progress = await ctx.db.progress.findUnique({
      where: {
        userId: user.id
      },
    })
    return { progress, user };
  })
})
