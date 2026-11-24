/* ===========================================================================
   CoMap — Colorado-only map used by every map in both prototypes.
   • With Leaflet (CDN) + OpenStreetMap tiles: view fitted and locked to Colorado
     (maxBounds + maxBoundsViscosity 1.0 + minimum zoom), grey mask outside the
     state, county outlines and labels, clustered status pins, "Reset to Colorado".
   • Offline fallback (Leaflet not loaded): an SVG map of Colorado with county
     outlines, the same pins, zoom/pan locked to the state and the same controls.
   • With a Google Maps Platform key connected (Settings): Google Maps with the
     same Colorado-only rules (see shared/google.js).
   API: CoMap.create(el, opts) → { root, setPins, fitCounty, reset, setTracking,
        invalidate, highlightCounty, focus, showRadius }
   =========================================================================== */
(function () {
  const GEO = window.CO_GEO;
  const STATE = GEO.state[0];
  let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
  STATE.forEach(([la, lo]) => { minLat = Math.min(minLat, la); maxLat = Math.max(maxLat, la); minLng = Math.min(minLng, lo); maxLng = Math.max(maxLng, lo); });
  const CO_BOUNDS = [[minLat, minLng], [maxLat, maxLng]];
  const TILE = { idx: 0, list: () => ((window.CONFIG && window.CONFIG.map && window.CONFIG.map.tiles) || []) };
  const countyByName = {};
  GEO.counties.forEach((c) => (countyByName[c.name] = c));

  /* ---------- pin artwork (shared by both engines) ---------- */
  function housePin(color, selected) {
    const s = selected ? 1.18 : 1;
    return `<svg class="co-house-pin ${selected ? "sel" : ""}" width="${28 * s}" height="${38 * s}" viewBox="0 0 28 38" aria-hidden="true">
      <path d="M14 37C14 37 2 23.5 2 14a12 12 0 1 1 24 0c0 9.5-12 23-12 23z" fill="${color}" stroke="#fff" stroke-width="2"/>
      <path d="M8.2 14.6 14 9.6l5.8 5v5.6H8.2z" fill="#fff"/><rect x="12.4" y="16.4" width="3.2" height="3.8" fill="${color}"/></svg>`;
  }
  function ctrPin(active, selected) {
    return `<div class="co-ctr-pin ${active ? "active" : ""} ${selected ? "sel" : ""}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h2l1.2-4.5h11.6L19 17h2"/><path d="M6.2 12.5 8 6h8l1.8 6.5"/><circle cx="7.5" cy="18" r="1.6"/><circle cx="16.5" cy="18" r="1.6"/></svg></div>`;
  }
  function placePin() {
    return `<svg class="co-place-pin" width="32" height="42" viewBox="0 0 32 42" aria-hidden="true"><path d="M16 41S2 26 2 16a14 14 0 1 1 28 0c0 10-14 25-14 25z" fill="#1D5FAD" stroke="#fff" stroke-width="2.5"/><circle cx="16" cy="16" r="6.5" fill="#fff"/><circle cx="16" cy="16" r="3" fill="#1D5FAD"/></svg>`;
  }
  const inRing = (lat, lng, ring) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [yi, xi] = ring[i], [yj, xj] = ring[j];
      if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  const inColorado = (lat, lng) => inRing(lat, lng, STATE);
  const countyAt = (lat, lng) => { const c = GEO.counties.find((k) => k.rings.some((r) => inRing(lat, lng, r))); return c ? c.name : null; };
  const pinHtml = (p) => (p.type === "contractor" ? ctrPin(p.active, p.selected) : p.type === "place" ? placePin() : housePin(p.color, p.selected));
  const TARGET_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`;

  /* =========================================================================
     Leaflet engine
     ========================================================================= */
  function LeafletMap(root, opts) {
    const L = window.L;
    this.root = root; this.opts = opts; this.L = L;
    const map = (this.map = L.map(root, {
      zoomSnap: 0.25, zoomDelta: 0.5, maxBoundsViscosity: 1.0, worldCopyJump: false,
      zoomControl: !opts.mini, scrollWheelZoom: !opts.mini, attributionControl: true, fadeAnimation: true,
    }));
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    if (map.zoomControl) map.zoomControl.setPosition("topright");
    this._useTiles(TILE.idx);

    map.createPane("coMask").style.zIndex = 390;
    map.createPane("coLines").style.zIndex = 395;
    map.getPane("coMask").style.pointerEvents = "none";
    map.getPane("coLines").style.pointerEvents = "none";
    const world = [[-85, -179.9], [-85, 179.9], [85, 179.9], [85, -179.9]];
    L.polygon([world, STATE], { pane: "coMask", stroke: false, fillColor: "#5B6472", fillOpacity: 0.45, interactive: false }).addTo(map);
    this.countyLayers = {};
    GEO.counties.forEach((c) => {
      this.countyLayers[c.name] = L.polygon(c.rings, { pane: "coLines", color: "#5E6B7E", weight: 0.8, opacity: 0.75, fill: false, interactive: false }).addTo(map);
    });
    L.polygon(STATE, { pane: "coLines", color: "#13294B", weight: 2.6, fill: false, interactive: false }).addTo(map);
    this.labels = L.layerGroup(GEO.counties.map((c) => L.marker(c.center, {
      interactive: false, keyboard: false,
      icon: L.divIcon({ className: "co-county-lbl", html: `<span>${c.name}</span>`, iconSize: [90, 14], iconAnchor: [45, 7] }),
    })));

    const self = this;
    const Reset = L.Control.extend({
      options: { position: "topright" },
      onAdd() {
        const b = L.DomUtil.create("button", "co-reset");
        b.type = "button"; b.title = "Reset to Colorado"; b.setAttribute("aria-label", "Reset to Colorado");
        b.innerHTML = TARGET_SVG + (opts.mini ? "" : "<span>Colorado</span>");
        L.DomEvent.on(b, "click", (e) => { L.DomEvent.stop(e); self.reset(); if (opts.onReset) opts.onReset(); });
        L.DomEvent.disableClickPropagation(b);
        return b;
      },
    });
    map.addControl(new Reset());

    this.markers = L.layerGroup().addTo(map);
    this.cluster = L.markerClusterGroup && opts.cluster !== false
      ? L.markerClusterGroup({
          showCoverageOnHover: false, maxClusterRadius: opts.mini ? 30 : 42, spiderfyOnMaxZoom: true,
          iconCreateFunction: (c) => L.divIcon({ html: `<div class="co-cluster"><span>${c.getChildCount()}</span></div>`, className: "", iconSize: [36, 36] }),
        })
      : L.layerGroup();
    this.cluster.addTo(map);
    this.trackLayer = L.layerGroup().addTo(map);

    map.on("zoomend", () => this._labels());
    this.reset(true);
  }
  // Street tiles with automatic provider fallback (shared across every map on the page)
  LeafletMap.prototype._useTiles = function (i) {
    const L = this.L, map = this.map, list = TILE.list();
    if (this.tiles) map.removeLayer(this.tiles);
    const p = list[i]; if (!p) return;
    let loaded = 0, failed = 0;
    this.tiles = L.tileLayer(p.url, { subdomains: p.subdomains || "abc", maxZoom: p.maxZoom || 19, maxNativeZoom: p.maxZoom || 19, attribution: p.attribution }).addTo(map);
    this.tiles.on("tileload", () => { loaded++; if (TILE.idx < i) TILE.idx = i; });
    this.tiles.on("tileerror", () => {
      failed++;
      if (!loaded && failed >= 3 && i + 1 < list.length) { TILE.idx = Math.max(TILE.idx, i + 1); this._useTiles(i + 1); }
    });
  };
  LeafletMap.prototype._minZoom = function () {
    const pad = this.opts.mini ? [6, 6] : [14, 14];
    return this.map.getBoundsZoom(this.L.latLngBounds(CO_BOUNDS), false, this.L.point(pad[0] * 2, pad[1] * 2));
  };
  LeafletMap.prototype._labels = function () {
    if (!this.opts.labels) return;
    const show = this.map.getZoom() <= this.map.getMinZoom() + 2.5;
    if (show && !this.map.hasLayer(this.labels)) this.labels.addTo(this.map);
    if (!show && this.map.hasLayer(this.labels)) this.map.removeLayer(this.labels);
  };
  LeafletMap.prototype.reset = function (instant) {
    const map = this.map, L = this.L;
    map.setMaxBounds(null);
    map.setMinZoom(0);
    map.fitBounds(CO_BOUNDS, { padding: this.opts.mini ? [6, 6] : [14, 14], animate: !instant });
    const z = this._minZoom();
    map.setMinZoom(z);
    map.setMaxBounds(L.latLngBounds(CO_BOUNDS).pad(0.03));
    this.highlightCounty(null);
    this._labels();
  };
  LeafletMap.prototype.invalidate = function () {
    const map = this.map;
    map.invalidateSize(false);
    const z = this._minZoom();
    map.setMinZoom(z);
    if (map.getZoom() < z) this.reset(true);
  };
  LeafletMap.prototype.setPins = function (pins) {
    const sig = JSON.stringify(pins);
    if (sig === this._sig) return;
    this._sig = sig;
    const L = this.L;
    this.cluster.clearLayers(); this.markers.clearLayers();
    pins.forEach((p) => {
      const icon = p.type === "contractor"
        ? L.divIcon({ className: "co-leaf-icon", html: ctrPin(p.active, p.selected), iconSize: [30, 30], iconAnchor: [15, 15] })
        : p.type === "place" ? L.divIcon({ className: "co-leaf-icon", html: placePin(), iconSize: [32, 42], iconAnchor: [16, 41] })
        : L.divIcon({ className: "co-leaf-icon", html: housePin(p.color, p.selected), iconSize: [28, 38], iconAnchor: [14, 37] });
      const m = L.marker([p.lat, p.lng], { icon, title: p.title || "", riseOnHover: true, zIndexOffset: p.type === "place" ? 1500 : p.selected ? 1000 : p.type === "contractor" ? 500 : 0 });
      m.on("click", () => this.opts.onSelect && this.opts.onSelect(p));
      (p.type !== "household" || p.selected ? this.markers : this.cluster).addLayer(m);
    });
  };
  LeafletMap.prototype.highlightCounty = function (name) {
    Object.entries(this.countyLayers).forEach(([n, layer]) => {
      layer.setStyle(n === name ? { color: "#1D5FAD", weight: 2.6, opacity: 1 } : { color: "#5E6B7E", weight: 0.8, opacity: 0.75 });
    });
  };
  LeafletMap.prototype.fitCounty = function (name) {
    const c = countyByName[name];
    if (!c) return this.reset();
    this.map.fitBounds(c.bbox, { padding: [30, 30], maxZoom: 11 });
    this.highlightCounty(name);
  };
  LeafletMap.prototype.focus = function (lat, lng, zoom) { this.map.setView([lat, lng], Math.max(zoom || 14, this.map.getMinZoom())); };
  LeafletMap.prototype.showRadius = function (center, miles) {
    if (this.circle) { this.map.removeLayer(this.circle); this.circle = null; }
    if (!center) return;
    this.circle = this.L.circle(center, { radius: miles * 1609.34, color: "#1D5FAD", weight: 1.5, fillOpacity: 0.06, interactive: false }).addTo(this.map);
  };
  // Camera for a filter result: { type: "reset" | "bounds" | "point" | "none", bounds, lat, lng, zoom, maxZoom }
  LeafletMap.prototype.fitView = function (v) {
    if (!v || v.type === "none") return;
    this.map.stop();
    if (v.type === "reset") return this.reset(true);
    if (v.type === "point") return this.map.setView([v.lat, v.lng], Math.max(v.zoom || 13, this.map.getMinZoom()), { animate: false });
    this.map.fitBounds(v.bounds, { padding: [50, 50], maxZoom: v.maxZoom || 12, animate: false });
  };
  LeafletMap.prototype.setTracking = function (t) {
    const L = this.L, map = this.map;
    this.trackLayer.clearLayers();
    cancelAnimationFrame(this._raf);
    if (!t) return;
    const home = L.marker(t.home, { icon: L.divIcon({ className: "co-leaf-icon", html: housePin(t.color || "#E08A00", true), iconSize: [33, 45], iconAnchor: [16, 44] }) });
    this.trackLayer.addLayer(home);
    if (!t.contractor) { map.setView(t.home, 13, { animate: false }); return; }
    const dot = L.marker(t.animate ? t.from : t.contractor, { icon: L.divIcon({ className: "co-leaf-icon", html: '<div class="co-live-dot"></div>', iconSize: [22, 22], iconAnchor: [11, 11] }), zIndexOffset: 2000 });
    const trail = L.polyline([t.from, t.animate ? t.from : t.contractor], { color: "#1D5FAD", weight: 3, dashArray: "4 6", opacity: 0.8 });
    this.trackLayer.addLayer(trail); this.trackLayer.addLayer(dot);
    map.fitBounds(L.latLngBounds([t.home, t.from]), { padding: [60, 60], maxZoom: 14, animate: false });
    if (t.animate) {
      const start = performance.now(), dur = 3600;
      const step = (now) => {
        const k = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - k, 3);
        const p = [t.from[0] + (t.contractor[0] - t.from[0]) * e, t.from[1] + (t.contractor[1] - t.from[1]) * e];
        dot.setLatLng(p); trail.setLatLngs([t.from, p]);
        if (k < 1) this._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }
  };

  /* =========================================================================
     Offline SVG engine
     ========================================================================= */
  const K = Math.cos((39 * Math.PI) / 180) * 100, KY = 100;
  const X = (lng) => (lng - minLng) * K, Y = (lat) => (maxLat - lat) * KY;
  const FULL_W = X(maxLng), FULL_H = Y(minLat), PAD = 14;
  const ringPath = (ring) => "M" + ring.map(([la, lo]) => X(lo).toFixed(1) + "," + Y(la).toFixed(1)).join("L") + "Z";
  const STATE_PATH = ringPath(STATE);
  const COUNTY_PATHS = GEO.counties.map((c) => ({ name: c.name, d: c.rings.map(ringPath).join(""), cx: X(c.center[1]), cy: Y(c.center[0]) }));

  function SvgMap(root, opts) {
    this.root = root; this.opts = opts; this.pins = []; this.track = null;
    root.classList.add("co-svgmap");
    root.innerHTML = `
      <svg class="co-svg" preserveAspectRatio="xMidYMid meet" aria-label="Map of Colorado">
        <rect class="co-svg-out" x="-2000" y="-2000" width="5000" height="5000"/>
        <path class="co-svg-state" d="${STATE_PATH}"/>
        <g class="co-svg-counties">${COUNTY_PATHS.map((c) => `<path data-c="${c.name}" d="${c.d}"/>`).join("")}</g>
        <path class="co-svg-outline" d="${STATE_PATH}"/>
        <g class="co-svg-labels">${opts.labels ? COUNTY_PATHS.map((c) => `<text x="${c.cx.toFixed(1)}" y="${c.cy.toFixed(1)}">${c.name}</text>`).join("") : ""}</g>
        <g class="co-svg-track"></g><g class="co-svg-pins"></g>
      </svg>
      <div class="co-svg-ctrls">${opts.mini ? "" : `<button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out">−</button>`}
        <button type="button" class="co-reset" data-z="reset" title="Reset to Colorado">${TARGET_SVG}${opts.mini ? "" : "<span>Colorado</span>"}</button></div>
      <div class="co-svg-attr">Offline map · county boundaries: US Census Bureau</div>`;
    this.svg = root.querySelector("svg");
    this.gPins = root.querySelector(".co-svg-pins");
    this.gTrack = root.querySelector(".co-svg-track");
    this.reset();
    root.querySelector(".co-svg-ctrls").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      e.stopPropagation();
      if (b.dataset.z === "in") this.zoomBy(1.6);
      else if (b.dataset.z === "out") this.zoomBy(1 / 1.6);
      else { this.reset(); if (opts.onReset) opts.onReset(); }
    });
    if (!opts.mini) {
      this.svg.addEventListener("wheel", (e) => { e.preventDefault(); this.zoomBy(e.deltaY < 0 ? 1.25 : 0.8, this._toUser(e)); }, { passive: false });
      let drag = null;
      this.svg.addEventListener("pointerdown", (e) => {
        if (e.target.closest(".co-svg-pin")) return;
        drag = { x: e.clientX, y: e.clientY, v: { ...this.v }, moved: false };
        this.svg.setPointerCapture(e.pointerId);
      });
      this.svg.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const s = this.v.w / this.svg.getBoundingClientRect().width;
        if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 3) drag.moved = true;
        this._set({ x: drag.v.x - (e.clientX - drag.x) * s, y: drag.v.y - (e.clientY - drag.y) * s, w: drag.v.w, h: drag.v.h });
      });
      const end = () => { drag = null; };
      this.svg.addEventListener("pointerup", end); this.svg.addEventListener("pointercancel", end);
    }
    this.gPins.addEventListener("click", (e) => {
      const g = e.target.closest(".co-svg-pin"); if (!g) return;
      e.stopPropagation();
      if (g.dataset.cluster) { const [x, y, w] = g.dataset.cluster.split(",").map(Number); this._fit(x - w, y - w, w * 2, w * 2); return; }
      const p = this.pins[+g.dataset.i]; if (p && opts.onSelect) opts.onSelect(p);
    });
  }
  SvgMap.prototype._aspect = function () { const r = this.root.getBoundingClientRect(); return r.width && r.height ? r.width / r.height : 1.6; };
  SvgMap.prototype._toUser = function (e) {
    const r = this.svg.getBoundingClientRect(), a = r.width / r.height, va = this.v.w / this.v.h;
    let sx, ox = 0, oy = 0;
    if (a > va) { sx = this.v.h / r.height; ox = (r.width - this.v.w / sx) / 2; } else { sx = this.v.w / r.width; oy = (r.height - this.v.h / sx) / 2; }
    return [this.v.x + (e.clientX - r.left - ox) * sx, this.v.y + (e.clientY - r.top - oy) * sx];
  };
  SvgMap.prototype._set = function (v) {
    // lock to Colorado: the view may never extend beyond the state (plus a small pad)
    const boxW = FULL_W + PAD * 2, boxH = FULL_H + PAD * 2, a = this._aspect();
    const fitW = Math.max(boxW, boxH * a);                 // the whole state = minimum zoom
    const w = Math.min(Math.max(v.w, boxW / 60), fitW), h = w / a;
    const clampC = (c, size, lo, hi) => (size >= hi - lo ? (lo + hi) / 2 : Math.min(Math.max(c, lo + size / 2), hi - size / 2));
    const cx = clampC(v.x + v.w / 2, w, -PAD, FULL_W + PAD);
    const cy = clampC(v.y + v.h / 2, h, -PAD, FULL_H + PAD);
    this.v = { x: cx - w / 2, y: cy - h / 2, w, h };
    this.svg.setAttribute("viewBox", `${this.v.x} ${this.v.y} ${this.v.w} ${this.v.h}`);
    this._draw();
  };
  SvgMap.prototype._fit = function (x, y, w, h) {
    const a = this._aspect();
    if (w / h < a) { const nw = h * a; x -= (nw - w) / 2; w = nw; } else { const nh = w / a; y -= (nh - h) / 2; h = nh; }
    this._set({ x, y, w, h });
  };
  SvgMap.prototype.zoomBy = function (f, at) {
    const c = at || [this.v.x + this.v.w / 2, this.v.y + this.v.h / 2];
    const w = this.v.w / f, h = this.v.h / f;
    this._set({ x: c[0] - (c[0] - this.v.x) / f, y: c[1] - (c[1] - this.v.y) / f, w, h });
  };
  SvgMap.prototype.reset = function () { this.highlightCounty(null); this._fit(-PAD, -PAD, FULL_W + PAD * 2, FULL_H + PAD * 2); };
  SvgMap.prototype.invalidate = function () { this._set(this.v || { x: -PAD, y: -PAD, w: FULL_W + PAD * 2, h: FULL_H + PAD * 2 }); };
  SvgMap.prototype.highlightCounty = function (name) {
    this.svg.querySelectorAll(".co-svg-counties path").forEach((p) => p.classList.toggle("hl", p.dataset.c === name));
  };
  SvgMap.prototype.fitCounty = function (name) {
    const c = countyByName[name]; if (!c) return this.reset();
    const [[la0, lo0], [la1, lo1]] = c.bbox;
    const x = X(lo0), y = Y(la1), w = X(lo1) - x, h = Y(la0) - y;
    this._fit(x - w * 0.15, y - h * 0.15, w * 1.3, h * 1.3);
    this.highlightCounty(name);
  };
  SvgMap.prototype.setPins = function (pins) { this.pins = pins; this._draw(); };
  SvgMap.prototype.focus = function (lat, lng) { const x = X(lng), y = Y(lat); this._fit(x - 8, y - 5, 16, 10); };
  SvgMap.prototype.showRadius = function () {}; // the offline map frames the radius via fitView
  SvgMap.prototype.fitView = function (v) {
    if (!v || v.type === "none") return;
    if (v.type === "reset") return this.reset();
    if (v.type === "point") return this.focus(v.lat, v.lng);
    const [[s, w], [n, e]] = v.bounds, x0 = X(w), x1 = X(e), y0 = Y(n), y1 = Y(s);
    const pw = Math.max(x1 - x0, 10), ph = Math.max(y1 - y0, 6), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    this._fit(cx - pw * 0.65, cy - ph * 0.65, pw * 1.3, ph * 1.3);
  };
  SvgMap.prototype._draw = function () {
    if (!this.v) return;
    const px = this.v.w / (this.svg.getBoundingClientRect().width || 600); // user units per screen pixel
    const zoom = (FULL_W + PAD * 2) / this.v.w;
    this.svg.style.setProperty("--lbl", (9.5 * px).toFixed(3) + "px");
    const lbl = this.svg.querySelector(".co-svg-labels");
    if (lbl) lbl.style.display = zoom < 4 ? "" : "none";
    this.svg.style.setProperty("--sw", (0.8 * px).toFixed(3));
    this.svg.style.setProperty("--sw2", (2.4 * px).toFixed(3));
    // grid clustering in screen space for households when zoomed out
    const cell = 34 * px, groups = {}, out = [];
    this.pins.forEach((p, i) => {
      const x = X(p.lng), y = Y(p.lat);
      if (p.type === "contractor" || p.selected || zoom > 5 || this.opts.cluster === false) { out.push({ p, i, x, y }); return; }
      const k = Math.floor(x / cell) + ":" + Math.floor(y / cell);
      (groups[k] = groups[k] || []).push({ p, i, x, y });
    });
    let html = "";
    Object.values(groups).forEach((g) => {
      if (g.length === 1) { out.unshift(g[0]); return; }
      const cx = g.reduce((s, q) => s + q.x, 0) / g.length, cy = g.reduce((s, q) => s + q.y, 0) / g.length;
      const span = Math.max(cell, ...g.map((q) => Math.max(Math.abs(q.x - cx), Math.abs(q.y - cy)))) * 1.6;
      html += `<g class="co-svg-pin cluster" data-cluster="${cx},${cy},${span}" transform="translate(${cx},${cy}) scale(${px})"><circle r="17" class="co-svg-cl-o"/><circle r="12.5" class="co-svg-cl-i"/><text y="4.5">${g.length}</text></g>`;
    });
    out.sort((a, b) => (a.p.selected ? 1 : 0) - (b.p.selected ? 1 : 0)).forEach(({ p, i, x, y }) => {
      const s = (p.selected ? 1.2 : 1) * px;
      html += p.type === "contractor"
        ? `<g class="co-svg-pin ctr ${p.active ? "active" : ""}" data-i="${i}" transform="translate(${x},${y}) scale(${s})"><circle r="14" class="co-svg-ctr"/><path d="M-7 4h2l1.2-4.5h7.6L5 4h2M-4.8-.5-3-7h6l1.8 6.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><title>${p.title || ""}</title></g>`
        : `<g class="co-svg-pin" data-i="${i}" transform="translate(${x},${y}) scale(${s})"><path d="M0 0C0 0-12-13.5-12-23a12 12 0 1 1 24 0C12-13.5 0 0 0 0z" fill="${p.type === "place" ? "#1D5FAD" : p.color}" stroke="#fff" stroke-width="2"/>${p.type === "place" ? '<circle cy="-23" r="5" fill="#fff"/>' : '<path d="M-5.8-22.4 0-27.4l5.8 5v5.6h-11.6z" fill="#fff"/>'}<title>${p.title || ""}</title></g>`;
    });
    this.gPins.innerHTML = html;
    this._drawTrack(px);
  };
  SvgMap.prototype._drawTrack = function (px) {
    const t = this.track;
    if (!t) { this.gTrack.innerHTML = ""; return; }
    const hx = X(t.home[1]), hy = Y(t.home[0]);
    const pos = t.pos || t.contractor;
    let html = `<g transform="translate(${hx},${hy}) scale(${px * 1.2})"><path d="M0 0C0 0-12-13.5-12-23a12 12 0 1 1 24 0C12-13.5 0 0 0 0z" fill="${t.color || "#E08A00"}" stroke="#fff" stroke-width="2"/><path d="M-5.8-22.4 0-27.4l5.8 5v5.6h-11.6z" fill="#fff"/></g>`;
    if (pos) {
      const fx = X(t.from[1]), fy = Y(t.from[0]), cx = X(pos[1]), cy = Y(pos[0]);
      html = `<line x1="${fx}" y1="${fy}" x2="${cx}" y2="${cy}" stroke="#1D5FAD" stroke-width="${3 * px}" stroke-dasharray="${4 * px} ${6 * px}"/>` + html +
        `<g transform="translate(${cx},${cy}) scale(${px})"><circle r="16" fill="rgba(29,95,173,.22)"/><circle r="8" fill="#1D5FAD" stroke="#fff" stroke-width="3"/></g>`;
    }
    this.gTrack.innerHTML = html;
  };
  SvgMap.prototype.setTracking = function (t) {
    cancelAnimationFrame(this._raf);
    this.track = t;
    if (!t) { this._draw(); return; }
    const pts = [t.home, t.from || t.home];
    const xs = pts.map((p) => X(p[1])), ys = pts.map((p) => Y(p[0]));
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const w = Math.max(x1 - x0, 6), h = Math.max(y1 - y0, 4);
    this._fit(x0 - w * 0.6, y0 - h * 0.8, w * 2.2, h * 2.6);
    if (t.animate && t.contractor) {
      const start = performance.now(), dur = 3600;
      const step = (now) => {
        const k = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - k, 3);
        t.pos = [t.from[0] + (t.contractor[0] - t.from[0]) * e, t.from[1] + (t.contractor[1] - t.from[1]) * e];
        this._draw();
        if (k < 1) this._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }
  };

  /* =========================================================================
     Google Maps engine (used when a Google Maps Platform key is connected)
     Same Colorado-only rules: restricted to the state, can't zoom out past
     the whole state, grey mask outside, county outlines + labels, clustering.
     ========================================================================= */
  const merc = (lat, lng) => { const s = Math.sin((lat * Math.PI) / 180); return [((lng + 180) / 360) * 256, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 256]; };
  const ll = (a) => ({ lat: a[0], lng: a[1] });
  const signedArea = (ring) => ring.reduce((a, p, i) => { const q = ring[(i + 1) % ring.length]; return a + (p[1] * q[0] - q[1] * p[0]); }, 0);
  function GoogleMap(root, opts) {
    const g = google.maps;
    this.g = g; this.root = root; this.opts = opts; this.isGoogle = true; this.markers = []; this.trackObjs = [];
    root.classList.add("co-gmap");
    const [[s, w], [n, e]] = CO_BOUNDS, dLat = (n - s) * 0.03, dLng = (e - w) * 0.03;
    const cfg = (window.CONFIG && window.CONFIG.google) || {};
    const map = (this.map = new g.Map(root, {
      mapId: cfg.mapId || "DEMO_MAP_ID",
      center: { lat: (s + n) / 2, lng: (w + e) / 2 }, zoom: 6,
      restriction: { latLngBounds: { south: s - dLat, west: w - dLng, north: n + dLat, east: e + dLng }, strictBounds: false },
      disableDefaultUI: true, zoomControl: !opts.mini, clickableIcons: false,
      gestureHandling: opts.mini ? "cooperative" : "greedy", keyboardShortcuts: !opts.mini,
    }));
    // grey mask outside Colorado (outer box with the state as a hole — opposite winding)
    const box = [[s - 25, w - 30], [n + 25, w - 30], [n + 25, e + 30], [s - 25, e + 30]];
    let hole = STATE.slice();
    if (Math.sign(signedArea(box)) === Math.sign(signedArea(hole))) hole = hole.reverse();
    new g.Polygon({ map, paths: [box.map(ll), hole.map(ll)], strokeOpacity: 0, fillColor: "#5B6472", fillOpacity: 0.45, clickable: false, zIndex: 1 });
    this.countyPolys = {};
    GEO.counties.forEach((c) => {
      this.countyPolys[c.name] = new g.Polygon({ map, paths: c.rings.map((r) => r.map(ll)), strokeColor: "#5E6B7E", strokeWeight: 0.8, strokeOpacity: 0.75, fillOpacity: 0, clickable: false, zIndex: 2 });
    });
    new g.Polygon({ map, paths: STATE.map(ll), strokeColor: "#13294B", strokeWeight: 2.6, fillOpacity: 0, clickable: false, zIndex: 3 });
    this.labels = opts.labels ? GEO.counties.map((c) => {
      const el = document.createElement("div"); el.className = "co-county-lbl g"; el.innerHTML = `<span>${c.name}</span>`;
      return new g.marker.AdvancedMarkerElement({ position: ll(c.center), content: el, zIndex: 5 });
    }) : [];
    // "Reset to Colorado" control
    const b = document.createElement("button");
    b.type = "button"; b.className = "co-reset g"; b.title = "Reset to Colorado"; b.setAttribute("aria-label", "Reset to Colorado");
    b.innerHTML = TARGET_SVG + (opts.mini ? "" : "<span>Colorado</span>");
    b.addEventListener("click", (ev) => { ev.stopPropagation(); this.reset(); if (opts.onReset) opts.onReset(); });
    map.controls[g.ControlPosition.RIGHT_TOP].push(b);
    map.addListener("idle", () => { const z = map.getZoom(); if (z !== this._z) { this._z = z; this._cluster(); this._labels(); } });
    this.reset();
  }
  GoogleMap.prototype._fitZoom = function () {
    const r = this.root.getBoundingClientRect(), pad = this.opts.mini ? 8 : 24;
    if (!r.width || !r.height) return 6;
    const [[s, w], [n, e]] = CO_BOUNDS, [x0, y0] = merc(n, w), [x1, y1] = merc(s, e);
    return Math.max(3, Math.floor(Math.min(Math.log2((r.width - pad * 2) / (x1 - x0)), Math.log2((r.height - pad * 2) / (y1 - y0)))));
  };
  GoogleMap.prototype._labels = function () {
    const show = this.map.getZoom() <= (this._minZ || 6) + 2;
    this.labels.forEach((m) => { if (!!m.map !== show) m.map = show ? this.map : null; });
  };
  GoogleMap.prototype.reset = function () {
    const [[s, w], [n, e]] = CO_BOUNDS;
    this._minZ = this._fitZoom();
    this.map.setOptions({ minZoom: this._minZ });
    this.map.setCenter({ lat: (s + n) / 2, lng: (w + e) / 2 });
    this.map.setZoom(this._minZ);
    this.highlightCounty(null);
  };
  GoogleMap.prototype.invalidate = function () {
    const z = this._fitZoom();
    if (z !== this._minZ) { this._minZ = z; this.map.setOptions({ minZoom: z }); if (this.map.getZoom() < z) this.reset(); }
  };
  GoogleMap.prototype.setPins = function (pins) {
    const sig = JSON.stringify(pins);
    if (sig === this._sig) return;
    this._sig = sig; this.pins = pins; this._cluster();
  };
  GoogleMap.prototype._marker = function (lat, lng, html, opt = {}) {
    const el = document.createElement("div");
    el.className = "co-gpin" + (opt.center ? " center" : "");
    el.innerHTML = html;
    const m = new this.g.marker.AdvancedMarkerElement({ map: this.map, position: { lat, lng }, content: el, title: opt.title || "", zIndex: opt.z || 100 });
    if (opt.onClick) m.addListener("click", opt.onClick);
    return m;
  };
  GoogleMap.prototype._cluster = function () {
    const zoom = this.map.getZoom();
    if (zoom == null || !this.pins) return;
    this.markers.forEach((m) => (m.map = null));
    this.markers = [];
    const scale = Math.pow(2, zoom), cell = this.opts.mini ? 34 : 46, groups = {}, singles = [];
    this.pins.forEach((p) => {
      if (p.type !== "household" || p.selected || this.opts.cluster === false || zoom >= 12) { singles.push(p); return; }
      const [x, y] = merc(p.lat, p.lng), k = Math.floor((x * scale) / cell) + ":" + Math.floor((y * scale) / cell);
      (groups[k] = groups[k] || []).push(p);
    });
    Object.values(groups).forEach((gr) => {
      if (gr.length === 1) { singles.push(gr[0]); return; }
      const lat = gr.reduce((a, p) => a + p.lat, 0) / gr.length, lng = gr.reduce((a, p) => a + p.lng, 0) / gr.length;
      this.markers.push(this._marker(lat, lng, `<div class="co-cluster"><span>${gr.length}</span></div>`, { center: true, z: 400, title: `${gr.length} households`, onClick: () => {
        const b = new this.g.LatLngBounds(); gr.forEach((p) => b.extend({ lat: p.lat, lng: p.lng })); this.map.fitBounds(b, 80);
      } }));
    });
    singles.forEach((p) => this.markers.push(this._marker(p.lat, p.lng, pinHtml(p), {
      center: p.type === "contractor", title: p.title, z: p.type === "place" ? 1500 : p.selected ? 1000 : p.type === "contractor" ? 500 : 100,
      onClick: () => this.opts.onSelect && this.opts.onSelect(p),
    })));
  };
  GoogleMap.prototype.highlightCounty = function (name) {
    Object.entries(this.countyPolys).forEach(([k, poly]) => poly.setOptions(k === name
      ? { strokeColor: "#1D5FAD", strokeWeight: 2.6, strokeOpacity: 1, fillColor: "#1D5FAD", fillOpacity: 0.06 }
      : { strokeColor: "#5E6B7E", strokeWeight: 0.8, strokeOpacity: 0.75, fillOpacity: 0 }));
  };
  GoogleMap.prototype.fitCounty = function (name) {
    const c = countyByName[name];
    if (!c) return this.reset();
    const [[s, w], [n, e]] = c.bbox;
    this.map.fitBounds({ south: s, west: w, north: n, east: e }, 30);
    this.highlightCounty(name);
  };
  GoogleMap.prototype.focus = function (lat, lng, zoom) { this.map.setCenter({ lat, lng }); this.map.setZoom(Math.max(zoom || 14, this._minZ || 6)); };
  GoogleMap.prototype.showRadius = function (center, miles) {
    if (this.circle) { this.circle.setMap(null); this.circle = null; }
    if (!center) return;
    this.circle = new this.g.Circle({ map: this.map, center: ll(center), radius: miles * 1609.34, strokeColor: "#1D5FAD", strokeWeight: 1.5, fillColor: "#1D5FAD", fillOpacity: 0.06, clickable: false, zIndex: 4 });
  };
  GoogleMap.prototype.fitView = function (v) {
    if (!v || v.type === "none") return;
    const tok = (this._viewTok = (this._viewTok || 0) + 1); // a newer view cancels an older view's zoom cap
    if (v.type === "reset") return this.reset();
    if (v.type === "point") return this.focus(v.lat, v.lng, v.zoom);
    const [[s, w], [n, e]] = v.bounds, max = v.maxZoom || 12;
    this.map.fitBounds({ south: s, west: w, north: n, east: e }, 60);
    this.g.event.addListenerOnce(this.map, "idle", () => { if (tok === this._viewTok && this.map.getZoom() > max) this.map.setZoom(max); });
  };
  GoogleMap.prototype.setTracking = function (t) {
    cancelAnimationFrame(this._raf);
    this.trackObjs.forEach((o) => (o.setMap ? o.setMap(null) : (o.map = null)));
    this.trackObjs = [];
    if (!t) return;
    this.trackObjs.push(this._marker(t.home[0], t.home[1], housePin(t.color || "#E08A00", true), { z: 900 }));
    if (!t.contractor) { this.map.setCenter(ll(t.home)); this.map.setZoom(14); return; }
    const start = t.animate ? t.from : t.contractor;
    const dot = this._marker(start[0], start[1], '<div class="co-live-dot"></div>', { center: true, z: 2000 });
    const line = new this.g.Polyline({ map: this.map, path: [ll(t.from), ll(start)], strokeOpacity: 0, zIndex: 6,
      icons: [{ icon: { path: "M 0,-1 0,1", strokeOpacity: 0.9, strokeColor: "#1D5FAD", scale: 3 }, offset: "0", repeat: "12px" }] });
    this.trackObjs.push(dot, line);
    const b = new this.g.LatLngBounds(); b.extend(ll(t.home)); b.extend(ll(t.from));
    this.map.fitBounds(b, 70);
    if (t.animate) {
      const t0 = performance.now(), dur = 3600;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        const p = { lat: t.from[0] + (t.contractor[0] - t.from[0]) * e, lng: t.from[1] + (t.contractor[1] - t.from[1]) * e };
        dot.position = p; line.setPath([ll(t.from), p]);
        if (k < 1) this._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }
  };

  window.CoMap = {
    bounds: CO_BOUNDS,
    counties: GEO.counties.map((c) => c.name),
    countyOf: (name) => countyByName[name],
    inColorado, countyAt,
    housePin, ctrPin, placePin,
    usingGoogle: () => !!(window.GMaps && window.GMaps.ready() && !window.CoMap.forceFallback),
    usingLeaflet: () => !!(window.L && window.L.map && !window.CoMap.forceFallback),
    engine() { return this.usingGoogle() ? "google" : this.usingLeaflet() ? "leaflet" : "svg"; },
    forceFallback: false,
    create(el, opts = {}) {
      if (this.usingGoogle()) { try { return new GoogleMap(el, opts); } catch (e) { console.error("Google map failed, using fallback", e); } }
      return this.usingLeaflet() ? new LeafletMap(el, opts) : new SvgMap(el, opts);
    },
  };
})();
