(function () {
  const PICK = 5;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = {
    moods: document.querySelector("[data-moods]"),
    result: document.querySelector("[data-result]"),
    name: document.querySelector("[data-mood-name]"),
    line: document.querySelector("[data-mood-line]"),
    covers: document.querySelector("[data-covers]"),
    tracks: document.querySelector("[data-tracks]"),
    shuffle: document.querySelector("[data-shuffle]"),
    copy: document.querySelector("[data-copy]"),
    home: document.querySelector("[data-home]"),
    count: document.querySelector("[data-count]"),
    orbit: document.querySelector("[data-orbit]"),
    orbitScroll: document.querySelector("[data-orbit-scroll]"),
    intro: document.querySelector("[data-intro]"),
    picker: document.getElementById("moods")
  };

  const total = MOODS.reduce((n, m) => n + m.tracks.length, 0);
  els.count.textContent = total + " tracks";

  let current = null;
  let lastPick = [];

  function coverFor(track) {
    return COVERS.byTitle[track.title] || COVERS.byAlbum[track.album] || null;
  }

  function coverNode(track, size) {
    const url = coverFor(track);
    if (!url) {
      const d = document.createElement("div");
      d.className = "fallback";
      return d;
    }
    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.width = size;
    img.height = size;
    img.decoding = "async";
    return img;
  }

  // Every distinct cover across all moods for the intro ring: albums first, then singles, oldest first
  const allCovers = (() => {
    const seen = new Map();
    MOODS.flatMap((m) => m.tracks)
      .sort((x, y) => x.year - y.year)
      .forEach((t) => {
        const url = coverFor(t);
        if (url && !seen.has(url)) seen.set(url, t);
      });
    const items = [...seen.values()];
    const isAlbum = (t) => !!COVERS.byAlbum[t.album] && !COVERS.byTitle[t.title];
    return items.filter(isAlbum).concat(items.filter((t) => !isAlbum(t)));
  })();

  function renderOrbit(items) {
    els.orbit.replaceChildren();
    const ringPx = els.orbit.clientWidth || 300;
    const coverPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cover")) || 56;
    const r = Math.round(ringPx / 2 - coverPx / 2);

    // Only as many covers as fit around the ring without touching; keep them in release order
    const max = Math.max(3, Math.floor((2 * Math.PI * r) / (coverPx * 1.2)));
    const shown = items.slice(0, max).sort((x, y) => x.year - y.year);

    const n = shown.length;
    shown.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "orbit-item";
      el.style.setProperty("--a", (i * 360) / n + "deg");
      el.style.setProperty("--r", r + "px");
      el.style.animationDelay = i * 40 + "ms";
      el.appendChild(coverNode(t, coverPx));
      els.orbit.appendChild(el);
    });
  }

  // The ring turns with the page and fades as the intro scrolls away
  function onScroll() {
    const y = window.scrollY;
    const h = els.intro.offsetHeight || 1;
    const p = Math.min(1, Math.max(0, y / (h * 0.75)));
    els.intro.style.setProperty("--p", p.toFixed(3));
    els.orbitScroll.style.setProperty("--scroll-rot", (y * 0.12).toFixed(1) + "deg");
  }

  // Build the mood tiles
  MOODS.forEach((mood) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mood";
    btn.dataset.id = mood.id;
    btn.setAttribute("aria-pressed", "false");

    const name = document.createElement("span");
    name.className = "mood-name";
    name.textContent = mood.name;
    const line = document.createElement("span");
    line.className = "mood-line";
    line.textContent = mood.line;
    btn.append(name, line);

    btn.addEventListener("click", () => {
      if (current && current.id === mood.id) {
        els.result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        return;
      }
      location.hash = mood.id;
    });
    els.moods.appendChild(btn);
  });

  function pickFrom(mood) {
    // A lead track always sits at the top; the rest is drawn from the pool,
    // avoiding the exact set just shown when the pool allows it
    const lead = mood.lead ? mood.tracks.find((t) => t.title === mood.lead) : null;
    const pool = mood.tracks.filter((t) => t !== lead);
    const previous = new Set(lastPick.map((t) => t.title));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.sort((a, b) => (previous.has(a.title) ? 1 : 0) - (previous.has(b.title) ? 1 : 0));
    const picks = pool.slice(0, lead ? PICK - 1 : PICK);
    return lead ? [lead, ...picks] : picks;
  }

  function searchUrl(site, track) {
    const q = encodeURIComponent("Drake " + track.title);
    return site === "youtube"
      ? "https://www.youtube.com/results?search_query=" + q
      : "https://open.spotify.com/search/" + q;
  }

  function renderTracks(list) {
    els.tracks.replaceChildren();
    els.covers.replaceChildren();

    list.forEach((t) => {
      const stackCover = document.createElement("div");
      stackCover.className = "track-cover";
      stackCover.appendChild(coverNode(t, 40));
      els.covers.appendChild(stackCover);

      const li = document.createElement("li");
      li.className = "track";

      const cover = document.createElement("div");
      cover.className = "track-cover";
      cover.appendChild(coverNode(t, 44));

      const body = document.createElement("div");
      const title = document.createElement("p");
      title.className = "track-title";
      title.textContent = t.title;
      const meta = document.createElement("p");
      meta.className = "track-meta";
      meta.textContent = t.album === "Single" ? "Single, " + t.year : t.album + ", " + t.year;
      const why = document.createElement("p");
      why.className = "track-why";
      why.textContent = t.why;
      body.append(title, meta, why);

      const links = document.createElement("div");
      links.className = "track-links";
      [["YouTube", "youtube"], ["Spotify", "spotify"]].forEach(([label, site]) => {
        const a = document.createElement("a");
        a.href = searchUrl(site, t);
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = label;
        a.setAttribute("aria-label", label + ": " + t.title);
        links.appendChild(a);
      });

      li.append(cover, body, links);
      els.tracks.appendChild(li);
    });
  }

  function show(mood, { scroll = true, instant = false } = {}) {
    current = mood;
    document.title = mood ? mood.name + " — Drizzy Recom" : "Drizzy Recom";

    els.moods.querySelectorAll(".mood").forEach((b) => {
      b.setAttribute("aria-pressed", String(!!mood && b.dataset.id === mood.id));
    });

    if (!mood) {
      els.result.hidden = true;
      lastPick = [];
      return;
    }

    els.name.textContent = mood.name;
    els.line.textContent = mood.line;
    lastPick = pickFrom(mood);
    renderTracks(lastPick);

    // Re-run the entrance so a new mood reads as a new page
    els.result.hidden = true;
    void els.result.offsetHeight;
    els.result.hidden = false;
    if (scroll) {
      els.result.scrollIntoView({ behavior: instant || reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function shuffle() {
    if (!current) return;
    lastPick = pickFrom(current);
    renderTracks(lastPick);
    els.shuffle.blur();
  }

  function copyLink() {
    const url = location.href;
    const done = () => {
      const label = els.copy.textContent;
      els.copy.textContent = "Copied";
      setTimeout(() => (els.copy.textContent = label), 1400);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(done, () => prompt("Copy this link", url));
    } else {
      prompt("Copy this link", url);
    }
  }

  function fromHash() {
    const id = location.hash.replace(/^#/, "");
    return MOODS.find((m) => m.id === id) || null;
  }

  els.shuffle.addEventListener("click", shuffle);
  els.copy.addEventListener("click", copyLink);
  els.home.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState("", document.title, location.pathname + location.search);
    show(null);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  window.addEventListener("hashchange", () => {
    if (location.hash === "#moods") return; // the intro's own link
    show(fromHash());
  });

  // Ring radius depends on layout width
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderOrbit(allCovers), 150);
  });

  if (!reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    }, { passive: true });
  }

  renderOrbit(allCovers);
  onScroll();
  // A shared link lands straight on the songs
  show(fromHash(), { instant: true });
})();
