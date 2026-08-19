import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import {
  Brain,
  ChevronDown,
  Users,
  Zap,
  Target,
  Flame,
  GraduationCap,
  ShieldCheck,
  Building2,
  Palette,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Maximize2,
  X,
  Camera
} from 'lucide-react';

const HISTORIC_DOCS = {
  hcmPortrait: '/images/hcm_1946.jpg',
  quocHoi1946: '/images/real_hcm_quoc_hoi_1946.jpg',
  cangHaiPhong: '/images/real_hcm_cang_hai_phong_1957.jpg',
  binhDanHocVu: '/images/real_lop_binh_dan_hoc_vu.jpg',
  thieuNhi: '/images/real_hcm_thieu_nhi.jpg',
  doanKet1946: '/images/real_hcm_doan_ket_1946.jpg',
  dangCamLai: '/images/real_hcm_1950s.jpg',
  conNguoiMoi: '/images/real_hcm_1964.jpg',
  evnLogo: '/evn.png',
  htxLogo: '/htx.png',
};

const SECTIONS = [
  { id: 's1', title: 'I. Tổng quan & Bản chất cốt lõi', icon: Brain },
  { id: 's2', title: 'II. Hệ thống Mục tiêu của CNXH', icon: Target },
  { id: 's3', title: 'III. Hệ thống Động lực của CNXH', icon: Flame },
  { id: 's4', title: 'IV. Phép biện chứng Xây & Chống', icon: ShieldCheck },
  { id: 's5', title: 'V. Trách nhiệm của Sinh viên', icon: GraduationCap },
];

const TARGETS_DATA = [
  {
    num: '01',
    icon: Users,
    title: 'Mục tiêu Chính trị: Xây dựng chế độ dân chủ, nhân dân làm chủ',
    quote: '"Chế độ ta là chế độ dân chủ. Tức là nhân dân làm chủ... Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ."',
    desc: 'Hồ Chí Minh khẳng định quyền lực không thuộc về một cá nhân hay một nhóm thiểu số bóc lột, mà toàn bộ quyền hạn, lợi ích và lực lượng đều ở nơi dân.',
    bullets: [
      'Kế thừa và phát triển vượt bậc tư tưởng "Lấy dân làm gốc" trong truyền thống hàng nghìn năm dựng nước và giữ nước.',
      'Thấm nhuần bài học lịch sử của danh nhân Nguyễn Trãi: "Đẩy thuyền cũng là dân, lật thuyền cũng là dân".',
      'Nhà nước là công cụ của nhân dân, do nhân dân ủy quyền để phục vụ lợi ích tối cao của dân tộc.'
    ],
    badge: 'Chính trị',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    img: HISTORIC_DOCS.quocHoi1946,
    imgCaption: 'Chủ tịch Hồ Chí Minh cùng các đại biểu tại Quốc hội khóa I (năm 1946) — Minh chứng lịch sử cho quyền làm chủ của nhân dân.',
    sourceLink: 'https://cadn.com.vn/lay-dan-lam-goc-va-suc-manh-cua-nhan-dan-post249161.html',
    sourceTitle: 'Lấy dân làm gốc và sức mạnh của nhân dân'
  },
  {
    num: '02',
    icon: Building2,
    title: 'Mục tiêu Kinh tế: Lực lượng sản xuất hiện đại & QHSX tiến bộ',
    quote: '"Nền kinh tế phát triển cao gắn liền với công nghiệp và nông nghiệp hiện đại, khoa học và kỹ thuật tiên tiến."',
    desc: 'Xây dựng một nền kinh tế thuần nhất dựa trên hai hình thức sở hữu cơ bản: sở hữu toàn dân và sở hữu tập thể, không ngừng nâng cao đời sống nhân dân.',
    bullets: [
      'Lực lượng sản xuất: Phát triển cơ khí hóa, hiện đại hóa nông nghiệp và công nghiệp, ứng dụng khoa học kỹ thuật hàng đầu.',
      'Kinh tế quốc doanh (Sở hữu toàn dân): Giữ vai trò chủ đạo, dẫn dắt toàn bộ nền kinh tế quốc dân, được Nhà nước ưu tiên phát triển.',
      'Kinh tế hợp tác xã (Sở hữu tập thể): Được Nhà nước đặc biệt khuyến khích, hướng dẫn và tạo điều kiện hỗ trợ phát triển mạnh mẽ.'
    ],
    badge: 'Kinh tế',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    dualLogos: true,
    img: HISTORIC_DOCS.cangHaiPhong,
    imgCaption: 'Bác Hồ thăm Cảng Hải Phòng (1957), động viên giai cấp công nhân đẩy mạnh sản xuất xây dựng cơ sở vật chất CNXH.'
  },
  {
    num: '03',
    icon: Palette,
    title: 'Mục tiêu Văn hóa: Xã hội chủ nghĩa về nội dung, Dân tộc về hình thức',
    quote: '"Trình độ văn hóa của nhân dân nâng cao sẽ giúp chúng ta đẩy mạnh công cuộc khôi phục kinh tế, phát triển dân chủ..."',
    desc: 'Xây dựng nền văn hóa mang tính dân tộc, khoa học, đại chúng, kế thừa truyền thống tốt đẹp của dân tộc và tiếp thu có chọn lọc tinh hoa văn hóa nhân loại.',
    bullets: [
      'Mối quan hệ giữa Kinh tế và Văn hóa: Kinh tế phải đi trước một bước để làm tiền đề vật chất ("Có thực mới vực được đạo").',
      'Văn hóa không đứng yên mà cũng phát triển song song với kinh tế, thúc đẩy phát triển kinh tế và bồi dưỡng nhân cách con người.',
    ],
    badge: 'Văn hóa',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    img: HISTORIC_DOCS.binhDanHocVu,
    imgCaption: 'Lớp Bình dân học vụ (1945 - 1946) — Phong trào diệt giặc dốt, nâng cao dân trí và xây dựng nền văn hóa mới phục vụ nhân dân.'
  },
  {
    num: '04',
    icon: Scale,
    title: 'Mục tiêu Quan hệ Xã hội: Dân chủ, công bằng, văn minh',
    quote: '"Làm nhiều hưởng nhiều, làm ít hưởng ít, không làm không hưởng. Những người già yếu hoặc tàn tật sẽ được Nhà nước giúp đỡ."',
    desc: 'Xây dựng một xã hội tôn trọng con người, bảo đảm quyền tự do dân chủ và thỏa mãn các lợi ích cá nhân chính đáng, hài hòa với lợi ích tập thể.',
    bullets: [
      'Bình đẳng mọi mặt: Mọi công dân đều bình đẳng trước pháp luật, có quyền học tập, lao động, nghỉ ngơi và tự do ngôn luận.',
      'Thực hiện nguyên tắc phân phối công bằng theo lao động, kết hợp với các chính sách an sinh xã hội nhân văn.',
      'Gắn kết chặt chẽ giữa quyền lợi và nghĩa vụ của mỗi thành viên trong xã hội.'
    ],
    badge: 'Xã hội',
    badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    img: HISTORIC_DOCS.thieuNhi,
    imgCaption: 'Chủ tịch Hồ Chí Minh cùng các cháu thiếu nhi — Biểu tượng của xã hội nhân văn, yêu thương và chăm lo tương lai thế hệ trẻ.'
  },
];

const MOTIVATION_DATA = [
  {
    num: '01',
    icon: Users,
    title: 'Động lực trực tiếp hàng đầu: Lợi ích của dân - Dân chủ của dân - Đại đoàn kết',
    desc: 'Hồ Chí Minh khẳng định ba yếu tố này gắn bó hữu cơ, là tiền đề tạo nên sức mạnh vô địch của cách mạng xã hội chủ nghĩa.',
    subItems: [
      {
        title: 'Lợi ích của nhân dân',
        content: 'Phải chăm lo cả đời sống vật chất và tinh thần của dân. Người răn dạy: "Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh", luôn đặt quyền lợi của dân lên trên hết thảy.'
      },
      {
        title: 'Dân chủ của nhân dân',
        content: '"Dân chủ là của quý báu nhất của nhân dân". Khi dân chủ thực sự được phát huy, tính chủ động và sức sáng tạo của hàng triệu quần chúng mới được giải phóng triệt để.'
      },
      {
        title: 'Đại đoàn kết toàn dân',
        content: '"Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công". Đại đoàn kết dựa trên sự tự giác, ý thức trách nhiệm và sự liên minh công - nông - trí thức.'
      }
    ],
    img: HISTORIC_DOCS.doanKet1946,
    imgCaption: 'Chủ tịch Hồ Chí Minh cùng Phái đoàn đại diện khối đại đoàn kết toàn dân tộc (năm 1946).'
  },
  {
    num: '02',
    icon: Zap,
    title: 'Động lực tổ chức: Sự vận hành nhịp nhàng của Hệ thống Chính trị',
    desc: 'Sức mạnh của quần chúng chỉ phát huy tối đa khi được tổ chức và dẫn dắt bởi đường lối khoa học.',
    subItems: [
      {
        title: 'Vai trò lãnh đạo của Đảng Cộng sản',
        content: 'Hồ Chí Minh ví von: "Đảng như người cầm lái, người cầm lái có vững thì thuyền mới chạy". Đảng lãnh đạo bằng đường lối đúng đắn, giữ vững đạo đức, văn minh và liên hệ máu thịt với quần chúng.'
      },
      {
        title: 'Vai trò quản lý của Nhà nước pháp quyền',
        content: 'Nhà nước của dân, do dân, vì dân; quản lý xã hội bằng hệ thống pháp luật dân chủ, nghiêm minh, biến chủ trương của Đảng thành hiện thực sinh động trong đời sống.'
      },
      {
        title: 'Mặt trận & các đoàn thể nhân dân',
        content: 'Là cầu nối vững chắc tập hợp mọi giai tầng xã hội, tạo nên sức mạnh tổng hợp bảo vệ và xây dựng Tổ quốc.'
      }
    ],
    img: HISTORIC_DOCS.dangCamLai,
    imgCaption: 'Bác Hồ chủ trì Hội nghị Trung ương Đảng — Định hướng vai trò "Người cầm lái" vững vàng đưa cách mạng tiến lên.'
  },
  {
    num: '03',
    icon: GraduationCap,
    title: 'Động lực con người mới: Nhân tố quyết định thành bại',
    desc: 'Luận điểm cốt lõi của Hồ Chí Minh: "Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa".',
    subItems: [
      {
        title: 'Bồi dưỡng thế hệ con người mới',
        content: 'Có ý thức làm chủ, tinh thần tập thể "mình vì mọi người, mọi người vì mình", có quan điểm lao động sáng tạo và cần kiệm xây dựng đất nước.'
      },
      {
        title: 'Trình độ & Bản lĩnh',
        content: 'Vừa có đạo đức cách mạng trong sáng (Hồng), vừa có trình độ chuyên môn, khoa học kỹ thuật vững vàng (Chuyên).'
      },
      {
        title: 'Ý chí cách mạng',
        content: 'Có chí khí tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội, không lùi bước trước khó khăn gian khổ.'
      }
    ],
    img: HISTORIC_DOCS.conNguoiMoi,
    imgCaption: 'Chủ tịch Hồ Chí Minh tại Đại hội thi đua (1964) — Bồi dưỡng con người mới XHCN "vừa hồng vừa chuyên".'
  }
];

function SectionHeading({ icon: Icon, color, label, title }: { icon: React.ElementType; color: string; label: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 border-b border-outline-variant/60 pb-5">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/30`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-1">
          {label}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-on-surface leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function Theory() {
  const [activeId, setActiveId] = useState('s1');
  const [openTarget, setOpenTarget] = useState<number | null>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; title: string; caption?: string } | null>(null);
  const location = useLocation();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => scrollTo(location.hash.replace('#', '')), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 pt-24 pb-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* ============================================================ */}
      {/* DESKTOP SIDEBAR NAVIGATION                                   */}
      {/* ============================================================ */}
      <motion.aside
        animate={{ width: sidebarOpen ? 300 : 54 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="flex-shrink-0 lg:sticky lg:top-24 z-10 hidden lg:block"
        style={{ minWidth: sidebarOpen ? 300 : 54 }}
      >
        <div className="relative bg-surface rounded-3xl border border-outline-variant shadow-sm overflow-hidden h-full">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Ẩn mục lục' : 'Hiện mục lục'}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xl bg-surface-variant/80 hover:bg-primary/10 hover:text-primary text-outline flex items-center justify-center transition-all border border-outline-variant"
          >
            <motion.span
              animate={{ rotate: sidebarOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center text-xs font-bold"
            >
              ◀
            </motion.span>
          </button>

          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-outline-variant pr-8">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-bold text-base text-on-surface">Mục lục lý luận</h3>
                </div>

                <nav className="flex flex-col gap-2">
                  {SECTIONS.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium text-left ${isActive
                          ? 'bg-primary text-on-primary shadow-md font-bold'
                          : 'text-on-surface hover:bg-surface-variant/70'
                          }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-on-primary' : 'text-primary'}`} />
                        <span className="truncate">{sec.title}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-4 border-t border-outline-variant/50 text-xs text-on-surface-variant space-y-1">
                  <p className="font-bold text-primary">Tư tưởng Hồ Chí Minh</p>
                  <p>Chương III · Nhóm 1 (HCM202)</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex flex-col items-center pt-16 pb-6 gap-4 h-full"
              >
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      title={sec.title}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isActive
                        ? 'bg-primary text-on-primary shadow-md'
                        : 'text-outline hover:bg-surface-variant hover:text-on-surface'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* ============================================================ */}
      {/* MOBILE HORIZONTAL NAV BAR                                    */}
      {/* ============================================================ */}
      <div className="w-full lg:hidden bg-surface rounded-2xl p-3 border border-outline-variant shadow-sm sticky top-20 z-20">
        <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all text-xs font-bold flex-shrink-0 ${isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface hover:bg-surface-variant'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ============================================================ */}
      {/* MAIN THEORY CONTENT STREAM                                   */}
      {/* ============================================================ */}
      <main className="flex-1 min-w-0 pb-16 space-y-16">
        {/* HERO SECTION WITH AUTHENTIC HISTORICAL PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl bg-surface"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/80 to-zinc-950/95 z-0" />

          <div className="relative z-10 p-8 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Chương III · Tư tưởng Hồ Chí Minh
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Mục Tiêu & Động Lực Của Chủ Nghĩa Xã Hội Ở Việt Nam
              </h1>
              <p className="text-zinc-200 text-base md:text-lg leading-relaxed">
                Hệ thống quan điểm toàn diện, sâu sắc của Chủ tịch Hồ Chí Minh về bản chất xã hội mới mà nhân dân ta hướng tới và nguồn sức mạnh vô địch để hiện thực hóa lý tưởng độc lập dân tộc gắn liền với chủ nghĩa xã hội.
              </p>

              <div className="bg-white/10 backdrop-blur-md border-l-4 border-amber-400 p-4 rounded-r-2xl">
                <p className="text-amber-200 italic text-sm md:text-base leading-relaxed">
                  "Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ... Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh."
                </p>
                <span className="block text-right text-xs font-bold text-amber-300 mt-2 uppercase tracking-wider">
                  — Chủ tịch Hồ Chí Minh
                </span>
              </div>
            </div>

            {/* Authentic Historical Photo Portrait */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="relative group rounded-3xl overflow-hidden border-4 border-amber-400/40 shadow-2xl bg-black/40 max-w-[260px] cursor-zoom-in"
                onClick={() => setActiveLightboxImg({
                  url: HISTORIC_DOCS.hcmPortrait,
                  title: 'Chân dung Chủ tịch Hồ Chí Minh',
                  caption: 'Chân dung Chủ tịch Hồ Chí Minh năm 1946 — Người sáng lập và rèn luyện Đảng Cộng sản Việt Nam.'
                })}
              >
                <img
                  src={HISTORIC_DOCS.hcmPortrait}
                  alt="Chân dung Chủ tịch Hồ Chí Minh năm 1946"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-sm p-2 text-center text-[11px] text-zinc-300 font-medium border-t border-white/10">
                  Chủ tịch Hồ Chí Minh (1890 - 1969)
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* SECTION 1: TỔNG QUAN & BẢN CHẤT CỐT LÕI                       */}
        {/* ============================================================ */}
        <motion.section
          id="s1"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            icon={Brain}
            color="bg-primary/10 text-primary"
            label="Phần I"
            title="Tổng Quan & Bản Chất Cốt Lõi"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-outline-variant p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Mục tiêu: Vì Ai?</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Mục tiêu của CNXH là giải phóng con người, mang lại độc lập tự do cho Tổ quốc, ấm no hạnh phúc thực sự cho toàn thể nhân dân lao động.
              </p>
            </div>

            <div className="bg-surface border border-outline-variant p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Động lực: Dựa vào Đâu?</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Động lực quyết định nhất là nội lực dân tộc, là nhân dân. Kết hợp hài hòa giữa lợi ích vật chất, quyền làm chủ và khối đại đoàn kết toàn dân.
              </p>
            </div>

            <div className="bg-surface border border-outline-variant p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Biện chứng Xây & Chống</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Xây dựng con người mới, đạo đức cách mạng đi đôi với quyết liệt chống chủ nghĩa cá nhân, quan liêu, tham ô, lãng phí.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 2: HỆ THỐNG MỤC TIÊU CỦA CNXH Ở VIỆT NAM              */}
        {/* ============================================================ */}
        <motion.section
          id="s2"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            icon={Target}
            color="bg-red-500/10 text-red-600"
            label="Phần II"
            title="Hệ Thống Mục Tiêu Của Chủ Nghĩa Xã Hội"
          />

          <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed">
            Hồ Chí Minh thiết lập một hệ thống mục tiêu đồng bộ, bao trùm mọi lĩnh vực đời sống xã hội, trong đó các mục tiêu có mối quan hệ biện chứng chặt chẽ với nhau:
          </p>

          <div className="space-y-6">
            {TARGETS_DATA.map((target, idx) => {
              const Icon = target.icon;
              const isOpen = openTarget === idx;

              return (
                <div
                  key={target.num}
                  className="bg-surface rounded-3xl border border-outline-variant shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenTarget(isOpen ? null : idx)}
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-surface-variant/30 transition-colors"
                  >
                    <span className="text-2xl font-black text-primary/40 font-mono w-8 shrink-0">
                      {target.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${target.badgeColor}`}>
                          {target.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg md:text-xl text-on-surface leading-tight">
                        {target.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-outline shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 md:p-8 border-t border-outline-variant/40 bg-surface-variant/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          <div className={`${target.dualLogos ? 'lg:col-span-7' : 'lg:col-span-7'} space-y-4`}>
                            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-2xl">
                              <p className="text-on-surface italic font-medium text-base">
                                {target.quote}
                              </p>
                            </div>
                            <p className="text-on-surface-variant text-base leading-relaxed">
                              {target.desc}
                            </p>

                            <ul className="space-y-2.5 pt-2">
                              {target.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-on-surface-variant">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>

                            {target.sourceLink && (
                              <div className="pt-3">
                                <a
                                  href={target.sourceLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" /> Nguồn tư liệu: {target.sourceTitle}
                                </a>
                              </div>
                            )}
                          </div>

                          {target.dualLogos ? (
                            <div className="lg:col-span-5 flex flex-col gap-4">
                              <div className="bg-white rounded-2xl p-3 border border-outline-variant shadow-sm space-y-2">
                                <div
                                  className="relative group rounded-xl overflow-hidden bg-white p-6 flex items-center justify-center cursor-zoom-in"
                                  onClick={() => setActiveLightboxImg({
                                    url: HISTORIC_DOCS.evnLogo,
                                    title: 'Kinh tế Quốc doanh',
                                    caption: 'Biểu tượng EVN — Đại diện cho Kinh tế Quốc doanh (Sở hữu toàn dân) giữ vai trò chủ đạo nền kinh tế.'
                                  })}
                                >
                                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                                    <Camera className="w-3 h-3" /> Ảnh tư liệu
                                  </div>
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                                    <Maximize2 className="w-4 h-4" /> Phóng to ảnh
                                  </div>
                                  <img
                                    src={HISTORIC_DOCS.evnLogo}
                                    alt="EVN Logo"
                                    className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                                <p className="text-xs text-on-surface-variant italic text-center leading-relaxed px-2">
                                  Biểu tượng EVN — Đại diện cho Kinh tế Quốc doanh (Sở hữu toàn dân) giữ vai trò chủ đạo nền kinh tế.
                                </p>
                              </div>
                              <div className="bg-white rounded-2xl p-3 border border-outline-variant shadow-sm space-y-2">
                                <div
                                  className="relative group rounded-xl overflow-hidden bg-white p-6 flex items-center justify-center cursor-zoom-in"
                                  onClick={() => setActiveLightboxImg({
                                    url: HISTORIC_DOCS.htxLogo,
                                    title: 'Kinh tế Hợp tác xã',
                                    caption: 'Biểu tượng Hợp tác xã Vận Tải — Đại diện cho Kinh tế Hợp tác xã (Sở hữu tập thể) được Nhà nước khuyến khích phát triển.'
                                  })}
                                >
                                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                                    <Camera className="w-3 h-3" /> Ảnh tư liệu
                                  </div>
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                                    <Maximize2 className="w-4 h-4" /> Phóng to ảnh
                                  </div>
                                  <img
                                    src={HISTORIC_DOCS.htxLogo}
                                    alt="HTX Logo"
                                    className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                                <p className="text-xs text-on-surface-variant italic text-center leading-relaxed px-2">
                                  Biểu tượng HTX — Đại diện cho Kinh tế Hợp tác xã (Sở hữu tập thể) được Nhà nước khuyến khích phát triển.
                                </p>
                              </div>
                            </div>
                          ) : (
                            /* Authentic Documentary Photo */
                            <div className="lg:col-span-5 flex flex-col items-center bg-surface p-4 rounded-2xl border border-outline-variant shadow-sm space-y-3">
                              <div
                                className="relative group rounded-xl overflow-hidden border border-outline-variant/50 w-full aspect-[4/3] bg-black/30 flex items-center justify-center cursor-zoom-in"
                                onClick={() => setActiveLightboxImg({
                                  url: target.img,
                                  title: target.title,
                                  caption: target.imgCaption
                                })}
                              >
                                <img
                                  src={target.img}
                                  alt={target.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                                  <Maximize2 className="w-4 h-4" /> Phóng to ảnh
                                </div>
                                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
                                  <Camera className="w-3 h-3" /> Ảnh tư liệu
                                </div>
                              </div>
                              <p className="text-xs text-on-surface-variant italic text-center leading-relaxed px-2">
                                {target.imgCaption}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 3: HỆ THỐNG ĐỘNG LỰC CỦA CNXH Ở VIỆT NAM             */}
        {/* ============================================================ */}
        <motion.section
          id="s3"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            icon={Flame}
            color="bg-amber-500/10 text-amber-600"
            label="Phần III"
            title="Hệ Thống Động Lực Của Chủ Nghĩa Xã Hội"
          />

          <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed">
            Hồ Chí Minh chỉ rõ hệ thống động lực thúc đẩy CNXH rất phong phú, bao hàm cả vật chất và tinh thần, nội lực và ngoại lực, trong đó giữ vai trò quyết định là nội lực dân tộc, là nhân dân:
          </p>

          <div className="space-y-8">
            {MOTIVATION_DATA.map((item) => {
              return (
                <div
                  key={item.num}
                  className="bg-surface rounded-3xl border border-outline-variant p-6 md:p-8 shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                          {item.num}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-on-surface">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-on-surface-variant text-base leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {item.subItems.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-surface-variant/30 border border-outline-variant/50 p-4 rounded-2xl space-y-2"
                          >
                            <h4 className="font-bold text-primary text-base flex items-center gap-2">
                              <Sparkles className="w-4 h-4" /> {sub.title}
                            </h4>
                            <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                              {sub.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Authentic Documentary Photo for Motivation Section */}
                    <div className="lg:col-span-4 flex flex-col items-center bg-surface-variant/20 p-4 rounded-2xl border border-outline-variant/40 space-y-3">
                      <div
                        className="relative group rounded-xl overflow-hidden border border-outline-variant/50 w-full aspect-[4/3] bg-black/30 flex items-center justify-center cursor-zoom-in"
                        onClick={() => setActiveLightboxImg({
                          url: item.img,
                          title: item.title,
                          caption: item.imgCaption
                        })}
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                          <Maximize2 className="w-4 h-4" /> Phóng to ảnh
                        </div>
                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Camera className="w-3 h-3" /> Ảnh tư liệu
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant italic text-center leading-relaxed px-2">
                        {item.imgCaption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 4: PHÉP BIỆN CHỨNG XÂY & CHỐNG                         */}
        {/* ============================================================ */}
        <motion.section
          id="s4"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            icon={ShieldCheck}
            color="bg-emerald-500/10 text-emerald-600"
            label="Phần IV"
            title="Phép Biện Chứng Giữa 'Xây' & 'Chống'"
          />

          <div className="bg-surface rounded-3xl border border-outline-variant p-6 md:p-8 shadow-sm space-y-6">
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-2xl">
              <p className="text-on-surface italic text-base md:text-lg">
                "Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa... Xây phải đi đôi với chống, xây là nhiệm vụ chính, chống là nhiệm vụ rất quan trọng."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CẦN XÂY */}
              <div className="bg-emerald-500/5 border-2 border-emerald-500/30 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 block">Nhiệm Vụ Cơ Bản</span>
                    <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-300">Phẩm Chất Cần "XÂY"</h3>
                  </div>
                </div>

                <ul className="space-y-3 text-sm md:text-base text-on-surface-variant">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Có ý thức làm chủ Nhà nước, tinh thần tập thể: <strong>"Mình vì mọi người, mọi người vì mình"</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Có quan điểm lao động đúng đắn: <strong>"Tất cả phục vụ sản xuất"</strong>, kỷ luật và năng suất cao.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Có ý thức <strong>cần kiệm xây dựng nước nhà</strong>, giữ gìn của công.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Có chí khí tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội.</span>
                  </li>
                </ul>
              </div>

              {/* CẦN CHỐNG */}
              <div className="bg-rose-500/5 border-2 border-rose-500/30 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 block">Triệt Tiêu Lực Cản</span>
                    <h3 className="text-xl font-bold text-rose-950 dark:text-rose-300">Những Tệ Nạn Cần "CHỐNG"</h3>
                  </div>
                </div>

                <ul className="space-y-3 text-sm md:text-base text-on-surface-variant">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>Chủ nghĩa cá nhân:</strong> Kẻ thù hung ác của CNXH, là thứ "vi trùng độc hại" sinh ra các bệnh tham lam, kiêu ngạo, danh vọng.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>Bệnh quan liêu, mệnh lệnh, độc đoán:</strong> Xa rời thực tế, xa rời nhân dân.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>Tham ô, lãng phí:</strong> Tội lỗi ăn cắp của công, phá hoại công sức lao động của nhân dân.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Tư tưởng trì trệ, bảo thủ, rụt rè, ngại khó, ngại khổ.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 5: TRÁCH NHIỆM CỦA SINH VIÊN                          */}
        {/* ============================================================ */}
        <motion.section
          id="s5"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            icon={GraduationCap}
            color="bg-emerald-500/10 text-emerald-600"
            label="Phần V"
            title="Liên Hệ Thực Tiễn & Trách Nhiệm Của Sinh Viên"
          />

          <div className="bg-surface rounded-3xl border border-outline-variant p-6 md:p-8 shadow-sm space-y-6">
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              Vận dụng tư tưởng Hồ Chí Minh vào kỷ nguyên vươn mình của dân tộc, sinh viên hôm nay cần ý thức rõ vai trò và trách nhiệm tiên phong của mình:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-surface-variant/30 border border-outline-variant/50 space-y-2">
                <h4 className="font-bold text-primary text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 1. Học tập và Đổi mới sáng tạo
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Chủ động chiếm lĩnh tri thức khoa học, công nghệ hiện đại, nâng cao năng lực chuyên môn để đóng góp vào sự nghiệp công nghiệp hóa, hiện đại hóa đất nước.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-variant/30 border border-outline-variant/50 space-y-2">
                <h4 className="font-bold text-primary text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 2. Rèn luyện Đạo đức Cách mạng
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Tu dưỡng cần, kiệm, liêm, chính; kiên quyết đấu tranh chống lối sống thực dụng, ích kỷ và chủ nghĩa cá nhân trong học đường và đời sống.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-variant/30 border border-outline-variant/50 space-y-2">
                <h4 className="font-bold text-primary text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 3. Tinh thần Phụng sự Cộng đồng
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Tích cực tham gia các hoạt động tình nguyện, xây dựng tinh thần đại đoàn kết, giúp đỡ bạn bè và cộng đồng xung quanh.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-variant/30 border border-outline-variant/50 space-y-2">
                <h4 className="font-bold text-primary text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 4. Bản lĩnh Chính trị vững vàng
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Kiên định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội, tỉnh táo trước các luận điệu xuyên tạc của các thế lực thù địch trên không gian mạng.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ============================================================ */}
      {/* PHOTO LIGHTBOX MODAL                                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[120] flex items-center justify-center p-4"
            onClick={() => setActiveLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface rounded-3xl p-6 max-w-3xl w-full border border-outline-variant shadow-2xl flex flex-col items-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-2 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full text-center mb-4 pr-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
                  <Camera className="w-3.5 h-3.5" /> Tư liệu Lịch sử Chính thống
                </div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">
                  {activeLightboxImg.title}
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden border border-outline-variant/40 bg-black max-h-[60vh] flex items-center justify-center w-full">
                <img
                  src={activeLightboxImg.url}
                  alt={activeLightboxImg.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              {activeLightboxImg.caption && (
                <p className="text-xs md:text-sm text-on-surface-variant italic text-center mt-4 max-w-xl">
                  {activeLightboxImg.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}