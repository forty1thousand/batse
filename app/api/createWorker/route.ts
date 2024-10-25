import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { User, validateUser } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  let value = req.cookies.get("zid")?.value;

  if (!value) return NextResponse.json({ error: "Not signed in" });

  let username = decrypt(value);

  let { deletedUser } = (await req.json()) as { deletedUser: string };

  let { office } = await db
    .selectFrom("users")
    .select("office")
    .where("username", "=", deletedUser)
    .executeTakeFirstOrThrow();

  if (office != username) return NextResponse.json({ errors: "Unauthorized" });

  await db
    .deleteFrom("appointments")
    .where("appointments.worker", "=", deletedUser)
    .execute();

  await db.deleteFrom("users").where("username", "=", deletedUser).execute();

  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  let value = req.cookies.get("zid")?.value;

  if (!value) return NextResponse.json({ error: "Not signed in" });

  let username = decrypt(value);

  let {
    city,
    email,
    username: workerName,
    tags,
    name,
  } = (await req.json()) as Pick<
    User,
    "city" | "email" | "username" | "tags" | "name"
  >;

  workerName = workerName.toLowerCase();
  email = email.toLowerCase();

  if (!workerName || !email)
    return NextResponse.json({
      errors: {
        username: workerName ? "" : "Required",
        email: email ? "" : "Required",
        tags: "",
        city: "",
      },
    });

  let errors = await validateUser({ email, username: workerName });

  if (errors)
    return NextResponse.json({
      errors,
    });

  let user = await db
    .selectFrom("users")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirstOrThrow();

  if (user.role !== "OFFICE")
    return NextResponse.json({
      errors: {
        role: "You are not an office",
      },
    });

  await db
    .insertInto("users")
    .values({
      username: workerName,
      city,
      email,
      tags,
      name,
      office: username,
      role: "WORKER",
    })
    .execute();

  return NextResponse.json({});
}
