export const projects = [
  {
    name: "Securipolis", url: "https://securipolis.com/", kind: "client", size: "wide",
    bg: "#0b2836", fg: "#fff8ec", palette: ["#f25032", "#a9cacc", "#ecc985", "#035c7e"],
    blurb: "Site for an outsourced security and compliance firm: fractional CISO, compliance and incident response.",
  },
  {
    name: "Whelk Works", url: "https://www.whelkworks.com/", kind: "client", size: "tall",
    bg: "#086788", fg: "#faf5eb", palette: ["#f5ebd8", "#bc5a3c", "#dcefe4", "#0a3454"],
    blurb: "My studio. Websites, Google profiles and socials for small Gulf Coast businesses.",
  },
  {
    name: "She Ships", url: "https://sheships.dev/", kind: "client",
    bg: "#fdbc69", fg: "#0b2331", palette: ["#ef7564", "#147182", "#0b2331", "#ffe2b8"],
    blurb: "Home for a free community of women in tech across Manatee and Sarasota.",
  },
  {
    name: "OV26", url: "https://ospreyvisuals.com/", kind: "client",
    bg: "#ff7a1a", fg: "#0c0f14", palette: ["#0c0f14", "#ffffff", "#9aa3b2", "#ffb27a"],
    blurb: "Osprey Visuals: wraps, signage, print and custom fabrication.",
  },
  {
    name: "TicTacToad", url: "https://madscalls.github.io/tictactoad/", kind: "game",
    bg: "#4ecdc4", fg: "#103b38", palette: ["#ffd93d", "#ff6b6b", "#a29bfe", "#6bcf7f"],
    blurb: "Tic-tac-toe, but make it a pond.",
  },
  {
    name: "RPS", url: "https://madscalls.github.io/RPS/", kind: "game",
    bg: "#170069", fg: "#ffffff", palette: ["#9cf6fc", "#8cff00", "#ff4a4a", "#d30ded"],
    blurb: "Rock, paper, scissors against the computer, with a running score.",
  },
  {
    name: "Toro & Tide", url: "https://madscalls.github.io/toroandtide/", kind: "client",
    bg: "#fac94e", fg: "#3a2210", palette: ["#fd9d49", "#d37d31", "#fff3d6", "#f1c243"],
    blurb: "Concept site for a Gulf Coast sushi spot, with menu, reservations, ordering and gallery.",
  },
  {
    name: "orb.0", url: "https://madscalls.github.io/orb.0/", kind: "game",
    bg: "#e3e5ff", fg: "#2a2c40", palette: ["#4158d0", "#9aa2ff", "#8e24aa", "#ffffff"],
    blurb: "Color, sparkle and physics in one little orb game.",
  },
  {
    name: "Color-Strobe", url: "https://madscalls.github.io/colorstrobe/", kind: "play",
    bg: "#ffffff", fg: "#2b2b2b", palette: ["#ff6b6b", "#ffd93d", "#6bcf7f", "#5cd6ff", "#bd93d8"],
    blurb: "Click the paint bucket fast enough and it starts a color dance party.",
  },
  {
    name: "BW Template", url: "https://madscalls.github.io/bwtemplate/", kind: "play",
    bg: "#252525", fg: "#fafafa", palette: ["#d2b48c", "#fafafa", "#c7b299", "#5a5a5a"],
    blurb: "A black-and-white starter template.",
  },
];

export const filters = [
  { id: "all", label: "All" },
  { id: "client", label: "Client sites" },
  { id: "game", label: "Games" },
];

export const kindLabel = { client: "Client site", game: "Game", play: "Experiment" };
