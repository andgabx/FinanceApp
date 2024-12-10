"use server";

import { Stripe } from "stripe";
import { auth } from "@clerk/nextjs/server";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: "Stripe secret key is not set" };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return { sessionId: session.id };
};
