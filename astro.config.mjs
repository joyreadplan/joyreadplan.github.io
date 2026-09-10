import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://joyreadplan.github.io',
  integrations: [
    starlight({
      title: 'JoyRead Plan 悦读计划',
      description: 'JoyRead Plan 悦读计划是一款本地优先的桌面阅读计划与笔记管理工具，支持阅读计划、读书笔记、书库管理和数据统计。',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'JoyRead Plan Logo',
      },
      sidebar: [
        { label: '首页', slug: 'index' },
        { label: '功能介绍', slug: 'features' },
        { label: '下载安装', slug: 'download' },
        { label: '常见问题', slug: 'faq' },
      ],
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: 'JoyRead Plan 悦读计划｜本地优先的桌面阅读管理工具' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:description', content: '免费、本地优先的桌面阅读计划与笔记管理工具，帮你安静地整理每一段阅读旅程。' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://joyreadplan.github.io/favicon.svg' },
        },
      ],
    }),
  ],
});
