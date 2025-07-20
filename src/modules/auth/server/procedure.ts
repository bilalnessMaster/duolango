import { headers as getHeaders } from 'next/headers'
import { auth } from "@/lib/auth";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";


export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async () => {

    const headers = await getHeaders();
    const session = await auth.api.getSession({
      headers
    })

    return session;
  }),
  signIn: baseProcedure.input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6, { message: "Password has to be atleast 6 characters long" }),
    })
  ).mutation(async ({ input }) => {
    await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password
      },
      asResponse: true
    })

  }),
  signUp: baseProcedure.input(
    z.object({
      age: z.number().min(12),
      email: z.string().email(),
      name: z.string().min(3),
      password: z.string().min(6, { message: "Password has to be atleast 6 characters long" }),
    })
  ).mutation(async ({ input }) => {
    await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password
      },
      asResponse: true
    })

  })

})
