import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prism";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      const extendUser = await prisma.user.findUnique({
        where: {
          id: user.id
        },
      })
      // console.log("user's attributes", extendUser)
      return {
        user: {
          ...extendUser,
        },
        ...session
      };
    }),
  ],
}) 
