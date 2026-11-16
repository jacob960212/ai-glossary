// 詞條清單（manifest）
// 新增詞條時，在陣列最後面加一筆。欄位說明見 AGENTS.md 第 4 節。
window.ENTRIES = [
  {
    slug: "llm",
    term: "大型語言模型",
    en: "Large Language Model",
    category: "基礎概念",
    summary: "讀過海量文字、很會「接話」的 AI 模型。",
    related: ["token", "context-window", "hallucination"],
    updated: "2026-11-16"
  },
  {
    slug: "token",
    term: "詞元",
    en: "Token",
    category: "基礎概念",
    summary: "AI 讀寫文字時的最小單位，也是計費單位。",
    related: ["llm", "context-window"],
    updated: "2026-11-16"
  },
  {
    slug: "context-window",
    term: "上下文視窗",
    en: "Context Window",
    category: "基礎概念",
    summary: "模型一次能「看到」的文字量上限。",
    related: ["token", "rag"],
    updated: "2026-11-16"
  },
  {
    slug: "prompt-engineering",
    term: "提示工程",
    en: "Prompt Engineering",
    category: "使用技巧",
    summary: "把問題問清楚，讓 AI 給出更好答案的技巧。",
    related: ["llm", "hallucination", "agents-md"],
    updated: "2026-11-16"
  },
  {
    slug: "rag",
    term: "檢索增強生成",
    en: "Retrieval-Augmented Generation",
    category: "進階技術",
    summary: "先查資料、再讓 AI 根據資料回答。",
    related: ["context-window", "hallucination"],
    updated: "2026-11-16"
  },
  {
    slug: "hallucination",
    term: "幻覺",
    en: "Hallucination",
    category: "風險與限制",
    summary: "AI 一本正經地講出不存在或錯誤的內容。",
    related: ["llm", "rag", "prompt-engineering"],
    updated: "2026-11-16"
  },
  {
    slug: "agents-md",
    term: "專案說明書",
    en: "AGENTS.md / CLAUDE.md",
    category: "工具與實作",
    summary: "寫給 AI 看的專案規則，讓它照你的方式工作。",
    related: ["prompt-engineering", "context-window"],
    updated: "2026-11-16"
  }
];
