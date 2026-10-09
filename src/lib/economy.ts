import type { Tx } from "./data";
import type { Lang } from "./lang";

export const TOKEN_SYMBOL = "PRVZ";
export const TOKEN_NAME = "PARVAZ";

export type AllocId = "founder" | "team" | "investors" | "community" | "ecosystem";

export const allocOrder: AllocId[] = [
  "founder",
  "team",
  "investors",
  "community",
  "ecosystem",
];

export const allocMeta: Record<
  AllocId,
  { label: Tx; vest: Tx; max: number }
> = {
  founder: {
    label: { fa: "بنیان‌گذار", en: "Founder" },
    vest: { fa: "۱۲ ماه قفل، سپس ۳۶ ماه", en: "12-month cliff, then 36 months" },
    max: 30,
  },
  team: {
    label: { fa: "تیم", en: "Team" },
    vest: { fa: "۶ ماه قفل، سپس ۳۶ ماه", en: "6-month cliff, then 36 months" },
    max: 25,
  },
  investors: {
    label: { fa: "شرکا", en: "Partners" },
    vest: { fa: "قفل همان برگهٔ عرضه", en: "Lock matches the offer sheet" },
    max: 40,
  },
  community: {
    label: { fa: "شناور عمومی", en: "Public float" },
    vest: { fa: "بخش قابل‌عرضه از همین سبد است", en: "The public tranche is cut from this bucket" },
    max: 40,
  },
  ecosystem: {
    label: { fa: "اکوسیستم", en: "Ecosystem" },
    vest: { fa: "مشاوره، گرنت، و نقدینگی محدود", en: "Advisory, grants, limited liquidity" },
    max: 20,
  },
};

export const defaultAlloc: Record<AllocId, number> = {
  founder: 18,
  team: 12,
  investors: 22,
  community: 20,
  ecosystem: 8,
};

export const utilities: { id: string; title: Tx; body: Tx }[] = [
  {
    id: "fee",
    title: { fa: "سهم کارمزد پروتکل", en: "Protocol fee share" },
    body: {
      fa: "ده درصد کوپن صدور DAP به خزانه می‌رود. بخش عمدهٔ آن بین PRVZ قفل‌شده تقسیم می‌شود.",
      en: "Ten percent of DAP issuance coupons go to treasury. Most of that is shared with locked PRVZ.",
    },
  },
  {
    id: "desk",
    title: { fa: "دسترسی به میز", en: "Desk access" },
    body: {
      fa: "قفل‌کردن واحد، پروندهٔ دورهای باز و یادداشت بنیان‌گذار را باز می‌کند.",
      en: "Locking units opens live rounds and the founder note.",
    },
  },
  {
    id: "advisory",
    title: { fa: "مشاوره با واحد", en: "Advisory in-token" },
    body: {
      fa: "ساعت مشاوره را می‌توان با PRVZ تسویه کرد — با تخفیف نسبت به فاکتور یورویی.",
      en: "Advisory hours can settle in PRVZ, at a discount to the euro invoice.",
    },
  },
  {
    id: "vote",
    title: { fa: "رأی روی دور بعد", en: "Vote the next round" },
    body: {
      fa: "دارندگان قفل‌شده انتخاب می‌کنند کدام ونچر میز سرمایه را باز کند. نه کدام توکن پامپ شود.",
      en: "Locked holders choose which venture opens the capital desk. Not which token to pump.",
    },
  },
];

export type OfferInput = {
  supply: number;
  priceCents: number;
  floatPct: number;
  lockup: number;
  alloc: Record<AllocId, number>;
};

export type OfferMath = {
  price: number;
  treasury: number;
  floatPct: number;
  tokensForSale: number;
  raise: number;
  fdv: number;
  allocSum: number;
};

export function treasuryOf(alloc: Record<AllocId, number>): number {
  const sum = allocOrder.reduce((n, id) => n + alloc[id], 0);
  return Math.max(0, 100 - sum);
}

export function computeOffer(input: OfferInput): OfferMath {
  const allocSum = allocOrder.reduce((n, id) => n + input.alloc[id], 0);
  const treasury = Math.max(0, 100 - allocSum);
  const floatPct = Math.max(0, Math.min(input.floatPct, input.alloc.community));
  const supply = Math.max(1, Math.round(input.supply));
  const price = Math.max(0, input.priceCents) / 100;
  const tokensForSale = Math.round((supply * floatPct) / 100);
  return {
    price,
    treasury,
    floatPct,
    tokensForSale,
    raise: tokensForSale * price,
    fdv: supply * price,
    allocSum,
  };
}

export function clampAlloc(
  alloc: Record<AllocId, number>,
  id: AllocId,
  next: number,
): Record<AllocId, number> {
  const others = allocOrder.filter((k) => k !== id).reduce((n, k) => n + alloc[k], 0);
  const cap = Math.min(allocMeta[id].max, Math.max(0, 100 - others));
  return { ...alloc, [id]: Math.max(0, Math.min(Math.round(next), cap)) };
}

export type StoredOffer = {
  id: string;
  at: string;
  supply: number;
  priceCents: number;
  floatPct: number;
  lockup: number;
  alloc: Record<AllocId, number>;
  raise: number;
  fdv: number;
};

const STORE_KEY = "parvaz-prvz-offers";

function isOffer(v: unknown): v is StoredOffer {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === "string" && typeof o.supply === "number" && typeof o.priceCents === "number";
}

export function loadOffers(): StoredOffer[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter(isOffer).slice(0, 6);
  } catch {
    return [];
  }
}

export function saveOffer(row: StoredOffer): StoredOffer[] {
  const next = [row, ...loadOffers()].slice(0, 6);
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

export function formatUnits(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPrice(cents: number, lang: Lang): string {
  const n = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
  return lang === "fa" ? `${n} یورو` : `€${n}`;
}

export function offerMemo(row: StoredOffer, lang: Lang): string {
  const math = computeOffer(row);
  const lines = allocOrder.map(
    (id) => `${allocMeta[id].label[lang]} ${row.alloc[id]}%`,
  );
  lines.push(`${lang === "fa" ? "خزانه" : "Treasury"} ${math.treasury}%`);
  const head =
    lang === "fa"
      ? `برگهٔ عرضهٔ ${TOKEN_SYMBOL}`
      : `${TOKEN_SYMBOL} offer sheet`;
  const body =
    lang === "fa"
      ? [
          `عرضهٔ کل: ${formatUnits(row.supply, lang)}`,
          `قیمت: ${formatPrice(row.priceCents, lang)}`,
          `شناور: ${math.floatPct}% (${formatUnits(math.tokensForSale, lang)} واحد)`,
          `مبلغ عرضه: ${formatUnits(Math.round(math.raise), lang)} یورو`,
          `ارزش کاملاً رقیق: ${formatUnits(Math.round(math.fdv), lang)} یورو`,
          `قفل خریداران: ${row.lockup} ماه`,
        ]
      : [
          `Supply: ${formatUnits(row.supply, lang)}`,
          `Price: ${formatPrice(row.priceCents, lang)}`,
          `Float: ${math.floatPct}% (${formatUnits(math.tokensForSale, lang)} units)`,
          `Raise: €${formatUnits(Math.round(math.raise), lang)}`,
          `FDV: €${formatUnits(Math.round(math.fdv), lang)}`,
          `Buyer lock: ${row.lockup} months`,
        ];
  return [head, ...body, ...lines].join("\n");
}
