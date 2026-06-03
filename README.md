# 个人网页项目

这是一个学习使用Vibe Coding的个人网站项目，使用Vue.js构建，用于展示个人技能、荣誉、经历和项目等信息。
目前页面挂载在GithubPages页面，后续计划完善功能，部署到个人服务器，目前进度网站IPC备案中
- Github Pages访问链接：https://sevendaz.github.io/Personal-Page/

## 项目概述

本项目是一个响应式的个人网页，旨在展示个人能力和成就。网站包含多个页面：
- 首页：展示个人简介和导航
- 技能页：展示技术技能和专长
- 荣誉页：展示获得的奖项和认证
- 个人资料页：展示个人基本信息
- 博客页：展示个人文章和思考(coding)

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **路由**: Vue Router
- **样式**: CSS Modules + SCSS
- **动画**: CSS Transitions
- **响应式**: Flexbox + Grid

## 安装和运行

### 前置要求

- Node.js (v16+)
- npm 或 yarn 或 pnpm

### 安装步骤

```bash
# 克隆项目
git clone <your-repository-url>

# 进入项目目录
cd Personal-Page

# 安装依赖
npm install  # 或 yarn install / pnpm install

# 启动开发服务器
npm run dev  # 或 yarn dev / pnpm dev
```

### 构建生产版本

```bash
# 构建生产版本
npm run build  # 或 yarn build / pnpm build

# 预览生产版本
npm run preview  # 或 yarn preview / pnpm preview
```

## 项目结构

```
Personal-Page/
├── web/                 # 前端源代码
│   ├── src/             # Vue源代码
│   │   ├── views/       # 页面组件
│   │   │   ├── HomeView.vue    # 首页
│   │   │   ├── ProfileView.vue # 个人资料页
│   │   │   ├── SkillsView.vue  # 技能展示页
│   │   │   ├── HonorsView.vue  # 荣誉展示页
│   │   │   └── BlogView.vue    # 博客页
│   │   ├── components/  # 可复用组件
│   │   │   ├── home/    # 首页组件
│   │   │   │   ├── AboutCard.vue
│   │   │   │   ├── ExperienceCard.vue
│   │   │   │   ├── HeroSection.vue
│   │   │   │   ├── HobbiesCard.vue
│   │   │   │   ├── PersonalCard.vue
│   │   │   │   ├── ProfileSection.vue
│   │   │   │   ├── SiteNav.vue
│   │   │   │   ├── SkillsSection.vue
│   │   │   │   └── StatCards.vue
│   │   ├── router/      # 路由配置
│   │   ├── main.ts      # 应用入口
│   │   └── App.vue      # 根组件
│   └── public/          # 静态资源
│       ├── mp4/         # 视频文件
│       └── pkg_background/ # 背景图片/GIF
└── README.md            # 项目说明
```

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 免责声明

本网站仅供个人展示使用，所有内容均为个人创作。如有任何侵权或不当内容，请联系删除。