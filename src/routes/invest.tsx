import { createFileRoute } from "@tanstack/react-router";
import { Page, SectionHeader } from "@/components/page";
import { FundingCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { useT } from "@/lib/copy";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/invest")({ component: InvestPage });

function InvestPage() {
  const t = useT();
  const open = projects.filter((p) => p.funding);

  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.investPage.eyebrow}
          title={t.investPage.title}
          body={t.investPage.body}
        />
      </Reveal>
      <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-subtle">
        {t.investPage.openRounds}
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {open.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <FundingCard project={p} />
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {t.investPage.howTitle}
            </h3>
            <ol className="mt-6 space-y-4">
              {t.investPage.how.map((item, i) => (
                <li key={item} className="flex gap-4 text-sm text-muted">
                  <span className="font-display text-sm tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {t.investPage.termsTitle}
            </h3>
            <p className="mt-4 text-sm text-muted">{t.investPage.termsBody}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <aside className="mt-12 rounded-2xl border border-warn/20 bg-warn/5 p-6">
          <h3 className="text-sm font-medium text-warn">{t.investPage.disclaimerTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.investPage.disclaimer}</p>
        </aside>
      </Reveal>
    </Page>
  );
}
