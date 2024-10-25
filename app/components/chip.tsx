import { twMerge } from "tailwind-merge";

interface ChipProps extends React.ComponentProps<"div"> {}

export function Chip({ className, ...props }: ChipProps) {
  return (
    <div
      className={twMerge(
        "rounded-full shadow-sm border-faint border bg-background",
        className
      )}
      {...props}
    />
  );
}
