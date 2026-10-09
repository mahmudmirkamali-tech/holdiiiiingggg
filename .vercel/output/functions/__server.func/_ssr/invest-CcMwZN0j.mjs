import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as SectionHeader, o as useT, t as Page } from "./page-JKEwe9s0.mjs";
import { o as projects, t as Reveal } from "./data-DRRdBY7X.mjs";
import { t as FundingCard } from "./project-card-6Hn-41hH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invest-CcMwZN0j.js
var import_jsx_runtime = require_jsx_runtime();
function InvestPage() {
	const t = useT();
	const open = projects.filter((p) => p.funding);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.investPage.eyebrow,
				title: t.investPage.title,
				body: t.investPage.body
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-5 text-xs font-medium uppercase tracking-[0.16em] text-subtle",
				children: t.investPage.openRounds
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: open.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FundingCard, { project: p })
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: t.investPage.howTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 space-y-4",
						children: t.investPage.how.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm tabular-nums text-accent",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
						}, item))
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: t.investPage.termsTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: t.investPage.termsBody
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-12 rounded-2xl border border-warn/20 bg-warn/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-warn",
					children: t.investPage.disclaimerTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: t.investPage.disclaimer
				})]
			}) })
		]
	});
}
//#endregion
export { InvestPage as component };
