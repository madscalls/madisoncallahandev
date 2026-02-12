import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PhysicsTest from "./PhysicsTest";
import res from "./images/resume.png";
import linkedinicon from "./images/linkedin-logo.png";
import git from "./images/GitHub_Invertocat_White.svg";
import gmail from "./images/gmail.png";
function Home() {
  const [navOpen, setNavOpen] = useState(false);
  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const parallaxOffset = scrollY * 0.5;

  return (
    <div className="portfolio-container">
      <div className="nav-container">
        <button
          className={`nav-button ${navOpen ? "is-open" : ""}`}
          onClick={() => setNavOpen((v) => !v)}
          aria-expanded={navOpen}
          aria-controls="nav-dropdown"
        >
          Menu
        </button>

        <div
          id="nav-dropdown"
          className={`nav-dropdown ${navOpen ? "is-open" : ""}`}
        >
          <Link to="/resume" className="nav-link nav-link--1">
            Resume
          </Link>
          <Link to="/contact" className="nav-link nav-link--2">
            Contact
          </Link>
          <a href="mailto:madscalls@gmail.com" className="nav-link nav-link--3">
            Email
          </a>
        </div>
      </div>

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

      <section
        className="credentials-section"
        // style={{ transform: `translateY(-${parallaxOffset}px)` }}
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
            below and click on a ball to find something you like.
            <br />
            Thank you for your attention & time
          </p>
        </div>
      </section>

      <section className="matter-section">
        <PhysicsTest />
      </section>
    </div>
  );
}

function Resume() {
  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <Link to="/" className="back-link">
            ←
          </Link>
          <h1 className="page-title">Resume</h1>
        </div>

        <div className="page-card">
          <p className="page-text">Thanks for looking</p>
          <div className="page-actions">
            <a
              href="file:///C:/Users/Madsc/Downloads/Madison%20Callahan%20Tech%20resume%202025%20(1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="page-button"
            >
              View Resume (PDF)
            </a>
            <br></br>
            <img src={res} alt="resume" className="res-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <Link to="/" className="back-link">
            ←
          </Link>
          <h1 className="page-title">Contact</h1>
        </div>

        <div className="page-card">
          <p className="page-text">
            Want to collaborate or chat? Here are the best ways to reach me:
          </p>

          <div className="contact-list">
            <a className="contact-item" href="mailto:madscalls@gmail.com">
              <img src={gmail} alt="gmail" className="gmail" />
            </a>

            <a
              className="contact-item"
              href="https://github.com/madscalls"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={git} className="github-logo" alt="github" />
            </a>

            <a
              className="contact-item"
              href="https://www.linkedin.com/in/madison-callahan-052140369/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinicon}
                alt="linkedin"
                className="linkedin-icon"
              />{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}
