import type { Article } from "@/lib/types";

// Titles/categories transcribed from .webby/visual-master/gd1-v1/pages/page-08.webp (featured +
// grid) and page-11.webp (article-detail template) at 3x-8x zoom — GD10 re-QA round 2 required
// exact identities. Body paragraphs beyond title/category/meta/TOC headings are demo
// reconstructions (source card/body copy is below reliable legibility on this GD1 preview
// render at any zoom tried); see IMPLEMENTATION_RECEIPT.json for the confidence note.
//
// GD10 re-QA round 3: page-08's grid SEO card ("SEO Onpage là gì? 15 yếu tố quan trọng cần tối
// ưu") and page-11's detail-template article ("10 yếu tố SEO quan trọng giúp website lên top
// Google") are DISTINCT approved fixtures — do not unify them (round 2 had incorrectly merged
// these). The grid card keeps article-cover-05; the detail article is `hidden` (excluded from
// the grid/filters, resolvable by slug) and its own page overrides the header image to the
// dedicated article-seo-hero-master asset per ASSET_USAGE_MAP.json, not this entry's cover.
export const articles: Article[] = [
  {
    slug: "ai-trong-marketing-2024-xu-huong-ung-dung-va-co-hoi-cho-doanh-nghiep",
    title: "AI trong Marketing 2024: Xu hướng, ứng dụng và cơ hội cho doanh nghiệp",
    category: "AI",
    excerpt: "AI đang thay đổi cách doanh nghiệp tiếp cận khách hàng, tối ưu chiến dịch và tăng hiệu suất vận hành.",
    publishedAt: "2026-08-28",
    author: "Lạc Việt Media Agency",
    demoOnly: true,
    coverAssetId: "article-cover-01",
    readMinutes: 6,
    content: [
      {
        id: "xu-huong-ai-marketing",
        heading: "Xu hướng ứng dụng AI trong marketing",
        body: ["AI đang được ứng dụng rộng rãi từ cá nhân hoá nội dung đến tối ưu chiến dịch quảng cáo theo thời gian thực."],
      },
      {
        id: "co-hoi-cho-doanh-nghiep",
        heading: "Cơ hội cho doanh nghiệp vừa và nhỏ",
        body: ["Các công cụ AI phổ biến giúp doanh nghiệp nhỏ tiếp cận năng lực marketing vốn chỉ dành cho đội ngũ lớn."],
      },
    ],
  },
  {
    slug: "checklist-20-diem-quan-trong-khi-thiet-ke-website-doanh-nghiep",
    title: "Checklist 20 điểm quan trọng khi thiết kế Website doanh nghiệp",
    category: "Website",
    excerpt: "Một website hiệu quả cần đảm bảo nhiều yếu tố từ chuẩn SEO, tốc độ đến trải nghiệm người dùng.",
    publishedAt: "2026-08-20",
    author: "Lạc Việt Media Agency",
    demoOnly: false,
    coverAssetId: "article-cover-02",
    readMinutes: 7,
    content: [
      {
        id: "muc-tieu-truoc-giao-dien",
        heading: "Xác định mục tiêu trước khi bàn tới giao diện",
        body: [
          "Sai lầm phổ biến nhất khi làm website doanh nghiệp là bắt đầu từ câu hỏi “trang web trông như thế nào” thay vì “trang web này để làm gì”. Một website bán hàng, một website giới thiệu năng lực để đấu thầu, và một website tuyển dụng có cấu trúc hoàn toàn khác nhau, dù cùng đẹp như nhau.",
          "Trước khi phác thảo bất kỳ màn hình nào, hãy viết ra một câu duy nhất: hành động nào của khách truy cập được coi là thành công? Gọi điện, để lại số, nhắn Zalo, tải báo giá, hay đặt hàng trực tiếp? Mọi quyết định về bố cục, nút bấm và nội dung sau đó đều phải phục vụ đúng hành động đó.",
          "Khi mục tiêu rõ ràng, bạn cũng có tiêu chí để từ chối. Rất nhiều website phình to vì thêm mục “cho đầy đủ” — blog không ai viết, thư viện ảnh không ai cập nhật, form khảo sát không ai đọc. Mỗi mục thừa đều là chi phí bảo trì và một chỗ để khách phân tâm.",
        ],
      },
      {
        id: "cau-truc-va-dieu-huong",
        heading: "Cấu trúc và điều hướng",
        body: [
          "Menu chính nên giữ trong khoảng năm đến bảy mục. Nhiều hơn con số này, khách phải đọc thay vì quét, và tỷ lệ bấm nhầm tăng lên. Nếu doanh nghiệp có nhiều dịch vụ, hãy gom theo nhóm nhu cầu của khách chứ không theo sơ đồ phòng ban nội bộ.",
          "Mọi trang cần trả lời được ba câu hỏi trong vòng năm giây đầu: đây là ai, họ làm gì, và tôi phải bấm vào đâu tiếp theo. Nếu một khách lạ mở trang giữa chừng từ kết quả tìm kiếm mà không trả lời được ba câu này, cấu trúc đang có vấn đề.",
          "Breadcrumb nên có ở các trang con để khách biết mình đang ở đâu trong hệ thống. Nó cũng giúp công cụ tìm kiếm hiểu quan hệ phân cấp giữa các trang, và hiển thị đường dẫn phân cấp ngay trong kết quả tìm kiếm.",
          "Đừng để trang nào bị mồ côi — tức là không có liên kết nội bộ nào trỏ tới. Trang mồ côi rất khó được lập chỉ mục và gần như chắc chắn không có thứ hạng.",
        ],
      },
      {
        id: "toc-do-tai-trang",
        heading: "Tốc độ tải trang",
        body: [
          "Tốc độ là yếu tố kỹ thuật ảnh hưởng trực tiếp tới cả tỷ lệ chuyển đổi lẫn thứ hạng tìm kiếm. Google đo trải nghiệm tải trang qua bộ chỉ số Core Web Vitals, gồm LCP (thời điểm phần tử lớn nhất hiện ra), INP (độ trễ phản hồi khi người dùng tương tác) và CLS (mức độ bố cục bị xô lệch trong lúc tải).",
          "Nguyên nhân chậm phổ biến nhất ở website doanh nghiệp Việt Nam là ảnh. Một ảnh nền 4000 pixel chiều ngang được hiển thị ở khung 800 pixel vẫn phải tải về đầy đủ nếu không khai báo kích thước phù hợp. Hãy xuất ảnh đúng kích thước hiển thị, dùng định dạng hiện đại như WebP hoặc AVIF, và bật tải chậm cho ảnh nằm dưới màn hình đầu.",
          "Nguyên nhân thứ hai là script bên thứ ba: chat widget, pixel quảng cáo, công cụ phân tích, font chữ ngoài. Mỗi script đều xin một phần băng thông và thời gian xử lý. Hãy rà lại định kỳ và gỡ những thứ không còn ai dùng tới.",
          "CLS thường bị bỏ qua nhưng lại rất khó chịu với người dùng: nội dung nhảy khi ảnh hoặc quảng cáo tải xong khiến khách bấm nhầm. Cách phòng đơn giản nhất là luôn khai báo chiều rộng và chiều cao cho ảnh, và chừa sẵn khoảng trống cho các khối tải sau.",
        ],
      },
      {
        id: "trai-nghiem-tren-dien-thoai",
        heading: "Trải nghiệm trên điện thoại",
        body: [
          "Phần lớn lưu lượng truy cập website doanh nghiệp tại Việt Nam đến từ điện thoại, nên bản mobile không phải là bản rút gọn của desktop mà là bản chính. Hãy thiết kế và kiểm thử ở màn hình hẹp trước.",
          "Kiểm tra kỹ những thứ bị ẩn ở màn hình nhỏ. Rất nhiều website vô tình ẩn mất nút liên hệ, bảng giá hoặc phần đánh giá trên mobile chỉ vì lớp CSS ẩn theo breakpoint. Ẩn phần trang trí thì không sao, ẩn mất một nút hành động là mất khách.",
          "Vùng chạm nên đủ lớn để ngón tay bấm không trượt, và các nút quan trọng nên nằm trong tầm ngón cái. Số điện thoại nên là liên kết gọi trực tiếp, địa chỉ nên mở được bản đồ bằng một chạm.",
          "Cuối cùng, hãy tự mở website bằng chính điện thoại của mình trên mạng di động, không phải Wi-Fi văn phòng. Đây là bài kiểm tra trung thực nhất và thường phát hiện ra những vấn đề mà công cụ giả lập bỏ sót.",
        ],
      },
      {
        id: "noi-dung-va-long-tin",
        heading: "Nội dung và lòng tin",
        body: [
          "Viết theo ngôn ngữ khách dùng, không phải ngôn ngữ nội bộ. Khách tìm “thiết kế web bán hàng” chứ hiếm khi tìm “giải pháp chuyển đổi số toàn diện”. Tiêu đề và nội dung nên phản ánh đúng cách khách mô tả nhu cầu của họ.",
          "Thông tin tạo lòng tin quan trọng hơn hình ảnh đẹp: tên pháp nhân, cách liên hệ thật, quy trình làm việc, phạm vi bàn giao, chính sách bảo hành. Nếu chưa có đánh giá khách hàng thật thì đừng dựng đánh giá giả — một lời chứng thực bịa bị phát hiện sẽ phá hỏng toàn bộ uy tín còn lại của trang.",
          "Với số liệu năng lực, chỉ công bố con số bạn giải thích được cách tính. Nếu chưa đo được, hãy mô tả năng lực bằng cách khác thay vì đưa ra một tỷ lệ phần trăm không có nguồn.",
          "Mỗi trang dịch vụ nên kết thúc bằng một lời mời hành động rõ ràng và duy nhất. Đặt ba lựa chọn ngang hàng thường khiến khách không chọn gì cả.",
        ],
      },
      {
        id: "seo-ky-thuat-can-ban",
        heading: "SEO kỹ thuật căn bản",
        body: [
          "Mỗi trang cần một thẻ tiêu đề riêng và một mô tả riêng. Tiêu đề trùng lặp hàng loạt khiến công cụ tìm kiếm khó phân biệt các trang, và làm kết quả hiển thị kém hấp dẫn.",
          "Khai báo canonical trỏ đúng địa chỉ cuối cùng trả về mã 200. Nếu tên miền chuyển hướng từ dạng không có www sang dạng có www, canonical phải trỏ tới dạng đích, nếu không mọi tín hiệu đều phải đi vòng qua một lần chuyển hướng.",
          "Duy trì sitemap.xml chỉ chứa các trang thực sự muốn được lập chỉ mục, và robots.txt không vô tình chặn tài nguyên cần thiết. Trang chưa hoàn thiện nên để noindex thay vì đưa vào sitemap.",
          "Dữ liệu có cấu trúc dạng Schema giúp công cụ tìm kiếm hiểu nội dung là loại gì. Với doanh nghiệp, tối thiểu nên khai báo thông tin tổ chức; với bài viết, khai báo dạng bài viết kèm ngày xuất bản và tác giả.",
          "Cấu trúc thẻ tiêu đề trong trang cũng cần đúng thứ bậc: mỗi trang một thẻ H1 duy nhất mô tả chủ đề chính, các mục nhỏ dùng H2 và H3 theo đúng cấp.",
        ],
      },
      {
        id: "kha-nang-tiep-can",
        heading: "Khả năng tiếp cận",
        body: [
          "Khả năng tiếp cận không chỉ dành cho người khuyết tật; nó cải thiện trải nghiệm cho tất cả mọi người và thường trùng với các thực hành tốt về SEO.",
          "Mọi ảnh mang thông tin cần có văn bản thay thế mô tả đúng nội dung. Ảnh thuần trang trí thì để văn bản thay thế rỗng, để trình đọc màn hình bỏ qua thay vì đọc tên tệp.",
          "Độ tương phản giữa chữ và nền cần đủ cao để đọc được ngoài nắng hoặc trên màn hình kém. Chữ xám nhạt trên nền trắng là lỗi thường gặp khi ưu tiên thẩm mỹ hơn khả năng đọc.",
          "Toàn bộ chức năng phải thao tác được bằng bàn phím, và vị trí đang được chọn phải nhìn thấy rõ. Nếu website có hiệu ứng chuyển động mạnh, hãy tôn trọng thiết lập giảm chuyển động của hệ điều hành.",
        ],
      },
      {
        id: "van-hanh-sau-ban-giao",
        heading: "Vận hành sau bàn giao",
        body: [
          "Website là tài sản cần vận hành, không phải sản phẩm bàn giao một lần. Trước khi nhận bàn giao, hãy đảm bảo bạn thực sự sở hữu tên miền, quyền quản trị hosting và mã nguồn — chứ không phải đơn vị thi công đứng tên hộ.",
          "Thiết lập sao lưu tự động và kiểm tra thử việc khôi phục ít nhất một lần. Một bản sao lưu chưa từng được khôi phục thử thì chưa thể coi là bản sao lưu.",
          "Cài công cụ đo lường ngay từ đầu để có dữ liệu nền so sánh về sau. Không có số liệu tháng đầu, mọi đánh giá hiệu quả sau này đều chỉ là cảm tính.",
          "Cuối cùng, hãy đặt lịch rà soát định kỳ: kiểm tra liên kết hỏng, cập nhật bản vá bảo mật, xem lại nội dung đã lỗi thời và đo lại tốc độ. Một website không được chăm sóc sẽ mất thứ hạng dần mà không có cảnh báo nào.",
        ],
      },
    ],
  },
  {
    slug: "7-cach-tang-follow-tiktok-thuc-chat-va-ben-vung-2024",
    title: "7 cách tăng follow TikTok thực chất và bền vững 2024",
    category: "TikTok",
    excerpt: "Tăng follow bền vững đến từ nội dung nhất quán và đúng insight khán giả, không chỉ từ mẹo tăng ảo.",
    publishedAt: "2026-08-05",
    author: "Lạc Việt Media Agency",
    demoOnly: false,
    coverAssetId: "article-cover-03",
    readMinutes: 4,
    content: [
      {
        id: "hieu-cach-tiktok-phan-phoi",
        heading: "Hiểu cách TikTok phân phối nội dung",
        body: [
          "TikTok không phân phối theo số người theo dõi như các nền tảng cũ. Mỗi video được đưa tới một nhóm nhỏ trước, và nếu nhóm đó phản hồi tốt, video tiếp tục được mở rộng tới nhóm lớn hơn. Vì vậy một tài khoản mới vẫn hoàn toàn có cơ hội tiếp cận rộng.",
          "Tín hiệu quan trọng nhất là tỷ lệ xem hết và lượt xem lại, sau đó mới tới bình luận, chia sẻ và lưu. Lượt thích là tín hiệu yếu nhất trong nhóm này.",
          "Hệ quả thực tế: kéo dài video để “có nội dung” thường phản tác dụng. Một video ba mươi giây được xem hết thường mạnh hơn một video ba phút bị bỏ giữa chừng.",
        ],
      },
      {
        id: "ba-giay-dau",
        heading: "Ba giây đầu quyết định",
        body: [
          "Phần lớn người xem quyết định lướt tiếp hay ở lại trong khoảng ba giây đầu. Đây là nơi đáng đầu tư nhất, hơn cả phần dựng và hiệu ứng ở giữa video.",
          "Hãy vào thẳng vấn đề. Bỏ lời chào, bỏ phần giới thiệu bản thân, bỏ hiệu ứng mở màn. Nêu ngay tình huống người xem nhận ra là của mình, hoặc kết quả họ muốn đạt được.",
          "Dòng chữ hiển thị ngay đầu video giúp người xem nắm được nội dung kể cả khi họ đang tắt tiếng — và một tỷ lệ lớn người dùng xem trong trạng thái tắt tiếng.",
        ],
      },
      {
        id: "chon-mot-chu-de-hep",
        heading: "Chọn một chủ đề đủ hẹp",
        body: [
          "Tài khoản đăng lẫn lộn nhiều chủ đề khiến hệ thống khó xác định nên phân phối cho ai, và người theo dõi cũng không biết họ sẽ nhận được gì tiếp theo.",
          "Chọn một chủ đề đủ hẹp để bạn có thể nói sâu, nhưng đủ rộng để không cạn ý sau mười video. Với doanh nghiệp, chủ đề tốt nhất thường nằm ở giao điểm giữa thứ bạn làm hằng ngày và thứ khách hay hỏi.",
          "Người theo dõi đúng chủ đề có giá trị hơn nhiều so với số lượng lớn người theo dõi vì một video viral lạc đề. Nhóm thứ hai gần như không bao giờ mua hàng và còn làm nhiễu tín hiệu phân phối về sau.",
        ],
      },
      {
        id: "tan-suat-va-tinh-deu",
        heading: "Tần suất và tính đều đặn",
        body: [
          "Đăng đều quan trọng hơn đăng nhiều. Một lịch bốn video mỗi tuần duy trì được trong sáu tháng cho kết quả tốt hơn hẳn so với hai mươi video trong một tuần rồi im lặng.",
          "Đăng đều cho bạn đủ số lần thử để nhận ra dạng nội dung nào hiệu quả. Với tần suất quá thấp, mỗi video là một lần đoán mò và bạn không học được gì.",
          "Hãy quay gộp nhiều video trong một buổi để giảm chi phí chuẩn bị, nhưng vẫn đăng rải đều theo lịch.",
        ],
      },
      {
        id: "tuong-tac-that",
        heading: "Tương tác thật thay vì mua tương tác",
        body: [
          "Mua người theo dõi hoặc lượt xem phá hỏng chính chỉ số mà hệ thống dùng để đánh giá bạn. Tài khoản có nhiều người theo dõi nhưng tỷ lệ tương tác thấp bất thường sẽ được phân phối kém đi, chứ không tốt lên.",
          "Trả lời bình luận trong những giờ đầu sau khi đăng vừa tăng tương tác vừa cho bạn biết người xem thực sự quan tâm điều gì. Nhiều ý tưởng video tốt nhất đến thẳng từ phần bình luận.",
          "Biến câu hỏi hay trong bình luận thành video riêng. Cách này vừa có sẵn nội dung, vừa cho người hỏi thấy họ được lắng nghe.",
        ],
      },
      {
        id: "dua-ve-kenh-ban-hang",
        heading: "Đưa người xem về kênh bán hàng",
        body: [
          "Lượt xem không phải doanh thu. Cần có đường dẫn rõ ràng từ video tới nơi khách có thể liên hệ hoặc mua hàng.",
          "Giữ phần giới thiệu hồ sơ ngắn gọn, nói rõ bạn giúp được ai và giúp việc gì, kèm một liên kết duy nhất. Đặt quá nhiều lựa chọn khiến người xem không chọn gì cả.",
          "Trong video, lời kêu gọi hành động nên cụ thể và đặt đúng lúc. “Nhắn cho mình chữ WEB nếu bạn muốn bản checklist” hiệu quả hơn hẳn “theo dõi để biết thêm”.",
          "Với dịch vụ có giá trị cao, đừng kỳ vọng chốt ngay trên TikTok. Mục tiêu hợp lý là đưa khách sang một kênh trò chuyện trực tiếp để tư vấn kỹ hơn.",
        ],
      },
      {
        id: "do-luong-va-dieu-chinh",
        heading: "Đo lường và điều chỉnh",
        body: [
          "Xem số liệu trong phần phân tích của tài khoản, đặc biệt là tỷ lệ xem hết và thời điểm người xem rời đi. Nếu phần lớn rời ở giây thứ năm, vấn đề nằm ở phần mở đầu chứ không phải nội dung phía sau.",
          "So sánh theo nhóm nội dung thay vì theo từng video. Một video kém không nói lên điều gì; năm video cùng dạng đều kém thì đó là tín hiệu rõ ràng.",
          "Khi tìm được dạng nội dung hiệu quả, hãy lặp lại cấu trúc đó với chủ đề khác thay vì đổi hoàn toàn cách làm. Nhiều tài khoản tự phá đà tăng trưởng vì thay đổi phong cách ngay khi vừa tìm được thứ phù hợp.",
        ],
      },
    ],
  },
  {
    slug: "quang-cao-facebook-hieu-qua-huong-dan-cho-nguoi-moi-bat-dau",
    title: "Quảng cáo Facebook hiệu quả: Hướng dẫn cho người mới bắt đầu",
    category: "Facebook",
    excerpt: "Nắm vững các bước cơ bản giúp chiến dịch quảng cáo Facebook đầu tiên tránh những sai lầm phổ biến.",
    publishedAt: "2026-07-22",
    author: "Lạc Việt Media Agency",
    demoOnly: true,
    coverAssetId: "article-cover-04",
    readMinutes: 5,
    content: [
      {
        id: "xac-dinh-muc-tieu",
        heading: "Xác định đúng mục tiêu chiến dịch",
        body: ["Mỗi mục tiêu (nhận diện, chuyển đổi, tương tác) cần cách tối ưu quảng cáo khác nhau."],
      },
      {
        id: "toi-uu-ngan-sach",
        heading: "Tối ưu ngân sách và đối tượng",
        body: ["Thử nghiệm nhiều nhóm đối tượng nhỏ trước khi mở rộng ngân sách cho nhóm hiệu quả nhất."],
      },
    ],
  },
  {
    slug: "seo-onpage-la-gi-15-yeu-to-quan-trong-can-toi-uu",
    title: "SEO Onpage là gì? 15 yếu tố quan trọng cần tối ưu",
    category: "SEO",
    excerpt: "SEO Onpage giúp website thân thiện hơn với công cụ tìm kiếm. Tổng hợp 15 yếu tố quan trọng bạn cần lưu ý.",
    publishedAt: "2026-06-20",
    author: "Lạc Việt Media Agency",
    demoOnly: false,
    coverAssetId: "article-cover-05",
    readMinutes: 6,
    content: [
      {
        id: "seo-onpage-la-gi",
        heading: "SEO Onpage là gì?",
        body: [
          "SEO Onpage là toàn bộ những việc bạn tối ưu ngay trên trang web của mình để công cụ tìm kiếm hiểu đúng nội dung và người đọc thấy hữu ích. Nó khác với SEO Offpage — phần liên quan tới liên kết và tín hiệu từ bên ngoài — và khác với SEO kỹ thuật thuần tuý về hạ tầng.",
          "Điểm cần nhớ: Onpage là phần bạn kiểm soát hoàn toàn. Bạn không quyết định được ai dẫn link tới mình, nhưng bạn hoàn toàn quyết định được tiêu đề, cấu trúc, tốc độ và chất lượng nội dung. Vì vậy đây luôn là nơi nên bắt đầu.",
        ],
      },
      {
        id: "y-dinh-tim-kiem",
        heading: "Ý định tìm kiếm — yếu tố quyết định",
        body: [
          "Trước mọi kỹ thuật, hãy xác định người gõ từ khoá đó thực sự muốn gì. Cùng một từ khoá có thể mang ý định tìm hiểu, so sánh, hay mua ngay — và mỗi ý định cần một dạng trang khác nhau.",
          "Cách kiểm tra đơn giản và đáng tin: gõ chính từ khoá đó lên Google và xem mười kết quả đầu là dạng gì. Nếu toàn bộ là bài hướng dẫn mà bạn lại đưa lên một trang bán hàng, khả năng cạnh tranh gần như bằng không, dù bài viết có tối ưu kỹ tới đâu.",
          "Một trang đáp ứng đúng ý định tìm kiếm nhưng viết bình thường vẫn thường xếp trên một trang viết hay nhưng sai ý định.",
        ],
      },
      {
        id: "the-tieu-de-va-mo-ta",
        heading: "Thẻ tiêu đề và mô tả",
        body: [
          "Thẻ tiêu đề là yếu tố onpage có sức nặng lớn nhất. Hãy đặt từ khoá chính ở phần đầu, giữ độ dài vừa đủ để không bị cắt trên kết quả tìm kiếm, và viết sao cho người đọc muốn bấm chứ không chỉ để nhồi từ khoá.",
          "Thẻ mô tả không phải yếu tố xếp hạng trực tiếp, nhưng ảnh hưởng mạnh tới tỷ lệ nhấp. Hãy coi nó như một dòng quảng cáo miễn phí: nêu lợi ích cụ thể và lý do nên chọn kết quả của bạn thay vì kết quả bên cạnh.",
          "Mỗi trang phải có tiêu đề và mô tả riêng. Sao chép cùng một mô tả cho toàn site là một trong những lỗi phổ biến nhất và dễ sửa nhất.",
        ],
      },
      {
        id: "cau-truc-heading",
        heading: "Cấu trúc thẻ heading",
        body: [
          "Mỗi trang nên có đúng một thẻ H1 nêu rõ chủ đề chính. Các mục lớn dùng H2, mục con dùng H3, và không nhảy cấp tuỳ tiện chỉ vì muốn chữ to hơn — cỡ chữ là việc của CSS.",
          "Cấu trúc heading mạch lạc giúp cả người đọc lẫn máy hiểu bố cục bài. Nó cũng là cơ sở để công cụ tìm kiếm trích ra các đoạn nổi bật hiển thị ngay trên trang kết quả.",
          "Một cách kiểm tra nhanh: đọc lướt riêng các heading của bài. Nếu chỉ đọc heading mà đã nắm được nội dung chính, cấu trúc đang tốt.",
        ],
      },
      {
        id: "chat-luong-noi-dung",
        heading: "Chất lượng và độ sâu nội dung",
        body: [
          "Google ưu tiên nội dung hữu ích, do người viết cho người đọc, chứ không phải nội dung viết để lấp chỗ cho công cụ tìm kiếm. Nội dung mỏng — vài trăm chữ chung chung, lặp lại thứ đã có sẵn khắp nơi — không những không lên hạng mà còn có thể kéo đánh giá tổng thể của website xuống.",
          "Độ dài không phải mục tiêu. Mục tiêu là trả lời trọn vẹn câu hỏi của người đọc, kể cả những câu hỏi kế tiếp mà họ chưa kịp gõ. Nếu chủ đề cần một nghìn từ để nói đủ thì viết một nghìn từ; nếu ba trăm từ là đủ thì đừng kéo dài.",
          "Thể hiện trải nghiệm và chuyên môn thật: ví dụ cụ thể, con số bạn tự đo được, sai lầm bạn từng gặp. Đây chính là thứ nội dung sinh tự động khó có được, và cũng là thứ khiến người đọc tin bạn.",
          "Cập nhật lại bài cũ thường hiệu quả hơn viết bài mới. Một bài đã có thứ hạng, được bổ sung thông tin mới và chỉnh lại phần lỗi thời, thường tăng hạng nhanh hơn nhiều so với một bài viết từ đầu.",
        ],
      },
      {
        id: "toi-uu-hinh-anh",
        heading: "Tối ưu hình ảnh",
        body: [
          "Đặt tên tệp có nghĩa thay vì dãy ký tự ngẫu nhiên từ máy ảnh, và viết văn bản thay thế mô tả đúng nội dung ảnh. Văn bản thay thế phục vụ người dùng trình đọc màn hình trước, công cụ tìm kiếm sau — đừng biến nó thành chỗ nhồi từ khoá.",
          "Nén ảnh và dùng định dạng hiện đại như WebP hoặc AVIF. Luôn khai báo chiều rộng và chiều cao để trình duyệt chừa sẵn chỗ, tránh hiện tượng nội dung nhảy khi ảnh tải xong.",
          "Với ảnh nằm dưới màn hình đầu, bật tải chậm. Với ảnh lớn nhất ở màn hình đầu, làm ngược lại: ưu tiên tải sớm, vì nó thường chính là phần tử quyết định chỉ số LCP.",
        ],
      },
      {
        id: "lien-ket-noi-bo",
        heading: "Liên kết nội bộ",
        body: [
          "Liên kết nội bộ là công cụ onpage bị bỏ phí nhiều nhất. Nó dẫn người đọc đi tiếp, phân bổ sức mạnh giữa các trang, và cho công cụ tìm kiếm biết trang nào quan trọng.",
          "Dùng chữ neo mô tả đúng đích đến. “Xem hướng dẫn tối ưu tốc độ website” nói được nhiều hơn hẳn so với “xem tại đây”.",
          "Từ mỗi bài viết, hãy trỏ về trang dịch vụ liên quan, và từ trang dịch vụ trỏ ra các bài giải thích sâu. Đây là cách biến nội dung kiến thức thành nguồn khách hàng thay vì chỉ là lưu lượng truy cập đơn thuần.",
        ],
      },
      {
        id: "url-va-dieu-huong",
        heading: "URL và điều hướng",
        body: [
          "URL nên ngắn, dễ đọc và phản ánh nội dung. Tránh chuỗi tham số dài, tránh ngày tháng nếu bạn có ý định cập nhật lại bài về sau.",
          "Đặt breadcrumb ở các trang con. Nó cải thiện điều hướng cho người dùng và giúp công cụ tìm kiếm hiển thị đường dẫn phân cấp trong kết quả.",
          "Khi đổi URL, luôn chuyển hướng vĩnh viễn từ địa chỉ cũ sang địa chỉ mới. Bỏ qua bước này là cách nhanh nhất để mất toàn bộ thứ hạng đã xây dựng.",
        ],
      },
      {
        id: "trai-nghiem-trang",
        heading: "Trải nghiệm trang và Core Web Vitals",
        body: [
          "Core Web Vitals đo trải nghiệm thực tế: LCP cho tốc độ hiển thị nội dung chính, INP cho độ nhạy khi người dùng tương tác, và CLS cho độ ổn định bố cục.",
          "Đây là tín hiệu xếp hạng, nhưng quan trọng hơn, chúng phản ánh cảm nhận thật của người dùng. Một trang chậm và giật khiến khách rời đi trước cả khi nội dung kịp thuyết phục họ.",
          "Hãy đo bằng dữ liệu thực tế từ người dùng nếu có, thay vì chỉ dựa vào công cụ giả lập trên máy phát triển với đường truyền tốt.",
        ],
      },
      {
        id: "sai-lam-thuong-gap",
        heading: "Những sai lầm thường gặp",
        body: [
          "Nhồi từ khoá là kỹ thuật đã lỗi thời và ngày nay gây hại nhiều hơn lợi. Hãy viết tự nhiên và dùng các từ đồng nghĩa, từ liên quan.",
          "Sao chép mô tả sản phẩm từ nhà cung cấp khiến hàng trăm website có nội dung giống hệt nhau, và gần như không trang nào trong số đó có cơ hội xếp hạng.",
          "Để trang thử nghiệm, trang trùng lặp hoặc trang chưa hoàn thiện được lập chỉ mục sẽ làm loãng chất lượng tổng thể. Dùng noindex cho tới khi nội dung thực sự sẵn sàng.",
          "Cuối cùng, đừng kỳ vọng kết quả tức thì. SEO Onpage làm đúng thường mất vài tuần tới vài tháng mới phản ánh vào thứ hạng, và đó là khoảng thời gian bình thường chứ không phải dấu hiệu thất bại.",
        ],
      },
    ],
  },
  // Detail-template fixture only (page-11) — resolvable by slug for /kien-thuc/[slug] evidence,
  // deliberately `hidden` per GD10 re-QA round 3 item 5: distinct approved fixture from the
  // grid's "SEO Onpage là gì?" card above, not a unification of the two.
  {
    slug: "10-yeu-to-seo-quan-trong-giup-website-len-top-google",
    title: "10 yếu tố SEO quan trọng giúp website lên top Google",
    category: "SEO",
    excerpt: "Để website lên top Google không chỉ cần nội dung hay mà còn phải tối ưu nhiều yếu tố kỹ thuật và trải nghiệm người dùng. Dưới đây là 10 yếu tố quan trọng nhất bạn cần tập trung.",
    publishedAt: "2026-05-15",
    author: "Lạc Việt Media Agency",
    demoOnly: true,
    hidden: true,
    readMinutes: 8,
    content: [
      { id: "nghien-cuu-tu-khoa", heading: "1. Nghiên cứu từ khóa", body: ["Xác định đúng bộ từ khoá mục tiêu là bước nền tảng trước khi tối ưu bất kỳ nội dung nào."] },
      { id: "toi-uu-onpage", heading: "2. Tối ưu Onpage", body: ["Tối ưu tiêu đề, mô tả, heading và cấu trúc URL theo đúng từ khoá mục tiêu của từng trang."] },
      { id: "noi-dung-chat-luong", heading: "3. Nội dung chất lượng", body: ["Nội dung cần giải quyết đúng nhu cầu tìm kiếm, đủ chi tiết và cập nhật thường xuyên."] },
      { id: "toi-uu-ky-thuat", heading: "4. Tối ưu kỹ thuật", body: ["Cấu trúc website rõ ràng, sitemap và robots.txt chuẩn giúp công cụ tìm kiếm thu thập dữ liệu hiệu quả hơn."] },
      { id: "toc-do-tai-trang", heading: "5. Tốc độ tải trang", body: ["Trang tải nhanh cải thiện trải nghiệm người dùng và là một yếu tố xếp hạng trực tiếp."] },
      { id: "mobile-friendly", heading: "6. Mobile Friendly", body: ["Giao diện phải hiển thị tốt trên di động vì phần lớn lượt tìm kiếm hiện nay đến từ thiết bị di động."] },
      { id: "backlink-chat-luong", heading: "7. Backlink chất lượng", body: ["Liên kết từ các nguồn uy tín, liên quan giúp tăng độ tin cậy của website trong mắt công cụ tìm kiếm."] },
      { id: "trai-nghiem-nguoi-dung", heading: "8. Trải nghiệm người dùng", body: ["Điều hướng rõ ràng và thời gian ở lại trang cao là tín hiệu tích cực cho thứ hạng dài hạn."] },
      { id: "seo-local", heading: "9. SEO Local", body: ["Với doanh nghiệp có địa điểm cụ thể, tối ưu thông tin địa phương giúp tăng khả năng hiển thị trong tìm kiếm khu vực."] },
      { id: "theo-doi-cai-thien", heading: "10. Theo dõi & cải thiện", body: ["Theo dõi số liệu định kỳ giúp phát hiện sớm vấn đề và liên tục cải thiện hiệu quả SEO."] },
    ],
  },
  {
    slug: "top-10-cong-cu-ai-ho-tro-marketing-tot-nhat-hien-nay",
    title: "Top 10 công cụ AI hỗ trợ Marketing tốt nhất hiện nay",
    category: "AI",
    excerpt: "Giúp bạn tiết kiệm thời gian và tối ưu hiệu suất, đây là những công cụ AI được nhiều marketer tin dùng.",
    publishedAt: "2026-07-01",
    author: "Lạc Việt Media Agency",
    demoOnly: true,
    coverAssetId: "article-cover-06",
    readMinutes: 6,
    content: [
      {
        id: "cong-cu-noi-dung",
        heading: "Công cụ hỗ trợ tạo nội dung",
        body: ["Các công cụ AI tạo nội dung giúp rút ngắn thời gian lên ý tưởng và bản thảo đầu tiên."],
      },
      {
        id: "cong-cu-phan-tich",
        heading: "Công cụ hỗ trợ phân tích dữ liệu",
        body: ["AI giúp tổng hợp và diễn giải dữ liệu chiến dịch nhanh hơn, hỗ trợ ra quyết định kịp thời."],
      },
    ],
  },
  {
    slug: "5-buoc-xay-dung-chien-luoc-marketing-hieu-qua-tu-a-z",
    title: "5 bước xây dựng chiến lược Marketing hiệu quả từ A-Z",
    category: "Marketing",
    excerpt: "Một chiến lược marketing hiệu quả cần đi từ mục tiêu rõ ràng đến đo lường kết quả cụ thể.",
    publishedAt: "2026-06-12",
    author: "Lạc Việt Media Agency",
    demoOnly: true,
    coverAssetId: "article-cover-07",
    readMinutes: 6,
    content: [
      {
        id: "xac-dinh-muc-tieu-chien-luoc",
        heading: "Xác định mục tiêu chiến lược",
        body: ["Mục tiêu cụ thể, đo lường được là nền tảng để xây dựng toàn bộ chiến lược phía sau."],
      },
      {
        id: "trien-khai-va-do-luong",
        heading: "Triển khai và đo lường",
        body: ["Theo dõi chỉ số định kỳ giúp điều chỉnh chiến lược kịp thời thay vì chờ đến cuối chiến dịch."],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** Grid/filter-visible articles only — excludes detail-template-only fixtures. Deliberately
 * does NOT filter demoOnly: demo articles are still shown in the UI for visual parity, they are
 * only barred from structured data and indexing. Use getIndexableArticles() for SEO surfaces. */
export function getVisibleArticles() {
  return articles.filter((a) => !a.hidden);
}

/** Articles eligible for sitemap/indexing: neither a direct-review-only fixture nor unverified
 * demo content (SEO_CONTRACT.json contentIntegrity; GD10 re-QA round 5, R5-01).
 *
 * 2026-09-02: no longer empty. Three articles were rewritten with real, substantive editorial
 * copy — general professional knowledge on web build quality, on-page SEO and TikTok growth,
 * containing no claim about Lac Viet's own track record — and flipped to demoOnly: false, so
 * they now carry Article JSON-LD and enter the sitemap. readMinutes on those three is computed
 * from actual word count rather than asserted. The remaining five stay demo and stay out of
 * search until they get the same treatment: indexing thin content costs more than it earns. */
export function getIndexableArticles() {
  return articles.filter((a) => !a.hidden && !a.demoOnly);
}
