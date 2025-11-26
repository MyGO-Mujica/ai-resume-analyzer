# AI Resume Analyzer

[![Deployed on Puter](https://img.shields.io/badge/Deployed%20on-Puter-4666FF?style=for-the-badge&logo=puter&logoColor=white)](https://puter.com/app/mygo-ai-resume-analyzer)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **智能简历分析助手**

## 📖 项目介绍

**AI Resume Analyzer** 是一款基于前沿 Web 技术构建的现代化简历分析应用。它利用人工智能技术，深入解析求职者简历，模拟 **ATS (Applicant Tracking System)** 筛选流程，并提供多维度的优化建议。

本项目旨在帮助求职者打破信息差，通过可视化的评分和具体的修改意见，提升简历在招聘系统中的通过率。

🔗 **在线体验**: [https://puter.com/app/mygo-ai-resume-analyzer](https://puter.com/app/mygo-ai-resume-analyzer)

## ✨ 核心功能 

*   **🚀 智能评分系统**: 基于 AI 模型，从 **语气风格**、**内容质量**、**结构布局**、**技能匹配** 四个核心维度对简历进行打分。
*   **🤖 ATS 模拟检测**: 模拟真实招聘系统的解析逻辑，识别简历中的潜在问题（如格式错误、关键词缺失）。
*   **📝 深度反馈建议**: 不仅仅是打分，更提供“做得好”与“需改进”的具体文本建议，支持中文本地化反馈。
*   **👁️ PDF 即时预览**: 集成 PDF.js，支持前端直接渲染 PDF 简历，无需上传即可预览。
*   **☁️ Serverless 架构**: 基于 **Puter.js** 构建，利用其云存储、身份验证和 AI 推理能力，实现无服务器架构。
*   **🎨 极致 UI/UX**: 采用最新的 Tailwind CSS v4 打造，拥有流畅的动画、响应式布局和现代化的视觉风格。

## 🛠️ 技术栈 

本项目采用最新的前端技术栈构建：

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Routing**: [React Router v7](https://reactrouter.com/) (Framework mode)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/)
*   **Cloud & AI Services**: [Puter.js](https://docs.puter.com/)
*   **Build Tool**: [Vite](https://vitejs.dev/)

## 💻 本地开发 

如果您希望在本地运行或二次开发本项目，请遵循以下步骤：

### 环境要求
*   Node.js >= 20
*   npm 或 pnpm

### 1. 克隆项目
```bash
git clone https://github.com/MyGO-Mujica/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
访问 `http://localhost:5173` 即可看到应用。

### 4. 构建生产版本
```bash
npm run build
npm run start
```

## 📂 目录结构 (Directory Structure)

```text
ai-resume-analyzer/
├── app/
│   ├── components/    # UI 组件 (ATS评分, 详情页, 文件上传等)
│   ├── lib/           # 核心工具类 (Puter集成, PDF转换)
│   ├── routes/        # 页面路由 (Home, Upload, Resume, Auth)
│   ├── root.tsx       # 应用根组件
│   └── app.css        # 全局样式 (Tailwind v4)
├── public/            # 静态资源
├── constants/         # 常量定义 & AI Prompt
└── package.json       # 项目配置
```

## 🤝 贡献 (Contributing)

欢迎提交 Issue 和 Pull Request！如果您有好的想法或发现了 Bug，请随时反馈。





