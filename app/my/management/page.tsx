import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import Client from "@/app/my/management/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function () {
  let username = decrypt(cookies().get("zid")!.value);

  let { role, city, tags } = await db
    .selectFrom("users")
    .select("role")
    .select("city")
    .select("tags")
    .where("username", "=", username)
    .executeTakeFirstOrThrow();

  if (role != "OFFICE") return redirect("/my/profile");

  let workers = await db
    .selectFrom("users")
    .selectAll()
    .where("office", "=", username)
    .execute();

  let { cnt } = await db
    .selectFrom("appointments")
    .innerJoin("users", "users.username", "appointments.worker")
    .where("users.office", "=", username)
    .select(db.fn.count("appointments.id").as("cnt"))
    .executeTakeFirstOrThrow();

  return (
    <div className="flex-1 p-4 md:mx-16 lg:mx-36">
      <Client
        totalAppointments={Number(cnt)}
        city={city}
        tags={tags}
        workers={workers}
      />
    </div>
  );
}
