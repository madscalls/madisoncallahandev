import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import "./Game.css";

const HOLES = 10;
const OBSTACLES_FROM = 4;
const BALL_R = 23;
const HOLE_R = 30;
const HOLE_RX = HOLE_R * 1.35;
const HOLE_RY = HOLE_R * 0.7;
const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const readColors = () => ({
  hole: token("--hole"),
  holeDeep: token("--hole-deep"),
  lip: token("--lip"),
  ball: token("--wisteria"),
  ballShade: token("--purple-deep"),
  shadow: token("--ball-shadow"),
  star: token("--creamsicle"),
  daisy: token("--daisy"),
  daisyCenter: token("--creamsicle"),
  daisy2: token("--sky-aqua"),
  confetti: ["--sky-aqua", "--wisteria", "--creamsicle", "--palm-leaf", "--dark-amethyst"].map(token),
});
let C = readColors();
const CHEERS = ["In it!", "Plop!", "Nice roll!", "Smooth.", "Right in the cup!", "Look at you go!"];
const KEYS = {
  ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0],
};

const readBest = () => { try { return Number(localStorage.getItem("roll-it-in-best")) || 0; } catch { return 0; } };
const saveBest = (v) => { try { localStorage.setItem("roll-it-in-best", String(v)); } catch {  } };
const rand = (a, b) => a + Math.random() * (b - a);

function roundStar(ctx, x, y, r, rot, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.5 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    ctx[i ? "lineTo" : "moveTo"](Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  ctx.lineWidth = r * 0.5;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
function daisy(ctx, x, y, r, rot, petal, center) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = petal;
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI * 2 * i) / 6;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = center;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.36, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const CloudPath = () => (
  <>
    <circle cx="112" cy="112" r="72" />
    <circle cx="205" cy="84" r="88" />
    <circle cx="298" cy="114" r="70" />
    <circle cx="66" cy="168" r="56" />
    <circle cx="336" cy="168" r="56" />
    <rect x="60" y="120" width="280" height="104" rx="52" />
  </>
);

export default function Game() {
  const location = useLocation();
  const [showReveal] = useState(Boolean(location.state?.fromIntro));
  const fieldRef = useRef(null);
  const canvasRef = useRef(null);
  const boardRef = useRef(null);
  const g = useRef(null);

  const [phase, setPhase] = useState("ready");
  const [hud, setHud] = useState({ hole: 1, total: 0, best: readBest() });
  const [last, setLast] = useState(null);

  const placeHole = useCallback(() => {
    const s = g.current;
    const { w, h } = s;
    const m = 60;
    let x, y, tries = 0;
    do {
      x = rand(m, w - m);
      y = rand(m, h - m);
      tries++;
    } while (Math.hypot(x - s.ball.x, y - s.ball.y) < Math.min(w, h) * 0.42 && tries < 60);
    s.hole = { x, y, scale: 0 };
    gsap.to(s.hole, { scale: 1, duration: 0.6, ease: "back.out(2.6)" });

    const count = s.holeNum >= OBSTACLES_FROM ? Math.min(1 + s.holeNum - OBSTACLES_FROM, 6) : 0;
    s.obstacles = [];
    for (let i = 0; i < count; i++) {
      let ox, oy, t = 0;
      do {
        ox = rand(50, w - 50);
        oy = rand(50, h - 50);
        t++;
      } while ((Math.hypot(ox - s.ball.x, oy - s.ball.y) < 150 || Math.hypot(ox - x, oy - y) < 110) && t < 80);
      const speed = rand(1.1, 1.6) + s.holeNum * 0.08;
      const a = rand(0, Math.PI * 2);
      const kind = i % 2 ? "daisy" : "star";
      const o = { x: ox, y: oy, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, r: kind === "star" ? 27 : 25, kind, rot: 0, spin: rand(-0.03, 0.03), scale: 0, tint: i % 4 === 3 ? C.daisy2 : C.daisy };
      gsap.to(o, { scale: 1, duration: 0.5, delay: 0.15 + i * 0.08, ease: "back.out(2.4)" });
      s.obstacles.push(o);
    }
    s.start = performance.now();
  }, []);

  const startGame = useCallback(() => {
    const s = g.current;
    s.holeNum = 1;
    s.total = 0;
    s.ball = { x: s.w / 2, y: s.h / 2, vx: 0, vy: 0, scale: 1 };
    s.particles = [];
    setHud((v) => ({ ...v, hole: 1, total: 0 }));
    placeHole();
    s.phase = "play";
    setPhase("play");
    fieldRef.current?.focus();
  }, [placeHole]);

  const nextHole = useCallback(() => {
    const s = g.current;
    if (s.phase !== "board") return;
    if (s.holeNum >= HOLES) {
      const best = Math.max(readBest(), s.total);
      saveBest(best);
      setHud((v) => ({ ...v, best }));
      s.phase = "done";
      setPhase("done");
      return;
    }
    s.holeNum += 1;
    s.ball.scale = 1;
    setHud((v) => ({ ...v, hole: s.holeNum }));
    placeHole();
    s.phase = "play";
    setPhase("play");
    fieldRef.current?.focus();
  }, [placeHole]);

  const sink = useCallback(() => {
    const s = g.current;
    s.phase = "sinking";
    const secs = (performance.now() - s.start) / 1000;
    const points = Math.round(100 + Math.max(0, 200 - secs * 22));
    s.total += points;
    for (let i = 0; i < 26; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(2, 6);
      s.particles.push({ x: s.hole.x, y: s.hole.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.5, life: 1, color: C.confetti[i % C.confetti.length], r: rand(3, 6) });
    }
    gsap.to(s.ball, { x: s.hole.x, y: s.hole.y, scale: 0.15, duration: 0.35, ease: "power2.in" });
    s.ball.vx = s.ball.vy = 0;
    setTimeout(() => {
      setLast({ cheer: CHEERS[Math.floor(Math.random() * CHEERS.length)], time: secs.toFixed(1), points, total: s.total, hole: s.holeNum });
      setHud((v) => ({ ...v, total: s.total }));
      s.phase = "board";
      setPhase("board");
    }, 450);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const field = fieldRef.current;
    const ctx = canvas.getContext("2d");
    C = readColors();
    const s = (g.current = {
      w: 0, h: 0, phase: "ready", holeNum: 1, total: 0,
      ball: { x: 0, y: 0, vx: 0, vy: 0, scale: 1 },
      hole: null, obstacles: [], particles: [], keys: new Set(), drag: null, start: 0,
    });

    const resize = () => {
      const r = field.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const ow = s.w, oh = s.h;
      s.w = r.width;
      s.h = r.height;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!ow) { s.ball.x = s.w / 2; s.ball.y = s.h / 2; return; }

      const fx = s.w / ow, fy = s.h / oh;
      s.ball.x *= fx; s.ball.y *= fy;
      if (s.hole) { s.hole.x *= fx; s.hole.y *= fy; }
      s.obstacles.forEach((o) => { o.x *= fx; o.y *= fy; });
    };
    const ro = new ResizeObserver(resize);
    ro.observe(field);
    resize();

    const down = (e) => {
      if (KEYS[e.key]) {
        e.preventDefault();
        s.keys.add(e.key);
        if (s.phase === "ready") startGame();
      } else if ((e.key === "Enter" || e.key === " ") && (s.phase === "board" || s.phase === "ready" || s.phase === "done")) {
        e.preventDefault();
        if (s.phase === "board") nextHole();
        else startGame();
      }
    };
    const up = (e) => { s.keys.delete(e.key); s.keys.delete(e.key.toLowerCase()); };
    const blur = () => s.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);

    const pt = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const pDown = (e) => {
      if (s.phase !== "play") return;
      const p = pt(e);
      if (Math.hypot(p.x - s.ball.x, p.y - s.ball.y) > BALL_R + 26) return;
      canvas.setPointerCapture(e.pointerId);
      s.drag = { x: p.x, y: p.y, px: s.ball.x, py: s.ball.y };
      canvas.classList.add("is-grabbing");
    };
    const pMove = (e) => {
      const p = pt(e);
      if (s.drag) { s.drag.x = p.x; s.drag.y = p.y; return; }
      if (s.phase === "play") canvas.classList.toggle("can-grab", Math.hypot(p.x - s.ball.x, p.y - s.ball.y) < BALL_R + 26);
    };
    const pUp = () => {
      if (!s.drag) return;
      s.drag = null;
      canvas.classList.remove("is-grabbing");
    };
    canvas.addEventListener("pointerdown", pDown);
    canvas.addEventListener("pointermove", pMove);
    canvas.addEventListener("pointerup", pUp);
    canvas.addEventListener("pointercancel", pUp);

    let raf, prev = performance.now();
    const step = (now) => {
      const dt = Math.min(2.5, (now - prev) / 16.67);
      prev = now;
      const b = s.ball;

      if (s.phase === "play") {
        if (s.drag) {

          const nx = b.x + (s.drag.x - b.x) * 0.35 * dt;
          const ny = b.y + (s.drag.y - b.y) * 0.35 * dt;
          b.vx = (nx - b.x) / dt;
          b.vy = (ny - b.y) / dt;
          const sp = Math.hypot(b.vx, b.vy);
          if (sp > 22) { b.vx *= 22 / sp; b.vy *= 22 / sp; }
          b.x = nx; b.y = ny;
        } else {
          let ax = 0, ay = 0;
          s.keys.forEach((k) => { const d = KEYS[k]; if (d) { ax += d[0]; ay += d[1]; } });
          const len = Math.hypot(ax, ay);
          if (len) { b.vx += (ax / len) * 0.55 * dt; b.vy += (ay / len) * 0.55 * dt; }
          const sp = Math.hypot(b.vx, b.vy);
          if (sp > 14 && len) { b.vx *= 14 / sp; b.vy *= 14 / sp; }
          const fr = Math.pow(0.982, dt);
          b.vx *= fr; b.vy *= fr;
          b.x += b.vx * dt; b.y += b.vy * dt;
        }

        if (b.x < BALL_R) { b.x = BALL_R; b.vx = Math.abs(b.vx) * 0.72; }
        if (b.x > s.w - BALL_R) { b.x = s.w - BALL_R; b.vx = -Math.abs(b.vx) * 0.72; }
        if (b.y < BALL_R) { b.y = BALL_R; b.vy = Math.abs(b.vy) * 0.72; }
        if (b.y > s.h - BALL_R) { b.y = s.h - BALL_R; b.vy = -Math.abs(b.vy) * 0.72; }

        s.obstacles.forEach((o) => {
          o.x += o.vx * dt; o.y += o.vy * dt; o.rot += o.spin * dt;
          if (o.x < o.r || o.x > s.w - o.r) { o.vx *= -1; o.x = Math.max(o.r, Math.min(s.w - o.r, o.x)); }
          if (o.y < o.r || o.y > s.h - o.r) { o.vy *= -1; o.y = Math.max(o.r, Math.min(s.h - o.r, o.y)); }
          const dx = b.x - o.x, dy = b.y - o.y;
          const dist = Math.hypot(dx, dy) || 1;
          const min = BALL_R + o.r * 0.85;
          if (dist < min && o.scale > 0.8) {
            const nx = dx / dist, ny = dy / dist;
            b.x = o.x + nx * min; b.y = o.y + ny * min;
            const rel = (b.vx - o.vx) * nx + (b.vy - o.vy) * ny;
            if (rel < 0) { b.vx -= 2.1 * rel * nx; b.vy -= 2.1 * rel * ny; }
            b.vx += nx * 2.2; b.vy += ny * 2.2;
            if (s.drag) { s.drag = null; canvas.classList.remove("is-grabbing"); }
            o.bump = 1;
          }
          if (o.bump) o.bump = Math.max(0, o.bump - 0.08 * dt);
        });

        const h = s.hole;
        if (h && h.scale > 0.9) {
          const dx = h.x - b.x, dy = h.y - b.y;
          const e = Math.hypot(dx / HOLE_RX, dy / HOLE_RY);
          if (e < 1.3) { b.vx += dx * 0.012 * dt; b.vy += dy * 0.012 * dt; }
          if (e < 0.6 && Math.hypot(b.vx, b.vy) < 9) { s.drag = null; sink(); }
        }
      }

      s.particles.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 0.18 * dt; p.life -= 0.022 * dt; });
      s.particles = s.particles.filter((p) => p.life > 0);

      ctx.clearRect(0, 0, s.w, s.h);
      const h = s.hole;
      if (h && s.phase !== "ready") {
        const k = h.scale;
        const rx = HOLE_RX * k, ry = HOLE_RY * k;

        ctx.fillStyle = C.lip;
        ctx.beginPath(); ctx.ellipse(h.x, h.y - 3 * k, rx + 2 * k, ry + 2 * k, 0, 0, Math.PI * 2); ctx.fill();

        const hg = ctx.createLinearGradient(0, h.y - ry, 0, h.y + ry);
        hg.addColorStop(0, C.holeDeep);
        hg.addColorStop(1, C.hole);
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.ellipse(h.x, h.y + 1 * k, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      }

      {
        const r = BALL_R * b.scale;
        ctx.fillStyle = C.shadow;
        ctx.beginPath(); ctx.ellipse(b.x + 3, b.y + r * 0.75, r * 0.95, r * 0.45, 0, 0, Math.PI * 2); ctx.fill();

        const grad = ctx.createRadialGradient(b.x - r * 0.35, b.y - r * 0.4, r * 0.1, b.x, b.y, r);
        grad.addColorStop(0, C.ball);
        grad.addColorStop(0.7, C.ball);
        grad.addColorStop(1, C.ballShade);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2); ctx.fill();
      }

      s.obstacles.forEach((o) => {
        const r = o.r * o.scale * (1 + (o.bump || 0) * 0.25);
        if (o.kind === "star") roundStar(ctx, o.x, o.y, r, o.rot, C.star);
        else daisy(ctx, o.x, o.y, r, o.rot, o.tint, C.daisyCenter);
      });

      s.particles.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      canvas.removeEventListener("pointerdown", pDown);
      canvas.removeEventListener("pointermove", pMove);
      canvas.removeEventListener("pointerup", pUp);
      canvas.removeEventListener("pointercancel", pUp);
    };
  }, [startGame, nextHole, sink]);

  useEffect(() => {
    if (phase !== "board" && phase !== "done" && phase !== "ready") return;
    const el = boardRef.current;
    if (el) gsap.fromTo(el, { scale: 0.6, autoAlpha: 0, y: 20 }, { scale: 1, autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(2.2)" });
    if (phase === "board") {
      const t = setTimeout(nextHole, 2600);
      return () => clearTimeout(t);
    }
  }, [phase, nextHole]);

  useEffect(() => {
    if (!showReveal) return;
    gsap.to(".reveal--game", { yPercent: -100, duration: 0.7, ease: "power4.inOut", delay: 0.05 });
  }, [showReveal]);

  const obstaclesNext = last && last.hole + 1 === OBSTACLES_FROM;

  return (
    <div className="game">
      {showReveal && <div className="reveal reveal--game" aria-hidden="true" />}
      <header className="game__bar">
        <Link className="btn btn--small" to="/" aria-label="Back to the start">Back<span className="game__back-long"> to the start</span></Link>
        <p className="game__title">Roll it in</p>
        <div className="game__stats" aria-live="polite">
          <span><b>Hole</b> {Math.min(hud.hole, HOLES)}/{HOLES}</span>
          <span><b>Score</b> {hud.total}</span>
          <span className="game__best"><b>Best</b> {hud.best}</span>
        </div>
      </header>

      <div className="game__field" ref={fieldRef} tabIndex={-1}>
        <canvas ref={canvasRef} className="game__canvas" aria-label="Game field: roll the ball into the hole" />

        {phase === "ready" && (
          <div className="board-wrap"><div className="cloud" ref={boardRef}>
            <svg className="cloud__shape" viewBox="0 0 400 270" aria-hidden="true">
              <g transform="translate(0 12)" className="cloud__shelf">
                <CloudPath />
              </g>
              <g className="cloud__top"><CloudPath /></g>
            </svg>
            <div className="cloud__body">
              <h1>Roll it in</h1>
              <p>WASD or arrows to steer, or fling it. Good luck!</p>
              <button className="btn btn--purple" onClick={startGame}>Start</button>
            </div>
          </div></div>
        )}

        {phase === "board" && last && (
          <div className="board-wrap"><div className="board board--small" ref={boardRef}>
            <h2>{last.cheer}</h2>
            <dl className="board__rows">
              <div><dt>Hole</dt><dd>{last.hole} of {HOLES}</dd></div>
              <div><dt>Time</dt><dd>{last.time}s</dd></div>
              <div><dt>Points</dt><dd>+{last.points}</dd></div>
              <div className="board__total"><dt>Total</dt><dd>{last.total}</dd></div>
            </dl>
            {obstaclesNext && <p className="board__warn">Things get bumpy now.</p>}
            <button className="btn btn--teal btn--small" onClick={nextHole}>
              {last.hole >= HOLES ? "See final score" : "Next hole"}
            </button>
          </div></div>
        )}

        {phase === "done" && (
          <div className="board-wrap"><div className="board" ref={boardRef}>
            <h1>That's {HOLES} holes!</h1>
            <dl className="board__rows">
              <div className="board__total"><dt>Final score</dt><dd>{hud.total}</dd></div>
              <div><dt>Your best</dt><dd>{hud.best}</dd></div>
            </dl>
            {hud.total >= hud.best && hud.total > 0 && <p className="board__warn">New best!</p>}
            <div className="board__actions">
              <button className="btn btn--purple" onClick={startGame}>Play again</button>
              <Link className="btn btn--teal" to="/work">See my portfolio</Link>
            </div>
          </div></div>
        )}
      </div>
    </div>
  );
}
