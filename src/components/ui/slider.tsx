import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export function Slider({
  className,
  value,
  onValueChange,
  min,
  max,
  step,
  "aria-label": ariaLabel,
}: {
  className?: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  "aria-label": string;
}) {
  return (
    <SliderPrimitive.Root
      className={cn("relative flex h-11 w-full touch-none items-center", className)}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onValueChange(v[0] ?? min)}
      aria-label={ariaLabel}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-elevated">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-4 rounded-full bg-primary shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
    </SliderPrimitive.Root>
  );
}
