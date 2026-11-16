// ============================================================
// AI 名詞小百科 — 全站共用腳本
// 所有資料都來自 data/entries.js（window.ENTRIES）
// 頁面用 <body data-page="home|entry"> 區分，並用 data-root 指到網站根目錄
// ============================================================
(function () {
  const ENTRIES = window.ENTRIES || [];
  const body = document.body;
  const root = body.dataset.root || "./";
  const page = body.dataset.page;
  const CATEGORIES = ["基礎概念", "使用技巧", "進階技術", "風險與限制", "工具與實作"];

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const url = (slug) => `${root}entries/${slug}.html`;
  const find = (slug) => ENTRIES.find((e) => e.slug === slug);

  // ---------- 共用頁首 / 頁尾 ----------
  function renderChrome() {
    const header = document.getElementById("site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML = `
        <div class="wrap">
          <a class="brand" href="${root}index.html">AI 名詞<span>小百科</span></a>
          <nav>
            <a href="${root}index.html">全部詞條</a>
            <a href="https://github.com/" id="repo-link" target="_blank" rel="noopener">GitHub</a>
          </nav>
        </div>`;
      const repo = body.dataset.repo;
      if (repo) header.querySelector("#repo-link").href = repo;
    }
    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = `<div class="wrap">共 ${ENTRIES.length} 個詞條 · 依 AGENTS.md 規則維護 · 純 HTML / CSS / JS</div>`;
    }
  }

  // ---------- 首頁：搜尋 + 分類 + 卡片 ----------
  function renderHome() {
    const grid = document.getElementById("grid");
    const filters = document.getElementById("filters");
    const search = document.getElementById("search");
    const count = document.getElementById("count");
    let current = "全部";

    const used = CATEGORIES.filter((c) => ENTRIES.some((e) => e.category === c));
    filters.innerHTML = ["全部", ...used]
      .map((c) => `<button class="filter${c === "全部" ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
      .join("");

    function draw() {
      const q = search.value.trim().toLowerCase();
      const list = ENTRIES.filter((e) => {
        const okCat = current === "全部" || e.category === current;
        const hay = `${e.term} ${e.en} ${e.summary} ${e.slug}`.toLowerCase();
        return okCat && (!q || hay.includes(q));
      });
      count.textContent = `顯示 ${list.length} / ${ENTRIES.length} 個詞條`;
      grid.innerHTML = list.length
        ? list.map((e) => `
            <a class="card" href="${url(e.slug)}">
              <span class="tag" data-cat="${esc(e.category)}">${esc(e.category)}</span>
              <h2>${esc(e.term)}</h2>
              <p class="en">${esc(e.en)}</p>
              <p>${esc(e.summary)}</p>
            </a>`).join("")
        : `<p class="empty">找不到相關詞條，換個關鍵字試試？</p>`;
    }

    filters.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".filter");
      if (!btn) return;
      current = btn.dataset.cat;
      filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      draw();
    });
    search.addEventListener("input", draw);
    draw();
  }

  // ---------- 詞條頁：相關詞條 + 上下篇 + 更新日期 ----------
  function renderEntry() {
    const slug = body.dataset.slug;
    const idx = ENTRIES.findIndex((e) => e.slug === slug);
    const entry = ENTRIES[idx];
    if (!entry) {
      console.warn(`[AI 名詞小百科] 找不到 slug「${slug}」，請確認已登記在 data/entries.js`);
      return;
    }
    document.title = `${entry.term}（${entry.en}）｜AI 名詞小百科`;

    const related = document.getElementById("related");
    const links = (entry.related || []).map(find).filter(Boolean);
    if (related && links.length) {
      related.className = "related";
      related.innerHTML = `<h2>相關詞條</h2><div class="chips">${links
        .map((e) => `<a href="${url(e.slug)}">${esc(e.term)}</a>`).join("")}</div>`;
    }

    const pager = document.getElementById("pager");
    if (pager) {
      pager.className = "pager";
      const prev = ENTRIES[idx - 1];
      const next = ENTRIES[idx + 1];
      pager.innerHTML =
        (prev ? `<a class="prev" href="${url(prev.slug)}"><small>← 上一篇</small>${esc(prev.term)}</a>` : "") +
        (next ? `<a class="next" href="${url(next.slug)}"><small>下一篇 →</small>${esc(next.term)}</a>` : "");
    }

    const meta = document.getElementById("meta");
    if (meta) meta.textContent = `最後更新：${entry.updated}`;
  }

  renderChrome();
  if (page === "home") renderHome();
  if (page === "entry") renderEntry();
})();
