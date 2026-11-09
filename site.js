/* =========================================================
   EFFETTI DELLA PAGINA
   Tutti i contenuti sono sempre visibili: niente effetti che
   nascondono le sezioni finché non scorri.
   ========================================================= */

/* ---------- tessere dei moduli: toccale e si girano ---------- */
document.querySelectorAll(".mod").forEach(card => {
  card.addEventListener("click", () => {
    const open = card.classList.toggle("open");
    card.setAttribute("aria-pressed", open ? "true" : "false");
  });
});
