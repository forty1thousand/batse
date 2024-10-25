import { Loading } from "@/app/components/loading";
import Link from "next/link";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

let primary =
  "bg-primary hover:bg-primary/80 active:bg-primary/60 text-background";
let seethru =
  "border border-faint bg-transparent hover:bg-faint/40 active:bg-faint/75";
let destructive =
  "bg-destructive hover:bg-destructive/90 active:bg-destructive/80 text-background";
let warn = "bg-warn hover:bg-warn/90 active:bg-warn/80 text-background";
let outline =
  "bg-outline hover:bg-outline/90 active:bg-outline/80 text-white";
let text = "text-left text-subtle hover:bg-faint/50 active:bg-faint/75 shadow-none";

export let variants = {
  primary,
  seethru,
  destructive,
  warn,
  outline,
  text,
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: keyof typeof variants;
  loading?: boolean;
}

export let Button = forwardRef<React.ComponentRef<"button">, ButtonProps>(({
  children,
  className,
  disabled,
  variant = "seethru",
  loading = false,
  ...props
}, ref) => {
  className = twMerge(
    variants[variant],
    className
  );

  return (
    <button
      ref={ref}
      className={twMerge(
        "flex justify-center items-center rounded-lg shadow-sm transition p-2 text-sm disabled:opacity-50 disabled:pointer-events-none outline-outline outline-1",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loading className="size-4" /> : children}
    </button>
  );
})

interface LinkButtonProps
  extends React.ComponentProps<typeof Link>,
    Pick<ButtonProps, "variant" | "loading"> {}

export function LinkButton({
  className,
  children,
  loading = false,
  variant = "seethru",
  ...props
}: LinkButtonProps) {

  className = twMerge(
    variants[variant],
    className
  );

  return (
    <Link
      className={twMerge(
        "flex justify-center items-center rounded-lg shadow-sm transition p-2 text-sm disabled:opacity-50 disabled:pointer-events-none outline-outline outline-1",
        className
      )}
      {...props}
    >
      {loading ? <Loading className="size-4" /> : children}
    </Link>
  );
}
