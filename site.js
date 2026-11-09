/* =========================================================
   EFFETTI DELLA PAGINA
   Tutti i contenuti sono sempre visibili: niente effetti che
   nascondono le sezioni finché non scorri.
   ========================================================= */

/* ---------- tessere dei moduli: su telefono toccale e si girano ---------- */
/* (sul computer la descrizione è già visibile, quindi il clic non fa niente) */
const phone = window.matchMedia("(max-width: 700px)");
document.querySelectorAll(".mod").forEach(card => {
  card.addEventListener("click", () => {
    if (!phone.matches) return;
    const open = card.classList.toggle("open");
    card.setAttribute("aria-pressed", open ? "true" : "false");
  });
});

/* ---------- menu dei capitoli (solo telefono) ---------- */
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu-mobile");
if (menuBtn && menu) {
  const setMenu = open => { menu.hidden = !open; menuBtn.setAttribute("aria-expanded", open ? "true" : "false"); };
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
}

/* ---------- runa attiva: si accende in oro la runa del capitolo che stai guardando ---------- */
(() => {
  const capitoli = [
    ["top", "prodotto"], ["demo", "demo"], ["giornata", "giornata"], ["nome", "nome"],
    ["privacy", "privacy"], ["come", "come"], ["nota", "nota"]
  ].map(([link, id]) => {
    const section = document.getElementById(id);
    return {
      section,
      rune: section && section.querySelector(".ch-rune"),
      link: document.querySelector('#menu-mobile a[href="#' + link + '"]')
    };
  }).filter(c => c.section);

  let pending = false;
  function update() {
    pending = false;
    const line = window.innerHeight * 0.4;
    let current = 0; // in cima alla pagina: Apertura
    capitoli.forEach((c, i) => { if (c.section.getBoundingClientRect().top <= line) current = i; });
    capitoli.forEach((c, i) => {
      if (c.rune) c.rune.classList.toggle("active", i === current);
      if (c.link) c.link.classList.toggle("active", i === current);
    });
  }
  window.addEventListener("scroll", () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();
