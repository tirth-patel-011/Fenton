/* ===========================================================================
   UI building blocks shared by the portal and the workflow demo.
   =========================================================================== */
(function () {
  const C = window.CONFIG, { Dt, Q, STATUS, CHECKS, band } = window.Store;

  const P = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    map: '<path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
    home: '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    hardhat: '<path d="M3 18h18M5 18v-3a7 7 0 0 1 14 0v3M10 8V5h4v3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2.1.7 3.5 2.5 3.5 5.2"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.8M12 17v.2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4 2v-8.5z"/>',
    "chev-right": '<path d="m9 6 6 6-6 6"/>', "chev-left": '<path d="m15 6-6 6 6 6"/>', "chev-down": '<path d="m6 9 6 6 6-6"/>', "chev-up": '<path d="m6 15 6-6 6 6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>', check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.8 2.8L16 9.8"/>',
    alert: '<path d="M10.3 4.3 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17v.3"/>',
    "x-circle": '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    "map-pin": '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', upload: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    target: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    "user-check": '<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3.2-6 7-6 1.4 0 2.7.3 3.8.8M15 19l2 2 4-4"/>',
    shield: '<path d="M12 3 20 6v6c0 5-3.4 8.1-8 9-4.6-.9-8-4-8-9V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    "log-out": '<path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H10"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>',
    sync: '<path d="M20 11a8 8 0 0 0-14.3-4.7L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.7L20 16M20 20v-4h-4"/>',
    note: '<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v4h4M8 12h8M8 16h5"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    more: '<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/>', send: '<path d="M4 12 20 4l-6 16-3-7z"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>', "trending": '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="m12 16 4-5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
    grid6: '<circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="14" r="1.6"/><circle cx="12" cy="14" r="1.6"/><circle cx="18" cy="14" r="1.6"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  };
  const ic = (n, s = 18, cls = "") => `<svg class="ic ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const logo = (kind, cls = "") => {
    const file = C.logos[kind], label = kind === "program" ? "Colorado Radon Program logo" : "RadonSketch logo";
    const base = window.ASSET_BASE || "../assets/";
    if (!file && kind === "radonsketch") return `<span class="logo ${cls} logo-radonsketch wordmark" role="img" aria-label="RadonSketch">RadonSketch</span>`;
    if (!file) return `<span class="logo ${cls} logo-${kind} missing" role="img" aria-label="${label}"><span class="logo-ph">${label}</span></span>`;
    const src = /^(data:|https?:)/.test(file) ? file : base + file; // single-file builds embed the logo as a data URI
    return `<span class="logo ${cls} logo-${kind}"><img src="${src}" alt="${label}" onerror="this.parentNode.classList.add('missing');this.remove()"><span class="logo-ph">${label}</span></span>`;
  };

  const badge = (key, extra = "") => { const s = STATUS[key]; return `<span class="st-badge ${extra}" style="--c:${s.color}"><i></i>${s.label}</span>`; };
  const scoreBadge = (score, big) => { const b = band(score); return `<span class="score-badge b-${b.key} ${big ? "big" : ""}">${score == null ? "No data" : score + "%"}</span>`; };
  const bandPill = (score) => { const b = band(score); return `<span class="band-pill b-${b.key}">${b.label}</span>`; };

  function gauge(score, size = 170) {
    const t = C.thresholds, r = 70, cx = 90, cy = 88;
    const pt = (v) => { const a = Math.PI * (1 - v / 100); return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
    const arc = (a, b, cls) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); return `<path class="g-arc ${cls}" d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}"/>`; };
    const b = band(score), v = score == null ? 0 : score;
    const [nx, ny] = pt(v);
    return `<div class="gauge" style="width:${size}px"><svg viewBox="0 0 180 112">${arc(0, t.good - 0.6, "poor")}${arc(t.good + 0.6, t.great - 0.6, "good")}${arc(t.great + 0.6, 100, "great")}
      ${score == null ? "" : `<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" class="g-needle"/><circle cx="${cx}" cy="${cy}" r="5" class="g-hub"/>`}
      <text x="${cx}" y="${cy - 22}" class="g-val">${score == null ? "—" : score + "%"}</text></svg>
      <div class="g-band b-${b.key}">${b.label}</div>
      <div class="g-scale"><span>POOR &lt;${t.good}%</span><span>GOOD ${t.good}–${t.great - 1}%</span><span>GREAT ${t.great}%+</span></div></div>`;
  }

  function bars(data, { h = 170, unit = "", color = "var(--co-blue)" } = {}) {
    const max = Math.max(1, ...data.map((d) => d.value)), w = 100 / data.length;
    return `<div class="chart-bars" style="height:${h}px">${data.map((d) => `
      <div class="cb" style="width:${w}%" title="${esc(d.label)}: ${d.value}${unit}"><span class="cb-v">${d.value || ""}</span>
        <i style="height:${(d.value / max) * 100}%;background:${d.hl === false ? "#C9D3E1" : color}"></i><span class="cb-l">${esc(d.label)}</span></div>`).join("")}</div>`;
  }
  function hbars(data, { color = "var(--co-blue)", onClick } = {}) {
    const max = Math.max(1, ...data.map((d) => d.value));
    return `<div class="chart-hbars">${data.map((d) => `<button class="hb" ${onClick ? `data-a="${onClick}" data-arg="${esc(d.label)}"` : ""}><span class="hb-l">${esc(d.label)}</span><span class="hb-t"><i style="width:${(d.value / max) * 100}%;background:${d.color || color}"></i></span><b>${d.value}</b></button>`).join("")}</div>`;
  }
  function line(points, labels, { min = 50, max = 100, h = 180, bandLines = true } = {}) {
    if (!points.length) return `<div class="empty">No compliance history yet.</div>`;
    const W = 520, H = h, pl = 34, pr = 10, pt = 10, pb = 26;
    const x = (i) => pl + (i * (W - pl - pr)) / Math.max(1, points.length - 1), y = (v) => pt + ((max - v) * (H - pt - pb)) / (max - min);
    const grid = [min, 70, 90, max].map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" class="ln-grid ${v === 70 ? "poor" : v === 90 ? "great" : ""}"/><text x="${pl - 6}" y="${y(v) + 4}" class="ln-ax" text-anchor="end">${v}%</text>`).join("");
    const d = points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
    return `<svg class="chart-line" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${bandLines ? grid : ""}
      <path d="${d}L${x(points.length - 1)},${H - pb}L${pl},${H - pb}Z" class="ln-area"/><path d="${d}" class="ln"/>
      ${points.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" class="ln-dot"/>`).join("")}
      ${labels.map((l, i) => `<text x="${x(i)}" y="${H - 6}" class="ln-ax" text-anchor="middle">${l}</text>`).join("")}</svg>`;
  }

  const ACTOR = { contractor: "Contractor", programme: "Programme", system: "System" };
  function timeline(events, { filter = "all", limit } = {}) {
    let evs = events.slice().sort((a, b) => b.at.localeCompare(a.at));
    if (filter !== "all") evs = evs.filter((e) => e.actor === filter);
    if (limit) evs = evs.slice(0, limit);
    if (!evs.length) return `<div class="empty">No activity for this filter.</div>`;
    const days = {};
    evs.forEach((e) => (days[Dt.date(e.at)] = days[Dt.date(e.at)] || []).push(e));
    return `<div class="tl">${Object.entries(days).map(([d, list]) => `
      <div class="tl-day"><div class="tl-date">${Dt.long(d)}</div>
      ${list.map((e) => `<div class="tl-item a-${e.actor}"><span class="tl-ic">${ic(e.icon || "activity", 15)}</span>
        <div class="tl-body"><div class="tl-top"><b>${esc(e.title)}</b><span class="tl-time">${Dt.time(e.at)}</span></div>
        <p>${esc(e.desc || "")}</p><span class="tl-actor">${e.who ? esc(e.who) + " · " : ""}${ACTOR[e.actor]}</span></div></div>`).join("")}</div>`).join("")}</div>`;
  }

  /* ---------- floor plan (Diagnostic) & system design (Radon Builder) ---------- */
  const TPS = [
    { id: "TP1", x: 110, y: 96, p: -0.021, room: "Family room" }, { id: "TP2", x: 268, y: 88, p: -0.012, room: "Bedroom" },
    { id: "TP3", x: 66, y: 228, p: -0.006, room: "Storage" }, { id: "TP4", x: 165, y: 232, p: -0.009, room: "Bath" },
    { id: "TP5", x: 246, y: 206, p: -0.034, room: "Utility" }, { id: "TP6", x: 178, y: 60, p: -0.018, room: "Family room" },
  ];
  function plan({ mode = "diag", fixed = true, mini = false, labels = true } = {}) {
    const build = mode === "build", ventY = fixed ? 212 : 162;
    const rooms = [["Family room", 30, 48], ["Bedroom", 220, 48], ["Utility", 220, 168], ["Storage", 30, 188], ["Bath", 130, 188]]
      .map(([t, x, y]) => `<text x="${x}" y="${y}" class="pl-room">${t.toUpperCase()}</text>`).join("");
    const tps = TPS.map((t) => build
      ? `<circle cx="${t.x}" cy="${t.y}" r="4.5" class="pl-tp-m"/>`
      : `<g class="pl-tp"><circle cx="${t.x}" cy="${t.y}" r="10"/><text x="${t.x}" y="${t.y + 3.5}" text-anchor="middle">${t.id.slice(2)}</text>
         ${labels ? `<rect x="${t.x + 12}" y="${t.y - 8}" width="46" height="16" rx="8" class="pl-tag"/><text x="${t.x + 35}" y="${t.y + 3.6}" text-anchor="middle" class="pl-tag-t">${t.p.toFixed(3).replace("-", "−")}</text>` : ""}</g>`).join("");
    const sys = !build ? "" : `
      <circle cx="358" cy="${ventY}" r="80" class="${fixed ? "pl-r-ok" : "pl-r-warn"}"/>
      ${fixed ? "" : `<line x1="358" y1="${ventY}" x2="340" y2="100" class="pl-dist"/><rect x="296" y="116" width="40" height="16" rx="8" class="pl-dist-tag"/><text x="316" y="127.5" text-anchor="middle" class="pl-dist-t">8 ft</text>`}
      <path d="M290 236 H358 V${ventY}" class="pl-pipe"/>
      <g class="pl-sp"><circle cx="290" cy="236" r="9"/><circle cx="290" cy="236" r="3.5"/></g>
      ${labels ? `<text x="290" y="258" text-anchor="middle" class="pl-lbl">Suction point</text>` : ""}
      <g transform="translate(358 250)" class="pl-fan"><circle r="10"/><path d="M0-6.5v13M-6.5 0h13"/></g>
      ${labels ? `<text x="352" y="276" text-anchor="end" class="pl-lbl">Fan</text>` : ""}
      <g class="pl-vent"><circle cx="358" cy="${ventY}" r="7"/><path d="M355 ${ventY + 1}l3-4 3 4"/></g>
      ${labels ? `<text x="372" y="${ventY - 12}" text-anchor="end" class="pl-lbl">Vent${fixed ? " · 14 ft" : ""}</text>` : ""}`;
    return `<svg class="plan ${mini ? "mini" : ""}" viewBox="0 0 380 300" role="img" aria-label="${build ? "System design" : "Diagnostic floor plan"}">
      <rect x="20" y="30" width="320" height="240" class="pl-floor"/>
      <g class="pl-walls"><rect x="20" y="30" width="320" height="240" class="pl-outer"/><path d="M210 30V112M210 128V270M20 170H72M88 170H210M120 170V270M210 150H262M278 150H340"/></g>
      <line x1="70" y1="30" x2="125" y2="30" class="pl-win"/><line x1="340" y1="70" x2="340" y2="100" class="pl-win ${build && !fixed ? "warn" : ""}"/><line x1="20" y1="80" x2="20" y2="120" class="pl-win"/>
      <rect x="224" y="176" width="30" height="22" rx="3" class="pl-fx"/><text x="239" y="190" text-anchor="middle" class="pl-fx-t">FURN</text>
      <circle cx="318" cy="252" r="9" class="pl-fx"/><text x="318" y="255.5" text-anchor="middle" class="pl-fx-t">SUMP</text>
      ${labels ? rooms : ""}${tps}${sys}
      ${labels ? `<g class="pl-scale"><path d="M28 290h80M28 286v8M108 286v8"/><text x="114" y="293">10 ft</text></g>` : ""}</svg>`;
  }

  /* ---------- report document ---------- */
  const PHOTOS = [["suction", "Suction point & slab seal"], ["fan", "Fan installation"], ["vent", "Vent termination"], ["manometer", "Manometer reading"], ["label", "System label"], ["sump", "Sealed sump lid"], ["cracks", "Crack sealing"], ["route", "Exterior pipe route"]];
  function photoTile(kind, caption, missing, i) {
    if (missing) return `<div class="ph-tile missing"><div class="ph-img">${ic("camera", 22)}<span>Not provided</span></div><span class="ph-cap">${caption}</span></div>`;
    const hue = [28, 205, 150, 45, 0, 190, 260, 110][i % 8];
    return `<div class="ph-tile"><div class="ph-img" style="--h:${hue}"><svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice"><rect width="120" height="80" fill="hsl(${hue} 18% 78%)"/><rect y="52" width="120" height="28" fill="hsl(${hue} 14% 66%)"/><rect x="50" y="8" width="14" height="60" rx="3" fill="#f4f4f2"/><rect x="45" y="30" width="24" height="16" rx="4" fill="#3a3f46"/></svg><span class="ph-n">IMG_${2041 + i}.jpg</span></div><span class="ph-cap">${caption}</span></div>`;
  }
  const CHECK_NOTE = { slope: "≥ 1/8 in per ft toward suction point", fan: "Exterior wall, outside conditioned space", clearance: "≥ 10 ft from windows/doors", height: "≥ 12 in above roof edge", material: "Schedule 40 PVC throughout", label: "Label on riser, fan and panel", manometer: "U-tube installed at riser", sealing: "Accessible cracks and openings sealed", sump: "Sealed, gasketed cover", posttest: "Short-term test after installation" };
  function reportDoc(S, job, report) {
    const hh = Q.hh(S, job.hh), c = Q.ctr(S, job.ctr), res = Q.result(report), red = job.post != null ? Math.round((1 - job.post / hh.pre) * 100) : null;
    const labelMissing = report.checks.label === "fail";
    const st = { pending: ["Pending review", "pending"], corrections: ["Corrections required", "corr"], approved: ["Approved", "ok"] }[report.status];
    const icon = { pass: "check-circle", warn: "alert", fail: "x-circle", pending: "clock" };
    return `<article class="rdoc">
      <header class="rd-head">${logo("program", "sm")}<div class="rd-ttl"><b>${C.program.name} · ${C.program.lirma} Installation Report</b><span>${C.agency.name}</span></div>
        <div class="rd-tags"><span class="sync-badge">${ic("sync", 13)} Synced from RadonSketch</span><span class="ver">v${report.v}</span><span class="rv-st ${st[1]}">${st[0]}</span></div></header>
      <div class="rd-meta">
        <div><span>Job ID</span><b>${job.id}</b></div><div><span>Household</span><b>${hh.name}</b><small>${hh.street}, ${hh.city}, CO ${hh.zip} · ${hh.county} County</small></div>
        <div><span>Contractor</span><b>${c.name}</b><small>Licence ${c.licence} · ${c.cert.body} ${c.cert.number}</small></div>
        <div><span>Installation</span><b>${job.sched ? Dt.short(job.sched) : "—"}</b><small>Professional: ${job.professional || "—"}</small></div>
        <div><span>Report submitted</span><b>${Dt.dt(report.at)}</b><small>${C.timezone}</small></div>
        <div><span>Standard</span><b>${C.standard}</b><small>${res.text}</small></div>
      </div>
      <div class="rd-read">
        <div><span>Pre-mitigation</span><b>${hh.pre.toFixed(1)}</b><small>pCi/L</small></div>
        <div><span>Post-mitigation</span><b>${job.post == null ? "—" : job.post.toFixed(1)}</b><small>${job.post == null ? "Due within programme timeframe" : "pCi/L · short-term test"}</small></div>
        <div class="red ${red != null && job.post > C.actionLevel ? "bad" : ""}"><span>Reduction</span><b>${red == null ? "—" : red + "%"}</b><small>${job.post != null && job.post > C.actionLevel ? "Still above " + C.actionLevel + " pCi/L" : "Action level " + C.actionLevel + " pCi/L"}</small></div>
      </div>
      <div class="rd-two">
        <section><h4>Diagnostic floor plan · 6 test points</h4>${plan({ mode: "diag" })}<p class="rd-cap">Sub-slab pressure readings in in. WC with suction applied.</p></section>
        <section><h4>System design · Radon Builder</h4>${plan({ mode: "build", fixed: true })}<p class="rd-cap">Suction point (utility room), 3" Sch 40 PVC, exterior fan, vent above eave.</p></section>
      </div>
      <section><h4>Compliance checklist <span class="rd-std">${C.standard}</span><span class="rd-res">${res.text}</span></h4>
        <table class="rd-checks">${CHECKS.map((k, i) => { const v = report.checks[k.key] || "pending"; return `<tr class="${v}"><td>${i + 1}</td><td>${ic(icon[v] || "clock", 16)}</td><td><b>${k.label}</b><small>${CHECK_NOTE[k.key]}</small></td><td class="rc-st">${{ pass: "Pass", warn: "Warning", fail: "Fail", pending: "Pending" }[v]}</td></tr>`; }).join("")}</table></section>
      <section><h4>Installation photos <span class="rd-res">${labelMissing ? "7 of 8 provided" : "8 of 8 provided"}</span></h4>
        <div class="ph-grid">${PHOTOS.map(([k, cap], i) => photoTile(k, cap, k === "label" && labelMissing, i)).join("")}</div></section>
      <section><h4>Bill of materials</h4><table class="rd-bom"><thead><tr><th>Item</th><th>Qty</th><th>Cost</th></tr></thead><tbody>
        ${job.bom.items.map((b) => `<tr><td>${b.item}</td><td>${b.qty}</td><td>$${b.cost.toFixed(2)}</td></tr>`).join("")}
        <tr class="tot"><td>Materials total</td><td></td><td>$${job.bom.total.toFixed(2)}</td></tr><tr class="tot"><td>Programme-funded amount (materials + labour)</td><td></td><td>$${job.funded.toLocaleString("en-US")}.00</td></tr></tbody></table></section>
      <footer class="rd-sign"><div><span>Contractor sign-off</span><b>${job.professional || c.person}</b><small>${(c.team.find((t) => t.name === job.professional) || c.team[0]).licence} · signed electronically in RadonSketch · ${Dt.dt(report.at)}</small></div>
        <div class="rd-gen">Generated by RadonSketch · report v${report.v}</div></footer>
    </article>`;
  }

  window.UI = { ic, esc, logo, badge, scoreBadge, bandPill, gauge, bars, hbars, line, timeline, plan, reportDoc, TPS, PHOTOS };
})();
