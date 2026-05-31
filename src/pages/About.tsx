import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

/* --- Matrix Rain Component --- */
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'Tồn tại ý thức vật chất tinh thần 01'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array.from({ length: columns }).fill(1) as number[];

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff2a55'; // Neon Red
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none"
    />
  );
};

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

/* --- Protocol Selector Component --- */
const ProtocolSelector = () => {
  const [active, setActive] = useState(0);
  
  const protocols = [
    {
      id: "P-01",
      icon: "visibility",
      title: "Trực quan hóa cấu trúc",
      desc: "Chuyển đổi những khái niệm trừu tượng thành sơ đồ tư duy không gian đa chiều, nạp thẳng vào não bộ nhanh gấp 3 lần.",
      color: "text-tertiary",
      bg: "bg-tertiary/10",
      border: "border-tertiary/30",
      glow: "shadow-[0_0_30px_rgba(0,240,255,0.2)]"
    },
    {
      id: "P-02",
      icon: "auto_awesome",
      title: "Cá nhân hóa bằng AI",
      desc: "Thuật toán thiết kế riêng lộ trình học tập, tối ưu hóa tốc độ nạp dữ liệu cho từng người.",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      glow: "shadow-[0_0_30px_rgba(255,42,85,0.2)]"
    },
    {
      id: "P-03",
      icon: "psychology",
      title: "Tư duy phản biện",
      desc: "Khuyến khích sinh viên tự \"debug\" các vấn đề xã hội thay vì học vẹt.",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/30",
      glow: "shadow-[0_0_30px_rgba(252,226,5,0.15)]"
    },
    {
      id: "P-04",
      icon: "terminal",
      title: "Sinh động hóa lý luận",
      desc: "Hệ thống hóa bài tập thành dạng trò chơi logic sinh tồn, đưa lý thuyết vào thực tiễn.",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/30",
      glow: "shadow-[0_0_30px_rgba(252,226,5,0.15)]"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[400px]">
      {/* Left sidebar - tabs */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        {protocols.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActive(idx)}
            className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
              active === idx 
                ? `${p.bg} ${p.border} ${p.color} ${p.glow} scale-105 translate-x-2` 
                : 'bg-surface-variant/30 border-transparent text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface hover:translate-x-1'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${active === idx ? 'bg-background/50' : 'bg-surface-variant'}`}>
              <span className="material-symbols-outlined text-2xl">{p.icon}</span>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{p.id}</div>
              <div className="font-bold">{p.title}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Right side - content */}
      <div className="lg:w-2/3 relative h-[400px] lg:h-auto">
        <div className={`absolute inset-0 border border-outline-variant/20 rounded-[2rem] bg-surface p-8 md:p-12 overflow-hidden flex flex-col justify-center transition-all duration-500`}>
          {/* Decorative background lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, var(--color-on-surface) 25%, var(--color-on-surface) 26%, transparent 27%, transparent 74%, var(--color-on-surface) 75%, var(--color-on-surface) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--color-on-surface) 25%, var(--color-on-surface) 26%, transparent 27%, transparent 74%, var(--color-on-surface) 75%, var(--color-on-surface) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
          
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[200px]">{protocols[active].icon}</span>
          </div>
          
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg ${protocols[active].bg} ${protocols[active].color} font-bold mb-6`}>
              <span className="material-symbols-outlined text-2xl">{protocols[active].icon}</span>
              PROTOCOL {protocols[active].id} ONLINE
            </div>
            <h3 className={`text-4xl md:text-5xl font-headline font-bold mb-6 ${protocols[active].color} tracking-tight glitch-effect`}>
              {protocols[active].title}
            </h3>
            <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed">
              {protocols[active].desc}
            </p>
            
            <div className={`mt-12 flex gap-2 ${protocols[active].color} opacity-60`}>
              <div className="h-1.5 w-16 bg-current rounded-full"></div>
              <div className="h-1.5 w-4 bg-current rounded-full"></div>
              <div className="h-1.5 w-2 bg-current rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const { theme } = useTheme();
  
  return (
    <main className="pt-0 pb-12 overflow-hidden flex-grow flex flex-col bg-background selection:bg-primary/30 selection:text-primary">
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden" animate="visible" variants={staggerContainer}
        className="relative w-full h-[80vh] min-h-[600px] overflow-hidden shadow-2xl mb-32 border-b border-primary/20"
      >
        <MatrixRain />
        
        <div className="absolute top-0 right-0 w-full md:w-3/5 h-full opacity-30 dark:opacity-60 z-10">
          <img className="w-full h-full object-cover" alt="Cyberpunk Matrix Metropolis" src="/src/public/about_hero_cyberpunk.png" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        {/* Glow */}
        <div className="absolute -bottom-40 left-[-10%] w-[40rem] h-[40rem] rounded-full blur-[100px] pointer-events-none mix-blend-screen bg-primary/10 z-0"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-20 w-full h-full flex items-center">
          <motion.div variants={fadeInUp} className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-widest rounded-md mb-6 glitch-effect">
              Hệ thống truy xuất dữ liệu tối cao
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] mb-8 tracking-tight text-on-surface glitch-effect">
                Hack Não <br/><span className="text-primary">Triết Học</span>
            </h1>
            <p className="text-lg md:text-2xl font-light leading-relaxed mb-10 max-w-2xl text-on-surface-variant">
                Giải mã ý thức xã hội, số hóa tồn tại khách quan. Không còn là lý thuyết suông, đây là một hệ sinh thái mô phỏng thực tại.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,42,85,0.4)] hover:-translate-y-1 active:scale-95 text-lg border border-transparent bg-primary text-on-primary hover:border-primary/50 glitch-effect">
                  Xâm nhập hệ thống
              </button>
              <button className="backdrop-blur-md px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 active:scale-95 text-lg border bg-surface-variant/30 border-outline-variant/50 hover:bg-surface-variant/50 text-on-surface">
                  Xem nguồn gốc dữ liệu
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-32 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-50 animate-pulse pointer-events-none"></div>
            <div className="bg-surface/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-primary/30 shadow-[0_0_50px_rgba(255,42,85,0.15)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[100px] text-primary">data_object</span>
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest rounded-md mb-6 border border-secondary/30">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                Giao thức Marxist Hub
              </div>
              
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-8 tracking-tight uppercase">
                Số hóa tri thức,<br/><span className="text-primary glitch-effect">Giải phóng tư duy</span>
              </h2>
              
              <div className="space-y-6 text-on-surface-variant font-body leading-relaxed text-lg relative z-10">
                <p className="pl-4 border-l-4 border-primary">
                  Marxist Hub không phải là một "nhà trường ảo". Đây là mạng lưới kết nối của những bộ óc tư duy phản biện, được lập trình để phá vỡ những rào cản nhận thức sáo rỗng về Triết học (đặc biệt là Tồn tại xã hội và Ý thức xã hội).
                </p>
                <p className="pl-4 border-l-4 border-tertiary">
                  Chúng tôi kết hợp trí tuệ nhân tạo, thiết kế Cyberpunk và hệ thống nhiệm vụ Gamification để nâng cấp nhận thức của bạn. Triết học không còn là văn bản chết, mà là mã code vận hành xã hội.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/20 to-primary/20 rounded-[2rem] transform rotate-3 scale-105 border border-white/5 opacity-50 transition-transform group-hover:rotate-6"></div>
            <div className="bg-surface-variant/20 p-2 rounded-[2rem] relative overflow-hidden h-full flex items-center justify-center border border-primary/20 shadow-[0_0_40px_rgba(255,42,85,0.2)] z-10 backdrop-blur-sm group">
              <img className="w-full h-full object-cover rounded-[1.5rem] opacity-90 contrast-125 saturate-150 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" alt="Digitized Brain" src="/src/public/about_concept_cyberpunk.png" />
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay"></div>
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Goals - Interactive Terminal */}
      <section className="px-8 mb-32 bg-surface-container-lowest py-28 relative overflow-hidden border-y border-outline-variant/10">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(var(--color-primary) 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-variant/30 text-primary text-xs font-bold uppercase tracking-widest rounded-md mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Core Protocols
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface mb-6 tracking-tight glitch-effect">Mục tiêu chiến lược</h2>
            <p className="text-on-surface-variant text-lg">Định hình lại cách thức nạp dữ liệu triết học qua 4 giao thức cốt lõi.</p>
          </motion.div>
          
          <ProtocolSelector />
        </div>
      </section>

      {/* AI Technology */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="px-8 mb-32 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tertiary/5 to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
              <motion.div variants={fadeInUp} className="lg:w-5/12 order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary/20 to-transparent blur-3xl rounded-full"></div>
                <div className="relative group">
                  <div className="absolute inset-0 border-[6px] border-tertiary/30 rounded-full animate-[spin_10s_linear_infinite] border-t-tertiary"></div>
                  <div className="absolute inset-4 border-[4px] border-primary/30 rounded-full animate-[spin_15s_linear_infinite_reverse] border-b-primary"></div>
                  <img className="w-full aspect-square object-cover rounded-full p-8 relative z-10 opacity-90 saturate-150 contrast-125 group-hover:scale-105 transition-transform duration-500" alt="AI Neural Net" src="/src/public/home_hero_cyberpunk.png" />
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <span className="text-4xl font-black text-white mix-blend-overlay drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] tracking-[0.2em] glitch-effect">99.9%</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="lg:w-7/12 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-widest rounded-md mb-6 border border-tertiary/30">
                  <span className="material-symbols-outlined text-sm">memory</span>
                  Core System
                </div>
                
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mb-10 tracking-tight uppercase">
                  Hệ lõi <span className="text-tertiary glitch-continuous drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">AI Mentor</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-surface/50 border border-outline-variant/10 p-6 rounded-2xl flex gap-6 items-center hover:bg-surface hover:border-tertiary/30 transition-all group shadow-sm">
                    <div className="w-16 h-16 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                      <span className="material-symbols-outlined text-3xl text-tertiary">memory</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface mb-2 uppercase tracking-wide">Mô hình ngôn ngữ đỉnh cao</h3>
                      <p className="text-on-surface-variant leading-relaxed">Trí tuệ nhân tạo giải đáp các khúc mắc triết học như một hacker giàu kinh nghiệm.</p>
                    </div>
                  </div>
                  
                  <div className="bg-surface/50 border border-outline-variant/10 p-6 rounded-2xl flex gap-6 items-center hover:bg-surface hover:border-primary/30 transition-all group shadow-sm">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,42,85,0.1)]">
                      <span className="material-symbols-outlined text-3xl text-primary">database</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface mb-2 uppercase tracking-wide">Giao thức RAG</h3>
                      <p className="text-on-surface-variant leading-relaxed">Truy xuất dữ liệu trực tiếp từ các dòng code giáo trình gốc, miễn nhiễm tuyệt đối với thông tin "ảo giác" (hallucination).</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 bg-gradient-to-r from-primary/20 to-transparent border-l-4 border-primary rounded-r-xl">
                  <p className="text-xl md:text-2xl font-headline italic font-bold text-on-surface opacity-90">
                    "Chúng tôi không dạy bạn cách thuộc bài, chúng tôi trang bị cho bạn hệ điều hành tư duy mới."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
