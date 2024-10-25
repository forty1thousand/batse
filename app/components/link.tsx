import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  noDecoration?: boolean;
  gray?: boolean;
}

export function Link({
  className,
  children,
  noDecoration,
  gray,
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={twMerge(
        "hover:underline underline-offset-[2.1px]",
        gray ? "text-primary" : "text-outline",
        noDecoration && "decoration-transparent hover:decoration-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
