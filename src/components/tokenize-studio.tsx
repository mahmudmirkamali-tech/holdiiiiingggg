import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useT } from "@/lib/copy";
import { formatMoney, tx } from "@/lib/data";
import { useLang } from "@/lib/lang";
import {
  assetClasses,
  computeIssuance,
  formatToken,
  formatUnits,
  loadIssuances,
  saveIssuance,
  type AssetClassId,
  type StoredIssuance,
} from "@/lib/tokenization";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const PIE_COLORS = [
  "var(--color-fg)",
  "var(--color-accent)",
  "var(--color-muted)",
];

export function TokenizeStudio() {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const [assetId, setAssetId] = useState<AssetClassId>("estate");
  const asset = assetClasses.find((a) => a.id === assetId) ?? assetClasses[0];
  const [nav, setNav] = useState(asset.nav);
  const [supply, setSupply] = useState(asset.supply);
  const [lockup, setLockup] = useState(asset.lockup);
  const [ledger, setLedger] = useState<StoredIssuance[]>([]);
  const [justIssued, setJustIssued] = useState(false);

  useEffect(() => {
    setLedger(loadIssuances());
  }, []);

  function selectAsset(id: AssetClassId) {
    const next = assetClasses.find((a) => a.id === id);
    if (!next) return;
    setAssetId(id);
    setNav(next.nav);
    setSupply(next.supply);
    setLockup(next.lockup);
    setJustIssued(false);
  }

  const math = useMemo(
    () => computeIssuance({ nav, supply, coupon: asset.coupon, lockup }),
    [nav, supply, asset.coupon, lockup],
  );

  const pie = [
    { name: t.protocol.holders, value: math.holders },
    { name: t.protocol.protocolShare, value: math.protocol },
    { name: t.protocol.spvShare, value: math.spv },
  ];

  function issue() {
    const row: StoredIssuance = {
      id: `${assetId}-${Date.now()}`,
      assetId,
      nav,
      supply,
      price: math.price,
      lockup,
      at: new Date().toISOString(),
    };
    setLedger(saveIssuance(row));
    setJustIssued(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
        {assetClasses.map((a) => {
          const on = a.id === assetId;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => selectAsset(a.id)}
              className={cn(
                "rounded-2xl p-5 text-start transition-[box-shadow,background-color] duration-150",
                on
                  ? "bg-elevated shadow-[var(--shadow-border-hover)]"
                  : "bg-surface shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
              )}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-accent">
                {tx(lang, a.location)}
              </p>
              <h3 className="mt-2 font-display text-lg font-medium tracking-tight">
                {tx(lang, a.name)}
              </h3>
              <p className="mt-2 text-sm text-muted">{tx(lang, a.summary)}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-7 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          {t.protocol.studio}
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
          {tx(lang, asset.name)}
        </h3>
        <p className="mt-2 text-sm text-muted">{tx(lang, asset.legal)}</p>

        <div className="mt-8 space-y-6">
          <Field
            label={t.protocol.nav}
            value={formatMoney(nav, lang)}
          >
            <Slider
              aria-label={t.protocol.nav}
              min={Math.round(asset.nav * 0.6)}
              max={Math.round(asset.nav * 1.4)}
              step={10_000}
              value={nav}
              onValueChange={setNav}
            />
          </Field>
          <Field
            label={t.protocol.supply}
            value={formatUnits(supply, lang)}
          >
            <Slider
              aria-label={t.protocol.supply}
              min={Math.round(asset.supply * 0.5)}
              max={Math.round(asset.supply * 1.5)}
              step={100}
              value={supply}
              onValueChange={setSupply}
            />
          </Field>
          <Field
            label={t.protocol.lockup}
            value={`${formatUnits(lockup, lang)} ${t.protocol.months}`}
          >
            <Slider
              aria-label={t.protocol.lockup}
              min={1}
              max={24}
              step={1}
              value={lockup}
              onValueChange={setLockup}
            />
          </Field>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={t.protocol.price} value={formatToken(math.price, lang)} />
          <Stat label={t.protocol.working} value={formatMoney(math.workingNav, lang)} />
          <Stat label={t.protocol.reserve} value={formatMoney(math.reserve, lang)} />
          <Stat
            label={t.protocol.coupon}
            value={`${(asset.coupon * 100).toFixed(1)}%`}
          />
        </dl>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-subtle">
              {t.protocol.yieldSplit}
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={72}
                    stroke="var(--color-surface)"
                    strokeWidth={4}
                  >
                    {pie.map((entry, i) => (
                      <Cell key={entry.name} fill={PIE_COLORS[i] ?? PIE_COLORS[0]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatMoney(Number(value), lang)}
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
            <ul className="mt-2 space-y-1 text-xs text-muted">
              <li>{t.protocol.holders}: {formatMoney(math.holders, lang)}</li>
              <li>{t.protocol.protocolShare}: {formatMoney(math.protocol, lang)}</li>
              <li>{t.protocol.spvShare}: {formatMoney(math.spv, lang)}</li>
            </ul>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-sm text-muted">{t.protocol.simNote}</p>
            <div className="mt-6">
              <Button type="button" onClick={issue}>
                {t.protocol.issue}
              </Button>
              {justIssued ? (
                <p className="mt-3 text-xs text-live">{t.protocol.issued}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12">
        <h3 className="mb-4 font-display text-xl font-medium tracking-tight">
          {t.protocol.ledger}
        </h3>
        {ledger.length === 0 ? (
          <p className="rounded-2xl bg-surface px-6 py-10 text-sm text-subtle shadow-[var(--shadow-border)]">
            {t.protocol.ledgerEmpty}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-surface shadow-[var(--shadow-border)]">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-subtle">
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-start font-medium">{t.protocol.asset}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.protocol.nav}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.protocol.supply}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.protocol.price}</th>
                  <th className="px-5 py-3 text-start font-medium">{t.protocol.lockup}</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((row) => {
                  const a = assetClasses.find((x) => x.id === row.assetId);
                  return (
                    <tr key={row.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3">{a ? tx(lang, a.name) : row.assetId}</td>
                      <td className="px-5 py-3 tabular-nums">{formatMoney(row.nav, lang)}</td>
                      <td className="px-5 py-3 tabular-nums">{formatUnits(row.supply, lang)}</td>
                      <td className="px-5 py-3 tabular-nums">{formatToken(row.price, lang)}</td>
                      <td className="px-5 py-3 tabular-nums">
                        {formatUnits(row.lockup, lang)} {t.protocol.months}
                      </td>
                    </tr>
                  );
                })}
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
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums text-fg">{value}</span>
      </div>
      {children}
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
