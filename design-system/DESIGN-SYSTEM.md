# Zoenex Studios — Design System

Extracted from the production site (`app/globals.css`, `lib/gsap.ts`, `lib/useViewAnimations.ts`, `lib/magnetic.ts`, `components/HeroArt.tsx`).

**Files in this folder**

| File | Purpose |
|---|---|
| `DESIGN-SYSTEM.md` | This document — the written spec |
| `design-tokens.css` | Importable CSS custom properties (primitive → semantic → component) |
| `design-tokens.json` | Machine-readable token source for tooling |
| `styleguide.html` | Visual style guide — open in a browser |

---

## 1. Design principles

1. **Editorial, not app-like.** The site reads like a printed portfolio: huge uppercase display type, hairline rules, generous whitespace, mono-spaced marginalia. Resting UI is flat — shadows exist only as hover rewards.
2. **One accent, used with intent.** Cobalt `#1F3BEA` is the only saturated color. It marks exactly one thing: *interactivity or emphasis*. If something glows cobalt, you can hover it, click it, or you're meant to read it first.
3. **Warm neutrals, never gray.** Every neutral carries a warm cast (porcelain, bone, ink, night). Pure `#000`/`#888` grays are off-palette.
4. **Motion is choreography, not decoration.** Elements enter with a rise-and-fade on a shared ease; hovers respond within ~350 ms; scroll drives parallax and progress. Everything honors `prefers-reduced-motion`.
5. **Texture over flatness.** A 5 % film-grain overlay, ghost outlined type, corner brackets and radial grids give depth without gradients-everywhere.

---

## 2. Color

### 2.1 Primitives

| Token | Value | Role |
|---|---|---|
| Porcelain | `#F4F2EC` | Page background |
| Bone | `#E9E6DC` | Raised warm surface (ticker band, browser chrome) |
| Paper | `#F1EFE8` | Text on dark surfaces |
| White | `#FFFFFF` | Card faces, text on cobalt |
| Ink | `#141311` | Primary text, warm near-black |
| Night | `#0D0C0A` | Dark band background |
| Night-2 | `#0A0908` | Dark card base |
| Night-3 | `#161513` | Dark inset surface (film frames) |
| **Cobalt** | `#1F3BEA` | **The** brand accent |
| Cobalt Deep | `#1226A8` | Pressed states, gradient stops |
| Cobalt Bright | `#3B57FF` | Gradient highlights (generative art) |
| Periwinkle | `#8EA0FF` | Accent that stays readable on night |
| Periwinkle Light | `#B9C3FF` | Hover accent on night |
| Green | `#5DE0A0` | Live/availability pulse |
| Red | `#DD3333` border / `#CC2222` text | Form errors only |

### 2.2 Alpha ramps

Opacity steps are the system's "gray scale" — they keep the warm hue while stepping back:

| Token | Value | Role |
|---|---|---|
| ink/62 | `rgba(20,19,17,.62)` | Secondary text on light |
| ink/40 | `rgba(20,19,17,.40)` | Tertiary text, mono metadata |
| ink/13 | `rgba(20,19,17,.13)` | Hairline borders on light |
| paper/55 | `rgba(241,239,232,.55)` | Secondary text on night |
| paper/16 | `rgba(241,239,232,.16)` | Hairline borders on night |
| cobalt/15 | `rgba(31,59,234,.15)` | Focus ring |
| cobalt/12 | `rgba(31,59,234,.12)` | Timeline node halo |

### 2.3 Contexts

There is no user-facing dark mode. Instead, **sections opt into the dark palette** with the `.on-night` class (selected-work band, big CTA, footer, motion-page hero). Semantic tokens remap inside it:

- `text` → Paper, `secondary` → paper/55, `border` → paper/16
- Cobalt stays cobalt; where cobalt text would fail contrast on night, use Periwinkle (`#8EA0FF`) instead — e.g. terminal highlights, pipeline codes, scene labels.
- `::selection` is cobalt with porcelain text everywhere.

### 2.4 Rules

- Never introduce a second saturated hue. Green is reserved for the live-status dot; red for form errors.
- Text on cobalt is always pure white.
- On light surfaces cobalt is used at full strength for text ≥ 12 px (mono) — it passes AA against porcelain.

---

## 3. Typography

### 3.1 Families

| Stack | Font | Weights | Source | Use |
|---|---|---|---|---|
| Display | **Cabinet Grotesk** → Arial Black | 500 / 700 / 800 | Fontshare | All headings, big numbers, wordmarks |
| Body | **Satoshi** → Helvetica Neue | 400 / 500 / 700 | Fontshare | Paragraphs, links, buttons, labels |
| Utility | **Space Mono** | 400 / 700 | Google Fonts | Eyebrows, tags, codes, counters, terminal |

Fonts load via `<link>` tags hoisted in `app/layout.tsx` (never `@import` — it serializes behind the stylesheet and delays first paint).

### 3.2 Scale (fluid, clamp-based)

| Style | Size | Case | Notes |
|---|---|---|---|
| Mega | `clamp(52px, 9.6vw, 150px)` | UPPER | Hero headline; weight 800, lh 0.98, ls −0.015em |
| XL | `clamp(38px, 6vw, 88px)` | UPPER | Section headlines |
| LG | `clamp(26px, 3.6vw, 48px)` | — | Sub-sections |
| MD | `clamp(24px, 3vw, 40px)` | UPPER | Card / timeline-step headings |
| Lede | `clamp(17px, 1.45vw, 20px)` | Sentence | Intro paragraphs, secondary color, max-width 52ch |
| Body | `17px / 1.62` | Sentence | Base |
| Small | `15–15.5px` | Sentence | Card body, footer links |
| Caption | `13px` | Sentence | Fine print |
| Mono LG | `12px / 0.16em` | UPPER | Eyebrows, service codes |
| Mono MD | `11.5px / 0.12em` | UPPER | Tags, filters |
| Mono SM | `10.5px / 0.12–0.16em` | UPPER | Card categories, art labels |

### 3.3 Rules

- Display headings: **always weight 800, line-height 0.98, letter-spacing −0.015em**. H1–H3 in structural sections are uppercase.
- Accent words inside headings use `<em>` (or `.accent`) rendered non-italic in cobalt.
- **Ghost type**: oversized transparent display type with a 1–1.5px `-webkit-text-stroke` (footer wordmark `clamp(64px,13vw,190px)`, CTA backdrop `clamp(180px,32vw,460px)`, editorial step numbers). Strokes: paper/50 on night, ink/40 on light; hover fills or re-strokes cobalt.
- Mono text is never larger than 13px; it is metadata, not copy.
- Copy measure: lede 52ch, body blocks 42–62ch.

---

## 4. Layout & space

- **Container**: `.wrap` — max-width `1440px`, horizontal gutter `--gut: clamp(20px, 4.5vw, 64px)`.
- **Section rhythm**: `--pad: clamp(90px, 12vw, 170px)` top and bottom (`.sec`). Big CTA stretches to `clamp(110px,15vw,190px)`.
- **Section head**: eyebrow + headline grid, `gap: 26px`, then `clamp(52px,6vw,90px)` before content.
- **Grid**: 12-column CSS grid for card layouts; asymmetric spans (7/5, 6/6) create the editorial rhythm; gaps `clamp(16–30px)`. Everything collapses to a single column at ~820–880px.
- **Hairlines everywhere**: 1px `ink/13` (light) or `paper/16` (night) rules divide sections, list rows, meta strips — the primary structural device.
- **Nav height**: 78px; sticky sidebar content offsets `top: 120px`.
- **Breakpoints** (max-width, content-driven): 620, 640, 720, 760, 780 (nav), 820, 860, 880, 900. No global grid breakpoints — each component collapses where it needs to.

---

## 5. Shape, borders, elevation

### Radii

| Token | Value | Used on |
|---|---|---|
| xs | 2px | Logo dot, timeline spine, selection outline |
| sm | 6px | Mini browser frames |
| md | 10px | Inputs, nav toggle, inner card frames |
| lg | 14px | Work cards, terminal, browser mock |
| xl | 18px | Showcase cards, form card, filmstrip |
| pill | 100px | Buttons, tags, filters, badges, URL bars |
| round | 50% | Dots, circular action chips |

### Elevation

Resting UI is **flat + hairline border**. Shadows are hover/feature rewards only:

| Shadow | Value | Where |
|---|---|---|
| Card | `0 34px 70px -28px rgba(20,19,17,.35)` | Work card hover |
| Card dark | `0 40px 80px -34px rgba(0,0,0,.8)` | Showcase card hover |
| Panel | `0 40px 80px -44px rgba(20,19,17,.35)` | Browser mock (resting) |
| Terminal | `0 34px 70px -40px rgba(13,12,10,.55)` | Console mock (resting) |
| Focus ring | `0 0 0 3px rgba(31,59,234,.15)` | Focused inputs |

All shadows: large offset-y, huge blur, strong negative spread — a soft "float" rather than a material edge.

### Texture

- **Film grain**: fixed overlay, SVG `fractalNoise` (baseFrequency 0.9), opacity 0.05, jittered ±3 % on an 8s stepped loop. 20 % overscan (not 200 %) to save GPU memory on phones.
- **Corner brackets**: 26px L-shaped frames marking feature zones (big CTA).
- **Radial/linear grid fields**: 1px line grids (34–64px cells) masked toward transparency, used as ambient backdrops.

---

## 6. Motion

### 6.1 Foundations

- **CSS signature ease**: `cubic-bezier(.22, .75, .25, 1)` (`--ease`) — used by virtually every transition.
- **GSAP defaults**: `duration: 1, ease: "power3.out"` (set in `lib/gsap.ts`).
- Ease roles: `power4.out` headlines · `power3.out` general · `power2.out` counters · `back.out(1.7)` playful pops · `none` for scrubbed parallax.

### 6.2 Duration bands

| Band | Time | Use |
|---|---|---|
| Micro | 0.2s | Opacity, color shifts |
| Hover | 0.3–0.45s | Underline sweeps, fills, icon nudges |
| Element | 0.5–0.6s | Card lifts, arrow rotations, frame tightens |
| Reveal | 0.8–1.15s | Scroll entrances, clip reveals |
| Counter | 1.8s | Metric count-ups |
| Ambient | 8–40s | Grain jitter, ticker loop, signal loops |

### 6.3 Signature patterns

- **Rise-and-fade reveal** (`.rv`): `y: 36–44px + autoAlpha: 0 → 1`, ~1s, stagger 0.08–0.09. Elements already in view animate immediately; the rest batch via ScrollTrigger at `top 88%`, `once: true`. Content is visible without JS.
- **Hero line reveal**: lines masked by `overflow:hidden` parents, `yPercent: 112 → 0`, 1.15s `power4.out`, stagger 0.09. Waits for the loader on hard loads (`zoenex:loaded` event).
- **Button ink veil**: `::before` layer scales `scaleY(0 → 1)` from the bottom over 0.38s; label recolors; arrow slides +4px.
- **Underline sweep**: `background-image` gradient sized `0% → 100% × 1px` (2px for the CTA email), 0.35–0.4s.
- **Card choreography** (service rows): timeline — headline rises (0.8s power4) → code slides in → body rises → tags stagger 0.05 → arrow pops with `back.out(1.7)`.
- **Clip reveal**: work thumbnails `clip-path: inset(0 0 100% 0) → inset(0)`, 1.1s power3.out.
- **Scrub parallax**: hero art drifts `yPercent: 14` and fades; CTA glow `−14 %`, ghost type `+8 %`; timeline spine fills `scaleY 0 → 1` — all `ease: none` with scrub 0.4–1.
- **Magnetic buttons** (`[data-magnetic]`): element follows pointer at 0.28× offset via `gsap.quickTo` (0.4s power3); returns to origin on leave. Fine pointers only.
- **Custom cursor**: 10px white dot, `mix-blend-mode: difference`; grows to 56px over links/buttons. `(hover:hover) and (pointer:fine)` only.
- **Loader**: night panel, word masked-rise + mono counter + cobalt progress hairline, exits `translateY(-101%)` 0.9s signature ease.
- **Ambient loops**: ticker 40s linear (pauses on hover); live-dot ping 2–2.2s; equalizer/scan/node-flow signals 1.4–2.6s.

### 6.4 Reduced motion (non-negotiable)

Under `prefers-reduced-motion: reduce`: all CSS animations/transitions collapse to 0.01ms, grain and ambient loops stop, ticker wraps statically, timeline fill renders complete, GSAP view animations are skipped entirely, magnetic and smooth-scroll disable.

---

## 7. Components

State columns use the semantic tokens from §2.

### 7.1 Buttons (`.btn`)

| Property | Fill (default) | Fill hover | Line (default) | Line hover |
|---|---|---|---|---|
| Background | cobalt | ink veil rises | transparent | ink veil rises |
| Text | white | porcelain | ink | porcelain |
| Border | none | none | 1px ink | 1px ink |
| Icon | 14px arrow | +4px shift | 14px arrow | +4px shift |

Pill radius, padding 17×32 (nav variant 12×24, 14px), weight 700 at 15.5px. On night, `.btn-line` swaps to paper border/text and a **porcelain** veil with ink label. Buttons are magnetic where marked.

### 7.2 Eyebrow (`.eyebrow`)
Mono 12px, tracking 0.16em, uppercase, cobalt, preceded by a 26×2px cobalt dash. On night the label turns paper; the dash stays cobalt.

### 7.3 Mono tag (`.mono-tag`, `.svc-tags li`, `.pills label`)
Mono 10.5–11.5px uppercase pills, hairline border, secondary color. Selected/checked state: cobalt fill, cobalt border, white text. Hover (interactive variants): ink border + ink text.

### 7.4 Navigation (`.nav`)
Fixed, 78px, transparent at top. **Scrolled**: 82 % porcelain scrim + 14px backdrop blur + hairline. **On-dark pages**: paper text, 80 % night scrim. Active link: 2px cobalt underline at −7px. Mobile ≤780px: hamburger (44px, 10px radius) opens a stacked panel with 19px links and hairline dividers.

### 7.5 Ticker
Bone band with hairlines top/bottom; display-700 uppercase items separated by 8px cobalt dots; 40s linear loop, pauses on hover.

### 7.6 Service row (`.svc`)
Hairline-divided grid: mono code + live ping dot · uppercase headline `clamp(30px,4.6vw,64px)` · animated "signal" visual · 58px circular arrow chip. Hover: cobalt sweep line draws across the top border, row indents 14px, headline recolors cobalt, chip fills cobalt and rotates 45°.

### 7.7 Showcase card (`.scard` — dark band)
16/11 (portrait 3/4 in `.pgrid`), radius 18px on night-2. Inset 1px hairline frame at 14px; mono index top-left; frosted 46px arrow chip top-right; gradient readability veil. Art rests desaturated (`saturate .72 brightness .82`). Hover: art blooms to full color and scales 1.05, frame tightens to 10px and recolors periwinkle, result line rises in, chip fills cobalt at 45°, card lifts −4px with the dark shadow.

### 7.8 Work card (`.wcard` — light)
White, radius 14px, hairline border. 16/10 art with clip reveal on scroll and 1.05 scale on hover; meta block: uppercase title + cobalt mono category + description + `↗` result line. Hover: lift −8px + card shadow.

### 7.9 Metrics (`.metrics`)
4-up over a hairline (2-up ≤760px). Numbers: display-800 `clamp(40px,5.4vw,76px)` with cobalt `<em>` accents; GSAP count-up 1.8s, `en-IN` locale; 14.5px secondary caption.

### 7.10 Process timeline (`.timeline`)
Center spine (2px hairline) with cobalt fill scrubbed by scroll; zig-zag cards alternate sides (single left rail ≤720px). Nodes: 18px porcelain circles that "light" — cobalt border, inner dot scales in, 6px cobalt/12 halo. Cards slide in ±40px, 0.8s power3.out.

### 7.11 Big CTA (`.bigcta` — night)
Layered backdrop: cobalt radial glow (scroll-parallaxed) + masked 64px grid + ghost outlined type + corner brackets. Green-pulse availability badge, mega headline with outlined `.swipe` span that fills cobalt on section hover, email divider row with 2px underline sweep.

### 7.12 Terminal (`.term`)
Night panel, radius 14px, mono 13px. Title bar: 9px dots (first cobalt) + uppercase mono title. Body: secondary lines, paper `<b>` highlights, periwinkle `<em>` values, blinking cobalt `▌` caret (1s stepped).

### 7.13 Browser mock (`.webframe`)
White, radius 14px, 1.5px hairline, panel shadow. Bone chrome bar with dots + pill URL field; skeleton page of ink headline bar, hairline text bars, cobalt pill CTA, bone thumbnail grid.

### 7.14 Filmstrip (`.filmstrip` / `.frame`)
Night rail, radius 18px, horizontal scroll (GSAP-pinned scrub ≥821px). Frames: 300px night-3 cards, radius 12px, sprocket-hole strips top/bottom, periwinkle mono scene labels with cobalt dots.

### 7.15 Forms (`.fcard`, `.field`, `.pills`)
White card (radius 18px, hairline) on porcelain. Labels: 13.5px bold uppercase, cobalt asterisk. Inputs: porcelain fill, hairline border, radius 10px, padding 15×16. Focus: cobalt border + 3px cobalt/15 ring. Error: red border + 12.5px red message. Budget pills: hidden inputs + tag-styled labels (checked = cobalt fill). Success panel: 70px cobalt-tinted circle + uppercase headline.

### 7.16 FAQ (`.faq details`)
Hairline-divided rows, max-width 820px. Summary: display-700 20px uppercase with a mono cobalt `+` that rotates 45° when open.

### 7.17 Footer (night)
Ghost wordmark (outlined, hover re-strokes cobalt) → 4-column link grid (mono column heads, paper links with cobalt underline sweep) → hairline bottom strip at 13px.

### 7.18 Ambience
- **Loader**: full-screen night, masked word rise, mono counter, cobalt bar; dispatches `zoenex:loaded`.
- **Scroll progress**: 2px cobalt hairline fixed at the top.
- **Cursor spotlight**: dark sections get a 420px cobalt radial that follows the pointer (opacity 0 → 1 on hover).
- **Generative art** (`.art-*`): six CSS-only compositions (orbit, halftone, bars, eclipse, contour, grid3d) built from cobalt/night/porcelain gradients, repeating patterns and masks — used as project thumbnails so no photography is needed.
- **Hero WebGL**: three.js wireframe sphere (`0x2440ff`), glow sprites (periwinkle ramp), particles `0x8A97D6`; static ring fallback until first paint, for reduced motion and no-WebGL.

---

## 8. Accessibility

- **Focus**: global `:focus-visible` — 2px cobalt outline, 3px offset. Inputs add the cobalt ring; pill inputs forward focus to their labels.
- **Skip link** to `#main`, revealed on focus.
- **Reduced motion**: see §6.4 — full coverage, including WebGL fallback.
- **Contrast**: ink on porcelain ≈ 15.9:1; paper on night ≈ 17:1; white on cobalt ≈ 6.5:1 (AA at all sizes); cobalt on porcelain ≈ 5.4:1 (AA for the mono sizes it's used at). On night, use periwinkle — cobalt text on night fails AA.
- **Semantics**: `aria-current="page"` drives the nav underline; decorative layers (grain, art, frames) are `aria-hidden` / `pointer-events:none`; content never depends on JS to be visible.
- **Touch**: cursor and magnetic effects gate on `(hover:hover) and (pointer:fine)`; tap targets ≥ 44px (nav toggle, chips).

---

## 9. Do / Don't

**Do**
- Divide with 1px hairlines; reward hover with shadow and color bloom.
- Keep cobalt scarce so it stays meaningful.
- Mask text reveals with `overflow:hidden` parents; animate `transform`/`opacity` only.
- Use mono uppercase for every piece of metadata (codes, indexes, categories).
- Use `clamp()` for anything that must scale between phone and 1440px.

**Don't**
- Don't introduce cool grays, pure black, or a second accent hue.
- Don't put cobalt body text on night surfaces (use periwinkle).
- Don't add resting shadows to list rows or text sections.
- Don't animate `width`/`height`/`top` — the system animates transforms exclusively.
- Don't ship an animation without its `prefers-reduced-motion` story.
- Don't load fonts with `@import`.
