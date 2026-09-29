import { z } from "zod";

// Vietnamese mobile numbers: optional +84/84 prefix or leading 0, then 9 digits.
const PHONE_REGEX = /^(\+?84|0)\d{9}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(120),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Số điện thoại không hợp lệ"),
  email: z.string().trim().email("Email không hợp lệ").optional().or(z.literal("")),
  need: z.string().trim().min(2, "Vui lòng chọn nhu cầu").max(200),
  service: z.string().trim().min(1, "Vui lòng chọn dịch vụ quan tâm"),
  preferredChannel: z.enum(["phone", "zalo", "telegram"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vui lòng đồng ý chính sách để tiếp tục" }),
  }),
  sourceRoute: z.string().min(1),
  utm: z.string().optional(),
  referrer: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vui lòng đồng ý nhận bản tin" }),
  }),
  sourceRoute: z.string().optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
