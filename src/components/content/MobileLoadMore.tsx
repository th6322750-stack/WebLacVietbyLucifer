"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** MASTER PARITY V4 / P0-MOBILE-COMPOSITION.
 *
 * Several approved 390 compositions show only the first N items with a load-more control, while
 * the 1440 master shows the full grid — `/du-an` renders 4 of 12 behind "Xem thêm dự án", and
 * `/kien-thuc` does the same for its latest-article rows.
 *
 * The extra items stay in the DOM (so they are server-rendered, crawlable and available without
 * JS) but are hidden at mobile widths until the control is used. Above `lg` everything is
 * visible and the control is hidden, so the desktop composition is untouched. */
export function MobileLoadMore({
  initial,
  label,
  children,
}: {
  /** How many children stay visible at mobile width before expanding. */
  initial: number;
  label: string;
  children: ReactNode[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = children.length > initial;

  return (
    <>
      {children.map((child, i) => {
        const hiddenOnMobile = !expanded && i >= initial;
        return (
          <div key={i} className={hiddenOnMobile ? "hidden lg:block" : undefined}>
            {child}
          </div>
        );
      })}

      {hasMore && !expanded ? (
        <div className="col-span-full flex justify-center lg:hidden">
          <Button variant="outline" onClick={() => setExpanded(true)}>
            {label}
            <Icon name="chevron-down" size="inline" />
          </Button>
        </div>
      ) : null}
    </>
  );
}
