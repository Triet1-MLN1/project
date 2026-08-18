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
  Code2
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

export default function About() {
  const [activeTab, setActiveTab] = useState(0);

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
          {pillars.map((p, idx) => {
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
        className="max-w-6xl mx-auto px-6 lg:px-12 mb-16 w-full"
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
    </main>
  );
}
