// Små julescener langs vejene i julespillet (kun i kalender-sporet, fx ?spor=jul). Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Fem små optrin, som Ida går forbi på vej mellem nisserne. De siger ikke noget, de er bare noget at se på:
//   1. Højbro Plads: en mandelbod med glød og damp fra panden og en lille kø
//   2. Slotspladsen: en far, der slæber på et alt for stort juletræ. Han trækker, glider og sætter sig i sneen, og børnene griner
//   3. Slotspladsen ved Tårnet: en julemand med en klokke og en gryde og et lille kor, der vugger i takt
//   4. Prins Jørgens Gård: en embedsmand med en stak ringbind, der taber dem i sneen, igen og igen
//   5. Ridebanen: to børn kaster snebolde efter en snemand med slips, hat og mappe
//   6. Slotspladsen ved porten til Rigsdagsgården: ti venlige demonstranter med et banner: Nej tak til dagpengeforringelser
//   7. Tøjhusgade: cyklister, der kører frem og tilbage i højre side af vejen, og tre parkerede cykler ved en husmur
//
// index.html kalder episoder(...) én gang i KALENDER-blokken og derefter update(dt, t, pos, ude) i hver frame.
// Ydelse: alle figurer er bagt til få meshes (menneske() i index.html), geometri og materialer deles, hver scene vises
// og animeres kun, når Ida er tæt på (kortere på lav grafik), og det hele er skjult, når hun er indendørs.
// Tekster og kommentarer må ikke indeholde tankestreg. Brug bindestreg.

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
    // ringbindene får deres egne materialer uden sne, så farverne kan ses ovenfra
    ringbind: ['#2f5fa8', '#b3262a', '#3e7d4a', '#e0a63a', '#6f7780', '#7d4f8a'].map(c => { const m = tm(c).clone(); m.onBeforeCompile = () => {}; m.userData.sne = true; return m; }),
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
    const saelger = placer(person({ coat: '#7a2a24', trousers: '#2b2a30', hair: '#6b4a2f', kvinde: true, hairStyle: 'knold', toerklaede: '#e0a63a',
      extra: hue('#2f5f3a'),
      arm: [null, (sh, part, m, el) => { part(new THREE.CylinderGeometry(0.012, 0.016, 0.5, 6), m('#a8794c'), el, 0, -0.5, 0.06, 0); }],
      foer: f => { f.elbows[1].rotation.x = -0.9; f.elbows[0].rotation.x = -0.6; } }), g, 0.75, -0.3, -Math.PI / 2);
    // kunderne: en mand, der gnider hænderne, en mor og et barn, der ikke kan stå stille
    const mand = placer(person({ coat: '#3a4a5a', trousers: '#2d3340', hair: '#3b2a20', hairStyle: 'kort', toerklaede: '#c0392b',
      foer: f => { for (const el of f.elbows) el.rotation.x = -1.3; } }), g, -1.0, -0.2, Math.PI / 2);
    const mor = placer(person({ coat: '#6a3a5a', trousers: '#2b2a30', hair: '#a8794c', kvinde: true, long: true, hairStyle: 'bob', statisk: true, extra: hue('#d9d2c2', '#b3262a') }), g, -2.0, 0.6, Math.PI / 2 - 0.3);
    const barn = placer(person({ coat: '#e0a63a', trousers: '#2f5fa8', hair: '#d9c08a', barn: true, hairStyle: 'hestehale', kvinde: true, extra: hue('#b3262a') }), g, -1.55, 1.15, Math.PI / 2 - 0.6);
    mand.arms[0].rotation.x = mand.arms[1].rotation.x = -0.7; mand.arms[0].rotation.z = 0.3; mand.arms[1].rotation.z = -0.3;
    return (t) => {
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
    const far = placer(person({ coat: '#2f5f3a', trousers: '#2b2f36', hair: '#6b4a2f', hairStyle: 'kort', toerklaede: '#b3262a', extra: hue('#b3262a'),
      foer: f => { for (const el of f.elbows) el.rotation.x = -0.15; } }), g, 0, -0.3, 0);
    const pige = placer(person({ coat: '#c0392b', trousers: '#24303a', hair: '#3b2a20', barn: true, kvinde: true, hairStyle: 'hestehale', extra: hue('#f1e3c0', '#2f5fa8') }), g, 1.7, -2.3, Math.atan2(-1.7, 1.9));
    const dreng = placer(person({ coat: '#2f5fa8', trousers: '#24303a', hair: '#a8794c', barn: true, hairStyle: 'kort', extra: hue('#e0a63a') }), g, 2.5, -1.3, Math.atan2(-2.5, 0.9));
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

  // ---------------------------------------------------------------- 3. Julemanden og koret (Slotspladsen, ved Tårnet)
  // Julemanden ringer med en klokke ved en gryde på et stativ. Tre sangere med nodemapper vugger i takt.
  scene(63, -50, Math.PI / 2, (g, e) => {
    const julemand = placer(person({ coat: '#b3262a', trousers: '#b3262a', shoes: '#1a1412', hair: '#f1eee6', bryn: '#e8e4da', skin: '#f0c9ab', hairStyle: 'kort', scale: 1.04,
      extra: (g2, head, part, m, foran) => {
        part(new THREE.SphereGeometry(0.15, 12, 10), m('#f4f1ea'), head, 0, -0.1, 0.07).scale.set(1.05, 1.25, 0.75);   // skægget
        const h = part(new THREE.ConeGeometry(0.16, 0.4, 12), m('#b3262a'), head, 0, 0.24, -0.04); h.rotation.x = -0.45;
        part(new THREE.TorusGeometry(0.145, 0.035, 6, 16), m('#f4f1ea'), head, 0, 0.07, -0.01).rotation.x = Math.PI / 2;
        part(new THREE.SphereGeometry(0.05, 8, 6), m('#f4f1ea'), head, 0, 0.36, -0.2);
        part(new THREE.CylinderGeometry(0.205, 0.215, 0.07, 16), m('#1a1412'), g2, 0, 1.06, 0, 0).scale.set(1, 1, 0.92);   // bæltet
        part(new THREE.BoxGeometry(0.09, 0.08, 0.02), m('#d9b25a'), g2, 0, 1.06, foran(1.06) + 0.012, 0);
      },
      arm: [null, (sh, part, m, el) => {   // klokken i højre hånd
        part(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 6), m('#4a3323'), el, 0, -0.38, 0.0, 0);
        part(new THREE.ConeGeometry(0.07, 0.11, 10, 1, true), m('#d9b25a'), el, 0, -0.47, 0.0, 0).rotation.x = Math.PI;
      }],
      foer: f => { f.elbows[1].rotation.x = -1.0; } }), g, 0, 0, 0);
    // gryden på et stativ
    const stativ = new THREE.Group(); stativ.position.set(0.85, 0, 0.35); g.add(stativ);
    for (let i = 0; i < 3; i++) { const a = i * 2.09, b = stk(G.cyl, M.jern, stativ, Math.sin(a) * 0.25, 0.55, Math.cos(a) * 0.25, 0.015, 1.15, 0.015, false); b.rotation.set(Math.cos(a) * 0.22, 0, -Math.sin(a) * 0.22); }
    const gryde = stk(G.kugle, M.roed, stativ, 0, 0.62, 0, 0.2, 0.17, 0.2); gryde.userData.fri = true;
    colCirc(...e.ver(0.85, 0.35), 0.35, 1.2);
    // koret: tre sangere på række bag ham med nodemapper
    const kor = [[-1.0, -0.9, '#24303a', '#c0392b', false, '#3b2a20'], [0, -1.25, '#4a3a5a', '#e0a63a', true, '#a8794c'], [1.0, -0.9, '#2f3a2f', '#eef0ee', true, '#1f1a18']].map(([lx, lz, coat, toer, kv, hair], i) => {
      const f = placer(person({ coat, trousers: '#2b2a30', hair, kvinde: kv, long: kv, hairStyle: kv ? (i === 1 ? 'bob' : 'lang') : 'skaldet', toerklaede: toer, statisk: true,
        extra: (g2, head, part, m, foran) => { const mp = part(new THREE.BoxGeometry(0.26, 0.2, 0.02), m('#1f2a44'), g2, 0, 1.2, foran(1.2) + 0.2, 0); mp.rotation.x = -0.6; },
        foer: f2 => { for (const [k, a] of f2.arms.entries()) { a.rotation.x = -0.75; a.rotation.z = (k ? 1 : -1) * -0.12; } for (const el of f2.elbows) el.rotation.x = -0.9; } }), g, lx, lz, 0);
      return f;
    });
    return (t) => {
      const ring = Math.sin(t * 9);
      julemand.arms[1].rotation.x = -0.9 + ring * 0.35; julemand.arms[1].rotation.z = 0.15;
      julemand.g.rotation.z = Math.sin(t * 1.4) * 0.03; julemand.g.position.y = Math.abs(Math.sin(t * 1.4)) * 0.015;
      gryde.rotation.y = Math.sin(t * 0.8) * 0.2;
      kor.forEach((f, i) => { f.g.rotation.z = Math.sin(t * 1.4 + i * 0.25) * 0.07; f.g.position.y = Math.abs(Math.sin(t * 2.8 + i * 0.5)) * 0.02; });
    };
  });

  // ---------------------------------------------------------------- 4. Embedsmanden og ringbindene (Prins Jørgens Gård)
  // En embedsmand bærer en stak ringbind over gården. Det øverste glider ned i sneen. Han bukker sig efter det,
  // og så glider det næste ned på den anden side. Han samler dem op, retter stakken til og står lidt. Så igen.
  scene(-39, -65.5, Math.PI / 4, (g, e) => {
    const mand = placer(person({ coat: '#2b2f36', trousers: '#2b2f36', hair: '#8c8c88', hairStyle: 'skaldet', toerklaede: '#6f7780', alvor: true,
      extra: (g2, head, part, m) => { for (const s of [-1, 1]) part(new THREE.TorusGeometry(0.03, 0.006, 4, 12), m('#1d1a1c'), head, s * 0.048, 0.012, 0.142, 0); },
      foer: f => { for (const el of f.elbows) el.rotation.x = -1.35; for (const [k, a] of f.arms.entries()) { a.rotation.x = -0.35; a.rotation.z = (k ? 1 : -1) * 0.05; } } }), g, 0, 0, 0);
    // stakken sidder på kroppen, så den følger med, når han bukker sig
    const stak = new THREE.Group(); stak.position.set(0, 1.12, 0.36); stak.userData.fri = true; mand.g.add(stak);
    const bind = M.ringbind.map((mat, i) => { const b = stk(G.kasse, mat, stak, (i % 2 ? 0.015 : -0.01), i * 0.075, 0, 0.32, 0.07, 0.28); b.rotation.y = (i % 3 - 1) * 0.05; return b; });
    const loese = [0, 1].map(i => { const b = stk(G.kasse, M.ringbind[5 - i], g, 0, 0, 0, 0.32, 0.07, 0.28); b.visible = false; b.userData.fri = true; return b; });
    colCirc(...e.ver(0, 0), 0.35, 1.8);
    const T = 10, start = [new THREE.Vector3(), new THREE.Vector3()], slut = [new THREE.Vector3(0.75, 0.035, 0.75), new THREE.Vector3(-0.7, 0.035, 0.45)];
    let sidste = -1;
    return (tt) => {
      const t = tt % T;
      if (t < sidste) { for (const b of bind) b.visible = true; for (const l of loese) l.visible = false; }
      sidste = t;
      const buk = ramp(t, 3.3, 4.2) * (1 - ramp(t, 6.3, 7.2));
      mand.g.rotation.x = buk * 0.75 + Math.sin(tt * 0.9) * 0.015;
      mand.hips[0].rotation.x = mand.hips[1].rotation.x = -buk * 0.5; mand.g.position.y = -buk * 0.05;
      mand.g.rotation.z = (1 - buk) * Math.sin(tt * 1.3) * 0.02;
      // de to ringbind, der glider af: nummer 5 (øverst) efter 2 sekunder, nummer 4, mens han bukker sig
      for (let i = 0; i < 2; i++) {
        const b0 = bind[5 - i], l = loese[i], t0 = i ? 4.0 : 2.0, t1 = t0 + 0.65, op = ramp(t, 6.4, 7.2);
        if (t >= t0 && !l.visible && t < 7.2) { b0.updateWorldMatrix(true, false); start[i].copy(g.worldToLocal(b0.getWorldPosition(v3))); b0.visible = false; l.visible = true; }
        if (!l.visible) continue;
        if (t >= 7.2) { l.visible = false; b0.visible = true; continue; }
        const k = ramp(t, t0, t1), s = start[i], e2 = slut[i];
        if (op > 0) {   // han samler dem op: tilbage op i stakken
          l.position.set(lerp(e2.x, s.x, op), lerp(e2.y, s.y, op) + Math.sin(op * Math.PI) * 0.2, lerp(e2.z, s.z, op)); l.rotation.set(0, 0, lerp(i ? 0.25 : -0.3, 0, op));
        } else {
          l.position.set(lerp(s.x, e2.x, k), lerp(s.y, e2.y, k * k) + Math.sin(k * Math.PI) * 0.15, lerp(s.z, e2.z, k));
          l.rotation.set(k * (i ? -1.2 : 1.4) * (1 - ramp(t, t1 - 0.1, t1)), 0, (i ? 0.25 : -0.3) * k);
        }
      }
      // han kigger ned efter dem og retter stakken til bagefter
      const ret = ramp(t, 7.6, 8.0) * (1 - ramp(t, 8.6, 9.0));
      stak.rotation.z = ret * Math.sin(tt * 14) * 0.05 + (ramp(t, 1.5, 2.0) - ramp(t, 2.0, 2.4)) * 0.12;
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
    const boern = [[-3.6, 0.9, '#3e7d4a', '#e0a63a', false, 'kort', '#6b4a2f'], [3.4, 1.4, '#7d4f8a', '#f1e3c0', true, 'hestehale', '#b4612f']].map(([lx, lz, coat, h, kv, stil, hair]) => {
      const f = placer(person({ coat, trousers: '#24303a', hair, barn: true, kvinde: kv, hairStyle: stil, extra: hue(h) }), g, lx, lz, Math.atan2(-lx, -lz));
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
  // Ti venlige mennesker i alle aldre står med et banner. De to forreste holder stængerne, de andre vugger,
  // klapper i takt og løfter en hånd på skift. En har en termokande, et barn sidder på sin fars skuldre.
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
    const klud = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 0.8, 12, 1), bm); klud.position.y = 1.22; klud.userData.fri = true; banner.add(klud);
    const kludPos = klud.geometry.attributes.position, kludX = Float32Array.from({ length: kludPos.count }, (_, i) => kludPos.getX(i));
    for (const s of [-1, 1]) { const st = stk(G.cyl, M.moerktTrae, banner, s * 2.02, 0.85, 0, 0.025, 1.7, 0.025, false); st.userData.fri = true; }
    // folkene: to forrest med stængerne, resten i to rækker bag dem
    const folk = [
      [-2.3, 0.8, { coat: '#2f5fa8', trousers: '#2b2f36', hair: '#6b4a2f', hairStyle: 'kort', toerklaede: '#e0a63a', extra: hue('#b3262a') }, 'stang'],
      [2.3, 0.8, { coat: '#7a2a24', trousers: '#2b2a30', hair: '#a8794c', kvinde: true, long: true, hairStyle: 'bob', toerklaede: '#eef0ee' }, 'stang'],
      [-2.3, -0.5, { coat: '#3e7d4a', trousers: '#24303a', hair: '#d8d4ca', hairStyle: 'skaldet', toerklaede: '#b3262a', extra: hue('#3e7d4a') }, 'klap'],
      [-1.2, -0.7, { coat: '#6a3a5a', trousers: '#2b2a30', hair: '#3b2a20', kvinde: true, hairStyle: 'hestehale', taske: true }, 'vink'],
      [-0.2, -0.55, { coat: '#e0a63a', trousers: '#2f3a5a', hair: '#1f1a18', kvinde: true, hairStyle: 'knold', toerklaede: '#2f5fa8' }, 'klap'],
      [0.8, -0.75, { coat: '#2b2f36', trousers: '#2b2f36', hair: '#8c8c88', hairStyle: 'kort', toerklaede: '#c0392b', solbriller: false }, 'termo'],
      [1.85, -0.5, { coat: '#c0392b', trousers: '#24303a', hair: '#d9c08a', kvinde: true, long: true, hairStyle: 'lang', extra: hue('#eef0ee', '#c0392b') }, 'vink'],
      [2.6, -0.2, { coat: '#4a5a3a', trousers: '#2d3340', hair: '#3b2a20', hairStyle: 'kort', toerklaede: '#e0a63a' }, 'far'],
      [2.6, -0.2, { coat: '#2f5fa8', trousers: '#c0392b', hair: '#a8794c', barn: true, sidder: true, hairStyle: 'kort', extra: hue('#e0a63a', '#2f5fa8') }, 'skuldre'],
      [-0.9, -1.6, { coat: '#7d4f8a', trousers: '#2b2a30', hair: '#f1eee6', kvinde: true, hairStyle: 'knold', long: true, extra: hue('#b3262a') }, 'klap'],
    ].map(([lx, lz, o, rolle], i) => {
      const f = placer(person(Object.assign({ statisk: rolle === 'skuldre' }, o)), g, lx, lz, 0);
      if (rolle === 'skuldre') { f.root.position.set(2.6, 1.02, -0.12); f.root.scale.setScalar(0.85); }
      if (rolle === 'termo') stk(G.cyl, M.roed, f.root, 0.27, 0.95, 0.12, 0.05, 0.26, 0.05, false).userData.fri = true;
      return { f, rolle, i };
    });
    colCirc(...e.ver(0, 0), 3.2, 2.2);
    return (t) => {
      // banneret blafrer lidt
      for (let i = 0; i < kludPos.count; i++) kludPos.setZ(i, Math.sin(kludX[i] * 2.2 + t * 2.4) * 0.05 * (0.4 + Math.abs(kludX[i]) / 2));
      kludPos.needsUpdate = true; banner.position.y = Math.abs(Math.sin(t * 1.6)) * 0.03;
      for (const { f, rolle, i } of folk) {
        const sv = Math.sin(t * 1.6 + i * 0.7);
        f.g.rotation.z = sv * 0.04; if (rolle !== 'skuldre') f.g.position.y = Math.abs(Math.sin(t * 3.2 + i)) * 0.015;
        if (!f.arms) continue;
        if (rolle === 'stang') { for (const a of f.arms) { a.rotation.x = -0.75; a.rotation.z = 0; } }
        else if (rolle === 'klap') { const k = Math.abs(Math.sin(t * 4 + i)); f.arms[0].rotation.x = f.arms[1].rotation.x = -0.9; f.arms[0].rotation.z = -0.25 + k * 0.3; f.arms[1].rotation.z = 0.25 - k * 0.3; }
        else if (rolle === 'vink') { const op = Math.max(0, Math.sin(t * 0.7 + i * 1.3)); f.arms[1].rotation.x = -op * 2.6; f.arms[1].rotation.z = Math.sin(t * 7) * 0.25 * op; }
        else if (rolle === 'termo') { f.arms[1].rotation.x = -0.5 - Math.max(0, Math.sin(t * 0.5)) * 0.6; }
        else if (rolle === 'far') { f.arms[0].rotation.x = f.arms[1].rotation.x = -2.7; }
      }
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
      const f = person(Object.assign({ gang: true }, o, { foer: f2 => { f2.g.rotation.x = LAEN; for (const [k, a] of f2.arms.entries()) { a.rotation.x = ARM; a.rotation.z = (k ? 1 : -1) * 0.03; } for (const el of f2.elbows) el.rotation.x = -0.08; f2.arms.length = 0; } }));   // armene står stille og bages ind i kroppen (færre ting at tegne)
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
      { cyk: ['#2f5fa8', { lygte: true }], o: { coat: '#2f5f3a', trousers: '#2b2f36', hair: '#3b2a20', hairStyle: 'kort', toerklaede: '#e0a63a', extra: hue('#b3262a') }, v: 4.2, s: 40, dir: 1 },
      { cyk: ['#e6dcc4', { dame: true, trae: true }], o: { coat: '#b3262a', trousers: '#24303a', hair: '#a8794c', kvinde: true, hairStyle: 'lang', extra: hue('#eef0ee', '#b3262a') }, v: 3.4, s: 125, dir: -1 },
      { cyk: ['#24221f', { pakker: true }], o: { coat: '#4a5a6a', trousers: '#2d3340', hair: '#8c8c88', hairStyle: 'skaldet', toerklaede: '#b3262a', extra: hue('#2f5fa8', '#eef0ee') }, v: 3.8, s: 95, dir: 1 },
      { cyk: ['#8a2a2e', { dame: true, kurv: true }], o: { coat: '#7d4f8a', trousers: '#2b2a30', hair: '#1f1a18', kvinde: true, hairStyle: 'knold', toerklaede: '#eef0ee' }, v: 4.6, s: 15, dir: -1 },
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

  // ---------------------------------------------------------------- hver frame
  // pos: Idas plads. ude: hun er udenfor (ikke inde i en bygning, i Tårnet eller i båden)
  function update(dt, t, pos, ude) {
    gruppe.visible = !!ude;
    if (!ude) return;
    const R = GFX.lav ? 50 : 80, d_ = Math.min(dt, 0.1);
    for (const e of EP) {
      const vis = (e.afst ? e.afst(pos) : Math.hypot(pos.x - e.x, pos.z - e.z)) < R;
      e.g.visible = vis;
      if (vis) { e.t += d_; e.upd(e.t, d_, pos); }
    }
  }
  return { gruppe, update, EP };
}
