import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang, n as SectionHeader, o as useT, r as cn, t as Page } from "./page-Dklxs7Uw.mjs";
import { n as Button } from "./router-D1-LdyKS.mjs";
import { a as inquiryTypes, t as Reveal, u as tx } from "./data-D_9aqGr3.mjs";
import { t as Input } from "./input-ojm3TFMT.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DwOM1gwB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("mb-1.5 block text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("min-h-32 w-full rounded-lg border border-border bg-elevated px-3.5 py-3 text-sm text-fg placeholder:text-subtle", "transition-[box-shadow,border-color] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40", className),
	...props
}));
Textarea.displayName = "Textarea";
function validEmail(v) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function ContactForm() {
	const t = useT();
	const lang = useLang((s) => s.lang);
	const [type, setType] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [formKey, setFormKey] = (0, import_react.useState)(0);
	function submit(ev) {
		ev.preventDefault();
		const fd = new FormData(ev.currentTarget);
		const next = {
			name: String(fd.get("name") ?? ""),
			email: String(fd.get("email") ?? ""),
			type: String(fd.get("type") ?? "") || type,
			message: String(fd.get("message") ?? "")
		};
		const e = {};
		if (next.name.trim().length < 2) e.name = t.contactPage.errName;
		if (!validEmail(next.email.trim())) e.email = t.contactPage.errEmail;
		if (!next.type) e.type = t.contactPage.errType;
		if (next.message.trim().length < 12) e.message = t.contactPage.errMessage;
		setErrors(e);
		if (Object.keys(e).length) return;
		setBusy(true);
		try {
			const key = "parvaz-inquiries";
			const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
			localStorage.setItem(key, JSON.stringify([...prev, {
				...next,
				at: (/* @__PURE__ */ new Date()).toISOString(),
				lang
			}]));
			setDone(true);
		} catch {
			setDone(true);
		} finally {
			setBusy(false);
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl font-medium tracking-tight",
				children: t.contactPage.successTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: t.contactPage.successBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				variant: "secondary",
				onClick: () => {
					setDone(false);
					setType("");
					setErrors({});
					setFormKey((k) => k + 1);
				},
				children: t.contactPage.another
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name: "type",
				value: type
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "mb-3 text-xs font-medium tracking-wide text-muted",
						children: t.contactPage.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: inquiryTypes.map((opt) => {
							const selected = type === opt.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setType(opt.id),
								className: cn("h-11 rounded-md text-sm transition-[box-shadow,color,background-color] duration-150", selected ? "bg-elevated text-fg shadow-[var(--shadow-border-hover)]" : "text-muted shadow-[var(--shadow-border)] hover:text-fg"),
								children: tx(lang, opt.label)
							}, opt.id);
						})
					}),
					errors.type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-warn",
						children: errors.type
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: t.contactPage.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						name: "name",
						autoComplete: "name",
						placeholder: t.contactPage.namePh
					}),
					errors.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-warn",
						children: errors.name
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: t.contactPage.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						name: "email",
						type: "email",
						autoComplete: "email",
						dir: "ltr",
						placeholder: t.contactPage.emailPh
					}),
					errors.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-warn",
						children: errors.email
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "message",
						children: t.contactPage.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "message",
						name: "message",
						placeholder: t.contactPage.messagePh
					}),
					errors.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-warn",
						children: errors.message
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "mt-6",
				disabled: busy,
				children: busy ? t.contactPage.sending : t.contactPage.send
			})
		]
	}, formKey);
}
function ContactPage() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "py-16 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: t.contactPage.eyebrow,
			title: t.contactPage.title,
			body: t.contactPage.body
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})
		}) })]
	});
}
//#endregion
export { ContactPage as component };
