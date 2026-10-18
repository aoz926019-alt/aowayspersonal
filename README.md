# 张敖 AO ZHANG · Portfolio

个人作品集，展示商业分析、AI 产品、金融与计量研究实践。使用 React、Vite、GSAP 与 React Bits，部署至 GitHub Pages。

线上地址：https://aoz926019-alt.github.io/aowayspersonal/

## 本地开发

需要 Node.js 20+。

```bash
npm ci
npm run dev
npm run check
npm run preview
```

`npm run check` 生成生产构建，并核对项目素材、必需文案、统计字段、经历日期顺序与页面资源引用。

## 内容与结构

- `src/data/content.js`：个人介绍、统计、经历、项目与导航文案。
- `src/assets/`：头像与项目 WebP 图片；项目宽高填写原始尺寸。
- `src/components/`：首页、关于、项目、经历、能力、联系及导航。
- `src/styles/global.css`：配色、排版、断点、导航与项目弹窗样式。
- `src/reactbits/`：保留原有组件的授权说明及交互效果。
- `public/favicon.svg`：站点图标。
- `index.html`：页面标题、搜索摘要与社交分享元信息。

项目按数据分析、财务研究、用户与产品分类筛选。卡片显示简要说明，完整内容保留在概览中，可在当前分类内连续切换。证书荣誉和竞赛详情支持展开查看。

项目截图与“项目概览”按钮打开原生对话框。支持 Escape 关闭、键盘焦点管理及触屏浏览；只有已公开的项目配置 GitHub 链接。邮箱和电话可直接点击。

动效遵循 `prefers-reduced-motion`；关闭动效时，核心内容和统计仍完整显示。WebGL 背景仅在支持精细指针的大屏设备上按需加载；手机端和不支持 WebGL 的设备保留 CSS 背景。手机导航支持选中后收起、Escape 关闭及点击外部关闭。

## 发布

推送至 `main` 后，`.github/workflows/deploy.yml` 运行检查并发布 `dist/` 到 GitHub Pages。`vite.config.js` 使用相对资源路径，可适配项目子目录。

发布前应在桌面、平板和手机宽度检查导航、项目弹窗及联系区域；确认图片完整、内容无横向溢出，并复核个人信息及经历日期。
