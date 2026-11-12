# RadonSketch × CERTI — Partnership Prototype

A clickable **design prototype** for the CERTI partnership pitch meeting. It isn't production code: there is no backend, and all data is sample data.

## Open it
- **To present:** double-click `index.html`. It works offline. Poppins loads from Google Fonts when you're online; offline it falls back to the system font.
- **To send to the client:** use `RadonSketch-CERTI-Partnership-Prototype.html`. It's a single file with the CSS, JavaScript and CERTI logo built in.

| Mode | What it shows |
|---|---|
| **Demo hub** | Two-way value diagram and the three entry points |
| **Flow A** | RadonSketch app with CERTI courses (A1–A9). Left: jump to any screen. Right: presenter notes |
| **Flow B** | CERTI's platform: My Account (courses, orders), the C-102 course area (Topic 4 Practice Lab, Grades, Competencies) and an Instructor view. Top bar: My Account · Course · Grades shortcuts |
| **Full story** | CERTI course page (left) and phone (right) in 13 steps, ending with Grades and the new certificate. Use **← →** to move between steps and **Esc** to return to the hub |

## Edit before the meeting
Everything is in `CONFIG` at the top of `app.js`:
- partner name, colours (`partner.colors`), logo path, address and phone
- courses, prices, hours and the course code
- enrolled courses, orders, certificates, learner, instructor and the review queue

The logo is `assets/certi-logo.jpg`, used exactly as provided.

## Assumptions to confirm with CERTI
- Course hours, prices, sample orders and certificate dates are illustrative.
- The checkout assumes CERTI is the seller and the order lands in their My Account. Confirm the commercial model.
- Grade weights (quiz 50% / Practice Lab 50%) are a proposal, not CERTI's current setup.
- The learner (Alex Morgan) and instructor (Dana Whitfield) are fictional. No real student data from the screenshots is used.
