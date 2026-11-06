# RadonSketch × KSU Radon Courses — Partnership Prototype

A clickable **design prototype** for the partnership pitch meeting. It isn't production code: there is no backend, and all data is sample data.

## Open it
Double-click `index.html`. It works offline in Chrome, Edge, Safari or Firefox, with no build step and no server.
It's designed for a 1440×900 laptop screen and scales to fit any window. Use full screen (F11 / ⌃⌘F) when presenting.

| Mode | What it shows |
|---|---|
| **Demo hub** | Two-way value diagram and the three entry points |
| **Flow A** | RadonSketch app in an iPhone frame (A1–A9). Left: jump to any screen. Right: presenter notes |
| **Flow B** | Partner course portal in a browser frame. Top-right: **Learner / Instructor view**. Submission panel has a **Demo state** switch (Waiting · Synced · Manual upload) |
| **Full story** | Portal (left) and phone (right) side by side, in 11 steps with captions. Use **Next step / Back** or the **← →** keys. The dots jump to any step |

**Esc** returns to the hub from anywhere. **Reset** puts the current mode back to its starting state.

## Things worth clicking
- **Flow A:** Courses tab → course → **Enroll** → **Pay** → **Start course** → video (**play**) / quiz (pick **B**, then **Check**) → Practice Lab → **Open practice project** → Radon Builder → **Move exhaust above eave** → **Generate report** → **Submit to course** (choose Sync or PDF).
- **Flow B:** **Manual upload** → click the drop zone. Then **Instructor view** → select a learner → **Approve** / **Request changes**. Approving Jordan unlocks Lesson 4 in the learner view.

## Edit before the meeting
All editable content is in the `CONFIG` object at the top of **`app.js`**:
- `partner.name`, `partner.accent` (the partner colour, default `#512888`) and `partner.portalDomain`
- `courses`: titles, prices, credit hours, category, NRPP badge, and `practice: true` for the orange “Includes RadonSketch practice” tag
- `courseCode`, learner, instructor, readings, compliance checks, bill of materials and the instructor review queue

The accent colour is also the CSS variable `--partner-accent` at the top of `styles.css`. The value in `CONFIG` takes priority.

## Notes and assumptions to confirm with the partner
- The partner logo is a labelled placeholder box. The university's real logo or crest is not used.
- Course titles, instructor names, readings and URLs are illustrative, and the `.example` domains are placeholders.
- The checkout shows the partner as the seller, and RadonSketch never handling card data. Confirm this commercial model in the agreement.
- Compliance values are simplified for the demo and are not a statement of ANSI/AARST requirements.
