import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, SectionHeader } from "@/components/page";
import { Reveal } from "@/components/reveal";
import { TokenizeStudio } from "@/components/tokenize-studio";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/copy";
import { tx } from "@/lib/data";
import { useLang } from "@/lib/lang";
import { pipeline, rails } from "@/lib/tokenization";

export const Route = createFileRoute("/protocol")({ component: ProtocolPage });

function ProtocolPage() {
  const t = useT();
  const lang = useLang((s) => s.lang);

  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.protocol.eyebrow}
          title={t.protocol.title}
          body={t.protocol.body}
        />
      </Reveal>

      <Reveal>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {pipeline.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-display text-sm tabular-nums text-accent">{step.n}</p>
              <h3 className="mt-2 font-medium tracking-tight">{tx(lang, step.title)}</h3>
              <p className="mt-2 text-sm text-muted">{tx(lang, step.body)}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <section className="mt-20">
        <Reveal>
          <SectionHeader
            eyebrow={t.protocol.railsEyebrow}
            title={t.protocol.railsTitle}
            body={t.protocol.railsBody}
          />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rails.map((rail) => (
            <Reveal key={rail.title.en}>
              <article className="h-full rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {tx(lang, rail.title)}
                </h3>
                <p className="mt-2 text-sm text-muted">{tx(lang, rail.body)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeader
            eyebrow={t.protocol.studioEyebrow}
            title={t.protocol.studioTitle}
            body={t.protocol.studioBody}
          />
        </Reveal>
        <TokenizeStudio />
      </section>

      <Reveal>
        <aside className="mt-16 rounded-2xl border border-warn/20 bg-warn/5 p-6">
          <h3 className="text-sm font-medium text-warn">{t.protocol.disclaimerTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.protocol.disclaimer}</p>
        </aside>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/invest">{t.protocol.ctaInvest}</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/contact">{t.protocol.ctaContact}</Link>
        </Button>
      </div>
    </Page>
  );
}
