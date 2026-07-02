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
  tagline:
    "环球商业管理本科生,做数据分析,也亲手把需求做成能跑的产品。专注用量化方法支撑商业决策,从供应链风险面板到 AI 驱动的消费洞察。",
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
    "我是张敖,澳门大学环球商业管理专业本科生(GPA 3.66,专业排名第一),目前在比利时鲁汶大学交换。",
    "我的方法是数据先行:用 SQL、R、Power BI、SPSS 把杂乱的数据变成可读的结论,再用生成式 AI 把想法快速做成能用的看板、工具和 Web 应用。商业分析、战略与财务的训练让我能把数字接回真实的商业决策。",
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
    period: "2026.07 —",
    tag: "Incoming",
    company: "科锐国际 Career International",
    sub: "SZSE: 300662 · 广州",
    role: "校园管培生(校招定向)· 智能驾驶方向",
    desc: "加入中国首家 A 股上市人才服务企业,支持智能驾驶 / 汽车智能化人才板块——目标岗位分析、多渠道人才搜寻、简历筛选、候选人评估与面试推进协调。",
  },
  {
    period: "2026.05 – 2026.08",
    company: "炫图 AI Technology",
    sub: "广州",
    role: "海外运营负责人(Team Lead)",
    desc: "统筹核心 AI 产品的海外运营,覆盖内容运营、用户增长与转化漏斗优化;搭建基础运营看板并输出定期数据复盘,带领小组配合产品迭代提升用户参与度与内容触达。",
  },
  {
    period: "2026.04 – 2026.07",
    company: "问鱼科技 Wenyu Technology",
    sub: "深圳",
    role: "运营实习生",
    desc: "负责公司小红书账号的日常内容发布与运营,搭建并维护用户社群;规范用户咨询转化流程以提升私域转化率,记录效果数据并做定量复盘支撑内容优化。",
  },
  {
    period: "2025.06 – 2025.08",
    company: "道师堂企业管理咨询",
    sub: "四川",
    role: "项目实习生",
    desc: "开展细分市场与竞品分析,将行业数据整合为市场洞察报告支撑咨询提案;识别客户潜在市场与经营风险,协助撰写与打磨营销方案。",
  },
];

export const projects = [
  {
    no: "01",
    title: "MoodSpend",
    role: "Founder / Product",
    desc: "情绪 × 消费洞察的 PWA。内嵌 AI 助手「小月亮」,把每一笔消费和当下的情绪关联起来,自动生成消费画像、心情日记与个性化洞察对话。从用户访谈、PRD 到高保真原型全程主导。",
    tags: ["PWA", "AI Assistant", "Product / PRD", "情绪分析"],
    tint: "tint-a",
    media: "MOODSPEND · 情绪账本",
    image: moodspendImg,
  },
  {
    no: "02",
    title: "Supply Chain Risk",
    role: "Data / Power BI",
    desc: "供应链风险分析与辅助决策面板。处理 110,000+ 条运单记录,构建 Risk Score、Supplier Performance Index 等自定义 KPI,定位高风险供应商与延误根因,以咨询式叙事呈现可量化的商业价值。",
    tags: ["Power BI", "Data Modeling", "110K+ records", "Risk Scoring"],
    fit: "contain",
    tint: "tint-b",
    media: "SUPPLY CHAIN · DASHBOARD",
    image: supplyChainImg,
  },
  {
    no: "03",
    title: "AI PingAnTong+",
    role: "Multi-Agent / PWA",
    desc: "「千模百炼」全国 AI 开发者学生赛道参赛作品。基于 QwenPaw 平台为澳门独居长者设计主动守护的多智能体系统,覆盖有网、无网、零网络三类场景。负责 AI Prompt 多智能体交互脚本设计与家属端数据可视化 PWA 开发。",
    tags: ["Multi-Agent", "QwenPaw", "PWA", "适老化服务"],
    fit: "contain",
    tint: "tint-e",
    media: "AI PINGANTONG+ · 多智能体守护",
    image: aiPingAnTongImg,
  },
  {
    no: "04",
    title: "BYD Equity Research",
    role: "Finance / Research",
    desc: "CFA 协会投资分析大赛(香港赛区)。对比亚迪做基本面分析、行业对标与风险评估,撰写完整研究报告并路演展示。",
    tags: ["Valuation", "Fundamentals", "Equity Research"],
    fit: "contain",
    tint: "tint-c",
    media: "BYD · FUNDAMENTAL ANALYSIS",
    image: bydImg,
  },
  {
    no: "05",
    title: "Immigration Attitudes",
    role: "Quantitative Research",
    desc: "KU Leuven 计量研究(6 人团队)。基于 ESS11 的 11,379 个西欧受访者样本,用多元线性回归识别移民态度的经济与文化驱动因素——政治立场与人际信任的解释力显著强于收入(调整 R² = .183),含完整异方差与共线性诊断。",
    tags: ["R / SPSS", "Regression", "n = 11,379", "Adj. R² = .183"],
    fit: "contain",
    tint: "tint-d",
    media: "ESS11 · MLR MODEL",
    image: immigrationImg,
  },
];

export const capabilities = [
  {
    no: "C-01",
    title: "Data Analysis",
    cn: "数据分析与建模",
    desc: "把杂乱数据变成可读结论:统计建模、商业定量分析、数据处理与可视化,具备扎实的分析底层能力。",
    stack: ["SQL", "R", "Power BI", "SPSS", "Excel"],
  },
  {
    no: "C-02",
    title: "Product & Prototyping",
    cn: "产品与原型",
    desc: "熟练用生成式 AI 完成从需求描述到可运行软件的闭环交付——数据看板、多智能体工作流、小型 Web 应用与 PWA。",
    stack: ["PRD", "Multi-Agent", "PWA", "AI-assisted"],
  },
  {
    no: "C-03",
    title: "Bilingual Communication",
    cn: "双语沟通与商业写作",
    desc: "中英文流利读写与沟通,独立完成商业报告、方案撰写与文书材料,适配双语工作环境。",
    stack: ["TOEFL 97", "商业报告", "方案撰写"],
  },
  {
    no: "C-04",
    title: "Business & Strategy",
    cn: "商业与战略",
    desc: "掌握工商管理全流程核心知识,具备商业分析、战略规划与财务管理的专业训练,能把数字接回决策。",
    stack: ["商业分析", "战略规划", "财务管理"],
  },
];

export const nav = [
  { label: "Profile", href: "#profile" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
