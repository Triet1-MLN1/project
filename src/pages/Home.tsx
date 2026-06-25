import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export const conceptData: Record<string, { title: string; explanation: string; realWorldExample: string; keyTakeaways: string[]; icon: string; color: string; colorValue: string; path: string; }> = {
  "vai-tro-tich-cuc": {
    icon: "bolt", color: "text-primary", colorValue: "var(--color-primary)",
    path: "/theory#s2",
    title: "Thúc đẩy Lực lượng sản xuất",
    explanation: "CNTB đóng vai trò lịch sử vĩ đại khi giải phóng sức sản xuất xã hội, thúc đẩy mạnh mẽ cuộc cách mạng công nghiệp và phát triển khoa học công nghệ vượt bậc.",
    realWorldExample: "Sự ra đời của động cơ hơi nước ở thế kỷ 18, máy tính ở thế kỷ 20, và nay là Trí tuệ nhân tạo (AI) đều phát triển nhảy vọt dưới động lực cạnh tranh khốc liệt của CNTB.",
    keyTakeaways: [
      "Ứng dụng nhanh chóng thành tựu khoa học kỹ thuật.",
      "Chuyển lao động thủ công sang tự động hóa và tin học."
    ]
  },
  "san-xuat-lon": {
    icon: "domain", color: "text-tertiary", colorValue: "var(--color-tertiary)",
    path: "/theory#s2",
    title: "Nền sản xuất lớn hiện đại",
    explanation: "CNTB xóa bỏ nền sản xuất nhỏ manh mún thời phong kiến, thiết lập nền sản xuất hàng hóa lớn có tổ chức, tích tụ và tập trung tư bản cao độ.",
    realWorldExample: "Thay thế các phường hội dệt thủ công gia đình nhỏ lẻ ngày xưa bằng hệ thống Siêu nhà máy (Gigafactories) sử dụng hàng nghìn robot tự động.",
    keyTakeaways: [
      "Mở rộng tối đa quy mô sản xuất và lưu thông hàng hóa.",
      "Tối ưu năng suất lao động và đa dạng hóa sản phẩm."
    ]
  },
  "xa-hoi-hoa": {
    icon: "groups", color: "text-error", colorValue: "var(--color-error)",
    path: "/theory#s2",
    title: "Xã hội hóa sản xuất",
    explanation: "Thúc đẩy phân công lao động xã hội, chuyên môn hóa sâu sắc và hợp tác lao động quốc tế, biến quá trình sản xuất thành sự liên kết của toàn thế giới.",
    realWorldExample: "Chuỗi cung ứng toàn cầu: Một chiếc xe hơi hiện đại có linh kiện sản xuất ở 30 quốc gia khác nhau và được lắp ráp tự động tại một quốc gia thứ 31.",
    keyTakeaways: [
      "Liên kết chặt chẽ các doanh nghiệp, ngành kinh tế và quốc gia.",
      "Phân công lao động diễn ra trên phạm vi toàn cầu."
    ]
  },
  "gioi-han": {
    icon: "trending_down", color: "text-secondary", colorValue: "var(--color-secondary)",
    path: "/theory#s3",
    title: "Những Giới hạn Lịch sử",
    explanation: "Mục đích sản xuất chỉ vì lợi ích của giai cấp tư sản (bóc lột thặng dư) và xu hướng độc quyền kìm hãm tự do cạnh tranh, cản trở tiến bộ xã hội.",
    realWorldExample: "Các tập đoàn dược lớn độc quyền nắm giữ bằng sáng chế thuốc đặc trị và bán với giá cực đắt để tối đa hóa lợi nhuận, bất chấp người nghèo không tiếp cận được.",
    keyTakeaways: [
      "Mâu thuẫn cơ bản giữa Lực lượng sản xuất xã hội hóa và Chế độ tư hữu tư bản.",
      "Hiện tượng bóc lột và khủng hoảng thừa chu kỳ."
    ]
  },
  "center": {
    icon: "balance", color: "text-primary", colorValue: "var(--color-primary)",
    path: "/theory#s1",
    title: "VAI TRÒ LỊCH SỬ CỦA CNTB",
    explanation: "Đánh giá biện chứng về CNTB: Ghi nhận vai trò tích cực cách mạng hóa sản xuất nhân loại, đồng thời chỉ ra tính chất tự phủ định tất yếu để chuyển sang hình thái cao hơn.",
    realWorldExample: "Mâu thuẫn kinh tế - xã hội tích tụ đòi hỏi một quan hệ sản xuất mới (công hữu) để giải phóng lực lượng sản xuất đã được xã hội hóa ở trình độ cực cao.",
    keyTakeaways: [
      "Chuẩn bị đầy đủ cơ sở vật chất kỹ thuật cho tương lai.",
      "Tạo ra giai cấp vô sản có sứ mệnh lịch sử kiến tạo xã hội mới."
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
              src="/home_hero_cyberpunk.png"
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
              src="/home_hero_cyberpunk.png"
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
            <motion.h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-headline font-bold leading-[1.1] tracking-tighter text-on-background mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-on-background/90"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  Vai Trò Lịch Sử Của
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="text-primary block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                >
                  Chủ Nghĩa Tư Bản
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl font-body text-on-surface-variant max-w-xl mb-10 leading-relaxed"
              variants={fadeInUp}
            >
              Phân tích biện chứng từ Triết học Mác-Lênin: Những đóng góp tích cực định hình văn minh công nghiệp hiện đại và những mâu thuẫn giới hạn lịch sử khách quan.
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
                <span className="relative z-10">Học Lý Thuyết Mới</span>
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-outline-variant text-on-surface font-bold tracking-wide backdrop-blur-md rounded-xl"
                onClick={() => navigate('/game')}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-surface-variant)' }}
                whileTap={{ scale: 0.95 }}
              >
                Chơi Đuổi Hình Bắt Chữ
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-bold">Cuộn xuống</span>
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
                  className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-surface-container-highest border-4 border-primary flex flex-col items-center justify-center p-6 text-center shadow-[0_0_40px_rgba(255,42,85,0.4)] group"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,42,85,0.6)' }}
                  onClick={() => setActiveNode('center')}
                >
                  <motion.span
                    className="material-symbols-outlined text-primary text-5xl mb-3"
                    animate={activeNode === 'center' ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 8, repeat: activeNode === 'center' ? Infinity : 0, ease: 'linear' }}
                  >
                    lan
                  </motion.span>
                  <span className="font-headline font-bold text-base md:text-lg leading-tight uppercase tracking-tight text-on-surface">
                    Vai Trò Lịch Sử<br/>CNTB
                  </span>
                </motion.button>
              </div>

              {/* Branch Nodes (Orbital Positions) */}
              {[
                { pos: 'top-[8%] left-1/2 -translate-x-1/2', icon: 'bolt', label: 'Tích Cực: Lực lượng sản xuất', hoverBg: 'hover:bg-primary-container', iconColor: 'text-primary', nodeKey: 'vai-tro-tich-cuc', delay: 0.4 },
                { pos: 'top-1/2 right-[5%] -translate-y-1/2', icon: 'domain', label: 'Sản xuất lớn hiện đại', hoverBg: 'hover:bg-tertiary-container', iconColor: 'text-tertiary', nodeKey: 'san-xuat-lon', delay: 0.6 },
                { pos: 'bottom-[8%] left-1/2 -translate-x-1/2', icon: 'groups', label: 'Xã hội hóa sản xuất', hoverBg: 'hover:bg-error-container', iconColor: 'text-error', nodeKey: 'xa-hoi-hoa', delay: 0.8 },
                { pos: 'top-1/2 left-[5%] -translate-y-1/2', icon: 'trending_down', label: 'Những Giới Hạn Lịch Sử', hoverBg: 'hover:bg-secondary-container', iconColor: 'text-secondary', nodeKey: 'gioi-han', delay: 1.0, isFeatured: true },
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
                      className={`material-symbols-outlined ${node.iconColor} group-hover:text-white mb-2 text-3xl`}
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
                      <h4 className="text-xs uppercase tracking-widest font-bold text-on-surface mb-2">Ví dụ thực tế</h4>
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
                    onClick={() => navigate(nodeData.path)}
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
              Phân tích toàn diện và khách quan các mặt của Chủ nghĩa tư bản dưới góc nhìn duy vật biện chứng.
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
              { icon: 'bolt', title: 'Tích cực: Phát triển Lực lượng sản xuất', subtitle: 'Phần 1', desc: 'Sự vĩ đại của CNTB trong việc thúc đẩy khoa học công nghệ và cách mạng công nghiệp.', tags: ['Khoa học', 'Công nghệ'], color: 'primary', path: '/theory#s2' },
              { icon: 'domain', title: 'Nền sản xuất lớn hiện đại', subtitle: 'Phần 2', desc: 'Xóa bỏ nền sản xuất nhỏ tự túc tự cấp, chuyển mình sang sản xuất hàng hóa lớn có tổ chức.', tags: ['Tích tụ', 'Quy mô'], color: 'tertiary', path: '/theory#s2' },
              { icon: 'groups', title: 'Thực hiện xã hội hóa sản xuất', subtitle: 'Phần 3', desc: 'Hợp tác phân công lao động sâu sắc trên toàn thế giới, thiết lập chuỗi giá trị toàn cầu.', tags: ['Hợp tác', 'Toàn cầu'], color: 'secondary', path: '/theory#s2' },
              { icon: 'trending_down', title: 'Mục đích bóc lột thặng dư', subtitle: 'Phần 4', desc: 'Bản chất giới hạn: Sản xuất vì lợi ích giai cấp tư sản, chiếm đoạt lao động thặng dư.', tags: ['Giá trị thặng dư', 'Bóc lột'], color: 'error', path: '/theory#s3' },
              { icon: 'landslide', title: 'Độc quyền kìm hãm xã hội', subtitle: 'Phần 5', desc: 'Sự xuất hiện các tổ chức độc quyền lớn chèn ép cạnh tranh và cản trở sự phát triển.', tags: ['Độc quyền', 'Thâu tóm'], color: 'primary', path: '/theory#s3' },
              { icon: 'quiz', title: 'Game Đuổi Hình Bắt Chữ', subtitle: 'Ôn tập', desc: 'Trò chơi tương tác ôn luyện các khái niệm cốt lõi của bài học.', tags: ['Game', 'Tương tác'], color: 'secondary', path: '/game' },
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
            TRIẾT HỌC LÀ SOIKÍNH HÀNH ĐỘNG
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-8 text-on-background leading-snug">
            <RevealText text={'"Sự phát triển của lực lượng sản xuất xã hội hóa cao độ là động lực tất yếu dẫn dắt loài người tiến tới một xã hội tốt đẹp hơn."'} />
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
            Sự tự phủ định của chủ nghĩa tư bản là tất yếu khách quan của lịch sử.
          </motion.p>
        </div>
      </section>
    </main>
  );
}
