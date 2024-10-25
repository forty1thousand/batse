import {
  ListboxButton as UnstyledListboxButton,
  ListboxOptions as UnstyledListboxOptions,
  ListboxOption as UnstyledListboxOption,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export { Listbox } from "@headlessui/react";

type ListboxButtonProps = React.PropsWithChildren<
  Omit<
    React.ComponentPropsWithoutRef<typeof UnstyledListboxButton>,
    "children" | "className"
  > & { className?: string }
>;

export let ListboxButton = forwardRef<
  React.ComponentRef<typeof UnstyledListboxButton>,
  ListboxButtonProps
>(({ className, children, ...props }, ref) => (
  <UnstyledListboxButton
    ref={ref}
    className={twMerge(
      "relative outline-outline flex items-center w-full rounded-lg border text-left border-faint py-1.5 px-1.5 text-sm/6 text-primary h-[32.5px] shadow-sm outline-1",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className="ml-auto stroke-muted size-4 mr-1"
      aria-hidden="true"
    />
  </UnstyledListboxButton>
));

export let ListboxOptions = forwardRef<
  React.ComponentRef<typeof UnstyledListboxOptions>,
  React.ComponentPropsWithRef<typeof UnstyledListboxOptions>
>(({ className, children, anchor, ...props }, ref) => (
  <UnstyledListboxOptions
    transition
    ref={ref}
    anchor={anchor ?? "bottom"}
    className={twMerge(
      "w-[--button-width] rounded-lg border border-faint bg-background p-2 z-[4] shadow",
      "transition duration-100 ease-in data-[leave]:scale-95 data-[leave]:data-[closed]:opacity-0 mt-2",
      className as string
    )}
    {...props}
  >
    {children}
  </UnstyledListboxOptions>
));

export let ListboxOption = forwardRef<
  React.ComponentRef<typeof UnstyledListboxOption>,
  React.ComponentPropsWithoutRef<typeof UnstyledListboxOption> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <UnstyledListboxOption
    ref={ref}
    className={twMerge(
      "rounded-lg select-none cursor-default data-[focus]:bg-faint/50 px-2 py-1 text-muted data-[selected]:text-primary font-light text-[15px]",
      className as string
    )}
    {...props}
  />
));
