import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Globe, ShieldCheck, BarChart3, CheckCircle, AlertTriangle, ArrowRight, Lightbulb, Target, Users, Landmark, Cpu, Play, Brain, Compass, Activity } from 'lucide-react';
const animationThumbnail = '/animation_thumbnail.png';

const SECTIONS = [
  { id: 's1', title: 'I. Khái niệm & Bản chất', icon: Brain },
  { id: 's2', title: 'II. Mối quan hệ Biện chứng', icon: Activity },
  { id: 's3', title: 'III. Ý nghĩa Phương pháp luận', icon: Compass },
  { id: 's4', title: 'IV. Phân tích Trào lưu "Chữa lành"', icon: Play },
];

export default function Theory() {
  const [activeId, setActiveId] = useState('s1');
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollTo(id), 100);
    }
  }, [location.hash]);

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
            Triết học Mác - Lênin
          </span>
          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Tồn tại xã hội & Ý thức xã hội
          </h1>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-3xl">
            Tìm hiểu nguyên lý cốt lõi của Chủ nghĩa duy vật lịch sử: Mối quan hệ giữa đời sống vật chất khách quan và thế giới tinh thần chủ quan của con người.
          </p>
        </motion.div>

        {/* Section 1 */}
        <motion.section id="s1" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">I. Khái niệm & Bản chất</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface border-2 border-primary/20 rounded-3xl p-6 hover:shadow-lg transition-all flex flex-col">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6" /> Tồn tại xã hội
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                Là toàn bộ sinh hoạt vật chất và những điều kiện sinh hoạt vật chất của xã hội. Nó là thực tại khách quan, tồn tại độc lập với ý thức con người.
              </p>
              <ul className="text-sm text-on-surface space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                  <span><strong>Điều kiện tự nhiên:</strong> Khí hậu, đất đai, tài nguyên.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                  <span><strong>Dân số & mật độ:</strong> Yếu tố nền tảng sinh học của xã hội.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                  <span><strong>Phương thức sản xuất (Quyết định nhất):</strong> Cách con người tạo ra của cải vật chất.</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface border-2 border-tertiary/20 rounded-3xl p-6 hover:shadow-lg transition-all flex flex-col">
              <h3 className="text-2xl font-bold text-tertiary mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" /> Ý thức xã hội
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                Là mặt tinh thần của đời sống xã hội, bao gồm tình cảm, tập quán, truyền thống, quan điểm, học thuyết... nảy sinh từ tồn tại xã hội và phản ánh tồn tại xã hội.
              </p>
              <ul className="text-sm text-on-surface space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary mt-1.5 shrink-0"></div>
                  <span><strong>Tâm lý xã hội:</strong> Cảm xúc, thói quen, tâm trạng (phản ánh trực tiếp, nông).</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary mt-1.5 shrink-0"></div>
                  <span><strong>Hệ tư tưởng:</strong> Triết học, tôn giáo, đạo đức (phản ánh gián tiếp, sâu sắc).</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section id="s2" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">II. Mối quan hệ Biện chứng</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-black text-emerald-600 mb-6">
                1. Tồn tại xã hội quyết định Ý thức xã hội
              </h3>
              <p className="text-on-surface-variant mb-4 font-medium text-lg">
                "Không phải ý thức của con người quyết định tồn tại của họ; trái lại, tồn tại xã hội của họ quyết định ý thức của họ" - C.Mác.
              </p>
              <ul className="space-y-4 text-on-surface">
                <li className="flex items-center gap-3 p-4 bg-surface-container-highest rounded-2xl">
                  <CheckCircle className="text-emerald-500" />
                  <span>Tồn tại xã hội như thế nào thì ý thức xã hội như thế ấy.</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-surface-container-highest rounded-2xl">
                  <CheckCircle className="text-emerald-500" />
                  <span>Khi tồn tại xã hội (nhất là phương thức sản xuất) biến đổi, sớm muộn gì ý thức xã hội cũng biến đổi theo.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/30 rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-black text-amber-600 mb-6">
                2. Tính độc lập tương đối của Ý thức xã hội
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-surface-container-highest p-5 rounded-2xl border border-amber-500/20">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Thường lạc hậu hơn</h4>
                  <p className="text-sm text-on-surface-variant">Tư tưởng, thói quen cũ thường bám rễ sâu và khó thay đổi ngay cả khi hoàn cảnh vật chất đã thay đổi.</p>
                </div>
                <div className="bg-surface-container-highest p-5 rounded-2xl border border-amber-500/20">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Có thể vượt trước</h4>
                  <p className="text-sm text-on-surface-variant">Những tư tưởng khoa học, tiên tiến có thể dự báo tương lai, dẫn đường cho thực tiễn (VD: Triết học Mác).</p>
                </div>
                <div className="bg-surface-container-highest p-5 rounded-2xl border border-amber-500/20">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Kế thừa trong lịch sử</h4>
                  <p className="text-sm text-on-surface-variant">Tư tưởng thời đại sau kế thừa, phát triển từ thành tựu của thời đại trước. Ý thức xã hội có lịch sử riêng của nó.</p>
                </div>
                <div className="bg-surface-container-highest p-5 rounded-2xl border border-amber-500/20 md:col-span-2 lg:col-span-1">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Tác động trở lại tồn tại xã hội</h4>
                  <p className="text-sm text-on-surface-variant">Ý thức xã hội (đặc biệt là các hệ tư tưởng, quan điểm tiến bộ hoặc lạc hậu) có thể tác động mạnh mẽ trở lại tồn tại xã hội, định hướng hành động của con người.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-black text-blue-600 mb-4 flex items-center gap-3">
                <Target className="w-8 h-8" /> 3. Sự tác động trở lại đối với Tồn tại xã hội
              </h3>
              <p className="text-on-surface-variant mb-4 text-lg">
                Ý thức xã hội không thụ động. Nếu là ý thức tiến bộ, nó sẽ thúc đẩy xã hội phát triển. Nếu là ý thức phản động, lạc hậu, nó sẽ kìm hãm xã hội.
              </p>
              <div className="bg-surface-container-highest p-4 rounded-xl border border-blue-500/20 italic text-on-surface">
                <strong>Ví dụ:</strong> Sự ra đời của Đảng Cộng sản với lý luận tiên phong đã lãnh đạo nhân dân ta thay đổi hoàn toàn hoàn cảnh lịch sử (từ nô lệ thành tự do).
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3 */}
        <motion.section id="s3" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">III. Ý nghĩa Phương pháp luận</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-red-500/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Landmark /></div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">Cải tạo xã hội từ gốc</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Để thay đổi tận gốc tư tưởng, đạo đức của một xã hội, trước tiên phải thay đổi phương thức sản xuất và hoàn cảnh sống vật chất của xã hội đó. Không thể chỉ giáo huấn suông.
              </p>
            </div>

            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 hover:border-blue-500/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Users /></div>
              <h3 className="font-bold text-lg mb-3 text-on-surface">Chú trọng giáo dục tư tưởng</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Đồng thời với phát triển kinh tế, phải chú trọng xây dựng văn hóa, đạo đức. Xóa bỏ các hủ tục lạc hậu và phát huy những truyền thống tốt đẹp, tiếp thu tinh hoa nhân loại.
              </p>
            </div>
          </div>

        </motion.section>

        {/* Section 4: Phân tích Trào lưu "Chữa lành" */}
        <motion.section id="s4" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-on-surface">IV. Phân tích Trào lưu "Chữa lành"</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-surface border-2 border-primary/20 rounded-[2rem] p-6 md:p-10 shadow-sm overflow-hidden relative">
              <h3 className="font-bold text-2xl text-primary mb-4">1. Nguồn gốc của sự sợ hãi và tìm nơi nương tựa</h3>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                Tâm lý xã hội (bao gồm tình cảm, tâm trạng, thói quen, ước muốn...) hình thành dưới tác động trực tiếp của cuộc sống hằng ngày. Trong xã hội hiện đại, áp lực học tập (trượt môn), các mối quan hệ (thất tình) tạo ra trạng thái tâm lý tiêu cực, bế tắc — đây chính là những tác động tiêu cực từ <strong>tồn tại xã hội</strong>.
              </p>
              <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl italic text-on-surface mb-4">
                C.Mác và V.I. Lênin đã khẳng định tôn giáo / ảo tưởng là <strong>"thuốc phiện của nhân dân"</strong>, bởi nó chỉ mang lại sự đền bù hư ảo, ru ngủ con người, làm họ khuây khỏa nỗi đau thực tại bằng cách kỳ vọng vào những phép màu hay thế giới siêu nhiên, từ đó làm giảm ý chí đấu tranh và hoạt động thực tiễn.
              </div>
              <div className="p-4 bg-surface-container-highest border border-outline-variant rounded-xl">
                <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wide">Câu hỏi vận dụng 1 — Tại sao con người "yếu đuối tâm lý" lại đi "chữa lành"?</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Dù "tồn tại xã hội" hiện đại có đầy đủ tiện nghi vật chất, nhưng "ý thức xã hội" (đặc biệt là tâm lý xã hội) thường có <strong>tính lạc hậu</strong> — tâm lý ỷ lại, yếu đuối, mong chờ phép màu không tự động biến mất khi xã hội phát triển. Khi cá nhân gặp cú sốc và mất phương hướng, họ rơi vào trạng thái "bất lực trước những áp lực xã hội". Giống như nguồn gốc ra đời của tín ngưỡng thời xưa, khi không tìm được lối thoát bằng năng lực thực tiễn, con người nảy sinh tâm lý tìm kiếm một chỗ dựa tinh thần siêu nhiên, dễ dãi để tự trấn an. Việc đi "chữa lành" bằng năng lượng vũ trụ chính là kết quả của trạng thái tâm lý tự phát này.
                </p>
              </div>
            </div>

            <div className="bg-surface border-2 border-tertiary/20 rounded-[2rem] p-6 md:p-10 shadow-sm overflow-hidden relative">
              <h3 className="font-bold text-2xl text-tertiary mb-4">2. Phân tích cơ chế — Một dạng "Thuốc phiện tinh thần" mới</h3>
              <div className="p-4 bg-tertiary/5 border-l-4 border-tertiary rounded-r-xl mb-5">
                <p className="font-semibold text-on-surface">Khẳng định: Đây chính xác là một dạng "thuốc phiện tinh thần" mới trong bối cảnh hiện đại.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-highest p-5 rounded-2xl">
                  <h4 className="font-bold text-tertiary mb-2">Cơ chế ru ngủ (Sự đền bù hư ảo)</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Các khóa học dạy "chỉ cần ngồi im và gửi tín hiệu vào vũ trụ" cung cấp một <strong>chức năng đền bù hư ảo</strong> cho những mất mát thực tế (tiền tài, tình yêu). Nó đánh trúng vào tâm lý muốn có kết quả mà không phải lao động, cải tạo thực tiễn.
                  </p>
                </div>
                <div className="bg-surface-container-highest p-5 rounded-2xl">
                  <h4 className="font-bold text-tertiary mb-2">Tách rời thực tiễn và tha hóa</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Theo triết học Mác - Lênin, con người chỉ có thể phát triển và giải quyết vấn đề thông qua <strong>hoạt động thực tiễn</strong>. Trào lưu này khuyên con người trốn tránh thực tiễn ("ngồi im"), làm nhụt ý chí vươn lên. Hậu quả là người học rơi vào ảo tưởng, xa rời thực tế, thậm chí hình thành hệ tư tưởng sai lệch, chê bai những người lao động chân chính là "tần số thấp". Đây là <strong>sự tha hóa tinh thần</strong>, biến con người thành nô lệ cho những ảo ảnh do chính các nhà "thương mại hóa nỗi đau" tạo ra nhằm trục lợi.
                  </p>
                </div>
                <div className="p-4 bg-surface-container-highest border border-outline-variant rounded-xl">
                  <h4 className="font-bold text-tertiary mb-2 text-sm uppercase tracking-wide">Câu hỏi vận dụng 2 — Đây có phải "thuốc phiện tinh thần" mới không?</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    <strong>Có.</strong> Tôn giáo hay các niềm tin hư ảo là sự phản ánh hư ảo vào đầu óc con người về những sức mạnh trần thế. Nguồn gốc của nó là do sự bất lực của con người trước những áp lực, thất bại trong xã hội. Trào lưu "chữa lành" hiện đại vận hành theo đúng cơ chế này: ru ngủ người dùng bằng ảo tưởng để họ không đứng dậy đấu tranh thay đổi hoàn cảnh thực tế.
                  </p>
                </div>
              </div>
            </div>

            {/* Kịch bản Video */}
            <div className="bg-surface-container-highest border border-outline-variant rounded-[2rem] p-6 md:p-10 shadow-inner">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-2xl text-on-surface flex items-center gap-2">
                  <Play className="text-error" /> Phim ngắn: "Tần số thấp và Hóa đơn từ Vũ trụ"
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-background p-4 rounded-xl border border-outline-variant/30">
                  <h4 className="font-bold text-primary mb-2">Phân cảnh 1: Sự sợ hãi</h4>
                  <p className="text-sm text-on-surface-variant">
                    Sinh viên A khóc lóc vì điểm F và chia tay người yêu. Master "Vũ Trụ" xuất hiện đánh trúng tâm lý bất lực: "Con đang bị kẹt ở tần số thấp! Chỉ với 20 triệu, ta sẽ dạy con cách ngồi im, gửi tín hiệu để vũ trụ ship ngay bằng Giỏi và người yêu mới tới tận cửa!". A quẹt thẻ cái rụp vì sợ hãi thực tại và thèm khát chức năng đền bù hư ảo.
                  </p>
                </div>
                <div className="bg-background p-4 rounded-xl border border-outline-variant/30">
                  <h4 className="font-bold text-tertiary mb-2">Phân cảnh 2: Sự tha hóa và Ảo tưởng</h4>
                  <p className="text-sm text-on-surface-variant">
                    1 tháng sau, bạn B đi làm thêm (mặc đồ phục vụ) về rủ A đi học bài. A đang ngồi thiền, tay chắp hình hoa sen, khinh khỉnh đáp: "Tớ đang kết nối năng lượng cõi trên, không quan tâm dăm ba cái điểm số. Cậu đi làm công ăn lương là người 'tần số thấp', tớ giờ có siêu năng lực rồi!". B lắc đầu ngán ngẩm.
                  </p>
                </div>
                <div className="bg-background p-4 rounded-xl border border-outline-variant/30">
                  <h4 className="font-bold text-error mb-2">Phân cảnh 3: Sự thật thực tiễn thức tỉnh</h4>
                  <p className="text-sm text-on-surface-variant">
                    Bưu tá đến gõ cửa. A háo hức tưởng vũ trụ gửi tiền tài, mở ra lại là giấy báo nợ thẻ tín dụng 20 triệu và giấy cảnh báo buộc thôi học. A suy sụp gọi Master thì thuê bao. B vỗ vai A, đưa cuốn Giáo trình Triết học: "Sự bất lực trước hiện thực đẻ ra lòng tin vào phép màu. Vũ trụ không ship thứ gì nếu cậu không lao động. Tỉnh lại đi, các khóa học đó chỉ là thuốc phiện tinh thần thôi!"
                  </p>
                </div>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="mt-8 relative group aspect-video bg-black rounded-3xl overflow-hidden ring-1 ring-outline-variant/50 shadow-2xl flex items-center justify-center">
              <img
                src={animationThumbnail}
                alt="Animation Thumbnail: Tần số thấp và Hóa đơn từ Vũ trụ"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Play className="text-white w-8 h-8 ml-1" />
                </div>
                <p className="text-white font-bold text-lg">Chờ ghép Video của Nhóm</p>
              </div>
            </div>

          </div>
        </motion.section>

      </main>
    </div>
  );
}
