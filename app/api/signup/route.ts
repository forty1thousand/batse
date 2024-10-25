import { encrypt } from "@/app/lib/cookie";
import { SignupData, validateUser } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.cookies.has("zid"))
    return NextResponse.json({ error: "Signed in already" }, { status: 401 });

  let { email, username, role } = <SignupData>await req.json();

  let errors = await validateUser({
    email: email.toLowerCase(),
    username: username.toLowerCase(),
  });

  if (errors) return NextResponse.json({ errors });

  let data = JSON.stringify({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    role: role ?? "NORMAL",
    count: 0,
  });

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
    },
    body: JSON.stringify({
      to: email,
      from: "Batse <onboarding@resend.dev>",
      subject: "Batse - Verify your account",
      text: `Visit this magic link to verify your account! http://127.0.0.1:3000/magic/signup/?magic=${encrypt(
        data
      )}`,
    }),
  });

  return NextResponse.json({}, { status: 201 });
}
