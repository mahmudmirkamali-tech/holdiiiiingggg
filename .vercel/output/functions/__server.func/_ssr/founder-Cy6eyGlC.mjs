import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang, n as SectionHeader, o as useT, t as Page } from "./page-JKEwe9s0.mjs";
import { l as GitCommitHorizontal, r as Star } from "../_libs/lucide-react.mjs";
import { l as timeline, n as caseSteps, o as projects, t as Reveal, u as tx } from "./data-DRRdBY7X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/founder-Cy6eyGlC.js
var import_jsx_runtime = require_jsx_runtime();
function FounderPage() {
	const t = useT();
	const lang = useLang((s) => s.lang);
	const repos = projects.filter((p) => p.repo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.founderPage.eyebrow,
				title: t.founderPage.title,
				body: t.founderPage.body
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl rounded-2xl bg-surface p-7 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: t.founderPage.methodTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: t.founderPage.method
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.founderPage.caseEyebrow,
					title: t.founderPage.caseTitle,
					body: t.founderPage.caseBody
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-4 md:grid-cols-2",
					children: caseSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 50,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-5 rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-12 shrink-0 items-center justify-center rounded-full font-display text-sm text-accent shadow-[var(--shadow-border)]",
								children: step.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-medium tracking-tight",
								children: tx(lang, step.title)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: tx(lang, step.body)
							})] })]
						})
					}, step.n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.founderPage.timeEyebrow,
					title: t.founderPage.timeTitle
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "relative max-w-xl space-y-0 border-s border-border",
					children: timeline.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 40,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative ps-8 pb-10 last:pb-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute start-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-accent rtl:translate-x-1/2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tabular-nums tracking-[0.14em] text-accent",
									children: item.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "mt-1 font-medium tracking-tight",
									children: tx(lang, item.title)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm text-muted",
									children: tx(lang, item.body)
								})
							]
						})
					}, item.year))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.projectsPage.publicWork,
					title: t.founderPage.workTitle,
					body: t.founderPage.workBody
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: repos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 50,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-sm text-fg",
									children: p.repo?.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: tx(lang, p.summary)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-4 text-xs text-subtle",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.repo?.language }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular-nums",
													children: p.repo?.stars
												}),
												t.founderPage.stars
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, { className: "size-3.5" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular-nums",
													children: p.repo?.commits
												}),
												t.founderPage.commits
											]
										})
									]
								})
							]
						})
					}, p.id))
				})]
			})
		]
	});
}
//#endregion
export { FounderPage as component };
