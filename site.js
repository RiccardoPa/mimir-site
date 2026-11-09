/* =========================================================
   EFFETTI DELLA PAGINA
   Gli elementi con classe "reveal" compaiono dolcemente
   quando arrivano sullo schermo mentre scorri.
   ========================================================= */

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target); // compare una volta sola
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  // piccolo ritardo a cascata tra elementi vicini (es. le schede dei moduli)
  revealEls.forEach(el => {
    // i testi della prima schermata compaiono subito
    if (el.closest(".hero")) { requestAnimationFrame(() => el.classList.add("in")); return; }
    const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains("reveal"));
    const i = siblings.indexOf(el);
    el.style.transitionDelay = Math.min(i, 6) * 70 + "ms";
    observer.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

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
