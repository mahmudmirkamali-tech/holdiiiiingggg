import { useEffect, useRef, useState } from "react";
import { stats, tx } from "@/lib/data";
import { useLang } from "@/lib/lang";

function useCount(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let start: number | null = null;
    const dur = 700;
    let raf = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return n;
}

function Stat({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const n = useCount(value, on);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl bg-surface px-5 py-8 text-center shadow-[var(--shadow-border)]">
      <div className="font-display text-4xl font-medium tabular-nums tracking-tight text-fg">
        {n}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.12em] text-subtle">{label}</div>
    </div>
  );
}

export function StatsRow() {
  const lang = useLang((s) => s.lang);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((s) => (
        <Stat key={s.value + tx(lang, s.label)} value={s.value} label={tx(lang, s.label)} />
      ))}
    </div>
  );
}
