# Lạc Việt Media Agency — Design System GĐ2

**Revision:** `gd2-v1`  
**Status:** LOCKED  
**Date:** 2026-08-14  
**Workflow:** webbyLucifer v2.2  

## 1. Design direction

Tên hướng: **Premium Modern Vietnamese Agency**.

Mục tiêu thị giác:
- chuyên nghiệp, cao cấp nhưng không phô trương;
- nền sáng ivory/trắng là chủ đạo cho nội dung;
- đen than dùng cho hero, CTA, header/footer và các block nhấn mạnh;
- vàng kim chỉ là accent, không phủ toàn trang;
- giữ chất Việt qua biểu tượng chim Lạc/trống đồng nhưng UI phải hiện đại, sạch và dễ đọc;
- ưu tiên conversion cho dịch vụ Website trước, sau đó Support MXH và Dịch vụ số.

### MUST NOT
- Không đổi logo sang phiên bản AI-generated khác.
- Không biến giao diện thành casino/crypto bằng quá nhiều gold/glow/3D.
- Không dùng gold sáng làm body text trên nền trắng.
- Không dùng animation nặng, parallax dày đặc hoặc hiệu ứng làm chậm CTA.
- Không publish testimonial, số liệu, khách hàng hay kết quả demo như dữ kiện thật nếu chưa được thay bằng dữ liệu thật.

---

## 2. Logo production

**Canonical source:** logo gốc do Lucifer cung cấp trong GĐ0, ảnh PNG 480×480.  
**SHA-256:** `b8d4682cc216e662d8cb32968329b7a4f24ee9a89c3191653dafafe338181504`.

Production target path:
`assets/brand/lac-viet-logo-source.png`

Quy tắc:
- giữ nguyên hình chim Lạc + trống đồng + wordmark gốc;
- không tự redraw/vectorize/recolor nếu chưa được Lucifer duyệt;
- không dùng các logo AI render thử trước đó;
- khi cần transparent SVG/horizontal lockup mà source không đáp ứng, mở request thay vì tự chế.

Kích thước hiển thị tham chiếu:
- desktop header: max-height 44px;
- mobile header: max-height 36px;
- footer: max-height 48px;
- không kéo méo tỷ lệ.

---

## 3. Typography

### Heading / editorial
`Noto Serif Display`

Fallback:
`Georgia, 'Times New Roman', serif`

Weights: 500, 600, 700.

### Body / UI
`Be Vietnam Pro`

Fallback:
`Inter, system-ui, -apple-system, 'Segoe UI', sans-serif`

Weights: 400, 500, 600, 700.

### Scale desktop
- Display: 64px / 1.05 / 600 / -0.025em
- H1: 56px / 1.08 / 600 / -0.022em
- H2: 40px / 1.15 / 600 / -0.018em
- H3: 28px / 1.25 / 600 / -0.012em
- H4: 22px / 1.30 / 600
- Body XL: 20px / 1.65 / 400
- Body LG: 18px / 1.70 / 400
- Body: 16px / 1.70 / 400
- Small: 14px / 1.60 / 400
- Caption: 12px / 1.50 / 500
- Eyebrow: 12px / 1.20 / 700 / 0.14em / uppercase

### Scale mobile
- Display/H1: 40px / 1.10
- H2: 32px / 1.18
- H3: 24px / 1.28
- H4: 20px / 1.30
- Body: giữ 16px, không giảm body xuống dưới 16px cho nội dung chính.

---

## 4. Color system

### Core
- Ink 950: `#0B0B0B`
- Ink 900: `#111111`
- Ink 800: `#1B1B1B`
- Ivory 50: `#FCFAF6`
- Ivory 100: `#F7F2E8`
- White: `#FFFFFF`

### Gold
- Gold 300: `#F0CF73`
- **Gold 500 / Brand:** `#D4AF37`
- Gold 600: `#B8891F`
- Gold 700 / readable text on light: `#8A6111`

### Neutral
- Text primary: `#171717`
- Text secondary: `#655F56`
- Text muted: `#8D867C`
- Border: `#E6DED0`
- Border strong: `#CFC3B0`

### Semantic
- Success: `#18794E`
- Error: `#B42318`
- Warning: `#A15C00`
- Info: `#246BCE`

### Gradients
Gold metallic:
`linear-gradient(135deg, #F6D778 0%, #D4AF37 45%, #A97817 100%)`

Dark hero:
`radial-gradient(circle at 72% 38%, rgba(212,175,55,.16), transparent 44%), #0B0B0B`

Accessibility rule: gold 500 chủ yếu dùng background/icon/decorative. Text nhỏ trên nền sáng dùng Gold 700 hoặc Ink.

---

## 5. Spacing & layout

Base grid: **4px**.

Tokens:
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120px`.

Section vertical spacing:
- desktop: 96px mặc định;
- tablet: 72px;
- mobile: 56px.

Containers:
- standard max-width: 1280px;
- editorial/text max-width: 720px;
- wide visual max-width: 1360px;
- desktop gutter: 32px;
- tablet gutter: 24px;
- mobile gutter: 16px.

Grid:
- desktop: 12 columns;
- tablet: 8 columns;
- mobile: 4 columns.

---

## 6. Border / radius / shadow

Borders:
- normal: 1px;
- selected/important: 1px Gold 300/500;
- focus: 2px visual ring, không thay đổi layout.

Radius:
- xs: 8px
- sm: 10px
- md: 14px
- lg: 16px
- xl: 24px
- pill: 999px

Shadows:
- sm: `0 4px 16px rgba(18,14,8,.06)`
- md: `0 10px 30px rgba(18,14,8,.10)`
- lg: `0 18px 50px rgba(18,14,8,.14)`
- gold-focus: `0 0 0 3px rgba(212,175,55,.24)`

---

## 7. Buttons

Minimum touch target: **44×44px**.

Sizes:
- sm: 40px height;
- md: 48px height;
- lg: 52px height.

Default radius: 10px.

### Primary Gold
- background: gold metallic gradient;
- text: Ink 950;
- font: 14px/600;
- hover: translateY(-1px), tăng shadow, không đổi hue mạnh;
- active: translateY(0), giảm shadow;
- focus-visible: gold-focus ring.

### Secondary Dark
- bg: Ink 950;
- text: White;
- border: 1px solid Ink 950;
- hover: Ink 800.

### Outline
- light background: border Ink 900, text Ink 900;
- dark background: border Gold 500, text Gold 300;
- hover: gold tint nhẹ.

### Ghost
Dùng cho tertiary actions, không dùng làm CTA chính.

Disabled: opacity 0.48; cursor not-allowed; không hover transform.

---

## 8. Cards

### Base light card
- bg White;
- border 1px Border;
- radius 14px;
- padding 24px desktop / 20px mobile;
- shadow sm;
- pointer hover: translateY(-3px), shadow md, border Gold 300.

### Dark emphasis card
- bg Ink 950;
- text White;
- accent Gold 300/500;
- radius 16px;
- không dùng glow quá mạnh.

### Project card
- media ratio 16:10;
- image object-fit cover;
- category chip + title + short result/summary + CTA;
- demo result phải có data flag `demoOnly` cho tới khi thay bằng dữ liệu thật.

### Article card
- media ratio 16:9;
- category + title + excerpt + meta;
- title tối đa 3 dòng trong listing.

### Pricing card
- plan name + price/CTA + feature list;
- featured variant chỉ dùng một card trong group;
- không dùng fake scarcity.

---

## 9. Forms

Input/select height: 48px desktop & mobile.  
Textarea min-height: 128px.  
Radius: 10px.  
Label: 14px/600.  
Input text: 16px/400.

States:
- default border `#D8D0C2`;
- hover border Border strong;
- focus border Gold 600 + `gold-focus` ring;
- error border Error + error helper text;
- success border Success khi cần;
- disabled bg `#F2EFE9`, text muted.

Placeholder: `#9A948B`.

Required fields phải hiển thị rõ. Error message không chỉ dựa vào màu.

Form “Nhận tư vấn” tối thiểu:
- Họ tên;
- Số điện thoại;
- Email optional;
- Nhu cầu;
- Dịch vụ quan tâm;
- Kênh liên hệ ưu tiên;
- consent/privacy checkbox khi thu dữ liệu.

---

## 10. Icon style

System icons: **Lucide** hoặc bộ outline tương đương, stroke 1.75–2px, rounded caps.

Sizes:
- inline: 16px;
- default: 20px;
- card: 24px;
- feature: 28–32px.

Color:
- light bg: Gold 600/700 hoặc Ink;
- dark bg: Gold 300/500 hoặc White.

Social platform icons phải dùng official brand marks, không thay bằng icon vẽ gần giống.

---

## 11. Header

Desktop:
- height 76px;
- sticky top 0, z-index 50;
- bg Ink 950 / 92%;
- backdrop blur 12px khi hỗ trợ;
- logo max-height 44px;
- nav gap 28–32px;
- active link có underline Gold 500 2px;
- CTA phải là “Nhận tư vấn”.

Mobile:
- height 64px;
- logo max-height 36px;
- hamburger touch target 44px;
- menu dùng drawer/full sheet, không dropdown bé khó bấm.

On scroll: thêm bottom border `rgba(212,175,55,.14)`; không thu header quá nhỏ.

---

## 12. Footer

Desktop:
- bg Ink 950;
- 4 cột chính: Brand / Dịch vụ / Liên kết / Liên hệ;
- social row;
- legal row.

Mobile:
- brand block;
- accordion cho Dịch vụ / Liên kết / Liên hệ;
- social row;
- copyright/legal.

Footer text secondary dùng rgba trắng 70–76%, không dùng gray quá tối.

---

## 13. Responsive breakpoints

Approved reference viewports:
- **Mobile: 390px**
- **Desktop: 1440px**

Breakpoints:
- xs: 390px
- sm: 480px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1440px

Behavior:
- `<1024`: desktop nav → mobile nav;
- service/project grids 3–4 cols desktop → 2 tablet → 1 mobile;
- hero 2 columns desktop → stacked mobile;
- content sidebar/TOC sticky desktop → inline/collapsible mobile;
- horizontal filter chips được scroll ngang trên mobile nếu vượt viewport;
- không dùng horizontal page scroll.

---

## 14. Animation & hover

Motion tokens:
- fast: 160ms;
- normal: 240ms;
- slow: 360ms;
- standard easing: `cubic-bezier(.2,.8,.2,1)`.

Allowed:
- card hover translateY tối đa -3px;
- image hover scale tối đa 1.02;
- nav underline;
- accordion height/opacity;
- modal fade + scale 0.98→1;
- mobile drawer slide;
- subtle section reveal opacity + y 12px.

Forbidden:
- autoplay heavy motion;
- large parallax;
- cursor gimmicks;
- persistent glow animation;
- animation làm trì hoãn CTA/content.

`prefers-reduced-motion: reduce` phải tắt transform/reveal không thiết yếu.

---

## 15. Shared component library

Global:
- `SiteHeader`
- `DesktopNav`
- `MobileNavDrawer`
- `SiteFooter`
- `Container`
- `Section`
- `Breadcrumbs`
- `SectionEyebrow`
- `SectionHeading`
- `Button`
- `IconButton`
- `Chip/Tag`
- `Divider`

Conversion:
- `ConsultationCTA`
- `ConsultationModal/Drawer`
- `ContactForm`
- `ContactChannelCard`
- `NewsletterForm`
- `Toast/Alert`

Content:
- `ServiceCard`
- `ProjectCard`
- `ProjectMetric`
- `ArticleCard`
- `ArticleTOC`
- `RelatedArticles`
- `PricingCard`
- `TestimonialCard`
- `TrustLogoRow`
- `MetricStrip`
- `ProcessSteps`
- `FAQAccordion`
- `CategoryFilter`

System states:
- `Skeleton`
- `Spinner`
- `EmptyState`
- `ErrorState`
- `NotFound404`

---

## 16. Content authenticity rule

GĐ1/GĐ2 cho phép demo copy, case study và số liệu để khóa UI. Tuy nhiên:

- mọi dữ liệu không do Lucifer cung cấp hoặc không có bằng chứng phải đánh dấu `demoOnly` trong data layer;
- trước PRODUCTION_READY phải thay bằng dữ liệu thật hoặc hiển thị rõ là “Dự án mẫu/Demo”;
- Claude không được tự biến demo thành claim thật.

---

## 17. GĐ2 lock

Design System này là authority cho deterministic spec và GĐ9 Implementation theo webbyLucifer v3.1, trừ khi người dùng duyệt revision mới.

Nếu implementation muốn đổi font, màu, spacing, icon, component anatomy, responsive behavior hoặc motion vì “tiện code” → **không được tự đổi**; phải mở request.
