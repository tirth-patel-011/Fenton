# LIRMA Installation Tracker: concept prototypes

Two clickable design prototypes for the Colorado Radon Program pitch. They use HTML, CSS and vanilla JavaScript with sample data, and have no real backend.

> **Concept prototype · sample data. This is not an official State of Colorado system.** All households, people, companies, licences and addresses are fictional.

| Prototype | Open | What it shows |
|---|---|---|
| Full portal | `portal/index.html` | Sign-in, Dashboard, Map View, Jobs, Households, Contractors, Reports, Notifications and Settings. Includes the job modal, the assign-job flow and the report review. |
| Workflow | `workflow/index.html` | The portal in a browser frame (left) and the RadonSketch app in an iPhone frame (right), stepping one job through 14 steps from assignment to approval. |

**To open:** double-click either `index.html`. No server, build step or install is needed.
- **Workflow controls:** use **Next step / Back**, the **← →** keys, the step dots or **Reset demo**.
- **Manual only:** the demo never advances by itself. Some steps have 2–3 parts (shown as "Step 8 of 14 · 1/2"), for example warning → fixed. Each Next press shows the next part, then moves to the next step. Back reverses one part at a time.

**To share:** `dist/` has a single-file copy of each prototype, `Colorado-LIRMA-Portal-Prototype.html` and `Colorado-LIRMA-Workflow-Prototype.html`. Each one includes all the CSS and JavaScript. The maps load Leaflet and street-map tiles when online and switch to the offline Colorado map when not. If you edit `shared/`, rebuild the files in `dist/`.

## Maps
- **Library:** Leaflet 1.9.4 and Leaflet.markercluster 1.5.3, loaded from unpkg at pinned versions with integrity hashes.
- **Street tiles:** CARTO Voyager (OpenStreetMap data, no API key), with Esri World Street Map as an automatic backup. Both are attributed in the map corner, and the list is in `CONFIG.map.tiles`.
  - OpenStreetMap's own tile server (`tile.openstreetmap.org`) is not used because it blocks pages opened from a local file and shows "Access blocked" tiles.
  - For production, the state would use its own licensed tile service.
- **Colorado only:** every map is limited to the state.
  - The view fits the state boundary on load.
  - Panning is locked with `maxBounds` and `maxBoundsViscosity: 1.0`.
  - You can't zoom out past the whole state.
  - Everything outside the state is masked in grey.
  - County outlines are shown, with labels at state-level zoom.
  - The target button in the corner resets the view to Colorado.
- **Filters:** Map View filters apply as soon as they change. The map then frames the result: a county zooms to that county, a ZIP radius to the circle, and other filters to the matching households. Clearing the filters returns to the whole state. When nothing matches, a "No results" message appears.
- **ZIP code and radius:** type any Colorado ZIP code (all 527 are built in) and it applies as soon as the fifth digit is entered. Partial input lists matching ZIPs with their county, and a ZIP from outside Colorado is flagged.
  - **ZIP only:** households in that ZIP, and contractors serving that ZIP's county.
  - **ZIP + radius (5, 10, 25, 50 or 100 mi):** also includes every household and contractor within that distance of the ZIP's centre. The circle is drawn on the map.
  - Choosing a radius before a ZIP prompts for the ZIP, because the radius is measured from it.
  - The ZIP filter works the same with Google Maps, the standard map and the offline map, and it makes no Google calls.
- **Offline:** if Leaflet can't load, every map automatically switches to an offline SVG map of Colorado. It keeps the same county outlines, pins, clustering, the pan/zoom lock and the Reset to Colorado button.
- **Boundary data:** `shared/colorado-geo.js` is generated from US Census cartographic boundaries (public domain, via the `us-atlas` package).
- **ZIP data:** `shared/colorado-zips.js` holds the centre point and county of each Colorado ZIP code. It comes from US Census ZIP Code Tabulation Areas (public domain, via the MIT-licensed `us-zips` package), with each county found from the boundary data above.

## Google Maps Platform (optional, real address search)
With a Google Maps Platform key, the portal uses real Google services:
- Google street map on every map, still locked to Colorado.
- Address and place search on Map View: the pin, the county, nearby LIRMA households and the contractors serving that address, plus "Add as LIRMA household".
- Address autocomplete in Add Household, giving the household its exact location.

**Adding the key:** open **Settings → Google Maps Platform**, paste the key and choose **Save & connect**.
- The key is saved **only in that browser** (local storage), never in these files, so files you share don't contain it.
- The workflow demo opened in the same browser uses it too.
- With no key, or if Google rejects it, everything uses the standard map.

**Key setup in Google Cloud Console:**
1. Enable **Maps JavaScript API** and **Places API (New)**.
2. Make sure billing is enabled.
3. Restrict the key to those two APIs, and set a quota or budget alert.
4. Leave website (HTTP referrer) restrictions off while opening the prototype by double-clicking, because a local file has no website address. Add them once the prototype is hosted on a website.

`CONFIG.google.mapId` is Google's test ID `DEMO_MAP_ID`; create your own Map ID for production.

## Editing
Everything editable is in **`shared/data.js` → `CONFIG`**:
- agency name, programme name and portal name
- colours (CSS variables)
- compliance thresholds and the "today" date (America/Denver)
- statuses and colours, and the compliance checks
- households, contractors, notifications and users

The agency name is a single field, so it can change if oversight moves to another department.

## Logos
Both logos are used exactly as supplied, and the single-file versions in `dist/` embed them, so they show wherever the file is opened.
- **Colorado logo:** `assets/colorado-radon-program-logo.svg` ("Colorado · CDPHE · Environmental Public Health Tracking"). It appears on the sign-in page, on a white panel at the top of the sidebar, and in the report header.
- **RadonSketch logo:** `assets/radonsketch-logo.svg` is the RadonSketch app icon. It's shown as an app tile with the name "RadonSketch" beside it under "Powered by" in the sidebar, on the sign-in page and in Settings. It's also the app icon on the phone's notifications in the workflow demo.
## Files
```
portal/index.html          Full portal prototype
workflow/index.html        Side-by-side workflow prototype (+ workflow.js: the 14 steps)
shared/data.js             CONFIG + all sample data
shared/styles.css          Design tokens and components (portal, phone, workflow)
shared/store.js            Builds records from sample data; every job operation (assign → approve)
shared/map.js              Colorado-only map (Leaflet, with offline SVG fallback)
shared/colorado-geo.js     Colorado state and county boundaries
shared/colorado-zips.js    Colorado ZIP codes (centre point and county) for the ZIP filter
shared/ui.js               Icons, badges, gauge, charts, timeline, floor plan, report document
shared/portal.js           Portal shell, routing, tables (search, filters, sort, pagination)
shared/portal-pages.js     Portal screens, modals and actions
shared/phone.js            RadonSketch app screens
assets/                    Logos (see above)
```
