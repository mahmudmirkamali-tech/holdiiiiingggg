import{a as e,c as t,f as n,l as r,n as i,r as a,s as o,t as s}from"./page-Ct0_JqaQ.js";import{t as c}from"./service-card-pihXdu6G.js";import{o as l,s as u,t as d}from"./index-Bi1akju5.js";import{a as f,l as p,o as m,s as h,u as g}from"./data-BQ4Ae1jC.js";import{n as _,t as v}from"./project-card-CHpM82xO.js";var y=l(`arrow-down`,[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m19 12-7 7-7-7`,key:`1idqje`}]]),b=l(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),x=l(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),S=n(r(),1),C=t();function w(e,t){let[n,r]=(0,S.useState)(0);return(0,S.useEffect)(()=>{if(!t)return;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){r(e);return}let n=null,i=0,a=t=>{n===null&&(n=t);let o=Math.min(1,(t-n)/700);r(Math.round(e*(1-(1-o)**3))),o<1&&(i=requestAnimationFrame(a))};return i=requestAnimationFrame(a),()=>cancelAnimationFrame(i)},[e,t]),n}function T({value:e,label:t}){let n=(0,S.useRef)(null),[r,i]=(0,S.useState)(!1),a=w(e,r);return(0,S.useEffect)(()=>{let e=n.current;if(!e)return;let t=new IntersectionObserver(([e])=>{e.isIntersecting&&(i(!0),t.disconnect())},{threshold:.4});return t.observe(e),()=>t.disconnect()},[]),(0,C.jsxs)(`div`,{ref:n,className:`rounded-2xl bg-surface px-5 py-8 text-center shadow-[var(--shadow-border)]`,children:[(0,C.jsx)(`div`,{className:`font-display text-4xl font-medium tabular-nums tracking-tight text-fg`,children:a}),(0,C.jsx)(`div`,{className:`mt-2 text-xs uppercase tracking-[0.12em] text-subtle`,children:t})]})}function E(){let e=o(e=>e.lang);return(0,C.jsx)(`div`,{className:`grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4`,children:h.map(t=>(0,C.jsx)(T,{value:t.value,label:p(e,t.label)},t.value+p(e,t.label)))})}var D=`#version 300 es
precision highp float;
const vec2 POS[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main() {
  gl_Position = vec4(POS[gl_VertexID], 0.0, 1.0);
}
`,O=`#version 300 es
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
`;function k(e,t,n){let r=e.createShader(t);if(!r)throw Error(`shader`);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r)??`compile failed`;throw e.deleteShader(r),Error(t)}return r}function A(e){let t=e.getContext(`2d`);if(!t)return;let n=e.width,r=e.height,i=t.createRadialGradient(n*.5,r*.46,r*.04,n*.5,r*.5,r*.7);i.addColorStop(0,`#050506`),i.addColorStop(.12,`#0a0a0c`),i.addColorStop(.2,`#c9a078`),i.addColorStop(.28,`#3a2218`),i.addColorStop(.45,`#12141c`),i.addColorStop(1,`#09090b`),t.fillStyle=i,t.fillRect(0,0,n,r)}function j({canvas:e}){let t=!1,n=null,r=0,i=null,a=null,o=null,s=!0,c=performance.now(),l=0,u={x:0,y:0,tx:0,ty:0},d=typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;return{ready:new Promise(f=>{let p=()=>{if(t){f();return}try{if(n=e.getContext(`webgl2`,{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,powerPreference:`high-performance`}),!n){m(),A(e),f();return}let a=k(n,n.VERTEX_SHADER,D),p=k(n,n.FRAGMENT_SHADER,O);if(i=n.createProgram(),!i)throw Error(`program`);if(n.attachShader(i,a),n.attachShader(i,p),n.linkProgram(i),n.deleteShader(a),n.deleteShader(p),!n.getProgramParameter(i,n.LINK_STATUS))throw Error(n.getProgramInfoLog(i)??`link failed`);n.useProgram(i);let h=n.getUniformLocation(i,`u_res`),g=n.getUniformLocation(i,`u_time`),_=n.getUniformLocation(i,`u_look`),v=n.getUniformLocation(i,`u_quality`);m();let y=t=>{let n=e.getBoundingClientRect();n.width<8||n.height<8||(u.tx=((t.clientX-n.left)/n.width-.5)*.55,u.ty=(.5-(t.clientY-n.top)/n.height)*.18)},b=()=>{u.tx=0,u.ty=0};window.addEventListener(`pointermove`,y,{passive:!0}),window.addEventListener(`pointerleave`,b),o=new IntersectionObserver(([e])=>{s=e?.isIntersecting??!0},{threshold:.02}),o.observe(e);let x=()=>{document.hidden&&(s=!1)};document.addEventListener(`visibilitychange`,x);let S=a=>{if(t||!n||!i||(r=requestAnimationFrame(S),!s&&!d))return;u.x+=(u.tx-u.x)*.045,u.y+=(u.ty-u.y)*.045;let o=d?l:(a-c)*.001;d&&l===0&&(l=.8),n.viewport(0,0,e.width,e.height),n.useProgram(i),n.uniform2f(h,e.width,e.height),n.uniform1f(g,o),n.uniform2f(_,u.x,u.y);let f=Math.min(e.width,e.height)<700;n.uniform1f(v,f?.45:1),n.drawArrays(n.TRIANGLES,0,3),d&&(cancelAnimationFrame(r),r=0)};r=requestAnimationFrame(S),e.__bhCleanup=()=>{window.removeEventListener(`pointermove`,y),window.removeEventListener(`pointerleave`,b),document.removeEventListener(`visibilitychange`,x)},f()}catch{m(),A(e),f()}},m=()=>{let t=Math.min(window.devicePixelRatio||1,1.5),n=e.getBoundingClientRect(),r=Math.max(2,Math.floor((n.width||e.clientWidth||300)*t)),i=Math.max(2,Math.floor((n.height||e.clientHeight||300)*t));e.width!==r&&(e.width=r),e.height!==i&&(e.height=i)};a=new ResizeObserver(()=>{m(),!n&&!t&&A(e)}),a.observe(e),p()}),dispose(){t=!0,cancelAnimationFrame(r),a?.disconnect(),o?.disconnect();let s=e.__bhCleanup;s?.(),n&&i&&n.deleteProgram(i),i=null,n=null}}}function M({className:e}){let t=(0,S.useRef)(null);return(0,S.useEffect)(()=>{let e=t.current;if(!e)return;let n=j({canvas:e});return n.ready,()=>n.dispose()},[]),(0,C.jsx)(`div`,{className:a(`relative h-full w-full overflow-hidden bg-bg`,e),children:(0,C.jsx)(`canvas`,{ref:t,className:`block h-full w-full touch-none`})})}function N(){let t=e(),n=o(e=>e.lang)===`fa`?b:x,r=f.filter(e=>e.featured),a=f.filter(e=>e.funding).slice(0,2);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`section`,{className:`relative -mt-16 min-h-[100dvh] overflow-hidden`,children:[(0,C.jsx)(`div`,{className:`absolute inset-0`,children:(0,C.jsx)(M,{})}),(0,C.jsx)(`div`,{className:`pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/45`}),(0,C.jsx)(`div`,{className:`pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent`}),(0,C.jsxs)(s,{className:`relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 sm:pb-20`,children:[(0,C.jsxs)(g,{children:[(0,C.jsx)(`p`,{className:`mb-5 text-xs font-medium uppercase tracking-[0.22em] text-accent`,children:`Founder & venture studio`}),(0,C.jsx)(`h1`,{className:`font-display text-6xl font-medium tracking-tight text-fg sm:text-7xl md:text-8xl`,children:`PARVAZ`}),(0,C.jsx)(`p`,{className:`mt-5 max-w-xl text-lg text-accent sm:text-xl`,children:t.hero.tagline}),(0,C.jsx)(`p`,{className:`mt-4 max-w-xl text-base text-muted`,children:t.hero.body}),(0,C.jsxs)(`div`,{className:`mt-10 flex flex-wrap gap-3`,children:[(0,C.jsx)(d,{asChild:!0,children:(0,C.jsx)(u,{to:`/projects`,children:t.hero.ctaProjects})}),(0,C.jsx)(d,{asChild:!0,variant:`secondary`,children:(0,C.jsx)(u,{to:`/invest`,children:t.hero.ctaInvest})}),(0,C.jsx)(d,{asChild:!0,variant:`secondary`,children:(0,C.jsx)(u,{to:`/contact`,children:t.hero.ctaWork})})]})]}),(0,C.jsxs)(`a`,{href:`#building`,className:`mt-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-subtle transition-colors hover:text-fg`,children:[(0,C.jsx)(y,{className:`size-3.5`}),t.home.buildingTitle]})]})]}),(0,C.jsx)(`section`,{className:`pb-20 pt-4`,children:(0,C.jsx)(s,{children:(0,C.jsx)(g,{children:(0,C.jsx)(E,{})})})}),(0,C.jsx)(`section`,{id:`building`,className:`py-16 md:py-24`,children:(0,C.jsxs)(s,{children:[(0,C.jsx)(g,{children:(0,C.jsx)(i,{eyebrow:t.home.buildingEyebrow,title:t.home.buildingTitle,body:t.home.buildingBody})}),(0,C.jsx)(`div`,{className:`grid gap-4 md:grid-cols-3`,children:r.map((e,t)=>(0,C.jsx)(g,{delay:t*80,children:(0,C.jsx)(_,{project:e})},e.id))}),(0,C.jsx)(`div`,{className:`mt-10`,children:(0,C.jsx)(d,{asChild:!0,variant:`secondary`,children:(0,C.jsxs)(u,{to:`/projects`,children:[t.home.allProjects,(0,C.jsx)(n,{className:`size-4`})]})})})]})}),(0,C.jsx)(`section`,{className:`py-16 md:py-24`,children:(0,C.jsxs)(s,{children:[(0,C.jsx)(g,{children:(0,C.jsx)(i,{eyebrow:t.home.investEyebrow,title:t.home.investTitle,body:t.home.investBody})}),(0,C.jsx)(`div`,{className:`grid gap-4 md:grid-cols-2`,children:a.map((e,t)=>(0,C.jsx)(g,{delay:t*80,children:(0,C.jsx)(v,{project:e})},e.id))}),(0,C.jsx)(`div`,{className:`mt-10`,children:(0,C.jsx)(d,{asChild:!0,variant:`secondary`,children:(0,C.jsxs)(u,{to:`/invest`,children:[t.home.investAll,(0,C.jsx)(n,{className:`size-4`})]})})})]})}),(0,C.jsx)(`section`,{className:`py-16 md:py-24`,children:(0,C.jsxs)(s,{children:[(0,C.jsx)(g,{children:(0,C.jsx)(i,{eyebrow:t.home.protocolEyebrow,title:t.home.protocolTitle,body:t.home.protocolBody})}),(0,C.jsx)(g,{children:(0,C.jsxs)(`div`,{className:`flex flex-col items-start justify-between gap-6 rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)] md:flex-row md:items-center md:p-10`,children:[(0,C.jsx)(`p`,{className:`max-w-xl text-sm text-muted`,children:t.protocol.body}),(0,C.jsx)(d,{asChild:!0,children:(0,C.jsxs)(u,{to:`/protocol`,children:[t.home.protocolAll,(0,C.jsx)(n,{className:`size-4`})]})})]})})]})}),(0,C.jsx)(`section`,{className:`py-16 md:py-24`,children:(0,C.jsxs)(s,{children:[(0,C.jsx)(g,{children:(0,C.jsx)(i,{eyebrow:t.home.advisoryEyebrow,title:t.home.advisoryTitle,body:t.home.advisoryBody})}),(0,C.jsx)(`div`,{className:`grid gap-4 md:grid-cols-3`,children:m.slice(0,3).map((e,t)=>(0,C.jsx)(g,{delay:t*80,children:(0,C.jsx)(c,{service:e})},e.id))}),(0,C.jsx)(`div`,{className:`mt-10`,children:(0,C.jsx)(d,{asChild:!0,variant:`secondary`,children:(0,C.jsxs)(u,{to:`/advisory`,children:[t.home.advisoryAll,(0,C.jsx)(n,{className:`size-4`})]})})})]})}),(0,C.jsx)(`section`,{className:`py-16 md:py-24`,children:(0,C.jsx)(s,{children:(0,C.jsx)(g,{children:(0,C.jsxs)(`div`,{className:`max-w-3xl border-s-2 border-accent/40 ps-8`,children:[(0,C.jsx)(`p`,{className:`text-xs font-medium uppercase tracking-[0.18em] text-accent`,children:t.home.founderEyebrow}),(0,C.jsx)(`blockquote`,{className:`mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-fg md:text-3xl`,children:t.home.founderQuote}),(0,C.jsx)(d,{asChild:!0,variant:`secondary`,className:`mt-8`,children:(0,C.jsxs)(u,{to:`/founder`,children:[t.home.founderCta,(0,C.jsx)(n,{className:`size-4`})]})})]})})})}),(0,C.jsx)(`section`,{className:`pb-24 pt-8`,children:(0,C.jsx)(s,{children:(0,C.jsx)(g,{children:(0,C.jsxs)(`div`,{className:`flex flex-col items-start justify-between gap-6 rounded-2xl bg-surface p-8 shadow-[var(--shadow-border)] md:flex-row md:items-center md:p-10`,children:[(0,C.jsxs)(`div`,{className:`max-w-xl`,children:[(0,C.jsx)(`p`,{className:`text-xs font-medium uppercase tracking-[0.18em] text-accent`,children:t.home.contactEyebrow}),(0,C.jsx)(`h2`,{className:`mt-3 font-display text-3xl font-medium tracking-tight`,children:t.home.contactTitle}),(0,C.jsx)(`p`,{className:`mt-3 text-sm text-muted`,children:t.home.contactBody})]}),(0,C.jsx)(d,{asChild:!0,children:(0,C.jsxs)(u,{to:`/contact`,children:[t.home.contactCta,(0,C.jsx)(n,{className:`size-4`})]})})]})})})})]})}export{N as component};