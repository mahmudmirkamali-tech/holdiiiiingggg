import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang, n as SectionHeader, o as useT, t as Page } from "./page-JKEwe9s0.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./router-DgUg2CBS.mjs";
import { r as formatMoney, t as Reveal, u as tx } from "./data-DRRdBY7X.mjs";
import { t as Slider } from "./slider-DfW3y2UT.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as Pie, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/economy-C2R1VoTz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOKEN_SYMBOL = "PRVZ";
var allocOrder = [
	"founder",
	"team",
	"investors",
	"community",
	"ecosystem"
];
var allocMeta = {
	founder: {
		label: {
			fa: "بنیان‌گذار",
			en: "Founder"
		},
		vest: {
			fa: "۱۲ ماه قفل، سپس ۳۶ ماه",
			en: "12-month cliff, then 36 months"
		},
		max: 30
	},
	team: {
		label: {
			fa: "تیم",
			en: "Team"
		},
		vest: {
			fa: "۶ ماه قفل، سپس ۳۶ ماه",
			en: "6-month cliff, then 36 months"
		},
		max: 25
	},
	investors: {
		label: {
			fa: "شرکا",
			en: "Partners"
		},
		vest: {
			fa: "قفل همان برگهٔ عرضه",
			en: "Lock matches the offer sheet"
		},
		max: 40
	},
	community: {
		label: {
			fa: "شناور عمومی",
			en: "Public float"
		},
		vest: {
			fa: "بخش قابل‌عرضه از همین سبد است",
			en: "The public tranche is cut from this bucket"
		},
		max: 40
	},
	ecosystem: {
		label: {
			fa: "اکوسیستم",
			en: "Ecosystem"
		},
		vest: {
			fa: "مشاوره، گرنت، و نقدینگی محدود",
			en: "Advisory, grants, limited liquidity"
		},
		max: 20
	}
};
var defaultAlloc = {
	founder: 18,
	team: 12,
	investors: 22,
	community: 20,
	ecosystem: 8
};
var utilities = [
	{
		id: "fee",
		title: {
			fa: "سهم کارمزد پروتکل",
			en: "Protocol fee share"
		},
		body: {
			fa: "ده درصد کوپن صدور DAP به خزانه می‌رود. بخش عمدهٔ آن بین PRVZ قفل‌شده تقسیم می‌شود.",
			en: "Ten percent of DAP issuance coupons go to treasury. Most of that is shared with locked PRVZ."
		}
	},
	{
		id: "desk",
		title: {
			fa: "دسترسی به میز",
			en: "Desk access"
		},
		body: {
			fa: "قفل‌کردن واحد، پروندهٔ دورهای باز و یادداشت بنیان‌گذار را باز می‌کند.",
			en: "Locking units opens live rounds and the founder note."
		}
	},
	{
		id: "advisory",
		title: {
			fa: "مشاوره با واحد",
			en: "Advisory in-token"
		},
		body: {
			fa: "ساعت مشاوره را می‌توان با PRVZ تسویه کرد — با تخفیف نسبت به فاکتور یورویی.",
			en: "Advisory hours can settle in PRVZ, at a discount to the euro invoice."
		}
	},
	{
		id: "vote",
		title: {
			fa: "رأی روی دور بعد",
			en: "Vote the next round"
		},
		body: {
			fa: "دارندگان قفل‌شده انتخاب می‌کنند کدام ونچر میز سرمایه را باز کند. نه کدام توکن پامپ شود.",
			en: "Locked holders choose which venture opens the capital desk. Not which token to pump."
		}
	}
];
function treasuryOf(alloc) {
	const sum = allocOrder.reduce((n, id) => n + alloc[id], 0);
	return Math.max(0, 100 - sum);
}
function computeOffer(input) {
	const allocSum = allocOrder.reduce((n, id) => n + input.alloc[id], 0);
	const treasury = Math.max(0, 100 - allocSum);
	const floatPct = Math.max(0, Math.min(input.floatPct, input.alloc.community));
	const supply = Math.max(1, Math.round(input.supply));
	const price = Math.max(0, input.priceCents) / 100;
	const tokensForSale = Math.round(supply * floatPct / 100);
	return {
		price,
		treasury,
		floatPct,
		tokensForSale,
		raise: tokensForSale * price,
		fdv: supply * price,
		allocSum
	};
}
function clampAlloc(alloc, id, next) {
	const others = allocOrder.filter((k) => k !== id).reduce((n, k) => n + alloc[k], 0);
	const cap = Math.min(allocMeta[id].max, Math.max(0, 100 - others));
	return {
		...alloc,
		[id]: Math.max(0, Math.min(Math.round(next), cap))
	};
}
var STORE_KEY = "parvaz-prvz-offers";
function isOffer(v) {
	if (!v || typeof v !== "object") return false;
	const o = v;
	return typeof o.id === "string" && typeof o.supply === "number" && typeof o.priceCents === "number";
}
function loadOffers() {
	try {
		const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
		if (!Array.isArray(raw)) return [];
		return raw.filter(isOffer).slice(0, 6);
	} catch {
		return [];
	}
}
function saveOffer(row) {
	const next = [row, ...loadOffers()].slice(0, 6);
	localStorage.setItem(STORE_KEY, JSON.stringify(next));
	return next;
}
function formatUnits(n, lang) {
	return new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", { maximumFractionDigits: 0 }).format(n);
}
function formatPrice(cents, lang) {
	const n = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-GB", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(cents / 100);
	return lang === "fa" ? `${n} یورو` : `€${n}`;
}
function offerMemo(row, lang) {
	const math = computeOffer(row);
	const lines = allocOrder.map((id) => `${allocMeta[id].label[lang]} ${row.alloc[id]}%`);
	lines.push(`${lang === "fa" ? "خزانه" : "Treasury"} ${math.treasury}%`);
	return [
		lang === "fa" ? `برگهٔ عرضهٔ ${TOKEN_SYMBOL}` : `${TOKEN_SYMBOL} offer sheet`,
		...lang === "fa" ? [
			`عرضهٔ کل: ${formatUnits(row.supply, lang)}`,
			`قیمت: ${formatPrice(row.priceCents, lang)}`,
			`شناور: ${math.floatPct}% (${formatUnits(math.tokensForSale, lang)} واحد)`,
			`مبلغ عرضه: ${formatUnits(Math.round(math.raise), lang)} یورو`,
			`ارزش کاملاً رقیق: ${formatUnits(Math.round(math.fdv), lang)} یورو`,
			`قفل خریداران: ${row.lockup} ماه`
		] : [
			`Supply: ${formatUnits(row.supply, lang)}`,
			`Price: ${formatPrice(row.priceCents, lang)}`,
			`Float: ${math.floatPct}% (${formatUnits(math.tokensForSale, lang)} units)`,
			`Raise: €${formatUnits(Math.round(math.raise), lang)}`,
			`FDV: €${formatUnits(Math.round(math.fdv), lang)}`,
			`Buyer lock: ${row.lockup} months`
		],
		...lines
	].join("\n");
}
var SLICE = [
	"var(--color-fg)",
	"var(--color-accent)",
	"var(--color-muted)",
	"var(--color-live)",
	"var(--color-warn)",
	"var(--color-subtle)"
];
function EconomyDesk() {
	const t = useT();
	const lang = useLang((s) => s.lang);
	const [supply, setSupply] = (0, import_react.useState)(1e8);
	const [priceCents, setPriceCents] = (0, import_react.useState)(12);
	const [floatPct, setFloatPct] = (0, import_react.useState)(12);
	const [lockup, setLockup] = (0, import_react.useState)(6);
	const [alloc, setAlloc] = (0, import_react.useState)(defaultAlloc);
	const [book, setBook] = (0, import_react.useState)([]);
	const [just, setJust] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setBook(loadOffers());
	}, []);
	const math = (0, import_react.useMemo)(() => computeOffer({
		supply,
		priceCents,
		floatPct,
		lockup,
		alloc
	}), [
		supply,
		priceCents,
		floatPct,
		lockup,
		alloc
	]);
	const pie = [...allocOrder.map((id) => ({
		name: tx(lang, allocMeta[id].label),
		value: alloc[id]
	})), {
		name: t.economy.treasury,
		value: math.treasury
	}];
	function setOne(id, next) {
		setAlloc((prev) => {
			const capped = clampAlloc(prev, id, next);
			if (id === "community" && floatPct > capped.community) setFloatPct(capped.community);
			return capped;
		});
		setJust(false);
	}
	function publish() {
		const row = {
			id: `prvz-${Date.now()}`,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			supply,
			priceCents,
			floatPct: math.floatPct,
			lockup,
			alloc,
			raise: math.raise,
			fdv: math.fdv
		};
		setBook(saveOffer(row));
		setJust(true);
		setCopied(false);
	}
	async function copySheet() {
		const text = offerMemo({
			id: "draft",
			at: (/* @__PURE__ */ new Date()).toISOString(),
			supply,
			priceCents,
			floatPct: math.floatPct,
			lockup,
			alloc,
			raise: math.raise,
			fdv: math.fdv
		}, lang);
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-5 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-accent",
						children: TOKEN_SYMBOL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-3xl font-medium tracking-tight",
						children: t.economy.tokenTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: t.economy.tokenBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.economy.supply,
								value: formatUnits(supply, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.economy.price,
								value: formatPrice(priceCents, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.economy.fdv,
								value: formatMoney(Math.round(math.fdv), lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.economy.raise,
								value: formatMoney(Math.round(math.raise), lang)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-52",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: pie,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 52,
								outerRadius: 76,
								stroke: "var(--color-surface)",
								strokeWidth: 3,
								children: pie.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: SLICE[i] ?? SLICE[0] }, entry.name))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (value) => `${value}%`,
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 text-xs text-muted",
						children: pie.map((slice, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { background: SLICE[i] ?? SLICE[0] }
								}), slice.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [slice.value, "%"]
							})]
						}, slice.name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-7 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: t.economy.desk
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-2xl font-medium tracking-tight",
						children: t.economy.allocTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: t.economy.allocBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t.economy.supply,
								value: formatUnits(supply, lang),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									"aria-label": t.economy.supply,
									min: 2e7,
									max: 2e8,
									step: 5e6,
									value: supply,
									onValueChange: (v) => {
										setSupply(v);
										setJust(false);
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t.economy.price,
								value: formatPrice(priceCents, lang),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									"aria-label": t.economy.price,
									min: 2,
									max: 150,
									step: 1,
									value: priceCents,
									onValueChange: (v) => {
										setPriceCents(v);
										setJust(false);
									}
								})
							}),
							allocOrder.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tx(lang, allocMeta[id].label),
								value: `${alloc[id]}%`,
								hint: tx(lang, allocMeta[id].vest),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									"aria-label": tx(lang, allocMeta[id].label),
									min: 0,
									max: allocMeta[id].max,
									step: 1,
									value: alloc[id],
									onValueChange: (v) => setOne(id, v)
								})
							}, id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl bg-elevated px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: t.economy.treasury
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [treasuryOf(alloc), "%"]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4",
				children: utilities.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium tracking-tight",
						children: tx(lang, u.title)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: tx(lang, u.body)
					})]
				}, u.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:col-span-12 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: t.economy.offerTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: t.economy.offerBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.economy.float,
							value: `${math.floatPct}% · ${formatUnits(math.tokensForSale, lang)}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								"aria-label": t.economy.float,
								min: 0,
								max: Math.max(alloc.community, 1),
								step: 1,
								value: Math.min(floatPct, alloc.community),
								onValueChange: (v) => {
									setFloatPct(v);
									setJust(false);
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.economy.lockup,
							value: `${formatUnits(lockup, lang)} ${t.economy.months}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								"aria-label": t.economy.lockup,
								min: 0,
								max: 24,
								step: 1,
								value: lockup,
								onValueChange: (v) => {
									setLockup(v);
									setJust(false);
								}
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: publish,
								children: t.economy.publish
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => void copySheet(),
								children: copied ? t.economy.copied : t.economy.copy
							}),
							just ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-live",
								children: t.economy.published
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-xl font-medium tracking-tight",
					children: t.economy.book
				}), book.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-surface px-6 py-10 text-sm text-subtle shadow-[var(--shadow-border)]",
					children: t.economy.bookEmpty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-2xl bg-surface shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[36rem] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-[0.12em] text-subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.economy.price
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.economy.float
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.economy.raise
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.economy.fdv
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-3 text-start font-medium",
										children: t.economy.lockup
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: book.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 tabular-nums",
									children: formatPrice(row.priceCents, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3 tabular-nums",
									children: [row.floatPct, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 tabular-nums",
									children: formatMoney(Math.round(row.raise), lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 tabular-nums",
									children: formatMoney(Math.round(row.fdv), lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3 tabular-nums",
									children: [
										formatUnits(row.lockup, lang),
										" ",
										t.economy.months
									]
								})
							]
						}, row.id)) })]
					})
				})]
			})
		]
	});
}
function Field({ label, value, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-center justify-between gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-fg",
				children: value
			})]
		}),
		children,
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-subtle",
			children: hint
		}) : null
	] });
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
function EconomyPage() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.economy.eyebrow,
				title: t.economy.title,
				body: t.economy.body
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EconomyDesk, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-12 rounded-2xl border border-warn/20 bg-warn/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-warn",
					children: t.economy.disclaimerTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: t.economy.disclaimer
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: t.economy.ctaContact
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/protocol",
						children: t.economy.ctaProtocol
					})
				})]
			})
		]
	});
}
//#endregion
export { EconomyPage as component };
