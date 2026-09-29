"use client";

/** The stacked-shadow "pop" button.
 *
 * Three nested elements are load-bearing, not decoration — see `.btn-pop` in globals.css:
 * the outer carries the shadow ladder and the translate, the middle carries the gold fill and
 * the animated dot pattern, and the label sits above both so the pattern never washes out the
 * text. Flattening them would lose the pressed-key effect.
 */
export function PopButton({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-pop text-button disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="btn-pop-inner block">
        <span className="btn-pop-label">{children}</span>
      </span>
    </button>
  );
}
