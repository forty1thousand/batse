import { db } from "@/app/lib/db";
import { omitSensitiveFields } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { start, end, username } = (await req.json()) as {
    start: Date;
    end: Date;
    username: string;
  };

  let appointments = await db
    .selectFrom("appointments")
    .innerJoin("users", "users.username", "appointments.worker")
    .where((eb) =>
      eb.and([
        eb("worker", "=", username),
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

  return NextResponse.json({
    appointments: appointments.map(omitSensitiveFields),
  });
}
