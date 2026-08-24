/** Category tag with a stable per-name colour.
 *
 * The colour comes from hashing the label rather than from a hand-kept mapping: a new category
 * gets a colour immediately, the same category always looks the same, and nobody has to
 * remember to add an entry. Eight buckets — enough to tell neighbours apart, few enough that
 * every pair stays legible (see .tag-* in globals.css).
 */
export function Tag({ label, className = "" }: { label: string; className?: string }) {
 let h = 0;
 for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
 return (
 <span className={`tag-${h % 8} inline-block rounded-xs px-2 py-1 text-caption font-medium ${className}`}>
 {label}
 </span>
 );
}
