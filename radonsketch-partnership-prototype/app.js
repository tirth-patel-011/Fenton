"use strict";
/* ===========================================================================
   RadonSketch × Partner — Partnership Prototype (design prototype, no backend)

   ✏️  EDIT BEFORE THE MEETING
   Everything a presenter may want to change — partner name, accent colour,
   course titles, prices, credit hours, readings, learners — is in CONFIG.
   Save the file and refresh the browser. Nothing else needs to change.
   =========================================================================== */
const CONFIG = {
  partner: {
    name: "KSU Radon Courses",
    accent: "#512888", // partner accent colour → sets CSS variable --partner-accent
    portalDomain: "learn.ksuradoncourses.example",
    portalPath: "/my-learning/radon-mitigation-entry/lesson-3",
  },
  app: { name: "RadonSketch" },

  courseCode: "KSU-4821",
  submittedAt: "today, 3:42 PM",
  uploadedAt: "today, 3:58 PM",
  reportDate: "06 Nov 2026",

  learner: {
    name: "Jordan Miller",
    initials: "JM",
    email: "jordan.miller@prairieradon.example",
    company: "Prairie Radon Services",
    card: "Visa •••• 4242",
    cardExp: "08/28",
  },
  instructor: {
    name: "Dr. Maya Hollis",
    initials: "MH",
    title: "Lead Instructor · Radon Mitigation",
    bio: "NRPP-certified mitigation specialist with 18 years of field experience across residential and multifamily projects.",
    feedback: "Nice work relocating the exhaust — clean suction-point placement and a well-documented report. Approved.",
  },

  featuredCourseId: "mit-entry", // the course used in both flows
  categories: ["Measurement", "Mitigation", "Continuing Education", "Exam Prep"],

  courses: [
    {
      id: "mit-entry",
      title: "Radon Mitigation — Entry Level (Sample)",
      category: "Mitigation",
      hours: 16,
      format: "Self-paced",
      access: "90-day access",
      price: 395,
      nrpp: true,
      practice: true,
      rating: 4.8,
      learners: "1,240",
      summary: "Design and install active soil depressurization systems that meet ANSI/AARST standards.",
      overview:
        "The entry-level course for new mitigation professionals. Covers diagnostics, system design, fan selection, sealing and post-mitigation testing — and ends with a hands-on Practice Lab where you design a real system in RadonSketch.",
      learn: [
        "Read diagnostic data and plan suction points",
        "Size pipe and select fans for sub-slab systems",
        "Apply ANSI/AARST SGM-SF installation requirements",
        "Document a compliant design in a professional report",
      ],
      lessons: [
        { id: "l1", type: "video", title: "Radon fundamentals, diagnostics & system design", duration: "6 h 20 min · 14 videos" },
        { id: "l2", type: "quiz", title: "Knowledge check: Diagnostics & standards", duration: "20 questions" },
        { id: "l3", type: "lab", title: "Practice Lab: Design a mitigation system in RadonSketch", duration: "≈ 45 min · instructor-graded" },
        { id: "l4", type: "exam", title: "Final exam", duration: "50 questions · 70% to pass" },
      ],
    },
    {
      id: "meas-entry",
      title: "Radon Measurement — Entry Level",
      category: "Measurement",
      hours: 16, format: "Self-paced", access: "90-day access", price: 349, nrpp: true, practice: true,
      rating: 4.7, learners: "2,015",
      summary: "Measurement protocols, device placement and QA for residential testing.",
      overview: "Learn how radon enters buildings, how to choose and place measurement devices, and how to report results to clients — then practise planning test locations in RadonSketch.",
      learn: ["Choose the right device and test duration", "Place devices to protocol", "Run QA: duplicates, blanks, spikes", "Report results clearly to homeowners"],
      lessons: [
        { id: "m1", type: "video", title: "Radon science & measurement devices", duration: "5 h 10 min · 12 videos" },
        { id: "m2", type: "quiz", title: "Knowledge check: Measurement protocols", duration: "20 questions" },
        { id: "m3", type: "lab", title: "Practice Lab: Plan test locations in RadonSketch", duration: "≈ 30 min" },
        { id: "m4", type: "exam", title: "Final exam", duration: "50 questions" },
      ],
    },
    {
      id: "ssd-design",
      title: "Sub-Slab Depressurization Design Workshop",
      category: "Mitigation",
      hours: 8, format: "Self-paced", access: "60-day access", price: 159, nrpp: true, practice: true,
      rating: 4.9, learners: "684",
      summary: "Multi-suction-point design, fan curves and pressure field analysis.",
      overview: "A design-focused workshop for working mitigators: interpret PFE data, compare fan curves, and design multi-point systems.",
      learn: ["Interpret pressure field extension data", "Read fan curves", "Design multi-point systems", "Avoid common design failures"],
      lessons: [
        { id: "d1", type: "video", title: "System design principles", duration: "3 h 30 min · 8 videos" },
        { id: "d2", type: "lab", title: "Practice Lab: Multi-point design in RadonSketch", duration: "≈ 60 min" },
        { id: "d3", type: "exam", title: "Workshop assessment", duration: "25 questions" },
      ],
    },
    {
      id: "std-update",
      title: "ANSI/AARST Standards Update for Mitigators",
      category: "Continuing Education",
      hours: 4, format: "Self-paced", access: "30-day access", price: 85, nrpp: true, practice: false,
      rating: 4.6, learners: "1,872",
      summary: "What changed in the latest standards and how it affects your installs.",
      overview: "A focused CE update on recent ANSI/AARST changes for soil-gas mitigation, with field examples.",
      learn: ["Key changes in SGM-SF", "Exhaust & labelling requirements", "Documentation expectations"],
      lessons: [
        { id: "s1", type: "video", title: "What changed and why", duration: "2 h 45 min · 6 videos" },
        { id: "s2", type: "quiz", title: "Standards check", duration: "15 questions" },
        { id: "s3", type: "exam", title: "Assessment", duration: "20 questions" },
      ],
    },
    {
      id: "water",
      title: "Radon in Water Standards Update",
      category: "Continuing Education",
      hours: 4, format: "Self-paced", access: "30-day access", price: 80, nrpp: true, practice: false,
      rating: 4.5, learners: "906",
      summary: "Sampling methodology and water mitigation systems, with operating costs.",
      overview: "Measurement and mitigation of radon in water, sampling methodology in detail, and a comparison of mitigation systems, operating costs and collection efficiency.",
      learn: ["Water sampling methodology", "Aeration vs. GAC systems", "Operating costs & efficiency"],
      lessons: [
        { id: "w1", type: "video", title: "Sampling methodology", duration: "1 h 50 min" },
        { id: "w2", type: "video", title: "Mitigation systems & operating costs", duration: "1 h 20 min" },
        { id: "w3", type: "exam", title: "Assessment", duration: "20 questions" },
      ],
    },
    {
      id: "crawl",
      title: "Crawlspace & Multi-Foundation Mitigation",
      category: "Mitigation",
      hours: 8, format: "Self-paced", access: "60-day access", price: 159, nrpp: true, practice: true,
      rating: 4.7, learners: "512",
      summary: "Membrane systems, crawlspace depressurization and mixed foundations.",
      overview: "Design and install sub-membrane systems and handle homes with mixed slab, basement and crawlspace foundations.",
      learn: ["Membrane selection & sealing", "Crawlspace depressurization", "Mixed-foundation strategy"],
      lessons: [
        { id: "c1", type: "video", title: "Crawlspace systems", duration: "3 h 15 min" },
        { id: "c2", type: "lab", title: "Practice Lab: Crawlspace membrane design", duration: "≈ 40 min" },
        { id: "c3", type: "exam", title: "Assessment", duration: "25 questions" },
      ],
    },
    {
      id: "exam-prep",
      title: "NRPP Mitigation Exam Prep",
      category: "Exam Prep",
      hours: 6, format: "Self-paced", access: "60-day access", price: 129, nrpp: false, practice: false,
      rating: 4.8, learners: "1,390",
      summary: "Practice tests and exam strategy for the NRPP mitigation exam.",
      overview: "Two full practice tests with explanations plus a strategy session on the exam blueprint.",
      learn: ["Exam blueprint", "Timed practice", "Review weak areas"],
      lessons: [
        { id: "e1", type: "video", title: "Exam blueprint & strategy", duration: "1 h 10 min" },
        { id: "e2", type: "quiz", title: "Practice test 1", duration: "60 questions" },
        { id: "e3", type: "quiz", title: "Practice test 2", duration: "60 questions" },
      ],
    },
  ],

  quiz: {
    progress: "Question 4 of 20",
    question: "Where must the exhaust of an active soil depressurization system discharge?",
    options: [
      "Through the rim joist, just above grade",
      "Above the roof edge, ≥ 10 ft above ground and ≥ 10 ft from openings less than 2 ft below it",
      "Into the attic, away from living space",
      "Anywhere at least 3 ft from a window",
    ],
    correct: 1,
    explain:
      "The standard keeps exhaust well away from openings so radon can't re-enter the building. You'll apply this rule in the Practice Lab.",
    score: "18 / 20",
  },

  clientProjects: [
    { name: "Hendricks Residence", status: "Draft", tags: ["USA", "Residential", "Slab"], tone: "green", created: "04 Nov, 2026 at 10:24 am" },
    { name: "Maple Grove Duplex", status: "Submitted", tags: ["USA", "Commercial", "Crawlspace"], tone: "peach", created: "02 Nov, 2026 at 04:51 pm" },
    { name: "Okafor Family Home", status: "Exported", tags: ["Canada", "Residential", "Basement"], tone: "green", created: "29 Oct, 2026 at 09:12 am" },
    { name: "Lakeside Bungalow", status: "Draft", tags: ["USA", "Residential", "Slab"], tone: "peach", created: "27 Oct, 2026 at 02:37 pm" },
  ],

  practiceProject: {
    name: "Prairie View Basement",
    address: "Sample home · Manhattan, KS",
    tags: ["USA", "Residential", "Basement"],
    task:
      "A homeowner's 48-hour test shows up to 9.4 pCi/L in a finished basement (EPA action level: 4.0 pCi/L). Using the diagnostic readings already on the plan, design an active soil depressurization system that meets ANSI/AARST SGM-SF, resolve any compliance warnings, and submit your report.",
    practise: [
      "Interpreting test-point readings and sub-slab PFE data",
      "Placing a suction point, routing pipe and positioning the fan",
      "Resolving live ANSI/AARST compliance warnings",
    ],
    testPoints: [
      { id: "TP1", room: "Family room", x: 110, y: 100, value: 8.6 },
      { id: "TP2", room: "Bedroom", x: 268, y: 92, value: 7.9 },
      { id: "TP3", room: "Storage", x: 66, y: 226, value: 9.4 },
    ],
    testHoles: [
      { id: "TH1", room: "Family room", x: 175, y: 60, value: -0.021 },
      { id: "TH2", room: "Storage", x: 98, y: 254, value: -0.009 },
      { id: "TH3", room: "Bath", x: 165, y: 236, value: -0.012 },
      { id: "TH4", room: "Utility", x: 248, y: 214, value: -0.034 },
    ],
  },

  // 9 checks: 7 pass, 1 warning the learner fixes, 1 pending field verification → "8 of 9 passed"
  compliance: [
    { id: "sp", label: "Suction point location", detail: "Utility room · strongest PFE (−0.034 in. WC)", status: "pass" },
    { id: "pipe", label: "Pipe size & material", detail: '3" Sch 40 PVC', status: "pass" },
    { id: "slope", label: "Pipe slope to suction point", detail: "≥ 1/8 in per ft", status: "pass" },
    { id: "fan", label: "Fan outside conditioned space", detail: "Exterior wall, east side", status: "pass" },
    {
      id: "exhaust", label: "Exhaust ≥ 10 ft from openings", status: "warn",
      detail: "Exhaust is 6.5 ft from the bedroom window",
      fixedDetail: "Relocated above eave · 23 ft from nearest opening",
    },
    { id: "seal", label: "Sump & slab cracks sealed", detail: "Sealed sump lid + 3 crack seals", status: "pass" },
    { id: "mon", label: "System monitor installed", detail: "U-tube manometer at riser", status: "pass" },
    { id: "label", label: "System labelling", detail: "Labels on riser, fan & panel", status: "pass" },
    { id: "post", label: "Post-mitigation test", detail: "Verified in the field after install", status: "pending" },
  ],

  bom: [
    { item: '3" Sch 40 PVC pipe', qty: "28 ft", cost: 64.4 },
    { item: 'Inline radon fan, 3" (≈ 60 W)', qty: "1", cost: 289.0 },
    { item: '3" PVC elbows, 90°', qty: "4", cost: 14.8 },
    { item: 'Rubber fan couplings, 3"', qty: "2", cost: 23.0 },
    { item: "U-tube manometer", qty: "1", cost: 18.5 },
    { item: "Sealed sump cover", qty: "1", cost: 89.0 },
    { item: "Polyurethane sealant", qty: "3", cost: 26.85 },
    { item: "Exterior rain cap", qty: "1", cost: 12.0 },
    { item: "System label set", qty: "1", cost: 9.5 },
  ],

  // Instructor review queue (Flow B · Instructor view). "r1" is always the demo learner.
  reviewQueue: [
    { id: "r1", name: "Jordan Miller", when: "Today, 3:42 PM", source: "sync", passed: 8, status: "review" },
    { id: "r2", name: "Priya Raman", when: "Today, 11:05 AM", source: "sync", passed: 9, status: "approved" },
    { id: "r3", name: "Marcus Bell", when: "Yesterday, 6:20 PM", source: "pdf", passed: null, status: "review" },
    { id: "r4", name: "Elena Ortiz", when: "Nov 3, 2:14 PM", source: "sync", passed: 6, status: "changes" },
    { id: "r5", name: "Tom Kessler", when: "Nov 2, 9:48 AM", source: "sync", passed: 7, status: "review" },
  ],
};

/* ===========================================================================
   Presenter notes (Flow A right-hand panel) and Full-story script
   =========================================================================== */
const P = CONFIG.partner;
const NOTES = {
  projects: {
    title: "A1 · RadonSketch home",
    points: [
      "The existing Projects screen and bottom navigation — unchanged.",
      "New <b>Courses</b> tab with a “New” badge, plus a light discovery banner.",
      "Courses live where pros already work every day: no extra app, no extra login.",
    ],
  },
  courses: {
    title: "A2 · Courses catalogue",
    points: [
      `Branded as <b>${P.name}</b> courses, in partnership with RadonSketch.`,
      "Filter by Measurement, Mitigation, Continuing Education, Exam Prep.",
      "Each card shows credit hours, format, price and NRPP approval.",
      "The orange tag marks courses with a hands-on RadonSketch Practice Lab.",
    ],
  },
  course: {
    title: "A3 · Course detail",
    points: [
      "Overview, outcomes, instructor and full lesson list.",
      "The Practice Lab step is highlighted — it's the bridge between learning and doing.",
      "Enrol button shows the price up front.",
    ],
  },
  checkout: {
    title: "A4 · Partner checkout",
    points: [
      `Styled as the partner's own checkout: “Secure checkout by ${P.name}”.`,
      "The partner remains the seller — pricing, receipts and refunds stay theirs.",
      "RadonSketch never handles card details (assumption to confirm in the agreement).",
    ],
  },
  player: {
    title: "A5 · Course player",
    points: [
      "Progress bar and lesson list with status for each step.",
      "Video, quiz and Practice Lab steps all run inside the app.",
      "Progress stays in sync with the partner's portal.",
    ],
  },
  video: {
    title: "A5 · Video lesson",
    points: ["Standard video player with chapters.", "Press play to show playback; “Mark as complete” updates progress."],
  },
  quiz: {
    title: "A5 · Knowledge check",
    points: ["Multiple choice with instant feedback.", "Questions can set up the skills used in the Practice Lab."],
  },
  lab: {
    title: "A6 · Practice Lab step",
    points: [
      "Explains the task, what's practised and how long it takes.",
      "A ready-made practice project is already waiting — one tap to open.",
      "Practice projects don't count toward plan limits and can't be sent to clients.",
    ],
  },
  "pp-diag": {
    title: "A7 · Practice project — Diagnostic",
    points: [
      "Clearly bannered as a <b>course practice project</b>, separate from client work.",
      "Test points and sub-slab readings are already placed by the course author.",
    ],
  },
  "pp-build": {
    title: "A7 · Radon Builder + compliance",
    points: [
      "Suction point, pipe and fan on the plan.",
      "Live ANSI/AARST checks: mostly green, one amber warning.",
      "Tap <b>Move exhaust</b> to fix the warning — the canvas and checks update.",
    ],
  },
  "pp-report": {
    title: "A8 · Training report",
    points: [
      "The real RadonSketch report, watermarked “Training report”.",
      "Learners leave with a portfolio-quality sample of their work.",
    ],
  },
  submit: {
    title: "A9 · Submit to course",
    points: [
      `<b>Sync automatically</b> — sends report, design and checks to ${P.name}.`,
      "<b>Download PDF</b> — fallback for learners who prefer to upload.",
      "After sync, the lesson is marked complete in the course player.",
    ],
  },
};

// Full story — each step only sets what changes; state is rebuilt from step 1 each time.
const STORY = [
  {
    title: "Learner opens the Practice Lab",
    caption: `On the ${P.name} portal, the learner reaches Lesson 3 — a Practice Lab step that uses RadonSketch.`,
    focus: "portal", scroll: "top",
    set: (s) => { s.app.screen = "lock"; },
  },
  {
    title: "Scan the QR code",
    caption: "The learner scans the QR code with their phone. It opens RadonSketch in the app store, carrying the course code with it.",
    focus: "both", scroll: "qr",
    set: (s) => { s.app.screen = "camera"; s.portal.qrPulse = true; },
  },
  {
    title: "Download RadonSketch",
    caption: "RadonSketch installs from the App Store or Google Play. This is how the partner's learners discover the app.",
    focus: "app", scroll: "qr",
    set: (s) => { s.app.screen = "appstore"; s.portal.qrPulse = false; },
  },
  {
    title: "Sign in — course linked",
    caption: `The learner signs in or creates a free account. Course code ${CONFIG.courseCode} links their account to the course.`,
    focus: "app", scroll: "qr",
    set: (s) => { s.app.screen = "signin"; },
  },
  {
    title: "The practice project is waiting",
    caption: "A ready-made practice project for this course appears in the app, clearly marked and kept apart from real client projects. The portal now shows RadonSketch as connected.",
    focus: "both", scroll: "submission",
    set: (s) => {
      s.app.screen = "projects"; s.app.signedIn = true; s.app.practiceReady = true; s.app.promo = false;
      s.app.toast = "Course practice project added"; s.portal.connected = true;
    },
  },
  {
    title: "Practise: review the diagnostics",
    caption: "Test points and readings are already on the Diagnostic floor plan, so the learner can focus on reading the data.",
    focus: "app", scroll: "submission",
    set: (s) => { s.app.screen = "pp-diag"; s.app.toast = null; },
  },
  {
    title: "Practise: design and fix compliance",
    caption: "In Radon Builder the learner places the suction point, pipe and fan. Live ANSI/AARST checks flag the exhaust as too close to a window, and the learner fixes it.",
    focus: "app", scroll: "submission",
    set: (s) => { s.app.screen = "pp-build"; s.app.fixed = true; s.app.toast = "Exhaust moved: 23 ft from nearest opening"; },
  },
  {
    title: "Generate the training report",
    caption: "RadonSketch generates the report, watermarked “Training report” so it can't be mistaken for client work.",
    focus: "app", scroll: "submission",
    set: (s) => { s.app.screen = "pp-report"; s.app.toast = null; },
  },
  {
    title: "Submit to the course",
    caption: "The learner chooses to sync the report to the course automatically. Downloading a PDF to upload is also available.",
    focus: "app", scroll: "submission",
    set: (s) => { s.app.sheet = "submit"; s.app.submitStep = "choose"; s.app.submitChoice = "sync"; },
  },
  {
    title: "Portal shows “Submitted”",
    caption: "The submission appears on the portal straight away, with auto-check results. No files to email or upload. The instructor is notified.",
    focus: "both", scroll: "submission",
    set: (s) => { s.app.submitStep = "done"; s.portal.submission = "synced"; },
  },
  {
    title: "Lesson complete",
    caption: "Once the instructor approves, Lesson 3 is marked complete on both sides and the final exam unlocks.",
    focus: "both", scroll: "top",
    set: (s) => {
      s.app.sheet = null; s.app.screen = "player"; s.app.history = ["courses"];
      s.app.done[doneKey(CONFIG.featuredCourseId, "l3")] = true; s.app.labState = "submitted";
      s.portal.submission = "approved"; s.portal.reviews.r1 = "approved"; s.app.approved = true;
    },
  },
];

/* ===========================================================================
   Helpers
   =========================================================================== */
const course = (id) => CONFIG.courses.find((c) => c.id === id);
const FEATURED = () => course(CONFIG.featuredCourseId);
const fmt = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
const money = (n) => "$" + n.toFixed(2);
const doneKey = (cid, lid) => cid + ":" + lid;
const TYPE_LABEL = { video: "Video", quiz: "Quiz", lab: "Practice Lab", exam: "Exam" };
const TYPE_ICON = { video: "video", quiz: "quiz", lab: "lab", exam: "exam" };

const ICONS = {
  folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sliders: '<path d="M5 4v6M5 14v6M12 4v2M12 10v10M19 4v10M19 18v2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="8" r="2"/><circle cx="19" cy="16" r="2"/>',
  more: '<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>',
  "chev-right": '<path d="m9 6 6 6-6 6"/>',
  "chev-left": '<path d="m15 6-6 6 6 6"/>',
  "chev-down": '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="3"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10.5 5-3v9l-5-3z"/>',
  quiz: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  lab: '<path d="M9 3h6M10 3v6.2L4.8 18.3A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.7L14 9.2V3"/><path d="M7.5 15h9"/>',
  exam: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  grad: '<path d="M2 9.5 12 4.5l10 5-10 5z"/><path d="M6 11.5v4.8c3.3 2.3 8.7 2.3 12 0v-4.8M22 9.5V15"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="currentColor" stroke="none"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.4 8.1-8 9-4.6-.9-8-4-8-9V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
  card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  upload: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
  sync: '<path d="M20 11a8 8 0 0 0-14.3-4.7L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.7L20 16M20 20v-4h-4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/>',
  alert: '<path d="M10.3 4.3 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17v.3"/>',
  fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 .8-7 3.6-7 2.6 0 2.6 3.8-1.6 7M14 12c4 0 7 .8 7 3.6 0 2.6-3.8 2.6-7-1.6M12 14c0 4-.8 7-3.6 7-2.6 0-2.6-3.8 1.6-7M10 12c-4 0-7-.8-7-3.6C3 5.8 6.8 5.8 10 10"/>',
  home: '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  pointer: '<path d="M5 3.5 19 10l-6.2 2L10.5 18z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  pipe: '<path d="M4 19V9a4 4 0 0 1 4-4h12"/><path d="M8 19V10a1 1 0 0 1 1-1h11"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3.5a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.1a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3z"/>',
  diamond: '<path d="M6 4h12l3.5 5L12 20.5 2.5 9z"/><path d="M2.5 9h19M9.5 4 8 9l4 11.5L16 9l-1.5-5"/>',
  privacy: '<path d="M12 3 20 6v6c0 5-3.4 8.1-8 9-4.6-.9-8-4-8-9V6z"/>',
  logout: '<path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H10"/>',
  edituser: '<circle cx="10" cy="8" r="4"/><path d="M3 20c0-3.6 3-5.5 7-5.5 1 0 2 .1 2.8.4M15 20l1-3 4-4 2 2-4 4z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  volume: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
  cc: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M10.5 10.5a2 2 0 1 0 0 3M17 10.5a2 2 0 1 0 0 3"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  split: '<rect x="2.5" y="5" width="12" height="11" rx="1.5"/><rect x="16.5" y="4" width="5.5" height="13" rx="1.5"/><path d="M6 20h5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-left": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  message: '<path d="M4 5h16v11H9l-5 4z"/>',
  hourglass: '<path d="M7 3h10M7 21h10M8 3v3.5a4 4 0 0 0 1.5 3.1L12 12l2.5-2.4A4 4 0 0 0 16 6.5V3M8 21v-3.5a4 4 0 0 1 1.5-3.1L12 12l2.5 2.4a4 4 0 0 1 1.5 3.1V21"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  cart: '<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2.5 3.5h2.8l2.2 11.5h11.5l2-8H6.3"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2.1.7 3.5 2.5 3.5 5.2"/>',
};
function ic(name, size = 20, cls = "") {
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}
function rsLogo(size = 28) {
  return `<svg class="rs-logo" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#E26A1B"/><path d="M7.5 16.5 16 9.5l8.5 7V24h-17z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M20.5 13.2V7h3v8.6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><circle cx="16" cy="19" r="2" fill="#fff"/></svg>`;
}
const partnerLogo = (cls = "") => `<span class="partner-logo ${cls}">Partner logo</span>`;
function scaled(inner, w, nw, nh) {
  const s = w / nw;
  return `<div class="scaled" style="width:${w}px;height:${Math.round(nh * s)}px"><div class="scaled-in" style="width:${nw}px;height:${nh}px;transform:scale(${s})">${inner}</div></div>`;
}
function complianceItems(fixed) {
  return CONFIG.compliance.map((c) =>
    c.status === "warn" && fixed ? { ...c, status: "pass", detail: c.fixedDetail, wasFixed: true } : c
  );
}
function complianceCounts(fixed) {
  const items = complianceItems(fixed);
  return {
    total: items.length,
    pass: items.filter((c) => c.status === "pass").length,
    warn: items.filter((c) => c.status === "warn").length,
    pending: items.filter((c) => c.status === "pending").length,
  };
}
function thumbArt(c, big = false) {
  const tone = { Mitigation: "t-mit", Measurement: "t-meas", "Continuing Education": "t-ce", "Exam Prep": "t-exam" }[c.category];
  const glyph = { Mitigation: "fan", Measurement: "target", "Continuing Education": "book", "Exam Prep": "exam" }[c.category];
  return `<div class="thumb ${tone} ${big ? "big" : ""}">
    <span class="thumb-glyph">${ic(glyph, big ? 150 : 96)}</span>
    <span class="thumb-cat">${c.category}</span>
    <span class="thumb-hrs"><b>${c.hours}</b> CE hrs</span>
    ${c.nrpp ? `<span class="thumb-ce">CE</span>` : ""}
  </div>`;
}

/* QR placeholder pattern (not a real code) */
function qrSVG(size = 200, seed = 4821) {
  const n = 29;
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
  const finder = (x, y) => x < 8 && y < 8 ? 1 : x > n - 9 && y < 8 ? 1 : x < 8 && y > n - 9 ? 1 : 0;
  const centre = (x, y) => x > 10 && x < 18 && y > 10 && y < 18;
  let cells = "";
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (finder(x, y) || centre(x, y)) continue;
    if (rnd() > 0.5) cells += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
  }
  const fp = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#111"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#111"/>`;
  return `<svg class="qr" width="${size}" height="${size}" viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges" aria-label="QR code placeholder">
    <rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><g fill="#111">${cells}</g>
    ${fp(0, 0)}${fp(n - 7, 0)}${fp(0, n - 7)}
    <rect x="11" y="11" width="7" height="7" rx="1.6" fill="#E26A1B"/><path d="M12.6 15 14.5 13.4l1.9 1.6v1.6h-3.8z" fill="#fff" shape-rendering="geometricPrecision"/>
  </svg>`;
}

/* Floor plan used by Diagnostic, Radon Builder and the report */
function planSVG({ mode = "diag", fixed = false, mini = false } = {}) {
  const PP = CONFIG.practiceProject;
  const ex = fixed ? { x: 358, y: 284 } : { x: 358, y: 150 };
  const build = mode === "build";
  const rooms = [
    ["Family room", 30, 48], ["Bedroom", 220, 48], ["Utility", 220, 168], ["Storage", 30, 188], ["Bath", 130, 188],
  ].map(([t, x, y]) => `<text x="${x}" y="${y}" class="pl-room">${t}</text>`).join("");
  const tps = PP.testPoints.map((t) => build
    ? `<circle cx="${t.x}" cy="${t.y}" r="5" class="pl-tp-muted"/>`
    : `<g class="pl-tp"><circle cx="${t.x}" cy="${t.y}" r="11"/><text x="${t.x}" y="${t.y + 3.5}" text-anchor="middle">${t.id.slice(2)}</text>
       <rect x="${t.x + 13}" y="${t.y - 9}" width="58" height="18" rx="9" class="pl-tag-bad"/><text x="${t.x + 42}" y="${t.y + 4}" text-anchor="middle" class="pl-tag-t">${t.value} pCi/L</text></g>`).join("");
  const ths = PP.testHoles.map((t) => build
    ? `<rect x="${t.x - 3}" y="${t.y - 3}" width="6" height="6" transform="rotate(45 ${t.x} ${t.y})" class="pl-th-muted"/>`
    : `<g class="pl-th"><rect x="${t.x - 6}" y="${t.y - 6}" width="12" height="12" transform="rotate(45 ${t.x} ${t.y})"/>
       <text x="${t.x}" y="${t.y + 20}" text-anchor="middle" class="pl-th-t">${t.value.toFixed(3).replace("-", "−")}</text></g>`).join("");
  const system = !build ? "" : `
    <circle cx="${ex.x}" cy="${ex.y}" r="80" class="${fixed ? "pl-radius-ok" : "pl-radius-warn"}"/>
    ${fixed ? "" : `<line x1="${ex.x}" y1="${ex.y}" x2="340" y2="100" class="pl-dist"/><rect x="292" y="112" width="44" height="16" rx="8" class="pl-dist-tag"/><text x="314" y="123.5" text-anchor="middle" class="pl-dist-t">6.5 ft</text>`}
    <path d="M300 226 H358 V${ex.y}" class="pl-pipe"/>
    <g class="pl-sp"><circle cx="300" cy="226" r="9"/><circle cx="300" cy="226" r="3.5"/></g>
    <text x="300" y="250" text-anchor="middle" class="pl-lbl">SP1</text>
    <g class="pl-fan" transform="translate(358 226)"><circle r="10"/><path d="M0-6.5v13M-6.5 0h13" /></g>
    <g class="pl-ex"><circle cx="${ex.x}" cy="${ex.y}" r="7"/><path d="M${ex.x - 3} ${ex.y + 1}l3-4 3 4" /></g>
    <text x="${fixed ? 346 : 373}" y="${fixed ? 300 : 136}" text-anchor="end" class="pl-lbl">${fixed ? "Exhaust · above eave · 23 ft" : "Exhaust"}</text>`;
  const win = (x1, y1, x2, y2, warn) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pl-win ${warn ? "warn" : ""}"/>`;
  return `<svg class="plan ${mini ? "mini" : ""}" viewBox="0 0 380 312" aria-label="Floor plan">
    <rect x="20" y="30" width="320" height="240" class="pl-floor"/>
    <g class="pl-walls"><rect x="20" y="30" width="320" height="240" class="pl-outer"/>
      <path d="M210 30V112M210 128V270M20 170H72M88 170H210M120 170V270M210 150H262M278 150H340"/></g>
    ${win(70, 30, 125, 30)}${win(340, 70, 340, 100, build && !fixed)}${win(20, 80, 20, 120)}
    <rect x="224" y="178" width="30" height="24" rx="3" class="pl-fixture"/><text x="239" y="194" text-anchor="middle" class="pl-fx-t">FURN</text>
    <circle cx="322" cy="252" r="9" class="pl-fixture"/><text x="322" y="255.5" text-anchor="middle" class="pl-fx-t">S</text>
    <path d="M128 252h40M128 244h40M128 236h40" class="pl-stairs"/>
    ${rooms}${ths}${tps}${system}
    <g class="pl-scale"><path d="M28 300h80M28 296v8M108 296v8"/><text x="114" y="303">10 ft</text></g>
  </svg>`;
}

/* The report page — reused in the app, portal thumbnail and instructor preview */
function reportDoc(fixed = true) {
  const PP = CONFIG.practiceProject, L = CONFIG.learner, cc = complianceCounts(fixed);
  const rows = complianceItems(fixed).map((c) => `<div class="rpt-ck ${c.status}"><i>${c.status === "pass" ? "✓" : c.status === "warn" ? "!" : "…"}</i>${c.label}</div>`).join("");
  return `<div class="rpt">
    <div class="rpt-wm">TRAINING REPORT</div>
    <div class="rpt-head"><span class="rpt-brand">${rsLogo(16)}<b>RadonSketch</b></span><span class="rpt-type">Mitigation Design Report</span></div>
    <div class="rpt-ribbon">TRAINING REPORT · course practice project — not for client use</div>
    <div class="rpt-title">${PP.name}</div>
    <div class="rpt-sub">${PP.address} · ${PP.tags.slice(1).join(" · ")}</div>
    <div class="rpt-meta"><div><span>Prepared by</span>${L.name}</div><div><span>Course</span>${FEATURED().title}</div><div><span>Provider</span>${P.name}</div><div><span>Date</span>${CONFIG.reportDate}</div></div>
    <div class="rpt-stats"><div><b>9.4</b><span>pCi/L highest pre-mitigation</span></div><div><b>−0.009</b><span>in. WC weakest PFE</span></div><div><b>${cc.pass}/${cc.total}</b><span>compliance checks passed</span></div></div>
    <div class="rpt-sec">System design</div>
    <div class="rpt-plan">${planSVG({ mode: "build", fixed, mini: true })}</div>
    <div class="rpt-sec">Compliance · ANSI/AARST SGM-SF</div>
    <div class="rpt-cks">${rows}</div>
    <div class="rpt-sec">Bill of materials</div>
    <div class="rpt-bom">${CONFIG.bom.slice(0, 4).map((b) => `<div><span>${b.item}</span><span>${b.qty}</span><b>${money(b.cost)}</b></div>`).join("")}
      <div class="tot"><span>${CONFIG.bom.length} items · full list on page 3</span><span></span><b>${money(CONFIG.bom.reduce((t, b) => t + b.cost, 0))}</b></div></div>
    <div class="rpt-foot"><span>Generated in RadonSketch · training mode</span><span>Page 1 of 4</span></div>
  </div>`;
}

/* ===========================================================================
   State
   =========================================================================== */
function freshApp() {
  return {
    screen: "projects", history: [], sheet: null,
    checkoutStep: "form", submitStep: "choose", submitChoice: "sync",
    category: "All", courseId: CONFIG.featuredCourseId, lessonId: null,
    enrolled: {}, done: {}, labState: null, approved: false,
    quiz: { picked: null, checked: false }, video: { playing: false, t: 0 },
    fixed: false, promo: true, coursesSeen: false, practiceReady: false, signedIn: true,
    generating: false, toast: null,
  };
}
function freshPortal() {
  return { view: "learner", lesson: "l3", submission: "waiting", upload: "idle", reviews: {}, selected: "r1", connected: false, qrPulse: false, toast: null };
}
function freshState(mode = "hub") {
  return { mode, app: freshApp(), portal: freshPortal(), story: { step: 0 } };
}
let S = freshState();
let EPOCH = 0; // invalidates pending timers when the demo is reset or the mode changes
const LAST = { phone: null, sheet: null, portal: null, story: -1 };
let vidTimer = null, toastTimer = null;

function storyState(n) {
  const s = freshState("story");
  const a = s.app, fid = CONFIG.featuredCourseId;
  a.enrolled[fid] = true; a.coursesSeen = true; a.signedIn = false;
  a.done[doneKey(fid, "l1")] = true; a.done[doneKey(fid, "l2")] = true;
  for (let i = 0; i <= n; i++) STORY[i].set(s);
  s.story.step = n;
  return s;
}

function enrolledBase(a, doneThrough = 0) {
  const fid = CONFIG.featuredCourseId;
  a.enrolled[fid] = true; a.courseId = fid; a.coursesSeen = true; a.promo = false;
  ["l1", "l2", "l3"].slice(0, doneThrough).forEach((l) => (a.done[doneKey(fid, l)] = true));
}
const A_JUMPS = [
  { key: "projects", label: "App home — Projects", tag: "A1", set: () => {} },
  { key: "courses", label: "Courses catalogue", tag: "A2", set: (a) => { a.screen = "courses"; a.coursesSeen = true; } },
  { key: "course", label: "Course detail", tag: "A3", set: (a) => { a.coursesSeen = true; a.history = ["courses"]; a.screen = "course"; } },
  { key: "checkout", label: "Partner checkout", tag: "A4", set: (a) => { a.coursesSeen = true; a.history = ["courses"]; a.screen = "course"; a.sheet = "checkout"; } },
  { key: "player", label: "Course player", tag: "A5", set: (a) => { enrolledBase(a); a.history = ["courses"]; a.screen = "player"; } },
  { key: "video", label: "Video lesson", tag: "A5", set: (a) => { enrolledBase(a); a.history = ["courses", "player"]; a.lessonId = "l1"; a.screen = "video"; } },
  { key: "quiz", label: "Quiz with feedback", tag: "A5", set: (a) => { enrolledBase(a, 1); a.history = ["courses", "player"]; a.lessonId = "l2"; a.screen = "quiz"; } },
  { key: "lab", label: "Practice Lab step", tag: "A6", set: (a) => { enrolledBase(a, 2); a.history = ["courses", "player"]; a.lessonId = "l3"; a.screen = "lab"; } },
  { key: "pp-diag", label: "Practice project · Diagnostic", tag: "A7", set: (a) => { enrolledBase(a, 2); a.practiceReady = true; a.lessonId = "l3"; a.history = ["courses", "player", "lab"]; a.screen = "pp-diag"; } },
  { key: "pp-build", label: "Radon Builder + compliance", tag: "A7", set: (a) => { enrolledBase(a, 2); a.practiceReady = true; a.lessonId = "l3"; a.history = ["courses", "player", "lab"]; a.screen = "pp-build"; } },
  { key: "pp-report", label: "Training report", tag: "A8", set: (a) => { enrolledBase(a, 2); a.practiceReady = true; a.fixed = true; a.lessonId = "l3"; a.history = ["courses", "player", "lab"]; a.screen = "pp-report"; } },
  { key: "submit", label: "Submit to course", tag: "A9", set: (a) => { enrolledBase(a, 2); a.practiceReady = true; a.fixed = true; a.lessonId = "l3"; a.history = ["courses", "player", "lab"]; a.screen = "pp-report"; a.sheet = "submit"; } },
];
function currentAKey(a) {
  if (a.sheet === "checkout") return "checkout";
  if (a.sheet === "submit") return "submit";
  return { projects: "projects", profile: "projects", courses: "courses", course: "course", player: "player", video: "video", quiz: "quiz", lab: "lab", "pp-diag": "pp-diag", "pp-build": "pp-build", "pp-report": "pp-report" }[a.screen] || "";
}

/* ===========================================================================
   Phone (RadonSketch app)
   =========================================================================== */
function statusbar() {
  const time = S.mode === "story" ? "3:40" : "9:41";
  return `<div class="sb"><span class="sb-time">${time}</span><span class="sb-ic">
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.6 10.6 0 0 0 8 .4 10.6 10.6 0 0 0 .5 3.4l1.3 1.3A8.8 8.8 0 0 1 8 2.2zm0 3.6c1.4 0 2.7.6 3.7 1.5L13 6a7 7 0 0 0-10 0l1.3 1.3c1-1 2.3-1.5 3.7-1.5zm0 3.6c-.6 0-1.1.2-1.5.6L8 11.6l1.5-1.6c-.4-.4-.9-.6-1.5-.6z"/></svg>
    <svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="19" height="8" rx="1.8" fill="currentColor"/><rect x="23.5" y="4" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".45"/></svg>
  </span></div>`;
}
function tabbar(active, a) {
  const t = (id, icon, label, extra = "") => `<button class="tab ${active === id ? "on" : ""}" data-action="tab" data-arg="${id}"><span class="tab-ic">${ic(icon, 22)}${extra}</span><span>${label}</span></button>`;
  return `<nav class="tabbar">
    ${t("projects", "folder", "My Projects")}
    ${t("courses", "grad", "Courses", a.coursesSeen ? "" : `<em class="new-badge">New</em>`)}
    <div class="tab tab-fab"><span class="fab">${ic("plus", 24)}</span></div>
    ${t("profile", "user", "Profile")}
  </nav>`;
}
const backBtn = (cls = "") => `<button class="icon-btn ${cls}" data-action="back" aria-label="Back">${ic("chev-left", 22)}</button>`;
const appHeader = (title, right = "") => `<div class="nav-head">${backBtn()}<div class="nav-title">${title}</div><div class="nav-right">${right}</div></div>`;

function lessonStatus(c, l, a) {
  if (a.done[doneKey(c.id, l.id)]) return "done";
  if (l.type === "lab" && a.labState === "pdf") return "upload";
  if (l.type === "exam") {
    if (c.id === CONFIG.featuredCourseId && a.approved) return "todo";
    return "locked";
  }
  const firstOpen = c.lessons.find((x) => !a.done[doneKey(c.id, x.id)] && x.type !== "exam");
  return firstOpen && firstOpen.id === l.id && a.enrolled[c.id] ? "current" : "todo";
}
function statusChip(st) {
  return {
    done: `<span class="st st-done">${ic("check", 14)}</span>`,
    current: `<span class="st st-current">Up next</span>`,
    locked: `<span class="st st-locked">${ic("lock", 15)}</span>`,
    upload: `<span class="st st-upload">Upload pending</span>`,
    todo: `<span class="st st-todo">${ic("chev-right", 16)}</span>`,
  }[st];
}
function lessonRow(c, l, i, a, interactive) {
  const st = interactive ? lessonStatus(c, l, a) : "todo";
  const tag = interactive && st !== "locked" ? "button" : "div";
  const act = interactive && st !== "locked" ? `data-action="openLesson" data-arg="${l.id}"` : "";
  const lockNote = interactive && st === "locked" && l.type === "exam" ? `<span class="l-note">Unlocks after the Practice Lab is approved</span>` : "";
  return `<${tag} class="l-row ${l.type === "lab" ? "is-lab" : ""} ls-${st}" ${act}>
    <span class="l-ic t-${l.type}">${ic(TYPE_ICON[l.type], 19)}</span>
    <span class="l-txt"><span class="l-kicker">Lesson ${i + 1} · ${TYPE_LABEL[l.type]}${l.type === "lab" ? ` <span class="b-practice xs">${rsLogo(11)} RadonSketch</span>` : ""}</span>
      <span class="l-title">${l.title}</span><span class="l-dur">${l.duration}</span>${lockNote}</span>
    ${interactive ? statusChip(st) : ""}
  </${tag}>`;
}

const SCREENS = {
  projects(a) {
    const proj = CONFIG.clientProjects.map((p) => `
      <div class="proj tone-${p.tone}"><div class="proj-card">
        <div class="proj-top"><span class="proj-name">${p.name}</span><span class="pill-grey">${p.status}</span></div>
        <div class="proj-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}<span class="proj-more">${ic("more", 20)}</span></div>
      </div><div class="proj-foot">Created ${p.created}</div></div>`).join("");
    const PP = CONFIG.practiceProject;
    const practice = a.practiceReady ? `
      <div class="sec-label">${ic("grad", 15)} Course practice</div>
      <button class="proj-practice" data-action="openPracticeCard">
        <div class="pp-ribbon">${ic("grad", 13)} Course practice · ${P.name}</div>
        <div class="proj-top"><span class="proj-name">${PP.name}</span><span class="pill-training">Training</span></div>
        <div class="proj-tags">${PP.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="pp-prog"><span>${a.fixed ? "Design complete · ready to report" : "Diagnostic ready · start your design"}</span>${ic("chev-right", 18)}</div>
      </button>
      <div class="sec-label">Client projects</div>` : "";
    const promo = a.promo && !a.practiceReady ? `
      <div class="promo" data-action="tab" data-arg="courses">
        <span class="promo-ic">${ic("grad", 22)}</span>
        <span class="promo-txt"><b>New: Courses in RadonSketch</b><small>Earn NRPP CE credits from ${P.name} and practise on real-world projects.</small></span>
        ${ic("chev-right", 18)}
      </div>` : "";
    return {
      html: `<div class="ph-head"><h1>My Projects</h1><div class="ph-head-actions"><span class="circle-btn">${ic("search", 20)}</span><span class="circle-btn">${ic("sliders", 20)}</span></div></div>
        <div class="pad">${promo}${practice}${proj}</div>`,
      tab: "projects",
    };
  },

  courses(a) {
    const cats = ["All", ...CONFIG.categories];
    const list = CONFIG.courses.filter((c) => a.category === "All" || c.category === a.category);
    const mine = CONFIG.courses.filter((c) => a.enrolled[c.id]);
    const mineHtml = mine.length ? `<div class="sec-label">My learning</div>${mine.map((c) => {
      const d = c.lessons.filter((l) => a.done[doneKey(c.id, l.id)]).length, pct = Math.round((d / c.lessons.length) * 100);
      return `<button class="mine" data-action="openPlayer" data-arg="${c.id}"><span class="mine-thumb">${thumbArt(c)}</span><span class="mine-txt"><b>${c.title}</b><span class="bar"><i style="width:${pct}%"></i></span><small>${d} of ${c.lessons.length} lessons · ${pct}%</small></span>${ic("chev-right", 18)}</button>`;
    }).join("")}` : "";
    return {
      html: `<div class="ph-head"><h1>Courses</h1><div class="ph-head-actions"><span class="circle-btn">${ic("search", 20)}</span></div></div>
      <div class="pad">
        <div class="partner-banner">
          <div class="pb-top">${partnerLogo("on-dark")}<span class="pb-pill">${ic("shield", 13)} NRPP-approved provider</span></div>
          <div class="pb-title">Courses by ${P.name}</div>
          <div class="pb-sub">in partnership with ${rsLogo(14)} RadonSketch</div>
        </div>
        <div class="chips">${cats.map((c) => `<button class="chip ${a.category === c ? "on" : ""}" data-action="cat" data-arg="${c}">${c}</button>`).join("")}</div>
        ${mineHtml}
        <div class="sec-label">${a.category === "All" ? "All courses" : a.category} <span class="muted">· ${list.length}</span></div>
        ${list.map((c) => `
          <button class="c-card" data-action="openCourse" data-arg="${c.id}">
            ${thumbArt(c)}
            <span class="c-body">
              <span class="c-badges">${c.nrpp ? `<span class="b-nrpp">${ic("shield", 12)} NRPP-approved</span>` : ""}${c.practice ? `<span class="b-practice">${rsLogo(12)} Includes RadonSketch practice</span>` : ""}</span>
              <span class="c-title">${c.title}</span>
              <span class="c-meta">${ic("clock", 14)} ${c.hours} CE hrs · ${c.format}</span>
              <span class="c-foot"><span class="c-price">${a.enrolled[c.id] ? `<span class="enrolled">${ic("check", 13)} Enrolled</span>` : fmt(c.price)}</span><span class="c-rating">${ic("star", 13)} ${c.rating}</span></span>
            </span>
          </button>`).join("")}
      </div>`,
      tab: "courses",
    };
  },

  course(a) {
    const c = course(a.courseId), enrolled = a.enrolled[c.id];
    return {
      theme: "white",
      html: `<div class="cd-hero">${thumbArt(c, true)}<button class="icon-btn floating" data-action="back" aria-label="Back">${ic("chev-left", 22)}</button></div>
      <div class="cd-main">
        <div class="cd-provider">${partnerLogo("xs")} <span>${P.name}</span></div>
        <h2 class="cd-title">${c.title}</h2>
        <div class="c-badges">${c.nrpp ? `<span class="b-nrpp">${ic("shield", 12)} NRPP-approved</span>` : ""}${c.practice ? `<span class="b-practice">${rsLogo(12)} Includes RadonSketch practice</span>` : ""}</div>
        <div class="cd-stats">
          <div><b>${c.hours}</b><span>CE hours</span></div><div><b>${c.format}</b><span>Format</span></div>
          <div><b>${c.lessons.length}</b><span>Lessons</span></div><div><b>${ic("star", 13)} ${c.rating}</b><span>${c.learners} learners</span></div>
        </div>
        <h3>Overview</h3><p class="body-p">${c.overview}</p>
        <h3>What you'll learn</h3><ul class="checks">${c.learn.map((x) => `<li>${ic("check", 16)}${x}</li>`).join("")}</ul>
        <h3>Lessons</h3><div class="l-list">${c.lessons.map((l, i) => lessonRow(c, l, i, a, false)).join("")}</div>
        <h3>Instructor</h3>
        <div class="instr"><span class="avatar">${CONFIG.instructor.initials}</span><span><b>${CONFIG.instructor.name}</b><small>${CONFIG.instructor.title}</small><p>${CONFIG.instructor.bio}</p></span></div>
        <p class="fine">Sold and delivered by ${P.name}. Certificates and CE credit are issued by the course provider. ${c.access}.</p>
      </div>`,
      footer: enrolled
        ? `<div class="cta-bar"><div class="cta-info"><b>${ic("check", 15)} Enrolled</b><small>Continue where you left off</small></div><button class="btn-primary" data-action="openPlayer" data-arg="${c.id}">Go to course</button></div>`
        : `<div class="cta-bar"><div class="cta-info"><b>${fmt(c.price)}</b><small>One-time · ${c.access}</small></div><button class="btn-primary" data-action="enroll">Enroll — ${fmt(c.price)}</button></div>`,
    };
  },

  player(a) {
    const c = course(a.courseId);
    const d = c.lessons.filter((l) => a.done[doneKey(c.id, l.id)]).length, pct = Math.round((d / c.lessons.length) * 100);
    const next = c.lessons.find((l) => ["current", "todo", "upload"].includes(lessonStatus(c, l, a)) && !a.done[doneKey(c.id, l.id)]);
    const nextIdx = next ? c.lessons.indexOf(next) : -1;
    return {
      html: `${appHeader("Course")}
      <div class="pad">
        <div class="pl-card">
          <div class="cd-provider">${partnerLogo("xs")} <span>${P.name}</span></div>
          <div class="pl-title">${c.title}</div>
          <div class="bar big"><i style="width:${pct}%"></i></div>
          <div class="pl-meta"><span>${d} of ${c.lessons.length} lessons complete</span><b>${pct}%</b></div>
        </div>
        ${next ? `<button class="continue" data-action="openLesson" data-arg="${next.id}">
          <span class="l-ic t-${next.type}">${ic(TYPE_ICON[next.type], 20)}</span>
          <span class="l-txt"><span class="l-kicker">Continue · Lesson ${nextIdx + 1}</span><span class="l-title">${next.title}</span></span>
          <span class="go">${ic("arrow", 18)}</span></button>` : ""}
        <div class="sec-label">Lessons</div>
        <div class="l-list">${c.lessons.map((l, i) => lessonRow(c, l, i, a, true)).join("")}</div>
        <div class="cert">${ic("exam", 20)}<span><b>Certificate of completion</b><small>Issued by ${P.name} after you pass the final exam</small></span>${ic("lock", 16)}</div>
      </div>`,
    };
  },

  video(a) {
    const v = a.video, c = course(a.courseId), l = c.lessons.find((x) => x.id === a.lessonId) || c.lessons[0];
    const done = a.done[doneKey(c.id, l.id)];
    const dur = 768, pct = (v.t / dur) * 100;
    const t = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
    return {
      html: `${appHeader("Lesson " + (c.lessons.indexOf(l) + 1))}
      <div class="vid ${v.playing ? "playing" : ""}">
        <div class="vid-poster"><span class="vid-chip">Part 3 of 14</span><span class="vid-h">Pressure field extension testing</span><span class="vid-by">${CONFIG.instructor.name}</span></div>
        <div class="vid-sub">“…if the reading at the far test hole stays negative, the suction field reaches the whole slab.”</div>
        <button class="vid-big" data-action="togglePlay" aria-label="Play">${ic("play", 30)}</button>
        <div class="vid-ctrls">
          <button class="vid-pp" data-action="togglePlay">${ic(v.playing ? "pause" : "play", 18)}</button>
          <span class="vid-time" id="vidTime">${t(v.t)} / ${t(dur)}</span>
          <span class="vid-bar"><i id="vidFill" style="width:${pct}%"></i></span>
          ${ic("cc", 18)}${ic("volume", 18)}${ic("expand", 16)}
        </div>
      </div>
      <div class="pad">
        <div class="l-kicker">Lesson ${c.lessons.indexOf(l) + 1} · Video</div>
        <h2 class="cd-title sm">${l.title}</h2>
        <p class="body-p">How to drill test holes, apply suction and read micromanometer values to confirm the system will reach every part of the slab.</p>
        <div class="sec-label">Chapters</div>
        <div class="chapters">
          <div><span>0:00</span>Why PFE testing matters</div><div class="on"><span>3:42</span>Drilling test holes safely</div>
          <div><span>7:15</span>Reading a micromanometer</div><div><span>10:30</span>When to add a second suction point</div>
        </div>
      </div>`,
      footer: done
        ? `<div class="cta-bar single"><button class="btn-secondary block" data-action="back">${ic("check", 16)} Completed — back to course</button></div>`
        : `<div class="cta-bar single"><button class="btn-primary block" data-action="completeLesson">Mark as complete</button></div>`,
    };
  },

  quiz(a) {
    const Q = CONFIG.quiz, q = a.quiz, c = course(a.courseId), l = c.lessons.find((x) => x.id === a.lessonId) || c.lessons[1];
    const ok = q.checked && q.picked === Q.correct;
    return {
      html: `${appHeader("Knowledge check")}
      <div class="pad">
        <div class="quiz-prog"><span>${Q.progress}</span><span class="bar"><i style="width:20%"></i></span></div>
        <div class="l-kicker">Lesson ${c.lessons.indexOf(l) + 1} · Quiz</div>
        <h2 class="quiz-q">${Q.question}</h2>
        <div class="opts">${Q.options.map((o, i) => {
          let cls = q.picked === i ? "picked" : "";
          if (q.checked && i === Q.correct) cls = "right";
          else if (q.checked && q.picked === i) cls = "wrong";
          return `<button class="opt-q ${cls}" data-action="quizPick" data-arg="${i}"><span class="opt-l">${"ABCD"[i]}</span><span>${o}</span></button>`;
        }).join("")}</div>
        ${q.checked ? `<div class="feedback ${ok ? "ok" : "bad"}">${ic(ok ? "check" : "info", 18)}<div><b>${ok ? "Correct!" : "Not quite."}</b><p>${ok ? Q.explain : "Think about where exhaust could re-enter the home. Try again."}</p></div></div>` : ""}
      </div>`,
      footer: !q.checked
        ? `<div class="cta-bar single"><button class="btn-primary block ${q.picked == null ? "disabled" : ""}" data-action="quizCheck">Check answer</button></div>`
        : ok ? `<div class="cta-bar single"><button class="btn-primary block" data-action="quizDone">Continue</button></div>`
          : `<div class="cta-bar single"><button class="btn-secondary block" data-action="quizRetry">Try again</button></div>`,
    };
  },

  lab(a) {
    const PP = CONFIG.practiceProject, c = course(a.courseId);
    const l = c.lessons.find((x) => x.type === "lab") || c.lessons[0], idx = c.lessons.indexOf(l);
    const submitted = a.done[doneKey(c.id, l.id)];
    return {
      html: `${appHeader("Lesson " + (idx + 1))}
      <div class="pad">
        <div class="lab-hero">
          <span class="b-practice">${rsLogo(13)} Practice Lab · in RadonSketch</span>
          <h2>${l.title}</h2>
          <div class="lab-meta"><span>${ic("clock", 15)} ≈ 45 min</span><span>${ic("users", 15)} Instructor-graded</span></div>
          ${submitted ? `<div class="lab-status">${ic("check", 15)} Submitted · ${a.approved ? "approved" : "in review"}</div>` : ""}
        </div>
        <h3>Your task</h3><p class="body-p">${PP.task}</p>
        <h3>What you'll practise</h3><ul class="checks">${PP.practise.map((x) => `<li>${ic("check", 16)}${x}</li>`).join("")}</ul>
        <h3>Steps</h3>
        <ol class="steps">
          <li><b>Review the diagnostic floor plan</b><small>Test points and readings are already placed.</small></li>
          <li><b>Design the system in Radon Builder</b><small>Suction point, pipe route and fan.</small></li>
          <li><b>Resolve compliance warnings</b><small>Live ANSI/AARST checks.</small></li>
          <li><b>Generate and submit your report</b><small>Sync to your course or upload a PDF.</small></li>
        </ol>
        <div class="pp-mini">
          <div class="pp-ribbon">${ic("grad", 13)} Your practice project is ready</div>
          <div class="pp-mini-row"><div class="pp-mini-plan">${planSVG({ mode: "diag", mini: true })}</div>
            <div><b>${PP.name}</b><small>${PP.address}</small><div class="proj-tags">${PP.tags.map((t) => `<span class="tag sm">${t}</span>`).join("")}</div></div></div>
        </div>
        <p class="fine">Practice projects are marked “Training”, don't count toward your plan's project limit and can't be sent to clients.</p>
      </div>`,
      footer: `<div class="cta-bar single"><button class="btn-primary block" data-action="openPractice">${submitted ? "Open practice project" : "Open practice project"} ${ic("arrow", 18)}</button></div>`,
    };
  },

  "pp-diag"(a) {
    const PP = CONFIG.practiceProject;
    return {
      html: `${ppHeader("pp-diag")}
      <div class="pad">
        <div class="canvas-card">${planSVG({ mode: "diag" })}
          <div class="legend"><span><i class="lg-tp"></i>Radon test point</span><span><i class="lg-th"></i>Sub-slab test hole (PFE)</span></div>
        </div>
        <div class="sec-label">Radon test results <span class="muted">· 48 h CRM</span></div>
        <div class="readings">${PP.testPoints.map((t) => `<div class="rd"><span class="rd-id">${t.id}</span><span class="rd-room">${t.room}</span><span class="rd-val bad">${t.value} pCi/L</span></div>`).join("")}
          <div class="rd-note">${ic("info", 14)} EPA action level: 4.0 pCi/L</div></div>
        <div class="sec-label">Pressure field extension <span class="muted">· in. WC</span></div>
        <div class="readings">${PP.testHoles.map((t) => `<div class="rd"><span class="rd-id th">${t.id}</span><span class="rd-room">${t.room}</span><span class="rd-val ${t.value <= -0.004 ? "good" : ""}">${t.value.toFixed(3).replace("-", "−")}</span></div>`).join("")}</div>
      </div>`,
      footer: `<div class="cta-bar single"><button class="btn-primary block" data-action="ppTab" data-arg="pp-build">Next: design in Radon Builder ${ic("arrow", 18)}</button></div>`,
    };
  },

  "pp-build"(a) {
    const cc = complianceCounts(a.fixed), items = complianceItems(a.fixed);
    const bomTotal = CONFIG.bom.reduce((s, b) => s + b.cost, 0);
    const order = items.slice().sort((x, y) => ({ warn: 0, pass: 1, pending: 2 }[x.status] - { warn: 0, pass: 1, pending: 2 }[y.status]));
    return {
      html: `${ppHeader("pp-build")}
      <div class="pad">
        <div class="toolbar">
          <span class="tool">${ic("pointer", 18)}</span><span class="tool on">${ic("target", 18)}</span><span class="tool">${ic("pipe", 18)}</span>
          <span class="tool">${ic("fan", 18)}</span><span class="tool">${ic("ruler", 18)}</span><span class="tool">${ic("layers", 18)}</span>
          <span class="bom-chip">BOM · ${CONFIG.bom.length} items · ${money(bomTotal)}</span>
        </div>
        <div class="canvas-card">${planSVG({ mode: "build", fixed: a.fixed })}
          <div class="legend"><span><i class="lg-sp"></i>Suction point</span><span><i class="lg-pipe"></i>3" PVC</span><span><i class="lg-fan"></i>Fan</span><span><i class="lg-ex"></i>Exhaust</span></div>
        </div>
        <div class="comp">
          <div class="comp-head"><b>Compliance · ANSI/AARST SGM-SF</b>
            <span class="comp-sum"><span class="ok">${cc.pass} passed</span>${cc.warn ? `<span class="warn">${cc.warn} warning</span>` : ""}<span class="pend">${cc.pending} pending</span></span></div>
          ${order.map((c) => `
            <div class="ck ${c.status} ${c.wasFixed ? "fixed" : ""}">
              <span class="ck-ic">${c.status === "pass" ? ic("check", 14) : c.status === "warn" ? ic("alert", 14) : ic("clock", 14)}</span>
              <span class="ck-txt"><b>${c.label}</b><small>${c.detail}</small>
                ${c.status === "warn" ? `<button class="btn-warn" data-action="fixExhaust">Move exhaust above eave</button>` : ""}</span>
            </div>`).join("")}
        </div>
      </div>`,
      footer: `<div class="cta-bar single"><button class="btn-primary block" data-action="generate">Generate report ${ic("file", 18)}</button></div>`,
    };
  },

  "pp-report"(a) {
    if (a.generating) {
      return { html: `${ppHeader("pp-report")}<div class="gen"><span class="spin big"></span><b>Generating training report…</b><small>Adding plan, compliance results and bill of materials</small></div>` };
    }
    return {
      html: `${ppHeader("pp-report")}
      <div class="pad">
        <div class="rep-bar"><span class="pill-training">${ic("file", 13)} Training report</span><span class="muted">Page 1 of 4</span></div>
        <div class="rep-page">${scaled(reportDoc(a.fixed), 340, 420, 594)}</div>
        <div class="rep-dots"><i class="on"></i><i></i><i></i><i></i></div>
        <p class="fine center">Watermarked for training. Course practice reports can't be sent to clients.</p>
      </div>`,
      footer: `<div class="cta-bar"><button class="btn-secondary" data-action="noop">${ic("download", 17)} PDF</button><button class="btn-primary grow" data-action="openSubmit">Submit to course ${ic("arrow", 18)}</button></div>`,
    };
  },

  profile(a) {
    const row = (icon, label, extra = "") => `<div class="prof-row">${ic(icon, 20)}<span>${label}</span>${extra}${ic("chev-right", 18, "muted")}</div>`;
    return {
      html: `<div class="ph-head"><h1>My Account</h1></div>
      <div class="pad">
        <div class="prof-list">${row("edituser", "Edit Profile")}${row("lock", "Change Password")}${row("diamond", "My Subscription")}${row("gear", "Account Setting")}${row("privacy", "Privacy")}</div>
        <div class="sec-label">Learning <span class="new-inline">New</span></div>
        <div class="prof-list">${row("grad", "My courses & certificates")}${row("link", "Connected course providers", `<span class="conn-pill"><i></i>${P.name}</span>`)}</div>
        <div class="logout">${ic("logout", 20)} Log Out</div>
      </div>`,
      tab: "profile",
    };
  },

  /* --- Full-story only screens --- */
  lock() {
    return {
      theme: "lock",
      html: `<div class="lock"><div class="lock-date">Friday, November 6</div><div class="lock-time">3:40</div>
        <div class="lock-hint">${ic("qr", 18)} Open the Camera to scan</div></div>`,
    };
  },
  camera() {
    return {
      theme: "dark",
      html: `<div class="cam">
        <div class="cam-pill">${rsLogo(18)}<span><b>App Store</b> · Open “RadonSketch”</span></div>
        <div class="cam-view"><div class="cam-qr">${qrSVG(170)}</div><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></div>
        <div class="cam-modes"><span>SLO-MO</span><span>VIDEO</span><b>PHOTO</b><span>PORTRAIT</span></div>
        <div class="cam-shutter"><span></span></div></div>`,
    };
  },
  appstore() {
    return {
      theme: "white",
      html: `<div class="store">
        <div class="store-nav">${ic("chev-left", 20)} Search</div>
        <div class="store-app">${rsLogo(96)}<div><b>RadonSketch</b><small>Radon mitigation design & reports</small><span class="store-open">OPEN</span></div></div>
        <div class="store-stats"><div><b>4.8 ★</b><small>1.2K ratings</small></div><div><b>4+</b><small>Age</small></div><div><b>#12</b><small>Business</small></div><div><b>Free</b><small>In-app plans</small></div></div>
        <div class="store-ref">${ic("link", 14)} Opened from ${P.name} · course code ${CONFIG.courseCode}</div>
        <div class="store-shots">
          <div class="shot"><span>Diagnostic floor plans</span>${planSVG({ mode: "diag", mini: true })}</div>
          <div class="shot"><span>Live compliance checks</span>${planSVG({ mode: "build", fixed: true, mini: true })}</div>
          <div class="shot"><span>Professional reports</span><div class="shot-doc"></div></div>
        </div>
        <p class="body-p">Assess sites, design ANSI/AARST-compliant mitigation systems, build your bill of materials and send polished PDF reports — all from your phone.</p>
      </div>`,
    };
  },
  signin() {
    return {
      theme: "white",
      html: `<div class="signin">
        <div class="si-logo">${rsLogo(56)}<b>RadonSketch</b></div>
        <div class="si-link">${partnerLogo("xs")}<span><b>Linking your course</b><small>${FEATURED().title} · code ${CONFIG.courseCode}</small></span>${ic("link", 16)}</div>
        <label class="field"><span>Email</span><div>${CONFIG.learner.email}</div></label>
        <label class="field"><span>Password</span><div>••••••••••</div></label>
        <span class="btn-primary block">Sign in</span>
        <div class="si-or">or</div>
        <span class="btn-secondary block">Create a free account</span>
        <p class="fine center">Course practice projects are free for enrolled learners.</p>
      </div>`,
    };
  },
};

function ppHeader(tab) {
  const PP = CONFIG.practiceProject;
  return `<div class="pp-top">${backBtn()}<div class="pp-ttl"><b>${PP.name}</b><small>${PP.address}</small></div><span class="icon-btn">${ic("more", 20)}</span></div>
  <div class="pp-banner">${ic("grad", 16)}<span><b>Course practice project</b> · ${P.name}</span><span class="pill-training">Training</span></div>
  <div class="seg">
    <button class="${tab === "pp-diag" ? "on" : ""}" data-action="ppTab" data-arg="pp-diag">Diagnostic</button>
    <button class="${tab === "pp-build" ? "on" : ""}" data-action="ppTab" data-arg="pp-build">Radon Builder</button>
    <button class="${tab === "pp-report" ? "on" : ""}" data-action="ppTab" data-arg="pp-report">Report</button>
  </div>`;
}

const SHEETS = {
  checkout(a, enter) {
    const c = course(a.courseId), L = CONFIG.learner;
    const head = `<div class="ps-head">${partnerLogo("xs on-dark")}<div class="ps-ht"><b>${ic("lock", 13)} Secure checkout by ${P.name}</b><small>${P.portalDomain}</small></div>
      ${a.checkoutStep === "form" ? `<button class="ps-x" data-action="closeSheet" aria-label="Close">${ic("x", 18)}</button>` : ""}</div>`;
    if (a.checkoutStep === "done") {
      return `<div class="sheet partner-sheet ${enter}">${head}
        <div class="ps-body success">
          <span class="ok-circle">${ic("check", 34)}</span>
          <h3>You're enrolled</h3>
          <p><b>${c.title}</b></p>
          <p class="muted">Receipt sent to ${L.email}</p>
          <div class="ps-note">${ic("grad", 16)} Your course is now in RadonSketch under <b>Courses → My learning</b>.</div>
          <button class="btn-primary block" data-action="startCourse">Start course ${ic("arrow", 18)}</button>
        </div></div>`;
    }
    const paying = a.checkoutStep === "paying";
    return `<div class="sheet partner-sheet ${enter}">${head}
      <div class="ps-body">
        <div class="ps-label">Order summary</div>
        <div class="ps-order"><span class="ps-thumb">${thumbArt(c)}</span><span><b>${c.title}</b><small>${c.hours} CE hours · ${c.format} · ${c.access}</small></span></div>
        <div class="ps-rows"><div><span>Course fee</span><span>${money(c.price)}</span></div><div><span>Tax</span><span>$0.00</span></div><div class="tot"><span>Total</span><span>${money(c.price)}</span></div></div>
        <div class="ps-label">Payment method</div>
        <div class="ps-pay"><div class="on"><i class="radio on"></i>${ic("card", 18)}<span>${L.card}</span><small>Exp ${L.cardExp}</small></div><div><i class="radio"></i><span class="wallet">Pay</span><span>Digital wallet</span></div></div>
        <div class="ps-label">Learner</div>
        <div class="ps-learner"><span class="avatar sm">${L.initials}</span><span><b>${L.name}</b><small>${L.email}</small></span></div>
        <button class="btn-partner block" data-action="pay">${paying ? `<span class="spin"></span> Processing…` : `${ic("lock", 16)} Pay ${money(c.price)}`}</button>
        <p class="ps-fine">You're buying from ${P.name}. RadonSketch doesn't see or store your card details. Refunds follow the course provider's policy.</p>
      </div></div>`;
  },

  submit(a, enter) {
    const c = FEATURED(), cc = complianceCounts(a.fixed);
    if (a.submitStep === "done") {
      if (a.submitChoice === "pdf") {
        return `<div class="sheet ${enter}"><div class="grabber"></div><div class="sh-body success">
          <span class="ok-circle">${ic("download", 30)}</span><h3>PDF saved to Files</h3>
          <div class="file-row">${ic("file", 20)}<span><b>Training-report_Prairie-View.pdf</b><small>4 pages · 1.8 MB</small></span></div>
          <p class="muted">Next: upload it in <b>Lesson 3</b> on the ${P.name} portal.</p>
          <button class="btn-primary block" data-action="backToCourse">Back to course</button></div></div>`;
      }
      return `<div class="sheet ${enter}"><div class="grabber"></div><div class="sh-body success">
        <span class="ok-circle">${ic("check", 34)}</span>
        <h3>Submitted to ${P.name}</h3><p class="muted">Your instructor will review it.</p>
        <div class="sum-rows">
          <div><span>Report</span><b>Training report · 4 pages</b></div>
          <div><span>Auto-checks</span><b>${cc.pass} of ${cc.total} passed${cc.pending ? ` · ${cc.pending} pending` : ""}</b></div>
          <div><span>Submitted</span><b>${CONFIG.submittedAt}</b></div>
        </div>
        <button class="btn-primary block" data-action="backToCourse">Back to course</button></div></div>`;
    }
    const sending = a.submitStep === "sending", ch = a.submitChoice;
    return `<div class="sheet ${enter}"><div class="grabber"></div>
      <div class="sh-head"><h3>Submit to course</h3><button class="ps-x dark" data-action="closeSheet" aria-label="Close">${ic("x", 18)}</button></div>
      <div class="sh-body">
        <div class="sh-course">${ic("grad", 20)}<span><b>${c.title}</b><small>Lesson 3 · Practice Lab · ${P.name}</small></span></div>
        <button class="opt ${ch === "sync" ? "on" : ""}" data-action="chooseSubmit" data-arg="sync">
          <i class="radio ${ch === "sync" ? "on" : ""}"></i>
          <span><b>Sync to my course automatically <em class="rec">Recommended</em></b>
          <small>Sends your report, design and compliance results straight to your course.</small>
          <span class="conn-pill"><i></i>Connected to ${P.name}</span></span></button>
        <button class="opt ${ch === "pdf" ? "on" : ""}" data-action="chooseSubmit" data-arg="pdf">
          <i class="radio ${ch === "pdf" ? "on" : ""}"></i>
          <span><b>Download PDF to upload myself</b><small>Save the training report and upload it on the course portal.</small></span></button>
        <button class="btn-primary block" data-action="doSubmit">${sending ? `<span class="spin light"></span> ${ch === "sync" ? "Syncing to course…" : "Preparing PDF…"}` : ch === "sync" ? `${ic("sync", 17)} Submit to ${P.name}` : `${ic("download", 17)} Download PDF`}</button>
      </div></div>`;
  },
};

function renderApp(a) {
  const scr = SCREENS[a.screen](a);
  const enter = a.screen !== LAST.phone ? "enter" : "";
  LAST.phone = a.screen;
  const sheetEnter = a.sheet && a.sheet !== LAST.sheet ? "enter" : "";
  LAST.sheet = a.sheet;
  const dismissable = (a.sheet === "checkout" && a.checkoutStep === "form") || (a.sheet === "submit" && a.submitStep === "choose");
  return `<div class="phone-screen th-${scr.theme || "cream"}">
    ${statusbar()}
    <div class="app-body ${enter}" data-scroll="app-${a.screen}">${scr.html}</div>
    ${scr.footer ? `<div class="app-footer">${scr.footer}</div>` : ""}
    ${scr.tab ? tabbar(scr.tab, a) : ""}
    ${a.sheet ? `<div class="scrim ${sheetEnter}" ${dismissable ? 'data-action="closeSheet"' : ""}></div>${SHEETS[a.sheet](a, sheetEnter)}` : ""}
    ${a.toast ? `<div class="app-toast">${ic("check", 16)}<span>${a.toast}</span></div>` : ""}
    <div class="home-ind"></div>
  </div>`;
}
function phoneFrame(inner, scale) {
  return `<div class="phone-wrap" style="width:${414 * scale}px;height:${868 * scale}px"><div class="phone" style="transform:scale(${scale})">${inner}<div class="island"></div></div></div>`;
}

/* ===========================================================================
   Browser (partner portal)
   =========================================================================== */
function browserFrame(inner, w, h, naturalW, path) {
  const vh = h - 46, s = w / naturalW;
  return `<div class="browser" style="width:${w}px;height:${h}px">
    <div class="br-bar"><span class="br-dots"><i></i><i></i><i></i></span><span class="br-nav">${ic("arrow-left", 15)}${ic("arrow", 15)}${ic("refresh", 14)}</span>
      <span class="br-url">${ic("lock", 12)}<b>${P.portalDomain}</b>${path}</span><span class="br-end">${ic("more", 16)}</span></div>
    <div class="br-view" style="height:${vh}px"><div class="br-scale" style="width:${naturalW}px;height:${vh / s}px;transform:scale(${s})">${inner}</div></div>
  </div>`;
}

function portalLessonStatus(p, id) {
  const approved = p.submission === "approved";
  if (id === "l1" || id === "l2") return "done";
  if (id === "l3") return approved ? "done" : ["synced", "uploaded"].includes(p.submission) ? "review" : "current";
  return approved ? "open" : "locked";
}

function renderPortal(p) {
  const key = p.view + ":" + p.lesson;
  const enter = key !== LAST.portal ? "enter" : "";
  LAST.portal = key;
  const L = CONFIG.learner, I = CONFIG.instructor;
  const learner = p.view === "learner";
  const nav = learner ? ["Catalog", "My learning", "Certificates", "Help"] : ["Dashboard", "Courses", "Submissions", "Reports"];
  const on = learner ? "My learning" : "Submissions";
  return `<div class="portal" data-scroll="portal-${p.view}">
    <header class="p-head">
      <div class="p-brand">${partnerLogo()}<span class="p-name">${P.name}</span></div>
      <nav class="p-nav">${nav.map((n) => `<span class="${n === on ? "on" : ""}">${n}</span>`).join("")}</nav>
      <div class="p-right">${ic("search", 18)}${ic("bell", 18)}<span class="p-avatar">${learner ? L.initials : I.initials}</span><span class="p-uname">${learner ? L.name : I.name}<small>${learner ? "Learner" : "Instructor"}</small></span></div>
    </header>
    <div class="p-page ${enter}">${learner ? portalLearner(p) : portalInstructor(p)}</div>
    ${p.toast ? `<div class="p-toast">${ic("check", 16)} ${p.toast}</div>` : ""}
  </div>`;
}

function portalLearner(p) {
  const c = FEATURED();
  const doneCount = ["l1", "l2", "l3", "l4"].filter((l) => portalLessonStatus(p, l) === "done").length;
  const pct = Math.round((doneCount / 4) * 100);
  const stIcon = { done: ic("check", 14), review: ic("clock", 14), current: "", locked: ic("lock", 13), open: "" };
  const stText = { done: "Complete", review: "In review", current: "In progress", locked: "Locked", open: "Unlocked" };
  return `<div class="p-course-head" data-anchor="top">
      <div class="p-crumb">My learning <span>›</span> ${c.title}</div>
      <div class="p-ch-row">
        <div><h1>${c.title}</h1>
          <div class="p-ch-meta"><span class="p-badge">${ic("shield", 13)} NRPP-approved</span><span>${c.hours} CE hours</span><span>·</span><span>${c.format}</span><span>·</span><span>Instructor: ${CONFIG.instructor.name}</span></div></div>
        <div class="p-progress"><div class="p-prog-label"><span>Course progress</span><b>${pct}%</b></div><div class="p-bar"><i style="width:${pct}%"></i></div><small>${doneCount} of 4 lessons complete</small></div>
      </div>
    </div>
    <div class="p-body">
      <aside class="p-side">
        <div class="p-side-title">Course content</div>
        ${c.lessons.map((l, i) => {
          const st = portalLessonStatus(p, l.id);
          return `<button class="p-lesson pst-${st} ${p.lesson === l.id ? "sel" : ""}" data-action="pLesson" data-arg="${l.id}">
            <span class="p-l-st">${stIcon[st] || `<i>${i + 1}</i>`}</span>
            <span class="p-l-txt"><small>Lesson ${i + 1} · ${TYPE_LABEL[l.type]}</small><b>${l.type === "lab" ? "Practice Lab: Design a mitigation system in RadonSketch" : l.title}</b><em>${stText[st]}</em></span>
          </button>`;
        }).join("")}
        <div class="p-help">${ic("message", 16)}<span>Questions? <u>Message your instructor</u></span></div>
      </aside>
      <main class="p-main">${portalLessonContent(p)}</main>
    </div>`;
}

function portalLessonContent(p) {
  const c = FEATURED(), PP = CONFIG.practiceProject;
  if (p.lesson === "l1") {
    return `<div class="p-kicker">Lesson 1 · Video series</div><h2>${c.lessons[0].title}</h2>
      <div class="p-video"><span class="p-play">${ic("play", 30)}</span><span class="p-vcap">Part 1 of 14 · Why radon matters</span></div>
      <div class="p-done-line">${ic("check", 16)} Completed · 14 of 14 videos watched</div>`;
  }
  if (p.lesson === "l2") {
    return `<div class="p-kicker">Lesson 2 · Quiz</div><h2>${c.lessons[1].title}</h2>
      <div class="p-card p-score"><div class="p-score-big">${CONFIG.quiz.score}</div><div><b>Passed · 90%</b><small>Completed Nov 4 · passing score 70%</small></div></div>`;
  }
  if (p.lesson === "l4") {
    const open = p.submission === "approved";
    return `<div class="p-kicker">Lesson 4 · Exam</div><h2>Final exam</h2>
      ${open ? `<div class="p-card p-exam"><div><b>50 questions · 90 minutes · 70% to pass</b><small>Unlocked after your Practice Lab was approved.</small></div><button class="p-btn" data-action="noop">Start final exam</button></div>`
        : `<div class="p-card p-locked">${ic("lock", 26)}<div><b>Locked</b><small>Complete the Practice Lab and get it approved to unlock the final exam.</small></div></div>`}`;
  }
  return `<div class="p-lab">
    <div class="p-kicker">Lesson 3 · Practice Lab <span class="p-powered">${rsLogo(16)} Powered by RadonSketch</span></div>
    <h2>Practice Lab: Design a mitigation system in RadonSketch</h2>
    <p class="p-lead">Apply what you learned in Lessons 1–2 to a realistic sample home. You'll work in the RadonSketch mobile app, then submit your design report here.</p>
    <div class="p-lab-grid">
      <div class="p-lab-left">
        <div class="p-card"><h4>What you'll practise</h4><ul class="p-ul">${PP.practise.map((x) => `<li>${ic("check", 15)}${x}</li>`).join("")}</ul>
          <div class="p-est">${ic("clock", 16)} Estimated time: <b>45 minutes</b> · graded by your instructor</div></div>
        <div class="p-card"><h4>How it works</h4>
          <ol class="p-steps">
            <li><i>1</i><div><b>Download RadonSketch</b><small>Scan the QR code or use the store buttons. Free for enrolled learners.</small></div></li>
            <li><i>2</i><div><b>Sign in</b><small>Use ${CONFIG.learner.email} so your course links automatically.</small></div></li>
            <li><i>3</i><div><b>Open your course project</b><small>Find “${PP.name}” under Courses, complete the design and submit your report.</small></div></li>
          </ol></div>
        <div class="p-note">${ic("info", 17)}<span><b>Already use RadonSketch?</b> Your practice project is waiting under <b>Courses</b>.</span></div>
      </div>
      <div class="p-qr-card ${p.qrPulse ? "pulse" : ""}" data-anchor="qr">
        <div class="p-qr-title">Scan to get RadonSketch</div>
        <div class="p-qr">${qrSVG(196)}</div>
        <div class="p-stores"><span class="store-btn">${ic("download", 15)}<span><small>Download on the</small>App Store</span></span><span class="store-btn">${ic("play", 14)}<span><small>Get it on</small>Google Play</span></span></div>
        <div class="p-or"><span>or enter this code in the app</span></div>
        <div class="p-code"><span>Course code:</span><b>${CONFIG.courseCode}</b>${ic("copy", 15)}</div>
      </div>
    </div>
    ${portalSubmission(p)}
  </div>`;
}

function portalSubmission(p) {
  const cc = complianceCounts(true), L = CONFIG.learner, I = CONFIG.instructor;
  const sw = (id, label, match) => `<button class="${match.includes(p.submission) ? "on" : ""}" data-action="pState" data-arg="${id}">${label}</button>`;
  const segs = complianceItems(true).map((c) => `<i class="${c.status}"></i>`).join("");
  const checks = `<div class="p-checks"><div class="p-checks-head"><b>Auto-check summary from RadonSketch</b><span>${cc.pass} of ${cc.total} compliance checks passed</span></div>
    <div class="p-seg">${segs}</div>
    <ul><li class="pass">${ic("check", 13)} Suction point, pipe size & slope, fan location</li><li class="pass">${ic("check", 13)} Exhaust ≥ 10 ft from openings <em>(fixed by learner)</em></li><li class="pending">${ic("clock", 13)} Post-mitigation test — pending field verification</li></ul></div>`;
  let body = "";
  if (p.submission === "waiting") {
    body = `<div class="p-wait">
      <span class="p-wait-ic">${ic("hourglass", 26)}</span>
      <div><b>Waiting for your submission</b><small>When you submit from RadonSketch, your report and auto-check results appear here automatically.</small>
      <div class="p-conn ${p.connected ? "on" : ""}">${p.connected ? `<i></i>RadonSketch connected · ${L.email}` : `${ic("phone", 14)} RadonSketch not connected yet — scan the QR code above to start`}</div></div>
      <button class="p-link" data-action="pState" data-arg="manual">Prefer to upload a PDF?</button>
    </div>`;
  } else if (p.submission === "synced" || p.submission === "approved") {
    const approved = p.submission === "approved";
    body = `<div class="p-sub-grid">
      <div class="p-thumb">${scaled(reportDoc(true), 168, 420, 594)}</div>
      <div class="p-sub-info">
        <div class="p-status ${approved ? "ok" : "sub"}">${ic("check", 15)} ${approved ? `Approved by ${I.name}` : "Submitted"}</div>
        <div class="p-sync-line">${rsLogo(16)} Synced automatically from RadonSketch · ${CONFIG.submittedAt}</div>
        <div class="p-file">${ic("file", 16)} Training report — ${CONFIG.practiceProject.name}.pdf <span>· 4 pages</span></div>
        ${checks}
        ${approved
          ? `<div class="p-feedback"><span class="p-avatar sm">${I.initials}</span><div><b>${I.name}</b><p>“${I.feedback}”</p></div></div>
             <div class="p-actions"><button class="p-btn" data-action="pLesson" data-arg="l4">Lesson 4 unlocked — start final exam ${ic("arrow", 15)}</button></div>`
          : `<div class="p-review-line">${ic("clock", 15)} Awaiting instructor review · usually within 2 business days</div>
             <div class="p-actions"><button class="p-btn ghost" data-action="noop">${ic("eye", 15)} View report</button><button class="p-btn ghost" data-action="noop">Withdraw</button></div>`}
      </div></div>`;
  } else if (p.submission === "manual") {
    const up = p.upload === "uploading";
    body = `<div class="p-drop ${up ? "busy" : ""}" data-action="pUpload">
      ${ic("upload", 30)}<b>Upload your RadonSketch report (PDF)</b>
      <small>Drag and drop here, or <u>browse files</u> · PDF up to 20 MB</small>
      ${up ? `<div class="p-upbar"><i></i></div><small>Uploading Training-report_Prairie-View.pdf…</small>` : ""}
    </div>
    <div class="p-hint">${ic("info", 15)} Tip: submitting from the app syncs automatically and includes auto-check results.</div>`;
  } else if (p.submission === "uploaded") {
    body = `<div class="p-sub-grid">
      <div class="p-thumb">${scaled(reportDoc(true), 168, 420, 594)}</div>
      <div class="p-sub-info">
        <div class="p-status sub">${ic("check", 15)} Submitted</div>
        <div class="p-sync-line">${ic("upload", 15)} Uploaded manually · ${CONFIG.uploadedAt}</div>
        <div class="p-file">${ic("file", 16)} Training-report_Prairie-View.pdf <span>· 1.8 MB</span></div>
        <div class="p-hint warn">${ic("info", 15)} Auto-check results aren't available for manual uploads. Your instructor will review the PDF.</div>
        <div class="p-review-line">${ic("clock", 15)} Awaiting instructor review</div>
      </div></div>`;
  }
  return `<section class="p-sub" data-anchor="submission">
    <div class="p-sub-head"><h3>Your submission</h3>
      <div class="demo-switch"><span>Demo state</span>${sw("waiting", "Waiting", ["waiting"])}${sw("synced", "Synced", ["synced", "approved"])}${sw("manual", "Manual upload", ["manual", "uploaded"])}</div></div>
    ${body}
  </section>`;
}

function portalInstructor(p) {
  const rows = CONFIG.reviewQueue.map((r) => ({ ...r, status: p.reviews[r.id] || (r.id === "r1" && p.submission === "approved" ? "approved" : r.status) }));
  const sel = rows.find((r) => r.id === p.selected) || rows[0];
  const stLabel = { review: "Needs review", approved: "Approved", changes: "Changes requested" };
  const review = rows.filter((r) => r.status === "review").length;
  const checksFor = (r) => {
    if (r.source === "pdf") return `<div class="i-nochecks">${ic("info", 15)} Manual PDF upload — no auto-check data. Review the PDF directly.</div>`;
    const items = r.id === "r1" ? complianceItems(true) : CONFIG.compliance.map((c, i) => ({ ...c, status: c.status === "pending" ? "pending" : i < r.passed ? "pass" : "warn", detail: "" }));
    return `<ul class="i-checks">${items.map((c) => `<li class="${c.status}">${c.status === "pass" ? ic("check", 13) : c.status === "warn" ? ic("alert", 13) : ic("clock", 13)}<span>${c.label}</span></li>`).join("")}</ul>`;
  };
  return `<div class="p-course-head">
      <div class="p-crumb">Instructor <span>›</span> ${FEATURED().title} <span>›</span> Lesson 3</div>
      <div class="p-ch-row"><div><h1>Practice Lab submissions</h1><div class="p-ch-meta"><span class="p-badge">${rsLogo(14)} Auto-checks by RadonSketch</span><span>Lesson 3 · Design a mitigation system</span></div></div></div>
    </div>
    <div class="i-wrap">
      <div class="i-grid">
      <div class="i-leftcol">
      <div class="i-stats">
        <div><b>${rows.length + 7}</b><small>Submissions this month</small></div><div><b>${review}</b><small>Awaiting your review</small></div>
        <div><b>8.1 / 9</b><small>Average compliance score</small></div><div><b>83%</b><small>Synced from RadonSketch</small></div>
      </div>
        <div class="i-table">
          <div class="i-tr i-th"><span>Learner</span><span>Submitted</span><span>Source</span><span>Auto-checks</span><span>Status</span></div>
          ${rows.map((r) => `<button class="i-tr ${r.id === sel.id ? "sel" : ""}" data-action="pSelect" data-arg="${r.id}">
            <span class="i-name"><span class="p-avatar sm">${r.name.split(" ").map((x) => x[0]).join("")}</span>${r.name}</span>
            <span>${r.when}</span>
            <span>${r.source === "sync" ? `<em class="src sync">${rsLogo(13)} Synced</em>` : `<em class="src pdf">${ic("upload", 13)} Manual PDF</em>`}</span>
            <span>${r.passed == null ? `<span class="muted">—</span>` : `<b class="sc ${r.passed >= 8 ? "good" : r.passed >= 7 ? "mid" : "low"}">${r.passed} / 9</b>`}</span>
            <span><em class="rv-st ${r.status}">${stLabel[r.status]}</em></span>
          </button>`).join("")}
        </div>
      </div>
        <div class="i-detail">
          <div class="i-d-head"><span class="p-avatar">${sel.name.split(" ").map((x) => x[0]).join("")}</span><div><b>${sel.name}</b><small>${sel.when} · ${sel.source === "sync" ? "synced from RadonSketch" : "manual PDF upload"}</small></div><em class="rv-st ${sel.status}">${stLabel[sel.status]}</em></div>
          <div class="i-d-body">
            <div class="i-prev">${scaled(reportDoc(true), 150, 420, 594)}</div>
            <div class="i-d-checks"><b>Auto-check results</b>${checksFor(sel)}</div>
          </div>
          <textarea class="i-fb" placeholder="Feedback for the learner (optional)">${sel.status === "approved" && sel.id === "r1" ? CONFIG.instructor.feedback : ""}</textarea>
          <div class="i-acts">
            <button class="p-btn ghost" data-action="pRequest">Request changes</button>
            <button class="p-btn" data-action="pApprove">${ic("check", 15)} Approve</button>
          </div>
          <p class="i-fine">Approving marks Lesson 3 complete and unlocks Lesson 4 (Final exam) for the learner.</p>
        </div>
      </div>
    </div>`;
}

/* ===========================================================================
   Layouts
   =========================================================================== */
function topbar(title, sub, right = "") {
  return `<div class="topbar">
    <button class="tb-back" data-action="hub">${ic("chev-left", 16)} Demo hub</button>
    <div class="tb-title"><span class="tb-logos">${rsLogo(24)}<span class="tb-x">×</span>${partnerLogo("xs")}</span><span><b>${title}</b><small>${sub}</small></span></div>
    <div class="tb-right">${right}</div>
  </div>`;
}

function renderHub() {
  return `<div class="hub">
    <div class="hub-eyebrow">${rsLogo(26)} <span>×</span> ${partnerLogo("xs")} <em>Partnership prototype</em></div>
    <h1>RadonSketch × ${P.name} — Partnership Prototype</h1>
    <p class="hub-sub">Partner courses inside the app, and the app inside partner courses: two ways to grow, one connected learning experience.</p>
    <div class="hub-diagram">
      <div class="hd-node rs">
        <div class="hd-logo">${rsLogo(44)}</div><b>RadonSketch</b><small>Mobile app for radon mitigation professionals</small>
        <ul><li>Site assessment & Diagnostic</li><li>Radon Builder + live compliance</li><li>BOM & PDF reports</li></ul>
      </div>
      <div class="hd-flows">
        <div class="hd-flow f1"><span class="hd-num">1</span><div><b>RadonSketch users → partner courses</b><small>A Courses tab in the app: browse, buy and take NRPP-approved courses</small></div><svg viewBox="0 0 300 24" class="hd-arrow"><path d="M4 12h284"/><path d="m280 4 10 8-10 8"/></svg></div>
        <div class="hd-mid">${ic("sync", 18)} Shared practice projects & report sync</div>
        <div class="hd-flow f2"><svg viewBox="0 0 300 24" class="hd-arrow"><path d="M296 12H12"/><path d="m20 4-10 8 10 8"/></svg><span class="hd-num">2</span><div><b>Partner learners → RadonSketch</b><small>Practice Lab steps introduce the app via QR code and a ready-made project</small></div></div>
      </div>
      <div class="hd-node partner">
        <div class="hd-logo">${partnerLogo()}</div><b>${P.name}</b><small>NRPP-approved online radon courses</small>
        <ul><li>Measurement & Mitigation</li><li>Continuing Education</li><li>Exam Prep</li></ul>
      </div>
    </div>
    <div class="hub-cards">
      <button class="hub-card" data-action="mode" data-arg="flowA"><span class="hc-ic rs">${ic("phone", 26)}</span><span class="hc-tag">Flow A · Phone</span><b>Courses inside the RadonSketch app</b><small>Browse, buy and take partner courses in the app, including the Practice Lab, report and submission.</small><span class="hc-go">Open ${ic("arrow", 16)}</span></button>
      <button class="hub-card" data-action="mode" data-arg="flowB"><span class="hc-ic partner">${ic("monitor", 26)}</span><span class="hc-tag">Flow B · Web</span><b>Practice Lab on the partner's course portal</b><small>QR code and course code, submission states, and instructor review with auto-checks.</small><span class="hc-go">Open ${ic("arrow", 16)}</span></button>
      <button class="hub-card feature" data-action="mode" data-arg="story"><span class="hc-ic both">${ic("split", 26)}</span><span class="hc-tag">Presenter mode · ${STORY.length} steps</span><b>Full story — both flows side by side</b><small>Portal and phone update together, one step at a time, with a caption for each step.</small><span class="hc-go">Start ${ic("arrow", 16)}</span></button>
    </div>
    <p class="hub-tip">Tips: In Full story, use ← → to move between steps. Press Esc to return to this hub at any time.</p>
  </div>`;
}

function renderFlowA() {
  const a = S.app, cur = currentAKey(a), note = NOTES[cur] || NOTES.projects;
  return `${topbar("Flow A · Courses inside the RadonSketch app", "RadonSketch mobile app · iOS / Android", `<button class="tb-btn" data-action="reset">${ic("refresh", 15)} Reset flow</button>`)}
  <aside class="fa-left panel">
    <div class="panel-title">Screens</div>
    ${A_JUMPS.map((j) => `<button class="jump ${cur === j.key ? "on" : ""}" data-action="aJump" data-arg="${j.key}"><em>${j.tag}</em><span>${j.label}</span></button>`).join("")}
  </aside>
  <div class="fa-phone frame">${phoneFrame(renderApp(a), 0.92)}</div>
  <aside class="fa-right panel">
    <div class="panel-title">Presenter notes</div>
    <h3>${note.title}</h3>
    <ul>${note.points.map((x) => `<li>${x}</li>`).join("")}</ul>
    <div class="panel-hint">${ic("pointer", 15)} Click inside the phone to move through the app. Use the list on the left to jump to any screen.</div>
  </aside>`;
}

function renderFlowB() {
  const p = S.portal;
  const right = `<div class="seg-tb"><button class="${p.view === "learner" ? "on" : ""}" data-action="pView" data-arg="learner">${ic("user", 15)} Learner view</button><button class="${p.view === "instructor" ? "on" : ""}" data-action="pView" data-arg="instructor">${ic("users", 15)} Instructor view</button></div>
    <button class="tb-btn" data-action="reset">${ic("refresh", 15)} Reset</button>`;
  const path = p.view === "learner" ? P.portalPath : "/instructor/submissions/lesson-3";
  return `${topbar("Flow B · Practice Lab on the partner's course portal", "Partner learning portal · desktop web", right)}
    <div class="fb-browser frame">${browserFrame(renderPortal(p), 1376, 774, 1376, path)}</div>`;
}

function renderStory() {
  const n = S.story.step, st = STORY[n];
  const dimP = st.focus === "app" ? "is-dim" : "", dimA = st.focus === "portal" ? "is-dim" : "";
  return `${topbar("Full story · both flows side by side", "Partner portal (web) + RadonSketch (phone)", `<button class="tb-btn" data-action="reset">${ic("refresh", 15)} Reset demo</button>`)}
    <div class="st-lbl b">${ic("monitor", 15)} ${P.name} · course portal (web)</div>
    <div class="st-lbl a">${ic("phone", 15)} RadonSketch app</div>
    <div class="st-browser frame ${dimP}">${browserFrame(renderPortal(S.portal), 940, 612, 1280, P.portalPath)}</div>
    <div class="st-phone frame ${dimA}">${phoneFrame(renderApp(S.app), 0.705)}</div>
    <div class="st-caption">
      <div class="st-text">
        <div class="st-count">Step ${n + 1} of ${STORY.length}</div>
        <div class="st-title">${st.title}</div>
        <div class="st-cap">${st.caption}</div>
      </div>
      <div class="st-side">
        <div class="st-ctrls">
          <button class="btn-ghost" data-action="prev" ${n === 0 ? "disabled" : ""}>${ic("arrow-left", 16)} Back</button>
          <button class="btn-next" data-action="next" ${n === STORY.length - 1 ? "disabled" : ""}>${n === STORY.length - 1 ? "Journey complete" : "Next step"} ${ic("arrow", 16)}</button>
        </div>
        <div class="st-dots">${STORY.map((s, i) => `<button class="${i === n ? "on" : i < n ? "past" : ""}" data-action="jump" data-arg="${i}" title="${s.title}"></button>`).join("")}</div>
      </div>
    </div>`;
}

/* ===========================================================================
   Render loop
   =========================================================================== */
function render() {
  const root = document.getElementById("stage");
  const scrolls = {};
  root.querySelectorAll("[data-scroll]").forEach((el) => (scrolls[el.dataset.scroll] = el.scrollTop));
  let html = "";
  if (S.mode === "hub") html = renderHub();
  else if (S.mode === "flowA") html = renderFlowA();
  else if (S.mode === "flowB") html = renderFlowB();
  else html = renderStory();
  root.className = "mode-" + S.mode;
  root.innerHTML = html + `<div class="proto-label">Prototype · sample data</div>`;
  root.querySelectorAll("[data-scroll]").forEach((el) => { if (scrolls[el.dataset.scroll] != null) el.scrollTop = scrolls[el.dataset.scroll]; });
  afterRender(root);
}

function afterRender(root) {
  // Video playback simulation
  const playing = S.mode === "flowA" && S.app.screen === "video" && S.app.video.playing;
  if (playing && !vidTimer) {
    vidTimer = setInterval(() => {
      const v = S.app.video; v.t = Math.min(768, v.t + 3);
      const f = document.getElementById("vidFill"), t = document.getElementById("vidTime");
      const fm = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
      if (f) f.style.width = (v.t / 768) * 100 + "%";
      if (t) t.textContent = fm(v.t) + " / 12:48";
      if (v.t >= 768) { v.playing = false; render(); }
    }, 120);
  } else if (!playing && vidTimer) { clearInterval(vidTimer); vidTimer = null; }

  // Story: scroll the portal to the part that matters for this step
  if (S.mode === "story" && LAST.story !== S.story.step) {
    LAST.story = S.story.step;
    const anchor = STORY[S.story.step].scroll;
    const sc = root.querySelector(".st-browser .portal");
    const el = sc && root.querySelector(`.st-browser [data-anchor="${anchor}"]`);
    if (sc && el) {
      const scale = 940 / 1280 * (root.getBoundingClientRect().width / 1440);
      const top = (el.getBoundingClientRect().top - sc.getBoundingClientRect().top) / scale + sc.scrollTop - 16;
      sc.scrollTo({ top: anchor === "top" ? 0 : top, behavior: "smooth" });
    }
  }
}

function later(ms, fn) {
  const e = EPOCH;
  setTimeout(() => { if (e !== EPOCH) return; fn(); render(); }, ms);
}
function toast(msg) {
  S.app.toast = msg;
  clearTimeout(toastTimer);
  const e = EPOCH;
  toastTimer = setTimeout(() => { if (e !== EPOCH) return; S.app.toast = null; render(); }, 2400);
}
function portalToast(msg) {
  S.portal.toast = msg;
  const e = EPOCH;
  setTimeout(() => { if (e !== EPOCH) return; S.portal.toast = null; render(); }, 2800);
}
function go(screen) { const a = S.app; a.history.push(a.screen); a.screen = screen; a.sheet = null; }
function back() { const a = S.app; a.video.playing = false; a.screen = a.history.pop() || "projects"; a.sheet = null; }
function markDone(cid, lid) { S.app.done[doneKey(cid, lid)] = true; }
function openMode(m) {
  EPOCH++; LAST.phone = LAST.sheet = LAST.portal = null; LAST.story = -1;
  S = m === "story" ? storyState(0) : freshState(m);
}

/* ===========================================================================
   Actions (data-action="…" on any element)
   =========================================================================== */
const ACTIONS = {
  noop() {},
  mode: (m) => openMode(m),
  hub() { EPOCH++; S = freshState("hub"); },
  reset() { openMode(S.mode); },

  // app navigation
  tab(t) { const a = S.app; a.screen = t; a.history = []; a.sheet = null; if (t === "courses") a.coursesSeen = true; },
  back,
  openCourse(id) { S.app.courseId = id; go("course"); },
  openPlayer(id) { S.app.courseId = id; go("player"); },
  cat(c) { S.app.category = c; },
  openPracticeCard() { S.app.lessonId = "l3"; S.app.courseId = CONFIG.featuredCourseId; go("pp-diag"); },

  // checkout
  enroll() { const a = S.app; a.sheet = "checkout"; a.checkoutStep = "form"; },
  closeSheet() { S.app.sheet = null; },
  pay() {
    const a = S.app; if (a.checkoutStep !== "form") return;
    a.checkoutStep = "paying";
    later(1000, () => { a.checkoutStep = "done"; a.enrolled[a.courseId] = true; });
  },
  startCourse() { const a = S.app; a.sheet = null; a.history = ["courses"]; a.screen = "player"; },

  // lessons
  openLesson(id) {
    const a = S.app, l = course(a.courseId).lessons.find((x) => x.id === id);
    a.lessonId = id;
    if (l.type === "video") { a.video = { playing: false, t: 0 }; go("video"); }
    else if (l.type === "quiz") { a.quiz = { picked: null, checked: false }; go("quiz"); }
    else if (l.type === "lab") go("lab");
    else toast("Final exam — not part of this prototype");
  },
  togglePlay() { S.app.video.playing = !S.app.video.playing; },
  completeLesson() { const a = S.app; markDone(a.courseId, a.lessonId); back(); toast("Lesson complete"); },
  quizPick(i) { const q = S.app.quiz; if (!q.checked) q.picked = +i; },
  quizCheck() { const q = S.app.quiz; if (q.picked != null) q.checked = true; },
  quizRetry() { S.app.quiz = { picked: null, checked: false }; },
  quizDone() { const a = S.app; markDone(a.courseId, a.lessonId); back(); toast(`Knowledge check passed · ${CONFIG.quiz.score}`); },

  // practice project
  openPractice() { S.app.practiceReady = true; go("pp-diag"); },
  ppTab(scr) {
    const a = S.app; a.screen = scr;
    if (scr === "pp-report") { a.generating = true; later(800, () => (a.generating = false)); }
  },
  fixExhaust() { S.app.fixed = true; toast("Exhaust moved: 23 ft from nearest opening"); },
  generate() { const a = S.app; go("pp-report"); a.generating = true; later(800, () => (a.generating = false)); },
  openSubmit() { const a = S.app; a.sheet = "submit"; a.submitStep = "choose"; },
  chooseSubmit(o) { if (S.app.submitStep === "choose") S.app.submitChoice = o; },
  doSubmit() {
    const a = S.app; if (a.submitStep !== "choose") return;
    a.submitStep = "sending";
    later(1100, () => { a.submitStep = "done"; if (a.submitChoice === "sync") S.portal.submission = "synced"; });
  },
  backToCourse() {
    const a = S.app, fid = CONFIG.featuredCourseId;
    a.sheet = null; a.courseId = fid; a.screen = "player"; a.history = ["courses"];
    if (a.submitChoice === "sync") { markDone(fid, "l3"); a.labState = "submitted"; toast("Lesson 3 marked complete"); }
    else { a.labState = "pdf"; toast("Upload your PDF on the course portal"); }
  },

  // Flow A jump list
  aJump(key) {
    const j = A_JUMPS.find((x) => x.key === key);
    EPOCH++; S.app = freshApp(); LAST.phone = LAST.sheet = null; j.set(S.app);
  },

  // portal
  pLesson(id) { S.portal.lesson = id; },
  pView(v) { S.portal.view = v; },
  pState(s) { S.portal.submission = s; S.portal.upload = "idle"; S.portal.lesson = "l3"; },
  pUpload() {
    const p = S.portal; if (p.upload !== "idle") return;
    p.upload = "uploading";
    later(1400, () => { p.upload = "idle"; p.submission = "uploaded"; });
  },
  pSelect(id) { S.portal.selected = id; },
  pApprove() {
    const p = S.portal; p.reviews[p.selected] = "approved";
    const r = CONFIG.reviewQueue.find((x) => x.id === p.selected);
    if (p.selected === "r1") { p.submission = "approved"; S.app.approved = true; }
    portalToast(`Approved · Lesson 4 unlocked for ${r.name}`);
  },
  pRequest() {
    const p = S.portal; p.reviews[p.selected] = "changes";
    if (p.selected === "r1" && p.submission === "approved") p.submission = "synced";
    const r = CONFIG.reviewQueue.find((x) => x.id === p.selected);
    portalToast(`Changes requested · ${r.name} has been notified`);
  },

  // story
  next() { if (S.story.step < STORY.length - 1) { EPOCH++; S = storyState(S.story.step + 1); } },
  prev() { if (S.story.step > 0) { EPOCH++; S = storyState(S.story.step - 1); } },
  jump(n) { EPOCH++; S = storyState(+n); },
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  if (S.mode === "story" && el.closest(".frame")) return; // story frames are driven by Next / Back
  const fn = ACTIONS[el.dataset.action];
  if (!fn) return;
  e.preventDefault();
  fn(el.dataset.arg, el);
  render();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && S.mode !== "hub") { ACTIONS.hub(); render(); }
  if (S.mode !== "story") return;
  if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); ACTIONS.next(); render(); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); ACTIONS.prev(); render(); }
});

function fit() {
  const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
  document.getElementById("stage").style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener("resize", fit);
document.documentElement.style.setProperty("--partner-accent", P.accent);
document.title = `RadonSketch × ${P.name} — Partnership Prototype`;
fit();
render();
