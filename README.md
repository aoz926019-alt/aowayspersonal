# 张敖 AO ZHANG · Portfolio

个人作品集，展示商业分析、AI 产品、金融与计量研究实践。使用 React、Vite、GSAP 与 React Bits，部署至 GitHub Pages。

线上地址：https://aoz926019-alt.github.io/aowayspersonal/

页面从个人介绍开始，依次呈现背景、项目、经历、能力及联系入口。用网页本身的三维交互和滚动编排展示实现能力。

项目名称旁展示各项目实际使用的关键技能，随轮播同步切换，并在小屏自动换行。实习经历使用滚动推进的时间线、当前条目高亮、序号排版和 SVG 轨道概览；导航下沿提供整页阅读进度。锚点定位统一由 CSS 控制，避免平滑滚动偏移与导航留白叠加。

首屏采用本地 Three.js 程序生成的粒子扭结、三维轨道、指针惯性与呼吸着色，配合 GSAP 姓名逐字三维入场和滚动视差；`OrbitalSculpture.jsx` 不依赖模型下载。联系区延迟加载 React Bits FloatingLines，支持流动光线、指针弯曲与视差，并配合旋转环形文字、磁吸邮件入口和邮箱字母波浪。两个 WebGL 场景均在视口外暂停并释放卸载资源，降低像素比，保留减少动效和 WebGL 不可用时的静态背景。

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

项目按数据分析、财务研究、用户与产品分类筛选，使用 React Bits 官方 FlexCarousel 的 liquid 预设展示现有项目图片，支持拖动、滚轮、方向键及点击任意卡片打开详情。滚轮在轮播画面内控制项目转动。轮播图片、当前项目名称、计数、切换按钮与概览入口放在同一个展示区，移除与画面脱离的独立说明区。全屏详情保留完整原比例图片、角色、背景、说明、数据备注、项目内容、标签和项目链接，可在当前分类内连续切换。减少动效或 WebGL 不可用时显示静态图片，仍可用按钮浏览全部项目。证书荣誉和竞赛详情支持展开查看。能力区使用自定义渐变光场，柔和光晕缓慢交叠，随鼠标轻微偏移；离开视口或页面隐藏时暂停，减少动效偏好下保留静态背景。

`src/reactbits/FlexCarousel.jsx` 与 CSS 基于 [React Bits](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/FlexCarousel) 修订 e12c221，使用已有 `ogl`，未新增依赖；保留引擎，补充本地素材、导航接口和静态回退。完整 MIT + Commons Clause 许可随站点发布于 `public/licenses/React-Bits-FlexCarousel.txt`。

同一修订的 [RippleGrid](https://reactbits.dev/backgrounds/ripple-grid) 与 [ClickSpark](https://reactbits.dev/animations/click-spark) 分别用于首屏指针涟漪和点击火花。源码保存在 `src/reactbits/`，完整许可位于 `public/licenses/React-Bits.txt`，未增加依赖。RippleGrid 使用 glow=0.4、rippleStrength=0.8、autoRipple=none；装饰性 WebGL 在视口外暂停，在手机或减少动效时保留静态背景。

项目截图与“项目概览”按钮打开原生对话框。支持 Escape 关闭、键盘焦点管理及触屏浏览；只有已公开的项目配置 GitHub 链接。邮箱和电话可直接点击。

动效遵循 `prefers-reduced-motion`；关闭动效时，核心内容和统计仍完整显示。WebGL 背景仅在支持精细指针的大屏设备上按需加载；手机端和不支持 WebGL 的设备保留 CSS 背景。手机导航支持选中后收起、Escape 关闭及点击外部关闭。

## 发布

字体使用自托管的 Noto Sans SC、Manrope 与 IBM Plex Mono，按需导入实际字重，均设置 `font-display: swap`。选型、依赖、授权与排版规则见 [字体规范](docs/typography.md)；完整许可随网站发布于 `public/licenses/fonts/`。

推送至 `main` 后，`.github/workflows/deploy.yml` 运行检查并发布 `dist/` 到 GitHub Pages。`vite.config.js` 使用相对资源路径，可适配项目子目录。

发布前应在桌面、平板和手机宽度检查导航、项目弹窗及联系区域；确认图片完整、内容无横向溢出，并复核个人信息及经历日期。
