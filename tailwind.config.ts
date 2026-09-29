import type { Config } from "tailwindcss";

// Every typography token declared by the authority, safelisted so it ALWAYS emits CSS even
// before/without source usage. This implements TYPOGRAPHY_AUTHORITY.tokenEmissionContract
// (`usedTypographyUtilityMustEmitCss`, `captionMustExist`) and removes the silent-failure class
// where an off-scale or unused utility produces no rule at all — the bug that shipped a 256px
// header logo and zero mobile section padding through five QA rounds.
const TYPOGRAPHY_TOKENS = [
  "display-desktop", "display-mobile",
  "h1-desktop", "h1-mobile",
  "detail-h1-desktop", "detail-h1-mobile",
  "h2-desktop", "h2-mobile",
  "h3-desktop", "h3-mobile",
  "h4-desktop", "h4-mobile",
  "card-h3-desktop", "card-h3-mobile",
  "body-xl", "body-lg", "body", "small", "caption", "eyebrow",
  "nav", "button", "chip", "form-label", "form-control",
  "step-number", "metric", "price", "article-meta", "breadcrumb", "footer",
];

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  safelist: [
    ...TYPOGRAPHY_TOKENS.map((t) => `text-${t}`),
    ...TYPOGRAPHY_TOKENS.map((t) => `lg:text-${t}`),
  ],
  theme: {
    screens: {
      xs: "390px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      // Above the 1440 master reference only. Lets very wide screens breathe without
      // altering anything at or below the viewport ChatGPT QAs against.
      ultra: "1600px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      // This project replaces theme.colors wholesale rather than extending it, so Tailwind's
      // default `black` does not exist here and `bg-black` silently emitted nothing.
      black: "#000000",
      ink: {
        950: "#0B0B0B",
        900: "#111111",
        800: "#1B1B1B",
      },
      // PRO V2 depth system (2026-08-25): a 4-level dark scale for NEW cinematic sections
      // (signature moments, cards on dark, hover states) that want visible separation without
      // another flat black-on-black block. Additive — `ink-950` keeps its existing dual role
      // (dark bg AND near-black text-on-light) untouched, so nothing already shipped moves.
      surface: {
        0: "#07080A",
        1: "#0B0D10",
        2: "#111318",
        3: "#171A20",
      },
      ivory: {
        50: "#FCFAF6",
        100: "#F7F2E8",
      },
      // V5 — sampled from the new design board (see .webby/V5_NEW_DIRECTION_ASSET_BRIEF.md).
      // The dark here is blue-tinted (#0B0F12) where the v2 ink is neutral (#0B0B0B).
      v5: {
        gold: "#FFCA4F",
        "gold-mid": "#C7A450",
        "gold-deep": "#806831",
        page: "#0B0F12",
        panel: "#050D15",
        header: "#0D0D0D",
      },
      // PRO V2 refinement (2026-08-25): same 4 roles, hex nudged toward the brief's
      // primary/highlight/deep triad so gold reads as one deliberate family instead of one flat
      // hue reused everywhere. Every existing gold-300/500/600/700 call site keeps working —
      // only the underlying value shifted, not the token names.
      gold: {
        300: "#F0C96B",
        500: "#D8A94E",
        600: "#B8891F",
        700: "#8C682C",
      },
      text: {
        primary: "#171717",
        secondary: "#655F56",
        muted: "#8D867C",
      },
      border: {
        DEFAULT: "#E6DED0",
        strong: "#CFC3B0",
        input: "#D8D0C2",
      },
      state: {
        success: "#18794E",
        error: "#B42318",
        warning: "#A15C00",
        info: "#246BCE",
      },
      disabled: {
        bg: "#F2EFE9",
      },
      placeholder: "#9A948B",
    },
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      8: "32px",
      10: "40px",
      12: "48px",
      16: "64px",
      20: "80px",
      24: "96px",
      30: "120px",
      px: "1px",
      full: "100%",
    },
    borderRadius: {
      none: "0px",
      xs: "8px",
      sm: "10px",
      md: "14px",
      lg: "16px",
      xl: "24px",
      pill: "999px",
      full: "9999px",
      // PRO V2 named scale (2026-08-25) — same underlying sizes as xs/md/xl above, but named for
      // what they're FOR so a new component picks the right one by role instead of guessing
      // between four numerically-named options that happen to be close.
      button: "12px",
      card: "18px",
      feature: "24px",
      hero: "28px",
    },
    boxShadow: {
      sm: "0 4px 16px rgba(18,14,8,.06)",
      md: "0 10px 30px rgba(18,14,8,.10)",
      lg: "0 18px 50px rgba(18,14,8,.14)",
      "focus-gold": "0 0 0 3px rgba(212,175,55,.24)",
      none: "none",
    },
    fontFamily: {
      heading: ["var(--font-heading)", "Georgia", "Times New Roman", "serif"],
      // V5 direction display face (the new design board). Separate token from `heading` so the
      // routes still on the approved v2 typography are untouched.
      display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
      body: [
        "var(--font-body)",
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "sans-serif",
      ],
    },
    fontSize: {
      // Generated from .webby/TYPOGRAPHY_AUTHORITY.json semanticRoles +
      // typography.json compatibilityTokens/tailwindTokenMap. Per the authority's
      // tokenEmissionContract this is the UNION, never rebuilt from semanticRoles
      // alone — legacy h3-*/h4-*/body-xl stay until source usage is proven zero.
      // PRO V2 (2026-08-25): hero display pushed from 64→72px / 600→700 weight, tracking
      // tightened to -0.03em — brief's "64-76px / 650-750 / -0.03em" range. h2 nudged 40→44px to
      // sit clearly between h1 (56) and h3 (28) instead of crowding h1. Every OTHER role
      // (h1/h3/h4/body/eyebrow/etc.) was already inside the brief's requested range, so left
      // alone — no value should move just because a brief re-stated a range this file already met.
      "display-desktop": ["72px", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "700" }],
      "display-mobile": ["44px", { lineHeight: "1.06", letterSpacing: "-0.02em", fontWeight: "700" }],
      "h1-desktop": ["56px", { lineHeight: "1.08", letterSpacing: "-0.018em", fontWeight: "700" }],
      "h1-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
      "detail-h1-desktop": ["48px", { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "700" }],
      "detail-h1-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
      "h2-desktop": ["44px", { lineHeight: "1.15", letterSpacing: "-0.012em", fontWeight: "700" }],
      "h2-mobile": ["32px", { lineHeight: "1.18", letterSpacing: "-0.01em", fontWeight: "700" }],
      "h3-desktop": ["28px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
      "h3-mobile": ["24px", { lineHeight: "1.28", letterSpacing: "-0.008em", fontWeight: "700" }],
      "h4-desktop": ["22px", { lineHeight: "1.3", fontWeight: "700" }],
      "h4-mobile": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
      "card-h3-desktop": ["22px", { lineHeight: "1.3", fontWeight: "700" }],
      "card-h3-mobile": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
      "body-xl": ["20px", { lineHeight: "1.65", fontWeight: "400" }],
      "body-lg": ["18px", { lineHeight: "1.7", fontWeight: "400" }],
      body: ["16px", { lineHeight: "1.7", fontWeight: "400" }],
      small: ["14px", { lineHeight: "1.55", fontWeight: "400" }],
      caption: ["12px", { lineHeight: "1.5", fontWeight: "500" }],
      eyebrow: ["12px", { lineHeight: "1.2", letterSpacing: "0.12em", fontWeight: "600" }],
      nav: ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      button: ["14px", { lineHeight: "1.2", fontWeight: "600" }],
      chip: ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      "form-label": ["14px", { lineHeight: "1.4", fontWeight: "600" }],
      "form-control": ["14px", { lineHeight: "1.45", fontWeight: "400" }],
      "step-number": ["18px", { lineHeight: "1.2", fontWeight: "700" }],
      metric: ["28px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
      price: ["20px", { lineHeight: "1.25", fontWeight: "700" }],
      "article-meta": ["12px", { lineHeight: "1.5", fontWeight: "500" }],
      breadcrumb: ["12px", { lineHeight: "1.5", fontWeight: "400" }],
      footer: ["13px", { lineHeight: "1.6", fontWeight: "400" }],
    },
    extend: {
      // Marquee. The InfiniteMarquee component already referenced `animate-marquee-left` /
      // `-right`, but neither existed in the theme, so those classes emitted no CSS at all and
      // the component sat still. This project REPLACES Tailwind's theme rather than extending
      // it, which makes silent misses like that easy — a class outside the declared set fails
      // quietly instead of erroring.
      //
      // -50% is exact, not approximate: the component renders its children twice, so shifting
      // by half the track lands the copy precisely where the original started and the loop has
      // no visible seam.
      keyframes: {
        "marquee-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left linear infinite",
        "marquee-right": "marquee-right linear infinite",
      },
      maxWidth: {
        container: "1280px",
        "container-ultra": "1520px",
        wide: "1360px",
        editorial: "720px",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      // PRO V2 motion scale (2026-08-25): fast/normal/slow already sat inside the brief's
      // "micro" tier (150-250ms) — kept as-is. `reveal` and `cinematic` are new tiers for section
      // entrances and hero-scale moments, which had no dedicated token before (call sites either
      // reused `slow` or hardcoded a duration inline).
      transitionDuration: {
        fast: "160ms",
        normal: "240ms",
        slow: "360ms",
        reveal: "650ms",
        cinematic: "1200ms",
      },
      transitionTimingFunction: {
        // Brief's requested curve — close to the old one but with a touch more overshoot-free
        // ease-out, applied going forward. Old value not kept: this is the SAME role (the site's
        // one general-purpose easing), not a second option to choose between.
        standard: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        // PRO V2 (2026-08-25): 4-stop metallic sweep per brief (deep→primary→highlight→deep),
        // reserved for logo/primary-button/premium-divider use only — never applied to running
        // text, per the brief's own "không áp dụng trên toàn bộ text" note.
        "gold-metallic":
          "linear-gradient(135deg, #7B5722 0%, #D6A64A 38%, #FFE19A 68%, #B47B2F 100%)",
        // Base color must be applied separately (e.g. `bg-ink-950 bg-dark-hero`) —
        // `background-image` cannot itself carry a trailing solid-color layer.
        "dark-hero": "radial-gradient(circle at 72% 38%, rgba(212,175,55,.16), transparent 44%)",
      },
    },
  },
  plugins: [],
};

export default config;
