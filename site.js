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
