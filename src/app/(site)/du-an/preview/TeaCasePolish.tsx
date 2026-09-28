"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import t from "./tea-case-polish.module.css";

/** Botanical linework, shared between the story and the live packaging label. */
function TeaSprig({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 160 220" fill="none" aria-hidden="true">
    <path d="M76 208C80 165 96 119 94 56M85 148C58 129 44 108 28 87M92 111C117 96 130 77 139 57M92 73C75 55 70 34 76 13" />
    <path d="M81 171C39 172 18 144 17 122C45 119 72 136 81 171ZM91 130C122 136 150 110 149 89C122 87 98 105 91 130ZM63 126C27 124 9 95 17 73C42 77 61 99 63 126ZM97 88C125 79 135 50 125 26C102 36 91 61 97 88ZM91 63C70 57 56 34 66 9C88 16 99 38 91 63Z" />
    <path className={t.leafVeins} d="M23 128L77 165M28 130L38 146M44 140L48 155M103 120L143 95M114 113L131 114M127 104L133 96M23 82L56 117M34 95L32 109M104 73L123 37M112 55L112 42M89 54L69 16" />
  </svg>;
}

export function TeaStoryPolish() {
  return <div className={t.story}>
    <div className={t.storyCopy}>
      <p className={t.eyebrow}>DỰ ÁN CONCEPT 01 / BẠCH TRÀ</p>
      <div className={t.origin}><span>SUỐI GIÀNG</span><i /><span>TRÀ VIỆT</span></div>
      <h2>Bạch Trà<span>Suối Giàng.</span></h2>
      <p className={t.storyLead}>Giữ một miền mây.<br />Trong một món quà.</p>
      <p className={t.storyBody}>Một hướng nhận diện lấy cảm hứng từ vùng trà cổ thụ: sắc xanh của lá, bề mặt giấy mộc và một dấu son vừa đủ.</p>
      <div className={t.storySignature}><TeaSprig /><div><span>BẢN ĐỊA TRONG CÂU CHUYỆN.</span><span>ĐƯƠNG ĐẠI TRONG CÁCH KỂ.</span></div></div>
      <a href="#folio-09" className={t.nextStudy}>Khám phá hệ bao bì <span aria-hidden="true">↗</span></a>
    </div>
    <div className={t.storyArt}>
      <figure className={t.originPhoto}><Image src="/assets/portfolio-2026/tea.webp" alt="Cảnh quan vùng trà trong sương — hình ảnh concept Bạch Trà" fill sizes="(max-width: 760px) 100vw, 58vw" /><figcaption><span>01 / NGUỒN CẢM HỨNG</span><b>Từ những miền mây.</b></figcaption></figure>
      <div className={t.materialInset}><div className={t.materialPhoto}><Image src="/assets/portfolio-2026/tea-kit.webp" alt="Ống trà, giấy gói và tách trà trong bộ nghiên cứu Bạch Trà" fill sizes="(max-width: 760px) 70vw, 28vw" /></div><div className={t.materialCaption}><span>02 / CHẤT LIỆU & CẢM GIÁC</span><span>Giấy mộc. Mực trầm. Hương trà.</span></div></div>
      <div className={t.sideNote} aria-hidden="true">BẠCH TRÀ — BRAND EXPLORATION / 2026</div>
    </div>
    <div className={t.storyFoot}><span>NGHIÊN CỨU NHẬN DIỆN</span><p>Bản sắc <i /> Bao bì <i /> Trải nghiệm số</p><span>BT / 01</span></div>
  </div>;
}

const variants = [
  { title: "Bạch trà", code: "01", description: "Thanh nhẹ · Tinh giản", ink: "#344e38", paper: "#f1e8d6" },
  { title: "Hồng trà", code: "02", description: "Ấm sâu · Đậm sắc", ink: "#8d3429", paper: "#eee0c8" },
  { title: "Bộ quà", code: "03", description: "Một lời gửi từ miền núi", ink: "#b99157", paper: "#182e25" },
] as const;

function TeaLabelStudy() {
  const [choice, setChoice] = useState(0);
  const current = variants[choice] ?? variants[0];
  return <div className={t.labelStudy}>
    <div className={t.labelIntro}><span className={t.eyebrow}>CHI TIẾT / HỆ NHÃN</span><h3>Một cấu trúc.<br />Ba sắc độ.</h3><p>Giữ tên thương hiệu, đổi sắc mực theo dòng trà.</p><div className={t.choices} role="group" aria-label="Chọn mẫu nhãn Bạch Trà">{variants.map((v, i) => <button key={v.code} aria-pressed={choice === i} onClick={() => setChoice(i)}><span>{v.code}</span>{v.title}</button>)}</div></div>
    <div className={t.labelStage}>
      <div className={t.sampleLabel} style={{ color: current.ink, backgroundColor: current.paper }} aria-live="polite">
        <div className={t.sampleTop}><span>SUỐI GIÀNG</span><span>BT—{current.code}</span></div>
        <b className={t.sampleWordmark}>BẠCH TRÀ</b><span className={t.sampleOrigin}>SHAN TUYẾT / TRÀ VIỆT</span>
        <TeaSprig className={t.sampleBotanical} />
        <h4>{current.title}</h4><p>{current.description}</p>
        <div className={t.sampleBottom}><span>NGHIÊN CỨU NHÃN</span><span>2026</span></div>
      </div>
      <span className={t.labelAnnotation}>Nghiên cứu nhãn / Ba phối màu</span>
    </div>
  </div>;
}

export function TeaApplicationPolish({ artwork, website }: { artwork: ReactNode; website: ReactNode }) {
  return <div className={t.application}>
    <div className={t.applicationHead}><div><p className={t.eyebrow}>BẠCH TRÀ / HỆ THỐNG ỨNG DỤNG</p><h2>Từ chất liệu.<br /><em>Thành bản sắc.</em></h2></div><p>Tên trà là điểm đọc đầu tiên. Hoạ tiết gợi xuất xứ; màu mực giúp phân biệt từng dòng. Mỗi chi tiết có một việc để làm.</p></div>
    <div className={t.applicationGrid}>
      <div className={t.direction}><span className={t.smallTitle}>Ý TƯỞNG THIẾT KẾ</span><h3>Mộc, nhưng<br />không đơn điệu.</h3><p>Đặt tinh thần vùng cao vào một bộ quà đương đại. Giữ bề mặt giấy thoáng, cho hình lá và nét núi đủ khoảng để thở.</p><dl><div><dt>01 / HỆ CHỮ</dt><dd>Chữ có chân, dáng đứng. Tên thương hiệu giữ cùng một cách viết trên nhãn và thẻ.</dd></div><div><dt>02 / CHẤT LIỆU</dt><dd>Giấy ấm đi cùng mực xanh trà; dấu son làm điểm nhấn thay cho lớp vàng phủ kín.</dd></div><div><dt>03 / ỨNG DỤNG</dt><dd>Hộp quà · Đai giấy · Nhãn trà · Thẻ hướng dẫn · Trang sản phẩm.</dd></div></dl><div className={t.swatches}><span><i style={{background:'#f1e8d6'}} />Giấy ấm<small>#F1E8D6</small></span><span><i style={{background:'#344e38'}} />Xanh trà<small>#344E38</small></span><span><i style={{background:'#8d3429'}} />Dấu son<small>#8D3429</small></span></div></div>
      <div className={t.applicationWork}><figure className={t.packaging}>{artwork}<figcaption>BỘ NGHIÊN CỨU BAO BÌ / CONCEPT 01</figcaption></figure><TeaLabelStudy /><details className={t.website}><summary>Xem ứng dụng website<span aria-hidden="true">↗</span></summary><div className={t.websiteInner}>{website}</div></details></div>
    </div>
  </div>;
}
