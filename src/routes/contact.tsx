import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { Page, SectionHeader } from "@/components/page";
import { Reveal } from "@/components/reveal";
import { useT } from "@/lib/copy";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const t = useT();
  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.contactPage.eyebrow}
          title={t.contactPage.title}
          body={t.contactPage.body}
        />
      </Reveal>
      <Reveal>
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </Reveal>
    </Page>
  );
}
