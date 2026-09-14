import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, SectionHeader } from "@/components/page";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/copy";
import { services } from "@/lib/data";

export const Route = createFileRoute("/advisory")({ component: AdvisoryPage });

function AdvisoryPage() {
  const t = useT();
  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.advisoryPage.eyebrow}
          title={t.advisoryPage.title}
          body={t.advisoryPage.body}
        />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 50}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {t.advisoryPage.fitTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {t.advisoryPage.fit.map((item) => (
                <li key={item} className="border-s border-border ps-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {t.advisoryPage.notTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {t.advisoryPage.not.map((item) => (
                <li key={item} className="border-s border-border ps-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <div className="mt-12">
        <Button asChild>
          <Link to="/contact">{t.advisoryPage.cta}</Link>
        </Button>
      </div>
    </Page>
  );
}
