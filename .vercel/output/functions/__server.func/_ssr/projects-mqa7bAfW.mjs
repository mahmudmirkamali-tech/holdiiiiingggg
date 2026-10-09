import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang, n as SectionHeader, o as useT, r as cn, t as Page } from "./page-JKEwe9s0.mjs";
import { o as projects, t as Reveal, u as tx } from "./data-DRRdBY7X.mjs";
import { t as Input } from "./input-V_6SMQRg.mjs";
import { n as ProjectCard } from "./project-card-6Hn-41hH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-mqa7bAfW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cats = [
	"all",
	"saas",
	"web3",
	"marketplace",
	"infra"
];
function ProjectsPage() {
	const t = useT();
	const lang = useLang((s) => s.lang);
	const [cat, setCat] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return projects.filter((p) => {
			if (cat !== "all" && p.category !== cat) return false;
			if (!query) return true;
			return [
				p.name,
				p.stack.join(" "),
				tx(lang, p.summary),
				t.cats[p.category],
				t.status[p.status]
			].join(" ").toLowerCase().includes(query);
		});
	}, [
		cat,
		q,
		lang,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.projectsPage.eyebrow,
				title: t.projectsPage.title,
				body: t.projectsPage.body
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCat(c),
						className: cn("h-10 rounded-full px-4 text-sm transition-[box-shadow,color] duration-150", cat === c ? "bg-elevated text-fg shadow-[var(--shadow-border-hover)]" : "text-muted shadow-[var(--shadow-border)] hover:text-fg"),
						children: c === "all" ? t.projectsPage.all : t.cats[c]
					}, c))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: t.projectsPage.search,
					className: "sm:max-w-xs",
					"aria-label": t.projectsPage.search
				})]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl bg-surface px-6 py-16 text-center text-sm text-subtle shadow-[var(--shadow-border)]",
				children: t.projectsPage.empty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 40,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project: p })
				}, p.id))
			})
		]
	});
}
//#endregion
export { ProjectsPage as component };
