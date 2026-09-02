"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
 const router = useRouter();
 const [password, setPassword] = useState("");
 const [error, setError] = useState<string | null>(null);
 const [busy, setBusy] = useState(false);

 async function submit(e: React.FormEvent) {
 e.preventDefault();
 setBusy(true);
 setError(null);
 try {
 const res = await fetch("/api/admin/login", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ password }),
 });
 const data = (await res.json()) as { ok: boolean; error?: string };
 if (!data.ok) {
 setError(data.error ?? "Không đăng nhập được.");
 return;
 }
 /* refresh() so the server layout re-reads the new cookie before we navigate. */
 router.replace("/admin");
 router.refresh();
 } catch {
 setError("Không kết nối được máy chủ.");
 } finally {
 setBusy(false);
 }
 }

 return (
 <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
 <input
 type="password"
 value={password}
 autoFocus
 autoComplete="current-password"
 onChange={(e) => setPassword(e.target.value)}
 placeholder="Mật khẩu"
 className="adm-raised rounded-sm border border-black/10 px-4 py-3 text-body adm-text outline-none placeholder:text-black/30 focus:border-white/30"
 />
 {error ? (
 <p role="alert" className="text-small text-state-error">
 {error}
 </p>
 ) : null}
 <button
 type="submit"
 disabled={busy || password.length === 0}
 className="rounded-sm adm-navy-bg px-4 py-3 text-button font-semibold text-white disabled:bg-black/10 disabled:text-black/30"
 >
 {busy ? "Đang kiểm tra…" : "Đăng nhập"}
 </button>
 </form>
 );
}
