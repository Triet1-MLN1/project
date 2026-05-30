import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ShieldCheck, BarChart3, CheckCircle, AlertTriangle, ArrowRight, Lightbulb, Target, Users, Landmark, Cpu, ChevronDown, Play } from 'lucide-react';

import nvidiaImg from '../public/NVIDIA.png';
import vnImg from '../public/VN.png';
import dulichImg from '../public/Dulich.png';
import tqImg from '../public/TQ.png';
import nganhangImg from '../public/ngân hàng.png';
import anNinhImg from '../public/image.png';


const SECTIONS = [
  { id: 's1', title: 'I. Khái niệm & Nội dung', icon: Globe },
  { id: 's2', title: 'II. Tác động tới Việt Nam', icon: BarChart3 },
  { id: 's3', title: 'III. Phương hướng nâng cao', icon: ShieldCheck },
];

export default function Theory() {
  const [activeId, setActiveId] = useState('s1');
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
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
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 pt-24 pb-8 md:pt-28 md:pb-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Sidebar TOC */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 lg:sticky lg:top-24 z-10 bg-surface rounded-2xl p-5 shadow-sm border border-outline-variant">
        <h3 className="font-headline font-bold text-lg mb-4 text-on-surface px-2 border-b pb-2">Hệ thống bài giảng</h3>
        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium flex-shrink-0 ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface hover:bg-surface-variant'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-16 space-y-16">
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a1c2e] via-[#121421] to-[#0a0a0f] rounded-3xl p-8 lg:p-10 relative overflow-hidden border border-primary/20 shadow-lg"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full mb-5">
            MLN122 · Kinh tế chính trị
          </span>
          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Hội nhập kinh tế quốc tế
          </h1>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-3xl">
            Lý luận về quá trình hội nhập, tác động tới Việt Nam và phương hướng nâng cao hiệu quả hội nhập.
          </p>
        </motion.div>

        {/* Section 1 */}
        <motion.section id="s1" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">I. Khái niệm & Nội dung</h2>
          </div>

          {/* Khái niệm */}
          <div className="relative bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> 1. Khái niệm</h3>
            <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
              Là quá trình <strong className="text-primary">gắn kết nền kinh tế quốc gia với thế giới</strong> trên cơ sở chia sẻ lợi ích, tuân thủ chuẩn mực chung. Thực chất là mở rộng quan hệ sản xuất & trao đổi vượt biên giới.
            </p>
          </div>

          {/* Sự cần thiết */}
          <div>
            <h3 className="text-xl font-bold text-on-surface mb-4">2. Sự cần thiết khách quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-4">2.1</div>
                <h4 className="font-bold text-lg mb-2">Xu thế toàn cầu hóa</h4>
                <p className="text-sm text-on-surface-variant">Các quốc gia phụ thuộc lẫn nhau, yếu tố sản xuất (hàng hóa, vốn, lao động) lưu chuyển toàn cầu. Không ai có thể tồn tại biệt lập.</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-4">2.2</div>
                <h4 className="font-bold text-lg mb-2">Phương thức phát triển phổ biến</h4>
                <p className="text-sm text-on-surface-variant">Mở rộng thị trường, thu hút vốn, tiếp thu công nghệ để CNH-HĐH. Tạo việc làm, nâng cao thu nhập (VD: Các hiệp định FTA).</p>
              </div>
            </div>
          </div>

          {/* Nội dung */}
          <div>
            <h3 className="text-xl font-bold text-on-surface mb-4">3. Nội dung hội nhập</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-variant/30 border border-outline-variant rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Chuẩn bị điều kiện</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant font-medium">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div>Hoàn thiện thể chế kinh tế</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div>Nâng cao chất lượng nguồn nhân lực</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div>Phát triển khoa học - công nghệ</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div>Tăng cường năng lực cạnh tranh</li>
                </ul>
              </div>
              <div className="bg-surface-variant/30 border border-outline-variant rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-500" /> Hình thức & Mức độ</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-on-surface-variant">
                  <div>
                    <strong className="text-on-surface block mb-2">Hình thức:</strong>
                    <ul className="space-y-2">
                      <li>• Song phương</li>
                      <li>• Khu vực</li>
                      <li>• Toàn cầu</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-on-surface block mb-2">Mức độ (thấp đến cao):</strong>
                    <ul className="space-y-2">
                      <li>1. Mậu dịch tự do</li>
                      <li>2. Liên minh thuế quan</li>
                      <li>3. Thị trường chung</li>
                      <li>4. Liên minh kinh tế</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section id="s2" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">II. Tác động tới Việt Nam</h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Tích cực */}
            <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-2xl font-black text-emerald-600 mb-6 flex items-center gap-2">
                <CheckCircle className="w-8 h-8" /> 1. THỜI CƠ
              </h3>
              <div className="space-y-4 relative z-10 text-sm">
                <div
                  className={`bg-white/60 dark:bg-black/20 p-5 rounded-2xl border cursor-pointer transition-all ${activeImageId === 'kinhte' ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-sm'}`}
                  onClick={() => setActiveImageId(prev => prev === 'kinhte' ? null : 'kinhte')}
                >
                  <strong className="text-emerald-800 dark:text-emerald-400 block mb-2 text-base flex justify-between items-center">
                    Kinh tế & Công nghệ
                    <span className="text-xs font-normal opacity-50">{activeImageId === 'kinhte' ? 'Thu gọn' : 'Xem ảnh'}</span>
                  </strong>
                  <p className="text-on-surface-variant">Mở rộng xuất nhập khẩu, chuyển dịch cơ cấu hiện đại, thu hút FDI/ODA, tiếp cận quản trị và công nghệ tiên tiến.</p>
                  <AnimatePresence>
                    {activeImageId === 'kinhte' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-3 mt-4">
                        <a
                          href="https://baochinhphu.vn/chinh-phu-viet-nam-va-nvidia-hop-tac-thanh-lap-trung-tam-nghien-cuu-va-phat-trien-trung-tam-du-lieu-ai-102241205191337156.htm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline text-xs md:text-sm font-medium flex items-start gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Việt Nam và NVIDIA hợp tác thành lập trung tâm nghiên cứu AI</span>
                        </a>
                        <img src={nvidiaImg} alt="Kinh tế" className="w-full rounded-xl object-cover shadow-sm border border-emerald-500/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={`bg-white/60 dark:bg-black/20 p-5 rounded-2xl border cursor-pointer transition-all ${activeImageId === 'doisong' ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-sm'}`}
                  onClick={() => setActiveImageId(prev => prev === 'doisong' ? null : 'doisong')}
                >
                  <strong className="text-emerald-800 dark:text-emerald-400 block mb-2 text-base flex justify-between items-center">
                    Đời sống & Xã hội
                    <span className="text-xs font-normal opacity-50">{activeImageId === 'doisong' ? 'Thu gọn' : 'Xem ảnh'}</span>
                  </strong>
                  <p className="text-on-surface-variant">Hàng hóa đa dạng, giá cả cạnh tranh. Mở ra cơ hội việc làm phong phú, nâng cao trình độ nhân lực.</p>
                  <AnimatePresence>
                    {activeImageId === 'doisong' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-3 mt-4">
                        <a
                          href="https://baochinhphu.vn/chuyen-doi-so-kinh-te-so-co-the-dong-gop-toi-3-vao-gdp-102241229103042518.htm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline text-xs md:text-sm font-medium flex items-start gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Chuyển đổi số, kinh tế số có thể đóng góp tới 30% vào GDP</span>
                        </a>
                        <img src={vnImg} alt="Đời sống" className="w-full rounded-xl object-cover shadow-sm border border-emerald-500/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={`bg-white/60 dark:bg-black/20 p-5 rounded-2xl border cursor-pointer transition-all ${activeImageId === 'chinhtri' ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-sm'}`}
                  onClick={() => setActiveImageId(prev => prev === 'chinhtri' ? null : 'chinhtri')}
                >
                  <strong className="text-emerald-800 dark:text-emerald-400 block mb-2 text-base flex justify-between items-center">
                    Chính trị & Văn hóa
                    <span className="text-xs font-normal opacity-50">{activeImageId === 'chinhtri' ? 'Thu gọn' : 'Xem ảnh'}</span>
                  </strong>
                  <p className="text-on-surface-variant">Tạo động lực cải cách thể chế, nâng cao vị thế VN. Tiếp thu tinh hoa nhân loại làm phong phú bản sắc.</p>
                  <AnimatePresence>
                    {activeImageId === 'chinhtri' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-3 mt-4">
                        <a
                          href="https://icd.gov.vn/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline text-xs md:text-sm font-medium flex items-start gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Cục Hợp tác quốc tế - Bộ Văn hóa, Thể thao và Du lịch</span>
                        </a>
                        <img src={dulichImg} alt="Chính trị" className="w-full rounded-xl object-cover shadow-sm border border-emerald-500/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Tiêu cực */}
            <div className="bg-red-500/5 border border-red-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-2xl font-black text-red-600 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-8 h-8" /> 2. THÁCH THỨC
              </h3>
              <div className="space-y-4 relative z-10 text-sm">
                <div
                  className={`bg-white/60 dark:bg-black/20 p-5 rounded-2xl border cursor-pointer transition-all ${activeImageId === 'apluc' ? 'border-red-500 shadow-md ring-2 ring-red-500/20' : 'border-red-500/20 hover:border-red-500/50 hover:shadow-sm'}`}
                  onClick={() => setActiveImageId(prev => prev === 'apluc' ? null : 'apluc')}
                >
                  <strong className="text-red-800 dark:text-red-400 block mb-2 text-base flex justify-between items-center">
                    Áp lực & Lệ thuộc
                    <span className="text-xs font-normal opacity-50">{activeImageId === 'apluc' ? 'Thu gọn' : 'Xem ảnh'}</span>
                  </strong>
                  <p className="text-on-surface-variant">Doanh nghiệp yếu kém dễ phá sản. Kinh tế chao đảo trước biến động thế giới, gia tăng khoảng cách phân hóa giàu nghèo.</p>
                  <AnimatePresence>
                    {activeImageId === 'apluc' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-3 mt-4">
                        <a
                          href="https://baochinhphu.vn/xung-quanh-vu-sup-do-lon-thu-hai-lich-su-nganh-ngan-hang-my-102230312093009794.htm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline text-xs md:text-sm font-medium flex items-start gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Xung quanh vụ sụp đổ lớn thứ hai lịch sử ngành ngân hàng Mỹ</span>
                        </a>
                        <img src={nganhangImg} alt="Áp lực" className="w-full rounded-xl object-cover shadow-sm border border-red-500/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={`bg-white/60 dark:bg-black/20 p-5 rounded-2xl border cursor-pointer transition-all ${activeImageId === 'bay' ? 'border-red-500 shadow-md ring-2 ring-red-500/20' : 'border-red-500/20 hover:border-red-500/50 hover:shadow-sm'}`}
                  onClick={() => setActiveImageId(prev => prev === 'bay' ? null : 'bay')}
                >
                  <strong className="text-red-800 dark:text-red-400 block mb-2 text-base flex justify-between items-center">
                    Bẫy phát triển thấp
                    <span className="text-xs font-normal opacity-50">{activeImageId === 'bay' ? 'Thu gọn' : 'Xem ảnh'}</span>
                  </strong>
                  <p className="text-on-surface-variant">Nguy cơ thành "bãi thải công nghiệp", kẹt ở phân khúc giá trị gia tăng thấp, cạn kiệt tài nguyên môi trường.</p>
                  <AnimatePresence>
                    {activeImageId === 'bay' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-3 mt-4">
                        <a
                          href="https://thanhnien.vn/kinh-hoang-bai-chua-rac-thai-dien-tu-lon-nhat-the-gioi-o-trung-quoc-185486248.htm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline text-xs md:text-sm font-medium flex items-start gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Kinh hoàng bãi chứa rác thải điện tử lớn nhất thế giới ở Trung Quốc</span>
                        </a>
                        <img src={tqImg} alt="Bẫy phát triển" className="w-full rounded-xl object-cover shadow-sm border border-red-500/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={`bg-white/60 dark:bg-black/20 p-5 rounded-2xl border cursor-pointer transition-all ${activeImageId === 'anninh' ? 'border-red-500 shadow-md ring-2 ring-red-500/20' : 'border-red-500/20 hover:border-red-500/50 hover:shadow-sm'}`}
                  onClick={() => setActiveImageId(prev => prev === 'anninh' ? null : 'anninh')}
                >
                  <strong className="text-red-800 dark:text-red-400 block mb-2 text-base flex justify-between items-center">
                    Văn hóa & An ninh
                    <span className="text-xs font-normal opacity-50">{activeImageId === 'anninh' ? 'Thu gọn' : 'Xem ảnh'}</span>
                  </strong>
                  <p className="text-on-surface-variant">Xói mòn bản sắc truyền thống. Đối mặt các vấn đề an ninh phi truyền thống (khủng báo, dịch bệnh, tội phạm).</p>
                  <AnimatePresence>
                    {activeImageId === 'anninh' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-3 mt-4">
                        <a
                          href="https://baochinhphu.vn/phong-chong-toi-pham-xuyen-quoc-gia.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline text-xs md:text-sm font-medium flex items-start gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Nâng cao hiệu quả hợp tác quốc tế trong phòng chống tội phạm xuyên quốc gia</span>
                        </a>
                        <img src={anNinhImg} alt="An ninh" className="w-full rounded-xl object-cover shadow-sm border border-red-500/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3 */}
        <motion.section id="s3" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">III. 6 Phương hướng nâng cao</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group flex flex-col">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Lightbulb /></div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">1. Nhận thức thời cơ & thách thức</h3>
              <ul className="text-sm text-on-surface-variant space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div> <strong>Cơ hội:</strong> Mở rộng thị trường, thu hút đầu tư, công nghệ mới.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div> <strong>Thách thức:</strong> Cạnh tranh gay gắt, phụ thuộc thị trường nước ngoài.</li>
                <li className="text-xs italic text-outline pt-1">Ví dụ: WTO mở cửa xuất khẩu nhưng tăng áp lực cạnh tranh nội địa.</li>
              </ul>
            </div>

            {/* 3 */}
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-amber-500/50 hover:shadow-lg transition-all group flex flex-col">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Users /></div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">3. Chủ động tham gia liên kết</h3>
              <ul className="text-sm text-on-surface-variant space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div> Tăng uy tín quốc gia & niềm tin đối tác.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div> Mở rộng cơ hội hợp tác đa phương (FTA, WTO...).</li>
                <li className="text-xs italic text-outline pt-1">Ví dụ: EVFTA giúp hàng Việt vào Châu Âu với thuế ưu đãi.</li>
              </ul>
            </div>

            {/* 4 */}
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-blue-500/50 hover:shadow-lg transition-all group flex flex-col">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Landmark /></div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">4. Hoàn thiện thể chế & Pháp luật</h3>
              <ul className="text-sm text-on-surface-variant space-y-2">
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span>Đổi mới vai trò Nhà nước: hỗ trợ & giám sát</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span>Cải cách hành chính, minh bạch đầu tư</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span>Đồng bộ pháp luật với cam kết quốc tế</li>
              </ul>
            </div>

            {/* 2 - Mindmap/Flowchart */}
            <div className="md:col-span-2 lg:col-span-3 bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-xl flex items-center justify-center"><Target className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold text-xl text-on-surface">2. Chiến lược & Lộ trình hội nhập</h3>
                  <p className="text-sm text-outline">Quy trình xây dựng chiến lược hội nhập bền vững</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* 2.1 */}
                <div className="bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 p-5 rounded-2xl flex flex-col shadow-sm">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm border-b border-purple-200 dark:border-purple-500/20 pb-2">2.1. Đánh giá Thế giới</h4>
                  <ul className="text-[11px] text-on-surface-variant space-y-2 flex-1">
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Xu hướng toàn cầu hóa</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Cạnh tranh giữa các nền KT</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Hình thành các hiệp định TM</li>
                  </ul>
                </div>
                {/* 2.2 */}
                <div className="bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 p-5 rounded-2xl flex flex-col shadow-sm">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm border-b border-purple-200 dark:border-purple-500/20 pb-2">2.2. Đánh giá Trong nước</h4>
                  <ul className="text-[11px] text-on-surface-variant space-y-2 flex-1">
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Trình độ sản xuất</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Năng lực cạnh tranh</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Chất lượng lao động</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Thể chế kinh tế</li>
                  </ul>
                </div>
                {/* 2.3 */}
                <div className="bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 p-5 rounded-2xl flex flex-col shadow-sm">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm border-b border-purple-200 dark:border-purple-500/20 pb-2">2.3. Xác định Mục tiêu</h4>
                  <ul className="text-[11px] text-on-surface-variant space-y-2 flex-1">
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Tăng trưởng kinh tế</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Nâng cao đời sống người dân</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Khẳng định vị thế quốc gia</li>
                  </ul>
                </div>
                {/* 2.4 */}
                <div className="bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 p-5 rounded-2xl flex flex-col shadow-sm">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm border-b border-purple-200 dark:border-purple-500/20 pb-2">2.4. Xây dựng Lộ trình</h4>
                  <ul className="text-[11px] text-on-surface-variant space-y-2 flex-1">
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Xác định ngành ưu tiên</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Mức độ cam kết phù hợp</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Có thời gian thích nghi</li>
                  </ul>
                </div>
                {/* 2.5 */}
                <div className="bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 p-5 rounded-2xl flex flex-col shadow-sm">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm border-b border-purple-200 dark:border-purple-500/20 pb-2">2.5. Học Kinh nghiệm</h4>
                  <ul className="text-[11px] text-on-surface-variant space-y-2 flex-1">
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Học từ các nước đi trước</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Chọn lọc & sáng tạo</li>
                    <li className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-purple-500 mt-1 shrink-0"></div> Phù hợp điều kiện VN</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="md:col-span-1 lg:col-span-2 bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center"><Cpu className="w-6 h-6" /></div>
                <h3 className="font-bold text-xl text-on-surface">5. Nâng cao năng lực cạnh tranh</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-surface-variant/30 p-5 rounded-2xl border border-outline-variant/50">
                  <strong className="text-emerald-700 dark:text-emerald-500 block mb-3 text-base flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Doanh nghiệp</strong>
                  <p className="text-on-surface-variant leading-relaxed">Đổi mới công nghệ sản xuất, nâng cao trình độ quản trị. Chủ động tìm kiếm cơ hội và thích ứng với rào cản quốc tế.</p>
                </div>
                <div className="bg-surface-variant/30 p-5 rounded-2xl border border-outline-variant/50">
                  <strong className="text-blue-700 dark:text-blue-500 block mb-3 text-base flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Nhà nước</strong>
                  <p className="text-on-surface-variant leading-relaxed">Ban hành chính sách hỗ trợ, phát triển nguồn nhân lực chất lượng cao, đầu tư hạ tầng nhằm giảm chi phí cho DN.</p>
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="md:col-span-1 lg:col-span-1 bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8 hover:border-red-500/50 hover:shadow-lg transition-all group flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
                <h3 className="font-bold text-xl text-on-surface">6. Độc lập, Tự chủ</h3>
              </div>
              <div className="space-y-4 text-sm text-on-surface-variant font-medium flex-1">
                <p className="border-l-4 border-red-500/40 pl-3 italic">Yêu cầu mang tính chiến lược, nền tảng đảm bảo chủ quyền quốc gia.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-red-500/70 flex-shrink-0" /> Không bị chi phối đường lối bởi bên ngoài.</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-red-500/70 flex-shrink-0" /> Đẩy mạnh CNH-HĐH bằng nội lực sáng tạo.</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-red-500/70 flex-shrink-0" /> Kết hợp chặt chẽ kinh tế với quốc phòng an ninh.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Demo Video Section */}
          <div className="mt-12 bg-surface border-2 border-outline-variant rounded-[2rem] p-6 md:p-10 hover:border-primary/30 transition-colors shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <Play className="w-7 h-7 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-on-surface">Video Tư liệu & Minh họa</h3>
                <p className="text-on-surface-variant">Thực tiễn quá trình công nghiệp hóa, hiện đại hóa</p>
              </div>
            </div>

            <div className="relative group aspect-video bg-black rounded-3xl overflow-hidden ring-1 ring-outline-variant/50 shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ZFmtKPqcSC4"
                title="Video Tư liệu & Minh họa"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed italic">
                <strong>Lưu ý trình chiếu:</strong> Video được phát trực tiếp từ YouTube. Đồng chí có thể phóng to toàn màn hình (Fullscreen) để cả lớp dễ quan sát hơn.
              </p>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}