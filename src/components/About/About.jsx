import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Cap, Brush } from "../Icons/Icons.jsx";
import { Circle, Star, Flower } from "../Art/Art.jsx";
import { skills, creds } from "../../data/skills.js";
import "./About.css";

gsap.registerPlugin(useGSAP);

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function About() {
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });
  const jiggle = contextSafe((e) => {
    if (reduceMotion()) return;
    gsap.fromTo(e.currentTarget, { rotate: 0, y: 0 },
      { keyframes: { rotate: [0, -5, 4, -2, 0], y: [0, -6, 0, -2, 0] }, duration: 0.5, ease: "none", overwrite: "auto" });
  });

  return (
    <section className="band about" id="about" ref={ref}>
      <div className="wrap about__grid">
        <div className="about__text">
          <h2>We're gonna make it short and sweet..</h2>
          <p>
            I'm a full-stack developer with a creative background and a love for interactive design.
            I enjoy building experiences that feel intuitive, playful, and thoughtfully crafted.
          </p>
          <p>I truly believe I can create the next big thing and hope to work with you.</p>
        </div>
        <div className="side">
          <h3>Education</h3>
          <div className="creds">
            {creds.map((c, i) => (
              <div className="cred" key={c.title}>
                <span className="cred__icon" style={{ background: i ? "var(--sun)" : "var(--mint)" }}>
                  {i ? <Brush /> : <Cap />}
                </span>
                <div><strong>{c.title}</strong><span>{c.where}</span></div>
              </div>
            ))}
          </div>
          <h3>Stack</h3>
          <ul className="skills__list">
            {skills.map((s) => (
              <li className="skill" key={s} onPointerEnter={jiggle}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
      <span className="about__deco" aria-hidden="true">
        <Flower color="--wisteria" center="--creamsicle" style={{ width: 150, right: -30, bottom: -36 }} />
        <Star color="--sky-aqua" style={{ width: 70, right: 120, bottom: 70 }} />
        <Circle color="--palm-leaf" style={{ width: 30, right: 70, bottom: 150 }} />
      </span>
    </section>
  );
}
