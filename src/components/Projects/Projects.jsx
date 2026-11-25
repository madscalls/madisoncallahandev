import { useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import { projects, filters } from "../../data/projects.js";
import "./Projects.css";

gsap.registerPlugin(useGSAP, Flip);

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const grid = useRef(null);
  const flipState = useRef(null);

  const counts = Object.fromEntries(filters.map((f) => [f.id, f.id === "all" ? projects.length : projects.filter((p) => p.kind === f.id).length]));
  const shown = filter === "all" ? projects : projects.filter((p) => p.kind === filter);

  const choose = (id) => {
    if (id === filter) return;
    if (!reduceMotion()) flipState.current = Flip.getState(grid.current.querySelectorAll(".card"));
    setFilter(id);
  };

  useGSAP(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      targets: grid.current.querySelectorAll(".card"),
      duration: 0.6,
      ease: "back.out(1.4)",
      absolute: true,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.04 }),
      onLeave: (els) => gsap.to(els, { scale: 0.6, autoAlpha: 0, duration: 0.25 }),
    });
    flipState.current = null;
  }, { dependencies: [filter], scope: grid });

  return (
    <section className="band" id="work">
      <div className="wrap">
        <div className="head">
          <div>
            <h2>Projects</h2>
            <p>Tap one to open it.</p>
          </div>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button key={f.id} className="chip" aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
                {f.label}<span className="count">{counts[f.id]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid" ref={grid}>
          {shown.map((p) => (
            <ProjectCard key={p.name} p={p} i={projects.indexOf(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}
