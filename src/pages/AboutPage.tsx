import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Award, MapPin, Phone, Mail, Calendar, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import profileData from '@/data/profile.json';
import eventsData from '@/data/events.json';

// Animation variants imported from @/lib/animations

const timelineTagColors: Record<string, string> = {
  'AI': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Hành chính công': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Giáo dục': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Cấp xã': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  'CNTT': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Lực lượng vũ trang': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function getTagColor(tag: string): string {
  return timelineTagColors[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
}

export const AboutPage: React.FC = () => {
  const sortedEvents = [...eventsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {/* ===== PAGE HEADER ===== */}
      <section className="relative py-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="section-label mx-auto mb-4">
              <Users className="w-3 h-3" />
              Về chúng tôi
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              Viện Chuyển đổi số
              <br />
              <span className="gradient-text-hero">& Học liệu</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Đơn vị chuyên trách về chuyển đổi số và đào tạo năng lực số trực thuộc Đại học Huế —
              đồng hành cùng sự phát triển của chính quyền số Việt Nam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="py-20" id="mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mission */}
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl p-8 bg-gradient-to-br from-navy-900 to-navy-700 dark:from-gray-900 dark:to-gray-800 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black mb-4">Sứ Mệnh</h2>
                <p className="text-navy-200 dark:text-gray-300 leading-relaxed text-[15px]">
                  {profileData.mission}
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl p-8 bg-gradient-to-br from-crimson-700 to-crimson-900 dark:from-gray-900 dark:to-gray-800 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black mb-4">Tầm Nhìn</h2>
                <p className="text-crimson-100 dark:text-gray-300 leading-relaxed text-[15px]">
                  {profileData.vision}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 glass-card rounded-3xl p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Thông tin liên hệ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <MapPin className="w-5 h-5 text-crimson-500" />, label: 'Địa chỉ', value: profileData.contact.address },
                { icon: <Phone className="w-5 h-5 text-blue-500" />, label: 'Điện thoại', value: profileData.contact.phone },
                { icon: <Mail className="w-5 h-5 text-emerald-500" />, label: 'Email', value: profileData.contact.email },
                { icon: <ChevronRight className="w-5 h-5 text-amber-500" />, label: 'Website', value: 'idter.hueuni.edu.vn' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium mb-0.5">{item.label}</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section className="py-20 section-alt" id="leaders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="section-label mx-auto">
              <Award className="w-3 h-3" />
              Ban lãnh đạo
            </div>
            <h2 className="section-title">Đội Ngũ Lãnh Đạo</h2>
            <p className="section-desc mx-auto mt-4">
              Những chuyên gia hàng đầu dẫn dắt hành trình chuyển đổi số tại HU-Idter
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {profileData.leaders.map((leader) => (
              <motion.div
                key={leader.id}
                variants={fadeInUp}
                className="glass-card rounded-3xl p-8 max-w-sm w-full text-center"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Users className="w-10 h-10 text-white/70" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-navy-100 dark:bg-navy-900/40 text-navy-700 dark:text-navy-300 border border-navy-200 dark:border-navy-700 mb-3">
                  {leader.title}
                </span>

                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                  {leader.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  {leader.bio}
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Đang hoạt động</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ACTIVITY TIMELINE ===== */}
      <section className="py-20" id="timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="section-label mx-auto">
              <Calendar className="w-3 h-3" />
              Lịch sử hoạt động
            </div>
            <h2 className="section-title">
              Hành Trình{' '}
              <span className="gradient-text-hero">Chuyển đổi số</span>
            </h2>
            <p className="section-desc mx-auto mt-4">
              Những dấu mốc quan trọng trong hoạt động đào tạo và tập huấn của HU-Idter
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {sortedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={fadeInUp}
                  className="timeline-item"
                >
                  <div className="timeline-dot" />
                  <div className="glass-card rounded-2xl p-6 ml-4">
                    {/* Date */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-crimson-500" />
                        {event.displayDate}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {event.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
                    </div>

                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-3">
                      Phối hợp: {event.partner}
                    </p>

                    <ul className="space-y-1">
                      {event.content.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-navy-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
