import { encrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { SigninData } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { email } = (await req.json()) as SigninData;

  let res = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (!res)
    return NextResponse.json({ errors: { email: "Email doesn't exist" } });

  let { username, role } = res;

  let { count } = (await db
    .selectFrom("tokens")
    .select("count")
    .where("username", "=", username)
    .executeTakeFirst()) ?? { count: 0 };

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
    },
    body: JSON.stringify({
      to: email,
      from: "Batse <onboarding@batse.app>",
      subject: "Batse - Verify your account",
      text: `Here is your signin link ${process.env.NEXT_PUBLIC_BASE_URL!}/magic/?magic=${encrypt(
        JSON.stringify({ email, username, role, count })
      )}`,
    }),
  });

  return NextResponse.json({});
}
