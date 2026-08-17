import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation";
import { leadSink } from "@/lib/sinks";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`lead:${ip}`)) {
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

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng kiểm tra lại thông tin.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const { email, ...rest } = parsed.data;
    const lead = await leadSink.save({ ...rest, email: email || undefined });
    return NextResponse.json({ ok: true, receiptId: lead.id }, { status: 201 });
  } catch (err) {
    console.error("lead submit failed", err);
    return NextResponse.json(
      { ok: false, error: "Không thể gửi yêu cầu lúc này, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
