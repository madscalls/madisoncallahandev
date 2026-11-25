import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./DraggablePlant.css";

const SURFACES = [
  "button", ".btn", "p", "h1", "h2", "h3", ".chip", ".card", ".link", ".cred",
  ".skill", ".form", ".portrait__frame", ".sticker", ".logo",
].join(",");

const RETURN_AFTER = 10;
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function DraggablePlant({ className = "", style, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const home = { z: getComputedStyle(el).zIndex };
    let drag = null;
    let timer = null;
    let lastX = 0;

    const pageRect = (node) => {
      const r = node.getBoundingClientRect();
      return { left: r.left + scrollX, right: r.right + scrollX, top: r.top + scrollY, bottom: r.bottom + scrollY, width: r.width };
    };

    const landingY = () => {
      const p = pageRect(el);
      const potL = p.left + p.width * 0.28;
      const potR = p.right - p.width * 0.28;
      let best = Math.max(document.documentElement.scrollHeight, innerHeight);
      document.querySelectorAll(SURFACES).forEach((s) => {
        if (el.contains(s) || s.contains(el)) return;
        const r = pageRect(s);
        if (r.width < 4 || r.right <= potL || r.left >= potR) return;
        if (r.top >= p.bottom - 6 && r.top < best) best = r.top;
      });
      return best - p.bottom;
    };

    const goHome = () => {
      gsap.to(el, {
        x: 0, y: 0, rotate: 0, duration: reduceMotion() ? 0 : 1.1, ease: "back.inOut(1.3)",
        onComplete: () => { el.style.zIndex = home.z; el.classList.remove("is-lifted"); },
      });
    };

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      clearTimeout(timer);
      gsap.killTweensOf(el);
      el.setPointerCapture(e.pointerId);
      el.style.zIndex = 70;
      el.classList.add("is-lifted", "is-dragging");
      drag = {
        sx: e.clientX, sy: e.clientY,
        ox: gsap.getProperty(el, "x"), oy: gsap.getProperty(el, "y"),
        scroll: scrollY,
      };
      lastX = e.clientX;
      gsap.to(el, { scale: 1.06, duration: 0.15 });
    };

    const onMove = (e) => {
      if (!drag) return;
      const vx = e.clientX - lastX;
      lastX = e.clientX;
      gsap.set(el, {
        x: drag.ox + (e.clientX - drag.sx),
        y: drag.oy + (e.clientY - drag.sy) + (scrollY - drag.scroll),
      });

      gsap.to(el, { rotate: gsap.utils.clamp(-22, 22, vx * 1.6), duration: 0.25, overwrite: "auto" });
    };

    const onUp = () => {
      if (!drag) return;
      drag = null;
      el.classList.remove("is-dragging");
      gsap.killTweensOf(el);
      gsap.set(el, { scale: 1, rotate: 0 });
      const fall = landingY();
      const quick = reduceMotion();
      gsap.timeline()
        .to(el, {
          y: `+=${fall}`,
          duration: quick ? 0 : gsap.utils.clamp(0.25, 1.1, Math.sqrt(Math.abs(fall)) / 26),
          ease: fall > 30 ? "bounce.out" : "power2.out",
        });
      timer = setTimeout(goHome, RETURN_AFTER * 1000);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <span ref={ref} className={`draggable ${className}`} style={style} title="Drag me">
      {children}
    </span>
  );
}
