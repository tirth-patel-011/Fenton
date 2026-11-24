/* ===========================================================================
   LIRMA Installation Tracker — concept prototype
   ALL EDITABLE CONTENT LIVES HERE: agency, programme, portal name, colours,
   compliance thresholds, "today", and every piece of sample data.
   Everything below is FICTIONAL sample data — not real households, people,
   companies, licences or addresses.
   =========================================================================== */
window.CONFIG = {
  // --- Branding & wording --------------------------------------------------
  agency: {
    name: "Colorado Department of Public Health and Environment", // change if oversight moves departments
    short: "CDPHE",
  },
  program: {
    name: "Colorado Radon Program",
    lirma: "LIRMA",
    lirmaFull: "Low-Income Radon Mitigation Assistance",
  },
  portal: {
    name: "LIRMA Installation Tracker",
    poweredBy: "RadonSketch",
    url: "lirma-tracker.example.gov", // placeholder address shown in the workflow browser frame
  },
  disclaimer: "Concept prototype · sample data — not an official State of Colorado system",

  // Street-map tiles, tried in order. If a provider fails to load, the next one is used automatically.
  // If none load (or the map library itself can't load), an offline SVG map of Colorado is shown.
  // Note: OpenStreetMap's own tile server (tile.openstreetmap.org) blocks pages opened from a local
  // file ("Access blocked"), so the defaults are OSM-based providers that allow it.
  // For production, the state would use its own licensed tile service.
  // Google Maps Platform (optional). Leave apiKey EMPTY: the key is entered in the portal under
  // Settings → Google Maps Platform and saved only in that browser, so shared files never contain it.
  // Needs "Maps JavaScript API" + "Places API (New)". "DEMO_MAP_ID" is Google's test map ID —
  // create your own Map ID in Google Cloud Console for production.
  google: { apiKey: "", mapId: "DEMO_MAP_ID" },

  map: {
    tiles: [
      {
        name: "CARTO Voyager (OpenStreetMap data)",
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        subdomains: "abcd", maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
      },
      {
        name: "Esri World Street Map",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 19,
        attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a> &mdash; Esri, HERE, Garmin, USGS, EPA, NPS',
      },
    ],
  },
  signedInUser: { name: "Jordan Reyes", role: "Program Coordinator", initials: "JR", email: "jordan.reyes@example.gov" },

  // Logo files in colorado-prototype/assets/. Set each to its file name once the logo is copied in,
  // e.g. "colorado-radon-program-logo.png". null = show a labelled placeholder box (no file available yet).
  logos: {
    program: null,      // → "colorado-radon-program-logo.<ext>"
    radonsketch: null,  // → "radonsketch-logo.<ext>"
  },

  // Portal colours (Colorado state palette — see README; edit freely). Applied as CSS variables.
  colors: {
    "--co-navy": "#13294B",      // sidebar
    "--co-navy-2": "#1D3A63",    // sidebar hover
    "--co-blue": "#1D5FAD",      // primary buttons, links, active states
    "--co-blue-dark": "#164B8A",
    "--co-blue-soft": "#E8F0FA", // active row / tab backgrounds
    "--co-gold": "#F2B705",      // accent (active nav indicator)
    "--co-red": "#C8102E",
  },

  // --- Rules ---------------------------------------------------------------
  timezone: "America/Denver",
  timezoneLabel: "MST",
  today: "2026-11-10",          // the prototype's "today" (Tuesday)
  nowTime: "09:12",
  actionLevel: 4.0,             // pCi/L — homes above this after mitigation are flagged
  standard: "ANSI/AARST SGM-SF-2023",
  thresholds: { good: 70, great: 90 }, // POOR < good ≤ GOOD < great ≤ GREAT
  reviewOverdueDays: 3,
  credentialWarnDays: 30,

  // Job statuses (order = lifecycle). Colours are used everywhere: badges, map pins, calendar.
  statuses: [
    { key: "unassigned", label: "Unassigned", color: "#7A8699" },
    { key: "assigned", label: "Assigned", color: "#2E6BD8" },
    { key: "scheduled", label: "Scheduled", color: "#0E8A9E" },
    { key: "inprogress", label: "In Progress", color: "#E08A00" },
    { key: "submitted", label: "Report Submitted", color: "#5B5BD6" },
    { key: "corrections", label: "Corrections Required", color: "#D64545" },
    { key: "approved", label: "Approved", color: "#2E9E5B" },
    { key: "closed", label: "Closed", color: "#3F4B5B" },
  ],

  // ANSI/AARST SGM-SF-2023 checks reported from RadonSketch (sample list)
  checks: [
    { key: "slope", label: "Pipe slope toward suction point" },
    { key: "fan", label: "Fan location outside conditioned space" },
    { key: "clearance", label: "Vent termination clearance from windows/doors" },
    { key: "height", label: "Vent height above roof" },
    { key: "material", label: "Pipe material (Schedule 40 PVC/ABS)" },
    { key: "label", label: "System labelling" },
    { key: "manometer", label: "Pressure indicator (manometer) installed" },
    { key: "sealing", label: "Sealing of cracks and openings" },
    { key: "sump", label: "Sump lid sealed (where present)" },
    { key: "posttest", label: "Post-mitigation test completed" },
  ],

  // Programme history before the sample period (sample figures)
  history: {
    year: 2026,
    completedByMonth: [3, 4, 6, 7, 8, 9, 7, 8, 5, 4, 0, 0], // Jan–Dec, completed before the sample jobs below
    fundsCommittedBefore: 182400,
    homesMitigatedBefore: 61,
    avgDaysBefore: 23,
  },

  // --- Cities used for sample households (approximate city centres) -------
  cities: {
    "Denver": { county: "Denver", lat: 39.7392, lng: -104.9903, area: "303" },
    "Aurora": { county: "Arapahoe", lat: 39.7083, lng: -104.8167, area: "720" },
    "Lakewood": { county: "Jefferson", lat: 39.7047, lng: -105.0814, area: "303" },
    "Colorado Springs": { county: "El Paso", lat: 38.8339, lng: -104.8214, area: "719" },
    "Pueblo": { county: "Pueblo", lat: 38.2544, lng: -104.6091, area: "719" },
    "Fort Collins": { county: "Larimer", lat: 40.5853, lng: -105.0844, area: "970" },
    "Loveland": { county: "Larimer", lat: 40.3978, lng: -105.0749, area: "970" },
    "Greeley": { county: "Weld", lat: 40.4233, lng: -104.7091, area: "970" },
    "Boulder": { county: "Boulder", lat: 40.015, lng: -105.2705, area: "303" },
    "Longmont": { county: "Boulder", lat: 40.1672, lng: -105.1019, area: "303" },
    "Grand Junction": { county: "Mesa", lat: 39.0639, lng: -108.5506, area: "970" },
    "Montrose": { county: "Montrose", lat: 38.4783, lng: -107.8762, area: "970" },
    "Durango": { county: "La Plata", lat: 37.2753, lng: -107.8801, area: "970" },
    "Alamosa": { county: "Alamosa", lat: 37.4695, lng: -105.87, area: "719" },
    "Glenwood Springs": { county: "Garfield", lat: 39.5505, lng: -107.3248, area: "970" },
    "Sterling": { county: "Logan", lat: 40.6255, lng: -103.2077, area: "970" },
    "Cañon City": { county: "Fremont", lat: 38.441, lng: -105.2424, area: "719" },
  },

  // --- Contractors (7, fictional) ------------------------------------------
  // score = target compliance score (% of checks passed); historyChecks = checks from earlier
  // programme jobs not listed below (used so the score is computed from real check counts).
  contractors: [
    {
      id: "CTR-01", name: "Juniper Basin Radon Co.", status: "Active", score: 94, historyChecks: 40,
      person: "Dana Okoye", licence: "CO-RMP-24-0187", cert: { body: "NRPP", number: "NRPP-108452-RMT", expiry: "2027-08-31" },
      insurance: { carrier: "Bristlecone Mutual Insurance", expiry: "2027-03-15" }, licenceExpiry: "2027-06-30",
      base: { city: "Pueblo", lat: 38.2711, lng: -104.6302, address: "410 Foundry Row, Pueblo, CO 81003" },
      counties: ["Pueblo", "Fremont", "El Paso", "Custer", "Otero"],
      phone: "(719) 555-0110", email: "dispatch@juniperbasin.example",
      team: [
        { name: "Dana Okoye", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-24-0187" },
        { name: "Luis Arredondo", role: "Lead Installer", licence: "CO-RMP-24-0233" },
        { name: "Mae Thornquist", role: "Installer", licence: "CO-RMI-25-0412" },
      ],
      hist: { completed: 19, avgReduction: 89, onTime: 97 }, firstJob: "2024-04-16", lastActivity: "2026-11-09T16:40",
      notes: [{ by: "Jordan Reyes", at: "2026-10-02T10:15", text: "Consistently clean reports. Good candidate for southern Colorado overflow jobs." }],
      trend: [90, 91, 93, 92, 93, 94, 94, 93, 94, 94],
    },
    {
      id: "CTR-02", name: "Cobalt Pass Radon Co.", status: "Active", score: 91, historyChecks: 60,
      person: "Priya Venkataraman", licence: "CO-RMP-24-0102", cert: { body: "NRPP", number: "NRPP-104377-RMT", expiry: "2027-04-30" },
      insurance: { carrier: "Highwater Assurance", expiry: "2027-01-31" }, licenceExpiry: "2027-05-31",
      base: { city: "Denver", lat: 39.7686, lng: -104.9744, address: "2201 Larimer Annex, Denver, CO 80205" },
      counties: ["Denver", "Adams", "Arapahoe", "Jefferson", "Boulder", "Broomfield", "Douglas"],
      phone: "(303) 555-0121", email: "ops@cobaltpass.example",
      team: [
        { name: "Priya Venkataraman", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-24-0102" },
        { name: "Marcus Feld", role: "Licensed Mitigation Professional", licence: "CO-RMP-24-0145" },
        { name: "Renata Ochoa", role: "Lead Installer", licence: "CO-RMI-24-0310" },
        { name: "Theo Banks", role: "Installer", licence: "CO-RMI-25-0498" },
        { name: "Ines Carvalho", role: "Installer", licence: "CO-RMI-25-0502" },
      ],
      hist: { completed: 31, avgReduction: 91, onTime: 94 }, firstJob: "2024-03-04", lastActivity: "2026-11-10T08:58",
      notes: [{ by: "Sam Whitfield", at: "2026-09-18T14:02", text: "Largest Front Range capacity. Watch workload before assigning more Aurora jobs." }],
      trend: [88, 89, 90, 90, 91, 92, 91, 90, 91, 91],
    },
    {
      id: "CTR-03", name: "Kestrel Peak Air Works", status: "Active", score: 83, historyChecks: 50,
      person: "Owen Matsuda", licence: "CO-RMP-24-0219", cert: { body: "NRSB", number: "NRSB-21R0456", expiry: "2027-02-28" },
      insurance: { carrier: "Yucca Line Casualty", expiry: "2026-12-01" }, licenceExpiry: "2027-07-31",
      base: { city: "Colorado Springs", lat: 38.8601, lng: -104.7912, address: "88 Garden Spur Rd, Colorado Springs, CO 80907" },
      counties: ["El Paso", "Teller", "Pueblo", "Fremont", "Douglas"],
      phone: "(719) 555-0133", email: "office@kestrelpeak.example",
      team: [
        { name: "Owen Matsuda", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-24-0219" },
        { name: "Bea Lindahl", role: "Lead Installer", licence: "CO-RMI-24-0377" },
        { name: "Carlos Ybarra", role: "Installer", licence: "CO-RMI-25-0451" },
      ],
      hist: { completed: 14, avgReduction: 84, onTime: 88 }, firstJob: "2024-06-10", lastActivity: "2026-11-09T11:20",
      notes: [{ by: "Jordan Reyes", at: "2026-10-27T09:40", text: "Two recent reports missing manometer photos. Discussed on call — improvement expected." }],
      trend: [79, 80, 82, 81, 83, 84, 82, 83, 82, 83],
    },
    {
      id: "CTR-04", name: "Tallgrass Mesa Environmental", status: "Active", score: 78, historyChecks: 50,
      person: "Hollis Grant", licence: "CO-RMP-24-0244", cert: { body: "NRPP", number: "NRPP-109921-RMT", expiry: "2027-05-31" },
      insurance: { carrier: "Bristlecone Mutual Insurance", expiry: "2027-04-30" }, licenceExpiry: "2026-11-30",
      base: { city: "Greeley", lat: 40.4106, lng: -104.7275, address: "1500 Elevator Ave, Greeley, CO 80631" },
      counties: ["Weld", "Larimer", "Morgan", "Logan", "Boulder"],
      phone: "(970) 555-0144", email: "jobs@tallgrassmesa.example",
      team: [
        { name: "Hollis Grant", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-24-0244" },
        { name: "Nadia Petrov", role: "Licensed Mitigation Professional", licence: "CO-RMP-25-0301" },
        { name: "Eli Strand", role: "Installer", licence: "CO-RMI-25-0466" },
        { name: "June Abara", role: "Installer", licence: "CO-RMI-25-0470" },
      ],
      hist: { completed: 22, avgReduction: 86, onTime: 90 }, firstJob: "2024-05-02", lastActivity: "2026-11-10T08:41",
      notes: [{ by: "Sam Whitfield", at: "2026-11-02T13:30", text: "State licence renewal due 30 Nov — reminder sent." }],
      trend: [74, 75, 76, 78, 77, 79, 78, 77, 78, 78],
    },
    {
      id: "CTR-05", name: "Red Willow Radon Systems", status: "Active", score: 66, historyChecks: 50,
      person: "Garrett Lunde", licence: "CO-RMP-24-0266", cert: { body: "NRPP", number: "NRPP-110385-RMT", expiry: "2026-10-31" },
      insurance: { carrier: "Highwater Assurance", expiry: "2027-02-28" }, licenceExpiry: "2027-03-31",
      base: { city: "Grand Junction", lat: 39.0828, lng: -108.5862, address: "640 Ute Siding Rd, Grand Junction, CO 81501" },
      counties: ["Mesa", "Montrose", "Delta", "Garfield"],
      phone: "(970) 555-0155", email: "service@redwillow.example",
      team: [
        { name: "Garrett Lunde", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-24-0266" },
        { name: "Sofia Marchetti", role: "Installer", licence: "CO-RMI-25-0489" },
      ],
      hist: { completed: 11, avgReduction: 78, onTime: 76 }, firstJob: "2024-09-23", lastActivity: "2026-11-06T15:05",
      notes: [{ by: "Jordan Reyes", at: "2026-11-04T11:12", text: "Compliance below 70%. Vent clearance and labelling are recurring issues. Schedule a review meeting." }],
      trend: [74, 72, 71, 69, 70, 68, 67, 66, 65, 66],
    },
    {
      id: "CTR-06", name: "Larkspur & Vale Mitigation", status: "Suspended", score: 58, historyChecks: 40,
      person: "Wren Castellanos", licence: "CO-RMP-24-0291", cert: { body: "NRSB", number: "NRSB-22R0718", expiry: "2027-01-31" },
      insurance: { carrier: "Yucca Line Casualty", expiry: "2026-10-15" }, licenceExpiry: "2027-02-28",
      base: { city: "Durango", lat: 37.2911, lng: -107.8714, address: "75 Animas Spur, Durango, CO 81301" },
      counties: ["La Plata", "Montezuma", "Archuleta", "Alamosa", "Rio Grande", "Conejos"],
      phone: "(970) 555-0166", email: "hello@larkspurvale.example",
      team: [
        { name: "Wren Castellanos", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-24-0291" },
        { name: "Abe Kilmer", role: "Installer", licence: "CO-RMI-25-0533" },
      ],
      hist: { completed: 7, avgReduction: 72, onTime: 71 }, firstJob: "2025-02-11", lastActivity: "2026-10-28T10:30",
      notes: [{ by: "Sam Whitfield", at: "2026-10-20T16:45", text: "Suspended: liability insurance lapsed 15 Oct and two homes above 4 pCi/L after mitigation. Reinstatement needs a new certificate of insurance." }],
      trend: [70, 68, 66, 63, 62, 60, 59, 58, 58, 58],
    },
    {
      id: "CTR-07", name: "Sandhill Crane Mitigation", status: "Pending", score: null, historyChecks: 0,
      person: "Tobias Reinholt", licence: "CO-RMP-25-0356", cert: { body: "NRPP", number: "NRPP-115904-RMT", expiry: "2028-06-30" },
      insurance: { carrier: "Bristlecone Mutual Insurance", expiry: "2027-09-30" }, licenceExpiry: "2027-10-31",
      base: { city: "Sterling", lat: 40.6189, lng: -103.2213, address: "302 Platte Bend Rd, Sterling, CO 80751" },
      counties: ["Logan", "Morgan", "Sedgwick", "Phillips", "Washington", "Yuma"],
      phone: "(970) 555-0177", email: "tobias@sandhillcrane.example",
      team: [
        { name: "Tobias Reinholt", role: "Owner · Licensed Mitigation Professional", licence: "CO-RMP-25-0356" },
        { name: "Greta Holm", role: "Installer", licence: "CO-RMI-25-0547" },
      ],
      hist: { completed: 0, avgReduction: null, onTime: null }, firstJob: null, lastActivity: "2026-11-05T12:00",
      notes: [{ by: "Jordan Reyes", at: "2026-11-05T12:05", text: "Onboarding: documents received, RadonSketch invite sent. Awaiting programme agreement signature." }],
      trend: [],
    },
  ],

  // --- Households (40, fictional). One LIRMA job per household. --------------
  // Fields: id, name, street, city, zip, approved (LIRMA approval date), pre (pCi/L),
  // foundation, built, occ (occupants), ctr (contractor id or null), status (job status key),
  // sched ("YYYY-MM-DD HH:MM" visit start), post (post-mitigation pCi/L), extra flags.
  households: [
    { id: "HH-2026-0417", name: "Martinez", street: "1824 Quillfeather Ct", city: "Pueblo", zip: "81004", approved: "2026-11-02", pre: 14.8, foundation: "basement", built: 1958, occ: 4, ctr: null, status: "unassigned", job: "LIRMA-2026-0158", demo: true },
    { id: "HH-2026-0352", name: "Archuleta", street: "611 Saltbush Ave", city: "Pueblo", zip: "81001", approved: "2026-09-08", pre: 22.4, foundation: "crawlspace", built: 1946, occ: 3, ctr: "CTR-01", status: "approved", sched: "2026-10-06 08:00", post: 1.9, approvedOn: "2026-10-21" },
    { id: "HH-2026-0371", name: "Delgado", street: "2930 Chokecherry Ln", city: "Pueblo", zip: "81005", approved: "2026-09-22", pre: 9.7, foundation: "slab-on-grade", built: 1972, occ: 5, ctr: "CTR-01", status: "submitted", sched: "2026-10-29 08:30", post: 1.2, submittedOn: "2026-11-04 15:10" },
    { id: "HH-2026-0398", name: "Kowalski", street: "1407 Prairie Smoke Dr", city: "Pueblo", zip: "81003", approved: "2026-10-14", pre: 6.3, foundation: "basement", built: 1965, occ: 2, ctr: "CTR-01", status: "scheduled", sched: "2026-11-10 13:00" },
    { id: "HH-2026-0388", name: "Haddad", street: "905 Rabbitbrush Way", city: "Cañon City", zip: "81212", approved: "2026-10-05", pre: 18.9, foundation: "combination", built: 1939, occ: 3, ctr: "CTR-01", status: "inprogress", sched: "2026-11-10 08:00", checkedIn: "2026-11-10 08:04" },
    { id: "HH-2026-0344", name: "Whitaker", street: "4410 Gambel Oak Trl", city: "Colorado Springs", zip: "80909", approved: "2026-08-25", pre: 11.2, foundation: "basement", built: 1979, occ: 4, ctr: "CTR-03", status: "closed", sched: "2026-09-15 09:00", post: 1.4, approvedOn: "2026-09-30" },
    { id: "HH-2026-0359", name: "Nguyen", street: "2716 Sideoats Pl", city: "Colorado Springs", zip: "80910", approved: "2026-09-11", pre: 7.8, foundation: "slab-on-grade", built: 1985, occ: 6, ctr: "CTR-03", status: "corrections", sched: "2026-10-19 09:00", post: 2.1, submittedOn: "2026-10-22 16:30", correctionsOn: "2026-10-26 10:05", failKeys: ["manometer"] },
    { id: "HH-2026-0376", name: "Fischer", street: "1550 Blue Grama Ct", city: "Colorado Springs", zip: "80907", approved: "2026-09-29", pre: 25.3, foundation: "basement", built: 1961, occ: 2, ctr: "CTR-03", status: "approved", sched: "2026-10-20 08:00", post: 4.6, approvedOn: "2026-11-02" },
    { id: "HH-2026-0402", name: "Quintana", street: "3309 Mountain Mahogany Dr", city: "Colorado Springs", zip: "80916", approved: "2026-10-19", pre: 5.1, foundation: "slab-on-grade", built: 1994, occ: 3, ctr: "CTR-03", status: "scheduled", sched: "2026-11-12 10:00" },
    { id: "HH-2026-0411", name: "Ellison", street: "718 Yucca Flats Rd", city: "Colorado Springs", zip: "80905", approved: "2026-10-27", pre: 13.6, foundation: "crawlspace", built: 1950, occ: 2, ctr: "CTR-01", status: "assigned" },
    { id: "HH-2026-0339", name: "Moreno", street: "3145 Bluestem Ct", city: "Denver", zip: "80211", approved: "2026-08-18", pre: 16.4, foundation: "basement", built: 1924, occ: 5, ctr: "CTR-02", status: "closed", sched: "2026-09-02 08:00", post: 1.1, approvedOn: "2026-09-16" },
    { id: "HH-2026-0361", name: "Brennan", street: "1288 Silverweed St", city: "Denver", zip: "80204", approved: "2026-09-14", pre: 8.9, foundation: "basement", built: 1948, occ: 2, ctr: "CTR-02", status: "approved", sched: "2026-10-15 09:00", post: 1.3, approvedOn: "2026-11-03" },
    { id: "HH-2026-0384", name: "Tran", street: "4507 Ricegrass Ave", city: "Denver", zip: "80219", approved: "2026-10-01", pre: 12.1, foundation: "basement", built: 1955, occ: 4, ctr: "CTR-02", status: "submitted", sched: "2026-11-04 08:00", post: 1.0, submittedOn: "2026-11-08 11:25" },
    { id: "HH-2026-0405", name: "Okafor", street: "2219 Thimbleberry Way", city: "Denver", zip: "80207", approved: "2026-10-21", pre: 4.2, foundation: "slab-on-grade", built: 1998, occ: 3, ctr: "CTR-02", status: "scheduled", sched: "2026-11-10 09:30" },
    { id: "HH-2026-0347", name: "Sandoval", street: "1960 Needlegrass Dr", city: "Aurora", zip: "80010", approved: "2026-08-28", pre: 19.8, foundation: "basement", built: 1968, occ: 6, ctr: "CTR-02", status: "closed", sched: "2026-09-10 08:30", post: 1.6, approvedOn: "2026-09-25" },
    { id: "HH-2026-0380", name: "Patel", street: "15022 Wild Plum Cir", city: "Aurora", zip: "80012", approved: "2026-09-30", pre: 10.5, foundation: "basement", built: 1983, occ: 4, ctr: "CTR-02", status: "inprogress", sched: "2026-11-09 09:00", checkedIn: "2026-11-09 09:07", installDone: "2026-11-09 15:40" },
    { id: "HH-2026-0408", name: "Becker", street: "820 Fireweed Ln", city: "Aurora", zip: "80011", approved: "2026-10-23", pre: 7.2, foundation: "slab-on-grade", built: 1976, occ: 2, ctr: "CTR-02", status: "assigned" },
    { id: "HH-2026-0356", name: "Romero", street: "6104 Soapweed Ave", city: "Lakewood", zip: "80226", approved: "2026-09-04", pre: 21.7, foundation: "basement", built: 1959, occ: 3, ctr: "CTR-02", status: "approved", sched: "2026-10-08 08:00", post: 1.8, approvedOn: "2026-11-06" },
    { id: "HH-2026-0392", name: "Lindqvist", street: "1371 Arnica Pl", city: "Lakewood", zip: "80232", approved: "2026-10-09", pre: 6.8, foundation: "crawlspace", built: 1951, occ: 2, ctr: "CTR-02", status: "scheduled", sched: "2026-11-13 08:30" },
    { id: "HH-2026-0414", name: "Abernathy", street: "9930 Paintbrush Ct", city: "Lakewood", zip: "80227", approved: "2026-10-30", pre: 30.2, foundation: "basement", built: 1962, occ: 5, ctr: null, status: "unassigned" },
    { id: "HH-2026-0349", name: "Hollis", street: "3022 Pasqueflower Rd", city: "Boulder", zip: "80304", approved: "2026-08-31", pre: 9.4, foundation: "basement", built: 1967, occ: 3, ctr: "CTR-02", status: "closed", sched: "2026-09-21 09:00", post: 0.9, approvedOn: "2026-10-05" },
    { id: "HH-2026-0395", name: "Vasquez", street: "4877 Kinnikinnick Ln", city: "Boulder", zip: "80301", approved: "2026-10-12", pre: 15.0, foundation: "combination", built: 1971, occ: 4, ctr: "CTR-04", status: "scheduled", sched: "2026-11-16 09:00" },
    { id: "HH-2026-0366", name: "Calloway", street: "1145 Stonecrop Dr", city: "Longmont", zip: "80501", approved: "2026-09-17", pre: 11.9, foundation: "basement", built: 1980, occ: 3, ctr: "CTR-04", status: "submitted", sched: "2026-10-30 08:00", post: 1.7, submittedOn: "2026-11-05 14:50" },
    { id: "HH-2026-0409", name: "Ostrowski", street: "702 Prairie Clover St", city: "Longmont", zip: "80504", approved: "2026-10-24", pre: 5.6, foundation: "slab-on-grade", built: 2001, occ: 2, ctr: "CTR-04", status: "assigned" },
    { id: "HH-2026-0341", name: "Garrison", street: "2408 Coneflower Ct", city: "Fort Collins", zip: "80521", approved: "2026-08-20", pre: 13.3, foundation: "basement", built: 1974, occ: 4, ctr: "CTR-04", status: "closed", sched: "2026-09-08 08:00", post: 1.5, approvedOn: "2026-09-24" },
    { id: "HH-2026-0373", name: "Yoder", street: "1630 Gayfeather Ln", city: "Fort Collins", zip: "80525", approved: "2026-09-24", pre: 8.1, foundation: "basement", built: 1988, occ: 5, ctr: "CTR-04", status: "submitted", sched: "2026-10-21 08:30", post: 2.4, submittedOn: "2026-10-26 17:05", correctionsOn: "2026-10-30 09:20", resubmittedOn: "2026-11-06 10:45", failKeys: ["label"] },
    { id: "HH-2026-0400", name: "Ibarra", street: "509 Larkspur Bend", city: "Fort Collins", zip: "80524", approved: "2026-10-16", pre: 17.5, foundation: "crawlspace", built: 1940, occ: 3, ctr: "CTR-04", status: "inprogress", sched: "2026-11-10 08:30", checkedIn: "2026-11-10 08:36" },
    { id: "HH-2026-0363", name: "Sorensen", street: "3318 Harebell Dr", city: "Loveland", zip: "80537", approved: "2026-09-16", pre: 10.8, foundation: "basement", built: 1969, occ: 2, ctr: "CTR-04", status: "inprogress", sched: "2026-11-06 08:00", checkedIn: "2026-11-06 08:11", installDone: "2026-11-06 14:25" },
    { id: "HH-2026-0412", name: "Pruitt", street: "1206 Columbine Way", city: "Loveland", zip: "80538", approved: "2026-10-28", pre: 6.0, foundation: "slab-on-grade", built: 1999, occ: 4, ctr: "CTR-04", status: "scheduled", sched: "2026-11-11 13:00" },
    { id: "HH-2026-0345", name: "Montoya", street: "2611 Saltgrass Ave", city: "Greeley", zip: "80631", approved: "2026-08-26", pre: 12.7, foundation: "basement", built: 1957, occ: 5, ctr: "CTR-04", status: "approved", sched: "2026-09-30 08:00", post: 2.0, approvedOn: "2026-10-16" },
    { id: "HH-2026-0386", name: "Achterberg", street: "1904 Sunflower Ct", city: "Greeley", zip: "80634", approved: "2026-10-03", pre: 9.0, foundation: "slab-on-grade", built: 1978, occ: 3, ctr: "CTR-04", status: "submitted", sched: "2026-11-03 09:00", post: 1.4, submittedOn: "2026-11-09 13:15" },
    { id: "HH-2026-0416", name: "Kinsella", street: "3507 Wheatgrass Dr", city: "Greeley", zip: "80634", approved: "2026-11-01", pre: 7.4, foundation: "basement", built: 1964, occ: 2, ctr: null, status: "unassigned" },
    { id: "HH-2026-0350", name: "Halvorsen", street: "2840 Desert Trumpet Rd", city: "Grand Junction", zip: "81504", approved: "2026-09-01", pre: 8.6, foundation: "crawlspace", built: 1953, occ: 2, ctr: "CTR-05", status: "approved", sched: "2026-10-02 08:00", post: 3.1, approvedOn: "2026-10-23" },
    { id: "HH-2026-0378", name: "Esposito", street: "611 Mesa Primrose Ln", city: "Grand Junction", zip: "81501", approved: "2026-09-28", pre: 16.2, foundation: "slab-on-grade", built: 1960, occ: 4, ctr: "CTR-05", status: "corrections", sched: "2026-10-22 08:00", post: 2.8, submittedOn: "2026-10-28 18:10", correctionsOn: "2026-11-02 15:30", failKeys: ["clearance", "label"] },
    { id: "HH-2026-0407", name: "Larkin", street: "1452 Cliffrose Ave", city: "Grand Junction", zip: "81503", approved: "2026-10-22", pre: 6.9, foundation: "crawlspace", built: 1984, occ: 3, ctr: "CTR-05", status: "assigned" },
    { id: "HH-2026-0369", name: "Cardenas", street: "920 Sagebrush Spur", city: "Montrose", zip: "81401", approved: "2026-09-19", pre: 11.4, foundation: "crawlspace", built: 1975, occ: 4, ctr: "CTR-05", status: "submitted", sched: "2026-10-27 09:00", post: 2.2, submittedOn: "2026-11-03 16:40" },
    { id: "HH-2026-0390", name: "Whitcomb", street: "214 Serviceberry Dr", city: "Glenwood Springs", zip: "81601", approved: "2026-10-07", pre: 38.0, foundation: "basement", built: 1936, occ: 2, ctr: "CTR-05", status: "scheduled", sched: "2026-11-04 09:00" },
    { id: "HH-2026-0358", name: "Castillo", street: "1717 Ponderosa Bend", city: "Durango", zip: "81301", approved: "2026-09-09", pre: 20.6, foundation: "basement", built: 1966, occ: 3, ctr: "CTR-06", status: "corrections", sched: "2026-10-05 08:00", post: 5.2, submittedOn: "2026-10-12 12:20", correctionsOn: "2026-10-16 09:45", failKeys: ["clearance", "sealing", "posttest"] },
    { id: "HH-2026-0403", name: "Valdez", street: "412 Chamisa St", city: "Alamosa", zip: "81101", approved: "2026-10-20", pre: 9.9, foundation: "slab-on-grade", built: 1970, occ: 4, ctr: null, status: "unassigned" },
    { id: "HH-2026-0410", name: "Hartmann", street: "1123 Buffalo Grass Rd", city: "Sterling", zip: "80751", approved: "2026-10-26", pre: 7.7, foundation: "basement", built: 1952, occ: 3, ctr: null, status: "unassigned" },
  ],

  // The household used in the workflow demo and its special instructions
  demo: {
    householdId: "HH-2026-0417",
    jobId: "LIRMA-2026-0158",
    contractorId: "CTR-01",
    professional: "Luis Arredondo",
    instructions: "Older home with unfinished basement and a sump pit. Occupant works nights — call before arriving. Dog on property.",
    visitDate: "2026-11-12",
    visitWindow: "08:00–12:00",
    post: 1.6,
    funded: 2150,
  },

  // Notifications feed (newest first; dates in America/Denver)
  notifications: [
    { at: "2026-11-10 08:41", type: "checkin", text: "Tallgrass Mesa Environmental checked in at Ibarra Household, Fort Collins", job: "Ibarra" },
    { at: "2026-11-10 08:04", type: "checkin", text: "Juniper Basin Radon Co. checked in at Haddad Household, Cañon City", job: "Haddad" },
    { at: "2026-11-09 13:15", type: "report", text: "Report submitted for Achterberg Household (v1) — synced from RadonSketch", job: "Achterberg", unread: true },
    { at: "2026-11-08 11:25", type: "report", text: "Report submitted for Tran Household (v1) — synced from RadonSketch", job: "Tran", unread: true },
    { at: "2026-11-06 10:45", type: "resubmit", text: "Corrections resubmitted for Yoder Household (v2)", job: "Yoder", unread: true },
    { at: "2026-11-06 07:00", type: "overdue", text: "Whitcomb Household visit is 2 days past its scheduled date with no activity", job: "Whitcomb", unread: true },
    { at: "2026-11-05 07:00", type: "credential", text: "Kestrel Peak Air Works — liability insurance expires 1 Dec 2026", contractor: "CTR-03" },
    { at: "2026-11-05 07:00", type: "credential", text: "Tallgrass Mesa Environmental — state licence expires 30 Nov 2026", contractor: "CTR-04" },
    { at: "2026-11-01 07:00", type: "credential", text: "Red Willow Radon Systems — NRPP certification expired 31 Oct 2026", contractor: "CTR-05" },
    { at: "2026-10-28 18:10", type: "report", text: "Report submitted for Esposito Household (v1) — synced from RadonSketch", job: "Esposito" },
  ],

  portalUsers: [
    { name: "Jordan Reyes", email: "jordan.reyes@example.gov", role: "Program Coordinator", last: "2026-11-10 09:10" },
    { name: "Sam Whitfield", email: "sam.whitfield@example.gov", role: "Reviewer/Inspector", last: "2026-11-09 16:22" },
    { name: "Avery Lin", email: "avery.lin@example.gov", role: "Reviewer/Inspector", last: "2026-11-06 11:03" },
    { name: "Morgan Ellery", email: "morgan.ellery@example.gov", role: "Read-only", last: "2026-10-30 14:47" },
  ],
};
