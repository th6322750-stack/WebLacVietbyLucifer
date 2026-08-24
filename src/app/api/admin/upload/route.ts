import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { isSignedIn } from "@/lib/admin/auth";
import { one, all, run } from "@/lib/db/client";

/** Image upload for the admin.
 *
 * Files land in public/assets/uploads and are recorded in the `assets` table, so the picker can
 * list what has already been uploaded instead of the admin having to remember filenames.
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

const UPLOAD_DIR = path.join(process.cwd(), "public", "assets", "uploads");

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
  const filename = `${sha}.${sig.ext}`;
  const publicPath = `/assets/uploads/${filename}`;

  const existing = await one<{ id: string }>("SELECT id FROM assets WHERE sha256 = ?", [sha]);

  if (!existing) {
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(UPLOAD_DIR, filename), buf);
    await run(
      `INSERT INTO assets (id,path,width,height,has_alpha,kind,alt,sha256,uploaded_at)
       VALUES (?,?,NULL,NULL,NULL,?,?,?,?)`,
      [publicPath, publicPath, sig.mime, file.name.slice(0, 200), sha, new Date().toISOString()],
    );
  }

  return NextResponse.json({ ok: true, path: publicPath, reused: Boolean(existing) });
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
