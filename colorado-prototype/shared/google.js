/* ===========================================================================
   GMaps — optional Google Maps Platform integration (Maps JavaScript API +
   Places API (New)).

   The API key is NEVER stored in these files. It is entered in the portal
   (Settings → Google Maps Platform) and saved only in that browser's
   localStorage on that computer. Files you share don't contain it.

   status: "off" (no key) · "loading" · "ready" · "failed" (reason in .reason)
   =========================================================================== */
(function () {
  const C = window.CONFIG;
  const LS = "lirma.google.apiKey";
  const G = { status: "off", reason: "", listeners: [] };

  const readLS = () => { try { return localStorage.getItem(LS) || ""; } catch (e) { return ""; } };
  G.key = () => readLS() || (C.google && C.google.apiKey) || "";
  G.keySource = () => (readLS() ? "browser" : C.google && C.google.apiKey ? "config" : "none");
  G.masked = () => { const k = G.key(); return k ? `${k.slice(0, 4)}••••••••••${k.slice(-4)}` : ""; };
  G.saveKey = (k) => { try { localStorage.setItem(LS, String(k).trim()); return true; } catch (e) { return false; } };
  G.removeKey = () => { try { localStorage.removeItem(LS); } catch (e) {} };
  G.ready = () => G.status === "ready";
  G.loaded = () => !!(window.google && window.google.maps && window.google.maps.Map);
  G.looksValid = (k) => /^AIza[0-9A-Za-z_\-]{30,}$/.test(String(k).trim());
  G.on = (fn) => G.listeners.push(fn);
  const emit = () => G.listeners.slice().forEach((fn) => { try { fn(G.status, G.reason); } catch (e) { console.error(e); } });

  let timer = null;
  G.fail = (reason) => {
    if (G.status === "failed" && G.reason === reason) return;
    clearTimeout(timer);
    G.status = "failed"; G.reason = reason;
    emit();
  };
  // Called by Google when the key is rejected (wrong key, billing off, API not enabled, referrer not allowed…)
  window.gm_authFailure = () => G.fail("Google rejected the API key. Check the key, that billing is enabled, and that the Maps JavaScript API is enabled and allowed by the key's restrictions.");

  G.load = () => {
    if (!G.key()) { G.status = "off"; G.reason = ""; emit(); return; }
    if (G.status === "loading" || G.status === "ready") return;
    if (G.loaded()) { G.status = "ready"; emit(); return; }
    G.status = "loading"; G.reason = ""; emit();
    window.__lirmaGoogleReady = async () => {
      try {
        await Promise.all(["maps", "marker", "places"].map((l) => google.maps.importLibrary(l)));
        if (G.status !== "loading") return;
        clearTimeout(timer);
        G.status = "ready"; emit();
      } catch (e) { G.fail("Google Maps libraries could not load: " + ((e && e.message) || e)); }
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(G.key())}&v=weekly&loading=async&libraries=maps,marker,places&callback=__lirmaGoogleReady`;
    s.async = true;
    s.onerror = () => G.fail("Couldn't reach Google Maps — check the internet connection.");
    document.head.appendChild(s);
    timer = setTimeout(() => G.fail("Google Maps didn't respond within 15 seconds."), 15000);
  };

  /* ---------- Places API (New) ---------- */
  const coRect = () => { const [[s, w], [n, e]] = window.CoMap.bounds; return { south: s, west: w, north: n, east: e }; };
  let token = null;
  const placeErr = (e) => {
    const msg = (e && (e.message || e.toString())) || "Unknown error";
    return new Error(/not been used|disabled|PERMISSION_DENIED|not authorized|API key/i.test(msg)
      ? `Places request refused — enable “Places API (New)” for this key in Google Cloud and allow it in the key's API restrictions. (${msg})`
      : `Places search failed: ${msg}`);
  };
  // kind: "place" (any address or place) · "address" (street addresses) · "zip" (postal codes)
  G.suggest = async (input, kind) => {
    const { AutocompleteSuggestion, AutocompleteSessionToken } = await google.maps.importLibrary("places");
    if (!token) token = new AutocompleteSessionToken();
    const base = { input, sessionToken: token, includedRegionCodes: ["us"], locationRestriction: coRect() };
    const types = { zip: ["postal_code"], address: ["street_address", "premise", "subpremise"] }[kind];
    let res;
    try { res = await AutocompleteSuggestion.fetchAutocompleteSuggestions(types ? { ...base, includedPrimaryTypes: types } : base); }
    catch (e) {
      if (!types) throw placeErr(e);
      try { res = await AutocompleteSuggestion.fetchAutocompleteSuggestions(base); } catch (e2) { throw placeErr(e2); }
    }
    return (res.suggestions || []).filter((s) => s.placePrediction).slice(0, 6).map((s) => {
      const p = s.placePrediction;
      return { pred: p, main: p.mainText ? p.mainText.text : p.text.text, secondary: p.secondaryText ? p.secondaryText.text : "", text: p.text.text };
    });
  };
  G.resolve = async (pred) => {
    const place = pred.toPlace();
    try { await place.fetchFields({ fields: ["displayName", "formattedAddress", "location", "addressComponents", "types"] }); }
    catch (e) { throw placeErr(e); }
    token = null; // a selection ends the autocomplete session (billing best practice)
    const comps = place.addressComponents || [];
    const comp = (t, short) => { const c = comps.find((x) => (x.types || []).includes(t)); return c ? (short ? c.shortText : c.longText) : ""; };
    const lat = place.location.lat(), lng = place.location.lng();
    const geoCounty = window.CoMap.countyAt(lat, lng);
    return {
      lat, lng, formatted: place.formattedAddress || "", name: place.displayName || "",
      street: [comp("street_number"), comp("route")].filter(Boolean).join(" "),
      city: comp("locality") || comp("postal_town") || comp("sublocality") || comp("administrative_area_level_3") || comp("neighborhood"),
      zip: comp("postal_code"), state: comp("administrative_area_level_1", true),
      county: geoCounty || comp("administrative_area_level_2").replace(/ County$/, ""),
      inColorado: comp("administrative_area_level_1", true) === "CO" && window.CoMap.inColorado(lat, lng),
      types: place.types || [],
    };
  };

  window.GMaps = G;
})();
