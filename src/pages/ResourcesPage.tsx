import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library,
  Search,
  Filter,
  Download,
  Play,
  FileText,
  BookOpen,
  Monitor,
  Database,
  FolderOpen,
  FlaskConical,
  ClipboardCheck,
  Layers,
  Shield,
  Star,
  ExternalLink,
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import resourcesData from '@/data/resources.json';
import type { Resource, ResourceCategory } from '@/types';

// Icon map
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  FolderOpen: <FolderOpen className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  Play: <Play className="w-5 h-5" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
};

// Category config
const categories: { value: ResourceCategory | 'all'; label: string; icon: React.ReactNode; count: number }[] = [
  { value: 'all', label: 'Tất cả', icon: <Library className="w-4 h-4" />, count: resourcesData.length },
  { value: 'ai-application', label: 'Ứng dụng AI', icon: <Layers className="w-4 h-4" />, count: resourcesData.filter((r) => r.category === 'ai-application').length },
  { value: 'digital-skills', label: 'Kỹ năng số', icon: <Monitor className="w-4 h-4" />, count: resourcesData.filter((r) => r.category === 'digital-skills').length },
  { value: 'admin-docs', label: 'Văn bản hành chính', icon: <FileText className="w-4 h-4" />, count: resourcesData.filter((r) => r.category === 'admin-docs').length },
  { value: 'research', label: 'Nghiên cứu KH', icon: <FlaskConical className="w-4 h-4" />, count: resourcesData.filter((r) => r.category === 'research').length },
];

// Type config
const typeConfig: Record<string, { label: string; color: string }> = {
  pdf: { label: 'PDF', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  doc: { label: 'DOC', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  video: { label: 'VIDEO', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  slide: { label: 'SLIDE', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  guide: { label: 'GUIDE', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
};

// Animation variants imported from @/lib/animations

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const resources = resourcesData as Resource[];

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchCategory = activeCategory === 'all' || r.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [resources, activeCategory, searchQuery]);

  const featured = resources.filter((r) => r.featured);

  return (
    <div>
      {/* PAGE HEADER */}
      <section className="relative py-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label mx-auto mb-4">
              <Library className="w-3 h-3" />
              Thư viện số
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-5">
              Kho Tài Liệu
              <br />
              <span className="gradient-text-hero">Chuyển đổi số</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Tổng hợp tài liệu hướng dẫn, prompt mẫu và học liệu số chất lượng cao từ HU-Idter —
              miễn phí cho cán bộ, viên chức.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu, chủ đề, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-500 dark:focus:ring-navy-400 text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="section-label">
              <Star className="w-3 h-3" />
              Nổi bật
            </div>
            <h2 className="section-title mt-0">Tài Liệu Được Tải Nhiều Nhất</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {featured.map((resource) => (
              <motion.div
                key={resource.id}
                variants={fadeInUp}
                className="glass-card rounded-2xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer group border-b-2 border-navy-200 dark:border-navy-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-100 dark:bg-navy-900/40 text-navy-600 dark:text-navy-400 flex items-center justify-center shrink-0 group-hover:bg-navy-200 dark:group-hover:bg-navy-800/40 transition-colors">
                    {iconMap[resource.icon] || <FileText className="w-5 h-5" />}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${typeConfig[resource.type]?.color || ''}`}>
                    {typeConfig[resource.type]?.label}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-navy-700 dark:group-hover:text-navy-300 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{resource.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MAIN LIBRARY */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden pb-2 mb-10">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.icon}
                {cat.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeCategory === cat.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Hiển thị <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> tài liệu
            {searchQuery && ` cho "${searchQuery}"`}
          </p>

          {/* Resource list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filtered.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Không tìm thấy tài liệu phù hợp</p>
                  <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">Thử tìm kiếm với từ khóa khác</p>
                </motion.div>
              ) : (
                filtered.map((resource) => (
                  <motion.div
                    key={resource.id}
                    variants={fadeInUp}
                    className="resource-card"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0 text-gray-600 dark:text-gray-400 group-hover:bg-navy-50 dark:group-hover:bg-navy-900/30 group-hover:border-navy-200 dark:group-hover:border-navy-700 group-hover:text-navy-600 dark:group-hover:text-navy-400 transition-all duration-200">
                      {iconMap[resource.icon] || <FileText className="w-5 h-5" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${typeConfig[resource.type]?.color || ''}`}>
                          {typeConfig[resource.type]?.label}
                        </span>
                        {resource.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            ⭐ Nổi bật
                          </span>
                        )}
                        {resource.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-navy-700 dark:group-hover:text-navy-300 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[11px] text-gray-400 dark:text-gray-600">{resource.author}</span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-600">{resource.fileSize}</span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-600">{resource.publishDate}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      {resource.type === 'video' ? (
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                          <Play className="w-3.5 h-3.5" />
                          Xem
                        </button>
                      ) : (
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-900/40 text-navy-700 dark:text-navy-300 text-xs font-semibold hover:bg-navy-200 dark:hover:bg-navy-800/40 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          Tải về
                        </button>
                      )}
                      <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
