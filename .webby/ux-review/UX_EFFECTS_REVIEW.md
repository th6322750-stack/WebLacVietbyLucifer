# Lạc Việt Media — UX & Motion/Effects Review Package

Scope requested: **UX and effects only** — how things move, respond to input, and feel to use.
Not a request for a visual-design score; grade the *interaction layer* — CSS transitions/
animations, JS-driven behavior, and how Tailwind is used to build it. Screenshots are static, so
this doc describes the motion/interaction each one implies.

Stack: Next.js 15 App Router, Tailwind CSS 3 (fully custom theme, no default palette/scale
survives), vanilla React state + native browser APIs for all interaction — **no animation
library** anywhere in the codebase (no Framer Motion, GSAP, etc.). Every effect below is hand-
built from CSS transitions/keyframes plus plain `useState`/`useEffect`/refs.

## Screenshots in this package

- `desktop/*.png`, `mobile/*.png` — full-page captures, 1440×900 and 390×844, for all 7 routes
  (`/`, `/website`, `/support-mxh`, `/dich-vu-so`, `/kien-thuc`, `/gioi-thieu`, `/lien-he`).
- `states/mobile-menu-open.png` — the full-screen mobile nav drawer, open.
- `states/header-scrolled.png` — header's scrolled-state (shrunk height, darker bg).
- `states/faq-open.png` — an FAQ item mid/post-expand.
- `states/spotlight-card-hover.png` — a service card under cursor (tilt + spotlight + border
  beam all active).
- `states/gallery-filtered.png` — the `/website` industry gallery after clicking a filter chip.

Captured with `prefers-reduced-motion: reduce` forced on and a full scroll pass before each
shot — real IntersectionObserver-triggered reveals and count-up numbers need that or they show
mid-animation/blank, which was learned the hard way earlier in this project (documented in the
component code itself).

---

## 1. Header

**File:** `src/components/layout/SiteHeader.tsx`

- Sticky header (`position: sticky`), height and background change on scroll via a plain
  `scroll` event listener (`useState` + `window.addEventListener("scroll", ..., {passive:true})`),
  threshold at 24px so it doesn't flicker right at the top. Height/background/logo-size all
  transition over `duration-normal` (240ms) with the site's one shared easing curve
  (`cubic-bezier(0.22,1,0.36,1)`).
- Background uses `backdrop-blur-lg` (a real CSS `backdrop-filter`, not a fake blurred image).
  **This is exactly what caused a real, now-fixed bug**: `backdrop-filter` creates a CSS
  containing block for `position: fixed` descendants, and the mobile drawer was nested inside
  `<header>` — its `fixed inset-0` was resolving against the header's own 64px box instead of the
  viewport. Fixed via `createPortal(..., document.body)`. Worth specifically checking: are there
  other `position:fixed` elements anywhere else in the tree that are descendants of a
  `backdrop-filter`/`filter`/`transform` ancestor? That bug class is easy to reintroduce.
- Nav-link hover: every link (not just the active one) now animates an underline in via
  `scaleX(0) → scaleX(1)` with `transform-origin: left`, 220ms. Active page gets the same
  underline permanently at `scale-x-100` rather than a separate visual treatment.
- Mobile menu: full-screen portal-rendered drawer, `useFocusTrap`/`useEscapeClose`/
  `useBodyScrollLock` custom hooks (`src/lib/a11y-hooks.ts`) handle keyboard trap, Escape-to-
  close-with-focus-restore, and body scroll lock while open. No animation on open/close currently
  — it's an instant mount/unmount (`{menuOpen ? portal : null}`), which is a legitimate UX
  question: does this deserve a slide/fade transition, or is instant appropriate for a full-bleed
  modal drawer?

## 2. Homepage hero — "Vietnam Scene"

**Files:** `src/components/layout/HeroVietnamScene.tsx`, `.vn-*` rules in `globals.css`

- 25 individually-positioned, individually-animated PNG/WebP layers (flag, map, chim Lạc/phoenix,
  pedestal, skyline, bridge, lotus flowers ×3 + their water reflections ×4, ambient glow/sparkle/
  ripple/haze/grid/floor) absolutely positioned by percentage over a fixed 1672:941 stage.
- Each layer's motion is a small dedicated `@keyframes` block: flag ripple via an SVG
  `feTurbulence`/`feDisplacementMap` filter (`baseFrequency` animated, not the whole flag
  repainted every frame — comment in the file explains this was chosen specifically to avoid a
  measured ~5fps-costing filter-repaint pattern), lotus/glow layers pulse opacity only, reflection
  layers do a `scaleY(-1)` flip plus a subtle wobble, masked with a linear-gradient fade so the
  "water" reads as receding into the distance.
- Desktop-only originally; mobile had **zero** hero visual until this session. Fixed by adding a
  `mobile` prop to the same component that filters the 25-layer array down to ~9 layers (map,
  flag, pole, pedestal, bird, ambient glow/sparkle only — skyline/bridge/reflections/secondary
  lotus dropped), then cropping the viewport into just that content's bounding box using the same
  focal-crop math pattern already used elsewhere in the codebase (`HeroVisual.tsx`) — scale the
  stage up, shift it, clip with `overflow:hidden`, so the crop reuses the exact same asset
  positions rather than inventing a new mobile composition.
- `prefers-reduced-motion` handling exists but is scoped narrowly (`.vn-stage *,
  .vn-stage *::before { animation: none !important; }` inside a media query) — worth checking
  whether that scope actually catches every animated property here (some layers animate
  `opacity`/`transform` via inline keyframe references, not all necessarily matching that
  selector's specificity).

## 3. `/support-mxh` hero — "ShieldOrbit"

**Files:** `src/components/layout/ShieldOrbit.tsx`, `.orbit-*` rules in `globals.css`

- A center shield (breathing scale animation, 5.5s) surrounded by 6 platform icons
  (Facebook/Meta/Messenger/TikTok/YouTube/Zalo) each independently floating on its own
  non-round-number duration/delay (`translate + rotate` keyframe) so they don't fall into visual
  lock-step — comment in the file explicitly explains this was a deliberate fix for a version
  where uniform timing made 6 icons look like "one rigid frame."
  Two concentric rings, one static, one spinning at 44s (well inside a sane "slow ambient" range).
  Two "spark" dots ride the rings at 30s/44s — dimmed this session (was a bright 0.85-alpha glow
  competing with the shield for attention; now 0.5-alpha, smaller spread).
  Hover on an icon: `scale(1.16) translateY(-6px)` + a brighter double drop-shadow, 400ms with a
  slight overshoot easing (`cubic-bezier(.34,1.5,.64,1)`) — this is the one place in the site with
  a deliberately "springy" hover, everywhere else uses the flat standard easing.
- `filter: drop-shadow` was deliberately avoided for the shield's OWN pulse (comment: measured
  ~5fps cost from animating `filter` every frame) — the pulsing glow is a separate sibling layer
  whose `opacity` animates instead, since opacity/transform are compositor-only properties.

## 4. `/dich-vu-so` hero — "HeroDigitalStack" (14-layer)

**Files:** `src/components/layout/HeroDigitalStack.tsx`, `.dvs-*` rules in `globals.css`

- 14 flat PNG layers (phone, medallion, shield, globe, gauge, wallet, chip, cloud, ID card, gold
  cubes, particles/trails) positioned by percentage over a 1600:2000 stage.
- Motion is explicitly tiered by visual weight: the medallion (front-and-center brand mark)
  breathes at the smallest amplitude (`scale` 1→1.022); satellite objects float at varying rise
  distances (6–15px) on independent durations; the gauge needle does a one-shot "power-up sweep"
  (`-52deg → 6deg → -4deg → 0deg`) that **used to loop every 4.5s forever** — fixed this session
  to `animation-iteration-count: 1` + `fill-mode: forwards`, so it settles once and holds instead
  of visibly "resetting like a broken clock."
- The globe's "rotation" is faked via `scaleX` oscillation (1 → 0.94) rather than a real 3D
  rotate — cheaper, and the comment notes it's visually indistinguishable at this size.
- `prefers-reduced-motion` disables all of `.dvs-float/.dvs-breathe/.dvs-shimmer/.dvs-drift/
  .dvs-needle/.dvs-globe` in one block.

## 5. Scroll-triggered reveals

**File:** `src/components/ui/ScrollReveal.tsx`

- IntersectionObserver-based (`threshold` configurable, default 0.1, `rootMargin: "0px 0px -40px
  0px"` so it fires slightly before full entry). Once triggered, `unobserve`s itself — animates in
  once, never re-hides on scroll-out.
- Explicitly checks `window.matchMedia("(prefers-reduced-motion: reduce)")` in a `useEffect` and
  skips straight to the visible end-state if true — this is the one motion primitive in the
  codebase that does its own reduced-motion check in JS rather than relying purely on a CSS media
  query, which matters because the animated property is an inline `style` (`opacity`,
  `translate3d`), not a Tailwind/CSS class that a `@media` block could target.
- **UX-relevant note**: because the check runs in a `useEffect` (after first paint, not before),
  there's a real — if brief — window where the pre-reveal transformed state is what's actually on
  screen, even for reduced-motion users. Confirmed this window is real (not just theoretical) via
  a flaky Playwright overflow-check test this session: measuring layout immediately after
  navigation caught a `direction="left"`/`"right"` instance still sitting at its
  `translate3d(±20px,0,0)` offset. It resolves within ~200ms, but it's there.
- Used extremely heavily — nearly every heading/card-group/CTA on every page is wrapped in one.
  Worth an opinion on whether that's overused to the point of diminishing its own effect (a
  design brief reviewed earlier in this project explicitly flagged "don't animate every line of
  text mechanically" as a risk here).

## 6. `SpotlightCard` (service cards, most content cards)

**File:** `src/components/ui/SpotlightCard.tsx`, `.spotlight-*` in `globals.css`

The most technically involved effect in the codebase, and the one most recently refactored for
performance:

- **Cursor-following radial spotlight** + **3D tilt** (`rotateX`/`rotateY`, capped ±3deg,
  `perspective(1000px)`) both driven by real-time `mousemove`.
- **Before this session**: mouse position, tilt angle, and glow opacity were all React `useState`,
  meaning every pixel of cursor movement triggered a full component re-render — measurable cost
  multiplied across every card on a page.
- **Now**: `mousemove` writes straight to CSS custom properties on the DOM node
  (`el.style.setProperty("--rx", ...)`) inside a `requestAnimationFrame` callback (coalesces
  multiple events per frame to one write), and the actual visual reads those variables in plain
  CSS (`transform: ... rotateX(var(--rx,0deg)) ...`, `background: radial-gradient(... at
  var(--mx,50%) var(--my,50%) ...)`). Zero React re-renders from hover motion.
- Touch/no-hover devices: tilt is skipped via a one-time `matchMedia("(hover: hover) and
  (pointer: fine)")` check on mount, plus a CSS `@media (hover:none) { transform: none !important
  }` backstop for any device that fires mousemove without real hover capability.
- Border "beam": a conic-gradient ring that only spins on `:hover` (`group-hover:animate-spin-
  slow`) — previously ran continuously on every card regardless of interaction, which is exactly
  the kind of "ambient animation running for no one" pattern worth checking for elsewhere too.
- `prefers-reduced-motion`: tilt transform forced to `none`, border-beam animation forced off.

## 7. `AnimatedCounter` (stat strips — "200+", "1000+", "98%"...)

**File:** `src/components/ui/AnimatedCounter.tsx`

- IntersectionObserver-triggered count-up from 0 to target over 1600ms, ease-out-expo curve,
  `threshold: 0.2`. Runs once (`hasAnimated` guard + `unobserve`).
- **Does not check `prefers-reduced-motion` at all** — the one motion primitive in the codebase
  that doesn't. Worth a direct opinion: is a numeric count-up "motion" in the sense that matters
  for vestibular-sensitive users, or is it borderline enough to leave as-is? (`ScrollReveal`,
  `SpotlightCard`, the hero scenes, and `ShieldOrbit` all explicitly handle it; this one doesn't.)

## 8. FAQ accordion

**File:** `src/components/content/FAQAccordion.tsx`

- Single-open accordion (opening one closes any other). Height animation uses the CSS grid-track
  trick (`display:grid; grid-template-rows: 0fr` → `1fr`, inner `overflow:hidden`) rather than a
  measured pixel `max-height` — works correctly for any answer length without JS measuring
  anything, and was a fix this session (previously the panel was conditionally rendered with zero
  transition — instant pop in/out). 300ms, standard easing. Chevron rotates 180deg on state
  change, `aria-hidden` toggled on the closed panel for screen readers.

## 9. `/website` industry gallery — filter + cursor interaction

**Files:** `src/app/(site)/website/IndustryGallery.tsx`,
`src/components/content/IndustryShowcaseCard.tsx`

- Filter chips generated from the data (not hardcoded), single active filter, instant re-render
  of the grid (no exit/enter transition on the filtered-out cards currently — they just disappear/
  appear). On mobile the chip row is `overflow-x-auto` with `scrollbar` hidden rather than
  wrapping, so tap targets stay full-size regardless of how many industries exist.
- Each card tracks mouse position locally (`useState`, scoped to just that card, only while
  hovered) to render a custom "XEM" cursor-follow badge on desktop, paired with `lg:cursor-none`
  so the OS cursor disappears under it. This is a `setState`-per-mousemove pattern too, but scoped
  to individual small components rather than SpotlightCard's every-card-on-the-page scale, so it
  wasn't flagged as a perf issue the way SpotlightCard was — worth a second opinion on whether
  it's worth the same CSS-variable treatment for consistency even if the perf cost is smaller here.

## 10. Buttons

**File:** `src/components/ui/Button.tsx`

- 4 variants (primary/secondary/outline/ghost), single shared base class. Primary has a metallic
  gradient + a hover-only diagonal "sheen" sweep (`::after` pseudo-element, `transform:
  translateX`, CSS-only, no JS) — was previously an `infinite` shimmer running at all times,
  changed to hover-triggered this session for the same "don't animate what nobody's looking at"
  reason as the card border-beam.
- Hover lift is 2px on primary/secondary/outline, explicitly *not* on ghost (a borderless text
  link lifting reads as a glitch rather than affordance — noted in the component's own comment).

## 11. Motion tokens (the shared vocabulary)

**File:** `tailwind.config.ts`

```
fast      160ms   — micro-interactions (icon rotate, chevron)
normal    240ms   — most hover/state transitions (header, buttons, nav underline)
slow      360ms   — larger surface transitions
reveal    650ms   — new tier, added this session, not yet consumed by anything
cinematic 1200ms  — new tier, added this session, not yet consumed by anything
easing:   cubic-bezier(0.22, 1, 0.36, 1) — the ONE easing curve used almost everywhere
```

Worth flagging directly: `reveal` and `cinematic` durations exist in the token scale but nothing
in the codebase actually uses them yet — they were added in anticipation of future "hero-scale"
moments. Either a real opportunity (something should be upgraded to use them) or dead tokens.

## 12. Reduced-motion coverage — summary table

| Effect | Reduced-motion handling |
|---|---|
| ScrollReveal | JS check, skips to end-state |
| Vietnam hero scene | CSS media query, scoped to `.vn-stage` |
| ShieldOrbit | CSS media query, explicit selector list |
| HeroDigitalStack (14-layer) | CSS media query, explicit selector list |
| SpotlightCard tilt/beam | Both JS (skip on mount) and CSS backstop |
| FAQ accordion | N/A — instant either way, no motion to reduce |
| Header scroll-shrink | **Not checked** — always transitions |
| AnimatedCounter | **Not checked** — always counts up |
| Button hover sheen/lift | **Not checked** — always transitions (arguably fine, hover-only) |

## Questions worth an opinion on

1. Is instant open/close on the mobile drawer (no slide/fade) the right call for a full-bleed
   modal, or does it need a transition now that it actually renders correctly?
2. `ScrollReveal` is used on nearly every heading/card-group sitewide — overused to the point of
   diminishing returns, or appropriately restrained given it only fires once per element?
3. The industry gallery's per-card cursor-tracking (`useState`-per-mousemove, scoped small) vs.
   SpotlightCard's CSS-variable approach (`ref.style.setProperty`, zero re-renders) — worth
   unifying on the CSS-variable pattern everywhere for consistency, or is the smaller scope here
   genuinely a non-issue?
4. `AnimatedCounter` and the header's scroll-shrink transition are the two remaining gaps in
   `prefers-reduced-motion` coverage — both real, both small. Worth closing, or acceptable as-is
   (neither is a large-amplitude or vestibular-triggering motion)?
5. The `reveal`/`cinematic` duration tokens exist unused — name a real candidate for them, or
   they should probably just be removed.
