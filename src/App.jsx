import { HashRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro/Intro.jsx";
import Portfolio from "./pages/Portfolio/Portfolio.jsx";
import Game from "./pages/Game/Game.jsx";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/work" element={<Portfolio />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Intro />} />
      </Routes>
    </HashRouter>
  );
}
