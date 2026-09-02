import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/admin/auth";
import { updateLead, type LeadStatus } from "@/lib/db/repositories/leads";

const STATUSES: LeadStatus[] = ["new", "contacted", "won", "lost"];

export async function PATCH(req: Request) {
  // Every admin API checks the session itself. The layout guard only protects pages, and an
  // API route reachable without it would be an open write endpoint.
  if (!(await isSignedIn())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }

  let body: { id?: unknown; status?: unknown; note?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ ok: false, error: "Thiếu mã đơn." }, { status: 400 });

  const patch: { status?: LeadStatus; note?: string } = {};
  if (body.status !== undefined) {
    if (typeof body.status !== "string" || !STATUSES.includes(body.status as LeadStatus)) {
      return NextResponse.json({ ok: false, error: "Trạng thái không hợp lệ." }, { status: 400 });
    }
    patch.status = body.status as LeadStatus;
  }
  if (body.note !== undefined) {
    if (typeof body.note !== "string") {
      return NextResponse.json({ ok: false, error: "Ghi chú không hợp lệ." }, { status: 400 });
    }
    patch.note = body.note.slice(0, 2000);
  }

  const changed = await updateLead(id, patch);
  if (!changed) return NextResponse.json({ ok: false, error: "Không tìm thấy đơn." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
