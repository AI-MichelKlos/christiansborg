// Små julescener langs vejene i julespillet (kun i kalender-sporet, fx ?spor=jul). Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Fem små optrin, som Ida går forbi på vej mellem nisserne. De siger ikke noget, de er bare noget at se på:
//   1. Højbro Plads: en mandelbod med glød og damp fra panden og en lille kø
//   2. Slotspladsen: en far, der slæber på et alt for stort juletræ. Han trækker, glider og sætter sig i sneen, og børnene griner
//   3. Slotspladsen ved Tårnet: en julemand med en klokke og en gryde og et lille kor, der vugger i takt
//   4. Prins Jørgens Gård: en embedsmand med en stak ringbind, der taber dem i sneen, igen og igen
//   5. Ridebanen: to børn kaster snebolde efter en snemand med slips, hat og mappe
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

  // ---------------------------------------------------------------- hver frame
  // pos: Idas plads. ude: hun er udenfor (ikke inde i en bygning, i Tårnet eller i båden)
  function update(dt, t, pos, ude) {
    gruppe.visible = !!ude;
    if (!ude) return;
    const R = GFX.lav ? 50 : 80, d_ = Math.min(dt, 0.1);
    for (const e of EP) {
      const vis = Math.hypot(pos.x - e.x, pos.z - e.z) < R;
      e.g.visible = vis;
      if (vis) { e.t += d_; e.upd(e.t, d_); }
    }
  }
  return { gruppe, update, EP };
}
