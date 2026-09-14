import type { ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-bg/80", className)}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-4 right-4 top-1/2 z-50 max-h-[85dvh] overflow-y-auto -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-border)] md:left-1/2 md:right-auto md:w-full md:max-w-lg md:-translate-x-1/2",
          "focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute end-4 top-4 rounded-md p-1 text-subtle transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label="Close"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-xl font-medium tracking-tight", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={cn("mt-2 text-sm text-muted", className)} {...props} />
  );
}
