import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Target,
  Flame,
  ShieldCheck,
  Presentation,
  Users,
  Building2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Trophy,
  Quote,
  GraduationCap
} from 'lucide-react';

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
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export const conceptData: Record<
  string,
  {
    title: string;
    explanation: string;
    realWorldExample: string;
    keyTakeaways: string[];
    icon: any;
    color: string;
    colorValue: string;
    path: string;
  }
> = {
  "chinh-tri": {
    icon: Users,
    color: "text-red-500",
    colorValue: "#ef4444",
    path: "/theory#s2",
    title: "Mục tiêu Chính trị: Dân chủ & Dân làm chủ",
    explanation: "Hồ Chí Minh khẳng định: 'Chế độ ta là chế độ dân chủ. Tức là nhân dân làm chủ. Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ.' Toàn bộ quyền bính và lực lượng đều thuộc về nhân dân.",
    realWorldExample: "Kế thừa tư tưởng danh nhân Nguyễn Trãi: 'Đẩy thuyền cũng là dân, lật thuyền cũng là dân' và phát triển thành nguyên tắc Nhà nước của dân, do dân, vì dân.",
    keyTakeaways: [
      "Quyền lực thuộc về tuyệt đại đa số nhân dân lao động.",
      "Lấy dân làm gốc là bài học cốt lõi của mọi thắng lợi cách mạng."
    ]
  },
  "kinh-te": {
    icon: Building2,
    color: "text-amber-500",
    colorValue: "#f59e0b",
    path: "/theory#s2",
    title: "Mục tiêu Kinh tế: Công - Nông hiện đại & KHKT",
    explanation: "Xây dựng nền kinh tế phát triển cao với công nghiệp và nông nghiệp hiện đại, khoa học kỹ thuật tiên tiến, dựa trên chế độ sở hữu toàn dân và sở hữu tập thể.",
    realWorldExample: "Kinh tế quốc doanh giữ vai trò chủ đạo định hướng nền kinh tế, kết hợp với phong trào hợp tác xã nông nghiệp và hiện đại hóa chuỗi sản xuất.",
    keyTakeaways: [
      "Kinh tế quốc doanh (toàn dân) giữ vai trò chủ đạo.",
      "Kinh tế hợp tác xã (tập thể) được Nhà nước ưu tiên khuyến khích."
    ]
  },
  "van-hoa-xa-hoi": {
    icon: Sparkles,
    color: "text-emerald-500",
    colorValue: "#10b981",
    path: "/theory#s2",
    title: "Văn hóa XHCN & Xã hội Công bằng",
    explanation: "Văn hóa mang nội dung xã hội chủ nghĩa và hình thức dân tộc. Mối quan hệ biện chứng: Kinh tế đi trước làm nền tảng ('Có thực mới vực được đạo'), nhưng văn hóa soi đường cho quốc dân đi.",
    realWorldExample: "Xóa bỏ mù chữ, phổ cập giáo dục, phát huy bản sắc văn hóa Việt Nam tiên tiến đậm đà bản sắc dân tộc; phân phối theo lao động: 'Làm nhiều hưởng nhiều, không làm không hưởng'.",
    keyTakeaways: [
      "Văn hóa mang tính dân tộc, khoa học, đại chúng.",
      "Bảo đảm bình đẳng trước pháp luật và an sinh xã hội."
    ]
  },
  "dong-luc-dan": {
    icon: Flame,
    color: "text-orange-500",
    colorValue: "#f97316",
    path: "/theory#s3",
    title: "Động lực Nhân dân: Lợi ích - Dân chủ - Đại đoàn kết",
    explanation: "Nội lực dân tộc là nhân tố quyết định. 'Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh.' Dân chủ là của quý báu nhất giúp giải phóng sức sáng tạo quần chúng.",
    realWorldExample: "Khối đại đoàn kết toàn dân tộc: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công'.",
    keyTakeaways: [
      "Chăm lo lợi ích vật chất và tinh thần thiết thực của nhân dân.",
      "Đại đoàn kết toàn dân trên nền tảng liên minh công - nông - trí thức."
    ]
  },
  "con-nguoi-moi": {
    icon: ShieldCheck,
    color: "text-purple-500",
    colorValue: "#a855f7",
    path: "/theory#s4",
    title: "Động lực Con người mới & Phép Biện chứng Xây - Chống",
    explanation: "'Muốn xây dựng CNXH, trước hết cần có những con người XHCN'. Xây dựng đạo đức cách mạng mới (tinh thần tập thể, cần kiệm liêm chính) đi đôi với quyết liệt chống chủ nghĩa cá nhân và quan liêu.",
    realWorldExample: "Chống chủ nghĩa cá nhân - thứ 'vi trùng độc hại' gây ra tham nhũng, lãng phí; nêu cao gương người tốt việc tốt và tinh thần 'Mình vì mọi người, mọi người vì mình'.",
    keyTakeaways: [
      "Bồi dưỡng con người mới vừa hồng vừa chuyên.",
      "Đảng là người cầm lái vững vàng lãnh đạo cách mạng."
    ]
  },
  "center": {
    icon: Target,
    color: "text-primary",
    colorValue: "var(--color-primary)",
    path: "/theory#s1",
    title: "MỤC TIÊU & ĐỘNG LỰC CỦA CNXH Ở VIỆT NAM",
    explanation: "Quan điểm toàn diện của Chủ tịch Hồ Chí Minh: Xác định rõ mục tiêu xây dựng một xã hội độc lập, tự do, hạnh phúc cho toàn dân, phát huy nguồn sức mạnh nội sinh vô địch của nhân dân dưới sự lãnh đạo của Đảng.",
    realWorldExample: "Định hướng cho công cuộc Đổi mới, phát triển bền vững và hội nhập quốc tế của Việt Nam trong kỷ nguyên vươn mình của dân tộc.",
    keyTakeaways: [
      "Mục tiêu toàn diện: Chính trị, Kinh tế, Văn hóa, Xã hội.",
      "Động lực mạnh mẽ: Nhân dân, Hệ thống chính trị, Con người mới."
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

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeNode, setActiveNode] = useState<string>("center");
  const nodeData = conceptData[activeNode] || conceptData["center"];
  const NodeIcon = nodeData.icon;

  return (
    <main className="pt-16 overflow-hidden">
      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        <FloatingParticle delay={0} size={6} x="10%" y="20%" duration={8} />
        <FloatingParticle delay={1} size={4} x="80%" y="30%" duration={10} />
        <FloatingParticle delay={2} size={8} x="60%" y="70%" duration={7} />
        <FloatingParticle delay={0.5} size={5} x="30%" y="80%" duration={9} />

        {/* Ambient Warm Historical Glow Backdrop */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
          <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full" />
        </motion.div>

        <motion.div
          className="container mx-auto px-6 lg:px-12 relative z-20 py-12"
          style={{ y: textY, opacity }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest shadow-sm"
              >
                <Sparkles className="w-4 h-4" /> Tư tưởng Hồ Chí Minh · Chương III
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-[clamp(2.2rem,5vw,4.2rem)] font-headline font-extrabold leading-[1.15] tracking-tight text-on-background"
              >
                Mục Tiêu & Động Lực Của{' '}
                <span className="text-primary block mt-1">Chủ Nghĩa Xã Hội</span>
                <span className="text-xl md:text-2xl font-normal text-on-surface-variant block mt-2">
                  ở Việt Nam
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg font-body text-on-surface-variant max-w-xl leading-relaxed"
              >
                Khám phá hệ thống mục tiêu đồng bộ về Chính trị, Kinh tế, Văn hóa, Xã hội và nguồn sức mạnh nội sinh to lớn của nhân dân dưới sự dẫn dắt của Đảng Cộng sản Việt Nam.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4 pt-2" variants={fadeInUp}>
                <button
                  className="px-8 py-4 bg-primary text-on-primary font-bold text-base rounded-2xl shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  onClick={() => navigate('/theory')}
                >
                  <BookOpen className="w-5 h-5" /> Đọc Lý Thuyết Chuyên Sâu
                </button>
                <button
                  className="px-8 py-4 bg-surface border-2 border-outline-variant hover:border-primary text-on-surface font-bold text-base rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  onClick={() => navigate('/game')}
                >
                  <Trophy className="w-5 h-5 text-amber-500" /> Đấu Trường Game
                </button>
              </motion.div>
            </motion.div>

            {/* Historic Hero Card with Authentic Portrait */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative bg-surface rounded-3xl p-6 border-2 border-primary/20 shadow-2xl max-w-sm w-full text-center space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-md aspect-square bg-black/40">
                  <img
                    src="/images/hcm_1946.jpg"
                    alt="Chủ tịch Hồ Chí Minh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-xl text-on-surface">Chủ tịch Hồ Chí Minh</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">Lãnh tụ vĩ đại của dân tộc Việt Nam</p>
                </div>
                <div className="bg-primary/5 p-3.5 rounded-xl border border-primary/20 text-xs italic text-on-surface-variant">
                  "Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ."
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ INTERACTIVE MINDMAP / CONCEPT EXPLORER ═══ */}
      <section className="py-20 bg-surface-variant/20 border-y border-outline-variant/60 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Sơ đồ Tư duy Tương tác</span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
              Khám Phá Cấu Trúc Toàn Bộ Bài Học
            </h2>
            <p className="text-on-surface-variant text-base">
              Nhấp vào từng nhánh bên dưới để xem giải thích chi tiết và phân tích lý luận thực tiễn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mindmap Nodes Navigation */}
            <div className="lg:col-span-5 space-y-3">
              {Object.entries(conceptData).map(([key, item]) => {
                const Icon = item.icon;
                const isSelected = activeNode === key;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setActiveNode(key)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      isSelected
                        ? "bg-surface border-primary shadow-md ring-4 ring-primary/20"
                        : "bg-surface/70 border-outline-variant/60 hover:bg-surface hover:border-outline-variant"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                        isSelected ? "bg-primary text-on-primary shadow-sm" : "bg-surface-variant text-on-surface-variant"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm md:text-base leading-snug truncate ${isSelected ? "text-primary" : "text-on-surface"}`}>
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-primary translate-x-1" : "text-outline"}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Node Detailed Information Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface rounded-3xl p-8 border-2 border-primary/30 shadow-xl space-y-6"
                >
                  <div className="flex items-center gap-4 border-b border-outline-variant/60 pb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <NodeIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-1">
                        Luận điểm chi tiết
                      </span>
                      <h3 className="text-2xl font-headline font-bold text-on-surface">
                        {nodeData.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-1">Nội dung cốt lõi</h4>
                      <p className="text-on-surface text-base md:text-lg leading-relaxed font-medium">
                        {nodeData.explanation}
                      </p>
                    </div>

                    <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-2xl">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5" /> Luận giải thực tiễn
                      </h4>
                      <p className="text-on-surface italic text-sm md:text-base leading-relaxed">
                        {nodeData.realWorldExample}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-2">Điểm mấu chốt cần ghi nhớ</h4>
                      <ul className="space-y-2">
                        {nodeData.keyTakeaways.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base text-on-surface-variant">
                            <span className="text-primary font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/60 flex justify-end">
                    <button
                      onClick={() => navigate(nodeData.path)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95"
                    >
                      Đọc chi tiết trong bài học <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 CORE MODULES SECTION ═══ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Các Phân Hệ Học Tập</span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
              Công Cụ Học Tập & Ôn Luyện Đa Chiều
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Lý luận */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface">Lý Luận Toàn Diện</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Trình bày hệ thống mục tiêu, động lực, phép biện chứng xây - chống và trích dẫn chuẩn giáo trình.
                </p>
              </div>
              <button
                onClick={() => navigate('/theory')}
                className="mt-6 flex items-center gap-2 font-bold text-primary text-sm hover:underline"
              >
                Vào học ngay <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 2: 100 Câu Quiz */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface">100 Câu Trắc Nghiệm</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Ngân hàng 100 câu hỏi trắc nghiệm tuyển chọn bao quát đầy đủ nội dung tư tưởng Hồ Chí Minh.
                </p>
              </div>
              <button
                onClick={() => navigate('/quiz')}
                className="mt-6 flex items-center gap-2 font-bold text-amber-600 text-sm hover:underline"
              >
                Luyện trắc nghiệm <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 3: Game Đấu trường */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface">Đấu Trường Game</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  10 vòng thi đối kháng thời gian thực kết hợp trắc nghiệm tốc độ và đuổi hình bắt chữ.
                </p>
              </div>
              <button
                onClick={() => navigate('/game')}
                className="mt-6 flex items-center gap-2 font-bold text-emerald-600 text-sm hover:underline"
              >
                Vào chơi game <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 4: Trách nhiệm sinh viên */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface">Trách Nhiệm Sinh Viên</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Vận dụng tư tưởng Hồ Chí Minh vào học tập, rèn luyện đạo đức cách mạng và phụng sự Tổ quốc.
                </p>
              </div>
              <button
                onClick={() => navigate('/theory#s5')}
                className="mt-6 flex items-center gap-2 font-bold text-purple-600 text-sm hover:underline"
              >
                Xem liên hệ thực tiễn <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
