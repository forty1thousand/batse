"use client";
import { RefObject } from "react";

export default function scrollToRef<T extends HTMLElement>(ref: RefObject<T | null>) {
  ref.current?.scrollIntoView({
    inline: "end",
    block: "end",
    behavior: "instant",
  });
}
