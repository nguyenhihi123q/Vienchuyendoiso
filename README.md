# HU-Idter Website — Viện Chuyển đổi số và Học liệu, Đại học Huế

> **Trang web chính thức** của Viện Chuyển đổi số và Học liệu (HU-Idter) – Đại học Huế.  
> Xây dựng bằng React 18 + Vite + TypeScript + TailwindCSS v3.

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://github.com)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Tính năng nổi bật

- 🎨 **UI/UX chuẩn Vercel/Apple** — Glassmorphism, gradient, dark mode
- 🌙 **Dark Mode** — Tự động theo hệ thống + toggle bằng tay
- 📱 **Responsive 100%** — Mobile-first, hamburger menu
- ⚡ **Framer Motion** — Page transitions, scroll animations, stagger effects
- 🤖 **AI Playground** — Chatbot giả lập với prompt mẫu
- 🔍 **Tìm kiếm & Lọc** — Thư viện tài liệu số
- 📋 **Form liên hệ** — Validation + lưu LocalStorage
- 🗺️ **Bản đồ** — OpenStreetMap embed
- 🚀 **GitHub Pages Ready** — HashRouter, base URL được cấu hình sẵn

---

## 📦 Tech Stack

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| TypeScript | 6 | Type safety |
| TailwindCSS | 3 | Styling |
| Framer Motion | 12 | Animations |
| React Router DOM | 7 | Routing (HashRouter) |
| Lucide React | Latest | Icons |
| Radix UI | Latest | Accessible primitives |

---

## 🚀 Cài đặt và Chạy Local

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/VienChuyenDoiSo.git
cd VienChuyenDoiSo
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:5173**

---

## 🏗️ Build Production

```bash
npm run build
```

Kết quả sẽ nằm trong thư mục `dist/`.

### Xem trước bản build

```bash
npm run preview
```

---

## 🌐 Deploy lên GitHub Pages

### Bước 1: Tạo GitHub Repository

1. Tạo repository mới trên GitHub với tên `VienChuyenDoiSo`
2. Push code lên repository

### Bước 2: Cấu hình base URL

Mở `vite.config.ts` và sửa `base` thành tên repository của bạn:

```typescript
export default defineConfig({
  base: '/VienChuyenDoiSo/', // ← Thay bằng tên repo của bạn
  // ...
})
```

### Bước 3: Deploy thủ công

```bash
# Build
npm run build

# Deploy lên gh-pages branch (cài gh-pages nếu chưa có)
npm install -g gh-pages
gh-pages -d dist
```

### Bước 4: Deploy tự động với GitHub Actions

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📁 Cấu trúc dự án

```
VienChuyenDoiSo/
├── public/                  # Static files
├── src/
│   ├── components/
│   │   └── layout/          # Header, Footer, Layout
│   ├── data/                # Static JSON data
│   │   ├── profile.json     # Thông tin Viện
│   │   ├── events.json      # Sự kiện tập huấn
│   │   ├── programs.json    # Chương trình đào tạo
│   │   ├── resources.json   # Thư viện tài liệu
│   │   └── promptTemplates.json  # AI prompt mẫu
│   ├── lib/
│   │   ├── utils.ts         # Utility functions
│   │   └── animations.ts    # Framer Motion variants
│   ├── pages/               # 6 trang của website
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ProgramsPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── AIPlaygroundPage.tsx
│   │   └── ContactPage.tsx
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Router setup
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + design system
├── index.html               # HTML template (SEO optimized)
├── vite.config.ts           # Vite + path alias config
├── tailwind.config.js       # TailwindCSS config + brand colors
├── postcss.config.js        # PostCSS config
└── tsconfig.json            # TypeScript config
```

---

## 🎨 Design System

### Màu sắc chủ đạo

| Màu | Hex | Ý nghĩa |
|-----|-----|---------|
| Navy 900 | `#0B3C5D` | Màu chính (Light mode) |
| Crimson 600 | `#D9534F` | Màu nhấn (Red) |
| Sky 300 | `#38BDF8` | Màu chính (Dark mode) |

### CSS Components (có thể dùng trực tiếp)

```html
<!-- Glassmorphism -->
<div class="glass-card">...</div>

<!-- Gradient text -->
<h1 class="gradient-text-hero">...</h1>

<!-- Section label badge -->
<div class="section-label">...</div>

<!-- Primary button -->
<button class="btn-primary">...</button>

<!-- Timeline -->
<div class="timeline-item">
  <div class="timeline-dot"></div>
</div>
```

---

## 📊 Pages & Routes

| Route | Trang | Mô tả |
|-------|-------|-------|
| `/#/` | Trang Chủ | Hero, Stats, Events, CTA |
| `/#/about` | Giới Thiệu | Sứ mệnh, Timeline, Lãnh đạo |
| `/#/programs` | Đào Tạo | Các khóa tập huấn có thể expand |
| `/#/resources` | Thư Viện Số | Tài liệu + Search + Filter |
| `/#/ai-playground` | Góc AI | Chatbot giả lập với prompt mẫu |
| `/#/contact` | Liên Hệ | Form + Bản đồ + Thông tin |

---

## 📞 Liên hệ

**Viện Chuyển đổi số và Học liệu (HU-Idter)**  
📍 20 Lê Lợi, Phường Thuận Hóa, TP. Huế  
📞 0835 534 535  
📧 huidter@hueuni.edu.vn  
🌐 https://idter.hueuni.edu.vn/

---

*Made with ❤️ in Huế by HU-Idter Development Team*
