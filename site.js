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
