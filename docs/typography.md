# 字体规范

定位：商业分析、财务研究与 AI 产品作品集。延续深松绿与冷灰色，强调清晰、可信和数据感。

## 三套搭配

| 方案 | 中文 | 英文正文 / 标题 / 数字 | 代码与技术标签 | 气质与适用场景 |
| --- | --- | --- | --- | --- |
| A · 已采用 | Noto Sans SC | Manrope | IBM Plex Mono | 清晰稳重，英文几何感适中；适合当前兼顾金融分析与 AI 产品的定位。 |
| B | Noto Sans SC | Inter / Space Grotesk / Inter | IBM Plex Mono | 正文中性，标题更有科技感；适合强调产品与数据工具。 |
| C | Noto Sans SC | Inter / Source Serif 4 / Inter | IBM Plex Mono | 仅长篇研究的英文主标题使用衬线体；更接近研究刊物，适合报告与案例叙述。 |

仅安装 A，其他两套保留为设计参考，未增加访问者的下载量。

## 已安装与加载

- `@fontsource/noto-sans-sc@5.3.1`：正常体 400、500、600、700，中文正文与标题。保留包提供的 `unicode-range`，由浏览器按所用字符下载分片。
- `@fontsource/manrope@5.3.0`：Latin 正常体 400、500、600、700，英文正文、标题与数字。
- `@fontsource/ibm-plex-mono@5.3.0`：Latin 正常体 400，日期、项目编号、技术标签和代码。

入口 `src/main.jsx` 显式导入对应的字体 CSS；包内的 `@font-face` 使用 `font-display: swap`，优先加载 WOFF2。字体随 Vite 构建自托管，不依赖 Google Fonts 在线请求。没有加载额外斜体或未使用的字重。

三个字体包均附 SIL Open Font License 1.1，允许在其条款下使用、嵌入和分发。原始版权与完整许可文件保持原样，随站点发布至 `public/licenses/fonts/`。

来源：[Fontsource 安装说明](https://fontsource.org/docs/getting-started/install)、[Noto Sans SC](https://fontsource.org/fonts/noto-sans-sc)、[Manrope](https://fontsource.org/fonts/manrope)、[IBM Plex Mono](https://fontsource.org/fonts/ibm-plex-mono/about)。

## 使用规则

| 元素 | 字体 / 字重 | 排版 |
| --- | --- | --- |
| 中文正文 | Noto Sans SC 400 | 桌面 16–17px，手机 15px 为主；长段落行高 1.85–1.9。 |
| 英文正文与按钮 | Manrope 400 / 500 / 600 | 由用途决定层级，按钮跟随正文家族。 |
| 英文主标题 / 章节标题 | Manrope 700 | 保留现有响应式字号与轻微负字距。 |
| 中文首页标题 | Noto Sans SC 600 | 取消压缩字距，行高 1.45。 |
| 项目标题 / 经历标题 | Manrope + Noto Sans SC 600 | 项目标题行高 1.15，适应英文换行。 |
| 数据数值 | Manrope 600 | 使用 `tabular-nums` 和 `lining-nums`，便于数字对齐。 |
| 日期 / 项目编号 / 代码 | IBM Plex Mono 400 | 标签 10–13px；中文字符回退至已加载的 Noto Sans SC。 |

CSS 变量 `--body`、`--display`、`--mono` 统一管理字体。后备字体保留苹方、微软雅黑或系统等宽字体。未来新增代码块时使用 `code`、`pre`、`kbd` 或 `samp`，自动获得等宽字体。

字体下载完成后通过 `document.fonts.ready` 刷新滚动动画定位，避免慢速网络下换字体导致触发位置偏移。

## 衬线体与屏幕

衬线体适不适合屏幕，取决于具体字体、字号、字重、对比度和设备。较大的研究标题、文章引言和留白充足的长文可以用屏幕优化的衬线体；手机小字号导航、密集数据与深色背景上的细笔画，更适合保持当前无衬线体系。若采用方案 C，先限定在研究长文标题，使用足够的字号与常规或中等字重，并在实际手机上检查笔画和换行。

## 修改位置

- `package.json`、`package-lock.json`：锁定三个 Fontsource 依赖。
- `src/main.jsx`：加载实际使用的字体与字重。
- `src/styles/global.css`：字体变量、数字对齐、中文标题字距和正文行高。
- `src/App.jsx`：字体加载后的布局刷新。
- `index.html`：移除 Google Fonts 远程样式及预连接。
- `public/licenses/fonts/*.txt`：完整字体许可。
- `README.md`：维护入口；本文记录选型与使用规范。
