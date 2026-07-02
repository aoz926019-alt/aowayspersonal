# AO ZHANG — Portfolio (React + Vite + GSAP)

个人作品集基础版。冷调灰纸 + 墨黑 + 深松绿点缀,等宽数据读数为签名元素。
动效用 GSAP + ScrollTrigger:首屏遮罩揭开式开场、滚动时英文大标题进场、卡片
stagger、图片 reveal 与缓慢 parallax,全部 transform/opacity 实现,尊重
`prefers-reduced-motion`。

## 运行

```bash
npm install
npm run dev      # 本地预览 http://localhost:5173
npm run build    # 生产构建 → dist/
npm run preview  # 预览构建产物
```

需要 Node 18+。

## 目录

```
src/
  data/content.js        ← 所有文案集中在这里,改文字只动这一个文件
  styles/global.css      ← 设计 token(颜色/字体/间距)与全部样式
  hooks/gsap.js          ← 注册 ScrollTrigger、缓动常量、reduced-motion 判定
  components/
    Nav.jsx Hero.jsx About.jsx Projects.jsx Strengths.jsx Contact.jsx
```

## 替换素材(占位中)

- **首屏视频**:放到 `public/hero.mp4`(建议静音、缓慢、低饱和的抽象画面)。
  当前有半透明纸色蒙版,没有视频也能正常显示。
- **头像**:`public/portrait.jpg`,然后在 `About.jsx` 把 `.ph` 占位块换成
  `<img className="ph" src="/portrait.jpg" />`。
- **项目图**:`public/projects/*.jpg`,在 `Projects.jsx` 把 `.img` 占位块换成
  对应 `<img>`(parallax 类名保留即可)。

## 改设计的入口

- 颜色 / 字体 / 版心宽度(`--maxw: 1700px`):`src/styles/global.css` 顶部 `:root`。
- 动效节奏:`hooks/gsap.js` 的 `EASE`,以及各组件里的 `duration` / `stagger`。

## React Bits 组件(`src/reactbits/`)

挑了 4 个并配成冷灰 + 深松绿:

| 组件 | 类别 | 用在哪 |
| --- | --- | --- |
| `DotGrid` | Backgrounds | 首屏点阵背景(冷灰点,靠近指针变松绿) |
| `CountUp` | Text Animations | 首屏数据条数字滚动 |
| `SpotlightCard` | Components | 个人优势卡片的松绿光斑 |
| `ShinyText` | Text Animations | 首屏「Open to roles」状态微光 |

依赖:`CountUp` / `ShinyText` 基于 `motion`(framer-motion),已加入 `package.json`。
`SpotlightCard` 纯 CSS,`DotGrid` 用 GSAP。

> **DotGrid 说明**:官方版用了 `gsap/InertiaPlugin`(GSAP 付费插件)。本项目里把它
> 改成了免费 GSAP 实现(短促 push + elastic 回弹),手感一致、props 保持不变。
> 想换回官方原版:`npx jsrepo add https://reactbits.dev/default/Backgrounds/DotGrid`
> 并安装 Club GSAP 的 InertiaPlugin 即可。

想加更多组件,直接 `npx jsrepo add https://reactbits.dev/<variant>/<Category>/<Name>`
(variant 如 `default` / `tailwind`)。比如把段落标题换成 `DecryptedText` 会很贴「仪表」主题。

> 这是基础版本,占位素材已标注清楚。后续按参考继续迭代。
