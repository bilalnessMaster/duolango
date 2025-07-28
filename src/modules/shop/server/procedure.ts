import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { stripe } from "../util/stripe";

export type CheckoutMetadata = {
  userId: string;
  type: "subscription" | "refill";
}
export const shopRouter = createTRPCRouter({
  getSubscribe: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = ctx.session.user
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: 'price_1RpqC9Ko6sgP43Q6HySv91eN',
            quantity: 1,
          }
        ],
        mode: "subscription",
        success_url: `${process.env.BETTER_AUTH_URL}/shop?success=true`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/shop?success=false`,
        metadata: {
          userId: user.id,
          type: "subscription"
        } as CheckoutMetadata
      })
      if (!session) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong will create the session "
        })
      }
      return { url: session.url }
    }),
  getfill: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = ctx.session.user
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: 'price_1RptGZKo6sgP43Q6ZNxjgEPR',
            quantity: 1,
          }
        ],
        mode: "payment",
        success_url: `${process.env.BETTER_AUTH_URL}/shop?success=true`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/shop?success=false`,
        metadata: {
          userId: user.id,
          type: "refill"
        } as CheckoutMetadata
      })
      if (!session) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong will create the session "
        })
      }
      return { url: session.url }
    }),
})
