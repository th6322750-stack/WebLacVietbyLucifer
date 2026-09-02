/** Bộ sưu tập giao diện web theo ngành — CONCEPT MINH HOẠ, không phải dự án đã triển khai cho
 * khách hàng thật. Mọi tên công ty, sản phẩm, đánh giá xuất hiện trong ảnh đều là dữ liệu dựng
 * để trình bày, không phải khách hàng thật của Lạc Việt (CONTENT_TRUTH.json).
 *
 * Mục đích: cho thấy độ đa dạng ngành nghề Lạc Việt có thể thiết kế, không phải bằng chứng đã
 * từng làm cho những công ty cụ thể này — vì chúng không tồn tại.
 */
export type IndustryShowcaseItem = {
  slug: string;
  industry: string;
  title: string;
  imagePath: string;
};

export const industryShowcase: IndustryShowcaseItem[] = [
  { slug: "noi-that-an-loc", industry: "Nội thất", title: "Nội Thất An Lộc", imagePath: "/assets/v5/du-an/noi-that-an-loc.webp" },
  { slug: "trung-tam-tieng-anh-englishhub", industry: "Giáo dục", title: "Trung tâm tiếng Anh EnglishHub", imagePath: "/assets/v5/du-an/trung-tam-tieng-anh-englishhub.webp" },
  { slug: "phong-gym-ironfit", industry: "Thể thao", title: "Phòng gym IronFit", imagePath: "/assets/v5/du-an/phong-gym-ironfit.webp" },
  { slug: "resort-blue-sand", industry: "Du lịch", title: "Resort Blue Sand", imagePath: "/assets/v5/du-an/resort-blue-sand.webp" },
  { slug: "cong-ty-luat-lexpro", industry: "Pháp lý", title: "Công ty luật LexPro", imagePath: "/assets/v5/du-an/cong-ty-luat-lexpro.webp" },
  { slug: "showroom-oto-dien-ev-motors", industry: "Ô tô", title: "Showroom ô tô điện EV Motors", imagePath: "/assets/v5/du-an/showroom-oto-dien-ev-motors.webp" },
  { slug: "nong-san-sach", industry: "Nông sản", title: "Nông sản sạch", imagePath: "/assets/v5/du-an/nong-san-sach.webp" },
  { slug: "nen-tang-tuyen-dung-viec-tot", industry: "Tuyển dụng", title: "Nền tảng tuyển dụng Việc Tốt", imagePath: "/assets/v5/du-an/nen-tang-tuyen-dung-viec-tot.webp" },
  { slug: "nha-thong-minh-smarthome", industry: "Công nghệ", title: "Nhà thông minh SmartHome", imagePath: "/assets/v5/du-an/nha-thong-minh-smarthome.webp" },
  { slug: "ban-ve-su-kien-eventix", industry: "Sự kiện", title: "Bán vé sự kiện Eventix", imagePath: "/assets/v5/du-an/ban-ve-su-kien-eventix.webp" },
  { slug: "noi-that-an-gia", industry: "Nội thất", title: "Nội Thất An Gia", imagePath: "/assets/v5/du-an/noi-that-an-gia.webp" },
  { slug: "english-master", industry: "Giáo dục", title: "English Master", imagePath: "/assets/v5/du-an/english-master.webp" },
  { slug: "nha-khoa-smilecare", industry: "Nha khoa", title: "Nha khoa SmileCare", imagePath: "/assets/v5/du-an/nha-khoa-smilecare.webp" },
  { slug: "bat-dong-san-homeland-viet", industry: "Bất động sản", title: "Bất động sản Homeland Việt", imagePath: "/assets/v5/du-an/bat-dong-san-homeland-viet.webp" },
  { slug: "du-lich-gotravel", industry: "Du lịch", title: "Du lịch GoTravel", imagePath: "/assets/v5/du-an/du-lich-gotravel.webp" },
  { slug: "phong-kham-medicare-plus", industry: "Y tế", title: "Phòng khám MediCare Plus", imagePath: "/assets/v5/du-an/phong-kham-medicare-plus.webp" },
  { slug: "techzone-cong-nghe", industry: "Công nghệ", title: "TechZone Công nghệ", imagePath: "/assets/v5/du-an/techzone-cong-nghe.webp" },
  { slug: "nha-hang-food-house", industry: "Nhà hàng", title: "Nhà hàng Food House", imagePath: "/assets/v5/du-an/nha-hang-food-house.webp" },
  { slug: "bella-spa", industry: "Làm đẹp", title: "Bella Spa", imagePath: "/assets/v5/du-an/bella-spa.webp" },
  { slug: "eventix-su-kien", industry: "Sự kiện", title: "Eventix Sự kiện", imagePath: "/assets/v5/du-an/eventix-su-kien.webp" },
  { slug: "technext-doanh-nghiep-cong-nghe", industry: "Công nghệ", title: "TechNext Doanh nghiệp công nghệ", imagePath: "/assets/v5/du-an/technext-doanh-nghiep-cong-nghe.webp" },
  { slug: "lunea-thoi-trang", industry: "Thời trang", title: "Lunea Thời trang", imagePath: "/assets/v5/du-an/lunea-thoi-trang.webp" },
  { slug: "gia-an-bat-dong-san", industry: "Bất động sản", title: "Gia An Bất động sản", imagePath: "/assets/v5/du-an/gia-an-bat-dong-san.webp" },
  { slug: "phuc-an-phong-kham", industry: "Y tế", title: "Phòng khám Phúc An", imagePath: "/assets/v5/du-an/phuc-an-phong-kham.webp" },
  { slug: "edupro-giao-duc-online", industry: "Giáo dục", title: "EduPro Giáo dục online", imagePath: "/assets/v5/du-an/edupro-giao-duc-online.webp" },
  { slug: "lan-vien-nha-hang", industry: "Nhà hàng", title: "Lan Viên Nhà hàng", imagePath: "/assets/v5/du-an/lan-vien-nha-hang.webp" },
  { slug: "viettrip-du-lich", industry: "Du lịch", title: "VietTrip Du lịch", imagePath: "/assets/v5/du-an/viettrip-du-lich.webp" },
  { slug: "powerzone-fitness-gym", industry: "Thể thao", title: "PowerZone Fitness Gym", imagePath: "/assets/v5/du-an/powerzone-fitness-gym.webp" },
  { slug: "minh-tri-luat-phap", industry: "Pháp lý", title: "Minh Trí Luật pháp", imagePath: "/assets/v5/du-an/minh-tri-luat-phap.webp" },
  { slug: "lumiere-spa-lam-dep", industry: "Làm đẹp", title: "Lumiere Spa Làm đẹp", imagePath: "/assets/v5/du-an/lumiere-spa-lam-dep.webp" },
];
