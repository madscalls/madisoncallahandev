import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DraggablePlant from "../../components/DraggablePlant/DraggablePlant.jsx";
import JelloDrag from "../../components/JelloDrag/JelloDrag.jsx";
import { SnakePlant, Computer, Squiggle, Circle, Squircle, Blob, Star, Flower } from "../../components/Art/Art.jsx";
import "./Intro.css";

gsap.registerPlugin(useGSAP);

const LINE = "Hey! wanna look at my portfolio..?";

const SCENE = [
  { art: Star, props: { color: "--creamsicle" }, pos: { left: "5%", top: "8%" }, w: "clamp(80px, 9vw, 130px)", r: -10, depth: 18, spin: true, jello: true },
  { art: Flower, props: { color: "--wisteria", center: "--creamsicle" }, pos: { right: "5%", top: "8%" }, w: "clamp(90px, 10vw, 150px)", depth: 22, spin: true, jello: true },
  { art: Computer, pos: { right: "5%", bottom: "3%" }, w: "clamp(130px, 15vw, 220px)", r: -4, depth: 14 },
  { art: Squiggle, props: { paint: "--sky-aqua" }, pos: { left: "24%", bottom: "9%" }, w: "clamp(110px, 11vw, 160px)", r: -6, depth: 26, hideSmall: true },
  { art: Circle, props: { color: "--sky-aqua" }, pos: { left: "27%", top: "14%" }, w: "46px", depth: 34 },
  { art: Squircle, props: { color: "--palm-leaf" }, pos: { right: "27%", top: "16%" }, w: "52px", r: 14, depth: 30 },
  { art: Blob, props: { color: "--wisteria", shape: 1 }, pos: { right: "25%", bottom: "16%" }, w: "80px", depth: 24, hideSmall: true },
  { art: Star, props: { color: "--sky-aqua" }, pos: { left: "14%", top: "45%" }, w: "40px", r: 18, depth: 40, hideSmall: true },
  { art: Circle, props: { color: "--creamsicle" }, pos: { right: "13%", top: "47%" }, w: "30px", depth: 38, hideSmall: true },
  { art: Flower, props: { color: "--sky-aqua", center: "--mint-cream", petals: 5 }, pos: { left: "46%", bottom: "7%" }, w: "38px", depth: 44 },
];

export default function Intro() {
  const root = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();
  const leaving = useRef(false);

  useGSAP(
    (ctx, contextSafe) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const yes = root.current.querySelector(".js-yes").parentElement;
      const no = root.current.querySelector(".js-no").parentElement;
      const hint = root.current.querySelector(".intro__hint");
      const blocks = gsap.utils.toArray(".piece", root.current);
      const small = window.innerWidth < 700;
      blocks.forEach((b) => {
        if (small && b.dataset.hideSmall) b.style.display = "none";
      });

      if (reduce) {
        textRef.current.textContent = LINE;
        gsap.set([yes, no, hint, ...blocks], { autoAlpha: 1 });
        return;
      }

      gsap.set([yes, no, hint], { autoAlpha: 0 });
      gsap.set(blocks, { autoAlpha: 0, scale: 0.3 });
      gsap.from(".intro__plant > svg", { scale: 0, transformOrigin: "50% 100%", duration: 0.7, ease: "back.out(2)", delay: 0.7 });
      gsap.fromTo(".intro__plant > svg", { rotate: -2.5 }, { rotate: 2.5, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 100%" });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(blocks, {
        autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2)", transformOrigin: "50% 100%",
        stagger: { each: 0.06, from: "random" },
      });

      gsap.utils.toArray(".piece[data-sway] > svg", root.current).forEach((svg) => {
        gsap.fromTo(svg, { rotate: -2.5 }, {
          rotate: 2.5, duration: gsap.utils.random(2.6, 4), ease: "sine.inOut",
          yoyo: true, repeat: -1, delay: gsap.utils.random(0, 1.5),
        });
      });

      let typed = "";
      [...LINE].forEach((ch, i) => {
        const prev = LINE[i - 1];
        let wait = 0.045 + Math.random() * 0.05;
        if (prev === "!") wait = 0.45;
        if (ch === "." && prev !== ".") wait = 0.3;
        if (ch === "." && prev === ".") wait = 0.22;
        if (ch === "?") wait = 0.32;
        tl.call(() => {
          typed += ch;
          textRef.current.textContent = typed;
        }, null, `+=${wait}`);
      });

      const jump = (el) =>
        gsap.timeline()
          .fromTo(el, { autoAlpha: 0, y: 90, scaleX: 0.8, scaleY: 1.25 },
            { autoAlpha: 1, y: -22, scaleX: 1, scaleY: 1, duration: 0.34, ease: "power2.out" })
          .to(el, { y: 0, scaleX: 1.12, scaleY: 0.86, duration: 0.14, ease: "power2.in" })
          .to(el, { y: -7, scaleX: 0.97, scaleY: 1.04, duration: 0.16, ease: "power2.out" })
          .to(el, { y: 0, scaleX: 1, scaleY: 1, duration: 0.3, ease: "bounce.out" });

      tl.add(jump(yes), "+=0.35");
      tl.add(jump(no), "-=0.6");
      tl.to(hint, { autoAlpha: 1, duration: 0.6 }, "+=0.4");

      tl.call(() => {
        gsap.timeline({ repeat: -1, repeatDelay: 3.8 })
          .to(yes, { y: -10, scaleY: 1.05, duration: 0.18, ease: "power2.out" })
          .to(yes, { y: 0, scaleY: 1, duration: 0.4, ease: "bounce.out" });
      });

      gsap.utils.toArray(".piece[data-spin] svg", root.current).forEach((svg, i) => {
        gsap.to(svg, { rotate: i % 2 ? -360 : 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      });

      const movers = blocks.map((b) => ({
        depth: Number(b.dataset.depth),
        x: gsap.quickTo(b, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(b, "y", { duration: 0.9, ease: "power3.out" }),
      }));
      const onMove = contextSafe((e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => { m.x(-nx * m.depth); m.y(-ny * m.depth); });
      });
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );

  const { contextSafe } = useGSAP({ scope: root });
  const wiggle = contextSafe((e) => {
    gsap.fromTo(e.currentTarget, { rotate: 0 },
      { keyframes: { rotate: [0, -6, 5, -3, 0] }, duration: 0.45, ease: "none", overwrite: "auto", clearProps: "transform" });
  });

  const go = contextSafe((e, to, color) => {
    if (leaving.current) return;
    leaving.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return navigate(to, { state: { fromIntro: true } });
    const r = e.currentTarget.getBoundingClientRect();
    const wipe = document.createElement("div");
    wipe.className = "wipe";
    Object.assign(wipe.style, {
      left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, background: color,
    });
    document.body.appendChild(wipe);
    gsap.timeline({
      onComplete: () => {
        navigate(to, { state: { fromIntro: true } });
        requestAnimationFrame(() => wipe.remove());
      },
    })
      .to(e.currentTarget, { scale: 0.92, duration: 0.1 })
      .to(wipe, {
        left: 0, top: 0, width: window.innerWidth, height: window.innerHeight,
        borderRadius: 0, borderWidth: 0, duration: 0.6, ease: "power4.inOut",
      });
  });

  return (
    <main className="intro" ref={root}>
      <div className="scene" aria-hidden="true">
        {SCENE.map(({ art: Art, props, pos, w, r = 0, depth, sway, spin, jello, hideSmall }, i) => (
          <span
            key={i}
            className="piece"
            data-depth={depth}
            data-sway={sway ? "1" : undefined}
            data-spin={spin ? "1" : undefined}
            data-hide-small={hideSmall ? "1" : undefined}
            style={{ ...pos, width: w, rotate: `${r}deg` }}
          >
            {jello ? <JelloDrag><Art {...props} /></JelloDrag> : <Art {...props} />}
          </span>
        ))}
      </div>

      <DraggablePlant className="intro__plant">
        <SnakePlant />
      </DraggablePlant>

      <div className="intro__stage">
        <h1 className="intro__line" aria-label={LINE}>
          <span ref={textRef} aria-hidden="true" />
          <span className="intro__caret" aria-hidden="true" />
        </h1>
        <div className="intro__buttons">
          <span className="hop">
          <button className="btn btn--purple js-yes" onClick={(e) => go(e, "/work", "var(--purple)")}>
            Yes!
          </button>
          </span>
          <span className="hop">
          <button
            className="btn btn--teal js-no"
            onMouseEnter={wiggle}
            onClick={(e) => go(e, "/game", "var(--teal)")}
          >
            No
          </button>
          </span>
        </div>
        <p className="intro__hint">No takes you to a game instead.</p>
      </div>
    </main>
  );
}
