/* =========================================================
   EFFETTI DELLA PAGINA
   Tutti i contenuti sono sempre visibili: niente effetti che
   nascondono le sezioni finché non scorri.
   ========================================================= */

/* ---------- onda sonora grande nella sezione «Ehi Mimir» ---------- */
const bigwave = document.querySelector(".bigwave");
if (bigwave) {
  const n = window.innerWidth < 700 ? 48 : 90;
  for (let i = 0; i < n; i++) {
    const bar = document.createElement("i");
    // più alta al centro, più bassa ai lati, come una voce vera
    const center = 1 - Math.abs(i - n / 2) / (n / 2);
    bar.style.animationDuration = (0.6 + Math.random() * 0.9).toFixed(2) + "s";
    bar.style.animationDelay = (-Math.random() * 1.5).toFixed(2) + "s";
    bar.style.maxHeight = Math.round(20 + center * 80) + "%";
    bigwave.appendChild(bar);
  }
}
