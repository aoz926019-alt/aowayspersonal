// Single source of truth for site copy. Edit here to update content.

import moodspendImg from "../assets/projects/moodspend.webp";
import supplyChainImg from "../assets/projects/supply-chain.webp";
import immigrationImg from "../assets/projects/immigration.webp";
import aiPingAnTongImg from "../assets/projects/ai-pingantong.webp";
import bydImg from "../assets/projects/byd.webp";
import portraitImg from "../assets/portrait.webp";

export const profile = {
  portrait: portraitImg,
  nameLines: ["AO", "ZHANG"],
  role: "Business Analytics & Product",
  location: "Macau · Taipa",
  available: "27 Fall · Open to roles",
  headline: "读懂数据，做出产品。",
  tagline:
    "我是张敖，澳门大学环球商业管理本科生。关注商业分析与 AI 产品，将业务问题转化为分析结论、可视化看板与可运行的应用。",
  email: "za2023100@163.com",
  phone: "+86 193 3541 1590",
  website: "https://aoz926019-alt.github.io/aowayspersonal/",
  github: "https://github.com/aoz926019-alt",
};

export const stats = [
  { value: 3.66, suffix: "", lab: "GPA / 4.0" },
  { value: 1, suffix: " / 26", lab: "专业排名 Rank" },
  { value: 97, suffix: "", lab: "TOEFL" },
  { value: 4, suffix: "×", lab: "院长荣誉榜 Dean's" },
];

export const about = {
  body: [
    "在澳门大学学习环球商业管理，并完成比利时鲁汶大学的交换学期。商业、战略与财务课程构成了我理解业务的基础，数据分析与产品实践则让我把问题推进到具体的解决方案。",
    "我习惯先明确问题，再选择方法：用 SQL、R、Power BI 和 SPSS 整理数据、检验判断，用生成式 AI 辅助原型与应用开发。作品覆盖供应链风险、消费行为、长者服务与金融研究。",
  ],
  meta: [
    { k: "学历", v: "BBA · 环球商业管理" },
    { k: "院校", v: "澳门大学 / KU Leuven" },
    { k: "方向", v: "商业分析 · 产品" },
    { k: "语言", v: "中文 / English" },
    { k: "工具", v: "SQL · R · Power BI · SPSS · Python" },
    { k: "竞赛", v: "CFA 研究挑战赛 · 千模百炼 AI 开发者赛" },
    { k: "Google", v: "BI Foundations · IT Automation (Python)" },
    { k: "华为", v: "开发者认证" },
  ],
};

export const experience = [
  {
    period: "2026.07 – 2026.09",
    company: "科锐国际 Career International",
    sub: "SZSE: 300662 · 广州",
    role: "校园管培生(校招定向)· 智能驾驶方向",
    desc: "支持智能驾驶与汽车智能化领域的人才招聘，参与目标岗位分析、多渠道人才搜寻及简历筛选，协助候选人评估与面试协调。",
  },
  {
    period: "2026.05 – 2026.08",
    company: "炫图 AI Technology",
    sub: "广州",
    role: "海外运营负责人(Team Lead)",
    desc: "统筹 AI 产品的海外内容运营与用户增长，搭建基础运营看板，跟踪转化漏斗并开展定期复盘；协调小组与产品团队，支持内容优化与产品迭代。",
  },
  {
    period: "2026.04 – 2026.07",
    company: "问鱼科技 Wenyu Technology",
    sub: "深圳",
    role: "运营实习生",
    desc: "负责小红书账号内容发布与用户社群维护，梳理用户咨询及转化流程，记录运营数据并开展定量复盘，为内容调整提供依据。",
  },
  {
    period: "2025.06 – 2025.08",
    company: "道师堂企业管理咨询",
    sub: "四川",
    role: "项目实习生",
    desc: "开展细分市场与竞品分析，将行业数据整理为市场洞察报告，支持咨询提案；识别潜在市场机会与经营风险，协助撰写营销方案。",
  },
];

export const projects = [
  {
    no: "01",
    title: "MoodSpend",
    subtitle: "情绪与消费洞察",
    role: "Founder / Product",
    desc: "将消费记录与当下情绪关联的 PWA，内嵌 AI 助手「小月亮」，提供消费画像、心情日记与个性化洞察对话。我主导用户访谈、需求文档与高保真原型设计。",
    deliverable: "用户访谈 → PRD → 产品原型",
    source: "https://github.com/aoz926019-alt/MoodSpend",
    tags: ["PWA", "AI Assistant", "Product / PRD", "情绪分析"],
    tint: "tint-a",
    media: "MOODSPEND · 情绪账本",
    image: moodspendImg,
    w: 864,
    h: 987,
  },
  {
    no: "02",
    title: "Supply Chain Risk",
    subtitle: "供应链风险与决策看板",
    role: "Data / Power BI",
    desc: "基于 110,000+ 条运单记录构建供应链分析面板，设计风险评分与供应商绩效指标，识别高风险供应商及延误原因，将明细数据整理为可供业务讨论的风险视图。",
    deliverable: "110K+ 运单记录 · 风险评分 · Power BI 看板",
    tags: ["Power BI", "Python", "Data Modeling", "110K+ records", "Risk Scoring"],
    tint: "tint-b",
    media: "SUPPLY CHAIN · DASHBOARD",
    image: supplyChainImg,
    w: 1400,
    h: 809,
  },
  {
    no: "03",
    title: "AI PingAnTong+",
    subtitle: "面向独居长者的主动守护",
    role: "Multi-Agent / PWA",
    desc: "「千模百炼」全国 AI 开发者学生赛道参赛作品。基于阿里云百炼 QwenPaw 平台，探索澳门独居长者的多场景守护服务；我负责多智能体交互脚本设计与家属端数据可视化 PWA 开发。",
    deliverable: "多智能体交互脚本 · 家属端 PWA",
    source: "https://github.com/aoz926019-alt/ai-pingantong-plus",
    tags: ["Multi-Agent", "QwenPaw", "PWA", "适老化服务"],
    tint: "tint-e",
    media: "AI PINGANTONG+ · 多智能体守护",
    image: aiPingAnTongImg,
    w: 1300,
    h: 824,
  },
  {
    no: "04",
    title: "BYD Equity Research",
    subtitle: "比亚迪基本面与估值研究",
    role: "Finance / Research",
    desc: "CFA 协会投资分析大赛香港赛区作品。围绕比亚迪开展基本面分析、行业对标与风险评估，形成研究报告并完成路演展示。",
    deliverable: "基本面分析 · 研究报告 · 路演展示",
    tags: ["PPT/Excel", "Valuation", "Fundamentals", "Equity Research"],
    tint: "tint-c",
    media: "BYD · FUNDAMENTAL ANALYSIS",
    image: bydImg,
    w: 1400,
    h: 789,
  },
  {
    no: "05",
    title: "Immigration Attitudes",
    subtitle: "移民态度的经济与文化因素",
    role: "Quantitative Research",
    desc: "KU Leuven 六人团队计量研究。基于 ESS11 的 11,379 个西欧受访者样本，使用多元线性回归分析移民态度的经济与文化因素；模型调整 R² 为 .183，并完成异方差与共线性诊断。",
    deliverable: "11,379 个样本 · 多元回归 · 模型诊断",
    tags: ["Excel / SPSS", "Regression", "n = 11,379", "Adj. R² = .183"],
    tint: "tint-d",
    media: "ESS11 · MLR MODEL",
    image: immigrationImg,
    w: 853,
    h: 503,
  },
];

export const capabilities = [
  {
    no: "C-01",
    title: "Data Analysis",
    cn: "数据分析与建模",
    desc: "从数据清洗、指标设计到统计建模与可视化，将业务问题拆解为可检验的分析任务。",
    stack: ["SQL", "R", "Power BI", "SPSS", "Excel"],
  },
  {
    no: "C-02",
    title: "Product & Prototyping",
    cn: "产品与原型",
    desc: "梳理用户需求、撰写 PRD，并借助生成式 AI 开发原型、数据看板与 PWA，将想法转化为可体验的产品。",
    stack: ["PRD", "Multi-Agent", "PWA", "AI-assisted"],
  },
  {
    no: "C-03",
    title: "Bilingual Communication",
    cn: "双语沟通与商业写作",
    desc: "以中英文撰写商业报告与项目方案，通过清晰的结构、图表与展示，解释分析过程和结论。",
    stack: ["TOEFL 97", "商业报告", "方案撰写"],
  },
  {
    no: "C-04",
    title: "Business & Strategy",
    cn: "商业与战略",
    desc: "结合商业分析、战略与财务训练，理解指标背后的经营问题，形成有依据的判断与建议。",
    stack: ["商业分析", "战略规划", "财务管理"],
  },
];

export const nav = [
  { label: "关于", href: "#profile" },
  { label: "精选项目", href: "#work" },
  { label: "经历", href: "#experience" },
  { label: "能力", href: "#skills" },
  { label: "联系", href: "#contact" },
];
