/* ===========================================================================
   LIRMA Installation Tracker — portal application (core)
   Rendering, state, routing, tables, maps glue and actions.
   Pages and modals are in portal-pages.js.
   =========================================================================== */
(function () {
  const C = window.CONFIG, { Dt, Q, Ops, STATUS, CHECKS, OPEN, DONE, band, miles } = window.Store;
  const { ic, esc } = window.UI;

  const Portal = {
    S: null, root: null, MAPS: {}, pending: {}, embedded: false,
    UI: null,
  };
  const freshUI = () => ({
    route: { page: "login" }, modal: null, tables: {}, toasts: [], period: "month",
    custom: { from: "2026-11-01", to: "2026-11-30" },
    map: { layer: "both", f: { zip: "", radius: "", county: "", ctr: "", status: "", band: "" }, applied: {}, sel: null },
    highlight: [], menu: null, cal: {}, ctrTab: "details", metricsRange: "all", projToggle: "current", reportTab: "pending",
  });

  /* ---------- helpers ---------- */
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const hl = (key) => (Portal.UI.highlight.includes(key) ? " hl" : "");
  const hhOf = (job) => Q.hh(Portal.S, job.hh);
  const ctrOf = (job) => (job.ctr ? Q.ctr(Portal.S, job.ctr) : null);
  const scoreOf = (c) => Q.score(Portal.S, c);
  const jobTitle = (job) => { const h = hhOf(job); return `${h.name} — ${job.sched ? Dt.long(job.sched) : job.targetDate ? "Target " + Dt.long(job.targetDate) : "Not yet scheduled"}`; };
  const cmp = (a, b) => (a == null ? 1 : b == null ? -1 : typeof a === "number" ? a - b : String(a).localeCompare(String(b)));
  Object.assign(Portal, { money, hl, hhOf, ctrOf, scoreOf, jobTitle });

  function periodRange() {
    const now = Dt.date(Portal.S.now), p = Dt.parts(now);
    if (Portal.UI.period === "week") { const dow = (Dt.dow(now) + 6) % 7; const from = Dt.addDays(now, -dow); return { from, to: Dt.addDays(from, 6), label: "this week" }; }
    if (Portal.UI.period === "month") { const from = `${p.y}-${String(p.m).padStart(2, "0")}-01`; const nm = p.m === 12 ? `${p.y + 1}-01-01` : `${p.y}-${String(p.m + 1).padStart(2, "0")}-01`; return { from, to: Dt.addDays(nm, -1), label: "this month" }; }
    if (Portal.UI.period === "year") return { from: `${p.y}-01-01`, to: `${p.y}-12-31`, label: "this year" };
    return { from: Portal.UI.custom.from, to: Portal.UI.custom.to, label: `${Dt.short(Portal.UI.custom.from)} – ${Dt.short(Portal.UI.custom.to)}` };
  }
  const inRange = (s, r) => s && Dt.date(s) >= r.from && Dt.date(s) <= r.to;
  Portal.periodRange = periodRange; Portal.inRange = inRange;

  /* ---------- table engine (search · filters · sort · pagination) ---------- */
  Portal.table = function (key, def) {
    const UI = Portal.UI;
    const t = (UI.tables[key] = UI.tables[key] || { q: "", sort: def.sort || null, dir: def.dir || "asc", page: 1, f: { ...(def.defaults || {}) }, special: null });
    let rows = def.rows;
    if (t.q) { const q = t.q.toLowerCase(); rows = rows.filter((r) => def.text(r).toLowerCase().includes(q)); }
    (def.filters || []).forEach((f) => { const v = t.f[f.key]; if (v) rows = rows.filter((r) => f.test(r, v)); });
    if (t.special && def.specials && def.specials[t.special]) rows = rows.filter(def.specials[t.special].test);
    if (t.sort) { const col = def.cols.find((c) => c.key === t.sort); if (col && col.sort) rows = rows.slice().sort((a, b) => cmp(col.sort(a), col.sort(b)) * (t.dir === "asc" ? 1 : -1)); }
    const per = def.per || 10, pages = Math.max(1, Math.ceil(rows.length / per));
    t.page = Math.min(Math.max(1, t.page), pages);
    const shown = rows.slice((t.page - 1) * per, t.page * per);
    const sel = (f) => `<label class="flt"><span>${f.label}</span><select data-ch="tblF" data-key="${key}" data-f="${f.key}">
      <option value="">All</option>${f.options.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}" ${t.f[f.key] === v ? "selected" : ""}>${esc(l)}</option>`; }).join("")}</select></label>`;
    const range = def.dateRange ? `<label class="flt"><span>From</span><input type="date" data-ch="tblF" data-key="${key}" data-f="from" value="${t.f.from || ""}"></label><label class="flt"><span>To</span><input type="date" data-ch="tblF" data-key="${key}" data-f="to" value="${t.f.to || ""}"></label>` : "";
    const sp = t.special && def.specials ? `<div class="special-chip">${ic("filter", 14)} Showing: ${def.specials[t.special].label}<button data-a="tblSpecialClear" data-arg="${key}" aria-label="Clear">${ic("x", 14)}</button></div>` : "";
    const pg = [];
    for (let i = 1; i <= pages; i++) pg.push(`<button class="${i === t.page ? "on" : ""}" data-a="tblPage" data-arg="${key}|${i}">${i}</button>`);
    return `<div class="tbl-card">
      ${def.noToolbar ? "" : `<div class="tbl-tools">
        <div class="search">${ic("search", 16)}<input type="search" placeholder="${def.placeholder || "Search"}" value="${esc(t.q)}" data-in="tblQ" data-key="${key}" data-fk="${key}-q"></div>
        ${(def.filters || []).filter((f) => !f.hidden).map(sel).join("")}${range}
        ${(def.filters || []).length || def.dateRange ? `<button class="btn ghost sm" data-a="tblReset" data-arg="${key}">Reset</button>` : ""}
        <div class="tbl-extra">${def.extra || ""}</div></div>${sp}`}
      <div class="tbl-wrap"><table class="tbl"><thead><tr>${def.cols.map((c) => `<th class="${c.cls || ""}${c.sort ? " sortable" : ""}" ${c.sort ? `data-a="tblSort" data-arg="${key}|${c.key}"` : ""}>${c.label}${c.sort ? `<span class="srt ${t.sort === c.key ? t.dir : ""}">${ic(t.sort === c.key && t.dir === "desc" ? "chev-down" : "chev-up", 12)}</span>` : ""}</th>`).join("")}</tr></thead>
      <tbody>${shown.length ? shown.map((r) => `<tr ${def.rowAction ? `data-a="${def.rowAction}" data-arg="${esc(def.rowArg(r))}" class="clickable${def.rowHl && def.rowHl(r) ? " hl" : ""}"` : ""}>${def.cols.map((c) => `<td class="${c.cls || ""}">${c.render(r)}</td>`).join("")}</tr>`).join("")
        : `<tr><td colspan="${def.cols.length}"><div class="empty">${ic("search", 20)}<b>No matching records</b><span>Try a different search or clear the filters.</span></div></td></tr>`}</tbody></table></div>
      <div class="tbl-foot"><span>${rows.length ? `Showing ${(t.page - 1) * per + 1}–${Math.min(t.page * per, rows.length)} of ${rows.length}` : "0 results"}</span>
        <div class="pager"><button data-a="tblPage" data-arg="${key}|${t.page - 1}" ${t.page === 1 ? "disabled" : ""}>${ic("chev-left", 14)}</button>${pg.join("")}<button data-a="tblPage" data-arg="${key}|${t.page + 1}" ${t.page === pages ? "disabled" : ""}>${ic("chev-right", 14)}</button></div></div></div>`;
  };

  /* ---------- maps glue ---------- */
  Portal.mapSlot = function (key, opts, data) {
    Portal.pending[key] = { opts, ...data };
    return `<div class="map-slot" data-map-slot="${key}"></div>`;
  };
  function attachMaps() {
    Object.entries(Portal.pending).forEach(([key, d]) => {
      const slot = Portal.root.querySelector(`[data-map-slot="${key}"]`);
      if (!slot) return;
      let m = Portal.MAPS[key];
      if (!m) {
        const el = document.createElement("div");
        el.className = "co-map";
        slot.replaceWith(el);
        m = Portal.MAPS[key] = window.CoMap.create(el, { ...d.opts, onSelect: (p) => Portal.onMapSelect(key, p), onReset: () => Portal.onMapReset(key) });
        m._county = null;
      } else {
        slot.replaceWith(m.root);
        m.invalidate();
      }
      m.setPins(d.pins || []);
      const county = d.county || null;
      if (county !== m._county) { m._county = county; county ? m.fitCounty(county) : m.reset(); }
      if ((d.trackKey || null) !== (m._trackKey || null)) { m._trackKey = d.trackKey || null; m.setTracking(d.tracking || null); }
    });
  }
  Portal.onMapReset = function (key) {
    if (key === "main" && Portal.UI.map.applied.county) { Portal.UI.map.applied.county = ""; Portal.UI.map.f.county = ""; Portal.MAPS.main._county = null; Portal.render(); }
  };
  Portal.onMapSelect = function (key, p) {
    if (Portal.embedded) return;
    if (key === "track") return;
    Portal.UI.map.sel = { type: p.type, id: p.id };
    if (key !== "main") Portal.UI.route = { page: "map" };
    Portal.render();
  };

  /* ---------- render ---------- */
  Portal.render = function () {
    const root = Portal.root, UI = Portal.UI;
    if (!root) return;
    const scrolls = {};
    root.querySelectorAll("[data-scroll]").forEach((el) => (scrolls[el.dataset.scroll] = el.scrollTop));
    const ae = document.activeElement, fk = ae && root.contains(ae) && ae.dataset ? ae.dataset.fk : null, caret = fk && ae.selectionStart;
    Object.values(Portal.MAPS).forEach((m) => m.root.parentNode && m.root.remove());
    Portal.pending = {};
    const P = window.PortalPages;
    let html;
    if (UI.route.page === "login") html = P.login();
    else html = layout(P.page());
    html += UI.modal ? P.modal() : "";
    html += `<div class="toasts">${UI.toasts.map((t) => `<div class="toast ${t.kind || ""}">${ic(t.kind === "warn" ? "alert" : "check-circle", 18)}<span>${t.text}</span></div>`).join("")}</div>`;
    html += `<div class="disclaimer">${ic("shield", 12)} ${esc(C.disclaimer)}</div>`;
    root.innerHTML = html;
    root.className = "ptl" + (Portal.embedded ? " embedded" : "");
    attachMaps();
    root.querySelectorAll("[data-scroll]").forEach((el) => { if (scrolls[el.dataset.scroll] != null) el.scrollTop = scrolls[el.dataset.scroll]; });
    if (fk) { const el = root.querySelector(`[data-fk="${fk}"]`); if (el) { el.focus(); try { el.setSelectionRange(caret, caret); } catch (e) {} } }
  };

  function layout(content) {
    const S = Portal.S, UI = Portal.UI, page = UI.route.page;
    const pendingReports = S.jobs.filter((j) => j.status === "submitted").length;
    const unassigned = S.jobs.filter((j) => j.status === "unassigned").length;
    const nav = [
      ["dashboard", "grid", "Dashboard"], ["map", "map", "Map View"], ["jobs", "briefcase", "Jobs", unassigned],
      ["households", "home", "Households"], ["contractors", "hardhat", "Contractors"], ["reports", "file", "Reports", pendingReports],
      ["notifications", "bell", "Notifications", Q.unread(S)], ["settings", "settings", "Settings"],
    ];
    const activeOf = { household: "households", contractor: "contractors", report: "reports" };
    const act = activeOf[page] || page;
    return `<div class="app">
      <aside class="sb">
        <div class="sb-brand">${window.UI.logo("program", "sb-logo")}<div class="sb-name"><b>${esc(C.program.name)}</b><span>${esc(C.portal.name)}</span></div></div>
        <nav class="sb-nav">${nav.map(([k, i, l, n]) => `<button class="${act === k ? "on" : ""}${hl("nav-" + k)}" data-a="go" data-arg="${k}">${ic(i, 19)}<span>${l}</span>${n ? `<em>${n}</em>` : ""}</button>`).join("")}</nav>
        <div class="sb-foot"><span>Powered by</span>${window.UI.logo("radonsketch", "sb-rs")}<small>${esc(C.agency.short)} · ${esc(C.program.lirma)} programme</small></div>
      </aside>
      <div class="main">
        <header class="tb">
          <div class="crumbs">${crumbs().map((c, i, a) => i < a.length - 1 ? `<button data-a="${c.a}" data-arg="${esc(c.arg || "")}">${esc(c.t)}</button>${ic("chev-right", 14)}` : `<b>${esc(c.t)}</b>`).join("")}</div>
          <div class="tb-right">
            <span class="tb-date">${ic("calendar", 15)} ${Dt.wdm(S.now)} · ${Dt.time(S.now)} ${C.timezoneLabel}</span>
            <button class="tb-ic${hl("bell")}" data-a="go" data-arg="notifications" aria-label="Notifications">${ic("bell", 20)}${Q.unread(S) ? `<em>${Q.unread(S)}</em>` : ""}</button>
            <button class="tb-ic" data-a="help" aria-label="Help">${ic("help", 20)}</button>
            <div class="tb-user"><button data-a="userMenu"><span class="av">${C.signedInUser.initials}</span><span class="tu-n"><b>${esc(C.signedInUser.name)}</b><small>${esc(C.signedInUser.role)}</small></span>${ic("chev-down", 14)}</button>
              ${UI.menu === "user" ? `<div class="menu"><button data-a="go" data-arg="settings">${ic("settings", 16)} Settings</button><button data-a="signOut">${ic("log-out", 16)} Sign out</button></div>` : ""}</div>
          </div>
        </header>
        <div class="content page-${page}" data-scroll="content-${page}-${UI.route.id || ""}">${content}</div>
      </div></div>`;
  }
  function crumbs() {
    const r = Portal.UI.route, S = Portal.S;
    const home = { t: "Dashboard", a: "go", arg: "dashboard" };
    const name = { dashboard: "Dashboard", map: "Map View", jobs: "Jobs", households: "Households", contractors: "Contractors", reports: "Reports", notifications: "Notifications", settings: "Settings" };
    if (r.page === "dashboard") return [{ t: C.program.lirma }, { t: "Dashboard" }];
    if (r.page === "household") return [home, { t: "Households", a: "go", arg: "households" }, { t: Q.hh(S, r.id).name }];
    if (r.page === "contractor") return [home, { t: "Contractors", a: "go", arg: "contractors" }, { t: Q.ctr(S, r.id).name }];
    if (r.page === "report") return [home, { t: "Reports", a: "go", arg: "reports" }, { t: `${r.id} · v${r.v}` }];
    return [home, { t: name[r.page] || r.page }];
  }

  /* ---------- toasts ---------- */
  Portal.toast = function (text, kind) {
    const t = { text, kind, id: Math.random() };
    Portal.UI.toasts.push(t);
    Portal.render();
    if (!Portal.embedded) setTimeout(() => { Portal.UI.toasts = Portal.UI.toasts.filter((x) => x !== t); Portal.render(); }, 3800);
  };

  /* ---------- events ---------- */
  function bind(root) {
    root.addEventListener("click", (e) => {
      if (Portal.embedded) return;
      const el = e.target.closest("[data-a]");
      if (Portal.UI.menu && !(el && el.dataset.a === "userMenu")) { Portal.UI.menu = null; if (!el) { Portal.render(); return; } }
      if (!el || !root.contains(el)) return;
      if (el.disabled) return;
      if (el.dataset.a === "modalBack" && e.target !== el) return; // clicks inside the modal never close it
      const fn = window.PortalActions[el.dataset.a];
      if (!fn) return;
      e.preventDefault();
      fn(el.dataset.arg, el, e);
    });
    root.addEventListener("input", (e) => {
      const el = e.target;
      if (el.dataset.in === "tblQ") { const t = Portal.UI.tables[el.dataset.key]; t.q = el.value; t.page = 1; Portal.render(); }
      else if (el.dataset.in === "field") setPath(el.dataset.path, el.type === "checkbox" ? el.checked : el.value);
      else if (el.dataset.in === "field-r") { setPath(el.dataset.path, el.value); Portal.render(); }
    });
    root.addEventListener("change", (e) => {
      const el = e.target;
      if (el.dataset.ch && window.PortalActions[el.dataset.ch]) window.PortalActions[el.dataset.ch](el.value, el, e);
    });
    root.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && Portal.UI.modal && !Portal.embedded) { Portal.UI.modal = null; Portal.render(); }
      if (e.key === "Enter" && e.target.dataset && e.target.dataset.enter) { e.preventDefault(); window.PortalActions[e.target.dataset.enter](); }
    });
  }
  function setPath(path, v) {
    const parts = path.split(".");
    let o = parts[0] === "cfg" ? C : parts[0] === "modal" ? Portal.UI.modal : Portal.UI;
    parts.slice(1, -1).forEach((p) => (o = o[p]));
    o[parts[parts.length - 1]] = v;
  }
  Portal.setPath = setPath;

  /* ---------- mount ---------- */
  Portal.mount = function (root, opts = {}) {
    Portal.root = root;
    Portal.embedded = !!opts.embedded;
    Portal.S = opts.store || window.Store.build();
    Portal.UI = freshUI();
    if (opts.route) Portal.UI.route = opts.route;
    Object.entries(C.colors).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    bind(root);
    Portal.render();
    if (!opts.embedded) window.addEventListener("resize", () => Object.values(Portal.MAPS).forEach((m) => m.root.isConnected && m.invalidate()));
  };
  Portal.reset = function (store, ui) {
    Portal.S = store; Portal.UI = Object.assign(freshUI(), ui || {});
  };
  Portal.scrollTo = function (sel, smooth) {
    const el = Portal.root.querySelector(sel);
    if (!el) return;
    const sc = el.closest("[data-scroll]");
    if (!sc) return;
    const top = el.getBoundingClientRect().top - sc.getBoundingClientRect().top;
    const scale = sc.getBoundingClientRect().height / sc.clientHeight || 1;
    sc.scrollTo({ top: sc.scrollTop + top / scale - 16, behavior: smooth ? "smooth" : "auto" });
  };
  Portal.freshUI = freshUI;
  window.Portal = Portal;
})();
