# Personal Page Web

Vue 3 + TypeScript + Vite 构建的个人站点前端。

## 开发

需要 Node.js 20.19+ 或 22.12+。

```sh
npm install
npm run dev
```

## 检查与构建

```sh
npm run lint       # 只检查，不改动文件
npm run lint:fix   # 自动修复可修复的问题
npm run build      # 类型检查并构建生产产物
```

项目部署在子路径 `/Personal-Page/` 时，Vite 的 `base` 配置会保证静态资源地址正确；`public/404.html` 用于 GitHub Pages 的历史路由回退。
