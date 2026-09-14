import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, SectionHeader } from "@/components/page";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Input } from "@/components/ui/input";
import { useT } from "@/lib/copy";
import { projects, tx, type ProjectCategory } from "@/lib/data";
import { useLang } from "@/lib/lang";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({ component: ProjectsPage });

const cats: Array<ProjectCategory | "all"> = ["all", "saas", "web3", "marketplace", "infra"];

function ProjectsPage() {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const [cat, setCat] = useState<ProjectCategory | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!query) return true;
      const hay = [
        p.name,
        p.stack.join(" "),
        tx(lang, p.summary),
        t.cats[p.category],
        t.status[p.status],
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [cat, q, lang, t]);

  return (
    <Page className="py-16 md:py-24">
      <Reveal>
        <SectionHeader
          eyebrow={t.projectsPage.eyebrow}
          title={t.projectsPage.title}
          body={t.projectsPage.body}
        />
      </Reveal>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "h-10 rounded-full px-4 text-sm transition-[box-shadow,color] duration-150",
                cat === c
                  ? "bg-elevated text-fg shadow-[var(--shadow-border-hover)]"
                  : "text-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
            >
              {c === "all" ? t.projectsPage.all : t.cats[c]}
            </button>
          ))}
        </div>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.projectsPage.search}
          className="sm:max-w-xs"
          aria-label={t.projectsPage.search}
        />
      </div>
      {list.length === 0 ? (
        <p className="rounded-2xl bg-surface px-6 py-16 text-center text-sm text-subtle shadow-[var(--shadow-border)]">
          {t.projectsPage.empty}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 40}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}
    </Page>
  );
}
