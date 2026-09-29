import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/admin/auth";
import { seedFromFixtures } from "@/lib/db/migrate";

/** Copies the src/content/*.ts fixtures into the database.
 *
 * ON CONFLICT DO NOTHING, so it is safe to call repeatedly: an admin edit always wins over the
 * fixture and a second run legitimately reports zeros. The .ts files are NOT deleted — they
 * stay as the reference copy until Lucifer confirms the database is right. */
export async function POST() {
  if (!(await isSignedIn())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }
  try {
    return NextResponse.json({ ok: true, seeded: await seedFromFixtures() });
  } catch (err) {
    console.error("seed failed", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Nạp dữ liệu thất bại." },
      { status: 500 },
    );
  }
}
