export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 px-8 tonal-shift border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-bold text-on-surface font-headline mb-2">
            Human Liberation Lab
          </div>
          <p className="text-primary italic font-headline text-lg tracking-wide hidden md:block">
            "Đứng đầu có thực sự là tự do?"
          </p>
          <div className="text-on-surface-variant font-body text-sm tracking-wide mt-4">
            {/* Đã đổi từ triết học sang Kinh tế chính trị học theo yêu cầu */}
            ©2026 Nền tảng học tập và giải trí về Kinh tế chính trị học Mác–Lênin. Được phát triển bởi Human Liberation Lab.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide">
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 focus:ring-2 focus:ring-primary" href="#">
            Quyền riêng tư
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 focus:ring-2 focus:ring-primary" href="#">
            Tuyên ngôn
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 focus:ring-2 focus:ring-primary" href="#">
            Liên hệ
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 focus:ring-2 focus:ring-primary" href="#">
            Quyên góp
          </a>
        </div>
      </div>
    </footer>
  );
}
