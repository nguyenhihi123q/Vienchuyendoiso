import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  Users,
  Building,
} from 'lucide-react';
import type { ContactFormData } from '@/types';




const subjectOptions = [
  'Đăng ký tư vấn chuyển đổi số',
  'Đăng ký lớp tập huấn AI',
  'Hợp tác tổ chức chương trình',
  'Yêu cầu tài liệu & học liệu',
  'Góp ý & phản hồi',
  'Khác',
];

const contactItems = [
  {
    icon: <MapPin className="w-5 h-5 text-crimson-500" />,
    label: 'Địa chỉ',
    value: '20 Lê Lợi, Phường Thuận Hóa, TP. Huế, Thừa Thiên Huế',
    link: 'https://maps.google.com/?q=20+Le+Loi+Hue',
  },
  {
    icon: <Phone className="w-5 h-5 text-blue-500" />,
    label: 'Điện thoại',
    value: '0835 534 535',
    link: 'tel:0835534535',
  },
  {
    icon: <Mail className="w-5 h-5 text-emerald-500" />,
    label: 'Email',
    value: 'huidter@hueuni.edu.vn',
    link: 'mailto:huidter@hueuni.edu.vn',
  },
  {
    icon: <Globe className="w-5 h-5 text-purple-500" />,
    label: 'Website',
    value: 'idter.hueuni.edu.vn',
    link: 'https://idter.hueuni.edu.vn/',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    if (!formData.subject) newErrors.subject = 'Vui lòng chọn chủ đề';
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call - save to localStorage
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('hu-idter-contacts') || '[]');
      existing.push({ ...formData, submittedAt: new Date().toISOString(), id: Date.now() });
      localStorage.setItem('hu-idter-contacts', JSON.stringify(existing));
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <section className="relative py-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label mx-auto mb-4">
              <MessageSquare className="w-3 h-3" />
              Liên hệ với chúng tôi
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-5">
              Bắt đầu hành trình
              <br />
              <span className="gradient-text-hero">chuyển đổi số</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Liên hệ HU-Idter để được tư vấn miễn phí và thiết kế chương trình
              tập huấn phù hợp với nhu cầu thực tế của tổ chức bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-10 section-alt border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-4 h-4 text-blue-500" />, label: 'Thời gian phản hồi', value: '< 24 giờ' },
              { icon: <Users className="w-4 h-4 text-emerald-500" />, label: 'Tư vấn miễn phí', value: '100%' },
              { icon: <Building className="w-4 h-4 text-purple-500" />, label: 'Chương trình tùy chỉnh', value: 'Có' },
              { icon: <CheckCircle2 className="w-4 h-4 text-amber-500" />, label: 'Đánh giá hài lòng', value: '98%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="text-base font-black text-gray-900 dark:text-white">{item.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10"
          >
            {/* Contact info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  Thông tin liên hệ
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Đội ngũ HU-Idter luôn sẵn sàng hỗ trợ bạn từ thứ Hai đến thứ Sáu.
                </p>
              </div>

              <div className="space-y-4">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-navy-300 dark:hover:border-navy-600 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-navy-700 dark:group-hover:text-navy-300 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* OpenStreetMap */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=107.564%2C16.457%2C107.586%2C16.471&layer=mapnik&marker=16.464%2C107.575"
                  className="w-full h-52"
                  title="Bản đồ trụ sở HU-Idter"
                  loading="lazy"
                />
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    📍 20 Lê Lợi, Phường Thuận Hóa, TP. Huế
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                      Gửi thành công! 🎉
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                      Cảm ơn bạn đã liên hệ với HU-Idter! Đội ngũ của chúng tôi sẽ phản hồi trong vòng <strong>24 giờ làm việc</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ fullName: '', organization: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="btn-secondary"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                        Gửi yêu cầu tư vấn
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Điền thông tin bên dưới, HU-Idter sẽ liên hệ bạn sớm nhất.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full name */}
                      <div>
                        <label className="form-label block">
                          Họ và tên <span className="text-crimson-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange('fullName')}
                          placeholder="Nguyễn Văn A"
                          className={`form-input ${errors.fullName ? 'border-red-400 dark:border-red-600' : ''}`}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Organization */}
                      <div>
                        <label className="form-label block">Tên cơ quan / tổ chức</label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={handleChange('organization')}
                          placeholder="UBND xã/huyện/tỉnh..."
                          className="form-input"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="form-label block">
                          Email <span className="text-crimson-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={handleChange('email')}
                          placeholder="example@gmail.com"
                          className={`form-input ${errors.email ? 'border-red-400 dark:border-red-600' : ''}`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="form-label block">
                          Số điện thoại <span className="text-crimson-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange('phone')}
                          placeholder="0901 234 567"
                          className={`form-input ${errors.phone ? 'border-red-400 dark:border-red-600' : ''}`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="form-label block">
                        Chủ đề liên hệ <span className="text-crimson-500">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={handleChange('subject')}
                        className={`form-input ${errors.subject ? 'border-red-400 dark:border-red-600' : ''}`}
                      >
                        <option value="">-- Chọn chủ đề --</option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="form-label block">
                        Nội dung <span className="text-crimson-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={handleChange('message')}
                        placeholder="Mô tả nhu cầu của bạn: số lượng người tham dự, chủ đề tập huấn mong muốn, thời gian dự kiến..."
                        className={`form-input resize-none ${errors.message ? 'border-red-400 dark:border-red-600' : ''}`}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-navy-900 dark:bg-navy-700 text-white font-bold text-base hover:bg-navy-800 dark:hover:bg-navy-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Gửi yêu cầu tư vấn
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                      🔒 Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi không chia sẻ với bên thứ ba.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
