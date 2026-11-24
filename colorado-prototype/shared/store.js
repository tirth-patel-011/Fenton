/* ===========================================================================
   Store — turns CONFIG sample data into live records, and holds every
   operation that changes a job. Shared by the portal and the workflow demo so
   statuses, counters, pins and scores stay consistent everywhere.
   All times are America/Denver wall-clock strings: "YYYY-MM-DD HH:MM".
   =========================================================================== */
(function () {
  const C = window.CONFIG;
  const STATUS = {};
  C.statuses.forEach((s, i) => (STATUS[s.key] = { ...s, order: i }));
  const CHECKS = C.checks;

  /* ---------- dates ---------- */
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const Dt = {
    norm: (s) => (s || "").replace("T", " "),
    parts(s) { const [d, t = "00:00"] = Dt.norm(s).split(" "); const [y, m, dd] = d.split("-").map(Number); const [hh, mm] = t.split(":").map(Number); return { y, m, d: dd, hh, mm }; },
    ms(s) { const p = Dt.parts(s); return Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm); },
    fromMs(ms, withTime) { const iso = new Date(ms).toISOString(); return withTime ? iso.slice(0, 10) + " " + iso.slice(11, 16) : iso.slice(0, 10); },
    date: (s) => Dt.norm(s).slice(0, 10),
    addDays: (s, n) => Dt.fromMs(Dt.ms(Dt.date(s)) + n * 864e5),
    addMin: (s, n) => Dt.fromMs(Dt.ms(s) + n * 6e4, true),
    diffDays: (a, b) => Math.round((Dt.ms(Dt.date(b)) - Dt.ms(Dt.date(a))) / 864e5),
    diffMin: (a, b) => Math.round((Dt.ms(b) - Dt.ms(a)) / 6e4),
    dow: (s) => new Date(Dt.ms(Dt.date(s))).getUTCDay(),
    long(s) { const p = Dt.parts(s); return `${DAYS[Dt.dow(s)]}, ${p.d} ${MONTHS[p.m - 1]} ${p.y}`; },
    short(s) { if (!s) return "—"; const p = Dt.parts(s); return `${p.d} ${MONTHS[p.m - 1].slice(0, 3)} ${p.y}`; },
    dm(s) { const p = Dt.parts(s); return `${p.d} ${MONTHS[p.m - 1].slice(0, 3)}`; },
    wdm(s) { const p = Dt.parts(s); return `${DAYS[Dt.dow(s)].slice(0, 3)} ${p.d} ${MONTHS[p.m - 1].slice(0, 3)}`; },
    time(s) { if (!s) return "—"; const p = Dt.parts(s); const h = p.hh % 12 || 12; return `${h}:${String(p.mm).padStart(2, "0")} ${p.hh < 12 ? "AM" : "PM"}`; },
    hm: (t) => Dt.time("2000-01-01 " + t),
    dt(s) { return s ? `${Dt.short(s)}, ${Dt.time(s)}` : "—"; },
    month: (m) => MONTHS[m - 1], MONTHS, DAYS,
    rel(s, now) {
      const d = Dt.diffMin(s, now);
      if (d < 1) return "just now";
      if (d < 60) return `${d} min ago`;
      if (d < 60 * 24 && Dt.date(s) === Dt.date(now)) return `${Math.round(d / 60)} h ago`;
      const days = Dt.diffDays(s, now);
      if (days === 1) return "yesterday";
      if (days < 7) return `${days} days ago`;
      return Dt.short(s);
    },
  };

  /* ---------- helpers ---------- */
  function rng(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const miles = (a, b) => {
    const R = 3958.8, toR = Math.PI / 180, dLat = (b[0] - a[0]) * toR, dLng = (b[1] - a[1]) * toR;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  };
  const band = (score) => {
    if (score == null) return { key: "none", label: "No data" };
    if (score < C.thresholds.good) return { key: "poor", label: "POOR" };
    if (score < C.thresholds.great) return { key: "good", label: "GOOD" };
    return { key: "great", label: "GREAT" };
  };
  const OPEN = ["assigned", "scheduled", "inprogress", "submitted", "corrections"];
  const DONE = ["approved", "closed"];
  const FOUNDATION = { "basement": "Basement", "slab-on-grade": "Slab-on-grade", "crawlspace": "Crawlspace", "combination": "Combination" };

  /* ---------- build ---------- */
  function build() {
    const S = { now: `${C.today} ${C.nowTime}`, households: [], contractors: [], jobs: [], notifications: [], seq: 159, readNotes: {} };
    S.contractors = C.contractors.map((c) => ({ ...JSON.parse(JSON.stringify(c)), notes: (c.notes || []).map((n) => ({ ...n })), events: [] }));
    const sorted = C.households.slice().sort((a, b) => a.approved.localeCompare(b.approved) || a.id.localeCompare(b.id));
    sorted.forEach((h, i) => {
      const city = C.cities[h.city], r = rng(h.id);
      const hh = {
        id: h.id, name: `${h.name} Household`, surname: h.name, street: h.street, city: h.city, county: city.county, zip: h.zip,
        lat: +(city.lat + (r() - 0.5) * 0.07).toFixed(5), lng: +(city.lng + (r() - 0.5) * 0.09).toFixed(5),
        phone: `(${city.area}) 555-01${String(10 + i).padStart(2, "0")}`, approved: h.approved, pre: h.pre,
        foundation: FOUNDATION[h.foundation] || h.foundation, built: h.built, occ: h.occ, sump: h.foundation !== "slab-on-grade",
      };
      S.households.push(hh);
      S.jobs.push(makeJob(S, h, hh, h.job || `LIRMA-2026-${String(119 + i).padStart(4, "0")}`, r));
    });
    S.seq = 119 + sorted.length;
    // calibrate each contractor's earlier-check history so the computed score equals the target in CONFIG
    S.contractors.forEach((c) => {
      const t = sampleChecks(S, c.id);
      if (c.score == null) { c.histChecks = { passed: 0, total: 0 }; return; }
      const total = c.historyChecks;
      c.histChecks = { total, passed: Math.round((c.score / 100) * (total + t.total)) - t.passed };
    });
    S.notifications = C.notifications.map((n, i) => ({ ...n, id: "N" + i }));
    return S;
  }

  function makeJob(S, src, hh, id, r) {
    const st = src.status, ord = STATUS[st].order;
    const ctr = src.ctr ? C.contractors.find((c) => c.id === src.ctr) : null;
    const job = {
      id, hh: hh.id, ctr: src.ctr || null, status: st, demo: !!src.demo,
      createdAt: `${src.approved} 10:${String(5 + Math.floor(r() * 50)).padStart(2, "0")}`,
      assignedAt: null, acceptedAt: null, scheduledAt: null, sched: null, window: null, checkIn: null, checkOut: null,
      post: src.post == null ? null : src.post, priority: r() < 0.2 ? "High" : "Standard",
      funded: 1650 + Math.round(r() * 9) * 100, professional: null, photos: 0, live: {},
      instructions: ["Call household 30 minutes before arrival.", "Side gate access — code provided by occupant.", "Occupant has limited mobility; keep pathways clear.", "Please confirm the sump pit location on arrival.", "Spanish-speaking household — interpreter line available."][Math.floor(r() * 5)],
      reports: [], notes: [], events: [], approvedAt: null, closedAt: null,
    };
    if (src.demo) { job.instructions = C.demo.instructions; job.funded = C.demo.funded; }
    const ev = (at, actor, icon, title, desc) => job.events.push({ at, actor, icon, title, desc });
    ev(job.createdAt, "programme", "plus", "Job created", `Household approved for ${C.program.lirma} on ${Dt.short(src.approved)}; installation job opened.`);
    if (ord >= STATUS.assigned.order && ctr) {
      job.assignedAt = `${Dt.addDays(src.approved, 3)} 09:${String(10 + Math.floor(r() * 40)).padStart(2, "0")}`;
      const team = ctr.team;
      job.professional = (team[1] || team[0]).name;
      ev(job.assignedAt, "programme", "user-check", "Assigned to contractor", `Assigned to ${ctr.name} by ${r() < 0.6 ? "Jordan Reyes" : "Sam Whitfield"}.`);
      ev(Dt.addMin(job.assignedAt, 1), "system", "bell", "Contractor notified", `Push notification sent to ${ctr.name} in the RadonSketch app.`);
      ev(Dt.addMin(job.assignedAt, 1), "system", "phone", "Project created in RadonSketch app", `Project “${hh.name}” created with household details from the programme.`);
    }
    if (ord >= STATUS.scheduled.order) {
      job.acceptedAt = Dt.addMin(job.assignedAt, 95 + Math.floor(r() * 200));
      ev(job.acceptedAt, "contractor", "check-circle", "Job accepted", `${ctr.name} accepted the job.`);
      job.sched = src.sched;
      const t = src.sched.slice(11), endH = String(+t.slice(0, 2) + 4).padStart(2, "0");
      job.window = `${t}–${endH}:${t.slice(3)}`;
      job.scheduledAt = Dt.addMin(job.acceptedAt, 20);
      ev(job.scheduledAt, "contractor", "calendar", "Visit scheduled", `Visit booked for ${Dt.wdm(job.sched)}, ${Dt.hm(t)}–${Dt.hm(endH + ":" + t.slice(3))}.`);
    }
    if (ord >= STATUS.inprogress.order) {
      job.checkIn = src.checkedIn || Dt.addMin(job.sched, 4 + Math.floor(r() * 9));
      ev(job.checkIn, "contractor", "map-pin", "Contractor checked in", `${job.professional} checked in on site — 0.0${1 + Math.floor(r() * 4)} mi from the household.`);
      const diag = Dt.addMin(job.checkIn, 70);
      if (Dt.ms(diag) <= Dt.ms(S.now) || ord > STATUS.inprogress.order) {
        ev(diag, "contractor", "grid", "Diagnostic completed (6 test points)", "Sub-slab pressure field test recorded in RadonSketch.");
        ev(Dt.addMin(job.checkIn, 110), "contractor", "layers", "System design created", "Radon Builder design saved with live compliance checks.");
        CHECKS.forEach((c) => (job.live[c.key] = c.key === "posttest" || c.key === "label" ? "pending" : "pass"));
      }
      const done = src.installDone || (ord > STATUS.inprogress.order ? `${Dt.date(job.sched)} ${String(13 + Math.floor(r() * 3)).padStart(2, "0")}:${String(Math.floor(r() * 50) + 10)}` : null);
      if (done) {
        job.photos = (src.failKeys || []).includes("label") ? 7 : 8;
        ev(Dt.addMin(done, -15), "contractor", "camera", `Installation photos uploaded (${job.photos})`, job.photos < 8 ? "1 required photo not captured." : "All required photos captured.");
        job.checkOut = done;
        ev(done, "contractor", "log-out", "Contractor checked out", `Time on site ${fmtDur(Dt.diffMin(job.checkIn, done))}.`);
      }
    }
    if (ord >= STATUS.submitted.order) {
      const failKeys = src.failKeys || [];
      const v1At = src.submittedOn || `${Dt.addDays(job.sched, 6)} 15:${String(10 + Math.floor(r() * 40))}`;
      const finalChecks = genChecks(job, hh, ctr, r, DONE.includes(st) ? [] : null);
      if (st === "submitted" && !src.resubmittedOn) {
        job.reports.push(rep(1, v1At, src.failKeys ? withFails(finalChecks, failKeys) : finalChecks, "pending"));
      } else if (st === "submitted" && src.resubmittedOn) {
        job.reports.push(rep(1, v1At, withFails(finalChecks, failKeys), "corrections", src.correctionsOn, failKeys));
        job.reports.push(rep(2, src.resubmittedOn, allPass(finalChecks), "pending"));
      } else if (st === "corrections") {
        job.reports.push(rep(1, v1At, withFails(finalChecks, failKeys), "corrections", src.correctionsOn, failKeys));
      } else {
        const v = r() < 0.3 ? 2 : 1;
        if (v === 2) {
          job.reports.push(rep(1, v1At, withFails(finalChecks, ["label"]), "corrections", Dt.addMin(v1At, 60 * 40), ["label"]));
          job.reports.push(rep(2, Dt.addMin(v1At, 60 * 70), finalChecks, "approved", `${src.approvedOn} 14:20`));
        } else job.reports.push(rep(1, v1At, finalChecks, "approved", `${src.approvedOn} 14:20`));
        job.approvedAt = `${src.approvedOn} 14:20`;
      }
      job.reports.forEach((rp) => {
        ev(rp.at, "contractor", "upload", rp.v === 1 ? "Report generated and synced" : "Report resubmitted", `Report v${rp.v} synced from RadonSketch — ${result(rp).text}.`);
        if (rp.status === "corrections" || (rp.reviewedAt && rp.status === "corrections")) ev(rp.reviewedAt, "programme", "alert", "Corrections requested", `Reviewer requested: ${rp.failKeys.map(checkLabel).join("; ")}.`);
      });
      if (job.approvedAt) ev(job.approvedAt, "programme", "award", "Report approved", `Report v${job.reports[job.reports.length - 1].v} approved by ${r() < 0.5 ? "Sam Whitfield" : "Avery Lin"}.`);
      if (st === "closed") { job.closedAt = `${Dt.addDays(src.approvedOn, 9)} 10:00`; ev(job.closedAt, "programme", "archive", "Job closed", "Post-mitigation follow-up complete; job closed."); }
      Object.assign(job.live, job.reports[job.reports.length - 1].checks);
    }
    if (src.id === "HH-2026-0359") job.notes.push({ by: "Sam Whitfield", at: "2026-10-26 10:07", text: "Manometer photo shows no reading. Asked contractor to re-photograph with the fan running." });
    if (src.id === "HH-2026-0390") job.notes.push({ by: "Jordan Reyes", at: "2026-11-06 07:30", text: "Visit missed on 4 Nov — no check-in. Called Red Willow, left voicemail." });
    if (src.id === "HH-2026-0376") job.notes.push({ by: "Avery Lin", at: "2026-11-02 14:25", text: "Approved, but post-mitigation reading 4.6 pCi/L is above the action level. Long-term follow-up test requested." });
    job.bom = makeBom(hh, r);
    return job;
  }
  function rep(v, at, checks, status, reviewedAt, failKeys) {
    return { v, at, checks: { ...checks }, status, reviewedAt: reviewedAt || null, failKeys: failKeys || [], comment: failKeys && failKeys.length ? `Please address: ${failKeys.map(checkLabel).join("; ")}.` : "" };
  }
  function genChecks(job, hh, ctr, r, forcePass) {
    const out = {};
    const p = forcePass ? 0 : Math.max(0, (90 - (ctr.score || 80)) / 100);
    CHECKS.forEach((c) => {
      let s = "pass";
      if (c.key === "posttest") s = job.post != null ? "pass" : "warn";
      else if (r() < p) s = r() < 0.5 ? "fail" : "warn";
      out[c.key] = s;
    });
    if (forcePass && ctr.score < C.thresholds.good) out.label = "warn"; // accepted with a minor warning
    return out;
  }
  const withFails = (checks, keys) => { const o = { ...checks }; keys.forEach((k) => (o[k] = "fail")); return o; };
  const allPass = (checks) => { const o = { ...checks }; Object.keys(o).forEach((k) => (o[k] = "pass")); return o; };
  const checkLabel = (k) => (CHECKS.find((c) => c.key === k) || { label: k }).label;
  function result(report) {
    const vals = CHECKS.map((c) => report.checks[c.key]);
    const passed = vals.filter((v) => v === "pass").length;
    return { passed, total: CHECKS.length, warn: vals.filter((v) => v === "warn").length, fail: vals.filter((v) => v === "fail").length, text: `${passed} of ${CHECKS.length} checks passed` };
  }
  function makeBom(hh, r) {
    const items = [
      { item: "Inline radon fan (≈ 60 W)", qty: "1", cost: 289 },
      { item: '3" Schedule 40 PVC pipe', qty: `${22 + Math.floor(r() * 16)} ft`, cost: 52 + Math.round(r() * 24) },
      { item: '3" PVC elbows and fittings', qty: `${4 + Math.floor(r() * 3)}`, cost: 21 + Math.round(r() * 10) },
      { item: "U-tube manometer", qty: "1", cost: 18.5 },
      { item: "Polyurethane sealant", qty: `${2 + Math.floor(r() * 3)} tubes`, cost: 24 + Math.round(r() * 12) },
      { item: "System label set", qty: "1", cost: 9.5 },
      { item: "Exterior rain cap", qty: "1", cost: 12 },
    ];
    if (hh.sump) items.push({ item: "Sealed sump cover", qty: "1", cost: 89 });
    return { items, total: items.reduce((s, i) => s + i.cost, 0) };
  }
  function fmtDur(min) { const h = Math.floor(min / 60), m = min % 60; return h ? `${h} h ${m} min` : `${m} min`; }

  /* ---------- selectors ---------- */
  function sampleChecks(S, ctrId) {
    let passed = 0, total = 0;
    S.jobs.filter((j) => j.ctr === ctrId && DONE.includes(j.status)).forEach((j) => {
      const r = result(j.reports[j.reports.length - 1]); passed += r.passed; total += r.total;
    });
    return { passed, total };
  }
  const Q = {
    hh: (S, id) => S.households.find((h) => h.id === id),
    job: (S, id) => S.jobs.find((j) => j.id === id),
    jobOfHh: (S, hhId) => S.jobs.find((j) => j.hh === hhId),
    ctr: (S, id) => S.contractors.find((c) => c.id === id),
    jobsOf: (S, ctrId) => S.jobs.filter((j) => j.ctr === ctrId),
    score(S, c) {
      if (c.score == null && !c.histChecks.total) { const t = sampleChecks(S, c.id); if (!t.total) return null; return Math.round((t.passed / t.total) * 100); }
      const t = sampleChecks(S, c.id);
      return Math.round(((c.histChecks.passed + t.passed) / (c.histChecks.total + t.total)) * 100);
    },
    openJobs: (S, ctrId) => S.jobs.filter((j) => j.ctr === ctrId && OPEN.includes(j.status)),
    stats(S, c) {
      const js = Q.jobsOf(S, c.id);
      const done = js.filter((j) => DONE.includes(j.status));
      const red = done.filter((j) => j.post != null).map((j) => (1 - j.post / Q.hh(S, j.hh).pre) * 100);
      const avgRed = c.hist.avgReduction == null && !red.length ? null
        : Math.round(((c.hist.avgReduction || 0) * c.hist.completed + red.reduce((a, b) => a + b, 0)) / Math.max(1, c.hist.completed + red.length));
      const evs = js.flatMap((j) => j.events.filter((e) => e.actor === "contractor")).sort((a, b) => b.at.localeCompare(a.at));
      return {
        completed: c.hist.completed + done.length,
        inProgress: js.filter((j) => j.status === "inprogress").length,
        scheduled: js.filter((j) => j.status === "scheduled" || j.status === "assigned").length,
        corrections: js.filter((j) => j.status === "corrections").length,
        avgReduction: avgRed, onTime: c.hist.onTime,
        lastActivity: evs[0] ? evs[0].at : Dt.norm(c.lastActivity),
        open: js.filter((j) => OPEN.includes(j.status)).length,
      };
    },
    location(S, c) {
      const active = S.jobs.find((j) => j.ctr === c.id && j.status === "inprogress" && j.checkIn && !j.checkOut && Dt.date(j.checkIn) === Dt.date(S.now));
      if (active) { const h = Q.hh(S, active.hh); return { lat: h.lat + 0.0006, lng: h.lng + 0.0009, active: true, job: active }; }
      return { lat: c.base.lat, lng: c.base.lng, active: false };
    },
    latest: (job) => job.reports[job.reports.length - 1] || null,
    result, checkLabel,
    reduction(S, job) { const h = Q.hh(S, job.hh); return job.post == null ? null : Math.round((1 - job.post / h.pre) * 100); },
    credStatus(S, date) {
      const d = Dt.diffDays(S.now, date);
      if (d < 0) return { key: "expired", label: "Expired", days: d };
      if (d <= C.credentialWarnDays) return { key: "soon", label: "Expiring soon", days: d };
      return { key: "valid", label: "Valid", days: d };
    },
    credentials(S, c) {
      return [
        { kind: "Colorado radon mitigation licence", number: c.licence, expiry: c.licenceExpiry },
        { kind: `${c.cert.body} certification`, number: c.cert.number, expiry: c.cert.expiry },
        { kind: "Business liability insurance", number: c.insurance.carrier, expiry: c.insurance.expiry },
      ].map((x) => ({ ...x, st: Q.credStatus(S, x.expiry) }));
    },
    unread: (S) => S.notifications.filter((n) => n.unread).length,
  };

  /* ---------- operations (used by portal actions and the workflow demo) ---------- */
  const Ops = {
    event(job, at, actor, icon, title, desc) { job.events.push({ at, actor, icon, title, desc }); },
    notify(S, n) { S.notifications.unshift({ id: "N" + Math.random().toString(36).slice(2, 8), unread: true, ...n }); },
    newJobId(S) { const id = `LIRMA-2026-${String(S.seq).padStart(4, "0")}`; S.seq++; return id; },
    assign(S, jobId, ctrId, o = {}) {
      const job = Q.job(S, jobId), c = Q.ctr(S, ctrId), at = o.at || S.now, reassign = !!job.ctr && job.ctr !== ctrId;
      job.ctr = ctrId; job.status = "assigned"; job.assignedAt = at; job.acceptedAt = null; job.sched = null; job.window = null;
      job.professional = o.professional || (c.team[1] || c.team[0]).name;
      if (o.priority) job.priority = o.priority;
      if (o.instructions != null) job.instructions = o.instructions;
      job.targetDate = o.date || null;
      Ops.event(job, at, "programme", "user-check", reassign ? "Reassigned to contractor" : "Assigned to contractor", `Assigned to ${c.name} by ${C.signedInUser.name}.${o.date ? ` Target date ${Dt.short(o.date)}.` : ""}`);
      Ops.event(job, Dt.addMin(at, 0), "system", "bell", "Contractor notified", `Push notification sent to ${c.name} in the RadonSketch app.`);
      Ops.event(job, Dt.addMin(at, 0), "system", "phone", "Project created in RadonSketch app", `Project “${Q.hh(S, job.hh).name}” created with household details from the programme.`);
      return job;
    },
    accept(S, jobId, at) { const job = Q.job(S, jobId); job.acceptedAt = at; Ops.event(job, at, "contractor", "check-circle", "Job accepted", `${Q.ctr(S, job.ctr).name} accepted the job.`); },
    schedule(S, jobId, date, window, at) {
      const job = Q.job(S, jobId); job.status = "scheduled"; job.sched = `${date} ${window.slice(0, 5)}`; job.window = window; job.scheduledAt = at;
      Ops.event(job, at, "contractor", "calendar", "Visit scheduled", `Visit booked for ${Dt.wdm(date)}, ${Dt.hm(window.slice(0, 5))}–${Dt.hm(window.slice(-5))}.`);
    },
    checkIn(S, jobId, at, distMi) {
      const job = Q.job(S, jobId); job.status = "inprogress"; job.checkIn = at; job.checkInDist = distMi;
      Ops.event(job, at, "contractor", "map-pin", "Contractor checked in", `${job.professional} checked in on site — ${distMi} mi from the household.`);
    },
    diagnostic(S, jobId, at) { Ops.event(Q.job(S, jobId), at, "contractor", "grid", "Diagnostic completed (6 test points)", "Sub-slab pressure field test recorded in RadonSketch."); },
    design(S, jobId, at, warn) {
      const job = Q.job(S, jobId);
      CHECKS.forEach((c) => (job.live[c.key] = c.key === "posttest" || c.key === "label" ? "pending" : "pass"));
      Ops.event(job, at, "contractor", "layers", "System design created", "Radon Builder design saved — live compliance checks running.");
      if (warn) { job.live.clearance = "warn"; Ops.event(job, Dt.addMin(at, 2), "system", "alert", "Compliance warning: vent clearance", "Vent termination 8 ft from window — minimum 10 ft (ANSI/AARST SGM-SF-2023)."); }
    },
    resolveWarning(S, jobId, at) { const job = Q.job(S, jobId); job.live.clearance = "pass"; Ops.event(job, at, "contractor", "check-circle", "Warning resolved", "Vent moved — termination now 14 ft from the nearest window."); },
    photos(S, jobId, at, n) { const job = Q.job(S, jobId); job.photos = n; Ops.event(job, at, "contractor", "camera", `Installation photos uploaded (${n})`, n < 8 ? "System label photo not captured." : "All required photos captured."); },
    checkOut(S, jobId, at) { const job = Q.job(S, jobId); job.checkOut = at; Ops.event(job, at, "contractor", "log-out", "Contractor checked out", `Time on site ${fmtDur(Dt.diffMin(job.checkIn, at))}.`); },
    submit(S, jobId, at, checks) {
      const job = Q.job(S, jobId), v = job.reports.length + 1;
      const r = rep(v, at, checks, "pending");
      job.reports.push(r); job.status = "submitted"; Object.assign(job.live, checks);
      Ops.event(job, at, "contractor", "upload", v === 1 ? "Report generated and synced" : "Report resubmitted", `Report v${v} synced from RadonSketch — ${result(r).text}.`);
      Ops.notify(S, { at, type: v === 1 ? "report" : "resubmit", text: v === 1 ? `Report submitted for ${Q.hh(S, job.hh).name} (v1) — synced from RadonSketch` : `Corrections resubmitted for ${Q.hh(S, job.hh).name} (v${v})`, jobId });
      return r;
    },
    requestCorrections(S, jobId, keys, comment, at, by) {
      const job = Q.job(S, jobId), r = Q.latest(job);
      r.status = "corrections"; r.reviewedAt = at; r.failKeys = keys.slice(); r.comment = comment;
      job.status = "corrections";
      Ops.event(job, at, "programme", "alert", "Corrections requested", `${by || C.signedInUser.name} requested: ${keys.map(checkLabel).join("; ")}.${comment ? ` “${comment}”` : ""}`);
      Ops.event(job, Dt.addMin(at, 0), "system", "bell", "Contractor notified", "Correction request sent to the RadonSketch app.");
    },
    approve(S, jobId, at, by) {
      const job = Q.job(S, jobId), r = Q.latest(job);
      r.status = "approved"; r.reviewedAt = at; job.status = "approved"; job.approvedAt = at;
      Ops.event(job, at, "programme", "award", "Report approved", `Report v${r.v} approved by ${by || C.signedInUser.name}.`);
    },
    close(S, jobId, at) { const job = Q.job(S, jobId); job.status = "closed"; job.closedAt = at; Ops.event(job, at, "programme", "archive", "Job closed", "Job closed by the programme."); },
    addHousehold(S, f) {
      const city = C.cities[f.city], r = rng(f.name + f.street);
      const id = `HH-2026-${String(418 + S.households.length - 40).padStart(4, "0")}`;
      const hh = { id, name: `${f.name} Household`, surname: f.name, street: f.street, city: f.city, county: city.county, zip: f.zip || "", lat: +(city.lat + (r() - 0.5) * 0.05).toFixed(5), lng: +(city.lng + (r() - 0.5) * 0.06).toFixed(5), phone: f.phone || `(${city.area}) 555-0198`, approved: f.approved || Dt.date(S.now), pre: +f.pre || 6.0, foundation: f.foundation || "Basement", built: +f.built || 1970, occ: +f.occ || 2, sump: f.foundation !== "Slab-on-grade" };
      S.households.push(hh);
      const job = { id: Ops.newJobId(S), hh: id, ctr: null, status: "unassigned", createdAt: S.now, reports: [], notes: [], events: [], live: {}, photos: 0, post: null, funded: 1950, priority: "Standard", instructions: "", bom: makeBom(hh, r) };
      Ops.event(job, S.now, "programme", "plus", "Job created", `Household approved for ${C.program.lirma}; installation job opened.`);
      S.jobs.push(job);
      return hh;
    },
  };

  window.Store = { build, Dt, Q, Ops, STATUS, CHECKS, OPEN, DONE, band, miles, rng, fmtDur };
})();
