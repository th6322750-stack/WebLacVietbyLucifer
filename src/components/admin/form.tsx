"use client";

/** Shared form primitives for the admin.
 *
 * Kept out of components/ui on purpose: that folder belongs to the public site and is being
 * reworked in parallel. Nothing here should change shape underneath the admin, or vice versa.
 *
 * Only tokens this project actually declares are used. Its Tailwind theme REPLACES the defaults
 * — there is no `blue`, no spacing step 1.5 — and a class outside that set emits no CSS at all
 * rather than failing loudly.
 */

export const INPUT =
 "w-full rounded-xl border border-[#dce4ef] bg-[#f8fafe] px-3 py-2.5 text-small adm-text outline-none placeholder:text-black/30 focus:border-[#8db6ef] focus:bg-white";

export function Field({
 label,
 hint,
 full,
 children,
}: {
 label: string;
 hint?: string;
 full?: boolean;
 children: React.ReactNode;
}) {
 return (
 <label className={`flex flex-col gap-1 ${full ? "md:col-span-2" : ""}`}>
 <span className="adm-dim text-caption font-medium">
 {label}
 {hint ? <span className="adm-faint ml-1 font-normal">({hint})</span> : null}
 </span>
 {children}
 </label>
 );
}

export function Toggle({
 checked,
 onChange,
 label,
}: {
 checked: boolean;
 onChange: (v: boolean) => void;
 label: string;
}) {
 return (
 <label className="adm-dim flex cursor-pointer select-none items-center gap-2 text-small">
 <input
 type="checkbox"
 checked={checked}
 onChange={(e) => onChange(e.target.checked)}
 className="size-4 accent-ink-950"
 />
 {label}
 </label>
 );
}

export function StatusPill({ on, onLabel, offLabel }: { on: boolean; onLabel: string; offLabel: string }) {
 return (
 <span
 className={`admin-status ${
 on ? "admin-status-green" : "admin-status-amber"
 }`}
 >
 {on ? onLabel : offLabel}
 </span>
 );
}

/** A textarea edits a list as one item per line; these convert at the boundary so what is
 * stored stays a real array rather than a blob of text. */
export const joinLines = (v: unknown): string =>
 Array.isArray(v) ? v.join("\n") : typeof v === "string" ? v : "";

export const splitLines = (v: unknown): string[] | undefined => {
 const s = joinLines(v);
 const out = s
 .split("\n")
 .map((x) => x.trim())
 .filter(Boolean);
 return out.length ? out : undefined;
};
