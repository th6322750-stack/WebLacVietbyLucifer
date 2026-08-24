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
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        // PRO V2 (2026-08-25): "01/02/03" index per brief §17 — real ordinal position within
        // THIS list, reset per column-of-two by CSS counter-independent numbering isn't needed
        // since a plain per-array index reads correctly either way (columns split by
        // odd/even via CSS, not by re-chunking the array).
        const index = String(idx + 1).padStart(2, "0");
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
                className="flex min-h-touch w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-heading text-small text-gold-500/70">{index}</span>
                  <span className="text-body-lg font-medium text-ink-950">{item.question}</span>
                </span>
                <Icon
                  name="chevron-down"
                  className={`shrink-0 text-gold-600 transition-transform duration-normal ease-standard ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="pl-[52px] pr-5 pb-5 text-body text-text-secondary">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
