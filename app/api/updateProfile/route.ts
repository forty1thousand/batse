import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { updateProfile } from "@/app/lib/request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let value = req.cookies.get("zid")?.value;

  if (!value) return NextResponse.json({ error: "Not signed in" });

  let username = decrypt(value);

  let json = (await req.json()) as Parameters<typeof updateProfile>[0];

  await db
    .updateTable("users")
    .set(json)
    .where("username", "=", username)
    .execute();

  return NextResponse.json({});
}
