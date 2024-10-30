import { twMerge } from "tailwind-merge";

interface LineProps extends React.ComponentProps<"div"> {
  variant?: "horizontal" | "vertical";
  className?: string;
  dotted?: boolean;
}

export function Line({
  variant = "horizontal",
  className,
  dotted,
  ...props
}: LineProps) {
  className = twMerge(
    variant == "horizontal" ? "h-px" : "w-px",
    dotted
      ? "bg-[repeating-linear-gradient(90deg,rgb(var(--faint)/1),rgb(var(--faint)/1)_10px,transparent_1px,transparent_20px)]"
      : "bg-faint",
    className
  );

  return <div {...props} className={className} />;
}
