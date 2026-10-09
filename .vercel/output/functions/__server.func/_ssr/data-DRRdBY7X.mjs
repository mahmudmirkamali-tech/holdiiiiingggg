import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as cn } from "./page-JKEwe9s0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-DRRdBY7X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0, instant = false }) {
	const ref = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(instant);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setOn(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setOn(true);
				io.disconnect();
			}
		}, { threshold: .12 });
		io.observe(el);
		return () => io.disconnect();
	}, [instant]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("reveal transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", on ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[2px]", className),
		style: { transitionDelay: on ? `${delay}ms` : "0ms" },
		children
	});
}
function tx(lang, value) {
	return typeof value === "string" ? value : value[lang];
}
var projects = [
	{
		id: "ami",
		name: "AI Market Intelligence",
		category: "saas",
		status: "live",
		progress: 85,
		stack: [
			"Python",
			"AI/ML",
			"Postgres"
		],
		featured: true,
		summary: {
			fa: "پلتفرم تحلیل بازار با پردازش احساسات، سیگنال‌های ساختاری و داده‌های لحظه‌ای.",
			en: "Market-intelligence platform combining sentiment, structure, and live data feeds."
		},
		detail: {
			fa: "AMI جریان‌های خبری، دادهٔ بازار و سیگنال‌های زنجیره‌ای را به خلاصه‌های قابل‌اقدام تبدیل می‌کند. محصول زنده است و روی دقت هشدار و پوشش جغرافیایی کار می‌کنیم.",
			en: "AMI turns news, market, and on-chain streams into briefings operators can act on. The product is live; we are deepening alert precision and geographic coverage."
		},
		funding: {
			target: 5e5,
			raised: 15e4,
			currency: "EUR"
		},
		repo: {
			name: "ami-core",
			language: "Python",
			stars: 42,
			commits: 318
		}
	},
	{
		id: "dap",
		name: "Decentralized Asset Protocol",
		category: "web3",
		status: "development",
		progress: 60,
		stack: [
			"Solidity",
			"Web3",
			"TypeScript"
		],
		featured: true,
		summary: {
			fa: "پروتکل توکن‌سازی دارایی‌های واقعی با مسیر روشن برای نقدشوندگی.",
			en: "A protocol for tokenizing real-world assets with a clear path to liquidity."
		},
		detail: {
			fa: "DAP مالکیت، نگهداری و انتقال دارایی‌های واقعی را روی زنجیره مدل می‌کند. تمرکز فعلی: انطباق حقوقی حوزه‌های منتخب و طراحی بازار ثانویه.",
			en: "DAP models ownership, custody, and transfer of real-world assets on-chain. Current focus: legal fit in selected jurisdictions and secondary-market design."
		},
		funding: {
			target: 25e4,
			raised: 12e4,
			currency: "EUR"
		},
		repo: {
			name: "dap-contracts",
			language: "Solidity",
			stars: 19,
			commits: 146
		}
	},
	{
		id: "gse",
		name: "Global Skills Exchange",
		category: "marketplace",
		status: "beta",
		progress: 75,
		stack: [
			"React",
			"Node.js",
			"AI"
		],
		featured: true,
		summary: {
			fa: "بازار مهارت‌های تخصصی با اعتبارسنجی مبتنی بر کار واقعی، نه رزومه.",
			en: "A specialist skills marketplace that verifies work, not resumes."
		},
		detail: {
			fa: "GSE متخصصان را از طریق نمونه‌کار و ارزیابی همتا به پروژه‌های واقعی وصل می‌کند. بتا باز است؛ موتور تطبیق و سیستم اعتبار در حال تکمیل است.",
			en: "GSE matches specialists to live work through samples and peer review. Beta is open; matching and reputation systems are being tightened."
		},
		repo: {
			name: "gse-web",
			language: "TypeScript",
			stars: 11,
			commits: 204
		}
	},
	{
		id: "lattice",
		name: "Lattice Ops",
		category: "infra",
		status: "development",
		progress: 45,
		stack: [
			"Go",
			"Kubernetes",
			"Observability"
		],
		summary: {
			fa: "لایهٔ عملیاتی برای تیم‌های کوچک که چند محصول را هم‌زمان می‌سازند.",
			en: "An operations layer for small teams shipping more than one product."
		},
		detail: {
			fa: "Lattice استقرار، مشاهده‌پذیری و بودجهٔ خطا را برای چند سرویس در یک سطح واحد جمع می‌کند تا استودیو بدون سنگینی سازمانی جلو برود.",
			en: "Lattice unifies deploy, observability, and error budgets across services so a studio can move without enterprise weight."
		},
		repo: {
			name: "lattice-ops",
			language: "Go",
			stars: 8,
			commits: 97
		}
	},
	{
		id: "northstar",
		name: "Northstar Research",
		category: "saas",
		status: "live",
		progress: 90,
		stack: [
			"TypeScript",
			"RAG",
			"Search"
		],
		summary: {
			fa: "میز تحقیق برای بنیان‌گذارها: پرسش، منبع، و یادداشت در یک جریان.",
			en: "A research desk for founders: question, source, and note in one flow."
		},
		detail: {
			fa: "Northstar اسناد، بازار و یادداشت‌های داخلی را به یک میز تحقیق واحد تبدیل می‌کند. نسخهٔ زنده در حال استفادهٔ داخلی است و به‌زودی دسترسی محدود خارجی می‌گیرد.",
			en: "Northstar folds documents, markets, and internal notes into one research desk. The live build is in internal use, with limited external access next."
		},
		repo: {
			name: "northstar",
			language: "TypeScript",
			stars: 27,
			commits: 412
		}
	},
	{
		id: "harbor",
		name: "Harbor Ledger",
		category: "saas",
		status: "beta",
		progress: 70,
		stack: [
			"TypeScript",
			"Finance",
			"Audit"
		],
		summary: {
			fa: "دفترکل سبک برای ونچرهای اولیه؛ شفافیت بدون نرم‌افزار سازمانی.",
			en: "A light ledger for early ventures — clarity without enterprise software."
		},
		detail: {
			fa: "Harbor جریان نقد، تعهدات و سقف هزینه را برای تیم‌های کوچک قابل‌خواندن می‌کند. بتا با چند شریک در حال آزمایش است.",
			en: "Harbor makes cash, commitments, and burn readable for small teams. Beta is running with a handful of partners."
		},
		funding: {
			target: 18e4,
			raised: 4e4,
			currency: "EUR"
		}
	},
	{
		id: "kite",
		name: "Kite Protocol",
		category: "web3",
		status: "research",
		progress: 25,
		stack: ["Research", "Cryptography"],
		summary: {
			fa: "پژوهش روی هویت قابل‌حمل و اعتبار بین‌پلتفرمی برای سازندگان.",
			en: "Research on portable identity and cross-platform credit for builders."
		},
		detail: {
			fa: "Kite هنوز محصول نیست. در حال نقشه‌برداری از مدل‌های هویت، ریسک سوءاستفاده و مسیرهای انطباق قبل از نوشتن پروتکل هستیم.",
			en: "Kite is not a product yet. We are mapping identity models, abuse risk, and compliance paths before writing a protocol."
		}
	}
];
var services = [
	{
		id: "product",
		icon: "layers",
		title: {
			fa: "معماری محصول",
			en: "Product architecture"
		},
		body: {
			fa: "از مسئله تا سطح سیستم: محدوده، مدل داده، و مسیر رسیدن به نسخهٔ قابل‌استفاده.",
			en: "From problem to system: scope, data model, and a path to something people can use."
		}
	},
	{
		id: "intel",
		icon: "scan",
		title: {
			fa: "هوش بازار",
			en: "Market intelligence"
		},
		body: {
			fa: "خواندن رقبا، تقاضا و زمان ورود — بدون گزارش تزئینی.",
			en: "Reading competitors, demand, and timing — without decorative reports."
		}
	},
	{
		id: "structure",
		icon: "structure",
		title: {
			fa: "ساختار ونچر",
			en: "Venture structure"
		},
		body: {
			fa: "شرکت، مالکیت فکری، و مسیر حقوقی متناسب با مرحله — نه قالب آماده.",
			en: "Entity, IP, and a legal path that fits the stage — not a template."
		}
	},
	{
		id: "capital",
		icon: "capital",
		title: {
			fa: "استراتژی سرمایه",
			en: "Capital strategy"
		},
		body: {
			fa: "چه زمانی سرمایه بگیرید، از چه کسی، و با چه روایتی. و چه زمانی نگیرید.",
			en: "When to raise, from whom, and with what story. And when not to."
		}
	},
	{
		id: "diligence",
		icon: "search",
		title: {
			fa: "بررسی فنی",
			en: "Technical diligence"
		},
		body: {
			fa: "خواندن معماری، ریسک و بدهی فنی برای بنیان‌گذار یا سرمایه‌گذار.",
			en: "Reading architecture, risk, and debt — for a founder or an investor."
		}
	},
	{
		id: "gtm",
		icon: "gtm",
		title: {
			fa: "ورود به بازار",
			en: "Go to market"
		},
		body: {
			fa: "اولین مشتری‌ها، کانال، قیمت، و روایتی که در جلسه دوام می‌آورد.",
			en: "First customers, channel, price, and a story that survives a meeting."
		}
	}
];
var timeline = [
	{
		year: "2021",
		title: {
			fa: "ساخت مستقل",
			en: "Independent building"
		},
		body: {
			fa: "شروع با محصول و تحقیق، قبل از اینکه استودیو نامی داشته باشد.",
			en: "Product and research, before the studio had a name."
		}
	},
	{
		year: "2022",
		title: {
			fa: "تأسیس PARVAZ",
			en: "PARVAZ founded"
		},
		body: {
			fa: "یک سقف برای ساخت، تحلیل و ساختار دادن به چند مسیر موازی.",
			en: "A roof for building, analysis, and structuring more than one path at once."
		}
	},
	{
		year: "2023",
		title: {
			fa: "اولین محصولات زنده",
			en: "First products live"
		},
		body: {
			fa: "دو محصول به استفادهٔ واقعی رسید؛ حلقهٔ بازخورد کوتاه شد.",
			en: "Two products reached real use. Feedback loops got shorter."
		}
	},
	{
		year: "2024",
		title: {
			fa: "میز سرمایه‌گذاری",
			en: "Investment desk"
		},
		body: {
			fa: "باز کردن مسیر شراکت برای ونچرهایی که ساختار و داده دارند.",
			en: "Opened a path for partners into ventures that already have structure and data."
		}
	},
	{
		year: "2025",
		title: {
			fa: "مشاورهٔ بنیان‌گذار",
			en: "Founder advisory"
		},
		body: {
			fa: "همین روش برای تیم‌های خارجی: محصول، بازار، ساختار.",
			en: "The same method, offered to outside teams: product, market, structure."
		}
	},
	{
		year: "2026",
		title: {
			fa: "هفت مسیر فعال",
			en: "Seven live paths"
		},
		body: {
			fa: "چهار محصول زنده، چند پروتکل در حال ساخت، و میز سرمایه باز.",
			en: "Four live products, protocols in flight, and an open capital desk."
		}
	}
];
var caseSteps = [
	{
		n: "01",
		title: {
			fa: "مسئله، نه ایده",
			en: "The problem, not the idea"
		},
		body: {
			fa: "یک بنیان‌گذار با ایدهٔ شلوغ آمد. اول مسئله را به یک جمله و یک کاربر مشخص تقلیل دادیم.",
			en: "A founder arrived with a crowded idea. We reduced it to one sentence and one named user."
		}
	},
	{
		n: "02",
		title: {
			fa: "بازار به‌اندازه",
			en: "A market of the right size"
		},
		body: {
			fa: "سه رقیب و دو کانال واقعی. اگر تقاضا در گفتگو ظاهر نمی‌شد، ادامه نمی‌دادیم.",
			en: "Three competitors, two real channels. If demand did not show up in conversation, we would have stopped."
		}
	},
	{
		n: "03",
		title: {
			fa: "ساخت باریک",
			en: "Build thin"
		},
		body: {
			fa: "نسخهٔ اول در شش هفته: یک جریان اصلی، بدون پنل‌های تزئینی.",
			en: "First version in six weeks: one core flow, no decorative surfaces."
		}
	},
	{
		n: "04",
		title: {
			fa: "ساختار و سرمایه",
			en: "Structure, then capital"
		},
		body: {
			fa: "بعد از استفادهٔ واقعی، شرکت و روایت سرمایه شکل گرفت — نه قبل از آن.",
			en: "Entity and capital narrative only after real use — not before."
		}
	}
];
var stats = [
	{
		value: 7,
		label: {
			fa: "پروژه فعال",
			en: "Active projects"
		}
	},
	{
		value: 4,
		label: {
			fa: "محصول زنده",
			en: "Live products"
		}
	},
	{
		value: 12,
		label: {
			fa: "مخزن عمومی",
			en: "Public repositories"
		}
	},
	{
		value: 5,
		label: {
			fa: "فرصت سرمایه",
			en: "Open opportunities"
		}
	}
];
var inquiryTypes = [
	{
		id: "invest",
		label: {
			fa: "سرمایه‌گذاری",
			en: "Investment"
		}
	},
	{
		id: "partner",
		label: {
			fa: "شراکت",
			en: "Partnership"
		}
	},
	{
		id: "advisory",
		label: {
			fa: "مشاوره",
			en: "Advisory"
		}
	},
	{
		id: "collab",
		label: {
			fa: "همکاری",
			en: "Collaboration"
		}
	}
];
function formatMoney(amount, lang) {
	const formatted = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", { maximumFractionDigits: 0 }).format(amount);
	return lang === "fa" ? `${formatted} یورو` : `€${formatted}`;
}
function fundingPct(p) {
	if (p.target <= 0) return 0;
	return Math.min(100, Math.round(p.raised / p.target * 100));
}
//#endregion
export { inquiryTypes as a, stats as c, fundingPct as i, timeline as l, caseSteps as n, projects as o, formatMoney as r, services as s, Reveal as t, tx as u };
