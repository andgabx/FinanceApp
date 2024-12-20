import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing Stripe configuration");
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing Stripe signature");
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;


      const clerkUserId = invoice.metadata?.clerk_user_id;
      if (!clerkUserId) {
        console.error("No clerk_user_id in metadata");
        return NextResponse.error();
      }

      const clerk = await clerkClient();
      await clerk.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: invoice.customer as string,
          stripeSubscriptionId: invoice.subscription as string,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      console.log("User updated successfully");
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id
      );
      const clerkUserId = subscription.metadata.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }
      const clerk = await clerkClient();
      await clerk.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
  }
  return NextResponse.json({ received: true });
};
