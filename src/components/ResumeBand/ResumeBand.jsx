import { Download } from "../Icons/Icons.jsx";
import { Circle, Star } from "../Art/Art.jsx";
import { resumeUrl } from "../../data/site.js";
import "./ResumeBand.css";

export default function ResumeBand() {
  return (
    <section className="resume" id="resume">
      <Star color="--sky-light" className="resume__deco" style={{ width: 220, right: "20%", top: -90, rotate: "12deg" }} />
      <Circle color="--sky-light" className="resume__deco" style={{ width: 110, left: "42%", bottom: -56 }} />
      <div className="wrap resume__inner">
        <div>
          <h2>Resume</h2>
          <p>Thanks for looking. Preview it here or grab the PDF.</p>
        </div>
        <div className="resume__actions">
          <a className="btn" href={resumeUrl} target="_blank" rel="noreferrer">Preview</a>
          <a className="btn btn--sun" href={resumeUrl} download="Madison-Callahan-Resume.pdf">Grab the PDF <Download /></a>
        </div>
      </div>
    </section>
  );
}
