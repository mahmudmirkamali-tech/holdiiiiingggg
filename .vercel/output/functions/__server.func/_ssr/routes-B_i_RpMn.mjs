import { i as __toESM } from "../_runtime.mjs";
import { o as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useLang, n as SectionHeader, o as useT, r as cn, t as Page } from "./page-Dklxs7Uw.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowRight, m as ArrowDown, p as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-D1-LdyKS.mjs";
import { c as stats, o as projects, s as services, t as Reveal, u as tx } from "./data-D_9aqGr3.mjs";
import { t as ServiceCard } from "./service-card-siN54J8G.mjs";
import { n as ProjectCard, t as FundingCard } from "./project-card-B8KEdnc1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_i_RpMn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useCount(target, active) {
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setN(target);
			return;
		}
		let start = null;
		const dur = 700;
		let raf = 0;
		const tick = (t) => {
			if (start === null) start = t;
			const p = Math.min(1, (t - start) / dur);
			setN(Math.round(target * (1 - (1 - p) ** 3)));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, active]);
	return n;
}
function Stat({ value, label }) {
	const ref = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(false);
	const n = useCount(value, on);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				setOn(true);
				io.disconnect();
			}
		}, { threshold: .4 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "rounded-2xl bg-surface px-5 py-8 text-center shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-4xl font-medium tabular-nums tracking-tight text-fg",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-xs uppercase tracking-[0.12em] text-subtle",
			children: label
		})]
	});
}
function StatsRow() {
	const lang = useLang((s) => s.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
		children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			value: s.value,
			label: tx(lang, s.label)
		}, s.value + tx(lang, s.label)))
	});
}
var VERT = `#version 300 es
precision highp float;
const vec2 POS[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main() {
  gl_Position = vec4(POS[gl_VertexID], 0.0, 1.0);
}
`;
var FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_look;
uniform float u_quality;
out vec4 fragColor;

const float RS = 1.25;
const float DISK_IN = 2.55;
const float DISK_OUT = 15.5;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.11 + vec2(1.7, 9.2);
    a *= 0.52;
  }
  return v;
}

vec3 blackbody(float t) {
  t = max(t, 0.2);
  vec3 c;
  c.r = clamp(1.0, 0.0, 1.0);
  c.g = clamp(0.392 * log(t) + 0.62, 0.0, 1.0);
  c.b = t < 1.55 ? 0.0 : clamp(0.54 * log(t - 0.55), 0.0, 1.0);
  if (t < 1.8) c.g *= smoothstep(0.35, 1.5, t);
  return c * (0.22 + t * 0.42);
}

vec3 starfield(vec3 dir) {
  vec3 d = normalize(dir);
  float n = hash13(floor(d * 220.0));
  float star = smoothstep(0.994, 1.0, n);
  float mag = pow(hash13(floor(d * 220.0) + 2.17), 8.0);
  vec3 col = vec3(0.82, 0.88, 1.0) * star * (0.35 + 2.4 * mag);

  float n2 = hash13(floor(d * 90.0 + 8.0));
  col += vec3(0.7, 0.82, 1.0) * smoothstep(0.997, 1.0, n2) * 0.45;

  float neb = fbm(d.yz * 2.4 + d.x * 1.3);
  float neb2 = fbm(d.xz * 1.6 - 4.2);
  col += vec3(0.10, 0.14, 0.26) * pow(neb, 3.2) * 0.42;
  col += vec3(0.16, 0.12, 0.10) * pow(neb2, 4.0) * 0.18;
  return col;
}

vec3 diskEmit(vec3 hit, float time, vec3 view) {
  float r = length(hit.xz);
  float ang = atan(hit.z, hit.x);
  float kepler = time * 1.35 / pow(max(r, 1.6), 1.5);
  vec2 polar = vec2(ang * 1.7 - kepler, log(max(r, 1.0)) * 3.4);
  float dens = fbm(polar);
  dens = smoothstep(0.18, 0.82, dens);
  dens *= 0.55 + 0.45 * fbm(polar * 2.4 + 10.0);

  float inner = smoothstep(DISK_IN, DISK_IN + 1.35, r);
  float outer = smoothstep(DISK_OUT, DISK_OUT * 0.58, r);
  dens *= inner * outer;

  float spiral = sin(ang * 3.0 - kepler * 2.2 + r * 0.35);
  dens *= 0.75 + 0.25 * spiral;

  float temp = mix(11.5, 1.05, pow(smoothstep(DISK_IN, DISK_OUT, r), 0.72));
  vec3 bb = blackbody(temp);

  vec3 beta = vec3(-hit.z, 0.0, hit.x);
  float bl = length(beta.xz);
  if (bl > 1e-4) beta /= bl;
  float v = clamp(0.62 / sqrt(max(r, 2.2)), 0.0, 0.55);
  float dop = clamp(1.0 + dot(view, beta) * v * 2.1, 0.4, 2.4);
  bb *= pow(dop, 3.2);
  bb = mix(bb * vec3(1.2, 0.48, 0.22), bb * vec3(0.7, 0.92, 1.4), smoothstep(0.82, 1.45, dop));

  float glow = 0.55 + 0.45 / (0.15 + abs(r - 3.4));
  return bb * dens * glow * 2.15;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;

  float az = 0.62 + u_time * 0.028 + u_look.x;
  float el = 0.30 + u_look.y;
  float dist = 23.5;

  vec3 cam = vec3(
    dist * cos(el) * sin(az),
    dist * sin(el),
    dist * cos(el) * cos(az)
  );

  vec3 fwd = normalize(-cam);
  vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, fwd);
  vec3 ray = normalize(fwd + uv.x * right * 1.02 + uv.y * up * 1.02);

  vec3 pos = cam;
  vec3 vel = ray;
  vec3 col = vec3(0.0);
  float transm = 1.0;
  float minR = 1e5;

  int maxSteps = u_quality > 0.6 ? 100 : 64;
  for (int i = 0; i < 100; i++) {
    if (i >= maxSteps) break;
    float r = length(pos);
    minR = min(minR, r);
    if (r < RS * 1.015) {
      transm = 0.0;
      break;
    }

    float dt = clamp(r * 0.032, 0.016, 0.42);
    vec3 prev = pos;
    float r2 = max(r * r, 1e-4);
    vel -= (1.5 * RS * pos) / (r2 * r2) * dt;
    float vs = length(vel);
    if (vs > 1e-6) vel /= vs;
    pos += vel * dt;

    if (prev.y * pos.y < 0.0) {
      float tHit = prev.y / (prev.y - pos.y);
      vec3 hit = mix(prev, pos, clamp(tHit, 0.0, 1.0));
      hit.y = 0.0;
      float hr = length(hit.xz);
      if (hr > DISK_IN * 0.92 && hr < DISK_OUT) {
        vec3 emit = diskEmit(hit, u_time, vel);
        col += transm * emit;
        transm *= mix(0.22, 0.55, smoothstep(DISK_IN, 8.0, hr));
      }
    }

    if (r > 52.0) {
      col += transm * starfield(vel);
      transm = 0.0;
      break;
    }
  }

  if (transm > 0.012) {
    col += transm * starfield(vel);
  }

  float ring = smoothstep(0.28, 0.0, abs(minR - 1.5 * RS));
  col += vec3(1.0, 0.82, 0.55) * ring * 0.18;

  col = col / (1.0 + col * 0.55);
  col = pow(max(col, 0.0), vec3(0.92));

  vec2 q = gl_FragCoord.xy / u_res;
  float vig = pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.32);
  col *= mix(0.62, 1.0, vig);

  fragColor = vec4(col, 1.0);
}
`;
function compile(gl, type, src) {
	const sh = gl.createShader(type);
	if (!sh) throw new Error("shader");
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		const log = gl.getShaderInfoLog(sh) ?? "compile failed";
		gl.deleteShader(sh);
		throw new Error(log);
	}
	return sh;
}
function paintFallback(canvas) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const w = canvas.width;
	const h = canvas.height;
	const g = ctx.createRadialGradient(w * .5, h * .46, h * .04, w * .5, h * .5, h * .7);
	g.addColorStop(0, "#050506");
	g.addColorStop(.12, "#0a0a0c");
	g.addColorStop(.2, "#c9a078");
	g.addColorStop(.28, "#3a2218");
	g.addColorStop(.45, "#12141c");
	g.addColorStop(1, "#09090b");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
}
function createRenderer({ canvas }) {
	let disposed = false;
	let gl = null;
	let raf = 0;
	let program = null;
	let resizeObs = null;
	let visObs = null;
	let visible = true;
	let start = performance.now();
	let frozenTime = 0;
	const look = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	};
	const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	return {
		ready: new Promise((resolve) => {
			const boot = () => {
				if (disposed) {
					resolve();
					return;
				}
				try {
					gl = canvas.getContext("webgl2", {
						alpha: false,
						antialias: false,
						depth: false,
						stencil: false,
						premultipliedAlpha: false,
						powerPreference: "high-performance"
					});
					if (!gl) {
						fitCanvas();
						paintFallback(canvas);
						resolve();
						return;
					}
					const vert = compile(gl, gl.VERTEX_SHADER, VERT);
					const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
					program = gl.createProgram();
					if (!program) throw new Error("program");
					gl.attachShader(program, vert);
					gl.attachShader(program, frag);
					gl.linkProgram(program);
					gl.deleteShader(vert);
					gl.deleteShader(frag);
					if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link failed");
					gl.useProgram(program);
					const locRes = gl.getUniformLocation(program, "u_res");
					const locTime = gl.getUniformLocation(program, "u_time");
					const locLook = gl.getUniformLocation(program, "u_look");
					const locQuality = gl.getUniformLocation(program, "u_quality");
					fitCanvas();
					const onMove = (ev) => {
						const rect = canvas.getBoundingClientRect();
						if (rect.width < 8 || rect.height < 8) return;
						look.tx = ((ev.clientX - rect.left) / rect.width - .5) * .55;
						look.ty = (.5 - (ev.clientY - rect.top) / rect.height) * .18;
					};
					const onLeave = () => {
						look.tx = 0;
						look.ty = 0;
					};
					window.addEventListener("pointermove", onMove, { passive: true });
					window.addEventListener("pointerleave", onLeave);
					visObs = new IntersectionObserver(([entry]) => {
						visible = entry?.isIntersecting ?? true;
					}, { threshold: .02 });
					visObs.observe(canvas);
					const onHidden = () => {
						if (document.hidden) visible = false;
					};
					document.addEventListener("visibilitychange", onHidden);
					const frame = (now) => {
						if (disposed || !gl || !program) return;
						raf = requestAnimationFrame(frame);
						if (!visible && !reduced) return;
						look.x += (look.tx - look.x) * .045;
						look.y += (look.ty - look.y) * .045;
						const t = reduced ? frozenTime : (now - start) * .001;
						if (reduced && frozenTime === 0) frozenTime = .8;
						gl.viewport(0, 0, canvas.width, canvas.height);
						gl.useProgram(program);
						gl.uniform2f(locRes, canvas.width, canvas.height);
						gl.uniform1f(locTime, t);
						gl.uniform2f(locLook, look.x, look.y);
						const mobile = Math.min(canvas.width, canvas.height) < 700;
						gl.uniform1f(locQuality, mobile ? .45 : 1);
						gl.drawArrays(gl.TRIANGLES, 0, 3);
						if (reduced) {
							cancelAnimationFrame(raf);
							raf = 0;
						}
					};
					raf = requestAnimationFrame(frame);
					const cleanupExtras = () => {
						window.removeEventListener("pointermove", onMove);
						window.removeEventListener("pointerleave", onLeave);
						document.removeEventListener("visibilitychange", onHidden);
					};
					canvas.__bhCleanup = cleanupExtras;
					resolve();
				} catch {
					fitCanvas();
					paintFallback(canvas);
					resolve();
				}
			};
			const fitCanvas = () => {
				const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
				const rect = canvas.getBoundingClientRect();
				const w = Math.max(2, Math.floor((rect.width || canvas.clientWidth || 300) * dpr));
				const h = Math.max(2, Math.floor((rect.height || canvas.clientHeight || 300) * dpr));
				if (canvas.width !== w) canvas.width = w;
				if (canvas.height !== h) canvas.height = h;
			};
			resizeObs = new ResizeObserver(() => {
				fitCanvas();
				if (!gl && !disposed) paintFallback(canvas);
			});
			resizeObs.observe(canvas);
			boot();
		}),
		dispose() {
			disposed = true;
			cancelAnimationFrame(raf);
			resizeObs?.disconnect();
			visObs?.disconnect();
			const extra = canvas.__bhCleanup;
			extra?.();
			if (gl && program) gl.deleteProgram(program);
			program = null;
			gl = null;
		}
	};
}
function BlackHole({ className }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const renderer = createRenderer({ canvas });
		renderer.ready;
		return () => renderer.dispose();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative h-full w-full overflow-hidden bg-bg", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block h-full w-full touch-none"
		})
	});
}
function Home() {
	const t = useT();
	const Arrow = useLang((s) => s.lang) === "fa" ? ArrowLeft : ArrowRight;
	const featured = projects.filter((p) => p.featured);
	const funded = projects.filter((p) => p.funding).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16 min-h-[100dvh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlackHole, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/45" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
					className: "relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 sm:pb-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 text-xs font-medium uppercase tracking-[0.22em] text-accent",
							children: "Founder & venture studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-6xl font-medium tracking-tight text-fg sm:text-7xl md:text-8xl",
							children: "PARVAZ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-lg text-accent sm:text-xl",
							children: t.hero.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base text-muted",
							children: t.hero.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/projects",
										children: t.hero.ctaProjects
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/invest",
										children: t.hero.ctaInvest
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										children: t.hero.ctaWork
									})
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#building",
						className: "mt-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-subtle transition-colors hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5" }), t.home.buildingTitle]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-20 pt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsRow, {}) }) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "building",
			className: "py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.home.buildingEyebrow,
					title: t.home.buildingTitle,
					body: t.home.buildingBody
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: featured.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project: p })
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects",
							children: [t.home.allProjects, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
						})
					})
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.home.investEyebrow,
					title: t.home.investTitle,
					body: t.home.investBody
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: funded.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FundingCard, { project: p })
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/invest",
							children: [t.home.investAll, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
						})
					})
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.home.protocolEyebrow,
				title: t.home.protocolTitle,
				body: t.home.protocolBody
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-between gap-6 rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)] md:flex-row md:items-center md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-sm text-muted",
					children: t.protocol.body
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/protocol",
						children: [t.home.protocolAll, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
					})
				})]
			}) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.home.advisoryEyebrow,
					title: t.home.advisoryTitle,
					body: t.home.advisoryBody
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: services.slice(0, 3).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, { service: s })
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/advisory",
							children: [t.home.advisoryAll, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
						})
					})
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl border-s-2 border-accent/40 ps-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
						children: t.home.founderEyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
						className: "mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-fg md:text-3xl",
						children: t.home.founderQuote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/founder",
							children: [t.home.founderCta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
						})
					})
				]
			}) }) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-24 pt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-between gap-6 rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)] md:flex-row md:items-center md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
							children: t.home.contactEyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl font-medium tracking-tight",
							children: t.home.contactTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: t.home.contactBody
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						children: [t.home.contactCta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
					})
				})]
			}) }) })
		})
	] });
}
//#endregion
export { Home as component };
