# JoyRead Plan 悦读计划 — Official Website

[JoyRead Plan](https://joyreadplan.github.io/) 官方网站，基于 [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) 构建，通过 GitHub Pages 托管。

## 技术栈

- [Astro 7](https://astro.build/) — 静态站点生成
- [Starlight](https://starlight.astro.build/) — Astro 官方文档主题
- GitHub Pages — 静态托管
- GitHub Actions — 自动构建与部署

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 http://localhost:4321。

## 构建与预览

```bash
npm run build      # 产出到 dist/
npm run preview    # 本地预览构建产物
```

## 项目结构

```
joyreadplan.github.io/
├── .github/workflows/deploy.yml   # GitHub Pages 部署工作流
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/logo.svg
│   ├── content/docs/
│   │   ├── index.mdx              # 首页（Splash 模板）
│   │   ├── features.mdx           # 功能介绍
│   │   ├── download.mdx           # 下载安装
│   │   └── faq.mdx                # 常见问题
│   ├── content.config.ts          # Starlight 内容集合定义
│   └── styles/custom.css          # 自定义主题样式
├── astro.config.mjs               # Astro + Starlight 配置
└── package.json
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并部署到 [https://joyreadplan.github.io/](https://joyreadplan.github.io/)。

## License

ISC
