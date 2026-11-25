import "./Icons.css";

const base = { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const Arrow = () => (<svg {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Download = () => (<svg {...base}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>);
export const Mail = () => (<svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>);
export const Cap = () => (<svg {...base}><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></svg>);
export const Code = () => (<svg {...base}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>);
export const Brush = () => (<svg {...base}><path d="M18 3 9 12l3 3 9-9a2.1 2.1 0 0 0-3-3z" /><path d="M9 12c-3 0-5 2-5 5 0 1.5-1 2.5-2 3 4 1 9 0 10-5" /></svg>);
export const Shell = () => (<svg {...base}><path d="M12 3c5 0 8 4 8 8 0 5-4 9-8 10-4-1-8-5-8-10 0-4 3-8 8-8z" /><path d="M12 3v18M7 6l5 6 5-6" /></svg>);
export const GitHub = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
  </svg>
);
export const LinkedIn = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.07c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68V21h-4V9.75z" />
  </svg>
);
