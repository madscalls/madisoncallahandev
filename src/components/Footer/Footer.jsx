import { Link } from "react-router-dom";
import { profile } from "../../data/site.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span className="footer__thanks">Thank you for your attention &amp; time</span>
        <span>© {new Date().getFullYear()} {profile.name} · <Link to="/game">wanna play a game instead?</Link></span>
      </div>
    </footer>
  );
}
