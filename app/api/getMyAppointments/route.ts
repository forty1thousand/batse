import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let value = req.cookies.get("zid")?.value;

  if (!value) return NextResponse.json({ error: "Not signed in" });

  let username = decrypt(value);

  let { start, end } = (await req.json()) as { start: Date; end: Date };

  let myAppointments = await db
    .selectFrom("appointments")
    .innerJoin("users", "users.username", "appointments.worker")
    .where((eb) =>
      eb.and([
        eb.or([eb("worker", "=", username), eb("users.office", "=", username)]),
        eb.between("appointment_time", start, end),
      ])
    )
    .select([
      "appointments.appointment_time",
      "appointments.created_at",
      "appointments.description",
      "appointments.id",
      "appointments.status",
      "appointments.updated_at",
      "appointments.email",
      "appointments.worker",
      "appointments.slot",
    ])
    .execute();

  return NextResponse.json({ myAppointments });
}
