"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useBodyScrollLock, useEscapeClose, useFocusTrap } from "@/lib/a11y-hooks";
import { track } from "@/lib/analytics";
import { IconButton } from "@/components/ui/IconButton";
import { ContactForm } from "./ContactForm";

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
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string | undefined>(undefined);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  const openModal = useCallback(
    (sourceComponent: string, service?: string) => {
      setDefaultService(service);
      setIsOpen(true);
      track({ name: "consultation_open", props: { sourceRoute: pathname, sourceComponent } });
    },
    [pathname],
  );

  useFocusTrap(dialogRef, isOpen);
  useBodyScrollLock(isOpen);
  useEscapeClose(isOpen, close);

  const value = useMemo(() => ({ open: openModal }), [openModal]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center" data-state="consultation-modal">
          <button
            type="button"
            aria-label="Đóng"
            className="absolute inset-0 bg-ink-950/60"
            onClick={close}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            tabIndex={-1}
            className="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white p-6 shadow-lg md:max-w-lg md:rounded-lg md:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="consultation-modal-title" className="text-h4-mobile font-heading text-ink-950">
                  Nhận tư vấn miễn phí
                </h2>
                <p className="mt-1 text-small text-text-secondary">
                  Để lại thông tin, Lạc Việt Media sẽ liên hệ trong ngày làm việc.
                </p>
              </div>
              <IconButton icon="close" label="Đóng" onClick={close} />
            </div>
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      ) : null}
    </ConsultationContext.Provider>
  );
}
