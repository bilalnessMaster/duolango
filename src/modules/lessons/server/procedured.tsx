import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";


export const lessonRouter = createTRPCRouter({
  getLesson: protectedProcedure.query(async ({ ctx }) => {

    console.log("entre the query : ")
    const user = ctx.session.user
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are  unauthenticated"
      })
    }


    const lessonProgress = await ctx.db.lessonProgress.findFirst({
      where: {
        userId: user.id,
        OR: [
          { state: "not_started" },
          { state: "in_progress" },
        ]
      }
    })

    if (!lessonProgress) {

      const progress = await ctx.db.progress.findUnique({ where: { userId: user.id } })

      if (!progress?.activeCourseId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No active course found for user"
        })
      }
      const course = await ctx.db.course.findUnique({
        where: {
          id: progress?.activeCourseId
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


      const currentLesson = course.units
        .flatMap(unit => unit.lessons)
        .find(lesson => lesson != null)

      if (!currentLesson) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No lessons found in course"
        })
      }

      const currentlessonId = currentLesson.id

      const lesson = await ctx.db.lesson.findUnique({
        where: {
          id: currentlessonId
        },
        include: {
          question: {
            include: {
              options: true
            }
          }
        }
      })

      if (!lesson) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "lesson not found "
        })
      }


      await ctx.db.lessonProgress.create({
        data: {
          userId: user.id!!,
          lessonId: lesson.id,
          state: "in_progress",

        }
      })

      return { lesson }
    }

    console.log("we have any progres : ")
    const lesson = await ctx.db.lesson.findUnique({
      where: {
        id: lessonProgress.lessonId
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
    unitId: z.string(),
    lessonId: z.string(),
    isCorrect: z.boolean(),
    lastquestionAnswer: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const user = ctx.session.user
    await ctx.db.progress.update({
      where: {
        userId: user.id!!
      },
      data: {
        // order : input.question
        hearts: { increment: !input.isCorrect ? -1 : 0 },
        points: { increment: input.isCorrect ? 1 : 0 },
      }
    })

  }),
  getProgress: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const progress = await ctx.db.progress.findUnique({
      where: {
        userId: user.id
      },
    })

    return progress;
  })
})
