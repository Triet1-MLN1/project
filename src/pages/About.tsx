import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, bounce: 0.2 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className="pt-0 pb-12 overflow-hidden flex-grow flex flex-col bg-background selection:bg-secondary/20 selection:text-secondary">
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden" animate="visible" variants={staggerContainer}
        className={`relative w-full overflow-hidden shadow-xl mb-32 border-b ${isDark ? 'bg-surface-container-high border-outline-variant/10 text-on-surface' : 'bg-gradient-to-br from-[#102918] via-primary to-primary-container text-white border-white/10'}`}
      >
        {/* Decorative image spanning right side */}
        <div className={`absolute top-0 right-0 w-full md:w-1/2 h-full ${isDark ? 'opacity-40 mix-blend-screen grayscale' : 'opacity-20 md:opacity-30 mix-blend-overlay'}`}>
          <img className="w-full h-full object-cover" alt="Modern library interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_hLgFtFwy9oZy1UnbsZ22hYu7PknhalqDqGmWhwAaFGJGlax7Nh6NjnRTe3BdV8e6k16VQrmw6vm_XUebXVkBlXBQPis0zqR6XzuJ6YWQY-dZF2ZUN-03G60lgzlZGHyMRkFC6vA_XNMeTJMUKwTOcncRKeyqX6uKWneYPBUwI3SjjllSrwBdkjFfFCrnTT3tD6leJDkTkbioK1iGlHd81HWDNlXZc9jyBjwOqTgj2RGn2oDPZheYYcrRwBcLQMPF6zoy3zeMf-Dg" />
          <div className={`absolute inset-0 to-transparent md:bg-none bg-gradient-to-r ${isDark ? 'from-surface-container-high' : 'from-primary'}`}></div>
        </div>
        
        {/* Pattern glow blob */}
        <div className={`absolute -bottom-40 left-[-10%] w-[40rem] h-[40rem] rounded-full blur-[100px] pointer-events-none mix-blend-screen ${isDark ? 'bg-primary/5' : 'bg-primary-fixed/25'}`}></div>

        <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 md:pt-40 md:pb-36 relative z-10 w-full flex items-center">
          <motion.div variants={fadeInUp} className="max-w-3xl">
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-headline font-bold leading-[1.1] mb-8 tracking-tight ${isDark ? 'text-on-surface' : 'text-white text-glow drop-shadow-md'}`}>
                {/* Đã đổi từ Triết học sang Kinh tế chính trị học theo yêu cầu */}
                Nền tảng hỗ trợ học tập Kinh tế chính trị học Mác – Lênin
            </h1>
            <p className={`text-lg md:text-2xl font-light leading-relaxed mb-10 max-w-2xl ${isDark ? 'text-on-surface-variant' : 'text-white/90 drop-shadow-sm'}`}>
                Giúp sinh viên tiếp cận kiến thức một cách trực quan, dễ hiểu và tương tác hơn thông qua hệ sinh thái số hiện đại.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className={`px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg border border-transparent ${isDark ? 'bg-secondary text-on-secondary hover:border-outline-variant/30' : 'bg-secondary text-white hover:bg-secondary/90 hover:border-white/20'}`}>
                  Khám phá ngay
              </button>
              <button className={`backdrop-blur-md px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg border ${isDark ? 'bg-surface-variant/30 border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface' : 'bg-white/5 border-white/40 hover:bg-white/20 text-white'}`}>
                  Xem sơ đồ
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-32"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Về chúng tôi</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8 tracking-tight">Số hóa tri thức,<br/><span className="text-on-surface">giải phóng tư duy</span></h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              {/* Đã đổi từ Triết học sang Kinh tế chính trị học và thêm trọng tâm Chương 6 theo yêu cầu */}
              <p>Human Liberation Lab ra đời với sứ mệnh đồng hành cùng sinh viên trong việc chinh phục các học phần Kinh tế chính trị học Mác – Lênin (đặc biệt là Chương 6: Công nghiệp hóa, hiện đại hóa và hội nhập kinh tế quốc tế của Việt Nam). Chúng tôi tin rằng những kiến thức nền tảng về thế giới quan và phương pháp luận không nên là gánh nặng ghi nhớ, mà là công cụ để hiểu về thế giới.</p>
              <p>Thông qua việc kết hợp giữa lý thuyết hàn lâm, trò chơi tương tác (gamification) và hệ thống trắc nghiệm thông minh, chúng tôi tạo ra một môi trường học tập không áp lực, nơi mỗi khái niệm trở nên sống động và gần gũi.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <div className="bg-surface-variant/30 p-8 rounded-[2rem] relative overflow-hidden aspect-[4/3] lg:aspect-square flex items-center justify-center border border-outline-variant/30 shadow-inner group">
              <img className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-[1.5s]" alt="Books and Glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmA8rgD6e8hwozN9I-HUFmefKqEcfqj_KUVqTyqM-rDrUwm4enXjmVZpJibrRHQ3XgkSWHno_rD0wlRbOCmp6WhhOqHLp0tVLm-BUZ-fW5dSGzQweHX8d6EYwO0UJX2euztD3hzZzR91KN_x0kGmOUSB7Qza1pv7YqC83isZ4Jbsgg1Z9rhZ0M8ZxbSnwh4kUpHbWLrrlN1XNyToEacmnxuUogh8IxVsUp0SbM90fZmkA-Niw6vdnAwxprc4RgptXcZoU5HFYrOb4E" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Goals (Bento Grid) */}
      <section className="px-8 mb-32 bg-surface-container-lowest py-28 relative overflow-hidden border-y border-outline-variant/10">
        <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
            className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div variants={fadeInUp} className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-6 tracking-tight">Mục tiêu chiến lược</h2>
            <p className="text-on-surface-variant text-lg">Chúng tôi định hình lại trải nghiệm học tập thông qua 4 trụ cột cốt lõi.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-surface p-10 rounded-[2rem] shadow-sm border border-outline-variant/20 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 text-secondary">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface tracking-tight">Trực quan hóa kiến thức</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed">Chuyển đổi những khái niệm trừu tượng thành sơ đồ tư duy và hình ảnh sinh động, giúp bộ não ghi nhớ nhanh gấp 3 lần.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-primary text-on-primary p-10 rounded-[2rem] shadow-lg hover:-translate-y-2 hover:shadow-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white">
                  <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">Cá nhân hóa AI</h3>
              <p className="opacity-90 leading-relaxed font-medium">Lộ trình học tập được thiết kế riêng dựa trên năng lực và tốc độ tiếp thu của từng cá nhân.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-surface p-10 rounded-[2rem] shadow-sm border border-outline-variant/20 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center mb-8 text-tertiary">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-on-surface tracking-tight">Tư duy tự chủ</h3>
              <p className="text-on-surface-variant leading-relaxed">Khuyến khích sinh viên tự nghiên cứu và phản biện thay vì học thuộc lòng máy móc.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-secondary text-on-secondary p-10 rounded-[2rem] shadow-lg hover:-translate-y-2 hover:shadow-secondary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white">
                  <span className="material-symbols-outlined text-3xl">extension</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Sinh động hóa lý luận</h3>
              <p className="opacity-90 leading-relaxed text-lg">Biến những mảng kiến thức khô khan thành những thử thách thú vị trong các trò chơi logic, gắn liền với thực tiễn.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AI Technology */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-32"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <motion.div variants={fadeInUp} className="md:w-1/2 order-2 md:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface-container aspect-square rounded-[2rem] flex items-center justify-center p-6 border border-outline-variant/20 shadow-sm overflow-hidden pointer-events-none">
                <img className="w-full h-full object-cover rounded-2xl" alt="AI Neural Net" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy9aUH1mkODJnf3L8XC28dH_PpZ1wNExIlYNeFvjR3DpCT1xtlhgZNPbdIKa58VDyn1txiwZu6ILqOic81Ds2FrTN1UIfArb_M0S1xe9GOPeSCJmXNUUwEtgP19UtfPFZghkdMpX9dCRiy8Lfs5S-t-aaP01yz7apz-cL6-hyeiMDlzqOpNd_R_OGdaZA17GHve_QGDC0BoTnNlKYgPoiL8GA8YlXb1o3XWk3XlFjf8PGkHJ6fGFraxjEoTUHaNj3zuWTc4AmHH1SA" />
              </div>
              <div className="bg-primary text-on-primary aspect-square rounded-[2rem] flex flex-col justify-center items-center p-8 shadow-2xl text-center hover:scale-105 transition-transform duration-500">
                <div className="text-5xl lg:text-7xl font-headline font-extrabold mb-4 text-glow">99%</div>
                <div className="text-xs uppercase tracking-[0.25em] font-bold opacity-80 leading-relaxed px-4">Độ chính xác dữ liệu</div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8 tracking-tight">Công nghệ AI đột phá</h2>
            <div className="space-y-8 text-on-surface-variant leading-relaxed text-lg">
              <div className="flex gap-5 items-start">
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-3 rounded-2xl shrink-0 text-3xl">memory</span>
                  <p><strong className="text-on-surface block mb-2 text-xl font-bold">Gemini Flash 2.5</strong> Sử dụng mô hình ngôn ngữ lớn mới nhất để xử lý câu hỏi và giải đáp thắc mắc của sinh viên một cách tự nhiên và chính xác.</p>
              </div>
              <div className="flex gap-5 items-start">
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl shrink-0 text-3xl">database</span>
                  <p><strong className="text-on-surface block mb-2 text-xl font-bold">RAG Framework</strong> Công nghệ truy xuất dữ liệu từ giáo trình chuẩn hóa, đảm bảo câu trả lời của AI luôn dựa trên nguồn gốc tin cậy, tránh hiện tượng "ảo giác".</p>
              </div>
              <div className="p-8 bg-surface-variant/30 border-l-[6px] border-secondary rounded-2xl italic text-on-surface">
                  "Chúng tôi cam kết minh bạch trong thuật toán và chỉ sử dụng nguồn dữ liệu đã được kiểm chứng bởi các chuyên gia giáo dục để đào tạo AI."
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Ecosystem Features (Cards) */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-32"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-16 text-center tracking-tight">Hệ sinh thái tính năng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'account_tree', title: 'Mind Map', desc: 'Hệ thống sơ đồ tư duy phân cấp, giúp nắm bắt cấu trúc toàn chương chỉ trong 5 phút.', delay: 0.1 },
                { icon: 'quiz', title: 'Thông minh Quizzes', desc: 'Ngân hàng câu hỏi trắc nghiệm đa dạng với lời giải chi tiết và phân tích lỗ hổng kiến thức.', delay: 0.2 },
                { icon: 'sports_esports', title: 'Mini Games', desc: 'Các trò chơi logic giúp ôn tập thuật ngữ và sự kiện lịch sử một cách hào hứng.', delay: 0.3 },
                { icon: 'smart_toy', title: 'AI Assistant', desc: 'Trợ lý ảo túc trực 24/7 để giải đáp mọi thắc mắc về khái niệm và tiểu luận.', delay: 0.4 },
              ].map((feat, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="group bg-surface p-10 rounded-[2rem] shadow-sm border border-outline-variant/20 hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="mb-8 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                      <span className="material-symbols-outlined text-4xl">{feat.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-4 text-on-surface tracking-tight">{feat.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed text-base">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>

      {/* Vision */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-32"
      >
        <div className={`max-w-5xl mx-auto text-center p-16 md:p-24 rounded-[3rem] relative overflow-hidden shadow-2xl ${isDark ? 'bg-surface-container text-on-surface border border-outline-variant/20' : 'bg-inverse-surface text-inverse-on-surface'}`}>
          <motion.div variants={fadeInUp} className="relative z-10">
            <span className={`font-bold tracking-[0.3em] uppercase text-xs mb-8 block opacity-90 ${isDark ? 'text-secondary' : 'text-secondary-fixed'}`}>Tầm nhìn 2030</span>
            <h2 className={`text-4xl md:text-5xl lg:text-5xl font-headline font-bold mb-10 leading-[1.2] ${isDark ? 'text-on-surface' : 'text-white'}`}>
                {/* Đã đổi từ triết học sang Kinh tế chính trị học theo yêu cầu */}
                Trở thành nền tảng học tập<br className="hidden md:block"/> Kinh tế chính trị học số 1 tại Việt Nam
            </h2>
            <p className={`text-xl md:text-2xl opacity-80 leading-relaxed max-w-3xl mx-auto mb-12 font-light ${isDark ? 'text-on-surface-variant' : ''}`}>
                Chúng tôi không chỉ dừng lại ở một trang web học tập, mà hướng tới xây dựng một cộng đồng học thuật số năng động, nơi tri thức được chia sẻ và phát triển không ngừng.
            </p>
            <div className={`inline-block h-1.5 w-32 rounded-full ${isDark ? 'bg-secondary' : 'bg-secondary-fixed shadow-[0_0_20px_rgba(255,207,43,0.5)]'}`}></div>
          </motion.div>
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent pointer-events-none ${isDark ? 'from-primary/5' : 'from-primary-fixed/20'}`}></div>
        </div>
      </motion.section>

      {/* Transparency Commitment */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-20"
      >
        <div className="max-w-7xl mx-auto bg-surface-container p-10 md:p-14 rounded-[3rem] flex flex-col md:flex-row items-center gap-16 border border-outline-variant/30 shadow-sm hover:border-primary/30 transition-colors">
          <motion.div variants={fadeInUp} className="md:w-1/4 flex justify-center shrink-0">
             <div className="w-40 h-40 bg-secondary/10 flex items-center justify-center rounded-full text-secondary shadow-inner relative">
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
                <span className="material-symbols-outlined text-[5rem]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
             </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="md:w-3/4">
              <h2 className="text-4xl font-headline font-bold text-primary mb-6 tracking-tight">Cam kết minh bạch</h2>
              <p className="text-on-surface-variant mb-10 text-xl font-light">Chúng tôi hiểu rằng việc sử dụng trí thông minh nhân tạo trong giáo dục cần đi đôi với trách nhiệm. Human Liberation Lab cam kết:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  'Không xuyên tạc nội dung giáo trình chính thống được phê duyệt.',
                  'Ghi rõ nguồn trích dẫn đối với mọi thông tin học thuật đưa ra.',
                  'Bảo mật tuyệt đối thông tin và dữ liệu lịch sử người dùng.',
                  'Liên tục cập nhật và sửa lỗi dựa trên phản hồi của sinh viên.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                      <span className="text-on-surface leading-relaxed text-lg font-medium opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
}
