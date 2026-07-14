import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cpu,
  Phone,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  ArrowUpRight,
  Heart,
  Share2,
  PlayCircle,
} from 'lucide-react';

const footerLinks = {
  about: [
    { label: 'Giới thiệu Viện', href: '/about' },
    { label: 'Sứ mệnh & Tầm nhìn', href: '/about#mission' },
    { label: 'Ban lãnh đạo', href: '/about#leaders' },
    { label: 'Lịch sử hoạt động', href: '/about#timeline' },
  ],
  programs: [
    { label: 'AI trong Hành chính', href: '/programs' },
    { label: 'AI trong Giáo dục', href: '/programs' },
    { label: 'Kỹ năng số LLVT', href: '/programs' },
    { label: 'CĐS Cấp xã', href: '/programs' },
  ],
  resources: [
    { label: 'Thư viện Tài liệu', href: '/resources' },
    { label: 'Góc Trải nghiệm AI', href: '/ai-playground' },
    { label: 'Liên hệ & Đăng ký', href: '/contact' },
  ],
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 dark:bg-black text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-navy-900/20 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-crimson-900/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-11 h-11 rounded-xl bg-navy-700 flex items-center justify-center shadow-lg">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-base leading-tight">HU-Idter</p>
                <p className="text-xs text-gray-400 font-medium leading-tight">
                  Viện Chuyển đổi số & Học liệu
                </p>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Đồng hành cùng địa phương, cơ quan ban ngành và các trường thành viên Đại học Huế để nâng cao năng lực số, thúc đẩy chuyển đổi số toàn diện.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a href="https://maps.google.com/?q=20+Le+Loi+Hue" target="_blank" rel="noreferrer"
                className="flex items-start gap-2.5 text-xs text-gray-400 hover:text-white transition-colors group">
                <MapPin className="w-3.5 h-3.5 text-crimson-500 mt-0.5 shrink-0" />
                <span className="group-hover:text-gray-200">20 Lê Lợi, Phường Thuận Hóa, TP. Huế</span>
              </a>
              <a href="tel:0835534535"
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
                <span>0835 534 535</span>
              </a>
              <a href="mailto:huidter@hueuni.edu.vn"
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
                <span>huidter@hueuni.edu.vn</span>
              </a>
              <a href="https://idter.hueuni.edu.vn/" target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white transition-colors">
                <Globe className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
                <span>idter.hueuni.edu.vn</span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/huidter"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Share2 className="w-3.5 h-3.5 text-gray-400 hover:text-blue-400" />
              </a>
              <a
                href="https://youtube.com/@huidter"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/40 flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <PlayCircle className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
              </a>
              <a
                href="https://idter.hueuni.edu.vn/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-navy-600/20 border border-white/10 hover:border-navy-500/40 flex items-center justify-center transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5 text-gray-400 hover:text-blue-300" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Về Viện
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Chương Trình
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Tài Nguyên
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Map embed mini */}
            <div className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=107.571%2C16.459%2C107.581%2C16.469&layer=mapnik&marker=16.464%2C107.576"
                className="w-full h-24"
                title="Bản đồ HU-Idter"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 flex items-center gap-1">
            © {currentYear} HU-Idter – Đại học Huế. Made with{' '}
            <Heart className="w-3 h-3 text-crimson-500 fill-crimson-500" />{' '}
            in Huế.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Chính sách bảo mật
            </a>
            <span className="text-gray-700">·</span>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Điều khoản sử dụng
            </a>
            <span className="text-gray-700">·</span>
            <a href="https://hueuni.edu.vn" target="_blank" rel="noreferrer"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1">
              Đại học Huế
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
