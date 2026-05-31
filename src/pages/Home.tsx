import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eosImg from '../public/eos.png';

/* ─── Floating Particle Component ─── */
function FloatingParticle({ delay, size, x, y, duration }: { delay: number; size: number; x: string; y: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20 pointer-events-none"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -40, 0, 30, 0],
        x: [0, 20, -15, 10, 0],
        opacity: [0.3, 0.6, 0.4, 0.8, 0.3],
        scale: [1, 1.3, 0.9, 1.2, 1],
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
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
  "ton-tai": {
    icon: "location_city", color: "text-primary", colorValue: "var(--color-primary)",
    title: "Tồn tại xã hội",
    explanation: "Là toàn bộ sinh hoạt vật chất và những điều kiện sinh hoạt vật chất của xã hội. Bao gồm: Điều kiện tự nhiên, dân số, và quan trọng nhất là phương thức sản xuất.",
    realWorldExample: "Sinh viên mỗi tháng chỉ có 2 triệu đồng tiền tiêu vặt. 'Tồn tại xã hội' lúc đó là ăn mì tôm, săn sale, đi xe buýt. Mục tiêu duy nhất là 'sống sót qua tháng'.",
    keyTakeaways: [
      "Là cái 'thực tế phũ phàng' bên ngoài.",
      "Phương thức sản xuất đóng vai trò quyết định."
    ]
  },
  "y-thuc": {
    icon: "psychology", color: "text-tertiary", colorValue: "var(--color-tertiary)",
    title: "Ý thức xã hội",
    explanation: "Là mặt tinh thần của đời sống xã hội, bao gồm toàn bộ những quan điểm, tư tưởng, tình cảm, tâm trạng nảy sinh từ tồn tại xã hội.",
    realWorldExample: "Từ môi trường sống khó khăn (tồn tại xã hội), sinh viên nảy sinh tâm lý tiết kiệm, hay lo âu (ý thức xã hội).",
    keyTakeaways: [
      "Là thế giới tinh thần bên trong.",
      "Chia làm Tâm lý xã hội (nông) và Hệ tư tưởng (sâu)."
    ]
  },
  "doc-lap": {
    icon: "update", color: "text-error", colorValue: "var(--color-error)",
    title: "Tính độc lập tương đối",
    explanation: "Ý thức xã hội không thụ động mà có tính độc lập. Có thể tụt hậu (đi chậm), hoặc vượt trước (dự báo tương lai) so với tồn tại xã hội.",
    realWorldExample: "Phụ nữ hiện đại kiếm tiền giỏi (vật chất thay đổi) nhưng tư tưởng 'trọng nam khinh nữ' (ý thức tụt hậu) vẫn còn tồn tại ở nhiều gia đình.",
    keyTakeaways: [
      "Ý thức thường lạc hậu hơn tồn tại xã hội.",
      "Ý thức khoa học có thể vượt trước thời đại."
    ]
  },
  "thuc-tien": {
    icon: "bolt", color: "text-secondary", colorValue: "var(--color-secondary)",
    title: "Tác động thực tiễn",
    explanation: "Ý thức xã hội có khả năng tác động ngược trở lại tồn tại xã hội. Tư tưởng tiến bộ thúc đẩy phát triển, tư tưởng lạc hậu kìm hãm xã hội.",
    realWorldExample: "Từ việc cam chịu sống với 2 triệu/tháng, sinh viên nảy sinh tư tưởng 'phải khởi nghiệp'. Suy nghĩ đó biến thành hành động, thay đổi hoàn toàn hoàn cảnh sống.",
    keyTakeaways: [
      "Tinh thần có thể cải tạo vật chất.",
      "Đường lối Đổi mới 1986 là minh chứng rõ rệt nhất."
    ]
  },
  "center": {
    icon: "balance", color: "text-primary", colorValue: "var(--color-primary)",
    title: "MỐI QUAN HỆ BIỆN CHỨNG",
    explanation: "Tồn tại xã hội quyết định ý thức xã hội. Đời sống vật chất thay đổi thì tư tưởng thay đổi. Nhưng ý thức xã hội cũng tác động mạnh mẽ trở lại đời sống vật chất.",
    realWorldExample: "Trào lưu 'chữa lành' là sản phẩm của một xã hội hiện đại nhiều áp lực (tồn tại xã hội tạo ra ý thức). Nếu quá lạm dụng, nó trở thành ảo tưởng tách rời thực tiễn.",
    keyTakeaways: [
      "Vật chất quyết định tinh thần.",
      "Tinh thần có tính độc lập và tác động ngược lại."
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

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeNode, setActiveNode] = useState<string>("center");
  const nodeData = conceptData[activeNode] || conceptData["center"];

  return (
    <main className="pt-16 overflow-hidden">

      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden bg-background">
        <FloatingParticle delay={0} size={6} x="10%" y="20%" duration={8} />
        <FloatingParticle delay={1} size={4} x="80%" y="30%" duration={10} />
        <FloatingParticle delay={2} size={8} x="60%" y="70%" duration={7} />
        <FloatingParticle delay={0.5} size={5} x="30%" y="80%" duration={9} />
        <FloatingParticle delay={1.5} size={3} x="90%" y="60%" duration={11} />
        
        <motion.div className="absolute inset-0 flex" style={{ y: bgY, scale: bgScale }}>
          <div className="w-1/2 h-full bg-surface-container-lowest relative overflow-hidden">
            <motion.img
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt="Cyberpunk Urban abstract"
              src="/src/public/home_hero_cyberpunk.png"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
          </div>
          <div className="w-1/2 h-full bg-primary/5 relative overflow-hidden">
            <motion.img
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              alt="Cyberpunk consciousness"
              src="/src/public/home_hero_cyberpunk.png"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background/80 z-10"></div>
          </div>
        </motion.div>

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
            <motion.h1 className="text-[clamp(3rem,7vw,5rem)] font-headline font-bold leading-[1.1] tracking-tighter text-on-background mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  Tồn tại xã hội &amp;{' '}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="text-primary block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                >
                  Ý thức xã hội
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-body text-on-surface-variant max-w-xl mb-10 leading-relaxed"
              variants={fadeInUp}
            >
              Quy luật cốt lõi của Chủ nghĩa duy vật lịch sử. Từ đời sống vật chất phũ phàng đến thế giới tinh thần phức tạp, và giải mã trào lưu "chữa lành" hiện đại.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
              <motion.button
                className="px-8 py-4 bg-primary text-on-primary font-bold tracking-wide relative overflow-hidden group rounded-xl"
                onClick={() => navigate('/theory')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(74, 20, 140, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Khám phá bài học</span>
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-outline-variant text-on-surface font-bold tracking-wide backdrop-blur-md rounded-xl"
                onClick={() => navigate('/game')}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-surface-variant)' }}
                whileTap={{ scale: 0.95 }}
              >
                Chơi Game Ôn Tập
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-bold">Khám phá</span>
            <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">expand_more</span>
          </motion.div>
        </motion.div>
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
            <motion.div
              className="w-full md:w-2/3 h-[700px] bg-surface-container relative rounded-2xl border border-outline-variant/20 overflow-hidden shadow-2xl flex items-center justify-center"
              variants={fadeInLeft}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-60"></div>
              
              {/* Rotating Orbital Rings */}
              <motion.div
                className="absolute w-[80%] h-[80%] md:w-[65%] md:h-[65%] rounded-full border-2 border-primary/20 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[60%] h-[60%] md:w-[45%] md:h-[45%] rounded-full border border-tertiary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[95%] h-[95%] md:w-[85%] md:h-[85%] rounded-full border border-error/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />

              {/* Central Node */}
              <div className="absolute z-30">
                <motion.button
                  className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-surface-container-highest border-4 border-primary flex flex-col items-center justify-center p-6 text-center shadow-[0_0_40px_rgba(255,42,85,0.4)] group glitch-effect"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,42,85,0.6)' }}
                  onClick={() => setActiveNode('center')}
                >
                  <motion.span
                    className="material-symbols-outlined text-primary text-5xl mb-3 glitch-effect"
                    animate={activeNode === 'center' ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 8, repeat: activeNode === 'center' ? Infinity : 0, ease: 'linear' }}
                  >
                    science
                  </motion.span>
                  <span className="font-headline font-bold text-base md:text-lg leading-tight uppercase tracking-tight text-on-surface">
                    Biện chứng<br/>Triết học
                  </span>
                </motion.button>
              </div>

              {/* Branch Nodes (Orbital Positions) */}
              {[
                { pos: 'top-[8%] left-1/2 -translate-x-1/2', icon: 'location_city', label: 'Tồn tại xã hội', hoverBg: 'hover:bg-primary-container', iconColor: 'text-primary', nodeKey: 'ton-tai', delay: 0.4 },
                { pos: 'top-1/2 right-[5%] -translate-y-1/2', icon: 'psychology', label: 'Ý thức xã hội', hoverBg: 'hover:bg-tertiary-container', iconColor: 'text-tertiary', nodeKey: 'y-thuc', delay: 0.6 },
                { pos: 'bottom-[8%] left-1/2 -translate-x-1/2', icon: 'update', label: 'Độc lập tương đối', hoverBg: 'hover:bg-error-container', iconColor: 'text-error', nodeKey: 'doc-lap', delay: 0.8 },
                { pos: 'top-1/2 left-[5%] -translate-y-1/2', icon: 'bolt', label: 'Tác động thực tiễn', hoverBg: 'hover:bg-secondary-container', iconColor: 'text-secondary', nodeKey: 'thuc-tien', delay: 1.0, isFeatured: true },
              ].map((node) => (
                <div key={node.nodeKey} className={`absolute ${node.pos} z-20`}>
                  <motion.button
                    className={`w-32 h-32 md:w-36 md:h-36 rounded-full bg-surface-container-high border ${node.isFeatured ? 'border-2 border-secondary shadow-[0_0_30px_rgba(252,226,5,0.3)]' : 'border-outline-variant'} flex flex-col items-center justify-center p-3 text-center ${node.hoverBg} transition-all group ${activeNode === node.nodeKey ? 'ring-4 ring-primary/60 scale-105' : ''}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: node.delay }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    onClick={() => setActiveNode(node.nodeKey)}
                  >
                    <motion.span
                      className={`material-symbols-outlined ${node.iconColor} group-hover:text-white mb-2 text-3xl glitch-effect`}
                      style={node.isFeatured ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      animate={activeNode === node.nodeKey ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 1.5, repeat: activeNode === node.nodeKey ? Infinity : 0 }}
                    >
                      {node.icon}
                    </motion.span>
                    <span className={`font-headline ${node.isFeatured ? 'font-bold' : 'font-medium'} text-xs md:text-sm text-on-surface leading-tight`}>{node.label}</span>
                  </motion.button>
                </div>
              ))}
            </motion.div>

            {/* Side Panel (Selected Node Data) */}
            <motion.div className="w-full md:w-1/3 h-[700px] flex flex-col justify-center" variants={fadeInRight}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  className="p-8 bg-surface-container-high border border-outline-variant/20 rounded-3xl shadow-xl w-full h-full flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.span
                      className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center shadow-inner shrink-0"
                      whileHover={{ rotate: 10, scale: 1.05 }}
                    >
                      <span className={`material-symbols-outlined text-3xl ${nodeData.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{nodeData.icon}</span>
                    </motion.span>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{nodeData.title}</h3>
                  </div>

                  <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <div>
                      <h4 className={`text-xs uppercase tracking-widest font-bold mb-2 ${nodeData.color}`}>Lý luận cốt lõi</h4>
                      <p className="text-on-surface-variant leading-relaxed text-base">
                        {nodeData.explanation}
                      </p>
                    </div>

                    <div
                      className="p-5 bg-surface rounded-2xl border-l-4 shadow-sm"
                      style={{ borderLeftColor: nodeData.colorValue }}
                    >
                      <h4 className="text-xs uppercase tracking-widest font-bold text-on-surface mb-2">Ví dụ thực tiễn</h4>
                      <p className="text-sm italic text-on-surface-variant leading-relaxed">
                        {nodeData.realWorldExample}
                      </p>
                    </div>

                    <div className="bg-surface-container-highest p-5 rounded-2xl border border-outline-variant/10">
                      <h4 className={`text-xs uppercase tracking-widest font-bold mb-4 ${nodeData.color}`}>Đúc kết</h4>
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
                    className="w-full mt-6 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest rounded-xl hover:shadow-lg transition-shadow"
                    onClick={() => navigate('/theory')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Học chi tiết
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ÔN TẬP LÝ THUYẾT SECTION ═══ */}
      <section className="py-28 bg-surface-container-lowest relative overflow-hidden" id="theory-review">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4" variants={fadeInUp}>
              <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
              <span className="text-primary font-headline font-bold text-sm tracking-[0.3em] uppercase">Hệ thống kiến thức</span>
            </motion.div>
            <motion.h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-4 text-on-background" variants={fadeInUp}>
              Cấu trúc Bài giảng
            </motion.h2>
            <motion.p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed" variants={fadeInUp}>
              Đi từ những lý luận nền tảng nhất của Các Mác đến việc áp dụng giải quyết các tình huống thực tiễn hiện đại.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {[
              { icon: 'domain', title: 'Tồn tại xã hội', subtitle: 'Phần 1', desc: 'Thực tế phũ phàng: Điều kiện tự nhiên, dân số và phương thức sản xuất vật chất.', tags: ['Vật chất', 'Khách quan'], color: 'primary', path: '/theory#s1' },
              { icon: 'psychology_alt', title: 'Ý thức xã hội', subtitle: 'Phần 2', desc: 'Thế giới tinh thần bên trong: Tâm lý xã hội và hệ tư tưởng giai cấp.', tags: ['Tinh thần', 'Tâm lý'], color: 'tertiary', path: '/theory#s1' },
              { icon: 'handshake', title: 'Mối quan hệ biện chứng', subtitle: 'Phần 3', desc: 'Sự tác động qua lại: Vật chất quyết định tinh thần, nhưng tinh thần có tính độc lập tương đối.', tags: ['Quyết định', 'Tác động'], color: 'secondary', path: '/theory#s2' },
              { icon: 'compass_calibration', title: 'Ý nghĩa Phương pháp luận', subtitle: 'Phần 4', desc: 'Vận dụng triết học: Cải tạo xã hội từ gốc rễ và chú trọng giáo dục tư tưởng hiện đại.', tags: ['Thực tiễn', 'Nhận thức'], color: 'primary', path: '/theory#s3' },
              { icon: 'self_improvement', title: 'Giải mã trào lưu "Chữa lành"', subtitle: 'Tình huống', desc: 'Phân tích trào lưu chữa lành dưới góc độ triết học: thuốc phiện tinh thần hay giải pháp?', tags: ['Thực tiễn', 'Phản biện'], color: 'error', path: '/theory#s4' },
              { icon: 'quiz', title: 'Luyện tập Trắc nghiệm', subtitle: 'Ôn tập', desc: 'Hệ thống câu hỏi trắc nghiệm kiểm tra độ hiểu sâu của bài học.', tags: ['Quiz', 'Test'], color: 'secondary', path: '/quiz' },
            ].map((chapter, i) => (
              <motion.div
                key={i}
                className="group relative bg-surface-container-high border border-outline-variant/10 rounded-2xl p-6 cursor-pointer overflow-hidden"
                variants={scaleIn}
                whileHover={{ y: -8, boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
                onClick={() => navigate(chapter.path)}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${chapter.color}-container`}>
                      <span className={`material-symbols-outlined text-2xl text-${chapter.color === 'secondary' ? 'on-secondary-container' : chapter.color}`}>{chapter.icon}</span>
                    </motion.div>
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">{chapter.subtitle}</span>
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">{chapter.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-4">{chapter.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {chapter.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 text-[11px] font-bold uppercase rounded-full bg-surface-container border border-outline-variant/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ MANIFESTO / TRANSITION SECTION ═══ */}
      <section className="py-24 bg-gradient-to-b from-surface-container-lowest to-secondary-container/10 relative overflow-hidden">
        <div className="container mx-auto px-8 text-center max-w-4xl">
          <motion.span
            className="text-secondary font-headline font-bold text-sm tracking-[0.3em] uppercase mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            TRIẾT HỌC KHÔNG CHỈ LÀ LÝ THUYẾT
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-8 text-on-background leading-snug">
            <RevealText text={'"Vật chất quyết định tinh thần, nhưng một tinh thần tiến bộ sẽ cải tạo lại thế giới vật chất."'} />
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto mb-10"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-on-surface-variant font-light leading-relaxed italic"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Đừng chỉ thay đổi suy nghĩ, hãy thay đổi môi trường sống của bạn trước.
          </motion.p>
        </div>
      </section>
    </main>
  );
}
