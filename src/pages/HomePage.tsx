import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import {
  ArrowRight,
  Cpu,
  Users,
  BookOpen,
  TrendingUp,
  MapPin,
  Calendar,
  ChevronRight,
  Zap,
  Shield,
  Lightbulb,
  Handshake,
  Star,
  Play,
  ExternalLink,
} from 'lucide-react';
import profileData from '@/data/profile.json';
import eventsData from '@/data/events.json';

// ============================================================
// COUNTER ANIMATION COMPONENT
// ============================================================
interface CounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ value, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ============================================================
// ICON MAP
// ============================================================
const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
};

// Animation variants imported from @/lib/animations

// ============================================================
// TAG COLOR MAP
// ============================================================
const tagColors: Record<string, string> = {
  'AI': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Hành chính công': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Giáo dục': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Nghiên cứu khoa học': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Năng lực số': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Lực lượng vũ trang': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Cấp xã': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  'Kỹ năng số': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

function getTagColor(tag: string): string {
  return tagColors[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
}

// ============================================================
// HOME PAGE
// ============================================================
export const HomePage: React.FC = () => {
  const featuredEvents = eventsData.filter((e) => e.featured).slice(0, 3);
  const coreValues = profileData.coreValues;

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center hero-gradient bg-hero-pattern overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="hero-blob w-[500px] h-[500px] bg-navy-300 dark:bg-navy-600 -top-20 -right-20"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="hero-blob w-[300px] h-[300px] bg-crimson-300 dark:bg-crimson-700 bottom-0 left-10"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="hero-blob w-[200px] h-[200px] bg-blue-200 dark:bg-blue-800 top-1/3 right-1/4"
          style={{ animationDelay: '4s' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-100 dark:bg-navy-900/40 border border-navy-200/80 dark:border-navy-700/60 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500" />
              </span>
              <span className="text-xs font-semibold text-navy-700 dark:text-navy-300 uppercase tracking-widest">
                Viện Chuyển đổi số & Học liệu – Đại học Huế
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              <span className="gradient-text-hero">Chuyển đổi</span>
              <br />
              <span className="text-gray-900 dark:text-white">tư duy số</span>
              <br />
              <span className="text-gray-400 dark:text-gray-500 text-4xl sm:text-5xl lg:text-6xl">
                cho Việt Nam
              </span>
            </motion.h1>

            {/* Sub heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl"
            >
              Đồng hành cùng cán bộ, viên chức và các tổ chức trong hành trình nâng cao năng lực số —{' '}
              <span className="text-navy-700 dark:text-navy-300 font-semibold">tối ưu quy trình</span> và{' '}
              <span className="text-crimson-600 dark:text-crimson-400 font-semibold">phục vụ nhân dân tốt hơn</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/programs" className="btn-primary text-base px-7 py-3.5 shadow-lg shadow-navy-900/20">
                Xem chương trình đào tạo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/ai-playground" className="btn-secondary text-base px-7 py-3.5 group">
                <Play className="w-4 h-4 text-crimson-500 group-hover:text-crimson-600" />
                Trải nghiệm AI ngay
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-200/60 dark:border-gray-800"
            >
              {profileData.stats.map((stat) => (
                <div key={stat.id} className="flex items-center gap-2">
                  <div className="text-2xl font-black text-navy-900 dark:text-white">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 leading-tight">
                    <div className="font-medium text-gray-700 dark:text-gray-300">{stat.label}</div>
                    <div>{stat.description}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden xl:block"
          >
            <div className="glass-card rounded-3xl p-6 w-72 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">HU-Idter AI</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Trợ lý số thông minh</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hỏi AI:</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">"Soạn công văn mời họp..."</p>
                </div>
                <div className="bg-navy-50 dark:bg-navy-900/30 border border-navy-100 dark:border-navy-800/60 rounded-xl p-3">
                  <p className="text-xs text-navy-600 dark:text-navy-400 mb-1">AI trả lời:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    ✅ Đã soạn xong công văn số .../CV theo Nghị định 30/2020...
                  </p>
                </div>
              </div>

              <Link to="/ai-playground"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-navy-900 dark:bg-navy-700 text-white text-xs font-semibold hover:bg-navy-800 transition-colors">
                Thử ngay <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">Cuộn để khám phá</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== CORE VALUES SECTION ===== */}
      <section className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label mx-auto">
              <Star className="w-3 h-3" />
              Giá trị cốt lõi
            </div>
            <h2 className="section-title">
              Ba Trụ Cột Của{' '}
              <span className="gradient-text-hero">HU-Idter</span>
            </h2>
            <p className="section-desc mx-auto mt-4">
              Triết lý hoạt động xuyên suốt mọi khóa tập huấn và chương trình đào tạo của Viện
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id}
                variants={fadeInUp}
                className="gradient-border group"
              >
                <div className="glass-card rounded-2xl p-8 h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    value.color === 'blue'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : value.color === 'amber'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {iconMap[value.icon]}
                  </div>

                  <div className="text-5xl font-black text-gray-100 dark:text-gray-800 mb-2 select-none">
                    0{index + 1}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 bg-navy-900 dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 dark:from-gray-950 dark:via-gray-900 dark:to-black" />
          <div className="absolute top-0 left-0 w-full h-full opacity-5"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Con Số Nói Lên Tất Cả
            </h2>
            <p className="text-navy-300 dark:text-gray-400">
              Kết quả hoạt động đào tạo chuyển đổi số của HU-Idter năm 2026
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {profileData.stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white">
                    {iconMap[stat.icon] || <Cpu className="w-6 h-6" />}
                  </span>
                </div>
                <div className="text-4xl font-black text-white mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-semibold text-navy-200 dark:text-gray-300 mb-0.5">
                  {stat.label}
                </p>
                <p className="text-xs text-navy-400 dark:text-gray-500">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== RECENT EVENTS SECTION ===== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label">
                <Calendar className="w-3 h-3" />
                Hoạt động nổi bật
              </div>
              <h2 className="section-title mt-0">
                Các Lớp Tập Huấn{' '}
                <br className="hidden sm:block" />
                <span className="gradient-text-hero">Gần Đây</span>
              </h2>
            </motion.div>
            <Link
              to="/programs"
              className="btn-ghost shrink-0 group text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredEvents.map((event) => (
              <motion.article
                key={event.id}
                variants={fadeInUp}
                className="event-card group"
              >
                {/* Card header */}
                <div className="relative h-44 bg-gradient-to-br from-navy-900 to-navy-700 overflow-hidden">
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-white/80" />
                    </div>
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                    <p className="text-xs text-white font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {event.displayDate}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {event.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-navy-700 dark:group-hover:text-navy-300 transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-crimson-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {event.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {event.partner}
                    </p>
                  </div>

                  {/* Content preview */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <ul className="space-y-1.5">
                      {event.content.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-navy-400 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-10 sm:p-16 text-center shadow-2xl"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E\")" }}
            />
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-crimson-600/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-wider mb-6">
                <ExternalLink className="w-3.5 h-3.5" />
                Bắt đầu hành trình số hoá
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
                Đơn vị bạn đã sẵn sàng
                <br />
                <span className="text-blue-300">chuyển đổi số chưa?</span>
              </h2>

              <p className="text-navy-200 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                Liên hệ HU-Idter để được tư vấn miễn phí và thiết kế chương trình tập huấn phù hợp với nhu cầu của tổ chức bạn.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-navy-900 font-bold text-base hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Đăng ký tư vấn ngay
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all duration-200"
                >
                  Xem chương trình đào tạo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
