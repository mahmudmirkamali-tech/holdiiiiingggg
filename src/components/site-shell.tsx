import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/copy";
import { hydrateLang, useLang } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { ParvazMark } from "./mark";
import { Page } from "./page";
import { Button } from "./ui/button";

const links = [
  { to: "/", key: "home" as const },
  { to: "/projects", key: "projects" as const },
  { to: "/protocol", key: "protocol" as const },
  { to: "/economy", key: "economy" as const },
  { to: "/invest", key: "invest" as const },
  { to: "/advisory", key: "advisory" as const },
  { to: "/founder", key: "founder" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const toggle = useLang((s) => s.toggle);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    hydrateLang();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg" lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg"
      >
        {t.common.skip}
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
          isHome && !scrolled && !open
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-bg/90 backdrop-blur-md",
        )}
      >
        <Page className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-fg">
            <ParvazMark className="size-7" />
            <span className="text-sm font-medium tracking-[0.18em]">PARVAZ</span>
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {links
              .filter((l) => l.to !== "/")
              .map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative text-sm transition-colors duration-150",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {t.nav[l.key]}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggle}
              aria-label={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
            >
              {t.common.lang}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t.common.close : t.common.menu}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </Page>
        {open ? (
          <div className="border-t border-border bg-bg lg:hidden">
            <Page className="flex flex-col gap-1 py-3">
              {links.map((l) => {
                const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm",
                      active ? "bg-elevated text-fg" : "text-muted",
                    )}
                  >
                    {t.nav[l.key]}
                  </Link>
                );
              })}
            </Page>
          </div>
        ) : null}
      </header>
      <main id="main">{children}</main>
      <footer className="mt-8 border-t border-border">
        <Page className="grid gap-10 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <ParvazMark className="size-6" />
              <span className="text-sm font-medium tracking-[0.18em]">PARVAZ</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted">{t.footer.blurb}</p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-subtle">
              {t.footer.studio}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {links.slice(1).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted transition-colors hover:text-fg">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-subtle">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/invest" className="text-muted transition-colors hover:text-fg">
                  {t.footer.disclaimer}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted transition-colors hover:text-fg">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </Page>
        <Page className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-6 text-xs text-subtle">
          <span>© {new Date().getFullYear()} PARVAZ. {t.footer.rights}</span>
        </Page>
      </footer>
    </div>
  );
}
