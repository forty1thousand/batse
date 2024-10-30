import { LinkButton } from "@/app/components/button";
import { Face } from "@/app/components/face";
import { Line } from "@/app/components/line";
import { Link } from "@/app/components/link";
import { GenericHeader, Subtle } from "@/app/components/text";
import { db } from "@/app/lib/db";
import { User } from "@/app/lib/types";
import { Luggage, Mail, Map } from "lucide-react";
import { notFound } from "next/navigation";
import { twJoin } from "tailwind-merge";

export default async function ({
  params: { username },
}: {
  params: { username: string };
}) {
  let user = await db
    .selectFrom("users")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirst();

  if (!user) return notFound();

  let workers: User[] = [];

  if (user?.role === "OFFICE") {
    (
      await db
        .selectFrom("users")
        .selectAll()
        .where("office", "=", user.username)
        .execute()
    ).forEach((w) => workers.push(w));
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-x-4 mb-4">
        <Face size="big" name={user.name ?? username} />
        <GenericHeader>{user.name ?? username}</GenericHeader>
        <div className="border border-faint rounded-lg py-1 px-2 ml-auto">
          <p>
            <span className="text-subtle">Role: </span>
            <span
              className={twJoin(
                "rounded-full text-sm px-2 py-0.5",
                user.role != "WORKER"
                  ? "bg-sky-500/10 text-sky-500"
                  : "bg-rose-500/10 text-rose-500"
              )}
            >
              {user.role}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        {user.role == "WORKER" && (
          <LinkButton href={`/book/${user.username}`} variant="seethru">
            <Mail className="size-4 mr-2" /> Book appointment
          </LinkButton>
        )}
      </div>
      <div className="w-full min-h-96 rounded-lg border border-faint mt-4 shadow-sm">
        <p className="p-1.5 font-medium">About</p>
        <Line />
        <div className="p-1.5">
          <Subtle className="flex items-center">
            <Map className="size-4 mr-1" /> Located in {user.city}
          </Subtle>
          {user.role == "OFFICE" ? (
            <>
              <p className="mt-2 text-primary/90">Employees</p>
              <Line className="my-2 w-60" />
              <ul className="grid grid-cols-1 gap-y-2">
                {workers.map((v) => (
                  <li
                    key={v.username}
                    className="flex items-center gap-x-2 border-faint"
                  >
                    <Face
                      name={v.name ?? v.username}
                      href={`/book/${v.username}`}
                    />
                    <Link gray href={`/book/${v.username}`}>
                      {v.name ?? v.username}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Subtle className="flex items-center">
              <Luggage className="size-4 mr-1" /> Works for
              <Link className="ml-1" gray href={`/at/${user.office}`}>
                {user.office}
              </Link>
            </Subtle>
          )}
        </div>
      </div>
    </div>
  );
}
