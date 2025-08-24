import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";


export const profileRoute = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user
    const progress = await ctx.db.progress.findUnique({
      where: {
        userId: user.id
      },
      include: {
        course: true
      }
    })
    return { user, progress }
  }),
  updateName: protectedProcedure.input(z.object({
    name: z.string().min(3)
  })).mutation(async ({ctx, input}) =>{
    const user = ctx.session.user
    await ctx.db.user.update({
      where : {
        id : user.id
      },
      data : {
        name : input.name
      }
    })
  })
})


