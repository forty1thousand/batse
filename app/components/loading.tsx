import { twMerge } from "tailwind-merge";

type LoadingProps = React.ComponentProps<"svg">;

export function Loading({ className, ...props }: LoadingProps) {
  return (
    <svg
      aria-label="Loading"
      className={twMerge("animate-step opacity-50", className)}
      role="img"
      viewBox="0 0 100 100"
      {...props}
    >
      <rect
        fill="currentColor"
        height="10"
        opacity="0"
        rx="5"
        ry="5"
        transform="rotate(-90 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.125"
        rx="5"
        ry="5"
        transform="rotate(-45 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.25"
        rx="5"
        ry="5"
        transform="rotate(0 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.375"
        rx="5"
        ry="5"
        transform="rotate(45 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.5"
        rx="5"
        ry="5"
        transform="rotate(90 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.625"
        rx="5"
        ry="5"
        transform="rotate(135 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.75"
        rx="5"
        ry="5"
        transform="rotate(180 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
      <rect
        fill="currentColor"
        height="10"
        opacity="0.875"
        rx="5"
        ry="5"
        transform="rotate(225 50 50)"
        width="28"
        x="67"
        y="45"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}
