(function () {
  const PICK = 5;

  const els = {
    moods: document.querySelector("[data-moods]"),
    result: document.querySelector("[data-result]"),
    name: document.querySelector("[data-mood-name]"),
    line: document.querySelector("[data-mood-line]"),
    tracks: document.querySelector("[data-tracks]"),
    shuffle: document.querySelector("[data-shuffle]"),
    copy: document.querySelector("[data-copy]"),
    home: document.querySelector("[data-home]"),
    count: document.querySelector("[data-count]")
  };

  const total = MOODS.reduce((n, m) => n + m.tracks.length, 0);
  els.count.textContent = total + " tracks";

  let current = null;
  let lastPick = [];

  // Build the mood buttons
  MOODS.forEach((mood) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mood";
    btn.textContent = mood.name;
    btn.dataset.id = mood.id;
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      if (current && current.id === mood.id) return;
      location.hash = mood.id;
    });
    els.moods.appendChild(btn);
  });

  function pickFrom(mood) {
    // Avoid repeating the exact set just shown when the pool allows it
    const pool = mood.tracks.slice();
    const previous = new Set(lastPick.map((t) => t.title));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.sort((a, b) => (previous.has(a.title) ? 1 : 0) - (previous.has(b.title) ? 1 : 0));
    return pool.slice(0, PICK);
  }

  function searchUrl(site, track) {
    const q = encodeURIComponent("Drake " + track.title);
    return site === "youtube"
      ? "https://www.youtube.com/results?search_query=" + q
      : "https://open.spotify.com/search/" + q;
  }

  function renderTracks(list) {
    els.tracks.replaceChildren();
    list.forEach((t) => {
      const li = document.createElement("li");
      li.className = "track";

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

      li.append(body, links);
      els.tracks.appendChild(li);
    });
  }

  function show(mood) {
    current = mood;
    document.title = mood ? mood.name + " — Drake by Mood" : "Drake by Mood";

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
    els.result.scrollIntoView({ behavior: "smooth", block: "start" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("hashchange", () => show(fromHash()));

  show(fromHash());
})();
