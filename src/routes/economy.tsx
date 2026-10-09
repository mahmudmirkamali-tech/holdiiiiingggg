import { createFileRoute, Link } from "@tanstack/react-router";
import { EconomyDesk } from "@/components/economy-desk";
import { Page, SectionHeader } from "@/components/page";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/copy";

export const Route = createFileRoute("/economy")({ component: EconomyPage });

function EconomyPage() {
  const t = useT();
  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.economy.eyebrow}
          title={t.economy.title}
          body={t.economy.body}
        />
      </Reveal>
      <EconomyDesk />
      <Reveal>
        <aside className="mt-12 rounded-2xl border border-warn/20 bg-warn/5 p-6">
          <h3 className="text-sm font-medium text-warn">{t.economy.disclaimerTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.economy.disclaimer}</p>
        </aside>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/contact">{t.economy.ctaContact}</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/protocol">{t.economy.ctaProtocol}</Link>
        </Button>
      </div>
    </Page>
  );
}
