"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

/** `columns={2}` lays the approved compact two-column desktop FAQ out (master pages 4, 5, 6
 * and 12 all show two columns of short rows, not one long single-column stack). Single-open
 * behaviour is preserved across both columns. */
export function FAQAccordion({ items, columns = 1 }: { items: FAQ[]; columns?: 1 | 2 }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div
      className={
        columns === 2
          ? "grid gap-x-6 gap-y-0 rounded-md border border-border bg-white md:grid-cols-2 md:divide-x md:divide-border"
          : "flex flex-col divide-y divide-border rounded-md border border-border bg-white"
      }
    >
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        return (
          <div
            key={item.id}
            data-state={isOpen ? "faq-open" : undefined}
            className={columns === 2 ? "border-b border-border" : undefined}
          >
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
