import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Projects from "../../components/Projects/Projects.jsx";
import About from "../../components/About/About.jsx";
import ResumeBand from "../../components/ResumeBand/ResumeBand.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Portfolio.css";

gsap.registerPlugin(useGSAP);

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Portfolio() {
  const location = useLocation();
  const [showReveal] = useState(Boolean(location.state?.fromIntro));
  const page = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useGSAP(() => {
    if (reduceMotion()) return;
    const tl = gsap.timeline();
    if (showReveal) {
      tl.to(".reveal", { yPercent: -100, duration: 0.7, ease: "power4.inOut", delay: 0.05 })
        .set(".reveal", { display: "none" });
    }
    tl.from(".hero__name .ch", {
      yPercent: -120, rotate: () => gsap.utils.random(-25, 25), autoAlpha: 0,
      duration: 0.7, ease: "bounce.out", stagger: 0.035,
    }, showReveal ? "-=0.25" : 0.1)
      .from(".portrait__frame", { scale: 0.6, rotate: -14, autoAlpha: 0, duration: 0.7, ease: "back.out(1.8)" }, "<0.2")
      .from(".portrait__plant, .portrait__dot, .portrait__star, .portrait__flower", { scale: 0, transformOrigin: "50% 100%", duration: 0.6, ease: "back.out(2)", stagger: 0.08 }, "-=0.4")
      .from(".sticker", { scale: 0, duration: 0.45, ease: "back.out(3)", stagger: 0.12 }, "-=0.25");

    gsap.utils.toArray(".js-sway > svg").forEach((svg) => {
      gsap.fromTo(svg, { rotate: -2 }, {
        rotate: 2, duration: gsap.utils.random(2.8, 4.2), ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: gsap.utils.random(0, 1.2),
      });
    });
  }, { scope: page });

  return (
    <div className="portfolio" ref={page}>
      {showReveal && <div className="reveal" aria-hidden="true" />}
      <NavBar />
      <main>
        <Hero />
        <Projects />
        <About />
        <ResumeBand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
