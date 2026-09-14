export type BlackHoleRenderer = {
  ready: Promise<void>;
  dispose: () => void;
};

type CreateOpts = {
  canvas: HTMLCanvasElement;
};

const VERT = `#version 300 es
precision highp float;
const vec2 POS[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main() {
  gl_Position = vec4(POS[gl_VertexID], 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
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
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.11 + vec2(1.7, 9.2);
    a *= 0.52;
  }
  return v;
}

vec3 blackbody(float t) {
  t = max(t, 0.2);
  vec3 c;
  c.r = 1.0;
  c.g = clamp(0.392 * log(t) + 0.62, 0.0, 1.0);
  c.b = t < 1.55 ? 0.0 : clamp(0.54 * log(t - 0.55), 0.0, 1.0);
  if (t < 1.8) c.g *= smoothstep(0.35, 1.5, t);
  return c * (0.28 + t * 0.5);
}

vec3 starfield(vec3 dir) {
  vec3 d = normalize(dir);
  float n = hash13(floor(d * 180.0));
  float star = smoothstep(0.993, 1.0, n);
  float mag = pow(hash13(floor(d * 180.0) + 2.17), 8.0);
  vec3 col = vec3(0.82, 0.88, 1.0) * star * (0.35 + 2.4 * mag);
  float neb = fbm(d.yz * 2.4 + d.x * 1.3);
  col += vec3(0.10, 0.14, 0.26) * pow(neb, 3.2) * 0.38;
  return col;
}

vec3 diskEmit(vec3 hit, float time, vec3 view) {
  float r = length(hit.xz);
  float ang = atan(hit.z, hit.x);
  float kepler = time * 1.35 / pow(max(r, 1.6), 1.5);
  vec2 polar = vec2(ang * 1.7 - kepler, log(max(r, 1.0)) * 3.4);
  float dens = fbm(polar);
  dens = smoothstep(0.16, 0.8, dens);
  dens *= 0.55 + 0.45 * noise(polar * 2.4 + 10.0);

  float inner = smoothstep(DISK_IN, DISK_IN + 1.35, r);
  float outer = smoothstep(DISK_OUT, DISK_OUT * 0.58, r);
  dens *= inner * outer;

  float temp = mix(12.0, 1.1, pow(smoothstep(DISK_IN, DISK_OUT, r), 0.72));
  vec3 bb = blackbody(temp);

  vec3 beta = vec3(-hit.z, 0.0, hit.x);
  float bl = length(beta.xz);
  if (bl > 1e-4) beta /= bl;
  float v = clamp(0.62 / sqrt(max(r, 2.2)), 0.0, 0.55);
  float dop = clamp(1.0 + dot(view, beta) * v * 2.1, 0.4, 2.4);
  bb *= pow(dop, 3.2);
  bb = mix(bb * vec3(1.25, 0.5, 0.22), bb * vec3(0.72, 0.94, 1.42), smoothstep(0.82, 1.45, dop));

  float glow = 0.6 + 0.5 / (0.15 + abs(r - 3.4));
  return bb * dens * glow * 2.4;
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

  int maxSteps = u_quality > 0.7 ? 72 : (u_quality > 0.4 ? 52 : 36);
  for (int i = 0; i < 72; i++) {
    if (i >= maxSteps) break;
    float r = length(pos);
    minR = min(minR, r);
    if (r < RS * 1.015) {
      transm = 0.0;
      break;
    }

    float dt = clamp(r * 0.038, 0.02, 0.48);
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
  col += vec3(1.0, 0.82, 0.55) * ring * 0.22;

  col = col / (1.0 + col * 0.5);
  col = pow(max(col, 0.0), vec3(0.9));

  vec2 q = gl_FragCoord.xy / u_res;
  float vig = pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.32);
  col *= mix(0.62, 1.0, vig);

  fragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
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

function paintFallback(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const g = ctx.createRadialGradient(w * 0.5, h * 0.46, h * 0.04, w * 0.5, h * 0.5, h * 0.72);
  g.addColorStop(0, "#050506");
  g.addColorStop(0.1, "#0c0c10");
  g.addColorStop(0.18, "#d4a878");
  g.addColorStop(0.26, "#3a2218");
  g.addColorStop(0.48, "#12141c");
  g.addColorStop(1, "#09090b");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function isAutomated() {
  try {
    return Boolean(navigator.webdriver);
  } catch {
    return false;
  }
}

function isSoftwareGL(gl: WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  if (!info) return false;
  const renderer = (gl.getParameter(info.UNMASKED_RENDERER_WEBGL) as string) || "";
  return /swiftshader|llvmpipe|softpipe|microsoft basic render/i.test(renderer);
}

export function createRenderer({ canvas }: CreateOpts): BlackHoleRenderer {
  let disposed = false;
  let gl: WebGL2RenderingContext | null = null;
  let raf = 0;
  let program: WebGLProgram | null = null;
  let resizeObs: ResizeObserver | null = null;
  let visObs: IntersectionObserver | null = null;
  let visible = true;
  const start = performance.now();
  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const automated = isAutomated();
  let quality = automated ? 0.35 : 1;
  let frozen = reduced || automated;
  let drawn = 0;
  let drawFrame = (_now: number) => {};

  const ready = new Promise<void>((resolve) => {
    const fitCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const cssW = Math.max(2, rect.width || canvas.clientWidth || 300);
      const cssH = Math.max(2, rect.height || canvas.clientHeight || 300);
      const cap = quality < 0.5 ? 0.55 : quality < 0.8 ? 0.75 : 1;
      const dpr = Math.min(window.devicePixelRatio || 1, quality < 0.5 ? 1 : 1.25) * cap;
      let w = Math.max(2, Math.floor(cssW * dpr));
      let h = Math.max(2, Math.floor(cssH * dpr));
      const maxPx = quality < 0.5 ? 420_000 : 900_000;
      const px = w * h;
      if (px > maxPx) {
        const s = Math.sqrt(maxPx / px);
        w = Math.max(2, Math.floor(w * s));
        h = Math.max(2, Math.floor(h * s));
      }
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };

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
          powerPreference: "high-performance",
          preserveDrawingBuffer: automated,
        });
        if (!gl) {
          fitCanvas();
          paintFallback(canvas);
          resolve();
          return;
        }
        if (isSoftwareGL(gl)) {
          quality = 0.35;
          frozen = true;
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
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) ?? "link failed");
        }
        gl.useProgram(program);

        const locRes = gl.getUniformLocation(program, "u_res");
        const locTime = gl.getUniformLocation(program, "u_time");
        const locLook = gl.getUniformLocation(program, "u_look");
        const locQuality = gl.getUniformLocation(program, "u_quality");

        fitCanvas();

        const onMove = (ev: PointerEvent) => {
          if (frozen) return;
          const rect = canvas.getBoundingClientRect();
          if (rect.width < 8 || rect.height < 8) return;
          look.tx = ((ev.clientX - rect.left) / rect.width - 0.5) * 0.55;
          look.ty = (0.5 - (ev.clientY - rect.top) / rect.height) * 0.18;
        };
        const onLeave = () => {
          look.tx = 0;
          look.ty = 0;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);

        visObs = new IntersectionObserver(
          ([entry]) => {
            visible = entry?.isIntersecting ?? true;
          },
          { threshold: 0.02 },
        );
        visObs.observe(canvas);

        const onHidden = () => {
          if (document.hidden) visible = false;
        };
        document.addEventListener("visibilitychange", onHidden);

        const draw = (now: number) => {
          if (disposed || !gl || !program) return;
          look.x += (look.tx - look.x) * 0.045;
          look.y += (look.ty - look.y) * 0.045;
          const t = frozen && drawn > 0 ? 1.15 : (now - start) * 0.001 + 1.15;
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.useProgram(program);
          gl.uniform2f(locRes, canvas.width, canvas.height);
          gl.uniform1f(locTime, t);
          gl.uniform2f(locLook, look.x, look.y);
          gl.uniform1f(locQuality, quality);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          drawn += 1;
        };
        drawFrame = draw;

        const frame = (now: number) => {
          if (disposed || !gl || !program) return;
          if (!visible && drawn > 0) {
            raf = requestAnimationFrame(frame);
            return;
          }
          const t0 = performance.now();
          draw(now);
          const dt = performance.now() - t0;
          if (dt > 50 && quality > 0.4) {
            quality = 0.35;
            fitCanvas();
          }
          if (dt > 90) frozen = true;
          if (frozen && drawn >= 1) {
            raf = 0;
            return;
          }
          raf = requestAnimationFrame(frame);
        };

        draw(performance.now());
        if (!frozen) raf = requestAnimationFrame(frame);

        (canvas as HTMLCanvasElement & { __bhCleanup?: () => void }).__bhCleanup = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerleave", onLeave);
          document.removeEventListener("visibilitychange", onHidden);
        };

        resolve();
      } catch {
        fitCanvas();
        paintFallback(canvas);
        resolve();
      }
    };

    resizeObs = new ResizeObserver(() => {
      if (disposed) return;
      fitCanvas();
      if (!gl || !program) {
        paintFallback(canvas);
        return;
      }
      drawFrame(performance.now());
    });
    resizeObs.observe(canvas);
    boot();
  });

  return {
    ready,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObs?.disconnect();
      visObs?.disconnect();
      const extra = (canvas as HTMLCanvasElement & { __bhCleanup?: () => void }).__bhCleanup;
      extra?.();
      if (gl && program) gl.deleteProgram(program);
      program = null;
      gl = null;
    },
  };
}
