import "./Art.css";

const f = (v) => ({ fill: v.startsWith("--") ? `var(${v})` : v });

const snakeLeaves = [

  [64, 34, 30, 15],
  [100, 128, 40, 15],
  [80, 82, 6, 18],
  [72, 56, 70, 13],
  [92, 108, 62, 13],
];
const snakeLeaf = (b, t, ty, w, y = 170) =>
  `M${b - w * 0.7} ${y} C${b - w * 1.3} ${y - 50} ${t - w * 0.8} ${ty + 46} ${t} ${ty} C${t + w * 0.8} ${ty + 46} ${b + w * 1.3} ${y - 50} ${b + w * 0.7} ${y} Z`;

export function SnakePlant(props) {
  return (
    <svg viewBox="0 0 160 232" {...props} aria-hidden="true">
      {snakeLeaves.map(([b, t, ty, w], i) => (
        <g key={i}>
          <path d={snakeLeaf(b, t, ty, w)} style={f("--leaf-light")} />
          <path d={snakeLeaf(b, t, ty + 14, w * 0.62)} style={f(i % 2 ? "--leaf-dark" : "--leaf")} />
          {[0.35, 0.55, 0.75].map((k, j) => (
            <ellipse key={j} cx={t + (b - t) * k} cy={ty + (170 - ty) * k} rx={w * 0.4} ry={2.6}
              transform={`rotate(${(b - t) * -0.4} ${t + (b - t) * k} ${ty + (170 - ty) * k})`} style={f("--leaf-light")} opacity="0.55" />
          ))}
        </g>
      ))}
      <path d="M34 172 H126 L117 220 Q115 230 104 230 H56 Q45 230 43 220 Z" style={f("--pot")} />
      <rect x="26" y="162" width="108" height="22" rx="11" style={f("--pot-rim")} />
    </svg>
  );
}

const bromLeaf = "M0 -7 C40 -22 86 -14 108 14 C80 2 40 2 0 9 Z";
const bromAngles = [-68, -44, -22, -2, 14];

export function Bromeliad(props) {
  return (
    <svg viewBox="0 0 240 214" {...props} aria-hidden="true">
      <g transform="translate(120 160)">
        {bromAngles.map((a, i) => (
          <g key={i}>
            <path d={bromLeaf} transform={`rotate(${a})`} style={f(i % 2 ? "--leaf-dark" : "--leaf")} />
            <path d={bromLeaf} transform={`scale(-1 1) rotate(${a + 6})`} style={f(i % 2 ? "--leaf" : "--leaf-dark")} />
          </g>
        ))}
      </g>
      <path d="M120 40 C102 74 102 130 120 160 C138 130 138 74 120 40 Z" style={f("--bloom")} />
      {[70, 92, 114, 136].map((y, i) => (
        <g key={y}>
          <path d={`M120 ${y} q-24 -4 -30 -22 q18 4 30 14 Z`} style={f(i % 2 ? "--bloom-light" : "--bloom")} />
          <path d={`M120 ${y} q24 -4 30 -22 q-18 4 -30 14 Z`} style={f(i % 2 ? "--bloom" : "--bloom-light")} />
        </g>
      ))}
      <rect x="74" y="160" width="92" height="50" rx="24" style={f("--pot")} />
      <rect x="66" y="154" width="108" height="20" rx="10" style={f("--pot-rim")} />
    </svg>
  );
}

const airAngles = [-78, -56, -36, -16, 4, 24, 44, 64, 82];

export function AirPlant(props) {
  return (
    <svg viewBox="0 0 220 190" {...props} aria-hidden="true">
      <g transform="translate(110 150)">
        {airAngles.map((a, i) => {
          const L = 100 + ((i * 37) % 40);
          const curl = a < 0 ? -1 : 1;
          return (
            <path key={i} transform={`rotate(${a})`}
              d={`M-6 0 C-9 ${-L * 0.4} ${-4 * curl} ${-L * 0.75} ${18 * curl} ${-L} C${4 * curl} ${-L * 0.7} 4 ${-L * 0.4} 6 0 Z`}
              style={f(i % 2 ? "--sage" : "--sage-dark")} />
          );
        })}
        <path d="M-4 -10 C-6 -40 -2 -62 0 -70 C2 -62 6 -40 4 -10 Z" style={f("--bloom")} />
        <ellipse cx="0" cy="4" rx="26" ry="16" style={f("--sage-dark")} />
      </g>
    </svg>
  );
}

export function Squiggle({ paint = "--sky-aqua", ...props }) {
  return (
    <svg viewBox="0 0 220 120" {...props} aria-hidden="true">
      <path d="M18 92 C56 40 96 118 136 70 S196 36 202 40" fill="none" stroke={`var(${paint})`} strokeWidth="24" strokeLinecap="round" />
    </svg>
  );
}

export function Computer(props) {
  return (
    <svg viewBox="0 0 220 214" {...props} aria-hidden="true">
      <rect x="18" y="8" width="184" height="146" rx="36" style={f("--wisteria")} />
      <rect x="38" y="26" width="144" height="100" rx="22" style={f("--sky-aqua")} />
      <g className="blink">
        <rect x="80" y="56" width="12" height="20" rx="6" style={f("--dark-amethyst")} />
        <rect x="128" y="56" width="12" height="20" rx="6" style={f("--dark-amethyst")} />
      </g>
      <path d="M96 90 Q110 104 124 90" fill="none" stroke="var(--dark-amethyst)" strokeWidth="7" strokeLinecap="round" />
      <circle cx="68" cy="88" r="9" style={f("--bloom-light")} />
      <circle cx="152" cy="88" r="9" style={f("--bloom-light")} />
      <circle cx="176" cy="140" r="5" style={f("--palm-leaf")} />
      <g transform="translate(176 30) rotate(14)">
        <polygon points="0,-13 3.8,-5.2 12.4,-4 6.2,2 7.6,10.6 0,6.6 -7.6,10.6 -6.2,2 -12.4,-4 -3.8,-5.2"
          style={{ ...f("--creamsicle"), stroke: "var(--creamsicle)" }} strokeWidth="6" strokeLinejoin="round" />
      </g>
      <rect x="94" y="150" width="32" height="22" style={f("--pot-rim")} />
      <rect x="62" y="166" width="96" height="14" rx="7" style={f("--wisteria")} />
      <rect x="28" y="188" width="164" height="22" rx="11" style={f("--keyboard")} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={42 + i * 20} y="194" width="14" height="10" rx="4" style={f("--card")} />
      ))}
    </svg>
  );
}

export const Circle = ({ color = "--sun", ...p }) => (
  <svg viewBox="0 0 100 100" {...p} aria-hidden="true"><circle cx="50" cy="50" r="50" style={f(color)} /></svg>
);
export const Squircle = ({ color = "--lilac", ...p }) => (
  <svg viewBox="0 0 100 100" {...p} aria-hidden="true"><rect width="100" height="100" rx="38" style={f(color)} /></svg>
);
const BLOBS = [
  "M52 4C76 2 98 20 96 46s-14 50-42 50S2 82 4 54 26 6 52 4Z",
  "M30 8c22-12 52 2 62 24s4 52-22 60-52-4-62-26S8 20 30 8Z",
  "M58 6c20 6 38 28 34 52s-28 40-52 34S0 66 6 42 38 0 58 6Z",
];
export const Blob = ({ color = "--mint", shape = 0, ...p }) => (
  <svg viewBox="0 0 100 100" {...p} aria-hidden="true"><path d={BLOBS[shape % BLOBS.length]} style={f(color)} /></svg>
);

const starPoints = (points = 5, inner = 0.56) =>
  Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 ? 30 * inner : 30;
    const a = (Math.PI / points) * i - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(52 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
export const Star = ({ color = "--sun", points = 5, ...p }) => (
  <svg viewBox="0 0 100 100" {...p} aria-hidden="true">
    <polygon points={starPoints(points)} style={{ ...f(color), stroke: f(color).fill }}
      strokeWidth="22" strokeLinejoin="round" />
  </svg>
);

export const Flower = ({ color = "--wisteria", center = "--sun", petals = 6, ...p }) => (
  <svg viewBox="0 0 100 100" {...p} aria-hidden="true">
    {Array.from({ length: petals }, (_, i) => {
      const a = (Math.PI * 2 * i) / petals;
      return <circle key={i} cx={50 + 26 * Math.cos(a)} cy={50 + 26 * Math.sin(a)} r="22" style={f(color)} />;
    })}
    <circle cx="50" cy="50" r="17" style={f(center)} />
  </svg>
);
