import prisma from "@/lib/prism";
import { Hearts } from "@/modules/lessons/ui/components/heart";
import { stripe } from "@/modules/shop/util/stripe";
import { NextResponse } from "next/server";
import type Stripe from "stripe";




export const POST = async (req: Request) => {
  let event: Stripe.Event;
  const signature = req.headers.get('stripe-signature');
  const webhook = process.env.STRIPE_WEB_HOOK;
  if (webhook) {
    try {
      event = stripe.webhooks.constructEvent(
        await (await req.blob()).text(),
        signature!,
        webhook
      );

      // customer.subscription.created
      // console.log(event.data.object?.metadata)
      // checkout.session.completed 

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      if (error! instanceof Error) {
        console.log(error)
      }
      console.log(error)
      return NextResponse.json(
        {
          message: errorMessage
        },
        {
          status: 400
        }
      )

    }

  }

  if (event!) {
    let data;
    switch (event.type) {
      case "checkout.session.completed": {
        data = event.data.object as Stripe.Checkout.Session;
        if (!data?.metadata?.userId) {
          throw new Error("User Id is required")
        }
        // console.log("is session for ", data?.metadata?.type)
        const user = await prisma.user.findUnique({
          where: {
            id: data.metadata.userId
          },
        })

        if (!user) {
          throw new Error("User not found")
        }

        if (data?.metadata.type === "refill") {
          await prisma.progress.update({
            where: {
              userId: data.metadata.userId
            },
            data: {
              hearts: 5
            }
          })

        } else {
          await prisma.user.update({
            where: {
              id: data.metadata.userId,

            },
            data: {
              isSubscribed: true,
              subscriptionId: data.subscription  as string,
            }
          })
        }
        console.log("checkout session =>", event)
        break;
      }
      case "customer.subscription.created": {
        data = event.data.object as Stripe.Subscription;
        console.log(data.metadata.userId)
        break;
      }
      case 'customer.subscription.deleted': {
        data = event.data.object as Stripe.Subscription;
        console.log("subscriptionId id =>", data.id)
        const user = await prisma.user.update({
          where: {
            subscriptionId: data.id as string,
          },
          data: {
            isSubscribed: false,
          }
        })
        console.log("user is =>", user.subscriptionId)
        break;
      }
      default: {
        console.log(`Unhandled event type .`);
        break;
      }
    }
  }
  return NextResponse.json({ message: "Recieved" }, { status: 200 });
}
