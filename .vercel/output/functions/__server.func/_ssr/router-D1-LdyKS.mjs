import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as useLang, i as hydrateLang, o as useT, r as cn, t as Page } from "./page-Dklxs7Uw.mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert, o as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D1-LdyKS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function ParvazMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		fill: "none",
		"aria-hidden": "true",
		className: cn("text-accent", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 28 L16 10 L23 20 L34 9",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "34",
			cy: "9",
			r: "2",
			fill: "currentColor",
			className: "text-fg"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "rounded-md text-muted hover:text-fg hover:bg-elevated",
			link: "rounded-md text-accent underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-6",
			sm: "h-9 px-4 text-xs",
			lg: "h-12 px-7",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
});
Button.displayName = "Button";
var links = [
	{
		to: "/",
		key: "home"
	},
	{
		to: "/projects",
		key: "projects"
	},
	{
		to: "/protocol",
		key: "protocol"
	},
	{
		to: "/invest",
		key: "invest"
	},
	{
		to: "/advisory",
		key: "advisory"
	},
	{
		to: "/founder",
		key: "founder"
	},
	{
		to: "/contact",
		key: "contact"
	}
];
function SiteShell({ children }) {
	const t = useT();
	const lang = useLang((s) => s.lang);
	const toggle = useLang((s) => s.toggle);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const isHome = pathname === "/";
	(0, import_react.useEffect)(() => {
		hydrateLang();
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname, lang]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg",
				children: t.common.skip
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200", isHome && !scrolled && !open ? "border-b border-transparent bg-transparent" : "border-b border-border bg-bg/90 backdrop-blur-md"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
					className: "flex h-16 items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParvazMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium tracking-[0.18em]",
								children: "PARVAZ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-5 lg:flex",
							"aria-label": "Primary",
							children: links.map((l) => {
								const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: l.to,
									className: cn("relative text-sm transition-colors duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
									children: [t.nav[l.key], active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 -bottom-1 h-px bg-accent" }) : null]
								}, l.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: toggle,
								"aria-label": lang === "fa" ? "Switch to English" : "تغییر به فارسی",
								children: t.common.lang
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "lg:hidden",
								onClick: () => setOpen((v) => !v),
								"aria-expanded": open,
								"aria-label": open ? t.common.close : t.common.menu,
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border bg-bg lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
						className: "flex flex-col gap-1 py-3",
						children: links.map((l) => {
							const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: cn("rounded-md px-3 py-3 text-sm", active ? "bg-elevated text-fg" : "text-muted"),
								children: t.nav[l.key]
							}, l.to);
						})
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-8 border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
					className: "grid gap-10 py-16 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParvazMark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium tracking-[0.18em]",
									children: "PARVAZ"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm text-muted",
								children: t.footer.blurb
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-xs font-medium uppercase tracking-[0.16em] text-subtle",
							children: t.footer.studio
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2.5 text-sm",
							children: links.slice(1).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "text-muted transition-colors hover:text-fg",
								children: t.nav[l.key]
							}) }, l.to))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-xs font-medium uppercase tracking-[0.16em] text-subtle",
							children: t.footer.legal
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/invest",
								className: "text-muted transition-colors hover:text-fg",
								children: t.footer.disclaimer
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "text-muted transition-colors hover:text-fg",
								children: t.footer.privacy
							}) })]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border py-6 text-xs text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" PARVAZ. ",
						t.footer.rights
					] })
				})]
			})
		]
	});
}
var styles_default = "/assets/styles-Bwi58T8H.css";
var APP_NAME = "PARVAZ";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "PARVAZ — a founder-led studio that builds technology, reads markets, and structures ventures."
			},
			{
				name: "theme-color",
				content: "#09090b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Vazirmatn:wght@300;400;500;600&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-B_i_RpMn.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./advisory-BNePvEvy.mjs");
var Route$5 = createFileRoute("/advisory")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./contact-DwOM1gwB.mjs");
var Route$4 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./founder-Bakr4dWB.mjs");
var Route$3 = createFileRoute("/founder")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./invest-CZjUL6R9.mjs");
var Route$2 = createFileRoute("/invest")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./projects-BElgRay3.mjs");
var Route$1 = createFileRoute("/projects")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./protocol-50mvaZa9.mjs");
var Route = createFileRoute("/protocol")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AdvisoryRoute: Route$5.update({
		id: "/advisory",
		path: "/advisory",
		getParentRoute: () => Route$7
	}),
	ContactRoute: Route$4.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$7
	}),
	FounderRoute: Route$3.update({
		id: "/founder",
		path: "/founder",
		getParentRoute: () => Route$7
	}),
	InvestRoute: Route$2.update({
		id: "/invest",
		path: "/invest",
		getParentRoute: () => Route$7
	}),
	ProjectsRoute: Route$1.update({
		id: "/projects",
		path: "/projects",
		getParentRoute: () => Route$7
	}),
	ProtocolRoute: Route.update({
		id: "/protocol",
		path: "/protocol",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Button as n, router_exports as t };
