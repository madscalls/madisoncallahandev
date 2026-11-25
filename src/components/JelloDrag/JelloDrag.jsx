import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./JelloDrag.css";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function JelloDrag({ className = "", style, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const lift = el.closest(".scene");
    const followX = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const followY = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
    let drag = null;
    let vx = 0, vy = 0, lx = 0, ly = 0, lt = 0;

    const bounds = () => {
      const r = el.getBoundingClientRect();
      const x = gsap.getProperty(el, "x"), y = gsap.getProperty(el, "y");
      const homeL = r.left - x, homeT = r.top - y;
      return {
        minX: -homeL, maxX: innerWidth - r.width - homeL,
        minY: -homeT, maxY: innerHeight - r.height - homeT,
      };
    };

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      gsap.killTweensOf(el);
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
      if (lift) lift.style.zIndex = 4;
      drag = { sx: e.clientX, sy: e.clientY, ox: gsap.getProperty(el, "x"), oy: gsap.getProperty(el, "y"), b: bounds() };
      lx = e.clientX; ly = e.clientY; lt = performance.now(); vx = vy = 0;

      gsap.fromTo(el, { scaleX: 1, scaleY: 1 }, { keyframes: { scaleX: [1, 1.18, 0.92, 1.04], scaleY: [1, 0.84, 1.08, 0.98] }, duration: 0.45, ease: "none" });
    };

    const onMove = (e) => {
      if (!drag) return;
      const now = performance.now();
      const dt = Math.max(16, now - lt);

      vx = vx * 0.7 + ((e.clientX - lx) / dt) * 16 * 0.3;
      vy = vy * 0.7 + ((e.clientY - ly) / dt) * 16 * 0.3;
      lx = e.clientX; ly = e.clientY; lt = now;
      const { b } = drag;
      followX(gsap.utils.clamp(b.minX, b.maxX, drag.ox + e.clientX - drag.sx));
      followY(gsap.utils.clamp(b.minY, b.maxY, drag.oy + e.clientY - drag.sy));

      const speed = Math.min(Math.hypot(vx, vy), 40);
      gsap.to(el, {
        scaleX: 1 + speed * 0.006, scaleY: 1 - speed * 0.005,
        rotate: gsap.utils.clamp(-28, 28, vx * 1.4),
        duration: 0.4, ease: "power2.out", overwrite: "auto",
      });
    };

    const onUp = () => {
      if (!drag) return;
      const { b } = drag;
      drag = null;
      el.classList.remove("is-dragging");
      const quick = reduceMotion();
      const x = gsap.utils.clamp(b.minX, b.maxX, gsap.getProperty(el, "x") + vx * 26);
      const y = gsap.utils.clamp(b.minY, b.maxY, gsap.getProperty(el, "y") + vy * 26);
      gsap.killTweensOf(el);
      gsap.timeline({ onComplete: () => { if (lift) lift.style.zIndex = ""; } })

        .to(el, { x, y, rotate: `+=${vx * 6}`, duration: quick ? 0 : 1.6, ease: "power4.out" })

        .to(el, { scaleX: 1, scaleY: 1, duration: quick ? 0 : 1.2, ease: "elastic.out(1.1, 0.25)" }, 0);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <span ref={ref} className={`jello ${className}`} style={style}>
      {children}
    </span>
  );
}
