"use client";

import { useEffect, useRef, useState } from "react";
import { ASSET_PATHS } from "@/lib/assets";

/** Visual image field: shows the picture, not a filename.
 *
 * The stored value is either a pinned asset id from src/lib/assets.ts (what the existing
 * records use) or a public path like /assets/uploads/<sha>.png from an upload. Both are kept:
 * the delivered artwork is registered by id and must stay that way, while anything uploaded
 * here has no id to register.
 *
 * A plain <img> rather than next/image, on purpose: uploads are unknown at build time and this
 * is an admin-only thumbnail, so the optimiser adds cost with no benefit.
 */

type Asset = { path: string; alt: string; uploaded_at: string };

export function ImagePicker({
 value,
 onChange,
 label = "Ảnh",
 hint,
}: {
 value?: string;
 onChange: (v: string) => void;
 label?: string;
 hint?: string;
}) {
 const inputRef = useRef<HTMLInputElement>(null);
 const [busy, setBusy] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [library, setLibrary] = useState<Asset[] | null>(null);
 const [showLibrary, setShowLibrary] = useState(false);

 useEffect(() => {
 if (!showLibrary || library) return;
 void (async () => {
 try {
 const res = await fetch("/api/admin/upload");
 const data = (await res.json()) as { ok: boolean; assets?: Asset[] };
 setLibrary(data.ok ? (data.assets ?? []) : []);
 } catch {
 setLibrary([]);
 }
 })();
 }, [showLibrary, library]);

 async function upload(file: File) {
 setBusy(true);
 setError(null);
 try {
 const fd = new FormData();
 fd.append("file", file);
 const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
 const data = (await res.json()) as { ok: boolean; path?: string; error?: string };
 if (!data.ok || !data.path) {
 setError(data.error ?? "Tải ảnh thất bại.");
 return;
 }
 onChange(data.path);
 setLibrary(null);
 } catch {
 setError("Không kết nối được máy chủ.");
 } finally {
 setBusy(false);
 }
 }

 const preview = toPreviewSrc(value);

 return (
 <div className="flex flex-col gap-1">
 <span className="adm-dim text-caption font-medium">
 {label}
 {hint ? <span className="adm-faint ml-1 font-normal">({hint})</span> : null}
 </span>

 <div className="flex items-start gap-3">
 <div className="adm-raised grid size-20 shrink-0 place-items-center overflow-hidden rounded-sm border border-black/10">
 {preview ? (
 /* eslint-disable-next-line @next/next/no-img-element -- see note above */
 <img src={preview} alt="" className="size-full object-cover" />
 ) : (
 <span className="adm-faint text-caption">Chưa có</span>
 )}
 </div>

 <div className="flex min-w-0 flex-1 flex-col gap-2">
 <div className="flex flex-wrap gap-2">
 <button
 type="button"
 disabled={busy}
 onClick={() => inputRef.current?.click()}
 className="rounded-sm adm-navy-bg px-3 py-2 text-small font-semibold text-white disabled:bg-black/10 disabled:text-black/30"
 >
 {busy ? "Đang tải…" : "Tải ảnh lên"}
 </button>
 <button
 type="button"
 onClick={() => setShowLibrary((v) => !v)}
 className="adm-dim rounded-sm border border-black/10 px-3 py-2 text-small hover:adm-text"
 >
 {showLibrary ? "Đóng thư viện" : "Chọn ảnh đã có"}
 </button>
 {value ? (
 <button
 type="button"
 onClick={() => onChange("")}
 className="rounded-sm px-3 py-2 text-small text-state-error"
 >
 Bỏ ảnh
 </button>
 ) : null}
 </div>

 <input
 value={value ?? ""}
 onChange={(e) => onChange(e.target.value)}
 placeholder="hoặc nhập mã ảnh, ví dụ project-cover-01"
 className="adm-raised w-full rounded-sm border border-black/10 px-3 py-2 text-caption adm-text outline-none placeholder:text-black/30 focus:border-white/30"
 />

 {error ? (
 <p role="alert" className="text-caption text-state-error">
 {error}
 </p>
 ) : null}
 </div>
 </div>

 <input
 ref={inputRef}
 type="file"
 accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
 hidden
 onChange={(e) => {
 const f = e.target.files?.[0];
 if (f) void upload(f);
 e.target.value = "";
 }}
 />

 {showLibrary ? (
 <div className="adm-raised mt-2 rounded-sm border border-black/10 p-2">
 {library === null ? (
 <p className="adm-faint py-4 text-center text-caption">Đang tải…</p>
 ) : library.length === 0 ? (
 <p className="adm-faint py-4 text-center text-caption">Chưa có ảnh nào được tải lên.</p>
 ) : (
 <div className="grid max-h-[220px] grid-cols-6 gap-2 overflow-y-auto">
 {library.map((a) => (
 <button
 key={a.path}
 type="button"
 title={a.alt}
 onClick={() => {
 onChange(a.path);
 setShowLibrary(false);
 }}
 className={`overflow-hidden rounded-sm border ${
 value === a.path ? "border-black/30" : "border-black/10"
 }`}
 >
 {/* eslint-disable-next-line @next/next/no-img-element -- see note above */}
 <img src={a.path} alt={a.alt} className="aspect-square w-full object-cover" />
 </button>
 ))}
 </div>
 )}
 </div>
 ) : null}
 </div>
 );
}

/** Uploads are already public paths. Pinned ids resolve through the same registry the site
 * renders from, so records referencing ids still show a real thumbnail. The registry is plain
 * data with no server imports, so using it in a client component costs nothing. */
function toPreviewSrc(value?: string): string | null {
 if (!value) return null;
 if (value.startsWith("/")) return value;
 return ASSET_PATHS[value] ?? null;
}
