import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  Cpu,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Giới Thiệu', href: '/about' },
  { label: 'Đào Tạo', href: '/programs' },
  { label: 'Thư Viện Số', href: '/resources' },
  { label: 'Góc AI', href: '/ai-playground' },
  { label: 'Liên Hệ', href: '/contact' },
];

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass-nav shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center shadow-lg group-hover:shadow-navy-500/30 transition-all duration-300">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-crimson-500 border-2 border-white dark:border-gray-950" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-navy-900 dark:text-white leading-tight tracking-tight">
                  HU-Idter
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight font-medium">
                  Viện Chuyển đổi số & Học liệu
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'text-navy-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80'
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-navy-100/80 dark:bg-navy-900/50 border border-navy-200/60 dark:border-navy-700/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* CTA Button - Desktop */}
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 dark:bg-navy-700 text-white text-sm font-semibold hover:bg-navy-800 dark:hover:bg-navy-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Đăng ký tư vấn
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-950 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-navy-900 dark:bg-navy-700 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-navy-900 dark:text-white text-sm">HU-Idter</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          'flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive(item.href)
                            ? 'bg-navy-100 dark:bg-navy-900/50 text-navy-900 dark:text-white border border-navy-200 dark:border-navy-700/60'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                        )}
                      >
                        {item.label}
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Footer */}
                <div className="px-4 pb-6 space-y-3">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-navy-900 dark:bg-navy-700 text-white text-sm font-semibold hover:bg-navy-800 transition-all duration-200"
                  >
                    Đăng ký tư vấn
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                    📞 0835 534 535
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
