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
      ink: {
        950: "#0B0B0B",
        900: "#111111",
        800: "#1B1B1B",
      },
      ivory: {
        50: "#FCFAF6",
        100: "#F7F2E8",
      },
      gold: {
        300: "#F0CF73",
        500: "#D4AF37",
        600: "#B8891F",
        700: "#8A6111",
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
      "display-desktop": ["64px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
      "display-mobile": ["40px", { lineHeight: "1.08", letterSpacing: "-0.015em", fontWeight: "600" }],
      "h1-desktop": ["56px", { lineHeight: "1.08", letterSpacing: "-0.018em", fontWeight: "700" }],
      "h1-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
      "detail-h1-desktop": ["48px", { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "700" }],
      "detail-h1-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
      "h2-desktop": ["40px", { lineHeight: "1.15", letterSpacing: "-0.012em", fontWeight: "700" }],
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
      transitionDuration: {
        fast: "160ms",
        normal: "240ms",
        slow: "360ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(.2,.8,.2,1)",
      },
      backgroundImage: {
        "gold-metallic":
          "linear-gradient(135deg, #F6D778 0%, #D4AF37 45%, #A97817 100%)",
        // Base color must be applied separately (e.g. `bg-ink-950 bg-dark-hero`) —
        // `background-image` cannot itself carry a trailing solid-color layer.
        "dark-hero": "radial-gradient(circle at 72% 38%, rgba(212,175,55,.16), transparent 44%)",
      },
    },
  },
  plugins: [],
};

export default config;
