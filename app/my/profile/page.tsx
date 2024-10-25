import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { Client } from "./client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function () {
  let value = cookies().get("zid")?.value;

  if (!value) return redirect("/login")

  let data = await db.selectFrom("users").where("username", "=", decrypt(value)).selectAll().executeTakeFirstOrThrow();

  return <Client data={data} />;
}
