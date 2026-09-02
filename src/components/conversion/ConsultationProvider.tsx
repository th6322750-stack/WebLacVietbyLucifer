"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { siteSettings } from "@/lib/site-settings";

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

type ConsultationContextValue = {
  open: (sourceComponent: string, defaultService?: string) => void;
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
    // `defaultService` is part of the shared `open()` shape every call site already uses (it
    // mattered when a form needed to prefill), but a Zalo redirect has nothing to prefill, so
    // the second argument is accepted by callers and simply ignored here.
    (sourceComponent: string) => {
      track({ name: "consultation_open", props: { sourceRoute: pathname, sourceComponent } });
      // A new tab, not a navigation away: whoever clicked stays on the page they were reading,
      // the same way the modal never used to lose their place either.
      window.open(`https://zalo.me/${siteSettings.zalo}`, "_blank", "noopener,noreferrer");
    },
    [pathname],
  );

  const value = useMemo(() => ({ open: openZalo }), [openZalo]);

  return <ConsultationContext.Provider value={value}>{children}</ConsultationContext.Provider>;
}
