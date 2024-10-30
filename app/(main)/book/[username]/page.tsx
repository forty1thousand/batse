import Client from "@/app/(main)/book/[username]/client";
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";

export default async function ({
  params: { username },
}: {
  params: { username: string };
}) {
  let res = await db
    .selectFrom("users")
    .select(["role", "name", "slot", "bookings_public"])
    .where("username", "=", username)
    .executeTakeFirst();

  if (!res) return notFound();

  let { name, slot, role, bookings_public } = res;

  if (role !== "WORKER") return notFound();

  return (
    <div className="p-4 md:w-4/5 w-full mx-auto">
      <Client data={{ name, slot, username, bookings_public }} />
    </div>
  );
}
