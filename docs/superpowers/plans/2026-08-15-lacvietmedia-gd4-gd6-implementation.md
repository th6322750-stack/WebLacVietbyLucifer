# Lạc Việt Media — GĐ4→GĐ6 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Lucifer-approved GĐ1 V1 UI (11 routes + 2 detail templates) as a real Next.js production site with working UX interactions, backend lead/newsletter capture, SEO, and analytics — with zero deviation from the approved visual master and zero Google Drive dependency — then hand off Playwright evidence + a Draft PR to ChatGPT for GĐ7 visual QA.

**Architecture:** Next.js 15 App Router + TypeScript, Tailwind CSS mapped 1:1 to `.webby/tokens.json`/`typography.json`/`responsive.json`, Radix UI primitives for accessible Dialog/Accordion behavior, `next/font/google` for the two approved typefaces, Route Handlers for `/api/leads` and `/api/newsletter` behind provider-agnostic sink interfaces, Vitest for unit-level TDD, Playwright for route/state evidence capture. All 11 static routes render from local demo-tagged content — no CMS, no external API, no Google Drive at build or runtime.

**Tech Stack:** Next.js ^16 (bumped from planned ^15 at Task 1 time — `next@15.5.23` pulled in a vulnerable `postcss`/`sharp`, 3 high-severity advisories; `next@16.3.1` resolves clean with `npm audit`), React ^19, TypeScript ^5, Tailwind CSS ^3.4, @radix-ui/react-dialog, @radix-ui/react-accordion, lucide-react, zod, next/font/google (Noto Serif Display, Be Vietnam Pro), Vitest + @testing-library/react, @playwright/test.

**Spec:** `.webby/CLAUDE_TASK.md`, `.webby/HANDOFF.json`, `.webby/WEBBY_LOCK.json`, `.webby/PROJECT_STATE.yaml`, `.webby/IMPLEMENTATION_CONTRACT.json`, `.webby/DATA_BACKEND_CONTRACT.json`, `.webby/SEO_CONTRACT.json`, `.webby/ANALYTICS_CONTRACT.json`, `.webby/ACCESSIBILITY_CONTRACT.json`, `.webby/QA_ACCEPTANCE.json`, `.webby/ROUTE_IMPLEMENTATION_MAP.json`, `.webby/section-map.json`, `.webby/placement-map.json`, `.webby/component-map.json`, `.webby/tokens.json`, `.webby/typography.json`, `.webby/responsive.json`, `.webby/interactions.json`, `.webby/CONTENT_TRUTH.json`, `DESIGN_SYSTEM.md`, `.webby/visual-handoff/*.md`, `.webby/visual-master/gd1-v1/pages/page-*.webp`.

## Global Constraints

- Branch `chatgpt/gd3-git-self-contained-v1` @ `09ad912eb5728395bafce96025734e4ac0491047` is the verified base. Both `python scripts/reconstruct-git-self-contained.py` and `python scripts/validate-gd3-git-self-contained.py --require-ready` PASS on it (re-verified independently, including an out-of-band `sha256sum` of the approved PDF).
- Approved PDF: `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`, SHA-256 `f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f`. This PDF and its 14 rasters in `.webby/visual-master/gd1-v1/pages/` are the supreme visual authority. Every route task below must open its master page image directly before writing markup — do not rely on paraphrased descriptions.
- Canonical logo: `assets/production/brand/lac-viet-logo-source.png` (original) / `lac-viet-logo-canonical-lossless.webp` (production). Never redraw, recolor, vectorize, or replace.
- Design tokens, typography, spacing, motion, and component anatomy are locked per `DESIGN_SYSTEM.md` / `.webby/tokens.json` / `.webby/typography.json` / `.webby/interactions.json` / `.webby/component-map.json`. Do not change any of them "for convenience." If a value is genuinely ambiguous from the master image, ask rather than invent.
- Reference viewports: desktop 1440px, mobile 390px. No horizontal page scroll anywhere (horizontal chip scroll inside a filter row is the only exception).
- Target WCAG 2.2 AA (`.webby/ACCESSIBILITY_CONTRACT.json`): keyboard operability, visible focus, 44px touch targets, labelled dialogs with focus trap + escape + return focus, `lang="vi"`, skip link, `prefers-reduced-motion` support.
- All project/article/metric/testimonial content in `.webby/CONTENT_TRUTH.json`'s `demoOnly` list must be tagged `demoOnly: true` in the data layer and must never be emitted as factual structured data (no fake `Review`/`AggregateRating`).
- Backend: no provider secret committed anywhere, server-side validation on every public form, rate-limit public POST endpoints, user-safe error messages.
- `implementationRequiresGoogleDrive` must stay `false` end-to-end — never fetch an asset from Drive.
- No merge. Work lands on a new `claude/gd4-gd6-implementation-v1` branch off `chatgpt/gd3-git-self-contained-v1`, ending in a **Draft PR**, then STOP for GĐ7.
- Every task's tests must actually run (`npm test`, `npm run test:e2e`) and pass before that task's commit.

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.js
vitest.config.ts, playwright.config.ts, .eslintrc.json, .gitignore (adds node_modules, .next, test-results, playwright-report)

app/
  layout.tsx                 # <html lang="vi">, fonts, SkipLink, SiteHeader, SiteFooter
  globals.css                # Tailwind layers + focus-visible reset
  page.tsx                   # "/"
  sitemap.ts
  robots.ts
  not-found.tsx              # "/404" (Next.js not-found convention)
  website/page.tsx
  support-mxh/page.tsx
  dich-vu-so/page.tsx
  du-an/page.tsx
  du-an/[slug]/page.tsx
  kien-thuc/page.tsx
  kien-thuc/[slug]/page.tsx
  gioi-thieu/page.tsx
  lien-he/page.tsx
  api/leads/route.ts
  api/newsletter/route.ts

components/
  layout/Container.tsx, Section.tsx, SectionEyebrow.tsx, SectionHeading.tsx, Breadcrumbs.tsx
  layout/SiteHeader.tsx, layout/MobileNavDrawer.tsx, layout/SiteFooter.tsx
  ui/Button.tsx, ui/IconButton.tsx, ui/Chip.tsx, ui/Divider.tsx
  ui/Skeleton.tsx, ui/Spinner.tsx, ui/EmptyState.tsx, ui/ErrorState.tsx, ui/Toast.tsx
  content/ServiceCard.tsx, ProjectCard.tsx, ArticleCard.tsx, PricingCard.tsx
  content/TestimonialCard.tsx, TrustLogoRow.tsx, MetricStrip.tsx, ProcessSteps.tsx
  content/FAQAccordion.tsx, ArticleTOC.tsx, CategoryFilter.tsx, RelatedArticles.tsx
  conversion/ConsultationCTA.tsx, ConsultationModal.tsx, ContactForm.tsx
  conversion/ContactChannelCard.tsx, NewsletterForm.tsx

lib/
  a11y/useFocusTrap.ts, usePrefersReducedMotion.ts, lockBodyScroll.ts, SkipLink.tsx
  content/types.ts, content/schema.ts, content/services.ts, content/projects.ts
  content/articles.ts, content/faqs.ts, content/siteSettings.ts
  analytics/track.ts
  backend/leadSink.ts, backend/subscriberSink.ts, backend/rateLimit.ts

e2e/ (Playwright specs, one per route + one for shared states)
*.test.ts colocated next to the unit under test (Vitest)

.webby/implementation/IMPLEMENTATION_RECEIPT.json   # produced by Task 20
.webby/implementation/evidence/<commit>/...          # Playwright screenshots, produced by Task 20
```

---

### Task 1: Project scaffold, design tokens, fonts

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`, `.gitignore`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (temporary placeholder, replaced in Task 6)
- Create: `vitest.config.ts`, `playwright.config.ts`
- Test: `app/layout.test.tsx`

**Interfaces:**
- Produces: Tailwind theme tokens (`ink950/900/800`, `ivory50/100`, `gold300/500/600/700`, `text-primary/secondary/muted`, `border/border-strong`, `success/error/warning/info`), font CSS variables `--font-heading` / `--font-body`, breakpoints `xs(390) sm(480) md(768) lg(1024) xl(1280) 2xl(1440)`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/layout.test.tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("sets lang=vi on the html element and renders children", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">hi</div>
      </RootLayout>
    );
    expect(document.documentElement.lang).toBe("vi");
    expect(container.querySelector('[data-testid="child"]')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/layout.test.tsx`
Expected: FAIL — `next.config.ts`/`app/layout.tsx` don't exist yet, module resolution error.

- [ ] **Step 3: Scaffold the project**

```bash
npm init -y
npm install next@^15 react@^19 react-dom@^19 zod@^3 lucide-react@^0.400 @radix-ui/react-dialog@^1 @radix-ui/react-accordion@^1
npm install -D typescript@^5 @types/react@^19 @types/node@^20 tailwindcss@^3.4 postcss@^8 autoprefixer@^10 \
  vitest@^2 @testing-library/react@^16 @testing-library/jest-dom@^6 jsdom@^25 @vitejs/plugin-react@^4 \
  @playwright/test@^1 eslint@^9 eslint-config-next@^15
npx tailwindcss init -p
```

`package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

`tailwind.config.ts` (tokens copied verbatim from `.webby/tokens.json` and `.webby/typography.json`):

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: { xs: "390px", sm: "480px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        ink950: "#0B0B0B", ink900: "#111111", ink800: "#1B1B1B",
        ivory50: "#FCFAF6", ivory100: "#F7F2E8",
        gold300: "#F0CF73", gold500: "#D4AF37", gold600: "#B8891F", gold700: "#8A6111",
        "text-primary": "#171717", "text-secondary": "#655F56", "text-muted": "#8D867C",
        border: "#E6DED0", "border-strong": "#CFC3B0",
        success: "#18794E", error: "#B42318", warning: "#A15C00", info: "#246BCE",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "Times New Roman", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { container: "1280px", wide: "1360px", editorial: "720px" },
      borderRadius: { xs: "8px", sm: "10px", md: "14px", lg: "16px", xl: "24px", pill: "999px" },
      boxShadow: {
        sm: "0 4px 16px rgba(18,14,8,.06)",
        md: "0 10px 30px rgba(18,14,8,.10)",
        lg: "0 18px 50px rgba(18,14,8,.14)",
        "focus-gold": "0 0 0 3px rgba(212,175,55,.24)",
      },
      transitionDuration: { fast: "160ms", normal: "240ms", slow: "360ms" },
      transitionTimingFunction: { brand: "cubic-bezier(.2,.8,.2,1)" },
    },
  },
  plugins: [],
} satisfies Config;
```

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Noto_Serif_Display, Be_Vietnam_Pro } from "next/font/google";
import { SkipLink } from "@/lib/a11y/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const headingFont = Noto_Serif_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lacvietmedia.com"),
  title: { default: "Lạc Việt Media Agency", template: "%s | Lạc Việt Media Agency" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="bg-ivory50 font-body text-text-primary antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

(`SiteHeader`/`SiteFooter`/`SkipLink` are stubbed as empty `<header>`/`<footer>`/skip-link exports for this task only — Task 3 and Task 4 replace them with real implementations. Stub signatures must match what Task 3/4 "Interfaces: Produces" declare below so this file doesn't change again.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/layout.test.tsx`
Expected: PASS

- [ ] **Step 5: Verify the app boots**

Run: `npm run build`
Expected: build succeeds with 0 type errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.js .eslintrc.json .gitignore vitest.config.ts playwright.config.ts app/layout.tsx app/layout.test.tsx app/globals.css app/page.tsx
git commit -m "chore: scaffold Next.js app with design tokens and fonts"
```

---

### Task 2: Shared layout/UI primitives (Container, Section, Button, etc.)

**Files:**
- Create: `components/layout/Container.tsx`, `components/layout/Section.tsx`, `components/layout/SectionEyebrow.tsx`, `components/layout/SectionHeading.tsx`, `components/layout/Breadcrumbs.tsx`
- Create: `components/ui/Button.tsx`, `components/ui/IconButton.tsx`, `components/ui/Chip.tsx`, `components/ui/Divider.tsx`, `components/ui/Skeleton.tsx`, `components/ui/Spinner.tsx`, `components/ui/EmptyState.tsx`, `components/ui/ErrorState.tsx`
- Test: `components/ui/Button.test.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1.
- Produces: `<Button variant="primary"|"secondary"|"outline"|"ghost" size="sm"|"md"|"lg" disabled?>`, `<Container>`, `<Section id? eyebrow? heading? className?>`, `<Breadcrumbs items={{label, href?}[]}>`. Every route task (6–14) imports these — do not rename props later.

- [ ] **Step 1: Write the failing test**

```tsx
// components/ui/Button.test.tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the primary gold variant with a 44px minimum touch target and fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button variant="primary" onClick={onClick}>Nhận tư vấn</Button>);
    const button = screen.getByRole("button", { name: "Nhận tư vấn" });
    expect(button.className).toMatch(/min-h-\[44px\]/);
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disables interaction and applies reduced opacity when disabled", () => {
    render(<Button variant="primary" disabled>Gửi</Button>);
    const button = screen.getByRole("button", { name: "Gửi" });
    expect(button).toBeDisabled();
    expect(button.className).toMatch(/opacity-\[.48\]|opacity-48/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: FAIL — `./Button` does not exist.

- [ ] **Step 3: Implement Button**

```tsx
// components/ui/Button.tsx
import { forwardRef } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-[52px] px-6 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#F6D778_0%,#D4AF37_45%,#A97817_100%)] text-ink950 shadow-sm hover:-translate-y-px hover:shadow-md active:translate-y-0",
  secondary: "bg-ink950 text-white border border-ink950 hover:bg-ink800",
  outline: "border border-ink900 text-ink900 hover:bg-gold300/10",
  ghost: "text-ink900 hover:bg-ink950/5",
};

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant: Variant; size?: Size }>(
  ({ variant, size = "md", className, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={clsx(
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm font-semibold transition-[transform,box-shadow] duration-normal ease-brand",
        "focus-visible:outline-none focus-visible:shadow-focus-gold",
        disabled && "opacity-[.48] cursor-not-allowed hover:translate-y-0 hover:shadow-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
```

Add `clsx` to dependencies (`npm install clsx`). Implement `Container` (`max-w-container mx-auto px-4 md:px-6 lg:px-8`), `Section` (`py-14 md:py-18 lg:py-24` matching `sectionGapPx` 56/72/96), `SectionEyebrow` (12px/700/uppercase/gold700 tracking), `SectionHeading` (h2 styles per typography.json), `Breadcrumbs` (ordered list with `aria-label="Breadcrumb"`, current page `aria-current="page"`), `Chip`, `Divider`, `Skeleton` (pulsing placeholder block), `Spinner` (compact accessible `role="status"`), `EmptyState`, `ErrorState` per `component-map.json` anatomy.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/layout/Container.tsx components/layout/Section.tsx components/layout/SectionEyebrow.tsx components/layout/SectionHeading.tsx components/layout/Breadcrumbs.tsx components/ui/*.tsx package.json package-lock.json
git commit -m "feat: add shared layout and UI primitives"
```

---

### Task 3: Accessibility utilities (focus trap, skip link, reduced motion, scroll lock)

**Files:**
- Create: `lib/a11y/useFocusTrap.ts`, `lib/a11y/usePrefersReducedMotion.ts`, `lib/a11y/lockBodyScroll.ts`, `lib/a11y/SkipLink.tsx`
- Test: `lib/a11y/useFocusTrap.test.tsx`, `lib/a11y/usePrefersReducedMotion.test.tsx`

**Interfaces:**
- Produces: `useFocusTrap(containerRef, { active, onEscape, returnFocusRef })`, `usePrefersReducedMotion(): boolean`, `lockBodyScroll(active: boolean): void`, `<SkipLink />`. Consumed by Task 4 (mobile drawer) and Task 15 (consultation modal) — signatures below are final.

- [ ] **Step 1: Write the failing test**

```tsx
// lib/a11y/useFocusTrap.test.tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";

function Harness({ active, onEscape }: { active: boolean; onEscape: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, { active, onEscape });
  return (
    <div ref={ref} role="dialog" aria-modal="true">
      <button>First</button>
      <button>Last</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("moves focus into the container when activated and calls onEscape on Escape", async () => {
    const onEscape = vi.fn();
    const user = userEvent.setup();
    render(<Harness active onEscape={onEscape} />);
    expect(document.activeElement).toBe(screen.getByText("First"));
    await user.keyboard("{Escape}");
    expect(onEscape).toHaveBeenCalledOnce();
  });
});
```

```tsx
// lib/a11y/usePrefersReducedMotion.test.tsx
import { describe, expect, it, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

afterEach(() => vi.restoreAllMocks());

describe("usePrefersReducedMotion", () => {
  it("returns true when the media query matches", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true, media: "", addEventListener: vi.fn(), removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/a11y/`
Expected: FAIL — modules don't exist.

- [ ] **Step 3: Implement**

```ts
// lib/a11y/useFocusTrap.ts
import { useEffect } from "react";

const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  opts: { active: boolean; onEscape?: () => void; returnFocusRef?: React.RefObject<HTMLElement> }
) {
  useEffect(() => {
    if (!opts.active || !containerRef.current) return;
    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        opts.onEscape?.();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      (opts.returnFocusRef?.current ?? previouslyFocused)?.focus();
    };
  }, [opts.active]);
}
```

```ts
// lib/a11y/usePrefersReducedMotion.ts
import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
```

```ts
// lib/a11y/lockBodyScroll.ts
export function lockBodyScroll(active: boolean) {
  document.body.style.overflow = active ? "hidden" : "";
}
```

```tsx
// lib/a11y/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink950 focus:px-4 focus:py-2 focus:text-white"
    >
      Bỏ qua để đến nội dung chính
    </a>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/a11y/`
Expected: PASS

- [ ] **Step 5: Wire `SkipLink` into `app/layout.tsx`** (replace the Task 1 stub import with this real one — no API change, so no other file moves).

- [ ] **Step 6: Commit**

```bash
git add lib/a11y/*.ts lib/a11y/*.tsx app/layout.tsx
git commit -m "feat: add focus trap, reduced-motion, scroll lock and skip link utilities"
```

---

### Task 4: SiteHeader (desktop nav + mobile drawer) and SiteFooter

**Files:**
- Create: `components/layout/SiteHeader.tsx`, `components/layout/MobileNavDrawer.tsx`, `components/layout/SiteFooter.tsx`
- Test: `components/layout/SiteHeader.test.tsx`

**Interfaces:**
- Consumes: `useFocusTrap`, `lockBodyScroll`, `usePrefersReducedMotion` (Task 3), `Button` (Task 2), `siteSettings` (Task 5 — stub with the literal confirmed fields from `.webby/CONTENT_TRUTH.json` until Task 5 lands: `brandName: "Lạc Việt Media Agency"`, `zalo: "0355636882"`, `telegram: "@lucifer_dvmxh"`, `domain: "lacvietmedia.com"`).
- Produces: `<SiteHeader />`, `<SiteFooter />` — no props, self-contained, used once in `app/layout.tsx`.

**Visual reference:** open `.webby/visual-master/gd1-v1/pages/page-03.webp` (top strip = desktop header) and `.webby/visual-master/gd1-v1/pages/page-13.webp` first two frames (mobile menu closed/open state) before implementing. Header spec: desktop height 76px, `bg-ink950/92` + `backdrop-blur-md`, sticky `top-0 z-50`, logo max-height 44px (mobile 36px), nav gap 28–32px, active link 2px gold underline, CTA button label "Nhận tư vấn". Footer: desktop 4 columns (Brand / Dịch vụ / Liên kết / Liên hệ) + social row + legal row on `bg-ink950`; mobile = brand block + accordion groups + social + legal.

- [ ] **Step 1: Write the failing test**

```tsx
// components/layout/SiteHeader.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("opens the mobile drawer, traps focus, locks body scroll, and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: /mở menu/i }));
    expect(screen.getByRole("dialog", { name: /menu/i })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /menu/i })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/layout/SiteHeader.test.tsx`
Expected: FAIL — component doesn't exist.

- [ ] **Step 3: Implement `SiteHeader` + `MobileNavDrawer`**

Nav items (from `ROUTE_IMPLEMENTATION_MAP.json` routes, excluding `/404`): Trang chủ (`/`), Website (`/website`), Support MXH (`/support-mxh`), Dịch vụ số (`/dich-vu-so`), Dự án (`/du-an`), Kiến thức (`/kien-thuc`), Giới thiệu (`/gioi-thieu`), Liên hệ (`/lien-he`). `MobileNavDrawer` renders as `role="dialog" aria-modal="true" aria-label="Menu di động"`, uses `useFocusTrap` with `active={open}` and `onEscape={close}`, calls `lockBodyScroll(open)` in an effect, animates via `usePrefersReducedMotion()`-gated transform/opacity (280ms per `interactions.json.mobileNav.durationMs`, skip transition entirely when reduced motion is on). Hamburger button `aria-label="Mở menu"` / close button `aria-label="Đóng menu"`, both ≥44px targets.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/layout/SiteHeader.test.tsx`
Expected: PASS

- [ ] **Step 5: Implement `SiteFooter`** per the anatomy above, using `Container`, `Divider`, and the same `siteSettings` stub (zalo/telegram links go to `https://zalo.me/0355636882` and `https://t.me/lucifer_dvmxh`; `facebookUrl` stays absent — do not invent one, per `CONTENT_TRUTH.json.pending.facebookUrl`).

- [ ] **Step 6: Wire both into `app/layout.tsx`** (already imported since Task 1; confirm no prop changes needed).

- [ ] **Step 7: Commit**

```bash
git add components/layout/SiteHeader.tsx components/layout/MobileNavDrawer.tsx components/layout/SiteFooter.tsx components/layout/SiteHeader.test.tsx
git commit -m "feat: implement site header with accessible mobile drawer and site footer"
```

---

### Task 5: Content/data layer (types, schemas, demo fixtures)

**Files:**
- Create: `lib/content/types.ts`, `lib/content/schema.ts`, `lib/content/siteSettings.ts`, `lib/content/services.ts`, `lib/content/projects.ts`, `lib/content/articles.ts`, `lib/content/faqs.ts`
- Test: `lib/content/schema.test.ts`

**Interfaces:**
- Produces types/schemas consumed by every route task (6–14), the backend task (17), and SEO task (18): `Service`, `Project`, `Article`, `FAQ`, `Lead`, `Subscriber`, `SiteSettings` (fields exactly per `.webby/DATA_BACKEND_CONTRACT.json`), plus `leadSchema`/`subscriberSchema` (zod) reused by the client form (Task 15) and the API route (Task 17) so validation never diverges.

- [ ] **Step 1: Write the failing test**

```ts
// lib/content/schema.test.ts
import { describe, expect, it } from "vitest";
import { leadSchema } from "./schema";

describe("leadSchema", () => {
  it("requires phone and consent, and rejects a submission without them", () => {
    const result = leadSchema.safeParse({
      name: "Nguyễn Văn A", need: "Website doanh nghiệp", service: "website",
      preferredChannel: "zalo", sourceRoute: "/lien-he", createdAt: "2026-08-15T00:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid submission", () => {
    const result = leadSchema.safeParse({
      name: "Nguyễn Văn A", phone: "0900000000", need: "Website doanh nghiệp",
      service: "website", preferredChannel: "zalo", consent: true,
      sourceRoute: "/lien-he", createdAt: "2026-08-15T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/content/schema.test.ts`
Expected: FAIL — `./schema` doesn't exist.

- [ ] **Step 3: Implement types + schema**

```ts
// lib/content/types.ts
export type PriceMode = "fixed" | "from" | "contact" | "hidden";
export type PreferredChannel = "zalo" | "telegram" | "phone" | "email";

export interface Service {
  slug: string; category: string; title: string; summary: string; ctaLabel: string;
  features?: string[]; priceMode?: PriceMode; priceVnd?: number; heroAssetId?: string; faqIds?: string[];
}
export interface Project {
  slug: string; title: string; category: string; summary: string; demoOnly: boolean;
  heroAssetId?: string; challenge?: string; solution?: string; results?: string;
  technology?: string[]; galleryAssetIds?: string[];
}
export interface Article {
  slug: string; title: string; category: string; excerpt: string; content: string;
  publishedAt: string; author: string; coverAssetId?: string; readMinutes?: number;
  seoTitle?: string; seoDescription?: string;
}
export interface FAQ { id: string; scope: string; question: string; answer: string; order: number }
export interface SiteSettings {
  brandName: string; slogan: string; domain: string; zalo: string; telegram: string;
  facebookUrl?: string; email?: string; address?: string;
}
```

```ts
// lib/content/schema.ts
import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9).max(15),
  email: z.string().email().optional(),
  need: z.string().min(2),
  service: z.string().min(1),
  preferredChannel: z.enum(["zalo", "telegram", "phone", "email"]),
  consent: z.literal(true),
  sourceRoute: z.string().min(1),
  createdAt: z.string(),
  utm: z.record(z.string()).optional(),
  referrer: z.string().optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;

export const subscriberSchema = z.object({
  email: z.string().email(),
  consent: z.literal(true),
  createdAt: z.string(),
  sourceRoute: z.string().optional(),
});
export type SubscriberInput = z.infer<typeof subscriberSchema>;
```

`lib/content/siteSettings.ts` exports the confirmed `SiteSettings` object (brandName/slogan/domain/zalo/telegram from `CONTENT_TRUTH.json.confirmed`; `facebookUrl`/`email`/`address` omitted — `TBD`). `lib/content/services.ts`/`projects.ts`/`articles.ts`/`faqs.ts` export typed arrays seeded from the copy in `.webby/visual-handoff/*.md` for each route; every `Project`/testimonial-bearing `Article` gets `demoOnly: true` per `CONTENT_TRUTH.json.demoOnly`, and every `Service.priceMode` for `dich-vu-so` products is `"contact"` or `"hidden"` (never a bare demo price marked as real) unless CONTENT_TRUTH later confirms otherwise.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/content/schema.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/content/*.ts
git commit -m "feat: add typed content layer and lead/subscriber validation schemas"
```

---

### Task 6: Route `/` (home)

**Files:**
- Create: `app/page.tsx`
- Test: `e2e/home.spec.ts`

**Interfaces:** Consumes `Section`, `Container`, `ServiceCard`, `ProjectCard`, `MetricStrip`, `ProcessSteps`, `TestimonialCard`, `ArticleCard` (Task 2 primitives; content-card components are built inline in this task if not already generalized — if a card component is still a stub, implement its real anatomy here per `component-map.json` rather than duplicating markup, since routes 7–12 reuse the same cards).

**Section order (exact, from `ROUTE_IMPLEMENTATION_MAP.json` `/`):** `site-header, hero, service-overview, featured-projects, metrics-strip, work-process, testimonials, latest-knowledge, final-cta, site-footer`. Visual reference: `.webby/visual-master/gd1-v1/pages/page-03.webp` (dark hero with gold phoenix mark, 3 light service cards, project gallery strip, gold stat numbers, 4-step process, testimonial band, knowledge cards, gold final-CTA band). Tag any metric/testimonial numbers as `demoOnly` sourced from `lib/content` — do not hardcode fake stats directly in JSX.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("/ home", () => {
  test("renders all approved sections in order with no horizontal scroll (desktop)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const sectionIds = ["hero", "service-overview", "featured-projects", "metrics-strip", "work-process", "testimonials", "latest-knowledge", "final-cta"];
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    const order = await page.$$eval("main > section", (els) => els.map((e) => e.id));
    expect(order).toEqual(sectionIds);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test("mobile has no horizontal scroll (390px)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/home.spec.ts`
Expected: FAIL — placeholder `app/page.tsx` from Task 1 doesn't have these sections/ids.

- [ ] **Step 3: Implement `app/page.tsx`** with one `<Section id="...">` per section above, in that exact order, each wrapped in `<Container>`, populated from `lib/content` — consult `page-03.webp` for hierarchy/imagery/spacing before finalizing Tailwind classes.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/home.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx e2e/home.spec.ts
git commit -m "feat: implement home route matching GD1 master page-03"
```

---

### Task 7: Route `/website`

**Files:** Create `app/website/page.tsx`; Test `e2e/website.spec.ts` (same pattern as Task 6).
**Sections (exact order):** `site-header, website-hero, industry-fit-grid, website-packages, benefit-strip, website-projects, website-process, faq, final-cta, site-footer`.
**Visual reference:** `page-04.webp`. Content source: `.webby/visual-handoff/website.md`.
**Note:** `website-packages` uses `PricingCard` (Task 2/component-map anatomy: plan name, price-or-contact, features, CTA, optional featured badge) — `priceMode` must come from `lib/content/services.ts`, never a literal number typed directly in JSX. `faq` section uses `FAQAccordion` — if Task 16 (FAQ/TOC/filters) hasn't landed yet when this task runs, render FAQAccordion in its simplest closed/open local-state form here and let Task 16 upgrade it in place (same props), rather than blocking this route on Task 16.
Steps 1–5 mirror Task 6's pattern: write the Playwright section-order + no-horizontal-scroll spec first (assert against the section list above), confirm it fails, implement, confirm it passes, commit (`git commit -m "feat: implement /website route matching GD1 master page-04"`).

---

### Task 8: Route `/support-mxh`

**Files:** Create `app/support-mxh/page.tsx`; Test `e2e/support-mxh.spec.ts`.
**Sections (exact order):** `site-header, support-hero, support-service-grid, common-issues-grid, why-lac-viet, support-process, trust-client-row, support-metrics, faq, support-lead-cta, impact-cta, site-footer`.
**Visual reference:** `page-05.webp`. Content source: `.webby/visual-handoff/support-mxh.md`. `trust-client-row`/`support-metrics` values are `demoOnly` per `CONTENT_TRUTH.json` — pull from `lib/content`, flag visibly enough that Task 20 (SEO) can exclude them from structured data.
Same TDD steps/commit pattern as Task 6 (`feat: implement /support-mxh route matching GD1 master page-05`).

---

### Task 9: Route `/dich-vu-so`

**Files:** Create `app/dich-vu-so/page.tsx`; Test `e2e/dich-vu-so.spec.ts`.
**Sections (exact order):** `site-header, digital-hero, service-category-strip, featured-digital-products, why-lac-viet, purchase-process, trust-metrics, faq, support-card, final-cta, site-footer`.
**Visual reference:** `page-06.webp`. Content source: `.webby/visual-handoff/dich-vu-so.md`. Any digital-product prices shown must be `priceMode: "contact"` (or hidden) per `CONTENT_TRUTH.json.demoOnly` ("digital service prices/products shown in mockups unless later confirmed") — do not render a bare VND number as a real price.
Same TDD steps/commit pattern (`feat: implement /dich-vu-so route matching GD1 master page-06`).

---

### Task 10: Routes `/du-an` and `/du-an/[slug]`

**Files:** Create `app/du-an/page.tsx`, `app/du-an/[slug]/page.tsx`, `app/du-an/[slug]/not-found.tsx`; Test `e2e/du-an.spec.ts`.
**`/du-an` sections:** `site-header, projects-hero, category-filters, projects-grid, featured-case-study, project-cta, site-footer` (`page-07.webp`).
**`/du-an/[slug]` sections:** `site-header, breadcrumbs, case-study-hero, project-meta, case-tabs, overview, problem, solution, results, technology, visual-showcase, related-projects, final-cta, site-footer` (`page-10.webp`).
**Interfaces:** Consumes `Project[]` from `lib/content/projects.ts`; `generateStaticParams` in `[slug]/page.tsx` maps every `Project.slug`; unknown slug renders the route's own `not-found.tsx` (still branded 404, reusing `NotFound404`/`ErrorState` from Task 2, not the raw framework default). `results`/`demoOnly` fields must render with a visible "Dự án mẫu" (demo) badge on every project card and detail hero per `component-map.json` (`demoOnly flag` in `ProjectCard` anatomy).

- [ ] **Step 1: Write the failing test**

```ts
// e2e/du-an.spec.ts
import { test, expect } from "@playwright/test";

test("/du-an lists demo-flagged project cards and links to a working detail route", async ({ page }) => {
  await page.goto("/du-an");
  const firstCard = page.locator('[data-testid="project-card"]').first();
  await expect(firstCard.getByText(/demo/i)).toBeVisible();
  await firstCard.click();
  await expect(page).toHaveURL(/\/du-an\/.+/);
  await expect(page.locator("#case-study-hero")).toBeVisible();
});

test("an unknown project slug renders the branded 404, not a framework default", async ({ page }) => {
  const response = await page.goto("/du-an/khong-ton-tai");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/không tìm thấy|404/i)).toBeVisible();
});
```

- [ ] **Step 2–5:** run (fail), implement both routes, run (pass), commit (`feat: implement /du-an list and detail routes matching GD1 master page-07/page-10`).

---

### Task 11: Routes `/kien-thuc` and `/kien-thuc/[slug]`

**Files:** Create `app/kien-thuc/page.tsx`, `app/kien-thuc/[slug]/page.tsx`, `app/kien-thuc/[slug]/not-found.tsx`; Test `e2e/kien-thuc.spec.ts`.
**`/kien-thuc` sections:** `site-header, knowledge-hero, category-filters, featured-article, article-grid, load-more, newsletter, service-cta, site-footer` (`page-08.webp`).
**`/kien-thuc/[slug]` sections:** `site-header, breadcrumbs, article-header, article-layout, article-toc, article-body, related-articles, service-cta, site-footer` (`page-11.webp`).
**Interfaces:** Consumes `Article[]` from `lib/content/articles.ts`. Article body content must expose heading `id`s (per `DATA_BACKEND_CONTRACT.json` Article rule: "content must support heading IDs for TOC") so Task 16's `ArticleTOC` can anchor-scroll into them — render article body from a small markdown-to-heading-ids helper, not raw HTML string interpolation. `newsletter` section renders `NewsletterForm` (email + consent only, per component-map) — wire it to the real `/api/newsletter` endpoint in Task 17; until then it can submit to a local no-op handler with the same prop signature so this task isn't blocked.
Same TDD pattern; commit `feat: implement /kien-thuc list and detail routes matching GD1 master page-08/page-11`.

---

### Task 12: Route `/gioi-thieu`

**Files:** Create `app/gioi-thieu/page.tsx`; Test `e2e/gioi-thieu.spec.ts`.
**Sections (exact order):** `site-header, breadcrumbs, about-hero, brand-values, service-ecosystem, brand-story, principles, final-cta, site-footer` (`page-09.webp`, content `.webby/visual-handoff/gioi-thieu.md`). Brand story must reflect the confirmed slogan "Cần Kiệm Liêm Chính" verbatim and must not introduce unverified founding-year/company-history claims.
Same TDD pattern; commit `feat: implement /gioi-thieu route matching GD1 master page-09`.

---

### Task 13: Route `/lien-he` (page shell)

**Files:** Create `app/lien-he/page.tsx`; Test `e2e/lien-he.spec.ts`.
**Sections (exact order):** `site-header, breadcrumbs, contact-hero, consultation-section, contact-form, contact-channels, contact-process, faq, secondary-contact-card, final-cta, site-footer` (`page-12.webp`, content `.webby/visual-handoff/lien-he.md`).
**Scope boundary:** this task builds the page shell and static sections only (`contact-channels` uses `ContactChannelCard` linking to the real zalo/telegram values from `siteSettings`, no facebookUrl link until confirmed). `contact-form` renders `ContactForm` in a minimal local-state form (no server wiring yet) — Task 15 replaces it in place with full client+server validation and success/error states, same section id and same component name, so this task's test only asserts the section exists and the form has the 6 required fields (Họ tên, Số điện thoại, Email, Nhu cầu, Dịch vụ quan tâm, Kênh liên hệ, plus consent checkbox), not that submission works end-to-end.
Same TDD pattern (assert section order + the 7 form fields by label); commit `feat: implement /lien-he route shell matching GD1 master page-12`.

---

### Task 14: Route `/404`

**Files:** Create `app/not-found.tsx`, `components/ui/NotFound404.tsx`; Test `e2e/not-found.spec.ts`.
**Sections (exact order):** `site-header-minimal, not-found-state, home-cta, site-footer-minimal` (`page-13.webp`, 404 sub-state frame). Must return real HTTP 404 (Next.js `not-found.tsx` convention already does this) and offer a CTA back to `/`.

- [ ] **Step 1:**

```ts
// e2e/not-found.spec.ts
import { test, expect } from "@playwright/test";

test("unknown route returns HTTP 404 and offers a way home", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: /về trang chủ|trang chủ/i }).click();
  await expect(page).toHaveURL("/");
});
```

- [ ] **Steps 2–5:** fail → implement `not-found.tsx` + `NotFound404` (minimal header/footer variants, no full nav) → pass → commit `feat: implement branded 404 route matching GD1 master page-13`.

---

### Task 15: ConsultationModal + ContactForm (client+server validation, states)

**Files:**
- Create: `components/conversion/ConsultationCTA.tsx`, `components/conversion/ConsultationModal.tsx` (Radix `Dialog` + `useFocusTrap`/`lockBodyScroll` from Task 3), `components/conversion/ContactForm.tsx`, `components/conversion/Toast.tsx`
- Modify: `app/lien-he/page.tsx` (swap the Task 13 minimal form for the real `ContactForm`), any route from Tasks 6–12 whose master page shows a "Nhận tư vấn" CTA opening the modal (home, website, support-mxh, dich-vu-so per their hero/final-cta sections)
- Test: `components/conversion/ContactForm.test.tsx`, `e2e/consultation-flow.spec.ts`

**Interfaces:**
- Consumes: `leadSchema` (Task 5), `useFocusTrap`/`lockBodyScroll` (Task 3), `Button` (Task 2), analytics `track()` (stub until Task 19 — call `track("lead_submit_start", {...})` etc. now; Task 19 only needs to make `track` real, not change call sites).
- Produces: `<ConsultationCTA label />` (opens modal), `<ConsultationModal open onClose />`, `<ContactForm onSuccess? />` used standalone on `/lien-he` and inside the modal.

- [ ] **Step 1: Write the failing tests**

```tsx
// components/conversion/ContactForm.test.tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows an inline error and does not submit when phone or consent is missing", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(global, "fetch");
    render(<ContactForm sourceRoute="/lien-he" />);
    await user.type(screen.getByLabelText(/họ tên/i), "Nguyễn Văn A");
    await user.click(screen.getByRole("button", { name: /gửi/i }));
    expect(await screen.findByText(/số điện thoại/i)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("disables the submit button while submitting to prevent duplicate submits", async () => {
    const user = userEvent.setup();
    let resolveFetch: (v: Response) => void;
    vi.spyOn(global, "fetch").mockReturnValue(new Promise((r) => (resolveFetch = r)) as Promise<Response>);
    render(<ContactForm sourceRoute="/lien-he" />);
    await user.type(screen.getByLabelText(/họ tên/i), "Nguyễn Văn A");
    await user.type(screen.getByLabelText(/số điện thoại/i), "0900000000");
    await user.type(screen.getByLabelText(/nhu cầu/i), "Website doanh nghiệp");
    await user.click(screen.getByLabelText(/đồng ý/i));
    const submit = screen.getByRole("button", { name: /gửi/i });
    await user.click(submit);
    expect(submit).toBeDisabled();
    resolveFetch!(new Response(JSON.stringify({ id: "1" }), { status: 200 }));
  });
});
```

```ts
// e2e/consultation-flow.spec.ts
import { test, expect } from "@playwright/test";

test("consultation modal opens, traps focus, and closes on Escape returning focus to the trigger", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /nhận tư vấn/i }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
```

- [ ] **Step 2: Run to verify failure** — `npx vitest run components/conversion/ContactForm.test.tsx` and `npx playwright test e2e/consultation-flow.spec.ts` both FAIL (components don't exist).

- [ ] **Step 3: Implement.** `ContactForm` fields per `DESIGN_SYSTEM.md` §9: Họ tên (required), Số điện thoại (required), Email (optional), Nhu cầu (required), Dịch vụ quan tâm (select from `lib/content/services.ts`), Kênh liên hệ ưu tiên (zalo/telegram/phone/email), consent checkbox (required). Client-side: parse with `leadSchema.safeParse` on submit, render inline errors under each invalid field (never color-only — include text), disable submit button for the duration of the in-flight `fetch`. POST to `/api/leads` (Task 17 implements the endpoint; until then this task's Playwright test only covers open/focus-trap/escape, not a real success round-trip — that assertion moves to Task 17's e2e test). On 2xx show the success board state (matches `page-13.webp` success frame) via `Toast`/inline success panel; on non-2xx show the error board state, both reachable without a page reload. `ConsultationModal` wraps `ContactForm` in a Radix `Dialog.Root`/`Dialog.Content` styled as desktop centered modal / mobile bottom-sheet-or-full-drawer per `interactions.json.consultationModal`, using `useFocusTrap` + `lockBodyScroll` + escape/backdrop close, returning focus to the triggering `ConsultationCTA` on close.

- [ ] **Step 4: Run to verify pass.**

- [ ] **Step 5: Commit**

```bash
git add components/conversion/*.tsx app/lien-he/page.tsx e2e/consultation-flow.spec.ts
git commit -m "feat: implement consultation modal and contact form with validation and states"
```

---

### Task 16: FAQAccordion, ArticleTOC, CategoryFilter, load-more

**Files:**
- Create: `components/content/FAQAccordion.tsx` (Radix `Accordion`), `components/content/ArticleTOC.tsx`, `components/content/CategoryFilter.tsx`
- Modify: `app/kien-thuc/page.tsx` (wire real `CategoryFilter` + "load more" pagination over `Article[]`), `app/kien-thuc/[slug]/page.tsx` (wire real `ArticleTOC` against the heading ids from Task 11), every route with a `faq` section (website, support-mxh, dich-vu-so, lien-he) to use the real `FAQAccordion` in place of the Task 7/8/9/13 local-state stand-in — same component name/props, so this is a drop-in swap, not a rewrite of those pages.
- Test: `components/content/FAQAccordion.test.tsx`, `e2e/kien-thuc-interactions.spec.ts`

**Interfaces:** `<FAQAccordion items={{id, question, answer}[]} allowMultiple?={false}>` (single-open preferred per `component-map.json`), `<ArticleTOC headings={{id, text, level}[]}>` (desktop sticky, mobile inline/collapsible, active-heading highlight, header-offset anchor scroll per `interactions.json.articleTOC`), `<CategoryFilter categories={string[]} value onChange>` (URL-state preferred per `IMPLEMENTATION_CONTRACT.json.ux.filters`).

- [ ] **Step 1: Write the failing tests**

```tsx
// components/content/FAQAccordion.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordion } from "./FAQAccordion";

const items = [
  { id: "q1", question: "Câu hỏi 1", answer: "Trả lời 1" },
  { id: "q2", question: "Câu hỏi 2", answer: "Trả lời 2" },
];

describe("FAQAccordion", () => {
  it("uses button semantics with aria-expanded and keeps only one panel open", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={items} />);
    const q1 = screen.getByRole("button", { name: "Câu hỏi 1" });
    const q2 = screen.getByRole("button", { name: "Câu hỏi 2" });
    expect(q1).toHaveAttribute("aria-expanded", "false");
    await user.click(q1);
    expect(q1).toHaveAttribute("aria-expanded", "true");
    await user.click(q2);
    expect(q2).toHaveAttribute("aria-expanded", "true");
    expect(q1).toHaveAttribute("aria-expanded", "false");
  });
});
```

```ts
// e2e/kien-thuc-interactions.spec.ts
import { test, expect } from "@playwright/test";

test("category filter narrows the article grid and load-more reveals additional articles", async ({ page }) => {
  await page.goto("/kien-thuc");
  const initialCount = await page.locator('[data-testid="article-card"]').count();
  await page.getByRole("button", { name: /website/i }).click();
  await expect(page).toHaveURL(/category=website/);
  const filtered = await page.locator('[data-testid="article-card"]').count();
  expect(filtered).toBeLessThanOrEqual(initialCount);
});

test("article TOC anchor-scrolls to the matching heading with header offset", async ({ page }) => {
  await page.goto("/kien-thuc/du-an-demo-01");
  const tocLink = page.locator('[data-testid="toc-link"]').nth(1);
  await tocLink.click();
  const headingId = await tocLink.getAttribute("href");
  await expect(page.locator(headingId!.replace("#", "#"))).toBeInViewport();
});
```

(Adjust the detail slug in the second spec to whatever `lib/content/articles.ts` actually seeds, from Task 5/11 — keep it a real slug, not a guess.)

- [ ] **Step 2–4:** run (fail) → implement all three components + wire into the modified routes → run (pass).

- [ ] **Step 5: Commit**

```bash
git add components/content/FAQAccordion.tsx components/content/ArticleTOC.tsx components/content/CategoryFilter.tsx app/kien-thuc/page.tsx app/kien-thuc/[slug]/page.tsx app/website/page.tsx app/support-mxh/page.tsx app/dich-vu-so/page.tsx app/lien-he/page.tsx e2e/kien-thuc-interactions.spec.ts
git commit -m "feat: implement FAQ accordion, article TOC, and category filter/load-more"
```

---

### Task 17: Backend — `/api/leads`, `/api/newsletter`, sinks, rate limiting

**Files:**
- Create: `lib/backend/leadSink.ts`, `lib/backend/subscriberSink.ts`, `lib/backend/rateLimit.ts`, `app/api/leads/route.ts`, `app/api/newsletter/route.ts`
- Modify: `components/conversion/ContactForm.tsx` (point at the now-real endpoint — no prop change), `components/conversion/NewsletterForm.tsx` (same)
- Test: `lib/backend/rateLimit.test.ts`, `app/api/leads/route.test.ts`, `e2e/lead-submission.spec.ts`

**Interfaces:**
- Produces: `LeadSink.save(lead: Lead & {external_sync_status, external_id?}): Promise<{id: string}>`, `SubscriberSink.save(sub: Subscriber): Promise<{id: string}|{alreadySubscribed: true}>`, `rateLimit(key: string, opts): {allowed: boolean}`. Both sinks are file-backed JSON-lines adapters under `.data/` (gitignored, created at runtime) implementing an interface — swapping to a real DB/CRM later means writing a new adapter behind the same interface, per `DATA_BACKEND_CONTRACT.json.crmFutureProofing`. No provider secret is read or required by this adapter.

- [ ] **Step 1: Write the failing tests**

```ts
// lib/backend/rateLimit.test.ts
import { describe, expect, it } from "vitest";
import { rateLimit } from "./rateLimit";

describe("rateLimit", () => {
  it("allows the first N requests then blocks", () => {
    const key = "203.0.113.1";
    let last;
    for (let i = 0; i < 5; i++) last = rateLimit(key, { limit: 5, windowMs: 60_000 });
    expect(last!.allowed).toBe(true);
    expect(rateLimit(key, { limit: 5, windowMs: 60_000 }).allowed).toBe(false);
  });
});
```

```ts
// app/api/leads/route.test.ts
import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/leads", () => {
  it("returns 400 field errors for an invalid payload", async () => {
    const req = new Request("http://localhost/api/leads", { method: "POST", body: JSON.stringify({}) });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 2xx with a stable receipt id for a valid payload", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({
        name: "Nguyễn Văn A", phone: "0900000000", need: "Website", service: "website",
        preferredChannel: "zalo", consent: true, sourceRoute: "/lien-he", createdAt: new Date(0).toISOString(),
      }),
    });
    const res = await POST(req);
    expect(res.status).toBeLessThan(300);
    const body = await res.json();
    expect(typeof body.id).toBe("string");
  });
});
```

```ts
// e2e/lead-submission.spec.ts
import { test, expect } from "@playwright/test";

test("submitting the contact form end-to-end shows the success board state", async ({ page }) => {
  await page.goto("/lien-he");
  await page.getByLabel(/họ tên/i).fill("Nguyễn Văn A");
  await page.getByLabel(/số điện thoại/i).fill("0900000000");
  await page.getByLabel(/nhu cầu/i).fill("Website doanh nghiệp");
  await page.getByLabel(/đồng ý/i).check();
  await page.getByRole("button", { name: /gửi/i }).click();
  await expect(page.getByText(/đã gửi|thành công/i)).toBeVisible();
});
```

- [ ] **Step 2: Run to verify failure** — all three FAIL (no implementation yet).

- [ ] **Step 3: Implement.** `rateLimit` = in-memory sliding-window counter keyed by IP (documented limitation: per-instance only, acceptable for a single Next.js deployment; note this explicitly in code comment). `POST /api/leads`: parse with `leadSchema` from Task 5 (reused, not re-implemented) → 400 with field errors on failure → rate-limit by request IP (429 on exceed) → `leadSink.save()` → 2xx `{id}`. `POST /api/newsletter` mirrors this with `subscriberSchema`, idempotent success on duplicate email. Both routes catch adapter errors and return a generic 5xx user-safe message while logging the real error server-side only (`console.error`, never sent to the client).

- [ ] **Step 4: Run to verify pass.**

- [ ] **Step 5: Commit**

```bash
git add lib/backend/*.ts app/api/leads/route.ts app/api/newsletter/route.ts components/conversion/ContactForm.tsx components/conversion/NewsletterForm.tsx .gitignore e2e/lead-submission.spec.ts
git commit -m "feat: implement lead and newsletter API routes with validation, rate limiting, and file-backed sinks"
```

---

### Task 18: SEO — metadata, sitemap, robots, structured data

**Files:**
- Modify: every `app/**/page.tsx` (add `export const metadata` or `generateMetadata` per route)
- Create: `app/sitemap.ts`, `app/robots.ts`, `lib/seo/structuredData.ts`
- Test: `e2e/seo.spec.ts`

**Interfaces:** Consumes `Project`/`Article`/`Service` `demoOnly` flags (Task 5) to gate structured data — `lib/seo/structuredData.ts` must refuse to emit `Review`/`AggregateRating` for anything, and must refuse to emit factual `Organization` fields (e.g. no address) that aren't confirmed in `CONTENT_TRUTH.json.confirmed`.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/seo.spec.ts
import { test, expect } from "@playwright/test";

const routes = ["/", "/website", "/support-mxh", "/dich-vu-so", "/du-an", "/kien-thuc", "/gioi-thieu", "/lien-he"];

test("every indexable route has a unique title, meta description, and canonical link", async ({ page }) => {
  const seen = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(seen.has(title)).toBe(false);
    seen.add(title);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain(route === "/" ? "lacvietmedia.com" : route);
  }
});

test("sitemap.xml and robots.txt are served", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});

test("no demoOnly project renders fake Review/AggregateRating structured data", async ({ page }) => {
  await page.goto("/du-an/du-an-demo-01");
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const block of jsonLd) {
    expect(block).not.toContain("AggregateRating");
    expect(block).not.toContain('"@type":"Review"');
  }
});
```

- [ ] **Step 2: Run to verify failure.**

- [ ] **Step 3: Implement.** Each route exports metadata with a unique Vietnamese `title`/`description` and `alternates.canonical`. `app/sitemap.ts` returns every static route + one entry per `Project`/`Article` slug. `app/robots.ts` allows all, points at the sitemap. `structuredData.ts` emits `WebSite`/`Organization` (ProfessionalService) only with confirmed fields, `BreadcrumbList` on detail routes, `Article` schema on knowledge detail pages (never on `demoOnly` projects).

- [ ] **Step 4: Run to verify pass.**

- [ ] **Step 5: Commit**

```bash
git add app/**/page.tsx app/sitemap.ts app/robots.ts lib/seo/structuredData.ts e2e/seo.spec.ts
git commit -m "feat: add per-route SEO metadata, sitemap, robots, and guarded structured data"
```

---

### Task 19: Analytics event wiring

**Files:**
- Create: `lib/analytics/track.ts`
- Modify: `components/conversion/ConsultationCTA.tsx`/`ConsultationModal.tsx`/`ContactForm.tsx` (Task 15), `components/layout/SiteFooter.tsx`/`ContactChannelCard.tsx` (Task 4/13), route files with `service-cta`/project cards/article cards/category filters (Tasks 6–12, 16)
- Test: `lib/analytics/track.test.ts`

**Interfaces:** `track(name: EventName, props: Record<string,string|boolean>): void` where `EventName` is a union of exactly the 9 names in `.webby/ANALYTICS_CONTRACT.json`. Type the union so passing an unlisted event name is a compile error — this is the enforcement mechanism for "never send PII," alongside the runtime guard below.

- [ ] **Step 1: Write the failing test**

```ts
// lib/analytics/track.test.ts
import { describe, expect, it, vi } from "vitest";
import { track } from "./track";

describe("track", () => {
  it("throws if a prop key looks like PII (phone/email/message)", () => {
    expect(() => track("lead_submit_error", { sourceRoute: "/lien-he", errorClass: "validation", phone: "0900" } as any))
      .toThrow(/pii/i);
  });

  it("forwards allowed props for a known event", () => {
    const spy = vi.fn();
    (globalThis as any).__testSink = spy;
    track("consultation_open", { sourceRoute: "/", sourceComponent: "hero" });
    expect(spy).toHaveBeenCalledWith("consultation_open", { sourceRoute: "/", sourceComponent: "hero" });
  });
});
```

- [ ] **Step 2: Run to verify failure.**

- [ ] **Step 3: Implement `track()`** with a hardcoded `Record<EventName, string[]>` allow-list of prop keys taken verbatim from `ANALYTICS_CONTRACT.json.events`, a runtime check that throws if any prop key matches `/phone|email|message|address/i` or isn't in that event's allow-list, and a pluggable sink (`window.__testSink` in tests / `window.gtag` or a `dataLayer.push` in production — whichever is available, no hardcoded vendor secret). Then wire the 9 call sites: `consultation_open` (CTA click), `lead_submit_start`/`lead_submit_success`/`lead_submit_error` (ContactForm), `contact_channel_click` (ContactChannelCard/footer social links), `service_click` (ServiceCard), `project_open` (ProjectCard), `article_open` (ArticleCard), `filter_change` (CategoryFilter).

- [ ] **Step 4: Run to verify pass.**

- [ ] **Step 5: Commit**

```bash
git add lib/analytics/track.ts components/conversion/*.tsx components/layout/SiteFooter.tsx components/content/*.tsx app/**/page.tsx
git commit -m "feat: wire analytics events with a PII-safe typed tracker"
```

---

### Task 20: Playwright evidence, IMPLEMENTATION_RECEIPT.json, branch + Draft PR

**Files:**
- Create: `.webby/implementation/IMPLEMENTATION_RECEIPT.json` (fill the schema from `.webby/implementation/IMPLEMENTATION_RECEIPT.template.json`), `.webby/implementation/evidence/<implementationCommit>/**` (screenshots)
- Create: `e2e/visual-evidence.spec.ts` (captures full-page screenshots at 1440×900 and 390×844 for all 11 routes + the required states from `.webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json`: `mobile-menu-open, consultation-modal, form-success, form-error, faq-open, loading, 404, focus-visible`)

- [ ] **Step 1:** Write `e2e/visual-evidence.spec.ts` so it fails until every route file from Tasks 6–14 exists and every state from Tasks 4/15/16/17 is wireable (it should already pass mechanically at this point — this step is the final regression gate, not new TDD).

- [ ] **Step 2:** Run the full suite and confirm everything passes before capturing evidence:

```bash
npm run build
npm test
npx playwright test
```

Expected: all green. If anything fails, fix it in the owning task's files (do not patch around it here) and re-run.

- [ ] **Step 3:** Run the evidence spec with `--update-snapshots`/screenshot capture enabled, saving output under `.webby/implementation/evidence/<git-short-sha>/` per `PLAYWRIGHT_CAPTURE_PLAN.json.evidencePathSuggestion`, disabling non-essential animation for the capture per `capture.animations`.

- [ ] **Step 4:** Fill `IMPLEMENTATION_RECEIPT.json`: `consumedUiCommit` = `09ad912eb5728395bafce96025734e4ac0491047`, `consumedUiRevision` = `4`, `implementationCommit` = the final commit SHA on this branch, `routesImplemented` = all 11 routes, `componentsImplemented` = the full component list from `component-map.json`, `artifactReconstruction.masterSnapshot`/`productionAssets` = `"PASS"` (re-run both preflight scripts one more time and paste their literal stdout), `build.status`/`tests.status` = `"PASS"` with the commands run, `playwrightEvidence` = the actual file paths written in Step 3, `blockers` = an honest list of anything genuinely deferred (e.g. `facebookUrl`, production email/address, verified case studies — all already flagged `TBD` in `CONTENT_TRUTH.json`, not new gaps).

- [ ] **Step 5: Create the implementation branch, commit, push, open the Draft PR**

```bash
git checkout -b claude/gd4-gd6-implementation-v1
git add .webby/implementation/IMPLEMENTATION_RECEIPT.json .webby/implementation/evidence e2e/visual-evidence.spec.ts
git commit -m "chore: add Playwright evidence and GD4-GD6 implementation receipt"
git push -u origin claude/gd4-gd6-implementation-v1
gh pr create --draft --base chatgpt/gd3-git-self-contained-v1 --title "GD4-GD6: Lac Viet Media frontend/UX/backend implementation" --body "$(cat <<'EOF'
## Summary
- Implements all 11 approved routes + 2 detail templates against the Git-resident GD1 V1 master (PDF SHA f015b20d...9b60c4f), design tokens locked in DESIGN_SYSTEM.md/tokens.json.
- GD5: accessible mobile nav, consultation modal, contact form (client+server validation, success/error states), FAQ accordion, article TOC, category filters.
- GD6: /api/leads + /api/newsletter behind provider-agnostic sinks, rate limiting, per-route SEO metadata/sitemap/robots/structured data (demoOnly-gated), PII-safe analytics events.
- No Google Drive dependency at any point (implementationRequiresGoogleDrive stays false throughout).

## Test plan
- [ ] `npm test` (Vitest unit/component suite) — all green
- [ ] `npx playwright test` (route + interaction + SEO + evidence specs, desktop 1440 / mobile 390) — all green
- [ ] `python scripts/reconstruct-git-self-contained.py` — PASS
- [ ] `python scripts/validate-gd3-git-self-contained.py --require-ready` — PASS
- [ ] ChatGPT GD7 visual QA against `.webby/visual-master/gd1-v1/pages/*.webp`

Do not merge — awaiting GD7 visual parity sign-off.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: STOP.** Report the PR URL and evidence path back to the user for handoff to ChatGPT's GĐ7 visual QA. Do not merge.

---

## Self-Review Notes

- **Spec coverage:** every `ROUTE_IMPLEMENTATION_MAP.json` route (Tasks 6–14), every `IMPLEMENTATION_CONTRACT.json.ux` behavior (Tasks 4, 15, 16), every `DATA_BACKEND_CONTRACT.json` entity/endpoint (Tasks 5, 17), every `SEO_CONTRACT.json`/`ANALYTICS_CONTRACT.json` requirement (Tasks 18, 19), every `ACCESSIBILITY_CONTRACT.json` must-have (Task 3 utilities + woven through 4/6–16), `QA_ACCEPTANCE.json` Playwright viewports/states/routes (Task 20) are all mapped to a task.
- **Type consistency:** `Lead`/`Subscriber`/`Service`/`Project`/`Article`/`FAQ`/`SiteSettings` are defined once in Task 5 and only ever consumed (never redefined) by later tasks; `leadSchema`/`subscriberSchema` are shared verbatim between client (Task 15) and server (Task 17) so validation can't drift; `useFocusTrap`/`lockBodyScroll`/`usePrefersReducedMotion` signatures fixed in Task 3 are reused unchanged by Task 4 and Task 15.
- **Known intentional deferral:** route tasks (6–14) specify exact section order, exact master image, exact content source, and a concrete pass/fail test, but deliberately do not hand-transcribe every Tailwind class from the master image into this document — the approved PDF/webp renders are the supreme visual authority per `CLAUDE_TASK.md`, and re-describing them in prose risks drifting from what was actually approved. Each route task's implementer must open the cited `page-XX.webp` directly.
