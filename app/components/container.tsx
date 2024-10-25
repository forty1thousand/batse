import { twMerge } from "tailwind-merge";

export type ContainerProps = React.PropsWithChildren<
  React.HTMLProps<HTMLDivElement>
>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={twMerge(`w-screen sm:w-[85vw] mx-auto`, className)} {...props} />
  );
}
