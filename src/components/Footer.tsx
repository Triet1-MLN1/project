import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface/50 w-full pt-12 pb-8 px-6 lg:px-12 border-t border-outline-variant/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-headline font-bold text-lg text-on-surface uppercase tracking-tight">
              Tư Tưởng Hồ Chí Minh
            </span>
          </div>
          <p className="text-on-surface-variant text-xs md:text-sm max-w-md leading-relaxed">
            Chương III: Tư tưởng Hồ Chí Minh về mục tiêu và động lực của chủ nghĩa xã hội ở Việt Nam · HCM202 - Nhóm 1.
          </p>
        </div>

        <div className="text-xs text-on-surface-variant text-center md:text-right space-y-1">
          <div>Học phần Lý luận Chính trị · Môn học HCM202</div>
          <div className="opacity-70">Thực hiện với tinh thần liêm chính học thuật và đổi mới sáng tạo.</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center text-xs text-outline gap-2">
        <div>© 2026 Nhóm 1 - HCM202. All rights reserved.</div>
        <div className="flex items-center gap-1">
          Dựng xây non sông Việt Nam giàu đẹp, văn minh
        </div>
      </div>
    </footer>
  );
}
