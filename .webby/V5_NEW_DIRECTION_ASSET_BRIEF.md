# V5 — NEW VISUAL DIRECTION: ASSET RENDER BRIEF FOR CHATGPT

Status: **DRAFT — awaiting ChatGPT delivery**
Source of truth: the user-supplied overall design board (1536×1024 JPG).
Supersedes: the GD1 master and MASTER PARITY V4, by explicit user decision.

> The board is an AI-generated mockup. Its **layout, palette and type pairing are the
> direction**; its **text is not**. Several labels in it are garbled ("READY TO Gold",
> "IMPRESS Amber", the footer strip). No copy is transcribed from the board — all site copy
> continues to come from the existing verified content, per CONTENT_TRUTH.

---

## 1. Colours — measured from the board, not estimated

Sampled from real elements (the CTA pill, the gold H1 line, the darkest field):

| Role | Hex | Where measured |
|---|---|---|
| Gold primary | `#FFCA4F` | CTA fill, "MEDIA AGENCY" H1 line |
| Gold mid | `#C7A450` | gold text shading |
| Gold deep | `#806831` | gradient shadow end |
| Page dark | `#0B0F12` | hero field |
| Panel dark | `#050D15` | service card interior |
| Header dark | `#0D0D0D` | nav bar |
| Light | `#FFFFFF` | bottom strip |

**Important:** the board's dark is **blue-tinted** (`#0B0F12`), while the current site uses a
neutral `#0B0B0B`. Any asset with a baked-in backdrop will clash again unless it is delivered
transparent — see §3.

## 2. Typography

- Headings: **Playfair Display**
- Body/UI: **Inter**

Both are on Google Fonts, so no font files are needed from ChatGPT.

## 3. Render rules — these are the failures from the last round, do not repeat them

**3.1 Transparent background, always.**
The current assets bake in `#060607`. The page is `#0B0F12`. A 5–10 value difference across a
large flat area reads as a hard rectangular box pasted onto the page — this is exactly what the
user rejected. Deliver **PNG with a real alpha channel**, fully transparent around the subject.

**3.2 Subject must fill 70–85% of the frame.**
Measured coverage in the current V3 heroes: projects 10%, contact/digital 12%, home/knowledge
13%, about-bird 18%, support 26%, website 31%. The rest is empty black field. That is why the
artwork reads as a small stamp, and why cropping at display time became necessary — which then
clipped the tail and wings.

**3.3 No text baked into any image.**
The board shows headlines inside the artwork. Those must be live HTML: baked text goes blurry
when scaled, cannot be translated, is invisible to search engines, and cannot be corrected.
Deliver **graphics only**.

**3.4 Logo as SVG with outlined paths.**
The current `lac-viet-logo-horizontal-approved.svg` is 1,082 bytes containing four hand-drawn
paths plus two `<text>` elements with `font-family="Noto Serif"` — it *types* the wordmark
rather than drawing it, so it renders differently wherever that font is missing. Convert all
text to outlines.

**3.5 sRGB, lossless PNG, no upscaling from a smaller render.**

## 4. Asset list

| # | Asset | Count | Pixel size | Format |
|---|---|---|---|---|
| 1 | Horizontal logo lockup (phoenix + Đông Sơn disc + wordmark) | 1 | vector | SVG, text outlined |
| 2 | Logo mark only (no wordmark) | 1 | vector | SVG, outlined |
| 3 | Hero phoenix + bronze-drum composition | 1 | 2400×1600 | PNG + alpha |
| 4 | Service panel visual — web design (laptop + phone) | 1 | 1600×1000 | PNG + alpha |
| 5 | Service panel visual — social support (shield + platform marks) | 1 | 1600×1000 | PNG + alpha |
| 6 | Service panel visual — digital services (floating app icons) | 1 | 1600×1000 | PNG + alpha |
| 7 | Section card visuals (projects / knowledge / about / contact) | 4 | 1400×900 | PNG + alpha |
| 8 | Project covers | 12 | 1920×1200 (16:10) | PNG or JPG, own background fine |
| 9 | Article covers | 7 | 1920×1200 | PNG or JPG |
| 10 | Detail device mockups | 2 | 2400×1600 | PNG + alpha |
| 11 | Social-proof avatars | 5 | 256×256 | PNG + alpha, circular |

Groups 8 and 9 are content photography and may keep their own backgrounds — they sit inside
card frames. Everything else composites directly onto the dark page and **must** be transparent.

## 5. Layout the assets must suit

- **Hero**: text column left, artwork right at roughly 45/55, artwork **bleeding off the right
  edge** rather than sitting in a bordered box.
- **Service panels**: wide dark horizontal panels — title (two-tone white + gold), short
  description, gold pill CTA on the left; artwork occupying the right third, bleeding.
- **Section cards**: same pattern at a smaller scale, four across.

## 6. What Claude implements without waiting

Playfair Display + Inter, the measured palette, the dark horizontal panel components, pill
CTAs, and the hero bleed layout. These need no new assets and will be ready before delivery.

## 7. Delivery

Same transport as before: Drive, with an exact `driveFileId` and SHA-256 per file. Claude
verifies every checksum before any file enters `public/`, as in the V3 pass.
