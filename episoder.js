// Små julescener langs vejene i julespillet (kun i kalender-sporet, fx ?spor=jul). Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Fem små optrin, som Ida går forbi på vej mellem nisserne. De siger ikke noget, de er bare noget at se på:
//   1. Højbro Plads: en mandelbod med glød og damp fra panden og en lille kø
//   2. Slotspladsen: en far, der slæber på et alt for stort juletræ. Han trækker, glider og sætter sig i sneen, og børnene griner
//   3. Slotspladsen ved Tårnet: en julemand med en messingklokke ved en gryde og et kor på fire, der synger »Glade jul«
//   5. Ridebanen: to børn kaster snebolde efter en snemand med slips, hat og mappe
//   6. Slotspladsen ved porten til Rigsdagsgården: ti venlige demonstranter med et banner: Nej tak til dagpengeforringelser
//   7. Tøjhusgade: cyklister, der kører frem og tilbage i højre side af vejen, og tre parkerede cykler ved en husmur
//   8. Bibliotekshaven: H.C. Andersen går en tur om bassinet med høj hat og stok og letter på hatten for Ida
//   9. Højbro Plads: en skøjtebane med lyskæder, hvor fem løber rundt, og en pige laver piruetter
//
// index.html kalder episoder(...) én gang i KALENDER-blokken og derefter update(dt, t, pos, ude) i hver frame.
// Ydelse: alle figurer er bagt til få meshes (menneske() i index.html), geometri og materialer deles, hver scene vises
// og animeres kun, når Ida er tæt på (kortere på lav grafik), og det hele er skjult, når hun er indendørs.
// Tekster og kommentarer må ikke indeholde tankestreg. Brug bindestreg.

import { slaede } from './slaede.js';   // Julemanden i kanen, der flyver forbi, når det sner

export function episoder(H) {
  const { THREE, dyn, menneske, tm, TX, groundAt, colCirc, GFX, isTouch } = H;
  const gruppe = new THREE.Group(); gruppe.name = 'episoder'; dyn.add(gruppe);
  const lav = !!isTouch, skygge = !isTouch;
  const EP = [];
  const sm = x => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
  const ramp = (t, a, b) => sm((t - a) / (b - a));
  const lerp = (a, b, k) => a + (b - a) * k;
  const v3 = new THREE.Vector3();

  // delt geometri og materialer
  const G = {
    kugle: new THREE.SphereGeometry(1, 12, 9),
    lilleKugle: new THREE.SphereGeometry(1, 7, 5),
    kasse: new THREE.BoxGeometry(1, 1, 1),
    cyl: new THREE.CylinderGeometry(1, 1, 1, 10),
    kegle: new THREE.ConeGeometry(1, 1, 9),
  };
  const M = {
    sne: tm('#f4f7fa'), kul: tm('#24221f'), gulerod: tm('#e07a2e'), trae: tm('#7a4f2e'), moerktTrae: tm('#4a3323'),
    groen: tm('#1f5a37'), roed: tm('#b3262a'), hvid: tm('#eef0ee'), kobber: tm('#b8733a'), mandel: tm('#8a5a33'),
    sort: tm('#202226'), messing: tm('#d9b25a'), jern: tm('#3a3c40'),
  };
  const glodMat = (farve, op = 0.8) => new THREE.SpriteMaterial({ map: TX.glow, color: farve, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending });
  const dampMat = () => new THREE.SpriteMaterial({ map: TX.glow, color: '#ffffff', transparent: true, opacity: 0, depthWrite: false });
  const stk = (geo, mat, parent, x, y, z, sx, sy = sx, sz = sx, skyg = true) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.castShadow = skyg && skygge; m.receiveShadow = true; parent.add(m); return m;
  };

  // en person i spillets egen stil. o går videre til menneske(); enkel: hovedet sidder på kroppen (færre dele)
  const person = (o) => menneske(Object.assign({ enkel: true, skygge, detalje: 'lav' }, o));   // lav detalje: de står lidt væk fra vejen
  const hue = (farve, kant = '#f4f1ea') => (g, head, part, m) => {   // en strikhue med kvast
    part(new THREE.SphereGeometry(0.158, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52), m(farve), head, 0, 0.02, -0.004).scale.set(1, 1.05, 1.04);
    part(new THREE.TorusGeometry(0.15, 0.03, 6, 16), m(kant), head, 0, 0.035, -0.004).rotation.x = Math.PI / 2;
    part(new THREE.SphereGeometry(0.05, 8, 6), m(kant), head, 0, 0.19, -0.01);
  };
  const flere = (...fns) => (...a) => { for (const f of fns) if (f) f(...a); };

  // en scene: et sted, en vinkel (hvilken vej den vender) og en funktion, der animerer den
  function scene(x, z, ry, byg) {
    const g = new THREE.Group(); g.position.set(x, groundAt(x, z, 1.5), z); g.rotation.y = ry; gruppe.add(g);
    const e = { x, z, g, t: Math.random() * 10, upd: null };
    // lokale koordinater -> verden (til kollision)
    e.ver = (lx, lz) => [x + lx * Math.cos(ry) + lz * Math.sin(ry), z - lx * Math.sin(ry) + lz * Math.cos(ry)];
    e.upd = byg(g, e); g.traverse(o => { if (o.isGroup && !o.userData.fri) saml(o); }); g.visible = false; EP.push(e); return e;
  }
  // de faste ting i en gruppe bliver lagt sammen til ét mesh pr. materiale, så der er færre ting at tegne
  function saml(grp) {
    const pr = new Map();
    for (const m of [...grp.children]) {
      if (!m.isMesh || m.userData.fri) continue;
      if (!pr.has(m.material)) pr.set(m.material, []);
      pr.get(m.material).push(m);
    }
    for (const [mat, liste] of pr) {
      if (liste.length < 2) continue;
      const dele = liste.map(m => { m.updateMatrix(); const g2 = m.geometry.toNonIndexed(); g2.applyMatrix4(m.matrix); grp.remove(m); return g2; });
      let n = 0; for (const d of dele) n += d.attributes.position.count;
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let i = 0;
      for (const d of dele) { pos.set(d.attributes.position.array, i * 3); nor.set(d.attributes.normal.array, i * 3); i += d.attributes.position.count; d.dispose(); }
      const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); bg.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); bg.computeBoundingSphere();
      const mm = new THREE.Mesh(bg, mat); mm.castShadow = liste.some(m => m.castShadow); mm.receiveShadow = true; grp.add(mm);
    }
  }
  const placer = (f, parent, x, z, ry) => { f.root.position.set(x, 0, z); f.root.rotation.y = ry; parent.add(f.root); return f; };

  // ---------------------------------------------------------------- fælles tøj og ansigter til folkene i alle optrin
  const ZF = 0.92;   // the body in menneske() is a little flatter front to back
  const SG = (r, w = 12, h = 9, ...a) => new THREE.SphereGeometry(r, w, h, ...a);
  const TG = (R, r, a = 6, b = 18, arc = Math.PI * 2) => new THREE.TorusGeometry(R, r, a, b, arc);
  const BG = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const CG = (r, l, w = 8) => new THREE.CapsuleGeometry(r, l, 2, w);
  const streg = (a, b, r, seg = 1) => new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(...a), new THREE.Vector3(...b)), seg, r, 6);
  const ring = (part, m, farve, parent, R, r, y, zf = ZF, a = 6, b = 22, ol = 0) => { const t = part(TG(R, r, a, b), m(farve), parent, 0, y, 0, ol); t.rotation.x = Math.PI / 2; t.scale.set(1, zf, 1); return t; };
  const fz = (foran, y, x) => Math.sqrt(Math.max(0, (foran(y) / ZF) ** 2 - x * x)) * ZF;   // the front of the body at height y, x to the side
  // huer
  const strikhue = (farve, kant, kvast, stribe) => (g, head, part, m) => {
    part(SG(0.156, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m(farve), head, 0, 0.045, -0.006).scale.set(1, 1.12, 1.04);
    ring(part, m, kant, head, 0.138, 0.03, 0.068, 1.04, 6, 22, 1);   // the rolled-up edge
    if (stribe) ring(part, m, stribe, head, 0.14, 0.011, 0.125, 1.04);
    if (kvast) {   // a fluffy pompom
      part(SG(0.05, 10, 7), m(kvast), head, 0, 0.23, -0.01);
      for (let i = 0; i < 6; i++) { const a = i * 1.05; part(SG(0.026, 6, 4), m(kvast), head, Math.cos(a) * 0.041, 0.228 + Math.sin(i * 2.1) * 0.026, -0.01 + Math.sin(a) * 0.041, 0); }
    }
  };
  const pelshue = (farve, pels, flapper = true) => (g, head, part, m) => {
    part(SG(0.158, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m(farve), head, 0, 0.05, -0.006).scale.set(1, 0.95, 1.04);
    ring(part, m, pels, head, 0.142, 0.036, 0.06, 1.04, 6, 22, 1);
    if (flapper) for (const s of [-1, 1]) part(SG(0.07, 10, 8), m(pels), head, s * 0.148, -0.03, -0.012).scale.set(0.42, 1.05, 0.85);
    part(SG(0.018, 6, 5), m(farve), head, 0, 0.2, -0.006, 0);
  };
  const oerevarmere = (farve) => (g, head, part, m) => {
    part(TG(0.17, 0.013, 5, 20, Math.PI), m('#' + new THREE.Color(farve).offsetHSL(0, 0, -0.15).getHexString()), head, 0, 0.0, -0.012);
    for (const s of [-1, 1]) part(SG(0.058, 12, 10), m(farve), head, s * 0.162, -0.012, -0.012).scale.set(0.6, 1, 1);
  };
  // ansigter: skæg, overskæg, briller og røde kinder i kulden
  const skaeg = (farve, fuld = true) => (g, head, part, m) => {
    if (fuld) {
      part(SG(0.118, 20, 10, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), m(farve), head, 0, -0.03, 0.012).scale.set(1.03, 1.12, 1.08);
      const mu = part(TG(0.018, 0.0055, 5, 10, Math.PI), m('#6e2f2a'), head, 0, -0.072, 0.138, 0); mu.rotation.set(-0.25, 0, Math.PI);
    }
    for (const s of [-1, 1]) { const o = part(CG(0.013, 0.034, 6), m(farve), head, s * 0.024, -0.046, 0.137, 0); o.rotation.set(0, s * 0.3, Math.PI / 2 + s * 0.35); }
  };
  const briller = (farve) => (g, head, part, m) => {
    for (const s of [-1, 1]) {
      part(TG(0.027, 0.0045, 5, 16), m(farve), head, s * 0.049, 0.012, 0.142, 0);
      part(streg([s * 0.076, 0.016, 0.138], [s * 0.138, 0.012, 0.02], 0.0045), m(farve), head, 0, 0, 0, 0);
    }
    part(streg([-0.022, 0.018, 0.146], [0.022, 0.018, 0.146], 0.004), m(farve), head, 0, 0, 0, 0);
  };
  const kinder = (farve = '#e7978b') => (g, head, part, m) => {
    for (const s of [-1, 1]) { const c = part(SG(0.022, 8, 6), m(farve), head, s * 0.074, -0.034, 0.107, 0); c.scale.set(1, 0.6, 0.3); c.rotation.y = s * 0.62; }
  };
  // tøj
  const dyne = (farve, ys) => (g, head, part, m, foran) => { for (const y of ys) ring(part, m, farve, g, foran(y) / ZF + 0.002, 0.022, y, ZF, 5, 24); };
  const lynlaas = (farve, y0, y1, ud = 0.008) => (g, head, part, m, foran) => {
    const pts = []; for (let k = 0; k <= 8; k++) { const y = y0 + (y1 - y0) * k / 8; pts.push(new THREE.Vector3(0, y, foran(y) + ud)); }
    part(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.0065, 4), m(farve), g, 0, 0, 0, 0);
    part(BG(0.017, 0.042, 0.008), m('#c9c4b8'), g, 0.004, y1 - 0.07, foran(y1 - 0.07) + ud + 0.008, 0);
  };
  const knapper = (farve, ys, xs = [0]) => (g, head, part, m, foran) => { for (const y of ys) for (const x of xs) part(SG(0.016, 8, 6), m(farve), g, x, y, fz(foran, y, x) + 0.004, 0).scale.set(1, 1, 0.5); };
  const lommer = (farve, y = 1.0) => (g, head, part, m, foran) => {
    for (const s of [-1, 1]) { const x = s * 0.125, p = part(BG(0.12, 0.042, 0.016), m(farve), g, x, y, fz(foran, y, x) + 0.004, 0); p.rotation.set(-0.08, s * Math.asin(Math.min(0.9, x / (foran(y) / ZF))), 0); }
  };
  const baelte = (farve, spaende, y = 1.08) => (g, head, part, m, foran) => {
    ring(part, m, farve, g, foran(y) / ZF + 0.004, 0.016, y, ZF, 4, 28);
    part(BG(0.06, 0.05, 0.014), m(spaende), g, 0, y, foran(y) + 0.02, 0);
  };
  const haette = (farve, pels) => (g, head, part, m) => {   // a parka hood behind the neck with a fur edge
    part(SG(0.15, 14, 10), m(farve), g, 0, 1.6, -0.13).scale.set(1.2, 0.62, 0.78);
    const r = ring(part, m, pels, g, 0.12, 0.042, 1.63, 1, 8, 22, 1); r.rotation.x = Math.PI / 2 - 0.35; r.position.z = -0.03;
  };
  const halstoerklaede = (farve, stribe) => (g, head, part, m, foran) => {
    const r = ring(part, m, farve, g, 0.086, 0.04, 1.6, 0.92, 6, 18, 1); r.rotation.x = Math.PI / 2 - 0.12;
    part(SG(0.042, 8, 6), m(farve), g, 0.05, 1.555, foran(1.555) + 0.02).scale.set(1, 0.9, 0.8);   // the knot
    for (const [x, l, rz] of [[0.06, 0.25, 0.1], [0.02, 0.33, -0.05]]) {
      const e2 = new THREE.Group(); e2.position.set(x, 1.55, foran(1.5) + 0.03 + (l > 0.3 ? 0 : 0.012)); e2.rotation.set(-0.12, 0, rz); g.add(e2);
      part(BG(0.08, l, 0.024), m(farve), e2, 0, -l / 2, 0);
      if (stribe) for (const k of [0.05, 0.1]) part(BG(0.082, 0.022, 0.027), m(stribe), e2, 0, -l + k, 0, 0);
      for (let k = 0; k < 4; k++) part(new THREE.CylinderGeometry(0.006, 0.004, 0.035, 4), m(stribe || farve), e2, -0.03 + k * 0.02, -l - 0.02, 0, 0);
    }
  };
  const forklaede = (farve, baand) => (g, head, part, m, foran) => {   // an apron with a strap round the neck
    part(BG(0.3, 0.46, 0.012), m(farve), g, 0, 1.02, foran(1.02) + 0.012, 0);
    part(BG(0.3, 0.03, 0.014), m(baand || farve), g, 0, 1.24, foran(1.24) + 0.016, 0);
    for (const sd of [-1, 1]) { const st_ = part(BG(0.025, 0.36, 0.01), m(baand || farve), g, sd * 0.06, 1.42, foran(1.42) + 0.01, 0); st_.rotation.z = sd * 0.12; }
  };
  const hat = (farve, baand) => (g, head, part, m) => {   // a felt hat with a brim and a band
    part(new THREE.CylinderGeometry(0.205, 0.205, 0.014, 22), m(farve), head, 0, 0.115, -0.01);
    part(new THREE.CylinderGeometry(0.128, 0.142, 0.13, 20), m(farve), head, 0, 0.185, -0.01);
    part(new THREE.CylinderGeometry(0.144, 0.145, 0.03, 20), m(baand || '#1a1412'), head, 0, 0.135, -0.01);
  };
  // vanter (arm-funktioner), støvler (bliver sat på i foer) og et hvilende ben
  const vante = (s, farve, kant) => (sh, part, m, el) => {
    part(SG(0.056, 10, 8), m(farve), el, 0, -0.312, 0.006).scale.set(0.92, 1.12, 0.76);
    const tu = part(CG(0.019, 0.032, 6), m(farve), el, -s * 0.038, -0.283, 0.026); tu.rotation.z = s * 0.55;
    ring(part, m, kant || farve, el, 0.046, 0.017, -0.252, 0.82, 5, 12);
  };
  const dyneaerme = (farve) => (sh, part, m, el) => { for (const y of [-0.1, -0.2]) ring(part, m, farve, sh, 0.066, 0.016, y, 1, 4, 14); ring(part, m, farve, el, 0.06, 0.015, -0.08, 1, 4, 14); };
  const stoevler = (f, P, farve, kant) => { for (const l of f.legs) { P.part(new THREE.CylinderGeometry(0.075, 0.071, 0.2, 12), P.m(farve), l.knee, 0, -0.35, 0.006); if (kant) ring(P.part, P.m, kant, l.knee, 0.072, 0.024, -0.255, 1, 5, 14, 1); } };
  // krus og skilte i hånden: de sidder ved hånden, men bliver holdt lodrette hver frame (lodret() i scenen)
  const SKILT = (() => {   // one canvas for both signs and a plain strip for the edges and the back, so they share one material
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 640; const c = cv.getContext('2d');
    c.fillStyle = '#d9cdb6'; c.fillRect(0, 512, 512, 128);
    [['TRYGHED', 'FOR ALLE', '#2f5fa8'], ['BEVAR', 'DAGPENGENE', '#b3262a']].forEach(([a, b, col], k) => {
      const y0 = k * 256; c.fillStyle = '#d9cdb6'; c.fillRect(0, y0, 512, 256); c.fillStyle = '#f7f2e6'; c.fillRect(16, y0 + 16, 480, 224);
      c.strokeStyle = col; c.lineWidth = 10; c.strokeRect(30, y0 + 30, 452, 196);
      c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '800 74px Georgia, serif'; c.fillText(a, 256, y0 + 94, 420); c.fillText(b, 256, y0 + 166, 420);
    });
    const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4; if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex }); mat.userData.sne = true;
    return mat;
  })();
  const holdGruppe = (el, z = 0) => { const h = new THREE.Group(); h.position.set(0, -0.31, z); h.userData.fri = true; el.add(h); el.userData.hold = h; return h; };
  const skilt = (k) => (sh, part, m, el) => {
    const h = holdGruppe(el);
    stk(G.cyl, M.trae, h, 0, 0.42, -0.03, 0.014, 1.14, 0.014).userData.fri = true;
    const geo = new THREE.BoxGeometry(0.6, 0.4, 0.03), uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {   // the front (+z, corners 16-19) shows the sign, the rest the plain strip
      const u = uv.getX(i), v = uv.getY(i);
      if (i >= 16 && i < 20) uv.setXY(i, u, 1 - (k + 1) * 0.4 + v * 0.4); else uv.setXY(i, 0.2 + u * 0.6, 0.04 + v * 0.12);
    }
    stk(geo, SKILT, h, 0, 1.0, 0, 1, 1, 1).userData.fri = true;
  };
  const krus = (farve) => (sh, part, m, el) => {
    const h = holdGruppe(el, 0.02);
    stk(new THREE.CylinderGeometry(0.036, 0.03, 0.11, 14), tm(farve), h, 0, 0.03, 0.045, 1, 1, 1, false).userData.fri = true;
  };

  // en person med tøj (først lavet til demonstrationen, nu brugt i alle optrin): o går videre til menneske().
  // grupper(f) vælger, hvilke dele der kan bevæge sig (standard: krop, hoved og arme). hue, ansigt, toej: lister af extra-funktioner. vanter: [farve, kant].
  // arm: [venstre, højre] for det, de holder. stoevle: [farve, kant]. ben: -1 eller 1 for det ben, de hviler på.
  function demonstrant(o) {
    let P = null;
    const fl = [...(o.hue || []), ...(o.ansigt || []), ...(o.toej || []), o.kvinde && GFX.lav ? kinder('#f0a59b') : null].filter(Boolean), arm = o.arm || [];   // low graphics drops the women's cheeks, so they get them here
    const vanter = o.vanter || ['#b3262a'];
    const ae = o.dyneaerme ? dyneaerme(o.coat) : null;
    return menneske(Object.assign({}, o, {
      enkel: false, skygge, detalje: GFX.lav ? 'lav' : undefined, grupper: o.grupper || (f => [f.g, f.head, ...f.arms]), hue: undefined,   // fewer corners on low graphics
      extra: (g, head, part, m, foran) => { P = { part, m }; for (const fn of fl) fn(g, head, part, m, foran); },
      arm: [-1, 1].map((s, i) => flere(vante(s, ...vanter), ae, arm[i])),
      foer: f => {
        f.head.rotation.order = 'YXZ';
        if (o.stoevle) stoevler(f, P, ...o.stoevle);
        for (const [i, l] of f.legs.entries()) l.hip.rotation.z = (i ? 1 : -1) * 0.03;   // feet a little apart
        if (o.ben) { const s = o.ben, l = f.legs[s > 0 ? 1 : 0]; l.hip.rotation.set(-0.07, s * 0.28, s * 0.08); l.knee.rotation.x = 0.18; }
        if (o.boej) for (const [i, el] of f.elbows.entries()) el.rotation.set(-o.boej[i], 0, 0);   // the elbows are baked into the arms, so the bend is fixed
        if (o.foer2) o.foer2(f, P);
      },
    }));
  }

  // ---------------------------------------------------------------- 1. Mandelboden på Højbro Plads
  // Boden vender mod vejen fra Højbro. Sælgeren rører i panden, gløden blafrer, dampen stiger, og der står tre i kø.
  scene(9.5, -196, -Math.PI / 2, (g, e) => {
    // boden: disk, to stolper, et rød-hvidt tag og en lille lyskæde
    stk(G.kasse, M.trae, g, 0, 0.5, 0, 1.0, 1.0, 2.0);
    stk(G.kasse, M.moerktTrae, g, 0, 1.02, 0, 1.1, 0.06, 2.1);
    for (const s of [-1, 1]) for (const k of [-1, 1]) stk(G.cyl, M.moerktTrae, g, -0.45 * k + 0.0, 1.55, s * 0.98, 0.04, 1.1, 0.04);
    for (let i = 0; i < 5; i++) stk(G.kasse, i % 2 ? M.hvid : M.roed, g, -0.1, 2.15 + (i - 2) * 0.0, -0.84 + i * 0.42, 1.5, 0.12, 0.42).rotation.z = -0.22;   // taget, striber på tværs
    const pande = stk(G.cyl, M.kobber, g, -0.15, 1.1, -0.4, 0.34, 0.1, 0.34);
    for (let i = 0; i < 9; i++) { const a = i * 2.4, r = 0.08 + (i % 3) * 0.07; stk(G.lilleKugle, M.mandel, g, -0.15 + Math.cos(a) * r, 1.16, -0.4 + Math.sin(a) * r, 0.035, 0.025, 0.045, false); }
    for (let i = 0; i < 4; i++) stk(G.kegle, M.hvid, g, -0.3, 1.13, 0.25 + i * 0.13, 0.05, 0.16, 0.05, false).rotation.z = Math.PI;   // poser med mandler, klar til at sælge
    const glod = new THREE.Sprite(glodMat('#ff9a3c', 0.7)); glod.position.set(-0.15, 1.05, -0.4); glod.scale.setScalar(1.3); g.add(glod);
    const lyskaede = [];
    for (let i = 0; i < 6; i++) { const s = new THREE.Sprite(glodMat(['#ffd27a', '#ff6b5e', '#ffd27a'][i % 3], 0.9)); s.position.set(-0.85, 1.93 + Math.sin(i * 1.3) * 0.03, -1.0 + i * 0.4); s.scale.setScalar(0.28); g.add(s); lyskaede.push(s); }
    const damp = [0, 1, 2, 3].map(i => { const s = new THREE.Sprite(dampMat()); g.add(s); return { s, f: i / 4 }; });
    colCirc(...e.ver(0, 0), 1.15, 2.2);
    // sælgeren bag disken med en træske
    const HV = '#f4f1ea';
    const saelger = placer(demonstrant({ coat: '#7a2a24', trousers: '#2b2a30', skin: '#f2c6a4', hair: '#6b4a2f', kvinde: true, hairStyle: 'knold', scale: 0.98,
      hue: [strikhue('#2f5f3a', '#2f5f3a', HV, '#e0a63a')], ansigt: [kinder()], toej: [forklaede('#f1e6d6', '#b3262a'), halstoerklaede('#e0a63a', '#7a2a24')],
      vanter: ['#e0a63a'], stoevle: ['#3a2a20'],
      arm: [null, (sh, part, m, el) => { part(new THREE.CylinderGeometry(0.012, 0.016, 0.5, 6), m('#a8794c'), el, 0, -0.5, 0.06, 0); }], boej: [0.6, 0.9] }), g, 0.75, -0.3, -Math.PI / 2);
    // kunderne: en mand, der gnider hænderne, en mor og et barn, der ikke kan stå stille
    const mand = placer(demonstrant({ coat: '#3a4a5a', trousers: '#2d3340', skin: '#e9bd99', hair: '#3b2a20', hairStyle: 'kort', scale: 1.04,
      hue: [pelshue('#5b4636', '#d9cdb6')], ansigt: [skaeg('#3b2a20', false), kinder()], toej: [knapper('#c9c4b8', [0.95, 1.1, 1.25, 1.4], [-0.06, 0.06]), lommer('#30404e', 1.0), halstoerklaede('#c0392b', HV)],
      vanter: ['#2b2f36'], stoevle: ['#2a1d14'], boej: [1.3, 1.3] }), g, -1.0, -0.2, Math.PI / 2);
    const mor = placer(demonstrant({ coat: '#6a3a5a', trousers: '#2b2a30', skin: '#f4d2b8', hair: '#a8794c', kvinde: true, long: true, hairStyle: 'bob', scale: 0.96, ben: 1,
      hue: [strikhue('#d9d2c2', '#d9d2c2', '#b3262a', '#b3262a')], toej: [knapper('#e8dcc6', [0.9, 1.05, 1.2, 1.35]), baelte('#4a2a40', '#d9b25a', 1.1), halstoerklaede('#e0a63a', '#6a3a5a')],
      vanter: ['#b3262a', HV], stoevle: ['#2a1d14', '#e8dcc6'] }), g, -2.0, 0.6, Math.PI / 2 - 0.3);
    const barn = placer(demonstrant({ coat: '#e0a63a', trousers: '#2f5fa8', skin: '#f4d2b8', hair: '#d9c08a', barn: true, hairStyle: 'hestehale', kvinde: true, dyneaerme: true,
      hue: [strikhue('#b3262a', HV, HV, HV)], toej: [dyne('#e0a63a', [0.98, 1.12, 1.26, 1.4]), lynlaas('#2f5fa8', 0.9, 1.58, 0.024)], vanter: ['#2f5fa8', HV], stoevle: ['#b3262a', HV] }), g, -1.55, 1.15, Math.PI / 2 - 0.6);
    mand.arms[0].rotation.x = mand.arms[1].rotation.x = -0.7; mand.arms[0].rotation.z = 0.3; mand.arms[1].rotation.z = -0.3;
    // lyden: panden syder, mandlerne knitrer, og sælgeren råber, når Ida kommer hen
    let sydT = 0, knitT = 0, raabt = false;
    return (t, dt, pos) => {
      const dI = Math.hypot(pos.x - e.x, pos.z - e.z), vol = Math.max(0, 1 - dI / 16) ** 1.6;
      if (vol > 0.03 && H.sus) {
        sydT -= dt; if (sydT <= 0) { sydT = 0.55 + Math.random() * 0.3; H.sus(0.9, 0.012 * vol, 5200, 0.6, 4200); }
        knitT -= dt; if (knitT <= 0) { knitT = 0.15 + Math.random() * 0.7; H.sus(0.03, 0.03 * vol, 2600 + Math.random() * 2000, 2); }
      }
      if (dI < 6 && !raabt) { raabt = true; H.toast?.('Brændte mandler! Varme, brændte mandler! En pose for 30 kroner.'); }
      if (dI > 14) raabt = false;
      // røre i panden
      saelger.arms[1].rotation.x = -0.75 + Math.sin(t * 3.2) * 0.18; saelger.arms[1].rotation.z = 0.25 + Math.cos(t * 3.2) * 0.12;
      saelger.g.rotation.x = 0.12 + Math.sin(t * 0.6) * 0.03;
      glod.material.opacity = 0.55 + Math.sin(t * 7.1) * 0.08 + Math.sin(t * 12.7) * 0.06; glod.scale.setScalar(1.2 + Math.sin(t * 5.3) * 0.08);
      for (const d of damp) { const k = (t * 0.35 + d.f) % 1; d.s.position.set(-0.15 + Math.sin(k * 6 + d.f * 9) * 0.08, 1.2 + k * 1.1, -0.4 + k * 0.1); d.s.scale.setScalar(0.25 + k * 0.6); d.s.material.opacity = Math.sin(k * Math.PI) * 0.32; }
      lyskaede.forEach((s, i) => { s.material.opacity = 0.65 + Math.sin(t * 2 + i * 1.7) * 0.25; });
      // manden gnider hænderne i kulden
      mand.arms[0].rotation.x = -0.7 + Math.sin(t * 9) * 0.08; mand.arms[1].rotation.x = -0.7 - Math.sin(t * 9) * 0.08;
      mand.g.rotation.z = Math.sin(t * 1.1) * 0.03;
      // moren kigger rundt, og barnet hopper
      mor.g.rotation.z = Math.sin(t * 0.7 + 1) * 0.025; mor.root.rotation.y = Math.PI / 2 - 0.3 + Math.sin(t * 0.4) * 0.25;
      const hop = Math.max(0, Math.sin(t * 6.5)); barn.g.position.y = hop * hop * 0.12; barn.arms[0].rotation.z = -0.3 - hop * 0.6; barn.arms[1].rotation.z = 0.3 + hop * 0.6;
    };
  });

  // ---------------------------------------------------------------- 2. Far og det alt for store juletræ (Slotspladsen)
  // Træet ligger på pladsen. Far tager fat i stammen, læner sig bagud og trækker. Det flytter sig næsten ikke.
  // Så glipper grebet, og han sætter sig i sneen. Børnene griner. Han rejser sig, tørrer panden og prøver igen.
  scene(89, -44, 0, (g, e) => {
    const trae = new THREE.Group(); g.add(trae);
    stk(G.cyl, M.moerktTrae, trae, 0, 0.2, 0.55, 0.1, 0.7, 0.1).rotation.x = Math.PI / 2;
    for (let i = 0; i < 5; i++) {
      const r = 1.05 - i * 0.17, h = 1.5, z = 1.35 + i * 0.68;
      const k = stk(G.kegle, M.groen, trae, 0, r * 0.72, z, r, h, r); k.rotation.x = Math.PI / 2; k.scale.set(r, h, r * 0.72);
    }
    for (const lz of [1.2, 2.4, 3.6]) colCirc(...e.ver(0, lz), 0.8, 0.9);
    const HV = '#f4f1ea';
    const far = placer(demonstrant({ coat: '#2f5f3a', trousers: '#2b2f36', skin: '#e9bd99', hair: '#6b4a2f', hairStyle: 'kort', scale: 1.03, grupper: f => [f.g, f.head, ...f.arms, ...f.hips],
      hue: [strikhue('#b3262a', HV, HV)], ansigt: [skaeg('#6b4a2f'), kinder()], toej: [haette('#2f5f3a', '#cbb89a'), lynlaas('#1e3a24', 0.9, 1.6), lommer('#284e30', 1.0), halstoerklaede('#b3262a', HV)],
      vanter: ['#e0a63a', '#b3262a'], stoevle: ['#5a3a24', '#e8dcc6'], boej: [0.15, 0.15] }), g, 0, -0.3, 0);
    const pige = placer(demonstrant({ coat: '#c0392b', trousers: '#24303a', skin: '#f4d2b8', hair: '#3b2a20', barn: true, kvinde: true, hairStyle: 'hestehale', dyneaerme: true,
      hue: [strikhue('#f1e3c0', '#f1e3c0', '#2f5fa8', '#2f5fa8')], toej: [dyne('#c0392b', [0.98, 1.12, 1.26, 1.4]), lynlaas(HV, 0.9, 1.58, 0.024)], vanter: ['#2f5fa8'], stoevle: ['#2f5fa8', HV] }), g, 1.7, -2.3, Math.atan2(-1.7, 1.9));
    const dreng = placer(demonstrant({ coat: '#2f5fa8', trousers: '#24303a', skin: '#c98d62', hair: '#2b2420', barn: true, hairStyle: 'kort', dyneaerme: true,
      hue: [strikhue('#e0a63a', '#e0a63a', HV, '#b3262a')], toej: [dyne('#2f5fa8', [0.98, 1.12, 1.26, 1.4]), lynlaas('#e0a63a', 0.9, 1.58, 0.024), halstoerklaede('#b3262a', HV)], vanter: ['#b3262a'], stoevle: ['#3a2a20'] }), g, 2.5, -1.3, Math.atan2(-2.5, 0.9));
    const T = 8.5;
    return (tt) => {
      const t = tt % T;
      const traek = ramp(t, 0.2, 1.2) * (1 - ramp(t, 3.0, 3.2));     // læner sig bagud og trækker
      const fald = ramp(t, 3.0, 3.55) * (1 - ramp(t, 5.6, 6.5));      // glider og sidder i sneen
      const ryst = traek * Math.sin(tt * 23) * 0.025;
      const ryk = traek * Math.max(0, Math.sin(tt * 3.1)) * 0.06;        // træet flytter sig en lille smule, når han rykker
      trae.position.z = -ryk;
      // stående: hænderne på stammen. Siddende: lidt bagud, benene frem
      far.root.position.z = -0.3 - traek * 0.12 - fald * 0.55;
      far.g.rotation.x = lerp(-traek * 0.42 + ryst, -0.15, fald);
      far.g.position.y = -fald * 0.72;
      far.hips[0].rotation.x = lerp(-traek * 0.45, -1.5, fald); far.hips[1].rotation.x = lerp(traek * 0.15, -1.45, fald);
      const tor = ramp(t, 7.0, 7.4) * (1 - ramp(t, 8.0, 8.4));          // tørrer panden
      far.arms[0].rotation.x = lerp(lerp(-1.25 + traek * 0.35, -0.4, fald), -2.6, tor);
      far.arms[1].rotation.x = lerp(-1.25 + traek * 0.35, 0.3, fald);
      far.arms[0].rotation.z = -0.08 - fald * 0.5 + tor * 0.5 + Math.sin(tt * 8) * 0.15 * tor; far.arms[1].rotation.z = 0.08 + fald * 0.5;
      far.g.rotation.z = fald * Math.sin(tt * 2.2) * 0.06;
      // børnene: lidt spændte, mens han trækker, og flade af grin, når han sidder
      const grin = ramp(t, 3.2, 3.6) * (1 - ramp(t, 6.0, 7.0));
      for (const [b, ph] of [[pige, 0], [dreng, 1.3]]) {
        const hop = Math.max(0, Math.sin(tt * (6 + grin * 4) + ph));
        b.g.position.y = hop * (0.03 + grin * 0.1);
        b.g.rotation.x = grin * (0.35 + Math.sin(tt * 11 + ph) * 0.12);
        b.arms[0].rotation.x = -grin * 0.4 - (1 - grin) * 0.3; b.arms[1].rotation.x = lerp(-0.3, -1.5, grin);   // peger på far
        b.arms[0].rotation.z = -0.15 - (1 - grin) * Math.max(0, Math.sin(tt * 5 + ph)) * 0.4;
      }
    };
  });

  // ---------------------------------------------------------------- 5. Snemanden med slips (Ridebanen)
  // En snemand med hat, slips og en mappe ved foden. To børn kaster snebolde efter ham på skift. Når en bold rammer,
  // pudser sneen, og hatten vipper.
  scene(-138, 116.5, 0, (g, e) => {
    const sm_ = new THREE.Group(); g.add(sm_);
    stk(G.kugle, M.sne, sm_, 0, 0.42, 0, 0.5, 0.44, 0.5); stk(G.kugle, M.sne, sm_, 0, 1.02, 0, 0.36, 0.33, 0.36);
    const hoved = new THREE.Group(); hoved.position.set(0, 1.5, 0); sm_.add(hoved);
    stk(G.kugle, M.sne, hoved, 0, 0, 0, 0.25);
    for (const s of [-1, 1]) stk(G.lilleKugle, M.kul, hoved, s * 0.085, 0.06, 0.22, 0.03, 0.03, 0.03, false);
    stk(G.kegle, M.gulerod, hoved, 0, 0, 0.3, 0.035, 0.2, 0.035, false).rotation.x = Math.PI / 2;
    for (let i = 0; i < 5; i++) stk(G.lilleKugle, M.kul, hoved, (i - 2) * 0.045, -0.1 - Math.abs(i - 2) * -0.015 - 0.02, 0.22, 0.018, 0.018, 0.018, false);
    const hat = new THREE.Group(); hat.position.set(0, 0.2, 0); hoved.add(hat);
    stk(G.cyl, M.kul, hat, 0, 0.02, 0, 0.26, 0.03, 0.26); stk(G.cyl, M.kul, hat, 0, 0.16, 0, 0.17, 0.26, 0.17);
    // slipset og knapperne
    stk(G.kasse, M.roed, sm_, 0, 1.3, 0.33, 0.07, 0.06, 0.04, false);
    const slips = stk(G.kasse, M.roed, sm_, 0, 1.12, 0.36, 0.08, 0.32, 0.03, false); slips.rotation.x = -0.35;
    for (const y of [0.9, 0.55, 0.35]) stk(G.lilleKugle, M.kul, sm_, 0, y, (y > 0.7 ? 0.355 : 0.49), 0.035, 0.035, 0.035, false);
    for (const s of [-1, 1]) { const arm = stk(G.cyl, M.moerktTrae, sm_, s * 0.5, 1.12, 0, 0.018, 0.55, 0.018, false); arm.rotation.z = s * 1.0; }
    const mappe = stk(G.kasse, M.moerktTrae, g, 0.45, 0.18, 0.5, 0.36, 0.28, 0.08); mappe.rotation.set(-0.2, -0.3, 0);
    colCirc(...e.ver(0, 0), 0.55, 1.9);
    // børnene står til hver side og kaster ind mod ham
    const HV = '#f4f1ea';
    const boern = [[-3.6, 0.9, '#3e7d4a', '#e0a63a', false, 'kort', '#6b4a2f', '#f2c6a4'], [3.4, 1.4, '#7d4f8a', '#f1e3c0', true, 'hestehale', '#b4612f', '#f4d2b8']].map(([lx, lz, coat, h, kv, stil, hair, skin]) => {
      const f = placer(demonstrant({ coat, trousers: '#24303a', skin, hair, barn: true, kvinde: kv, hairStyle: stil, dyneaerme: true,
        hue: [strikhue(h, h, HV, '#b3262a')], ansigt: [kinder()], toej: [dyne(coat, [0.98, 1.12, 1.26, 1.4]), lynlaas(HV, 0.9, 1.58, 0.024), halstoerklaede(h, coat)], vanter: [h, coat], stoevle: ['#3a2a20', HV] }), g, lx, lz, Math.atan2(-lx, -lz));
      const bold = stk(G.kugle, M.sne, g, 0, 0, 0, 0.07, 0.07, 0.07, false); bold.visible = false; bold.userData.fri = true;
      return { f, lx, lz, bold };
    });
    const pust = new THREE.Sprite(dampMat()); pust.scale.setScalar(0.6); g.add(pust); let pustT = 9;
    const T = 4.4;
    return (tt, dt) => {
      let ramt = 0;
      boern.forEach((b, i) => {
        const t = (tt + i * T / 2) % T, f = b.f;
        // 0-1: bukker sig og samler sne, 1-1.6: tager tilløb, 1.6-1.8: kaster, 1.8-2.4: bolden flyver
        const buk = ramp(t, 0.1, 0.5) * (1 - ramp(t, 0.9, 1.2));
        f.g.rotation.x = buk * 0.7 - ramp(t, 1.2, 1.6) * 0.15 * (1 - ramp(t, 1.6, 1.75));
        f.arms[1].rotation.x = lerp(lerp(-0.2, -1.0, buk), 2.2, ramp(t, 1.15, 1.6)) * (1 - ramp(t, 1.6, 1.78)) + ramp(t, 1.6, 1.78) * -1.6 * (1 - ramp(t, 2.2, 2.8));
        f.arms[0].rotation.x = lerp(-0.2, -1.0, buk) - ramp(t, 1.2, 1.6) * 0.6 * (1 - ramp(t, 1.8, 2.4));
        f.g.position.y = t > 2.4 && t < 3.6 ? Math.max(0, Math.sin((t - 2.4) * 12)) * 0.06 : 0;   // et lille hop af glæde
        const k = (t - 1.75) / 0.6;
        b.bold.visible = k > 0 && k < 1;
        if (b.bold.visible) {
          const sx = b.lx * 0.9, sz = b.lz * 0.9, mx = (i ? 0.12 : -0.1), my = i ? 1.55 : 1.05, mz = 0.15;
          b.bold.position.set(lerp(sx, mx, k), lerp(0.75, my, k) + Math.sin(k * Math.PI) * 0.7, lerp(sz, mz, k));
        }
        if (t >= 2.35 && t - dt < 2.35) { ramt = i ? 2 : 1; }
      });
      if (ramt) { pustT = 0; pust.position.set(ramt === 2 ? 0.12 : -0.1, ramt === 2 ? 1.55 : 1.05, 0.25); }
      pustT += dt;
      pust.material.opacity = Math.max(0, 0.7 - pustT * 1.6); pust.scale.setScalar(0.4 + pustT * 1.4);
      const vip = Math.exp(-pustT * 3) * Math.sin(pustT * 18);
      hat.rotation.z = vip * 0.25; hat.rotation.x = -0.05; hoved.rotation.z = vip * 0.05;
    };
  });

  // ---------------------------------------------------------------- 6. Demonstrationen (Slotspladsen, ved porten ind til Rigsdagsgården)
  // Ti venlige mennesker i alle aldre i varmt vintertøj. De to ved stængerne holder banneret og løfter det lidt, to snakker
  // sammen, en drikker kaffe af et krus, to har små skilte, en klapper, en vinker, og et barn sidder på sin fars skuldre.
  // De skifter vægt, trækker vejret (med lidt damp i kulden) og kigger rundt, hver i sin egen takt. Når Ida kommer tæt på,
  // kigger de på hende, nikker og vinker.
  // Ydelse: hver person er fire bagte dele (krop med ben, hoved og to arme), og alt tøjet er bagt ind i dem. Dampen er ét
  // punktsæt, og skiltene deler ét lærred.
  function stangGreb(lx, lz, ry, sc, kv, a, tx, ty, tz) {   // the elbow bend that lets arm a reach (tx, ty, tz) in the scene
    const dx = tx - lx, dz = tz - lz, x = (dx * Math.cos(ry) - dz * Math.sin(ry)) / sc, z = (dx * Math.sin(ry) + dz * Math.cos(ry)) / sc;
    const d = Math.min(0.595, Math.hypot(x - (a ? 1 : -1) * (kv ? 0.252 : 0.265), (ty + 0.03) / sc - 1.53, z));
    return Math.acos(Math.max(-1, Math.min(1, d * d / 0.18 - 1)));
  }
  scene(85.3, 32.6, Math.atan2(0.95, -0.25), (g, e) => {
    // banneret: tegnet på et lærred, så teksten står skarpt. Det får ikke sne på.
    const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 200; const c = cv.getContext('2d');
    c.fillStyle = '#f4efe2'; c.fillRect(0, 0, 1024, 200); c.strokeStyle = '#b3262a'; c.lineWidth = 14; c.strokeRect(7, 7, 1010, 186);
    c.fillStyle = '#b3262a'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '700 64px Georgia, serif'; c.fillText('NEJ TAK TIL', 512, 62);
    c.font = '800 70px Georgia, serif'; c.fillText('DAGPENGEFORRINGELSER', 512, 140, 960);
    const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4; if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
    const bm = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }); bm.userData.sne = true; bm.onBeforeCompile = () => {};
    const banner = new THREE.Group(); banner.userData.fri = true; banner.position.set(0, 0, 0.9); g.add(banner);
    const klud = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 0.8, 12, 1), bm); klud.position.y = 1.03; klud.userData.fri = true; banner.add(klud);
    const kludPos = klud.geometry.attributes.position, kludX = Float32Array.from({ length: kludPos.count }, (_, i) => kludPos.getX(i));
    for (const s of [-1, 1]) { const st = stk(G.cyl, M.moerktTrae, banner, s * 2.02, 0.78, 0, 0.025, 1.56, 0.025, false); st.userData.fri = true; }
    // folkene. [x, z, drejning, rolle, udseende]
    const HV = '#f4f1ea';
    const folk = [
      [-2.22, 0.62, 0.15, 'stang', { coat: '#2f5fa8', trousers: '#2b2f36', skin: '#e9bd99', hair: '#6b4a2f', hairStyle: 'kort', scale: 1.04, ben: 1, dyneaerme: true,
        hue: [strikhue('#b3262a', HV, HV, HV)], ansigt: [skaeg('#5a3c26'), kinder()], toej: [dyne('#2f5fa8', [0.93, 1.06, 1.19, 1.32, 1.45]), lynlaas('#1d2a44', 0.9, 1.6, 0.024)],
        vanter: ['#e0a63a', '#b3262a'], stoevle: ['#5a3a24', '#e8dcc6'] }],
      [2.22, 0.62, -0.15, 'stang', { coat: '#8a2a2a', trousers: '#2b2a30', skin: '#f4d2b8', hair: '#b4612f', kvinde: true, long: true, hairStyle: 'lang', scale: 0.97, ben: -1,
        hue: [oerevarmere('#f1e6d6')], toej: [knapper('#d9b25a', [0.88, 1.02, 1.16, 1.3], [-0.06, 0.06]), baelte('#5e1c1c', '#d9b25a', 1.1), halstoerklaede('#e0a63a', '#8a2a2a')],
        vanter: [HV, '#b3262a'], stoevle: ['#1f1b1a', '#e8dcc6'] }],
      [-1.3, 0.12, 0.12, 'klap', { coat: '#3e5e3a', trousers: '#3a3a40', skin: '#f2c6a4', hair: '#d8d4ca', hairStyle: 'skaldet', bryn: '#bdb8ae', scale: 1.0, ben: -1,
        hue: [pelshue('#5b4636', '#d9cdb6')], ansigt: [briller('#9a7a3a'), skaeg('#e4e0d6', false), kinder()], toej: [haette('#3e5e3a', '#cbb89a'), knapper('#d9cdb6', [0.98, 1.14, 1.3, 1.46]), lommer('#34502f', 1.02)],
        vanter: ['#b3262a', HV], stoevle: ['#3a2a20'] }],
      [-0.45, 0.3, 0.02, 'skilt', { coat: '#6a3a7a', trousers: '#2b2a30', skin: '#7d4f36', hair: '#1f1a18', kvinde: true, hairStyle: 'hestehale', haarbaand: '#e0a63a', scale: 0.95, ben: 1, dyneaerme: true,
        hue: [strikhue('#e0a63a', '#e0a63a', HV, '#b3262a')], toej: [dyne('#6a3a7a', [0.95, 1.08, 1.21, 1.34]), lynlaas('#3a1f44', 0.9, 1.58, 0.024)],
        vanter: [HV, '#6a3a7a'], stoevle: ['#b98a5a', '#efe4cf'], hand: 0, sk: 0, skiltFarve: '#d9cdb6' }],
      [0.45, 0.22, 0.5, 'snak', { coat: '#2f6f6a', trousers: '#2b2a30', skin: '#f2c6a4', hair: '#d9c08a', kvinde: true, long: true, hairStyle: 'bob', scale: 0.98, ben: -1,
        toej: [knapper('#1d3f3c', [0.9, 1.05, 1.2, 1.35]), lommer('#285e5a', 0.98), halstoerklaede('#b3262a', HV)],
        vanter: ['#2b2f36', '#b3262a'], stoevle: ['#3a2a20'] }],
      [1.25, 0.3, -0.5, 'termo', { coat: '#3a3f48', trousers: '#24303a', skin: '#a86f4c', hair: '#1f1a18', hairStyle: 'kort', scale: 1.06, ben: 1,
        hue: [strikhue('#6f7780', '#6f7780', null, '#e0a63a')], ansigt: [skaeg('#1f1a18')], toej: [lynlaas('#23262c', 0.9, 1.58), lommer('#30343c', 1.0), halstoerklaede('#c0392b', '#e0a63a')],
        vanter: ['#8a5a33', '#6b4228'], stoevle: ['#2a1d14'], arm: [null, krus('#3f7fbf')] }],
      [-3.2, 1.0, 0.4, 'skilt', { coat: '#d9622b', trousers: '#3b4f70', skin: '#f4d2b8', hair: '#a8794c', hairStyle: 'kort', scale: 0.94, dyneaerme: true, shoes: '#eeeeee',
        hue: [strikhue('#3e7d4a', '#3e7d4a', HV, HV)], toej: [dyne('#d9622b', [0.95, 1.08, 1.21, 1.34, 1.46]), lynlaas('#2b2f36', 0.9, 1.6, 0.024)],
        vanter: ['#2b2f36', '#3e7d4a'], hand: 1, sk: 1, skiltFarve: '#d9cdb6', kold: true }],
      [3.2, 1.0, -0.4, 'vink', { coat: '#6a3a5a', trousers: '#2b2a30', skin: '#f2c6a4', hair: '#f1eee6', kvinde: true, long: true, hairStyle: 'bob', scale: 0.93, ben: 1,
        hue: [pelshue('#e8dcc6', '#f4efe6', false)], ansigt: [briller('#8a2a2a')], toej: [knapper('#e8dcc6', [0.86, 1.0, 1.14, 1.28, 1.42]), baelte('#4a2a40', '#d9b25a', 1.12), halstoerklaede('#2f5fa8', HV)],
        vanter: ['#b3262a', HV], stoevle: ['#2a1d14', '#e8dcc6'] }],
      [0.0, -0.5, 0, 'far', { coat: '#24304a', trousers: '#2b2f36', skin: '#c98d62', hair: '#2b2420', hairStyle: 'kort', scale: 1.05,
        hue: [strikhue('#1f2a44', '#1f2a44', null, HV)], ansigt: [skaeg('#2b2420')], toej: [knapper('#c9c4b8', [0.95, 1.1, 1.25, 1.4], [-0.07, 0.07]), halstoerklaede('#e0a63a', '#24304a')],
        vanter: ['#e0a63a'], stoevle: ['#2a1d14'] }],
      [0, 0, 0, 'barn', { coat: '#c0392b', trousers: '#c0392b', skin: '#f4d2b8', hair: '#d9c08a', kvinde: true, hairStyle: 'hestehale', barn: true, dyneaerme: true,
        hue: [strikhue('#2f5fa8', HV, HV, HV)], toej: [dyne('#c0392b', [0.98, 1.12, 1.26, 1.4]), lynlaas(HV, 0.9, 1.58, 0.024)],
        vanter: [HV, '#2f5fa8'], stoevle: ['#2f5fa8', HV],
        foer2: f => { for (const [i, l] of f.legs.entries()) { const s = i ? 1 : -1; l.hip.rotation.set(-1.25, 0, s * 0.55); l.knee.rotation.x = 1.45; } } }],
    ].map(([lx, lz, ry, rolle, o], i) => {
      if (rolle === 'skilt') o.arm = o.hand ? [null, skilt(o.sk)] : [skilt(o.sk), null];
      // at a pole the inner hand holds high and the outer hand low: the elbow bends so the hands reach the pole
      const stang = [0, 1].map(a => { const side = lx < 0 ? -1 : 1, hoej = (a === 1) === (side < 0); return stangGreb(lx, lz, ry, o.scale || 1, o.kvinde, a, side * 2.02, hoej ? 1.4 : 1.08, 0.9 - 0.02); });
      o.boej = { stang, klap: [1.25, 1.25], skilt: o.hand ? [0.7, 1.3] : [1.3, 0.7], snak: [0.7, 1.1], termo: [1.2, 1.6], vink: [0.7, 0.9], far: [2.4, 2.4], barn: [0.8, 0.9] }[rolle];
      const f = demonstrant(o);
      if (rolle !== 'barn') placer(f, g, lx, lz, ry);
      return { f, rolle, i, o, lx, lz, ry, p: Math.random() * 6.3, sc: f.g.scale.y, w: 0.6 + Math.random() * 0.5, aand: 1.35 + Math.random() * 0.5, lean: 0.01 + Math.random() * 0.025,
        yaw: 0, pitch: 0, tY: 0, tP: 0.03, next: Math.random() * 2, mal: null, att: 0, nik: 9, hold: [new THREE.Vector3(), new THREE.Vector3()], vink: 0 };
    });
    const far = folk.find(d => d.rolle === 'far'), barn = folk.find(d => d.rolle === 'barn');
    barn.f.root.position.set(0, 1.04, -0.1); far.f.g.add(barn.f.root);   // på fars skuldre
    const snak = folk.filter(d => d.rolle === 'snak' || d.rolle === 'termo');
    for (const d of folk) d.naboer = folk.filter(o => o !== d && Math.abs(o.lx - d.lx) < 1.9 && o.rolle !== 'barn').map(o => o.f.head);
    for (const d of snak) d.partner = snak.find(o => o !== d);
    colCirc(...e.ver(0, 0.3), 2.6, 2.2);
    for (const s of [-1, 1]) colCirc(...e.ver(s * 3.2, 1.0), 0.5, 2.2);

    // damp: ånde fra alle og fra kruset, i ét punktsæt
    const N = folk.length * 2 + 3, dPos = new Float32Array(N * 3), dFarve = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) dFarve.set([0.93, 0.95, 0.98, 0], i * 4);
    const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3)); dGeo.setAttribute('color', new THREE.BufferAttribute(dFarve, 4));
    const damp = new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.2, map: TX.glow, transparent: true, depthWrite: false, vertexColors: true }));
    damp.frustumCulled = false; damp.userData.fri = true; g.add(damp);
    const putDamp = (k, w, a) => { g.worldToLocal(w); dPos[k * 3] = w.x; dPos[k * 3 + 1] = w.y; dPos[k * 3 + 2] = w.z; dFarve[k * 4 + 3] = a; };

    // hjælpere: en arm, der peger hånden mod et punkt (i personens egne koordinater), og et blik mod et punkt i verden.
    // Albuen er bagt ind i armen med en fast bøjning (boej), så det er kun skulderen, der drejer.
    const va = new THREE.Vector3(), vb = new THREE.Vector3(), tw = new THREE.Vector3(), ida = new THREE.Vector3();
    function grib(f, i, x, y, z) {
      const sh = f.arms[i], phi = -f.elbows[i].rotation.x, A = 0.3, B = 0.3;
      vb.set(0, -A - B * Math.cos(phi), B * Math.sin(phi)).normalize();
      sh.quaternion.setFromUnitVectors(vb, va.set(x, y, z).sub(sh.position).normalize());
    }
    const qA = new THREE.Quaternion(), qB = new THREE.Quaternion(), qC = new THREE.Quaternion(), eu = new THREE.Euler();
    function lodret(f, i, rx, rz) {   // what the hand holds stands upright, turned the way the person faces
      const h = f.elbows[i].userData.hold; if (!h) return;
      h.parent.updateWorldMatrix(true, false); h.parent.getWorldQuaternion(qA).invert(); f.root.getWorldQuaternion(qB);
      h.quaternion.copy(qA.multiply(qB).multiply(qC.setFromEuler(eu.set(rx, 0, rz))));
    }
    const lokal = (f, w) => { f.g.updateWorldMatrix(true, false); return f.g.worldToLocal(w); };
    function blik(f, w, ud) { lokal(f, w).sub(f.head.position); ud[0] = Math.atan2(w.x, w.z); ud[1] = -Math.atan2(w.y, Math.hypot(w.x, w.z)); return ud; }
    const BL = [0, 0], klem = (x, a) => Math.max(-a, Math.min(a, x));
    const lomme = (d, i, t) => { const s = i ? 1 : -1; grib(d.f, i, s * 0.165, 1.0 + Math.sin(t * 0.7 + d.p + i) * 0.01, 0.16); };
    let varNaer = false, hilsT = 99, snakT = 0, taler = 0;

    return (t, dt, pos) => {
      // Ida: tæt på og foran dem?
      const lx = (pos.x - e.x), lz = (pos.z - e.z), dI = Math.hypot(lx, lz);
      const naer = dI < 9;
      if (naer && !varNaer) hilsT = 0;
      varNaer = naer; hilsT += dt;
      ida.set(pos.x, g.position.y + 1.2, pos.z);
      // banneret blafrer, og de to ved stængerne løfter det lidt i hver sin takt
      for (let i = 0; i < kludPos.count; i++) kludPos.setZ(i, Math.sin(kludX[i] * 2.2 + t * 2.4) * 0.05 * (0.4 + Math.abs(kludX[i]) / 2));
      kludPos.needsUpdate = true;
      banner.position.y = 0.03 + Math.sin(t * 0.9) * 0.025 + Math.max(0, Math.sin(t * 0.31)) ** 6 * 0.12;
      banner.rotation.z = Math.sin(t * 0.63) * 0.02; banner.rotation.x = Math.sin(t * 0.8 + 1) * 0.025;
      banner.updateMatrixWorld(true);
      // de to, der snakker, skiftes til at tale
      snakT -= dt; if (snakT <= 0) { taler = 1 - taler; snakT = 3 + Math.random() * 4; }
      let k = 0;
      for (const d of folk) {
        const { f, rolle, p } = d, s = Math.sin(t * d.w + p), barnet = rolle === 'barn';
        // vægt, vejrtrækning og lidt kulde
        if (!barnet) { f.g.rotation.z = s * 0.022; f.g.position.x = s * 0.012; f.g.rotation.x = d.lean + Math.sin(t * 0.37 + p * 2) * 0.012; }
        else { f.g.rotation.z = s * 0.05; f.g.rotation.x = Math.sin(t * 1.3 + p) * 0.04; }
        f.g.scale.y = d.sc * (1 + Math.sin(t * d.aand + p) * 0.005);
        if (d.o.kold) f.g.position.y = Math.max(0, Math.sin(t * 7 + p)) * 0.025 * (Math.sin(t * 0.4 + p) > 0.2 ? 1 : 0);
        // opmærksomhed: de vender sig mod Ida én efter én
        d.att += ((naer && hilsT > d.i * 0.22 ? 1 : 0) - d.att) * (1 - Math.exp(-dt * 3));
        if (naer && hilsT > d.i * 0.22 + 0.5 && hilsT - dt <= d.i * 0.22 + 0.5 && (rolle === 'stang' || rolle === 'klap' || rolle === 'far' || rolle === 'snak')) d.nik = 0;
        // blikket: frem, på en nabo, på partneren eller rundt på pladsen
        d.next -= dt;
        if (d.next <= 0) {
          const r = Math.random(); d.next = 1.8 + Math.random() * 3.5; d.mal = null;
          if (d.partner && r < 0.75) d.mal = d.partner.f.head;
          else if (r < 0.45 || !d.naboer.length) { d.tY = (Math.random() - 0.5) * 0.7; d.tP = 0.02 + (Math.random() - 0.5) * 0.12; }
          else if (r < 0.8) d.mal = d.naboer[Math.floor(Math.random() * d.naboer.length)];
          else { d.tY = (Math.random() - 0.5) * 1.8; d.tP = -0.05; }
          if (barnet) { d.mal = null; d.tY = (Math.random() - 0.5) * 1.4; d.tP = -0.1 + Math.random() * 0.2; }
        }
        let tY = d.tY, tP = d.tP;
        if (d.mal) { blik(f, d.mal.getWorldPosition(tw), BL); tY = BL[0]; tP = BL[1]; }
        if (d.att > 0.01) { blik(f, tw.copy(ida), BL); if (Math.abs(BL[0]) < 1.7) { tY = lerp(tY, BL[0], d.att); tP = lerp(tP, BL[1], d.att); } }
        d.yaw += (klem(tY, 1.2) - d.yaw) * (1 - Math.exp(-dt * 4)); d.pitch += (klem(tP, 0.45) - d.pitch) * (1 - Math.exp(-dt * 4));
        if (rolle !== 'stang' && rolle !== 'far' && !barnet) f.root.rotation.y = d.ry + klem(d.yaw, 0.8) * 0.3 * d.att;
        d.nik += dt;
        let nik = d.nik < 1.1 ? Math.sin(d.nik * 11.4) * 0.13 * (1 - d.nik / 1.1) : 0;
        if (d.partner && taler !== snak.indexOf(d)) nik += Math.max(0, Math.sin(t * 2.6 + p)) ** 8 * 0.1;   // den, der lytter, nikker
        f.head.rotation.set(d.pitch + nik, d.yaw, Math.sin(t * 0.5 + p) * 0.04 + (d.partner ? 0.06 * Math.sign(d.yaw) : 0));
        // armene
        const hilser = d.att > 0.5 && hilsT < 6;
        if (rolle === 'stang') {
          const side = d.lx < 0 ? -1 : 1;
          for (let a = 0; a < 2; a++) {
            const hoej = (a === 1) === (side < 0);   // the inner hand holds higher
            lokal(f, banner.localToWorld(tw.set(side * 2.02, hoej ? 1.4 : 1.08, -0.02)));
            grib(f, a, tw.x, tw.y, tw.z);
          }
        } else if (rolle === 'klap') {
          const klapper = ((t * 0.11 + p / 6.3) % 1) < 0.4 || hilser, ab = klapper ? Math.abs(Math.sin(t * 8.5 + p)) : 0;
          const x = 0.052 + ab * 0.075, y = 1.2 + (klapper ? 0.05 : 0), gn = klapper ? 0 : Math.sin(t * 7) * 0.02;
          grib(f, 0, -x, y + gn, 0.3); grib(f, 1, x, y - gn, 0.3);
        } else if (rolle === 'skilt') {
          const h = d.o.hand, sd = h ? 1 : -1, pump = Math.max(0, Math.sin(t * 0.8 + p)) ** 3 * 0.2 + (hilser ? 0.12 + Math.sin(t * 6) * 0.06 : 0);
          grib(f, h, sd * 0.11, 1.2 + pump + Math.sin(t * 2.1 + p) * 0.015, 0.31);
          lomme(d, 1 - h, t); lodret(f, h, Math.sin(t * 1.3 + p) * 0.05, Math.sin(t * 0.9 + p) * 0.08 - sd * 0.05);
        } else if (rolle === 'termo') {
          const cy = (t * 0.1 + p / 6.3) % 1, drik = ramp(cy, 0.5, 0.58) * (1 - ramp(cy, 0.76, 0.84));
          grib(f, 1, lerp(0.07, 0.04, drik), lerp(1.2, 1.56, drik), lerp(0.3, 0.27, drik));
          f.head.rotation.x -= drik * 0.22;
          const gest = taler === 1 && !drik;
          if (gest) grib(f, 0, -0.2 + Math.sin(t * 2.3) * 0.08, 1.22 + Math.sin(t * 3.1 + 1) * 0.07, 0.3);
          else grib(f, 0, lerp(-0.035, -0.17, drik), lerp(1.18, 1.0, drik), lerp(0.3, 0.16, drik));
          lodret(f, 1, -drik * 1.1, 0);
        } else if (rolle === 'snak') {
          if (taler === 0) grib(f, 1, 0.2 + Math.sin(t * 2.3 + p) * 0.08, 1.22 + Math.sin(t * 3.1) * 0.07, 0.3); else lomme(d, 1, t);
          lomme(d, 0, t);
        } else if (rolle === 'vink' || barnet) {
          const vil = ((t * 0.08 + p / 6.3) % 1) < 0.25 || hilser;
          d.vink += ((vil ? 1 : 0) - d.vink) * (1 - Math.exp(-dt * 4));
          const sd = 1, w = d.vink;
          if (!barnet) lomme(d, 0, t);
          else { lokal(f, far.f.head.localToWorld(tw.set(-0.02, 0.17, 0.02))); grib(f, 0, tw.x, tw.y, tw.z); }   // den anden hånd på fars hue
          const hx = lerp(sd * 0.17, sd * 0.36 + Math.sin(t * 8 + p) * 0.08 * w, w), hy = lerp(1.0, 2.0, w), hz = lerp(0.16, 0.16, w);
          grib(f, 1, hx, hy, hz);
        } else if (rolle === 'far') {   // fars hænder holder barnets ben
          for (let a = 0; a < 2; a++) { lokal(f, barn.f.legs[a].knee.localToWorld(tw.set(0, -0.2, 0.02))); grib(f, a, tw.x, tw.y, tw.z); }
        }
        // ånde i kulden: et lille pust ud ad munden ved hver udånding
        const cyA = ((t * d.aand + p) / 6.283) % 1;
        for (let n = 0; n < 2; n++) {
          const kk = (cyA - n * 0.09) / 0.42;
          if (kk <= 0 || kk >= 1) { dFarve[k * 4 + 3] = 0; k++; continue; }
          f.head.localToWorld(tw.set(0, -0.075 - kk * 0.05, 0.17 + kk * 0.24));
          tw.y += kk * 0.06; putDamp(k++, tw, Math.sin(kk * Math.PI) * 0.22);
        }
      }
      // damp fra kruset
      const termo = folk.find(d => d.rolle === 'termo');
      for (let n = 0; n < 3; n++) {
        const kk = (t * 0.45 + n / 3) % 1;
        termo.f.elbows[1].userData.hold.localToWorld(tw.set(0, 0.09, 0.045)); tw.y += kk * 0.35; tw.x += Math.sin(t * 2 + n * 2) * 0.03 * kk;
        putDamp(k++, tw, Math.sin(kk * Math.PI) * 0.16);
      }
      dGeo.attributes.position.needsUpdate = true; dGeo.attributes.color.needsUpdate = true;
    };
  });

  // ---------------------------------------------------------------- 3. Julemanden og koret (Slotspladsen, ved Tårnet)
  // Julemanden står ved en gryde på et stativ og ringer med en messingklokke. Bag ham synger fire i vintertøj med åbne
  // nodehæfter »Glade jul« (Franz Gruber, 1818). De vugger i takt, munden åbner sig på hver tone, og ånden damper i kulden.
  // Melodien spiller stille, når Ida er tæt på og lyden er slået til. Når hun kommer helt hen, vinker julemanden.
  // Bygget med demonstranternes tøj og ansigter (afsnit 6), så den står efter dem i filen.
  const pelsBort = (pels) => (g, head, part, m, foran) => {   // the white fur edge down the front and round the hem of Santa's coat
    const pts = []; for (let k = 0; k <= 10; k++) { const y = 0.84 + 0.78 * k / 10; pts.push(new THREE.Vector3(0, y, foran(y) + 0.012)); }
    part(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 14, 0.032, 6), m(pels), g, 0, 0, 0, 0);
    ring(part, m, pels, g, foran(0.86) / ZF + 0.012, 0.038, 0.86, ZF, 6, 26);
  };
  const pelsAerme = (pels) => (sh, part, m, el) => { ring(part, m, pels, el, 0.062, 0.026, -0.24, 1, 6, 16); };
  const klokke = () => (sh, part, m, el) => {   // a brass hand bell with a wooden handle, hanging from the right hand
    const h = holdGruppe(el, 0.0);
    stk(new THREE.CylinderGeometry(0.016, 0.02, 0.12, 8), M.moerktTrae, h, 0, 0.02, 0.0, 1, 1, 1, false).userData.fri = true;
    const kl = stk(new THREE.CylinderGeometry(0.035, 0.085, 0.13, 16, 1, true), tm('#d9b25a'), h, 0, -0.1, 0.0, 1, 1, 1, false); kl.userData.fri = true; kl.material.side = THREE.DoubleSide;
    stk(G.kugle, tm('#8a6a2a'), h, 0, -0.17, 0.0, 0.024, 0.024, 0.024, false).userData.fri = true;
  };
  const hefte = (farve) => (g, head, part, m, foran) => {   // an open songbook held in front of the chest, tilted up to the eyes
    const b = new THREE.Group(); b.position.set(0, 1.2, foran(1.2) + 0.2); b.rotation.x = -0.75; g.add(b);
    for (const s of [-1, 1]) {
      const d = part(BG(0.15, 0.2, 0.012), m(farve), b, s * 0.073, 0, 0, 0); d.rotation.y = -s * 0.22;
      const p = part(BG(0.135, 0.185, 0.006), m('#f7f2e6'), b, s * 0.07, 0, 0.009, 0); p.rotation.y = -s * 0.22;
      for (let k = 0; k < 5; k++) { const l = part(BG(0.1, 0.004, 0.002), m('#3a3a40'), b, s * 0.07, 0.07 - k * 0.035, 0.013, 0); l.rotation.y = -s * 0.22; }
    }
  };
  // »Glade jul«: [halvtone over C4, ottendedele]. Melodien er fra 1818 og fri at bruge.
  const GLADE_JUL = (() => {
    const N = { C4: 0, D4: 2, E4: 4, F4: 5, G4: 7, A4: 9, B4: 11, C5: 12, D5: 14, E5: 16, F5: 17 };
    const linje = s => s.trim().split(/\s+/).map(x => { const [n, d] = x.split(':'); return [N[n], +d]; });
    const a = linje('G4:3 A4:1 G4:2 E4:6 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 B4:6 C5:4 C5:2 G4:6');
    const b = linje('A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6');
    const c = linje('D5:4 D5:2 F5:3 D5:1 B4:2 C5:6 E5:6 C5:2 G4:2 E4:2 G4:3 F4:1 D4:2 C4:10');
    return [...a, ...b, ...b, ...c, [null, 6]];
  })();
  scene(63, -50, Math.PI / 2, (g, e) => {
    const HV = '#f4f1ea';
    const julemand = demonstrant({ coat: '#b3262a', trousers: '#b3262a', skin: '#f0c9ab', hair: HV, bryn: '#e8e4da', hairStyle: 'kort', scale: 1.06, ben: -1,
      hue: [strikhue('#b3262a', HV, HV)], ansigt: [skaeg(HV), briller('#d9b25a'), kinder('#e98a80')],
      toej: [pelsBort(HV), baelte('#1a1412', '#d9b25a', 1.08)], vanter: ['#1a1412', HV], stoevle: ['#1a1412', HV],
      arm: [pelsAerme(HV), flere(pelsAerme(HV), klokke())], boej: [0.5, 1.1] });
    placer(julemand, g, 0, 0, 0);
    // gryden på et stativ
    const stativ = new THREE.Group(); stativ.position.set(0.85, 0, 0.35); g.add(stativ);
    for (let i = 0; i < 3; i++) { const a = i * 2.09, b = stk(G.cyl, M.jern, stativ, Math.sin(a) * 0.25, 0.55, Math.cos(a) * 0.25, 0.015, 1.15, 0.015, false); b.rotation.set(Math.cos(a) * 0.22, 0, -Math.sin(a) * 0.22); }
    // the kettle: a red pot with a gold rim and a handle, hanging from the top of the tripod on a short chain
    const gryde = new THREE.Group(); gryde.position.y = 0.66; gryde.userData.fri = true; stativ.add(gryde);
    const guld = tm('#d9b25a');
    stk(new THREE.CylinderGeometry(0.2, 0.16, 0.26, 18), M.roed, gryde, 0, 0, 0, 1, 1, 1).userData.fri = true;
    const rand = stk(TG(0.2, 0.018, 6, 22), guld, gryde, 0, 0.13, 0, 1, 1, 1, false); rand.rotation.x = Math.PI / 2; rand.userData.fri = true;
    const hank = stk(TG(0.2, 0.01, 5, 18, Math.PI), M.jern, gryde, 0, 0.13, 0, 1, 1, 1, false); hank.userData.fri = true;
    stk(G.cyl, M.jern, gryde, 0, 0.36, 0, 0.008, 0.26, 0.008, false).userData.fri = true;
    stk(new THREE.BoxGeometry(0.16, 0.012, 0.03), M.kul, gryde, 0, 0.135, 0, 1, 1, 1, false).userData.fri = true;   // the slot for coins
    colCirc(...e.ver(0.85, 0.35), 0.35, 1.2);
    // koret: fire i en lille bue bag ham
    const kor = [
      [-1.25, -0.75, 0.25, { coat: '#24303a', trousers: '#2b2a30', skin: '#f2c6a4', hair: '#3b2a20', hairStyle: 'kort', scale: 1.04, ben: 1, hue: [pelshue('#3a2a20', '#d9cdb6')], ansigt: [skaeg('#3b2a20', false)], toej: [knapper('#c9c4b8', [0.95, 1.1, 1.25, 1.4]), halstoerklaede('#c0392b', HV), hefte('#7a1f24')], vanter: ['#3a2a20'], stoevle: ['#2a1d14'] }],
      [-0.42, -1.15, 0.08, { coat: '#4a3a5a', trousers: '#2b2a30', skin: '#e9bd99', hair: '#a8794c', kvinde: true, long: true, hairStyle: 'bob', scale: 0.96, ben: -1, hue: [strikhue('#e0a63a', '#e0a63a', HV, '#b3262a')], toej: [knapper('#e0a63a', [0.9, 1.05, 1.2, 1.35]), halstoerklaede('#e0a63a', '#4a3a5a'), hefte('#1f2a44')], vanter: [HV, '#e0a63a'], stoevle: ['#3a2a20', '#e8dcc6'] }],
      [0.42, -1.15, -0.08, { coat: '#2f3a2f', trousers: '#2b2a30', skin: '#7d4f36', hair: '#1f1a18', kvinde: true, long: true, hairStyle: 'lang', scale: 0.98, ben: 1, hue: [oerevarmere('#f1e6d6')], toej: [baelte('#1e261e', '#d9b25a', 1.1), halstoerklaede(HV, '#2f3a2f'), hefte('#2f5fa8')], vanter: ['#b3262a', HV], stoevle: ['#1f1b1a', '#e8dcc6'] }],
      [1.25, -0.75, -0.25, { coat: '#5a3a24', trousers: '#24303a', skin: '#f4d2b8', hair: '#d8d4ca', hairStyle: 'skaldet', bryn: '#bdb8ae', scale: 1.0, ben: -1, hue: [strikhue('#2f5fa8', '#2f5fa8', HV, HV)], ansigt: [briller('#5a4a3a'), skaeg('#e4e0d6')], toej: [lommer('#4a3020', 1.0), halstoerklaede('#3e7d4a', HV), hefte('#3e2a1a')], vanter: ['#3e7d4a'], stoevle: ['#2a1d14'] }],
    ].map(([lx, lz, ry, o], i) => {
      const f = placer(demonstrant(Object.assign(o, { boej: [1.55, 1.55] })), g, lx, lz, ry);
      const mund = new THREE.Mesh(SG(0.026, 10, 8), tm('#5a2320')); mund.userData.fri = true; mund.position.set(0, -0.076, 0.13); mund.scale.set(1, 0.25, 0.5); f.head.add(mund);
      return { f, i, lx, lz, ry, o, mund, p: Math.random() * 6.3, sc: f.g.scale.y };
    });
    colCirc(...e.ver(0, -0.9), 1.7, 2.0);
    // ånden: én sky pr. sanger, og den stiger på hver tone
    const N = kor.length, dPos = new Float32Array(N * 3), dFarve = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) dFarve.set([0.93, 0.95, 0.98, 0], i * 4);
    const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3)); dGeo.setAttribute('color', new THREE.BufferAttribute(dFarve, 4));
    const damp = new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.24, map: TX.glow, transparent: true, depthWrite: false, vertexColors: true }));
    damp.frustumCulled = false; damp.userData.fri = true; g.add(damp);
    const va = new THREE.Vector3(), vb = new THREE.Vector3(), tw = new THREE.Vector3();
    function grib(f, i, x, y, z) {   // the shoulder turns so the hand (with its fixed elbow bend) reaches a point in the person's own frame
      const sh = f.arms[i], phi = -f.elbows[i].rotation.x, A = 0.3, B = 0.3;
      vb.set(0, -A - B * Math.cos(phi), B * Math.sin(phi)).normalize();
      sh.quaternion.setFromUnitVectors(vb, va.set(x, y, z).sub(sh.position).normalize());
    }
    const qA = new THREE.Quaternion(), qB = new THREE.Quaternion();
    function lodret(f, i) { const h = f.elbows[i].userData.hold; if (!h) return; h.parent.updateWorldMatrix(true, false); h.parent.getWorldQuaternion(qA).invert(); f.root.getWorldQuaternion(qB); h.quaternion.copy(qA.multiply(qB)); }
    // melodien
    const BEAT = 0.3, takt = GLADE_JUL.reduce((s, [, d]) => s + d, 0) * BEAT;
    let node = 0, nodeT = 0, aaben = 0, ringT = 0, vinkT = 9, varNaer = false;
    const hz = n => 261.63 * Math.pow(2, n / 12);
    return (t, dt, pos) => {
      const dI = Math.hypot(pos.x - e.x, pos.z - e.z), naer = dI < 7;
      if (naer && !varNaer) vinkT = 0; varNaer = naer; vinkT += dt;
      // the song: the next note when its time has come; louder the closer Ida is
      nodeT -= dt;
      if (nodeT <= 0) {
        const [n, d] = GLADE_JUL[node]; node = (node + 1) % GLADE_JUL.length; nodeT += d * BEAT; if (nodeT < 0) nodeT = d * BEAT;
        if (n !== null) {
          aaben = 1;
          const vol = Math.max(0, 1 - dI / 26) ** 1.5;
          if (vol > 0.02 && H.tone) { const f0 = hz(n), dur = d * BEAT * 0.92; H.tone(f0, f0 * 1.002, 0, dur, 0.05 * vol, 'triangle'); H.tone(f0 / 2, f0 / 2, 0, dur, 0.025 * vol, 'sine'); }
        }
      }
      aaben = Math.max(0, aaben - dt * 2.2);
      const sving = Math.sin(t * Math.PI / (BEAT * 3));   // one sway for every bar (6/8)
      kor.forEach((d, i) => {
        const { f, p } = d;
        f.g.rotation.z = sving * 0.045; f.g.position.x = sving * 0.015;
        f.g.scale.y = d.sc * (1 + Math.sin(t * 1.6 + p) * 0.004);
        f.head.rotation.set(-0.18 + Math.sin(t * 0.7 + p) * 0.03 + aaben * 0.05, Math.sin(t * 0.3 + p) * 0.08, sving * 0.06);
        d.mund.scale.set(1 - aaben * 0.25, 0.22 + aaben * 0.75, 0.5);
        const s = d.o.scale || 1, by = 1.2, bz = 0.32;
        grib(f, 0, -0.12, by - 0.02, bz); grib(f, 1, 0.12, by - 0.02, bz);
        // the breath rises from the mouth on each note
        const k = i, a = aaben * 0.45;
        f.head.getWorldPosition(tw); tw.y += -0.05 * s; const fw = vb.set(Math.sin(f.root.rotation.y + g.rotation.y), 0, Math.cos(f.root.rotation.y + g.rotation.y));
        tw.addScaledVector(fw, 0.22 + (1 - aaben) * 0.25); tw.y += (1 - aaben) * 0.15; g.worldToLocal(tw);
        dPos.set([tw.x, tw.y, tw.z], k * 3); dFarve[k * 4 + 3] = a;
      });
      dGeo.attributes.position.needsUpdate = true; dGeo.attributes.color.needsUpdate = true;
      // Santa: rings the bell two beats in three, and waves when Ida comes close
      const jf = julemand;
      jf.g.rotation.z = sving * 0.025; jf.g.scale.y = 1.06 * (1 + Math.sin(t * 1.3) * 0.005);
      if (vinkT < 3.2) {
        const v = Math.sin(vinkT * 9); grib(jf, 0, -0.45, 1.95 + v * 0.03, 0.15 + v * 0.06);
        const ry = e.g.rotation.y, dx = pos.x - e.x, dz = pos.z - e.z, lx = dx * Math.cos(ry) - dz * Math.sin(ry), lz = dx * Math.sin(ry) + dz * Math.cos(ry);
        jf.head.rotation.set(0.05, Math.max(-1, Math.min(1, Math.atan2(lx, lz))), 0.08 * v);
      } else { grib(jf, 0, -0.2, 1.0, 0.12); jf.head.rotation.set(-0.05, Math.sin(t * 0.4) * 0.25, sving * 0.05); }
      const ring_ = Math.sin(t * 7.5);
      grib(jf, 1, 0.34, 1.12 + ring_ * 0.1, 0.32); lodret(jf, 1);
      jf.elbows[1].userData.hold && (jf.elbows[1].userData.hold.rotation.z += ring_ * 0.35);
      ringT -= dt;
      if (ringT <= 0) { ringT = BEAT * 2; const vol = Math.max(0, 1 - dI / 20) ** 2; if (vol > 0.02 && H.tone) H.tone(2093, 2080, 0, 0.35, 0.02 * vol, 'sine'); }
      gryde.rotation.y = Math.sin(t * 0.8) * 0.2;
    };
  });

  // ---------------------------------------------------------------- 9. Skøjtebanen på Højbro Plads
  // En lille skøjtebane med hvid bande, et rødt håndlistebånd og lyskæder mellem fire lygtepæle. Fem løber rundt mod uret:
  // to med hænderne på ryggen, en far med sin datter i hånden, og en nybegynder, der vakler langs banden med armene ude.
  // I midten står en pige, der en gang imellem laver en piruet. Skøjterne skraber på isen, når Ida er tæt på.
  // Banden er lukket, så Ida kan stå ved den og kigge, men ikke gå ud på isen.
  scene(-5, -227, 0, (g, e) => {
    const HV = '#f4f1ea', A = 7, B = 5, R = 2.2;   // the rink: half length, half width and corner radius
    const form = new THREE.Shape();
    form.moveTo(-A + R, -B); form.lineTo(A - R, -B); form.quadraticCurveTo(A, -B, A, -B + R); form.lineTo(A, B - R); form.quadraticCurveTo(A, B, A - R, B);
    form.lineTo(-A + R, B); form.quadraticCurveTo(-A, B, -A, B - R); form.lineTo(-A, -B + R); form.quadraticCurveTo(-A, -B, -A + R, -B);
    const isMat = new THREE.MeshStandardMaterial({ color: '#d7e8f0', roughness: 0.08, metalness: 0.25 }); isMat.userData.sne = true;
    const is = new THREE.Mesh(new THREE.ShapeGeometry(form, 12), isMat); is.rotation.x = -Math.PI / 2; is.position.y = 0.035; is.receiveShadow = true; is.userData.fri = true; g.add(is);
    // the board round the edge: short white planks with a red rail, and the posts for the lights at the corners
    const kant = form.getSpacedPoints(64);
    for (let i = 0; i < kant.length - 1; i++) {
      const p0 = kant[i], p1 = kant[i + 1], mx = (p0.x + p1.x) / 2, mz = -(p0.y + p1.y) / 2, L = Math.hypot(p1.x - p0.x, p1.y - p0.y), ry = Math.atan2(p1.x - p0.x, -(p1.y - p0.y)) + Math.PI / 2;
      const b = stk(G.kasse, M.hvid, g, mx, 0.5, mz, 0.08, 1.0, L + 0.04); b.rotation.y = ry - Math.PI / 2;
      const r = stk(G.kasse, M.roed, g, mx, 1.03, mz, 0.16, 0.07, L + 0.04); r.rotation.y = ry - Math.PI / 2;
      if (i % 2 === 0) colCirc(...e.ver(mx, mz), 0.45, 1.1);
    }
    const pael = [[-A - 0.6, -B - 0.6], [A + 0.6, -B - 0.6], [A + 0.6, B + 0.6], [-A - 0.6, B + 0.6]];
    for (const [x, z] of pael) { stk(G.cyl, M.jern, g, x, 1.8, z, 0.05, 3.6, 0.05); stk(G.kugle, M.jern, g, x, 3.62, z, 0.08, 0.08, 0.08); colCirc(...e.ver(x, z), 0.2, 3.6); }
    // lyskæderne hænger i en bue mellem pælene
    const lys = [];
    for (let k = 0; k < 4; k++) { const [x0, z0] = pael[k], [x1, z1] = pael[(k + 1) % 4]; for (let i = 1; i < 14; i++) { const u = i / 14; lys.push([x0 + (x1 - x0) * u, 3.5 - Math.sin(u * Math.PI) * 0.9, z0 + (z1 - z0) * u]); } }
    const lp = new Float32Array(lys.length * 3), lc = new Float32Array(lys.length * 3), FARVER = [[1, 0.82, 0.48], [1, 0.42, 0.37], [0.56, 0.85, 1], [0.65, 0.91, 0.56]];
    lys.forEach((p, i) => { lp.set(p, i * 3); lc.set(FARVER[i % 4], i * 3); });
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3)); lg.setAttribute('color', new THREE.BufferAttribute(lc, 3));
    const lyskaede = new THREE.Points(lg, new THREE.PointsMaterial({ size: 0.45, map: TX.glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    lyskaede.userData.fri = true; g.add(lyskaede);
    // skøjter: en hvid eller sort støvle og en blank klinge, på skinnebenet
    const skoejte = (farve) => (f, P) => { for (const l of f.legs) { P.part(new THREE.CylinderGeometry(0.072, 0.07, 0.2, 12), P.m(farve), l.knee, 0, -0.35, 0.006); P.part(BG(0.1, 0.07, 0.26), P.m(farve), l.knee, 0, -0.43, 0.05); P.part(BG(0.012, 0.05, 0.36), P.m('#c9ced4'), l.knee, 0, -0.49, 0.05); } };
    const loeber = (o, arme) => demonstrant(Object.assign({ grupper: f => [f.g, ...f.hips], boej: arme.boej }, o, {
      foer2: (f, P) => { skoejte(o.skoejte || '#f4f1ea')(f, P); f.g.rotation.x = 0.22; for (const [k, a] of f.arms.entries()) { a.rotation.x = arme.x[k]; a.rotation.z = arme.z[k]; } for (const l of f.legs) l.knee.rotation.x = 0.3; } }));
    const RYG = { x: [0.55, 0.55], z: [-0.15, 0.15], boej: [1.3, 1.3] }, UD = { x: [-0.1, -0.1], z: [-1.2, 1.2], boej: [0.25, 0.25] };
    const folk = [
      { o: { coat: '#2f3a4a', trousers: '#24303a', skin: '#f0c9ab', hair: '#d8d4ca', hairStyle: 'skaldet', scale: 1.02, hue: [strikhue('#b3262a', '#b3262a', HV, HV)], ansigt: [skaeg('#e4e0d6'), kinder()], toej: [halstoerklaede('#b3262a', HV), knapper('#c9c4b8', [0.95, 1.1, 1.25, 1.4])], vanter: ['#3a2a20'], skoejte: '#1a1412' }, arme: RYG, a: 5.2, b: 3.3, v: 1.9, th: 0 },
      { o: { coat: '#c0392b', trousers: '#2b2a30', skin: '#f4d2b8', hair: '#b4612f', kvinde: true, long: true, hairStyle: 'lang', scale: 0.97, hue: [oerevarmere(HV)], toej: [halstoerklaede(HV, '#c0392b'), baelte('#6a1a1e', '#d9b25a', 1.1)], vanter: [HV] }, arme: RYG, a: 5.2, b: 3.3, v: 2.3, th: 2.6 },
      { o: { coat: '#2f5f3a', trousers: '#2b2f36', skin: '#c98d62', hair: '#2b2420', hairStyle: 'kort', scale: 1.04, dyneaerme: true, hue: [strikhue('#e0a63a', '#e0a63a', HV, '#2f5f3a')], toej: [dyne('#2f5f3a', [0.95, 1.1, 1.25, 1.4]), lynlaas('#1e3a24', 0.9, 1.6, 0.024)], vanter: ['#e0a63a'], skoejte: '#1a1412' }, arme: { x: [0, 0], z: [-0.12, 0.55], boej: [0.35, 0.2] }, a: 4.2, b: 2.4, v: 1.3, th: 4.2, par: 0 },
      { o: { coat: '#e0a63a', trousers: '#2f5fa8', skin: '#c98d62', hair: '#2b2420', barn: true, kvinde: true, hairStyle: 'hestehale', dyneaerme: true, hue: [strikhue('#b3262a', HV, HV, HV)], toej: [dyne('#e0a63a', [0.98, 1.12, 1.26, 1.4])], vanter: ['#b3262a'] }, arme: { x: [-0.1, 0], z: [-1.0, 0.12], boej: [0.2, 0.3] }, a: 4.2, b: 2.4, v: 1.3, th: 4.2, par: 1 },
      { o: { coat: '#4a5a6a', trousers: '#2d3340', skin: '#f2c6a4', hair: '#6b4a2f', hairStyle: 'kort', scale: 1.0, hue: [pelshue('#3a2a20', '#d9cdb6')], ansigt: [briller('#5a4a3a')], toej: [halstoerklaede('#3e7d4a', HV), lommer('#3a4a58', 1.0)], vanter: ['#3e7d4a'], skoejte: '#1a1412' }, arme: UD, a: 6.1, b: 4.1, v: 0.55, th: 1.2, ny: true },
      { o: { coat: '#7a3f8f', trousers: '#2b2a30', skin: '#f4d2b8', hair: '#e8c98a', barn: true, kvinde: true, hairStyle: 'knold', dyneaerme: true, hue: [strikhue(HV, HV, '#7a3f8f', '#7a3f8f')], toej: [dyne('#7a3f8f', [0.98, 1.12, 1.26, 1.4])], vanter: [HV] }, arme: { x: [-0.2, -0.2], z: [-0.9, 0.9], boej: [0.3, 0.3] }, a: 0.9, b: 0.6, v: 0.5, th: 0, piruet: true },
    ].slice(0, GFX.lav ? 5 : 6);
    for (const d of folk) { d.f = placer(loeber(d.o, d.arme), g, 0, 0, 0); d.f.g.position.y = -0.03; d.fase = Math.random() * 6.3; d.skr = 0; }
    let piruetT = 0;
    return (t, dt, pos) => {
      const dI = Math.hypot(pos.x - e.x, pos.z - e.z), vol = H.sus ? Math.max(0, 1 - dI / 22) ** 1.5 : 0;
      piruetT = (piruetT + dt) % 14;
      for (const d of folk) {
        const f = d.f;
        if (d.piruet) {   // stands still, then spins for two and a half seconds with the arms pulled in
          const spin = piruetT > 10 && piruetT < 12.5, k = spin ? Math.sin((piruetT - 10) / 2.5 * Math.PI) : 0;
          d.rot = (d.rot || 0) + dt * k * 14; f.root.position.set(Math.cos(t * 0.25) * d.a, 0, Math.sin(t * 0.25) * d.b); f.root.rotation.y = d.rot + t * 0.25;
          f.arms[0] && (f.arms[0].rotation.z = -0.9 + k * 0.8); f.arms[1] && (f.arms[1].rotation.z = 0.9 - k * 0.8);
          f.g.rotation.x = 0.05; f.hips[0].rotation.x = -k * 0.6; f.hips[1].rotation.x = 0;
          if (spin && !d.lyd && vol > 0.03) { d.lyd = true; H.sus(2.5, 0.025 * vol, 3400, 1.5, 2600); } if (!spin) d.lyd = false;
          continue;
        }
        // round the rink against the clock; the speed rises and falls with each stroke
        const fase = t * (d.ny ? 1.4 : 2.6) * (d.v / 2) + d.fase, slag = Math.sin(fase);
        d.th += dt * d.v * (1 + slag * 0.12) / Math.hypot(d.a * Math.sin(d.th), d.b * Math.cos(d.th));
        const x = Math.cos(d.th) * d.a, z = -Math.sin(d.th) * d.b, tx = -Math.sin(d.th) * d.a, tz = -Math.cos(d.th) * d.b;
        const sideX = -tz / Math.hypot(tx, tz), sideZ = tx / Math.hypot(tx, tz), side = d.par === 1 ? 0.75 : d.par === 0 ? -0.0 : 0;
        f.root.position.set(x + sideX * side, 0, z + sideZ * side); f.root.rotation.y = Math.atan2(tx, tz);
        // the push: one leg goes out and back while the body leans over the other
        const v = Math.max(0, slag), h = Math.max(0, -slag);
        f.hips[0].rotation.set(0.35 * v, 0, -0.03 - 0.32 * v); f.hips[1].rotation.set(0.35 * h, 0, 0.03 + 0.32 * h);
        f.g.rotation.z = slag * (d.ny ? 0.05 : 0.11); f.g.rotation.x = d.ny ? 0.08 + Math.sin(t * 3.1 + d.fase) * 0.08 : 0.22;
        f.g.position.y = -0.03 - (d.ny ? 0 : 0.03 * (1 - Math.abs(slag)));
        if (d.ny) { f.g.rotation.z += Math.sin(t * 4.3 + d.fase) * 0.06; }   // the beginner wobbles
        // a scrape for each stroke
        const s_ = slag > 0 ? 1 : -1;
        if (s_ !== d.skr) { d.skr = s_; if (vol > 0.03) H.sus(d.ny ? 0.2 : 0.38, (d.ny ? 0.008 : 0.016) * vol, 2400, 1.1, 1500); }
      }
      lyskaede.material.opacity = 0.85 + Math.sin(t * 1.7) * 0.1;
    };
  });

  // ---------------------------------------------------------------- 7. Cyklister i Tøjhusgade
  // Den lange, lige gade fra porten ved Rigsdagsgården mod broen over Frederiksholms Kanal. Nogle cyklister kører frem
  // og tilbage i højre side af vejen, hver i sin jakke og hue. En har lygte på, en har et juletræ på bagagebæreren, en
  // har pakker. De kommer ind gennem porten i den ene ende eller over broen i den anden, og når de er kørt ud af
  // gaden, venter de lidt og kommer tilbage den anden vej. Står Ida i vejen, svinger de udenom eller bremser og venter.
  // Ida kan ikke støde ind i dem (ingen kollision), og de kører aldrig igennem hende.
  {
    const A = [-3, 114], B = [-134, 198];                 // gadens midterlinje (OpenStreetMap: Tøjhusgade)
    const L = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / L, uz = (B[1] - A[1]) / L;
    const hx = -uz, hz = ux;                              // højre side, når man kører fra A mod B
    const S0 = -16, S1 = L + 46, BANE = 2.5;              // fra lige inden for porten til over broen; 2,5 m fra midten
    const hojde = []; for (let s = S0 - 2; s <= S1 + 2; s++) hojde.push(groundAt(A[0] + ux * s, A[1] + uz * s, 1.5));
    const hAt = s => { const k = Math.max(0, Math.min(hojde.length - 1.001, s - S0 + 2)), i = Math.floor(k); return lerp(hojde[i], hojde[i + 1], k - i); };
    const g = new THREE.Group(); gruppe.add(g);
    const renMat = c => { const m = tm(c).clone(); m.onBeforeCompile = () => {}; m.userData.sne = true; return m; };   // cykler uden sne på
    const CM = { daek: renMat('#26282c'), sort: renMat('#1d1e22'), staal: renMat('#a9adb3'), lygte: renMat('#f2ecd0') };
    const FARVE_M = renMat('#ffffff'); FARVE_M.vertexColors = true;
    function samlFarver(grp) {   // hele stellet med bagagen bliver ét mesh med farverne i hjørnerne: ét kald at tegne pr. cykel
      grp.updateMatrixWorld(true); const inv = new THREE.Matrix4().copy(grp.matrixWorld).invert(), dele = [];
      grp.traverse(m => { if (m.isMesh) dele.push(m); });
      const geos = dele.map(m => { const g2 = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone(); g2.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld)); if (g2.attributes.color) return g2;   // allerede samlet (et stel)
        const c = m.material.color, n = g2.attributes.position.count, col = new Float32Array(n * 3); for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3); g2.setAttribute('color', new THREE.BufferAttribute(col, 3)); return g2; });
      for (const m of dele) m.parent.remove(m);
      let n = 0; for (const d of geos) n += d.attributes.position.count;
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3); let i = 0;
      for (const d of geos) { pos.set(d.attributes.position.array, i * 3); nor.set(d.attributes.normal.array, i * 3); col.set(d.attributes.color.array, i * 3); i += d.attributes.position.count; d.dispose(); }
      const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); bg.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); bg.setAttribute('color', new THREE.BufferAttribute(col, 3)); bg.computeBoundingSphere();
      for (const c of [...grp.children]) grp.remove(c);
      const mm = new THREE.Mesh(bg, FARVE_M); mm.castShadow = skygge; grp.add(mm);
    }
    const Y = new THREE.Vector3(0, 1, 0), va = new THREE.Vector3(), vb = new THREE.Vector3();
    const ror = (mat, parent, a, b, r) => {   // et rør fra a til b ([x, y, z])
      va.set(...a); vb.set(...b); const l = va.distanceTo(vb), m = new THREE.Mesh(G.cyl, mat);
      m.position.copy(va).add(vb).multiplyScalar(0.5); m.scale.set(r, l, r); m.quaternion.setFromUnitVectors(Y, vb.sub(va).normalize());
      m.castShadow = skygge; parent.add(m); return m;
    };
    const R_ = 0.33, AKSEL = 0.355, BB = [0.3, -0.04], KRANK = 0.16;   // hjulradius, akselhøjde, krankboks (y, z), krank
    const hjulGeo = new THREE.TorusGeometry(R_, 0.028, 5, lav ? 14 : 18), egerGeo = new THREE.BoxGeometry(0.012, R_ * 2, 0.012);
    function cykel(farve, o = {}) {
      const c = new THREE.Group(), ramme = new THREE.Group(); c.add(ramme);
      const F = renMat(farve), P = (y, z, x = 0) => [x, y, z];
      const bag = P(AKSEL, -0.52), for_ = P(AKSEL, 0.52), bb = P(BB[0], BB[1]), sadelR = P(0.8, -0.2), hovedT = P(0.82, 0.36), hovedB = P(0.6, 0.41);
      ror(F, ramme, bb, sadelR, 0.02); ror(F, ramme, bb, hovedB, 0.022); ror(F, ramme, hovedB, hovedT, 0.024);
      if (o.dame) ror(F, ramme, P(0.42, -0.02), P(0.7, 0.38), 0.018); else ror(F, ramme, P(0.76, -0.19), P(0.78, 0.37), 0.019);
      for (const s of [-1, 1]) { ror(F, ramme, P(BB[0], BB[1], s * 0.03), P(AKSEL, -0.52, s * 0.06), 0.013); ror(F, ramme, P(0.78, -0.2, s * 0.02), P(AKSEL, -0.52, s * 0.06), 0.012); ror(F, ramme, P(0.6, 0.41, s * 0.03), P(AKSEL, 0.52, s * 0.05), 0.014); }
      ror(CM.staal, ramme, P(0.8, -0.2), P(0.88, -0.215), 0.014);                               // sadelpind
      stk(G.kasse, CM.sort, ramme, 0, 0.9, -0.22, 0.11, 0.05, 0.24);                            // sadlen
      ror(CM.staal, ramme, hovedT, P(1.02, 0.29), 0.014);                                        // frempind
      ror(CM.staal, ramme, P(1.03, 0.28, -0.27), P(1.03, 0.28, 0.27), 0.012);                    // styret
      for (const s of [-1, 1]) ror(CM.sort, ramme, P(1.03, 0.28, s * 0.2), P(1.03, 0.28, s * 0.3), 0.02);   // håndtag
      // bagagebærer og skærme
      stk(G.kasse, CM.staal, ramme, 0, 0.72, -0.5, 0.13, 0.015, 0.36);
      for (const s of [-1, 1]) ror(CM.staal, ramme, P(0.72, -0.66, s * 0.06), P(AKSEL, -0.52, s * 0.06), 0.008);
      for (const [z0, y0] of [[-0.52, AKSEL], [0.52, AKSEL]]) { const sk = new THREE.Mesh(new THREE.TorusGeometry(R_ + 0.05, 0.03, 3, 8, Math.PI * 0.75), F); sk.position.set(0, y0, z0); sk.rotation.y = Math.PI / 2; sk.rotation.z = z0 < 0 ? Math.PI * 0.2 : Math.PI * 0.05; sk.scale.z = 0.7; ramme.add(sk); }
      if (o.lygte) { stk(G.cyl, CM.lygte, ramme, 0, 0.83, 0.43, 0.04, 0.07, 0.04).rotation.x = Math.PI / 2; }
      if (o.kurv) { stk(G.kasse, renMat('#8a5a33'), ramme, 0, 0.82, 0.56, 0.32, 0.2, 0.26); }
      if (o.trae) {   // et lille juletræ på tværs af bagagebæreren, toppen bagud, med en rød snor om
        const t = new THREE.Group(); t.position.set(0, 0.86, -0.4); ramme.add(t);
        const gr = renMat('#1f5a37');
        for (let i = 0; i < 3; i++) { const k = new THREE.Mesh(G.kegle, gr); k.position.set(0, 0, -0.12 - i * 0.22); k.rotation.x = -Math.PI / 2; k.scale.set(0.2 - i * 0.04, 0.42, 0.2 - i * 0.04); k.castShadow = skygge; t.add(k); }
        ror(renMat('#4a3323'), t, [0, 0, 0.2], [0, 0, -0.05], 0.03);
        const snor = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.012, 4, 10), renMat('#b3262a')); snor.position.set(0, -0.02, -0.1); t.add(snor);
      }
      if (o.pakker) {
        stk(G.kasse, renMat('#b3262a'), ramme, 0, 0.82, -0.47, 0.26, 0.18, 0.3);
        stk(G.kasse, renMat('#2f6a45'), ramme, 0.02, 0.97, -0.5, 0.18, 0.13, 0.2).rotation.y = 0.3;
        const baand = renMat('#e8c25a'); stk(G.kasse, baand, ramme, 0, 0.82, -0.47, 0.27, 0.19, 0.03); stk(G.kasse, baand, ramme, 0, 0.82, -0.47, 0.03, 0.19, 0.31);
      }
      samlFarver(ramme);
      // hjulene (dæk og to eger, et mesh pr. hjul) og pedalerne drejer
      const hjul = [-0.52, 0.52].map(z0 => {
        const h = new THREE.Group(); h.position.set(0, AKSEL, z0); c.add(h);
        const d = new THREE.Mesh(hjulGeo, CM.daek); d.rotation.y = Math.PI / 2; h.add(d);
        for (const a of [0, Math.PI / 2]) { const e = new THREE.Mesh(egerGeo, CM.daek); e.rotation.x = a; h.add(e); }
        saml(h); h.children.forEach(m => { m.castShadow = skygge; }); return h;
      });
      const krank = new THREE.Group(); krank.position.set(0, BB[0], BB[1]); c.add(krank);
      for (const s of [-1, 1]) {
        stk(G.kasse, CM.sort, krank, s * 0.09, s * KRANK / 2, 0, 0.02, KRANK, 0.025);
        stk(G.kasse, CM.sort, krank, s * 0.13, s * KRANK, 0, 0.09, 0.02, 0.06);
      }
      stk(G.cyl, CM.sort, krank, 0.06, 0, 0, 0.09, 0.012, 0.09).rotation.z = Math.PI / 2;   // klingen
      saml(krank);
      let glod = null;
      if (o.lygte) { glod = new THREE.Sprite(glodMat('#fff1b8', 0.85)); glod.position.set(0, 0.83, 0.52); glod.scale.setScalar(0.55); c.add(glod); }
      return { c, hjul, krank, glod };
    }
    // rytteren: hofterne lige over sadlen, lænet lidt frem, hænderne på styret
    const LAEN = 0.3, HOFTE = [0.92, -0.22], STYR = [1.03, 0.27];
    const rodY = HOFTE[0] - 0.86 * Math.cos(LAEN), rodZ = HOFTE[1] - 0.86 * Math.sin(LAEN);
    const skulder = [rodY + 1.53 * Math.cos(LAEN), rodZ + 1.53 * Math.sin(LAEN)];
    const ARM = -Math.atan2(STYR[1] - skulder[1], skulder[0] - STYR[0]) - LAEN;
    function rytter(o) {
      const f = demonstrant(Object.assign({ gang: true }, o, { grupper: f2 => [f2.g, f2.head, ...f2.hips, ...f2.legs.map(l => l.knee)], boej: [0.08, 0.08],   // armene står stille og bages ind i kroppen (færre ting at tegne)
        foer2: f2 => { f2.g.rotation.x = LAEN; for (const [k, a] of f2.arms.entries()) { a.rotation.x = ARM; a.rotation.z = (k ? 1 : -1) * 0.03; } for (const l of f2.legs) l.hip.rotation.z = 0; } }));
      f.root.position.set(0, rodY, rodZ); return f;
    }
    // benene følger pedalerne: to led (lår og skinneben, 0,42 m hver)
    const L1 = 0.42, L2 = 0.43, cl = Math.cos(LAEN), sl = Math.sin(LAEN);
    function ben(leg, phi) {
      const py = BB[0] + Math.cos(phi) * KRANK - rodY, pz = BB[1] + Math.sin(phi) * KRANK - rodZ;   // pedalen i forhold til figurens fødder
      let dy = py * cl + pz * sl - 0.86, dz = -py * sl + pz * cl;                                    // ind i den lænede krop, fra hoften
      let D = Math.hypot(dy, dz); const Dm = L1 + L2 - 0.01; if (D > Dm) { dy *= Dm / D; dz *= Dm / D; D = Dm; }
      const a = Math.atan2(-dz, -dy), b = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + D * D - L2 * L2) / (2 * L1 * D))));
      const th = a - b, ky = -L1 * Math.cos(th), kz = -L1 * Math.sin(th);
      leg.hip.rotation.x = th; leg.knee.rotation.x = Math.atan2(-(dz - kz), -(dy - ky)) - th;
    }
    const FOLK = [
      { cyk: ['#2f5fa8', { lygte: true }], o: { coat: '#2f5f3a', trousers: '#2b2f36', skin: '#e9bd99', hair: '#3b2a20', hairStyle: 'kort', dyneaerme: true, hue: [strikhue('#b3262a', '#b3262a', '#f4f1ea', '#f4f1ea')], ansigt: [skaeg('#3b2a20', false)], toej: [dyne('#2f5f3a', [0.95, 1.08, 1.21, 1.34]), lynlaas('#1e3a24', 0.9, 1.6, 0.024), halstoerklaede('#e0a63a', '#2f5f3a')], vanter: ['#2b2f36'], stoevle: ['#2a1d14'] }, v: 4.2, s: 40, dir: 1 },
      { cyk: ['#e6dcc4', { dame: true, trae: true }], o: { coat: '#b3262a', trousers: '#24303a', skin: '#f4d2b8', hair: '#a8794c', kvinde: true, long: true, hairStyle: 'lang', hue: [oerevarmere('#eef0ee')], toej: [knapper('#e8dcc6', [0.9, 1.05, 1.2, 1.35]), baelte('#6a1a1e', '#d9b25a', 1.1), halstoerklaede('#eef0ee', '#b3262a')], vanter: ['#eef0ee', '#b3262a'], stoevle: ['#1f1b1a', '#e8dcc6'] }, v: 3.4, s: 125, dir: -1 },
      { cyk: ['#24221f', { pakker: true }], o: { coat: '#4a5a6a', trousers: '#2d3340', skin: '#f0c9ab', hair: '#8c8c88', hairStyle: 'skaldet', hue: [strikhue('#2f5fa8', '#2f5fa8', '#eef0ee', '#eef0ee')], ansigt: [briller('#5a4a3a'), skaeg('#bdbab4')], toej: [haette('#4a5a6a', '#cbb89a'), lynlaas('#2d3a46', 0.9, 1.6), halstoerklaede('#b3262a', '#eef0ee')], vanter: ['#8a5a33'], stoevle: ['#2a1d14'] }, v: 3.8, s: 95, dir: 1 },
      { cyk: ['#8a2a2e', { dame: true, kurv: true }], o: { coat: '#7d4f8a', trousers: '#2b2a30', skin: '#7d4f36', hair: '#1f1a18', kvinde: true, hairStyle: 'knold', dyneaerme: true, hue: [strikhue('#eef0ee', '#eef0ee', '#7d4f8a')], toej: [dyne('#7d4f8a', [0.95, 1.08, 1.21, 1.34]), lynlaas('#4a2a54', 0.9, 1.58, 0.024), halstoerklaede('#e0a63a', '#7d4f8a')], vanter: ['#e0a63a'], stoevle: ['#3a2a20', '#efe4cf'] }, v: 4.6, s: 15, dir: -1 },
    ].slice(0, lav ? 3 : 4);
    const CY = FOLK.map(F_ => {
      const b = cykel(...F_.cyk), f = rytter(F_.o); b.c.add(f.root); g.add(b.c);
      return Object.assign(b, { f, s: F_.s, dir: F_.dir, v0: F_.v, v: F_.v, off: 0, pause: 0, phi: Math.random() * 6, rot: 0 });
    });
    // tre parkerede cykler op ad husmuren i højre side (set fra porten), bagt sammen til ét mesh
    const parkeret = new THREE.Group(); g.add(parkeret);
    for (const [s, farve, o] of [[21.5, '#3e7d4a', { kurv: true }], [22.7, '#6f7780', {}], [88, '#2f5fa8', { dame: true }]]) {
      const b = cykel(farve, o), p = b.c, x = A[0] + ux * s + hx * 6.4, z = A[1] + uz * s + hz * 6.4;
      p.position.set(x, groundAt(x, z, 1.5), z); p.rotation.set(0, Math.atan2(ux, uz) + (s > 50 ? Math.PI : 0), s > 50 ? -0.1 : 0.1, 'YXZ');
      b.hjul.forEach(h => { h.rotation.x = s; }); parkeret.add(p);
    }
    samlFarver(parkeret); parkeret.children.forEach(m => { m.receiveShadow = true; });
    // afstand fra Ida til gaden (vist og animeret kun, når hun er tæt på)
    const afst = (x, z) => { const s = Math.max(S0, Math.min(S1, (x - A[0]) * ux + (z - A[1]) * uz)); return Math.hypot(x - A[0] - ux * s, z - A[1] - uz * s); };
    const e = { x: A[0], z: A[1], g, t: 0, afst: p => afst(p.x, p.z) };
    e.upd = (t, dt, pos) => {
      for (const c of CY) {
        if (c.pause > 0) {   // ude af gaden: vent lidt og kom så tilbage den anden vej
          c.c.visible = false; c.pause -= dt;
          if (c.pause <= 0) { c.dir = -c.dir; c.s = c.dir > 0 ? S0 : S1; c.v = c.v0 = 3.3 + Math.random() * 1.4; c.off = 0; }
          continue;
        }
        const fx = ux * c.dir, fz = uz * c.dir, rx = hx * c.dir, rz = hz * c.dir;   // frem og højre for cyklisten
        const lx = A[0] + ux * c.s + rx * BANE, lz = A[1] + uz * c.s + rz * BANE;      // midt i højre vejbane
        // hvor står Ida i forhold til cyklisten?
        const ia = (pos.x - lx) * fx + (pos.z - lz) * fz, il = (pos.x - lx) * rx + (pos.z - lz) * rz;
        let offM = 0, vM = c.v0;
        if (ia > -0.6 && ia < 9 && Math.abs(il - c.off) < 1.3) {
          const mod = CY.some(o => o !== c && o.pause <= 0 && o.dir !== c.dir && Math.abs((o.s - c.s) * c.dir - 6) < 10);   // modkørende tæt på
          const venstre = il - 1.35, hoejre = il + 1.35;
          if (venstre >= (mod ? -1.2 : -3.4)) offM = venstre; else if (hoejre <= 1.2) offM = hoejre;
          else vM = Math.max(0, (ia - 3.2) * 1.5);   // ingen plads: brems og vent lidt foran hende
          if (ia < 4 && Math.abs(il - c.off) < 0.95) vM = Math.min(vM, Math.max(0, (ia - 1.6) * 1.2));   // for tæt på: brems
        } else if (ia > -0.6 && ia < 4.5 && Math.abs(il - c.off) < 0.95) vM = Math.max(0, (ia - 1.6) * 1.2);
        for (const o of CY) if (o !== c && o.pause <= 0 && o.dir === c.dir) { const gap = (o.s - c.s) * c.dir; if (gap > 0 && gap < 3.5) vM = Math.min(vM, o.v * (gap < 2.2 ? 0.5 : 1)); }   // ikke ind i den foran
        c.v += Math.max(-5 * dt, Math.min(1.6 * dt, vM - c.v)); if (c.v < 0.02) c.v = 0;
        const ds = c.v * dt, doff = Math.max(-0.45 * ds, Math.min(0.45 * ds, offM - c.off)); c.off += doff;   // svinger kun, mens den ruller
        c.s += c.v * dt * c.dir;
        if (c.s > S1 || c.s < S0) { c.pause = 2 + Math.random() * 7; c.c.visible = false; continue; }
        // placering, retning, hældning på broen og en lille krængning i svinget
        const x = A[0] + ux * c.s + rx * (BANE + c.off), z = A[1] + uz * c.s + rz * (BANE + c.off);
        const h = hAt(c.s), fald = (hAt(c.s + c.dir * 0.5) - hAt(c.s - c.dir * 0.5));
        c.c.position.set(x, h, z);
        c.c.rotation.set(-Math.atan(fald), Math.atan2(fx, fz) - (ds > 1e-4 ? Math.atan(doff / ds) : 0), 0, 'YXZ');
        const kant = Math.min(c.s - S0, S1 - c.s);   // de vokser frem bag porten og over broen
        c.c.scale.setScalar(sm(kant / 3)); c.c.visible = Math.hypot(pos.x - x, pos.z - z) < (lav ? 90 : 130);
        if (!c.c.visible) continue;
        const stop = 1 - Math.min(1, c.v / 0.6);
        c.c.rotation.z = stop * 0.1;    // står stille: cyklen hælder lidt, og hun sætter foden i jorden
        for (const hj of c.hjul) hj.rotation.x += c.v * dt / R_;
        c.phi += c.v * dt / R_ / 2.4; c.krank.rotation.x = c.phi;
        ben(c.f.legs[0], c.phi + Math.PI); ben(c.f.legs[1], c.phi);
        if (stop > 0.5) { c.f.legs[0].hip.rotation.x = lerp(c.f.legs[0].hip.rotation.x, -0.2, stop); c.f.legs[0].knee.rotation.x = lerp(c.f.legs[0].knee.rotation.x, 0.15, stop); }
        c.f.g.rotation.z = Math.sin(c.phi) * 0.03 * (1 - stop);
        if (c.glod) c.glod.material.opacity = 0.75 + Math.sin(t * 9 + c.s) * 0.05;
      }
    };
    e.cy = CY; g.visible = false; EP.push(e);
  }

  // ---------------------------------------------------------------- 8. H.C. Andersen i Bibliotekshaven
  // En høj, tynd herre i lang sort frakke, lys vest, sort halsklud og høj hat går langsomt rundt om bassinet på grusstien
  // med sin stok. Han har en rød blomst i knaphullet og grå handsker. En gang imellem står han lidt og kigger på
  // springvandet. Når Ida kommer tæt på, vender han sig mod hende, løfter hatten med en lille bukken, sætter den på igen
  // og går videre. Højst én gang hver gang han går forbi hende.
  // Ydelse: han er ti bagte dele (krop, hoved, hat, to arme, en underarm og fire bendele), og han tegnes kun, når Ida er
  // tæt på og udenfor.
  if (H.GARDEN) {
    const GD = H.GARDEN, S = 1.06, K = 1.17;               // overall size and how much longer his legs are
    const LEG = 0.84 * (K - 1);                             // the extra leg length (in his own measure)
    const HC = { coat: '#2b2c35', lapel: '#41434f', trousers: '#6d6862', vest: '#dccb9f', vestK: '#a88c52', shirt: '#f4f1ea', cravat: '#1b1a1f',
      hat: '#1f1e24', band: '#46404a', skin: '#efc9a8', hair: '#7a5434', glove: '#cfc8ba', cane: '#4a3323', knob: '#d9b25a', rose: '#c0262d', leaf: '#2f6b3a', button: '#17171b' };
    // the path: a loop round the pond on the gravel, in the garden's own frame, well clear of the pond, the statue and the benches
    const LOOP = [[0, -15], [9.6, -13.6], [14.9, -8.4], [15.8, 0], [14.9, 8.6], [10.4, 14.4], [0, 15.6], [-10.4, 14.6], [-15.2, 9.2], [-15.8, 0], [-14.9, -8.6], [-9.6, -13.8]];
    const kurve = new THREE.CatmullRomCurve3(LOOP.map(([x, z]) => { const p = GD.at(x, z); return new THREE.Vector3(p[0], 0, p[1]); }), true, 'centripetal');
    const NS = 480, sti = kurve.getSpacedPoints(NS), LEN = kurve.getLength();
    for (const p of sti) p.y = groundAt(p.x, p.z, 0.3);
    const paaSti = (s, ud) => {   // position and heading at arc length s
      const k = (((s / LEN) % 1) + 1) % 1 * NS, i = Math.floor(k), a = sti[i], b = sti[(i + 1) % NS], f = k - i;
      ud.set(lerp(a.x, b.x, f), lerp(a.y, b.y, f), lerp(a.z, b.z, f)); return Math.atan2(b.x - a.x, b.z - a.z);
    };
    const KIG = LEN * 0.6;   // where he stops for a while and looks at the fountain
    const springvand = GD.at(0, 0);

    // shapes on the body: a curved patch round the body's axis with radius R(y), from angle a0(y) to a1(y) (0 is straight ahead)
    function flade(y0, y1, R, a0, a1, ny = 8, na = 10) {
      const pos = [], idx = [];
      for (let i = 0; i <= ny; i++) { const y = lerp(y0, y1, i / ny), r = R(y); for (let j = 0; j <= na; j++) { const a = lerp(a0(y), a1(y), j / na); pos.push(r * Math.sin(a), y, r * ZF * Math.cos(a)); } }
      for (let i = 0; i < ny; i++) for (let j = 0; j < na; j++) { const a = i * (na + 1) + j, b = a + 1, c = a + na + 1, d = c + 1; idx.push(a, b, c, b, d, c); }
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); return geo;
    }
    const kurveR = pts => y => {   // a radius that follows [radius, height] points, top down
      for (let i = 1; i < pts.length; i++) if (y >= pts[i][1]) { const [r0, y0] = pts[i - 1], [r1, y1] = pts[i]; return lerp(r1, r0, (y - y1) / (y0 - y1)); }
      return pts[pts.length - 1][0];
    };
    const nuance = (c, dl) => '#' + new THREE.Color(c).offsetHSL(0, 0, dl).getHexString();
    const drejet = (pts, seg) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
    // bakes the matrix fn(mesh) (in the frame of rod) into the parts under rod, except those under the groups in stop
    const _inv = new THREE.Matrix4();
    function form(rod, fn, stop = new Set()) {
      rod.updateMatrixWorld(true); _inv.copy(rod.matrixWorld).invert();
      const ud = [];
      rod.traverse(x => { if (!x.isMesh || !x.userData.fig || x.userData.fast) return; for (let p = x.parent; p && p !== rod; p = p.parent) if (stop.has(p)) return; ud.push(x); });
      for (const x of ud) {
        const geo = x.geometry.clone(); geo.applyMatrix4(fn(x).multiply(new THREE.Matrix4().multiplyMatrices(_inv, x.matrixWorld)));
        x.geometry.dispose(); x.geometry = geo; x.parent.remove(x); rod.add(x); x.position.set(0, 0, 0); x.rotation.set(0, 0, 0); x.scale.set(1, 1, 1);
      }
    }
    const skal = (sx, sy, sz) => () => new THREE.Matrix4().makeScale(sx, sy, sz);

    // the left hand holds the cane: it touches the ground just in front of him when the arm swings forward
    const ARM_FREM = -0.22, ALBUE_V = 0.42, STOK_HAELD = 0.12;
    let hat = null, P_ = null;
    const f = menneske({
      coat: HC.coat, trousers: HC.trousers, skin: HC.skin, hair: HC.hair, hairStyle: 'kort', shoes: '#141316', ingenKrave: true,
      scale: S, skygge, detalje: GFX.lav ? 'lav' : undefined,
      extra: (g, head, part, m, foran) => {
        P_ = { part, m };
        const krop = y => foran(y) / ZF;
        // the waistcoat in the opening of the coat, the shirt above it and the coat's lapels on both sides
        const vV = y => 0.03 + (y - 1.1) / 0.43 * 0.52, lapB = y => 0.07 + (y - 1.1) / 0.43 * 0.3, sk = y => Math.max(0, (y - 1.37) / 0.17 * 0.34);
        part(flade(1.1, 1.53, y => krop(y) + 0.004, y => -vV(y), y => vV(y)), m(HC.vest), g, 0, 0, 0, 0);
        part(flade(1.37, 1.545, y => krop(y) + 0.008, y => -sk(y), y => sk(y), 5, 6), m(HC.shirt), g, 0, 0, 0, 0);
        for (const s of [-1, 1]) {
          part(flade(1.08, 1.54, y => krop(y) + 0.013, s < 0 ? (y => -vV(y) - lapB(y)) : vV, s < 0 ? (y => -vV(y)) : (y => vV(y) + lapB(y)), 8, 5), m(HC.lapel), g, 0, 0, 0, 0);
        }
        for (const y of [1.17, 1.25, 1.33]) part(SG(0.011, 8, 6), m(HC.vestK), g, 0, y, krop(y) * ZF + 0.01, 0);   // waistcoat buttons
        for (const s of [-1, 1]) { const a = s * 0.1; part(SG(0.016, 8, 6), m(HC.button), g, krop(1.08) * Math.sin(a), 1.08, krop(1.08) * ZF * Math.cos(a) + 0.012, 0); }
        // the watch chain across the waistcoat
        part(streg([0, 1.25, krop(1.25) * ZF + 0.012], [0.07, 1.215, krop(1.215) * ZF - 0.006], 0.004, 4), m(HC.knob), g, 0, 0, 0, 0);
        // the long skirt of the frock coat, open at the front so the legs can move
        const skoedR = kurveR([[0.198, 1.07], [0.212, 0.95], [0.226, 0.84], [0.242, 0.66], [0.258, 0.47], [0.262, 0.43]]);
        const aab = y => lerp(0.92, 0.16, Math.max(0, Math.min(1, (y - 0.43) / 0.64)));
        part(flade(0.43, 1.07, skoedR, aab, y => Math.PI * 2 - aab(y), 10, lav ? 16 : 24), m(HC.coat), g);
        for (const s of [-1, 1]) part(SG(0.014, 8, 6), m(HC.button), g, s * 0.06, 1.06, -0.19, 0);   // two buttons at the back of the waist
        // the neck, the black neckcloth with a bow and the white collar points of the shirt
        part(new THREE.CylinderGeometry(0.05, 0.053, 0.13, 12), m(HC.skin), g, 0, 1.69, 0, 0);
        ring(part, m, HC.cravat, g, 0.062, 0.03, 1.615, 0.95, 6, 20, 1);
        ring(part, m, HC.cravat, g, 0.058, 0.026, 1.655, 0.95, 6, 20, 1);
        part(SG(0.022, 10, 8), m(HC.cravat), g, 0, 1.6, 0.085).scale.set(1, 0.8, 0.7);
        for (const s of [-1, 1]) {
          const v = part(SG(0.036, 10, 8), m(HC.cravat), g, s * 0.036, 1.6, 0.078); v.scale.set(1, 0.55, 0.4); v.rotation.z = s * 0.25;
          const sn = part(new THREE.BoxGeometry(0.018, 0.075, 0.006), m(HC.cravat), g, s * 0.018, 1.545, 0.08); sn.rotation.set(-0.15, 0, s * 0.18);   // the ends hang down
          const k = part(new THREE.BoxGeometry(0.045, 0.075, 0.01), m(HC.shirt), g, s * 0.066, 1.672, 0.07); k.rotation.set(-0.3, s * 0.5, s * 0.5);   // the high collar points by the chin
        }
        // the coat's collar, rolled round the back of the neck
        { const c = part(TG(0.1, 0.03, 6, 16, Math.PI * 1.25), m(HC.lapel), g, 0, 1.6, -0.005); c.rotation.set(Math.PI / 2 - 0.35, 0, Math.PI * 0.125 + Math.PI); c.scale.set(1, 0.9, 1.3); }
        // a red flower in the buttonhole of the left lapel, with two leaves
        { const y = 1.43, a = vV(y) + lapB(y) * 0.5, r = krop(y) + 0.03, x = r * Math.sin(a), z = r * ZF * Math.cos(a);
          for (let i = 0; i < 5; i++) { const b = i * 1.26; part(SG(0.016, 8, 6), m(HC.rose), g, x + Math.cos(b) * 0.012, y + Math.sin(b) * 0.012, z + 0.004, 0); }
          part(SG(0.014, 8, 6), m('#8e1a20'), g, x, y, z + 0.014, 0);
          for (const s of [-1, 1]) { const l = part(SG(0.018, 6, 4), m(HC.leaf), g, x + s * 0.017, y - 0.02, z - 0.004, 0); l.scale.set(0.5, 1, 0.3); l.rotation.z = s * 0.7; } }
        // the face: a long chin and the big nose
        part(SG(0.072, 14, 10), m(HC.skin), head, 0, -0.118, 0.052).scale.set(0.82, 0.85, 0.8);
        { const n = part(SG(0.03, 14, 10), m(nuance(HC.skin, -0.03)), head, 0, -0.018, 0.15); n.scale.set(0.72, 1.35, 1.25); n.rotation.x = -0.55; }   // one smooth, long nose
        for (const s of [-1, 1]) part(SG(0.009, 8, 6), m(nuance(HC.skin, -0.1)), head, s * 0.014, -0.05, 0.168, 0);   // nostrils
        // the wavy brown hair at the sides and the back (the hat covers the top)
        for (const s of [-1, 1]) for (const [x, y, z, r, rz] of [[0.132, 0.03, -0.01, 0.042, 0.3], [0.138, -0.03, -0.035, 0.04, -0.2], [0.124, -0.075, -0.06, 0.034, 0.35], [0.112, 0.01, -0.085, 0.045, 0]]) {
          const l = part(CG(r, r * 1.2, 10), m(HC.hair), head, s * x, y, z); l.rotation.z = s * rz; l.scale.set(0.75, 1, 1);
        }
        part(SG(0.1, 14, 10), m(HC.hair), head, 0, -0.035, -0.08).scale.set(1.18, 0.85, 0.75);
        // the top hat (its own part, so he can take it off)
        hat = new THREE.Group(); hat.position.set(0, 0.07, -0.004); hat.rotation.x = -0.1; head.add(hat);
        const hg = drejet([[0.001, 0.008], [0.112, 0.008], [0.114, 0], [0.168, 0.003], [0.186, 0.018], [0.181, 0.029], [0.165, 0.024], [0.118, 0.021],
          [0.113, 0.07], [0.11, 0.15], [0.113, 0.22], [0.12, 0.27], [0.117, 0.283], [0.001, 0.285]], lav ? 16 : 26);
        const hp = hg.attributes.position;
        for (let i = 0; i < hp.count; i++) { const x = hp.getX(i), z = hp.getZ(i), r = Math.hypot(x, z); if (r > 0.12) hp.setY(i, hp.getY(i) + 0.05 * (r - 0.12) / 0.066 * (x * x) / (r * r)); }   // the brim curls up at the sides
        hg.computeVertexNormals();
        part(hg, m(HC.hat), hat).scale.set(0.94, 1, 1.08);
        part(drejet([[0.1135, 0.026], [0.1158, 0.026], [0.1146, 0.068], [0.1122, 0.068]], lav ? 16 : 26), m(HC.band), hat, 0, 0, 0, 0).scale.set(0.94, 1, 1.08);
      },
      arm: [-1, 1].map(s => (sh, part, m, el) => {
        // grey gloves and a white shirt cuff
        part(SG(0.054, 10, 8), m(HC.glove), el, 0, -0.3, 0.004).scale.set(0.82, 1.12, 0.64);
        const tu = part(CG(0.017, 0.032, 6), m(HC.glove), el, -s * 0.03, -0.285, 0.024); tu.rotation.z = s * 0.5;
        ring(part, m, HC.shirt, el, 0.05, 0.011, -0.225, 1, 5, 14, 0);
        if (s < 0) return;
        // the cane in the left hand, with a brass knob
        const tot = ARM_FREM - ALBUE_V, haand = new THREE.Vector3(0, -0.3, 0.02);
        const albue = 1.53 - 0.3 * Math.cos(ARM_FREM), hy = albue - 0.3 * Math.cos(tot);
        const L = (hy + LEG + 0.02) / Math.cos(STOK_HAELD);
        const d = new THREE.Vector3(0, -Math.cos(STOK_HAELD), Math.sin(STOK_HAELD)).applyAxisAngle(new THREE.Vector3(1, 0, 0), -tot);
        const top = haand.clone().addScaledVector(d, -0.13), bund = haand.clone().addScaledVector(d, L);
        const st = part(new THREE.CylinderGeometry(0.011, 0.009, L + 0.13, 8), m(HC.cane), el); st.position.copy(top).add(bund).multiplyScalar(0.5);
        st.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), d);
        const kn = part(SG(0.022, 10, 8), m(HC.knob), el); kn.position.copy(top);
        const fe = part(new THREE.CylinderGeometry(0.01, 0.01, 0.04, 8), m('#b9b4a8'), el, 0, 0, 0, 0); fe.position.copy(bund).addScaledVector(d, -0.02); fe.quaternion.copy(st.quaternion);
        for (const x of [st, kn, fe]) x.userData.fast = true;   // not made thinner with the arm
      }),
      foer: f => {
        f.head.rotation.order = 'YXZ';
        // tall and thin: a narrower body, thin arms and long thin legs; a long face
        const ben = new Set([f.head, ...f.arms, ...f.hips]);
        form(f.g, skal(0.86, 1, 0.88), ben);
        f.head.position.y += 0.03;
        form(f.head, skal(0.93, 1.06, 1), new Set([hat]));
        for (const [i, sh] of f.arms.entries()) { sh.position.x = (i ? 1 : -1) * 0.228; form(sh, skal(0.84, 1, 0.84), new Set([f.elbows[i]])); form(f.elbows[i], skal(0.84, 1, 0.84)); }
        for (const [i, l] of f.legs.entries()) {
          l.hip.position.x = (i ? 1 : -1) * 0.088;
          form(l.hip, skal(0.8, K, 0.82), new Set([l.knee]));
          l.knee.position.y = -0.42 * K;
          const [skin, ...sko] = l.knee.children.filter(x => x.isMesh);
          form(l.knee, x => x === skin ? new THREE.Matrix4().makeScale(0.8, K, 0.82) : sko.includes(x) ? new THREE.Matrix4().makeTranslation(0, -0.42 * (K - 1), 0).multiply(new THREE.Matrix4().makeScale(1, 1, 1.12)) : new THREE.Matrix4());
        }
        f.elbows[1].rotation.x = -ALBUE_V;   // the cane arm's elbow is baked with its bend
      },
      grupper: f => [f.g, f.head, hat, f.arms[0], f.elbows[0], f.arms[1], ...f.hips, ...f.legs.map(l => l.knee)],
    });
    const g = new THREE.Group(); gruppe.add(g); g.add(f.root);
    const hjem = { p: hat.position.clone(), q: hat.quaternion.clone() }, hatHjem = new THREE.Object3D(); hatHjem.position.copy(hjem.p); hatHjem.quaternion.copy(hjem.q); f.head.add(hatHjem);
    const Y0 = LEG * S, HOFTE = 0.86 * S, BENL = (0.84 * K + 0.05) * S;
    const A = 0.3, SKRIDT = 4 * BENL * Math.sin(A);        // one full step cycle (two steps)
    const V = 0.78;                                         // a slow stroll

    // the right arm: two-bone reach for the hand to a point in his own frame, with the elbow out to the side
    const vS = new THREE.Vector3(), vD = new THREE.Vector3(), vE = new THREE.Vector3(), vP = new THREE.Vector3(), vX = new THREE.Vector3(), vY = new THREE.Vector3(), vZ = new THREE.Vector3();
    const mR = new THREE.Matrix4(), qIK = new THREE.Quaternion(), qGaa = new THREE.Quaternion(), eGaa = new THREE.Euler();
    function naa(T) {   // sets qIK and returns the elbow bend
      vS.copy(f.arms[0].position); vD.copy(T).sub(vS); const d = Math.max(0.2, Math.min(0.595, vD.length())); vD.normalize();
      const phi = Math.acos(Math.max(-1, Math.min(1, d * d / 0.18 - 1)));
      vP.set(-1, -0.55, 0.25).normalize(); vP.addScaledVector(vD, -vP.dot(vD)).normalize();
      const a = d / 2, h = Math.sqrt(Math.max(0, 0.09 - a * a));
      vE.copy(vS).addScaledVector(vD, a).addScaledVector(vP, h);                     // the elbow
      vY.copy(vS).sub(vE).normalize();
      const hand = vX.copy(vS).addScaledVector(vD, d).sub(vE).divideScalar(0.3);        // forearm direction
      vZ.copy(hand).addScaledVector(vY, Math.cos(phi)).divideScalar(Math.max(0.05, Math.sin(phi))).normalize();
      vZ.addScaledVector(vY, -vZ.dot(vY)).normalize(); vX.crossVectors(vY, vZ);
      qIK.setFromRotationMatrix(mR.makeBasis(vX, vY, vZ));
      return phi;
    }
    const tw = new THREE.Vector3(), mal = new THREE.Vector3(), grebPkt = new THREE.Vector3(-0.035, 0.05, 0.14), here = new THREE.Vector3();
    const iEgen = w => { f.g.updateWorldMatrix(true, false); return f.g.worldToLocal(w); };
    const vinkel = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
    const REPLIK = ['God aften!', 'God aften, lille frøken!', 'Glædelig jul!', 'Sikke en aften til et eventyr.'];
    const st = { s: LEN * 0.15, v: V, fase: 0, yaw: 0, mode: 'gaa', T: 0, hilst: 0, gaaet: 99, vaek: true, kigT: 0, kigget: false, hy: 0, hp: 0, ik: 0, bue: 0, hatHaand: false, hatTilbage: 0, gange: 0 };
    st.yaw = paaSti(st.s, here);
    // a greeting: turn to her, lift the hat off with a small bow, put it back on, walk on
    const KF = [[0, 'greb'], [1.15, 'greb'], [1.55, 'op'], [2.05, 'ud'], [2.85, 'ud'], [3.3, 'op'], [3.75, 'greb']];
    const e = { x: here.x, z: here.z, g, t: 0, afst: p => Math.hypot(p.x - here.x, p.z - here.z), hc: { st, f, hat, sti, LEN } };
    e.upd = (t, dt, pos) => {
      const dx = pos.x - here.x, dz = pos.z - here.z, dI = Math.hypot(dx, dz), tilIda = Math.atan2(dx, dz);
      // where on the path, and is Ida in the way?
      const vej = paaSti(st.s, tw);
      const foran = dx * Math.sin(vej) + dz * Math.cos(vej), side = Math.abs(dx * Math.cos(vej) - dz * Math.sin(vej));
      if (dI > 7) st.vaek = true;
      if (st.mode === 'gaa' && dI < 4.2 && st.vaek && st.gaaet > 12 && Math.abs(vinkel(st.yaw, tilIda)) < 2.1 && pos.y < 1) {
        st.mode = 'hils'; st.T = 0; st.vaek = false; st.gaaet = 0; st.gange++;
      }
      if (st.mode === 'gaa' && !st.kigget && ((st.s - KIG) % LEN + LEN) % LEN < 0.5) { st.mode = 'kig'; st.kigT = 0; st.kigget = true; }
      if (st.mode === 'kig' && ((st.kigT += dt) > 5 || dI < 3)) st.mode = 'gaa';
      if (st.kigget && ((st.s - KIG) % LEN + LEN) % LEN > LEN * 0.5) st.kigget = false;
      // speed: stop to greet or to look, and wait if Ida stands right in front of him
      let vM = st.mode === 'gaa' ? V : 0;
      if (st.mode === 'gaa' && foran > 0 && foran < 1.6 && side < 0.8) vM = 0;
      st.v += Math.max(-1.6 * dt, Math.min(0.8 * dt, vM - st.v));
      const ds = Math.max(0, st.v) * dt; st.s = (st.s + ds) % LEN; st.gaaet += ds;
      st.fase += ds / SKRIDT * Math.PI * 2;
      const vejYaw = paaSti(st.s, here);
      // turn: along the path, toward Ida while greeting, half toward the fountain while looking
      let yM = vejYaw;
      if (st.mode === 'hils' && st.T < 4.1) yM = tilIda;
      if (st.mode === 'kig') yM = vejYaw + vinkel(vejYaw, Math.atan2(springvand[0] - here.x, springvand[1] - here.z)) * 0.6;
      st.yaw += vinkel(st.yaw, yM) * (1 - Math.exp(-dt * (st.mode === 'hils' ? 3.2 : 2.2)));
      f.root.position.copy(here); f.root.rotation.y = st.yaw;
      e.x = here.x; e.z = here.z;
      // the lanky walk: long legs, the knee bends in the swing, a little bob and sway
      const w = Math.min(1, st.v / (V * 0.7)), ph = st.fase;
      const hofte = [], knae = [];
      for (let i = 0; i < 2; i++) {
        const p = ph + i * Math.PI, sv = Math.cos(p);
        hofte[i] = -A * Math.sin(p) * w - 0.03 * w; knae[i] = (0.6 * Math.max(0, sv) ** 1.4 + 0.06) * w;
        f.legs[i].hip.rotation.set(hofte[i], 0, (i ? 1 : -1) * 0.025); f.legs[i].knee.rotation.x = knae[i];
      }
      const stoette = Math.cos(ph) < 0 ? 0 : 1;   // the leg on the ground
      const bob = BENL * (Math.cos(hofte[stoette]) - 1) - 0.012 * w * Math.abs(Math.sin(ph * 2));
      // the bow: from the hips, while the legs stay upright
      let bue = 0;
      if (st.mode === 'hils') { const T = st.T; bue = ramp(T, 1.5, 2.05) * (1 - ramp(T, 2.85, 3.35)); }
      const B = bue * 0.36 + 0.035 + 0.02 * w;
      f.g.rotation.set(B, Math.sin(ph) * 0.05 * w, Math.sin(ph) * 0.022 * w);
      f.g.position.set(0, Y0 + bob + HOFTE * (1 - Math.cos(B)), -HOFTE * Math.sin(B));
      for (const l of f.legs) l.hip.rotation.x -= B;
      // the head: ahead, at Ida when she is near, at the fountain when he stops to look
      let hY = Math.sin(t * 0.31) * 0.25 * w, hP = 0.05;
      if (st.mode === 'kig') { hY = vinkel(st.yaw, Math.atan2(springvand[0] - here.x, springvand[1] - here.z)); hP = 0.15; }
      const rel = vinkel(st.yaw, tilIda);
      if (dI < 8 && Math.abs(rel) < 1.6) { hY = rel; hP = Math.atan2(2.05 - 1.1, Math.max(0.5, dI)); }
      st.hy += (Math.max(-1.1, Math.min(1.1, hY)) - st.hy) * (1 - Math.exp(-dt * 3));
      st.hp += (Math.max(-0.2, Math.min(0.5, hP)) - st.hp) * (1 - Math.exp(-dt * 3));
      const nik = st.mode === 'hils' ? bue * 0.22 : 0;
      f.head.rotation.set(st.hp + nik - B * 0.4, st.hy, Math.sin(t * 0.47) * 0.03);
      // arms: the cane arm swings with the right leg and plants the cane, the right arm swings free
      const aL = lerp(ARM_FREM, -0.05 + 0.17 * Math.sin(ph), w);
      f.arms[1].rotation.set(aL, 0, 0.07);
      eGaa.set(-0.2 * Math.sin(ph) * w + 0.03, 0, -0.08); qGaa.setFromEuler(eGaa);
      let albue = 0.22;
      if (st.mode === 'hils') {
        const T = st.T;
        st.ik = ramp(T, 0.45, 1.15) * (1 - ramp(T, 3.8, 4.45));
        // where the hand goes: to the hat on his head, up, and out to the side with the hat
        f.head.updateMatrixWorld(true);
        const greb = iEgen(hatHjem.localToWorld(mal.copy(grebPkt))).clone();
        const op = greb.clone().add(tw.set(0.02, 0.15, 0.06)), ud = tw.set(-0.42, 1.24, 0.26).clone();
        const P = { greb, op, ud };
        let k = 0; while (k < KF.length - 1 && T > KF[k + 1][0]) k++;
        const [t0, a] = KF[k], [t1, b] = KF[Math.min(k + 1, KF.length - 1)];
        mal.copy(P[a]).lerp(P[b], t1 > t0 ? sm((T - t0) / (t1 - t0)) : 1);
        const phi = naa(mal);
        f.arms[0].quaternion.copy(qGaa).slerp(qIK, st.ik); albue = lerp(albue, phi, st.ik);
        // the hat goes into the hand and back onto the head
        if (!st.hatHaand && T >= 1.15 && T < 3.75) { f.elbows[0].rotation.x = -albue; f.elbows[0].updateMatrixWorld(true); f.elbows[0].attach(hat); st.hatHaand = true; }
        if (st.hatHaand && T >= 3.75) { f.head.attach(hat); st.hatHaand = false; st.hatTilbage = 1; }
        if (T > 1.6 && T - dt <= 1.6 && H.toast && (st.gange === 1 || Math.random() < 0.35)) {
          const el = document.getElementById('toast');
          if (!el || el.hidden) H.toast('H.C. Andersen: ' + (st.gange === 1 ? REPLIK[0] : REPLIK[Math.floor(Math.random() * REPLIK.length)]));
        }
        if ((st.T += dt) > 4.6) { st.mode = 'gaa'; st.ik = 0; }
      } else f.arms[0].quaternion.copy(qGaa);
      f.elbows[0].rotation.x = -albue;
      if (st.hatTilbage > 0) {   // settle the hat in its place
        st.hatTilbage = Math.max(0, st.hatTilbage - dt * 4);
        hat.position.lerp(hjem.p, 1 - st.hatTilbage); hat.quaternion.slerp(hjem.q, 1 - st.hatTilbage);
        if (!st.hatTilbage) { hat.position.copy(hjem.p); hat.quaternion.copy(hjem.q); }
      }
      // breathing
      f.g.scale.y = S * (1 + Math.sin(t * 1.6) * 0.004);
    };
    g.visible = false; EP.push(e);
  }

  // ---------------------------------------------------------------- hver frame
  // pos: Idas plads. ude: hun er udenfor (ikke inde i en bygning, i Tårnet eller i båden)
  // Julemanden i kanen (slaede.js): index.html giver den vejret og lydene, når alt det er klar
  let SL = null;
  const medSlaede = (X) => { SL = slaede(Object.assign({}, H, X)); return SL; };

  function update(dt, t, pos, ude) {
    if (SL) SL.update(dt, t, pos);   // kanen flyver også videre, når Ida står i Tårnet
    gruppe.visible = !!ude;
    if (!ude) return;
    const R = GFX.lav ? 50 : 80, d_ = Math.min(dt, 0.1);
    for (const e of EP) {
      const vis = (e.afst ? e.afst(pos) : Math.hypot(pos.x - e.x, pos.z - e.z)) < R;
      e.g.visible = vis;
      if (vis) { e.t += d_; e.upd(e.t, d_, pos); }
    }
  }
  return { gruppe, update, EP, slaede: medSlaede, get SL() { return SL; } };
}
