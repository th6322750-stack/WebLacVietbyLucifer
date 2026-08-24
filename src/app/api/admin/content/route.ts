import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isSignedIn } from "@/lib/admin/auth";
import { upsertProject, deleteProject, reorderProjects } from "@/lib/db/repositories/projects";
import { upsertArticle, deleteArticle } from "@/lib/db/repositories/articles";

/** One endpoint for content writes, keyed by `kind`.
 *
 * Every mutation calls revalidatePath so the public pages — which are statically rendered —
 * pick the change up immediately instead of waiting for the next deploy. This is the piece
 * that makes "edit in admin, see it live" true; without it the admin would silently do nothing
 * visible on the site. */
type Body = {
  kind?: unknown;
  action?: unknown;
  data?: Record<string, unknown>;
  slug?: unknown;
  order?: unknown;
};

export async function POST(req: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }

  let b: Body;
  try {
    b = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const kind = b.kind;
  const action = b.action;
  if (kind !== "project" && kind !== "article") {
    return NextResponse.json({ ok: false, error: "Loại nội dung không hợp lệ." }, { status: 400 });
  }

  try {
    if (action === "delete") {
      const slug = typeof b.slug === "string" ? b.slug : "";
      if (!slug) return NextResponse.json({ ok: false, error: "Thiếu slug." }, { status: 400 });
      const ok = kind === "project" ? await deleteProject(slug) : await deleteArticle(slug);
      if (!ok) return NextResponse.json({ ok: false, error: "Không tìm thấy." }, { status: 404 });
    } else if (action === "reorder" && kind === "project") {
      const order = Array.isArray(b.order) ? (b.order as string[]) : [];
      await reorderProjects(order);
    } else {
      const data = b.data ?? {};
      const slug = typeof data.slug === "string" ? data.slug.trim() : "";
      if (!slug) return NextResponse.json({ ok: false, error: "Thiếu slug." }, { status: 400 });
      if (!/^[a-z0-9-]+$/.test(slug)) {
        return NextResponse.json(
          { ok: false, error: "Slug chỉ được dùng chữ thường, số và dấu gạch ngang." },
          { status: 400 },
        );
      }
      if (kind === "project") await upsertProject(data as never);
      else await upsertArticle(data as never);
    }

    for (const p of kind === "project"
      ? ["/", "/du-an", "/website"]
      : ["/", "/kien-thuc"]) {
      revalidatePath(p);
    }
    revalidatePath(kind === "project" ? "/du-an/[slug]" : "/kien-thuc/[slug]", "page");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("content write failed", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Lưu thất bại." },
      { status: 500 },
    );
  }
}
