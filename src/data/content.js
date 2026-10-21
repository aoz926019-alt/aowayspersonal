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
  tagline: "我是张敖，香港大学商业分析硕士研0，澳门大学工商管理学士大四在读。使用 MySQL、Python、Excel 与 Power BI 分析招聘需求、企业现金流和供应链风险，也将用户需求转化为 AI 产品与可测试原型。",
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
    "我的实践覆盖招聘数据、企业现金流、供应链风险与 AI 产品。使用 MySQL 查询汇总数据，结合 Python、Excel、SPSS 与 R 完成清洗、统计分析和情景测算，以 Power BI 看板、Word 报告和 PPT 解释结论；也通过用户研究、PRD 与 Vibe Coding 推进 PWA 和 Web 原型。",
  ],
  meta: [
    { k: "Google 认证", v: "商业智能基础 · IT Automation with Python（2026）" },
    { k: "华为认证", v: "开发者认证（2025）" },
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
    focus: "DATA ANALYTICS",
    workflow: ["校验数据", "MySQL 查询", "报告交付"],
    desc: "开展招聘数据分析，校验、去重 1,399,592 条记录，保留 1,055,136 条招聘广告。用 MySQL 按平台、行业与岗位职能分组查询，结合文本规则识别数据及 AI 能力要求，对比技能需求与时期差异。交付交互式 HTML 报告、八页研究摘要及可查询证据，并通过每周 Word 报告与 PPT 展示分析结果。",
  },
  {
    period: "2026.05 – 2026.08",
    company: "炫图 AI 科技",
    sub: "远程",
    role: "海外运营实习生",
    focus: "PRODUCT INSIGHTS",
    workflow: ["收集反馈", "竞品分析", "迭代建议"],
    desc: "在飞书内搭建用户增长与内容表现运营看板，结合用户反馈开展数据分析，将复盘结论整理为内容优化与产品迭代建议。对比四款海外竞品的功能、导出流程及订阅机制，定位官网入口与权益说明问题；在市场分析中设计首次导出率、7 日再次导出率等四项验证指标。",
  },
  {
    period: "2025.06",
    company: "道师堂企业管理咨询",
    sub: "",
    role: "数据分析实习生",
    focus: "BUSINESS MODELLING",
    workflow: ["渠道比较", "Excel 建模", "决策建议"],
    desc: "梳理行业与竞品数据，交付市场分析报告和营销方案。用 Excel 对照便利连锁、企业电商、本地批发三类渠道，明确客户定位与服务差异；搭建 12 个月财务分析模型，比较现款、30 天、60 天回款方案与订单敏感性，评估资金缺口及盈亏平衡，交付决策报告与 90 天试点建议。",
  },
  {
    period: "2024.06 – 2024.08",
    company: "中煤财险",
    sub: "销售管理部",
    role: "销售管理部实习生",
    focus: "RISK RESEARCH",
    workflow: ["责任匹配", "情景测算", "现金流分析"],
    desc: "将安责险等产品责任与客户风险暴露对应，形成行业与客户风险分析报告及责任匹配表，明确核验资料和保障边界。测算含基准在内的四种客户经营假设情景，比较煤价、停产及成本变化对利润的影响，结合净承保与分保现金流识别赔付时点和短期资金压力。",
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
    teaser: "用 MySQL 汇总九份年报数据，分析三家港股汽车企业的现金转化与流动性风险。",
    subtitle: "港股汽车企业现金流与流动性分析",
    role: "Finance / Risk Analytics",
    context: "独立财务研究与建模 · 2026.10",
    desc: "整理比亚迪、吉利汽车、长城汽车 2023—2025 年共九份年报，用 MySQL 按公司、年度与科目查询汇总财务数据，统一单位及重述口径，建立原页索引。分析现金转化、营运资金和债务到期，设置资产负债与现金滚动勾稽检查，测算应收、库存及应付周转天数对资金占用的敏感性。交付企业、年份与现金流指标联动的交互看板，将结论关联至年报原页，形成流动性风险核查要点。",
    deliverable: "MySQL 财务汇总 · 交互看板 · 年报原页索引",
    tags: ["MySQL", "现金流", "财务勾稽", "敏感性分析"],
    skills: ["MySQL", "财务分析", "敏感性分析"],
    image: cashflowImg, w: 1889, h: 1035,
  },
  {
    no: "02",
    title: "Supply Chain Risk",
    category: "data",
    teaser: "清洗并汇总 113,097 条运输记录，以 Power BI 看板比较供应商、成本与交付风险。",
    subtitle: "供应链风险分析与决策支持看板",
    role: "Data / Power BI",
    context: "独立数据分析 · Power BI 看板 · 2026",
    desc: "用 Python、Excel 清洗校验 113,097 条运输记录，通过 MySQL 筛选并分组汇总国家、成本和交货周期数据，形成看板分析底表。用 Power BI 构建风险分布、相关性与国家优先级看板，结合 Python、DAX 计算供应链风险及供应商表现 KPI。通过 PPT 将分析转化为决策报告，对比成本、可靠性和假设情景，提出采购与风险缓释建议。",
    deliverable: "113,097 条记录 · MySQL 分组汇总 · Power BI 与决策报告",
    tags: ["Python / Excel", "MySQL", "Power BI / DAX", "113,097 records"],
    skills: ["Python", "Excel", "MySQL", "Power BI", "PPT"],
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
    desc: "在六人学术团队中，用 SPSS 对 ESS11 八国 11,379 名受访者数据进行变量筛选、描述统计和回归分析，构建含七项预测变量的模型，检验经济与文化因素的关联。完成 White 异方差检验、VIF 及残差诊断，模型调整后 R² 为 0.183；将文化因素关联更强的发现转化为研究结论与政策沟通建议，撰写 Word 研究报告和展示 PPT。",
    deliverable: "八国 11,379 个样本 · SPSS 模型诊断 · 研究报告与 PPT",
    tags: ["SPSS", "Regression", "n = 11,379", "Adj. R² = .183"],
    skills: ["SPSS", "回归分析", "Word", "PPT"],
    image: immigrationImg, w: 853, h: 503,
  },
  {
    no: "04",
    title: "36Kr Campus Research",
    category: "product",
    teaser: "以模拟数据演示问卷筛选、开放题编码与分组统计，结合既有反馈整理 AI 产品需求。",
    subtitle: "36氪 AI 社区内容与校园研究",
    role: "User Research / Excel Analytics",
    context: "校园研究项目 · 问卷与数据分析 · 2026.04 — 2026.07",
    desc: "设计校园 AI 采用、使用场景与需求问卷，用 Excel 整理题库、题型及分析字段，形成问卷收集与数据分析框架。构建质量筛选、开放题编码和分组统计表，以模拟数据演示分析流程；结合既有用户反馈形成需求摘要，输出用户洞察与产品改进案例。",
    deliverable: "问卷框架 · Excel 分析表 · 用户洞察与产品改进案例",
    note: "问卷质量筛选、开放题编码与分组统计使用模拟数据演示；既有用户反馈单独整理。",
    tags: ["Excel", "问卷设计", "开放题编码", "模拟数据演示"],
    skills: ["Excel", "问卷设计", "用户研究"],
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
    desc: "从用户访谈提炼情绪记录与消费管理需求，完成需求分析、产品定位、功能架构及数据流设计，编写 PRD，运用 Vibe Coding 推进个人 PWA 原型开发。将情绪标签与消费记录转为消费数据分析和可视化功能，集成 AI 助手，交付可测试的 PWA 原型，呈现消费结构与情绪趋势。",
    deliverable: "用户访谈与 PRD · 消费数据可视化 · 可测试 PWA 原型",
    source: "https://github.com/aoz926019-alt/MoodSpend",
    demo: "https://aoz926019-alt.github.io/MoodSpend/",
    tags: ["PWA", "AI Assistant", "PRD", "情绪与消费"],
    skills: ["PRD", "PWA", "AI 集成", "Vibe Coding"],
    image: moodspendImg, w: 864, h: 987,
  },
  {
    no: "06",
    title: "AI PingAnTong Plus",
    category: "product",
    teaser: "开发对接 Python 后端的家庭端 PWA，以模拟资料演示长者活动、用药与风险状态。",
    subtitle: "AI 平安通 Plus 长者照护 Agent",
    role: "Agent Development / PWA",
    context: "竞赛初赛项目 · 团队成员 · Agent 开发 · 2026",
    desc: "基于 QwenPaw 设计 Agent 提示词与交互脚本，开发对接 Python 后端的家庭端 PWA，展示活动时间轴、用药和风险数据，撰写项目报告与 PPT。以 20 名模拟长者资料联调状态展示和查询，演示正常、需关注及异常风险在多 Agent 与家庭端 PWA 间的呈现，形成可演示的竞赛初赛原型。",
    deliverable: "Agent 提示词与脚本 · Python 后端对接 · 家庭端 PWA",
    note: "20 名长者资料为模拟数据，用于项目演示。",
    source: "https://github.com/aoz926019-alt/ai-pingantong-plus",
    tags: ["QwenPaw", "Python / PWA", "Multi-Agent", "模拟数据演示"],
    skills: ["Python", "PWA", "Multi-Agent", "提示词设计", "PPT"],
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
    desc: "参与 CFA 研究挑战赛香港区澳门大学校内轮，围绕比亚迪财务报表开展分析，结合行业对标比较盈利能力、资本结构和偿债风险，汇总财务与市场数据，撰写校内轮研究报告及 PPT。",
    deliverable: "盈利与偿债分析 · 行业对标 · 研究报告与 PPT",
    tags: ["财务分析", "行业研究", "风险分析", "团队研究"],
    skills: ["财务分析", "行业研究", "PPT"],
    image: bydImg, w: 1400, h: 789,
  },
];

export const leadership = [
  { period: "2026.08", title: "“千模百炼”AI Agent 创新挑战赛", role: "初赛团队成员 · Agent 开发", category: "AI / 产品开发", type: "AI AGENT", skills: ["QwenPaw", "PWA", "提示词设计"], desc: "围绕适老化服务梳理应用场景，完成 QwenPaw 提示词、交互脚本、PWA 数据可视化及报告，以 20 名模拟长者资料演示分级风险与照护信息。" },
  { period: "2025.11 – 2025.12", title: "第十五届全国运动会澳门赛区新闻中心", role: "后备支持组组长 · 志愿调度", category: "组织 / 运营协作", type: "LEADERSHIP", skills: ["Excel", "人员调度", "团队协作"], desc: "用 Excel 整理岗位需求、轮班缺口与高峰任务，带领 20 人后备团队保障 12 个比赛日，开展人员配置与运营分析，协调志愿者调度和新闻中心现场支持。" },
  { period: "2025.02 – 2025.04", title: "澳门大学大数据分析基础培训", role: "学员及辅导员 · R 语言分析", category: "数据 / 同伴教学", type: "DATA & TEACHING", skills: ["R", "统计分析", "同伴辅导"], desc: "用 R 完成数据清洗、描述统计、可视化与统计建模训练，将商业案例拆解为分析步骤；通过同伴辅导讲解 R 语言分析流程、图表及结果解读。" },
  { period: "2024.08", title: "CFA 研究挑战赛香港区澳门大学校内轮", role: "团队成员 · 财务研究", category: "金融 / 财务研究", type: "EQUITY RESEARCH", skills: ["财务分析", "行业对标", "PPT"], desc: "分析比亚迪财务报表，结合行业对标比较盈利能力、资本结构和偿债风险，汇总财务与市场数据，撰写校内轮研究报告及 PPT。" },
  { period: "2023.12", title: "第六届全国大学生旅游设计竞赛", role: "团队成员 · 市场与用户研究", category: "研究 / 产品策划", type: "PRODUCT STRATEGY", skills: ["市场研究", "用户画像", "原型设计"], desc: "开展旅游项目市场分析、竞品与用户画像研究，比较目标客群、需求场景和产品定位，形成产品方案及原型设计依据，撰写商业设计报告与展示 PPT。" },
  { period: "2023.11", title: "澳门明爱无障碍旅游商业提案比赛", role: "团队负责人 · 商业方案设计", category: "商业 / 方案设计", type: "BUSINESS DESIGN", skills: ["成本效益分析", "风险评估", "PPT"], desc: "带领团队开展无障碍旅游市场分析、风险评估及成本效益分析，结合目标用户、服务投入和合规要求设计 Word 商业方案与 PPT，提出资源配置及经营风险建议。" },
];

export const capabilities = [
  { no: "C-01", title: "Data & Statistics", cn: "数据与统计分析", desc: "用 Excel、Python 清洗校验数据，以 MySQL / SQL 查询和分组汇总；运用 SPSS、R 进行统计与回归分析，通过 Power BI 交互看板及 KPI 设计呈现结论。", stack: ["MySQL / SQL", "Python", "SPSS / R", "Power BI", "Excel"] },
  { no: "C-02", title: "AI & Product", cn: "AI 与产品原型", desc: "从用户研究与需求分析出发，编写 PRD，运用 Vibe Coding、生成式 AI 与提示词设计，推进多 Agent 流程及 PWA、Web 原型开发。", stack: ["用户研究", "PRD", "Vibe Coding", "提示词设计", "Multi-Agent", "PWA / Web"] },
  { no: "C-03", title: "Business Communication", cn: "双语沟通与商业表达", desc: "中文母语，英文可作为工作语言（TOEFL 97）。通过 Word 研究报告、PowerPoint 汇报及双语商业写作，解释分析方法、结果与建议。", stack: ["TOEFL 97", "Word 报告", "PowerPoint", "双语表达"] },
  { no: "C-04", title: "Financial & Industry Research", cn: "财务与行业研究", desc: "开展财务报表、现金流、市场与竞品分析；用 Excel 搭建财务模型及假设情景，比较回款方案、资金缺口和盈亏平衡，形成业务决策建议。", stack: ["财务报表", "现金流分析", "Excel 建模", "情景测算", "市场与竞品"] },
];

export const nav = [
  { label: "关于", href: "#profile" },
  { label: "精选项目", href: "#work" },
  { label: "经历", href: "#experience" },
  { label: "能力", href: "#skills" },
  { label: "联系", href: "#contact" },
];
