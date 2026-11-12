"use strict";
/* ===========================================================================
   RadonSketch × CERTI — Partnership Prototype (design prototype, no backend)

   ✏️  EDIT BEFORE THE MEETING
   Everything a presenter may want to change — partner name, colours, logo,
   course titles, prices, codes, readings, learners — is in CONFIG below.
   Save the file and refresh the browser. Nothing else needs to change.
   =========================================================================== */
const CONFIG = {
  partner: {
    name: "CERTI",
    fullName: "CERTI Radon Training",
    logo: "assets/certi-logo.jpg", // used as provided wherever the partner logo appears
    domain: "certi.us",
    address: "3 Foster Lane Suite 102 Flemington NJ 08822",
    phone: "(800) 513-8332",
    email: "courses@certi.us",
    // Colours sampled from CERTI's platform screenshots → CSS variables
    colors: {
      "--partner-accent": "#4B6094", // header navy (used as the partner accent everywhere)
      "--certi-topbar": "#8E96B6",
      "--certi-navy": "#4B6094",
      "--certi-banner": "#9CA4BA",
      "--certi-teal": "#14B2BA",
      "--certi-link": "#1F4FB5",
      "--certi-green-bg": "#EAF4DF",
      "--certi-green": "#2E7D32",
      "--certi-blue-bg": "#E7E9F6",
      "--certi-red": "#E03A3A",
      "--certi-section": "#F6F6F6",
      "--certi-footer": "#CCCCCC",
      "--certi-alert": "#E4D9D8",
    },
  },
  app: { name: "RadonSketch" },

  courseCode: "CERTI-4821",
  orderNumber: "38421",
  orderDate: "11/12/2026",
  submittedAt: "today, 3:42 PM",
  uploadedAt: "today, 3:58 PM",
  reportDate: "12 Nov 2026",
  certificateDate: "11/12/2026",

  learner: {
    name: "Alex Morgan",
    initials: "AM",
    email: "alex.morgan@example.com",
    card: "Visa •••• 4242",
    cardExp: "08/28",
  },
  instructor: {
    name: "Dana Whitfield",
    initials: "DW",
    title: "CERTI Instructor · Radon Mitigation (sample)",
    bio: "NRPP-certified mitigation specialist and long-time radon trainer (sample instructor profile).",
    feedback: "Good design — the relocated exhaust now meets the 10 ft rule. Approved.",
  },

  featuredCourseId: "c102", // the course used in both flows
  categories: ["Entry Level – Radon", "Continuing Education – Radon", "Vapor Intrusion", "Exam Preparation"],

  // Sample data in CERTI's course-code format. Hours and prices are illustrative.
  courses: [
    {
      id: "c102",
      code: "C-102",
      title: "C-102: Radon Mitigation Technology (CERTI-4000)",
      shortTitle: "C-102 – Radon Mitigation Technology",
      category: "Entry Level – Radon",
      hours: 16, format: "Self-paced", access: "Access for 12 months", price: 399, nrpp: true, practice: true,
      rating: 4.8, learners: "1,180",
      summary: "Entry-level mitigation course covering diagnostics, system design and installation.",
      overview:
        "The entry-level radon mitigation course. Covers diagnostics, sub-slab system design, fan selection, sealing and post-mitigation testing. It now includes a RadonSketch Practice Lab where you design a real system and submit your report.",
      learn: [
        "Read diagnostic data and plan suction points",
        "Size pipe and select fans for sub-slab systems",
        "Apply ANSI/AARST installation requirements",
        "Document a compliant design in a professional report",
      ],
      lessons: [
        { id: "t1", type: "video", title: "Radon Mitigation Technology", duration: "Manual · Video (1:49:45)" },
        { id: "t2", type: "video", title: "Diagnostics & System Design", duration: "Manual · Video (1:12:30) · Resource" },
        { id: "t3", type: "quiz", title: "QUIZ (40 questions)", duration: "Passing is 70% · unlimited retakes" },
        { id: "t4", type: "lab", title: "RadonSketch Practice Lab: Design a mitigation system", duration: "≈ 45 min · instructor-reviewed" },
        { id: "t5", type: "eval", title: "Course Evaluation", duration: "Required for your certificate" },
        { id: "t6", type: "cert", title: "Course Completion Certificate", duration: "Download as PDF" },
      ],
    },
    {
      id: "c4116",
      code: "C-4-116",
      title: "C-4-116: ANSI/AARST Measurement Standards Review (CERTI-1000)",
      category: "Continuing Education – Radon",
      hours: 4, format: "Self-paced", access: "Access for 6 months", price: 60, nrpp: true, practice: false,
      rating: 4.6, learners: "2,040",
      summary: "Review of the ANSI/AARST measurement standards for radon professionals.",
      overview: "A continuing-education review of the ANSI/AARST measurement standards, with worked examples and a quiz.",
      learn: ["Key requirements of the measurement standards", "Device placement and QA", "Documentation expectations"],
      lessons: [
        { id: "a1", type: "video", title: "Standards overview", duration: "Manual · Video" },
        { id: "a2", type: "quiz", title: "QUIZ (25 questions)", duration: "Passing is 70%" },
        { id: "a3", type: "eval", title: "Course Evaluation", duration: "Required for your certificate" },
        { id: "a4", type: "cert", title: "Course Completion Certificate", duration: "Download as PDF" },
      ],
    },
    {
      id: "c6100",
      code: "C-6-100",
      title: "C-6-100: Conducting Radon Surveys in Schools (CERTI-330)",
      category: "Continuing Education – Radon",
      hours: 4, format: "Self-paced", access: "Access for 6 months", price: 60, nrpp: true, practice: false,
      rating: 4.7, learners: "860",
      summary: "The nuts and bolts of conducting radon surveys in schools.",
      overview: "Covers the process of conducting radon surveys in schools and the challenges of testing in such an expansive space.",
      learn: ["Planning a school survey", "Device placement in large buildings", "Reporting to school districts"],
      lessons: [
        { id: "b1", type: "video", title: "Conducting Radon Surveys in Schools", duration: "Manual · Video" },
        { id: "b2", type: "quiz", title: "QUIZ (40 questions)", duration: "Passing is 70%" },
        { id: "b3", type: "eval", title: "Course Evaluation", duration: "Required for your certificate" },
        { id: "b4", type: "cert", title: "Course Completion Certificate", duration: "Download as PDF" },
      ],
    },
    {
      id: "c4115",
      code: "C-4-115",
      title: "C-4-115: Device Specific Training for E-PERMs (CERTI-306)",
      category: "Continuing Education – Radon",
      hours: 3, format: "Self-paced", access: "Access for 6 months", price: 60, nrpp: true, practice: false,
      rating: 4.5, learners: "640",
      summary: "Proper use of electret ion chambers, with manual, video and calculation quiz.",
      overview: "A program describing the proper use of electret ion chambers, with a course manual, an online video and calculation questions.",
      learn: ["E-PERM system operation", "Calculating results", "QA for electret devices"],
      lessons: [
        { id: "e1", type: "video", title: "Device Specific Training for E-PERMs", duration: "Manual · Video (1:49:45)" },
        { id: "e2", type: "quiz", title: "QUIZ (20 questions)", duration: "Passing is 70%" },
        { id: "e3", type: "eval", title: "Course Evaluation", duration: "Required for your certificate" },
        { id: "e4", type: "cert", title: "Course Completion Certificate", duration: "Download as PDF" },
      ],
    },
  ],

  quiz: {
    progress: "Question 4 of 40",
    rule: "Passing score: 70% · Unlimited retakes",
    question: "Where must the exhaust of an active soil depressurization system discharge?",
    options: [
      "Through the rim joist, just above grade",
      "Above the roof edge, ≥ 10 ft above ground and ≥ 10 ft from openings less than 2 ft below it",
      "Into the attic, away from living space",
      "Anywhere at least 3 ft from a window",
    ],
    correct: 1,
    explain: "The standard keeps exhaust well away from openings so radon can't re-enter the building. You'll apply this rule in the Practice Lab.",
    score: "9.00 / 10",
  },

  clientProjects: [
    { name: "Hendricks Residence", status: "Draft", tags: ["USA", "Residential", "Slab"], tone: "green", created: "10 Nov, 2026 at 10:24 am" },
    { name: "Maple Grove Duplex", status: "Submitted", tags: ["USA", "Commercial", "Crawlspace"], tone: "peach", created: "08 Nov, 2026 at 04:51 pm" },
    { name: "Okafor Family Home", status: "Exported", tags: ["Canada", "Residential", "Basement"], tone: "green", created: "04 Nov, 2026 at 09:12 am" },
    { name: "Lakeside Bungalow", status: "Draft", tags: ["USA", "Residential", "Slab"], tone: "peach", created: "02 Nov, 2026 at 02:37 pm" },
  ],

  practiceProject: {
    name: "Prairie View Basement",
    address: "Sample home · Flemington, NJ",
    tags: ["USA", "Residential", "Basement"],
    task: "A homeowner's 48-hour test shows up to 9.4 pCi/L in a finished basement (EPA action level: 4.0 pCi/L). Using the diagnostic readings already on the plan, design a sub-slab mitigation system that meets ANSI/AARST standards, resolve any compliance warnings, and submit your report.",
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
    { id: "exhaust", label: "Exhaust ≥ 10 ft from openings", status: "warn", detail: "Exhaust is 6.5 ft from the bedroom window", fixedDetail: "Relocated above eave · 23 ft from nearest opening" },
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

  // CERTI account site (Flow B · My Account)
  enrolled: [
    { title: "C-6-100 Conducting Radon Surveys in Schools (CERTI-330)", status: "completed" },
    { title: "C-4-116 – ANSI/AARST Measurement Standards Review (CERTI-1000)", status: "completed" },
    { title: "C-4-115 – Device Specific Training for E-PERMs (CERTI-306)", status: "completed" },
    { title: "C-102 – Radon Mitigation Technology (CERTI-4000)", status: "start", featured: true },
    { title: "Free Category II Courses", status: "start" },
    { title: "Resources for Radon Professionals", status: "start" },
  ],
  orders: [
    { id: "38421", date: "11/12/2026", status: "Completed", total: "$399.00 - 1 course", viaApp: true, item: "C-102 – Radon Mitigation Technology (CERTI-4000)" },
    { id: "34659", date: "01/11/2026", status: "Completed", total: "$120.00 - 2 courses", item: "C-4-116 + C-4-115" },
    { id: "32263", date: "03/14/2025", status: "Completed", total: "$60.00 - 1 course", item: "C-6-100 – Conducting Radon Surveys in Schools (CERTI-330)" },
  ],
  // CERTI course area sidebar
  myCourses: [
    { id: "c102", label: "C-102: Radon Mitigation Technology (CERTI-4000)" },
    { id: "c4115", label: "C-4-115: Device Specific Training for E-PERMs (CERTI-306)", done: true },
    { id: "c4116", label: "C-4-116: ANSI/AARST Measurement Standards Review (CERTI-1000)", done: true },
    { id: "c6100", label: "C-6-100: Conducting Radon Surveys in Schools (CERTI-330)", done: true },
  ],
  certificates: [
    { name: "C-6-100 - CERTI-330", date: "03/20/2025" },
    { name: "C-4-115 - CERTI-306", date: "01/18/2026" },
    { name: "C-4-116 - C-1000", date: "01/25/2026" },
  ],
  newCertificate: { name: "C-102 - CERTI-4000", date: "11/12/2026" },

  // Instructor review queue (Flow B · Instructor view). "r1" is always the demo learner.
  reviewQueue: [
    { id: "r1", name: "Alex Morgan", when: "Today, 3:42 PM", source: "sync", passed: 8, status: "review" },
    { id: "r2", name: "Sam Rivera", when: "Today, 11:05 AM", source: "sync", passed: 9, status: "approved" },
    { id: "r3", name: "Taylor Brooks", when: "Yesterday, 6:20 PM", source: "pdf", passed: null, status: "review" },
    { id: "r4", name: "Jamie Chen", when: "Nov 9, 2:14 PM", source: "sync", passed: 6, status: "changes" },
    { id: "r5", name: "Chris Patel", when: "Nov 8, 9:48 AM", source: "sync", passed: 7, status: "review" },
  ],
};

/* ===========================================================================
   Presenter notes (Flow A right-hand panel) and Full-story script
   =========================================================================== */
const P = CONFIG.partner;
const NOTES = {
  projects: { title: "A1 · RadonSketch home", points: [
    "The existing Projects screen and bottom navigation — unchanged.",
    "New <b>Courses</b> tab with a “New” badge, plus a light discovery banner.",
    "CERTI courses live where pros already work every day: no extra app, no extra login.",
  ] },
  courses: { title: "A2 · CERTI courses catalogue", points: [
    "Banner: <b>Courses by CERTI</b>, in partnership with RadonSketch.",
    "Categories follow CERTI's own: Entry Level, Continuing Education, Vapor Intrusion, Exam Preparation.",
    "Cards show CERTI course codes, credit hours, price and NRPP approval.",
    "The orange tag marks courses with a RadonSketch Practice Lab.",
  ] },
  course: { title: "A3 · Course detail", points: [
    "Lesson list follows CERTI's structure: Topics 1–3, Practice Lab, Course Evaluation, Certificate.",
    "Topic 4 — the RadonSketch Practice Lab — is highlighted.",
    "Enrol button shows the price up front.",
  ] },
  checkout: { title: "A4 · CERTI checkout", points: [
    "“Secure checkout by CERTI” with a CERTI order number.",
    "CERTI stays the seller — the order shows in their My Account → Orders, tagged “Enrolled via RadonSketch app”.",
    "RadonSketch never handles card details (assumption to confirm).",
  ] },
  player: { title: "A5 · Course player", points: [
    "Progress bar and topic list with status for each step.",
    "Video, quiz and Practice Lab steps run inside the app.",
    "Progress stays in sync with CERTI's course area.",
  ] },
  video: { title: "A5 · Video topic", points: ["CERTI's course video, played in the app.", "“Mark as complete” updates progress."] },
  quiz: { title: "A5 · Quiz", points: ["CERTI's rule shown up front: passing score 70%, unlimited retakes.", "Instant feedback per question."] },
  lab: { title: "A6 · Topic 4 — Practice Lab", points: [
    "Explains the task, what's practised and how long it takes.",
    "A ready-made practice project is already waiting — one tap to open.",
    "Practice projects don't count toward plan limits and can't be sent to clients.",
  ] },
  "pp-diag": { title: "A7 · Practice project — Diagnostic", points: [
    "Bannered <b>Course practice project · CERTI C-102</b>, separate from client work.",
    "Test points and sub-slab readings are already placed by the course author.",
  ] },
  "pp-build": { title: "A7 · Radon Builder + compliance", points: [
    "Suction point, pipe and fan on the plan.",
    "Live ANSI/AARST checks: mostly green, one amber warning.",
    "Tap <b>Move exhaust</b> to fix the warning — the canvas and checks update.",
  ] },
  "pp-report": { title: "A8 · Training report", points: [
    "The real RadonSketch report, watermarked “Training report”.",
    "Learners leave with a portfolio-quality sample of their work.",
  ] },
  submit: { title: "A9 · Submit to course", points: [
    "<b>Sync automatically</b> — sends report, design and checks to CERTI.",
    "<b>Download PDF</b> — fallback for learners who prefer to upload.",
    "After sync, Topic 4 is marked complete in the course player.",
  ] },
};

// Full story — each step only sets what changes; state is rebuilt from step 1 each time.
const STORY = [
  { title: "Learner opens Topic 4 — the Practice Lab", caption: "In CERTI's course area for C-102, the learner reaches Topic 4: a RadonSketch Practice Lab.",
    focus: "portal", scroll: "lab", set: (s) => { s.app.screen = "lock"; } },
  { title: "Scan the QR code", caption: "The learner scans the QR code with their phone. It opens RadonSketch in the app store, carrying the course code with it.",
    focus: "both", scroll: "qr", set: (s) => { s.app.screen = "camera"; s.portal.qrPulse = true; } },
  { title: "Download RadonSketch", caption: "RadonSketch installs from the App Store or Google Play. This is how CERTI's learners discover the app.",
    focus: "app", scroll: "qr", set: (s) => { s.app.screen = "appstore"; s.portal.qrPulse = false; } },
  { title: "Sign in — course linked", caption: `The learner signs in or creates a free account. Course code ${CONFIG.courseCode} links their account to C-102.`,
    focus: "app", scroll: "qr", set: (s) => { s.app.screen = "signin"; } },
  { title: "The practice project is waiting", caption: "A ready-made practice project for C-102 appears in the app, kept apart from client projects. CERTI's course page now shows RadonSketch as connected.",
    focus: "both", scroll: "submission", set: (s) => {
      s.app.screen = "projects"; s.app.signedIn = true; s.app.practiceReady = true; s.app.promo = false;
      s.app.toast = "Course practice project added"; s.portal.connected = true; } },
  { title: "Practise: review the diagnostics", caption: "Test points and readings are already on the Diagnostic floor plan, so the learner can focus on reading the data.",
    focus: "app", scroll: "submission", set: (s) => { s.app.screen = "pp-diag"; s.app.toast = null; } },
  { title: "Practise: design and fix compliance", caption: "In Radon Builder the learner places the suction point, pipe and fan. Live ANSI/AARST checks flag the exhaust as too close to a window, and the learner fixes it.",
    focus: "app", scroll: "submission", set: (s) => { s.app.screen = "pp-build"; s.app.fixed = true; s.app.toast = "Exhaust moved: 23 ft from nearest opening"; } },
  { title: "Generate the training report", caption: "RadonSketch generates the report, watermarked “Training report” so it can't be mistaken for client work.",
    focus: "app", scroll: "submission", set: (s) => { s.app.screen = "pp-report"; s.app.toast = null; } },
  { title: "Submit to CERTI", caption: "The learner chooses to sync the report to the course automatically. Downloading a PDF to upload is also available.",
    focus: "app", scroll: "submission", set: (s) => { s.app.sheet = "submit"; s.app.submitStep = "choose"; s.app.submitChoice = "sync"; } },
  { title: "CERTI shows “Submitted”", caption: "The submission appears in the Topic 4 activity straight away, with auto-check results. No files to email or upload.",
    focus: "both", scroll: "submission", set: (s) => { s.app.submitStep = "done"; s.portal.submission = "synced"; } },
  { title: "Instructor approves — Topic 4 complete", caption: "Once the CERTI instructor approves, the Practice Lab activity is ticked on both sides and the Course Evaluation unlocks.",
    focus: "both", scroll: "lab", set: (s) => {
      s.app.sheet = null; s.app.screen = "player"; s.app.history = ["courses"];
      s.app.done[doneKey(CONFIG.featuredCourseId, "t4")] = true; s.app.labState = "submitted"; s.app.approved = true;
      s.portal.submission = "approved"; s.portal.reviews.r1 = "approved"; } },
  { title: "Grades: the Practice Lab is graded", caption: "CERTI's Grades tab now lists the Practice Lab, with RadonSketch's auto-check result as feedback.",
    focus: "portal", scroll: "top", set: (s) => { s.portal.tab = "grades"; s.app.toast = "CERTI graded your Practice Lab: 8.89 / 10"; } },
  { title: "Certificate issued", caption: "After the course evaluation, the C-102 certificate appears in “My Certificates” — and in the app.",
    focus: "both", scroll: "certs", set: (s) => {
      s.portal.tab = "course"; s.portal.certIssued = true; s.portal.evalDone = true;
      const f = CONFIG.featuredCourseId; s.app.done[doneKey(f, "t5")] = true; s.app.done[doneKey(f, "t6")] = true; s.app.certIssued = true;
      s.app.toast = "Certificate issued by CERTI"; } },
];

/* ===========================================================================
   Helpers
   =========================================================================== */
const course = (id) => CONFIG.courses.find((c) => c.id === id);
const FEATURED = () => course(CONFIG.featuredCourseId);
const fmt = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
const money = (n) => "$" + n.toFixed(2);
const doneKey = (cid, lid) => cid + ":" + lid;
const TYPE_LABEL = { video: "Manual · Video", quiz: "Quiz", lab: "Practice Lab", exam: "Exam", eval: "Evaluation", cert: "Certificate" };
const TYPE_ICON = { video: "video", quiz: "quiz", lab: "lab", exam: "exam", eval: "message", cert: "exam" };

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
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  panel: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 5v14"/>',
  menu: '<path d="M4 7h16M4 12h10M4 17h16"/>',
  upright: '<path d="M7 17 17 7M9 7h8v8"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2.1.7 3.5 2.5 3.5 5.2"/>',
};
function ic(name, size = 20, cls = "") {
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}
function rsLogo(size = 28) {
  return `<svg class="rs-logo" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#E26A1B"/><path d="M7.5 16.5 16 9.5l8.5 7V24h-17z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M20.5 13.2V7h3v8.6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><circle cx="16" cy="19" r="2" fill="#fff"/></svg>`;
}
const partnerLogo = (cls = "") => `<img class="partner-logo-img ${cls}" src="${P.logo}" alt="${P.name} logo" onerror="this.outerHTML='<span class=&quot;partner-logo ${cls}&quot;>CERTI logo</span>'">`;
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
  const tone = { "Entry Level – Radon": "t-mit", "Continuing Education – Radon": "t-ce", "Vapor Intrusion": "t-meas", "Exam Preparation": "t-exam" }[c.category];
  const glyph = { "Entry Level – Radon": "fan", "Continuing Education – Radon": "book", "Vapor Intrusion": "target", "Exam Preparation": "exam" }[c.category];
  return `<div class="thumb ${tone} ${big ? "big" : ""}">
    <span class="thumb-glyph">${ic(glyph, big ? 150 : 96)}</span>
    <span class="thumb-cat">${c.code || ""} · ${c.category}</span>
    <span class="thumb-hrs"><b>${c.hours}</b> CE hrs</span>
    ${c.nrpp ? `<span class="thumb-ce">CE</span>` : ""}
  </div>`;
}

/* QR placeholder pattern (not a real code) */
function qrSVG(size = 200, seed = 4000) {
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
    <div class="rpt-meta"><div><span>Prepared by</span>${L.name}</div><div><span>Course</span>${FEATURED().title}</div><div><span>Provider</span>${P.fullName}</div><div><span>Date</span>${CONFIG.reportDate}</div></div>
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
    enrolled: {}, done: {}, labState: null, approved: false, certIssued: false,
    quiz: { picked: null, checked: false }, video: { playing: false, t: 0 },
    fixed: false, promo: true, coursesSeen: false, practiceReady: false, signedIn: true,
    generating: false, toast: null,
  };
}
function freshPortal() {
  return {
    view: "learner", site: "account", page: "courses", order: null, tab: "course",
    collapsed: {}, sidebar: true, onlyProgress: false,
    submission: "waiting", upload: "idle", reviews: {}, selected: "r1",
    connected: false, qrPulse: false, evalDone: false, certIssued: false, toast: null,
  };
}
function freshState(mode = "hub") {
  return { mode, app: freshApp(), portal: freshPortal(), story: { step: 0 } };
}
let S = freshState();
let EPOCH = 0; // invalidates pending timers when the demo is reset or the mode changes
const LAST = { phone: null, sheet: null, portal: null, story: -1 };
let vidTimer = null, toastTimer = null;
const VIDEO_LEN = 6585; // 1:49:45

function storyState(n) {
  const s = freshState("story");
  const a = s.app, fid = CONFIG.featuredCourseId;
  a.enrolled[fid] = true; a.coursesSeen = true; a.signedIn = false;
  ["t1", "t2", "t3"].forEach((l) => (a.done[doneKey(fid, l)] = true));
  s.portal.site = "course"; s.portal.tab = "course";
  s.portal.collapsed = { s0: true, t1: true, t2: true, t3: true };
  for (let i = 0; i <= n; i++) STORY[i].set(s);
  s.story.step = n;
  return s;
}

function enrolledBase(a, doneThrough = 0) {
  const fid = CONFIG.featuredCourseId;
  a.enrolled[fid] = true; a.courseId = fid; a.coursesSeen = true; a.promo = false;
  ["t1", "t2", "t3"].slice(0, doneThrough).forEach((l) => (a.done[doneKey(fid, l)] = true));
}
const A_JUMPS = [
  { key: "projects", label: "App home — Projects", tag: "A1", set: () => {} },
  { key: "courses", label: "CERTI courses catalogue", tag: "A2", set: (a) => { a.screen = "courses"; a.coursesSeen = true; } },
  { key: "course", label: "Course detail", tag: "A3", set: (a) => { a.coursesSeen = true; a.history = ["courses"]; a.screen = "course"; } },
  { key: "checkout", label: "CERTI checkout", tag: "A4", set: (a) => { a.coursesSeen = true; a.history = ["courses"]; a.screen = "course"; a.sheet = "checkout"; } },
  { key: "player", label: "Course player", tag: "A5", set: (a) => { enrolledBase(a); a.history = ["courses"]; a.screen = "player"; } },
  { key: "video", label: "Video topic", tag: "A5", set: (a) => { enrolledBase(a); a.history = ["courses", "player"]; a.lessonId = "t1"; a.screen = "video"; } },
  { key: "quiz", label: "Quiz (pass 70%)", tag: "A5", set: (a) => { enrolledBase(a, 2); a.history = ["courses", "player"]; a.lessonId = "t3"; a.screen = "quiz"; } },
  { key: "lab", label: "Topic 4 · Practice Lab", tag: "A6", set: (a) => { enrolledBase(a, 3); a.history = ["courses", "player"]; a.lessonId = "t4"; a.screen = "lab"; } },
  { key: "pp-diag", label: "Practice project · Diagnostic", tag: "A7", set: (a) => { enrolledBase(a, 3); a.practiceReady = true; a.lessonId = "t4"; a.history = ["courses", "player", "lab"]; a.screen = "pp-diag"; } },
  { key: "pp-build", label: "Radon Builder + compliance", tag: "A7", set: (a) => { enrolledBase(a, 3); a.practiceReady = true; a.lessonId = "t4"; a.history = ["courses", "player", "lab"]; a.screen = "pp-build"; } },
  { key: "pp-report", label: "Training report", tag: "A8", set: (a) => { enrolledBase(a, 3); a.practiceReady = true; a.fixed = true; a.lessonId = "t4"; a.history = ["courses", "player", "lab"]; a.screen = "pp-report"; } },
  { key: "submit", label: "Submit to CERTI", tag: "A9", set: (a) => { enrolledBase(a, 3); a.practiceReady = true; a.fixed = true; a.lessonId = "t4"; a.history = ["courses", "player", "lab"]; a.screen = "pp-report"; a.sheet = "submit"; } },
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
  const feat = c.id === CONFIG.featuredCourseId;
  if (l.type === "eval") return !feat || a.approved ? "todo" : "locked";
  if (l.type === "cert") return a.certIssued && feat ? "todo" : "locked";
  if (l.type === "exam") return "locked";
  const firstOpen = c.lessons.find((x) => !a.done[doneKey(c.id, x.id)] && !["exam", "eval", "cert"].includes(x.type));
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
  const lockNote = interactive && st === "locked" ? `<span class="l-note">${l.type === "eval" ? "Unlocks after the Practice Lab is approved" : "Issued after the Course Evaluation"}</span>` : "";
  return `<${tag} class="l-row ${l.type === "lab" ? "is-lab" : ""} ls-${st}" ${act}>
    <span class="l-ic t-${l.type}">${ic(TYPE_ICON[l.type], 19)}</span>
    <span class="l-txt"><span class="l-kicker">Topic ${i + 1} · ${TYPE_LABEL[l.type]}${l.type === "lab" ? ` <span class="b-practice xs">${rsLogo(11)} RadonSketch</span>` : ""}</span>
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
        <div class="pp-ribbon">${ic("grad", 13)} Course practice · ${P.name} ${FEATURED().code}</div>
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
        ${list.length ? "" : `<div class="empty-cat">${ic("book", 22)}<b>No sample courses in this category yet</b><small>${P.name}'s ${a.category} courses would appear here.</small></div>`}
        ${list.map((c) => `
          <button class="c-card" data-action="openCourse" data-arg="${c.id}">
            ${thumbArt(c)}
            <span class="c-body">
              <span class="c-badges">${c.nrpp ? `<span class="b-nrpp">${ic("shield", 12)} NRPP-approved</span>` : ""}${c.practice ? `<span class="b-practice">${rsLogo(12)} Includes RadonSketch practice</span>` : ""}</span>
              <span class="c-title">${c.title} <span class="sample-tag">Sample</span></span>
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
          <span class="l-txt"><span class="l-kicker">Continue · Topic ${nextIdx + 1}</span><span class="l-title">${next.title}</span></span>
          <span class="go">${ic("arrow", 18)}</span></button>` : ""}
        <div class="sec-label">Lessons</div>
        <div class="l-list">${c.lessons.map((l, i) => lessonRow(c, l, i, a, true)).join("")}</div>
        ${a.certIssued && c.id === CONFIG.featuredCourseId
          ? `<div class="cert on">${ic("exam", 20)}<span><b>Certificate issued · ${CONFIG.newCertificate.name}</b><small>Issued by ${P.fullName} on ${CONFIG.newCertificate.date}</small></span>${ic("download", 16)}</div>`
          : `<div class="cert">${ic("exam", 20)}<span><b>Certificate of completion</b><small>Issued by ${P.name} after the Course Evaluation</small></span>${ic("lock", 16)}</div>`}
      </div>`,
    };
  },

  video(a) {
    const v = a.video, c = course(a.courseId), l = c.lessons.find((x) => x.id === a.lessonId) || c.lessons[0];
    const done = a.done[doneKey(c.id, l.id)];
    const dur = VIDEO_LEN, pct = (v.t / dur) * 100;
    const t = hms;
    return {
      html: `${appHeader("Topic " + (c.lessons.indexOf(l) + 1))}
      <div class="vid ${v.playing ? "playing" : ""}">
        <div class="vid-poster"><span class="vid-chip">${c.code} · Video</span><span class="vid-h">${l.title}</span><span class="vid-by">${CONFIG.instructor.name}</span></div>
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
        <div class="l-kicker">Topic ${c.lessons.indexOf(l) + 1} · Manual · Video</div>
        <h2 class="cd-title sm">${l.title}</h2>
        <p class="body-p">How active soil depressurization works, how to test sub-slab communication, and how to plan a system that reaches every part of the slab.</p>
        <div class="manual-row">${ic("file", 18)}<span><b>MANUAL: ${l.title}</b><small>Course manual · PDF</small></span>${ic("download", 16)}</div>
        <div class="sec-label">Chapters</div>
        <div class="chapters">
          <div><span>0:00</span>How radon enters buildings</div><div class="on"><span>18:40</span>Sub-slab communication testing</div>
          <div><span>47:15</span>Suction points, pipe and fans</div><div><span>1:21:30</span>Sealing and post-mitigation testing</div>
        </div>
      </div>`,
      footer: done
        ? `<div class="cta-bar single"><button class="btn-secondary block" data-action="back">${ic("check", 16)} Completed — back to course</button></div>`
        : `<div class="cta-bar single"><button class="btn-primary block" data-action="completeLesson">Mark as complete</button></div>`,
    };
  },

  quiz(a) {
    const Q = CONFIG.quiz, q = a.quiz, c = course(a.courseId), l = c.lessons.find((x) => x.id === a.lessonId) || c.lessons.find((x) => x.type === "quiz");
    const ok = q.checked && q.picked === Q.correct;
    return {
      html: `${appHeader("Knowledge check")}
      <div class="pad">
        <div class="quiz-prog"><span>${Q.progress}</span><span class="bar"><i style="width:20%"></i></span></div>
        <div class="quiz-rule">${ic("info", 15)} ${Q.rule}</div>
        <div class="l-kicker">Topic ${c.lessons.indexOf(l) + 1} · Quiz</div>
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
      html: `${appHeader("Topic " + (idx + 1))}
      <div class="pad">
        <div class="lab-hero">
          <span class="b-practice">${rsLogo(13)} ${P.name} ${c.code} · Practice Lab</span>
          <h2>${l.title}</h2>
          <div class="lab-meta"><span>${ic("clock", 15)} ≈ 45 min</span><span>${ic("users", 15)} Reviewed by ${P.name} instructor</span></div>
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
      html: `<div class="lock"><div class="lock-date">Thursday, November 12</div><div class="lock-time">3:40</div>
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
  <div class="pp-banner">${ic("grad", 16)}<span><b>Course practice project</b> · ${P.name} ${FEATURED().code}</span><span class="pill-training">Training</span></div>
  <div class="seg">
    <button class="${tab === "pp-diag" ? "on" : ""}" data-action="ppTab" data-arg="pp-diag">Diagnostic</button>
    <button class="${tab === "pp-build" ? "on" : ""}" data-action="ppTab" data-arg="pp-build">Radon Builder</button>
    <button class="${tab === "pp-report" ? "on" : ""}" data-action="ppTab" data-arg="pp-report">Report</button>
  </div>`;
}

const SHEETS = {
  checkout(a, enter) {
    const c = course(a.courseId), L = CONFIG.learner;
    const head = `<div class="ps-head">${partnerLogo("xs on-dark")}<div class="ps-ht"><b>${ic("lock", 13)} Secure checkout by ${P.name}</b><small>${P.domain} · Order #${CONFIG.orderNumber}</small></div>
      ${a.checkoutStep === "form" ? `<button class="ps-x" data-action="closeSheet" aria-label="Close">${ic("x", 18)}</button>` : ""}</div>`;
    if (a.checkoutStep === "done") {
      return `<div class="sheet partner-sheet ${enter}">${head}
        <div class="ps-body success">
          <span class="ok-circle">${ic("check", 34)}</span>
          <h3>You're enrolled</h3>
          <p><b>${c.title}</b></p>
          <p class="muted">Order #${CONFIG.orderNumber} · receipt sent to ${L.email}</p>
          <div class="ps-note">${ic("grad", 16)} Your course is now in RadonSketch under <b>Courses → My learning</b>.</div>
          <button class="btn-primary block" data-action="startCourse">Start course ${ic("arrow", 18)}</button>
        </div></div>`;
    }
    const paying = a.checkoutStep === "paying";
    return `<div class="sheet partner-sheet ${enter}">${head}
      <div class="ps-body">
        <div class="ps-label">Order summary · #${CONFIG.orderNumber}</div>
        <div class="ps-order"><span class="ps-thumb">${thumbArt(c)}</span><span><b>${c.title}</b><small>${c.hours} CE hours · ${c.format} · ${c.access}</small></span></div>
        <div class="ps-rows"><div><span>Course fee</span><span>${money(c.price)}</span></div><div><span>Tax</span><span>$0.00</span></div><div class="tot"><span>Total</span><span>${money(c.price)}</span></div></div>
        <div class="ps-label">Payment method</div>
        <div class="ps-pay"><div class="on"><i class="radio on"></i>${ic("card", 18)}<span>${L.card}</span><small>Exp ${L.cardExp}</small></div><div><i class="radio"></i><span class="wallet">Pay</span><span>Digital wallet</span></div></div>
        <div class="ps-label">Learner</div>
        <div class="ps-learner"><span class="avatar sm">${L.initials}</span><span><b>${L.name}</b><small>${L.email}</small></span></div>
        <button class="btn-partner block" data-action="pay">${paying ? `<span class="spin"></span> Processing…` : `${ic("lock", 16)} Pay ${money(c.price)}`}</button>
        <p class="ps-fine">You're buying from ${P.fullName}. The order appears in your CERTI account. RadonSketch doesn't see or store your card details. Refunds follow CERTI's refund policy.</p>
      </div></div>`;
  },

  submit(a, enter) {
    const c = FEATURED(), cc = complianceCounts(a.fixed);
    if (a.submitStep === "done") {
      if (a.submitChoice === "pdf") {
        return `<div class="sheet ${enter}"><div class="grabber"></div><div class="sh-body success">
          <span class="ok-circle">${ic("download", 30)}</span><h3>PDF saved to Files</h3>
          <div class="file-row">${ic("file", 20)}<span><b>Training-report_Prairie-View.pdf</b><small>4 pages · 1.8 MB</small></span></div>
          <p class="muted">Next: upload it in <b>Topic 4</b> on your ${P.name} course page.</p>
          <button class="btn-primary block" data-action="backToCourse">Back to course</button></div></div>`;
      }
      return `<div class="sheet ${enter}"><div class="grabber"></div><div class="sh-body success">
        <span class="ok-circle">${ic("check", 34)}</span>
        <h3>Submitted to ${P.name}.</h3><p class="muted">Your instructor will review it.</p>
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
        <div class="sh-course">${ic("grad", 20)}<span><b>${c.title}</b><small>Topic 4 · RadonSketch Practice Lab · ${P.name}</small></span></div>
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
   Browser + CERTI portal (account site + course area)
   =========================================================================== */
function browserFrame(inner, w, h, naturalW, path) {
  const vh = h - 46, s = w / naturalW;
  return `<div class="browser" style="width:${w}px;height:${h}px">
    <div class="br-bar"><span class="br-dots"><i></i><i></i><i></i></span><span class="br-nav">${ic("arrow-left", 15)}${ic("arrow", 15)}${ic("refresh", 14)}</span>
      <span class="br-url">${ic("lock", 12)}<b>${P.domain}</b>${path}</span><span class="br-end">${ic("more", 16)}</span></div>
    <div class="br-view" style="height:${vh}px"><div class="br-scale" style="width:${naturalW}px;height:${vh / s}px;transform:scale(${s})">${inner}</div></div>
  </div>`;
}
function portalPath(p) {
  if (p.view === "instructor") return "/moodle/mod/assign/view.php?id=1024&action=grading";
  if (p.site === "account") return { courses: "/my-account/eb_my_courses/", orders: "/my-account/orders/", order: `/my-account/view-order/${p.order || CONFIG.orderNumber}/` }[p.page] || `/my-account/${p.page}/`;
  return { course: "/moodle/course/view.php?id=102", grades: "/moodle/grade/report/user/index.php?id=102", comps: "/moodle/admin/tool/lp/coursecompetencies.php?courseid=102" }[p.tab];
}
const logoImg = (cls = "") => `<img class="${cls}" src="${P.logo}" alt="${P.name} logo" onerror="this.outerHTML='<span class=&quot;logo-ph ${cls}&quot;>CERTI logo</span>'">`;
const extLink = (label, text = label) => `<button class="ext" data-action="ext" data-arg="${label}">${text}</button>`;

function renderPortal(p) {
  const key = [p.view, p.site, p.page, p.tab, p.order].join(":");
  const enter = key !== LAST.portal ? "enter" : "";
  LAST.portal = key;
  let html;
  if (p.view === "instructor") html = courseShell(p, instructorContent(p), true);
  else if (p.site === "account") html = accountSite(p);
  else html = courseShell(p, p.tab === "grades" ? gradesContent(p) : p.tab === "comps" ? compsContent() : courseContent(p), false);
  return `<div class="pwrap ${enter}">${html}${p.toast ? `<div class="p-toast">${ic("check", 16)} ${p.toast}</div>` : ""}</div>`;
}

/* ---------- 2a · Account site ---------- */
function accountSite(p) {
  const L = CONFIG.learner;
  const menu = [["dashboard", "Dashboard"], ["orders", "Orders"], ["downloads", "Downloads"], ["addresses", "Addresses"], ["payment", "Payment Methods"], ["details", "Account Details"], ["logout", "Logout"], ["courses", "My Courses"], ["course-dash", "Course Dashboard"]];
  const nav = ["CERTI", "Radon Training", "Radon Certification", "Vapor Intrusion", "Resources", "FAQ"];
  return `<div class="portal acct" data-scroll="acct-${p.page}">
    <div class="ac-top"><span>${ic("home", 11)} ${P.address}</span><span>${ic("phone", 11)} ${P.phone}</span><span class="ac-size">ᴀ A <b>A</b></span></div>
    <header class="ac-head">
      <button class="ac-logo-btn" data-action="acPage" data-arg="courses">${logoImg("ac-logo")}</button>
      <nav class="ac-nav">${nav.map((n) => `<button data-action="ext" data-arg="${n}">${n}<i>⌄</i></button>`).join("")}
        <button data-action="ext" data-arg="Blog">Blog</button><button data-action="ext" data-arg="Contact">Contact</button><button class="on" data-action="acPage" data-arg="courses">My Account</button></nav>
    </header>
    <div class="ac-banner"><h1>My Account - ${P.fullName} Programs</h1><div>You Are Here! &gt; <span>Home</span> &gt; <b>My Account</b></div></div>
    <div class="ac-body">
      <aside class="ac-side">
        <b class="ac-name">${L.name}</b>
        <button class="ac-logout" data-action="ext" data-arg="Logout">Logout</button>
        <ul>${menu.map(([k, t]) => `<li><button class="${(p.page === k || (k === "orders" && p.page === "order")) ? "on" : ""}" data-action="${k === "logout" ? "ext" : k === "course-dash" ? "openCourseArea" : "acPage"}" data-arg="${k === "logout" ? "Logout" : k}">${t}</button></li>`).join("")}</ul>
      </aside>
      <main class="ac-main">${accountPage(p)}</main>
    </div>
    <footer class="ac-foot"><span>${P.fullName}</span><span>${P.address} · ${P.phone}</span><span>Sample footer · Prototype</span></footer>
  </div>`;
}
function accountPage(p) {
  const L = CONFIG.learner;
  if (p.page === "courses") {
    return `<p>The listings below have been generated by your registrations and completions in CERTI courses.</p>
      <p class="ac-center"><b>VIDEO</b> - ${extLink("Video: Completing a CERTI Course", "Completing a CERTI Course")}</p>
      <p>Please note - some browsers work better than others with the cookies that need to be stored for education sites - we have found <b>Edge</b> and <b>Firefox</b> work really well.</p>
      <p>Complete instructions included in entry level courses within the Certification Steps section under the Course Instructions at the top of the course.</p>
      <p>To Access Your Courses - click on course title listed below.</p>
      <div class="ac-center"><button class="ac-pill" data-action="ext" data-arg="Continuing Education catalogue">View All Available Continuing Education Courses</button></div>
      <h2 class="ac-h2">Enrolled Courses</h2>
      <div class="ac-grid">${CONFIG.enrolled.map((c) => `
        <div class="ac-card ${c.featured ? "feat" : ""}">
          <button class="ac-ctitle" data-action="${c.featured ? "openCourseArea" : "ext"}" data-arg="${c.title}">${c.title}</button>
          ${c.featured ? `<span class="ac-rs">${rsLogo(12)} Includes RadonSketch Practice Lab</span>` : ""}
          ${c.status === "completed"
            ? `<button class="ac-done" data-action="ext" data-arg="Completed course">Completed</button>`
            : `<button class="ac-start" data-action="${c.featured ? "openCourseArea" : "ext"}" data-arg="${c.title}">Start</button>`}
        </div>`).join("")}</div>
      <div class="ac-alert">If you do not see your course listed here, it may have been discontinued or may not be publicly available. Please use the ${extLink("Moodle Dashboard")} to access these enrollments.</div>`;
  }
  if (p.page === "orders") {
    return `<table class="ac-table"><thead><tr><th>Order</th><th>Date</th><th>Status</th><th>Enrolled by</th><th>Student enrolled</th><th>Total</th><th>Actions</th></tr></thead><tbody>
      ${CONFIG.orders.map((o) => `<tr>
        <td><button class="ac-a" data-action="viewOrder" data-arg="${o.id}">#${o.id}</button>${o.viaApp ? `<span class="ac-via">${rsLogo(11)} Enrolled via RadonSketch app</span>` : ""}</td>
        <td>${o.date}</td><td>${o.status}</td><td>${L.name}<br>${L.email}</td><td>${L.name}<br>${L.email}</td><td>${o.total}</td>
        <td><button class="ac-view" data-action="viewOrder" data-arg="${o.id}">View</button></td></tr>`).join("")}
    </tbody></table>`;
  }
  if (p.page === "order") {
    const o = CONFIG.orders.find((x) => x.id === p.order) || CONFIG.orders[0];
    return `<p>Order <mark>#${o.id}</mark> was placed on <mark>${o.date}</mark> and is currently <mark>${o.status}</mark>.</p>
      ${o.viaApp ? `<div class="ac-via-box">${rsLogo(18)}<div><b>Enrolled via RadonSketch app</b><small>Purchased in the RadonSketch Courses tab · paid to ${P.fullName} · course linked with code ${CONFIG.courseCode}</small></div></div>` : ""}
      <h2 class="ac-h2">Order details</h2>
      <table class="ac-table"><thead><tr><th>Product</th><th>Total</th></tr></thead><tbody>
        <tr><td>${o.item}</td><td>${o.total.split(" - ")[0]}</td></tr>
        <tr><td><b>Payment method:</b></td><td>${L.card}</td></tr><tr><td><b>Total:</b></td><td><b>${o.total.split(" - ")[0]}</b></td></tr></tbody></table>
      <button class="ac-view" data-action="acPage" data-arg="orders">← Back to orders</button>`;
  }
  if (p.page === "dashboard") {
    return `<p>Hello <b>${L.name}</b> (not ${L.name}? ${extLink("Log out")})</p>
      <p>From your account dashboard you can view your ${`<button class="ext" data-action="acPage" data-arg="orders">recent orders</button>`}, manage your addresses, and edit your account details — or go straight to ${`<button class="ext" data-action="acPage" data-arg="courses">your courses</button>`}.</p>`;
  }
  const titles = { downloads: "Downloads", addresses: "Addresses", payment: "Payment Methods", details: "Account Details" };
  return `<h2 class="ac-h2">${titles[p.page] || "My Account"}</h2><div class="ac-info">${ic("info", 15)} Sample page — this part of CERTI's account site isn't covered by the prototype. Try <button class="ext" data-action="acPage" data-arg="courses">My Courses</button> or <button class="ext" data-action="acPage" data-arg="orders">Orders</button>.</div>`;
}

/* ---------- 2b · Course area shell ---------- */
function courseShell(p, content, instructor) {
  const certs = CONFIG.certificates.concat(p.certIssued ? [{ ...CONFIG.newCertificate, isNew: true }] : []);
  const courses = CONFIG.myCourses.filter((c) => !p.onlyProgress || (!c.done && !(c.id === CONFIG.featuredCourseId && p.certIssued)));
  return `<div class="portal cm ${p.sidebar ? "" : "no-side"}">
    <aside class="cm-side" data-scroll="cm-side">
      <button class="cm-logo" data-action="cmHome">${logoImg("cm-logo-img")}</button>
      <div class="cm-panel cm-homes">
        <button data-action="cmHome">${logoImg("cm-mini")} Certi home</button>
        <button data-action="acPage" data-arg="courses">${ic("home", 16)} Courses home</button>
      </div>
      <div class="cm-panel">
        <div class="cm-ph">${ic("book", 15)} ${instructor ? "Courses I teach" : "My Courses"} <span class="cm-badge">${CONFIG.myCourses.length}</span></div>
        <div class="cm-search">${ic("search", 13)} Search</div>
        <button class="cm-toggle" data-action="cmOnly"><i class="${p.onlyProgress ? "on" : ""}"></i> Only courses in progress</button>
        ${courses.map((c) => {
          const cur = c.id === CONFIG.featuredCourseId, done = c.done || (cur && p.certIssued);
          return `<button class="cm-ci ${done && !cur ? "done" : ""} ${cur ? "cur" : ""} ${cur && done ? "done-cur" : ""}" data-action="cmCourse" data-arg="${c.id}">${ic("check", 13)}<span>${c.label}</span></button>`;
        }).join("")}
        <button class="cm-link" data-action="ext" data-arg="Course overview">Course overview ${ic("info", 13)}</button>
        <button class="cm-link" data-action="ext" data-arg="List of all available courses">List of all available courses ${ic("arrow", 13)}</button>
      </div>
      ${instructor ? "" : `<div class="cm-panel" data-anchor="certs">
        <div class="cm-ph">${ic("exam", 15)} My Certificates <span class="cm-badge">${certs.length}</span></div>
        ${certs.map((c) => `<button class="cm-cert ${c.isNew ? "new" : ""}" data-action="ext" data-arg="Certificate ${c.name}">${ic("file", 14)}<span><b>${c.name}${c.isNew ? ` <em>New</em>` : ""}</b><i>${c.date}</i></span></button>`).join("")}
      </div>`}
    </aside>
    <div class="cm-main" data-scroll="cm-main-${instructor ? "inst" : p.tab}" data-scroller>
      <div class="cm-top">
        <button class="cm-sbtn" data-action="cmSide" aria-label="Toggle sidebar">${ic("panel", 18)}</button>
        <span class="cm-right"><button class="cm-moon" data-action="ext" data-arg="Dark mode">${ic("moon", 16)}</button>
          <button data-action="ext" data-arg="Notifications">${ic("bell", 18)}</button><button data-action="ext" data-arg="Messages">${ic("message", 18)}</button>
          <span class="cm-avatar">${instructor ? CONFIG.instructor.initials : CONFIG.learner.initials}</span></span>
      </div>
      <button class="cm-index" data-action="ext" data-arg="Course index">${ic("menu", 16)}</button>
      <div class="cm-content">${content}</div>
      ${cmFooter()}
    </div>
  </div>`;
}
function cmTabs(p) {
  const t = (id, label) => `<button class="${p.tab === id ? "on" : ""}" data-action="cmTab" data-arg="${id}">${label}</button>`;
  return `<div class="cm-tabs">${t("course", "Course")}${t("grades", "Grades")}${t("comps", "Competencies")}</div>`;
}
function cmFooter() {
  return `<footer class="cm-foot">
    <div class="cm-fcols">
      <div><b>Company</b>${extLink("About Us")}${extLink("FAQ")}${extLink("Contact")}</div>
      <div><b>Courses</b>${extLink("Entry Level - Radon")}${extLink("Continuing Education - Radon")}${extLink("Vapor Intrusion")}${extLink("Exam Preparation")}</div>
      <div><b>Legal</b>${extLink("Privacy Policy")}${extLink("Refund Policy")}</div>
      <div><b>Office</b><span>3 Foster Lane</span><span>Suite 102</span><span>Flemington, NJ 08822</span></div>
    </div>
    <div class="cm-fline"><span>${ic("monitor", 13)} ${P.fullName}</span><span>${ic("phone", 13)} Phone : +1 ${P.phone}</span><span>${ic("mail", 13)} ${P.email}</span></div>
    <div class="cm-copy">Copyright 2026 © ${P.fullName}. All rights reserved. · Sample footer for the prototype</div>
    <div class="cm-flinks">${extLink("Contact site support")}${extLink("Data retention summary")}${extLink("Get the mobile app")}</div>
  </footer>`;
}

/* ---------- 2b/2c · Course page ---------- */
function topicThumb(kind) {
  if (kind === "lab") return `<div class="cm-thumb lab">${planSVG({ mode: "build", fixed: true, mini: true })}<span>${rsLogo(26)}</span></div>`;
  const icon = { video: "video", manual: "file", quiz: "quiz", eval: "message", cert: "exam" }[kind];
  return `<div class="cm-thumb k-${kind}">${ic(icon, 40)}</div>`;
}
function act({ kind, label, done = null, restricted = "", action = "ext", arg = label, sub = "" }) {
  const icon = { pdf: "file", video: "upright", res: "link", quiz: "quiz", lab: "lab", eval: "message", cert: "exam" }[kind];
  const circle = done === null ? `<span class="cm-done none"></span>` : `<span class="cm-done ${done ? "on" : "off"}">${done ? ic("check", 12) : ""}</span>`;
  return `<div class="cm-act ${restricted ? "restricted" : ""} ${kind === "lab" ? "is-lab" : ""}">
    ${circle}<span class="cm-aic k-${kind}">${kind === "lab" ? rsLogo(22) : ic(icon, 18)}</span>
    <span class="cm-atxt"><button class="cm-alink" data-action="${restricted ? "ext" : action}" data-arg="${restricted ? "Restricted activity" : arg}">${label}</button>
      ${restricted ? `<small class="cm-restr">${ic("lock", 12)} Not available unless: ${restricted}</small>` : ""}${sub}</span>
  </div>`;
}
function cmSection(p, id, title, body, isNew = false) {
  const open = !p.collapsed[id];
  return `<section class="cm-sec ${isNew ? "is-new" : ""}" ${id === "t4" ? 'data-anchor="lab"' : ""}>
    <button class="cm-sec-h" data-action="cmToggle" data-arg="${id}"><span>${title}${isNew ? ` <em class="cm-new">NEW</em>` : ""}</span><i class="${open ? "" : "shut"}">${ic("chev-down", 16)}</i></button>
    ${open ? `<div class="cm-sec-b">${body}</div>` : ""}
  </section>`;
}
function courseContent(p) {
  const c = FEATURED(), approved = p.submission === "approved";
  const allShut = ["s0", "t1", "t2", "t3", "t4", "t5", "t6"].every((k) => p.collapsed[k]);
  const intro = `
    <table class="cm-instr">
      <tr><td class="cm-icell">${topicThumb("manual")}</td><td>${c.overview}</td></tr>
      <tr><td class="cm-icell"><span class="cm-oval">Course<br>Instructions</span><span class="cm-arrow">➜</span></td><td>
        <b>COMPLETE TOPICS IN ORDER:</b>
        <ul class="cm-ul">
          <li><b>Topics 1–3:</b><ul>
            <li><b>Manual:</b> Download the course manual if applicable</li>
            <li><b>Video:</b> Watch the video if applicable</li>
            <li><b>Resource:</b> View the resource if applicable</li>
            <li><b>Quiz:</b> Must complete the quiz as indicated - <span class="red">passing is 70%</span> - you may retake as many times as needed</li></ul></li>
          <li class="cm-hl"><b>Topic 4:</b> RadonSketch Practice Lab - design a mitigation system in the RadonSketch app and submit your report <em class="cm-new">NEW</em></li>
          <li><b>Topic 5:</b> Complete and submit Course Evaluation</li>
          <li><b>Topic 6:</b> Download your Course Completion Certificate</li>
        </ul></td></tr>
      <tr><td class="cm-icell"><span class="cm-oval">Tracking<br>Progress</span><span class="cm-arrow">➜</span></td><td>
        <b>TRACKING PROGRESS:</b><ul class="cm-ul"><li><b>Quizzes, Practice Lab and Course Evaluation:</b> Will be checked off automatically by the system once you have successfully completed them. These are required for you to receive your certificate.</li></ul></td></tr>
    </table>
    <p class="cm-qh">QUESTIONS:</p>
    <p>Regarding the RadonSketch app: use Help in the app</p>
    <p>Regarding course: contact CERTI at ${P.phone.replace(/[()]/g, "").replace(" ", "-")}</p>`;
  const topic = (kind, heading, bullets, note = "") => `<div class="cm-topic">${topicThumb(kind)}<div><b class="cm-th">${heading}</b><ul class="cm-ul">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>${note ? `<p><span class="red">Note</span> - ${note}</p>` : ""}</div></div>`;
  const evalAvail = approved, certAvail = p.certIssued;
  return `<div class="cm-crumb" data-anchor="top">Home - My courses - ${c.code}</div>
    ${cmTabs(p)}
    <h1 class="cm-title">${c.title}</h1>
    <p class="cm-desc">${c.summary} Now with a hands-on RadonSketch Practice Lab.</p>
    <div class="cm-carow"><button class="cm-ca" data-action="cmCollapseAll">${allShut ? "Expand all" : "Collapse all"}</button></div>
    ${cmSection(p, "s0", "Radon Mitigation Technology", intro)}
    ${cmSection(p, "t1", "Topic 1 - Radon Mitigation Technology",
      topic("video", "Topic 1: Radon Mitigation Technology", ["<b>Manual:</b> download the course manual", "<b>Video:</b> watch the video"], "There is a Table of Contents that can be activated by clicking the icon in the lower-right hand corner of the video") +
      `<div class="cm-acts">${act({ kind: "pdf", label: "MANUAL: Radon Mitigation Technology", done: true })}${act({ kind: "video", label: "VIDEO: Radon Mitigation Technology (1:49:45)", done: true })}</div>`)}
    ${cmSection(p, "t2", "Topic 2 - Diagnostics & System Design",
      topic("manual", "Topic 2: Diagnostics & System Design", ["<b>Manual:</b> download the course manual", "<b>Video:</b> watch the video", "<b>Resource:</b> view the standards quick reference"]) +
      `<div class="cm-acts">${act({ kind: "pdf", label: "MANUAL: Diagnostics & System Design", done: true })}${act({ kind: "video", label: "VIDEO: Diagnostics & System Design (1:12:30)", done: true })}${act({ kind: "res", label: "RESOURCE: ANSI/AARST installation quick reference", done: true })}</div>`)}
    ${cmSection(p, "t3", "Topic 3 - Quiz",
      topic("quiz", "Topic 3: Quiz", [`<b>Quiz:</b> must complete the quiz - <span class="red">passing is 70%</span> - you may retake as many times as needed`]) +
      `<div class="cm-acts">${act({ kind: "quiz", label: "QUIZ (40 questions)", done: true, sub: `<small class="cm-pass">${ic("check", 12)} Done: Receive a pass grade · 9.00 / 10</small>` })}</div>`)}
    ${cmSection(p, "t4", "Topic 4 - RadonSketch Practice Lab", labTopic(p, topic), true)}
    ${cmSection(p, "t5", "Topic 5 - Course Evaluation",
      `<div class="cm-acts">${act({ kind: "eval", label: "FEEDBACK: Course Evaluation", done: p.evalDone, action: "pEval", arg: "", restricted: evalAvail ? "" : "The activity <b>PRACTICE LAB: Submit your RadonSketch report</b> is marked complete" })}</div>`)}
    ${cmSection(p, "t6", "Topic 6 - Course Completion Certificate",
      `<div class="cm-acts">${act({ kind: "cert", label: "CERTIFICATE: C-102 Course Completion Certificate", done: certAvail ? true : null, arg: "Certificate PDF", restricted: certAvail ? "" : "The activity <b>FEEDBACK: Course Evaluation</b> is marked complete" })}</div>`)}`;
}
function labTopic(p, topic) {
  const PP = CONFIG.practiceProject, approved = p.submission === "approved";
  return topic("lab", "Topic 4: RadonSketch Practice Lab", [
      "<b>Practice:</b> Design a sub-slab mitigation system for the sample house in the RadonSketch app",
      "<b>Submit:</b> send your report back to this course — automatically from the app, or as a PDF",
      "<b>Time:</b> about 45 minutes · reviewed by your instructor"],
      "The RadonSketch app and practice project are free for enrolled CERTI learners") +
    `<div class="cm-lab">
      <div class="cm-steps">
        <div class="cm-step"><i>1</i><div><b>Download RadonSketch</b><small>Scan the QR code or use the store buttons.</small></div></div>
        <div class="cm-step"><i>2</i><div><b>Sign in</b><small>Use ${CONFIG.learner.email} so your course links automatically.</small></div></div>
        <div class="cm-step"><i>3</i><div><b>Open your course project</b><small>Find “${PP.name}” under Courses, complete the design and submit your report.</small></div></div>
        <div class="cm-note">${ic("info", 16)}<span><b>Already use RadonSketch?</b> Your practice project is waiting under <b>Courses</b>.</span></div>
      </div>
      <div class="cm-qr ${p.qrPulse ? "pulse" : ""}" data-anchor="qr">
        <b>Scan to get RadonSketch</b>
        <div class="cm-qr-img">${qrSVG(160)}</div>
        <div class="p-stores"><span class="store-btn">${ic("download", 14)}<span><small>Download on the</small>App Store</span></span><span class="store-btn">${ic("play", 13)}<span><small>Get it on</small>Google Play</span></span></div>
        <div class="cm-code">Course code: <b>${CONFIG.courseCode}</b> ${ic("copy", 14)}</div>
      </div>
    </div>
    <div class="cm-acts">${act({ kind: "lab", label: "PRACTICE LAB: Submit your RadonSketch report", done: approved, action: "pState", arg: p.submission === "waiting" ? "waiting" : p.submission === "approved" ? "approved" : p.submission,
      sub: `<small class="cm-pass ${approved ? "" : "todo"}">${approved ? ic("check", 12) + " Done: Approved by instructor" : "To do: Submit your report · approved by instructor"}</small>` })}</div>
    ${labSubmission(p)}`;
}
function labSubmission(p) {
  const cc = complianceCounts(true), L = CONFIG.learner, I = CONFIG.instructor;
  const sw = (id, label, match) => `<button class="${match.includes(p.submission) ? "on" : ""}" data-action="pState" data-arg="${id}">${label}</button>`;
  const row = (k, v, cls = "") => `<tr><th>${k}</th><td class="${cls}">${v}</td></tr>`;
  const segs = complianceItems(true).map((c) => `<i class="${c.status}"></i>`).join("");
  const checks = `<div class="cm-checks"><b>${cc.pass} of ${cc.total} compliance checks passed</b> <span>(auto-checked by RadonSketch)</span><div class="p-seg">${segs}</div>
    <ul><li class="pass">${ic("check", 12)} Suction point, pipe size & slope, fan location</li><li class="pass">${ic("check", 12)} Exhaust ≥ 10 ft from openings <em>(fixed by learner)</em></li><li class="pending">${ic("clock", 12)} Post-mitigation test — pending field verification</li></ul></div>`;
  const file = (name, meta, source) => `<div class="cm-file"><span class="cm-fthumb">${scaled(reportDoc(true), 74, 420, 594)}</span><div>${ic("file", 15)} <button class="ext" data-action="ext" data-arg="Report PDF">${name}</button><small>${meta}</small><small class="cm-src">${source}</small></div></div>`;
  let rows = "";
  const s = p.submission;
  if (s === "waiting") {
    rows = row("Submission status", "No submissions have been made yet") + row("Grading status", "Not graded") +
      row("RadonSketch", p.connected ? `<span class="cm-conn on"><i></i>Connected · ${L.email}</span>` : `<span class="cm-conn">${ic("phone", 13)} Not connected yet — scan the QR code above to start</span>`);
  } else if (s === "synced" || s === "approved") {
    rows = row("Submission status", "Submitted for grading", "ok") +
      row("Grading status", s === "approved" ? "Graded · 8.89 / 10" : "Not graded", s === "approved" ? "ok" : "") +
      row("Last modified", CONFIG.submittedAt) +
      row("File submissions", file(`Training report — ${CONFIG.practiceProject.name}.pdf`, "4 pages · 1.8 MB", `${rsLogo(13)} Synced automatically from RadonSketch`)) +
      row("Auto-checks", checks) +
      (s === "approved" ? row("Feedback comments", `<div class="cm-fb"><span class="cm-avatar sm">${I.initials}</span><div><b>${I.name}</b><p>“${I.feedback}”</p></div></div>`) : "");
  } else if (s === "manual") {
    const up = p.upload === "uploading";
    rows = row("Submission status", "No submissions have been made yet") + row("File submissions", `<div class="cm-drop ${up ? "busy" : ""}" data-action="pUpload">
      ${ic("upload", 26)}<b>Upload your RadonSketch report (PDF)</b><small>You can drag and drop files here to add them. Maximum size 20 MB.</small>
      ${up ? `<div class="p-upbar"><i></i></div><small>Uploading Training-report_Prairie-View.pdf…</small>` : ""}</div>`);
  } else if (s === "uploaded") {
    rows = row("Submission status", "Submitted for grading", "ok") + row("Grading status", "Not graded") + row("Last modified", CONFIG.uploadedAt) +
      row("File submissions", file("Training-report_Prairie-View.pdf", "1.8 MB", `${ic("upload", 13)} Uploaded manually`)) +
      row("Auto-checks", `<span class="cm-warn">${ic("info", 13)} Not available for manual uploads — your instructor will review the PDF.</span>`);
  }
  return `<div class="cm-subm" data-anchor="submission">
    <div class="cm-subm-h"><b>Submission status</b><div class="demo-switch"><span>Demo state</span>${sw("waiting", "Waiting", ["waiting"])}${sw("synced", "Synced automatically", ["synced", "approved"])}${sw("manual", "Manual PDF upload", ["manual", "uploaded"])}</div></div>
    <table class="cm-stable">${rows}</table>
    ${s === "waiting" ? `<div class="cm-subm-f"><button class="cm-btn" data-action="pState" data-arg="manual">Add submission (PDF)</button><span>or submit from the RadonSketch app — it syncs here automatically.</span></div>` : ""}
  </div>`;
}

/* ---------- 2d · Grades ---------- */
function gradesContent(p) {
  const c = FEATURED(), graded = p.submission === "approved";
  const labFeedback = ["synced", "approved"].includes(p.submission) ? "8 of 9 compliance checks passed (auto-checked by RadonSketch)" : p.submission === "uploaded" ? "Manual PDF — awaiting review" : "-";
  return `<div class="cm-crumb" data-anchor="top">Home - My courses - ${c.code} - Grades - Grade administration - User report</div>
    ${cmTabs(p)}
    <h1 class="cm-title">${c.title}</h1>
    <button class="cm-select" data-action="ext" data-arg="Report selector">User report ${ic("chev-down", 14)}</button>
    <div class="cm-user"><span class="cm-avatar">${CONFIG.learner.initials}</span><b>${CONFIG.learner.name}</b></div>
    <div class="cm-grades">
      <div class="g-row g-head"><span>Grade item</span><span>Calculated weight</span><span>Grade</span><span>Range</span><span>Percentage</span><span>Feedback</span><span>Contribution to course total</span></div>
      <div class="g-row g-cat"><span>${ic("chev-down", 13)} ${c.title}</span></div>
      <div class="g-row"><span class="g-item"><small>QUIZ</small><button class="ext" data-action="ext" data-arg="Quiz review">QUIZ (40 questions)</button></span><span>${graded ? "50.00 %" : "100.00 %"}</span><span class="g-grade">${ic("check", 13)} 9.00</span><span>0–10</span><span>90.00 %</span><span></span><span>${graded ? "45.00 %" : "90.00 %"}</span></div>
      <div class="g-row g-lab"><span class="g-item"><small>PRACTICE LAB · RADONSKETCH</small><button class="ext" data-action="cmTab" data-arg="course">PRACTICE LAB · RadonSketch mitigation design</button></span>
        <span>${graded ? "50.00 %" : "0.00 %<br>( Empty )"}</span><span class="g-grade">${graded ? `${ic("check", 13)} 8.89` : "-"}</span><span>0–10</span><span>${graded ? "88.89 %" : "-"}</span>
        <span class="g-fb">${labFeedback}</span><span>${graded ? "44.44 %" : "0.00 %"}</span></div>
      <div class="g-row g-total"><span class="g-item"><small>AGGREGATION</small><b>Course total</b></span><span>-</span><span><b>${graded ? "89.44" : "90.00"}</b></span><span>0–100</span><span>${graded ? "89.44 %" : "90.00 %"}</span><span></span><span>-</span></div>
    </div>`;
}
function compsContent() {
  const c = FEATURED();
  return `<div class="cm-crumb" data-anchor="top">Home - My courses - ${c.code} - Competencies</div>
    ${cmTabs(S.portal)}
    <h1 class="cm-title">Course: ${c.title}</h1>
    <div class="cm-filter"><span>${ic("x", 12)} No filters applied</span></div>
    <button class="cm-fsel" data-action="ext" data-arg="Competency filter">Filter competencies by resource or activity ${ic("chev-down", 13)}</button>
    <h2 class="cm-h2">Course competencies</h2>
    <div class="cm-empty">No competencies have been linked to this course.</div>`;
}

/* ---------- 2e · Instructor review ---------- */
function instructorContent(p) {
  const rows = CONFIG.reviewQueue.map((r) => ({ ...r, status: p.reviews[r.id] || (r.id === "r1" && p.submission === "approved" ? "approved" : r.status) }));
  const sel = rows.find((r) => r.id === p.selected) || rows[0];
  const stLabel = { review: "Needs grading", approved: "Graded · approved", changes: "Changes requested" };
  const review = rows.filter((r) => r.status === "review").length;
  const ini = (n) => n.split(" ").map((x) => x[0]).join("");
  const checksFor = (r) => {
    if (r.source === "pdf") return `<div class="i-nochecks">${ic("info", 14)} Manual PDF upload — no auto-check data. Review the PDF directly.</div>`;
    const items = r.id === "r1" ? complianceItems(true) : CONFIG.compliance.map((c, i) => ({ ...c, status: c.status === "pending" ? "pending" : i < r.passed ? "pass" : "warn" }));
    return `<ul class="i-checks">${items.map((c) => `<li class="${c.status}">${c.status === "pass" ? ic("check", 12) : c.status === "warn" ? ic("alert", 12) : ic("clock", 12)}<span>${c.label}</span></li>`).join("")}</ul>`;
  };
  return `<div class="cm-crumb">Home - My courses - ${FEATURED().code} - Topic 4 - RadonSketch Practice Lab - Submissions</div>
    <h1 class="cm-title sm">PRACTICE LAB: Submit your RadonSketch report</h1>
    <p class="cm-desc">${rsLogo(16)} Auto-checks are provided by RadonSketch for submissions synced from the app.</p>
    <div class="cm-gsum">
      <div><span>Participants</span><b>${rows.length + 7}</b></div><div><span>Submitted</span><b>${rows.length + 4}</b></div>
      <div><span>Needs grading</span><b>${review}</b></div><div><span>Synced from RadonSketch</span><b>83%</b></div>
    </div>
    <div class="i-grid">
      <div class="cm-itable">
        <div class="i-tr i-th"><span>Learner</span><span>Last modified</span><span>Source</span><span>Auto-checks</span><span>Status</span></div>
        ${rows.map((r) => `<button class="i-tr ${r.id === sel.id ? "sel" : ""}" data-action="pSelect" data-arg="${r.id}">
          <span class="i-name"><span class="cm-avatar sm">${ini(r.name)}</span>${r.name}</span><span>${r.when}</span>
          <span>${r.source === "sync" ? `<em class="src sync">${rsLogo(12)} RadonSketch</em>` : `<em class="src pdf">${ic("upload", 12)} Manual PDF</em>`}</span>
          <span>${r.passed == null ? `<span class="muted">—</span>` : `<b class="sc ${r.passed >= 8 ? "good" : r.passed >= 7 ? "mid" : "low"}">${r.passed} / 9</b>`}</span>
          <span><em class="rv-st ${r.status}">${stLabel[r.status]}</em></span></button>`).join("")}
      </div>
      <div class="cm-idetail">
        <div class="i-d-head"><span class="cm-avatar">${ini(sel.name)}</span><div><b>${sel.name}</b><small>${sel.when} · ${sel.source === "sync" ? "synced from RadonSketch" : "manual PDF upload"}</small></div><em class="rv-st ${sel.status}">${stLabel[sel.status]}</em></div>
        <div class="i-d-body"><div class="i-prev">${scaled(reportDoc(true), 150, 420, 594)}</div><div class="i-d-checks"><b>Auto-check results</b>${checksFor(sel)}</div></div>
        <textarea class="i-fb" placeholder="Feedback comments (optional)">${sel.status === "approved" && sel.id === "r1" ? CONFIG.instructor.feedback : ""}</textarea>
        <div class="i-acts"><button class="cm-btn ghost" data-action="pRequest">Request changes</button><button class="cm-btn" data-action="pApprove">${ic("check", 14)} Approve</button></div>
        <p class="i-fine">Approving marks the Practice Lab complete and unlocks Topic 5 (Course Evaluation) for the learner.</p>
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
    <p class="hub-sub">CERTI courses inside the RadonSketch app, and RadonSketch inside CERTI courses: two ways to grow, one connected learning experience.</p>
    <div class="hub-diagram">
      <div class="hd-node rs">
        <div class="hd-logo">${rsLogo(44)}</div><b>RadonSketch</b><small>Mobile app for radon mitigation professionals</small>
        <ul><li>Site assessment & Diagnostic</li><li>Radon Builder + live compliance</li><li>BOM & PDF reports</li></ul>
      </div>
      <div class="hd-flows">
        <div class="hd-flow f1"><span class="hd-num">1</span><div><b>RadonSketch users → CERTI courses</b><small>A Courses tab in the app: browse, buy and take CERTI courses</small></div><svg viewBox="0 0 300 24" class="hd-arrow"><path d="M4 12h284"/><path d="m280 4 10 8-10 8"/></svg></div>
        <div class="hd-mid">${ic("sync", 18)} Shared practice projects & report sync</div>
        <div class="hd-flow f2"><svg viewBox="0 0 300 24" class="hd-arrow"><path d="M296 12H12"/><path d="m20 4-10 8 10 8"/></svg><span class="hd-num">2</span><div><b>CERTI learners → RadonSketch</b><small>A “RadonSketch Practice Lab” topic introduces the app via QR code and a ready-made project</small></div></div>
      </div>
      <div class="hd-node partner">
        <div class="hd-logo">${partnerLogo("hublogo")}</div><b>${P.fullName}</b><small>Independent radon training provider · ${P.domain}</small>
        <ul><li>Entry Level – Radon</li><li>Continuing Education – Radon</li><li>Vapor Intrusion & Exam Preparation</li></ul>
      </div>
    </div>
    <div class="hub-cards">
      <button class="hub-card" data-action="mode" data-arg="flowA"><span class="hc-ic rs">${ic("phone", 26)}</span><span class="hc-tag">Flow A · Phone</span><b>CERTI courses inside the RadonSketch app</b><small>Browse, buy and take CERTI courses in the app, including the Practice Lab, report and submission.</small><span class="hc-go">Open ${ic("arrow", 16)}</span></button>
      <button class="hub-card" data-action="mode" data-arg="flowB"><span class="hc-ic partner">${ic("monitor", 26)}</span><span class="hc-tag">Flow B · Web</span><b>Practice Lab on CERTI's platform</b><small>My Account, the C-102 course page with Topic 4, submission states, Grades and instructor review.</small><span class="hc-go">Open ${ic("arrow", 16)}</span></button>
      <button class="hub-card feature" data-action="mode" data-arg="story"><span class="hc-ic both">${ic("split", 26)}</span><span class="hc-tag">Presenter mode · ${STORY.length} steps</span><b>Full story — both flows side by side</b><small>CERTI and the phone update together, one step at a time, with a caption for each step.</small><span class="hc-go">Start ${ic("arrow", 16)}</span></button>
    </div>
    <p class="hub-tip">Tips: In Full story, use ← → to move between steps. Press Esc to return to this hub at any time.</p>
  </div>`;
}

function renderFlowA() {
  const a = S.app, cur = currentAKey(a), note = NOTES[cur] || NOTES.projects;
  return `${topbar("Flow A · CERTI courses inside the RadonSketch app", "RadonSketch mobile app · iOS / Android", `<button class="tb-btn" data-action="reset">${ic("refresh", 15)} Reset flow</button>`)}
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
  const crumbs = `<div class="seg-tb">
      <button class="${p.view === "learner" && p.site === "account" ? "on" : ""}" data-action="fbJump" data-arg="account">My Account</button>
      <button class="${p.view === "learner" && p.site === "course" && p.tab === "course" ? "on" : ""}" data-action="fbJump" data-arg="course">Course</button>
      <button class="${p.view === "learner" && p.site === "course" && p.tab === "grades" ? "on" : ""}" data-action="fbJump" data-arg="grades">Grades</button></div>`;
  return `${topbar("Flow B · Practice Lab on CERTI's platform", "certi.us · My Account + course area", crumbs + right)}
    <div class="fb-browser frame">${browserFrame(renderPortal(p), 1376, 774, 1376, portalPath(p))}</div>`;
}

function renderStory() {
  const n = S.story.step, st = STORY[n];
  const dimP = st.focus === "app" ? "is-dim" : "", dimA = st.focus === "portal" ? "is-dim" : "";
  return `${topbar("Full story · both flows side by side", "CERTI course area (web) + RadonSketch (phone)", `<button class="tb-btn" data-action="reset">${ic("refresh", 15)} Reset demo</button>`)}
    <div class="st-lbl b">${ic("monitor", 15)} ${P.fullName} · C-102 course (web)</div>
    <div class="st-lbl a">${ic("phone", 15)} RadonSketch app</div>
    <div class="st-browser frame ${dimP}">${browserFrame(renderPortal(S.portal), 940, 612, 1280, portalPath(S.portal))}</div>
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
      const v = S.app.video; v.t = Math.min(VIDEO_LEN, v.t + 9);
      const f = document.getElementById("vidFill"), t = document.getElementById("vidTime");
      if (f) f.style.width = (v.t / VIDEO_LEN) * 100 + "%";
      if (t) t.textContent = hms(v.t) + " / " + hms(VIDEO_LEN);
      if (v.t >= VIDEO_LEN) { v.playing = false; render(); }
    }, 120);
  } else if (!playing && vidTimer) { clearInterval(vidTimer); vidTimer = null; }

  // Flow B: bring the newly issued certificate into view
  if (S.portal.scrollCerts) {
    S.portal.scrollCerts = false;
    const el = root.querySelector('[data-anchor="certs"]'), sc = el && el.closest("[data-scroll]");
    if (sc) sc.scrollTo({ top: sc.scrollHeight, behavior: "smooth" });
  }
  // Story: scroll the portal to the part that matters for this step
  if (S.mode === "story" && LAST.story !== S.story.step) {
    LAST.story = S.story.step;
    const anchor = STORY[S.story.step].scroll;
    const el = root.querySelector(`.st-browser [data-anchor="${anchor}"]`);
    const sc = el && el.closest("[data-scroll]");
    if (sc && el) {
      const scale = 940 / 1280 * (root.getBoundingClientRect().width / 1440);
      const top = (el.getBoundingClientRect().top - sc.getBoundingClientRect().top) / scale + sc.scrollTop - 16;
      sc.scrollTo({ top: anchor === "top" ? 0 : top, behavior: "smooth" });
    }
  }
}

function hms(t) {
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = Math.floor(t % 60);
  return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(sec).padStart(2, "0");
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
  openPracticeCard() { S.app.lessonId = "t4"; S.app.courseId = CONFIG.featuredCourseId; go("pp-diag"); },

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
    else if (l.type === "eval") { markDone(a.courseId, id); toast("Course evaluation submitted"); }
    else if (l.type === "cert") toast("Certificate PDF downloaded (sample)");
    else toast("Not part of this prototype");
  },
  togglePlay() { S.app.video.playing = !S.app.video.playing; },
  completeLesson() { const a = S.app; markDone(a.courseId, a.lessonId); back(); toast("Topic complete"); },
  quizPick(i) { const q = S.app.quiz; if (!q.checked) q.picked = +i; },
  quizCheck() { const q = S.app.quiz; if (q.picked != null) q.checked = true; },
  quizRetry() { S.app.quiz = { picked: null, checked: false }; },
  quizDone() { const a = S.app; markDone(a.courseId, a.lessonId); back(); toast(`Quiz passed · ${CONFIG.quiz.score}`); },

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
    if (a.submitChoice === "sync") { markDone(fid, "t4"); a.labState = "submitted"; toast("Topic 4 marked complete"); }
    else { a.labState = "pdf"; toast("Upload your PDF on your CERTI course page"); }
  },

  // Flow A jump list
  aJump(key) {
    const j = A_JUMPS.find((x) => x.key === key);
    EPOCH++; S.app = freshApp(); LAST.phone = LAST.sheet = null; j.set(S.app);
  },

  // portal — account site
  acPage(pg) { const p = S.portal; p.view = "learner"; p.site = "account"; p.page = pg; },
  viewOrder(id) { const p = S.portal; p.site = "account"; p.page = "order"; p.order = id; },
  openCourseArea() { const p = S.portal; p.view = "learner"; p.site = "course"; p.tab = "course"; },
  ext(label) { const p = S.portal; const msg = `“${label || "This link"}” — not part of this prototype`;
    if (S.mode === "flowA") toast(msg); else portalToast(msg); },
  fbJump(where) {
    const p = S.portal; p.view = "learner";
    if (where === "account") { p.site = "account"; p.page = "courses"; } else { p.site = "course"; p.tab = where; }
  },
  // portal — course area
  cmHome() { const p = S.portal; p.site = "account"; p.page = "dashboard"; },
  cmTab(t) { const p = S.portal; p.site = "course"; p.tab = t; },
  cmToggle(id) { const p = S.portal; p.collapsed[id] = !p.collapsed[id]; },
  cmCollapseAll() {
    const p = S.portal, ids = ["s0", "t1", "t2", "t3", "t4", "t5", "t6"], allShut = ids.every((k) => p.collapsed[k]);
    ids.forEach((k) => (p.collapsed[k] = !allShut));
  },
  cmSide() { S.portal.sidebar = !S.portal.sidebar; },
  cmOnly() { S.portal.onlyProgress = !S.portal.onlyProgress; },
  cmCourse(id) {
    const p = S.portal;
    if (id === CONFIG.featuredCourseId) { p.view = "learner"; p.site = "course"; p.tab = "course"; }
    else portalToast("Completed course — your certificate is under My Certificates");
  },
  pView(v) { S.portal.view = v; if (v === "learner" && S.portal.site !== "course") { S.portal.site = "course"; S.portal.tab = "course"; } },
  pState(s) { const p = S.portal; p.submission = s; p.upload = "idle"; if (s === "synced") p.connected = true; },
  pUpload() {
    const p = S.portal; if (p.upload !== "idle") return;
    p.upload = "uploading";
    later(1400, () => { p.upload = "idle"; p.submission = "uploaded"; });
  },
  pEval() {
    const p = S.portal; if (p.submission !== "approved") return;
    p.evalDone = true; p.certIssued = true; p.scrollCerts = true;
    portalToast("Course Evaluation submitted · C-102 certificate added to My Certificates");
  },
  pSelect(id) { S.portal.selected = id; },
  pApprove() {
    const p = S.portal; p.reviews[p.selected] = "approved";
    const r = CONFIG.reviewQueue.find((x) => x.id === p.selected);
    if (p.selected === "r1") { p.submission = "approved"; p.connected = true; S.app.approved = true; }
    portalToast(`Approved · Topic 5 (Course Evaluation) unlocked for ${r.name}`);
  },
  pRequest() {
    const p = S.portal; p.reviews[p.selected] = "changes";
    if (p.selected === "r1" && p.submission === "approved") { p.submission = "synced"; p.evalDone = false; p.certIssued = false; }
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
Object.entries(P.colors).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
document.title = `RadonSketch × ${P.name} — Partnership Prototype`;
fit();
render();
