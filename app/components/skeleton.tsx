import { twMerge } from "tailwind-merge";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={twMerge("animate-pulse bg-muted", className)} {...props} />
  );
}
