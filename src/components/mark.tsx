import { cn } from "@/lib/utils";

export function ParvazMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("text-accent", className)}
    >
      <path
        d="M6 28 L16 10 L23 20 L34 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="9" r="2" fill="currentColor" className="text-fg" />
    </svg>
  );
}
