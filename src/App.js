import React, { useState, useEffect } from "react";
import "./App.css";
import PhysicsTest from "./PhysicsTest";

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <div className="nav-container">
        <button className="nav-button" onClick={() => setNavOpen(!navOpen)}>
          Menu
        </button>
        {navOpen && (
          <div className="nav-dropdown">
            <a href="#resume" className="nav-link">
              Resume
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <a href="mailto:your@email.com" className="nav-link">
              Email
            </a>
          </div>
        )}
      </div>

      {/* Landing Section */}
      <section className="landing-section">
        <div className="landing-content">
          <div className="circles-container">
            <div className="main-circle"></div>
            <div className="floating-circle floating-circle-1"></div>
            <div className="floating-circle floating-circle-2"></div>
            <div className="floating-circle floating-circle-3"></div>
          </div>
          <div className="intro-text">
            <h1>Hi there! Thanks for stopping by,</h1>
            <p>
              My name is Madi and you most likely stumbled upon my page by
              accident or were persuaded here, for good reason at that! I got
              lots to show you. Either way, Welcome and I appreciate your time.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section
        className="credentials-section"
        style={{ transform: `translateY(-${parallaxOffset}px)` }}
      >
        <div className="credentials-content">
          <h2>We're gonna make it short and sweet..</h2>
          <p>
            Hi, Im Madi — a front-end developer with a creative background and a
            love for interactive design. I enjoy building experiences that feel
            intuitive, playful, and thoughtfully crafted.
          </p>
          <p>
            I have always been an imaginative individual. The technical side had
            to be cultivated. However once I divulged into the endless
            possibilities of web design I've been hooked. I have studied on my
            own for about two years now. I have completed my certification for
            Software Engineering at Tripleten, and cannot wait to keep learning.
          </p>
          <p>
            I truly believe I can create the next big thing and hope to work
            with you. If you'd like to view my portfolio projects please scroll
            below and click on a ball to find somthing you like.
            <br></br>
            Thank you for your attention & time
          </p>
        </div>
      </section>

      {/* Matter.js Section */}
      <section className="matter-section">
        <PhysicsTest />
      </section>
    </div>
  );
}
