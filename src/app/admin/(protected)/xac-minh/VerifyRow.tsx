"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { ClaimState } from "@/lib/content-truth";

type Row = {
  id: string;
  label: string;
  meta: string;
  claimState: ClaimState;
  verifiedAt: string | null;
  live: boolean;
};

const CLAIM_LABELS: Record<ClaimState, { text: string; className: string }> = {
  verified: { text: "Đã xác minh", className: "bg-[#e6f6ed] text-[#1a7f45]" },
  "system-derived": { text: "Hệ thống suy ra", className: "bg-[#eef3fb] text-[#08265a]" },
  demo: { text: "Minh hoạ", className: "bg-[#fff8e8] text-[#b07a12]" },
  unverified: { text: "Chưa xác minh", className: "bg-[#fdeced] text-[#b3261e]" },
};

const EVIDENCE_KINDS = [
  { value: "contract", label: "Hợp đồng" },
  { value: "invoice", label: "Hoá đơn" },
  { value: "screenshot", label: "Ảnh chụp màn hình" },
  { value: "analytics-export", label: "Kết xuất analytics" },
  { value: "written-consent", label: "Văn bản đồng ý" },
  { value: "other", label: "Khác" },
];

/** Một hàng trong bảng xác minh.
 *
 * Hai lối xuất bản, và giao diện cố ý không cho trộn hai lối đó: hoặc đính kèm bằng chứng (thành
 * "đã xác minh"), hoặc viết một câu ghi chú minh hoạ sẽ hiện cho khách đọc (thành "minh hoạ").
 * Không có nút nào cho phép đánh dấu "đã xác minh" mà không nói được xác minh bằng gì — nếu có,
 * cột trạng thái sẽ chỉ ghi lại ý kiến của người bấm nút, đúng thứ mà mô hình này thay thế.
 */
export function VerifyRow({
  row,
  table,
  subjectType,
}: {
  row: Row;
  table: string;
  subjectType: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"evidence" | "disclosure">("evidence");
  const [kind, setKind] = useState("contract");
  const [note, setNote] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [disclosure, setDisclosure] = useState("");
  const [error, setError] = useState<string | null>(null);

  const claim = CLAIM_LABELS[row.claimState];

  async function send(body: Record<string, unknown>) {
    setError(null);
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, subjectType, id: row.id, ...body }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      setError(data.error ?? "Không lưu được.");
      return;
    }
    setOpen(false);
    startTransition(() => router.refresh());
  }

  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-[#08265a]">{row.label}</p>
          <p className="mt-0.5 truncate text-[12px] text-[#5a6b85]">{row.meta}</p>
        </div>

        <span className={`rounded-pill px-3 py-1 text-[11px] font-semibold ${claim.className}`}>
          {claim.text}
        </span>

        {/* "Đang hiện" là câu hỏi khác với "đã xác minh": một mục đã xác minh nhưng chưa bật
            publish thì vẫn không ai nhìn thấy, và ngược lại một mục minh hoạ có ghi chú thì
            vẫn hiện. Tách hai cột để không phải đoán. */}
        <span
          className={`inline-flex items-center gap-1 rounded-pill px-3 py-1 text-[11px] font-semibold ${
            row.live ? "bg-[#e6f6ed] text-[#1a7f45]" : "bg-[#f2f4f8] text-[#5a6b85]"
          }`}
        >
          <Icon name={row.live ? "circle-check" : "circle-alert"} size="inline" />
          {row.live ? "Đang hiện" : "Đang ẩn"}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="min-h-touch rounded-lg border border-[#dfe6f0] px-3 text-[12px] font-semibold text-[#08265a] hover:bg-[#f6f9fd]"
          >
            {open ? "Đóng" : "Xuất bản…"}
          </button>
          {row.live ? (
            <button
              type="button"
              disabled={pending}
              onClick={() => void send({ action: "unpublish" })}
              className="min-h-touch rounded-lg border border-[#f3c4c1] px-3 text-[12px] font-semibold text-[#b3261e] hover:bg-[#fdeced] disabled:opacity-50"
            >
              Gỡ xuống
            </button>
          ) : null}
        </div>
      </div>

      {row.verifiedAt ? (
        <p className="mt-2 text-[11px] text-[#5a6b85]">Xác minh lúc {row.verifiedAt}</p>
      ) : null}

      {open ? (
        <div className="mt-4 rounded-xl border border-[#dfe6f0] bg-[#f9fbfe] p-4">
          <div className="flex flex-wrap gap-2">
            <ModeButton active={mode === "evidence"} onClick={() => setMode("evidence")}>
              Đính kèm bằng chứng
            </ModeButton>
            <ModeButton active={mode === "disclosure"} onClick={() => setMode("disclosure")}>
              Xuất bản dạng minh hoạ
            </ModeButton>
          </div>

          {mode === "evidence" ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-[12px] font-semibold text-[#08265a]">
                Loại bằng chứng
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  className="mt-1 min-h-touch w-full rounded-lg border border-[#dfe6f0] px-3 text-[13px] font-normal"
                >
                  {EVIDENCE_KINDS.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[12px] font-semibold text-[#08265a]">
                Đường dẫn nguồn (nếu có)
                <input
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://…"
                  className="mt-1 min-h-touch w-full rounded-lg border border-[#dfe6f0] px-3 text-[13px] font-normal"
                />
              </label>
              <label className="text-[12px] font-semibold text-[#08265a] md:col-span-2">
                Ghi chú — xác minh bằng cách nào
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: hợp đồng số 24/2026 ký ngày 12/03, bản scan lưu tại Drive."
                  className="mt-1 w-full rounded-lg border border-[#dfe6f0] p-3 text-[13px] font-normal"
                />
              </label>
              <div className="md:col-span-2">
                <button
                  type="button"
                  disabled={pending || note.trim().length === 0}
                  onClick={() =>
                    void send({
                      action: "publish",
                      evidence: {
                        kind,
                        note: note.trim(),
                        sourceUrl: sourceUrl.trim() || undefined,
                        verifiedAt: new Date().toISOString(),
                      },
                    })
                  }
                  className="min-h-touch rounded-lg bg-[#08265a] px-4 text-[12px] font-semibold text-white disabled:opacity-40"
                >
                  Ghi bằng chứng và xuất bản
                </button>
                {note.trim().length === 0 ? (
                  <p className="mt-2 text-[11px] text-[#5a6b85]">
                    Bắt buộc có ghi chú: sáu tháng sau, &quot;đã xác minh&quot; mà không nói được
                    xác minh bằng gì thì không khác gì chưa xác minh.
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <label className="text-[12px] font-semibold text-[#08265a]">
                Ghi chú minh hoạ — câu này sẽ HIỆN cho khách đọc
                <textarea
                  value={disclosure}
                  onChange={(e) => setDisclosure(e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: Concept minh hoạ phong cách thiết kế, không phải dự án đã triển khai."
                  className="mt-1 w-full rounded-lg border border-[#dfe6f0] p-3 text-[13px] font-normal"
                />
              </label>
              <button
                type="button"
                disabled={pending || disclosure.trim().length === 0}
                onClick={() => void send({ action: "publish", disclosure: disclosure.trim() })}
                className="mt-3 min-h-touch rounded-lg bg-[#08265a] px-4 text-[12px] font-semibold text-white disabled:opacity-40"
              >
                Xuất bản kèm ghi chú
              </button>
            </div>
          )}

          {error ? <p className="mt-3 text-[12px] text-[#b3261e]">{error}</p> : null}
        </div>
      ) : null}
    </li>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-touch rounded-lg px-3 text-[12px] font-semibold ${
        active ? "bg-[#08265a] text-white" : "border border-[#dfe6f0] bg-white text-[#08265a]"
      }`}
    >
      {children}
    </button>
  );
}
