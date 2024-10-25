import { pool } from "@/app/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

let stripe = new Stripe(process.env.STRIPE_SECRET!);

let priceIds = ["price_1PakxcE6c6qG24dC0f3cJQ0E"];

export async function POST(req: NextRequest) {
  let body = await req.text();

  let signature = headers().get("stripe-signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(`Webhook event -- ${err}`);
    return NextResponse.json({ error: "there was an error" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        let email = event.data.object.customer_details?.email;

        let session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["line_items"] }
        );

        let priceId = session?.line_items?.data[0]?.price?.id;

        if (email) {
          pool.query(
            "UPDATE users SET has_access = true, price_id = $1 WHERE email = $2",
            [priceId, email]
          );
        } else {
          console.error(`Webhook event -- no email`);
          return NextResponse.json({ error: "No email" }, { status: 400 });
        }
      }
      default:
        break;
    }
  } catch (e) {
    console.error(`Stripe error: ${e}`);
  }

  return NextResponse.json({});
}
