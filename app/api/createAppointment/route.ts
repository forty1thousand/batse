import { db } from "@/app/lib/db";
import { NewAppointment } from "@/app/lib/types";
import { add, format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { appointment_time, description, email, worker, slot } =
    (await req.json()) as NewAppointment;

  let offset = new Date(appointment_time).getTimezoneOffset();

  appointment_time = add(appointment_time, { minutes: offset }).toISOString();

  if (description.length >= 540)
    return NextResponse.json({
      errors: { description: "Description is too long" },
    });
  if (email.length >= 54)
    return NextResponse.json({
      errors: { email: "Email is too long" },
    });
  if (email.length >= 54)
    return NextResponse.json({
      errors: { email: "Email is too long" },
    });

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
    },
    body: JSON.stringify({
      to: email,
      from: "Batse <onboarding@batse.app>",
      subject: "Batse - Scheduled appointment with " + worker,
      text: `You made an appointment with ${worker}. As of now it is happening on ${format(
        appointment_time,
        "MMMM do yyyy"
      )} at ${format(appointment_time, "hh:mm a")}`,
    }),
  });

  await db
    .insertInto("appointments")
    .values({
      appointment_time: new Date(appointment_time),
      description,
      email,
      worker,
      slot,
    })
    .execute();

  return NextResponse.json({});
}
