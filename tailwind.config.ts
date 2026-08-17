import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "390px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
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
      "display-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      "display-desktop": ["64px", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
      "h1-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      "h1-desktop": ["56px", { lineHeight: "1.08", letterSpacing: "-0.022em" }],
      "h2-mobile": ["32px", { lineHeight: "1.18", letterSpacing: "-0.015em" }],
      "h2-desktop": ["40px", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
      "h3-mobile": ["24px", { lineHeight: "1.28", letterSpacing: "-0.01em" }],
      "h3-desktop": ["28px", { lineHeight: "1.25", letterSpacing: "-0.012em" }],
      "h4-mobile": ["20px", { lineHeight: "1.3" }],
      "h4-desktop": ["22px", { lineHeight: "1.3" }],
      "body-xl": ["20px", { lineHeight: "1.65" }],
      "body-lg": ["18px", { lineHeight: "1.7" }],
      body: ["16px", { lineHeight: "1.7" }],
      small: ["14px", { lineHeight: "1.6" }],
      caption: ["12px", { lineHeight: "1.5", fontWeight: "500" }],
      eyebrow: ["12px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "0.14em" }],
    },
    extend: {
      maxWidth: {
        container: "1280px",
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
