"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { zaloUrl } from "@/lib/zalo";

/** "Nhận tư vấn" across the whole site — header, every hero, FinalCta, pricing cards — goes
 * straight to a Zalo chat instead of opening an on-site form.
 *
 * Used to open a modal with ContactForm inside. Replaced at Lucifer's instruction: filling in a
 * form is friction a chat isn't, and the conversation itself is where a lead actually gets
 * converted, not a form that then waits for a callback. The dedicated /lien-he page keeps its
 * own embedded ContactForm — that is a page someone chose to visit specifically to leave
 * details, a different intent from a CTA button mid-scroll.
 *
 * The exported shape (`useConsultation().open(sourceComponent, defaultService)`) is unchanged so
 * none of the nine call sites across the site needed to change — only what `open` DOES changed.
 */

/** Extra context attached to a conversion. Internal identifiers only — no PII ever. */
export type ConsultationIntent = {
  service?: string;
  packageId?: string;
  conceptSlug?: string;
  need?: string;
};

type ConsultationContextValue = {
  /** The second argument used to be `defaultService` back when a form could be prefilled. It is
   *  kept positional so the existing call sites still compile, but it now flows into analytics
   *  as `packageId` rather than being dropped. Newer call sites pass a full intent object. */
  open: (sourceComponent: string, intent?: string | ConsultationIntent) => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used within ConsultationProvider");
  return ctx;
}

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const openZalo = useCallback(
    (sourceComponent: string, intent?: string | ConsultationIntent) => {
      // A bare string is the legacy `defaultService` argument. It was previously discarded; it
      // is the package name at every call site that passes one, so it lands as `packageId`.
      const resolved: ConsultationIntent =
        typeof intent === "string" ? { packageId: intent } : intent ?? {};
      track({
        name: "consultation_open",
        props: { sourceRoute: pathname, sourceComponent, ...resolved },
      });
      // A new tab, not a navigation away: whoever clicked stays on the page they were reading,
      // the same way the modal never used to lose their place either.
      window.open(zaloUrl(), "_blank", "noopener,noreferrer");
    },
    [pathname],
  );

  const value = useMemo(() => ({ open: openZalo }), [openZalo]);

  return <ConsultationContext.Provider value={value}>{children}</ConsultationContext.Provider>;
}
