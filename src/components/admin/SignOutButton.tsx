"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
 const router = useRouter();
 return (
 <button
 type="button"
 onClick={async () => {
 await fetch("/api/admin/login", { method: "DELETE" });
 router.replace("/admin/dang-nhap");
 router.refresh();
 }}
 className="adm-dim rounded-sm border border-black/10 px-3 py-2 text-small hover:adm-text"
 >
 Đăng xuất
 </button>
 );
}
