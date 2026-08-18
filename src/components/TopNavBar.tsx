import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Sparkles, Sun, Moon, Menu, X, BookOpen, Trophy, GraduationCap, Info, Home } from 'lucide-react';

export default function TopNavBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { path: '/', label: 'Trang Chủ', icon: Home },
    { path: '/theory', label: 'Lý Luận', icon: BookOpen },
    { path: '/game', label: 'Đấu Trường Game', icon: Trophy },
    { path: '/quiz', label: 'Quiz', icon: GraduationCap },
    { path: '/about', label: 'Giới Thiệu', icon: Info },
  ];

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm"
      >
        <div className="flex justify-between items-center px-6 lg:px-12 py-3.5 w-full max-w-full">
          <Link to="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-primary font-headline block leading-tight">
                Tư Tưởng HCM
              </span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block font-bold">
                HCM202 · Chương III
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 font-headline tracking-tight transition-all px-4 py-2 rounded-xl text-sm font-bold ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/30 shadow-sm'
                      : 'text-on-surface-variant border border-transparent hover:text-on-surface hover:bg-surface-variant/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-variant/50 hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-all border border-outline-variant/40"
              aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-surface-variant/50 hover:bg-surface-variant text-on-surface-variant transition-all border border-outline-variant/40"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] bg-surface/98 backdrop-blur-2xl border-b border-outline-variant z-40 p-6 md:hidden shadow-2xl flex flex-col gap-3"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-base transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
