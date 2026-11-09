/* =========================================================
   DEMO SIMULATA DI MIMIR
   Tutto è scritto a mano: nessun dato reale, nessun server.
   Per aggiungere o modificare una scena, cambia SCENES qui sotto.
   ========================================================= */

const SCENES = {
  recap: [
    { who: "user",  text: "Ehi Mimir, buongiorno." },
    { who: "mimir", text: "Buongiorno, Marco. Sono le sette e dieci." },
    { who: "mimir", text: "Fuori ci sono quattordici gradi, cielo sereno. Giacca leggera e niente ombrello.",
      card: { t: "Meteo", p: "14° · sereno · max 21°" } },
    { who: "mimir", text: "Hai tre mail nuove. Una è importante: la palestra conferma il rinnovo.",
      card: { t: "Posta", p: "3 nuove · 1 importante" } },
    { who: "mimir", text: "In agenda: riunione di team alle dieci, dentista alle diciotto.",
      card: { t: "Calendario", p: "10:00 Riunione team · 18:00 Dentista" } },
    { who: "user",  text: "Il resto dopo, grazie." },
    { who: "mimir", text: "Ricevuto. Lo riprendo quando vuoi." }
  ],
  casa: [
    { who: "user",  text: "Ehi Mimir, sto uscendo." },
    { who: "mimir", text: "Spengo le luci del soggiorno e avvio il robot aspirapolvere.",
      card: { t: "Casa", p: "Luci soggiorno: OFF · Robot: in pulizia" } },
    { who: "mimir", text: "La finestra della cucina è aperta. Te lo segnalo." },
    { who: "user",  text: "Lasciala così." },
    { who: "mimir", text: "D'accordo. Telecamera dell'ingresso attiva.",
      card: { t: "Sicurezza", p: "Telecamera ingresso: attiva" } }
  ],
  memoria: [
    { who: "user",  text: "Ehi Mimir, dove ho messo i documenti dell'auto?" },
    { who: "mimir", text: "È una memoria privata. Vuoi che la sblocchi?" },
    { who: "user",  text: "Sì." },
    { who: "mimir", text: "Cassetto della scrivania, cartellina blu. L'hai annotato il tre marzo.",
      card: { t: "MUNIN · memoria privata", p: "Sbloccata su richiesta · si richiude da sola" } },
    { who: "mimir", text: "Memoria di nuovo nascosta." }
  ],
  anomalie: [
    { who: "user",  text: "Ehi Mimir, com'è andata stanotte?" },
    { who: "mimir", text: "Due anomalie. Una l'ho riparata io." },
    { who: "mimir", text: "Il calendario si era disconnesso alle tre. Ricollegato.",
      card: { t: "FORGE · riparato", p: "Sync calendario ripristinata alle 03:04" } },
    { who: "mimir", text: "Il backup notturno non è partito: serve il tuo permesso per liberare spazio. Ho già una soluzione pronta.",
      card: { t: "Serve da te", p: "Backup: spazio insufficiente · soluzione pronta" } },
    { who: "user",  text: "Procedi." },
    { who: "mimir", text: "Fatto. Annotato nella Black Box.",
      card: { t: "BLACK BOX", p: "Azione registrata · 07:12" } }
  ]
};

/* ---------- elementi della pagina ---------- */
const demoEl     = document.querySelector(".demo");
const transcript = document.getElementById("transcript");
const cards      = document.getElementById("demo-cards");
const statusEl   = document.getElementById("demo-status");
const playBtn    = document.getElementById("demo-play");
const voiceOn    = document.getElementById("voice-on");
const wave       = document.getElementById("wave");

let current = "recap";
let runId = 0; // serve per interrompere una scena se ne scegli un'altra

// barre dell'onda sonora
const bars = Array.from({ length: 32 }, () => wave.appendChild(document.createElement("i")));
let waveTimer = null;
function animateWave(on) {
  clearInterval(waveTimer);
  if (!on) { bars.forEach(b => (b.style.height = "6px")); return; }
  waveTimer = setInterval(() => {
    bars.forEach(b => (b.style.height = 6 + Math.random() * 40 + "px"));
  }, 110);
}

// collegamento al reattore 3D (se c'è)
function reactorLevel(v) { if (window.mimirReactor) window.mimirReactor.setLevel(v); }

const wait = ms => new Promise(r => setTimeout(r, ms));

// voce del browser (sintesi vocale gratuita integrata, nessuna installazione)
function speak(text) {
  return new Promise(resolve => {
    if (!voiceOn.checked || !("speechSynthesis" in window)) {
      return setTimeout(resolve, 900 + text.length * 45);
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "it-IT";
    const it = speechSynthesis.getVoices().find(v => v.lang.startsWith("it") && /male|luca|diego|cosimo/i.test(v.name))
            || speechSynthesis.getVoices().find(v => v.lang.startsWith("it"));
    if (it) u.voice = it;
    u.rate = 1.02; u.pitch = 0.85;
    u.onend = resolve; u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

function setState(state, label) {
  demoEl.classList.remove("listening", "speaking");
  if (state) demoEl.classList.add(state);
  statusEl.textContent = label;
}

function addLine(step) {
  const div = document.createElement("div");
  div.className = "line " + step.who;
  div.innerHTML = `<small>${step.who === "user" ? "TU" : "MIMIR"}</small>`;
  div.append(step.text);
  transcript.appendChild(div);
}

function addCard(c) {
  const el = document.createElement("div");
  el.className = "info";
  el.innerHTML = `<h4></h4><p></p>`;
  el.querySelector("h4").textContent = c.t;
  el.querySelector("p").textContent = c.p;
  cards.appendChild(el);
}

async function play() {
  const id = ++runId;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  transcript.innerHTML = ""; cards.innerHTML = "";
  playBtn.disabled = true;

  for (const step of SCENES[current]) {
    if (id !== runId) return; // scena cambiata nel frattempo
    if (step.who === "user") {
      setState("listening", "Ti ascolto…");
      reactorLevel(0.35); animateWave(true);
      await wait(400);
      addLine(step);
      await wait(1100 + step.text.length * 25);
      animateWave(false);
    } else {
      setState("speaking", "MIMIR sta parlando");
      reactorLevel(1); animateWave(true);
      addLine(step);
      if (step.card) addCard(step.card);
      await speak(step.text);
      animateWave(false); reactorLevel(0.2);
      await wait(350);
    }
  }
  if (id !== runId) return;
  setState(null, "In ascolto silenzioso…");
  reactorLevel(0);
  playBtn.disabled = false;
  playBtn.textContent = "↻ Riascolta";
}

playBtn.addEventListener("click", play);

document.querySelectorAll(".scene").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".scene").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    current = btn.dataset.scene;
    runId++; // ferma la scena in corso
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    animateWave(false); reactorLevel(0);
    setState(null, "In ascolto silenzioso…");
    transcript.innerHTML = ""; cards.innerHTML = "";
    playBtn.disabled = false;
    playBtn.textContent = "▶ Di' «Ehi Mimir»";
  });
});

/* ---------- cambio colore fucsia / acqua ---------- */
const themeBtn = document.getElementById("theme-toggle");
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.querySelector("span").textContent = t === "fucsia" ? "Acqua" : "Fucsia";
  try { localStorage.setItem("mimir-theme", t); } catch (e) {}
  window.dispatchEvent(new Event("mimir-theme"));
}
let saved = "fucsia";
try { saved = localStorage.getItem("mimir-theme") || "fucsia"; } catch (e) {}
applyTheme(saved);
themeBtn.addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "fucsia" ? "acqua" : "fucsia"));
