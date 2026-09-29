import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isSignedIn } from "@/lib/admin/auth";
import {
  publishWithVerification,
  unpublish,
  type EvidenceKind,
  type EvidenceSubjectType,
} from "@/lib/db/repositories/truth";

/** Ghi trạng thái xác minh — PHUONG_AN §7.6.
 *
 * Tên bảng đi vào một câu SQL, nên nó được đối chiếu với danh sách trắng cố định chứ không phải
 * được kiểm bằng regex hay ghép chuỗi. Tham số hoá không giúp được ở vị trí tên bảng — chỉ danh
 * sách trắng mới giúp.
 */
const TABLES = [
  "pricing_packages",
  "testimonials",
  "metrics",
  "trust_marks",
  "digital_offers",
] as const;
type Table = (typeof TABLES)[number];

const SUBJECT_TYPES: readonly EvidenceSubjectType[] = [
  "testimonial",
  "metric",
  "trust_mark",
  "service",
  "pricing",
];

const KINDS: readonly EvidenceKind[] = [
  "contract",
  "invoice",
  "screenshot",
  "analytics-export",
  "written-consent",
  "other",
];

// Đường dẫn cần làm mới sau mỗi thay đổi. Xuất bản một tuyên bố mà trang tĩnh vẫn giữ bản cũ
// thì thao tác duyệt không có tác dụng gì nhìn thấy được — và người duyệt sẽ bấm lại.
const REVALIDATE = ["/", "/website", "/dich-vu", "/dich-vu-so", "/support-mxh"];

export async function POST(req: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const table = String(body.table ?? "");
  if (!(TABLES as readonly string[]).includes(table)) {
    return NextResponse.json({ ok: false, error: "Bảng không hợp lệ." }, { status: 400 });
  }
  const id = typeof body.id === "string" ? body.id.trim() : "";
  if (!id) return NextResponse.json({ ok: false, error: "Thiếu id." }, { status: 400 });

  try {
    if (body.action === "unpublish") {
      await unpublish(table as Table, id);
      for (const p of REVALIDATE) revalidatePath(p);
      return NextResponse.json({ ok: true });
    }

    const subjectType = String(body.subjectType ?? "");
    if (!(SUBJECT_TYPES as readonly string[]).includes(subjectType)) {
      return NextResponse.json({ ok: false, error: "Loại đối tượng không hợp lệ." }, { status: 400 });
    }

    const rawEvidence = body.evidence as Record<string, unknown> | undefined;
    const disclosure = typeof body.disclosure === "string" ? body.disclosure.trim() : "";

    if (!rawEvidence && !disclosure) {
      return NextResponse.json(
        { ok: false, error: "Cần bằng chứng hoặc ghi chú minh hoạ." },
        { status: 400 },
      );
    }

    let evidence;
    if (rawEvidence) {
      const kind = String(rawEvidence.kind ?? "");
      if (!(KINDS as readonly string[]).includes(kind)) {
        return NextResponse.json({ ok: false, error: "Loại bằng chứng không hợp lệ." }, { status: 400 });
      }
      const note = typeof rawEvidence.note === "string" ? rawEvidence.note.trim() : "";
      if (!note) {
        return NextResponse.json(
          { ok: false, error: "Cần ghi rõ đã xác minh bằng cách nào." },
          { status: 400 },
        );
      }
      evidence = {
        kind: kind as EvidenceKind,
        note,
        sourceUrl: typeof rawEvidence.sourceUrl === "string" ? rawEvidence.sourceUrl : undefined,
        assetId: typeof rawEvidence.assetId === "string" ? rawEvidence.assetId : undefined,
        verifiedAt: new Date().toISOString(),
      };
    }

    const result = await publishWithVerification({
      table: table as Table,
      id,
      subjectType: subjectType as EvidenceSubjectType,
      // KHÔNG lấy từ payload: để phía gọi tự khai ai đã duyệt thì trường đó không còn là bằng
      // chứng về bất cứ điều gì. Nhưng cơ chế đăng nhập hiện tại là MỘT mật khẩu chung, cookie
      // chỉ mang hạn dùng chứ không mang danh tính — nên chỗ này trung thực nhất là ghi "phiên
      // chủ sở hữu", không phải bịa ra một địa chỉ email. Bảng `admin_users` đã tồn tại sẵn cho
      // ngày cookie mang user id (xem src/lib/admin/auth.ts); khi đó giá trị này thay được mà
      // không phải sửa gì khác. Ghi trong blocker.
      verifiedBy: "owner-session",
      evidence,
      disclosure: disclosure || undefined,
    });

    for (const p of REVALIDATE) revalidatePath(p);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("verify write failed", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Lưu thất bại." },
      { status: 500 },
    );
  }
}
