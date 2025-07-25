
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";




export const courseRouter = createTRPCRouter({
  getCourses: protectedProcedure.query(async ({ ctx }) => {

    const user = ctx.session.user;

    const progress = await ctx.db.progress.findUnique({
      where: {
        userId: user.id
      },
    })
    const courses = await ctx.db.course.findMany()
    return { progress, courses };
  }),
  setCourse: protectedProcedure.input(z.object({
    courseId: z.string(),
  })).mutation(async ({ ctx, input }) => {

    const user = ctx.session.user;


    const course = await ctx.db.course.findUnique({
      where: {
        id: input.courseId
      },
      include: {
        units: {
          include: {
            lessons: true
          }
        }
      }
    })
    if (!course) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Course not found "
      })
    }
    await ctx.db.progress.upsert({
      where: {
        userId: user.id
      },
      update: {
        activeCourseId: course.id
      },
      create: {
        userId: user.id!!,
        activeCourseId: course.id
      }
    })
    return { success: true }
  })
})
