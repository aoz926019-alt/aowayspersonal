export const messages = {
  zh: {
    title: "张敖 AO ZHANG — 商业分析与 AI 产品作品集", description: "香港大学商业分析硕士研0，澳门大学工商管理学士大四在读。探索数据分析、财务研究、用户研究与 AI 产品作品。",
    skip: "跳到正文", mainNav: "主导航", home: "张敖，返回首页", logo: "张敖", language: "网站语言", selectChinese: "切换到中文", selectEnglish: "Switch to English", closeNav: "关闭导航", openNav: "打开导航",
    hello: "你好，我是张敖。", fullName: "张敖 AO ZHANG", name: "张敖", meet: "认识我", contactMe: "与我联系", scrollMeet: "向下认识我",
    profileLabel: "01 — PROFILE / 关于", education: "教育背景", educationCaption: "EDUCATION", credentials: "证书与荣誉", itemCount: "{count} 项", portraitContact: "联系我",
    workLabel: "02 — SELECTED WORK / 精选项目", workIntro: "从企业现金流、供应链风险到用户研究与 AI 产品。滚轮滑动、左右拖动或方向键浏览，点击项目图片查看完整画面与详情。",
    filterProjects: "按项目方向筛选", projectCount: "显示 {count} 个项目", projectImage: "{title} — 项目界面", projectSkills: "{title} 关键技能", demoNote: "含模拟数据演示", browse: "浏览项目", previous: "展示上一个项目", next: "展示下一个项目", overview: "项目概览", openOverview: "查看 {title} 项目概览", closeOverview: "关闭项目概览", fullImage: "查看 {title} 原尺寸图片", imageAlt: "{title} — 完整项目截图", imageHint: "完整项目画面 · 点击查看原图 ↗", deliverables: "项目内容", tryDemo: "体验原型", projectSwitch: "项目切换", previousProject: "上一个项目", nextProject: "下一个项目", summary: "研究概览", carouselLabel: "项目图片轮播", carouselStatus: "{title}，第 {index} 个，共 {count} 个项目",
    experienceLabel: "03 — EXPERIENCE / 实习经历", experienceCount: "{count} 段实习，2024 至 2026 年", internships: "段实习经历",
    leadershipTitle: "竞赛与领导经历", leadershipCaption: "COMPETITIONS & LEADERSHIP", experienceIndex: "经历索引", archiveFooter: "探索 · 实践 · 协作", collapseEntry: "{title}，收起详情", expandEntry: "{title}，展开详情", keySkills: "关键技能",
    skillsLabel: "04 — CAPABILITIES / 个人优势", contactLabel: "05 — CONTACT / 联系", sendMail: "发送邮件至 {email}", contactIntro: "欢迎交流商业分析、AI 产品与项目合作。", explore: "精选项目", copyright: "张敖 · AO ZHANG", backTop: "返回顶部",
  },
  en: {
    title: "Ao Zhang — Business Analytics & AI Product Portfolio", description: "HKU MSc Business Analytics pre-enrolment student and final-year BBA student at the University of Macau. Explore data analytics, financial research, user research and AI product work.",
    skip: "Skip to content", mainNav: "Main navigation", home: "Ao Zhang, back to home", logo: "AO ZHANG", language: "Website language", selectChinese: "Switch to Chinese", selectEnglish: "Switch to English", closeNav: "Close navigation", openNav: "Open navigation",
    hello: "Hello, I'm Ao Zhang.", fullName: "Ao Zhang", name: "Ao Zhang", meet: "About me", contactMe: "Get in touch", scrollMeet: "Discover more",
    profileLabel: "01 — PROFILE", education: "Education", educationCaption: "ACADEMIC BACKGROUND", credentials: "Credentials & honours", itemCount: "{count} items", portraitContact: "Contact",
    workLabel: "02 — SELECTED WORK", workIntro: "From corporate cash flow and supply-chain risk to user research and AI products. Scroll, drag or use the arrow keys to browse. Select a project for its overview and details.",
    filterProjects: "Filter projects by discipline", projectCount: "Showing {count} projects", projectImage: "{title} — Project screenshot", projectSkills: "{title}: key skills", demoNote: "Includes simulated data", browse: "Browse projects", previous: "Show previous project", next: "Show next project", overview: "View details", openOverview: "View {title} project overview", closeOverview: "Close project overview", fullImage: "Open {title} screenshot at full size", imageAlt: "{title} — Full project screenshot", imageHint: "Full project screenshot · Open original ↗", deliverables: "Deliverables", tryDemo: "Try the prototype", projectSwitch: "Switch projects", previousProject: "Previous project", nextProject: "Next project", summary: "Research overview", carouselLabel: "Project gallery", carouselStatus: "{title}, project {index} of {count}",
    experienceLabel: "03 — EXPERIENCE", experienceCount: "{count} internships, 2024 to 2026", internships: "Internships",
    leadershipTitle: "Competitions & Leadership", leadershipCaption: "SELECTED ACTIVITIES", experienceIndex: "Experience index", archiveFooter: "Explore · Build · Collaborate", collapseEntry: "{title}, collapse details", expandEntry: "{title}, expand details", keySkills: "Key skills",
    skillsLabel: "04 — CAPABILITIES", contactLabel: "05 — CONTACT", sendMail: "Send an email to {email}", contactIntro: "Let's connect on business analytics, AI products and project collaboration.", explore: "Selected work", copyright: "AO ZHANG", backTop: "Back to top",
  },
};

export function formatMessage(language, key, values = {}) {
  return messages[language][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? `{${name}}`));
}
