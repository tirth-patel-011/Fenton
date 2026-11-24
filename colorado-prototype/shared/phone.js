/* ===========================================================================
   RadonSketch mobile app screens (workflow prototype). Rendered from the same
   store as the portal so both sides always agree.
   ps = phone state: { screen, notif, ... }
   =========================================================================== */
(function () {
  const C = window.CONFIG, { Dt, Q, STATUS, CHECKS } = window.Store, { ic, esc, plan } = window.UI;

  const statusbar = (S) => {
    const p = Dt.parts(S.now), h = p.hh % 12 || 12;
    return `<div class="sbar"><span>${h}:${String(p.mm).padStart(2, "0")}</span><span class="sbar-ic">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.6 10.6 0 0 0 8 .4 10.6 10.6 0 0 0 .5 3.4l1.3 1.3A8.8 8.8 0 0 1 8 2.2zm0 3.6c1.4 0 2.7.6 3.7 1.5L13 6a7 7 0 0 0-10 0l1.3 1.3c1-1 2.3-1.5 3.7-1.5zm0 3.6c-.6 0-1.1.2-1.5.6L8 11.6l1.5-1.6c-.4-.4-.9-.6-1.5-.6z"/></svg>
      <svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor"/><rect x="23.5" y="4" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".45"/></svg></span></div>`;
  };
  const tabbar = () => `<nav class="tabbar"><span class="tab on">${ic("map", 22)}<span>My Projects</span></span><span class="tab"><span class="fab">${ic("plus", 24)}</span></span><span class="tab">${ic("user", 22)}<span>Profile</span></span></nav>`;
  const nav = (title) => `<div class="nav-h"><span class="nav-back">${ic("chev-left", 22)}</span><b>${title}</b></div>`;
  const appIcon = `<span class="app-ic" aria-label="RadonSketch app icon">RS</span>`;
  const kv = (rows) => `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>`;
  const lirmaStrip = () => `<div class="lirma-strip">${ic("shield", 16)}<span>LIRMA · ${esc(C.program.name)}</span></div>`;
  const seg = (on) => `<div class="seg-p">${["Diagnostic", "Radon Builder", "Report"].map((t) => `<span class="${t === on ? "on" : ""}">${t}</span>`).join("")}</div>`;
  const photoThumb = (i) => { const hue = [28, 205, 150, 45, 0, 190, 260, 110][i]; return `<span class="pl-th"><svg viewBox="0 0 52 40"><rect width="52" height="40" fill="hsl(${hue} 18% 78%)"/><rect y="27" width="52" height="13" fill="hsl(${hue} 14% 66%)"/><rect x="22" y="4" width="7" height="30" rx="2" fill="#f4f4f2"/><rect x="19" y="14" width="13" height="8" rx="2" fill="#3a3f46"/></svg></span>`; };

  const SCREENS = {
    lock(S, ps, d) {
      const p = Dt.parts(S.now), h = p.hh % 12 || 12;
      const N = {
        assigned: ["New LIRMA job assigned", `${d.hh.name}, ${d.hh.city}. Tap to view.`],
        corrections: ["Corrections requested", `${d.hh.name}: system label photo missing. Tap to fix and resubmit.`],
        approved: ["Report approved", `${d.hh.name} — ${C.program.name} approved report v${(Q.latest(d.job) || { v: 1 }).v}.`],
      }[ps.notif];
      return { theme: "lock", html: `<div class="lock"><div class="lock-date">${Dt.DAYS[Dt.dow(S.now)]}, ${Dt.month(p.m)} ${p.d}</div><div class="lock-time">${h}:${String(p.mm).padStart(2, "0")}</div>
        ${N ? `<div class="notif-card">${appIcon}<div style="flex:1"><div class="nc-h"><b>RadonSketch</b><span>now</span></div><div class="nc-t">${N[0]}</div><div class="nc-b">${esc(N[1])}</div></div></div>` : `<div class="lock-hint">No new notifications</div>`}</div>` };
    },
    projects(S, ps, d) {
      const st = d.job.status;
      const pill = { assigned: d.job.acceptedAt ? ["Accepted", ""] : ["New", "new"], scheduled: ["Scheduled", ""], inprogress: ["In progress", "warn"], submitted: ["In review", ""], corrections: ["Corrections", "warn"], approved: ["Approved", "ok"], closed: ["Closed", "ok"] }[st] || ["New", "new"];
      const lirma = st === "unassigned" ? "" : `<div class="proj tone-lirma"><div class="proj-card"><span class="lirma-badge">${ic("shield", 12)} LIRMA · ${esc(C.program.name)}</span>
          <div class="proj-top"><span class="proj-name">${d.hh.name}</span><span class="pill-grey ${pill[1]}">${pill[0]}</span></div>
          <div class="proj-tags"><span class="tag">USA</span><span class="tag">Residential</span><span class="tag">${d.hh.foundation}</span></div></div>
        <div class="proj-foot">${d.job.id} · ${d.hh.city}, CO</div></div>`;
      const mine = [["Ortega Residence", "Draft", "green", "Slab", "06 Nov, 2026 at 10:24 am"], ["Pine Ridge Duplex", "Submitted", "peach", "Crawlspace", "03 Nov, 2026 at 04:51 pm"], ["Hollow Creek Home", "Exported", "green", "Basement", "29 Oct, 2026 at 09:12 am"]];
      return { tab: true, html: `<div class="ph-h"><h1>My Projects</h1><div class="ph-h-act"><span class="cbtn">${ic("search", 20)}</span><span class="cbtn">${ic("filter", 20)}</span></div></div>
        <div class="pad">${lirma}${mine.map(([n, s, t, f, c]) => `<div class="proj tone-${t}"><div class="proj-card"><div class="proj-top"><span class="proj-name">${n}</span><span class="pill-grey">${s}</span></div><div class="proj-tags"><span class="tag">USA</span><span class="tag">Residential</span><span class="tag">${f}</span></div></div><div class="proj-foot">Created ${c}</div></div>`).join("")}</div>` };
    },
    project(S, ps, d) {
      const accepted = !!d.job.acceptedAt;
      return { theme: "white", html: `${nav("Project")}${lirmaStrip()}<div class="pad">
        <div class="st-line ${accepted ? "ok" : ""}">${ic(accepted ? "check-circle" : "bell", 16)} ${accepted ? `Accepted ${Dt.time(d.job.acceptedAt)} · programme notified` : `Assigned by ${esc(C.program.name)} · ${Dt.dt(d.job.assignedAt)}`}</div>
        <div class="p-card"><h3>${d.hh.name}</h3>${kv([["Address", `${d.hh.street}<br>${d.hh.city}, CO ${d.hh.zip}`], ["Phone", d.hh.phone], ["Occupants", d.hh.occ], ["Foundation", d.hh.foundation], ["Year built", d.hh.built], ["Pre-mitigation", `<b>${d.hh.pre.toFixed(1)} pCi/L</b>`]])}</div>
        <div class="p-card"><h3>Programme job</h3>${kv([["Job ID", d.job.id], ["Target date", d.job.targetDate ? Dt.short(d.job.targetDate) : "—"], ["Professional", d.job.professional], ["Funded", `$${d.job.funded.toLocaleString("en-US")}`]])}</div>
        <div class="p-card"><h3>Instructions</h3><p style="font-size:14px;line-height:1.5;color:#4A4038">${esc(d.job.instructions)}</p></div></div>`,
        foot: `<span class="p-btn ${accepted ? "done" : ""}">${accepted ? ic("check", 18) + " Accepted" : "Accept Job"}</span><span class="p-btn ${accepted ? "" : "sec"}">${ic("calendar", 18)} Schedule Visit</span>` };
    },
    schedule(S, ps, d) {
      const days = [10, 11, 12, 13, 14, 16, 17].map((n) => `2026-11-${n}`);
      return { theme: "white", html: `${nav("Schedule visit")}<div class="pad"><p style="font-size:14px;color:#5A5048;margin:2px 0 12px">${d.hh.name} · ${d.hh.city}</p>
        <div class="sec-l">November 2026</div>
        <div class="date-strip">${days.map((x) => `<span class="ds ${x === C.demo.visitDate ? "on" : ""}"><small>${Dt.DAYS[Dt.dow(x)].slice(0, 3)}</small><b>${+x.slice(8)}</b></span>`).join("")}</div>
        <div class="sec-l">Arrival window</div>
        <div class="slots">${["08:00–12:00", "10:00–14:00", "12:00–16:00", "13:00–17:00"].map((w, i) => `<span class="slot ${i === 0 ? "on" : i === 3 ? "off" : ""}">${Dt.hm(w.slice(0, 5))} – ${Dt.hm(w.slice(-5))}</span>`).join("")}</div>
        <div class="p-card" style="margin-top:14px">${kv([["Household", "Notified by text"], ["Programme", `${C.program.name} updated`], ["Timezone", C.timezone]])}</div></div>`,
        foot: `<span class="p-btn">Confirm visit · Thu 12 Nov</span>` };
    },
    scheduled(S, ps, d) {
      return { theme: "white", html: `<div class="big-ok"><span class="okc">${ic("check", 36)}</span><h2>Visit scheduled</h2><p><b>${Dt.long(d.job.sched)}</b><br>${Dt.hm(d.job.window.slice(0, 5))} – ${Dt.hm(d.job.window.slice(-5))}</p>
        <p>${d.hh.name} has been notified and the visit is on the ${esc(C.program.name)} schedule.</p></div><div class="pad">${lirmaStrip()}</div>`, foot: `<span class="p-btn sec">Back to project</span>` };
    },
    checkin(S, ps, d) {
      const inn = !!d.job.checkIn;
      return { theme: "white", html: `${nav("On site")}<div class="pad">
        <div class="loc-card"><div class="loc-map"><svg viewBox="0 0 360 180"><rect width="360" height="180" fill="#E9EDE4"/><path d="M0 120H360M150 0V180M0 40H360" stroke="#fff" stroke-width="14"/><path d="M260 0V180" stroke="#fff" stroke-width="9"/><rect x="168" y="58" width="74" height="46" rx="4" fill="#DCD6CC"/><circle cx="205" cy="81" r="36" fill="rgba(29,95,173,.12)"/>
          <path d="M205 82c0 0-11-12.5-11-21a11 11 0 1 1 22 0c0 8.5-11 21-11 21z" fill="#E08A00" stroke="#fff" stroke-width="2"/><circle cx="214" cy="96" r="8" fill="#1D5FAD" stroke="#fff" stroke-width="3"/></svg></div>
          <div class="loc-b"><b>${d.hh.street}</b>${d.hh.city}, CO ${d.hh.zip}<br><span style="color:#2E9E5B;font-weight:600">${ic("map-pin", 14)} You're at the household · 0.02 mi away</span></div></div>
        ${inn ? `<div class="st-line ok">${ic("check-circle", 16)} Checked in at ${Dt.time(d.job.checkIn)} — location shared with the programme while on site</div>` : `<div class="st-line">${ic("map-pin", 16)} Confirm your location to check in</div>`}
        <div class="p-card">${kv([["Job", d.job.id], ["Visit", `${Dt.wdm(d.job.sched)} · ${d.job.window}`], ["Professional", d.job.professional]])}</div></div>`,
        foot: inn ? `<span class="p-btn">${ic("grid", 18)} Start Diagnostic</span>` : `<span class="p-btn">${ic("map-pin", 18)} Check in</span>` };
    },
    diag(S, ps, d) {
      return { html: `${nav(d.hh.name)}${lirmaStrip()}${seg("Diagnostic")}<div class="pad"><div class="canvas">${plan({ mode: "diag" })}</div>
        <div class="readings-l">${window.UI.TPS.map((t) => `<div class="rdg"><span class="rdg-id">${t.id}</span><span>${t.room}</span><b>${t.p.toFixed(3).replace("-", "−")} in. WC</b></div>`).join("")}</div>
        <p style="font-size:12.5px;color:#8A7F75;margin-top:8px">Pre-mitigation reading ${d.hh.pre.toFixed(1)} pCi/L · 6 test points</p></div>`,
        foot: `<span class="p-btn done">${ic("check", 18)} Diagnostic complete</span>` };
    },
    builder(S, ps, d) {
      const fixed = ps.fixed;
      const live = CHECKS.map((k) => ({ ...k, v: k.key === "clearance" ? (fixed ? "pass" : "warn") : k.key === "label" || k.key === "posttest" ? "pending" : "pass" }));
      const order = live.slice().sort((a, b) => ({ warn: 0, pass: 1, pending: 2 }[a.v] - { warn: 0, pass: 1, pending: 2 }[b.v]));
      const n = (v) => live.filter((x) => x.v === v).length;
      return { html: `${nav(d.hh.name)}${lirmaStrip()}${seg("Radon Builder")}<div class="pad"><div class="canvas">${plan({ mode: "build", fixed })}</div>
        <div class="comp-p"><header><b>Compliance · ${C.standard}</b><div class="comp-sum"><span class="ok">${n("pass")} passed</span>${n("warn") ? `<span class="warn">${n("warn")} warning</span>` : ""}<span class="pend">${n("pending")} pending</span></div></header>
        ${order.slice(0, 5).map((k) => `<div class="ck ${k.v} ${fixed && k.key === "clearance" ? "fixed" : ""}"><span class="ck-i">${ic(k.v === "pass" ? "check" : k.v === "warn" ? "alert" : "clock", 14)}</span><span><b>${k.label}</b>
          ${k.key === "clearance" ? `<small>${fixed ? "Vent moved — 14 ft from nearest window" : "Vent termination 8 ft from window — minimum 10 ft"}</small>${fixed ? "" : `<br><span class="mv-btn">Move vent</span>`}` : ""}</span></div>`).join("")}</div></div>`,
        foot: `<span class="p-btn ${fixed ? "" : "sec"}">${fixed ? ic("check", 18) + " Design compliant" : "Resolve warning to continue"}</span>` };
    },
    photos(S, ps, d) {
      const added = ps.labelAdded;
      const rows = window.UI.PHOTOS.map(([k, cap], i) => (k === "label" && !added ? `<div class="pl-row miss"><span class="pl-th">${ic("camera", 18)}</span><span>${cap} — not captured</span>${ic("alert", 18, "")}</div>` : `<div class="pl-row ${k === "label" ? "new" : ""}">${photoThumb(i)}<span>${cap}</span><span class="okk">${ic("check-circle", 18)}</span></div>`));
      return { theme: "white", html: `${nav("Installation photos")}${lirmaStrip()}<div class="pad">
        <div class="st-line ${added ? "ok" : "warn"}">${ic(added ? "check-circle" : "alert", 16)} ${added ? "8 of 8 required photos" : "7 of 8 required photos — 1 missing"}</div>
        <div class="photo-list">${rows.join("")}</div>
        <div class="post-card"><b>Post-mitigation reading</b><div class="pc-row">${d.job.post != null ? `<b>${d.job.post.toFixed(1)}</b><small>pCi/L · 48-hour test</small>` : `<span style="color:#8A5A00;font-weight:600">${ic("clock", 15)} Due within programme timeframe</span>`}</div>
          <small>Optional now — required before the job can be closed.</small></div></div>`,
        foot: `<span class="p-btn">${ic("upload", 18)} ${added ? "Photos uploaded" : "Upload photos & check out"}</span>` };
    },
    postreading(S, ps, d) {
      return { theme: "white", html: `${nav("Post-mitigation reading")}${lirmaStrip()}<div class="pad">
        <div class="p-card"><h3>Short-term test</h3>${kv([["Device", "Continuous radon monitor"], ["Started", "12 Nov 2026, 2:10 PM"], ["Ended", "14 Nov 2026, 2:10 PM"], ["Duration", "48 hours"]])}</div>
        <div class="post-card"><b>Result</b><div class="pc-row"><b>${(d.job.post || C.demo.post).toFixed(1)}</b><small>pCi/L</small></div><small style="color:#2E9E5B;font-weight:600">${Math.round((1 - (d.job.post || C.demo.post) / d.hh.pre) * 100)}% reduction from ${d.hh.pre.toFixed(1)} pCi/L · below ${C.actionLevel} pCi/L</small></div></div>`,
        foot: `<span class="p-btn">${ic("file", 18)} Generate report</span>` };
    },
    report(S, ps, d) {
      const keys = CHECKS.map((k) => ({ ...k, f: k.key === "label" && !ps.labelAdded }));
      const passed = keys.filter((k) => !k.f).length;
      return { theme: "white", html: `${nav("Report preview")}${lirmaStrip()}<div class="pad"><div class="rep-prev">
        <div class="rp-h"><span>${esc(C.program.name)} · LIRMA report</span><span>v${ps.labelAdded ? 2 : 1}</span></div>
        <div class="rp-t">${d.hh.name}</div><div class="rp-s">${d.hh.street}, ${d.hh.city} · ${d.job.id}</div>
        <div class="rp-g"><div><span>Pre</span><b>${d.hh.pre.toFixed(1)}</b></div><div><span>Post</span><b>${(d.job.post || C.demo.post).toFixed(1)}</b></div><div><span>Reduction</span><b>${Math.round((1 - (d.job.post || C.demo.post) / d.hh.pre) * 100)}%</b></div></div>
        ${plan({ mode: "build", fixed: true, labels: false })}
        <b style="font-size:11px">Compliance · ${C.standard} — ${passed} of 10 passed</b>
        <div class="rp-c">${keys.map((k) => `<span><i class="${k.f ? "f" : ""}">${k.f ? "!" : "✓"}</i>${k.label.split("(")[0]}</span>`).join("")}</div></div></div>`,
        foot: `<span class="p-btn">${ic("send", 18)} Submit to ${esc(C.program.name)}</span>` };
    },
    syncing() { return { theme: "white", html: `<div class="big-ok" style="padding-top:150px"><span class="spin"></span><h2>Syncing report…</h2><p>Uploading report, photos and compliance checks to ${esc(C.program.name)}.</p></div>` }; },
    synced(S, ps, d) {
      const r = Q.latest(d.job), res = r ? Q.result(r) : { text: "" };
      return { theme: "white", html: `<div class="big-ok"><span class="okc">${ic("check", 36)}</span><h2>${r && r.v > 1 ? `Report resubmitted (v${r.v})` : `Submitted to ${esc(C.program.name)}`}</h2>
        <div class="sync-ok">${ic("sync", 16)} Synced · report v${r ? r.v : 1} · ${res.text}</div><p>Your report is in the programme's review queue. You'll be notified when it's reviewed.</p></div><div class="pad">${lirmaStrip()}</div>`, foot: `<span class="p-btn sec">Back to projects</span>` };
    },
    corrections(S, ps, d) {
      const r = Q.latest(d.job);
      return { theme: "white", html: `${nav("Corrections")}${lirmaStrip()}<div class="pad">
        <div class="corr-box"><b>${ic("alert", 15)} Corrections requested</b><p>${esc(r && r.comment ? r.comment : "System label photo missing.")}</p><small style="color:#8A7F75">${esc(C.program.name)} · ${r && r.reviewedAt ? Dt.dt(r.reviewedAt) : ""}</small></div>
        <div class="photo-list">${window.UI.PHOTOS.map(([k, cap], i) => (k === "label" ? (ps.labelAdded ? `<div class="pl-row new">${photoThumb(i)}<span>${cap} — added</span><span class="okk">${ic("check-circle", 18)}</span></div>` : `<div class="pl-row miss"><span class="pl-th">${ic("camera", 18)}</span><span>${cap} — required</span></div>`) : "")).join("")}
          ${window.UI.PHOTOS.filter(([k]) => k !== "label").slice(0, 3).map(([k, cap], i) => `<div class="pl-row">${photoThumb(i)}<span>${cap}</span><span class="okk">${ic("check-circle", 18)}</span></div>`).join("")}</div></div>`,
        foot: `<span class="p-btn ${ps.labelAdded ? "" : "sec"}">${ic("refresh", 18)} Resubmit report</span>` };
    },
  };

  function render(S, ps) {
    const D = C.demo, job = Q.job(S, D.jobId), hh = Q.hh(S, D.householdId);
    const scr = SCREENS[ps.screen](S, ps, { job, hh });
    return `<div class="ps th-${scr.theme || "cream"}">${statusbar(S)}<div class="pbody" data-k="${ps.screen}">${scr.html}</div>
      ${scr.foot ? `<div class="pfoot">${scr.foot}</div>` : ""}${scr.tab ? tabbar() : ""}<div class="home-ind"></div></div>`;
  }
  window.Phone = { render };
})();
