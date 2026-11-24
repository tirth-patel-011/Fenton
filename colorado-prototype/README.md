# LIRMA Installation Tracker: concept prototypes

Two clickable design prototypes for the Colorado Radon Program pitch. They use HTML, CSS and vanilla JavaScript with sample data, and have no real backend.

> **Concept prototype · sample data. This is not an official State of Colorado system.** All households, people, companies, licences and addresses are fictional.

| Prototype | Open | What it shows |
|---|---|---|
| Full portal | `portal/index.html` | Sign-in, Dashboard, Map View, Jobs, Households, Contractors, Reports, Notifications and Settings. Includes the job modal, the assign-job flow and the report review. |
| Workflow | `workflow/index.html` | The portal in a browser frame (left) and the RadonSketch app in an iPhone frame (right), stepping one job through 14 steps from assignment to approval. |

**To open:** double-click either `index.html`. No server, build step or install is needed.
- **Workflow controls:** use **Next step / Back**, the **← →** keys, the step dots or **Reset demo**.
- **Timed stages:** some steps play a few timed stages, for example warning → fixed. Pressing Next always moves to the next step.

**To share:** `dist/` has a single-file copy of each prototype, `Colorado-LIRMA-Portal-Prototype.html` and `Colorado-LIRMA-Workflow-Prototype.html`. Each one includes all the CSS and JavaScript. The maps load Leaflet and OpenStreetMap tiles when online and switch to the offline Colorado map when not. If you edit `shared/`, rebuild the files in `dist/`.

## Maps
- **Library:** Leaflet 1.9.4 and Leaflet.markercluster 1.5.3, loaded from unpkg at pinned versions with integrity hashes. Tiles come from OpenStreetMap, which needs no API key, and are attributed in the map corner.
- **Colorado only:** every map is limited to the state.
  - The view fits the state boundary on load.
  - Panning is locked with `maxBounds` and `maxBoundsViscosity: 1.0`.
  - You can't zoom out past the whole state.
  - Everything outside the state is masked in grey.
  - County outlines are shown, with labels at state-level zoom.
  - The target button in the corner resets the view to Colorado.
- **Offline:** if Leaflet can't load, every map automatically switches to an offline SVG map of Colorado. It keeps the same county outlines, pins, clustering, the pan/zoom lock and the Reset to Colorado button.
- **Boundary data:** `shared/colorado-geo.js` is generated from US Census cartographic boundaries (public domain, via the `us-atlas` package).

## Editing
Everything editable is in **`shared/data.js` → `CONFIG`**:
- agency name, programme name and portal name
- colours (CSS variables)
- compliance thresholds and the "today" date (America/Denver)
- statuses and colours, and the compliance checks
- households, contractors, notifications and users

The agency name is a single field, so it can change if oversight moves to another department.

## Logos
The `Reference` folder, including both logo folders, was **not available** when this was built, so labelled placeholder boxes are shown instead. To add the real logos:
1. Copy the image inside `Reference/colorado-radon-program-logo.png/` to `assets/colorado-radon-program-logo.<ext>`.
2. Copy the image inside `Reference/radonsketch-logo.png/` to `assets/radonsketch-logo.<ext>`.
3. Set `CONFIG.logos.program` and `CONFIG.logos.radonsketch` in `shared/data.js` to those file names.

## Files
```
portal/index.html          Full portal prototype
workflow/index.html        Side-by-side workflow prototype (+ workflow.js: the 14 steps)
shared/data.js             CONFIG + all sample data
shared/styles.css          Design tokens and components (portal, phone, workflow)
shared/store.js            Builds records from sample data; every job operation (assign → approve)
shared/map.js              Colorado-only map (Leaflet, with offline SVG fallback)
shared/colorado-geo.js     Colorado state and county boundaries
shared/ui.js               Icons, badges, gauge, charts, timeline, floor plan, report document
shared/portal.js           Portal shell, routing, tables (search, filters, sort, pagination)
shared/portal-pages.js     Portal screens, modals and actions
shared/phone.js            RadonSketch app screens
assets/                    Logos (see above)
```
