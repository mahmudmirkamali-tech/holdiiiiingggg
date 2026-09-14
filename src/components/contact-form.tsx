import { useState, type FormEvent } from "react";
import { useT } from "@/lib/copy";
import { inquiryTypes, tx, type InquiryType } from "@/lib/data";
import { useLang } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Draft = {
  name: string;
  email: string;
  type: InquiryType | "";
  message: string;
};

function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ContactForm() {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const [type, setType] = useState<InquiryType | "">("");
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [formKey, setFormKey] = useState(0);

  function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const next: Draft = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      type: (String(fd.get("type") ?? "") || type) as InquiryType | "",
      message: String(fd.get("message") ?? ""),
    };
    const e: Partial<Record<keyof Draft, string>> = {};
    if (next.name.trim().length < 2) e.name = t.contactPage.errName;
    if (!validEmail(next.email.trim())) e.email = t.contactPage.errEmail;
    if (!next.type) e.type = t.contactPage.errType;
    if (next.message.trim().length < 12) e.message = t.contactPage.errMessage;
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    try {
      const key = "parvaz-inquiries";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
      localStorage.setItem(
        key,
        JSON.stringify([...prev, { ...next, at: new Date().toISOString(), lang }]),
      );
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)]">
        <h3 className="font-display text-2xl font-medium tracking-tight">
          {t.contactPage.successTitle}
        </h3>
        <p className="mt-3 text-sm text-muted">{t.contactPage.successBody}</p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => {
            setDone(false);
            setType("");
            setErrors({});
            setFormKey((k) => k + 1);
          }}
        >
          {t.contactPage.another}
        </Button>
      </div>
    );
  }

  return (
    <form
      key={formKey}
      onSubmit={submit}
      className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] md:p-8"
    >
      <input type="hidden" name="type" value={type} />
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-medium tracking-wide text-muted">
          {t.contactPage.type}
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {inquiryTypes.map((opt) => {
            const selected = type === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setType(opt.id)}
                className={cn(
                  "h-11 rounded-md text-sm transition-[box-shadow,color,background-color] duration-150",
                  selected
                    ? "bg-elevated text-fg shadow-[var(--shadow-border-hover)]"
                    : "text-muted shadow-[var(--shadow-border)] hover:text-fg",
                )}
              >
                {tx(lang, opt.label)}
              </button>
            );
          })}
        </div>
        {errors.type ? <p className="mt-2 text-xs text-warn">{errors.type}</p> : null}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">{t.contactPage.name}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={t.contactPage.namePh}
          />
          {errors.name ? <p className="mt-1.5 text-xs text-warn">{errors.name}</p> : null}
        </div>
        <div>
          <Label htmlFor="email">{t.contactPage.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder={t.contactPage.emailPh}
          />
          {errors.email ? <p className="mt-1.5 text-xs text-warn">{errors.email}</p> : null}
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="message">{t.contactPage.message}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t.contactPage.messagePh}
        />
        {errors.message ? <p className="mt-1.5 text-xs text-warn">{errors.message}</p> : null}
      </div>
      <Button type="submit" className="mt-6" disabled={busy}>
        {busy ? t.contactPage.sending : t.contactPage.send}
      </Button>
    </form>
  );
}
