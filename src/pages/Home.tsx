import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eosImg from '../public/eos.png';

/* ─── Floating Particle Component ─── */
function FloatingParticle({ delay, size, x, y, duration }: { delay: number; size: number; x: string; y: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/10 pointer-events-none"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  return (
    <motion.span
      className="block text-3xl font-headline font-bold text-primary"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {value}{suffix}
    </motion.span>
  );
}


/* ─── Stagger Container + Item variants ─── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

/* ─── Scroll-triggered text reveal per word ─── */
function RevealText({ text, className, highlightWords = [] }: { text: string; className?: string; highlightWords?: string[] }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.3em] ${highlightWords.includes(word) ? 'text-secondary' : ''}`}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export const conceptData: Record<string, { title: string; explanation: string; realWorldExample: string; keyTakeaways: string[]; icon: string; color: string; colorValue: string; }> = {
  "cnh-hdh": {
    icon: "precision_manufacturing", color: "text-primary", colorValue: "var(--color-primary)",
    title: "Công nghiệp hóa & Hiện đại hóa",
    explanation: "Quá trình chuyển đổi căn bản các hoạt động sản xuất từ sử dụng sức lao động thủ công sang sử dụng sức lao động cùng với công nghệ, phương tiện và phương pháp tiên tiến, hiện đại nhằm tạo ra năng suất lao động xã hội cao.",
    realWorldExample: "Việc chuyển đổi từ nông nghiệp truyền thống sang nông nghiệp công nghệ cao tại Lâm Đồng, sử dụng hệ thống tưới tự động và cảm biến IoT để kiểm soát chất lượng.",
    keyTakeaways: [
      "Thay thế lao động thủ công bằng máy móc hiện đại",
      "Ứng dụng thành tựu Cách mạng công nghiệp 4.0"
    ]
  },
  "hoi-nhap": {
    icon: "public", color: "text-tertiary", colorValue: "var(--color-tertiary)",
    title: "Hội nhập kinh tế quốc tế",
    explanation: "Quá trình quốc gia thực hiện gắn kết nền kinh tế của mình với nền kinh tế thế giới dựa trên sự chia sẻ lợi ích và tuân thủ các chuẩn mực quốc tế chung.",
    realWorldExample: "Việt Nam tham gia các hiệp định thương mại tự do thế hệ mới như EVFTA, CPTPP giúp mở cửa thị trường cho hàng nông sản và dệt may sang Châu Âu và Châu Mỹ.",
    keyTakeaways: [
      "Thực hiện theo các chuẩn mực quốc tế chung",
      "Mở rộng quan hệ sản xuất vượt biên giới"
    ]
  },
  "doc-lap": {
    icon: "shield_with_heart", color: "text-error", colorValue: "var(--color-error)",
    title: "Độc lập, Tự chủ",
    explanation: "Xây dựng nền kinh tế không bị lệ thuộc, chi phối bởi bên ngoài về đường lối phát triển. Đây là nền tảng để bảo đảm chủ quyền quốc gia trong quá trình hội nhập.",
    realWorldExample: "Việt Nam ưu tiên phát triển các tập đoàn công nghệ trong nước như Viettel, VinFast để tự chủ về hạ tầng viễn thông và công nghiệp phụ trợ.",
    keyTakeaways: [
      "Không bị chi phối bởi thế lực bên ngoài",
      "Kết hợp chặt chẽ kinh tế với Quốc phòng - An ninh"
    ]
  },
  "nang-luc": {
    icon: "trending_up", color: "text-secondary", colorValue: "var(--color-secondary)",
    title: "Năng lực cạnh tranh",
    explanation: "Yếu tố quyết định hiệu quả hội nhập. Bao gồm đổi mới công nghệ, nâng cao chất lượng nguồn nhân lực và hoàn thiện thể chế kinh tế thị trường.",
    realWorldExample: "Các doanh nghiệp FPT Software nâng cao trình độ kỹ sư AI và Cloud để cạnh tranh sòng phẳng với các đối thủ từ Ấn Độ và Trung Quốc trên thị trường toàn cầu.",
    keyTakeaways: [
      "Đổi mới công nghệ và quản trị doanh nghiệp",
      "Phát triển nguồn nhân lực chất lượng cao"
    ]
  },
  "center": {
    icon: "settings_suggest", color: "text-primary", colorValue: "var(--color-primary)",
    title: "CNH, HĐH & HỘI NHẬP",
    explanation: "Mối quan hệ biện chứng: CNH, HĐH tạo cơ sở vật chất cho hội nhập; ngược lại hội nhập tạo nguồn lực thúc đẩy CNH, HĐH diễn ra nhanh hơn.",
    realWorldExample: "Mô hình kinh tế Việt Nam: Đẩy mạnh xuất khẩu dựa trên nền tảng sản xuất hiện đại và thu hút vốn FDI.",
    keyTakeaways: [
      "Hội nhập là xu thế khách quan của thời đại",
      "Lực lượng sản xuất phát triển là cốt lõi"
    ]
  }
};

/* ────────────────────────────────────────────── */
/*                   HOME PAGE                    */
/* ────────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Dialectical progress bar animation
  const [dialectProgress, setDialectProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDialectProgress((p) => {
          if (p >= 33) { clearInterval(interval); return 33; }
          return p + 1;
        });
      }, 30);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mind map section hover state
  const [activeNode, setActiveNode] = useState<string>("cnh-hdh");
  const nodeData = conceptData[activeNode] || conceptData["cnh-hdh"];

  return (
    <main className="pt-16 overflow-hidden">

      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">

        {/* Floating Particles (ambient) */}
        <FloatingParticle delay={0} size={6} x="10%" y="20%" duration={8} />
        <FloatingParticle delay={1} size={4} x="80%" y="30%" duration={10} />
        <FloatingParticle delay={2} size={8} x="60%" y="70%" duration={7} />
        <FloatingParticle delay={0.5} size={5} x="30%" y="80%" duration={9} />
        <FloatingParticle delay={1.5} size={3} x="90%" y="60%" duration={11} />
        <FloatingParticle delay={3} size={7} x="20%" y="50%" duration={6} />
        <FloatingParticle delay={2.5} size={4} x="70%" y="15%" duration={8.5} />

        {/* Split Visual Background with Parallax */}
        <motion.div className="absolute inset-0 flex" style={{ y: bgY, scale: bgScale }}>
          <div className="w-1/2 h-full bg-surface-container-lowest relative overflow-hidden">
            <motion.img
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity"
              alt="Monochrome industrial machinery detail with harsh shadows and dramatic high contrast steel textures"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASEg_9zi7VGuvZyNSASjN8y0J-BDa9MHkg1lrMJz-NsSkRRw0HZQyBKKsTz-gyhLOPMlU9r16mm4qu7kG671rlCFgHllBrDKpX2q_auUlexQSEgwAUMsH2FWzxB6wwlZzieEkn5onp0UImsHvznHChENHX3_wIOcWogkhhFz8y-nXKmMNjhdnKbmDeQzhh_9Ugbm0wtwXjNGKWsXI7ydMU5nqX1btR23B_cm7ULLjoJv1MthVsCe6H4-hvo8IoG4uvI1_sUX7o9r36"
              referrerPolicy="no-referrer"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
          </div>
          <div className="w-1/2 h-full bg-secondary-container relative overflow-hidden">
            <motion.img
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              alt="Lush sun-drenched forest with vibrant green leaves and soft morning mist filtering through old growth trees"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmo_hmbm-dMpT9P7id-jVfSS8zsogVZ70dHpL2-QuofeDrzNIhXmKUBzTZyaryVdDAaD1p16ItLgwcwgWHIQyZJA_hHVwTaVP-gJ1sAB4UegnbWgx_VZXuXKIs-nw94JxoQ_UIlcMzNBqOi7YsHKW7yoSzTjxDEVVH5CpcYMwNFvyWPdmYRMZvsDxXGjZ2mNroKDeT3QlSRQ8yGKAVN0Sb1VpUHvqh9cweYfwsLpvdoy2FMOiAHYI5IUzFQGQn-r4nnsYM5ghfu_Ud"
              referrerPolicy="no-referrer"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background/80 z-10"></div>
          </div>
        </motion.div>

        {/* Hero Content with Stagger Animations */}
        <motion.div
          className="container mx-auto px-8 relative z-20"
          style={{ y: textY, opacity }}
        >
          <motion.div
            className="max-w-2xl lg:max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Animated Headline — smooth cinematic reveal */}
            <motion.h1
              className="text-[clamp(3rem,8vw,5.5rem)] font-headline font-bold leading-[0.9] tracking-tighter text-on-background mb-6"
            >
              {/* Line 1: "Tha hóa &" — slides up with fade */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3,
                  }}
                >
                  Công nghiệp hóa &amp;{' '}
                </motion.span>
              </span>
              {/* Line 2: "Giải phóng con người" — slides up with slight delay */}
              <span className="block overflow-hidden">
                <motion.span
                  className="text-primary block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.55,
                  }}
                >
                  Hội nhập kinh tế Quốc tế
                </motion.span>
              </span>
            </motion.h1>

            {/* Animated Description */}
            <motion.p
              className="text-xl md:text-2xl font-body text-on-surface-variant max-w-xl mb-10 leading-relaxed"
              variants={fadeInUp}
            >
              Phân tích lộ trình phát triển kinh tế Việt Nam dưới góc nhìn Kinh tế chính trị Mác – Lênin. Từ nền tảng sản xuất hiện đại đến hành trình vươn mình ra biển lớn toàn cầu.
            </motion.p>

            {/* Animated Buttons */}
            <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
              <motion.button
                className="px-8 py-4 bg-primary text-on-primary font-bold tracking-wide relative overflow-hidden group"
                onClick={() => navigate('/theory')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(45,90,39,0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Khám phá lý thuyết</span>
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-outline-variant text-on-surface font-bold tracking-wide backdrop-blur-md relative overflow-hidden"
                onClick={() => navigate('/game')}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-surface-bright)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Chơi ngay
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator Arrow */}
        <motion.div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-bold">Cuộn xuống</span>
            <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">expand_more</span>
          </motion.div>
        </motion.div>

        {/* Dialectical Indicator */}
        {/* <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full bg-surface-container-high/80 backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Tha hóa</span>
          <div className="w-32 h-1 bg-outline-variant rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${dialectProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">Giải phóng</span>
        </motion.div> */}
      </section>

      {/* ═══ THEORY MIND MAP SECTION ═══ */}
      <section className="py-24 bg-surface-container-lowest relative">
        <div className="container mx-auto px-8">
          <motion.div
            className="flex flex-col md:flex-row gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {/* Interactive Mind Map Canvas */}
            <motion.div
              className="w-full md:w-2/3 h-[700px] bg-surface-container relative rounded-lg border border-outline-variant/10 overflow-hidden shadow-2xl"
              variants={fadeInLeft}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface-bright/20 to-transparent opacity-50"></div>
              {/* Connecting Lines (SVG layer) — animated dash */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {[
                  { x2: '25%', y2: '25%', cls: 'text-primary' },
                  { x2: '75%', y2: '25%', cls: 'text-tertiary' },
                  { x2: '25%', y2: '75%', cls: 'text-error' },
                  { x2: '75%', y2: '75%', cls: 'text-secondary' },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    className={line.cls}
                    stroke="currentColor"
                    strokeWidth="1"
                    x1="50%"
                    y1="50%"
                    x2={line.x2}
                    y2={line.y2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
                  />
                ))}
              </svg>

              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.button
                  className="w-52 h-52 rounded-3xl bg-surface-container-highest border-2 border-primary flex flex-col items-center justify-center p-6 text-center shadow-[0_0_50px_rgba(45,90,39,0.2)] group"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(45,90,39,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveNode('center')}
                >
                  {/* Icon bánh răng kết nối - tượng trưng cho sự vận hành hệ thống */}
                  <motion.span
                    className="material-symbols-outlined text-primary text-5xl mb-3"
                    animate={activeNode === 'center' ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 4, repeat: activeNode === 'center' ? Infinity : 0, ease: 'linear' }}
                  >
                    settings_suggest
                  </motion.span>

                  <span className="font-headline font-bold text-lg leading-tight uppercase tracking-tight">
                    Mô hình phát triển <br /> Kinh tế Việt Nam
                  </span>

                  <div className="mt-2 px-3 py-1 bg-primary/10 rounded-full">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Trung tâm lý luận</span>
                  </div>
                </motion.button>
              </div>

              {/* Branch Nodes */}
              {[
                { pos: 'top-[20%] left-[20%]', icon: 'precision_manufacturing', label: 'CNH, HĐH hiện đại', hoverBg: 'hover:bg-primary-container', iconColor: 'text-primary', nodeKey: 'cnh-hdh', delay: 0.7 },
                { pos: 'top-[20%] right-[20%]', icon: 'language', label: 'Hội nhập toàn diện', hoverBg: 'hover:bg-tertiary-container', iconColor: 'text-tertiary', nodeKey: 'hoi-nhap', delay: 0.9 },
                { pos: 'bottom-[20%] left-[20%]', icon: 'policy', label: 'Độc lập và Tự chủ', hoverBg: 'hover:bg-error-container', iconColor: 'text-error', nodeKey: 'doc-lap', delay: 1.1 },
                { pos: 'bottom-[20%] right-[20%]', icon: 'rocket_launch', label: 'Năng lực cạnh tranh', hoverBg: 'hover:bg-secondary-container', iconColor: 'text-secondary', nodeKey: 'nang-luc', delay: 1.3, isFeatured: true },
              ].map((node) => (
                <div key={node.nodeKey} className={`absolute ${node.pos} z-20`}>
                  <motion.button
                    className={`w-40 h-40 rounded-full bg-surface-container-high border ${node.isFeatured ? 'border-2 border-secondary shadow-[0_0_30px_rgba(45,90,39,0.15)]' : 'border-outline-variant'} flex flex-col items-center justify-center p-4 text-center ${node.hoverBg} transition-all group ${activeNode === node.nodeKey ? 'ring-4 ring-primary/40 scale-105' : ''}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: node.delay }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveNode(node.nodeKey)}
                  >
                    <motion.span
                      className={`material-symbols-outlined ${node.iconColor} group-hover:text-white mb-2`}
                      style={node.isFeatured ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      animate={activeNode === node.nodeKey ? { y: [-2, 2, -2] } : { y: 0 }}
                      transition={{ duration: 1.5, repeat: activeNode === node.nodeKey ? Infinity : 0 }}
                    >
                      {node.icon}
                    </motion.span>
                    <span className={`font-headline ${node.isFeatured ? 'font-bold' : 'font-medium'} text-sm leading-tight`}>{node.label}</span>
                  </motion.button>
                </div>
              ))}

              {/* Navigation Hint */}
              <motion.div
                className="absolute bottom-6 left-6 text-on-surface-variant text-xs flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.8 }}
              >
                <motion.span
                  className="material-symbols-outlined text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  info
                </motion.span>{' '}
                Nhấp vào các nút để mở rộng kiến thức
              </motion.div>
            </motion.div>

            {/* Side Panel (Selected Node Data) */}
            <motion.div className="w-full md:w-1/3 h-[700px] flex flex-col justify-center gap-6" variants={fadeInRight}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  className="p-8 bg-surface-container-high border border-outline-variant/20 rounded-2xl shadow-xl w-full h-full flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.span
                      className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shadow-inner shrink-0"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <span className={`material-symbols-outlined ${nodeData.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{nodeData.icon}</span>
                    </motion.span>
                    <h3 className="text-2xl font-headline font-bold tracking-tight text-on-surface">{nodeData.title}</h3>
                  </div>

                  <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {/* Explanation */}
                    <div>
                      <h4 className={`text-xs uppercase tracking-widest font-bold mb-2 ${nodeData.color}`}>Explanation</h4>
                      <p className="text-on-surface-variant leading-relaxed text-base">
                        {nodeData.explanation}
                      </p>
                    </div>

                    {/* Real World Example */}
                    <div
                      className="p-5 bg-surface rounded-xl border-l-4 shadow-sm"
                      style={{ borderLeftColor: nodeData.colorValue }}
                    >
                      <h4 className="text-xs uppercase tracking-widest font-bold text-on-surface mb-2">Real-world Example</h4>
                      <p className="text-sm italic text-on-surface-variant leading-relaxed">
                        {nodeData.realWorldExample}
                      </p>
                    </div>

                    {/* Key Takeaways */}
                    <div className="bg-surface-container-highest p-5 rounded-xl border border-outline-variant/10">
                      <h4 className={`text-xs uppercase tracking-widest font-bold mb-4 ${nodeData.color}`}>Key Takeaway</h4>
                      <ul className="space-y-3 text-sm">
                        {nodeData.keyTakeaways.map((item, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className={`material-symbols-outlined text-[18px] shrink-0 ${nodeData.color}`}>check_circle</span>
                            <span className="text-on-surface-variant leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <motion.button
                    className="w-full mt-6 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest rounded-xl hover:shadow-lg transition-shadow active:scale-95"
                    onClick={() => navigate('/theory')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Xem chi tiết bài học
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ÔN TẬP LÝ THUYẾT SECTION ═══ */}
      <section className="py-28 bg-surface-container-lowest relative overflow-hidden" id="theory-review">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Floating accent blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4" variants={fadeInUp}>
              <motion.span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                menu_book
              </motion.span>
              <span className="text-primary font-headline font-bold text-sm tracking-[0.3em] uppercase">Hệ thống kiến thức</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-4 text-on-background"
              variants={fadeInUp}
            >
              Hệ thống Kinh tế chính trị
            </motion.h2>
            <motion.p
              className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Nắm vững các quy luật giá trị, bản chất của thặng dư và lộ trình Công nghiệp hóa – Hội nhập của Việt Nam.
              Học tập chủ động để chinh phục kỳ thi EOS MLN122.
            </motion.p>
          </motion.div>

          {/* Chapter Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {// Thay thế mảng chapter trong Chapter Cards Grid:
              [
                {
                  icon: 'shopping_cart',
                  title: 'Hàng hóa, Thị trường & Vai trò các chủ thể',
                  subtitle: 'Chương 2',
                  desc: 'Lý luận về giá trị hàng hóa, tiền tệ và mối quan hệ giữa người sản xuất với người tiêu dùng.',
                  tags: ['Giá trị', 'Tiền tệ', 'Quy luật giá trị'],
                  color: 'primary',
                  progress: 100,
                },
                {
                  icon: 'paid',
                  title: 'Giá trị thặng dư trong nền kinh tế thị trường',
                  subtitle: 'Chương 3',
                  desc: 'Bản chất của thặng dư, tiền công và các hình thức biểu hiện của giá trị thặng dư.',
                  tags: ['Sức lao động', 'Lợi nhuận', 'Tư bản'],
                  color: 'tertiary',
                  progress: 90,
                },
                {
                  icon: 'account_balance',
                  title: 'Cạnh tranh và Độc quyền',
                  subtitle: 'Chương 4',
                  desc: 'Sự hình thành độc quyền và độc quyền nhà nước trong nền kinh tế thị trường tư bản chủ nghĩa.',
                  tags: ['Lợi nhuận độc quyền', 'Giá cả độc quyền'],
                  color: 'secondary',
                  progress: 75,
                },
                {
                  icon: 'hub',
                  title: 'Kinh tế thị trường định hướng XHCN',
                  subtitle: 'Chương 5',
                  desc: 'Đặc trưng, cấu trúc thể chế và quan hệ lợi ích kinh tế tại Việt Nam.',
                  tags: ['Thể chế', 'Lợi ích kinh tế', 'Phân phối'],
                  color: 'error',
                  progress: 80,
                },
                {
                  icon: 'factory',
                  title: 'CNH, HĐH & Hội nhập kinh tế (Trọng tâm)',
                  subtitle: 'Chương 6',
                  desc: 'Nội dung bài thuyết trình: Tính tất yếu, nội dung và các giải pháp nâng cao hiệu quả hội nhập.',
                  tags: ['CMCN 4.0', 'Kinh tế tri thức'],
                  color: 'primary',
                  progress: 100,
                },
                {
                  icon: 'analytics',
                  title: 'Tổng ôn thi cuối kỳ MLN122',
                  subtitle: 'EOS',
                  desc: 'Hệ thống câu hỏi ôn tập tổng hợp toàn bộ chương trình Kinh tế chính trị.',
                  tags: ['Luyện thi', 'EOS'],
                  color: 'secondary',
                  progress: 50,
                },
              ].map((chapter, i) => (
                <motion.div
                  key={i}
                  className="group relative bg-surface-container-high border border-outline-variant/10 rounded-2xl p-6 cursor-pointer overflow-hidden"
                  variants={scaleIn}
                  whileHover={{ y: -8, boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${chapter.color === 'primary' ? 'from-primary/5 to-transparent'
                      : chapter.color === 'secondary' ? 'from-secondary/5 to-transparent'
                        : chapter.color === 'tertiary' ? 'from-tertiary/5 to-transparent'
                          : 'from-error/5 to-transparent'
                      }`}
                  />

                  <div className="relative z-10">
                    {/* Top row: icon + subtitle */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${chapter.color === 'primary' ? 'bg-primary-container'
                          : chapter.color === 'secondary' ? 'bg-secondary-container'
                            : chapter.color === 'tertiary' ? 'bg-tertiary-container'
                              : 'bg-error-container'
                          }`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <span
                          className={`material-symbols-outlined text-2xl ${chapter.color === 'primary' ? 'text-primary'
                            : chapter.color === 'secondary' ? 'text-on-secondary-container'
                              : chapter.color === 'tertiary' ? 'text-tertiary'
                                : 'text-error'
                            }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {chapter.icon}
                        </span>
                      </motion.div>
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
                        {chapter.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-headline font-bold tracking-tight mb-2 text-on-surface group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                      {chapter.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {chapter.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-surface-container border border-outline-variant/20 text-on-surface-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                        <span className="text-on-surface-variant/60">Tiến độ ôn tập</span>
                        <span className={
                          chapter.color === 'primary' ? 'text-primary'
                            : chapter.color === 'secondary' ? 'text-secondary'
                              : chapter.color === 'tertiary' ? 'text-tertiary'
                                : 'text-error'
                        }>{chapter.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${chapter.color === 'primary' ? 'bg-primary'
                            : chapter.color === 'secondary' ? 'bg-secondary'
                              : chapter.color === 'tertiary' ? 'bg-tertiary'
                                : 'bg-error'
                            }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${chapter.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Arrow CTA */}
                    <motion.div
                      className="mt-5 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span>Bắt đầu ôn tập</span>
                      <motion.span
                        className="material-symbols-outlined text-lg"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        arrow_forward
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="px-10 py-4 bg-primary text-on-primary font-bold tracking-wide text-lg relative overflow-hidden group"
              onClick={() => navigate('/theory')}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(45,90,39,0.25)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/15"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined">school</span>
                Xem tất cả chuyên đề
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRẢI NGHIỆM THI THỬ EOS SECTION ═══ */}
      <section className="py-28 bg-gradient-to-b from-surface-container-lowest via-surface-container to-surface-container-high relative overflow-hidden" id="mock-exam">
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 border border-primary/10 rounded-3xl -rotate-12 pointer-events-none"
          animate={{ rotate: [-12, -8, -12], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-48 h-48 border border-secondary/10 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-tertiary/5 rounded-2xl rotate-45 pointer-events-none blur-sm"
          animate={{ rotate: [45, 55, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">

            {/* Left: Info Content */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              <motion.div className="flex items-center gap-3 mb-4" variants={fadeInUp}>
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full bg-error-container text-on-error-container border border-error/20">
                  Mới
                </span>
                <span className="text-on-surface-variant text-sm font-medium">Cập nhật 2026</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-6 text-on-background leading-[1.1]"
                variants={fadeInUp}
              >
                Trải nghiệm{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">thi thử EOS</span>
                  <motion.span
                    className="absolute bottom-1 left-0 w-full h-3 bg-secondary/20 -z-0 rounded"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </motion.h2>

              <motion.p
                className="text-lg text-on-surface-variant leading-relaxed mb-8"
                variants={fadeInUp}
              >
                Mô phỏng chính xác cấu trúc đề thi cuối kỳ (EOS) với ngân hàng <strong className="text-on-surface">500+ câu hỏi</strong> trắc nghiệm được biên soạn theo chuẩn đề thi thật. Luyện tập không giới hạn, nhận phản hồi tức thì.
              </motion.p>

              {/* Feature List */}
              <motion.div className="space-y-4 mb-10" variants={staggerContainer}>
                {[
                  { icon: 'timer', text: 'Giới hạn thời gian như đề thi thật (60 phút / 60 câu)', color: 'text-primary' },
                  { icon: 'analytics', text: 'Phân tích kết quả chi tiết theo từng chuyên đề', color: 'text-tertiary' },
                  { icon: 'lightbulb', text: 'Giải thích đáp án đầy đủ & trích dẫn tài liệu', color: 'text-secondary' },
                  { icon: 'trending_up', text: 'Theo dõi tiến trình & xếp hạng trên bảng xếp hạng', color: 'text-error' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/10 group hover:bg-surface-container-high transition-colors"
                    variants={fadeInUp}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <motion.span
                      className={`material-symbols-outlined text-xl ${feature.color} mt-0.5`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      whileHover={{ rotate: 15, scale: 1.2 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <span className="text-sm text-on-surface font-medium leading-relaxed">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
                <motion.button
                  className="px-8 py-4 bg-primary text-on-primary font-bold tracking-wide text-base relative overflow-hidden group"
                  onClick={() => navigate('/quiz')}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(45,90,39,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Thi thử ngay
                  </span>
                </motion.button>
                <motion.button
                  className="px-8 py-4 border border-outline-variant text-on-surface font-bold tracking-wide backdrop-blur-md"
                  onClick={() => navigate('/quiz')}
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--color-surface-bright)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  Xem đề mẫu
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: EOS Exam Image */}
            <motion.div
              className="w-full lg:w-1/2 flex items-center justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInRight}
            >
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20"
                whileHover={{ y: -8, boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Glassmorphism glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-2xl pointer-events-none" />
                <motion.img
                  src={eosImg}
                  alt="Đề thi thử EOS – MLN122"
                  className="relative z-10 w-full h-auto object-cover rounded-3xl"
                  initial={{ scale: 1.05, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Scrolling feature marquee */}
          <motion.div
            className="mt-16 overflow-hidden relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-container to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-container to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex gap-6">
                  {[
                    '⏱️ Thi giới hạn thời gian',
                    '📊 Phân tích kết quả chi tiết',
                    '💡 Giải thích đáp án',
                    '📚 Ngân hàng 500+ câu hỏi',
                    '🎯 Theo dõi tiến trình',
                    '🔄 Luyện tập không giới hạn',
                    '📝 Mô phỏng đề thi thật',
                  ].map((item, i) => (
                    <span
                      key={`${setIdx}-${i}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high/60 border border-outline-variant/10 text-sm font-medium text-on-surface-variant"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MANIFESTO / TRANSITION SECTION ═══ */}
      <section className="py-24 bg-gradient-to-b from-surface-container-lowest to-secondary-container/10 relative overflow-hidden">
        {/* Decorative animated lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="container mx-auto px-8 text-center max-w-4xl">
          <motion.span
            className="text-secondary font-headline font-bold text-sm tracking-[0.3em] uppercase mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            TỪ LÝ LUẬN ĐẾN THỰC TIỄN KINH TẾ
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-8 text-on-background">
            <RevealText text={'"Sản xuất ra giá trị thặng dư là quy luật kinh tế tuyệt đối của phương thức sản xuất tư bản chủ nghĩa."'} />
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto mb-10"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p
            className="text-xl text-on-surface-variant font-light leading-relaxed italic"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Chúng ta đang xây dựng các công cụ để thấu hiểu sự vận hành của dòng chảy giá trị toàn cầu.
            Hãy cùng phân tích lộ trình CNH, HĐH để xây dựng một nền kinh tế Việt Nam độc lập, tự chủ và hùng cường.
          </motion.p>
        </div>
      </section>
    </main>
  );
}
