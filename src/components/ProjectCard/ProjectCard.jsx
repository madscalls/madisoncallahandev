import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Arrow } from "../Icons/Icons.jsx";
import { Circle, Squircle, Blob, Star, Flower } from "../Art/Art.jsx";
import { kindLabel } from "../../data/projects.js";
import "./ProjectCard.css";

gsap.registerPlugin(useGSAP);

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const LAYOUTS = [
  [["circle", 130, { right: -34, top: -40 }], ["star", 62, { right: 104, top: 50 }], ["squircle", 48, { right: 40, top: 104 }], ["circle", 22, { right: 150, top: 120 }]],
  [["circle", 110, { right: -40, top: -44 }], ["flower", 64, { right: 96, top: 60 }], ["star", 40, { right: 36, top: 110 }], ["blob", 30, { right: 170, top: 30 }]],
  [["blob", 132, { right: -30, top: -26 }], ["star", 56, { right: 120, top: 70 }], ["circle", 38, { right: 64, top: 128 }], ["squircle", 26, { right: 160, top: 30 }]],
  [["squircle", 96, { right: -26, top: 84 }], ["flower", 56, { right: 100, top: 16 }], ["circle", 28, { right: 130, top: 116 }], ["star", 44, { right: 150, top: 64 }]],
];
const SHAPES = { circle: Circle, squircle: Squircle, blob: Blob, star: Star, flower: Flower };

function CardArt({ p, i }) {
  const layout = LAYOUTS[i % LAYOUTS.length];
  return (
    <span className="card__art" aria-hidden="true">
      {layout.map(([kind, size, pos], k) => {
        const Shape = SHAPES[kind];
        const color = p.palette[k % p.palette.length];
        const extra = kind === "flower" ? { center: p.palette[(k + 1) % p.palette.length] } : { shape: k };
        return <Shape key={k} color={color} {...extra} style={{ ...pos, width: size }} />;
      })}
    </span>
  );
}

export default function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const move = contextSafe((e) => {
    if (reduceMotion() || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: nx * 8, rotateX: -ny * 8, y: -6, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
  });
  const enter = contextSafe(() => {
    if (reduceMotion()) return;

    gsap.fromTo(ref.current, { scale: 1 }, { keyframes: { scale: [1, 1.025, 1] }, duration: 0.35, ease: "sine.out" });
  });
  const leave = contextSafe(() => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
  });

  return (
    <a
      ref={ref}
      className={`card${p.size ? ` card--${p.size}` : ""}`}
      style={{ "--bg": p.bg, "--fg": p.fg }}
      href={p.url}
      target="_blank"
      rel="noreferrer"
      data-flip-id={p.name}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <CardArt p={p} i={i} />
      <span className="card__top">
        <span className="card__kind">{kindLabel[p.kind]}</span>
        <span className="card__go"><Arrow /></span>
      </span>
      <span className="card__body">
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
