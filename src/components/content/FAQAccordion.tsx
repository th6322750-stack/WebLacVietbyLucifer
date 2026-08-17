"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col divide-y divide-border rounded-md border border-border bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        return (
          <div key={item.id} data-state={isOpen ? "faq-open" : undefined}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-touch w-full items-center justify-between gap-4 px-5 py-4 text-left text-body-lg font-medium text-ink-950"
              >
                {item.question}
                <Icon
                  name="chevron-down"
                  className={`shrink-0 text-gold-600 transition-transform duration-normal ease-standard ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5 text-body text-text-secondary">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
