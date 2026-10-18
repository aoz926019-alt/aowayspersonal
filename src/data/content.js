// Website copy aligned with the supplied Chinese resume and user-confirmed education wording.
import moodspendImg from "../assets/projects/moodspend.webp";
import supplyChainImg from "../assets/projects/supply-chain.webp";
import immigrationImg from "../assets/projects/immigration.webp";
import aiPingAnTongImg from "../assets/projects/ai-pingantong.webp";
import bydImg from "../assets/projects/byd.webp";
import portraitImg from "../assets/portrait.webp";
import campusResearchImg from "../assets/projects/36kr-campus-research.png";
import cashflowImg from "../assets/projects/auto-cashflow.png";

export const profile = {
  portrait: portraitImg,
  nameLines: ["AO", "ZHANG"],
  role: "Business Analytics & AI Product",
  location: "Macau, China",
  available: "HKU · 商业分析硕士研0",
  headline: "读懂数据，做出产品。",
  tagline: "我是张敖，香港大学商业分析硕士研0，澳门大学工商管理学士大四在读。关注商业分析与 AI 产品，用数据研究业务问题，将结论转化为看板、报告和可测试原型。",
  email: "za2023100@163.com",
  phone: "+86 193 3541 1590",
  website: "https://aoz926019-alt.github.io/aowayspersonal/",
  github: "https://github.com/aoz926019-alt",
};

export const stats = [
  { value: 3.66, suffix: "", lab: "澳门大学 GPA / 4.0" },
  { value: 1, suffix: "", lab: "专业排名 Rank" },
  { value: 97, suffix: "", lab: "TOEFL" },
  { value: 4, suffix: "×", lab: "连续四学期院长荣誉榜" },
];

export const about = {
  body: [
    "香港大学商业分析硕士研0，现为澳门大学工商管理学士大四学生。2026 年 2 月至 6 月，在比利时鲁汶大学经济与商业学院完成交换学习。",
    "我的实践覆盖招聘数据、供应链风险、企业现金流和 AI 产品。习惯先明确业务问题，再通过数据清洗、统计检验与可视化形成判断；也将用户需求整理为 PRD，借助生成式 AI 推进 PWA 与 Web 原型。",
  ],
  meta: [
    { k: "Google 认证", v: "商业智能基础 · IT Automation with Python（2026）" },
    { k: "华为认证", v: "开发者认证 · 初级（2025）" },
    { k: "学业荣誉", v: "澳门大学奖学金 · 连续四学期院长荣誉榜" },
    { k: "翻译竞赛", v: "全国大学生科技翻译竞赛 · 全国三等奖" },
  ],
};

export const education = [
  { school: "香港大学", program: "商业分析硕士", location: "中国香港", period: "研0" },
  { school: "澳门大学", program: "工商管理学士 · 大四在读", location: "中国澳门", period: "2023.08 — 2027" },
  { school: "鲁汶大学 KU Leuven", program: "经济与商业学院 · 学期交换", location: "比利时布鲁塞尔", period: "2026.02 — 2026.06" },
];

export const experience = [
  {
    period: "2026.07 – 2026.09",
    company: "科锐国际 Career International",
    sub: "广州",
    role: "招聘数据分析实习生",
    desc: "开展实习延伸分析，校验并去重 1,399,592 条招聘记录，保留 1,055,136 条用于岗位需求研究。按文本规则识别岗位及数据、AI 能力要求，分平台、行业和岗位比较职能与时期差异，交付交互式 HTML 报告与八页研究摘要。",
  },
  {
    period: "2026.05 – 2026.08",
    company: "炫图 AI 科技",
    sub: "远程",
    role: "海外运营实习生",
    desc: "分析用户增长与内容表现，支持 AI 产品海外内容运营，形成内容优化建议；搭建运营看板，汇总用户需求与数据复盘结论，为产品迭代提供反馈。",
  },
  {
    period: "2025.06",
    company: "道师堂企业管理咨询",
    sub: "",
    role: "数据分析实习生",
    desc: "开展细分市场与竞品研究，交付市场洞察报告及咨询类营销方案；评估潜在市场机会与经营风险，将数据分析结论转化为项目建议。",
  },
  {
    period: "2024.06 – 2024.08",
    company: "中煤财险",
    sub: "销售管理部",
    role: "销售管理部实习生",
    desc: "梳理保险产品与煤炭客户风险暴露，分析供需及价格变化对客户经营韧性的影响。在实习回顾案例中测算经营利润、净承保结果与分保现金流的假设情景，明确经营损失与保险赔款口径。",
  },
];

export const projectCategories = [
  { id: "all", label: "全部项目" },
  { id: "data", label: "数据分析" },
  { id: "finance", label: "财务研究" },
  { id: "product", label: "用户与产品" },
];

export const projects = [
  {
    no: "01",
    title: "Auto Cash Flow Analysis",
    category: "finance",
    teaser: "对照九份年报，分析三家港股汽车企业的现金转化与流动性风险。",
    subtitle: "港股汽车企业现金流与流动性分析",
    role: "Finance / Risk Analytics",
    context: "个人项目 · 2026.10",
    desc: "整理比亚迪、吉利汽车、长城汽车 2023—2025 年共九份年报，建立财务数据与原页索引，统一单位及报告口径。分析现金转化、营运资金与债务到期，设置财务勾稽检查，测算周转天数对资金占用的敏感性，并将交互看板中的结论关联至年报原页。",
    deliverable: "三家公司 · 九份年报 · 交互看板与原页索引",
    tags: ["现金流", "营运资金", "财务勾稽", "敏感性分析"],
    image: cashflowImg, w: 1889, h: 1035,
  },
  {
    no: "02",
    title: "Supply Chain Risk",
    category: "data",
    teaser: "以 113,097 条运输记录，识别供应商、来源国家与交付周期风险。",
    subtitle: "供应链风险分析与决策支持看板",
    role: "Data / Power BI",
    context: "个人项目 · 2026",
    desc: "分析 113,097 条运输记录，构建供应链风险与供应商表现 KPI，比较来源暴露和交付风险。交付 Power BI 交互看板与报告，定位国家、供应商及交货周期风险，梳理缓释优先级。",
    deliverable: "113,097 条运输记录 · 风险 KPI · Power BI 看板",
    tags: ["Python", "Power BI", "Excel", "113,097 records"],
    image: supplyChainImg, w: 1400, h: 809,
  },
  {
    no: "03",
    title: "Immigration Attitudes",
    category: "data",
    teaser: "基于八国 11,379 名受访者，检验移民态度与经济、文化因素的关联。",
    subtitle: "西欧移民态度影响因素定量研究",
    role: "Quantitative Research / SPSS",
    context: "学术研究 · 六人团队共同作者 · 2026",
    desc: "基于 ESS11 八国 11,379 名受访者数据，构建七项预测变量的回归模型，完成 White、VIF 及残差诊断。研究识别出文化因素更强的关联，模型调整后 R² 为 0.183，并形成政策沟通与社会融入建议。",
    deliverable: "八国 11,379 个样本 · 七项预测变量 · 模型诊断",
    tags: ["SPSS", "Regression", "n = 11,379", "Adj. R² = .183"],
    image: immigrationImg, w: 853, h: 503,
  },
  {
    no: "04",
    title: "36Kr Campus Research",
    category: "product",
    teaser: "从校园问卷设计与用户反馈出发，整理 AI 产品与社区需求。",
    subtitle: "36氪 AI 社区内容与校园研究",
    role: "User Research / Community Insights",
    context: "校园研究项目 · 2026.04 — 2026.07",
    desc: "围绕校园用户的 AI 产品采用与需求设计问卷，规划校园渠道分发路径；整理用户反馈，形成产品与社区需求洞察摘要，支持团队讨论。",
    deliverable: "问卷设计 · 校园分发路径 · 用户洞察摘要",
    tags: ["用户研究", "问卷设计", "AI 产品", "社区需求"],
    image: campusResearchImg, w: 961, h: 905,
  },
  {
    no: "05",
    title: "MoodSpend",
    category: "product",
    teaser: "将情绪记录、消费洞察与 AI 助手整合为可测试的 PWA 原型。",
    subtitle: "情绪与消费洞察 PWA",
    role: "Founder / Product",
    context: "个人原型 · 2025 — 2026",
    desc: "完成用户访谈、需求定位、功能与数据流设计，编写 PRD，推进 AI 情绪及消费记录产品。集成情绪标签、消费洞察与 AI 助手，交付可测试的 PWA 原型。",
    deliverable: "用户访谈 → PRD → 可测试 PWA 原型",
    source: "https://github.com/aoz926019-alt/MoodSpend",
    demo: "https://aoz926019-alt.github.io/MoodSpend/",
    tags: ["PWA", "AI Assistant", "PRD", "情绪与消费"],
    image: moodspendImg, w: 864, h: 987,
  },
  {
    no: "06",
    title: "AI PingAnTong Plus",
    category: "product",
    teaser: "结合 QwenPaw 与家庭端 PWA，以模拟资料演示长者照护的风险状态。",
    subtitle: "AI 平安通 Plus 长者照护 Agent",
    role: "Multi-Agent / PWA",
    context: "竞赛初赛项目 · 团队成员 · 2026",
    desc: "作为团队成员与商业管理方向贡献者，搭建 QwenPaw 架构，编写 AI 提示词与多 Agent 脚本，开发家庭端 PWA 可视化并撰写报告。以 20 名模拟长者资料演示正常、需关注及异常风险状态，形成多智能体系统。",
    deliverable: "多 Agent 脚本 · 家庭端 PWA · 项目报告",
    note: "20 名长者资料为模拟数据，用于项目演示。",
    source: "https://github.com/aoz926019-alt/ai-pingantong-plus",
    tags: ["QwenPaw", "Multi-Agent", "PWA", "模拟数据演示"],
    image: aiPingAnTongImg, w: 1300, h: 824,
  },
  {
    no: "07",
    title: "BYD Equity Research",
    category: "finance",
    teaser: "通过财务报表、行业对标与风险分析，协作完成比亚迪研究报告。",
    subtitle: "CFA 研究挑战赛比亚迪研究",
    role: "Finance / Equity Research",
    context: "香港区澳门大学校内轮 · 团队成员 · 2024.08",
    desc: "参与 CFA 研究挑战赛香港区澳门大学校内轮，分析比亚迪财务报表、行业对标与主要风险，协作撰写团队研究报告。",
    deliverable: "财务报表分析 · 行业对标 · 团队研究报告",
    tags: ["财务分析", "行业研究", "风险分析", "团队研究"],
    image: bydImg, w: 1400, h: 789,
  },
];

export const leadership = [
  { period: "2026.08", title: "“千模百炼”AI Agent 创新挑战赛", role: "团队成员 · 初赛", desc: "基于 QwenPaw 构建 AI 平安通 Plus 多智能体系统，负责提示词、交互脚本、家庭端 PWA 可视化及报告，以模拟资料演示长者风险状态。" },
  { period: "2025.11 – 2025.12", title: "第十五届全国运动会澳门赛区新闻中心", role: "后备支持组组长及志愿者", desc: "带领 20 人后备团队保障 12 个比赛日，调配志愿者覆盖轮班缺口与高峰需求。" },
  { period: "2024.08", title: "CFA 研究挑战赛香港区澳门大学校内轮", role: "团队成员", desc: "分析比亚迪财务报表、行业对标与主要风险，协作完成团队研究报告。" },
  { period: "2023.12", title: "第六届全国大学生旅游设计竞赛", role: "团队成员", desc: "完成市场研究、竞品分析与用户画像，支持旅游产品及原型设计。" },
  { period: "2023.11", title: "澳门明爱无障碍旅游商业提案比赛", role: "团队负责人", desc: "带领团队完成商业提案，涵盖市场风险、成本效益、合规及经营建议。" },
];

export const capabilities = [
  { no: "C-01", title: "Data & Statistics", cn: "数据与统计分析", desc: "运用回归分析、假设检验与模型诊断检验业务判断，结合 KPI 设计与可视化呈现结论；通过 Python 脚本与自动化处理重复的数据任务。", stack: ["SQL", "R", "SPSS", "Power BI", "Excel", "Python"] },
  { no: "C-02", title: "AI & Product", cn: "AI 与产品原型", desc: "围绕用户需求开展研究与 PRD 设计，使用 Vibe Coding、生成式 AI 与提示词设计推进多 Agent 流程及 PWA、Web 原型。", stack: ["用户研究", "PRD", "Vibe Coding", "Multi-Agent", "PWA"] },
  { no: "C-03", title: "Business Communication", cn: "双语沟通与商业写作", desc: "中文母语，英文听说读写流畅，可作为工作语言。以中英文撰写商业报告和项目方案，清晰解释分析方法、结论与建议。", stack: ["TOEFL 97", "双语报告", "方案写作"] },
  { no: "C-04", title: "Financial & Industry Research", cn: "财务与行业研究", desc: "整理财务报表与行业资料，开展企业对标、市场与竞品研究，结合现金流、营运资金及风险暴露形成可讨论的业务判断。", stack: ["财务报表", "行业研究", "现金流", "风险分析"] },
];

export const nav = [
  { label: "关于", href: "#profile" },
  { label: "精选项目", href: "#work" },
  { label: "经历", href: "#experience" },
  { label: "能力", href: "#skills" },
  { label: "联系", href: "#contact" },
];
