import prisma from "@/lib/prism";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";




export const staticsRouter = createTRPCRouter({
  getStatics: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const progress = await ctx.db.progress.findUnique({
      where: {
        userId: user.id
      },
      include: {
        course: true
      }
    })

    return {progress , user};
  })
})
