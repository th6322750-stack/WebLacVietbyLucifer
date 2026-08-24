"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ArticleRow } from "@/lib/db/repositories/articles";
import type { ArticleSection } from "@/lib/types";
import { INPUT, Field, Toggle, StatusPill } from "@/components/admin/form";
import { Icon } from "@/components/ui/Icon";
import { assetPath } from "@/lib/assets";
const EMPTY: Partial<ArticleRow> = {
  slug: "",
  title: "",
  category: "",
  excerpt: "",
  content: [],
  author: "Lạc Việt Media",
  demoOnly: true,
  published: true,
};
export function ArticleManager({ initial }: { initial: ArticleRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<Partial<ArticleRow> | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  async function send(payload: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "article", ...payload }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Lưu thất bại.");
        return;
      }
      setEditing(null);
      startTransition(() => router.refresh());
    } catch {
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setBusy(false);
    }
  }
  const categoryNames = [...new Set(initial.map((article) => article.category).filter(Boolean))];
  const published = initial.filter((article) => article.published).length;
  const shown = initial.filter((article) => {
    const matchesQuery = !query || `${article.title} ${article.slug}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || article.category === category;
    const matchesStatus = status === "all" || (status === "published" ? article.published : !article.published);
    return matchesQuery && matchesCategory && matchesStatus;
  });
  return (
    <div className="space-y-4">
      <section className="flex flex-col justify-between gap-5 px-1 py-2 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <span className="admin-icon-bubble rounded-xl"><Icon name="sparkles" size="card" /></span>
          <div>
            <h1 className="font-heading text-[29px] font-bold leading-none text-[#08265a] md:text-[34px]">Quản lý Bài viết & Kiến thức</h1>
            <p className="mt-3 text-[13px] text-[#60708a]">Tổng cộng <strong className="text-[#143363]">{initial.length}</strong> bài viết chuyên sâu trên trang kiến thức</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY })}
          className="admin-action admin-action-primary"
        >
          <Icon name="sparkles" size="inline" />
          Viết bài mới
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Tổng bài viết", value: initial.length, detail: "Bài viết đã tạo", icon: "sparkles" as const, tone: "blue" },
          { label: "Đã xuất bản", value: published, detail: `${initial.length ? Math.round((published / initial.length) * 100) : 0}% bài viết`, icon: "send" as const, tone: "green" },
          { label: "Bản nháp", value: initial.length - published, detail: "Chưa xuất bản", icon: "clock" as const, tone: "blue" },
          { label: "Mục nội dung", value: initial.reduce((sum, article) => sum + article.content.length, 0), detail: "Tổng số phân mục", icon: "target" as const, tone: "blue" },
          { label: "Chủ đề", value: categoryNames.length, detail: "Danh mục nội dung", icon: "star" as const, tone: "amber" },
        ].map((stat) => (
          <article key={stat.label} className="admin-stat-card flex min-h-[108px] items-center gap-4 p-4">
            <span className="admin-icon-bubble" data-tone={stat.tone === "blue" ? undefined : stat.tone}><Icon name={stat.icon} size="card" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#697890]">{stat.label}</p>
              <p className="adm-num mt-1 font-heading text-[23px] font-bold text-[#0b2858]">{stat.value}</p>
              <p className="mt-1 truncate text-[10px] text-[#75839a]">{stat.detail}</p>
            </div>
          </article>
        ))}
      </section>

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-sm border border-state-error/40 bg-state-error/15 p-4 text-small text-state-error"
        >
          {" "}
          <Icon name="circle-alert" size="inline" /> <span>{error}</span>{" "}
        </div>
      ) : null}
      {editing ? (
        <ArticleForm
          value={editing}
          busy={busy}
          onCancel={() => setEditing(null)}
          onSave={(d) => void send({ data: d })}
        />
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_210px_190px_145px]">
        <label className="relative">
          <Icon name="search" size="inline" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7890ad]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm bài viết..." className="h-11 w-full rounded-xl border border-[#dce4ef] bg-white pl-[42px] pr-4 text-[12px] outline-none focus:border-[#8db6ef]" />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-xl border border-[#dce4ef] bg-white px-3 text-[12px] text-[#52617a] outline-none">
          <option value="all">Tất cả chuyên mục</option>
          {categoryNames.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-[#dce4ef] bg-white px-3 text-[12px] text-[#52617a] outline-none">
          <option value="all">Tất cả trạng thái</option>
          <option value="published">Hiển thị</option>
          <option value="draft">Bản nháp</option>
        </select>
        <span className="grid h-11 place-items-center rounded-xl border border-[#dce4ef] bg-white text-[12px] font-medium text-[#52617a]">Mới nhất</span>
      </section>

      <section className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table w-full min-w-[900px] text-left text-[12px]">
            <thead>
              <tr>
                <th className="px-5 py-4">Tiêu đề bài viết</th>
                <th className="px-5 py-4">Chuyên mục</th>
                <th className="px-5 py-4">Ngày xuất bản</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((a) => (
                <tr key={a.slug}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-[#edf3fb]">
                        {a.coverAssetId ? <Image src={assetPath(a.coverAssetId)} alt="" fill sizes="64px" className="object-cover" /> : <span className="grid h-full place-items-center text-[#7d8ca2]"><Icon name="sparkles" size="inline" /></span>}
                      </span>
                      <span className="min-w-0">
                        <span className="block max-w-[520px] truncate font-semibold text-[#14243d]">{a.title}</span>
                        <span className="mt-1 block max-w-[520px] truncate text-[10px] text-[#75839a]">/kien-thuc/{a.slug}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#edf4ff] px-3 py-1 text-[10px] font-medium text-[#1760c7]">{a.category}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#617089]">{a.publishedAt}</td>
                  <td className="px-5 py-4">
                    <StatusPill on={a.published} onLabel="Hiển thị" offLabel="Bản nháp" />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setEditing(a)}
                      className="admin-action !min-h-9 !px-3"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        const ok = window.confirm(`Xoá vĩnh viễn bài viết ${a.title}?`);
                        if (ok) void send({ action: "delete", slug: a.slug });
                      }}
                      className="admin-action ml-2 !min-h-9 !border-red-200 !px-3 !text-red-500 hover:!bg-red-50"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#e5ebf3] px-5 py-3 text-[11px] text-[#718098]">Hiển thị {shown.length} trong tổng số {initial.length} bài viết</div>
      </section>
    </div>
  );
}
function ArticleForm({
  value,
  busy,
  onSave,
  onCancel,
}: {
  value: Partial<ArticleRow>;
  busy: boolean;
  onSave: (d: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(value);
  const [sections, setSections] = useState<ArticleSection[]>(value.content ?? []);
  const set = (k: keyof ArticleRow, v: unknown) => setF((p) => ({ ...p, [k]: v }));
  const isNew = !value.slug;
  function patchSection(i: number, patch: Partial<ArticleSection>) {
    setSections((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  }
  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: `phan-${prev.length + 1}-${Date.now().toString(36)}`, heading: "", body: [""] },
    ]);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const cleaned = sections
          .map((s) => ({ ...s, body: s.body.map((b) => b.trim()).filter(Boolean) }))
          .filter((s) => s.heading.trim() || s.body.length);
        onSave({ ...f, content: cleaned });
      }}
      className="rounded-md adm-surface p-6 shadow-2xl backdrop-blur-xl"
    >
      {" "}
      <h3 className="mb-4 text-h4-mobile font-heading adm-navy">
        {" "}
        {isNew ? "Viết bài viết mới" : `Chỉnh sửa: ${value.title}`}{" "}
      </h3>{" "}
      <div className="grid gap-4 md:grid-cols-2">
        {" "}
        <Field label="Slug (đường dẫn URL)" hint={isNew ? "chữ thường, gạch ngang" : "cố định"}>
          {" "}
          <input
            required
            value={f.slug ?? ""}
            disabled={!isNew}
            onChange={(e) => set("slug", e.target.value)}
            className={`${INPUT} disabled:opacity-50`}
          />{" "}
        </Field>{" "}
        <Field label="Tiêu đề bài viết">
          {" "}
          <input
            required
            value={f.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Chuyên mục">
          {" "}
          <input
            required
            value={f.category ?? ""}
            onChange={(e) => set("category", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Ngày đăng (YYYY-MM-DD)">
          {" "}
          <input
            required
            value={f.publishedAt ?? ""}
            onChange={(e) => set("publishedAt", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Tác giả">
          {" "}
          <input
            required
            value={f.author ?? ""}
            onChange={(e) => set("author", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Tóm tắt bài viết (Meta Excerpt)" full>
          {" "}
          <textarea
            required
            rows={2}
            value={f.excerpt ?? ""}
            onChange={(e) => set("excerpt", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
      </div>{" "}
      <div className="mt-6 border-t border border-black/10 pt-5">
        {" "}
        <div className="flex items-center justify-between">
          {" "}
          <div>
            {" "}
            <h4 className="text-small font-bold adm-text">
              Nội dung theo từng phần (H2 Section)
            </h4>{" "}
            <p className="text-caption adm-faint">{sections.length} phần nội dung</p>{" "}
          </div>{" "}
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-1 rounded-sm border border-black/10 adm-raised px-3 py-1 text-caption font-medium adm-text hover:adm-navy-bg/10"
          >
            {" "}
            + Thêm phần mới{" "}
          </button>{" "}
        </div>{" "}
        <div className="mt-4 space-y-4">
          {" "}
          {sections.map((s, i) => (
            <div
              key={s.id}
              className="rounded-sm border border-black/10 adm-raised p-4 shadow-inner"
            >
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <span className="flex size-6 items-center justify-center rounded-full adm-navy-bg/20 text-caption font-bold adm-navy">
                  {" "}
                  {i + 1}{" "}
                </span>{" "}
                <input
                  value={s.heading}
                  placeholder="Nhập tiêu đề phần mục (VD: 1. Tại sao cần chạy quảng cáo?)"
                  onChange={(e) => patchSection(i, { heading: e.target.value })}
                  className={INPUT}
                />{" "}
                <button
                  type="button"
                  onClick={() => setSections((prev) => prev.filter((_, j) => j !== i))}
                  className="rounded-sm border border-state-error/30 bg-state-error/10 px-2 py-2 text-caption text-state-error hover:bg-state-error/20"
                >
                  {" "}
                  Xoá{" "}
                </button>{" "}
              </div>{" "}
              <textarea
                rows={4}
                value={s.body.join("\n\n")}
                placeholder="Nhập đoạn văn chi tiết. Cách nhau một dòng trống để tạo đoạn mới."
                onChange={(e) => patchSection(i, { body: e.target.value.split(/\n{2,}/) })}
                className={`${INPUT} mt-3`}
              />{" "}
            </div>
          ))}{" "}
          {sections.length === 0 ? (
            <div className="rounded-sm adm-surface p-6 text-center text-caption adm-faint">
              {" "}
              Chưa có nội dung. Bấm &quot;+ Thêm phần mới&quot; để bắt đầu soạn bài.{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border border-black/10 pt-4">
        {" "}
        <div className="flex gap-4">
          {" "}
          <Toggle
            checked={f.published ?? true}
            onChange={(v) => set("published", v)}
            label="Hiển thị trên website"
          />{" "}
          <Toggle
            checked={f.demoOnly ?? true}
            onChange={(v) => set("demoOnly", v)}
            label="Gắn nhãn minh hoạ"
          />{" "}
        </div>{" "}
        <div className="flex gap-2">
          {" "}
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm border border-black/10 adm-raised px-4 py-2 text-small adm-dim hover:adm-text"
          >
            {" "}
            Huỷ{" "}
          </button>{" "}
          <button
            type="submit"
            disabled={busy}
            className=" rounded-sm adm-navy-bg px-5 py-2 text-small font-bold text-white shadow-md"
          >
            {" "}
            {busy ? "Đang lưu…" : "Lưu bài viết"}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </form>
  );
}
