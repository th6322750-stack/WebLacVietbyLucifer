import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { isSignedIn } from "@/lib/admin/auth";
import { one, all, run } from "@/lib/db/client";
import { uploadAdapter } from "@/lib/uploads/adapter";

/** Image upload for the admin.
 *
 * Files are handed to an upload adapter and recorded in the `assets` table, so the picker can
 * list what has already been uploaded instead of the admin having to remember filenames.
 *
 * Việc ghi tệp đã chuyển sang `src/lib/uploads/adapter.ts`. Route này không còn biết tệp nằm ở
 * đâu — đó là điều kiện để đổi sang kho lưu trữ ngoài (bắt buộc trên Vercel; xem chú thích
 * BLOCKER trong adapter) mà không phải sửa lại phần kiểm tra chữ ký và khử trùng lặp ở đây.
 *
 * The stored name is the file's SHA-256 plus its real extension. That gives deduplication for
 * free — uploading the same picture twice reuses one file — and means a user-supplied filename
 * never reaches the filesystem, which is what would otherwise make path traversal possible.
 */

const MAX_BYTES = 12 * 1024 * 1024;

// Keyed by the magic bytes actually found in the file, not by the declared MIME type or the
// extension: both of those are attacker-controlled, the leading bytes are the real thing.
const SIGNATURES: { ext: string; mime: string; test: (b: Buffer) => boolean }[] = [
  { ext: "png", mime: "image/png", test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: "jpg", mime: "image/jpeg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "webp", mime: "image/webp", test: (b) => b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP" },
  { ext: "gif", mime: "image/gif", test: (b) => b.subarray(0, 3).toString("ascii") === "GIF" },
  { ext: "avif", mime: "image/avif", test: (b) => b.subarray(4, 8).toString("ascii") === "ftyp" && b.subarray(8, 12).toString("ascii").startsWith("avif") },
];

export async function POST(req: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    file = f instanceof File ? f : null;
  } catch {
    return NextResponse.json({ ok: false, error: "Không đọc được dữ liệu tải lên." }, { status: 400 });
  }

  if (!file) return NextResponse.json({ ok: false, error: "Chưa chọn ảnh." }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: `Ảnh quá lớn (tối đa ${MAX_BYTES / 1024 / 1024}MB).` },
      { status: 413 },
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const sig = SIGNATURES.find((s) => s.test(buf));
  if (!sig) {
    return NextResponse.json(
      { ok: false, error: "Chỉ nhận ảnh PNG, JPG, WebP, GIF hoặc AVIF." },
      { status: 415 },
    );
  }

  const sha = createHash("sha256").update(buf).digest("hex");
  const key = `${sha}.${sig.ext}`;

  const existing = await one<{ id: string; path: string }>(
    "SELECT id, path FROM assets WHERE sha256 = ?",
    [sha],
  );
  // Tệp đã có: trả lại đúng đường dẫn đã lưu chứ không dựng lại đường dẫn theo quy ước cũ. Nếu
  // sau này đổi sang kho ngoài, những tệp cũ vẫn còn ở đường dẫn cũ và vẫn phải dùng được.
  if (existing) {
    return NextResponse.json({ ok: true, path: existing.path, reused: true });
  }

  let stored;
  try {
    stored = await uploadAdapter().put(key, buf, sig.mime);
  } catch (err) {
    // Ghi thất bại phải dừng ở đây. Ghi vào bảng `assets` một dòng trỏ tới tệp không tồn tại là
    // cách tạo ra ảnh vỡ trên trang công khai mà không ai biết cho tới khi khách nhìn thấy.
    console.error("upload adapter write failed", err);
    return NextResponse.json(
      { ok: false, error: "Không lưu được tệp. Kiểm tra cấu hình kho lưu trữ." },
      { status: 500 },
    );
  }

  await run(
    `INSERT INTO assets (id,path,width,height,has_alpha,kind,alt,sha256,uploaded_at)
     VALUES (?,?,NULL,NULL,NULL,?,?,?,?)`,
    [stored.url, stored.url, sig.mime, file.name.slice(0, 200), sha, new Date().toISOString()],
  );

  return NextResponse.json({ ok: true, path: stored.url, reused: false });
}

export async function GET() {
  if (!(await isSignedIn())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }
  const rows = await all<{ path: string; alt: string; uploaded_at: string }>(
    "SELECT path, alt, uploaded_at FROM assets ORDER BY uploaded_at DESC LIMIT 200",
  );
  return NextResponse.json({ ok: true, assets: rows });
}
