/* ===========================================================================
   Workflow prototype — portal (left) + RadonSketch app (right), 14 steps.
   Every step is rebuilt from the sample data, so Back / Next / Reset are
   deterministic and statuses, counters, pins and scores match on both sides.
   A step can have several timed "stages" (e.g. warning → fixed).
   =========================================================================== */
(function () {
  const C = window.CONFIG, { Dt, Q, Ops, CHECKS } = window.Store;
  const D = C.demo, JOB = D.jobId, HH = D.householdId, CTR = D.contractorId;
  const BEFORE_SCORE = C.contractors.find((c) => c.id === CTR).score;
  const COMMENT = "System label photo missing — please photograph the label on the riser (fan, date, contractor) and resubmit.";
  const checksWith = (fails) => { const o = {}; CHECKS.forEach((k) => (o[k.key] = fails.includes(k.key) ? "fail" : "pass")); return o; };
  const jobModal = (tab, hl) => ({ route: { page: "dashboard" }, modal: { type: "job", id: JOB, tab, act: "all" }, highlight: hl || [] });
  const ctrName = C.contractors.find((c) => c.id === CTR).name;
  const hhName = C.households.find((h) => h.id === HH).name + " Household";

  // keep the rest of the sample world plausible as the demo clock moves forward
  function advanceWorld(S) {
    if (Dt.date(S.now) <= C.today) return;
    S.jobs.forEach((j) => {
      if (j.id === JOB || Q.hh(S, j.hh).surname === "Whitcomb") return;
      if (j.status === "scheduled" && j.sched && Dt.ms(j.sched) < Dt.ms(S.now)) Ops.checkIn(S, j.id, Dt.addMin(j.sched, 6), 0.02);
      if (j.status === "inprogress" && j.checkIn && !j.checkOut && Dt.date(j.checkIn) < Dt.date(S.now)) Ops.checkOut(S, j.id, `${Dt.date(j.checkIn)} 15:10`);
    });
  }

  const STEPS = [
    { title: "Approved household waiting for a contractor", focus: "portal",
      caption: `The programme coordinator starts the day on the dashboard. “Approved households waiting to be assigned” shows ${hhName} in Pueblo is ready for a contractor.`,
      stages: [{ now: "2026-11-10 09:10", ui: () => ({ route: { page: "dashboard" }, highlight: ["attn-unassigned"] }), phone: { screen: "lock" } }] },
    { title: "Assign the job to the recommended contractor", focus: "portal",
      caption: `The coordinator assigns the job. ${ctrName} is recommended: ${BEFORE_SCORE}% compliance, in the service area and 2 miles away.`,
      stages: [
        { now: "2026-11-10 09:11", ui: () => ({ route: { page: "jobs" }, modal: { type: "assign", step: 2, hh: HH, ctr: CTR, date: "2026-11-17", priority: "Standard", instructions: D.instructions, professional: D.professional }, highlight: ["as-ctr-" + CTR] }), phone: { screen: "lock" } },
        { now: "2026-11-10 09:12", ui: () => ({ route: { page: "jobs" }, modal: { type: "assign", step: 3, hh: HH, ctr: CTR, date: "2026-11-17", priority: "Standard", instructions: D.instructions, professional: D.professional }, highlight: ["as-confirm"] }) },
      ] },
    { title: "The contractor is notified on their phone", focus: "both",
      caption: "As soon as the job is assigned, the contractor gets a push notification from RadonSketch.",
      stages: [{ now: "2026-11-10 09:13", mutate: (S) => Ops.assign(S, JOB, CTR, { date: "2026-11-17", priority: "Standard", instructions: D.instructions, professional: D.professional, at: "2026-11-10 09:12" }),
        ui: () => ({ route: { page: "jobs" }, modal: { type: "assign", step: 3, hh: HH, ctr: CTR, date: "2026-11-17", priority: "Standard", success: JOB } }), phone: { screen: "lock", notif: "assigned" } }] },
    { title: "Project created automatically — job accepted", focus: "both",
      caption: "The project is already in RadonSketch with the household's details from the programme. The contractor accepts, and the portal's activity log shows Assigned → Accepted.",
      stages: [
        { now: "2026-11-10 09:15", ui: () => jobModal("activity"), phone: { screen: "projects" } },
        { now: "2026-11-10 09:41", mutate: (S) => Ops.accept(S, JOB, "2026-11-10 09:41"), ui: () => jobModal("activity", ["activity"]), phone: { screen: "project" } },
      ] },
    { title: "The contractor schedules the visit", focus: "both",
      caption: "The contractor picks Thursday 12 November, 8 AM–12 PM. The visit appears on the contractor's Schedule calendar in the portal.",
      stages: [
        { now: "2026-11-10 09:43", ui: () => ({ route: { page: "contractor", id: CTR }, ctrTab: "schedule" }), phone: { screen: "schedule" } },
        { now: "2026-11-10 09:44", mutate: (S) => Ops.schedule(S, JOB, D.visitDate, "08:00–12:00", "2026-11-10 09:44"), ui: () => ({ route: { page: "contractor", id: CTR }, ctrTab: "schedule", highlight: ["cal-" + JOB] }), phone: { screen: "scheduled" } },
      ] },
    { title: "On site: contractor checks in", focus: "both",
      caption: "On the day, the contractor checks in. Contractor Tracking shows them arriving at the household, and the map pin turns In Progress.",
      stages: [
        { now: "2026-11-12 08:05", ui: () => ({ route: { page: "map" }, map: { layer: "both", f: {}, applied: {}, sel: { type: "household", id: HH } } }), phone: { screen: "checkin" } },
        { now: "2026-11-12 08:06", mutate: (S) => Ops.checkIn(S, JOB, "2026-11-12 08:06", 0.02), ui: () => jobModal("tracking"), phone: { screen: "checkin" } },
        { now: "2026-11-12 08:07", ui: () => ({ route: { page: "map" }, map: { layer: "both", f: {}, applied: {}, sel: { type: "household", id: HH } } }), phone: { screen: "checkin" } },
      ] },
    { title: "Diagnostic completed", focus: "both",
      caption: "The contractor records the diagnostic: six test points with sub-slab pressure readings. The portal's activity log updates straight away.",
      stages: [{ now: "2026-11-12 09:19", mutate: (S) => Ops.diagnostic(S, JOB, "2026-11-12 09:18"), ui: () => jobModal("activity", ["activity"]), phone: { screen: "diag" } }] },
    { title: "Radon Builder: compliance warning, then fixed", focus: "both",
      caption: `Live ${C.standard} checks flag the vent: 8 ft from a window, minimum 10 ft. The contractor moves it, the check turns green, and the portal's live compliance updates.`,
      stages: [
        { now: "2026-11-12 10:05", mutate: (S) => Ops.design(S, JOB, "2026-11-12 10:03", true), ui: () => jobModal("details", ["live"]), phone: { screen: "builder", fixed: false } },
        { now: "2026-11-12 10:12", mutate: (S) => Ops.resolveWarning(S, JOB, "2026-11-12 10:12"), ui: () => jobModal("details", ["live"]), phone: { screen: "builder", fixed: true } },
      ] },
    { title: "Installation photos uploaded", focus: "both",
      caption: "The contractor uploads the installation photos (7 of the 8 required; the system label photo was missed) and checks out. The post-mitigation test is due within the programme timeframe.",
      stages: [
        { now: "2026-11-12 13:49", mutate: (S) => Ops.photos(S, JOB, "2026-11-12 13:48", 7), ui: () => jobModal("activity", ["activity"]), phone: { screen: "photos" } },
        { now: "2026-11-12 14:06", mutate: (S) => Ops.checkOut(S, JOB, "2026-11-12 14:05"), ui: () => jobModal("activity", ["activity"]), phone: { screen: "photos" } },
      ] },
    { title: "Report generated and submitted", focus: "both",
      caption: "After the 48-hour post-mitigation test (1.6 pCi/L), RadonSketch generates the report. It syncs straight into Reports → Pending Review, marked “Synced from RadonSketch”.",
      stages: [
        { now: "2026-11-14 14:20", mutate: (S) => { const j = Q.job(S, JOB); j.post = D.post; Ops.event(j, "2026-11-14 14:15", "contractor", "activity", "Post-mitigation reading recorded", `${D.post} pCi/L after a 48-hour test (${Math.round((1 - D.post / Q.hh(S, HH).pre) * 100)}% reduction).`); }, ui: () => jobModal("details"), phone: { screen: "postreading" } },
        { now: "2026-11-14 16:18", ui: () => jobModal("details"), phone: { screen: "report" } },
        { now: "2026-11-14 16:20", mutate: (S) => Ops.submit(S, JOB, "2026-11-14 16:20", checksWith(["label"])), ui: () => ({ route: { page: "reports" }, reportTab: "pending", highlight: ["row-" + JOB, "nav-reports"] }), phone: { screen: "synced" } },
      ] },
    { title: "Reviewer requests corrections", focus: "portal",
      caption: "A reviewer opens the report: 9 of 10 checks passed. They request corrections for the missing system label photo, and the contractor is notified.",
      stages: [
        { now: "2026-11-16 09:12", ui: () => ({ route: { page: "report", id: JOB, v: 1 }, highlight: ["rv-sum"] }), phone: { screen: "projects" } },
        { now: "2026-11-16 09:14", ui: () => ({ route: { page: "report", id: JOB, v: 1 }, modal: { type: "corr", jobId: JOB, keys: ["label"], comment: COMMENT }, highlight: ["corr-send"] }), phone: { screen: "projects" } },
        { now: "2026-11-16 09:15", mutate: (S) => Ops.requestCorrections(S, JOB, ["label"], COMMENT, "2026-11-16 09:15", "Sam Whitfield"), ui: () => ({ route: { page: "report", id: JOB, v: 1 }, toasts: [{ text: `Corrections requested — ${ctrName} has been notified in RadonSketch.`, kind: "warn" }] }), phone: { screen: "projects" } },
      ] },
    { title: "Contractor fixes and resubmits (v2)", focus: "app",
      caption: "The contractor sees the correction request, adds the system label photo and resubmits. Version 2 syncs to the portal for review.",
      stages: [
        { now: "2026-11-16 09:16", ui: () => ({ route: { page: "report", id: JOB, v: 1 } }), phone: { screen: "lock", notif: "corrections" } },
        { now: "2026-11-16 10:58", ui: () => ({ route: { page: "report", id: JOB, v: 1 } }), phone: { screen: "corrections", labelAdded: true } },
        { now: "2026-11-16 11:02", mutate: (S) => Ops.submit(S, JOB, "2026-11-16 11:02", checksWith([])), ui: () => ({ route: { page: "reports" }, reportTab: "pending", highlight: ["row-" + JOB] }), phone: { screen: "synced" } },
      ] },
    { title: "Report approved — job Approved", focus: "portal",
      caption: "The reviewer checks v2 (10 of 10) and approves it. The job moves to Approved and its map pin turns green.",
      stages: [
        { now: "2026-11-16 14:28", ui: () => ({ route: { page: "report", id: JOB, v: 2 }, highlight: ["approve", "rv-sum"] }), phone: { screen: "synced" } },
        { now: "2026-11-16 14:30", mutate: (S) => Ops.approve(S, JOB, "2026-11-16 14:30", "Sam Whitfield"), ui: () => ({ route: { page: "map" }, map: { layer: "both", f: {}, applied: {}, sel: { type: "household", id: HH } }, toasts: [{ text: `Report approved — ${hhName} is now Approved.` }] }), phone: { screen: "lock", notif: "approved" } },
      ] },
    { title: "Dashboard and compliance score update", focus: "portal",
      caption: `Dashboard counters update automatically, and ${ctrName}'s compliance score rises from ${BEFORE_SCORE}% to 95% with the approved report.`,
      stages: [
        { now: "2026-11-16 14:35", ui: (S) => { const done = (X) => X.jobs.filter((j) => (j.status === "approved" || j.status === "closed") && j.approvedAt && j.approvedAt.startsWith("2026-11")).length; return { route: { page: "dashboard" }, highlight: ["kpi-completed", "avgred", "totals"], toasts: [{ text: `Dashboard updated — Completed this month ${done(window.Store.build())} → ${done(S)}; average reduction and programme totals refreshed.` }] }; }, phone: { screen: "projects" } },
        { now: "2026-11-16 14:36", ui: (S) => ({ route: { page: "contractor", id: CTR }, ctrTab: "details", highlight: ["ctr-gauge"], toasts: [{ text: `${ctrName} compliance score ${BEFORE_SCORE}% → ${Q.score(S, Q.ctr(S, CTR))}%.` }] }), phone: { screen: "projects" } },
      ] },
  ];

  /* ---------- engine ---------- */
  let cur = 0, stage = 0, lastPhone = null;
  const $ = (s) => document.querySelector(s);
  function stateAt(n, k) {
    const S = window.Store.build();
    for (let i = 0; i <= n; i++) {
      const last = i < n ? STEPS[i].stages.length - 1 : k;
      for (let j = 0; j <= last; j++) { const st = STEPS[i].stages[j]; S.now = st.now; advanceWorld(S); if (st.mutate) st.mutate(S); }
    }
    return S;
  }
  const inherit = (n, k, key) => { for (let j = k; j >= 0; j--) if (STEPS[n].stages[j][key] !== undefined) return STEPS[n].stages[j][key]; return undefined; };
  function pathOf(ui) {
    const r = ui.route || { page: "dashboard" };
    return { dashboard: "/dashboard", jobs: "/jobs", map: "/map", reports: "/reports", contractor: `/contractors/${r.id}`, report: `/reports/${r.id}/v${r.v}` }[r.page] || "/" + r.page;
  }
  function show(n, k) {
    cur = n; stage = k;
    const S = stateAt(n, k), step = STEPS[n];
    const ui = Object.assign({ highlight: [] }, inherit(n, k, "ui")(S));
    window.Portal.reset(S, ui);
    window.Portal.render();
    $("#url").innerHTML = `<b>${C.portal.url}</b>${pathOf(ui)}`;
    requestAnimationFrame(() => {
      const target = window.Portal.root.querySelector(".modal .hl") || window.Portal.root.querySelector(".hl");
      if (target && !target.closest(".sb")) {
        const id = "hl-scroll-" + Math.random().toString(36).slice(2, 7);
        target.setAttribute("data-scroll-target", id);
        window.Portal.scrollTo(`[data-scroll-target="${id}"]`, true);
      }
    });
    const ps = inherit(n, k, "phone");
    const sig = JSON.stringify(ps);
    $("#phone-screen").innerHTML = window.Phone.render(S, ps);
    if (sig === lastPhone) { const b = $("#phone-screen .pbody"); if (b) b.style.animation = "none"; }
    lastPhone = sig;
    $("#wf-portal").classList.toggle("dim", step.focus === "app");
    $("#wf-phone").classList.toggle("dim", step.focus === "portal");
    $("#wf-count").textContent = `Step ${n + 1} of ${STEPS.length}${step.stages.length > 1 ? ` · ${k + 1}/${step.stages.length}` : ""}`;
    $("#wf-title").textContent = step.title;
    $("#wf-text").textContent = step.caption;
    $("#wf-prev").disabled = n === 0 && k === 0;
    $("#wf-next").disabled = n === STEPS.length - 1 && k === step.stages.length - 1;
    const last = n === STEPS.length - 1 && k === step.stages.length - 1;
    $("#wf-next").innerHTML = last ? "Journey complete" : "Next step &rarr;";
    $("#wf-dots").innerHTML = STEPS.map((s, i) => `<button class="${i === n ? "on" : i < n ? "past" : ""}" data-step="${i}" title="${s.title}"></button>`).join("");
  }
  // Manual only: Next moves through each part of a step, then to the next step. Back reverses one part at a time.
  const next = () => { if (stage < STEPS[cur].stages.length - 1) show(cur, stage + 1); else if (cur < STEPS.length - 1) show(cur + 1, 0); };
  const prev = () => { if (stage > 0) show(cur, stage - 1); else if (cur > 0) show(cur - 1, STEPS[cur - 1].stages.length - 1); };

  function fit() { const s = Math.min(innerWidth / 1440, innerHeight / 900); $("#stage").style.transform = `translate(-50%, -50%) scale(${s})`; }
  window.addEventListener("resize", fit);
  document.addEventListener("DOMContentLoaded", () => {
    Object.entries(C.colors).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    $("#wf-disclaimer").textContent = C.disclaimer;
    $("#wf-sub").textContent = `${C.program.name} · ${C.portal.name} + RadonSketch app`;
    window.Portal.mount($("#portal"), { embedded: true, store: window.Store.build(), route: { page: "dashboard" } });
    $("#wf-next").addEventListener("click", next);
    $("#wf-prev").addEventListener("click", prev);
    $("#wf-reset").addEventListener("click", () => show(0, 0));
    $("#wf-dots").addEventListener("click", (e) => { const b = e.target.closest("[data-step]"); if (b) show(+b.dataset.step, 0); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    });
    fit();
    show(0, 0);
  });
  window.Workflow = { show, STEPS };
})();
