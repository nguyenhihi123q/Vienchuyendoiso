import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Send,
  Sparkles,
  RotateCcw,
  User,
  ChevronRight,
  MessageSquare,
  Zap,
  BookOpen,
  FileText,
  Megaphone,
  Scale,
  Info,
} from 'lucide-react';
import promptTemplates from '@/data/promptTemplates.json';
import type { PromptTemplate, ChatMessage } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-4 h-4" />,
  BarChart3: <Zap className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Megaphone: <Megaphone className="w-4 h-4" />,
  Scale: <Scale className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  'Hành chính': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Báo cáo': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Giảng dạy': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Truyền thông': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Pháp lý': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

// Parse markdown-ish response to JSX-friendly format
function formatResponse(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-base font-bold text-gray-900 dark:text-white mt-3 mb-1">{line.slice(3)}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2 mb-1">{line.slice(4)}</h3>;
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="text-sm font-bold text-gray-900 dark:text-white">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 my-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-navy-500 mt-2 shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
      );
    }
    if (line.startsWith('|') && line.endsWith('|')) {
      return <div key={i} className="text-xs font-mono text-gray-600 dark:text-gray-400 py-0.5">{line}</div>;
    }
    if (line.startsWith('---')) {
      return <hr key={i} className="border-gray-200 dark:border-gray-700 my-3" />;
    }
    if (line.trim() === '') {
      return <div key={i} className="h-1" />;
    }
    return (
      <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/✅|✍️|⚡|📋|☎️|⏳|📅|📍|📌|📎|🎓|⏰|👥|🤖|📊|📈|🎯|💡|⚠️|🎬/g, (m) => `<span>${m}</span>`) }}
      />
    );
  });
}

// Typing animation component
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
  </div>
);

let msgIdCounter = 0;
function newId() { return `msg-${++msgIdCounter}`; }

export const AIPlaygroundPage: React.FC = () => {
  const templates = promptTemplates as PromptTemplate[];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: newId(),
      role: 'assistant',
      content: '👋 Xin chào! Tôi là **Trợ lý AI của HU-Idter** — được thiết kế để hỗ trợ cán bộ, viên chức trong công tác hành chính và chuyển đổi số.\n\nBạn có thể chọn một trong các **Prompt mẫu** bên dưới hoặc nhập câu hỏi bất kỳ để bắt đầu!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateResponse = (prompt: string, template?: PromptTemplate) => {
    const userMsg: ChatMessage = {
      id: newId(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Find matching template or generate generic response
    const matchedTemplate = template || templates.find((t) =>
      prompt.toLowerCase().includes(t.label.toLowerCase()) ||
      prompt.toLowerCase().includes(t.prompt.toLowerCase().slice(0, 20))
    );

    const responseContent = matchedTemplate
      ? matchedTemplate.response
      : `Cảm ơn bạn đã đặt câu hỏi! Tôi đang phân tích yêu cầu của bạn...\n\nDựa trên câu hỏi *"${prompt}"*, đây là một số gợi ý từ tôi:\n\n## Hướng tiếp cận\n\n- **Xác định mục tiêu**: Làm rõ kết quả bạn mong muốn đạt được\n- **Thu thập thông tin**: Tổng hợp dữ liệu và tài liệu liên quan\n- **Áp dụng AI**: Sử dụng ChatGPT/Gemini với prompt chi tiết để xử lý\n- **Kiểm tra kết quả**: Luôn xem xét và điều chỉnh đầu ra của AI\n\n## Lưu ý quan trọng\n\nĐây là phiên bản demo giả lập. Để trải nghiệm AI thực sự với dữ liệu của bạn, vui lòng liên hệ HU-Idter để tham gia các khóa tập huấn chuyên sâu!`;

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: newId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500 + Math.random() * 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const val = inputValue.trim();
    setInputValue('');
    simulateResponse(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTemplateClick = (template: PromptTemplate) => {
    simulateResponse(template.prompt, template);
  };

  const handleReset = () => {
    setMessages([{
      id: newId(),
      role: 'assistant',
      content: '👋 Cuộc trò chuyện mới đã bắt đầu! Tôi sẵn sàng hỗ trợ bạn. Chọn một prompt mẫu hoặc nhập câu hỏi của bạn nhé!',
      timestamp: new Date(),
    }]);
    setInputValue('');
  };

  const categories = ['all', ...Array.from(new Set(templates.map((t) => t.category)))];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  return (
    <div>
      {/* PAGE HEADER */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label mx-auto mb-4">
              <Sparkles className="w-3 h-3" />
              Góc trải nghiệm AI
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Trợ Lý AI{' '}
              <span className="gradient-text-hero">HU-Idter</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Giả lập chatbot AI hỗ trợ cán bộ hành chính công — trải nghiệm sức mạnh của AI trong công việc thực tế
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Prompt Templates */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Prompt Mẫu</h3>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-navy-900 dark:bg-navy-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả' : cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleTemplateClick(template)}
                    disabled={isTyping}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-navy-300 dark:hover:border-navy-600 hover:bg-navy-50/50 dark:hover:bg-navy-900/20 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-400 group-hover:bg-navy-100 dark:group-hover:bg-navy-900/40 group-hover:text-navy-600 dark:group-hover:text-navy-400 transition-colors">
                        {iconMap[template.icon] || <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{template.label}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${categoryColors[template.category] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                            {template.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">{template.prompt}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-navy-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                    <strong>Lưu ý:</strong> Đây là phiên bản giả lập demo. Để ứng dụng AI thực tế vào công việc, hãy tham gia khóa tập huấn của HU-Idter.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Chat Interface */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl overflow-hidden flex flex-col" style={{ height: '680px' }}>
                {/* Chat header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">HU-Idter AI Assistant</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        Đang hoạt động
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Cuộc trò chuyện mới
                  </button>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-navy-900 dark:bg-navy-700'
                            : 'bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-700 dark:to-gray-800'
                        }`}>
                          {msg.role === 'user'
                            ? <User className="w-4 h-4 text-white" />
                            : <Cpu className="w-4 h-4 text-white" />
                          }
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'chat-bubble-user'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}>
                          {msg.role === 'user' ? (
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                          ) : (
                            <div className="markdown-content space-y-0.5">
                              {formatResponse(msg.content)}
                            </div>
                          )}
                          <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-white/50 text-right' : 'text-gray-400 dark:text-gray-600'}`}>
                            {msg.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-end gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm">
                          <TypingIndicator />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="px-6 py-4 border-t border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                  <div className="flex items-end gap-3">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Nhập câu hỏi hoặc yêu cầu... (Enter để gửi, Shift+Enter xuống dòng)"
                      rows={2}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-navy-500 dark:focus:ring-navy-400 focus:border-transparent transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-12 h-12 rounded-xl bg-navy-900 dark:bg-navy-700 text-white flex items-center justify-center shadow-md hover:bg-navy-800 dark:hover:bg-navy-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-2 text-center">
                    ⚡ Powered by HU-Idter AI Demo — Không lưu trữ dữ liệu cá nhân
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
