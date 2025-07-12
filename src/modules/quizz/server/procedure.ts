import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";




export const quizzRouter = createTRPCRouter({
  getCurrentCourse: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const progress = await ctx.db.progress.findUnique({
      where: {
        userId: user.id
      },
    })
    if (!progress) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You must select a course first"
      })
    }

    const course = await ctx.db.course.findUnique({
      where: {
        id: progress.activeCourseId
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

    const formatedUnits = await Promise.all(course?.units.map(async (unit) => {

      const formatedLesson = await Promise.all(unit?.lessons.map(async (lesson) => {
        const progress = await ctx.db.lessonProgress.findUnique({
          where: {
            userId_lessonId: {
              userId: user.id as string,
              lessonId: lesson.id as string
            }
          }
        })
        return {
          ...lesson,
          progress
        }
      }))

      return {
        ...unit,
        lessons: formatedLesson
      }
    }))

    return {
      course: {
        ...course,
        units: formatedUnits
      }
    };
  })
})
