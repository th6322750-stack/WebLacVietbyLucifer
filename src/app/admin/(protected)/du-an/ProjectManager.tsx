"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ProjectRow } from "@/lib/db/repositories/projects";
import { INPUT, Field, Toggle, StatusPill, joinLines, splitLines } from "@/components/admin/form";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { siteSettings } from "@/lib/site-settings";
import { Icon } from "@/components/ui/Icon";
import { assetPath } from "@/lib/assets";
const EMPTY: Partial<ProjectRow> = {
  slug: "",
  title: "",
  category: "",
  summary: "",
  demoOnly: true,
  published: true,
  hidden: false,
};
export function ProjectManager({ initial }: { initial: ProjectRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<Partial<ProjectRow> | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function send(payload: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "project", ...payload }),
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
  const visible = initial.filter((project) => project.published && !project.hidden).length;
  const categories = new Set(initial.map((project) => project.category).filter(Boolean)).size;
  const latest = [...initial].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  return (
    <div className="space-y-5">
      <section className="admin-panel flex flex-col justify-between gap-5 px-5 py-6 md:flex-row md:items-center md:px-7">
        <div>
          <h1 className="font-heading text-[29px] font-bold leading-none text-[#08265a] md:text-[34px]">Quản lý Dự án & Portfolio</h1>
          <p className="mt-3 text-[13px] text-[#60708a]">Tổng cộng <strong className="text-[#143363]">{initial.length}</strong> dự án showcase trên website</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY })}
          className="admin-action admin-action-primary"
        >
          <Icon name="briefcase" size="inline" />
          Thêm dự án mới
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Tổng dự án", value: initial.length, detail: "100% dự án", icon: "users" as const },
          { label: "Đang hiển thị", value: visible, detail: `${initial.length ? Math.round((visible / initial.length) * 100) : 0}% dự án`, icon: "globe" as const },
          { label: "Danh mục", value: categories, detail: "Loại dịch vụ", icon: "briefcase" as const },
          { label: "Cập nhật gần nhất", value: latest ? new Date(latest.updatedAt).toLocaleDateString("vi-VN") : "—", detail: latest?.title ?? "Chưa có dữ liệu", icon: "calendar" as const },
        ].map((stat) => (
          <article key={stat.label} className="admin-stat-card flex min-h-[108px] items-center gap-4 p-4">
            <span className="admin-icon-bubble"><Icon name={stat.icon} size="card" /></span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#697890]">{stat.label}</p>
              <p className="adm-num mt-1 truncate font-heading text-[22px] font-bold text-[#0b2858]">{stat.value}</p>
              <p className="mt-1 truncate text-[10px] text-[#75839a]">{stat.detail}</p>
            </div>
          </article>
        ))}
      </section>

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
        >
          <Icon name="circle-alert" size="inline" /> <span>{error}</span>
        </div>
      ) : null}
      {editing ? (
        <ProjectForm
          value={editing}
          busy={busy}
          onCancel={() => setEditing(null)}
          onSave={(d) => void send({ data: d })}
        />
      ) : null}
      <section className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table w-full min-w-[900px] text-left text-[12px]">
            <thead>
              <tr>
                <th className="px-5 py-4">Dự án & URL</th>
                <th className="px-5 py-4">Danh mục</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4">Cập nhật</th>
                <th className="px-5 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {initial.map((p) => (
                <tr key={p.slug}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="relative h-12 w-[112px] shrink-0 overflow-hidden rounded-lg bg-[#edf3fb]">
                        {p.heroAssetId ? <Image src={p.heroAssetId.startsWith("/") ? p.heroAssetId : assetPath(p.heroAssetId)} alt="" fill sizes="112px" className="object-cover" /> : <span className="grid h-full place-items-center text-[#7d8ca2]"><Icon name="briefcase" size="inline" /></span>}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-[#14243d]">{p.title}</span>
                        <span className="mt-1 block truncate text-[10px] text-[#75839a]">/du-an/{p.slug}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#edf4ff] px-3 py-1 text-[11px] font-medium text-[#1760c7]">{p.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill on={p.published} onLabel="Hiển thị" offLabel="Bản nháp" />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#617089]">{new Date(p.updatedAt).toLocaleString("vi-VN")}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setEditing(p)}
                      className="admin-action !min-h-9 !px-3"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        const ok = window.confirm(`Xoá vĩnh viễn dự án ${p.title}?`);
                        if (ok) void send({ action: "delete", slug: p.slug });
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
      </section>
    </div>
  );
}
function ProjectForm({
  value,
  busy,
  onSave,
  onCancel,
}: {
  value: Partial<ProjectRow>;
  busy: boolean;
  onSave: (d: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState(value);
  const set = (k: keyof ProjectRow, v: unknown) => setF((p) => ({ ...p, [k]: v }));
  const isNew = !value.slug;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...f, results: splitLines(f.results), technology: splitLines(f.technology) });
      }}
      className="rounded-md adm-surface p-6 shadow-2xl backdrop-blur-xl"
    >
      {" "}
      <h3 className="mb-4 text-h4-mobile font-heading adm-navy">
        {" "}
        {isNew ? "Tạo dự án mới" : `Chỉnh sửa: ${value.title}`}{" "}
      </h3>{" "}
      <div className="grid gap-4 md:grid-cols-2">
        {" "}
        <Field label="Slug (đường dẫn URL)" hint={isNew ? "chữ thường, số, gạch ngang" : "cố định"}>
          {" "}
          <input
            required
            value={f.slug ?? ""}
            disabled={!isNew}
            onChange={(e) => set("slug", e.target.value)}
            className={`${INPUT} disabled:opacity-50`}
          />{" "}
        </Field>{" "}
        <Field label="Tên dự án">
          {" "}
          <input
            required
            value={f.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Danh mục dự án">
          {" "}
          <input
            required
            value={f.category ?? ""}
            onChange={(e) => set("category", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <div className="md:col-span-2">
          {" "}
          <ImagePicker
            label="Ảnh bìa dự án (Hero Cover)"
            hint="chọn từ thư viện hoặc tải ảnh lên"
            value={f.heroAssetId}
            onChange={(v) => set("heroAssetId", v)}
          />{" "}
        </div>{" "}
        <Field
          label="Link xem web demo thực tế"
          hint={`để trống sẽ mở Zalo ${siteSettings.zalo}`}
          full
        >
          {" "}
          <input
            type="url"
            value={f.demoUrl ?? ""}
            placeholder="https://..."
            onChange={(e) => set("demoUrl", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Tóm tắt ngắn" full>
          {" "}
          <textarea
            required
            rows={2}
            value={f.summary ?? ""}
            onChange={(e) => set("summary", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Thách thức / Vấn đề của khách hàng" full>
          {" "}
          <textarea
            rows={2}
            value={f.challenge ?? ""}
            onChange={(e) => set("challenge", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Giải pháp triển khai" full>
          {" "}
          <textarea
            rows={2}
            value={f.solution ?? ""}
            onChange={(e) => set("solution", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Kết quả nổi bật (mỗi dòng một ý)">
          {" "}
          <textarea
            rows={3}
            value={joinLines(f.results)}
            onChange={(e) => set("results", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
        <Field label="Công nghệ sử dụng (mỗi dòng một công nghệ)">
          {" "}
          <textarea
            rows={3}
            value={joinLines(f.technology)}
            onChange={(e) => set("technology", e.target.value)}
            className={INPUT}
          />{" "}
        </Field>{" "}
      </div>{" "}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border border-black/10 pt-4">
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
            {busy ? "Đang lưu…" : "Lưu dự án"}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </form>
  );
}
