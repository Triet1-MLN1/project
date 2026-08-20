import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  ShieldCheck,
  Target,
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  CheckCircle2,
  Scale,
  Award,
  Layers,
  Code2,
  Bot,
  Terminal,
  FileCheck2,
  Sliders,
  Cpu
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const AI_USAGE_ITEMS = [
  {
    category: "1. Trợ lý Ôn tập & Hỏi đáp Lý luận",
    tool: "Google Gemini 2.5 Flash + Convex Vector Search (RAG)",
    purpose: "Hỗ trợ sinh viên tra cứu nhanh các khái niệm, phân tích trích dẫn và giải thích câu hỏi trong phòng ôn tập.",
    prompt: '"Dựa trên giáo trình chuẩn Tư tưởng Hồ Chí Minh Chương III, giải thích luận điểm: Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ..."',
    result: "Cung cấp câu trả lời phân tích sơ bộ, trích dẫn văn kiện và gợi ý liên hệ thực tiễn.",
    humanEdit: "Nhóm đã kiểm duyệt lại 100% ngữ cảnh lịch sử, chuẩn hóa thuật ngữ chính trị và loại bỏ các diễn đạt chưa sát với văn phong giáo trình."
  },
  {
    category: "2. Ngân hàng Câu hỏi & Đấu trường Game",
    tool: "Google Generative AI SDK",
    purpose: "Hỗ trợ soạn thảo và phân loại độ khó cho ngân hàng câu hỏi trắc nghiệm đối chứng.",
    prompt: '"Tạo 10 câu hỏi trắc nghiệm 4 lựa chọn về phép biện chứng Xây và Chống trong tư tưởng đạo đức Hồ Chí Minh, có đáp án và giải thích..."',
    result: "Sinh ra bộ câu hỏi thô dạng JSON với các phương án lựa chọn A, B, C, D.",
    humanEdit: "Đối chiếu từng câu hỏi với giáo trình BGD&ĐT, chỉnh sửa các phương án gây nhiễu để đảm bảo tính phân hóa và độ chính xác học thuật."
  },
  {
    category: "3. Tối ưu Giao diện & Trải nghiệm Người dùng",
    tool: "Antigravity AI Agent & Vite/React Tooling",
    purpose: "Hỗ trợ chuyển đổi sơ đồ tư duy logic thành các thành phần giao diện tương tác mượt mà.",
    prompt: '"Thiết kế Component Mindmap tương tác và bảng so sánh Xây - Chống theo phong cách hiện đại, trang trọng, chuẩn màu đỏ - vàng kim..."',
    result: "Khung giao diện React + Tailwind CSS với hiệu ứng chuyển động Framer Motion.",
    humanEdit: "Thay thế toàn bộ ảnh minh họa do AI tạo bằng ảnh tư liệu lịch sử chụp thực tế 100% từ kho tư liệu quốc gia và Wikimedia Commons."
  }
];

export default function About() {
  const [activeAiTab, setActiveAiTab] = useState(0);

  const pillars = [
    {
      num: "01",
      icon: Target,
      title: "Hệ thống hóa mục tiêu toàn diện",
      desc: "Trực quan hóa 4 mục tiêu cốt lõi của Chủ nghĩa Xã hội (Chính trị, Kinh tế, Văn hóa, Quan hệ xã hội) giúp người học dễ dàng nắm bắt cấu trúc logic và mối liên hệ biện chứng."
    },
    {
      num: "02",
      icon: Users,
      title: "Động lực nội sinh từ nhân dân",
      desc: "Làm sâu sắc luận điểm 'Lấy dân làm gốc', sự kết hợp giữa ba chân kiềng: Lợi ích của dân, Dân chủ của dân và Khối đại đoàn kết toàn dân tộc dưới sự lãnh đạo của Đảng."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Phép biện chứng Xây đi đôi với Chống",
      desc: "Bồi dưỡng con người mới xã hội chủ nghĩa 'vừa hồng vừa chuyên', đồng thời kiên quyết loại bỏ chủ nghĩa cá nhân - thứ vi trùng phá hoại sự nghiệp cách mạng."
    },
    {
      num: "04",
      icon: Award,
      title: "Trải nghiệm học tập Gamification",
      desc: "Kết hợp giữa lý thuyết chuyên sâu, ngân hàng 100 câu hỏi trắc nghiệm và đấu trường Game thời gian thực để tạo hứng thú học tập và khắc sâu kiến thức lâu dài."
    }
  ];

  return (
    <main className="pt-24 pb-16 overflow-hidden flex-grow flex flex-col bg-background">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-6 lg:px-12 mb-20 w-full"
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Giới thiệu dự án · HCM202 - Nhóm 1
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold text-on-surface leading-tight">
            Không Gian Học Tập <br />
            <span className="text-primary">Tư Tưởng Hồ Chí Minh</span>
          </h1>
          <p className="text-base md:text-xl text-on-surface-variant leading-relaxed">
            Dự án nghiên cứu và số hóa kiến thức Chương III: <em>"Tư tưởng Hồ Chí Minh về mục tiêu và động lực của chủ nghĩa xã hội ở Việt Nam"</em>, kết hợp công nghệ hiện đại và phương pháp học tập tích cực.
          </p>
        </motion.div>
      </motion.section>

      {/* 4 Core Pillars */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-6 lg:px-12 mb-20 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                variants={fadeInUp}
                className="bg-surface rounded-3xl p-8 border border-outline-variant shadow-sm space-y-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-outline/30 font-mono">{p.num}</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface">{p.title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Integrity & Standards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-6 lg:px-12 mb-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Integrity */}
          <motion.div variants={fadeInUp} className="bg-surface rounded-3xl p-8 border border-primary/20 shadow-sm space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider">
              <Scale className="w-4 h-4" /> Cam Kết Học Thuật
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface">Liêm Chính Học Thuật</h2>
            <div className="space-y-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
              <p className="pl-3 border-l-2 border-primary">
                Toàn bộ nội dung lý luận, trích dẫn lời dạy của Chủ tịch Hồ Chí Minh và các danh nhân lịch sử đều được đối chiếu cẩn trọng với Giáo trình Tư tưởng Hồ Chí Minh chuẩn của Bộ Giáo dục & Đào tạo.
              </p>
              <p className="pl-3 border-l-2 border-primary">
                Tất cả các hình ảnh tư liệu sử dụng trên nền tảng đều là tài liệu lịch sử nguyên bản, chính thống từ kho tư liệu lưu trữ quốc gia và Wikimedia Commons.
              </p>
            </div>
          </motion.div>

          {/* Technology & Methodology */}
          <motion.div variants={fadeInUp} className="bg-surface rounded-3xl p-8 border border-amber-500/20 shadow-sm space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-4 h-4" /> Công Nghệ & Phương Pháp
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface">Kiến Trúc Nền Tảng</h2>
            <div className="space-y-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
              <p className="pl-3 border-l-2 border-amber-500">
                <strong>Frontend:</strong> Xây dựng bằng React 19, Vite, Tailwind CSS và Framer Motion, mang đến trải nghiệm trực quan mượt mà trên cả máy tính và điện thoại.
              </p>
              <p className="pl-3 border-l-2 border-amber-500">
                <strong>Backend Realtime:</strong> Sử dụng Convex Cloud Serverless để đồng bộ hóa phòng chơi, tính điểm mili-giây và cập nhật bảng xếp hạng tức thì.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ AI USAGE DISCLOSURE / PHỤ LỤC MINH BẠCH SỬ DỤNG AI ═══ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-6 lg:px-12 mb-16 w-full"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-surface rounded-3xl p-8 md:p-10 border-2 border-primary/20 shadow-lg space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                <Bot className="w-4 h-4" /> Phụ Lục Học Thuật
              </div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
                Báo Cáo Minh Bạch Sử Dụng AI (AI Usage Disclosure)
              </h2>
            </div>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-variant/40 px-3.5 py-2 rounded-xl border border-outline-variant/50 self-start md:self-auto">
              Tuân thủ chuẩn mực liêm chính học thuật
            </span>
          </div>

          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
            Nhóm thực hiện cam kết minh bạch 100% về việc ứng dụng Trí tuệ Nhân tạo (AI) trong quá trình nghiên cứu, phát triển công cụ học tập và thiết kế hệ thống. AI chỉ đóng vai trò trợ lý kỹ thuật và tăng tốc quy trình; toàn bộ nội dung học thuật, kết luận lý luận và hình ảnh lịch sử đều do sinh viên trực tiếp rà soát, kiểm duyệt và chịu trách nhiệm.
          </p>

          {/* AI Usage Tabs / Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {AI_USAGE_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAiTab(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold shrink-0 transition-all ${
                  activeAiTab === idx
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-variant/40 hover:bg-surface-variant text-on-surface-variant'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>

          {/* Selected AI Usage Details Card */}
          <motion.div
            key={activeAiTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-variant/15 border border-outline-variant rounded-3xl p-6 md:p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tool & Purpose */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-outline flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-primary" /> Công cụ AI sử dụng
                  </span>
                  <p className="text-base font-bold text-on-surface">
                    {AI_USAGE_ITEMS[activeAiTab].tool}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-outline flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-primary" /> Mục đích ứng dụng
                  </span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {AI_USAGE_ITEMS[activeAiTab].purpose}
                  </p>
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-1.5 bg-background/60 p-4 rounded-2xl border border-outline-variant/40">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Prompt / Yêu cầu tiêu biểu
                </span>
                <p className="text-xs md:text-sm font-mono text-on-surface italic leading-relaxed pt-1">
                  {AI_USAGE_ITEMS[activeAiTab].prompt}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/40">
              {/* AI Output */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" /> Kết quả do AI tạo
                </span>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {AI_USAGE_ITEMS[activeAiTab].result}
                </p>
              </div>

              {/* Human Editing & Verification */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5" /> Kiểm duyệt & Chỉnh sửa của sinh viên
                </span>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {AI_USAGE_ITEMS[activeAiTab].humanEdit}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
