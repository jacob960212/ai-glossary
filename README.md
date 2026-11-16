# AI 名詞小百科

用白話和生活比喻解釋 AI 名詞的小網站，每個詞條一分鐘看懂。

- 🌐 網站：GitHub Pages（見 repo 右側 About 連結）
- 📘 專案規則：[`AGENTS.md`](AGENTS.md)（AI 與人都照這份規則維護）
- 🤖 Claude Code 入口：[`CLAUDE.md`](CLAUDE.md)

## 這個專案的設計重點

這不只是「做出一個網頁」，而是建立一套**可以重複使用的規則**：

| 想做的事 | 怎麼做 |
|---|---|
| 新增詞條 | 對 AI 說「幫我新增一個詞條：Embedding」，AI 依 `AGENTS.md` 第 4 節的 3 步驟完成 |
| 首頁卡片、分類、搜尋 | 由 `assets/js/site.js` 讀 `data/entries.js` 自動產生 |
| 相關詞條、上下篇 | 同上，自動產生，不需手寫 |
| 統一外觀 | 每篇都從 `templates/entry-template.html` 複製，樣式只寫在一個 CSS |

## 結構

```
index.html            首頁（搜尋 + 分類 + 卡片）
entries/*.html        詞條頁
data/entries.js       詞條清單
assets/css/style.css  全站樣式
assets/js/site.js     全站腳本
templates/            新詞條模板
```

## 本機預覽

```bash
python3 -m http.server 8000
```
或直接雙擊 `index.html`。

## 技術

純 HTML / CSS / JavaScript，無建置步驟、無套件依賴，支援手機與深色模式。
