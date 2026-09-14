import {
  Compass,
  GitBranch,
  Landmark,
  Layers,
  ScanSearch,
  Search,
} from "lucide-react";
import { tx, type services } from "@/lib/data";
import { useLang } from "@/lib/lang";

const icons = {
  layers: Layers,
  scan: ScanSearch,
  structure: GitBranch,
  capital: Landmark,
  search: Search,
  gtm: Compass,
};

export function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const lang = useLang((s) => s.lang);
  const Icon = icons[service.icon];
  return (
    <article className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-elevated text-accent">
        <Icon className="size-4" strokeWidth={1.6} />
      </div>
      <h3 className="font-display text-lg font-medium tracking-tight">
        {tx(lang, service.title)}
      </h3>
      <p className="mt-2 text-sm text-muted">{tx(lang, service.body)}</p>
    </article>
  );
}
