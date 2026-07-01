import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Brain, ChevronDown, Compass, Globe, Scale, TrendingUp, Users, Zap } from 'lucide-react';

const IMG = {
  heroBg: '/theory_hero_bg.jpg',
  productionForce: '/images/image18.png',
  modernProduction: '/images/image7.png',
  socializedProduction: '/images/image3.png',
  slide3: '/images/image20.png',
  slide4: '/images/image9.png',
  slide5: '/images/image12.png',
  angghen: '/angghen.png',
  lennin: '/lennin2.0.png',
};

const SECTIONS = [
  { id: 's1', title: 'I. Tổng quan', icon: Brain },
  { id: 's2', title: 'II. Vai trò tích cực của CNTB', icon: TrendingUp },
  { id: 's3', title: 'III. Giới hạn phát triển của CNTB', icon: Scale },
  { id: 's4', title: 'IV. Kết luận & Xu thế vận động', icon: Compass },
];

const POSITIVE_ROLES = [
  {
    num: '01', icon: Zap,
    title: 'Thúc đẩy lực lượng sản xuất phát triển nhanh chóng',
    desc: 'Quá trình phát triển của chủ nghĩa tư bản thúc đẩy lực lượng sản xuất phát triển mạnh mẽ: chuyển từ lao động thủ công lên kỹ thuật cơ khí, tự động hóa và tin học hóa.',
    bullets: [
      'Giải phóng sức lao động và nâng cao hiệu quả khám phá, chinh phục tự nhiên của con người.',
      'Đóng vai trò chủ chốt trong các cuộc cách mạng công nghiệp, đặc biệt là Cách mạng công nghiệp lần thứ tư và thời đại kinh tế tri thức.'
    ],
    img: IMG.productionForce,
    headerCls: 'text-emerald-600 dark:text-emerald-400', borderCls: 'border-l-emerald-500', bgCls: 'bg-emerald-500/5 border border-emerald-500/20',
  },
  {
    num: '02', icon: Globe,
    title: 'Chuyển nền sản xuất nhỏ thành nền sản xuất lớn hiện đại',
    desc: 'Chuyển kinh tế hàng hóa giản đơn lên kinh tế hàng hóa tư bản chủ nghĩa, thúc đẩy sản xuất tập trung quy mô lớn, hiện đại và năng suất cao.',
    bullets: [
      'Kích thích cải tiến kỹ thuật, tăng năng suất lao động dưới tác động của quy luật thị trường.',
      'Tạo ra khối lượng sản phẩm hàng hóa khổng lồ và phong phú cho xã hội.'
    ],
    img: IMG.modernProduction,
    headerCls: 'text-blue-600 dark:text-blue-400', borderCls: 'border-l-blue-500', bgCls: 'bg-blue-500/5 border border-blue-500/20',
  },
  {
    num: '03', icon: Users,
    title: 'Thực hiện xã hội hóa sản xuất',
    desc: 'Thúc đẩy xã hội hóa sản xuất cả về chiều rộng và chiều sâu, đưa sản xuất hàng hóa đạt tới mức điển hình nhất trong lịch sử.',
    bullets: [
      'Phát triển phân công lao động xã hội, chuyên môn hóa sản xuất và hợp tác lao động sâu sắc.',
      'Liên kết các quá trình sản xuất phân tán thành một hệ thống sản xuất xã hội thống nhất, thúc đẩy sản xuất phát triển cao hơn.'
    ],
    img: IMG.socializedProduction,
    headerCls: 'text-violet-600 dark:text-violet-400', borderCls: 'border-l-violet-500', bgCls: 'bg-violet-500/5 border border-violet-500/20',
  },
];

const LIMITATIONS = [
  {
    num: '01', icon: Scale,
    title: 'Mục đích của nền sản xuất tư bản chủ nghĩa vẫn tập trung chủ yếu vì lợi ích của thiểu số giai cấp tư sản',
    desc: 'Mục đích của nền sản xuất tư bản chủ nghĩa không phải vì lợi ích của đông đảo quần chúng nhân dân lao động một cách tự giác, mà chủ yếu vì lợi ích của thiểu số giai cấp tư sản, của bọn tư bản độc quyền, nhất là tư bản tài chính.',
    bullets: [
      'Mục đích này không phù hợp với thời đại phát triển của cách mạng công nghiệp hiện đại, không phù hợp với yêu cầu của trình độ xã hội hóa cao của lực lượng sản xuất.',
      'Cơ sở kinh tế là chế độ chiếm hữu tư nhân về tư liệu sản xuất; người lao động không có tư liệu sản xuất nên phải bán sức lao động và bị bóc lột giá trị thặng dư.',
      'Trong chủ nghĩa tư bản hiện đại, tư liệu sản xuất tập trung vào các tập đoàn độc quyền; vì lợi nhuận độc quyền cao, các tập đoàn áp đặt giá bán cao, giá mua thấp, hạn chế sản lượng và kìm hãm phát triển.'
    ],
    img: IMG.slide4,
    headerCls: 'text-rose-600 dark:text-rose-400', borderCls: 'border-l-rose-500', bgCls: 'bg-rose-500/5 border border-rose-500/20',
  },
  {
    num: '02', icon: Globe,
    title: 'Chủ nghĩa tư bản đã và đang tiếp tục tham gia gây ra chiến tranh và xung đột ở nhiều nơi trên thế giới',
    desc: 'Vì sự tồn tại và phát triển của mình, các cường quốc tư bản ra sức chiếm lĩnh thuộc địa, chiếm lĩnh thị trường.',
    bullets: [
      'Sự phân chia thị trường thế giới dựa trên sức mạnh và sự phát triển không đều tất yếu dẫn đến các cuộc xung đột để phân chia lại thị trường.',
      'Là nguyên nhân chính dẫn đến Chiến tranh thế giới thứ nhất (1914–1918) và thứ hai (1939–1945), chạy đua vũ trang và chiến tranh lạnh.',
      'Trong thế kỷ XXI, chiến tranh cục bộ, sắc tộc, thương mại vẫn xảy ra và đều có sự can thiệp trực tiếp hoặc gián tiếp của các cường quốc tư bản.'
    ],
    img: IMG.slide3,
    headerCls: 'text-orange-600 dark:text-orange-400', borderCls: 'border-l-orange-500', bgCls: 'bg-orange-500/5 border border-orange-500/20',
  },
  {
    num: '03', icon: Users,
    title: 'Sự phân hóa giàu - nghèo trong lòng các nước tư bản và có xu hướng ngày càng sâu sắc',
    desc: 'Tích tụ và tập trung tư bản cao độ làm gia tăng giá trị thặng dư của các tập đoàn độc quyền, khiến thu nhập của giai cấp công nhân giảm tương đối trong khi thu nhập của giai cấp tư sản tăng lên.',
    bullets: [
      'Các cường quốc tư bản thi hành chính sách thực dân mới, sử dụng viện trợ và "chiến lược biên giới mềm" để duy trì sự lệ thuộc của các nước đang phát triển.',
      'Một nhóm nhỏ cường quốc giàu lên nhanh chóng trong khi nhiều quốc gia chậm phát triển chìm sâu trong nghèo đói; lợi nhuận tập đoàn Mỹ vượt quá GDP một số quốc gia.'
    ],
    img: IMG.slide5,
    headerCls: 'text-pink-600 dark:text-pink-400', borderCls: 'border-l-pink-500', bgCls: 'bg-pink-500/5 border border-pink-500/20',
  },
];

type TheoryItem = (typeof POSITIVE_ROLES)[number] | (typeof LIMITATIONS)[number];

function SectionBridge({ text }: { text: string }) {
  return <div className="flex items-center gap-4 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" /><p className="text-base text-on-surface-variant italic text-center px-2 shrink-0 max-w-xl">{text}</p><div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" /></div>;
}

function SectionHeading({ icon: Icon, color, label, title }: { icon: React.ElementType; color: string; label: string; title: string }) {
  return <div className="flex items-center gap-4 mb-10 border-b border-outline-variant pb-5"><div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}><Icon className="w-7 h-7" /></div><div><span className="text-xs font-bold tracking-widest uppercase text-outline block mb-1">{label}</span><h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight">{title}</h2></div></div>;
}

function BulletList({ bullets, tone }: { bullets: string[]; tone: string }) {
  return <ul className="space-y-2">{bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2.5 text-sm text-on-surface-variant"><span className={`${tone} mt-1 shrink-0`}>•</span><span>{bullet}</span></li>)}</ul>;
}

function AccordionItem({ item, idx, open, setOpen, tone, onImageClick, extraContent }: { item: TheoryItem; idx: number; open: number | null; setOpen: (value: number | null) => void; tone: 'emerald' | 'rose'; onImageClick: (img: string) => void; extraContent?: React.ReactNode }) {
  const Icon = item.icon;
  const isOpen = open === idx;
  const bulletTone = tone === 'emerald' ? 'text-emerald-500' : 'text-rose-500';

  return <div className={`rounded-2xl border-l-4 ${item.borderCls} ${item.bgCls} overflow-hidden transition-all`}>
    <button onClick={() => setOpen(isOpen ? null : idx)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors">
      <span className={`text-2xl font-black opacity-30 w-8 shrink-0 ${item.headerCls}`}>{item.num}</span>
      <Icon className={`w-5 h-5 shrink-0 ${item.headerCls}`} />
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-lg md:text-xl ${item.headerCls}`}>{item.title}</p>
        {!isOpen && <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{item.desc}</p>}
      </div>
      <ChevronDown className={`w-5 h-5 text-outline shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>

    <AnimatePresence>
      {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-4 border-t border-outline-variant/30 p-5 bg-surface/50">
          <div className="space-y-4">
            <p className="text-base text-on-surface leading-relaxed">{item.desc}</p>
            <BulletList bullets={item.bullets} tone={bulletTone} />
          </div>
          <div className="space-y-4">
            <button className="rounded-xl overflow-hidden border border-outline-variant aspect-video bg-black flex items-center justify-center group cursor-zoom-in" onClick={() => onImageClick(item.img)}>
              <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
            </button>
          </div>
        </div>
        {extraContent}
      </motion.div>}
    </AnimatePresence>
  </div>;
}
export default function Theory() {
  const [activeId, setActiveId] = useState('s1');
  const [openPos, setOpenPos] = useState<number | null>(0);
  const [openLimit, setOpenLimit] = useState<number | null>(0);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  useEffect(() => { if (location.hash) setTimeout(() => scrollTo(location.hash.replace('#', '')), 100); }, [location.hash]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }), { rootMargin: '-20% 0px -70% 0px' });
    SECTIONS.forEach((section) => { const element = document.getElementById(section.id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 pt-24 pb-8 md:pt-28 md:pb-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
    <motion.aside animate={{ width: sidebarOpen ? 280 : 48 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} className="flex-shrink-0 lg:sticky lg:top-24 z-10 hidden lg:block" style={{ minWidth: sidebarOpen ? 280 : 48 }}>
      <div className="relative bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden h-full"><button onClick={() => setSidebarOpen(!sidebarOpen)} title={sidebarOpen ? 'Ẩn mục lục' : 'Hiện mục lục'} className="absolute top-3 right-3 z-20 w-7 h-7 rounded-lg bg-surface-variant hover:bg-primary/10 hover:text-primary text-outline flex items-center justify-center transition-all border border-outline-variant hover:border-primary/30"><motion.span animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.3 }} className="flex items-center justify-center text-xs font-bold">◀</motion.span></button>
        <AnimatePresence mode="wait">{sidebarOpen ? <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-5"><h3 className="font-headline font-bold text-base mb-4 text-on-surface px-2 border-b pb-3 pr-10">Mục lục bài học</h3><nav className="flex flex-col gap-2">{SECTIONS.map((sec) => { const Icon = sec.icon; const isActive = activeId === sec.id; return <button key={sec.id} onClick={() => scrollTo(sec.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium text-left ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-variant'}`}><Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-outline'}`} /><span className="truncate">{sec.title}</span></button>; })}</nav></motion.div> : <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }} className="flex flex-col items-center pt-14 pb-5 gap-4 h-full">{SECTIONS.map((sec) => { const Icon = sec.icon; const isActive = activeId === sec.id; return <button key={sec.id} onClick={() => scrollTo(sec.id)} title={sec.title} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-primary/15 text-primary' : 'text-outline hover:bg-surface-variant hover:text-on-surface'}`}><Icon className="w-4 h-4" /></button>; })}</motion.div>}</AnimatePresence>
      </div>
    </motion.aside>

    <div className="w-full lg:hidden bg-surface rounded-2xl p-4 border border-outline-variant shadow-sm"><nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">{SECTIONS.map((sec) => { const Icon = sec.icon; const isActive = activeId === sec.id; return <button key={sec.id} onClick={() => scrollTo(sec.id)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-sm font-medium flex-shrink-0 ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-variant'}`}><Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-outline'}`} /><span>{sec.title}</span></button>; })}</nav></div>

    <main className="flex-1 min-w-0 pb-16 space-y-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl min-h-[320px] md:min-h-[380px]"><img src={IMG.heroBg} alt="Nền bài học" className="absolute inset-0 w-full h-full object-cover object-center scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-[#060812]/95 via-[#0a0a1a]/85 to-[#060812]/50" /><div className="absolute bottom-0 right-0 h-full flex items-end justify-end gap-0 pointer-events-none"><img src={IMG.lennin} alt="Lênin" className="h-[80%] object-contain object-bottom opacity-20 mix-blend-luminosity select-none" /><img src={IMG.angghen} alt="Ăngghen" className="h-[85%] object-contain object-bottom opacity-30 mix-blend-luminosity select-none" /></div><div className="relative z-10 p-8 lg:p-12"><span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/25 px-3 py-1.5 rounded-full mb-6">Triết học Mác - Lênin · Chương 4</span><h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">Vai Trò Lịch Sử<br className="hidden md:block" /> Của Chủ Nghĩa Tư Bản</h1><p className="text-blue-100/70 text-base md:text-lg leading-relaxed max-w-2xl mb-3">Bài trình bày tóm tắt hai mặt cơ bản của chủ nghĩa tư bản: những đóng góp tích cực đối với lực lượng sản xuất và những giới hạn phát triển bắt nguồn từ mâu thuẫn nội tại của nó.</p><p className="text-amber-300/80 text-sm md:text-base leading-relaxed max-w-2xl mb-6 italic border-l-2 border-amber-400/50 pl-3">Trọng tâm: CNTB không tồn tại vĩnh viễn; đến một trình độ nhất định, quan hệ sản xuất tư bản chủ nghĩa sẽ bị thay thế bởi hình thái kinh tế - xã hội tiến bộ hơn.</p></div></motion.div>

      <motion.section id="s1" className="scroll-mt-28" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><SectionHeading icon={Brain} color="bg-primary/10 text-primary" label="Phần 1" title="Tổng quan nội dung" /><div className="bg-surface border border-outline-variant rounded-3xl p-7 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center"><div className="bg-surface border border-outline-variant rounded-2xl p-3 flex flex-col items-center justify-center"><button className="rounded-xl overflow-hidden border border-outline-variant bg-transparent flex items-center justify-center group cursor-zoom-in max-w-[280px]" onClick={() => setActiveLightboxImg('/images/image21.png')}><img src="/images/image21.png" alt="Tổng quan vai trò lịch sử" className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" /></button></div><div className="lg:col-span-2 space-y-4"><h3 className="text-2xl font-bold text-primary flex items-center gap-2"><Brain className="w-6 h-6" /> Luận điểm chính</h3><p className="text-on-surface-variant text-base md:text-lg leading-relaxed">Khi nhìn dưới góc độ lịch sử, chủ nghĩa tư bản vừa là một bước tiến lớn của nhân loại, vừa là một hình thái kinh tế - xã hội chứa đựng nhiều mâu thuẫn bên trong.</p><p className="text-on-surface-variant text-base md:text-lg leading-relaxed">Ở mặt tích cực, nó thúc đẩy lực lượng sản xuất, mở rộng sản xuất lớn hiện đại và làm quá trình sản xuất ngày càng mang tính xã hội. Nhưng ở mặt giới hạn, mục tiêu lợi nhuận và quan hệ chiếm hữu tư nhân lại làm nảy sinh bất bình đẳng, xung đột và phân hóa giàu nghèo.</p></div></div></motion.section>

      <SectionBridge text="Trước hết, hãy nhìn vào ba đóng góp tích cực mà CNTB tạo ra trong tiến trình phát triển của sản xuất xã hội." />
      <motion.section id="s2" className="scroll-mt-28" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><SectionHeading icon={TrendingUp} color="bg-emerald-500/10 text-emerald-600" label="Phần 2" title="Vai trò tích cực của chủ nghĩa tư bản" /><div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-7 md:p-8 mb-8"><h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2"><Zap className="w-6 h-6" /> Ba ý chính cần nhớ</h3><p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-6">Chủ nghĩa tư bản thúc đẩy kỹ thuật - công nghệ, chuyển sản xuất nhỏ thành sản xuất lớn và làm cho quá trình sản xuất ngày càng mang tính xã hội rộng hơn, sâu hơn.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm"><div className="p-3 bg-surface rounded-xl border border-emerald-500/10 flex items-center gap-2 font-medium"><span className="text-emerald-500">→</span> Thúc đẩy lực lượng sản xuất</div><div className="p-3 bg-surface rounded-xl border border-emerald-500/10 flex items-center gap-2 font-medium"><span className="text-emerald-500">→</span> Phát triển sản xuất lớn hiện đại</div><div className="p-3 bg-surface rounded-xl border border-emerald-500/10 flex items-center gap-2 font-medium"><span className="text-emerald-500">→</span> Thực hiện xã hội hóa sản xuất</div></div></div><div className="space-y-4"><h4 className="text-lg font-bold uppercase tracking-wider text-outline mb-2">Phân tích 3 vai trò tích cực cốt lõi</h4>{POSITIVE_ROLES.map((item, idx) => <AccordionItem key={item.title} item={item} idx={idx} open={openPos} setOpen={setOpenPos} tone="emerald" onImageClick={setActiveLightboxImg} />)}</div></motion.section>

      <SectionBridge text="Bên cạnh vai trò tích cực, CNTB vẫn chứa những giới hạn phát triển xuất phát từ chính cơ sở kinh tế và mục đích lợi nhuận của nó." />
      <motion.section id="s3" className="scroll-mt-28" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><SectionHeading icon={Scale} color="bg-rose-500/10 text-rose-600" label="Phần 3" title="Những giới hạn phát triển của chủ nghĩa tư bản" /><div className="relative bg-gradient-to-br from-rose-950/40 via-[#121421] to-[#0a0a14] border border-rose-500/20 rounded-3xl p-8 mb-8 overflow-hidden"><div className="absolute top-4 left-6 text-rose-500/10 font-serif text-[120px] leading-none select-none pointer-events-none">"</div><div className="relative z-10"><span className="text-xs font-bold tracking-widest uppercase text-rose-400/80 mb-2 block">Nguyên nhân sâu xa</span><p className="text-lg md:text-xl font-medium text-white/95 leading-relaxed mb-4">Mâu thuẫn cơ bản của CNTB là mâu thuẫn giữa trình độ xã hội hóa ngày càng cao của lực lượng sản xuất với quan hệ sản xuất dựa trên chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất.</p><p className="text-rose-300/70 font-bold text-sm">Đây là điểm nối giữa các biểu hiện giới hạn cụ thể.</p></div></div><div className="space-y-4">{LIMITATIONS.map((item, idx) => <AccordionItem key={item.title} item={item} idx={idx} open={openLimit} setOpen={setOpenLimit} tone="rose" onImageClick={setActiveLightboxImg} extraContent={idx === 2 ? <div className="mx-5 mb-5 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl relative overflow-hidden"><div className="absolute top-2 right-4 text-red-500/5 font-serif text-[100px] leading-none select-none pointer-events-none">"</div><span className="text-xs font-bold tracking-widest uppercase text-red-500 dark:text-red-400 block mb-2">💬 Hộp 4.2. Tổng thống thứ 45 của Hoa Kỳ Donald J. Trump nói về bất bình đẳng tại Mỹ:</span><p className="text-sm text-on-surface-variant leading-relaxed italic mb-3">"Tôi rất quan ngại về con số 46,5 triệu người đang sống trong cảnh nghèo đói, và về việc đại đa số người Mỹ trung lưu khó lòng mua nổi căn nhà cho họ (hoặc đã mất nhà). Tôi rất quan ngại về những người không thể trả tiền học cho con cái họ. Nói ngắn gọn, tôi quan ngại cho những ai không thể tin tưởng vào giấc mơ Mỹ vì những chương trình tài chính của đất nước này quá thiên vị lợi ích của người giàu. Không ngạc nhiên khi sự căng thẳng trong xã hội chúng ta đang ở mức cao nhất chưa từng có."</p><p className="text-xs text-outline font-semibold text-right">— Nguồn: Donald J. Trump: Nước Mỹ nhìn từ bên trong, Nxb. Thế giới, Hà Nội, 2016, tr.106, 108</p></div> : undefined} />)}</div></motion.section>

      <SectionBridge text="Từ hai mặt tích cực và giới hạn, rút ra mâu thuẫn cơ bản và xu thế vận động của chủ nghĩa tư bản." />
      <motion.section id="s4" className="scroll-mt-28" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <SectionHeading icon={Compass} color="bg-violet-500/10 text-violet-600" label="Phần 4" title="IV. Kết luận & Xu thế vận động" />
        
        {/* Mâu thuẫn cơ bản */}
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-3xl p-6 md:p-8 mb-6 space-y-6">
          <h4 className="text-xl font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
            ⚡ Mâu thuẫn cơ bản của chủ nghĩa tư bản
          </h4>
          <p className="text-base text-on-surface leading-relaxed">
            Những hạn chế của chủ nghĩa tư bản bắt nguồn từ mâu thuẫn cơ bản: <strong>mâu thuẫn giữa trình độ xã hội hóa ngày càng cao của lực lượng sản xuất với quan hệ sản xuất dựa trên quan hệ chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất.</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-surface border border-outline-variant rounded-2xl border-l-4 border-l-emerald-500 space-y-3">
              <span className="text-xs font-bold text-emerald-500 tracking-wider uppercase block">Lực lượng sản xuất xã hội hóa</span>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Vì mục đích lợi nhuận, nhà tư bản cải tiến kỹ thuật, ứng dụng công nghệ hiện đại và hợp lý hóa sản xuất. Do đó, chủ nghĩa tư bản càng phát triển, trình độ xã hội hóa của lực lượng sản xuất ngày càng cao.
              </p>
            </div>
            <div className="p-5 bg-surface border border-outline-variant rounded-2xl border-l-4 border-l-rose-500 space-y-3">
              <span className="text-xs font-bold text-rose-500 tracking-wider uppercase block">Quan hệ sản xuất thích ứng hình thức</span>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Quan hệ sản xuất không ngừng điều chỉnh để mang tính xã hội hơn về hình thức (từ sở hữu cá nhân sang sở hữu tập thể và nhà nước), nhưng bản chất chiếm hữu tư nhân tư bản chủ nghĩa vẫn giữ nguyên.
              </p>
            </div>
          </div>
          
          <div className="p-5 bg-surface border border-outline-variant rounded-2xl text-sm text-on-surface-variant leading-relaxed">
            Những điều chỉnh trên giúp chủ nghĩa tư bản có sự thích ứng và phát triển nhất định. Mặc dù vậy, trong xã hội tư bản hiện đại, mâu thuẫn cơ bản này vẫn tồn tại và không thể tự giải quyết được.
          </div>
        </div>

        {/* Kết luận lịch sử */}
        <div className="bg-gradient-to-br from-[#1a1c2e] to-[#0a0a14] border border-violet-500/20 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-xl font-bold text-violet-300 flex items-center gap-2">
            🔄 Kết luận về xu thế tất yếu lịch sử
          </h3>
          <p className="text-sm text-violet-100/80 leading-relaxed">
            Do chủ nghĩa tư bản không tự giải quyết được mâu thuẫn cơ bản của mình, nên theo quy luật khách quan, quan hệ sản xuất tư bản chủ nghĩa tất yếu sẽ bị thay thế bằng một quan hệ sản xuất khác dựa trên sở hữu xã hội để tương thích với lực lượng sản xuất xã hội hóa cao.
          </p>
          <div className="border-t border-violet-500/20 pt-4">
            <p className="text-base text-violet-200 font-bold leading-relaxed">
              👉 Chủ nghĩa tư bản không tồn tại vĩnh viễn, mà phát triển đến một trình độ nhất định sẽ tất yếu bị thay thế bởi một hình thái kinh tế - xã hội mới tiến bộ hơn.
            </p>
          </div>
        </div>
      </motion.section>
    </main>

    <AnimatePresence>{activeLightboxImg && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveLightboxImg(null)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-8 cursor-zoom-out"><button onClick={() => setActiveLightboxImg(null)} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all border border-white/10" title="Đóng"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="relative max-w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}><img src={activeLightboxImg} alt="Phóng to hình ảnh" className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/10 shadow-2xl bg-black" /></motion.div></motion.div>}</AnimatePresence>
  </div>;
}