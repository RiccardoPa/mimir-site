/* =========================================================
   REATTORE 3D (three.js)
   Versione provvisoria: qui andranno integrati i tuoi prototipi.
   Espone window.mimirReactor.setLevel(0..1) per farlo "parlare".
   ========================================================= */
import * as THREE from "three";

const canvas = document.getElementById("reactor");

try {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const accent = new THREE.Color(css("--accent"));
  const accent2 = new THREE.Color(css("--accent-2"));

  const reactor = new THREE.Group();
  scene.add(reactor);

  // texture morbida per i bagliori
  function glowTexture() {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.25, "rgba(255,255,255,0.6)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const glowTex = glowTexture();
  const add = { blending: THREE.AdditiveBlending, transparent: true, depthWrite: false };

  // nucleo luminoso
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0xffffff }));
  reactor.add(core);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: accent, ...add }));
  halo.scale.setScalar(4.5);
  reactor.add(halo);

  // anelli
  const ringMats = [];
  function ring(r, tube, op) {
    const m = new THREE.MeshBasicMaterial({ color: accent, opacity: op, ...add });
    ringMats.push(m);
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 16, 160), m);
    reactor.add(mesh);
    return mesh;
  }
  ring(1.15, 0.03, 0.9);
  ring(2.35, 0.05, 0.8);
  ring(2.75, 0.015, 0.6);

  // bobine del reattore (10 segmenti come un arc reactor)
  const coils = new THREE.Group();
  const coilMat = new THREE.MeshBasicMaterial({ color: accent, opacity: 0.75, ...add });
  ringMats.push(coilMat);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const seg = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.26, 0.12), coilMat);
    seg.position.set(Math.cos(a) * 1.75, Math.sin(a) * 1.75, 0);
    seg.rotation.z = a + Math.PI / 2;
    coils.add(seg);
  }
  reactor.add(coils);

  // anello tratteggiato esterno
  const dashes = new THREE.Group();
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const d = new THREE.Mesh(new THREE.PlaneGeometry(0.03, i % 5 ? 0.12 : 0.28), coilMat);
    d.position.set(Math.cos(a) * 3.15, Math.sin(a) * 3.15, 0);
    d.rotation.z = a + Math.PI / 2;
    dashes.add(d);
  }
  reactor.add(dashes);

  // particelle (effetto galassia)
  const N = 1400, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 3.4 + Math.pow(Math.random(), 1.6) * 5;
    const a = Math.random() * Math.PI * 2;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = Math.sin(a) * r * 0.9;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ color: accent2, size: 0.045, map: glowTex, ...add, opacity: 0.85 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // colori al cambio tema
  window.addEventListener("mimir-theme", () => {
    accent.set(css("--accent")); accent2.set(css("--accent-2"));
    ringMats.forEach(m => m.color.copy(accent));
    halo.material.color.copy(accent);
    pMat.color.copy(accent2);
  });

  // livello "voce": 0 = a riposo, 1 = sta parlando
  let target = 0, level = 0;
  window.mimirReactor = { setLevel: v => (target = v) };

  // il reattore si sposta e rimpicciolisce mentre scorri la pagina
  let scrollK = 0;
  window.addEventListener("scroll", () => {
    scrollK = Math.min(window.scrollY / window.innerHeight, 1);
  }, { passive: true });

  // il mouse lo inclina leggermente
  const mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", e => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize); resize();

  const clock = new THREE.Clock();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tick() {
    const t = clock.getElapsedTime();
    level += (target - level) * 0.08;
    const speak = level * (0.6 + 0.4 * Math.sin(t * 18) * Math.sin(t * 7.3));
    const beat = 1 + Math.sin(t * 2.2) * 0.04 + speak * 0.18;

    core.scale.setScalar(beat);
    halo.scale.setScalar(4.5 * beat + speak * 2);
    if (!reduce) {
      coils.rotation.z = t * 0.25 + level * t * 0.3;
      dashes.rotation.z = -t * 0.12;
      particles.rotation.z = t * 0.03;
    }
    reactor.rotation.x += ((-mouse.y * 0.5) - reactor.rotation.x) * 0.05;
    reactor.rotation.y += ((mouse.x * 0.6) - reactor.rotation.y) * 0.05;

    // in fondo alla pagina il reattore si fa più piccolo e tenue
    const s = 1 - scrollK * 0.35;
    reactor.scale.setScalar(s);
    reactor.position.x = scrollK * 3.2;
    renderer.domElement.style.opacity = String(1 - scrollK * 0.55);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
} catch (err) {
  console.warn("WebGL non disponibile, uso il reattore CSS", err);
  document.body.classList.add("no-webgl");
}
