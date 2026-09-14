import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Page({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>{children}</div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "start" | "center";
}) {
  return (
    <header className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-medium tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base text-muted">{body}</p> : null}
    </header>
  );
}
