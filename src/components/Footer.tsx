export default function Footer() {
  return (
    <footer className="bg-background w-full pt-16 pb-8 px-8 border-t border-outline-variant/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12 relative z-10">
        <div className="md:col-span-5 flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold text-on-surface font-headline mb-4 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse"></div>
              <img src="/triet_hoc_logo.png" alt="Marxist Hub Logo" className="w-10 h-10 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,42,85,0.8)]" />
            </div>
            <span className="uppercase tracking-tighter glitch-continuous">Marxist Hub</span>
          </div>
          
          <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 text-center md:text-left max-w-sm">
            Hệ thống đào tạo Triết học Mác-Lênin ứng dụng Gamification & Trí tuệ nhân tạo. Tái lập trình tư duy, giải mã hiện thực khách quan.
          </p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-tertiary/10 border border-tertiary/20 rounded-md">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
            <span className="text-tertiary text-xs font-bold uppercase tracking-widest">System Online - v2.4.1</span>
          </div>
        </div>
        
        <div className="md:col-span-7 flex flex-wrap md:flex-nowrap justify-between gap-8 md:gap-16">
          <div className="w-full md:w-auto">
            <h4 className="text-on-surface font-bold uppercase tracking-widest text-xs mb-6 opacity-50">Truy xuất</h4>
            <div className="flex flex-col gap-4 text-sm font-body font-medium">
              <a href="/theory" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                Dữ liệu Lý thuyết
              </a>
              <a href="/game" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                Giả lập Sinh tồn
              </a>
              <a href="/quiz" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                Trạm Kiểm tra
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <h4 className="text-on-surface font-bold uppercase tracking-widest text-xs mb-6 opacity-50">Giao thức</h4>
            <div className="flex flex-col gap-4 text-sm font-body font-medium">
              <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-3 h-[2px] bg-secondary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                Mã nguồn Tuyên ngôn
              </a>
              <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-3 h-[2px] bg-secondary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                Bảo mật Nhận thức
              </a>
              <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-3 h-[2px] bg-secondary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                Cổng Kết nối (Liên hệ)
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body opacity-40">
        <div>© 2026 Marxist Hub. All nodes secured.</div>
        <div className="flex gap-4 uppercase tracking-[0.2em] text-center">
          <span>Design by Marxist Hub</span>
          <span className="hidden md:inline">//</span>
          <span>Cyber-Philosophy</span>
        </div>
      </div>
    </footer>
  );
}
