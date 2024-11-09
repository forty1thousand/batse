import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { deserializeAppointment } from "@/app/lib/serial";
import { SerializedAppointment } from "@/app/lib/types";
import { format } from "date-fns";
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
      let deserializedAppointment = deserializeAppointment(app);
      await trx
        .updateTable("appointments")
        .set({ ...deserializedAppointment })
        .where("id", "=", app.id)
        .execute();
    }
  });

  appointments.forEach(async ({ email, worker, appointment_time, status }) => {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
      },
      body: JSON.stringify({
        to: email,
        from: "Batse <onboarding@batse.app>",
        subject: `Batse - Appointment with ${worker} updated!`,
        text: `You made an appointment with ${worker}. It is ${status.toLowerCase()}. It has also been updated to happen on ${format(
          appointment_time,
          "MMMM do yyyy"
        )} at ${format(appointment_time, "hh:mm a")}`,
      }),
    })
  });

  return NextResponse.json({});
}
