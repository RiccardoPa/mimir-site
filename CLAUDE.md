# Regole per lavorare sul sito di MIMIR

## Come lavoriamo
- Lavori solo su quello che ti scrivo in chat. Non aspettarti commenti
  su GitHub o nel repository: tutte le istruzioni arrivano dalla chat.
- Lavori in autonomia, il più possibile. Se ti serve una decisione o
  un'informazione, me la chiedi in chat con una domanda breve
  e io ti dico se puoi procedere o no.
- Rispondi sempre in italiano, in modo semplice: sono alle prime armi.
- Dopo ogni modifica scrivi in massimo 3 righe cosa hai cambiato.

## Pubblicazione
- Ogni modifica va pubblicata subito sul branch main, così GitHub Pages
  aggiorna il sito (https://riccardopa.github.io/mimir-site/) in circa
  un minuto e io lo vedo nella finestra accanto.
- Niente pull request, a meno che non te lo chieda io.
- Se non riesci a pubblicare su main, dimmelo in chat e spiegami
  in parole semplici cosa devo cliccare.

## Il sito
- Un'unica pagina verticale che si scorre dall'alto verso il basso.
  Niente pagine separate, niente schede, niente slide.
- Sito statico per GitHub Pages: solo HTML, CSS e JavaScript.
  Niente build, niente npm, niente framework. Percorsi relativi.
- Stile: ispirato al sito di Apple. Bianco e nero, tanto spazio,
  titoli grandi, dettagli curati.
- Mai nascondere contenuti in attesa dello scorrimento (niente effetti
  "compare quando scorri"): tutto deve essere visibile subito.
- Font di sistema stile Apple (SF Pro sui Mac, Inter come riserva).
  Niente Orbitron, niente font "futuristici".
  Unica eccezione: Noto Sans Runic, solo per i simboli delle rune.
- I font stanno nella cartella fonts/: niente Google Fonts, nessuna
  chiamata a siti esterni (il sito parla di privacy, deve rispettarla).
- Tono personale, non da azienda: rune, capitoli numerati, la storia
  del nome (mitologia norrena) e la nota firmata da Riccardo.
- Colori: bianco, nero e grigi, più UN solo accento: l'oro del vero MIMIR
  (intro D-040). Tutte le variabili sono in cima a style.css.
  · --gold #e8b45a: oro principale, su sfondi neri e scuri (pallino
    «in ascolto», runa attiva, onda della voce, etichette).
  · --gold-light #ffd98a: solo bagliori e luci (sfera, onda che parla).
  · --gold-dark #8a6420: al posto dell'oro sulle sezioni bianche/chiare,
    dove #e8b45a non si legge (la variabile --accent cambia da sola).
  · Etichette: «Funziona oggi» pieno oro con testo nero (sul chiaro pieno
    #8a6420 con testo bianco); «In sviluppo» solo contorno oro;
    «In programma» grigio.
  · Interruttori accesi: bianchi. Niente verde da nessuna parte.
  · Niente fucsia, viola o acqua.
- La demo in demo.js è simulata: mai dati personali reali,
  solo dati inventati.
- MIMIR è solo vocale: nella demo niente caselle di testo.
- Niente reattore 3D: è stato tolto. Al suo posto c'è la sfera luminosa
  fatta solo con CSS (classe orb-core in style.css). La sfera compare
  solo in apertura (anche nei disegni di Mac e iPhone) e nella demo.
- 7 capitoli, in quest'ordine, ognuno con la sua runa al posto del numero:
  ᛗ Apertura · ᚨ Demo · ᛞ Una giornata · ᛟ Moduli (nome + orbita + tessere)
  · ᛉ Privacy · ᛃ Come è fatto + Stato dei lavori (#stato) · ᚱ Nota + Domande.
- Niente doppioni: i moduli si presentano solo con orbita e tessere.
- Mac e iPhone disegnati come nei film: schermo quasi vuoto, sfera al
  centro, una riga di sottotitolo. Niente fumetti da chat.
- Orbita dei moduli lentissima, si ferma col mouse sopra. Tessere: sul
  computer descrizione subito visibile, su telefono si girano.
- Su telefono c'è il menu "Capitoli" in alto.
- Le immagini (Mac, iPhone, orbita dei moduli) sono disegnate con
  HTML e CSS, con nomi e dati inventati.

## Onestà: "vendere senza vendere"
- Al presente solo ciò che funziona già. Il resto si scrive "in arrivo".
- Ogni funzione descritta (giornata, "Cosa sa fare", FAQ, tessere) ha
  un'etichetta piccola: "Funziona oggi", "In sviluppo" o "In programma".
  Prima di assegnarne una nuova, chiedi a Riccardo in chat.
- In apertura c'è l'etichetta "Anteprima · in sviluppo".
- Titolo dell'apertura (scelto da Riccardo): «Vive sul mio Mac. Sta imparando
  a parlare.» La sezione sul nome finisce con «Gli ho dato un Mac.»
- Il tasto finale è "Segui il progetto" (niente "Compra" o "Scarica"):
  porta all'ancora #stato, dove ci sarà la sezione "Stato dei lavori".
- Niente link a LinkedIn, da nessuna parte del sito.
- Il link al repository GitHub sta solo in fondo alla pagina, in piccolo.
- Se un riquadro mostra più funzioni con stati diversi, si usa
  l'etichetta di quella meno avanti.
- Stati attuali (decisi da Riccardo):
  Funziona oggi: modello AI locale sul Mac.
  In sviluppo: recap del mattino, memoria privata, memoria continua,
  parola di attivazione e voce, MUNIN, KVASIR, GALAXY.
  In programma: «Sto uscendo» (casa), ricerca, auto-riparazione notturna,
  posta, casa, app per iPhone, SAGA, FORGE, LAB, VAULT, BLACK BOX.
- Niente numeri riempitivi (tipo "1 · 8 · 0 · 24/7") e niente nastro di
  parole giganti.

## Condivisione
- In index.html ci sono i tag Open Graph (og:title, og:description,
  og:image, og:url): tienili aggiornati se cambiano titolo o descrizione.
- og-image.png (1200x630) è l'anteprima per LinkedIn e gli altri social.
- favicon.svg è l'icona della scheda: la runa ᛗ.
- Documenti di revisione o appunti privati non vanno mai nel repository:
  è pubblico.
