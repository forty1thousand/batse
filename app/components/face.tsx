import Link from "next/link";
import { twJoin, twMerge } from "tailwind-merge";

export function Face({
  name,
  href,
  size = "small",
}: {
  name: string;
  href?: string;
  size?: "big" | "small";
}) {
  let special = name.toLowerCase().includes("q") && name.toLowerCase().endsWith("n");
  return (
    <Link
      href={href ?? "#"}
      className={twMerge(
        "rounded-full bg-gradient-to-t from-subtle size-[36px] shadow to-muted p-1.5 grid place-content-center",
        size != "small" && "size-[59px]",
        [
          "from-purple-800 to-purple-300",
          "from-orange-800 to-orange-300",
          "from-slate-600 to-slate-100",
          "from-teal-800 to-teal-300",
          "from-fuchsia-800 to-fuchsia-300",
          "from-slate-800 to-slate-300",
          "from-blue-800 to-blue-300",
          "from-lime-800 to-lime-300",
          "from-rose-800 to-rose-300",
          "from-stone-600 to-stone-100",
        ][name.length % 9],
        special && "from-black to-black dark:from-white dark:to-white"
      )}
    >
      <span
        className={twJoin(
          "pointer-events-none select-none text-center uppercase decoration-transparent",
          size != "small" && "text-lg",
          special ? "text-background" : "text-white"
        )}
      >
        {(name + " ")
          .split(" ", 2)
          .map((word) => word.at(0))
          .join("")}
      </span>
    </Link>
  );
}
