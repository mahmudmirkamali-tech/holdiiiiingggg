import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-border bg-elevated px-3.5 text-sm text-fg placeholder:text-subtle",
        "transition-[box-shadow,border-color] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
