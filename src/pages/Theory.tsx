import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import {
  Globe, Lightbulb, Target, ArrowRight, Brain, Compass, Activity,
  ChevronDown, BookOpen, Quote, Landmark, Users, Zap, Scale, TrendingUp
} from 'lucide-react';

const IMG = {
  heroBg:    '/theory_hero_bg.jpg',
  slide1:    '/images/image18.png',
  slide2:    '/images/image7.png',
  slide3:    '/images/image3.png',
  slide4:    '/images/image9.png',
  slide5:    '/images/image12.png',
  angghen:   '/angghen.png',
  lennin:    '/lennin2.0.png',
};

const SECTIONS = [
  { id: 's1', title: 'I. Tổng quan Vai trò Lịch sử', icon: Brain },
  { id: 's2', title: 'II. Vai trò Tích cực của CNTB', icon: TrendingUp },
  { id: 's3', title: 'III. Những Giới hạn Lịch sử', icon: Scale },
  { id: 's4', title: 'IV. Ý nghĩa & Quy luật Vận động', icon: Compass },
];

const POSITIVE_ROLES = [
  {
    num: '01', icon: Zap,
    title: 'Thúc đẩy lực lượng sản xuất phát triển nhanh chóng',
    desc: 'CNTB đóng vai trò vĩ đại trong việc thúc đẩy sự phát triển của khoa học và công nghệ, chuyển từ lao động thủ công sang cơ khí hóa, tự động hóa và tin học hóa, nâng cao vượt bậc năng suất lao động.',
    bullets: [
      'Giải phóng sức sản xuất và thúc đẩy các cuộc cách mạng công nghiệp.',
      'Ứng dụng thành tựu khoa học kỹ thuật hiện đại vào quy trình chế tạo.',
      'Tạo ra năng suất lao động xã hội chưa từng có trong lịch sử nhân loại.'
    ],
    example: 'Từ cuộc Cách mạng Công nghiệp lần 1 (hơi nước) đến Cách mạng Công nghiệp 4.0 (AI, IoT, Cloud), các tập đoàn tư bản đã đầu tư khổng lồ vào R&D để cơ khí hóa và tự động hóa dây chuyền sản xuất toàn cầu.',
    img: '/images/image7.png',
    accent: 'emerald', headerCls: 'text-emerald-600 dark:text-emerald-400',
    borderCls: 'border-l-emerald-500', bgCls: 'bg-emerald-500/5 border border-emerald-500/20',
    badgeCls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  {
    num: '02', icon: Globe,
    title: 'Chuyển nền sản xuất nhỏ thành sản xuất lớn hiện đại',
    desc: 'Dưới tác động của CNTB, nền sản xuất manh mún, phân tán thời phong kiến bị xóa bỏ, thay thế vào đó là nền sản xuất hàng hóa lớn, tập trung và hiện đại.',
    bullets: [
      'Mở rộng quy mô sản xuất vượt ra ngoài phạm vi gia đình, quốc gia.',
      'Phát triển mạnh mẽ nền kinh tế hàng hóa và lưu thông thị trường.',
      'Tăng cường tích tụ và tập trung tư bản để xây dựng các đại dự án, nhà máy quy mô lớn.'
    ],
    example: 'Các tập đoàn sản xuất bán dẫn hoặc ô tô lớn như Tesla, TSMC sở hữu những siêu nhà máy (Gigafactory) với chuỗi cung ứng khổng lồ, thay thế hoàn toàn cho các phường hội thủ công nhỏ lẻ thời xưa.',
    img: '/images/image3.png',
    accent: 'blue', headerCls: 'text-blue-600 dark:text-blue-400',
    borderCls: 'border-l-blue-500', bgCls: 'bg-blue-500/5 border border-blue-500/20',
    badgeCls: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
  },
  {
    num: '03', icon: Users,
    title: 'Thực hiện xã hội hóa sản xuất mạnh mẽ',
    desc: 'Lực lượng sản xuất được tổ chức, liên kết chặt chẽ trên phạm vi toàn xã hội và quốc tế, biến quá trình sản xuất cá thể thành quá trình mang tính xã hội sâu sắc.',
    bullets: [
      'Thúc đẩy phân công lao động xã hội ở mọi cấp độ.',
      'Tăng cường chuyên môn hóa và hợp tác lao động quốc tế.',
      'Liên kết các doanh nghiệp, các ngành kinh tế và các quốc gia thành chuỗi giá trị toàn cầu.'
    ],
    example: 'Để sản xuất một chiếc điện thoại iPhone, cần sự hợp tác của hàng trăm nhà cung cấp linh kiện từ Nhật Bản, Hàn Quốc, Mỹ, lắp ráp tại Trung Quốc và phân phối tới người tiêu dùng trên toàn thế giới.',
    img: '/images/image3.png',
    accent: 'violet', headerCls: 'text-violet-600 dark:text-violet-400',
    borderCls: 'border-l-violet-500', bgCls: 'bg-violet-500/5 border border-violet-500/20',
    badgeCls: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  }
];

const LIMITATIONS = [
  {
    num: '01', icon: Scale,
    title: 'Mục đích sản xuất vì lợi ích của giai cấp tư sản',
    desc: 'Sản xuất trong chủ nghĩa tư bản không hướng tới thỏa mãn nhu cầu toàn diện của nhân dân lao động, mà hướng tới tối đa hóa giá trị thặng dư cho giai cấp tư sản nắm giữ tư liệu sản xuất.',
    bullets: [
      'Dựa trên chế độ chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất.',
      'Người lao động bị tha hóa, phải bán sức lao động và bị bóc lột giá trị thặng dư.',
      'Bất bình đẳng giàu nghèo ngày càng gia tăng sâu sắc trong lòng xã hội.'
    ],
    example: 'Khủng hoảng kinh tế nổ ra không phải do thiếu hàng hóa mà do thừa sản phẩm so với sức mua của người lao động. Nhà tư bản sẵn sàng tiêu hủy hàng hóa (như đổ sữa, tiêu hủy nông sản) để giữ giá bán cao, mặc cho người nghèo đói khổ.',
    img: '/images/image9.png',
    accent: 'rose', headerCls: 'text-rose-600 dark:text-rose-400',
    borderCls: 'border-l-rose-500', bgCls: 'bg-rose-500/5 border border-rose-500/20',
    badgeCls: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  },
  {
    num: '02', icon: Landmark,
    title: 'Độc quyền kìm hãm sự phát triển xã hội',
    desc: 'Sự tập trung sản xuất cao độ hình thành các tập đoàn độc quyền khổng lồ. Chúng khống chế thị trường để tối đa hóa lợi nhuận độc quyền, kìm hãm tiến bộ kỹ thuật và chèn ép xã hội.',
    bullets: [
      'Tư liệu sản xuất và tài nguyên tập trung trong tay một số ít siêu tập đoàn.',
      'Có khả năng áp đặt giá bán cao và ép giá mua nguyên liệu đầu vào thấp.',
      'Hạn chế sản lượng, cản trở áp dụng công nghệ mới nếu nó đe dọa vị thế độc quyền.'
    ],
    example: 'Các công ty dược phẩm độc quyền bằng sáng chế bán thuốc đặc trị với giá đắt đỏ gấp hàng nghìn lần chi phí sản xuất, ngăn cản việc sản xuất thuốc giá rẻ cho các nước nghèo, gây ảnh hưởng nghiêm trọng đến đời sống nhân sinh.',
    img: '/images/image12.png',
    accent: 'amber', headerCls: 'text-amber-600 dark:text-amber-400',
    borderCls: 'border-l-amber-500', bgCls: 'bg-amber-500/5 border border-amber-500/20',
    badgeCls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  }
];

function SectionBridge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
      <p className="text-base text-on-surface-variant italic text-center px-2 shrink-0 max-w-xl">{text}</p>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
    </div>
  );
}

function SectionHeading({ icon: Icon, color, label, title }: { icon: React.ElementType; color: string; label: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 border-b border-outline-variant pb-5">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-outline block mb-1">{label}</span>
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight">{title}</h2>
      </div>
    </div>
  );
}

export default function Theory() {
  const [activeId, setActiveId] = useState('s1');
  const [openPos, setOpenPos] = useState<number | null>(null);
  const [openLimit, setOpenLimit] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollTo(id), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }); },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 pt-24 pb-8 md:pt-28 md:pb-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

      {/* ── Sidebar TOC ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 48 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="flex-shrink-0 lg:sticky lg:top-24 z-10 hidden lg:block"
        style={{ minWidth: sidebarOpen ? 280 : 48 }}
      >
        <div className="relative bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden h-full">

          {/* Toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Ẩn mục lục' : 'Hiện mục lục'}
            className="absolute top-3 right-3 z-20 w-7 h-7 rounded-lg bg-surface-variant hover:bg-primary/10 hover:text-primary text-outline flex items-center justify-center transition-all border border-outline-variant hover:border-primary/30"
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-5"
              >
                <h3 className="font-headline font-bold text-base mb-4 text-on-surface px-2 border-b pb-3 pr-10">Mục Lục Bài Học</h3>
                <nav className="flex flex-col gap-2">
                  {SECTIONS.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium text-left ${
                          isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-variant'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-outline'}`} />
                        <span className="truncate">{sec.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex flex-col items-center pt-14 pb-5 gap-4 h-full"
              >
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      title={sec.title}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isActive ? 'bg-primary/15 text-primary' : 'text-outline hover:bg-surface-variant hover:text-on-surface'
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

      {/* Mobile TOC */}
      <div className="w-full lg:hidden bg-surface rounded-2xl p-4 border border-outline-variant shadow-sm">
        <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-sm font-medium flex-shrink-0 ${
                  isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-variant'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 pb-16 space-y-14">

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl min-h-[320px] md:min-h-[380px]"
        >
          {/* BG image */}
          <img src={IMG.heroBg} alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105" />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060812]/95 via-[#0a0a1a]/85 to-[#060812]/50" />
          {/* Portraits */}
          <div className="absolute bottom-0 right-0 h-full flex items-end justify-end gap-0 pointer-events-none">
            <img src={IMG.lennin} alt="Lênin" className="h-[80%] object-contain object-bottom opacity-20 mix-blend-luminosity select-none" />
            <img src={IMG.angghen} alt="Ăngghen" className="h-[85%] object-contain object-bottom opacity-30 mix-blend-luminosity select-none" />
          </div>
          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/25 px-3 py-1.5 rounded-full mb-6">
              Triết học Mác - Lênin · Chương 4
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Vai Trò Lịch Sử<br className="hidden md:block" /> Của Chủ Nghĩa Tư Bản
            </h1>
            <p className="text-blue-100/70 text-base md:text-lg leading-relaxed max-w-2xl mb-3">
              Phân tích biện chứng về phương thức sản xuất tư bản chủ nghĩa dưới góc nhìn duy vật lịch sử: Vai trò tích cực kiến tạo thế giới hiện đại và những giới hạn khách quan vốn có.
            </p>
            <p className="text-amber-300/80 text-sm md:text-base leading-relaxed max-w-2xl mb-6 italic border-l-2 border-amber-400/50 pl-3">
              "Giai cấp tư sản, trong quá trình thống trị giai cấp chưa đầy một thế kỷ, đã tạo ra những lực lượng sản xuất nhiều hơn và đồ sộ hơn lực lượng sản xuất của tất cả các thế hệ trước kia gộp lại." — C. Mác & Ph. Ăngghen
            </p>
          </div>
        </motion.div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION I — Tổng quan Vai trò Lịch sử          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s1" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Brain} color="bg-primary/10 text-primary" label="Phần 1" title="Tổng quan Vai trò Lịch sử" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left intro text */}
            <div className="bg-surface border border-outline-variant rounded-3xl p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <span className="text-xl">📜</span> Quy Luật Phát Triển Lịch Sử
                </h3>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Sự phát triển lịch sử của xã hội loài người là một quá trình lịch sử - tự nhiên. Mỗi phương thức sản xuất ra đời đều đảm nhận một vai trò lịch sử nhất định.
                </p>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Chủ nghĩa tư bản (CNTB) xuất hiện thay thế cho chế độ phong kiến lỗi thời là một bước tiến vượt bậc của văn minh nhân loại. Nó không chỉ mở rộng giao thương quốc tế mà còn tạo dựng cơ sở vật chất kỹ thuật vững chắc để loài người chuyển mình sang thời đại công nghiệp.
                </p>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Phương pháp luận Biện chứng</p>
                <p className="text-sm text-on-surface-variant">
                  Nhìn nhận CNTB cần sự khách quan: ghi nhận những cống hiến cách mạng đối với lực lượng sản xuất, đồng thời chỉ ra tính chất tự phủ định và các giới hạn không thể tự vượt qua của nó.
                </p>
              </div>
            </div>

            {/* Right Slide image card */}
            <div className="bg-surface border border-outline-variant rounded-3xl p-4 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2 px-2">📺 Sơ đồ vai trò lịch sử</p>
              <div className="rounded-2xl overflow-hidden border border-outline-variant bg-black flex items-center justify-center aspect-video shadow-inner">
                <img src={IMG.slide1} alt="Slide 1: Tổng quan vai trò lịch sử của CNTB" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* BRIDGE */}
        <SectionBridge text="Trước hết, hãy cùng phân tích những đóng góp tích cực mang tính cách mạng của chủ nghĩa tư bản đối với tiến trình phát triển nhân loại." />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION II — Vai trò Tích cực                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s2" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={TrendingUp} color="bg-emerald-500/10 text-emerald-600" label="Phần 2" title="Vai trò Tích cực của Chủ nghĩa Tư bản" />

          {/* Intro slide */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-7">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6" /> Cách mạng hóa sản xuất vật chất
                </h3>
                <p className="text-on-surface-variant text-base leading-relaxed mb-4">
                  Trong các phương thức sản xuất cũ (phong kiến, chiếm hữu nô lệ), kỹ thuật sản xuất gần như trì trệ hàng thế kỷ. Ngược lại, CNTB hoạt động dựa trên sự cạnh tranh khốc liệt và khát vọng thặng dư của nhà tư bản, buộc họ phải không ngừng đổi mới công nghệ, nâng cao quy mô và đẩy mạnh sự hợp tác.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-surface rounded-xl border border-emerald-500/10 flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> Thúc đẩy KH-CN phát triển vượt bậc
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-emerald-500/10 flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> Chuyển từ thủ công sang tự động hóa
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-3xl p-4 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2 px-2">📺 Thúc đẩy lực lượng sản xuất</p>
              <div className="rounded-2xl overflow-hidden border border-outline-variant bg-black flex items-center justify-center aspect-video">
                <img src={IMG.slide2} alt="Slide 2: Thúc đẩy Lực lượng sản xuất" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
          </div>

          {/* Accordion list details */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold uppercase tracking-wider text-outline mb-2">🔍 Phân tích 3 vai trò tích cực cốt lõi</h4>
            {POSITIVE_ROLES.map((item, idx) => {
              const Icon = item.icon;
              const isOpen = openPos === idx;
              return (
                <div key={idx} className={`rounded-2xl border-l-4 ${item.borderCls} ${item.bgCls} overflow-hidden transition-all`}>
                  <button
                    onClick={() => setOpenPos(isOpen ? null : idx)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className={`text-2xl font-black opacity-30 w-8 shrink-0 ${item.headerCls}`}>{item.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-lg md:text-xl ${item.headerCls}`}>
                        {item.title}
                      </p>
                      {!isOpen && <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{item.desc}</p>}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-outline shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="grid md:grid-cols-2 gap-4 border-t border-outline-variant/30 p-5 bg-surface/50">
                          {/* Left details */}
                          <div className="space-y-4">
                            <p className="text-base text-on-surface leading-relaxed">{item.desc}</p>
                            <ul className="space-y-2">
                              {item.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                                  <span className="text-emerald-500 mt-1 shrink-0">●</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right example & image */}
                          <div className="space-y-4">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1.5">🇻🇳 Minh Họa Thực Tế</p>
                              <p className="text-sm text-on-surface-variant italic leading-relaxed">"{item.example}"</p>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-outline-variant aspect-video bg-black flex items-center justify-center relative">
                              <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* BRIDGE */}
        <SectionBridge text="Mặc dù đóng vai trò to lớn trong việc phát triển lực lượng sản xuất, chủ nghĩa tư bản vẫn mang những mâu thuẫn nội tại sâu sắc và các giới hạn lịch sử không thể vượt qua." />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION III — Những Giới hạn Lịch sử           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s3" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Scale} color="bg-rose-500/10 text-rose-600" label="Phần 3" title="Những Giới hạn Lịch sử của CNTB" />

          {/* Intro quote C.Mác */}
          <div className="relative bg-gradient-to-br from-rose-950/40 via-[#121421] to-[#0a0a14] border border-rose-500/20 rounded-3xl p-8 mb-8 overflow-hidden">
            <div className="absolute top-4 left-6 text-rose-500/10 font-serif text-[120px] leading-none select-none pointer-events-none">"</div>
            <div className="absolute bottom-4 right-6 text-rose-500/10 font-serif text-[120px] leading-none select-none pointer-events-none rotate-180">"</div>
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-rose-400/80 mb-2 block">Tư duy phản biện</span>
              <p className="text-lg md:text-xl font-medium text-white/95 leading-relaxed mb-4">
                "Mâu thuẫn giữa tính chất xã hội của lực lượng sản xuất và hình thức chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất chính là mâu thuẫn cơ bản của chủ nghĩa tư bản."
              </p>
              <p className="text-rose-300/70 font-bold text-sm">— Lý luận về sự tha hóa & bóc lột sức lao động</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Slide 4 card */}
            <div className="bg-surface border border-outline-variant rounded-3xl p-4 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2 px-2">📺 Mục đích vì lợi ích tư sản</p>
              <div className="rounded-2xl overflow-hidden border border-outline-variant bg-black flex items-center justify-center aspect-video">
                <img src={IMG.slide4} alt="Slide 4: Mục đích vì lợi ích tư sản" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            {/* Slide 5 card */}
            <div className="bg-surface border border-outline-variant rounded-3xl p-4 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2 px-2">📺 Độc quyền kìm hãm</p>
              <div className="rounded-2xl overflow-hidden border border-outline-variant bg-black flex items-center justify-center aspect-video">
                <img src={IMG.slide5} alt="Slide 5: Độc quyền kìm hãm phát triển" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            {/* Intro text limits */}
            <div className="flex flex-col justify-center">
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
                  <span className="text-xl">⚠️</span> Hai Giới Hạn Lớn Nhất
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Dù năng lực sản xuất tăng vọt, thành quả lao động lại chảy về túi của một nhóm nhỏ nhà tài phiệt. Đồng thời, xu hướng tích tụ tư bản sinh ra độc quyền, làm bóp nghẹt sự tự do cạnh tranh, chèn ép các nhà sản xuất nhỏ và kìm hãm xã hội.
                </p>
              </div>
            </div>
          </div>

          {/* Accordion list details limits */}
          <div className="space-y-4">
            {LIMITATIONS.map((item, idx) => {
              const Icon = item.icon;
              const isOpen = openLimit === idx;
              return (
                <div key={idx} className={`rounded-2xl border-l-4 ${item.borderCls} ${item.bgCls} overflow-hidden transition-all`}>
                  <button
                    onClick={() => setOpenLimit(isOpen ? null : idx)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className={`text-2xl font-black opacity-30 w-8 shrink-0 ${item.headerCls}`}>{item.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-lg md:text-xl ${item.headerCls}`}>
                        {item.title}
                      </p>
                      {!isOpen && <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{item.desc}</p>}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-outline shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="grid md:grid-cols-2 gap-4 border-t border-outline-variant/30 p-5 bg-surface/50">
                          {/* Left details */}
                          <div className="space-y-4">
                            <p className="text-base text-on-surface leading-relaxed">{item.desc}</p>
                            <ul className="space-y-2">
                              {item.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                                  <span className="text-rose-500 mt-1 shrink-0">●</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right example & image */}
                          <div className="space-y-4">
                            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                              <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1.5">🇻🇳 Biểu Hiện Đời Thực</p>
                              <p className="text-sm text-on-surface-variant italic leading-relaxed">"{item.example}"</p>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-outline-variant aspect-video bg-black flex items-center justify-center relative">
                              <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* BRIDGE */}
        <SectionBridge text="Từ cả hai mặt tích cực và giới hạn, lịch sử chỉ ra một xu thế khách quan tất yếu về số phận lịch sử của chủ nghĩa tư bản." />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION IV — Ý nghĩa & Quy luật Vận động         */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s4" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Compass} color="bg-violet-500/10 text-violet-600" label="Phần 4" title="Ý nghĩa & Quy luật Vận động Tất yếu" />

          <div className="bg-violet-500/5 border border-violet-500/25 rounded-3xl p-8 mb-8">
            <h3 className="text-xl font-bold text-violet-600 dark:text-violet-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Sự tự phủ định tất yếu của CNTB
            </h3>
            <p className="text-on-surface-variant text-base leading-relaxed mb-6">
              Mác kết luận: Lực lượng sản xuất càng phát triển, tính chất xã hội hóa càng cao thì càng mâu thuẫn gay gắt với chế độ tư hữu tư bản chủ nghĩa. Mâu thuẫn này không thể giải quyết được trong khuôn khổ của bản thân CNTB. Nó đòi hỏi phải thay thế chế độ tư hữu bằng chế độ công hữu, thay thế CNTB bằng một xã hội mới cao hơn — **Chủ nghĩa Xã hội**.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-surface border border-outline-variant rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-on-surface mb-2 text-lg">1. Chuẩn bị vật chất khách quan</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Sự phát triển của nền sản xuất lớn và xã hội hóa sản xuất chính là sự chuẩn bị đầy đủ nhất về mặt vật chất cho sự ra đời của chủ nghĩa xã hội.
                  </p>
                </div>
                <div className="mt-4 text-xs font-semibold text-violet-500">→ Lực lượng sản xuất dọn đường</div>
              </div>

              <div className="p-5 bg-surface border border-outline-variant rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-on-surface mb-2 text-lg">2. Tạo ra lực lượng xã hội cách mạng</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Nền sản xuất đại công nghiệp sinh ra và rèn luyện giai cấp công nhân (giai cấp vô sản) — lực lượng xã hội có sứ mệnh lịch sử xóa bỏ CNTB và xây dựng xã hội mới.
                  </p>
                </div>
                <div className="mt-4 text-xs font-semibold text-violet-500">→ Sứ mệnh lịch sử của giai cấp công nhân</div>
              </div>
            </div>
          </div>

          {/* Interactive conclusion quote */}
          <div className="relative overflow-hidden border border-violet-500/20 rounded-3xl mb-8 flex flex-col md:flex-row bg-gradient-to-br from-[#1a1c2e] to-[#0a0a14] p-8 md:p-10">
            <div className="absolute -top-4 -left-4 text-violet-500/8 font-serif text-[140px] leading-none select-none pointer-events-none">"</div>
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-violet-400/80 block">🔑 Kết luận phương pháp luận</span>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
                Sự sụp đổ của giai cấp tư sản và sự thắng lợi của giai cấp vô sản đều là tất yếu khách quan như nhau.
              </p>
              <p className="text-violet-200/80 text-base leading-relaxed">
                Tuy nhiên, tiến trình này không tự diễn ra một cách tự phát mà cần qua con đường đấu tranh cách mạng tự giác của quần chúng lao động dưới sự lãnh đạo của Đảng Cộng sản, kết hợp giữa việc phát triển kinh tế, thúc đẩy khoa học công nghệ tiên tiến và không ngừng nâng cao dân trí, giác ngộ xã hội.
              </p>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
