import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import mindmapImg from '../public/Mindmap MLN122.jpg';

export default function TopNavBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showMindmap, setShowMindmap] = useState(false);

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/theory', label: 'Lý thuyết' },
    { path: '/game', label: 'Game' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/about', label: 'Giới thiệu' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 tonal-shift bg-surface-container/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-full">
          <div className="text-2xl font-bold uppercase tracking-tighter text-on-surface font-headline">
            MLN122-SPST
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`font-headline tracking-tight transition-colors duration-300 ${isActive
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => setShowMindmap(true)}
              className="font-headline tracking-tight transition-colors duration-300 text-on-surface-variant hover:text-on-surface cursor-pointer focus:outline-none"
            >
              Mindmap
            </button>
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
          </div>
        </div>
      </nav>

      {/* Mindmap Modal */}
      <AnimatePresence>
        {showMindmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowMindmap(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMindmap(false)}
                className="absolute -top-12 right-0 md:-right-12 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                aria-label="Đóng mindmap"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={mindmapImg}
                alt="Mindmap MLN122"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
