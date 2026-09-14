import { createFileRoute } from "@tanstack/react-router";
import { GitCommitHorizontal, Star } from "lucide-react";
import { Page, SectionHeader } from "@/components/page";
import { Reveal } from "@/components/reveal";
import { useT } from "@/lib/copy";
import { caseSteps, projects, timeline, tx } from "@/lib/data";
import { useLang } from "@/lib/lang";

export const Route = createFileRoute("/founder")({ component: FounderPage });

function FounderPage() {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const repos = projects.filter((p) => p.repo);

  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.founderPage.eyebrow}
          title={t.founderPage.title}
          body={t.founderPage.body}
        />
      </Reveal>

      <Reveal>
        <div className="max-w-2xl rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]">
          <h3 className="font-display text-2xl font-medium tracking-tight">
            {t.founderPage.methodTitle}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t.founderPage.method}</p>
        </div>
      </Reveal>

      <section className="mt-20">
        <Reveal>
          <SectionHeader
            eyebrow={t.founderPage.caseEyebrow}
            title={t.founderPage.caseTitle}
            body={t.founderPage.caseBody}
          />
        </Reveal>
        <ol className="grid gap-4 md:grid-cols-2">
          {caseSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 50}>
              <li className="flex gap-5 rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full font-display text-sm text-accent shadow-[var(--shadow-border)]">
                  {step.n}
                </span>
                <div>
                  <h4 className="font-medium tracking-tight">{tx(lang, step.title)}</h4>
                  <p className="mt-2 text-sm text-muted">{tx(lang, step.body)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeader
            eyebrow={t.founderPage.timeEyebrow}
            title={t.founderPage.timeTitle}
          />
        </Reveal>
        <ol className="relative max-w-xl space-y-0 border-s border-border">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 40}>
              <li className="relative ps-8 pb-10 last:pb-0">
                <span className="absolute start-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-accent rtl:translate-x-1/2" />
                <p className="text-xs tabular-nums tracking-[0.14em] text-accent">{item.year}</p>
                <h4 className="mt-1 font-medium tracking-tight">{tx(lang, item.title)}</h4>
                <p className="mt-1.5 text-sm text-muted">{tx(lang, item.body)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeader
            eyebrow={t.projectsPage.publicWork}
            title={t.founderPage.workTitle}
            body={t.founderPage.workBody}
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <article className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
                <p className="font-mono text-sm text-fg">{p.repo?.name}</p>
                <p className="mt-2 text-sm text-muted">{tx(lang, p.summary)}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-subtle">
                  <span>{p.repo?.language}</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3.5" />
                    <span className="tabular-nums">{p.repo?.stars}</span>
                    {t.founderPage.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitCommitHorizontal className="size-3.5" />
                    <span className="tabular-nums">{p.repo?.commits}</span>
                    {t.founderPage.commits}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}
