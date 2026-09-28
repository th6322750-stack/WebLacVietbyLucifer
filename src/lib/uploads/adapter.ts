import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/** Nơi tệp tải lên thực sự được lưu — PHUONG_AN §7.6.
 *
 * ═══ BLOCKER CẤU HÌNH, KHÔNG PHẢI LỖI CODE ═══════════════════════════════════════════════
 *
 * Route tải lên của admin ghi tệp vào `public/assets/uploads/` trên đĩa. Điều đó chạy đúng khi
 * `next dev` chạy trên máy, và KHÔNG chạy đúng trên Vercel: mỗi lần deploy tạo một filesystem
 * mới, còn filesystem đó thì chỉ ghi được ở `/tmp` và biến mất khi hàm serverless kết thúc. Hệ
 * quả cụ thể: ảnh tải lên qua admin trên production hoặc bị từ chối ghi, hoặc ghi được rồi biến
 * mất — trong khi hàng trong bảng `assets` vẫn còn, nên trang công khai sẽ trỏ tới một tệp 404.
 *
 * Đây là lỗi vận hành đã có sẵn trong repo, không phải thứ do lượt sửa này gây ra. Nhưng nó cần
 * được ghi ở đâu đó nhìn thấy được, nên nó nằm ở đây.
 *
 * Cần chọn một trong ba, và đó là quyết định của chủ dự án chứ không phải của code:
 *
 *   1. Vercel Blob — `npm i @vercel/blob`, đặt `BLOB_READ_WRITE_TOKEN`, viết `VercelBlobAdapter`
 *      theo interface dưới đây. Ít việc phải làm nhất vì site đã ở trên Vercel.
 *   2. S3 hoặc tương đương (Cloudflare R2, Backblaze B2) — cần khoá truy cập và một bucket.
 *   3. Không dùng upload trên production — bỏ chức năng tải ảnh trong admin, ảnh commit thẳng
 *      vào repo như hiện tại. Hợp lý nếu tần suất thay ảnh thấp.
 *
 * Cho tới khi chọn xong, `LocalDiskAdapter` vẫn là mặc định và vẫn đúng cho môi trường dev.
 * `assertUploadAdapterConfigured()` là chỗ để một health check hoặc trang admin phát hiện sớm
 * tình trạng này, thay vì để người dùng phát hiện bằng một tấm ảnh vỡ.
 */

export type StoredUpload = {
  /** Đường dẫn công khai để nhúng vào `<img src>`. */
  url: string;
  /** Định danh trong kho lưu trữ, dùng khi cần xoá. Với đĩa là đường dẫn tương đối. */
  key: string;
  bytes: number;
};

export interface UploadAdapter {
  readonly name: string;
  /** `key` do phía gọi quyết định (repo này dùng SHA-256 + phần mở rộng thật), nên adapter không
   *  bao giờ chạm vào tên tệp người dùng cung cấp. */
  put(key: string, data: Buffer, contentType: string): Promise<StoredUpload>;
  /** Không phải kho nào cũng xoá được; trả về false thay vì ném lỗi. */
  remove(key: string): Promise<boolean>;
  /** Kho này có dùng được trong môi trường đang chạy không, và nếu không thì vì sao. */
  health(): Promise<{ ok: boolean; detail: string }>;
}

const PUBLIC_PREFIX = "/assets/uploads";
const UPLOAD_DIR = path.join(process.cwd(), "public", "assets", "uploads");

/** Ghi ra đĩa. Đúng cho dev, không đúng cho serverless — xem chú thích đầu file. */
export class LocalDiskAdapter implements UploadAdapter {
  readonly name = "local-disk";

  async put(key: string, data: Buffer): Promise<StoredUpload> {
    await mkdir(UPLOAD_DIR, { recursive: true });
    // `key` được chuẩn hoá ở đây một lần nữa dù phía gọi đã sinh nó từ hash: một adapter không
    // nên tin đầu vào của mình chỉ vì hôm nay call site duy nhất đang cẩn thận.
    const safe = path.basename(key);
    await writeFile(path.join(UPLOAD_DIR, safe), data);
    return { url: `${PUBLIC_PREFIX}/${safe}`, key: safe, bytes: data.byteLength };
  }

  async remove(): Promise<boolean> {
    // Cố tình không xoá: nhiều bản ghi trong bảng `assets` có thể trỏ tới cùng một tệp do cơ chế
    // khử trùng lặp theo hash. Xoá tệp khi gỡ một bản ghi sẽ làm hỏng những bản ghi còn lại.
    return false;
  }

  async health(): Promise<{ ok: boolean; detail: string }> {
    if (isServerlessRuntime()) {
      return {
        ok: false,
        detail:
          "Đang chạy trên runtime serverless: tệp ghi vào public/assets/uploads sẽ mất sau khi hàm kết thúc. Cần cấu hình kho lưu trữ ngoài.",
      };
    }
    return { ok: true, detail: "Ghi vào public/assets/uploads trên đĩa cục bộ." };
  }
}

/** Nhận diện runtime không có đĩa ghi bền. `VERCEL` do chính Vercel đặt; `AWS_LAMBDA_*` bao
 *  quát các nền tảng chạy trên Lambda. */
function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

let cached: UploadAdapter | null = null;

/** Adapter đang dùng. Sẽ trả về adapter ngoài khi có ai đó cài một cái theo interface trên và
 *  nối vào đây — chỗ nối là hàm này, không phải rải rác trong route. */
export function uploadAdapter(): UploadAdapter {
  if (!cached) cached = new LocalDiskAdapter();
  return cached;
}

/** Dùng cho health check / cảnh báo trong admin. Trả về mô tả thay vì ném lỗi, để trang admin
 *  hiện được cảnh báo mà không sập. */
export async function uploadAdapterStatus(): Promise<{
  adapter: string;
  ok: boolean;
  detail: string;
}> {
  const adapter = uploadAdapter();
  const health = await adapter.health();
  return { adapter: adapter.name, ...health };
}
