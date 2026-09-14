import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-lg border border-border bg-elevated px-3.5 py-3 text-sm text-fg placeholder:text-subtle",
      "transition-[box-shadow,border-color] duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
