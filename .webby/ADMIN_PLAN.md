# KẾ HOẠCH TRANG QUẢN TRỊ (ADMIN)

Trạng thái: **BẢN NHÁP — chờ Lucifer duyệt**
Người viết: Claude · Ngày: 2026-08-20

---

## 1. Hiện trạng đo được

| Hạng mục | Trạng thái hôm nay |
|---|---|
| Dự án | 13 bản ghi, file `src/content/projects.ts` |
| Bài viết | 8 bản ghi, `src/content/articles.ts` |
| Dịch vụ | 3 bản ghi, `src/content/services.ts` |
| FAQ | 20 bản ghi, `src/content/faqs.ts` |
| Đơn liên hệ | `/api/leads` → file JSON cục bộ |
| Asset | 109 file trong `public/assets`, tra qua `src/lib/assets.ts` |
| Cơ sở dữ liệu | **không có** |
| Đăng nhập | **không có** |
| Thư viện | chỉ `next`, `react`, `react-dom`, `zod` |

**Toàn bộ nội dung hiện là dữ liệu biên dịch lúc build.** Sửa một chữ = sửa file `.ts` = build lại = deploy lại.

### Hai điều phải biết trước khi bắt đầu

**a) Đơn liên hệ trên Vercel đang bị mất.**
`src/lib/sinks.ts` ghi vào `data/leads.json`. Vercel có hệ thống file chỉ đọc nên ghi luôn thất bại. Code xử lý trung thực — đánh dấu `external_sync_status: "failed"` và ghi log — nhưng đơn vẫn không được lưu.

**b) Dự án đã có sẵn đường ra cho việc này.**
`.webby/DATA_BACKEND_CONTRACT.json` định nghĩa `LeadSink` / `SubscriberSink` là lớp trừu tượng, kèm ghi chú: *"only these two functions change"*. Người viết trước đã chừa sẵn chỗ cắm cơ sở dữ liệu. Ta đi đúng đường đó, không phá.

---

## 2. Cơ sở dữ liệu: SQLite qua `node:sqlite`

Lucifer chốt: **chạy trên máy chính trước, VPS sau.**

Node 24.18 trên máy đã có sẵn `node:sqlite` — đã chạy thử, hoạt động. Nghĩa là:

- **Không thêm một thư viện nào.** Dự án giữ đúng 4 dependency.
- Cả cơ sở dữ liệu là **một file**: `data/lacviet.db`. Sao lưu = copy file.
- Lên VPS sau: bê nguyên file đó lên, hoặc đổi sang Postgres — xem §7.

### Ràng buộc phải nói rõ

SQLite nằm trên máy anh. **Bản Vercel không đọc được nó.** Cho tới khi có VPS:

- Trang quản trị chạy **trên máy anh** (`localhost`)
- Đơn liên hệ chỉ được lưu khi khách vào **bản chạy trên máy anh**
- Bản Vercel vẫn là bản trưng bày, đơn gửi ở đó vẫn mất

Nếu cần nhận đơn thật ngay bây giờ, có hai cách chữa tạm, làm trong ngày:
đổ đơn về **Google Sheet**, hoặc **gửi email** mỗi khi có đơn. Cả hai đều chỉ thay
`leadSink.save()`, không đụng gì khác. Cần thì nói.

---

## 3. Lược đồ dữ liệu

Dựng thẳng từ `src/lib/types.ts` để không phải nghĩ lại kiểu dữ liệu.

```
projects     slug PK · title · category · summary · demo_only
             hero_asset_id · detail_visual_asset_id
             challenge · solution · results[] · technology[]
             gallery_asset_ids[] · duration_label · completed_label
             result_metrics[] · hidden · sort_order
             created_at · updated_at · published

articles     slug PK · title · category · excerpt
             content[]        (mảng ArticleSection: id/heading/body[])
             published_at · author · demo_only · cover_asset_id
             created_at · updated_at · published

services     slug PK · category · title · summary · cta_label · href
             icon · features[] · price_mode · price_vnd
             hero_asset_id · faq_ids[] · sort_order

faqs         id PK · scope · question · answer · sort_order

leads        id PK · name · phone · email · channel · message
             created_at · status · note · external_sync_status

subscribers  id PK · email · created_at

assets       id PK · path · width · height · has_alpha
             kind · alt · sha256 · uploaded_at

admin_users  id PK · email · password_hash · role · created_at
```

Các trường mảng (`results`, `content`, `features`…) lưu dạng JSON trong cột TEXT — SQLite
đọc JSON tốt, và dữ liệu ở quy mô này (44 bản ghi nội dung) không cần chuẩn hoá thành
bảng con.

`status` và `note` trên bảng `leads` là **thêm mới** — để anh đánh dấu đã gọi / chưa gọi.

---

## 4. Điểm quan trọng nhất về kiến trúc

Chuyển nội dung từ file `.ts` sang cơ sở dữ liệu **đổi cách trang được dựng**.

| | Hôm nay | Sau khi có DB |
|---|---|---|
| Trang dự án | dựng sẵn lúc build | đọc DB |
| Sửa nội dung | build lại + deploy | **hiện ngay** |
| Tốc độ | tĩnh, nhanh nhất | vẫn nhanh, nhờ ISR |

Cách làm: giữ các trang ở dạng dựng sẵn nhưng bật **ISR** (`revalidate`), và trang admin
gọi `revalidatePath()` sau mỗi lần lưu. Kết quả: trang công khai vẫn nhanh như tĩnh,
mà sửa xong là thấy ngay, không cần build lại.

Đây là chỗ dễ làm hỏng tốc độ trang nếu làm ẩu — phải làm đúng ngay từ đầu.

---

## 5. Các màn hình

```
/admin/dang-nhap        đăng nhập
/admin                  tổng quan — đơn mới, số liệu nhanh
/admin/don-hang         danh sách đơn · lọc · đánh dấu · ghi chú · xuất CSV
/admin/du-an            danh sách · thêm · sửa · xoá · sắp xếp · ẩn/hiện
/admin/bai-viet         như trên + soạn thảo theo từng phần (ArticleSection)
/admin/dich-vu          sửa dịch vụ · giá · tính năng · gắn FAQ
/admin/faq              danh sách theo phạm vi (website / support / digital)
/admin/thu-vien-anh     tải lên · xem · gắn ID · thay ảnh
```

### Giao diện

Admin **không dùng giao diện trang công khai**. Trang công khai là bản trình diễn thương
hiệu — nền tối, vàng kim, phượng hoàng, hiệu ứng. Admin là công cụ làm việc: sáng, dày
đặc thông tin, đọc nhanh, ít trang trí. Dùng chung Tailwind và bảng màu, nhưng bố cục và
component riêng, đặt trong `src/components/admin/`.

Lý do thực dụng: như vậy AI kia đổi hiệu ứng trang công khai thoải mái mà **không thể
làm vỡ admin**.

---

## 6. Thứ tự làm

| Giai đoạn | Nội dung | Kết quả kiểm chứng được |
|---|---|---|
| **1** | Lớp cơ sở dữ liệu + di chuyển dữ liệu | `data/lacviet.db` có đủ 44 bản ghi, khớp file `.ts` |
| **2** | Đơn liên hệ đi vào DB + màn hình xem đơn | Gửi form → thấy đơn trong `/admin/don-hang` |
| **3** | Đăng nhập | Chưa đăng nhập thì mọi `/admin/*` chuyển hướng |
| **4** | Sửa dự án & bài viết | Sửa tiêu đề → trang công khai đổi trong 1 giây |
| **5** | Dịch vụ · giá · FAQ | như trên |
| **6** | Thư viện ảnh | Tải ảnh lên → dùng được ngay trong trình sửa |

Giai đoạn 1–2 gỡ đúng cái đang chảy máu (mất đơn). Làm trước.

**Nguyên tắc di chuyển dữ liệu: một chiều, không xoá.** Các file `src/content/*.ts` được
**giữ nguyên** làm bản gốc đối chiếu cho tới khi anh xác nhận DB chạy đúng. Không xoá file
nào trong giai đoạn 1.

---

## 7. Đường lên VPS sau này

Viết lớp truy vấn theo **kiểu kho dữ liệu** (`src/lib/db/repositories/*.ts`), mọi câu SQL
gom vào một chỗ. Khi lên VPS:

- **Giữ SQLite** — hoàn toàn ổn ở quy mô này, chỉ cần copy file `.db` lên
- **hoặc đổi Postgres** — viết lại đúng thư mục `repositories/`, phần còn lại không đụng

Không khoá vào lựa chọn nào. Quyết định sau, khi có VPS.

---

## 8. Phân chia với AI kia

Để hai bên không đạp lên nhau:

**Claude sở hữu** (gần như toàn file mới):
```
src/app/admin/**
src/app/api/admin/**
src/lib/db/**
src/components/admin/**
data/**
```

**AI kia sở hữu:**
```
src/app/globals.css
src/app/starfield.css
tailwind.config.ts
src/components/{ui,content,layout,conversion}/**
src/app/(site)/**
```

**Vùng giao nhau — phải báo trước khi sửa:**
```
src/lib/types.ts        Claude thêm trường, không đổi trường đang có
src/lib/sinks.ts        chỉ Claude
src/app/layout.tsx      chỉ AI kia
package.json            báo nhau
```

Claude làm trên nhánh riêng, tách khỏi nhánh giao diện.

---

## 9. Chờ Lucifer quyết

1. **Đơn liên hệ ngay bây giờ** — chờ tới lúc có VPS, hay chữa tạm bằng Google Sheet / email
   trong hôm nay?
2. **Tài khoản khách hàng** — Lucifer nói "để sau". Nhưng nếu biết trước khách sẽ đăng nhập để
   *làm gì* (xem đơn của mình? tải file bàn giao? theo dõi tiến độ?), tôi thiết kế bảng
   `admin_users` ngay từ đầu cho khớp, đỡ phải sửa lược đồ về sau.
3. **Ảnh** — tải lên lưu vào `public/assets/`? Cách này đơn giản nhưng ảnh mới sẽ không có
   trên bản Vercel cho tới lần deploy kế tiếp. Cần bàn thêm khi tới giai đoạn 6.
