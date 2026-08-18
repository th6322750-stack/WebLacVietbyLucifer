"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email") ?? ""),
          consent: form.get("consent") === "on",
          sourceRoute: pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Không thể đăng ký.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Không thể kết nối, vui lòng thử lại.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" data-state="form-success" className="flex items-center gap-2 text-body text-state-success">
        <Icon name="circle-check" size="inline" />
        Đã đăng ký nhận bản tin thành công.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start" data-state={status}>
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Email của bạn"
          className="h-12 w-full rounded-sm border border-border-input bg-white px-4 text-form-control placeholder:text-placeholder focus-visible:border-gold-600"
        />
        <label className={`mt-2 flex items-start gap-2 text-caption ${onDark ? "text-white/70" : "text-text-secondary"}`}>
          <input type="checkbox" name="consent" required className="mt-px h-4 w-4 accent-gold-600" />
          Tôi đồng ý nhận bản tin qua email.
        </label>
        {status === "error" && error ? (
          <p role="alert" data-state="form-error" className="mt-1 text-small text-state-error">
            {error}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={status === "submitting"} size="md">
        {status === "submitting" ? "Đang gửi..." : "Đăng ký"}
      </Button>
    </form>
  );
}
