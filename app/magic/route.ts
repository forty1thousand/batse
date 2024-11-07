import { db } from "@/app/lib/db";
import { decrypt, encrypt } from "@/app/lib/cookie";
import { Role } from "@/app/lib/types";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let magic = req.nextUrl.searchParams.get("magic")!;

  // console.log(
  //   encrypt(
  //     JSON.stringify({
  //       email: "chessinato83@gmail.com",
  //       username: "ravin",
  //       role: "NORMAL",
  //       count: 0,
  //     })
  //   )
  // );

  // res.cookies.set("fuck", "you");
  // return res;

  // console.log(magic);

  try {
    let { email, username, role, count } = JSON.parse(decrypt(magic)) as {
      email: string;
      username: string;
      count: number;
      role: Role;
    };

    let { count: newCount } = (await db
      .selectFrom("tokens")
      .where("username", "=", username)
      .select("count")
      .executeTakeFirst()) || { count: 0 };

    if (newCount > count) throw null;

    if (count == 0) {
      await db.insertInto("tokens").values({ username, count: 1 }).execute();
    } else
      await db
        .updateTable("tokens")
        .set({ count: count + 1 })
        .where("username", "=", username)
        .execute();

    console.log("WORKED", email, username);

    // let res = NextResponse.redirect(new URL("/my/profile", new URL(req.url).origin), { status: 302 });

    let res = new NextResponse(
      "<script>window.location.href = '/my/profile'</script>",
      {
        headers: { "content-type": "text/html" },
      }
    );

    res.cookies.set("zid", encrypt(username), {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
      secure: process.env.PRODUCTION == "true",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return notFound();
  }
}
