import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import "./globals.css";

export let metadata = {
  title: "Untitled",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.ico",
        href: "/favicon-dark.ico",
      },
    ],
  },
} as Metadata;

export default function ({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={twMerge("bg-background")}>{children}</body>
    </html>
  );
}
