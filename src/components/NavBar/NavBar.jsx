import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useSectionLinks() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").startsWith("#/")) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" });
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export default function NavBar() {
  useSectionLinks();
  return (
    <header className="nav">
      <nav className="wrap nav__inner" aria-label="Main">
        <Link className="logo" to="/" aria-label="Back to the start">MC</Link>
        <ul className="nav__links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#resume">Resume</a></li>
        </ul>
        <a className="btn btn--purple btn--small" href="#contact">Work with me</a>
      </nav>
    </header>
  );
}
