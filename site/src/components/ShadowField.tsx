import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * The shadow field — something is breathing behind the wall.
 *
 * Primary path: a full-screen WebGL2 fragment shader. Domain-warped
 * noise masses swell and shrink on a deep inhale/exhale cycle, smear
 * with cursor velocity, and recoil from the pointer; a single accent
 * ember (red on the wall, the book's ink inside a world) pulses out
 * of phase. Film grain is baked into the same pass.
 *
 * Fallbacks, in order:
 *  - prefers-reduced-motion → static div masses (no JS, no canvas)
 *  - no WebGL2             → the old animated div field
 */

/* ----------------------------- shader ----------------------------- */

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  uRes;
uniform float uT;
uniform vec2  uMouse;   // -0.5..0.5, eased
uniform vec2  uVel;     // eased pointer velocity
uniform vec3  uBase;    // page field colour
uniform vec3  uAccent;  // ember colour

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  for (int i = 0; i < 4; i++) {
    v += amp * vnoise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  vec2 m = vec2(uMouse.x, -uMouse.y); // pointer in shader space

  // The breath: one deep cycle (~14s) with a shallower counter-swell.
  float breath = sin(uT * 0.45) * 0.5 + 0.5;
  breath = breath * 0.75 + (sin(uT * 0.171 + 2.0) * 0.5 + 0.5) * 0.25;

  // Velocity smears the field; position warps it gently.
  vec2 smear = uVel * 0.6;
  vec2 q = uv * 2.4 + vec2(uT * 0.022, -uT * 0.014);
  vec2 warp = vec2(
    fbm(q + smear),
    fbm(q + vec2(5.2, 1.3) - smear)
  );

  // Dark masses, recoiling slightly from the pointer.
  float d = fbm(uv * 2.4 + warp * 1.3 - m * 0.35 + vec2(0.0, uT * 0.018));
  float lo = mix(0.34, 0.24, breath);
  float shade = smoothstep(lo, lo + 0.42, d);

  // Pointer pressure: a soft dark bulge that tracks the cursor.
  float press = smoothstep(0.55, 0.0, length(uv - m * 0.9)) * 0.22;

  vec3 col = uBase;
  col *= 1.0 - shade * 0.62 - press;

  // The ember: drifts against the cursor, breathes deepest.
  vec2 ep = uv + m * 0.5 + vec2(sin(uT * 0.07) * 0.3, cos(uT * 0.05) * 0.22);
  float e = fbm(ep * 1.3 + warp * 0.5);
  float ember = smoothstep(0.58, 0.92, e) * (0.35 + 0.65 * breath);
  col = mix(col, uAccent, ember * 0.18);

  // Corner falloff keeps the centre lit, the edges hungry.
  float vig = smoothstep(1.25, 0.35, length(uv));
  col *= mix(0.82, 1.0, vig);

  // Print grain, alive.
  float g = hash(gl_FragCoord.xy + fract(uT) * 311.7) - 0.5;
  col += g * 0.035;

  outColor = vec4(col, 1.0);
}
`;

/* ------------------------- colour plumbing ------------------------ */

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** Read the page's field + accent colours from CSS custom properties. */
function readPageColors(): { base: [number, number, number]; accent: [number, number, number] } {
  const probe = document.querySelector('.page') ?? document.body;
  const cs = getComputedStyle(probe);
  const base =
    hexToRgb(cs.getPropertyValue('--bk-bg')) ??
    hexToRgb(getComputedStyle(document.body).getPropertyValue('--wall')) ??
    ([0.114, 0.094, 0.078] as [number, number, number]);
  const accent =
    hexToRgb(cs.getPropertyValue('--shadow-accent')) ??
    hexToRgb(cs.getPropertyValue('--red')) ??
    ([0.957, 0.2, 0.227] as [number, number, number]);
  return { base, accent };
}

/* --------------------------- components --------------------------- */

/** Static/animated div masses — the fallback field. */
function DivField({ animate }: { animate: boolean }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!animate) return;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let px = 0;
    let py = 0;

    const SPECS = [
      { ampX: 80, ampY: 54, speed: 0.21, phase: 0.0, parX: 110, parY: 64 },
      { ampX: 64, ampY: 74, speed: 0.16, phase: 2.1, parX: -150, parY: -88 },
      { ampX: 72, ampY: 46, speed: 0.26, phase: 4.4, parX: 76, parY: 120 },
      { ampX: 100, ampY: 80, speed: 0.12, phase: 1.2, parX: -200, parY: -130 },
    ];

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX / innerWidth - 0.5;
      targetY = e.clientY / innerHeight - 0.5;
    };

    const tick = (now: number) => {
      const t = now / 1000;
      px += (targetX - px) * 0.09;
      py += (targetY - py) * 0.09;
      SPECS.forEach((b, i) => {
        const el = refs.current[i];
        if (!el) return;
        const x = Math.sin(t * b.speed + b.phase) * b.ampX + px * b.parX * 2;
        const y = Math.cos(t * b.speed * 0.8 + b.phase) * b.ampY + py * b.parY * 2;
        const s = 1 + Math.sin(t * 0.3 + b.phase * 1.7) * 0.06;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      });
      raf = requestAnimationFrame(tick);
    };

    addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [animate]);

  return (
    <div className="shadow-field" aria-hidden="true">
      {['sf-1', 'sf-2', 'sf-3', 'sf-ember'].map((cls, i) => (
        <span
          key={cls}
          className={cls}
          ref={(el) => {
            refs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}

export default function ShadowField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'shader' | 'divs-animated' | 'divs-static'>(
    'shader'
  );
  const colorsRef = useRef<{ base: number[]; accent: number[] }>({
    base: [0.114, 0.094, 0.078],
    accent: [0.957, 0.2, 0.227],
  });
  const { pathname } = useLocation();

  // Route changes re-aim the palette; the render loop eases toward it.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const { base, accent } = readPageColors();
      colorsRef.current = { base: [...base], accent: [...accent] };
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMode('divs-static');
      return;
    }

    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl2', {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      // Keeps the buffer readable after composite — needed for capture
      // tooling and harmless for a single fullscreen triangle.
      preserveDrawingBuffer: true,
      powerPreference: 'low-power',
    });
    if (!canvas || !gl) {
      setMode('divs-animated');
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh) ?? 'shader compile failed');
      }
      return sh;
    };

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(prog) ?? 'link failed');
      }
    } catch (err) {
      console.warn('[shadow-field] shader unavailable, using div field:', err);
      setMode('divs-animated');
      return;
    }

    gl.useProgram(prog);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, 'uRes'),
      t: gl.getUniformLocation(prog, 'uT'),
      mouse: gl.getUniformLocation(prog, 'uMouse'),
      vel: gl.getUniformLocation(prog, 'uVel'),
      base: gl.getUniformLocation(prog, 'uBase'),
      accent: gl.getUniformLocation(prog, 'uAccent'),
    };

    // Eased pointer state + velocity.
    let tx = 0, ty = 0, mx = 0, my = 0, vx = 0, vy = 0;
    let lastX = 0, lastY = 0, lastMove = 0;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      const now = performance.now();
      const dt = Math.max(16, now - lastMove);
      vx = vx * 0.7 + ((nx - lastX) * 1000) / dt;
      vy = vy * 0.7 + ((ny - lastY) * 1000) / dt;
      lastX = nx; lastY = ny; lastMove = now;
      tx = nx; ty = ny;
    };

    // Live palette eased toward the route's colours.
    const cur = {
      base: [...colorsRef.current.base],
      accent: [...colorsRef.current.accent],
    };

    const DPR = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.round(innerWidth * DPR);
      canvas.height = Math.round(innerHeight * DPR);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let watchdog = 0;
    let lastFrame = performance.now();
    const t0 = performance.now();
    const frame = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
      lastFrame = performance.now();
      // No document.hidden guard: rAF already throttles in hidden tabs,
      // and some embedded webviews misreport visibility.

      const t = (performance.now() - t0) / 1000;
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      vx *= 0.92;
      vy *= 0.92;

      for (let i = 0; i < 3; i++) {
        cur.base[i] += (colorsRef.current.base[i] - cur.base[i]) * 0.04;
        cur.accent[i] += (colorsRef.current.accent[i] - cur.accent[i]) * 0.04;
      }

      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.t, t);
      gl.uniform2f(U.mouse, mx, my);
      gl.uniform2f(U.vel, vx, vy);
      gl.uniform3f(U.base, cur.base[0], cur.base[1], cur.base[2]);
      gl.uniform3f(U.accent, cur.accent[0], cur.accent[1], cur.accent[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    // Watchdog: some embedded webviews starve rAF entirely while still
    // painting. If no frame lands for a second, keep the field alive on
    // a slow timer; rAF resumes priority the moment it fires again.
    watchdog = setInterval(() => {
      if (performance.now() - lastFrame > 1000) frame();
    }, 500) as unknown as number;

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(watchdog);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onMove);
      // Note: we deliberately do NOT lose the GL context here — React
      // StrictMode re-runs effects in dev, and a lost context on the same
      // canvas cannot be re-acquired, which would force the div fallback.
    };
  }, []);

  if (mode === 'divs-static') return <DivField animate={false} />;
  if (mode === 'divs-animated') return <DivField animate />;

  return <canvas ref={canvasRef} className="shadow-canvas" aria-hidden="true" />;
}
