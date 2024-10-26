"use client";
import { Button, LinkButton } from "@/app/components/button";
import { Line } from "@/app/components/line";
import { Link } from "@/app/components/link";
import { LocalState } from "@/app/components/localstate";
import { Subtle } from "@/app/components/text";
import { logout } from "@/app/lib/request";
import { User } from "@/app/lib/types";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

function NavigatorButton({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) {
  let pathname = usePathname();
  let valid = pathname.startsWith(href);

  return (
    <Link
      className={twJoin(
        "text-left rounded-lg transition text-subtle hover:bg-faint/50 active:bg-faint/75 shadow-none flex gap-2 p-2 items-center",
        valid && "text-primary bg-faint/30"
      )}
      href={href}
      noDecoration
    >
      {children}
    </Link>
  );
}

export default function ({ user }: { user: User }) {
  let router = useRouter();

  return (
    <aside className="md:flex hidden flex-col sticky top-0 w-fit md:w-44 p-4 md:h-screen shrink-0">
      <div className="flex gap-2 w-full items-center mb-4">
        <Line className="flex-1" />
        <Subtle>{user.username}</Subtle>
      </div>
      <NavigatorButton href="/my/profile">
        <span className="text-sm">Profile</span>
      </NavigatorButton>
      <NavigatorButton href="/my/appointments">
        <span className="text-sm">Appointments</span>
      </NavigatorButton>
      {user.role == "OFFICE" && (
        <NavigatorButton href="/my/management">
          <span className="text-sm">Management</span>
        </NavigatorButton>
      )}
      <div className="md:mt-auto" />
      <LinkButton
        href="mailto:chessinato@gmail.com"
        variant="text"
        className="relative h-fit w-full justify-start"
      >
        <span className="flex gap-x-2 items-center">Support</span>
      </LinkButton>
      <div>
        <LocalState initialState={false}>
          {(loading, setLoading) => (
            <Button
              variant="text"
              className="relative h-fit w-full justify-start"
              loading={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  await logout();

                  await new Promise((res) => setTimeout(res, 1e3));
                  router.push("/");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <span className="flex gap-x-2 items-center">
                Logout <LogOut className="w-3" />{" "}
              </span>
            </Button>
          )}
        </LocalState>
      </div>
    </aside>
  );
}
