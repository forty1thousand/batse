import { GenericHeader } from "@/app/components/text";
import { decrypt } from "@/app/lib/cookie";
import { db } from "@/app/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";

export default async function ({ children }: React.PropsWithChildren<{}>) {
  let value = cookies().get("zid")?.value;

  if (!value) return redirect("/login");

  let user = await db
    .selectFrom("users")
    .where("username", "=", decrypt(value))
    .selectAll()
    .executeTakeFirstOrThrow();

  if (!user.has_access) {
    return (
      <>
        <div className="flex flex-col md:flex-row select-none pointer-events-none blur-sm">
          <Sidebar user={user} />
        </div>
        <GenericHeader className="absolute top-4 left-1/4">
          Select a plan before you have access.
        </GenericHeader>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar user={user} />
        {children}
      </div>
    </>
  );
}
