"use client";

import { useState } from "react";

/** Two-sided card that turns on hover, focus, or tap.
 *
 * See globals.css `.flip-scene` for the 3D mechanics. This component exists for the part CSS
 * cannot do on its own: a phone has no hover, so without a tap fallback half the audience would
 * never see the back of the card at all.
 *
 * Height is fixed by the caller because both faces are absolutely positioned — in 3D they are
 * stacked, not laid out, so nothing else can give the card a height.
 */
export function FlipCard({
  front,
  back,
  className = "",
  height = "min-h-[420px]",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  /** Tailwind height class. Both faces are absolute, so the scene needs an explicit one. */
  height?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-scene ${height} ${className}`}
      data-flipped={flipped ? "true" : undefined}
      // Chạm để lật, chỉ với con trỏ thô — click chuột vào nút ở mặt sau không bao giờ bị
      // nuốt mất bởi một cú lật mà người dùng không yêu cầu.
      //
      // Bỏ qua cú chạm xuất phát từ một phần tử tương tác: nó nổi bọt lên tận đây, nên trước
      // đây chạm "Chọn gói này" trên điện thoại vừa mở form vừa lật thẻ ngược về mặt trước, và
      // khi đóng form thì thẻ đang ở sai mặt.
      onPointerUp={(e) => {
        if (e.pointerType !== "touch") return;
        if ((e.target as HTMLElement).closest("button, a, input, select, textarea")) return;
        setFlipped((v) => !v);
      }}
    >
      <div className="flip-card">
        <div className="flip-face flip-face--front">{front}</div>
        <div className="flip-face flip-face--back">{back}</div>
      </div>
    </div>
  );
}
