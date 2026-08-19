"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const NEEDS = ["Tư vấn gói dịch vụ", "Báo giá", "Hỗ trợ kỹ thuật", "Hợp tác"];
const SERVICES = ["Website doanh nghiệp", "Support mạng xã hội", "Dịch vụ số / tài khoản"];
const CHANNELS: { value: "phone" | "zalo" | "telegram"; label: string }[] = [
  { value: "phone", label: "Điện thoại" },
  { value: "zalo", label: "Zalo" },
  { value: "telegram", label: "Telegram" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  defaultService,
  onSuccess,
}: {
  defaultService?: string;
  onSuccess?: () => void;
}) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const service = String(form.get("service") ?? "");

    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});
    track({ name: "lead_submit_start", props: { sourceRoute: pathname, service } });

    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      need: String(form.get("need") ?? ""),
      service,
      preferredChannel: String(form.get("preferredChannel") ?? "phone"),
      consent: form.get("consent") === "on",
      sourceRoute: pathname,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Không thể gửi yêu cầu.");
        setFieldErrors(data.fieldErrors ?? {});
        track({
          name: "lead_submit_error",
          props: { sourceRoute: pathname, errorClass: res.status >= 500 ? "server" : "validation" },
        });
        return;
      }

      setStatus("success");
      track({
        name: "lead_submit_success",
        props: { sourceRoute: pathname, service, preferredChannel: payload.preferredChannel },
      });
      onSuccess?.();
    } catch {
      setStatus("error");
      setErrorMessage("Không thể kết nối, vui lòng thử lại.");
      track({ name: "lead_submit_error", props: { sourceRoute: pathname, errorClass: "network" } });
    }
  }

  /* Approved state master (ui-010): success and error are centred white DIALOGS, not inline
   * notes. Rendering them as fixed, centred overlays is also what makes the state evidence
   * honest — the previous inline success block sat below the fold, so the success and error
   * captures came out byte-identical and proved nothing. */
  if (status === "success") {
    return (
      <StatusDialog
        state="form-success"
        tone="success"
        icon="circle-check"
        title="Cảm ơn bạn!"
        message="Chúng tôi đã nhận được yêu cầu của bạn. Lạc Việt Media sẽ liên hệ lại trong thời gian sớm nhất."
        actionLabel="Đóng"
        onAction={() => setStatus("idle")}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" data-state={status}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Họ tên" name="name" required errors={fieldErrors.name} autoComplete="name" />
        <Field label="Số điện thoại" name="phone" required errors={fieldErrors.phone} autoComplete="tel" inputMode="tel" />
      </div>

      <Field label="Email" name="email" errors={fieldErrors.email} autoComplete="email" hint="Không bắt buộc" />

      <SelectField label="Nhu cầu" name="need" required errors={fieldErrors.need} options={NEEDS} />
      <SelectField
        label="Dịch vụ quan tâm"
        name="service"
        required
        errors={fieldErrors.service}
        options={SERVICES}
        defaultValue={defaultService}
      />

      <fieldset>
        <legend className="text-form-label text-text-primary">
          Kênh liên hệ ưu tiên <span className="text-state-error">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {CHANNELS.map((c) => (
            <label key={c.value} className="flex min-h-touch items-center gap-2 text-body">
              <input type="radio" name="preferredChannel" value={c.value} defaultChecked={c.value === "phone"} className="h-4 w-4 accent-gold-600" />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-small text-text-secondary">
        <input type="checkbox" name="consent" required className="mt-px h-4 w-4 accent-gold-600" />
        <span>
          Tôi đồng ý để Lạc Việt Media liên hệ tư vấn theo thông tin đã cung cấp.{" "}
          <span className="text-state-error">*</span>
        </span>
      </label>
      {fieldErrors.consent ? <p className="text-small text-state-error">{fieldErrors.consent[0]}</p> : null}

      {status === "error" && errorMessage ? (
        <>
          <p role="alert" className="flex items-center gap-2 text-small text-state-error">
            <Icon name="circle-alert" size="inline" />
            {errorMessage}
          </p>
          <StatusDialog
            state="form-error"
            tone="error"
            icon="circle-alert"
            title="Có lỗi xảy ra!"
            message={errorMessage}
            actionLabel="Thử lại"
            onAction={() => {
              setStatus("idle");
              setErrorMessage(null);
            }}
          />
        </>
      ) : null}

      <Button type="submit" disabled={status === "submitting"} className="w-full md:w-auto">
        {status === "submitting" ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </Button>

      {/* Approved loading panel: dark card, gold circular spinner, "Đang tải...". Rendered as a
       * centred overlay so the state is unambiguously visible in the evidence viewport. */}
      {status === "submitting" ? (
        <div
          role="status"
          aria-live="polite"
          data-state="loading"
          className="fixed inset-0 z-[80] flex items-center justify-center p-6"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-ink-950/60" />
          <div className="relative flex flex-col items-center gap-4 rounded-lg bg-ink-900 px-12 py-10 shadow-lg">
            <span
              aria-hidden="true"
              className="h-12 w-12 rounded-full border-4 border-white/15 border-t-gold-500 motion-safe:animate-spin"
            />
            <p className="text-body text-white/80">Đang tải...</p>
          </div>
        </div>
      ) : null}
    </form>
  );
}

/** Centred white result dialog matching the approved state panels: green check + "Cảm ơn bạn!"
 * for success, red alert + "Có lỗi xảy ra!" for failure, each with one gold action button. */
function StatusDialog({
  state,
  tone,
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: {
  state: "form-success" | "form-error";
  tone: "success" | "error";
  icon: "circle-check" | "circle-alert";
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div
      role={tone === "error" ? "alertdialog" : "dialog"}
      aria-modal="false"
      aria-label={title}
      data-state={state}
      className="fixed inset-0 z-[80] flex items-center justify-center p-6"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink-950/60" />
      <div className="relative flex w-full max-w-md flex-col items-center gap-3 rounded-lg bg-white p-8 text-center shadow-lg">
        <Icon
          name={icon}
          size="feature"
          className={tone === "success" ? "text-state-success" : "text-state-error"}
        />
        <p className="text-card-h3-mobile lg:text-card-h3-desktop font-heading text-ink-950">{title}</p>
        <p className="text-body text-text-secondary">{message}</p>
        <Button type="button" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  errors,
  hint,
  ...inputProps
}: {
  label: string;
  name: string;
  required?: boolean;
  errors?: string[];
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="text-form-label text-text-primary">
        {label} {required ? <span className="text-state-error">*</span> : null}
        {hint ? <span className="ml-1 font-normal text-text-muted">({hint})</span> : null}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={errors ? true : undefined}
        aria-describedby={errors ? errorId : undefined}
        className="mt-1 h-12 w-full rounded-sm border border-border-input bg-white px-4 text-form-control placeholder:text-placeholder focus-visible:border-gold-600"
        {...inputProps}
      />
      {errors ? (
        <p id={errorId} role="alert" className="mt-1 text-small text-state-error">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  errors,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  errors?: string[];
  options: string[];
  defaultValue?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="text-form-label text-text-primary">
        {label} {required ? <span className="text-state-error">*</span> : null}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        aria-invalid={errors ? true : undefined}
        aria-describedby={errors ? errorId : undefined}
        className="mt-1 h-12 w-full rounded-sm border border-border-input bg-white px-4 text-form-control focus-visible:border-gold-600"
      >
        <option value="" disabled>
          Chọn {label.toLowerCase()}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {errors ? (
        <p id={errorId} role="alert" className="mt-1 text-small text-state-error">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}
