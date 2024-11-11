import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { deserializeAppointment } from "@/app/lib/serial";
import { SerializedAppointment } from "@/app/lib/types";
import { add, format } from "date-fns";
import { sql } from "kysely";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let value = req.cookies.get("zid")?.value;

  if (!value) return NextResponse.json({ error: "Not signed in" });

  let username = decrypt(value);

  let appointments = (await req.json()) as SerializedAppointment[];

  let workers = (
    await db
      .selectFrom("users")
      .select("username")
      .where("office", "=", username)
      .execute()
  ).map((v) => v.username);

  if (
    !appointments.every(
      (app) => app.worker == username || workers.includes(app.worker)
    )
  )
    return NextResponse.json({
      error: "Unauthorized to edit some appointment",
    });

  db.transaction().execute(async (trx) => {
    for (let app of appointments) {
      await sql`UPDATE appointments SET appointment_time = ${app.appointment_time}, status = ${app.status} WHERE id = ${app.id}`.execute(
        trx
      );
    }
  });

  await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
    },
    body: JSON.stringify(
      appointments.map(({ email, worker, appointment_time, status }) => ({
        to: email,
        from: "Batse <updates@batse.app>",
        subject: `Batse - Appointment with ${worker} updated!`,
        text: `You made an appointment with ${worker}. It is ${status.toLowerCase()}. It has also been updated to happen on ${format(
          appointment_time,
          "MMMM do yyyy"
        )} at ${format(appointment_time, "hh:mm a")}`,
      }))
    ),
  });

  console.log(appointments[0].appointment_time);

  return NextResponse.json({});
}
