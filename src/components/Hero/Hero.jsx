import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import avatar from "../../assets/images/avatar.webp";
import DraggablePlant from "../DraggablePlant/DraggablePlant.jsx";
import JelloDrag from "../JelloDrag/JelloDrag.jsx";
import { Arrow } from "../Icons/Icons.jsx";
import { SnakePlant, Star, Flower } from "../Art/Art.jsx";
import { profile } from "../../data/site.js";
import "./Hero.css";

gsap.registerPlugin(useGSAP);

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const LETTER_COLORS = ["var(--wisteria)", "var(--sky-aqua)", "var(--creamsicle)"];

export default function Hero() {
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const hop = contextSafe((e) => {
    if (reduceMotion()) return;
    const el = e.currentTarget;
    if (gsap.isTweening(el)) return;
    gsap.timeline()
      .to(el, { yPercent: -22, rotate: gsap.utils.random(-14, 14), color: gsap.utils.random(LETTER_COLORS), duration: 0.18, ease: "power2.out" })
      .to(el, { yPercent: 0, rotate: 0, duration: 0.55, ease: "bounce.out" })
      .to(el, { color: "var(--ink)", duration: 0.4 }, "+=0.6");
  });

  const words = profile.name.split(" ");

  return (
    <section className="hero" ref={ref}>
      <div className="wrap hero__grid">
        <div>
          <p className="hero__hello">Hi there! Thanks for stopping by,</p>
          <h1 className="hero__name" aria-label={profile.name}>
            {words.map((w, wi) => (
              <Fragment key={wi}>
                {wi > 0 && " "}
                <span className="word" aria-hidden="true">
                  {[...w].map((c, i) => (
                    <span className="ch" key={i} onPointerEnter={hop}>{c}</span>
                  ))}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="hero__lede">
            My name is Madi and you most likely stumbled upon my page by accident or were
            persuaded here, for good reason at that! I got lots to show you. Either way,
            Welcome and I appreciate your time.
          </p>
          <div className="hero__actions">
            <a className="btn btn--purple" href="#contact">Work with me <Arrow /></a>
            <a className="btn" href="#resume">Resume</a>
          </div>
        </div>

        <div className="portrait">
          <span className="portrait__dot" style={{ width: "34%", aspectRatio: 1, background: "var(--sky-aqua)", left: "-12%", top: "-6%" }} />
          <span className="portrait__dot" style={{ width: "16%", aspectRatio: 1, background: "var(--palm-soft)", right: "-8%", top: "44%" }} />
          <DraggablePlant className="portrait__plant portrait__plant--snake js-sway"><SnakePlant /></DraggablePlant>
          <JelloDrag className="portrait__star"><Star color="--sun" /></JelloDrag>
          <JelloDrag className="portrait__flower"><Flower color="--wisteria" center="--sun" /></JelloDrag>
          <div className="portrait__frame">
            <img src={avatar} alt="Illustrated portrait of Madi" width="420" height="525" />
          </div>
          <span className="sticker sticker--loc">Sarasota, FL</span>
          <span className="sticker sticker--open">Open to work</span>
        </div>
      </div>
    </section>
  );
}
