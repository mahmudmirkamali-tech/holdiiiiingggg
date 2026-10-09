import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang } from "./page-JKEwe9s0.mjs";
import { a as ScanSearch, c as Landmark, d as Compass, i as Search, s as Layers, u as GitBranch } from "../_libs/lucide-react.mjs";
import { u as tx } from "./data-DRRdBY7X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/service-card-Be2W9VVL.js
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	layers: Layers,
	scan: ScanSearch,
	structure: GitBranch,
	capital: Landmark,
	search: Search,
	gtm: Compass
};
function ServiceCard({ service }) {
	const lang = useLang((s) => s.lang);
	const Icon = icons[service.icon];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex size-10 items-center justify-center rounded-lg bg-elevated text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					strokeWidth: 1.6
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: tx(lang, service.title)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: tx(lang, service.body)
			})
		]
	});
}
//#endregion
export { ServiceCard as t };
