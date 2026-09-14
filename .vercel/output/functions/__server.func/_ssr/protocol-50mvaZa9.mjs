import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang, n as SectionHeader, o as useT, r as cn, t as Page } from "./page-Dklxs7Uw.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./router-D1-LdyKS.mjs";
import { r as formatMoney, t as Reveal, u as tx } from "./data-D_9aqGr3.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as Pie, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protocol-50mvaZa9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var assetClasses = [
	{
		id: "estate",
		name: {
			fa: "هاربر کورت",
			en: "Harbor Court"
		},
		location: {
			fa: "مسکونی، لیسبون",
			en: "Residential, Lisbon"
		},
		summary: {
			fa: "یک بلوک مسکونی با اجارهٔ جاری. توکن، سهم اقتصادی از SPV است نه سند تک‌واحد.",
			en: "A rented residential block. Tokens are an economic share of the SPV, not a title deed."
		},
		legal: {
			fa: "SPV لوکزامبورگ، نگهداری نزد امین، انتقال محدود به سرمایه‌گذار حرفه‌ای.",
			en: "Luxembourg SPV, custodian hold, transfers limited to professional investors."
		},
		nav: 42e5,
		supply: 42e3,
		coupon: .065,
		lockup: 12,
		unit: {
			fa: "واحد مسکونی تجمیعی",
			en: "Pooled residential units"
		}
	},
	{
		id: "invoices",
		name: {
			fa: "استخر فاکتور اتحادیه اروپا",
			en: "EU invoice pool"
		},
		location: {
			fa: "تجارت، چندکشور",
			en: "Trade finance, multi-country"
		},
		summary: {
			fa: "فاکتورهای کوتاه‌مدت SME با بیمهٔ اعتبار. نقدشوندگی از سررسید می‌آید، نه از بازار ثانویه.",
			en: "Short SME invoices with credit insurance. Liquidity comes from maturity, not a secondary book."
		},
		legal: {
			fa: "واگذاری مطالبات + حساب جدا. توکن، ادعای قراردادی است نه اسکناس.",
			en: "Receivables assignment plus a segregated account. The token is a contractual claim, not a note."
		},
		nav: 85e4,
		supply: 8500,
		coupon: .09,
		lockup: 3,
		unit: {
			fa: "فاکتورهای بیمه‌شده",
			en: "Insured receivables"
		}
	},
	{
		id: "commodity",
		name: {
			fa: "مس انبارشده",
			en: "Warehouse copper"
		},
		location: {
			fa: "روتردام",
			en: "Rotterdam"
		},
		summary: {
			fa: "مس درجه‌یک در انبار گمرکی. اوراکل موجودی را به vault وصل می‌کند.",
			en: "Grade-A copper in a bonded warehouse. An oracle binds inventory to the vault."
		},
		legal: {
			fa: "قبض انبار + بیمهٔ کامل. تحویل فیزیکی فقط در اندازهٔ استاندارد.",
			en: "Warehouse receipt plus full insurance. Physical delivery only in standard lots."
		},
		nav: 11e5,
		supply: 11e3,
		coupon: .05,
		lockup: 6,
		unit: {
			fa: "تن مس",
			en: "Tonnes of copper"
		}
	},
	{
		id: "infra",
		name: {
			fa: "خورشیدی سقفی",
			en: "Rooftop solar SPV"
		},
		location: {
			fa: "اندلس، اسپانیا",
			en: "Andalusia, Spain"
		},
		summary: {
			fa: "قرارداد خرید برق بیست‌ساله. جریان نقد از تعرفه است، نه از حدس قیمت توکن.",
			en: "A twenty-year power-purchase agreement. Cash comes from the tariff, not token price guesses."
		},
		legal: {
			fa: "SPV پروژه، رهن تجهیزات، پرداخت به حساب جمع‌آوری.",
			en: "Project SPV, equipment lien, payments into a collection account."
		},
		nav: 26e5,
		supply: 26e3,
		coupon: .075,
		lockup: 18,
		unit: {
			fa: "کیلووات نصب‌شده",
			en: "Installed kW"
		}
	}
];
var pipeline = [
	{
		n: "01",
		title: {
			fa: "منشأ",
			en: "Originate"
		},
		body: {
			fa: "مالکیت، بدهی، و هویت صادرکننده قبل از هر قرارداد زنجیره‌ای بررسی می‌شود.",
			en: "Title, liens, and the originator’s identity are checked before any on-chain contract."
		}
	},
	{
		n: "02",
		title: {
			fa: "پوشش حقوقی",
			en: "Wrap"
		},
		body: {
			fa: "دارایی داخل SPV می‌رود. توکن ادعای اقتصادی است، نه خود ملک یا فلز.",
			en: "The asset sits in an SPV. The token is an economic claim, not the building or the metal."
		}
	},
	{
		n: "03",
		title: {
			fa: "گواهی",
			en: "Attest"
		},
		body: {
			fa: "امین، ارزیاب و اوراکل روی یک عدد NAV به توافق می‌رسند.",
			en: "Custodian, valuer, and oracle agree a single NAV figure."
		}
	},
	{
		n: "04",
		title: {
			fa: "ضرب",
			en: "Mint"
		},
		body: {
			fa: "واحدهای قابل‌انتقال فقط به‌اندازهٔ NAV ضرب می‌شوند. ذخیرهٔ نقد جدا نگه داشته می‌شود.",
			en: "Transferable units are minted only against NAV. A cash reserve is held aside."
		}
	},
	{
		n: "05",
		title: {
			fa: "گردش",
			en: "Circulate"
		},
		body: {
			fa: "قفل زمانی، فهرست مجاز، و بازار ثانویهٔ محدود — نه دفتر سفارش عمومی.",
			en: "Lockup, an allow-list, and a limited secondary — not a public order book."
		}
	}
];
var rails = [
	{
		title: {
			fa: "SPV",
			en: "SPV"
		},
		body: {
			fa: "مالک قانونی دارایی. توکن‌دار سهام اقتصادی دارد، نه کلید انبار.",
			en: "Legal owner of the asset. Token holders have economic rights, not the warehouse key."
		}
	},
	{
		title: {
			fa: "Vault",
			en: "Vault"
		},
		body: {
			fa: "قرارداد ضرب و سوخت. سقف عرضه به NAV قفل است.",
			en: "Mint and burn contract. Supply is capped to NAV."
		}
	},
	{
		title: {
			fa: "Oracle",
			en: "Oracle"
		},
		body: {
			fa: "قیمت و موجودی را از بیرون زنجیره می‌آورد — با تأخیر عمدی، نه لحظه‌ای.",
			en: "Brings price and inventory off-chain — with deliberate delay, not a live tick."
		}
	},
	{
		title: {
			fa: "Allow-list",
			en: "Allow-list"
		},
		body: {
			fa: "فقط کیف‌های KYCشده می‌توانند بگیرند یا بفرستند.",
			en: "Only KYC’d wallets can receive or send."
		}
	}
];
var RESERVE = .02;
var SPLIT = {
	holders: .85,
	protocol: .1,
	spv: .05
};
function computeIssuance(input) {
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
		lockup: input.lockup
	};
}
var STORE_KEY = "parvaz-dap-issuances";
function loadIssuances() {
	try {
		const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
		if (!Array.isArray(raw)) return [];
		return raw.filter(isStored);
	} catch {
		return [];
	}
}
function isStored(v) {
	if (!v || typeof v !== "object") return false;
	const o = v;
	return typeof o.id === "string" && typeof o.assetId === "string" && typeof o.nav === "number" && typeof o.supply === "number";
}
function saveIssuance(row) {
	const next = [row, ...loadIssuances()].slice(0, 8);
	localStorage.setItem(STORE_KEY, JSON.stringify(next));
	return next;
}
function formatToken(amount, lang) {
	const n = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);
	return lang === "fa" ? `${n} یورو` : `€${n}`;
}
function formatUnits(n, lang) {
	return new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", { maximumFractionDigits: 0 }).format(n);
}
function Slider({ className, value, onValueChange, min, max, step, "aria-label": ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center", className),
		value: [value],
		min,
		max,
		step,
		onValueChange: (v) => onValueChange(v[0] ?? min),
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow rounded-full bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full rounded-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-primary shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" })]
	});
}
var PIE_COLORS = [
	"var(--color-fg)",
	"var(--color-accent)",
	"var(--color-muted)"
];
function TokenizeStudio() {
	const t = useT();
	const lang = useLang((s) => s.lang);
	const [assetId, setAssetId] = (0, import_react.useState)("estate");
	const asset = assetClasses.find((a) => a.id === assetId) ?? assetClasses[0];
	const [nav, setNav] = (0, import_react.useState)(asset.nav);
	const [supply, setSupply] = (0, import_react.useState)(asset.supply);
	const [lockup, setLockup] = (0, import_react.useState)(asset.lockup);
	const [ledger, setLedger] = (0, import_react.useState)([]);
	const [justIssued, setJustIssued] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLedger(loadIssuances());
	}, []);
	function selectAsset(id) {
		const next = assetClasses.find((a) => a.id === id);
		if (!next) return;
		setAssetId(id);
		setNav(next.nav);
		setSupply(next.supply);
		setLockup(next.lockup);
		setJustIssued(false);
	}
	const math = (0, import_react.useMemo)(() => computeIssuance({
		nav,
		supply,
		coupon: asset.coupon,
		lockup
	}), [
		nav,
		supply,
		asset.coupon,
		lockup
	]);
	const pie = [
		{
			name: t.protocol.holders,
			value: math.holders
		},
		{
			name: t.protocol.protocolShare,
			value: math.protocol
		},
		{
			name: t.protocol.spvShare,
			value: math.spv
		}
	];
	function issue() {
		const row = {
			id: `${assetId}-${Date.now()}`,
			assetId,
			nav,
			supply,
			price: math.price,
			lockup,
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		setLedger(saveIssuance(row));
		setJustIssued(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:col-span-5",
				children: assetClasses.map((a) => {
					const on = a.id === assetId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => selectAsset(a.id),
						className: cn("rounded-2xl p-5 text-start transition-[box-shadow,background-color] duration-150", on ? "bg-elevated shadow-[var(--shadow-border-hover)]" : "bg-surface shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.14em] text-accent",
								children: tx(lang, a.location)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-lg font-medium tracking-tight",
								children: tx(lang, a.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: tx(lang, a.summary)
							})
						]
					}, a.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-7 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: t.protocol.studio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-2xl font-medium tracking-tight",
						children: tx(lang, asset.name)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: tx(lang, asset.legal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t.protocol.nav,
								value: formatMoney(nav, lang),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									"aria-label": t.protocol.nav,
									min: Math.round(asset.nav * .6),
									max: Math.round(asset.nav * 1.4),
									step: 1e4,
									value: nav,
									onValueChange: setNav
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t.protocol.supply,
								value: formatUnits(supply, lang),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									"aria-label": t.protocol.supply,
									min: Math.round(asset.supply * .5),
									max: Math.round(asset.supply * 1.5),
									step: 100,
									value: supply,
									onValueChange: setSupply
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t.protocol.lockup,
								value: `${formatUnits(lockup, lang)} ${t.protocol.months}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									"aria-label": t.protocol.lockup,
									min: 1,
									max: 24,
									step: 1,
									value: lockup,
									onValueChange: setLockup
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.protocol.price,
								value: formatToken(math.price, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.protocol.working,
								value: formatMoney(math.workingNav, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.protocol.reserve,
								value: formatMoney(math.reserve, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.protocol.coupon,
								value: `${(asset.coupon * 100).toFixed(1)}%`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs uppercase tracking-[0.14em] text-subtle",
								children: t.protocol.yieldSplit
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-48",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: pie,
										dataKey: "value",
										nameKey: "name",
										innerRadius: 48,
										outerRadius: 72,
										stroke: "var(--color-surface)",
										strokeWidth: 4,
										children: pie.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE_COLORS[i] ?? PIE_COLORS[0] }, entry.name))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										formatter: (value) => formatMoney(Number(value), lang),
										contentStyle: {
											background: "var(--color-elevated)",
											border: "1px solid var(--color-border)",
											borderRadius: 12,
											color: "var(--color-fg)",
											fontSize: 12
										}
									})] })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 space-y-1 text-xs text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										t.protocol.holders,
										": ",
										formatMoney(math.holders, lang)
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										t.protocol.protocolShare,
										": ",
										formatMoney(math.protocol, lang)
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										t.protocol.spvShare,
										": ",
										formatMoney(math.spv, lang)
									] })
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: t.protocol.simNote
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: issue,
									children: t.protocol.issue
								}), justIssued ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-live",
									children: t.protocol.issued
								}) : null]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-xl font-medium tracking-tight",
					children: t.protocol.ledger
				}), ledger.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-surface px-6 py-10 text-sm text-subtle shadow-[var(--shadow-border)]",
					children: t.protocol.ledgerEmpty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-2xl bg-surface shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-[0.12em] text-subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.protocol.asset
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.protocol.nav
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.protocol.supply
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.protocol.price
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.protocol.lockup
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ledger.map((row) => {
							const a = assetClasses.find((x) => x.id === row.assetId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: a ? tx(lang, a.name) : row.assetId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 tabular-nums",
										children: formatMoney(row.nav, lang)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 tabular-nums",
										children: formatUnits(row.supply, lang)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 tabular-nums",
										children: formatToken(row.price, lang)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-3 tabular-nums",
										children: [
											formatUnits(row.lockup, lang),
											" ",
											t.protocol.months
										]
									})
								]
							}, row.id);
						}) })]
					})
				})]
			})
		]
	});
}
function Field({ label, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-fg",
			children: value
		})]
	}), children] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-elevated px-3 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-lg tabular-nums tracking-tight",
			children: value
		})]
	});
}
function ProtocolPage() {
	const t = useT();
	const lang = useLang((s) => s.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.protocol.eyebrow,
				title: t.protocol.title,
				body: t.protocol.body
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
				children: pipeline.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tabular-nums text-accent",
							children: step.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-medium tracking-tight",
							children: tx(lang, step.title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: tx(lang, step.body)
						})
					]
				}, step.n))
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.protocol.railsEyebrow,
					title: t.protocol.railsTitle,
					body: t.protocol.railsBody
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: rails.map((rail) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "h-full rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-medium tracking-tight",
							children: tx(lang, rail.title)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: tx(lang, rail.body)
						})]
					}) }, rail.title.en))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.protocol.studioEyebrow,
					title: t.protocol.studioTitle,
					body: t.protocol.studioBody
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenizeStudio, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-16 rounded-2xl border border-warn/20 bg-warn/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-warn",
					children: t.protocol.disclaimerTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: t.protocol.disclaimer
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/invest",
						children: t.protocol.ctaInvest
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: t.protocol.ctaContact
					})
				})]
			})
		]
	});
}
//#endregion
export { ProtocolPage as component };
