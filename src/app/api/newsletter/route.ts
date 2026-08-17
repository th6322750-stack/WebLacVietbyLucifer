import { NextResponse, type NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { subscriberSink } from "@/lib/sinks";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`newsletter:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Bạn gửi yêu cầu quá nhanh, vui lòng thử lại sau ít phút." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng kiểm tra lại email." },
      { status: 400 },
    );
  }

  try {
    await subscriberSink.save(parsed.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("newsletter subscribe failed", err);
    return NextResponse.json(
      { ok: false, error: "Không thể đăng ký lúc này, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
