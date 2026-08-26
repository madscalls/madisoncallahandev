import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./skills.css";
import Stars from "./Stars";
import LollipopScene from "./LollipopScene";
import PhysicsTest from "./PhysicsTest";
import linkedinicon from "./images/linkedin-logo.png";
import git from "./images/GitHub_Invertocat_White.svg";
import gmail from "./images/gmail.png";

const resumePdf = "/resume.pdf";

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
          </div>
          <div className="intro-text">
            <h1>Hi there! Thanks for stopping by,</h1>
            <p>
              My name is Madi and you most likely stumbled upon my page by
              accident or were persuaded here, for good reason at that! I got
              lots to show you. Either way, Welcome and I appreciate your time.
            </p>
          </div>
          <div className="stars-wrapper">
            <Stars />
          </div>
        </div>
      </section>

      <section
        className="credentials-section"
        // style={{ transform: `translateY(-${parallaxOffset}px)` }}
      >
        <div className="Lollipop-scene">
          <LollipopScene />
        </div>
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

      <section className="skills">
        <div className="skills__track">
          <div className="skills__item">HTML</div>
          <div className="skills__item">CSS</div>
          <div className="skills__item">JavaScript</div>
          <div className="skills__item">React</div>
          <div className="skills__item">Git & GitHub</div>
          <div className="skills__item">Responsive Design</div>
          <div className="skills__item">API</div>
          <div className="skills__item">Three.js</div>
          <div className="skills__item">Matter.js</div>
          <div className="skills__item">UI & UX</div>
          <div className="skills__item">HTML</div>
          <div className="skills__item">CSS</div>
          <div className="skills__item">JavaScript</div>
          <div className="skills__item">React</div>
          <div className="skills__item">Git & GitHub</div>
          <div className="skills__item">Responsive Design</div>
          <div className="skills__item">API</div>
          <div className="skills__item">Three.js</div>
          <div className="skills__item">Matter.js</div>
          <div className="skills__item">UI & UX</div>
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

        <div className="page-card resume-card">
          <p className="page-text">Thanks for looking</p>
          <div className="page-actions">
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="page-button"
            >
              View Resume (PDF)
            </a>
          </div>

          <article className="resume-content">
            <header className="resume-header">
              <h2>Madison Callahan</h2>
              <p>
                Sarasota, FL | (585) 645-2798 |{" "}
                <a href="mailto:madscalls@gmail.com">madscalls@gmail.com</a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/madison-callahan-052140369/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                |{" "}
                <a
                  href="https://github.com/madscalls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </p>
            </header>

            <section className="resume-section">
              <h3>SOFTWARE DEVELOPER</h3>
              <p>
                Adaptable Software Developer with a strong foundation in modern
                web development and a passion for building intuitive,
                user-focused applications. Thrives in collaborative
                environments, enjoys solving complex problems, and is eager to
                contribute, learn, and grow alongside an experienced engineering
                team. Combines a background in design, sales, and client
                communication with technical expertise to create thoughtful,
                impactful software. Certified in in-home design projects and
                experienced in delivering tailored solutions that enhanced
                client satisfaction and drove revenue. Strong multitasker with a
                keen eye for aesthetics, translating design principles into
                interactive, user-friendly web experiences that combine
                creativity with technical precision.
              </p>
            </section>

            <section className="resume-section">
              <h3>TECHNICAL SKILLS</h3>
              <p>
                HTML - CSS - JavaScript - React - Git &amp; Github - Node -
                Express - MongoDB - Responsive - API - Design - Three.js -
                Blender - UX
              </p>
            </section>

            <section className="resume-section">
              <h3>PROJECTS</h3>
              <div className="resume-item">
                <p className="resume-item__title">
                  ORB.0 | Frontend |{" "}
                  <a href="https://madscalls.github.io/orb.0/">Live</a>
                </p>
                <p className="resume-item__meta">
                  Tech: HTML, CSS, JavaScript, GitHub Pages
                </p>
                <p>
                  An interactive, design-focused webpage exploring creative
                  layouts and visual storytelling.
                </p>
                <ul>
                  <li>
                    Implemented responsive design principles to ensure
                    compatibility across devices.
                  </li>
                  <li>
                    Showcased ability to blend technical coding with artistic
                    concepts, reinforcing a strong design background.
                  </li>
                  <li>
                    Deployed and maintained the project on GitHub Pages for live
                    hosting and version control.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <p className="resume-item__title">
                  Numfluers | Front-End |{" "}
                  <a href="https://madscalls.github.io/numfluers/">Live</a>
                </p>
                <p className="resume-item__meta">
                  Tech: React, JavaScript, CSS, HTML, Vite, GitHub Pages
                </p>
                <p>
                  Developed an interactive web application featuring custom
                  animations, responsive layouts, and modern UI design
                  principles.
                </p>
                <ul>
                  <li>
                    Built reusable React components and implemented dynamic
                    state management to create a smooth user experience.
                  </li>
                  <li>
                    Deployed the application through GitHub Pages with a
                    streamlined front-end workflow and version control
                    practices.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <p className="resume-item__title">
                  Osprey Visuals | Fullstack Developer &amp; Designer |{" "}
                  <a href="https://ospreyvisuals.com/">Live</a>
                </p>
                <p className="resume-item__meta">
                  Tech: React, JavaScript, CSS, Vite, GitHub Pages, API
                </p>
                <p>
                  Designed and developed a custom business website to generate
                  more revenue.
                </p>
                <ul>
                  <li>
                    Implemented interactive animations, scroll-based effects,
                    and responsive layouts to create a polished user experience
                    across devices.
                  </li>
                  <li>
                    Emphasis on call-to-action buttons to streamline client
                    leads.
                  </li>
                  <li>Mobile responsiveness and ease of use.</li>
                  <li>
                    Optimized photos and files to minimize loading time for user
                    experience.
                  </li>
                  <li>
                    Connected to a custom domain and email API for consistency
                    and alerting of new potential customers.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <p className="resume-item__title">
                  RPS | JavaScript |{" "}
                  <a href="https://madscalls.github.io/RPS/">Live</a>
                </p>
                <p className="resume-item__meta">
                  Tech: HTML, CSS, JavaScript, GitHub Pages
                </p>
                <p>
                  An interactive game design with responsiveness for mobile
                  usage and user experience in mind.
                </p>
                <ul>
                  <li>
                    Engineered UI feedback loops to display win/lose/tie
                    outcomes dynamically.
                  </li>
                  <li>
                    Organized code into modular, maintainable structure for
                    readability and future extension.
                  </li>
                </ul>
              </div>
            </section>

            <section className="resume-section">
              <h3>WORK EXPERIENCE</h3>

              <div className="resume-item">
                <p className="resume-item__title">TripleTen (Remote)</p>
                <p className="resume-item__meta">
                  Software Engineering Apprentice | Spring 2025 – Present
                </p>
                <ul>
                  <li>
                    Completed an intensive full-stack software engineering
                    apprenticeship focused on modern web development and
                    computer science fundamentals.
                  </li>
                  <li>
                    Built and deployed multiple production-ready web apps using
                    HTML, CSS, JavaScript, React, Node.js, Express, MongoDB,
                    Git, and REST APIs.
                  </li>
                  <li>
                    Developed responsive, accessible frontend interfaces and
                    backend services with CRUD functionality.
                  </li>
                  <li>
                    Collaborated using Git and GitHub through feature branching,
                    reviews, and iterative development.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <p className="resume-item__title">
                  Suncoast Florist – Sarasota, FL
                </p>
                <p className="resume-item__meta">
                  Floral Designer &amp; Sales Associate | 2025 – Present
                </p>
                <ul>
                  <li>
                    Design and assemble custom floral arrangements while
                    monitoring material costs to ensure profitability.
                  </li>
                  <li>
                    Coordinate and schedule floral services for weddings and
                    special events.
                  </li>
                  <li>
                    Manage delivery orders and inventory to reduce waste and
                    meet time-sensitive deadlines.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <p className="resume-item__title">
                  Hudson’s Furniture and Mattress Gallery – Bradenton, FL
                </p>
                <p className="resume-item__meta">
                  Sales &amp; Design Consultant | Sept 2023 – Feb 2025
                </p>
                <ul>
                  <li>
                    Certified in in-home design projects, successfully
                    completing whole-home layouts that drove sales.
                  </li>
                  <li>
                    Built client relationships through negotiation, conflict
                    resolution, and proactive communication.
                  </li>
                  <li>
                    Managed sensitive information, large transactions, and CRM
                    software for lead generation and tracking.
                  </li>
                </ul>
              </div>
            </section>

            <section className="resume-section">
              <h3>EDUCATION</h3>
              <div className="resume-item">
                <p className="resume-item__title">TripleTen - Online</p>
                <p className="resume-item__meta">
                  Software Engineer Trainee | Spring 2025 - Jan 2026
                </p>
              </div>
              <div className="resume-item">
                <p className="resume-item__title">Monroe Community College</p>
                <p className="resume-item__meta">
                  Fine Arts Program | Brighton, NY | 2018 - Dean’s List fall
                  semester
                </p>
              </div>
            </section>
          </article>
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
