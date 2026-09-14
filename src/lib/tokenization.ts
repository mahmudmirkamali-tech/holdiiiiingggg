import type { Tx } from "./data";

export type AssetClassId = "estate" | "invoices" | "commodity" | "infra";

export type AssetClass = {
  id: AssetClassId;
  name: Tx;
  location: Tx;
  summary: Tx;
  legal: Tx;
  nav: number;
  supply: number;
  coupon: number;
  lockup: number;
  unit: Tx;
};

export const assetClasses: AssetClass[] = [
  {
    id: "estate",
    name: { fa: "هاربر کورت", en: "Harbor Court" },
    location: { fa: "مسکونی، لیسبون", en: "Residential, Lisbon" },
    summary: {
      fa: "یک بلوک مسکونی با اجارهٔ جاری. توکن، سهم اقتصادی از SPV است نه سند تک‌واحد.",
      en: "A rented residential block. Tokens are an economic share of the SPV, not a title deed.",
    },
    legal: {
      fa: "SPV لوکزامبورگ، نگهداری نزد امین، انتقال محدود به سرمایه‌گذار حرفه‌ای.",
      en: "Luxembourg SPV, custodian hold, transfers limited to professional investors.",
    },
    nav: 4_200_000,
    supply: 42_000,
    coupon: 0.065,
    lockup: 12,
    unit: { fa: "واحد مسکونی تجمیعی", en: "Pooled residential units" },
  },
  {
    id: "invoices",
    name: { fa: "استخر فاکتور اتحادیه اروپا", en: "EU invoice pool" },
    location: { fa: "تجارت، چندکشور", en: "Trade finance, multi-country" },
    summary: {
      fa: "فاکتورهای کوتاه‌مدت SME با بیمهٔ اعتبار. نقدشوندگی از سررسید می‌آید، نه از بازار ثانویه.",
      en: "Short SME invoices with credit insurance. Liquidity comes from maturity, not a secondary book.",
    },
    legal: {
      fa: "واگذاری مطالبات + حساب جدا. توکن، ادعای قراردادی است نه اسکناس.",
      en: "Receivables assignment plus a segregated account. The token is a contractual claim, not a note.",
    },
    nav: 850_000,
    supply: 8_500,
    coupon: 0.09,
    lockup: 3,
    unit: { fa: "فاکتورهای بیمه‌شده", en: "Insured receivables" },
  },
  {
    id: "commodity",
    name: { fa: "مس انبارشده", en: "Warehouse copper" },
    location: { fa: "روتردام", en: "Rotterdam" },
    summary: {
      fa: "مس درجه‌یک در انبار گمرکی. اوراکل موجودی را به vault وصل می‌کند.",
      en: "Grade-A copper in a bonded warehouse. An oracle binds inventory to the vault.",
    },
    legal: {
      fa: "قبض انبار + بیمهٔ کامل. تحویل فیزیکی فقط در اندازهٔ استاندارد.",
      en: "Warehouse receipt plus full insurance. Physical delivery only in standard lots.",
    },
    nav: 1_100_000,
    supply: 11_000,
    coupon: 0.05,
    lockup: 6,
    unit: { fa: "تن مس", en: "Tonnes of copper" },
  },
  {
    id: "infra",
    name: { fa: "خورشیدی سقفی", en: "Rooftop solar SPV" },
    location: { fa: "اندلس، اسپانیا", en: "Andalusia, Spain" },
    summary: {
      fa: "قرارداد خرید برق بیست‌ساله. جریان نقد از تعرفه است، نه از حدس قیمت توکن.",
      en: "A twenty-year power-purchase agreement. Cash comes from the tariff, not token price guesses.",
    },
    legal: {
      fa: "SPV پروژه، رهن تجهیزات، پرداخت به حساب جمع‌آوری.",
      en: "Project SPV, equipment lien, payments into a collection account.",
    },
    nav: 2_600_000,
    supply: 26_000,
    coupon: 0.075,
    lockup: 18,
    unit: { fa: "کیلووات نصب‌شده", en: "Installed kW" },
  },
];

export const pipeline = [
  {
    n: "01",
    title: { fa: "منشأ", en: "Originate" },
    body: {
      fa: "مالکیت، بدهی، و هویت صادرکننده قبل از هر قرارداد زنجیره‌ای بررسی می‌شود.",
      en: "Title, liens, and the originator’s identity are checked before any on-chain contract.",
    },
  },
  {
    n: "02",
    title: { fa: "پوشش حقوقی", en: "Wrap" },
    body: {
      fa: "دارایی داخل SPV می‌رود. توکن ادعای اقتصادی است، نه خود ملک یا فلز.",
      en: "The asset sits in an SPV. The token is an economic claim, not the building or the metal.",
    },
  },
  {
    n: "03",
    title: { fa: "گواهی", en: "Attest" },
    body: {
      fa: "امین، ارزیاب و اوراکل روی یک عدد NAV به توافق می‌رسند.",
      en: "Custodian, valuer, and oracle agree a single NAV figure.",
    },
  },
  {
    n: "04",
    title: { fa: "ضرب", en: "Mint" },
    body: {
      fa: "واحدهای قابل‌انتقال فقط به‌اندازهٔ NAV ضرب می‌شوند. ذخیرهٔ نقد جدا نگه داشته می‌شود.",
      en: "Transferable units are minted only against NAV. A cash reserve is held aside.",
    },
  },
  {
    n: "05",
    title: { fa: "گردش", en: "Circulate" },
    body: {
      fa: "قفل زمانی، فهرست مجاز، و بازار ثانویهٔ محدود — نه دفتر سفارش عمومی.",
      en: "Lockup, an allow-list, and a limited secondary — not a public order book.",
    },
  },
] as const;

export const rails = [
  {
    title: { fa: "SPV", en: "SPV" },
    body: {
      fa: "مالک قانونی دارایی. توکن‌دار سهام اقتصادی دارد، نه کلید انبار.",
      en: "Legal owner of the asset. Token holders have economic rights, not the warehouse key.",
    },
  },
  {
    title: { fa: "Vault", en: "Vault" },
    body: {
      fa: "قرارداد ضرب و سوخت. سقف عرضه به NAV قفل است.",
      en: "Mint and burn contract. Supply is capped to NAV.",
    },
  },
  {
    title: { fa: "Oracle", en: "Oracle" },
    body: {
      fa: "قیمت و موجودی را از بیرون زنجیره می‌آورد — با تأخیر عمدی، نه لحظه‌ای.",
      en: "Brings price and inventory off-chain — with deliberate delay, not a live tick.",
    },
  },
  {
    title: { fa: "Allow-list", en: "Allow-list" },
    body: {
      fa: "فقط کیف‌های KYCشده می‌توانند بگیرند یا بفرستند.",
      en: "Only KYC’d wallets can receive or send.",
    },
  },
] as const;

const RESERVE = 0.02;
const SPLIT = { holders: 0.85, protocol: 0.1, spv: 0.05 } as const;

export type IssuanceInput = {
  nav: number;
  supply: number;
  coupon: number;
  lockup: number;
};

export type IssuanceMath = {
  price: number;
  reserve: number;
  workingNav: number;
  couponAnnual: number;
  holders: number;
  protocol: number;
  spv: number;
  lockup: number;
};

export function computeIssuance(input: IssuanceInput): IssuanceMath {
  const supply = Math.max(1, input.supply);
  const nav = Math.max(0, input.nav);
  const reserve = nav * RESERVE;
  const workingNav = nav - reserve;
  const couponAnnual = workingNav * input.coupon;
  return {
    price: workingNav / supply,
    reserve,
    workingNav,
    couponAnnual,
    holders: couponAnnual * SPLIT.holders,
    protocol: couponAnnual * SPLIT.protocol,
    spv: couponAnnual * SPLIT.spv,
    lockup: input.lockup,
  };
}

export type StoredIssuance = {
  id: string;
  assetId: AssetClassId;
  nav: number;
  supply: number;
  price: number;
  lockup: number;
  at: string;
};

const STORE_KEY = "parvaz-dap-issuances";

export function loadIssuances(): StoredIssuance[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter(isStored) as StoredIssuance[];
  } catch {
    return [];
  }
}

function isStored(v: unknown): v is StoredIssuance {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.assetId === "string" &&
    typeof o.nav === "number" &&
    typeof o.supply === "number"
  );
}

export function saveIssuance(row: StoredIssuance) {
  const next = [row, ...loadIssuances()].slice(0, 8);
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

export function clearIssuances() {
  localStorage.removeItem(STORE_KEY);
}

export function formatToken(amount: number, lang: "fa" | "en"): string {
  const n = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return lang === "fa" ? `${n} یورو` : `€${n}`;
}

export function formatUnits(n: number, lang: "fa" | "en"): string {
  return new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    maximumFractionDigits: 0,
  }).format(n);
}
