import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  instant = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  instant?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(instant);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [instant]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        on ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[2px]",
        className,
      )}
      style={{ transitionDelay: on ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
