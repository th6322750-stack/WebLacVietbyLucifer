"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import s from "./portfolio.module.css";
const chapters = [
  "Khởi nguồn",
  "Mục lục",
  "Tuyên ngôn",
  "Về Lạc Việt",
  "Năng lực",
  "Cách chúng tôi làm",
  "Dự án chọn lọc",
  "Bạch Trà · Câu chuyện",
  "Bạch Trà · Trải nghiệm",
  "Dạ Quang · Câu chuyện",
  "Dạ Quang · Trải nghiệm",
  "Vĩnh An · Câu chuyện",
  "Vĩnh An · Trải nghiệm",
  "Hệ thống nhận diện",
  "Thiết kế mọi điểm chạm",
  "Bàn giao & đồng hành",
  "Cam kết",
  "Kết nối",
];
const projects = [
  {
    name: "Bạch Trà",
    full: "Bạch Trà Suối Giàng",
    file: "tea",
    field: "Trà Việt & sản vật bản địa",
    line: "Tinh hoa từ những miền mây.",
    note: "Đưa câu chuyện của trà Shan Tuyết vào một trải nghiệm mua sắm chậm rãi, tinh tế và giàu cảm xúc.",
    tag: "Bản sắc · Bao bì · Thương mại điện tử",
    color: "#637053",
    paper: "#f3eee0",
    to: 8,
    items: ["Shan Tuyết cổ thụ", "Hương vị nguyên bản", "Quà tặng từ núi rừng"],
    action: "Khám phá bộ trà",
  },
  {
    name: "Dạ Quang",
    full: "Dạ Quang",
    file: "light",
    field: "Chiếu sáng & kiến trúc",
    line: "Không gian được đánh thức.",
    note: "Kể về ánh sáng qua vật liệu, chiều sâu và những khoảnh khắc sống. Một thương hiệu có thể cảm nhận trước khi cần giải thích.",
    tag: "Định hướng hình ảnh · Website · Catalogue",
    color: "#caa66d",
    paper: "#121813",
    to: 10,
    items: ["Ánh sáng kiến trúc", "Bộ sưu tập đèn", "Không gian cảm hứng"],
    action: "Tìm nguồn cảm hứng",
  },
  {
    name: "Vĩnh An",
    full: "Khoáng Nóng Vĩnh An",
    file: "spa",
    field: "Nghỉ dưỡng & chăm sóc thân tâm",
    line: "Một khoảng lặng, dành riêng bạn.",
    note: "Để khung cảnh dẫn đường từ cảm hứng đến hành trình nghỉ dưỡng. Mọi lựa chọn đều nhẹ nhàng như chính kỳ nghỉ.",
    tag: "Nhận diện · Trải nghiệm số · Đặt dịch vụ",
    color: "#64796d",
    paper: "#e9eee7",
    to: 12,
    items: [
      "Khoáng nóng tự nhiên",
      "Những căn phòng yên tĩnh",
      "Hành trình thân tâm",
    ],
    action: "Khám phá kỳ nghỉ",
  },
];
const pageId = (n: number) => `folio-${String(n).padStart(2, "0")}`;
function Artwork({
  file,
  alt = "",
  priority = false,
}: {
  file: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/assets/portfolio-2026/${file}.webp`}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 760px) 100vw, 90vw"
      className={s.artwork}
    />
  );
}
function Page({
  n,
  light,
  className = "",
  children,
}: {
  n: number;
  light?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={pageId(n)}
      data-folio={n}
      aria-label={`${n}. ${chapters[n - 1]}`}
      className={`${s.page} ${light ? s.light : ""} ${className}`}
    >
      <div className={s.runningHead}>
        <span>
          LẠC VIỆT® <i> / </i> HỒ SƠ NĂNG LỰC
        </span>
        <span>2026 — {String(n).padStart(2, "0")}</span>
      </div>
      {children}
      <div className={s.runningFoot}>
        <span>{chapters[n - 1]}</span>
        <span>
          CONCEPT EDITION <i> / </i> {String(n).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
function Device({
  p,
  mobile = false,
}: {
  p: (typeof projects)[number];
  mobile?: boolean;
}) {
  return (
    <div
      className={`${s.device} ${mobile ? s.phone : ""} ${p.file === "light" ? s.darkDevice : ""}`}
      style={
        {
          "--project-accent": p.color,
          "--project-paper": p.paper,
        } as CSSProperties
      }
      role="img"
      aria-label={`Maquette ${mobile ? "mobile" : "desktop"} ${p.full}`}
    >
      <div className={s.deviceBar}>
        <span />
        <span />
        <span />
        <small>{p.name} / DESIGN CONCEPT</small>
      </div>
      <div className={s.miniNav}>
        <b>{p.name}</b>
        <span>{mobile ? "☰" : "Câu chuyện     Bộ sưu tập     Liên hệ"}</span>
      </div>
      <div className={s.deviceHero}>
        <Artwork file={p.file} />
        <div>
          <small>{p.field}</small>
          <h3>{p.line}</h3>
          <span className={s.miniCta}>{p.action} ↗</span>
        </div>
      </div>
      <div className={s.deviceBottom}>
        <span>Khơi nguồn cảm hứng</span>
        <strong>{p.items[0]}</strong>
        <div>
          {p.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export function PortfolioExperience() {
  const [current, setCurrent] = useState(1);
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setCurrent(Number((entry.target as HTMLElement).dataset.folio));
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    document
      .querySelectorAll("[data-folio]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const jump = (n: number) => {
    if (menu.current) menu.current.open = false;
    document
      .getElementById(pageId(n))
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <div data-portfolio className={s.portfolio}>
      <nav className={s.toolbar} aria-label="Điều hướng hồ sơ năng lực">
        <Link href="/" className={s.brand}>
          LẠC VIỆT<span>MEDIA AGENCY</span>
        </Link>
        <div className={s.toolbarMiddle}>
          <span className={s.liveDot} />
          HỒ SƠ NĂNG LỰC <span>/ 2026</span>
        </div>
        <details ref={menu} className={s.menu}>
          <summary>
            Mục lục <span>{String(current).padStart(2, "0")} / 18</span>
            <b>☰</b>
          </summary>
          <div className={s.menuPanel}>
            {chapters.map((title, i) => (
              <button
                key={title}
                onClick={() => jump(i + 1)}
                aria-current={current === i + 1 ? "location" : undefined}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {title}
              </button>
            ))}
          </div>
        </details>
      </nav>
      <div
        className={s.progress}
        style={{ width: `${(current / 18) * 100}%` }}
      />
      <Page n={1} className={s.cover}>
        <Artwork
          file="cover"
          priority
          alt="Chim Lạc bằng đồng vàng giữa những tầng núi và mây bình minh"
        />
        <div className={s.coverShade} />
        <div className={s.orbit} aria-hidden="true" />
        <div className={s.coverCopy}>
          <p className={s.eyebrow}>TỪ BẢN SẮC VIỆT / VƯƠN TỚI TƯƠNG LAI</p>
          <h1>
            Hồ sơ
            <br />
            năng lực<span>2026.</span>
          </h1>
          <p className={s.coverSub}>
            Kết nối giá trị.
            <br />
            Kiến tạo những trải nghiệm đáng nhớ.
          </p>
          <a className={s.roundLink} href={`#${pageId(2)}`}>
            <span>Khám phá câu chuyện</span>
            <b>↓</b>
          </a>
        </div>
        <div className={s.coverSide}>STRATEGY · BRAND · DIGITAL</div>
      </Page>
      <Page n={2} light className={s.indexPage}>
        <div className={s.sectionTitle}>
          <p className={s.eyebrow}>THE READING ROOM</p>
          <h2>
            Mỗi chương,
            <br />
            <em>một góc nhìn.</em>
          </h2>
          <p>
            18 trang để khám phá cách chúng tôi nghĩ, sáng tạo và xây dựng trải
            nghiệm số.
          </p>
        </div>
        <div className={s.indexGrid}>
          {[
            { label: "01 / BẢN SẮC & NĂNG LỰC", start: 3, end: 6 },
            { label: "02 / THẾ GIỚI DỰ ÁN", start: 7, end: 13 },
            { label: "03 / HỆ THỐNG & ĐỒNG HÀNH", start: 14, end: 18 },
          ].map((g) => (
            <div key={g.label}>
              <h3>{g.label}</h3>
              {chapters.slice(g.start - 1, g.end).map((title, i) => (
                <a href={`#${pageId(g.start + i)}`} key={title}>
                  <span>{title}</span>
                  <b>{String(g.start + i).padStart(2, "0")}</b>
                </a>
              ))}
            </div>
          ))}
        </div>
      </Page>
      <Page n={3} className={s.manifesto}>
        <div className={s.largeCircle} aria-hidden="true">
          ✳
        </div>
        <p className={s.eyebrow}>OUR POINT OF VIEW</p>
        <h2>
          Đẹp để chạm.
          <br />
          <em>Rõ để hiểu.</em>
          <br />
          Tốt để ở lại.
        </h2>
        <div className={s.manifestoBottom}>
          <span className={s.smallLabel}>THIẾT KẾ CÓ CHỦ ĐÍCH</span>
          <p>
            Mỗi thương hiệu có một câu chuyện riêng. Chúng tôi tìm điều đáng nhớ
            trong câu chuyện ấy, rồi chuyển nó thành hình ảnh, nội dung và trải
            nghiệm mà người dùng có thể cảm nhận.
          </p>
        </div>
      </Page>
      <Page n={4} light className={s.about}>
        <div className={s.aboutArt}>
          <Artwork file="cover" />
          <span>
            LẠC
            <br />
            VIỆT.
          </span>
        </div>
        <div className={s.aboutCopy}>
          <p className={s.eyebrow}>A VIETNAMESE CREATIVE PARTNER</p>
          <h2>
            Bản sắc là gốc.
            <br />
            <em>Sáng tạo là cánh.</em>
          </h2>
          <p>
            Lạc Việt kết nối tư duy thương hiệu với thiết kế và công nghệ. Từ
            nét chữ đầu tiên đến lần chạm cuối cùng, chúng tôi hướng đến một
            trải nghiệm thống nhất và có cá tính.
          </p>
          <p>
            Chất Việt hiện diện trong cách kể chuyện, sự tinh tế của chất liệu
            và tinh thần làm việc gần gũi — để mỗi thương hiệu có thể tự tin
            bước vào không gian số.
          </p>
          <div className={s.signature}>
            Lạc Việt <small>STRATEGY / DESIGN / TECHNOLOGY</small>
          </div>
        </div>
      </Page>
      <Page n={5} className={s.capabilities}>
        <p className={s.eyebrow}>WHAT WE BRING TO THE TABLE</p>
        <h2>
          Từ một ý tưởng.
          <br />
          <em>Đến cả một hệ sinh thái.</em>
        </h2>
        <div className={s.services}>
          {[
            [
              "01",
              "Chiến lược",
              "Làm rõ định vị, khách hàng và cấu trúc câu chuyện.",
              "Định hướng thương hiệu / Kiến trúc nội dung",
            ],
            [
              "02",
              "Nhận diện",
              "Một ngôn ngữ hình ảnh có thể nhận ra ở mọi điểm chạm.",
              "Logo / Typography / Hệ thống ứng dụng",
            ],
            [
              "03",
              "Trải nghiệm số",
              "Website rõ ràng, dễ dùng và giàu bản sắc.",
              "UX & UI / Website / Responsive",
            ],
            [
              "04",
              "Nội dung & hình ảnh",
              "Kể câu chuyện bằng hình ảnh có chiều sâu.",
              "Art direction / Key visual / Nội dung số",
            ],
          ].map(([n, title, text, sub]) => (
            <div key={n}>
              <span>{n} ↗</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>{sub}</small>
            </div>
          ))}
        </div>
      </Page>
      <Page n={6} light className={s.process}>
        <p className={s.eyebrow}>THE CREATIVE PROCESS</p>
        <h2>
          Ý tưởng tốt.
          <br />
          <em>Cách làm rõ ràng.</em>
        </h2>
        <div className={s.processGrid}>
          {[
            [
              "Lắng nghe",
              "Hiểu bài toán, người dùng và điều thương hiệu muốn thay đổi.",
            ],
            [
              "Định hướng",
              "Thống nhất câu chuyện, cấu trúc nội dung và hướng mỹ thuật.",
            ],
            [
              "Thiết kế",
              "Phát triển bố cục, hình ảnh và luồng tương tác từ tổng thể đến chi tiết.",
            ],
            [
              "Hiện thực",
              "Lập trình, kiểm tra trên thiết bị và hoàn thiện trước khi bàn giao.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className={s.pullQuote}>Cùng nhìn về một hướng, ở từng bước.</p>
      </Page>
      <Page n={7} className={s.selected}>
        <div className={s.selectedHeading}>
          <div>
            <p className={s.eyebrow}>SELECTED CONCEPTS / 2026</p>
            <h2>
              Ba thế giới.
              <br />
              <em>Một tinh thần sáng tạo.</em>
            </h2>
          </div>
          <p>
            Các dự án concept thể hiện hướng thiết kế cho từng ngành: bản sắc
            riêng, câu chuyện riêng, trải nghiệm riêng.
          </p>
        </div>
        <div className={s.projectIndex}>
          {projects.map((p, i) => (
            <a key={p.name} href={`#${pageId(p.to)}`}>
              <div>
                <Artwork
                  file={p.file}
                  alt={`Không gian thương hiệu ${p.full}`}
                />
                <span>0{i + 1} ↗</span>
              </div>
              <h3>{p.full}</h3>
              <p>{p.field}</p>
            </a>
          ))}
        </div>
      </Page>
      {projects.map((p, index) => (
        <div key={p.file} className={s.casePair}>
          <Page n={p.to} className={s.caseStory}>
            <Artwork file={p.file} alt={p.field} />
            <div className={s.storyShade} />
            <div className={s.storyCopy}>
              <p className={s.eyebrow}>
                CONCEPT 0{index + 1} / {p.field}
              </p>
              <h2>{p.full}</h2>
              <p className={s.storyLine}>{p.line}</p>
              <span className={s.storyTag}>{p.tag}</span>
            </div>
            <div className={s.storyCaption}>
              <span>ART DIRECTION — LẠC VIỆT</span>
              <p>{p.note}</p>
            </div>
          </Page>
          <Page
            n={p.to + 1}
            light={p.file !== "light"}
            className={s.caseExperience}
          >
            <div className={s.experienceHeading}>
              <div>
                <p className={s.eyebrow}>FROM STORY TO SCREEN / 0{index + 1}</p>
                <h2>
                  {p.name}
                  <br />
                  <em>trong từng điểm chạm.</em>
                </h2>
              </div>
              <p>
                {p.file === "tea"
                  ? "Tông giấy ngà và xanh trà, khoảng thở rộng, lựa chọn sản phẩm dễ hiểu. Cảm giác của thương hiệu được giữ nguyên từ bao bì đến giao diện."
                  : p.file === "light"
                    ? "Tương phản sáng–tối dẫn mắt. Ảnh kiến trúc trở thành sân khấu cho sản phẩm, giúp người xem hình dung ánh sáng trong không gian sống."
                    : "Hình ảnh mở ra cảm hứng. Thông tin phòng, trải nghiệm và đặt lịch được tổ chức theo hành trình ra quyết định của khách."}
              </p>
            </div>
            <div className={s.deviceStage}>
              <Device p={p} />
              <Device p={p} mobile />
            </div>
            <div className={s.caseMetadata}>
              <span>UX/UI CONCEPT</span>
              <span>DESKTOP + MOBILE</span>
              <span>
                {p.file === "tea"
                  ? "IVORY / OLIVE / EARTH"
                  : p.file === "light"
                    ? "CHARCOAL / BRASS / AMBER"
                    : "SAGE / STONE / MIST"}
              </span>
            </div>
          </Page>
        </div>
      ))}
      <Page n={14} light className={s.designSystem}>
        <div>
          <p className={s.eyebrow}>THE VISUAL LANGUAGE</p>
          <h2>
            Một hệ thống.
            <br />
            <em>Nhiều cách biểu đạt.</em>
          </h2>
          <p>
            Hình ảnh có thể đổi theo câu chuyện. Những nguyên tắc về tương phản,
            nhịp chữ và khoảng cách giữ mọi thứ nhất quán.
          </p>
        </div>
        <div className={s.typeSpec}>
          <span className={s.giantType}>Aa</span>
          <div>
            <h3>Nét chữ có bản sắc.</h3>
            <p>
              Tiêu đề giàu biểu cảm.
              <br />
              Nội dung rõ ràng, dễ đọc.
            </p>
            <span>
              Ă Â Đ Ê Ô Ơ Ư<br />
              0123456789
            </span>
          </div>
        </div>
        <div className={s.swatches}>
          {[
            ["#111510", "MỰC / INK"],
            ["#c6a36b", "ĐỒNG / BRASS"],
            ["#f2ecdf", "GIẤY / PAPER"],
            ["#657461", "TRÀ / OLIVE"],
          ].map(([color, label]) => (
            <div
              key={color}
              style={{
                background: color,
                color:
                  color === "#f2ecdf" || color === "#c6a36b"
                    ? "#29261f"
                    : "#fff",
              }}
            >
              <span>{label}</span>
              <span>{color}</span>
            </div>
          ))}
        </div>
      </Page>
      <Page n={15} className={s.mobileChapter}>
        <div>
          <p className={s.eyebrow}>DESIGNED FOR EVERYDAY LIFE</p>
          <h2>
            Vừa một bàn tay.
            <br />
            <em>Đủ cả một thế giới.</em>
          </h2>
          <p>
            Thiết kế bắt đầu từ những thao tác thật: đọc bằng một tay, tìm thông
            tin nhanh, chạm đúng nút và tiếp tục đúng nơi đang xem.
          </p>
          <ul>
            <li>Nội dung có thứ tự ưu tiên</li>
            <li>Vùng chạm thoải mái</li>
            <li>Ảnh theo đúng kích thước màn hình</li>
            <li>Chuyển động tôn trọng người xem</li>
          </ul>
        </div>
        <div className={s.phoneTrio}>
          {projects.map((p) => (
            <Device key={p.name} p={p} mobile />
          ))}
        </div>
      </Page>
      <Page n={16} light className={s.handoff}>
        <p className={s.eyebrow}>CRAFT MEETS CLARITY</p>
        <h2>
          Bàn giao một hệ thống.
          <br />
          <em>Để tiếp tục phát triển.</em>
        </h2>
        <div className={s.handoffGrid}>
          <div className={s.folderArt} aria-hidden="true">
            <span>LV / 2026</span>
            <strong>
              THE
              <br />
              BRAND
              <br />
              TOOLKIT.
            </strong>
            <small>DESIGN · ASSETS · GUIDELINES</small>
          </div>
          <div className={s.handoffList}>
            {[
              [
                "Thiết kế & tài nguyên",
                "Bố cục, hình ảnh, component và các biến thể cần thiết theo phạm vi dự án.",
              ],
              [
                "Hướng dẫn sử dụng",
                "Quy tắc thương hiệu, cách cập nhật nội dung và những lưu ý vận hành.",
              ],
              [
                "Website & quản trị",
                "Trải nghiệm phía người dùng và công cụ quản trị phù hợp với nhu cầu.",
              ],
              [
                "Kế hoạch đồng hành",
                "Thống nhất đầu mối, phạm vi hỗ trợ và các bước phát triển tiếp theo.",
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
      <Page n={17} className={s.commitment}>
        <p className={s.eyebrow}>OUR WORKING PRINCIPLES</p>
        <h2>
          Tận tâm trong cách làm.
          <br />
          <em>Minh bạch trong cam kết.</em>
        </h2>
        <div className={s.principles}>
          {[
            [
              "Rõ từ đầu",
              "Mục tiêu, phạm vi và phần việc được trao đổi cụ thể trước khi bắt đầu.",
            ],
            [
              "Có trách nhiệm",
              "Mỗi quyết định thiết kế cần phục vụ một mục đích, mỗi phản hồi cần được lắng nghe.",
            ],
            [
              "Tôn trọng sở hữu",
              "Tài khoản, nội dung và tài nguyên được phân định quyền sử dụng trong bàn giao.",
            ],
            [
              "Cùng đi đường dài",
              "Thiết kế có cấu trúc để cập nhật, vận hành và phát triển theo từng giai đoạn.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className={s.commitmentLine}>
          CẦN <i>·</i> KIỆM <i>·</i> LIÊM <i>·</i> CHÍNH
        </div>
      </Page>
      <Page n={18} className={s.contact}>
        <Artwork file="cover" />
        <div className={s.contactShade} />
        <div className={s.contactCopy}>
          <p className={s.eyebrow}>THE NEXT CHAPTER IS OURS</p>
          <h2>
            Cùng kiến tạo
            <br />
            <em>giá trị Việt.</em>
          </h2>
          <p>Một câu chuyện mới bắt đầu từ cuộc trò chuyện đầu tiên.</p>
          <a className={s.contactButton} href="/lien-he">
            Kể chúng tôi nghe ý tưởng của bạn <span>↗</span>
          </a>
          <div className={s.contactLinks}>
            <a
              href="https://zalo.me/0355636882"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zalo ↗
            </a>
            <a
              href="https://t.me/lucifer_dvmxh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram ↗
            </a>
            <button onClick={() => window.print()}>In hồ sơ / Lưu PDF ↗</button>
          </div>
          <span className={s.endBrand}>LẠC VIỆT®</span>
        </div>
      </Page>
      <div className={s.bottomBar}>
        <span>LẠC VIỆT / HỒ SƠ NĂNG LỰC 2026</span>
        <span>Bản thiết kế concept · 18 trang</span>
        <button onClick={() => jump(1)}>Về trang bìa ↑</button>
      </div>
    </div>
  );
}
