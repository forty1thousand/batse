"use client";
export function isOverflow<T extends HTMLElement>(e: T) {
  return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
}
