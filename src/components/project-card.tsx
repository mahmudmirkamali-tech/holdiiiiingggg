import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useT } from "@/lib/copy";
import {
  fundingPct,
  formatMoney,
  tx,
  type Project,
} from "@/lib/data";
import { useLang } from "@/lib/lang";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

function statusTone(status: Project["status"]) {
  if (status === "live") return "live" as const;
  if (status === "beta") return "accent" as const;
  if (status === "research") return "warn" as const;
  return "default" as const;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]">
        <p className="text-xs uppercase tracking-[0.14em] text-accent">
          {t.cats[project.category]}
        </p>
        <h3 className="mt-2 font-display text-xl font-medium tracking-tight">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{tx(lang, project.summary)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone={statusTone(project.status)}>{t.status[project.status]}</Badge>
          {project.stack.slice(0, 3).map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs text-subtle">
            <span>{t.projectsPage.progress}</span>
            <span className="tabular-nums">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>
        <Button variant="secondary" size="sm" className="mt-5 self-start" onClick={() => setOpen(true)}>
          {t.projectsPage.open}
        </Button>
      </article>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <p className="text-xs uppercase tracking-[0.14em] text-accent">
            {t.cats[project.category]}
          </p>
          <DialogTitle className="mt-1">{project.name}</DialogTitle>
          <DialogDescription>{tx(lang, project.detail)}</DialogDescription>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone={statusTone(project.status)}>{t.status[project.status]}</Badge>
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-subtle">
              <span>{t.projectsPage.progress}</span>
              <span className="tabular-nums">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function FundingCard({ project }: { project: Project }) {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const funding = project.funding;
  if (!funding) return null;
  const pct = fundingPct(funding);

  return (
    <article className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
      <p className="text-xs uppercase tracking-[0.14em] text-accent">
        {t.cats[project.category]}
      </p>
      <h3 className="mt-2 font-display text-xl font-medium tracking-tight">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{tx(lang, project.summary)}</p>
      <div className="mt-6 rounded-xl bg-elevated p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <span className="font-display text-2xl tabular-nums tracking-tight">
            {formatMoney(funding.target, lang)}
          </span>
          <span className="text-xs text-subtle">
            {formatMoney(funding.raised, lang)} {t.investPage.committed}
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={pct} />
        </div>
        <p className="mt-2 text-xs font-medium tabular-nums text-live">
          {pct}% {t.investPage.filled}
        </p>
      </div>
      <Button asChild variant="primary" size="sm" className="mt-5 self-start">
        <Link to="/contact">{t.investPage.more}</Link>
      </Button>
    </article>
  );
}
