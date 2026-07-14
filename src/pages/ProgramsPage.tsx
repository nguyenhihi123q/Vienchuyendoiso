import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Shield,
  Building2,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Target,
  Star,
  Layers,
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import programsData from '@/data/programs.json';
import type { Program } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <BookOpen className="w-7 h-7" />,
  GraduationCap: <GraduationCap className="w-7 h-7" />,
  Shield: <Shield className="w-7 h-7" />,
  Building2: <Building2 className="w-7 h-7" />,
};

const badgeColorMap: Record<string, string> = {
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800',
};

const iconColorMap: Record<string, string> = {
  FileText: 'from-blue-600 to-blue-800',
  GraduationCap: 'from-emerald-600 to-emerald-800',
  Shield: 'from-red-600 to-red-800',
  Building2: 'from-purple-600 to-purple-800',
};

// Animation variants imported from @/lib/animations

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      className="glass-card rounded-3xl overflow-hidden"
    >
      {/* Card Header */}
      <div className={`relative p-8 bg-gradient-to-br ${iconColorMap[program.icon] || 'from-navy-800 to-navy-600'} text-white overflow-hidden`}>
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-4">
              {iconMap[program.icon] || <BookOpen className="w-7 h-7" />}
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-3 ${badgeColorMap[program.badgeColor] || 'bg-white/20 text-white'}`}>
              {program.badge}
            </span>
            <h2 className="text-xl font-black leading-tight mb-2">{program.title}</h2>
            <p className="text-white/70 text-sm">{program.category}</p>
          </div>
        </div>

        {/* Meta info pills */}
        <div className="relative flex flex-wrap gap-2 mt-5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white/80">
            <Clock className="w-3 h-3" />
            {program.duration}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white/80">
            <Layers className="w-3 h-3" />
            {program.level}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-8">
        {/* Target audience */}
        <div className="flex items-start gap-3 mb-5 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60">
          <Users className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">Đối tượng tham gia</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">{program.target}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
          {program.description}
        </p>

        {/* Objectives */}
        <div className="mb-5">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-crimson-500" />
            Mục tiêu đào tạo
          </h4>
          <ul className="space-y-2">
            {program.objectives.slice(0, 3).map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand/Collapse */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Curriculum */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-5 mb-5">
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                  Khung chương trình
                </h4>
                <div className="space-y-4">
                  {program.curriculum.map((mod, mi) => (
                    <div key={mi} className="rounded-xl p-4 bg-navy-50 dark:bg-navy-900/20 border border-navy-100 dark:border-navy-800/40">
                      <p className="text-sm font-semibold text-navy-800 dark:text-navy-300 mb-2">{mod.module}</p>
                      <ul className="space-y-1.5">
                        {mod.topics.map((topic, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-navy-400 mt-1.5 shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-amber-500" />
                  Đầu ra mong đợi
                </h4>
                <ul className="space-y-2">
                  {program.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-amber-500 font-bold text-base leading-5">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <span className="flex-1 text-center">
            {expanded ? 'Thu gọn chi tiết' : 'Xem chi tiết chương trình'}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </motion.article>
  );
};

export const ProgramsPage: React.FC = () => {
  const programs = programsData as Program[];
  const featured = programs.filter((p) => p.featured);
  const others = programs.filter((p) => !p.featured);

  return (
    <div>
      {/* PAGE HEADER */}
      <section className="relative py-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label mx-auto mb-4">
              <GraduationCap className="w-3 h-3" />
              Chương trình đào tạo
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              Các Khóa Tập Huấn
              <br />
              <span className="gradient-text-hero">Chuyển đổi số</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Chương trình đào tạo thực chiến, được thiết kế riêng cho từng nhóm đối tượng —
              từ cán bộ hành chính công đến giảng viên đại học và lực lượng vũ trang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="section-label">
              <Star className="w-3 h-3" />
              Chương trình nổi bật
            </div>
            <h2 className="section-title mt-0">Khóa Đào Tạo Hàng Đầu</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {featured.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      {others.length > 0 && (
        <section className="py-20 section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="section-label">
                <Layers className="w-3 h-3" />
                Chương trình khác
              </div>
              <h2 className="section-title mt-0">Chương Trình Bổ Sung</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {others.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-3xl p-10">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                Không tìm thấy chương trình phù hợp?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                HU-Idter thiết kế chương trình tùy chỉnh theo nhu cầu thực tế của từng tổ chức.
                Liên hệ để được tư vấn miễn phí.
              </p>
              <a href="/#/contact" className="btn-primary mx-auto">
                Yêu cầu tư vấn tùy chỉnh
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
