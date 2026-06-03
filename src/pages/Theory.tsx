import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import {
  Globe, Lightbulb, Target, Play, Brain, Compass, Activity,
  ChevronDown, ArrowRight, BookOpen, Quote, Landmark, Users, Zap, Link2
} from 'lucide-react';

const animationThumbnail = '/animation_thumbnail.png';

const SECTIONS = [
  { id: 's1', title: 'I. Khái niệm & Bản chất', icon: Brain },
  { id: 's2', title: 'II. Mối quan hệ Biện chứng', icon: Activity },
  { id: 's3', title: 'III. Ý nghĩa Phương pháp luận', icon: Compass },
  { id: 's4', title: 'IV. Phân tích Trào lưu "Chữa lành"', icon: Play },
];

// 5 biểu hiện — với ví dụ thực tiễn từ file thoại
const FIVE_CHARACTERISTICS = [
  {
    num: '01', icon: Zap,
    title: 'Thường lạc hậu hơn tồn tại xã hội',
    desc: 'Tư tưởng, thói quen cũ thường bám rễ sâu và khó thay đổi, ngay cả khi điều kiện vật chất sinh ra chúng đã thay đổi. Lịch sử cho thấy những ảo tưởng lạc hậu rất khó bị xóa bỏ.',
    example: 'Thời nay máy móc đã làm thay sức người — không cần con trai để làm đồng nặng nhọc nữa. Vậy mà tư tưởng "phải có con trai nối dõi" vẫn bám rễ ở nhiều gia đình Việt Nam.',
    accent: 'amber',
    headerCls: 'text-amber-600 dark:text-amber-400',
    borderCls: 'border-l-amber-500',
    bgCls: 'bg-amber-500/5 border border-amber-500/20',
    badgeCls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  {
    num: '02', icon: Target,
    title: 'Có thể vượt trước tồn tại xã hội',
    desc: 'Những tư tưởng khoa học, tiên tiến có thể dự báo tương lai và dẫn đường cho thực tiễn, đi trước thời đại rất nhiều.',
    example: 'C. Mác và Ph. Ăngghen, dù sống ở thế kỷ 19, hệ tư tưởng của các ông đã dự báo được tương lai tất yếu của nhân loại sẽ tiến lên chủ nghĩa cộng sản — đi trước thực tiễn cả trăm năm.',
    accent: 'emerald',
    headerCls: 'text-emerald-600 dark:text-emerald-400',
    borderCls: 'border-l-emerald-500',
    bgCls: 'bg-emerald-500/5 border border-emerald-500/20',
    badgeCls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  {
    num: '03', icon: Link2,
    title: 'Có tính kế thừa trong lịch sử',
    desc: 'Tư tưởng thời đại sau kế thừa và phát triển từ thành tựu của thời đại trước. Ý thức xã hội có lịch sử phát triển riêng của nó.',
    example: 'Khi Chủ nghĩa Mác-Lênin vào Việt Nam, chúng ta không loại bỏ cái cũ, mà kế thừa truyền thống yêu nước, lòng nhân ái ngàn đời để hình thành Tư tưởng Hồ Chí Minh.',
    accent: 'blue',
    headerCls: 'text-blue-600 dark:text-blue-400',
    borderCls: 'border-l-blue-500',
    bgCls: 'bg-blue-500/5 border border-blue-500/20',
    badgeCls: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
  },
  {
    num: '04', icon: Activity,
    title: 'Tác động qua lại giữa các hình thái',
    desc: 'Các hình thái ý thức xã hội (tôn giáo, đạo đức, nghệ thuật, khoa học...) không tồn tại độc lập mà tác động lẫn nhau trong quá trình phát triển.',
    example: 'Ý thức tôn giáo tác động cực mạnh đến ý thức nghệ thuật. Các công trình kiến trúc điêu khắc như đền chùa, nhà thờ — nghệ thuật ở đây sinh ra để phục vụ cho tôn giáo.',
    accent: 'violet',
    headerCls: 'text-violet-600 dark:text-violet-400',
    borderCls: 'border-l-violet-500',
    bgCls: 'bg-violet-500/5 border border-violet-500/20',
    badgeCls: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  },
  {
    num: '05', icon: Zap,
    title: 'Tác động trở lại tồn tại xã hội',
    desc: 'Đây là biểu hiện quan trọng nhất. Ý thức xã hội — đặc biệt các hệ tư tưởng tiến bộ hoặc lạc hậu — có thể tác động mạnh mẽ trở lại tồn tại xã hội. Tư tưởng tiến bộ thúc đẩy xã hội phát triển; tư tưởng lạc hậu kìm hãm xã hội.',
    example: 'Đường lối Đổi mới năm 1986 của Đảng ta. Nhờ tư tưởng đổi mới đi trước (ý thức tiên tiến), chúng ta thay đổi hoàn toàn nền kinh tế, đưa đất nước thoát khỏi khủng hoảng. Ngược lại, quan niệm "sĩ, nông, công, thương" coi khinh người kinh doanh đã từng kìm hãm kinh tế hàng thế kỷ.',
    accent: 'rose',
    headerCls: 'text-rose-600 dark:text-rose-400',
    borderCls: 'border-l-rose-500',
    bgCls: 'bg-rose-500/5 border border-rose-500/30',
    badgeCls: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
    isHero: true,
  },
];

// 3 phân cảnh với màu cảm xúc riêng
const SCENES = [
  {
    id: 0, num: '01', emoji: '😨',
    label: 'Sợ hãi',
    concept: 'Tồn tại xã hội tiêu cực → Tâm lý xã hội tự phát',
    content: 'Sinh viên A khóc lóc vì điểm F và chia tay người yêu. Master "Vũ Trụ" xuất hiện đánh trúng tâm lý bất lực: "Con đang bị kẹt ở tần số thấp! Chỉ với 20 triệu, ta sẽ dạy con cách ngồi im, gửi tín hiệu để vũ trụ ship ngay bằng Giỏi và người yêu mới tới tận cửa!". A quẹt thẻ cái rụp vì sợ hãi thực tại và thèm khát chức năng đền bù hư ảo.',
    ringCls: 'ring-rose-500/60', tabActiveCls: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-b-2 border-rose-500',
    tabCls: 'text-on-surface-variant', borderCls: 'border-rose-500/40', bgCls: 'bg-rose-500/5', titleCls: 'text-rose-600 dark:text-rose-400',
    badgeCls: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  },
  {
    id: 1, num: '02', emoji: '🧘',
    label: 'Ảo tưởng',
    concept: 'Chức năng đền bù hư ảo → Tha hóa tinh thần',
    content: '1 tháng sau, bạn B đi làm thêm về rủ A đi học bài. A đang ngồi thiền, tay chắp hình hoa sen, khinh khỉnh đáp: "Tớ đang kết nối năng lượng cõi trên, không quan tâm dăm ba cái điểm số. Cậu đi làm công ăn lương là người \'tần số thấp\', tớ giờ có siêu năng lực rồi!". B lắc đầu ngán ngẩm.',
    ringCls: 'ring-violet-500/60', tabActiveCls: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-b-2 border-violet-500',
    tabCls: 'text-on-surface-variant', borderCls: 'border-violet-500/40', bgCls: 'bg-violet-500/5', titleCls: 'text-violet-600 dark:text-violet-400',
    badgeCls: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  },
  {
    id: 2, num: '03', emoji: '💡',
    label: 'Tỉnh ngộ',
    concept: 'Thực tiễn thức tỉnh → Quay lại hoạt động thực tiễn',
    content: 'Bưu tá đến gõ cửa. A háo hức tưởng vũ trụ gửi tiền tài, mở ra lại là giấy báo nợ thẻ tín dụng 20 triệu và giấy cảnh báo buộc thôi học. A suy sụp gọi Master thì thuê bao. B vỗ vai A, đưa cuốn Giáo trình Triết học: "Sự bất lực trước hiện thực đẻ ra lòng tin vào phép màu. Vũ trụ không ship thứ gì nếu cậu không lao động. Tỉnh lại đi, các khóa học đó chỉ là thuốc phiện tinh thần thôi!"',
    ringCls: 'ring-amber-500/60', tabActiveCls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-b-2 border-amber-500',
    tabCls: 'text-on-surface-variant', borderCls: 'border-amber-500/40', bgCls: 'bg-amber-500/5', titleCls: 'text-amber-600 dark:text-amber-400',
    badgeCls: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
];

// Reusable bridge text
function SectionBridge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
      <p className="text-sm text-outline italic text-center px-2 shrink-0 max-w-md">{text}</p>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
    </div>
  );
}

// Reusable section heading
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
  const [openChar, setOpenChar] = useState<number | null>(null);
  const [activeScene, setActiveScene] = useState(0);
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
      <aside className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 z-10 bg-surface rounded-2xl p-5 shadow-sm border border-outline-variant">
        <h3 className="font-headline font-bold text-base mb-4 text-on-surface px-2 border-b pb-3">Hệ thống bài giảng</h3>
        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium flex-shrink-0 text-left ${
                  isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-variant'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 pb-16 space-y-14">

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a1c2e] via-[#121421] to-[#0a0a0f] rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-primary/20 shadow-xl"
        >
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-tertiary/8 rounded-full blur-2xl pointer-events-none" />
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/25 px-3 py-1.5 rounded-full mb-6">
            Triết học Mác - Lênin · Chương IV
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Tồn tại xã hội<br className="hidden md:block" /> & Ý thức xã hội
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
            Nguyên lý cốt lõi của Chủ nghĩa duy vật lịch sử: đời sống vật chất khách quan quyết định thế giới tinh thần — nhưng tinh thần có sức mạnh cải tạo lại vật chất.
          </p>
          <div className="flex flex-wrap gap-3">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className="text-xs font-semibold text-primary/80 hover:text-primary border border-primary/20 hover:border-primary/40 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5">
                {s.title.split('.')[0]}. <span className="hidden sm:inline">{s.title.split('. ')[1]}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION I — Khái niệm & Bản chất                */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s1" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Brain} color="bg-primary/10 text-primary" label="Phần 1" title="Khái niệm & Bản chất" />

          {/* 2-col: TTXH | YTXH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* TTXH Card */}
            <div className="bg-surface border-2 border-primary/25 rounded-3xl p-7 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Tồn tại xã hội</h3>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-base">
                Là toàn bộ sinh hoạt vật chất và những điều kiện sinh hoạt vật chất của xã hội — thực tại khách quan, tồn tại độc lập với ý thức con người.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-on-surface"><strong>Điều kiện tự nhiên:</strong> Khí hậu, đất đai, sông ngòi, tài nguyên</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-on-surface"><strong>Dân số & mật độ:</strong> Yếu tố nền tảng sinh học của xã hội</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-on-surface"><strong>⭐ Phương thức sản xuất (Quyết định nhất):</strong> Cách con người tạo ra của cải vật chất</span>
                </div>
              </div>
            </div>

            {/* YTXH Card */}
            <div className="bg-surface border-2 border-tertiary/25 rounded-3xl p-7 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-tertiary">Ý thức xã hội</h3>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-base">
                Là mặt tinh thần của đời sống xã hội, bao gồm tình cảm, tập quán, truyền thống, quan điểm, học thuyết... nảy sinh từ tồn tại xã hội và phản ánh tồn tại xã hội.
              </p>
              <div className="space-y-2.5">
                <div className="p-4 bg-tertiary/5 rounded-xl border border-tertiary/20">
                  <p className="text-sm font-semibold text-tertiary mb-1">Tâm lý xã hội</p>
                  <p className="text-xs text-on-surface-variant">Tình cảm, thói quen, tâm trạng — nảy sinh <em>trực tiếp, tự phát</em> từ điều kiện sống hàng ngày.</p>
                </div>
                <div className="p-4 bg-tertiary/8 rounded-xl border border-tertiary/25">
                  <p className="text-sm font-semibold text-tertiary mb-1">Hệ tư tưởng xã hội</p>
                  <p className="text-xs text-on-surface-variant">Quan điểm, học thuyết, lý luận — phản ánh tồn tại xã hội <em>khái quát, hệ thống</em>.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ví dụ Việt Nam — Lúa nước (Image placeholder) */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/15 mb-6">
            {/* Image placeholder slot — aspect 2:1 */}
            <div className="aspect-[2/1] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center justify-center gap-3">
              <BookOpen className="w-10 h-10 text-primary/40" />
              <p className="text-primary/50 text-sm font-medium">[Ảnh minh họa: Cánh đồng lúa nước Việt Nam]</p>
              <p className="text-outline/50 text-xs">Placeholder — aspect ratio 2:1 — file: ttxh_luanuoc.jpg</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-xs font-bold tracking-widest uppercase text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-3 inline-block">🌾 Ví dụ thực tiễn Việt Nam</span>
              <h4 className="text-white text-lg md:text-xl font-bold mb-2">Nông nghiệp lúa nước định hình cả một dân tộc</h4>
              <p className="text-blue-100/75 text-sm md:text-base leading-relaxed max-w-2xl">
                Vị trí địa lý sông ngòi, khí hậu nhiệt đới gió mùa <em>(điều kiện tự nhiên)</em> khiến cha ông ta chọn phương thức sản xuất trồng lúa nước — đòi hỏi cùng nhau đắp đê, chống lũ. Từ <strong>tồn tại xã hội</strong> ấy sinh ra <strong>ý thức xã hội</strong> đặc trưng: tinh thần đoàn kết, trọng tình làng nghĩa xóm, "tối lửa tắt đèn có nhau".
              </p>
            </div>
          </div>

          {/* Tính giai cấp — callout */}
          <div className="bg-surface border-l-4 border-l-error border border-error/15 rounded-2xl rounded-l-none p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-1.5 text-base">Trong xã hội có giai cấp: Ý thức mang tính giai cấp</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Trong một xã hội có giai cấp, ý thức xã hội cũng mang tính giai cấp sâu sắc. Dưới thời phong kiến, do giai cấp địa chủ nắm giữ tư liệu sản xuất, họ tạo ra hệ tư tưởng <strong>"trọng nam khinh nữ"</strong> để bảo vệ quyền lợi gia trưởng — đó chính là tính giai cấp của ý thức xã hội.
              </p>
            </div>
          </div>
        </motion.section>

        {/* BRIDGE → Section II */}
        <SectionBridge text="Vậy tồn tại xã hội và ý thức xã hội tương tác với nhau như thế nào? Đây là phần trọng tâm nhất của bài học." />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION II — Mối quan hệ Biện chứng — HERO     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s2" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Activity} color="bg-emerald-500/10 text-emerald-600" label="Phần 2 — Trọng tâm" title="Mối quan hệ Biện chứng" />

          {/* Hero Quote C.Mác */}
          <div className="relative bg-gradient-to-br from-emerald-950/60 via-[#121421] to-[#0a0a14] border border-emerald-500/20 rounded-3xl p-8 md:p-10 mb-8 overflow-hidden">
            <div className="absolute top-4 left-6 text-emerald-500/10 font-serif text-[120px] leading-none select-none pointer-events-none">"</div>
            <div className="absolute bottom-4 right-6 text-emerald-500/10 font-serif text-[120px] leading-none select-none pointer-events-none rotate-180">"</div>
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400/70 mb-4 block">Trích dẫn gốc</span>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-5">
                "Không phải ý thức của con người quyết định tồn tại của họ; trái lại, tồn tại xã hội của họ quyết định ý thức của họ."
              </p>
              <p className="text-emerald-300/70 font-medium">— C. Mác, <em>Góp phần phê phán khoa kinh tế chính trị</em>, 1859</p>
            </div>
          </div>

          {/* Nguyên lý 1: TTXH quyết định YTXH */}
          <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-3xl p-7 mb-6">
            <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span className="text-3xl font-black opacity-30 mr-1">1</span>
              Tồn tại xã hội quyết định Ý thức xã hội
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 bg-surface-container-highest rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span className="text-sm text-on-surface">Tồn tại xã hội như thế nào thì ý thức xã hội như thế ấy.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 bg-surface-container-highest rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span className="text-sm text-on-surface">Khi tồn tại xã hội (nhất là phương thức sản xuất) biến đổi, sớm muộn ý thức xã hội cũng biến đổi theo.</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-500/8 rounded-xl border border-emerald-500/20">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-2">🇻🇳 Ví dụ Việt Nam</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Khi Việt Nam chuyển từ kinh tế <strong>bao cấp</strong> sang <strong>kinh tế thị trường</strong>, thói quen ỷ lại "chờ nhà nước phân phối" dần biến mất. Tư duy năng động, tự chủ, cạnh tranh làm giàu xuất hiện. Đời sống kinh tế thay đổi đã ép tư duy phải thay đổi theo.
                </p>
              </div>
            </div>
          </div>

          {/* Nguyên lý 2: 5 biểu hiện độc lập tương đối */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-7 mb-6">
            <h3 className="text-xl font-black text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
              <span className="text-3xl font-black opacity-30 mr-1">2</span>
              Tính độc lập tương đối của Ý thức xã hội
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 ml-10">Tuy bị tồn tại xã hội quyết định, ý thức xã hội không hoàn toàn thụ động — nó có <strong>5 biểu hiện độc lập</strong> sau đây:</p>

            <div className="space-y-3">
              {FIVE_CHARACTERISTICS.map((item, idx) => {
                const Icon = item.icon;
                const isOpen = openChar === idx;
                return (
                  <div key={idx} className={`rounded-2xl border-l-4 ${item.borderCls} ${item.bgCls} overflow-hidden transition-all`}>
                    <button
                      onClick={() => setOpenChar(isOpen ? null : idx)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className={`text-3xl font-black opacity-20 w-10 shrink-0 ${item.headerCls}`}>{item.num}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-base ${item.headerCls} ${item.isHero ? 'text-lg' : ''}`}>
                          {item.title}
                          {item.isHero && <span className="ml-2 text-xs font-bold bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded-full">⭐ Quan trọng nhất</span>}
                        </p>
                        {!isOpen && <p className="text-xs text-outline mt-0.5 line-clamp-1">{item.desc}</p>}
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
                          <div className="px-5 pb-5 pt-1 grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-on-surface leading-relaxed">{item.desc}</p>
                            </div>
                            <div className="p-4 bg-surface-container-highest rounded-xl">
                              <p className={`text-xs font-bold uppercase tracking-wide ${item.headerCls} mb-2`}>🇻🇳 Ví dụ thực tiễn</p>
                              <p className="text-sm text-on-surface-variant italic leading-relaxed">"{item.example}"</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Highlight: Đổi mới 1986 */}
          <div className="relative bg-gradient-to-r from-rose-950/50 via-[#1a0a14] to-[#0a0a14] border border-rose-500/25 rounded-3xl p-7 md:p-9 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-rose-400/70 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 mb-5 inline-block">
                ⭐ Điểm nhấn cao trào — Biểu hiện thứ 5
              </span>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-3">Đổi mới 1986</h4>
                  <p className="text-rose-100/75 leading-relaxed text-base">
                    Đường lối Đổi mới của Đảng ta là minh chứng rõ ràng nhất: <strong className="text-white">ý thức tiên tiến đi trước</strong> đã thay đổi hoàn toàn tồn tại xã hội, đưa đất nước thoát khỏi khủng hoảng.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs text-rose-300/60 mb-1">Trước 1986</p>
                    <p className="text-sm text-white/70 font-medium">Kinh tế bao cấp<br/>Khủng hoảng trầm trọng</p>
                  </div>
                  <div className="flex items-center text-rose-400 font-black text-xl">→</div>
                  <div className="flex-1 p-4 bg-rose-500/10 rounded-2xl border border-rose-500/25 text-center">
                    <p className="text-xs text-rose-300/80 mb-1">Sau 1986</p>
                    <p className="text-sm text-white font-medium">Kinh tế thị trường<br/>Phát triển vượt bậc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* BRIDGE → Section III */}
        <SectionBridge text="Triết học không chỉ để hiểu thế giới — mà để cải tạo nó. Vậy chúng ta rút ra bài học thực tiễn gì?" />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION III — Ý nghĩa Phương pháp luận          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s3" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Compass} color="bg-violet-500/10 text-violet-600" label="Phần 3" title="Ý nghĩa Phương pháp luận" />

          {/* Personal Lesson Quote — từ file thoại dòng 31 */}
          <div className="relative bg-gradient-to-br from-[#1a1c2e] to-[#0a0a14] border border-violet-500/20 rounded-3xl p-8 md:p-10 mb-8 overflow-hidden">
            <div className="absolute -top-6 -left-4 text-violet-500/8 font-serif text-[160px] leading-none select-none pointer-events-none">"</div>
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/15 text-violet-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-violet-400/70 mb-4 block">🔑 Bài học thực tiễn rút ra cho mỗi chúng ta</span>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium mb-4">
                  Nếu bạn muốn thay đổi một thói quen xấu, một tư duy cũ — <strong className="text-violet-300">đừng chỉ quyết tâm suông trong đầu.</strong> Hãy bắt tay vào thay đổi "tồn tại xã hội" của mình trước.
                </p>
                <p className="text-violet-200/60 text-base leading-relaxed">
                  Dọn dẹp lại không gian làm việc. Chọn chơi với những người bạn tích cực. Tạo ra môi trường buộc bạn phải tiến lên. Đồng thời, không ngừng trau dồi tri thức tiến bộ để soi đường cho hành động của mình.
                </p>
              </div>
            </div>
          </div>

          {/* 2 ý nghĩa học thuật */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-violet-500/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-violet-500/10 text-violet-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shrink-0">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">Cải tạo xã hội từ gốc</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Để thay đổi tận gốc tư tưởng, đạo đức của một xã hội, trước tiên phải thay đổi phương thức sản xuất và hoàn cảnh sống vật chất. Không thể chỉ giáo huấn suông.
              </p>
            </div>
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">Chú trọng giáo dục tư tưởng</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Đồng thời với phát triển kinh tế, phải chú trọng xây dựng văn hóa, đạo đức. Xóa bỏ hủ tục lạc hậu và phát huy truyền thống tốt đẹp, tiếp thu tinh hoa nhân loại.
              </p>
            </div>
          </div>
        </motion.section>

        {/* BRIDGE → Section IV */}
        <SectionBridge text='Bây giờ, hãy cùng nhìn vào một hiện tượng đang rất phổ biến trong giới trẻ — trào lưu "Chữa lành" — và giải mã nó bằng triết học Mác-Lênin.' />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION IV — Phân tích Trào lưu "Chữa lành"    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.section id="s4" className="scroll-mt-28"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <SectionHeading icon={Play} color="bg-purple-500/10 text-purple-600" label="Phần 4 — Vận dụng" title='Phân tích Trào lưu "Chữa lành"' />

          {/* Philosophical Lens */}
          <div className="bg-surface border border-outline-variant rounded-3xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="font-bold text-on-surface text-base mb-2">Giải mã bằng Triết học Mác-Lênin</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Trào lưu "Đánh thức năng lượng gốc" hay "gửi tín hiệu vào vũ trụ" mang cơ chế của một dạng <strong>ý thức tôn giáo kiểu mới</strong> — là <em>sự phản ánh hư ảo</em> về sức mạnh của giới tự nhiên lẫn các quan hệ xã hội.
                </p>
              </div>
            </div>
          </div>

          {/* 2 Analysis Boxes */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {/* Q1 */}
            <div className="bg-surface border-2 border-primary/20 rounded-3xl p-6">
              <div className="p-3 bg-primary/5 border-l-4 border-primary rounded-r-xl mb-4 italic text-on-surface text-sm">
                C.Mác và V.I. Lênin đã khẳng định tôn giáo / ảo tưởng là <strong>"thuốc phiện của nhân dân"</strong>, bởi nó chỉ mang lại sự đền bù hư ảo, ru ngủ con người, làm giảm ý chí đấu tranh và hoạt động thực tiễn.
              </div>
              <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wide">Câu hỏi 1 — Tại sao đi "chữa lành"?</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Dù tồn tại xã hội hiện đại đầy đủ tiện nghi, ý thức xã hội (tâm lý xã hội) vẫn có <strong>tính lạc hậu</strong> — tâm lý ỷ lại, mong chờ phép màu không tự biến mất. Khi cá nhân gặp cú sốc, họ rơi vào "bất lực trước áp lực xã hội" và tìm chỗ dựa tinh thần siêu nhiên dễ dãi.
              </p>
            </div>
            {/* Q2 */}
            <div className="bg-surface border-2 border-tertiary/20 rounded-3xl p-6">
              <div className="p-3 bg-tertiary/5 border-l-4 border-tertiary rounded-r-xl mb-4 font-semibold text-on-surface text-sm">
                Khẳng định: Đây chính xác là một dạng "thuốc phiện tinh thần" mới trong bối cảnh hiện đại.
              </div>
              <h4 className="font-bold text-tertiary mb-3 text-sm uppercase tracking-wide">Câu hỏi 2 — Cơ chế hoạt động?</h4>
              <div className="space-y-2">
                <div className="p-3 bg-surface-container-highest rounded-xl">
                  <p className="text-xs font-bold text-tertiary mb-1">Đền bù hư ảo</p>
                  <p className="text-xs text-on-surface-variant">Đánh trúng tâm lý muốn có kết quả mà không phải lao động, cải tạo thực tiễn.</p>
                </div>
                <div className="p-3 bg-surface-container-highest rounded-xl">
                  <p className="text-xs font-bold text-tertiary mb-1">Tha hóa tinh thần</p>
                  <p className="text-xs text-on-surface-variant">Khuyên "ngồi im", làm nhụt ý chí, biến con người thành nô lệ cho ảo ảnh của các nhà "thương mại hóa nỗi đau".</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Emotional Scenes — Tab Stepper */}
          <div className="bg-surface-container-highest border border-outline-variant rounded-3xl overflow-hidden mb-6">
            <div className="p-5 border-b border-outline-variant">
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-5 h-5 text-error" />
                <h3 className="font-bold text-lg text-on-surface">Phim ngắn: "Tần số thấp và Hóa đơn từ Vũ trụ"</h3>
              </div>
              {/* Scene Tabs */}
              <div className="flex gap-2">
                {SCENES.map((scene) => (
                  <button key={scene.id} onClick={() => setActiveScene(scene.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-1 justify-center ${
                      activeScene === scene.id
                        ? `${scene.bgCls} ${scene.titleCls} ring-2 ${scene.ringCls}`
                        : 'text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    <span className="text-lg">{scene.emoji}</span>
                    <span className="hidden sm:inline">Cảnh {scene.num}:</span> {scene.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {SCENES.map((scene) => activeScene === scene.id && (
                <motion.div key={scene.id}
                  initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}
                  className={`p-6 ${scene.bgCls} border-l-4 ${scene.borderCls}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{scene.emoji}</span>
                    <div>
                      <h4 className={`font-bold text-lg ${scene.titleCls}`}>Phân cảnh {scene.num}: {scene.label}</h4>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scene.badgeCls}`}>{scene.concept}</span>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">{scene.content}</p>
                  <div className="flex justify-between mt-4">
                    <button onClick={() => setActiveScene(Math.max(0, activeScene - 1))}
                      disabled={activeScene === 0}
                      className="text-xs text-outline hover:text-on-surface disabled:opacity-30 transition-colors">← Cảnh trước</button>
                    <button onClick={() => setActiveScene(Math.min(SCENES.length - 1, activeScene + 1))}
                      disabled={activeScene === SCENES.length - 1}
                      className="text-xs text-outline hover:text-on-surface disabled:opacity-30 transition-colors">Cảnh sau →</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Video Placeholder */}
          <div className="relative group aspect-video bg-black rounded-3xl overflow-hidden ring-1 ring-outline-variant/50 shadow-2xl">
            <img src={animationThumbnail} alt="Animation Thumbnail: Tần số thấp và Hóa đơn từ Vũ trụ"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Play className="text-white w-8 h-8 ml-1" />
              </div>
              <p className="text-white font-bold text-lg">Chờ ghép Video của Nhóm</p>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
