"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type ProjectDetailPane = {
  id: string;
  label: string;
  /** Body paragraphs for the pane. */
  paragraphs?: string[];
  /** Result metrics shown to the right of the overview pane. */
  metrics?: { value: string; label: string }[];
  /** Bullet results when no metric cards exist. */
  bullets?: string[];
  /** Technology chips. */
  chips?: string[];
  /** Rendered under the pane when the content is demo-only. */
  note?: string;
};

/** Approved project-detail composition (recovery audit §8, master ui-007): a horizontal tab
 * strip — Tổng quan / Vấn đề / Giải pháp / Kết quả / Công nghệ — over a SINGLE content pane.
 * The previous build stacked all five as full-height sections, which the audit calls out
 * explicitly. The default pane is the overview text with the result metrics beside it.
 *
 * On mobile the strip becomes a horizontal scroller and still shows exactly one pane; panels
 * are never all stacked vertically. */
export function ProjectDetailTabs({ panes }: { panes: ProjectDetailPane[] }) {
  const [activeId, setActiveId] = useState(panes[0]?.id ?? "");
  const active = panes.find((p) => p.id === activeId) ?? panes[0];
  if (!active) return null;

  return (
    <div data-component="project-detail-tabs">
      <div
        role="tablist"
        aria-label="Nội dung dự án"
        className="-mx-4 flex gap-1 overflow-x-auto border-b border-border px-4 md:mx-0 md:px-0"
      >
        {panes.map((pane) => {
          const selected = pane.id === active.id;
          return (
            <button
              key={pane.id}
              id={`project-tab-${pane.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`project-panel-${pane.id}`}
              onClick={() => setActiveId(pane.id)}
              className={`whitespace-nowrap px-4 py-3 text-nav transition-colors duration-fast ease-standard ${
                selected
                  ? "border-b-2 border-gold-500 font-semibold text-ink-950"
                  : "border-b-2 border-transparent text-text-secondary hover:text-ink-950"
              }`}
            >
              {pane.label}
            </button>
          );
        })}
      </div>

      <div
        id={`project-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`project-tab-${active.id}`}
        data-active-pane={active.id}
        className="grid gap-8 pt-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12"
      >
        <div className="flex flex-col gap-4">
          {active.paragraphs?.map((p) => (
            <p key={p} className="text-body-lg text-text-secondary">
              {p}
            </p>
          ))}

          {active.bullets && active.bullets.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {active.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-body-lg text-text-secondary">
                  <Icon name="circle-check" size="default" className="mt-px shrink-0 text-state-success" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}

          {active.chips && active.chips.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {active.chips.map((c) => (
                <span key={c} className="rounded-pill border border-border px-3 py-1 text-small text-text-secondary">
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          {active.note ? <p className="text-caption text-text-muted">{active.note}</p> : null}
        </div>

        {active.metrics && active.metrics.length > 0 ? (
          <dl className="grid grid-cols-2 gap-4 self-start sm:grid-cols-3 lg:grid-cols-1" data-demo-only="true">
            {active.metrics.map((m) => (
              <div key={m.label} className="rounded-md border border-border bg-white p-5 text-center shadow-sm lg:text-left">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-h3-mobile font-heading text-gold-700">{m.value}</dd>
                <p className="mt-1 text-small text-text-secondary">{m.label}</p>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </div>
  );
}
