import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

let Client = dynamic(() => import("@/app/my/appointments/client"), {
  ssr: false,
});

export default async function () {
  let username = decrypt(cookies().get("zid")?.value ?? "");

  let { role } = await db
    .selectFrom("users")
    .select("role")
    .where("username", "=", username)
    .executeTakeFirstOrThrow();

  return <Client role={role} />;
}
