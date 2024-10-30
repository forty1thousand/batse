import { twMerge } from "tailwind-merge";

interface FormHeaderProps extends React.ComponentProps<"h1"> {}

export function FormHeader({ children, className, ...props }: FormHeaderProps) {
  return (
    <h1
      className={twMerge("text-4xl font-medium leading-snug", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

interface GenericHeaderProps extends FormHeaderProps {
  size?: "big" | "medium" | "small";
  h2?: boolean;
}

export function GenericHeader({
  children,
  className,
  size = "medium",
  h2,
  ...props
}: GenericHeaderProps) {
  let bonus = {
    big: "text-4xl",
    medium: "text-[1.65rem]",
    small: "text-2xl",
  }[size];

  return h2 ? (
    <h2
      className={twMerge("font-medium leading-snug", bonus, className)}
      {...props}
    >
      {children}
    </h2>
  ) : (
    <h1
      className={twMerge("font-medium leading-snug", bonus, className)}
      {...props}
    >
      {children}
    </h1>
  );
}

interface SubtleProps extends React.ComponentProps<"p"> {}

export function Headline({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={twMerge("text-4xl font-medium", className)}>{children}</p>
  );
}

export function Subtle({ children, className, ...props }: SubtleProps) {
  return (
    <p
      className={twMerge(
        "text-subtle text-sm font-light leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

interface LabelProps extends React.ComponentProps<"label"> {}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={twMerge("text-base font-light", className)} {...props}>
      {children}
    </label>
  );
}

interface SmallProps extends React.ComponentProps<"small"> {}

export function Small({ children, className, ...props }: SmallProps) {
  return (
    <small
      className={twMerge(
        "text-subtle text-[13px] font-light leading-tight inline-block",
        className
      )}
      {...props}
    >
      {children}
    </small>
  );
}
