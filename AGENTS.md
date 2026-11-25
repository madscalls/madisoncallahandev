# AGENTS.md: instructions for Codex and other coding agents

This is Madison (Madi) Callahan's personal portfolio: a React + Vite single-page site deployed to GitHub Pages at https://madscalls.github.io/madisoncallahandev. Read this whole file before changing anything.

## Hard rules

1. **No comments anywhere in the code.** No `//`, `/* */`, `{/* */}` or `<!-- -->` in JS, JSX, CSS or HTML. Run `npm run check:comments` after every change; it must print `No comments found.` Put explanations in this file, never in code.
2. **One component per folder, with its own CSS.** Every component lives at `src/components/Name/Name.jsx` with `src/components/Name/Name.css` next to it, and the JSX imports its own CSS. Pages follow the same pattern in `src/pages/Name/`.
3. **Keep Madi's copy word for word.** The intro line ("Hey! wanna look at my portfolio..?"), the hero greeting and welcome paragraph, the About heading and paragraphs, the contact lines, "Thanks for looking" and the footer thank-you are hers. Don't rewrite, shorten or "fix" them unless Madi asks.
4. **Use the palette tokens.** Colors live as CSS variables at the top of `src/styles/global.css`. Don't put hex values in components or component CSS; add a token if one is truly needed. The only hex values outside `global.css` are each project's own brand colors in `src/data/projects.js`.
5. **Keep it free.** No paid services, no backend. The contact form goes through Web3Forms (free tier).
6. **Don't break GitHub Pages.** Keep `HashRouter` (routes look like `/#/work`) and keep `base: "/madisoncallahandev/"` in `vite.config.js`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 20+) |
| `npm run dev` | Local dev server, usually http://localhost:5173/madisoncallahandev/ |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check:comments` | Fail if any comment exists in `src/`, `scripts/`, `index.html` or `vite.config.js` |
| `npm run deploy` | Runs the comment check and build, then publishes `dist/` to the `gh-pages` branch |

## Routes

| Route | Page | What it is |
| --- | --- | --- |
| `/#/` | `Intro` | Typed greeting, then Yes / No buttons bounce in |
| `/#/work` | `Portfolio` | The portfolio (Yes) |
| `/#/game` | `Game` | "Roll it in", the mini golf game (No) |

## File map

```
index.html                       meta tags, fonts (Roboto Slab + Manrope), root element
vite.config.js                   base path for GitHub Pages
.env.example                     copy to .env and add the Web3Forms key
public/                          favicon set (rainbow-screen computer), resume.pdf, robots, sitemap, llms.txt
scripts/check-comments.mjs       the no-comments guard
src/main.jsx                     React entry, imports global.css
src/App.jsx                      routes
src/styles/global.css            palette tokens, reset, buttons (.btn), .wrap, .band, .reveal, reduced motion
src/data/site.js                 name, links, email, Web3Forms key lookup, resume URL
src/data/projects.js             project blocks, filters, tag labels
src/data/skills.js               Stack chips and Education
src/assets/images/avatar.webp    hero avatar
src/assets/images/*              older site images (avatar.png, icons, sparkles.svg), kept but not used
src/assets/models/*.glb          Madi's Blender models (starOne, starTwo, starThree, lollipop), kept but not used
src/assets/resume/page-*.webp    resume preview images, kept but not used
src/components/
  Art/             flat SVG illustrations: SnakePlant, Computer, Squiggle, Star, Flower, Circle, Squircle, Blob
  Icons/           small line icons (arrow, download, mail, GitHub, LinkedIn...)
  DraggablePlant/  wrapper that makes the snake plant draggable with gravity
  JelloDrag/       wrapper that makes the star and daisy drag-and-throw through "thick jello"
  NavBar/          sticky top bar, scrolls to sections
  Hero/            greeting, hopping name letters, portrait with plant, star, daisy and stickers
  Projects/        Projects heading, filter chips, the bento grid and its Flip shuffle
  ProjectCard/     one project block in that project's colors, with tilt on hover
  About/           Madi's About copy, Education, Stack chips
  ResumeBand/      sky band with Preview and Grab the PDF
  Contact/         contact links and the Web3Forms form
  Footer/          thank-you line and the link to the game
src/pages/
  Intro/           the landing screen and its scene of shapes
  Portfolio/       section order and the page entrance
  Game/            Roll it in
```

## Look and feel

- Madi's palette (tokens in `global.css`): Sky Aqua `--sky-aqua`, Mint Cream `--mint-cream` (page background), Wisteria `--wisteria`, Dark Amethyst `--dark-amethyst` (all text), Palm Leaf `--palm-leaf`, plus a creamsicle orange accent `--creamsicle`.
- Role tokens (`--purple`, `--teal`, `--sun`, `--lilac`, `--mint`, `--blush`) are built from those. Buttons are Wisteria or Sky Aqua with Dark Amethyst text.
- No black, no outlines, no hard black shadows. Shapes are flat and opaque. Buttons sit on a darker "shelf" of their own color.
- Shapes: circles, very rounded squares, super rounded stars, soft daisies, blobs, one snake plant, a smiling computer and a blue paint squiggle. Madi removed the coleus, the bromeliad, the paintbrush and most plants; don't add them back.
- Fonts: Roboto Slab for headings and buttons, Manrope for body text.

## How to tweak common things

### Intro (`src/pages/Intro/Intro.jsx`)
- `LINE` is the typed text. The pauses after "Hey!" and before the dots are in the typing loop.
- Yes and No jump in one after the other with a squash and bounce; Yes hops every few seconds. No wiggles on hover.
- Clicking a button grows a block of its color to fill the screen, then routes to `/work` or `/game`. The next page lifts a matching "reveal" panel.
- `SCENE` lists the decorations: `pos` is CSS positioning, `w` the width, `depth` how much it drifts with the mouse, `spin` turns it slowly, `jello` makes it draggable with `JelloDrag`, `hideSmall` hides it on phones. The snake plant is rendered separately so it can sit above the text.

### Draggable snake plant (`DraggablePlant`)
- Drag it anywhere. On release it falls onto whatever is below it (buttons, paragraphs, headings, project blocks, form, stickers); with nothing below, it falls to the bottom of the page.
- What counts as a surface is the `SURFACES` selector list. `RETURN_AFTER` is the 10 seconds before it hops home.

### Jello star and daisy (`JelloDrag`)
- The shape lags behind the pointer (`quickTo` duration 0.55), stretches and leans with speed, and when thrown keeps going and slows down heavily (`power4.out` over 1.6s) while wobbling back into shape. It can't leave the window.
- Used on the big star and daisy on the intro and the small ones by the portrait.

### Hero name letters (`Hero`)
- Hovering a letter makes it hop and borrow a color from `LETTER_COLORS`. Only colors different from the resting text color belong there, so every hover visibly changes.

### Projects (`src/data/projects.js`, `Projects`, `ProjectCard`)
- Each project has `name`, `url`, `kind` (`client`, `game` or `play`), `bg` and `fg` (block and text color from that project's own site), `palette` (its accent colors, used for the shapes), optional `size` (`wide` = 2 columns, `tall` = 2 rows) and a one-line `blurb`.
- Keep the total grid cells filling the last row. With 10 projects: Securipolis wide, Whelk Works tall, everything else single.
- Filters are All, Client sites and Games. `play` projects (Color-Strobe, BW Template) still show an "Experiment" tag and appear under All.
- Shape piles come from `LAYOUTS` in `ProjectCard.jsx`; keep shapes away from the arrow button in the top right.

### Game: Roll it in (`src/pages/Game/Game.jsx`)
- 10 holes (`HOLES`). Steer with arrows or WASD, or grab the ball and fling it. The ball bounces off the field edges.
- The hole pops up at a random spot away from the ball. It's a 3D-looking oval (`HOLE_RX`, `HOLE_RY`) with a light lip on the back edge. The ball sinks when it's well inside the oval and moving slowly; faster rolls ride over.
- Points per hole: `100 + max(0, 200 - seconds * 22)`. Best score is kept in `localStorage` on that device.
- From hole `OBSTACLES_FROM` (4) stars and daisies drift around and bump the ball; one more each hole, up to six.
- After each hole a scoreboard pops up and moves on by itself after 2.6 seconds, or with Enter / the button.
- Canvas colors are read from CSS tokens at start (`readColors`); change the tokens, not the game file.
- The start screen is a cloud-shaped card: "WASD or arrows to steer, or fling it. Good luck!"

### Forms (Web3Forms)
- The key comes from `VITE_WEB3FORMS_KEY`. Copy `.env.example` to `.env` and paste the key. Restart `npm run dev` after changing `.env`.
- `npm run deploy` builds on the machine that runs it, so that machine needs the `.env` file.
- Without a key the form shows "The form isn't connected yet" instead of failing silently. Spam protection is the hidden `botcheck` checkbox.

### Resume
- Replace `public/resume.pdf`. The Preview and Grab the PDF buttons point at it.

## Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| `check:comments` fails | Delete the comment it names. Never disable the check. |
| Blank page or missing assets on GitHub Pages | `base` in `vite.config.js` must match the repo name. Deploy publishes `dist/`, not the source. |
| Refreshing `/#/work` 404s | Someone switched to `BrowserRouter`; switch back to `HashRouter`. |
| A shape is white and invisible on the game field | The field is white; use a colored token for the shape. |
| Snake plant floats above a gap | Measure happens at scale 1 right after release; keep the `gsap.set(el, { scale: 1, rotate: 0 })` before `landingY()`. |
| Form says "not connected" | `VITE_WEB3FORMS_KEY` is missing at build or dev time. |

## Before you finish any change

1. `npm run check:comments`
2. `npm run build`
3. `npm run preview`, then check `/#/` (typing, buttons, drag the plant, throw the star), `/#/work` (letters, filters, card hover, form) and `/#/game` (play a few holes, reach hole 4 for obstacles) at desktop width and at 390px wide.
