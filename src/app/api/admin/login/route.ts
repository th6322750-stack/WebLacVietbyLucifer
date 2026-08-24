import { NextResponse } from "next/server";
import { SESSION_COOKIE, cookieOptions, issueToken, verifyPassword } from "@/lib/admin/auth";

export async function POST(req: Request) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    // Deliberately vague and deliberately slow-ish: no hint about whether a password is even
    // configured, and a small delay to blunt trivial guessing.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ ok: false, error: "Mật khẩu không đúng." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, issueToken(), cookieOptions);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
