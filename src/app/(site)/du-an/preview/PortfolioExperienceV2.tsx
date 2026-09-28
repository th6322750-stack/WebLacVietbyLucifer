"use client";

import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/lib/site-settings";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import s from "./portfolio-v2.module.css";
import { TeaStoryPolish, TeaApplicationPolish } from "./TeaCasePolish";
import teaPolish from "./tea-case-polish.module.css";

const chapters = [
  "Khởi nguồn",
  "Mục lục",
  "Tuyên ngôn",
  "Về Lạc Việt",
  "Năng lực",
  "Cách chúng tôi làm",
  "Dự án chọn lọc",
  "Bạch Trà · Câu chuyện",
  "Bạch Trà · Điểm chạm",
  "Dạ Quang · Câu chuyện",
  "Dạ Quang · Điểm chạm",
  "Vĩnh An · Câu chuyện",
  "Vĩnh An · Điểm chạm",
  "Ngôn ngữ thị giác",
  "Trải nghiệm di động",
  "Bàn giao & đồng hành",
  "Cam kết",
  "Kết nối",
];

const projects = [
  {
    slug: "tea",
    name: "Bạch Trà",
    full: "Bạch Trà Suối Giàng",
    field: "Trà Việt & sản vật bản địa",
    line: "Tinh hoa từ những miền mây.",
    hero: "tea",
    material: "tea-kit",
    accent: "#9b2f23",
    soft: "#c8c0a6",
    to: 8,
  },
  {
    slug: "light",
    name: "Dạ Quang",
    full: "Dạ Quang",
    field: "Chiếu sáng & kiến trúc",
    line: "Không gian được đánh thức.",
    hero: "light",
    material: "light-lab",
    accent: "#ef9f2f",
    soft: "#7ea7c4",
    to: 10,
  },
  {
    slug: "spa",
    name: "Vĩnh An",
    full: "Khoáng Nóng Vĩnh An",
    field: "Nghỉ dưỡng & chăm sóc thân tâm",
    line: "Một khoảng lặng, dành riêng cho bạn.",
    hero: "spa",
    material: "spa-kit",
    accent: "#517a69",
    soft: "#d7c8ad",
    to: 12,
  },
] as const;

const folioId = (n: number) => `folio-${String(n).padStart(2, "0")}`;

const projectModules = {
  tea: ["Trà cổ thụ", "Bộ quà", "Chuyện vùng cao"],
  light: ["Không gian", "Bộ sưu tập", "Thư viện ánh sáng"],
  spa: ["Trị liệu", "Lưu trú", "Hành trình nghỉ"],
} as const;

const projectImages = {
  tea: ["tea", "tea-kit", "tea-material-collage-v9"],
  light: ["light", "light-lab", "light-optical-sculpture-v9"],
  spa: ["spa-kit", "spa", "spa-ritual-cutout-v9-clean"],
} as const;

const projectDetails = {
  tea: { label: "TỪ VÙNG TRÀ ĐẾN TÁCH TRÀ", title: "Chậm lại. Thưởng một vị nguyên bản.", text: "Khám phá trà tuyển chọn và những bộ quà mang dấu ấn vùng cao.", action: "Khám phá bộ trà" },
  light: { label: "ÁNH SÁNG & VẬT LIỆU", title: "Một nguồn sáng. Một cảm xúc riêng.", text: "Tìm ngôn ngữ ánh sáng phù hợp với nhịp sống và từng không gian.", action: "Xem bộ sưu tập" },
  spa: { label: "KỲ NGHỈ THEO NHỊP RIÊNG", title: "Dành một ngày để trở về với mình.", text: "Chọn liệu trình, không gian nghỉ và trải nghiệm gần gũi thiên nhiên.", action: "Khám phá kỳ nghỉ" },
} as const;

function CaseNotes({ project }: { project: (typeof projects)[number] }) {
  const notes = {
    tea: ["Từ sản vật thành món quà", "Làm sao kể xuất xứ vùng cao mà vẫn tạo được một bộ quà đương đại, dễ chọn?", "Giấy ấm làm nền, dấu son phân cấp dòng trà. Trên website, ưu tiên xuất xứ và cách thưởng trà trước lời mời mua.", "Hệ nhãn · Hộp quà · Thẻ hướng dẫn · Trang sản phẩm"],
    light: ["Không bán một chiếc đèn", "Người xem cần hình dung ánh sáng trong không gian của mình, không chỉ nhìn một vật thể đẹp.", "Catalogue mở bằng bối cảnh sử dụng; mỗi lựa chọn nối vật liệu với hiệu ứng ánh sáng. Nền xanh đêm giữ sắc đồng nổi bật.", "Art direction · Catalogue · Thẻ vật liệu · Website"],
    spa: ["Để kỳ nghỉ bắt đầu nhẹ nhàng", "Giúp người xem tìm được trải nghiệm phù hợp mà không phải đọc một danh sách liệu trình dài.", "Bắt đầu bằng nhu cầu: nghỉ chậm, chăm sóc hay ở lại. Hiện phạm vi trải nghiệm trước khi đề nghị gửi yêu cầu tư vấn.", "Nhận diện · Menu trải nghiệm · Luồng đặt lịch · Website"],
  }[project.slug];
  return <div className={s.caseNotes}>
    <span>NGHIÊN CỨU THIẾT KẾ / CONCEPT</span>
    <h3>{notes[0]}</h3>
    <dl className={s.caseReasoning}>
      <div><dt>01 / BÀI TOÁN</dt><dd>{notes[1]}</dd></div>
      <div><dt>02 / QUYẾT ĐỊNH</dt><dd>{notes[2]}</dd></div>
      <div><dt>03 / BỘ BÀN GIAO ĐỀ XUẤT</dt><dd>{notes[3]}</dd></div>
    </dl>
  </div>;
}

function CaseStudyShowcase({ project }: { project: (typeof projects)[number] }) {
  const [selected, setSelected] = useState(0);
  const lightModes = [
    { name: "Catalogue", title: "Từ hình khối đến trang in.", image: "light-catalogue-spread-v12", detail: "Trang ảnh dẫn cảm xúc; bản vẽ tách lớp giải thích hình khối. Hai cách nhìn cùng kể một câu chuyện sản phẩm." },
    { name: "Chi tiết vật liệu", title: "Chạm vào sắc đồng.", image: "light-lab", detail: "Cận cảnh bề mặt, sắc độ và kết cấu giúp người xem hiểu lựa chọn vật liệu." },
    { name: "Hình khối", title: "Một vật thể, nhiều góc nhìn.", image: "light-optical-sculpture-v9", detail: "Nghiên cứu hình khối và bóng đổ làm nền cho hệ ảnh catalogue nhất quán." },
  ] as const;
  const rituals = [
    { name: "Nghỉ chậm", title: "Một kỳ nghỉ bắt đầu từ tờ giấy.", image: "spa-experience-menu-v12", detail: "Menu gấp · Thẻ chào đón · Hướng dẫn trải nghiệm. Cùng một ngôn ngữ từ lúc mở thư đến lúc chọn kỳ nghỉ." },
    { name: "Chăm sóc", title: "Nhẹ từ những điều nhỏ nhất.", image: "spa-kit", detail: "Nghi thức thư giãn · Hương thảo mộc · Tư vấn trải nghiệm phù hợp" },
    { name: "Ở lại", title: "Ở thêm một nhịp, nghỉ thêm một ngày.", image: "spa", detail: "Không gian lưu trú · Nhịp sinh hoạt chậm · Kết nối cảnh quan" },
  ] as const;
  const activeLight = lightModes[selected] ?? lightModes[0];
  const activeRitual = rituals[selected] ?? rituals[0];
  return <div className={`${s.caseShowcase} ${s[`${project.slug}Showcase`]}`}>
    {project.slug === "tea" ? <>
      <div className={s.packagingPhoto}><ArtworkViewer file="tea-packaging-spread-v12" title="Bản trải hộp, đai giấy và thẻ trà Bạch Trà" /><span>01 / PACKAGING STUDY</span></div>
      <div className={s.teaLabelBoard}><div><small>BẠCH TRÀ / SUỐI GIÀNG</small><h3>Một miền mây.<br /><em>Gói trong nếp giấy.</em></h3></div><div className={s.teaLabel}><span>SHAN TUYẾT</span><b>Bạch<br />Trà</b><small>TINH HOA TỪ NHỮNG MIỀN MÂY</small></div><div className={s.materialSwatches}><span><i style={{background:'#eee4cf'}} />Giấy ấm</span><span><i style={{background:'#344e38'}} />Xanh trà</span><span><i style={{background:'#983b2e'}} />Dấu son</span></div></div>
    </> : project.slug === "light" ? <>
      <div className={s.catalogueHead}><span>DẠ QUANG / MATERIAL & LIGHT</span><b>DQ—0{selected + 1}</b></div>
      <div className={s.cataloguePhoto}><ArtworkViewer file={activeLight.image} title={activeLight.title} /></div>
      <h3 className={s.catalogueTitle}>{activeLight.title}</h3>
      <div className={s.studyChoices} role="group" aria-label="Góc nhìn catalogue Dạ Quang">{lightModes.map((mode,i)=><button key={mode.name} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{String(i+1).padStart(2,'0')}<span>{mode.name}</span></button>)}</div>
      <p className={s.studyDetail} aria-live="polite">{activeLight.detail}</p>
    </> : <>
      <div className={s.ritualHead}><span>VĨNH AN / CHỌN NHỊP NGHỈ CỦA BẠN</span><h3>Hôm nay, bạn cần gì?</h3></div>
      <div className={s.studyChoices} role="group" aria-label="Trải nghiệm Vĩnh An">{rituals.map((ritual,i)=><button key={ritual.name} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span>{ritual.name}</span></button>)}</div>
      <div className={s.ritualPhoto}><ArtworkViewer file={activeRitual.image} title={activeRitual.title} /></div>
      <div className={s.ritualSummary} aria-live="polite"><h3>{activeRitual.title}</h3><p>{activeRitual.detail}</p><ol><li>Chọn trải nghiệm</li><li>Trao đổi lịch nghỉ</li><li>Xác nhận phạm vi</li></ol></div>
    </>}
    <details className={s.digitalDisclosure}><summary>Xem ứng dụng website <span>↗</span></summary><WebFrame project={project} /></details>
  </div>;
}

function ArtworkViewer({ file, title }: { file: string; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <div className={s.artworkImage} key={file}><Visual file={file} alt={title} /></div>
    <button ref={trigger} className={s.artworkZoom} aria-label={`Phóng to: ${title}`} onClick={() => dialog.current?.showModal()}>XEM CHI TIẾT <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className={s.artworkDialog} aria-label={title} onClose={() => trigger.current?.focus()} onKeyDown={(event) => {
      // This viewer has one focusable control; keep Tab inside the modal.
      if (event.key === "Tab") {
        event.preventDefault();
        event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={s.artworkDialogTop}><span>{title}</span><button autoFocus onClick={() => dialog.current?.close()} aria-label="Đóng ảnh">ĐÓNG ×</button></div>
      <Image src={`/assets/portfolio-2026/${file}.webp`} alt={title} width={1536} height={1024} sizes="95vw" />
    </dialog>
  </>;
}

function Visual({
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
      sizes="(max-width: 700px) 100vw, 90vw"
      className={s.visual}
    />
  );
}

function ArtLayer({
  file,
  className,
}: {
  file: string;
  className?: string;
}) {
  return (
    <span className={`${s.artLayer} ${className ?? ""}`} aria-hidden="true">
      <Image
        src={`/assets/portfolio-2026/${file}.webp`}
        alt=""
        fill
        sizes="(max-width: 700px) 100vw, 60vw"
        className={s.artLayerImage}
      />
    </span>
  );
}

function ChapterBand({
  roman,
  label,
}: {
  roman: string;
  label: string;
}) {
  return (
    <div className={s.chapterBand} aria-hidden="true">
      <b>{roman}</b>
      <i />
      <span>{label}</span>
    </div>
  );
}

function DongSonDrum({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${s.drumPattern} ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/assets/portfolio-2026/trong-dong-bronze-v3.webp"
        alt=""
        fill
        sizes="(max-width: 700px) 120vw, 70vw"
        className={s.drumAsset}
      />
    </span>
  );
}

function MaterialPassport({
  code,
  items,
}: {
  code: string;
  items: readonly string[];
}) {
  return (
    <div className={s.materialPassport} aria-hidden="true">
      <div className={s.materialPassportHead}>
        <span>MATERIAL PASSPORT</span>
        <b>{code}</b>
      </div>
      <div className={s.materialPassportItems}>
        {items.map((item, index) => (
          <span key={item}>
            <i>{String(index + 1).padStart(2, "0")}</i>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Scene({
  n,
  tone = "ink",
  className = "",
  children,
}: {
  n: number;
  tone?: "ink" | "paper" | "red" | "blue" | "sage";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={folioId(n)}
      data-folio={n}
      data-tone={tone}
      aria-label={`${n}. ${chapters[n - 1]}`}
      className={`${s.scene} ${s[tone]} ${className}`}
    >
      <div className={s.sceneMeta}>
        <span>LẠC VIỆT® / HỒ SƠ NĂNG LỰC</span>
        <span>{String(n).padStart(2, "0")} — 2026</span>
      </div>
      {children}
      <div className={s.sceneFoot}>
        <span>{chapters[n - 1]}</span>
        <span>LV / {String(n).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

function WebFrame({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className={`${s.webFrame} ${s[`${project.slug}Frame`]}`}
      style={{ "--accent": project.accent } as CSSProperties}
      role="img"
      aria-label={`Concept website ${project.full}`}
    >
      <div className={s.browserTop}>
        <i />
        <i />
        <i />
        <span>{project.name.toUpperCase()} / DIGITAL EXPERIENCE</span>
      </div>
      <div className={s.webNav}>
        <b>{project.name}</b>
        <span>
          Story&nbsp;&nbsp;&nbsp; Collection&nbsp;&nbsp;&nbsp; Contact
        </span>
      </div>
      <div className={s.webHero}>
        <Visual file={project.hero} />
        <div>
          <small>{project.field}</small>
          <strong>{project.line}</strong>
          <span>Khám phá ↗</span>
        </div>
      </div>
      <div className={s.webModules}>
        {projectModules[project.slug].map((module, index) => (
          <div key={module}>
            <Visual file={projectImages[project.slug][index] ?? project.hero} />
            <span>0{index + 1}</span>
            <b>{module}</b>
            <i aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className={s.webRail}>
        <span>01 / CÂU CHUYỆN</span>
        <span>02 / TRẢI NGHIỆM</span>
        <span>03 / KẾT NỐI</span>
      </div>
      <div className={s.webFeature}>
        <div className={s.featureImage}><Visual file={project.material} /></div>
        <div><small>{projectDetails[project.slug].label}</small><b>{projectDetails[project.slug].title}</b><p>{projectDetails[project.slug].text}</p><span>{projectDetails[project.slug].action} ↗</span></div>
      </div>
    </div>
  );
}

function PhoneFrame({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className={`${s.phoneFrame} ${s[`${project.slug}Frame`]}`}
      style={{ "--accent": project.accent } as CSSProperties}
      role="img"
      aria-label={`Concept mobile ${project.full}`}
    >
      <div className={s.phoneNotch} />
      <div className={s.phoneNav}>
        <b>{project.name}</b>
        <span>••</span>
      </div>
      <div className={s.phoneHero}>
        <Visual file={project.hero} />
        <small>0{project.to - 7} / FEATURED</small>
        <strong>{project.line}</strong>
      </div>
      <div className={s.phoneTabs}>
        <b>Khám phá</b>
        <span>Câu chuyện</span>
        <span>Kết nối</span>
      </div>
      <div className={s.phoneCards}>
        {projectModules[project.slug].map((module, index) => (
          <span key={module}><Visual file={projectImages[project.slug][index] ?? project.hero} /><b>{module}</b></span>
        ))}
      </div>
      <div className={s.phoneFeature}>
        <div className={s.featureImage}><Visual file={project.material} /></div>
        <div><small>GỢI Ý DÀNH CHO BẠN</small><b>{projectDetails[project.slug].title}</b><span>{projectDetails[project.slug].action} ↗</span></div>
      </div>
      <div className={s.phoneBottom}><b>{project.name}</b><span>Khám phá · Lưu lại · Kết nối</span></div>
    </div>
  );
}

export function PortfolioExperienceV2() {
  const [current, setCurrent] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!/^folio-\d{2}$/.test(id)) return;
    const alignChapter = () => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(alignChapter));
    const timer = window.setTimeout(alignChapter, 800);
    void document.fonts.ready.then(alignChapter);
    window.addEventListener("load", alignChapter, { once: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", alignChapter);
    };
  }, []);

  useEffect(() => {
    const scenes = document.querySelectorAll<HTMLElement>("[data-folio]");
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          scenes.forEach((scene) => scene.removeAttribute("data-active"));
          (entry.target as HTMLElement).dataset.active = "true";
          setCurrent(Number((entry.target as HTMLElement).dataset.folio));
        }
      },
      { rootMargin: "-35% 0px -50% 0px" },
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            (entry.target as HTMLElement).dataset.visible = "true";
        }
      },
      { threshold: 0.12 },
    );
    scenes.forEach((scene) => sceneObserver.observe(scene));
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((item) => revealObserver.observe(item));
    return () => {
      sceneObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      node.style.setProperty("--pointer-x", `${event.clientX}px`);
      node.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const jump = (n: number) => {
    if (menu.current) menu.current.open = false;
    const id = folioId(n);
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <div ref={root} data-portfolio className={s.portfolio}>
      <div className={s.pointerGlow} aria-hidden="true" />
      <nav className={s.toolbar} aria-label="Điều hướng hồ sơ năng lực">
        <Link href="/" className={s.brand}>
          LẠC VIỆT<span>CREATIVE PRACTICE</span>
        </Link>
        <span className={s.navManifesto}>
          Từ bản sắc Việt / tới trải nghiệm số
        </span>
        <div className={s.chapterControls}>
          <button aria-label="Chương trước" disabled={current === 1} onClick={() => jump(current - 1)}>←</button>
          <button aria-label="Chương tiếp theo" disabled={current === chapters.length} onClick={() => jump(current + 1)}>→</button>
        </div>
        <details ref={menu} className={s.menu} onKeyDown={(event) => {
          if (event.key === "Escape" && menu.current) {
            menu.current.open = false;
            menu.current.querySelector("summary")?.focus();
          }
        }}>
          <summary>
            <span>{String(current).padStart(2, "0")} / 18</span>
            <b>MENU</b>
          </summary>
          <div className={s.menuPanel}>
            <div className={s.menuIntro}>
              <small>HỒ SƠ NĂNG LỰC / 2026</small>
              <strong>Đi đến một chương.</strong>
            </div>
            <div className={s.menuGrid}>
              {chapters.map((title, index) => (
                <button
                  key={title}
                  onClick={() => jump(index + 1)}
                  aria-current={current === index + 1 ? "location" : undefined}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </button>
              ))}
            </div>
          </div>
        </details>
      </nav>
      <div
        className={s.progress}
        style={{ transform: `scaleX(${current / 18})` }}
      />

      <Scene n={1} className={s.cover}>
        <Visual
          file="cover"
          priority
          alt="Chim Lạc bằng đồng giữa núi Việt Nam"
        />
        <div className={s.coverWash} />
        <div className={s.coverTitle} data-reveal>
          <p>CREATIVE PRACTICE / VIETNAM</p>
          <h1>
            Hồ sơ
            <span>năng lực</span>
          </h1>
          <div className={s.coverEdition}>
            <strong>20</strong>
            <i />
            <strong>26</strong>
          </div>
        </div>
        <div className={s.coverStatement} data-reveal>
          <span className={s.coverStatementKicker}>LẠC VIỆT / 2026</span>
          <p>
            Kết nối giá trị.
            <br />
            Kiến tạo tương lai.
          </p>
          <a href={`#${folioId(2)}`}>
            BẮT ĐẦU KHÁM PHÁ <span>↓</span>
          </a>
        </div>
      </Scene>

      <Scene n={2} tone="paper" className={s.indexScene}>
        <DongSonDrum className={s.indexPattern} />
        <div className={s.indexLead} data-reveal>
          <span>THE CONTENTS</span>
          <h2>
            Mười tám
            <br />
            <em>nhịp kể.</em>
          </h2>
          <p>
            Một hành trình từ bản sắc, qua ba thế giới dự án, tới hệ thống có
            thể sống và phát triển.
          </p>
        </div>
        <div className={s.indexColumns}>
          {[
            ["I", 3, 6, "TƯ DUY"],
            ["II", 7, 13, "THẾ GIỚI"],
            ["III", 14, 18, "HỆ THỐNG"],
          ].map(([roman, from, to, label], groupIndex) => (
            <div
              key={String(roman)}
              data-reveal
              style={{ "--delay": `${groupIndex * 100}ms` } as CSSProperties}
            >
              <div>
                <b>{roman}</b>
                <span>{label}</span>
              </div>
              {chapters
                .slice(Number(from) - 1, Number(to))
                .map((title, index) => (
                  <a key={title} href={`#${folioId(Number(from) + index)}`}>
                    <span>{title}</span>
                    <b>{String(Number(from) + index).padStart(2, "0")}</b>
                  </a>
                ))}
            </div>
          ))}
        </div>
      </Scene>

      <Scene n={3} tone="red" className={s.manifestoScene}>
        <ArtLayer
          file="craft-ephemera-v5"
          className={s.manifestoCraftLayer}
        />
        <ArtLayer
          file="manifesto-punctuation-v10"
          className={s.manifestoPunctuationLayer}
        />
        <div className={s.manifestoWord} aria-hidden="true">
          CHẠM
        </div>
        <div className={s.manifestoCore} data-reveal>
          <span>01 / TUYÊN NGÔN</span>
          <h2>
            Đẹp để <i>chạm.</i>
            <br />
            Rõ để hiểu.
            <br />
            <em>Tốt để ở lại.</em>
          </h2>
        </div>
        <div className={s.manifestoNote} data-reveal>
          <b>THIẾT KẾ CÓ CHỦ ĐÍCH</b>
          <p>
            Không trang trí một câu chuyện. Chúng tôi tìm nhịp điệu, chất liệu
            và điểm chạm để câu chuyện tự cất tiếng.
          </p>
        </div>
        <div className={s.marquee} aria-hidden="true">
          <span>
            BẢN SẮC — CHIẾN LƯỢC — THỦ CÔNG — CÔNG NGHỆ — BẢN SẮC — CHIẾN LƯỢC
            —{" "}
          </span>
        </div>
      </Scene>

      <Scene n={4} className={s.studioScene}>
        <div className={s.studioPhoto} data-reveal>
          <Visual
            file="studio"
            alt="Bàn làm việc sáng tạo với giấy dó và bản phác thảo"
          />
        </div>
        <div className={s.studioPaper} data-reveal>
          <span>WHO WE ARE / 04</span>
          <h2>
            Bản sắc
            <br />
            là <em>phương pháp.</em>
          </h2>
          <p>
            Lạc Việt kết nối tư duy thương hiệu, thiết kế và công nghệ. Chúng
            tôi bắt đầu từ điều thật nhất của một thương hiệu rồi xây nên một
            ngôn ngữ có thể nhận ra ở mọi điểm chạm.
          </p>
          <div className={s.handNote}>
            Tìm cái riêng.
            <br />
            Làm cho tới.
          </div>
        </div>
      </Scene>

      <Scene n={5} className={s.capabilityScene}>
        <DongSonDrum className={s.capabilityPattern} />
        <ArtLayer
          file="heritage-constellation-v5"
          className={s.capabilityHeritageLayer}
        />
        <ArtLayer
          file="capability-instruments-v10"
          className={s.capabilityInstrumentsLayer}
        />
        <div className={s.capabilityTitle} data-reveal>
          <span>WHAT WE DO / 05</span>
          <h2>
            Một hạt nhân.
            <br />
            <em>Bốn lực chuyển động.</em>
          </h2>
          <p className={s.capabilityNote}>
            Từ thương hiệu mới đến website cần làm lại: xác định đúng việc,
            thiết kế thành hệ thống và bàn giao để đội ngũ tiếp quản.
          </p>
        </div>
        <div className={s.capabilityOrbit}>
          {[
            ["01", "Chiến lược", "Làm rõ khách hàng, thông điệp và cấu trúc nội dung trước khi thiết kế."],
            ["02", "Nhận diện", "Logo, hệ chữ, bảng màu và bộ ứng dụng cùng một ngôn ngữ."],
            ["03", "Trải nghiệm", "Luồng thao tác, giao diện mobile và website có thể quản trị."],
            ["04", "Nội dung", "Định hướng hình ảnh, nội dung trang và mẫu dùng lại cho đội ngũ."],
          ].map(([n, title, text], index) => (
            <div
              key={n}
              className={s.capabilityNode}
              data-reveal
              style={
                { "--i": index, "--delay": `${index * 120}ms` } as CSSProperties
              }
            >
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Scene>

      <Scene n={6} tone="paper" className={s.processScene}>
        <div className={s.processBoard}>
          <Visual
            file="process-board-v4"
            alt="Bàn quy trình sáng tạo từ nghiên cứu đến hiện thực hóa"
          />
        </div>
        <div className={s.processShade} />
        <div className={s.processTitle} data-reveal>
          <span>06 / A LIVING PROCESS</span>
          <h2>
            Từ điều nghe thấy.
            <br />
            <em>Tới điều chạm được.</em>
          </h2>
        </div>
        <div className={s.processPath}>
          {[
            ["01", "LẮNG NGHE", "Chốt mục tiêu, phạm vi và người duyệt."],
            ["02", "ĐỊNH HƯỚNG", "Duyệt cấu trúc, nội dung và hướng hình ảnh."],
            ["03", "CHẾ TÁC", "Xem nguyên mẫu, góp ý theo từng hạng mục."],
            ["04", "BÀN GIAO", "Kiểm thử, hướng dẫn quản trị và thống nhất hỗ trợ."],
          ].map(([n, title, text], index) => (
            <div
              key={n}
              className={s.processStop}
              data-reveal
              style={
                { "--i": index, "--delay": `${index * 130}ms` } as CSSProperties
              }
            >
              <b>{n}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className={s.processQuote} data-reveal>
          <span>KHÔNG PHẢI BỐN CHIẾC HỘP</span>
          <b>Một vòng làm rõ liên tục.</b>
        </div>
      </Scene>

      <Scene n={7} className={s.projectPortal}>
        <ChapterBand roman="II" label="SELECTED WORLDS" />
        <div className={s.portalTitle} data-reveal>
          <span>SELECTED CONCEPT WORLDS</span>
          <h2>
            Ba thế giới.
            <br />
            <em>Ba nhịp thở riêng.</em>
          </h2>
          <p className={s.portalSummary}>
            Ba dự án ý tưởng tự khởi xướng để trình bày cách thiết kế của Lạc Việt.
            Hình ảnh là mô phỏng, không phải hồ sơ khách hàng đã triển khai.
          </p>
        </div>
        <div className={s.projectMosaic}>
          {projects.map((project, index) => (
            <a
              key={project.slug}
              href={`#${folioId(project.to)}`}
              className={s.projectTile}
              data-reveal
              style={
                {
                  "--i": index,
                  "--accent": project.accent,
                  "--delay": `${index * 130}ms`,
                } as CSSProperties
              }
            >
              <div className={s.tileVisual}>
                <Visual file={project.hero} alt={project.full} />
              </div>
              <div className={s.tileCopy}>
                <span className={s.tileIndex}>0{index + 1}</span>
                <div>
                  <p>{project.field} / CONCEPT WORLD</p>
                  <h3>{project.full}</h3>
                </div>
                <b>VIEW CASE ↗</b>
              </div>
            </a>
          ))}
        </div>
      </Scene>

      <Scene n={8} tone="paper" className={teaPolish.storyScene}>
        <TeaStoryPolish />
      </Scene>

      <Scene n={9} tone="paper" className={teaPolish.applicationScene}>
        <TeaApplicationPolish
          artwork={<ArtworkViewer file="tea-packaging-spread-v12" title="Bản trải hộp, đai giấy và thẻ trà Bạch Trà" />}
          website={<WebFrame project={projects[0]} />}
        />
      </Scene>

      <Scene n={10} tone="blue" className={`${s.caseStory} ${s.lightStory}`}>
        <div className={s.fullBleed}>
          <Visual file="light" alt="Không gian kiến trúc Dạ Quang" />
        </div>
        <div className={s.lightBeam} aria-hidden="true" />
        <div className={s.caseTitle} data-reveal>
          <span>CONCEPT 02 / ÁNH SÁNG & KIẾN TRÚC</span>
          <h2>
            Dạ
            <br />
            <em>Quang.</em>
          </h2>
          <p>Không gian được đánh thức.</p>
        </div>
        <div className={s.lightObject} data-reveal>
          <Visual file="light-lab" alt="Vật liệu và đèn thử nghiệm" />
        </div>
      </Scene>

      <Scene
        n={11}
        tone="blue"
        className={`${s.applicationScene} ${s.lightApplication}`}
      >
        <ArtLayer
          file="light-optical-sculpture-v9"
          className={s.lightOpticalLayer}
        />
        <div className={s.lightLab}>
          <Visual file="light-lab" alt="Bàn thử nghiệm ánh sáng" />
        </div>
        <div className={s.applicationIntro} data-reveal>
          <span>DẠ QUANG / LIGHT AS MATERIAL</span>
          <h2>
            Thiết kế
            <br />
            bằng <em>bóng tối.</em>
          </h2>
          <p>
            Ánh sáng không chỉ soi vật thể. Nó định hình khoảng lặng, dẫn mắt và
            biến mỗi lần cuộn thành một lớp không gian mới.
          </p>
        </div>
        <CaseNotes project={projects[1]} />
        <CaseStudyShowcase project={projects[1]} />
        <div className={s.beamLabels}>
          <span>2700K / WARM</span>
          <span>06:42 PM</span>
          <span>BRASS / SMOKED GLASS</span>
        </div>
        <MaterialPassport
          code="DQ / 02"
          items={["THẤU KÍNH", "ĐỒNG XƯỚC", "BÓNG ĐỔ"]}
        />
      </Scene>

      <Scene n={12} tone="sage" className={`${s.caseStory} ${s.spaStory}`}>
        <ArtLayer file="spa-ritual-v7" className={s.spaRitualLayer} />
        <ArtLayer
          file="spa-water-ritual-v10"
          className={s.spaWaterRitualLayer}
        />
        <div className={s.spaCrop}>
          <Visual file="spa" alt="Khoáng nóng Vĩnh An" />
        </div>
        <div className={s.spaMist} />
        <div className={s.caseTitle} data-reveal>
          <span>CONCEPT 03 / WELLNESS & HOSPITALITY</span>
          <h2>Vĩnh An.</h2>
          <p>
            Một khoảng lặng,
            <br />
            dành riêng cho bạn.
          </p>
        </div>
        <div className={s.spaWords} aria-hidden="true">
          <span>THỞ</span>
          <span>CHẠM</span>
          <span>TRỞ VỀ</span>
        </div>
      </Scene>

      <Scene
        n={13}
        tone="paper"
        className={`${s.applicationScene} ${s.spaApplication}`}
      >
        <ArtLayer
          file="spa-ritual-cutout-v9-clean"
          className={s.spaRitualStillLifeLayer}
        />
        <div className={s.spaMaterial}>
          <Visual file="spa-kit" alt="Bộ vật phẩm nghỉ dưỡng Vĩnh An" />
        </div>
        <div className={s.applicationIntro} data-reveal>
          <span>VĨNH AN / A QUIET DIGITAL RITUAL</span>
          <h2>
            Từ hơi nước.
            <br />
            <em>Tới hành trình nghỉ dưỡng.</em>
          </h2>
          <p>
            Trải nghiệm số không thúc giục. Nó mở dần từng lớp thông tin như một
            nghi thức chuẩn bị cho chuyến đi.
          </p>
        </div>
        <CaseNotes project={projects[2]} />
        <CaseStudyShowcase project={projects[2]} />
        <MaterialPassport
          code="VA / 03"
          items={["ĐÁ KHOÁNG", "VẢI LANH", "HƯƠNG THẢO"]}
        />
      </Scene>

      <Scene n={14} tone="paper" className={s.languageScene}>
        <ChapterBand roman="III" label="THE LIVING SYSTEM" />
        <div className={s.languagePhoto}>
          <Visual
            file="identity-board-v4"
            alt="Bộ ngôn ngữ nhận diện gồm cấu trúc dấu, chữ, màu và họa tiết"
          />
        </div>
        <ArtLayer file="craft-ephemera-v5" className={s.languageCraftLayer} />
        <div className={s.languageTitle} data-reveal>
          <span>14 / VISUAL GRAMMAR</span>
          <h2>
            Không chỉ
            <br />
            một logo.
            <br />
            <em>Một cách được nhận ra.</em>
          </h2>
          <p>
            Dấu, chữ, màu và chất liệu cùng nói một giọng — dù xuất hiện trên
            giấy, màn hình hay trong một khoảnh khắc rất nhỏ.
          </p>
        </div>
        <div className={s.grammarRail} data-reveal>
          {[
            ["01", "DẤU", "Logo chính, bản thu gọn và khoảng cách an toàn."],
            ["02", "CHỮ", "Hệ chữ có dấu tiếng Việt, cỡ chữ và thứ bậc rõ ràng."],
            ["03", "HỌA", "Họa tiết và cách dùng để không lấn át nội dung."],
            ["04", "CHẤT", "Màu sắc, chất liệu và hướng xử lý hình ảnh đồng bộ."],
          ].map(([number, title, detail]) => (
            <div key={number}>
              <span>{number}</span>
              <b>{title}</b>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </Scene>

      <Scene n={15} className={s.mobileScene}>
        <ArtLayer
          file="mobile-touch-choreography-v9"
          className={s.mobileTouchChoreographyLayer}
        />
        <div className={s.mobileTitle} data-reveal>
          <span>MOBILE IS NOT A SMALL DESKTOP</span>
          <h2>
            Vừa một
            <br />
            bàn tay.
            <br />
            <em>Đủ một thế giới.</em>
          </h2>
          <p>
            Mỗi nhịp chạm được thiết kế lại cho màn hình nhỏ: thứ tự nội dung,
            khoảng nghỉ, vùng bấm và chuyển động.
          </p>
        </div>
        <div className={s.phoneStage}>
          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-reveal
              style={
                { "--i": index, "--delay": `${index * 140}ms` } as CSSProperties
              }
            >
              <PhoneFrame project={project} />
            </div>
          ))}
        </div>
        <DongSonDrum className={s.mobilePattern} />
      </Scene>

      <Scene n={16} tone="paper" className={s.handoffScene}>
        <div className={s.handoffPhoto}>
          <Visual
            file="handoff-kit-v4"
            alt="Bộ bàn giao thương hiệu hoàn chỉnh trên sách, thiết bị và vật phẩm"
          />
        </div>
        <div className={s.handoffShade} />
        <div className={s.handoffTitle} data-reveal>
          <span>16 / THE HANDOFF IS A BEGINNING</span>
          <h2>
            Không giao
            <br />
            một file.
            <br />
            <em>Giao một hệ thống.</em>
          </h2>
          <p>
            Bộ bàn giao theo phạm vi đã chốt: tệp nguồn, quy chuẩn và hướng dẫn
            để đội ngũ sử dụng, cập nhật và phát triển tiếp.
          </p>
        </div>
        <div className={s.handoffArtifacts}>
          {[
            ["01", "QUY CHUẨN", "Cách dùng logo, màu, chữ và hình ảnh."],
            ["02", "THƯ VIỆN UI", "Thành phần và trạng thái có thể dùng lại."],
            ["03", "BỘ NỘI DUNG", "Mẫu trang và khung nội dung đã thống nhất."],
            ["04", "NGUỒN & HƯỚNG DẪN", "Tệp thiết kế, mã nguồn thuộc phạm vi, hướng dẫn quản trị."],
          ].map(([number, title, detail]) => (
            <div className={s.handoffLine} data-reveal key={number}>
              <span>{number}</span>
              <b>{title}</b>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </Scene>

      <Scene n={17} tone="red" className={s.principleScene}>
        <DongSonDrum className={s.principlePattern} />
        <ArtLayer
          file="promise-mechanism-v10"
          className={s.principleSealLayer}
        />
        <div className={s.principleTitle} data-reveal>
          <span>17 / FOUR PRINCIPLES</span>
          <h2>
            Làm đẹp.
            <br />
            <em>Làm đúng.</em>
            <br />
            Làm tới.
          </h2>
        </div>
        <div className={s.principleList}>
          {[
            ["RÕ TỪ ĐẦU", "Phạm vi, mục tiêu và giới hạn được gọi đúng tên."],
            [
              "CÓ TRÁCH NHIỆM",
              "Mỗi quyết định đều có lý do và người chịu trách nhiệm.",
            ],
            [
              "TÔN TRỌNG SỞ HỮU",
              "Tài khoản, dữ liệu và giá trị thuộc về khách hàng.",
            ],
            [
              "CÙNG ĐI ĐƯỜNG DÀI",
              "Thiết kế cho vận hành, không chỉ cho ngày ra mắt.",
            ],
          ].map(([item, detail], index) => (
            <div
              key={item}
              data-reveal
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <span>0{index + 1}</span>
              <div>
                <b>{item}</b>
                <p>{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={s.principleRibbon}>CẦN · KIỆM · LIÊM · CHÍNH</div>
      </Scene>

      <Scene n={18} className={s.contactScene}>
        <ChapterBand roman="IV" label="THE NEXT CHAPTER" />
        <DongSonDrum className={s.contactPattern} />
        <div className={s.contactTitle} data-reveal>
          <span>THE NEXT CHAPTER IS OURS / 18</span>
          <h2>
            Cùng làm
            <br />
            một điều
            <br />
            <em>đáng nhớ.</em>
          </h2>
        </div>
        <div className={s.contactPanel} data-reveal>
          <p>Một câu chuyện mới bắt đầu từ cuộc trò chuyện đầu tiên.</p>
          <Link href="/lien-he">
            KỂ CHÚNG TÔI NGHE Ý TƯỞNG <span>↗</span>
          </Link>
          <div>
            <a
              href={`https://zalo.me/${siteSettings.zalo}`}
              target="_blank"
              rel="noreferrer"
            >
              ZALO ↗
            </a>
            <a
              href={`https://t.me/${siteSettings.telegram.replace(/^@/, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              TELEGRAM ↗
            </a>
            <a href="/downloads/lac-viet-ho-so-nang-luc-2026.pdf" download="Lac-Viet-Ho-So-Nang-Luc-2026.pdf">TẢI PDF · 25 MB ↓</a>
          </div>
        </div>
        <div className={s.finalMark}>
          LẠC VIỆT® <span>CREATIVE PRACTICE / VIETNAM</span>
        </div>
      </Scene>

      <footer className={s.bottomBar}>
        <span>LẠC VIỆT / COMPANY PROFILE 2026</span>
        <button onClick={() => jump(1)}>VỀ BÌA ↑</button>
      </footer>
    </div>
  );
}
