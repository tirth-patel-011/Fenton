/* ===========================================================================
   LIRMA Installation Tracker — pages, modals and actions
   =========================================================================== */
(function () {
  const C = window.CONFIG, { Dt, Q, Ops, STATUS, CHECKS, OPEN, DONE, band, miles, fmtDur } = window.Store;
  const { ic, esc, logo, badge, scoreBadge, bandPill, gauge, bars, hbars, line, timeline, plan, reportDoc } = window.UI;
  const Pt = window.Portal;
  const S = () => Pt.S, U = () => Pt.UI;
  const { money, hl, hhOf, ctrOf, scoreOf, jobTitle } = Pt;
  const today = () => Dt.date(S().now);
  const statusOpts = C.statuses.map((s) => [s.key, s.label]);
  const countyNames = window.CoMap.counties;
  const latestResult = (j) => { const r = Q.latest(j); return r ? Q.result(r) : null; };
  const live = (j) => { const v = Object.values(j.live || {}); if (!v.length) return null; return { pass: v.filter((x) => x === "pass").length, warn: v.filter((x) => x === "warn").length, fail: v.filter((x) => x === "fail").length, pending: v.filter((x) => x === "pending").length, n: v.length }; };
  const compCell = (j) => {
    const r = latestResult(j);
    if (r) return `<span class="comp ${r.fail ? "bad" : r.warn ? "warn" : "ok"}">${r.passed}/${r.total}</span>`;
    const l = live(j);
    if (l) return `<span class="comp live ${l.warn || l.fail ? "warn" : "ok"}" title="Live from RadonSketch">${ic("sync", 12)} ${l.pass}/${l.n - l.pending} live</span>`;
    return `<span class="muted">—</span>`;
  };
  const ctrName = (j) => (j.ctr ? Q.ctr(S(), j.ctr).name : `<span class="muted">Unassigned</span>`);
  const hhPin = (j, sel) => { const h = hhOf(j); return { type: "household", id: h.id, lat: h.lat, lng: h.lng, color: STATUS[j.status].color, title: `${h.name} · ${STATUS[j.status].label}`, selected: !!sel }; };
  const ctrPin = (c, sel) => { const l = Q.location(S(), c); return { type: "contractor", id: c.id, lat: l.lat, lng: l.lng, active: l.active, title: `${c.name}${l.active ? " · on site" : ""}`, selected: !!sel }; };
  const dl = (rows) => `<dl class="dl">${rows.filter(Boolean).map(([k, v]) => `<dt>${k}</dt><dd>${v == null || v === "" ? "—" : v}</dd>`).join("")}</dl>`;
  const card = (title, body, extra = "", cls = "") => `<section class="card ${cls}">${title ? `<header class="card-h"><h3>${title}</h3>${extra}</header>` : ""}${body}</section>`;
  const tabs = (items, active, action) => `<div class="tabs">${items.map(([k, l, n]) => `<button class="${active === k ? "on" : ""}${hl("tab-" + k)}" data-a="${action}" data-arg="${k}">${l}${n != null ? `<em>${n}</em>` : ""}</button>`).join("")}</div>`;
  const legend = () => `<div class="legend">${C.statuses.map((s) => `<span><i style="background:${s.color}"></i>${s.label}</span>`).join("")}</div>`;
  const credPill = (st) => `<span class="cred ${st.key}">${st.label}${st.key === "soon" ? ` · ${st.days} d` : ""}</span>`;
  const dot = (t) => (t.endsWith(".") ? t : t + ".");
  const statusPill = (s) => `<span class="ctr-st ${s.toLowerCase()}">${s}</span>`;

  /* =========================================================================
     LOGIN
     ========================================================================= */
  const login = () => `<div class="login">
    <div class="login-card">
      ${logo("program", "login-logo")}
      <h1>${esc(C.portal.name)}</h1>
      <p class="login-sub">${esc(C.program.name)} · ${esc(C.agency.name)}</p>
      <label class="field"><span>Email</span><input type="email" value="${esc(C.signedInUser.email)}" data-enter="signIn"></label>
      <label class="field"><span>Password</span><input type="password" value="prototype" data-enter="signIn"></label>
      <div class="login-row"><label class="chk"><input type="checkbox" checked> Keep me signed in</label><button class="link" data-a="help">Forgot password?</button></div>
      <button class="btn primary block" data-a="signIn">Sign in</button>
      <p class="login-note">${ic("lock", 13)} Programme team sign-in. Any email and password works in this prototype.</p>
      <div class="login-pw"><span>Powered by</span>${logo("radonsketch", "login-rs")}</div>
    </div></div>`;

  /* =========================================================================
     DASHBOARD
     ========================================================================= */
  function histCompleted(r) {
    let n = 0;
    C.history.completedByMonth.forEach((v, i) => {
      const from = `${C.history.year}-${String(i + 1).padStart(2, "0")}-01`;
      const to = Dt.addDays(i === 11 ? `${C.history.year + 1}-01-01` : `${C.history.year}-${String(i + 2).padStart(2, "0")}-01`, -1);
      if (from >= r.from && to <= r.to) n += v;
    });
    return n;
  }
  const attention = () => {
    const s = S(), now = today();
    const unassigned = s.jobs.filter((j) => j.status === "unassigned");
    const overdueRev = s.jobs.filter((j) => j.status === "submitted" && Dt.diffDays(Q.latest(j).at, s.now) > C.reviewOverdueDays);
    const postDue = s.jobs.filter((j) => j.status === "inprogress" && j.checkOut && j.post == null);
    const above = s.jobs.filter((j) => j.post != null && j.post > C.actionLevel);
    const creds = s.contractors.flatMap((c) => Q.credentials(s, c).filter((x) => x.st.key !== "valid").map((x) => ({ c, x })));
    const stale = s.jobs.filter((j) => j.status === "scheduled" && Dt.date(j.sched) < now && !j.checkIn);
    const names = (js) => js.slice(0, 3).map((j) => `${hhOf(j).surname} (${hhOf(j).city})`).join(", ") + (js.length > 3 ? ` +${js.length - 3}` : "");
    return [
      { key: "unassigned", icon: "home", tone: "blue", n: unassigned.length, t: "Approved households waiting to be assigned", d: names(unassigned), a: "dashGo", arg: "jobs|status=unassigned" },
      { key: "reviews", icon: "file", tone: "amber", n: overdueRev.length, t: `Reports waiting for review more than ${C.reviewOverdueDays} days`, d: names(overdueRev), a: "dashGo", arg: "reports|pending" },
      { key: "posttest", icon: "clock", tone: "amber", n: postDue.length, t: "Post-mitigation tests due", d: names(postDue), a: "dashGo", arg: "jobs|special=posttest" },
      { key: "above", icon: "alert", tone: "red", n: above.length, t: `Homes still above ${C.actionLevel} pCi/L after mitigation`, d: above.map((j) => `${hhOf(j).surname} ${j.post} pCi/L`).join(", "), a: "dashGo", arg: "jobs|special=above" },
      { key: "creds", icon: "shield", tone: "red", n: creds.length, t: `Licences, certifications or insurance expiring within ${C.credentialWarnDays} days`, d: creds.slice(0, 3).map(({ c, x }) => `${c.name.split(" ")[0]} ${c.name.split(" ")[1]} — ${x.kind.split(" ").slice(-1)[0]} ${x.st.key === "expired" ? "expired" : Dt.dm(x.expiry)}`).join(", "), a: "dashGo", arg: "contractors|special=creds" },
      { key: "stale", icon: "calendar", tone: "red", n: stale.length, t: "Jobs past their scheduled date with no activity", d: names(stale), a: "dashGo", arg: "jobs|special=overdue" },
    ];
  };
  function buckets(r) {
    const s = S(), done = s.jobs.filter((j) => DONE.includes(j.status) && j.approvedAt);
    const span = Dt.diffDays(r.from, r.to) + 1;
    const out = [];
    if (U().period === "year" || (U().period === "custom" && span > 62)) {
      for (let m = 1; m <= 12; m++) {
        const from = `${C.history.year}-${String(m).padStart(2, "0")}-01`, to = Dt.addDays(m === 12 ? `${C.history.year + 1}-01-01` : `${C.history.year}-${String(m + 1).padStart(2, "0")}-01`, -1);
        if (to < r.from || from > r.to) continue;
        out.push({ label: Dt.month(m).slice(0, 3), value: C.history.completedByMonth[m - 1] + done.filter((j) => Dt.date(j.approvedAt) >= from && Dt.date(j.approvedAt) <= to).length, hl: Dt.date(s.now) >= from && Dt.date(s.now) <= to ? true : undefined });
      }
      return { by: "month", data: out };
    }
    if (span <= 8) {
      for (let i = 0; i < span; i++) { const d = Dt.addDays(r.from, i); out.push({ label: Dt.wdm(d).split(" ").slice(0, 2).join(" "), value: done.filter((j) => Dt.date(j.approvedAt) === d).length }); }
      return { by: "day", data: out };
    }
    for (let d = r.from; d <= r.to; d = Dt.addDays(d, 7)) {
      const e = Dt.addDays(d, 6) > r.to ? r.to : Dt.addDays(d, 6);
      out.push({ label: `${Dt.dm(d)}`, value: done.filter((j) => Dt.date(j.approvedAt) >= d && Dt.date(j.approvedAt) <= e).length });
    }
    return { by: "week", data: out };
  }
  function dashboard() {
    const s = S(), r = Pt.periodRange(), now = today();
    const upcoming = s.jobs.filter((j) => j.status === "scheduled" && j.sched && Dt.date(j.sched) >= now && Dt.date(j.sched) <= Dt.addDays(now, 7));
    const ongoing = s.jobs.filter((j) => j.status === "inprogress");
    const doneIn = s.jobs.filter((j) => DONE.includes(j.status) && Pt.inRange(j.approvedAt, r));
    const completed = doneIn.length + histCompleted(r);
    const awaiting = s.jobs.filter((j) => j.status === "submitted");
    const corr = s.jobs.filter((j) => j.status === "corrections");
    const low = s.contractors.filter((c) => { const sc = scoreOf(c); return sc != null && sc < C.thresholds.good; });
    const kpis = [
      ["upcoming", "calendar", "Upcoming installations", upcoming.length, "Next 7 days", "jobs|special=upcoming"],
      ["ongoing", "activity", "Ongoing", ongoing.length, "In progress now", "jobs|status=inprogress"],
      ["completed", "award", `Completed ${r.label}`, completed, "Approved or closed", "jobs|special=done"],
      ["awaiting", "file", "Reports awaiting review", awaiting.length, "Synced from RadonSketch", "reports|pending"],
      ["corr", "alert", "Corrections required", corr.length, "Waiting on contractors", "reports|corrections"],
      ["low", "gauge", `Contractors below ${C.thresholds.good}% compliance`, low.length, "Compliance score POOR", "contractors|special=low"],
    ];
    const att = attention();
    const todays = s.jobs.filter((j) => j.sched && Dt.date(j.sched) === now).sort((a, b) => a.sched.localeCompare(b.sched));
    const bk = buckets(r);
    const active = s.jobs.filter((j) => j.ctr && [j.assignedAt, j.sched, j.approvedAt, j.checkIn].some((d) => Pt.inRange(d, r)));
    const byCounty = {};
    (active.length ? active : []).forEach((j) => (byCounty[hhOf(j).county] = (byCounty[hhOf(j).county] || 0) + 1));
    const countyData = Object.entries(byCounty).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([label, value]) => ({ label: label + " County", value }));
    let redJobs = doneIn.filter((j) => j.post != null), redNote = r.label;
    if (!redJobs.length) { redJobs = s.jobs.filter((j) => DONE.includes(j.status) && j.post != null); redNote = "all approved jobs (none in period)"; }
    const avgRed = redJobs.length ? Math.round(redJobs.reduce((a, j) => a + (1 - j.post / hhOf(j).pre) * 100, 0) / redJobs.length) : 0;
    let dayJobs = doneIn.filter((j) => j.assignedAt), dayNote = r.label;
    if (!dayJobs.length) { dayJobs = s.jobs.filter((j) => DONE.includes(j.status) && j.assignedAt); dayNote = "all approved jobs"; }
    const avgDays = Math.round(dayJobs.reduce((a, j) => a + Dt.diffDays(j.assignedAt, j.approvedAt), 0) / Math.max(1, dayJobs.length));
    const funds = s.jobs.filter((j) => j.assignedAt && Pt.inRange(j.assignedAt, r)).reduce((a, j) => a + j.funded, 0) + (U().period === "year" ? C.history.fundsCommittedBefore : 0);
    const homesYear = C.history.homesMitigatedBefore + s.jobs.filter((j) => DONE.includes(j.status) && j.approvedAt && j.approvedAt.startsWith(String(C.history.year))).length;
    const p = U().period;
    return `<div class="page-head"><div><h1>Dashboard</h1><p>${Dt.long(s.now)} · ${C.timezone} · ${esc(C.program.lirma)} programme overview</p></div>
      <div class="period">${[["week", "This week"], ["month", "This month"], ["year", "This year"], ["custom", "Custom"]].map(([k, l]) => `<button class="${p === k ? "on" : ""}" data-a="period" data-arg="${k}">${l}</button>`).join("")}
        ${p === "custom" ? `<input type="date" value="${U().custom.from}" data-ch="customFrom"><span>to</span><input type="date" value="${U().custom.to}" data-ch="customTo">` : ""}</div></div>
      <div class="kpis">${kpis.map(([k, i, l, v, sub, arg]) => `<button class="kpi k-${k}${hl("kpi-" + k)}" data-a="dashGo" data-arg="${arg}"><span class="kpi-ic">${ic(i, 18)}</span><span class="kpi-l">${l}</span><b>${v}</b><small>${sub}</small></button>`).join("")}</div>
      <div class="grid g-21">
        ${card("Needs attention", `<div class="attn">${att.map((x) => `<button class="attn-i t-${x.tone}${x.n ? "" : " zero"}${hl("attn-" + x.key)}" data-a="${x.a}" data-arg="${x.arg}"><span class="attn-ic">${ic(x.icon, 17)}</span><span class="attn-t"><b>${x.t}</b><small>${x.n ? esc(x.d) : "Nothing outstanding"}</small></span><em>${x.n}</em>${ic("chev-right", 16)}</button>`).join("")}</div>`)}
        ${card(`Today's schedule <small>${Dt.wdm(now)}</small>`, todays.length ? `<div class="today">${todays.map((j) => `<button class="td-i" data-a="openJob" data-arg="${j.id}"><span class="td-t">${Dt.time(j.sched)}</span><span class="td-b"><b>${hhOf(j).name}</b><small>${hhOf(j).city} · ${ctrOf(j).name}</small></span>${badge(j.status)}</button>`).join("")}</div>` : `<div class="empty">No installations scheduled today.</div>`, `<button class="link" data-a="dashGo" data-arg="jobs|special=upcoming">Next 7 days</button>`)}
      </div>
      <div class="grid g-12">
        ${card(`Contractors with low compliance <small>below ${C.thresholds.good}%</small>`, low.length ? `<table class="tbl mini"><thead><tr><th>Contractor</th><th>Score</th><th>Open corrections</th><th></th></tr></thead><tbody>${low.map((c) => `<tr class="clickable" data-a="openContractor" data-arg="${c.id}"><td><b>${c.name}</b><small class="sub">${c.base.city} · ${statusPill(c.status)}</small></td><td>${scoreBadge(scoreOf(c))}</td><td>${Q.jobsOf(s, c.id).filter((j) => j.status === "corrections").length}</td><td><button class="link" data-a="openContractor" data-arg="${c.id}">View profile ${ic("arrow", 13)}</button></td></tr>`).join("")}</tbody></table>` : `<div class="empty">All contractors are at or above ${C.thresholds.good}%.</div>`)}
        ${card("Installations across Colorado", `<div class="mini-map">${Pt.mapSlot("dash", { mini: true, labels: false }, { pins: s.jobs.map((j) => hhPin(j)) })}</div>${legend()}`, `<button class="link" data-a="go" data-arg="map">Open Map View ${ic("arrow", 13)}</button>`)}
      </div>
      <div class="grid g-3">
        ${card(`Installations completed <small>by ${bk.by} · ${r.label}</small>`, bars(bk.data))}
        ${card(`Jobs by county <small>${r.label}</small>`, countyData.length ? hbars(countyData, { onClick: "dashCounty" }) : `<div class="empty">No job activity in this period.</div>`)}
        ${card("Average radon reduction", `<div class="big-num${hl("avgred")}"><b>${avgRed}%</b><span>average reduction</span><small>${redJobs.length} homes · ${redNote}</small></div>
          <div class="totals${hl("totals")}"><div><b>${p === "year" ? homesYear : completed}</b><span>Homes mitigated ${p === "year" ? "this year" : r.label}</span></div><div><b>${avgDays} days</b><span>Avg. assignment → approval<br><small>${dayNote}</small></span></div><div><b>${money(funds)}</b><span>Programme funds committed${p === "year" ? " this year" : " " + r.label}</span></div></div>`)}
      </div>`;
  }

  /* =========================================================================
     MAP VIEW
     ========================================================================= */
  function zipCenter(zip) {
    const hs = S().households.filter((h) => h.zip === zip);
    if (!hs.length) return null;
    return [hs.reduce((a, h) => a + h.lat, 0) / hs.length, hs.reduce((a, h) => a + h.lng, 0) / hs.length];
  }
  function mapFiltered() {
    const s = S(), a = U().map.applied;
    const zc = a.zip ? (a.zipGeo ? [a.zipGeo.lat, a.zipGeo.lng] : zipCenter(a.zip)) : null;
    const inZip = (lat, lng, zip) => !a.zip || (a.radius && zc ? miles(zc, [lat, lng]) <= +a.radius : zip === a.zip);
    const jobs = s.jobs.filter((j) => {
      const h = hhOf(j), c = ctrOf(j);
      return inZip(h.lat, h.lng, h.zip) && (!a.county || h.county === a.county) && (!a.ctr || j.ctr === a.ctr) && (!a.status || j.status === a.status) && (!a.band || (c && band(scoreOf(c)).key === a.band));
    });
    const ctrs = s.contractors.filter((c) => {
      const l = Q.location(s, c);
      return (!a.ctr || c.id === a.ctr) && (!a.band || band(scoreOf(c)).key === a.band) && (!a.county || c.counties.includes(a.county) || Q.openJobs(s, c.id).some((j) => hhOf(j).county === a.county)) && (!a.zip || !a.radius || !zc || miles(zc, [l.lat, l.lng]) <= +a.radius);
    });
    return { jobs, ctrs };
  }
  function mapPage() {
    const s = S(), m = U().map, f = m.f, a = m.applied, sel = m.sel;
    const { jobs, ctrs } = mapFiltered();
    const zips = [...new Set(s.households.map((h) => h.zip))].sort();
    const G = window.CoMap.usingGoogle(), place = m.place;
    const zc = a.zip ? (a.zipGeo ? [a.zipGeo.lat, a.zipGeo.lng] : zipCenter(a.zip)) : null;
    const pins = [];
    if (place) pins.push({ type: "place", id: "place", lat: place.lat, lng: place.lng, title: place.formatted });
    if (m.layer !== "contractors") jobs.forEach((j) => pins.push(hhPin(j, sel && sel.type === "household" && sel.id === j.hh)));
    if (m.layer !== "households") ctrs.forEach((c) => pins.push(ctrPin(c, sel && sel.type === "contractor" && sel.id === c.id)));
    // Camera: frame whatever the filters return (or the searched address)
    const active = !!(a.zip || a.county || a.ctr || a.status || a.band);
    const shown = (m.layer !== "contractors" ? jobs.length : 0) + (m.layer !== "households" ? ctrs.length : 0);
    let view;
    if (m.viewTarget === "place" && place) view = { key: `place:${place.lat},${place.lng}:${m.viewNonce || 0}`, type: "point", lat: place.lat, lng: place.lng, zoom: 15 };
    else {
      const key = "f:" + JSON.stringify([a.zip || "", a.radius || "", a.county || "", a.ctr || "", a.status || "", a.band || "", m.layer, m.viewNonce || 0]);
      if (!active) view = { key, type: "reset" };
      else if (a.radius && zc) {
        const r = +a.radius, dLat = r / 69, dLng = r / (69 * Math.cos((zc[0] * Math.PI) / 180));
        view = { key, type: "bounds", bounds: [[zc[0] - dLat, zc[1] - dLng], [zc[0] + dLat, zc[1] + dLng]], maxZoom: 13 };
      } else if (a.county) {
        const c = window.CoMap.countyOf(a.county); view = { key, type: "bounds", bounds: c.bbox, maxZoom: 11 };
      } else {
        const pts = m.layer !== "contractors" ? jobs.map((j) => [hhOf(j).lat, hhOf(j).lng]) : [];
        if (m.layer !== "households" && (m.layer === "contractors" || a.ctr || a.band || !pts.length)) ctrs.forEach((c) => { const l = Q.location(s, c); pts.push([l.lat, l.lng]); });
        if (!pts.length) view = a.zip && zc ? { key, type: "point", lat: zc[0], lng: zc[1], zoom: 12 } : { key, type: "none" };
        else {
          const la = pts.map((p) => p[0]), lo = pts.map((p) => p[1]);
          const b = [[Math.min(...la), Math.min(...lo)], [Math.max(...la), Math.max(...lo)]];
          view = b[1][0] - b[0][0] < 0.02 && b[1][1] - b[0][1] < 0.02 ? { key, type: "point", lat: (b[0][0] + b[1][0]) / 2, lng: (b[0][1] + b[1][1]) / 2, zoom: 13 } : { key, type: "bounds", bounds: b, maxZoom: 12 };
        }
      }
    }
    const opt = (k, arr, all) => `<select data-ch="mapF" data-f="${k}"><option value="">${all}</option>${arr.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}" ${f[k] === v ? "selected" : ""}>${esc(l)}</option>`; }).join("")}</select>`;
    let strip = "";
    if (a.county) {
      const cj = s.jobs.filter((j) => hhOf(j).county === a.county);
      const working = [...new Set(cj.filter((j) => OPEN.includes(j.status)).map((j) => j.ctr))].filter(Boolean);
      strip = `<div class="county-strip">${ic("map-pin", 16)}<b>${a.county} County</b><span><em>${working.length}</em> contractor${working.length === 1 ? "" : "s"} working</span><span><em>${cj.filter((j) => j.status !== "unassigned" && OPEN.includes(j.status)).length + cj.filter((j) => j.status === "unassigned").length}</em> open jobs</span><span><em>${cj.filter((j) => DONE.includes(j.status)).length}</em> completed</span><button data-a="mapClearCounty">${ic("x", 14)} Clear</button></div>`;
    }
    return `<div class="page-head tight"><div><h1>Map View</h1><p>Every ${esc(C.program.lirma)} household and contractor in Colorado — live from RadonSketch.</p></div>
        <div class="seg">${[["households", "Households"], ["contractors", "Contractors"], ["both", "Both"]].map(([k, l]) => `<button class="${m.layer === k ? "on" : ""}" data-a="mapLayer" data-arg="${k}">${l}</button>`).join("")}</div></div>
      <div class="map-filters">
        <label class="${G ? "zip-ta" : ""}"><span>ZIP code${G ? " · Google" : ""}</span>${G ? Pt.taBox("zip", "zip", { placeholder: "Any Colorado ZIP", value: U().ta.zip != null ? U().ta.zip : f.zip }) : opt("zip", zips.map((z) => [z, `${z} · ${s.households.find((h) => h.zip === z).city}`]), "Any Colorado ZIP")}</label>
        <label><span>Radius</span><select data-ch="mapF" data-f="radius" ${f.zip || (G && U().ta.zip) ? "" : "disabled"}><option value="">Exact ZIP</option>${[5, 10, 25, 50, 100].map((r) => `<option value="${r}" ${f.radius == r ? "selected" : ""}>${r} mi</option>`).join("")}</select></label>
        <label><span>County</span>${opt("county", countyNames, "All 64 counties")}</label>
        <label><span>Contractor</span>${opt("ctr", s.contractors.map((c) => [c.id, c.name]), "All contractors")}</label>
        <label><span>Job status</span>${opt("status", statusOpts, "All statuses")}</label>
        <label><span>Compliance band</span>${opt("band", [["poor", `POOR (<${C.thresholds.good}%)`], ["good", `GOOD (${C.thresholds.good}–${C.thresholds.great - 1}%)`], ["great", `GREAT (${C.thresholds.great}%+)`]], "All bands")}</label>
        <div class="mf-acts"><small class="muted">Filters apply instantly</small><button class="btn ghost" data-a="mapReset">Reset</button>${G ? `<button class="btn primary" data-a="mapSearch">${ic("search", 15)} Search ZIP</button>` : ""}</div>
      </div>
      <div class="map-area ${sel ? "with-panel" : ""}">
        <div class="map-wrap">${Pt.mapSlot("main", { labels: true }, {
            pins, county: a.county || null,
            radius: a.radius && zc ? { key: `${zc.join(",")}|${a.radius}`, center: zc, miles: +a.radius } : null,
            view,
          })}
          ${active && !shown ? `<div class="map-empty">${ic("search", 18)}<div><b>No results for these filters</b><small>Try a larger radius or fewer filters.</small></div><button class="btn ghost sm" data-a="mapReset">Reset filters</button></div>` : ""}
          ${G ? `<div class="map-search">${Pt.taBox("place", "place", { placeholder: "Search a Colorado address or place…", value: U().ta.place || "" })}</div>`
            : `<button class="map-search off" data-a="go" data-arg="settings">${ic(window.GMaps && window.GMaps.status === "failed" ? "alert" : "search", 15)} ${window.GMaps && window.GMaps.status === "failed" ? "Google Maps unavailable — see Settings" : window.GMaps && window.GMaps.status === "loading" ? "Connecting to Google Maps…" : "Connect Google Maps in Settings to search real addresses"}</button>`}
          ${strip}<div class="map-legend"><b>Job status</b>${C.statuses.map((x) => `<span><i style="background:${x.color}"></i>${x.label}</span>`).join("")}<span class="lg-ctr"><i></i>Contractor (ring = on site)</span></div>
          <div class="map-count">${m.layer !== "contractors" ? `${jobs.length} households` : ""}${m.layer === "both" ? " · " : ""}${m.layer !== "households" ? `${ctrs.length} contractors` : ""}${a.zip ? ` · ZIP ${esc(a.zip)}${a.radius ? ` + ${a.radius} mi` : ""}` : ""}${G ? ` <span class="g-on">Google</span>` : ""}</div>
        </div>
        ${sel ? `<aside class="map-panel" data-scroll="map-panel">${sel.type === "place" && place ? placePanel(place) : sel.type === "household" ? hhPanel(sel.id) : sel.type === "contractor" ? ctrPanel(sel.id) : ""}</aside>` : ""}
      </div>`;
  }
  function placePanel(p) {
    const s = S(), here = [p.lat, p.lng];
    const near = s.households.map((h) => ({ h, d: miles(here, [h.lat, h.lng]) })).filter((x) => x.d <= 15).sort((a, b) => a.d - b.d).slice(0, 4);
    const dupe = near.find((x) => x.d < 0.05);
    const ctrs = s.contractors.map((c) => ({ c, d: miles(here, [c.base.lat, c.base.lng]), inArea: c.counties.includes(p.county) }))
      .sort((a, b) => (b.inArea - a.inArea) || a.d - b.d).slice(0, 4);
    const fmt = (d) => (d < 0.1 ? "< 0.1 mi" : `${d.toFixed(d < 10 ? 1 : 0)} mi`);
    return `<div class="mp-head"><div><small>${ic("search", 12)} Address search · Google</small><h3>${esc(p.street || p.name || p.formatted.split(",")[0])}</h3><span class="chip">${esc(p.county || "—")} County</span></div><button class="x" data-a="mapClearPlace" aria-label="Clear search">${ic("x", 18)}</button></div>
      ${dl([["Address", esc(p.formatted)], ["County", p.county ? `${esc(p.county)} County` : "—"], ["ZIP code", esc(p.zip || "—")], ["Coordinates", `<span class="mono">${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}</span>`]])}
      ${dupe ? `<div class="mp-note">${ic("home", 15)} This address matches <b>${dupe.h.name}</b> (${dupe.h.id}).</div>` : ""}
      <h4 class="mp-h">LIRMA households within 15 mi <em>${near.length}</em></h4>
      <div class="mp-jobs">${near.length ? near.map(({ h, d }) => { const j = Q.jobOfHh(s, h.id); return `<button data-a="mapSelectHh" data-arg="${h.id}"><span><b>${h.name}</b><small>${h.city} · ${fmt(d)}</small></span>${badge(j.status)}</button>`; }).join("") : `<div class="empty sm">No programme households nearby.</div>`}</div>
      <h4 class="mp-h">Contractors for this address</h4>
      <div class="mp-jobs">${ctrs.map(({ c, d, inArea }) => `<button data-a="openContractor" data-arg="${c.id}"><span><b>${c.name}</b><small>${fmt(d)} from base · ${inArea ? `<span class="ok-t">serves ${esc(p.county)} County</span>` : "outside service area"}${c.status !== "Active" ? ` · ${c.status}` : ""}</small></span>${scoreBadge(scoreOf(c))}</button>`).join("")}</div>
      ${dupe ? `<button class="btn primary block" data-a="mapSelectHh" data-arg="${dupe.h.id}">View household</button>` : `<button class="btn primary block" data-a="addHhFromPlace">${ic("plus", 15)} Add as LIRMA household</button>`}`;
  }
  function hhPanel(id) {
    const s = S(), h = Q.hh(s, id), j = Q.jobOfHh(s, id), c = ctrOf(j);
    return `<div class="mp-head"><div><small>${h.id}</small><h3>${h.name}</h3>${badge(j.status)}</div><button class="x" data-a="mapClose" aria-label="Close">${ic("x", 18)}</button></div>
      ${dl([["Address", `${h.street}<br>${h.city}, CO ${h.zip}`], ["County", `${h.county} County`], ["Phone", h.phone], ["Foundation", h.foundation]])}
      <div class="mp-read"><div><span>Pre-mitigation</span><b>${h.pre.toFixed(1)}</b><small>pCi/L</small></div><div><span>Post-mitigation</span><b class="${j.post > C.actionLevel ? "bad" : ""}">${j.post == null ? "—" : j.post.toFixed(1)}</b><small>${j.post == null ? "Not yet tested" : "pCi/L"}</small></div></div>
      ${dl([["Job ID", `<b class="mono">${j.id}</b>`], ["Scheduled", j.sched ? `${Dt.short(j.sched)} · ${j.window}` : "Not yet scheduled"]])}
      ${c ? `<div class="mp-ctr"><div class="mp-ctr-h"><span class="av sq">${c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span><div><b>${c.name}</b><small>${c.phone}</small></div>${scoreBadge(scoreOf(c))}</div><button class="btn ghost block sm" data-a="openContractor" data-arg="${c.id}">View Contractor Profile</button></div>`
        : `<div class="mp-ctr none">${ic("user", 16)} No contractor assigned yet<button class="btn primary block sm" data-a="openAssign" data-arg="hh:${h.id}">Assign contractor</button></div>`}
      <button class="btn primary block" data-a="openJob" data-arg="${j.id}">View Job</button>`;
  }
  function ctrPanel(id) {
    const s = S(), c = Q.ctr(s, id), st = Q.stats(s, c), l = Q.location(s, c), open = Q.openJobs(s, id);
    return `<div class="mp-head"><div><small>${c.id} · ${c.licence}</small><h3>${c.name}</h3>${statusPill(c.status)} ${l.active ? `<span class="onsite">${ic("map-pin", 13)} On site · ${hhOf(l.job).name}</span>` : `<span class="muted sm">At base · ${c.base.city}</span>`}</div><button class="x" data-a="mapClose" aria-label="Close">${ic("x", 18)}</button></div>
      <div class="mp-gauge">${gauge(scoreOf(c), 190)}</div>
      <div class="chips">${c.counties.map((x) => `<span class="chip">${x}</span>`).join("")}</div>
      <h4 class="mp-h">Active jobs <em>${open.length}</em></h4>
      <div class="mp-jobs">${open.length ? open.map((j) => `<button data-a="openJob" data-arg="${j.id}"><span><b>${hhOf(j).name}</b><small>${hhOf(j).city} · ${j.id}</small></span>${badge(j.status)}</button>`).join("") : `<div class="empty sm">No active jobs.</div>`}</div>
      ${dl([["Jobs completed", st.completed], ["Last activity", Dt.rel(st.lastActivity, s.now)], ["Phone", c.phone]])}
      <button class="btn primary block" data-a="openContractor" data-arg="${c.id}">View Contractor Profile</button>`;
  }

  /* =========================================================================
     JOBS
     ========================================================================= */
  const jobSpecials = () => {
    const s = S(), now = today(), r = Pt.periodRange();
    return {
      upcoming: { label: "Upcoming installations · next 7 days", test: (j) => j.status === "scheduled" && j.sched && Dt.date(j.sched) >= now && Dt.date(j.sched) <= Dt.addDays(now, 7) },
      posttest: { label: "Post-mitigation tests due", test: (j) => j.status === "inprogress" && j.checkOut && j.post == null },
      above: { label: `Homes still above ${C.actionLevel} pCi/L after mitigation`, test: (j) => j.post != null && j.post > C.actionLevel },
      overdue: { label: "Past scheduled date with no activity", test: (j) => j.status === "scheduled" && Dt.date(j.sched) < now && !j.checkIn },
      done: { label: `Completed ${r.label}`, test: (j) => DONE.includes(j.status) && Pt.inRange(j.approvedAt, r) },
    };
  };
  function jobsPage() {
    const s = S();
    return `<div class="page-head"><div><h1>Jobs</h1><p>${s.jobs.length} ${esc(C.program.lirma)} installation jobs · sample data</p></div><button class="btn primary${hl("create")}" data-a="openAssign">${ic("plus", 16)} Create Job</button></div>
      ${Pt.table("jobs", {
        rows: s.jobs, sort: "id", dir: "desc", per: 12, placeholder: "Search job ID, household, city, contractor…",
        text: (j) => [j.id, hhOf(j).name, hhOf(j).city, hhOf(j).county, j.ctr ? ctrOf(j).name : "unassigned"].join(" "),
        filters: [
          { key: "status", label: "Status", options: statusOpts, test: (j, v) => j.status === v },
          { key: "county", label: "County", options: [...new Set(s.households.map((h) => h.county))].sort(), test: (j, v) => hhOf(j).county === v },
          { key: "ctr", label: "Contractor", options: s.contractors.map((c) => [c.id, c.name]), test: (j, v) => j.ctr === v },
          { key: "from", hidden: true, test: (j, v) => j.sched && Dt.date(j.sched) >= v },
          { key: "to", hidden: true, test: (j, v) => j.sched && Dt.date(j.sched) <= v },
        ],
        dateRange: true, specials: jobSpecials(),
        rowAction: "openJob", rowArg: (j) => j.id, rowHl: (j) => U().highlight.includes("row-" + j.id),
        cols: [
          { key: "id", label: "Job ID", sort: (j) => j.id, render: (j) => `<b class="mono">${j.id}</b>` },
          { key: "hh", label: "Household", sort: (j) => hhOf(j).name, render: (j) => `<b>${hhOf(j).name}</b><small class="sub">${hhOf(j).id}</small>` },
          { key: "city", label: "City / County", sort: (j) => hhOf(j).city, render: (j) => `${hhOf(j).city}<small class="sub">${hhOf(j).county} County</small>` },
          { key: "ctr", label: "Contractor", sort: (j) => (j.ctr ? ctrOf(j).name : "~"), render: ctrName },
          { key: "sched", label: "Scheduled date", sort: (j) => j.sched || j.targetDate || "9999", render: (j) => j.sched ? `${Dt.short(j.sched)}<small class="sub">${j.window}</small>` : j.targetDate ? `<span class="muted">Target ${Dt.short(j.targetDate)}</span>` : `<span class="muted">—</span>` },
          { key: "status", label: "Status", sort: (j) => STATUS[j.status].order, render: (j) => badge(j.status) },
          { key: "comp", label: "Compliance", sort: (j) => { const r = latestResult(j); return r ? r.passed : -1; }, render: compCell },
          { key: "act", label: "Actions", cls: "right", render: (j) => `<button class="btn ghost xs" data-a="openJob" data-arg="${j.id}">View</button>` },
        ],
      })}`;
  }

  /* =========================================================================
     HOUSEHOLDS
     ========================================================================= */
  function householdsPage() {
    const s = S();
    return `<div class="page-head"><div><h1>Households</h1><p>${s.households.length} ${esc(C.program.lirmaFull)} households · sample data</p></div><button class="btn primary" data-a="openAddHh">${ic("plus", 16)} Add Household</button></div>
      ${Pt.table("households", {
        rows: s.households, sort: "approved", dir: "desc", per: 12, placeholder: "Search ID, name, city, ZIP…",
        text: (h) => [h.id, h.name, h.city, h.county, h.zip, h.street].join(" "),
        filters: [
          { key: "county", label: "County", options: [...new Set(s.households.map((h) => h.county))].sort(), test: (h, v) => h.county === v },
          { key: "status", label: "Job status", options: statusOpts, test: (h, v) => Q.jobOfHh(s, h.id).status === v },
          { key: "foundation", label: "Foundation", options: ["Basement", "Slab-on-grade", "Crawlspace", "Combination"], test: (h, v) => h.foundation === v },
        ],
        rowAction: "openHousehold", rowArg: (h) => h.id,
        cols: [
          { key: "id", label: "Household ID", sort: (h) => h.id, render: (h) => `<b class="mono">${h.id}</b>` },
          { key: "name", label: "Name", sort: (h) => h.name, render: (h) => `<b>${h.name}</b><small class="sub">${h.street}</small>` },
          { key: "city", label: "City", sort: (h) => h.city, render: (h) => h.city },
          { key: "county", label: "County", sort: (h) => h.county, render: (h) => h.county },
          { key: "approved", label: "LIRMA approval", sort: (h) => h.approved, render: (h) => Dt.short(h.approved) },
          { key: "pre", label: "Pre-mitigation", sort: (h) => h.pre, cls: "num", render: (h) => `<b class="${h.pre >= 20 ? "hi" : ""}">${h.pre.toFixed(1)}</b> <small>pCi/L</small>` },
          { key: "status", label: "Status", sort: (h) => STATUS[Q.jobOfHh(s, h.id).status].order, render: (h) => badge(Q.jobOfHh(s, h.id).status) },
          { key: "ctr", label: "Assigned contractor", sort: (h) => { const j = Q.jobOfHh(s, h.id); return j.ctr ? ctrOf(j).name : "~"; }, render: (h) => ctrName(Q.jobOfHh(s, h.id)) },
        ],
      })}`;
  }
  function householdPage(id) {
    const s = S(), h = Q.hh(s, id), jobs = s.jobs.filter((j) => j.hh === id), j = jobs[jobs.length - 1], red = Q.reduction(s, j);
    return `<button class="back" data-a="go" data-arg="households">${ic("chev-left", 16)} All households</button>
      <div class="page-head"><div><small class="mono">${h.id}</small><h1>${h.name} ${badge(j.status)}</h1><p>${h.street}, ${h.city}, CO ${h.zip} · ${h.county} County</p></div>
        <div class="btns">${j.status === "unassigned" ? `<button class="btn primary" data-a="openAssign" data-arg="hh:${h.id}">${ic("user-check", 16)} Assign Job</button>` : `<button class="btn ghost" data-a="openAssign" data-arg="hh:${h.id}">${ic("refresh", 16)} Assign Job</button>`}<button class="btn primary" data-a="openJob" data-arg="${j.id}">${ic("briefcase", 16)} View Job</button></div></div>
      <div class="grid g-111">
        ${card("Household details", dl([["Household name", h.name], ["Address", `${h.street}<br>${h.city}, CO ${h.zip}`], ["County", `${h.county} County`], ["Phone", h.phone], ["Occupants", h.occ], ["Foundation", h.foundation], ["Year built", h.built], ["LIRMA approval", Dt.short(h.approved)]]))}
        ${card("Radon readings", `<div class="readings"><div><span>Pre-mitigation</span><b>${h.pre.toFixed(1)}</b><small>pCi/L</small></div><div><span>Post-mitigation</span><b class="${j.post > C.actionLevel ? "bad" : ""}">${j.post == null ? "—" : j.post.toFixed(1)}</b><small>${j.post == null ? "Due within programme timeframe" : "pCi/L"}</small></div></div>
          <div class="red-bar"><div><span>Reduction</span><b>${red == null ? "—" : red + "%"}</b></div><div class="rb-t"><i style="width:${red || 0}%"></i></div><small>EPA action level ${C.actionLevel} pCi/L</small></div>`)}
        ${card("Location", `<div class="mini-map short">${Pt.mapSlot("hh", { mini: true }, { pins: [hhPin(j, true)], county: h.county })}</div>`)}
      </div>
      ${card("Job history", `<table class="tbl"><thead><tr><th>Job ID</th><th>Contractor</th><th>Scheduled</th><th>Status</th><th>Reports</th><th>Approved</th></tr></thead><tbody>${jobs.map((x) => `<tr class="clickable" data-a="openJob" data-arg="${x.id}"><td><b class="mono">${x.id}</b></td><td>${ctrName(x)}</td><td>${x.sched ? Dt.short(x.sched) : "—"}</td><td>${badge(x.status)}</td><td>${x.reports.length ? x.reports.map((r) => `v${r.v}`).join(", ") : "—"}</td><td>${x.approvedAt ? Dt.short(x.approvedAt) : "—"}</td></tr>`).join("")}</tbody></table>`)}`;
  }

  /* =========================================================================
     CONTRACTORS
     ========================================================================= */
  function contractorsPage() {
    const s = S();
    return `<div class="page-head"><div><h1>Contractors</h1><p>${s.contractors.length} approved ${esc(C.program.lirma)} contractors · sample data</p></div><button class="btn primary" data-a="openAddCtr">${ic("plus", 16)} Add Contractor</button></div>
      ${Pt.table("contractors", {
        rows: s.contractors, sort: "score", dir: "desc", per: 10, placeholder: "Search contractor, person, licence, county…",
        text: (c) => [c.name, c.person, c.licence, c.counties.join(" "), c.base.city].join(" "),
        filters: [
          { key: "status", label: "Status", options: ["Active", "Suspended", "Pending"], test: (c, v) => c.status === v },
          { key: "band", label: "Compliance", options: [["poor", "POOR"], ["good", "GOOD"], ["great", "GREAT"]], test: (c, v) => band(scoreOf(c)).key === v },
          { key: "county", label: "Service county", options: [...new Set(s.contractors.flatMap((c) => c.counties))].sort(), test: (c, v) => c.counties.includes(v) },
        ],
        specials: {
          low: { label: `Compliance below ${C.thresholds.good}%`, test: (c) => { const x = scoreOf(c); return x != null && x < C.thresholds.good; } },
          creds: { label: `Credentials expiring within ${C.credentialWarnDays} days or expired`, test: (c) => Q.credentials(s, c).some((x) => x.st.key !== "valid") },
        },
        rowAction: "openContractor", rowArg: (c) => c.id,
        cols: [
          { key: "name", label: "Contractor", sort: (c) => c.name, render: (c) => `<div class="ctr-cell"><span class="av sq">${c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span><div><b>${c.name}</b><small class="sub">${c.person} · ${c.base.city}</small></div></div>` },
          { key: "status", label: "Status", sort: (c) => c.status, render: (c) => statusPill(c.status) },
          { key: "lic", label: "Licence no.", sort: (c) => c.licence, render: (c) => `<span class="mono">${c.licence}</span>` },
          { key: "counties", label: "Service counties", render: (c) => `${c.counties.slice(0, 2).join(", ")}${c.counties.length > 2 ? ` <span class="muted">+${c.counties.length - 2}</span>` : ""}` },
          { key: "score", label: "Compliance score", sort: (c) => scoreOf(c) ?? -1, render: (c) => scoreBadge(scoreOf(c)) },
          { key: "active", label: "Active jobs", sort: (c) => Q.openJobs(s, c.id).length, cls: "num", render: (c) => Q.openJobs(s, c.id).length },
          { key: "done", label: "Completed", sort: (c) => Q.stats(s, c).completed, cls: "num", render: (c) => Q.stats(s, c).completed },
          { key: "last", label: "Last activity", sort: (c) => Q.stats(s, c).lastActivity, render: (c) => Dt.rel(Q.stats(s, c).lastActivity, s.now) },
          { key: "act", label: "Actions", cls: "right", render: (c) => `<button class="btn ghost xs" data-a="openContractor" data-arg="${c.id}">View</button>` },
        ],
      })}`;
  }
  function metrics(c, range) {
    const s = S(), js = Q.jobsOf(s, c.id), st = Q.stats(s, c), now = today();
    if (range === "all") return st;
    const from = range === "year" ? `${now.slice(0, 4)}-01-01` : `${now.slice(0, 7)}-01`;
    const done = js.filter((j) => DONE.includes(j.status) && j.approvedAt && Dt.date(j.approvedAt) >= from);
    const histShare = range === "year" ? Math.round(c.hist.completed * 0.55) : 0;
    return { ...st, completed: done.length + histShare };
  }
  function contractorPage(id) {
    const s = S(), c = Q.ctr(s, id), tab = U().ctrTab, st = Q.stats(s, c), sc = scoreOf(c);
    const tabsList = [["details", "Details"], ["schedule", "Schedule"], ["projects", "Projects", Q.jobsOf(s, id).length], ["reports", "Reports", Q.jobsOf(s, id).reduce((a, j) => a + j.reports.length, 0)], ["compliance", "Compliance"], ["team", "Team", c.team.length], ["credentials", "Credentials"], ["activity", "Activity"], ["notes", "Notes", c.notes.length]];
    return `<button class="back" data-a="go" data-arg="contractors">${ic("chev-left", 16)} All contractors</button>
      <div class="profile-head">
        <span class="av xl sq">${c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
        <div class="ph-main"><small class="mono">${c.id} · Licence ${c.licence}</small><h1>${c.name}</h1>
          <p>${ic("map-pin", 14)} ${c.base.city} · ${ic("user", 14)} ${c.person} · ${ic("phone", 14)} ${c.phone} · ${scoreBadge(sc)}</p></div>
        <div class="ph-acts"><label class="status-sel">${statusPill(c.status)}<select data-ch="ctrStatus" data-id="${c.id}" aria-label="Contractor status">${["Active", "Suspended", "Pending"].map((x) => `<option ${c.status === x ? "selected" : ""}>${x}</option>`).join("")}</select>${ic("chev-down", 14)}</label>
          <button class="btn ghost" data-a="editCtr" data-arg="${c.id}">${ic("edit", 15)} Edit details</button>
          <button class="btn primary" data-a="openAssign" data-arg="ctr:${c.id}" ${c.status !== "Active" ? "disabled title='Only active contractors can be assigned jobs'" : ""}>${ic("user-check", 15)} Assign Job</button></div>
      </div>
      ${tabs(tabsList, tab, "ctrTab")}
      <div class="tab-body">${ctrTab(c, tab, st, sc)}</div>`;
  }
  function ctrTab(c, tab, st, sc) {
    const s = S(), js = Q.jobsOf(s, c.id);
    if (tab === "details") {
      const rng = U().metricsRange, m = metrics(c, rng);
      return `<div class="grid g-11">
        ${card("Basic details", dl([["Responsible person", c.person], ["Colorado licence", `<span class="mono">${c.licence}</span>`], ["Certification", `${c.cert.body} · <span class="mono">${c.cert.number}</span> · expires ${Dt.short(c.cert.expiry)}`], ["Insurance", `${c.insurance.carrier} · expires ${Dt.short(c.insurance.expiry)}`], ["Phone", c.phone], ["Email", c.email], ["Address", c.base.address], ["Service counties", `<div class="chips">${c.counties.map((x) => `<span class="chip">${x}</span>`).join("")}</div>`], ["First programme job", c.firstJob ? Dt.short(c.firstJob) : "—"]]))}
        ${card("Metrics", `<div class="metrics-top"><div class="${hl("ctr-gauge")}">${gauge(sc, 220)}</div></div>
          <div class="metrics">${[["Completed", m.completed], ["In Progress", m.inProgress], ["Scheduled", m.scheduled], ["Corrections Required", m.corrections], ["Average reduction", m.avgReduction == null ? "—" : m.avgReduction + "%"], ["On-time rate", m.onTime == null ? "—" : m.onTime + "%"], ["Last activity", Dt.rel(m.lastActivity, s.now)]].map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>`,
          `<div class="seg sm">${[["all", "All time"], ["year", "This year"], ["month", "This month"]].map(([k, l]) => `<button class="${rng === k ? "on" : ""}" data-a="metricsRange" data-arg="${k}">${l}</button>`).join("")}</div>`)}
      </div>`;
    }
    if (tab === "schedule") return calendar(c);
    if (tab === "projects") {
      const t = U().projToggle, rows = js.filter((j) => (t === "current" ? !DONE.includes(j.status) : t === "past" ? DONE.includes(j.status) : true));
      return `<div class="seg mb">${[["current", "Current"], ["past", "Past"], ["all", "All"]].map(([k, l]) => `<button class="${t === k ? "on" : ""}" data-a="projToggle" data-arg="${k}">${l}</button>`).join("")}</div>
        ${Pt.table("ctrproj-" + c.id + t, { rows, sort: "start", dir: "desc", per: 10, noToolbar: true, rowAction: "openJob", rowArg: (j) => j.id, text: () => "",
          cols: [
            { key: "id", label: "Job ID", sort: (j) => j.id, render: (j) => `<b class="mono">${j.id}</b>` },
            { key: "hh", label: "Household", sort: (j) => hhOf(j).name, render: (j) => `<b>${hhOf(j).name}</b>` },
            { key: "loc", label: "Location", sort: (j) => hhOf(j).city, render: (j) => `${hhOf(j).city}<small class="sub">${hhOf(j).county} County</small>` },
            { key: "start", label: "Start date", sort: (j) => j.sched || "", render: (j) => (j.sched ? Dt.short(j.sched) : "—") },
            { key: "end", label: "Completed date", sort: (j) => j.approvedAt || "", render: (j) => (j.approvedAt ? Dt.short(j.approvedAt) : "—") },
            { key: "st", label: "Status", sort: (j) => STATUS[j.status].order, render: (j) => badge(j.status) },
            { key: "pp", label: "Pre / Post pCi/L", render: (j) => `${hhOf(j).pre.toFixed(1)} → ${j.post == null ? "—" : `<b class="${j.post > C.actionLevel ? "bad" : ""}">${j.post.toFixed(1)}</b>`}` },
            { key: "comp", label: "Compliance", render: compCell },
          ] })}`;
    }
    if (tab === "reports") {
      const rows = js.flatMap((j) => j.reports.map((r) => ({ j, r }))).sort((a, b) => b.r.at.localeCompare(a.r.at));
      return rows.length ? `<div class="tbl-card"><table class="tbl"><thead><tr><th>Job ID</th><th>Household</th><th>Submitted</th><th>Version</th><th>Compliance result</th><th>Review status</th></tr></thead><tbody>${rows.map(({ j, r }) => `<tr class="clickable" data-a="openReport" data-arg="${j.id}|${r.v}"><td><b class="mono">${j.id}</b></td><td><b>${hhOf(j).name}</b><span class="sync-badge sm">${ic("sync", 11)} Synced from RadonSketch</span></td><td>${Dt.dt(r.at)}</td><td><span class="ver">v${r.v}</span></td><td>${Q.result(r).text}</td><td>${revPill(r.status)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty card">No reports submitted yet.</div>`;
    }
    if (tab === "compliance") {
      const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].slice(10 - c.trend.length);
      const fails = {};
      js.forEach((j) => j.reports.forEach((r) => CHECKS.forEach((k) => { if (r.checks[k.key] && r.checks[k.key] !== "pass") fails[k.key] = (fails[k.key] || 0) + 1; })));
      const rr = window.Store.rng(c.id);
      CHECKS.forEach((k) => (fails[k.key] = (fails[k.key] || 0) + Math.floor(rr() * (100 - (c.score || 90)) / 9)));
      const fdata = Object.entries(fails).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => ({ label: Q.checkLabel(k), value: v, color: "#D64545" }));
      const openCorr = js.filter((j) => j.status === "corrections");
      return `<div class="grid g-11">
        ${card(`Compliance score trend <small>last ${c.trend.length} months</small>`, line(sc != null && c.trend.length ? [...c.trend.slice(0, -1), sc] : c.trend, months))}
        ${card("Most-failed checks <small>warnings and fails, all reports</small>", fdata.length ? hbars(fdata) : `<div class="empty">No failed checks recorded.</div>`)}
      </div>
      ${card(`Open correction requests <small>${openCorr.length}</small>`, openCorr.length ? `<div class="corr-list">${openCorr.map((j) => { const r = Q.latest(j); return `<button data-a="openReport" data-arg="${j.id}|${r.v}"><span><b>${hhOf(j).name}</b><small>${j.id} · requested ${Dt.short(r.reviewedAt)}</small></span><span class="corr-k">${r.failKeys.map((k) => `<em>${Q.checkLabel(k)}</em>`).join("")}</span>${ic("chev-right", 16)}</button>`; }).join("")}</div>` : `<div class="empty">No open correction requests.</div>`)}`;
    }
    if (tab === "team") return `<div class="team">${c.team.map((t) => `<div class="card team-c"><span class="av">${t.name.split(" ").map((w) => w[0]).join("")}</span><div><b>${t.name}</b><span>${t.role}</span><small class="mono">${t.licence}</small></div><span class="cred valid">Licensed</span></div>`).join("")}</div>`;
    if (tab === "credentials") return card("Credentials", `<table class="tbl"><thead><tr><th>Credential</th><th>Number / carrier</th><th>Expiry</th><th>Status</th></tr></thead><tbody>${Q.credentials(s, c).map((x) => `<tr><td><b>${x.kind}</b></td><td class="mono">${x.number}</td><td>${Dt.short(x.expiry)}</td><td>${credPill(x.st)}</td></tr>`).join("")}${c.team.map((t) => `<tr><td>Individual licence · ${t.name}</td><td class="mono">${t.licence}</td><td>${Dt.short(c.licenceExpiry)}</td><td>${credPill(Q.credStatus(s, c.licenceExpiry))}</td></tr>`).join("")}</tbody></table>`);
    if (tab === "activity") {
      const evs = js.flatMap((j) => j.events.map((e) => ({ ...e, desc: `${hhOf(j).name} · ${e.desc}` }))).filter((e) => e.actor !== "system");
      return card("Activity across all jobs", timeline(evs, { limit: 40 }));
    }
    if (tab === "notes") return card("Internal notes", notesBlock(c.notes, "ctr", c.id));
    return "";
  }
  function calendar(c) {
    const s = S(), key = c.id, now = today(), p = Dt.parts(now);
    const cal = (U().cal[key] = U().cal[key] || { y: p.y, m: p.m });
    const first = `${cal.y}-${String(cal.m).padStart(2, "0")}-01`, startDow = Dt.dow(first);
    const daysIn = Dt.diffDays(first, cal.m === 12 ? `${cal.y + 1}-01-01` : `${cal.y}-${String(cal.m + 1).padStart(2, "0")}-01`);
    const jobs = Q.jobsOf(s, c.id).filter((j) => j.sched);
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(`<div class="cal-c out"></div>`);
    for (let d = 1; d <= daysIn; d++) {
      const ds = `${cal.y}-${String(cal.m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const js = jobs.filter((j) => Dt.date(j.sched) === ds).sort((a, b) => a.sched.localeCompare(b.sched));
      cells.push(`<div class="cal-c ${ds === now ? "today" : ""}"><span class="cal-d">${d}</span>${js.map((j) => `<button class="cal-job${hl("cal-" + j.id)}" style="--c:${STATUS[j.status].color}" data-a="openJob" data-arg="${j.id}"><b>${Dt.time(j.sched)}</b><span>${hhOf(j).surname}</span><small>${STATUS[j.status].label}</small></button>`).join("")}</div>`);
    }
    while (cells.length % 7) cells.push(`<div class="cal-c out"></div>`);
    return `<section class="card cal-card"><header class="card-h"><div class="cal-nav"><button data-a="calNav" data-arg="${key}|-1" aria-label="Previous month">${ic("chev-left", 16)}</button><h3>${Dt.month(cal.m)} ${cal.y}</h3><button data-a="calNav" data-arg="${key}|1" aria-label="Next month">${ic("chev-right", 16)}</button><button class="btn ghost xs" data-a="calNav" data-arg="${key}|0">Today</button></div>${legend()}</header>
      <div class="cal"><div class="cal-h">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => `<span>${d}</span>`).join("")}</div><div class="cal-g">${cells.join("")}</div></div></section>`;
  }
  const notesBlock = (notes, kind, id) => `<div class="notes">${notes.length ? notes.slice().sort((a, b) => b.at.localeCompare(a.at)).map((n) => `<div class="note"><span class="av sm">${n.by.split(" ").map((w) => w[0]).join("")}</span><div><div class="note-h"><b>${esc(n.by)}</b><span>${Dt.dt(n.at)}</span></div><p>${esc(n.text)}</p></div></div>`).join("") : `<div class="empty">No notes yet.</div>`}
    <div class="note-add"><textarea placeholder="Add an internal note — visible to the programme team only" data-in="field" data-path="noteDraft" data-fk="note-${kind}">${esc(U().noteDraft || "")}</textarea><button class="btn primary sm" data-a="addNote" data-arg="${kind}|${id}">${ic("send", 14)} Add note</button></div></div>`;

  /* =========================================================================
     REPORTS
     ========================================================================= */
  const revPill = (st) => `<span class="rv-st ${{ pending: "pending", corrections: "corr", approved: "ok" }[st]}">${{ pending: "Pending review", corrections: "Corrections required", approved: "Approved" }[st]}</span>`;
  function reportsPage() {
    const s = S(), tab = U().reportTab;
    const withR = s.jobs.filter((j) => j.reports.length);
    const sets = { pending: withR.filter((j) => j.status === "submitted"), corrections: withR.filter((j) => j.status === "corrections"), approved: withR.filter((j) => DONE.includes(j.status)), all: withR };
    return `<div class="page-head"><div><h1>Reports</h1><p>Installation reports synced from RadonSketch for review against ${C.standard}.</p></div></div>
      ${tabs([["pending", "Pending Review", sets.pending.length], ["corrections", "Corrections Required", sets.corrections.length], ["approved", "Approved", sets.approved.length], ["all", "All", sets.all.length]], tab, "reportTab")}
      ${Pt.table("reports-" + tab, {
        rows: sets[tab], sort: "sub", dir: tab === "pending" ? "asc" : "desc", per: 12, placeholder: "Search job, household, contractor…",
        text: (j) => [j.id, hhOf(j).name, ctrOf(j).name].join(" "),
        filters: [{ key: "ctr", label: "Contractor", options: s.contractors.map((c) => [c.id, c.name]), test: (j, v) => j.ctr === v }],
        rowAction: "openReport", rowArg: (j) => `${j.id}|${Q.latest(j).v}`, rowHl: (j) => U().highlight.includes("row-" + j.id),
        cols: [
          { key: "id", label: "Job ID", sort: (j) => j.id, render: (j) => `<b class="mono">${j.id}</b>` },
          { key: "hh", label: "Household", sort: (j) => hhOf(j).name, render: (j) => `<b>${hhOf(j).name}</b><span class="sync-badge sm">${ic("sync", 11)} Synced from RadonSketch</span>` },
          { key: "ctr", label: "Contractor", sort: (j) => ctrOf(j).name, render: (j) => ctrOf(j).name },
          { key: "sub", label: "Submitted", sort: (j) => Q.latest(j).at, render: (j) => { const r = Q.latest(j), d = Dt.diffDays(r.at, s.now); return `${Dt.dt(r.at)}${j.status === "submitted" && d > C.reviewOverdueDays ? `<small class="sub bad">${d} days waiting</small>` : ""}`; } },
          { key: "v", label: "Version", sort: (j) => Q.latest(j).v, render: (j) => `<span class="ver">v${Q.latest(j).v}</span>` },
          { key: "res", label: "Compliance result", sort: (j) => Q.result(Q.latest(j)).passed, render: (j) => { const r = Q.result(Q.latest(j)); return `<span class="comp ${r.fail ? "bad" : r.warn ? "warn" : "ok"}">${r.text}</span>`; } },
          { key: "st", label: "Status", sort: (j) => Q.latest(j).status, render: (j) => revPill(Q.latest(j).status) },
        ],
      })}`;
  }
  function reportPage(jobId, v) {
    const s = S(), j = Q.job(s, jobId), r = j.reports.find((x) => x.v === +v) || Q.latest(j), latest = Q.latest(j), res = Q.result(r), c = ctrOf(j);
    const canAct = r === latest && r.status === "pending";
    return `<button class="back" data-a="go" data-arg="reports">${ic("chev-left", 16)} Reports</button>
      <div class="rv-layout">
        <div class="rv-doc" data-scroll="rv-doc-${jobId}">${reportDoc(s, j, r)}</div>
        <aside class="rv-side">
          <div class="card">
            <small class="mono">${j.id}</small><h3>${hhOf(j).name}</h3><p class="muted">${c.name}</p>
            <div class="rv-vers">${j.reports.map((x) => `<button class="${x === r ? "on" : ""}" data-a="openReport" data-arg="${j.id}|${x.v}">v${x.v}<small>${Dt.dm(x.at)}</small></button>`).join("")}</div>
            <div class="rv-sum${hl("rv-sum")}"><b>${res.text}</b><div class="rv-bar">${CHECKS.map((k) => `<i class="${r.checks[k.key]}"></i>`).join("")}</div>
              <div class="rv-cnt"><span class="ok">${res.passed} pass</span><span class="warn">${res.warn} warning</span><span class="bad">${res.fail} fail</span></div><small>${C.standard}</small></div>
            ${revPill(r.status)}
            ${r.status === "corrections" && r.comment ? `<div class="rv-comment"><b>Reviewer comment</b><p>${esc(r.comment)}</p></div>` : ""}
            <div class="rv-acts">
              ${canAct ? `<button class="btn success block${hl("approve")}" data-a="approve" data-arg="${j.id}">${ic("check-circle", 16)} Approve</button><button class="btn warn block${hl("corr")}" data-a="openCorr" data-arg="${j.id}">${ic("alert", 16)} Request Corrections</button>` : ""}
              <button class="btn ghost block" data-a="pdf" data-arg="${j.id}">${ic("download", 16)} Download PDF</button>
              <button class="btn ghost block" data-a="openJob" data-arg="${j.id}">${ic("briefcase", 16)} Open job</button>
            </div>
          </div>
          <div class="card"><h4 class="side-h">Version history</h4>${j.reports.slice().reverse().map((x) => `<div class="vh"><span class="ver">v${x.v}</span><div><b>${Q.result(x).text}</b><small>Synced ${Dt.dt(x.at)}${x.reviewedAt ? ` · reviewed ${Dt.dt(x.reviewedAt)}` : ""}</small></div>${revPill(x.status)}</div>`).join("")}</div>
        </aside>
      </div>`;
  }

  /* =========================================================================
     NOTIFICATIONS & SETTINGS
     ========================================================================= */
  function notificationsPage() {
    const s = S(), icon = { report: "file", resubmit: "refresh", credential: "shield", overdue: "calendar", checkin: "map-pin", assign: "user-check", approve: "award", corrections: "alert" };
    return `<div class="page-head"><div><h1>Notifications</h1><p>Programme events from the portal and RadonSketch.</p></div><button class="btn ghost" data-a="markAllRead">${ic("check", 15)} Mark all as read</button></div>
      <div class="card notif">${s.notifications.map((n) => `<button class="nt ${n.unread ? "unread" : ""}${hl("nt-" + n.id)}" data-a="openNotif" data-arg="${n.id}"><span class="nt-ic t-${n.type}">${ic(icon[n.type] || "bell", 17)}</span><span class="nt-b"><b>${esc(n.text)}</b><small>${Dt.dt(n.at)} · ${Dt.rel(n.at, s.now)}</small></span>${n.unread ? "<i></i>" : ""}${ic("chev-right", 16)}</button>`).join("")}</div>`;
  }
  function googleCard() {
    const G = window.GMaps, st = G ? G.status : "off", key = G ? G.key() : "";
    const pill = { off: ["Not connected", "none"], loading: ["Connecting…", "soon"], ready: ["Connected", "valid"], failed: ["Problem", "expired"] }[st];
    return card(`Google Maps Platform <small>real street map and address search</small>`, `
      <div class="gk-row"><span class="cred ${pill[1]}">${pill[0]}</span>${key ? `<span class="mono">${esc(G.masked())}</span><small class="muted">${G.keySource() === "browser" ? "saved in this browser" : "set in data.js"}</small>` : `<small class="muted">No key saved</small>`}</div>
      ${st === "failed" ? `<div class="gk-err">${ic("alert", 15)}<span>${esc(G.reason)}</span></div>` : ""}
      <div class="gk-grid">
        <div>
          <label class="field"><span>${key ? "Replace API key" : "API key"}</span><span class="gk-in"><input type="${U().gkShow ? "text" : "password"}" placeholder="Paste your Google Maps Platform API key (starts with AIza…)" value="${esc(U().gkeyDraft || "")}" data-in="field" data-path="gkeyDraft" data-fk="gkey" autocomplete="off" spellcheck="false"><button class="btn ghost sm" data-a="gShow">${U().gkShow ? "Hide" : "Show"}</button></span></label>
          <div class="btns"><button class="btn primary" data-a="gSave">${ic("check", 15)} Save &amp; connect</button>${key && G.keySource() === "browser" ? `<button class="btn ghost" data-a="gRemove">Remove key</button>` : ""}</div>
          <p class="gk-note">${ic("lock", 13)} The key is saved only in this browser on this computer (local storage). It isn't written into the prototype files, so files you share don't contain it.</p>
          <b class="gk-h">What it turns on</b>
          <ul class="gk-ul"><li>Google street map on every map — still locked to Colorado</li><li>Address and place search on Map View</li><li>Real ZIP code + radius filter for any Colorado ZIP</li><li>Address search when adding a household, with exact map location</li></ul>
        </div>
        <div class="gk-steps"><b class="gk-h">Set up the key in Google Cloud Console</b>
          <ol><li>Enable <b>Maps JavaScript API</b> and <b>Places API (New)</b> for the project.</li><li>Make sure <b>billing</b> is enabled.</li><li>Under <b>API restrictions</b>, limit the key to those two APIs, and set a quota or budget alert.</li><li>Leave <b>Website restrictions</b> off while you open the prototype by double-clicking — a local file has no website address, so Google would block it. Add the restriction once the prototype is hosted on a website.</li></ol>
          <p class="muted sm">Map ID: <span class="mono">${esc((C.google && C.google.mapId) || "DEMO_MAP_ID")}</span> (Google's test map ID, set in data.js).</p></div>
      </div>`, "", "span-all");
  }
  function settingsPage() {
    return `<div class="page-head"><div><h1>Settings</h1><p>Programme configuration for this prototype. Changes apply immediately.</p></div></div>
      <div class="grid g-11">
        ${card("Programme details", `<label class="field"><span>Agency name</span><input value="${esc(C.agency.name)}" data-in="field" data-path="cfg.agency.name"></label>
          <label class="field"><span>Programme name</span><input value="${esc(C.program.name)}" data-in="field" data-path="cfg.program.name"></label>
          <label class="field"><span>Portal name</span><input value="${esc(C.portal.name)}" data-in="field" data-path="cfg.portal.name"></label>
          <div class="field-row"><label class="field"><span>Timezone</span><input value="${C.timezone}" disabled></label><label class="field"><span>Action level (pCi/L)</span><input value="${C.actionLevel}" disabled></label></div>
          <button class="btn primary" data-a="saveSettings">Save changes</button>`)}
        ${card("Compliance thresholds", `<p class="muted">Compliance score = share of ${C.standard} checks passed across a contractor's reviewed jobs.</p>
          <div class="thr"><span class="band-pill b-poor">POOR</span><span>below</span><input type="number" min="1" max="99" value="${C.thresholds.good}" data-ch="thrGood"><span>%</span></div>
          <div class="thr"><span class="band-pill b-good">GOOD</span><span>${C.thresholds.good}% to below</span><input type="number" min="1" max="100" value="${C.thresholds.great}" data-ch="thrGreat"><span>%</span></div>
          <div class="thr"><span class="band-pill b-great">GREAT</span><span>${C.thresholds.great}% and above</span></div>
          <div class="thr-g">${gauge(88, 200)}</div>`)}
      </div>
      ${card("Portal users and roles", `<table class="tbl"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last sign-in</th></tr></thead><tbody>${C.portalUsers.map((u) => `<tr><td><b>${u.name}</b></td><td>${u.email}</td><td><span class="role">${u.role}</span></td><td>${Dt.dt(u.last)}</td></tr>`).join("")}</tbody></table>
        <div class="roles">${[["Program Coordinator", "Creates households and jobs, assigns contractors, manages contractors and settings."], ["Reviewer/Inspector", "Reviews synced reports, approves or requests corrections, adds notes."], ["Read-only", "Views dashboards, maps, jobs and reports. Cannot change records."]].map(([r, d]) => `<div><b>${r}</b><p>${d}</p></div>`).join("")}</div>`, `<button class="btn ghost sm" data-a="inviteUser">${ic("plus", 14)} Invite user</button>`)}
      ${googleCard()}
      ${card("RadonSketch integration", `<div class="integ">${logo("radonsketch", "integ-logo")}<div><b>Connected</b><p>Jobs are pushed to contractors' RadonSketch apps; reports, photos and compliance checks sync back automatically.</p><small>Last sync ${Dt.dt(S().now)} · ${C.timezone}</small></div><span class="cred valid">Healthy</span></div>`)}`;
  }

  /* =========================================================================
     MODALS
     ========================================================================= */
  function modal() {
    const m = U().modal;
    const body = { job: jobModal, assign: assignModal, corr: corrModal, hh: hhModal, ctr: ctrModal }[m.type](m);
    return `<div class="modal-back" data-a="modalBack"><div class="modal m-${m.type}" role="dialog" aria-modal="true">${body}</div></div>`;
  }
  function jobModal(m) {
    const s = S(), j = Q.job(s, m.id), h = hhOf(j), c = ctrOf(j), t = m.tab;
    const btns = [`<button class="btn ghost" data-a="closeModal">Close</button>`];
    if (j.status === "unassigned") btns.push(`<button class="btn primary" data-a="openAssign" data-arg="hh:${h.id}">${ic("user-check", 15)} Assign Contractor</button>`);
    else if (!DONE.includes(j.status)) btns.push(`<button class="btn ghost" data-a="reassign" data-arg="${j.id}">${ic("refresh", 15)} Reassign</button>`);
    if (j.status === "submitted") btns.push(`<button class="btn warn" data-a="openCorr" data-arg="${j.id}">${ic("alert", 15)} Request Corrections</button>`, `<button class="btn success" data-a="approve" data-arg="${j.id}">${ic("check-circle", 15)} Approve Report</button>`);
    if (j.status === "corrections") btns.push(`<button class="btn primary" data-a="openReport" data-arg="${j.id}|${Q.latest(j).v}">${ic("file", 15)} View report</button>`);
    const tabsList = [["details", "Details"], ["contractor", "Contractor"], ["tracking", "Contractor Tracking"], ["report", "Report"], ["notes", "Notes", j.notes.length || null], ["activity", "Activity", j.events.length]];
    return `<header class="m-head"><div><h2>${esc(jobTitle(j))}</h2><p><b class="mono">${j.id}</b> · ${badge(j.status)} · ${h.city}, ${h.county} County</p></div><button class="x" data-a="closeModal" aria-label="Close">${ic("x", 20)}</button></header>
      ${tabs(tabsList, t, "jobTab")}
      <div class="m-body" data-scroll="jm-${j.id}-${t}">${jobTabBody(j, h, c, t, m)}</div>
      <footer class="m-foot">${btns.join("")}</footer>`;
  }
  function jobTabBody(j, h, c, t, m) {
    const s = S();
    if (t === "details") {
      const l = live(j);
      return `<div class="grid g-11 tight">
        ${card("Job", dl([["Status", badge(j.status)], ["Job ID", `<span class="mono">${j.id}</span>`], ["Scheduled", j.sched ? `${Dt.long(j.sched)}<br><small>${j.window} · ${C.timezone}</small>` : j.targetDate ? `Target date ${Dt.short(j.targetDate)}` : "Not yet scheduled"], ["Contractor", c ? `${c.name}` : "Unassigned"], ["Assigned professional", j.professional || "—"], ["Programme-funded amount", money(j.funded)], ["Priority", j.priority], ["Special instructions", esc(j.instructions || "—")], ["Created", Dt.dt(j.createdAt)], ["Assigned", Dt.dt(j.assignedAt)], ["Accepted", j.acceptedAt ? Dt.dt(j.acceptedAt) : j.assignedAt ? "Awaiting contractor" : "—"]]))}
        ${card("Household", dl([["Name", h.name], ["Address", `${h.street}<br>${h.city}, CO ${h.zip}`], ["County", `${h.county} County`], ["Phone", h.phone], ["Occupants", h.occ], ["Foundation", h.foundation], ["Year built", h.built], ["LIRMA approval", Dt.short(h.approved)], ["Pre-mitigation reading", `<b>${h.pre.toFixed(1)} pCi/L</b>`], ["Post-mitigation reading", j.post == null ? "—" : `<b class="${j.post > C.actionLevel ? "bad" : ""}">${j.post.toFixed(1)} pCi/L</b>`]]))}
      </div>
      ${l ? card(`Live compliance <small>${ic("sync", 12)} from RadonSketch · ${C.standard}</small>`, `<div class="live${hl("live")}">${CHECKS.map((k) => { const v = j.live[k.key] || "pending"; return `<div class="lv ${v}">${ic({ pass: "check-circle", warn: "alert", fail: "x-circle", pending: "clock" }[v], 15)}<span>${k.label}</span><em>${{ pass: "Pass", warn: "Warning", fail: "Fail", pending: "Pending" }[v]}</em></div>`; }).join("")}</div>`) : ""}`;
    }
    if (t === "contractor") {
      if (!c) return `<div class="empty card">${ic("user", 22)}<b>No contractor assigned</b><span>Assign a contractor to see their summary here.</span><button class="btn primary" data-a="openAssign" data-arg="hh:${h.id}">Assign contractor</button></div>`;
      const js = Q.jobsOf(s, c.id).filter((x) => x.sched).sort((a, b) => a.sched.localeCompare(b.sched));
      return `<div class="grid g-21 tight">${card(c.name, dl([["Company", c.name], ["Status", statusPill(c.status)], ["Responsible person", c.person], ["Licence", `<span class="mono">${c.licence}</span>`], ["Certification", `${c.cert.body} ${c.cert.number} · exp. ${Dt.short(c.cert.expiry)}`], ["Phone", c.phone], ["Email", c.email], ["First programme job", js[0] ? Dt.short(js[0].sched) : c.firstJob ? Dt.short(c.firstJob) : "—"], ["Last programme job", js.length ? Dt.short(js[js.length - 1].sched) : "—"], ["Notes", esc((c.notes[0] || {}).text || "—")]]))}
        <div class="card center">${gauge(scoreOf(c), 210)}<button class="btn primary block" data-a="openContractor" data-arg="${c.id}">View Full Profile</button></div></div>`;
    }
    if (t === "tracking") {
      const onSite = j.status === "inprogress" && j.checkIn && !j.checkOut;
      const from = [h.lat + 0.032, h.lng - 0.045];
      const tracking = { home: [h.lat, h.lng], color: STATUS[j.status].color, from, contractor: j.checkIn ? [h.lat + 0.0003, h.lng + 0.0005] : null, animate: onSite };
      const dist = j.checkInDist != null ? j.checkInDist : 0.02;
      return `<div class="track">
        <div class="track-map">${Pt.mapSlot("track", { mini: false, labels: false, cluster: false }, { pins: [], tracking, trackKey: `${j.id}|${j.status}|${j.checkIn}|${j.checkOut}|${m.trackNonce || 0}` })}
          ${onSite ? `<div class="live-chip">${ic("map-pin", 13)} Live · contractor on site</div>` : ""}</div>
        <div class="track-info">
          <h4>${c ? c.name : "No contractor"}</h4><small>${j.professional || ""}</small>
          ${dl([["Check-in", j.checkIn ? `${Dt.dt(j.checkIn)}<br><small>${h.street}, ${h.city}</small>` : "Not checked in yet"], ["Check-out", j.checkOut ? `${Dt.dt(j.checkOut)}<br><small>${h.street}, ${h.city}</small>` : j.checkIn ? "On site now" : "—"], ["Time on site", j.checkIn ? fmtDur(Dt.diffMin(j.checkIn, j.checkOut || S().now)) : "—"], ["Distance from household at check-in", j.checkIn ? `${dist} mi (${Math.round(dist * 1609)} m)` : "—"], ["Timezone", `${C.timezone} (${C.timezoneLabel})`]])}
          ${onSite ? `<button class="btn ghost sm" data-a="replayTrack">${ic("refresh", 14)} Replay arrival</button>` : ""}
          <p class="note-sm">${ic("lock", 13)} Location is shared only while the contractor is on an active job.</p>
        </div></div>`;
    }
    if (t === "report") {
      const r = Q.latest(j);
      return r ? `<div class="emb-doc">${reportDoc(s, j, r)}</div>` : `<div class="empty card">${ic("file", 24)}<b>No report submitted yet</b><span>The report appears here as soon as the contractor generates it in RadonSketch.</span></div>`;
    }
    if (t === "notes") return card("Internal notes", notesBlock(j.notes, "job", j.id));
    if (t === "activity") {
      return `<div class="act-head"><label class="flt"><span>Show</span><select data-ch="actFilter">${[["all", "All activity"], ["contractor", "Contractor actions"], ["programme", "Programme actions"], ["system", "System"]].map(([k, l]) => `<option value="${k}" ${m.act === k ? "selected" : ""}>${l}</option>`).join("")}</select></label><small class="muted">Times in ${C.timezone}</small></div>
        <div class="${hl("activity")}">${timeline(j.events, { filter: m.act })}</div>`;
    }
    return "";
  }

  function recommend(h) {
    const s = S();
    const list = s.contractors.map((c) => {
      const sc = scoreOf(c), open = Q.openJobs(s, c.id).length, dist = Math.round(miles([c.base.lat, c.base.lng], [h.lat, h.lng])), inArea = c.counties.includes(h.county);
      const disabled = c.status !== "Active" ? (c.status === "Suspended" ? "Suspended" : "Onboarding — not yet active") : null;
      return { c, sc, open, dist, inArea, disabled, rank: disabled ? -999 : (inArea ? 100 : 0) + (sc || 0) - open * 2 - dist / 25 };
    }).sort((a, b) => b.rank - a.rank);
    const best = list.find((x) => !x.disabled && x.inArea && (x.sc || 0) >= C.thresholds.good);
    if (best) best.rec = true;
    return list;
  }
  function assignModal(m) {
    const s = S();
    if (m.success) {
      const c = Q.ctr(s, m.ctr);
      return `<header class="m-head"><div><h2>Job assigned</h2></div><button class="x" data-a="closeModal" aria-label="Close">${ic("x", 20)}</button></header>
        <div class="m-body success"><span class="ok-c">${ic("check", 34)}</span><h3>Job ${m.success} assigned to ${dot(c.name)}</h3><p>They've been notified, and the project has been created in their RadonSketch app.</p>
          <div class="succ-sum">${dl([["Household", Q.hh(s, m.hh).name], ["Target date", Dt.long(m.date)], ["Priority", m.priority], ["Professional", Q.job(s, m.success).professional]])}</div></div>
        <footer class="m-foot"><button class="btn ghost" data-a="assignAnother">Assign another</button><button class="btn ghost" data-a="closeModal">Done</button><button class="btn primary" data-a="openJob" data-arg="${m.success}">View job</button></footer>`;
    }
    const steps = ["Choose household", "Choose contractor", "Schedule & instructions"];
    const head = `<header class="m-head"><div><h2>${m.reassign ? "Reassign job" : "Assign a LIRMA job"}</h2><p>${m.reassign ? `${m.reassign} · ${Q.hh(s, m.hh).name}` : "Create a job and send it to a contractor's RadonSketch app."}</p></div><button class="x" data-a="closeModal" aria-label="Close">${ic("x", 20)}</button></header>
      <div class="steps">${steps.map((l, i) => `<div class="stp ${m.step === i + 1 ? "on" : m.step > i + 1 ? "done" : ""}"><span>${m.step > i + 1 ? ic("check", 13) : i + 1}</span>${l}</div>`).join("")}</div>`;
    let body = "", next = "";
    if (m.step === 1) {
      const q = (m.q || "").toLowerCase();
      const list = s.households.map((h) => ({ h, j: Q.jobOfHh(s, h.id) })).filter(({ h }) => !q || [h.name, h.id, h.city, h.county].join(" ").toLowerCase().includes(q))
        .sort((a, b) => (a.j.status === "unassigned" ? 0 : 1) - (b.j.status === "unassigned" ? 0 : 1) || b.h.approved.localeCompare(a.h.approved));
      body = `<div class="search wide">${ic("search", 16)}<input type="search" placeholder="Search household, ID, city or county…" value="${esc(m.q || "")}" data-in="field-r" data-path="modal.q" data-fk="as-q"></div>
        <p class="hint">Approved households waiting for a contractor are listed first.</p>
        <div class="opt-list">${list.map(({ h, j }) => { const dis = j.status !== "unassigned"; return `<button class="opt-c ${m.hh === h.id ? "on" : ""}${hl("as-hh-" + h.id)}" data-a="asHh" data-arg="${h.id}" ${dis ? "disabled" : ""}><i class="radio ${m.hh === h.id ? "on" : ""}"></i><span class="oc-m"><b>${h.name}</b><small>${h.id} · ${h.city}, ${h.county} County · approved ${Dt.short(h.approved)}</small></span><span class="oc-r">${h.pre.toFixed(1)} <small>pCi/L</small></span>${dis ? `<span class="oc-tag">${STATUS[j.status].label}</span>` : `<span class="oc-tag ok">Awaiting assignment</span>`}</button>`; }).join("")}</div>`;
      next = `<button class="btn primary" data-a="asNext" ${m.hh ? "" : "disabled"}>Next: choose contractor ${ic("arrow", 15)}</button>`;
    } else if (m.step === 2) {
      const h = Q.hh(s, m.hh);
      body = `<div class="as-hh">${ic("home", 16)} <b>${h.name}</b> · ${h.street}, ${h.city} · ${h.county} County · ${h.pre.toFixed(1)} pCi/L</div>
        <div class="opt-list">${recommend(h).map((x) => `<button class="opt-c ctr ${m.ctr === x.c.id ? "on" : ""}${x.rec ? " rec" : ""}${hl("as-ctr-" + x.c.id)}" data-a="asCtr" data-arg="${x.c.id}" ${x.disabled ? "disabled" : ""}>
          <i class="radio ${m.ctr === x.c.id ? "on" : ""}"></i><span class="oc-m"><b>${x.c.name} ${x.rec ? `<em class="rec-tag">${ic("star", 12)} Recommended</em>` : ""}</b><small>${x.c.base.city} · ${x.c.person}${x.disabled ? ` · <span class="bad">${x.disabled}</span>` : ""}</small></span>
          <span class="oc-stats"><span>${scoreBadge(x.sc)}<small>Compliance</small></span><span><b>${x.open}</b><small>Open jobs</small></span><span><b>${x.dist} mi</b><small>Distance</small></span><span class="${x.inArea ? "in" : "out"}">${ic(x.inArea ? "check-circle" : "x-circle", 15)}<small>${x.inArea ? "In service area" : "Outside area"}</small></span></span></button>`).join("")}</div>`;
      next = `<button class="btn ghost" data-a="asBack">Back</button><button class="btn primary" data-a="asNext" ${m.ctr ? "" : "disabled"}>Next: schedule ${ic("arrow", 15)}</button>`;
    } else {
      const h = Q.hh(s, m.hh), c = Q.ctr(s, m.ctr), j = Q.jobOfHh(s, m.hh);
      body = `<div class="grid g-11 tight"><div>
          <label class="field"><span>Target installation date</span><input type="date" value="${m.date}" data-in="field" data-path="modal.date"></label>
          <label class="field"><span>Priority</span><div class="seg">${["Standard", "High", "Urgent"].map((p) => `<button class="${m.priority === p ? "on" : ""}" data-a="asPriority" data-arg="${p}">${p}</button>`).join("")}</div></label>
          <label class="field"><span>Assigned professional</span><select data-in="field" data-path="modal.professional">${c.team.map((t) => `<option ${m.professional === t.name ? "selected" : ""}>${t.name}</option>`).join("")}</select></label>
          <label class="field"><span>Instructions for the contractor</span><textarea rows="4" data-in="field" data-path="modal.instructions">${esc(m.instructions)}</textarea></label></div>
        <div class="card soft"><h4 class="side-h">Summary</h4>${dl([["Job", j.id], ["Household", `${h.name}<br><small>${h.street}, ${h.city}</small>`], ["Contractor", `${c.name} ${scoreBadge(scoreOf(c))}`], ["Programme-funded amount", money(j.funded)], ["Notification", "Push notification + project in RadonSketch"]])}</div></div>`;
      next = `<button class="btn ghost" data-a="asBack">Back</button><button class="btn primary${hl("as-confirm")}" data-a="asConfirm">${ic("send", 15)} Assign job</button>`;
    }
    return `${head}<div class="m-body" data-scroll="as-${m.step}">${body}</div><footer class="m-foot"><button class="btn ghost" data-a="closeModal">Cancel</button><span class="sp"></span>${next}</footer>`;
  }
  function corrModal(m) {
    const s = S(), j = Q.job(s, m.jobId), r = Q.latest(j);
    return `<header class="m-head"><div><h2>Request corrections</h2><p>${hhOf(j).name} · ${j.id} · report v${r.v}</p></div><button class="x" data-a="closeModal" aria-label="Close">${ic("x", 20)}</button></header>
      <div class="m-body"><p class="hint">Select the items the contractor must fix. They'll get a notification in RadonSketch and can resubmit.</p>
        <div class="corr-checks">${CHECKS.map((k) => { const v = r.checks[k.key]; return `<label class="cc ${v}"><input type="checkbox" ${m.keys.includes(k.key) ? "checked" : ""} data-ch="corrKey" value="${k.key}"><span>${k.label}</span><em>${{ pass: "Pass", warn: "Warning", fail: "Fail" }[v] || "—"}</em></label>`; }).join("")}</div>
        <label class="field"><span>Comment to contractor</span><textarea rows="3" data-in="field" data-path="modal.comment">${esc(m.comment)}</textarea></label></div>
      <footer class="m-foot"><button class="btn ghost" data-a="closeModal">Cancel</button><span class="sp"></span><button class="btn warn${hl("corr-send")}" data-a="sendCorr" ${m.keys.length ? "" : "disabled"}>${ic("send", 15)} Send correction request</button></footer>`;
  }
  function hhModal(m) {
    const f = m.f;
    const fld = (k, l, type = "text", extra = "") => `<label class="field"><span>${l}</span><input type="${type}" value="${esc(f[k] || "")}" data-in="field" data-path="modal.f.${k}" ${extra}></label>`;
    const G = window.CoMap.usingGoogle(), geo = f.lat != null && f.lat !== "";
    const addr = G
      ? `<div class="field span2"><span>Address <small class="muted">· search with Google</small></span>${Pt.taBox("hhaddr", "address", { placeholder: "Start typing a Colorado street address…", value: U().ta.hhaddr || "" })}
          ${geo ? `<div class="geo-ok">${ic("map-pin", 14)} Location set · ${esc(f.county)} County · <span class="mono">${(+f.lat).toFixed(5)}, ${(+f.lng).toFixed(5)}</span></div>` : `<small class="muted">Pick an address so the household lands on the map in the right place.</small>`}</div>
         ${fld("street", "Street address")}${fld("city", "City")}`
      : `${fld("street", "Street address")}<label class="field"><span>City</span><select data-in="field" data-path="modal.f.city">${Object.keys(C.cities).map((c) => `<option ${f.city === c ? "selected" : ""}>${c}</option>`).join("")}</select></label>`;
    return `<header class="m-head"><div><h2>Add household</h2><p>Approved ${esc(C.program.lirmaFull)} household</p></div><button class="x" data-a="closeModal" aria-label="Close">${ic("x", 20)}</button></header>
      <div class="m-body"><div class="form-g">${fld("name", "Household surname")}${fld("phone", "Phone", "tel")}${addr}
        ${fld("zip", "ZIP code")}${fld("approved", "LIRMA approval date", "date")}${fld("pre", "Pre-mitigation reading (pCi/L)", "number", 'step="0.1"')}
        <label class="field"><span>Foundation type</span><select data-in="field" data-path="modal.f.foundation">${["Basement", "Slab-on-grade", "Crawlspace", "Combination"].map((x) => `<option ${f.foundation === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>
        ${fld("built", "Year built", "number")}${fld("occ", "Occupants", "number")}</div></div>
      <footer class="m-foot"><button class="btn ghost" data-a="closeModal">Cancel</button><span class="sp"></span><button class="btn primary" data-a="saveHh">${ic("plus", 15)} Add household</button></footer>`;
  }
  function ctrModal(m) {
    const f = m.f;
    const fld = (k, l, type = "text") => `<label class="field"><span>${l}</span><input type="${type}" value="${esc(f[k] || "")}" data-in="field" data-path="modal.f.${k}"></label>`;
    return `<header class="m-head"><div><h2>${m.edit ? "Edit contractor" : "Add contractor"}</h2><p>${m.edit ? f.name : "Approve a new contractor for the programme"}</p></div><button class="x" data-a="closeModal" aria-label="Close">${ic("x", 20)}</button></header>
      <div class="m-body"><div class="form-g">${fld("name", "Company name")}${fld("person", "Responsible person")}${fld("licence", "Colorado licence number")}
        <label class="field"><span>Certification body</span><select data-in="field" data-path="modal.f.body">${["NRPP", "NRSB"].map((x) => `<option ${f.body === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>
        ${fld("certNo", "Certification number")}${fld("certExp", "Certification expiry", "date")}${fld("carrier", "Insurance carrier")}${fld("insExp", "Insurance expiry", "date")}${fld("phone", "Phone", "tel")}${fld("email", "Email", "email")}</div>
        <div class="field"><span>Service counties <small class="muted">${f.counties.length} selected</small></span><div class="county-pick">${countyNames.map((c) => `<button class="${f.counties.includes(c) ? "on" : ""}" data-a="ctrCounty" data-arg="${c}">${c}</button>`).join("")}</div></div>
        <div class="field"><span>Team members</span>${f.team.map((t, i) => `<div class="team-row"><input placeholder="Name" value="${esc(t.name)}" data-in="field" data-path="modal.f.team.${i}.name"><input placeholder="Role" value="${esc(t.role)}" data-in="field" data-path="modal.f.team.${i}.role"><input placeholder="Licence number" value="${esc(t.licence)}" data-in="field" data-path="modal.f.team.${i}.licence"></div>`).join("")}<button class="btn ghost sm" data-a="addTeamRow">${ic("plus", 14)} Add team member</button></div>
        <label class="toggle"><input type="checkbox" ${f.invite ? "checked" : ""} data-in="field" data-path="modal.f.invite"><i></i><span><b>Send app invite</b><small>The contractor gets a RadonSketch login linked to the ${esc(C.program.lirma)} programme.</small></span></label></div>
      <footer class="m-foot"><button class="btn ghost" data-a="closeModal">Cancel</button><span class="sp"></span><button class="btn primary" data-a="saveCtr">${m.edit ? "Save changes" : `${ic("plus", 15)} Add contractor`}</button></footer>`;
  }

  /* =========================================================================
     ROUTER
     ========================================================================= */
  function page() {
    const r = U().route;
    switch (r.page) {
      case "dashboard": return dashboard();
      case "map": return mapPage();
      case "jobs": return jobsPage();
      case "households": return householdsPage();
      case "household": return householdPage(r.id);
      case "contractors": return contractorsPage();
      case "contractor": return contractorPage(r.id);
      case "reports": return reportsPage();
      case "report": return reportPage(r.id, r.v);
      case "notifications": return notificationsPage();
      case "settings": return settingsPage();
      default: return dashboard();
    }
  }
  window.PortalPages = { login, page, modal, recommend, attention };

  /* =========================================================================
     ACTIONS
     ========================================================================= */
  const R = () => Pt.render();
  const freshTable = (f = {}, special = null, sort, dir) => ({ q: "", sort: sort || null, dir: dir || "asc", page: 1, f, special });
  const A = {
    go(p) { U().route = { page: p }; U().modal = null; U().menu = null; if (p === "contractor") U().ctrTab = "details"; R(); },
    signIn() { U().route = { page: "dashboard" }; R(); Pt.toast(`Welcome back, ${C.signedInUser.name.split(" ")[0]}.`); },
    signOut() { U().route = { page: "login" }; U().menu = null; U().modal = null; R(); },
    help() { Pt.toast("Help centre and programme guidance would open here (sample)."); },
    userMenu() { U().menu = U().menu ? null : "user"; R(); },
    period(p) { U().period = p; R(); },
    customFrom(v) { U().custom.from = v; R(); },
    customTo(v) { U().custom.to = v; R(); },
    dashGo(arg) {
      const [pg, q] = arg.split("|");
      if (pg === "reports") { U().reportTab = q; U().route = { page: "reports" }; }
      else if (pg === "jobs") { const [k, v] = q.split("="); U().tables.jobs = k === "special" ? freshTable({}, v, "sched", "asc") : freshTable({ [k]: v }, null, "sched", "asc"); U().route = { page: "jobs" }; }
      else if (pg === "contractors") { const [, v] = q.split("="); U().tables.contractors = freshTable({}, v, "score", "asc"); U().route = { page: "contractors" }; }
      U().modal = null; R();
    },
    dashCounty(label) { const county = label.replace(" County", ""); const m = U().map; m.f = { ...m.f, county }; m.applied = { ...m.f }; m.viewTarget = "filters"; U().route = { page: "map" }; R(); },
    // tables
    tblSort(arg) { const [k, c] = arg.split("|"), t = U().tables[k]; if (t.sort === c) t.dir = t.dir === "asc" ? "desc" : "asc"; else { t.sort = c; t.dir = "asc"; } R(); },
    tblPage(arg) { const [k, n] = arg.split("|"); U().tables[k].page = +n; R(); },
    tblReset(k) { const t = U().tables[k]; t.f = {}; t.q = ""; t.page = 1; t.special = null; R(); },
    tblF(v, el) { const t = U().tables[el.dataset.key]; t.f[el.dataset.f] = v; t.page = 1; R(); },
    tblSpecialClear(k) { U().tables[k].special = null; R(); },
    // map
    mapLayer(l) { U().map.layer = l; U().map.viewTarget = "filters"; R(); },
    // Every filter applies as soon as it changes, and the map frames the result
    mapF(v, el) { const f = U().map.f; f[el.dataset.f] = v; if (el.dataset.f === "zip" && !v) f.radius = ""; A.mapSearch(true); },
    async mapSearch(auto) {
      const m = U().map, f = m.f;
      if (window.CoMap.usingGoogle()) {
        const typed = (U().ta.zip || "").trim();
        if (!typed) { f.zip = ""; f.zipGeo = null; f.radius = ""; }
        else if (typed !== f.zip || !f.zipGeo) {
          if (!/^\d{5}$/.test(typed)) {
            if (auto === true) { f.zip = m.applied.zip || ""; f.zipGeo = m.applied.zipGeo || null; } // half-typed ZIP: keep the last one
            else { Pt.toast("Enter a 5-digit Colorado ZIP code.", "warn"); return; }
          } else {
            try {
              const sug = await window.GMaps.suggest(typed, "zip");
              if (!sug.length) { Pt.toast(`ZIP ${typed} wasn't found in Colorado.`, "warn"); return; }
              const res = await window.GMaps.resolve(sug[0].pred);
              if (!res.inColorado) { Pt.toast(`ZIP ${typed} is outside Colorado.`, "warn"); return; }
              f.zip = res.zip || typed; f.zipGeo = { lat: res.lat, lng: res.lng, label: res.formatted }; U().ta.zip = f.zip;
            } catch (e) { Pt.toast(e.message, "warn"); return; }
          }
        }
      }
      if (!f.zip) f.radius = "";
      m.applied = { ...f }; m.viewTarget = "filters"; m.viewNonce = (m.viewNonce || 0) + 1;
      if (m.sel && m.sel.type !== "place") m.sel = null;
      R();
    },
    mapReset() { const m = U().map; m.f = { zip: "", radius: "", county: "", ctr: "", status: "", band: "", zipGeo: null }; m.applied = {}; m.sel = null; m.place = null; U().ta.zip = ""; U().ta.place = ""; m.viewTarget = "filters"; m.viewNonce = (m.viewNonce || 0) + 1; R(); },
    mapClearCounty() { const m = U().map; m.f.county = ""; m.applied.county = ""; m.viewTarget = "filters"; R(); },
    mapClose() { U().map.sel = null; R(); },
    mapClearPlace() { const m = U().map; m.place = null; if (m.sel && m.sel.type === "place") m.sel = null; U().ta.place = ""; m.viewTarget = "filters"; m.viewNonce = (m.viewNonce || 0) + 1; R(); },
    mapSelectHh(id) { U().map.sel = { type: "household", id }; R(); },
    taPick(arg) { const [k, i] = arg.split("|"); Pt.taPick(k, +i); },
    ta_place(res) {
      if (!res.inColorado) { Pt.toast(`${res.formatted || "That place"} is outside Colorado — the LIRMA programme covers Colorado only.`, "warn"); return; }
      const m = U().map; m.place = res; m.sel = { type: "place" }; U().ta.place = res.formatted; m.viewTarget = "place"; m.viewNonce = (m.viewNonce || 0) + 1; R();
    },
    taEnter_place() { Pt.toast("Pick an address from the list.", "warn"); },
    ta_zip(res) {
      if (!res.inColorado) { Pt.toast(`${res.formatted || "That ZIP"} is outside Colorado.`, "warn"); return; }
      const f = U().map.f; f.zip = res.zip || res.name; f.zipGeo = { lat: res.lat, lng: res.lng, label: res.formatted }; U().ta.zip = f.zip;
      A.mapSearch();
    },
    taEnter_zip() { A.mapSearch(); },
    addHhFromPlace() {
      const p = U().map.place; if (!p) return;
      A.openAddHh();
      Object.assign(U().modal.f, { street: p.street || p.name, city: p.city, zip: p.zip, county: p.county, lat: p.lat, lng: p.lng });
      U().ta.hhaddr = p.formatted; R();
    },
    ta_hhaddr(res) {
      if (!res.inColorado) { Pt.toast(`${res.formatted || "That address"} is outside Colorado — only Colorado households qualify.`, "warn"); return; }
      const m = U().modal; if (!m || m.type !== "hh") return;
      Object.assign(m.f, { street: res.street || res.name, city: res.city, zip: res.zip, county: res.county, lat: res.lat, lng: res.lng });
      U().ta.hhaddr = res.formatted; R();
    },
    gShow() { U().gkShow = !U().gkShow; R(); },
    gSave() {
      const G = window.GMaps, k = (U().gkeyDraft || "").trim();
      if (!k) { Pt.toast("Paste your API key first.", "warn"); return; }
      if (!G.looksValid(k)) { Pt.toast("That doesn't look like a Google Maps Platform API key — they start with “AIza”.", "warn"); return; }
      if (!G.saveKey(k)) { Pt.toast("This browser is blocking local storage, so the key can't be saved.", "warn"); return; }
      U().gkeyDraft = ""; U().gkShow = false;
      if (G.loaded()) { try { sessionStorage.setItem("lirma.resume", "settings"); } catch (e) {} location.reload(); return; }
      G.status = "off"; G.load(); R();
    },
    gRemove() {
      const G = window.GMaps; G.removeKey();
      if (G.loaded()) { try { sessionStorage.setItem("lirma.resume", "settings"); } catch (e) {} location.reload(); return; }
      G.status = "off"; G.reason = ""; Pt.resetMaps(); Pt.toast("Google Maps key removed from this browser.");
    },
    // navigation to records
    openJob(id) { U().modal = { type: "job", id, tab: "details", act: "all" }; U().noteDraft = ""; R(); },
    jobTab(t) { U().modal.tab = t; R(); },
    actFilter(v) { U().modal.act = v; R(); },
    replayTrack() { U().modal.trackNonce = (U().modal.trackNonce || 0) + 1; R(); },
    closeModal() { U().modal = null; R(); },
    modalBack() { U().modal = null; R(); },
    openHousehold(id) { U().route = { page: "household", id }; U().modal = null; R(); },
    openContractor(id) { U().route = { page: "contractor", id }; U().ctrTab = "details"; U().modal = null; U().noteDraft = ""; R(); },
    ctrTab(t) { U().ctrTab = t; R(); },
    metricsRange(r) { U().metricsRange = r; R(); },
    projToggle(v) { U().projToggle = v; R(); },
    calNav(arg) { const [k, d] = arg.split("|"), cal = U().cal[k]; if (+d === 0) { const p = Dt.parts(S().now); cal.y = p.y; cal.m = p.m; } else { cal.m += +d; if (cal.m < 1) { cal.m = 12; cal.y--; } if (cal.m > 12) { cal.m = 1; cal.y++; } } R(); },
    ctrStatus(v, el) { const c = Q.ctr(S(), el.dataset.id); c.status = v; R(); Pt.toast(`${c.name} is now ${v}.`); },
    // reports
    reportTab(t) { U().reportTab = t; R(); },
    openReport(arg) { const [id, v] = arg.split("|"); U().route = { page: "report", id, v: +v }; U().modal = null; R(); },
    pdf(id) { Pt.toast(`Report PDF for ${id} downloaded (sample file).`); },
    approve(id) {
      const s = S(), j = Q.job(s, id), c = ctrOf(j), before = scoreOf(c);
      Ops.approve(s, id, s.now);
      Ops.notify(s, { at: s.now, type: "approve", text: `Report approved for ${hhOf(j).name} (v${Q.latest(j).v})`, jobId: id, unread: false });
      if (U().modal && U().modal.type === "job") U().modal = null;
      if (U().route.page === "report") U().route.v = Q.latest(j).v;
      const after = scoreOf(c);
      Pt.toast(`Report approved — ${hhOf(j).name} is now Approved.${after !== before ? ` ${c.name} compliance ${before}% → ${after}%.` : ""}`);
    },
    openCorr(id) { const r = Q.latest(Q.job(S(), id)); U().modal = { type: "corr", jobId: id, keys: CHECKS.filter((k) => r.checks[k.key] !== "pass").map((k) => k.key), comment: "" }; R(); },
    corrKey(v, el) { const m = U().modal; m.keys = el.checked ? [...new Set([...m.keys, v])] : m.keys.filter((k) => k !== v); R(); },
    sendCorr() {
      const s = S(), m = U().modal, j = Q.job(s, m.jobId);
      Ops.requestCorrections(s, m.jobId, m.keys, m.comment, s.now);
      U().modal = null;
      Pt.toast(`Corrections requested — ${ctrOf(j).name} has been notified in RadonSketch.`, "warn");
    },
    // assign flow
    openAssign(arg) {
      const m = { type: "assign", step: 1, hh: null, ctr: null, q: "", date: Dt.addDays(today(), 7), priority: "Standard", instructions: "", professional: "" };
      if (arg && arg.startsWith("hh:")) { const id = arg.slice(3), j = Q.jobOfHh(S(), id); if (j.status === "unassigned") { m.hh = id; m.step = 2; } }
      if (arg && arg.startsWith("ctr:")) m.presetCtr = arg.slice(4);
      U().modal = m; R();
    },
    reassign(jobId) { const j = Q.job(S(), jobId); U().modal = { type: "assign", step: 2, hh: j.hh, ctr: null, reassign: jobId, date: j.sched ? Dt.date(j.sched) : Dt.addDays(today(), 7), priority: j.priority, instructions: j.instructions, professional: "" }; R(); },
    asHh(id) { const m = U().modal; m.hh = id; R(); },
    asCtr(id) { const m = U().modal; m.ctr = id; R(); },
    asNext() {
      const m = U().modal, s = S();
      if (m.step === 1 && m.presetCtr) m.ctr = m.presetCtr;
      if (m.step === 2) { const c = Q.ctr(s, m.ctr), j = Q.jobOfHh(s, m.hh); m.professional = m.professional || (c.team[1] || c.team[0]).name; if (!m.instructions) m.instructions = j.instructions || ""; }
      m.step++; R();
    },
    asBack() { U().modal.step--; R(); },
    asPriority(p) { U().modal.priority = p; R(); },
    asConfirm() {
      const s = S(), m = U().modal, j = m.reassign ? Q.job(s, m.reassign) : Q.jobOfHh(s, m.hh), c = Q.ctr(s, m.ctr);
      Ops.assign(s, j.id, m.ctr, { date: m.date, priority: m.priority, instructions: m.instructions, professional: m.professional, at: s.now });
      Ops.notify(s, { at: s.now, type: "assign", text: `${j.id} assigned to ${c.name} — ${Q.hh(s, j.hh).name}`, jobId: j.id, unread: false });
      m.success = j.id; R();
    },
    assignAnother() { A.openAssign(); },
    // notes
    addNote(arg) {
      const [kind, id] = arg.split("|"), text = (U().noteDraft || "").trim();
      if (!text) { Pt.toast("Write a note first.", "warn"); return; }
      const n = { by: C.signedInUser.name, at: S().now, text };
      (kind === "job" ? Q.job(S(), id).notes : Q.ctr(S(), id).notes).push(n);
      if (kind === "job") Ops.event(Q.job(S(), id), S().now, "programme", "note", "Internal note added", text.slice(0, 90));
      U().noteDraft = ""; Pt.toast("Note added.");
    },
    // households & contractors forms
    openAddHh() { U().modal = { type: "hh", f: { name: "", street: "", city: window.CoMap.usingGoogle() ? "" : "Denver", zip: "", phone: "", approved: today(), pre: "", foundation: "Basement", built: "", occ: "", lat: null, lng: null, county: "" } }; U().ta.hhaddr = ""; R(); },
    saveHh() {
      const f = U().modal.f;
      if (!f.name || !f.street) { Pt.toast("Enter a household surname and street address.", "warn"); return; }
      if (window.CoMap.usingGoogle() && (f.lat == null || f.lat === "")) { Pt.toast("Pick the address from the Google search list so the household has an exact location.", "warn"); return; }
      const h = Ops.addHousehold(S(), f);
      U().modal = null; U().route = { page: "household", id: h.id };
      Pt.toast(`${h.name} added and an unassigned job created.`);
    },
    openAddCtr() { U().modal = { type: "ctr", f: { name: "", person: "", licence: "", body: "NRPP", certNo: "", certExp: "", carrier: "", insExp: "", phone: "", email: "", counties: [], team: [{ name: "", role: "Licensed Mitigation Professional", licence: "" }, { name: "", role: "Installer", licence: "" }], invite: true } }; R(); },
    editCtr(id) { const c = Q.ctr(S(), id); U().modal = { type: "ctr", edit: id, f: { name: c.name, person: c.person, licence: c.licence, body: c.cert.body, certNo: c.cert.number, certExp: c.cert.expiry, carrier: c.insurance.carrier, insExp: c.insurance.expiry, phone: c.phone, email: c.email, counties: c.counties.slice(), team: c.team.map((t) => ({ ...t })), invite: false } }; R(); },
    ctrCounty(c) { const f = U().modal.f; f.counties = f.counties.includes(c) ? f.counties.filter((x) => x !== c) : [...f.counties, c]; R(); },
    addTeamRow() { U().modal.f.team.push({ name: "", role: "Installer", licence: "" }); R(); },
    saveCtr() {
      const s = S(), m = U().modal, f = m.f;
      if (!f.name) { Pt.toast("Enter a company name.", "warn"); return; }
      if (m.edit) {
        const c = Q.ctr(s, m.edit);
        Object.assign(c, { name: f.name, person: f.person, licence: f.licence, phone: f.phone, email: f.email, counties: f.counties, team: f.team.filter((t) => t.name) });
        c.cert = { ...c.cert, body: f.body, number: f.certNo, expiry: f.certExp || c.cert.expiry }; c.insurance = { carrier: f.carrier, expiry: f.insExp || c.insurance.expiry };
        U().modal = null; Pt.toast(`${c.name} updated.`); return;
      }
      const city = C.cities[Object.keys(C.cities).find((k) => f.counties.includes(C.cities[k].county)) || "Denver"];
      const id = `CTR-${String(s.contractors.length + 1).padStart(2, "0")}`;
      s.contractors.push({ id, name: f.name, status: "Pending", score: null, historyChecks: 0, histChecks: { passed: 0, total: 0 }, person: f.person || "—", licence: f.licence || "Pending", cert: { body: f.body, number: f.certNo || "Pending", expiry: f.certExp || "2027-12-31" }, insurance: { carrier: f.carrier || "Pending", expiry: f.insExp || "2027-12-31" }, licenceExpiry: "2027-12-31", base: { city: "Colorado", lat: city.lat, lng: city.lng, address: "—" }, counties: f.counties.length ? f.counties : ["Denver"], phone: f.phone || "—", email: f.email || "—", team: f.team.filter((t) => t.name).length ? f.team.filter((t) => t.name) : [{ name: f.person || "—", role: "Owner", licence: f.licence || "—" }], hist: { completed: 0, avgReduction: null, onTime: null }, firstJob: null, lastActivity: s.now, notes: [], trend: [], events: [] });
      U().modal = null; U().route = { page: "contractor", id }; U().ctrTab = "details";
      Pt.toast(`${f.name} added as Pending.${f.invite ? " RadonSketch app invite sent." : ""}`);
    },
    // notifications & settings
    openNotif(id) {
      const s = S(), n = s.notifications.find((x) => x.id === id); n.unread = false;
      const job = n.jobId ? Q.job(s, n.jobId) : n.job ? s.jobs.find((j) => hhOf(j).surname === n.job) : null;
      if (job) { U().modal = { type: "job", id: job.id, tab: n.type === "report" || n.type === "resubmit" ? "report" : "activity", act: "all" }; R(); return; }
      if (n.contractor) { U().route = { page: "contractor", id: n.contractor }; U().ctrTab = "credentials"; R(); return; }
      R();
    },
    markAllRead() { S().notifications.forEach((n) => (n.unread = false)); Pt.toast("All notifications marked as read."); },
    saveSettings() { Pt.toast("Programme details saved."); },
    thrGood(v) { C.thresholds.good = Math.min(+v || 70, C.thresholds.great - 1); R(); Pt.toast(`POOR band now below ${C.thresholds.good}%.`); },
    thrGreat(v) { C.thresholds.great = Math.max(+v || 90, C.thresholds.good + 1); R(); Pt.toast(`GREAT band now ${C.thresholds.great}% and above.`); },
    inviteUser() { Pt.toast("Invitation form would open here — roles: Program Coordinator, Reviewer/Inspector, Read-only."); },
  };
  window.PortalActions = A;
})();
