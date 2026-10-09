import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useT } from "@/lib/copy";
import { formatMoney, tx } from "@/lib/data";
import {
  TOKEN_SYMBOL,
  allocMeta,
  allocOrder,
  clampAlloc,
  computeOffer,
  defaultAlloc,
  formatPrice,
  formatUnits,
  loadOffers,
  offerMemo,
  saveOffer,
  treasuryOf,
  utilities,
  type AllocId,
  type StoredOffer,
} from "@/lib/economy";
import { useLang } from "@/lib/lang";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const SLICE = [
  "var(--color-fg)",
  "var(--color-accent)",
  "var(--color-muted)",
  "var(--color-live)",
  "var(--color-warn)",
  "var(--color-subtle)",
];

export function EconomyDesk() {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const [supply, setSupply] = useState(100_000_000);
  const [priceCents, setPriceCents] = useState(12);
  const [floatPct, setFloatPct] = useState(12);
  const [lockup, setLockup] = useState(6);
  const [alloc, setAlloc] = useState(defaultAlloc);
  const [book, setBook] = useState<StoredOffer[]>([]);
  const [just, setJust] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBook(loadOffers());
  }, []);

  const math = useMemo(
    () => computeOffer({ supply, priceCents, floatPct, lockup, alloc }),
    [supply, priceCents, floatPct, lockup, alloc],
  );

  const pie = [
    ...allocOrder.map((id) => ({
      name: tx(lang, allocMeta[id].label),
      value: alloc[id],
    })),
    { name: t.economy.treasury, value: math.treasury },
  ];

  function setOne(id: AllocId, next: number) {
    setAlloc((prev) => {
      const capped = clampAlloc(prev, id, next);
      if (id === "community" && floatPct > capped.community) {
        setFloatPct(capped.community);
      }
      return capped;
    });
    setJust(false);
  }

  function publish() {
    const row: StoredOffer = {
      id: `prvz-${Date.now()}`,
      at: new Date().toISOString(),
      supply,
      priceCents,
      floatPct: math.floatPct,
      lockup,
      alloc,
      raise: math.raise,
      fdv: math.fdv,
    };
    setBook(saveOffer(row));
    setJust(true);
    setCopied(false);
  }

  async function copySheet() {
    const row: StoredOffer = {
      id: "draft",
      at: new Date().toISOString(),
      supply,
      priceCents,
      floatPct: math.floatPct,
      lockup,
      alloc,
      raise: math.raise,
      fdv: math.fdv,
    };
    const text = offerMemo(row, lang);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-5 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {TOKEN_SYMBOL}
        </p>
        <h3 className="mt-2 font-display text-3xl font-medium tracking-tight">
          {t.economy.tokenTitle}
        </h3>
        <p className="mt-3 text-sm text-muted">{t.economy.tokenBody}</p>
        <dl className="mt-8 grid grid-cols-2 gap-3">
          <Stat label={t.economy.supply} value={formatUnits(supply, lang)} />
          <Stat label={t.economy.price} value={formatPrice(priceCents, lang)} />
          <Stat label={t.economy.fdv} value={formatMoney(Math.round(math.fdv), lang)} />
          <Stat label={t.economy.raise} value={formatMoney(Math.round(math.raise), lang)} />
        </dl>
        <div className="mt-6 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pie}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={76}
                stroke="var(--color-surface)"
                strokeWidth={3}
              >
                {pie.map((entry, i) => (
                  <Cell key={entry.name} fill={SLICE[i] ?? SLICE[0]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  background: "var(--color-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  color: "var(--color-fg)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-1 text-xs text-muted">
          {pie.map((slice, i) => (
            <li key={slice.name} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ background: SLICE[i] ?? SLICE[0] }}
                />
                {slice.name}
              </span>
              <span className="tabular-nums">{slice.value}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-7 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          {t.economy.desk}
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
          {t.economy.allocTitle}
        </h3>
        <p className="mt-2 text-sm text-muted">{t.economy.allocBody}</p>

        <div className="mt-8 space-y-5">
          <Field label={t.economy.supply} value={formatUnits(supply, lang)}>
            <Slider
              aria-label={t.economy.supply}
              min={20_000_000}
              max={200_000_000}
              step={5_000_000}
              value={supply}
              onValueChange={(v) => {
                setSupply(v);
                setJust(false);
              }}
            />
          </Field>
          <Field label={t.economy.price} value={formatPrice(priceCents, lang)}>
            <Slider
              aria-label={t.economy.price}
              min={2}
              max={150}
              step={1}
              value={priceCents}
              onValueChange={(v) => {
                setPriceCents(v);
                setJust(false);
              }}
            />
          </Field>
          {allocOrder.map((id) => (
            <Field
              key={id}
              label={tx(lang, allocMeta[id].label)}
              value={`${alloc[id]}%`}
              hint={tx(lang, allocMeta[id].vest)}
            >
              <Slider
                aria-label={tx(lang, allocMeta[id].label)}
                min={0}
                max={allocMeta[id].max}
                step={1}
                value={alloc[id]}
                onValueChange={(v) => setOne(id, v)}
              />
            </Field>
          ))}
          <div className="flex items-center justify-between rounded-xl bg-elevated px-4 py-3 text-sm">
            <span className="text-muted">{t.economy.treasury}</span>
            <span className="tabular-nums">{treasuryOf(alloc)}%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
        {utilities.map((u) => (
          <article
            key={u.id}
            className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h3 className="font-medium tracking-tight">{tx(lang, u.title)}</h3>
            <p className="mt-2 text-sm text-muted">{tx(lang, u.body)}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-12 md:p-8">
        <h3 className="font-display text-2xl font-medium tracking-tight">
          {t.economy.offerTitle}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t.economy.offerBody}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Field
            label={t.economy.float}
            value={`${math.floatPct}% · ${formatUnits(math.tokensForSale, lang)}`}
          >
            <Slider
              aria-label={t.economy.float}
              min={0}
              max={Math.max(alloc.community, 1)}
              step={1}
              value={Math.min(floatPct, alloc.community)}
              onValueChange={(v) => {
                setFloatPct(v);
                setJust(false);
              }}
            />
          </Field>
          <Field
            label={t.economy.lockup}
            value={`${formatUnits(lockup, lang)} ${t.economy.months}`}
          >
            <Slider
              aria-label={t.economy.lockup}
              min={0}
              max={24}
              step={1}
              value={lockup}
              onValueChange={(v) => {
                setLockup(v);
                setJust(false);
              }}
            />
          </Field>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={publish}>
            {t.economy.publish}
          </Button>
          <Button type="button" variant="secondary" onClick={() => void copySheet()}>
            {copied ? t.economy.copied : t.economy.copy}
          </Button>
          {just ? <p className="text-xs text-live">{t.economy.published}</p> : null}
        </div>
      </div>

      <div className="lg:col-span-12">
        <h3 className="mb-4 font-display text-xl font-medium tracking-tight">
          {t.economy.book}
        </h3>
        {book.length === 0 ? (
          <p className="rounded-2xl bg-surface px-6 py-10 text-sm text-subtle shadow-[var(--shadow-border)]">
            {t.economy.bookEmpty}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-surface shadow-[var(--shadow-border)]">
            <table className="w-full min-w-[36rem] text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-subtle">
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-start font-medium">{t.economy.price}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.economy.float}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.economy.raise}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.economy.fdv}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.economy.lockup}</th>
                </tr>
              </thead>
              <tbody>
                {book.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 tabular-nums">{formatPrice(row.priceCents, lang)}</td>
                    <td className="px-5 py-3 tabular-nums">{row.floatPct}%</td>
                    <td className="px-5 py-3 tabular-nums">
                      {formatMoney(Math.round(row.raise), lang)}
                    </td>
                    <td className="px-5 py-3 tabular-nums">
                      {formatMoney(Math.round(row.fdv), lang)}
                    </td>
                    <td className="px-5 py-3 tabular-nums">
                      {formatUnits(row.lockup, lang)} {t.economy.months}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums text-fg">{value}</span>
      </div>
      {children}
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-elevated px-3 py-4">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-1 font-display text-lg tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}
