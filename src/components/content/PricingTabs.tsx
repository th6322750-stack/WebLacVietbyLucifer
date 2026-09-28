"use client";

import { useCallback, useId, useRef, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { PricingCard, type Package } from "@/components/content/PricingCard";
import { CompactInquiryPackage } from "@/components/content/CompactInquiryPackage";
import { useConsultation } from "@/components/conversion/ConsultationProvider";

/** Two pricing modes behind a tab strip — PHUONG_AN §6.5.
 *
 * Both panels stay in the DOM. Unmounting the hidden one would be cheaper, but it costs the
 * thing that matters more: a visitor searching the page with Ctrl+F, and a crawler reading it,
 * both only see whichever tab happened to be open. `hidden` keeps the markup and removes it from
 * the accessibility tree at the same time.
 *
 * Keyboard follows the APG tabs pattern — arrows move between tabs, Home/End jump to the ends,
 * and only the active tab is in the tab order, so Tab moves past the strip into the panel rather
 * than walking through every tab first.
 */
export function PricingTabs({
  groups,
  commitments,
  sourceComponent = "pricing-tabs",
  ariaLabel = "Chọn hình thức báo giá",
}: {
  groups: { id: string; label: string; intro?: string; packages: Package[] }[];
  /** Shown on each card's back face. Same for every package — a company-level commitment, not a
   *  per-package promise. */
  commitments?: string[];
  /** Passed to analytics so a click can be traced to the surface it came from. */
  sourceComponent?: string;
  ariaLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (groups.length === 0) return null;

  // A single group needs no tab strip at all — a control with one option is noise.
  if (groups.length === 1) {
    const only = groups[0]!;
    return (
      <div>
        {only.intro ? (
          <p className="mx-auto mt-3 max-w-editorial text-center text-small text-text-muted">{only.intro}</p>
        ) : null}
        <PackageGrid packages={only.packages} commitments={commitments} sourceComponent={sourceComponent} />
      </div>
    );
  }

  const move = (next: number) => {
    const clamped = (next + groups.length) % groups.length;
    setActive(clamped);
    tabRefs.current[clamped]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        move(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        move(index - 1);
        break;
      case "Home":
        event.preventDefault();
        move(0);
        break;
      case "End":
        event.preventDefault();
        move(groups.length - 1);
        break;
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-pill border border-gold-500/25 bg-white p-1"
      >
        {groups.map((group, index) => {
          const selected = index === active;
          return (
            <button
              key={group.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`min-h-touch rounded-pill px-5 py-2 text-button font-semibold transition-colors duration-normal ease-standard ${
                selected
                  ? "bg-gold-metallic text-ink-950 shadow-sm"
                  : "text-text-secondary hover:text-gold-700"
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      {groups.map((group, index) => (
        <div
          key={group.id}
          role="tabpanel"
          id={`${baseId}-panel-${group.id}`}
          aria-labelledby={`${baseId}-tab-${group.id}`}
          hidden={index !== active}
          tabIndex={0}
        >
          {group.intro ? (
            <p className="mx-auto mt-6 max-w-editorial text-center text-small text-text-muted">{group.intro}</p>
          ) : null}
          <PackageGrid packages={group.packages} commitments={commitments} sourceComponent={sourceComponent} />
        </div>
      ))}
    </div>
  );
}

/** Grid sizes itself from the data. A single package centres rather than stretching to fill a
 *  three-column track, which is what "Theo yêu cầu" needs without a special case. */
function PackageGrid({
  packages,
  commitments,
  sourceComponent,
}: {
  packages: Package[];
  commitments?: string[];
  sourceComponent: string;
}) {
  const { open } = useConsultation();
  if (packages.length === 0) return null;

  // Một gói duy nhất dùng panel ngang, không phải thẻ lật cao 520px (UI V6 §5.4). Chiều cao cố
  // định đó tồn tại để nhiều thẻ thẳng mép nhau; với một thẻ nó chỉ để lại khoảng trắng, và
  // thao tác lật thì che mất CTA mà chẳng phục vụ so sánh nào.
  if (packages.length === 1) {
    const only = packages[0]!;
    return (
      <div className="mt-8">
        <CompactInquiryPackage
          pkg={only}
          commitments={commitments}
          onSelect={() => open(sourceComponent, only.plan)}
        />
      </div>
    );
  }

  return <PackageRail packages={packages} commitments={commitments} sourceComponent={sourceComponent} />;
}

/** Nhiều gói: lưới ở desktop, rail scroll-snap ở mobile — UI V6 §6.1.
 *
 * Ba thẻ giá cao 520px xếp dọc ở 390px là hơn 1.500px chỉ để so sánh ba con số, và khách phải
 * cuộn qua hết thẻ đầu mới biết có thẻ thứ hai. Rail đặt chúng cạnh nhau: mép thẻ kế lộ ra làm
 * tín hiệu còn nội dung bên phải, và Prev/Next cho người không kéo được bằng ngón tay.
 *
 * `scroll-snap` chứ không phải carousel có state: trình duyệt tự lo vị trí dừng, nên không có
 * index nào để lệch khi người dùng vừa vuốt vừa bấm nút.
 */
function PackageRail({
  packages,
  commitments,
  sourceComponent,
}: {
  packages: Package[];
  commitments?: string[];
  sourceComponent: string;
}) {
  const { open } = useConsultation();
  const trackRef = useRef<HTMLDivElement>(null);

  const step = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Bước bằng đúng bề rộng một thẻ đầu tiên, không phải một số px cứng — thẻ co giãn theo
    // viewport nên số cứng sẽ trượt dần sau vài lần bấm.
    const card = el.firstElementChild as HTMLElement | null;
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-8">
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
      >
        {packages.map((pkg) => (
          <div
            key={pkg.plan}
            className="w-[85%] shrink-0 snap-start md:w-auto md:shrink"
          >
            <PricingCard
              {...pkg}
              commitments={commitments}
              onSelect={() => open(sourceComponent, pkg.plan)}
            />
          </div>
        ))}
      </div>

      {/* Chỉ mobile: ở desktop mọi thẻ đã hiện cùng lúc nên nút điều hướng không có việc gì. */}
      <div className="mt-4 flex justify-center gap-3 md:hidden">
        <IconButton icon="arrow-left" label="Gói trước" onClick={() => step(-1)} />
        <IconButton icon="arrow-right" label="Gói tiếp theo" onClick={() => step(1)} />
      </div>
    </div>
  );
}
