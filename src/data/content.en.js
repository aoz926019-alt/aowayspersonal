import * as zh from "./content.js";
import cashflowCover from "../assets/projects/en/01.svg";
import supplyCover from "../assets/projects/en/02.svg";
import immigrationCover from "../assets/projects/en/03.svg";
import campusCover from "../assets/projects/en/04.svg";
import moodCover from "../assets/projects/en/05.svg";
import careCover from "../assets/projects/en/06.svg";
import bydCover from "../assets/projects/en/07.svg";

export const profile = {
  ...zh.profile,
  available: "HKU MSc BA · Pre-enrolment",
  headline: "Understand the data. Build the product.",
  tagline: "I'm Ao Zhang, a pre-enrolment MSc Business Analytics student at HKU and a final-year BBA student at the University of Macau. I use MySQL, Python, Excel and Power BI to analyse hiring demand, corporate cash flow and supply-chain risk, and turn user needs into AI products and testable prototypes.",
};
export const stats = zh.stats.map((stat, index) => ({ ...stat, lab: ["University of Macau GPA / 4.0", "Rank in major", "TOEFL", "Consecutive semesters on the Dean's List"][index] }));
export const about = {
  body: [
    "I am a pre-enrolment MSc Business Analytics student at the University of Hong Kong and a final-year BBA student at the University of Macau. From February to June 2026, I completed an exchange semester at KU Leuven's Faculty of Economics and Business in Belgium.",
    "My work spans recruitment data, corporate cash flow, supply-chain risk and AI products. I query and aggregate data in MySQL, then use Python, Excel, SPSS and R for cleaning, statistical analysis and scenario modelling. I communicate findings through Power BI dashboards, Word reports and presentations, and develop PWA and web prototypes through user research, PRDs and Vibe Coding.",
  ],
  meta: [
    { k: "Google credentials", v: "Foundations of Business Intelligence · IT Automation with Python (2026)" },
    { k: "Huawei credential", v: "Developer certification (2025)" },
    { k: "Academic honours", v: "University of Macau scholarship · Dean's List for four consecutive semesters" },
    { k: "Translation competition", v: "National College Science and Technology Translation Competition · National Third Prize" },
  ],
};
export const education = [
  { school: "The University of Hong Kong", program: "MSc in Business Analytics", location: "Hong Kong, China", period: "Pre-enrolment" },
  { school: "University of Macau", program: "Bachelor of Business Administration · Final-year student", location: "Macau, China", period: "2023.08 — 2027" },
  { school: "KU Leuven", program: "Faculty of Economics and Business · Exchange semester", location: "Brussels, Belgium", period: "2026.02 — 2026.06" },
];
export const experience = zh.experience.map((item, index) => ({ ...item, ...[
  { company: "Career International", sub: "Guangzhou", role: "Recruitment Data Analytics Intern", desc: "Validated and deduplicated 1,399,592 records, retaining 1,055,136 job advertisements. Used MySQL to group data by platform, industry and function, and text rules to identify data and AI skill requirements and compare changes over time. Delivered an interactive HTML report, an eight-page research summary and queryable evidence, with weekly Word reports and presentations." },
  { company: "XuanTu AI Technology", sub: "Remote", role: "Overseas Operations Intern", desc: "Built user-growth and content-performance dashboards in Feishu and combined analytics with user feedback to propose content and product improvements. Compared four overseas competitors' features, export journeys and subscriptions, identifying issues with website entry points and plan descriptions. Designed four validation metrics, including first-export rate and seven-day repeat-export rate." },
  { company: "Daoshitang Business Consulting", sub: "", role: "Data Analytics Intern", desc: "Organised industry and competitor data into market research and marketing proposals. Used Excel to compare convenience chains, corporate e-commerce and local wholesalers, clarifying customer positioning and service differences. Built a 12-month financial model comparing upfront, 30-day and 60-day collection terms and order sensitivities. Assessed funding gaps and break-even conditions, and delivered a decision report and a 90-day pilot proposal." },
  { company: "Zhongmei Property Insurance", sub: "Sales Management Department", role: "Sales Management Intern", desc: "Mapped insurance coverage, including work-safety liability products, to client risk exposures, producing industry and client risk reports and coverage-matching tables. Modelled four operating scenarios, including the base case, to assess the effects of coal prices, shutdowns and costs on profit. Compared net underwriting and reinsurance cash flows to identify claims-timing and short-term funding pressures." },
][index] }));
export const projectCategories = [
  { id: "all", label: "All projects" }, { id: "data", label: "Data analytics" },
  { id: "finance", label: "Financial research" }, { id: "product", label: "Users & products" },
];
const covers = [cashflowCover, supplyCover, immigrationCover, campusCover, moodCover, careCover, bydCover];
const projectCopy = [
  {
    teaser: "Aggregate nine annual reports in MySQL to study cash conversion and liquidity risk across three Hong Kong-listed automakers.",
    subtitle: "Cash flow and liquidity analysis of Hong Kong-listed automakers", context: "Independent financial research and modelling · 2026.10",
    desc: "Compiled nine annual reports from BYD, Geely Auto and Great Wall Motor for 2023–2025. Used MySQL to query and aggregate data by company, year and account, standardise units and restatements, and index source pages. Analysed cash conversion, working capital and debt maturities; added balance-sheet and cash-roll-forward reconciliation checks; and tested the sensitivity of funding requirements to receivable, inventory and payable days. Delivered an interactive dashboard linked to source pages and a set of liquidity-risk review points.",
    deliverable: "MySQL financial aggregation · Interactive dashboard · Annual-report source index",
    tags: ["MySQL", "Cash flow", "Financial reconciliation", "Sensitivity analysis"], skills: ["MySQL", "Financial analysis", "Sensitivity analysis"],
  },
  {
    teaser: "Clean and aggregate 113,097 shipment records and use Power BI to compare supplier, cost and delivery risks.",
    subtitle: "Supply-chain risk analysis and decision-support dashboards", context: "Independent data analysis · Power BI dashboards · 2026",
    desc: "Cleaned and validated 113,097 shipment records in Python and Excel. Used MySQL to filter and aggregate country, cost and delivery-time data into dashboard-ready tables. Built Power BI views of risk distribution, correlations and country priorities, using Python and DAX for supply-chain risk and supplier-performance KPIs. Converted the findings into a presentation comparing cost, reliability and hypothetical scenarios, with procurement and risk-mitigation recommendations.",
    deliverable: "113,097 records · MySQL aggregation · Power BI dashboards and decision report",
    tags: ["Python / Excel", "MySQL", "Power BI / DAX", "113,097 records"], skills: ["Python", "Excel", "MySQL", "Power BI", "PowerPoint"],
  },
  {
    teaser: "Study how economic and cultural factors relate to immigration attitudes among 11,379 respondents in eight countries.",
    subtitle: "Quantitative research on immigration attitudes in Western Europe", context: "Academic research · Co-author in a six-person team · 2026",
    desc: "Worked in a six-person academic team to select variables, produce descriptive statistics and run regressions in SPSS using ESS11 data from 11,379 respondents across eight countries. Built a seven-predictor model and ran White heteroskedasticity tests, VIF checks and residual diagnostics. The model had an adjusted R² of 0.183. Communicated the stronger association of cultural factors in a Word research report and presentation, with implications for policy communication.",
    deliverable: "Eight countries, 11,379 respondents · SPSS diagnostics · Research report and presentation",
    tags: ["SPSS", "Regression", "n = 11,379", "Adj. R² = .183"], skills: ["SPSS", "Regression", "Word", "PowerPoint"],
  },
  {
    teaser: "Demonstrate survey screening, open-response coding and grouped analysis with simulated data, alongside existing user feedback.",
    subtitle: "AI community content and campus user research for 36Kr", context: "Campus research project · Survey design and data analysis · 2026.04 — 2026.07",
    desc: "Designed a campus survey covering AI adoption, usage scenarios and user needs. Organised the question bank, response types and analysis fields in Excel to create a collection and analysis framework. Built quality-screening, open-response coding and grouped-statistics tables, using simulated data to demonstrate the workflow. Summarised needs from existing user feedback separately and developed user-insight and product-improvement cases.",
    deliverable: "Survey framework · Excel analysis tables · User-insight and product-improvement cases",
    note: "Survey screening, open-response coding and grouped statistics use simulated data for demonstration. Existing user feedback is documented separately.",
    tags: ["Excel", "Survey design", "Open-response coding", "Simulated-data demo"], skills: ["Excel", "Survey design", "User research"],
  },
  {
    teaser: "Combine mood logging, spending insights and an AI assistant in a testable PWA prototype.",
    subtitle: "A PWA for mood and spending insights", context: "Personal prototype · 2025 — 2026",
    desc: "Used user interviews to define needs for mood logging and spending management. Developed requirements, product positioning, feature architecture and data flows, then wrote a PRD and used Vibe Coding to build a personal PWA prototype. Turned mood tags and spending records into analytics and visualisations, integrated an AI assistant, and delivered a testable prototype showing spending composition and mood trends.",
    deliverable: "User interviews and PRD · Spending visualisations · Testable PWA prototype",
    tags: ["PWA", "AI Assistant", "PRD", "Mood & spending"], skills: ["PRD", "PWA", "AI integration", "Vibe Coding"],
  },
  {
    teaser: "Connect a family-facing PWA to a Python backend and demonstrate older adults' activity, medication and risk status using simulated profiles.",
    subtitle: "AI PingAnTong Plus: an elderly-care agent prototype", context: "Preliminary-round competition project · Team member, agent development · 2026",
    desc: "Designed agent prompts and interaction scripts in QwenPaw and developed a family-facing PWA connected to a Python backend. Displayed activity timelines, medication and risk data, and prepared a project report and presentation. Used 20 simulated older-adult profiles to test status displays and queries, demonstrating normal, attention-needed and abnormal risk states across multiple agents and the family PWA. Delivered a demonstrable preliminary-round prototype.",
    deliverable: "Agent prompts and scripts · Python backend integration · Family-facing PWA",
    note: "All 20 older-adult profiles are simulated and used for project demonstration.",
    tags: ["QwenPaw", "Python / PWA", "Multi-Agent", "Simulated-data demo"], skills: ["Python", "PWA", "Multi-Agent", "Prompt design", "PowerPoint"],
  },
  {
    teaser: "Collaborate on a BYD research report through financial-statement analysis, industry benchmarking and risk assessment.",
    subtitle: "BYD research for the CFA Institute Research Challenge", context: "University of Macau internal round, Hong Kong region · Team member · 2024.08",
    desc: "Participated in the University of Macau internal round of the CFA Institute Research Challenge in the Hong Kong region. Analysed BYD's financial statements and used industry benchmarks to compare profitability, capital structure and solvency risk. Compiled financial and market data and contributed to the internal-round research report and presentation.",
    deliverable: "Profitability and solvency analysis · Industry benchmarking · Report and presentation",
    tags: ["Financial analysis", "Industry research", "Risk analysis", "Team research"], skills: ["Financial analysis", "Industry research", "PowerPoint"],
  },
];
export const projects = zh.projects.map((project, index) => ({ ...project, ...projectCopy[index], originalImage: project.image, image: covers[index], w: 1200, h: 760 }));
export const leadership = zh.leadership.map((item, index) => ({ ...item, ...[
  { title: "Qianmo Bailian AI Agent Innovation Challenge", role: "Preliminary-round team member · Agent development", category: "AI / Product Development", skills: ["QwenPaw", "PWA", "Prompt design"], desc: "Defined elderly-care scenarios and developed QwenPaw prompts, interaction scripts, PWA visualisations and a project report. Used 20 simulated older-adult profiles to demonstrate risk tiers and care information." },
  { title: "15th National Games: Macau Press Centre", role: "Reserve Support Team Leader · Volunteer coordination", category: "Organisation / Operations", skills: ["Excel", "Staff scheduling", "Team coordination"], desc: "Used Excel to organise staffing needs, shift gaps and peak workloads. Led a 20-person reserve team across 12 competition days, analysed staffing and operations, and coordinated volunteer scheduling and on-site press-centre support." },
  { title: "University of Macau Big Data Analysis Training", role: "Participant and peer tutor · R analysis", category: "Data / Peer Teaching", skills: ["R", "Statistical analysis", "Peer tutoring"], desc: "Trained in data cleaning, descriptive statistics, visualisation and statistical modelling in R. Broke business cases into analytical steps and helped peers understand R workflows, charts and interpretation." },
  { title: "CFA Research Challenge: University of Macau Internal Round", role: "Team member · Financial research", category: "Finance / Equity Research", skills: ["Financial analysis", "Industry benchmarking", "PowerPoint"], desc: "Analysed BYD's financial statements and used industry benchmarks to compare profitability, capital structure and solvency risk. Compiled financial and market data and contributed to the internal-round research report and presentation." },
  { title: "6th National University Tourism Design Competition", role: "Team member · Market and user research", category: "Research / Product Strategy", skills: ["Market research", "User personas", "Prototype design"], desc: "Conducted tourism market, competitor and user-persona research. Compared target segments, needs and product positioning to inform a product proposal and prototype, and prepared a business-design report and presentation." },
  { title: "Caritas Macau Accessible Tourism Business Proposal Competition", role: "Team leader · Business proposal design", category: "Business / Solution Design", skills: ["Cost-benefit analysis", "Risk assessment", "PowerPoint"], desc: "Led market research, risk assessment and cost-benefit analysis for accessible tourism. Combined target-user needs, service inputs and compliance requirements in a Word business proposal and presentation, with resource-allocation and operating-risk recommendations." },
][index] }));
export const capabilities = zh.capabilities.map((item, index) => ({ ...item, ...[
  { cn: "From raw records to useful evidence", desc: "Clean and validate data in Excel and Python; query and aggregate it in MySQL / SQL. Use SPSS and R for statistics and regression, and communicate findings through Power BI dashboards and KPI design.", stack: ["MySQL / SQL", "Python", "SPSS / R", "Power BI", "Excel"] },
  { cn: "From user needs to testable prototypes", desc: "Translate user research and requirements into PRDs. Use Vibe Coding, generative AI and prompt design to develop multi-agent workflows and PWA and web prototypes.", stack: ["User research", "PRD", "Vibe Coding", "Prompt design", "Multi-Agent", "PWA / Web"] },
  { cn: "Clear research, reports and presentations", desc: "Native Chinese speaker with working proficiency in English (TOEFL 97). Explain methods, findings and recommendations through Word research reports, PowerPoint presentations and bilingual business writing.", stack: ["TOEFL 97", "Word reports", "PowerPoint", "Bilingual communication"] },
  { cn: "Connect financial evidence to decisions", desc: "Analyse financial statements, cash flow, markets and competitors. Build Excel financial models and scenarios to compare collection terms, funding gaps and break-even conditions, and turn the results into decision recommendations.", stack: ["Financial statements", "Cash-flow analysis", "Excel modelling", "Scenario analysis", "Market & competitor research"] },
][index] }));
export const nav = zh.nav.map((item, index) => ({ ...item, label: ["About", "Work", "Experience", "Capabilities", "Contact"][index] }));
