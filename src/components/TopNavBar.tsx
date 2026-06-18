import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
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
    { path: '/', label: 'Home' },
    { path: '/theory', label: 'Theory' },
    { path: '/game', label: 'Game' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/about', label: 'About' },
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
        className="fixed top-0 w-full z-50 tonal-shift bg-surface-container/80 backdrop-blur-xl border-b border-outline-variant/20"
      >
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-full">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/triet_hoc_logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg" />
            <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter text-primary font-headline glitch-continuous">
              Marxist Hub
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`font-headline tracking-tight transition-all duration-300 px-3 py-1.5 rounded-lg border uppercase text-sm font-bold ${isActive
                    ? 'text-primary bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(255,42,85,0.3)]'
                    : 'text-on-surface-variant border-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/20 hover:shadow-[0_0_10px_rgba(255,42,85,0.1)]'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-all"
              aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            {/* Settings */}
            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-all"
              aria-label="Cài đặt"
              title="Cài đặt"
            >
              <span className="material-symbols-outlined text-xl">
                settings
              </span>
            </button>
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-all"
              aria-label="Menu"
              title="Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-[73px] left-0 w-full bg-surface-container/95 backdrop-blur-xl border-b border-outline-variant/20 z-40 md:hidden shadow-lg"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-headline tracking-tight transition-all duration-300 px-4 py-3 rounded-xl border uppercase text-sm font-bold text-center ${isActive
                      ? 'text-primary bg-primary/10 border-primary/50'
                      : 'text-on-surface-variant border-transparent hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
