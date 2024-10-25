"use client";
import { Button } from "@/app/components/button";
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
} from "@headlessui/react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export { TabGroup, TabPanel, TabPanels } from "@headlessui/react";

export let Tab = forwardRef<
  React.ComponentRef<typeof UnstyledTab>,
  React.ComponentProps<typeof UnstyledTab> & {
    className?: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
  }
>(({ className, variant = "text", ...props }, ref) => (
  <UnstyledTab
    // @ts-ignore
    variant={variant}
    ref={ref}
    as={Button}
    className={twMerge(
      "data-[selected]:bg-faint/75 outline-transparent",
      className
    )}
    {...props}
  />
));

export function TabList({
  className,
  ...props
}: React.ComponentProps<typeof UnstyledTabList> & { className?: string }) {
  return <UnstyledTabList className={twMerge("flex", className)} {...props} />;
}
