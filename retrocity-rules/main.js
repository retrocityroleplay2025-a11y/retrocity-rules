// ==============================
// Retro City Regelwerke Script
// Suche + TOC Highlight
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const q = document.getElementById("q");
  const sections = [...document.querySelectorAll("section")];
  const tocLinks = [...document.querySelectorAll("nav.toc a")];

  // --- Suche ---
  if (q) {
    q.addEventListener("input", () => {
      const term = q.value.toLowerCase();
      sections.forEach(sec => {
        sec.style.display = term && !sec.textContent.toLowerCase().includes(term)
          ? "none"
          : "";
      });
    });

    // Falls Link mit ?q=… geöffnet wird → Autofiltern
    const params = new URLSearchParams(window.location.search);
    if (params.get("q")) {
      q.value = params.get("q");
      q.dispatchEvent(new Event("input"));
    }
  }

  // --- TOC Highlight ---
  if (tocLinks.length > 0) {
    const ids = tocLinks.map(a => a.getAttribute("href"));
    window.addEventListener("scroll", () => {
      let active = ids[0];
      for (const id of ids) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top < 120) {
          active = id;
        }
      }
      tocLinks.forEach(a => {
        a.style.background = (a.getAttribute("href") === active)
          ? "var(--panel-2)"
          : "transparent";
        a.style.color = (a.getAttribute("href") === active)
          ? "#fff"
          : "var(--muted)";
      });
    });
  }
});
