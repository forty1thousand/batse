"use client";
import { Check } from "lucide-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CheckBoxProps extends React.ComponentProps<"button"> {
  checked?: boolean;
  variant?: never;
}

export function CheckBox({ checked, className, id, ...props }: CheckBoxProps) {
  return (
    <button
      type="button"
      data-checked={checked}
      aria-checked={checked}
      className={twMerge(
        "peer group transition shadow focus:outline outline-offset-1 outline-outline w-[14px] h-[14px] rounded data-[checked=false]:border border-muted inline-block data-[checked=true]:bg-primary",
        className
      )}
      defaultChecked
      name={id}
      id={id}
      {...props}
    >
      <Check
        strokeWidth={3}
        width={9}
        height={9}
        className="mx-auto stroke-background invisible group-data-[checked=true]:visible"
      />
    </button>
  );
}
