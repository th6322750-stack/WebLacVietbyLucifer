import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
 title: "Đăng nhập quản trị",
 robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
 if (await isSignedIn()) redirect("/admin");
 return (
 <main className="adm-page adm-text flex min-h-screen items-center justify-center px-4">
 <div className="w-full max-w-[380px]">
 <h1 className="font-heading text-h3-mobile adm-head">Quản trị Lạc Việt</h1>
 <p className="adm-dim mt-2 text-small">Nhập mật khẩu để tiếp tục.</p>
 <LoginForm />
 </div>
 </main>
 );
}
