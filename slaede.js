// Julemanden i kanen med fire rensdyr, der flyver forbi over Slotsholmen, når det sner (kun i kalender-sporet, fx ?spor=jul).
// Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// The whole team (sleigh, Santa and four reindeer) is one skinned figure in the style of the people in index.html: every
// moving part (a leg, a head, an arm, the lantern) is a bone, and all parts are merged into one coloured mesh, one outline
// shell and one small mesh for the parts that glow (the red nose and the lantern). That is three things to draw for the
// whole team, plus two glow sprites and the sparkle trail. It is built the first time it is needed.
//
// It only sets out while snow is falling, at most one pass at a time, a few minutes apart, and only when Ida is outdoors.
// A pass flies a calm arc across the island, dips low over Slotspladsen or the library garden and climbs away again.
// Texts and comments must not contain the en dash or em dash. Use a hyphen.

export function slaede(H) {
  const { THREE, dyn, menneske, tm, TX, GFX, isTouch, fald, inde, aktiv, camera, tone, toast, loft, drej, slange, rundKasse, nuance } = H;
  const lav = !!isTouch, sg = n => Math.max(4, Math.round(n * (lav ? 0.7 : 0.85)));
  const rig = new THREE.Group(); rig.name = 'slaede'; rig.visible = false; dyn.add(rig);
  const SKALA = 1.3;   // a little larger than life, so the team reads well from the ground
  rig.scale.setScalar(SKALA);

  // ---------------------------------------------------------------- building: joints (bones) and parts
  const TEGN = new THREE.MeshBasicMaterial();   // a stand-in until the parts are merged; the colour is kept per part
  const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const K = (r, w = 14, h = 10, ...a) => new THREE.SphereGeometry(r, sg(w), sg(h), ...a);
  const CY = (a, b, h, w = 12, open = false) => new THREE.CylinderGeometry(a, b, h, sg(w), 1, open);
  const KP = (r, l, w = 10) => new THREE.CapsuleGeometry(r, l, 2, sg(w));
  const TOR = (r, t, w = 16, h = 6, arc = Math.PI * 2) => new THREE.TorusGeometry(r, t, sg(h), sg(w), arc);
  function led(parent, x = 0, y = 0, z = 0, navn = '') { const j = new THREE.Group(); j.position.set(x, y, z); j.userData.led = true; j.name = navn; parent.add(j); return j; }
  function add(parent, geo, col, x = 0, y = 0, z = 0, o = {}) {   // o: rx, ry, rz, s: [sx, sy, sz], ol (outline, 0 = none), glod (glows)
    const m = new THREE.Mesh(geo, TEGN); m.position.set(x, y, z); m.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0, o.ord || 'XYZ'); if (o.s) m.scale.set(...o.s);
    m.userData.fig = true; m.userData.col = col; m.userData.ol = o.ol === undefined ? -1 : o.ol; m.userData.glod = !!o.glod; parent.add(m); return m;
  }
  // a strap or a rein between two joints: the ends follow each joint, and the strap stretches between them
  const remme = [];
  function rem(jA, pA, jB, pB, r, col, sag = 0.06, o = {}) { remme.push({ jA, pA, jB, pB, r, col, sag, o }); }

  const C = {
    roed: '#b8142a', roedMoerk: '#8e0f22', guld: '#e2b44c', guldMoerk: '#b98a2c', groen: '#1d5a3a', sort: '#1d1b1e', jern: '#2b2a2e',
    jakke: '#c4202c', pels: '#f6f3ec', hud: '#f2c6a4', vante: '#26221f', saek: '#9b7449', reb: '#c9a774',
    dyr: '#7d5636', dyrMoerk: '#4f3524', dyrLys: '#eadfc8', bug: '#d3bd97', mule: '#4a3426', gevir: '#dcc79c', hov: '#2a211c', laeder: '#4a2c1c',
  };

  function byg() {
    const root = new THREE.Group();
    const kane = led(root, 0, 0, 0, 'kane');

    // ---- the sleigh: curved runners with gold, a red lacquered body with gold scrolls, a green velvet seat
    const RX = 0.5;
    for (const s of [-1, 1]) {
      const x = s * RX;
      const mede = [[x, 0.36, -1.42], [x, 0.14, -1.36], [x, 0.03, -1.08], [x, 0.02, 0.5], [x, 0.07, 1.08], [x, 0.24, 1.42], [x, 0.55, 1.63], [x, 0.88, 1.62], [x, 1.03, 1.45], [x, 0.99, 1.27], [x, 0.87, 1.23], [x, 0.82, 1.33], [x, 0.87, 1.4]];
      add(kane, slange(mede.map(p => v3(...p)).map(p => [p.x, p.y, p.z]), 0.038, sg(56), 6), C.guld);
      add(kane, K(0.05, 10, 8), C.guld, x, 0.87, 1.4);
      add(kane, K(0.045, 10, 8), C.guld, x, 0.37, -1.43);
      for (const z of [-0.85, -0.05, 0.7]) {   // posts up to the body, with a gold collar at the foot
        add(kane, CY(0.024, 0.03, 0.42, 8), C.guldMoerk, x, 0.23, z);
        add(kane, K(0.04, 6, 4), C.guld, x, 0.06, z, { s: [1, 0.6, 1], ol: 0 });
      }
      // a curved bracket between the posts, like an iron scroll
      add(kane, slange([[x, 0.05, -0.5], [x, 0.3, -0.42], [x, 0.38, -0.2], [x, 0.3, 0.05], [x, 0.05, 0.25]], 0.014, sg(24), 5), C.guldMoerk, 0, 0, 0, { ol: 0 });
    }

    // the side panels: one profile (z along, y up), extruded across
    const prof = new THREE.Shape();
    prof.moveTo(-1.02, 0.4); prof.lineTo(0.96, 0.4);
    prof.quadraticCurveTo(1.2, 0.44, 1.24, 0.74);           // 1: the front rises
    prof.quadraticCurveTo(1.28, 1.06, 1.08, 1.13);          // 2: up into the front scroll
    prof.quadraticCurveTo(0.9, 1.15, 0.88, 0.98);           // 3: and curls back
    prof.quadraticCurveTo(0.82, 0.78, 0.48, 0.76);          // 4: down to the low side
    prof.lineTo(-0.32, 0.79);                               // 5
    prof.quadraticCurveTo(-0.74, 0.82, -0.86, 1.18);        // 6: up towards the high back
    prof.quadraticCurveTo(-0.94, 1.46, -1.12, 1.4);         // 7: the back scroll
    prof.quadraticCurveTo(-1.22, 1.22, -1.1, 0.86);         // 8
    prof.lineTo(-1.02, 0.4);
    const PT = 0.035, PX = 0.6;   // thickness and where the outer face is
    const sideGeo = () => { const g = new THREE.ExtrudeGeometry(prof, { depth: PT, bevelEnabled: true, bevelThickness: 0.014, bevelSize: 0.014, bevelSegments: 1, curveSegments: sg(8) }); g.deleteAttribute('uv'); g.rotateY(-Math.PI / 2); return g; };
    for (const s of [-1, 1]) add(kane, sideGeo(), C.roed, s > 0 ? PX : -PX + PT, 0, 0);
    // gold trim along the top edge and the bottom edge, just outside each panel
    const kant = []; for (const i of [1, 2, 3, 4, 5, 6, 7]) for (const p of prof.curves[i].getPoints(i === 5 ? 3 : 8)) { const q = kant[kant.length - 1]; if (!q || Math.hypot(q[0] - p.x, q[1] - p.y) > 0.02) kant.push([p.x, p.y]); }
    for (const s of [-1, 1]) {
      const x = s * (PX + 0.012);
      add(kane, slange(kant.map(([z, y]) => [x, y, z]), 0.022, sg(60), 5), C.guld, 0, 0, 0, { ol: 0 });
      add(kane, slange([[x, 0.41, -1.0], [x, 0.41, 0.2], [x, 0.42, 0.95]], 0.016, 10, 5), C.guld, 0, 0, 0, { ol: 0 });
      // ornaments on the outside of the panel: two gold scrolls, a ring with a gold star and holly at the front
      const ud = s * (PX + 0.02);
      for (const [z, y, r, rot] of [[0.45, 0.58, 0.11, 0.3], [-0.55, 0.58, 0.11, Math.PI + 0.3]]) {
        add(kane, TOR(r, 0.014, 18, 5, Math.PI * 1.4), C.guld, ud, y, z, { ry: Math.PI / 2, rz: rot, ord: 'YXZ', ol: 0 });
        add(kane, TOR(r * 0.45, 0.012, 12, 5, Math.PI * 1.5), C.guld, ud, y + Math.sin(rot) * r * 0.55, z + Math.cos(rot) * r * 0.55 * s, { ry: Math.PI / 2, rz: rot + Math.PI, ord: 'YXZ', ol: 0 });
        add(kane, K(0.02, 6, 5), C.guld, ud, y - Math.sin(rot) * r, z - Math.cos(rot) * r * s, { ol: 0 });
      }
      add(kane, TOR(0.14, 0.018, 24, 5), C.guld, ud, 0.6, -0.05, { ry: Math.PI / 2, ol: 0 });
      add(kane, CY(0.125, 0.125, 0.01, 22), C.roedMoerk, ud - s * 0.004, 0.6, -0.05, { rz: Math.PI / 2, ol: 0 });
      const stj = new THREE.Shape(); for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, rr = k % 2 ? 0.04 : 0.095; stj[k ? 'lineTo' : 'moveTo'](Math.sin(a) * rr, Math.cos(a) * rr); }
      const sg_ = new THREE.ExtrudeGeometry(stj, { depth: 0.012, bevelEnabled: false }); sg_.deleteAttribute('uv'); sg_.rotateY(s * Math.PI / 2);
      add(kane, sg_, C.guld, ud + s * 0.004, 0.6, -0.05, { ol: 0 });
      for (const [dz, dy, rz] of [[0.05, 0.03, 0.5], [-0.05, 0.035, -0.5], [0, -0.04, 0.1]]) add(kane, K(0.06, 6, 4), C.groen, ud + s * 0.01, 1.0 + dy, 1.12 + dz, { s: [0.25, 0.4, 1], rx: rz, ol: 0 });   // holly on the front scroll
      for (const [dz, dy] of [[0, 0.02], [0.03, -0.015], [-0.028, -0.012]]) add(kane, K(0.022, 5, 4), '#d8202a', ud + s * 0.03, 1.0 + dy, 1.11 + dz, { ol: 0 });
    }
    // floor, dash and back, and the rolled scrolls across the front and the back
    add(kane, rundKasse(2 * PX - 0.02, 0.05, 1.98, 0.02), C.roedMoerk, 0, 0.42, -0.03);
    add(kane, rundKasse(2 * PX - 0.04, 0.5, 0.05, 0.02), C.roed, 0, 0.66, 1.1, { rx: -0.45 });
    add(kane, CY(0.075, 0.075, 2 * PX + 0.02, 16), C.roed, 0, 1.07, 1.06, { rz: Math.PI / 2 });
    for (const s of [-1, 1]) add(kane, K(0.085, 12, 8), C.guld, s * (PX + 0.02), 1.07, 1.06, { s: [0.4, 1, 1] });
    add(kane, rundKasse(2 * PX - 0.04, 0.95, 0.05, 0.02), C.roed, 0, 0.88, -1.03, { rx: 0.12 });
    add(kane, CY(0.08, 0.08, 2 * PX + 0.02, 16), C.roed, 0, 1.36, -1.1, { rz: Math.PI / 2 });
    for (const s of [-1, 1]) add(kane, K(0.09, 12, 8), C.guld, s * (PX + 0.02), 1.36, -1.1, { s: [0.4, 1, 1] });
    add(kane, slange([[-PX, 1.12, 1.13], [0, 1.15, 1.14], [PX, 1.12, 1.13]], 0.016, 8, 5), C.guld, 0, 0, 0, { ol: 0 });   // a gold band on the front scroll
    // a strap of little bells across the dash
    add(kane, slange([[-0.55, 0.85, 1.22], [0, 0.78, 1.27], [0.55, 0.85, 1.22]], 0.018, 10, 5), C.laeder, 0, 0, 0, { ol: 0 });
    for (let k = -2; k <= 2; k++) { const x = k * 0.21, y = 0.79 + Math.abs(k) * 0.017; add(kane, K(0.04, 8, 6), C.guld, x, y - 0.03, 1.28, { ol: 0.006 }); add(kane, CY(0.022, 0.022, 0.012, 8), C.sort, x, y - 0.06, 1.28, { ol: 0 }); }
    // the seat: a green velvet cushion and back with gold buttons
    add(kane, rundKasse(1.1, 0.16, 0.6, 0.06), C.groen, 0, 0.71, 0.03);
    add(kane, rundKasse(1.1, 0.55, 0.14, 0.06), C.groen, 0, 1.02, -0.34, { rx: -0.16 });
    for (const bx of [-0.3, 0, 0.3]) for (const by of [0.92, 1.12]) add(kane, K(0.022, 5, 4), C.guld, bx, by, -0.27 + (by - 1.02) * 0.16, { ol: 0 });
    // the sack behind the seat, full of wrapped presents, and more presents beside it
    const saek = drej([[0.001, 0], [0.24, 0.03], [0.36, 0.2], [0.38, 0.42], [0.32, 0.64], [0.2, 0.76], [0.13, 0.82], [0.16, 0.9], [0.2, 0.95], [0.001, 0.97]], sg(18));
    add(kane, saek, C.saek, 0.05, 0.44, -0.62, { rx: 0.08, s: [1.1, 1.18, 0.72] });
    add(kane, TOR(0.135, 0.024, 14, 5), C.reb, 0.05, 1.41, -0.86, { rx: Math.PI / 2 - 0.2 });
    add(kane, K(0.03, 8, 6), C.reb, 0.18, 1.39, -0.82);
    for (const [x, y, z, w, h, d, c, b, ry] of [
      [-0.12, 1.52, -0.84, 0.22, 0.2, 0.2, '#2f6bb3', '#f2d35a', 0.3], [0.17, 1.54, -0.9, 0.18, 0.26, 0.16, '#d8343c', '#f6f1e4', -0.4], [0.03, 1.64, -0.95, 0.15, 0.15, 0.15, '#f0c33c', '#c4202c', 0.8],
      [-0.42, 0.6, -0.75, 0.26, 0.3, 0.26, '#3c8a4c', '#e8c45a', 0.2], [0.44, 0.58, -0.62, 0.24, 0.26, 0.3, '#7a3f9c', '#f2d35a', -0.25], [0.42, 0.84, -0.7, 0.18, 0.18, 0.18, '#e9e4d6', '#c4202c', 0.6]]) {
      const p = add(kane, rundKasse(w, h, d, 0.018), c, x, y, z, { ry });
      add(p, new THREE.BoxGeometry(w + 0.012, h + 0.012, 0.04), b, 0, 0, 0, { ol: 0 });   // the ribbon both ways
      add(p, new THREE.BoxGeometry(0.04, h + 0.012, d + 0.012), b, 0, 0, 0, { ol: 0 });
      for (const s of [-1, 1]) add(p, TOR(0.035, 0.012, 8, 4), b, s * 0.03, h / 2 + 0.02, 0, { rz: s * 0.6, ry: Math.PI / 2, ol: 0 });   // the bow
    }
    // the lantern on a curved gold pole at the front, swinging on its hook
    add(kane, slange([[-0.56, 0.9, 0.98], [-0.62, 1.25, 1.02], [-0.66, 1.52, 1.15], [-0.64, 1.6, 1.32], [-0.6, 1.54, 1.42]], 0.018, 20, 5), C.guldMoerk);
    const lygte = led(kane, -0.6, 1.53, 1.42, 'lygte');
    add(lygte, TOR(0.025, 0.007, 8, 4), C.jern, 0, -0.02, 0, { ry: Math.PI / 2, ol: 0 });
    add(lygte, new THREE.ConeGeometry(0.1, 0.08, sg(8)), C.jern, 0, -0.08, 0);
    add(lygte, CY(0.085, 0.085, 0.02, 8), C.jern, 0, -0.125, 0);
    add(lygte, CY(0.065, 0.065, 0.17, 8), '#ffd780', 0, -0.22, 0, { glod: true, ol: 0 });
    for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + Math.PI / 4; add(lygte, CY(0.008, 0.008, 0.18, 4), C.jern, Math.cos(a) * 0.07, -0.22, Math.sin(a) * 0.07, { ol: 0 }); }
    add(lygte, CY(0.085, 0.07, 0.035, 8), C.jern, 0, -0.32, 0);
    add(lygte, K(0.018, 6, 5), C.guld, 0, -0.35, 0, { ol: 0 });

    // ---- Santa: one of the game's people, sitting, with beard, cap, fur, belt, mittens and boots
    const nisse = menneske({
      bag: false, detalje: lav ? 'lav' : undefined, coat: C.jakke, trousers: C.jakke, shoes: C.sort, skin: C.hud, hair: C.pels, bryn: '#f1eee6', hairStyle: 'skaldet', ingenKrave: true, sidder: true,
      extra: (g, head, part, m, foran) => {
        part(K(0.215, 18, 14), m(C.jakke), g, 0, 1.13, 0.05).scale.set(1.02, 0.95, 0.98);   // a round, jolly belly
        part(TOR(0.218, 0.042, 22, 7), m(C.pels), g, 0, 0.87, 0.01).rotation.x = Math.PI / 2;   // the fur at the hem
        part(KP(0.042, 0.5, 8), m(C.pels), g, 0, 1.3, foran(1.3) + 0.045).scale.set(1, 1, 0.55);   // and down the front
        const kr = part(TOR(0.095, 0.05, 18, 7), m(C.pels), g, 0, 1.6, 0.0); kr.rotation.x = Math.PI / 2 - 0.1;   // the fur collar
        const baelte = part(CY(0.245, 0.245, 0.08, 22, true), m(C.sort), g, 0, 1.06, 0.035); baelte.scale.set(0.98, 1, 1.06);
        part(rundKasse(0.11, 0.095, 0.03, 0.012), m(C.guld), g, 0, 1.06, 0.3);   // the buckle with its dark middle
        part(rundKasse(0.06, 0.045, 0.034, 0.008), m(C.sort), g, 0, 1.06, 0.303, 0);
        // the face: a round red nose and rosy cheeks
        part(K(0.032, 10, 8), m('#e89482'), head, 0, -0.012, 0.146);
        for (const sx of [-1, 1]) part(K(0.032, 8, 6), m('#f09a8c'), head, sx * 0.08, -0.022, 0.112, 0).scale.set(1, 0.7, 0.45);
        // a full white beard in soft tufts down over the chest, and a curled moustache
        part(K(0.15, 16, 12), m(C.pels), head, 0, -0.16, 0.055).scale.set(1.05, 1.3, 0.72);
        for (const sx of [-1, 1]) { part(K(0.095, 12, 10), m('#eeebe3'), head, sx * 0.095, -0.1, 0.05).scale.set(1, 1.15, 0.8); part(K(0.07, 10, 8), m('#f1eee7'), head, sx * 0.07, -0.28, 0.07).scale.set(1, 1.2, 0.75); }
        part(K(0.075, 12, 10), m(C.pels), head, 0, -0.33, 0.08).scale.set(1.05, 1.35, 0.7);
        part(K(0.045, 10, 8), m('#efece5'), head, 0, -0.44, 0.085).scale.set(1, 1.3, 0.7);
        for (const sx of [-1, 1]) { const ms = part(K(0.05, 10, 8), m('#ffffff'), head, sx * 0.048, -0.047, 0.142); ms.scale.set(1.35, 0.55, 0.6); ms.rotation.z = sx * 0.32; part(K(0.025, 8, 6), m('#ffffff'), head, sx * 0.105, -0.03, 0.12).scale.set(1, 0.8, 0.8); }
        for (const sx of [-1, 1]) part(KP(0.012, 0.035, 6), m('#ffffff'), head, sx * 0.05, 0.055, 0.124).rotation.set(0, sx * 0.3, Math.PI / 2 + sx * 0.12);   // bushy brows
      },
      arm: [0, 1].map(() => (sh, part, m, el) => {   // fur at the cuffs and black mittens with a thumb
        const c = part(TOR(0.066, 0.032, 16, 6), m(C.pels), el, 0, -0.2, 0); c.rotation.x = Math.PI / 2;
        part(K(0.066, 12, 10), m(C.vante), el, 0, -0.3, 0.01).scale.set(0.85, 1.15, 0.78);
        part(KP(0.026, 0.04, 6), m(C.vante), el, 0.035, -0.27, 0.04).rotation.set(0.4, 0, 0.5);
      }),
    });
    const f = nisse;
    // the cap, on its own joint so the tip can flutter in the wind
    const hue = led(f.head, 0, 0.09, -0.02, 'hue'); hue.rotation.x = -0.12;
    add(f.head, TOR(0.152, 0.05, 22, 8), C.pels, 0, 0.075, -0.01, { rx: Math.PI / 2 - 0.12 });
    add(hue, CY(0.06, 0.165, 0.26, 18, true), C.jakke, 0, 0.12, 0);
    const spids = led(hue, 0, 0.23, 0, 'huespids'); spids.rotation.set(-1.15, 0, 0.35);
    add(spids, new THREE.ConeGeometry(0.075, 0.32, sg(14)), C.jakke, 0, 0.13, 0);
    add(spids, K(0.065, 12, 10), C.pels, 0, 0.3, 0);
    // boots: black shafts with a white fur top over the trousers
    for (const l of f.legs) {
      add(l.knee, CY(0.078, 0.07, 0.26, 12), C.sort, 0, -0.28, 0.005);
      add(l.knee, TOR(0.078, 0.028, 14, 6), C.pels, 0, -0.15, 0.005, { rx: Math.PI / 2 });
    }
    f.root.position.set(0, 0.02, 0.02); kane.add(f.root);
    // joints for the moving parts: body, head, both arms and elbows
    for (const [o, n] of [[f.g, 'krop'], [f.head, 'hoved'], [f.arms[0], 'armH'], [f.elbows[0], 'albueH'], [f.arms[1], 'armV'], [f.elbows[1], 'albueV']]) { o.userData.led = true; o.name = n; }
    // the left arm holds the reins out in front; the right rests on the knee until he waves
    f.arms[1].rotation.set(-0.85, 0, 0.18); f.elbows[1].rotation.set(-0.75, 0, 0);
    f.arms[0].rotation.set(-0.5, 0, -0.16); f.elbows[0].rotation.set(-0.5, 0, 0);
    f.head.rotation.x = -0.05;

    // ---- four reindeer in two pairs, harnessed with red leather, gold and little bells; the lead deer on the left has a red nose
    const dyr = [];
    function rensdyr(x, y, z, rudolf) {
      const krop = led(root, x, y, z, 'dyr');
      add(krop, loft([[0, 1.02, -0.72, 0.03, 0.03], [0, 1.05, -0.66, 0.13, 0.15], [0, 1.05, -0.5, 0.2, 0.24], [0, 1.0, -0.15, 0.215, 0.255], [0, 1.0, 0.2, 0.225, 0.275], [0, 1.03, 0.46, 0.2, 0.26], [0, 1.07, 0.62, 0.12, 0.17], [0, 1.09, 0.68, 0.03, 0.03]], sg(18), sg(12)), C.dyr);
      add(krop, K(1, 14, 8), C.bug, 0, 0.86, 0.02, { s: [0.17, 0.11, 0.5], ol: 0 });   // the pale belly
      add(krop, K(1, 12, 8), C.dyrLys, 0, 1.08, -0.665, { s: [0.11, 0.12, 0.05], ol: 0 });   // the white rump
      const hale = led(krop, 0, 1.17, -0.68, 'hale');
      add(hale, new THREE.ConeGeometry(0.045, 0.12, sg(8)), C.dyrLys, 0, 0.03, -0.03, { rx: -1.1 });
      // the harness: a belly band with a saddle pad, a gold ring on top and bells along the band
      add(krop, TOR(1, 0.12, 22, 6), C.roed, 0, 1.0, 0.18, { s: [0.235, 0.29, 0.2] });
      add(krop, rundKasse(0.3, 0.045, 0.3, 0.02), C.roed, 0, 1.28, 0.18, { s: [1, 1, 1] });
      add(krop, rundKasse(0.31, 0.02, 0.31, 0.008), C.guld, 0, 1.262, 0.18, { ol: 0 });
      add(krop, TOR(0.04, 0.012, 10, 5), C.guld, 0, 1.33, 0.18, { ol: 0 });
      for (const s of [-1, 1]) for (const a of [0.55, 0.95, 1.35]) add(krop, K(0.034, 6, 5), C.guld, s * Math.sin(a) * 0.245, 1.0 - Math.cos(a) * 0.3, 0.18, { ol: 0 });
      // the neck with its pale ruff, then the head
      const hals = led(krop, 0, 1.15, 0.5, 'hals');
      add(hals, loft([[0, -0.12, -0.08, 0.13, 0.17], [0, 0.08, 0.06, 0.115, 0.15], [0, 0.28, 0.16, 0.095, 0.12], [0, 0.42, 0.22, 0.08, 0.1]], sg(9), sg(10)), C.dyr);
      add(hals, K(1, 12, 10), C.dyrLys, 0, 0.06, 0.15, { rx: -0.55, s: [0.11, 0.22, 0.1] });
      for (const k of [-1, 0, 1]) add(hals, new THREE.ConeGeometry(0.04, 0.13, sg(6)), C.dyrLys, k * 0.04, -0.12, 0.2 + k * 0.01 * 0, { rx: Math.PI + 0.25, ol: 0.006 });
      add(hals, TOR(1, 0.2, 20, 6), C.roed, 0, -0.03, 0.03, { rx: Math.PI / 2 + 0.75, s: [0.155, 0.17, 0.17] });   // the collar
      for (const a of [-1.1, -0.55, 0, 0.55, 1.1]) add(hals, K(0.032, 6, 5), C.guld, Math.sin(a) * 0.15, -0.03 - Math.cos(a) * 0.12, 0.03 + Math.cos(a) * 0.12, { ol: 0 });
      const hoved = led(hals, 0, 0.44, 0.22, 'hoved');
      add(hoved, loft([[0, 0.05, -0.08, 0.06, 0.07], [0, 0.04, -0.02, 0.095, 0.1], [0, -0.02, 0.1, 0.085, 0.09], [0, -0.08, 0.22, 0.066, 0.07], [0, -0.11, 0.3, 0.055, 0.055], [0, -0.12, 0.33, 0.02, 0.02]], sg(11), sg(10)), C.dyr);
      add(hoved, K(0.064, 12, 10), C.mule, 0, -0.1, 0.27, { s: [1, 0.9, 1.1] });
      if (rudolf) add(hoved, K(0.05, 14, 10), '#ff2b2b', 0, -0.085, 0.335, { glod: true, ol: 0.006 });
      else add(hoved, K(0.03, 10, 8), '#221917', 0, -0.085, 0.33, { s: [1.2, 0.85, 0.8], ol: 0 });
      for (const s of [-1, 1]) {
        add(hoved, K(0.022, 8, 6), '#1b1416', s * 0.075, 0.03, 0.05, { ol: 0 });
        add(hoved, K(0.007, 5, 4), '#ffffff', s * 0.084, 0.04, 0.06, { ol: 0 });
        add(hoved, new THREE.ConeGeometry(0.035, 0.12, sg(8)), C.dyr, s * 0.085, 0.07, -0.06, { rz: -s * 1.15, rx: -0.2, s: [1, 1, 0.6] });
        // the antlers: a beam that sweeps back and up with tines forward and up
        const b = (px, py, pz) => [s * px, py, pz];
        add(hoved, slange([b(0.04, 0.08, -0.04), b(0.09, 0.2, -0.08), b(0.17, 0.33, -0.08), b(0.22, 0.46, -0.02), b(0.21, 0.58, 0.07)], 0.019, sg(10), 5), C.gevir, 0, 0, 0, { ol: 0.006 });
        for (const t of [[[0.06, 0.13, -0.06], [0.06, 0.19, 0.04], [0.04, 0.22, 0.11]], [[0.15, 0.3, -0.08], [0.14, 0.4, -0.01], [0.1, 0.46, 0.04]], [[0.2, 0.42, -0.04], [0.29, 0.5, -0.05], [0.33, 0.56, -0.02]], [[0.21, 0.52, 0.02], [0.27, 0.62, 0.05]]])
          add(hoved, slange(t.map(p => b(...p)), 0.013, 5, 4), C.gevir, 0, 0, 0, { ol: 0 });
        add(hoved, K(0.019, 6, 5), C.gevir, ...b(0.21, 0.58, 0.07), { ol: 0 });
      }
      // a red bridle with gold studs
      add(hoved, TOR(1, 0.18, 18, 5), C.roed, 0, -0.06, 0.22, { rx: 0.35, s: [0.075, 0.075, 0.07], ol: 0 });
      add(hoved, TOR(1, 0.16, 18, 5), C.roed, 0, 0.01, -0.02, { rx: 0.3, s: [0.1, 0.11, 0.1], ol: 0 });
      for (const s of [-1, 1]) { add(hoved, slange([[s * 0.095, 0.0, -0.02], [s * 0.088, -0.04, 0.1], [s * 0.072, -0.06, 0.22]], 0.01, 8, 4), C.roed, 0, 0, 0, { ol: 0 }); add(hoved, K(0.018, 6, 5), C.guld, s * 0.073, -0.06, 0.22, { ol: 0 }); }
      // legs with a knee, pale socks and dark hooves
      const ben = [], knae = [];
      for (const [lx, foran] of [[-0.12, true], [0.12, true], [-0.12, false], [0.12, false]]) {
        const hofte = led(krop, lx, foran ? 0.96 : 1.0, foran ? 0.42 : -0.5, 'hofte');
        add(hofte, loft(foran ? [[0, 0.1, 0.02, 0.085, 0.12], [0, -0.1, 0.01, 0.07, 0.09], [0, -0.3, 0, 0.05, 0.06], [0, -0.42, 0, 0.044, 0.05]] : [[0, 0.1, 0.06, 0.09, 0.16], [0, -0.1, 0, 0.08, 0.12], [0, -0.28, -0.08, 0.055, 0.07], [0, -0.42, -0.12, 0.045, 0.055]], sg(7), sg(8)), C.dyr);
        const kn = led(hofte, 0, -0.42, foran ? 0 : -0.12, 'knae');
        add(kn, loft([[0, 0.03, 0, 0.042, 0.05], [0, -0.1, 0, 0.034, 0.04], [0, -0.3, 0.005, 0.032, 0.036], [0, -0.36, 0.01, 0.045, 0.05]], sg(7), sg(7)), C.dyrMoerk);
        add(kn, K(0.05, 8, 5), C.dyrLys, 0, -0.37, 0.01, { s: [1, 0.7, 1], ol: 0 });
        add(kn, drej([[0.06, 0], [0.055, 0.045], [0.04, 0.07], [0.001, 0.07]], sg(8)), C.hov, 0, -0.47, 0.03, { ol: 0.006 });
        ben.push(hofte); knae.push(kn);
      }
      const d = { krop, hals, hoved, hale, ben, knae, x, y, z, rudolf };
      dyr.push(d); return d;
    }
    const bag = [rensdyr(-0.5, 0.25, 3.1, false), rensdyr(0.5, 0.25, 3.1, false)];
    const forrest = [rensdyr(-0.5, 0.5, 5.0, true), rensdyr(0.5, 0.5, 5.0, false)];
    root.updateMatrixWorld(true);
    // traces from each rear deer's band to the dash, and from each lead deer's band to the collar of the deer behind
    for (const [i, d] of bag.entries()) for (const s of [-1, 1]) rem(d.krop, [s * 0.235, 1.0, 0.18], kane, [d.x + s * 0.22, 0.7, 1.2], 0.016, C.roed, 0.08);
    for (const [i, d] of forrest.entries()) for (const s of [-1, 1]) rem(d.krop, [s * 0.235, 1.0, 0.18], bag[i].hals, [s * 0.16, -0.03, 0.03], 0.016, C.roed, 0.1);
    // reins from Santa's left mitten to the rear pair's bridles, and over the rear pair's rings to the lead pair
    const haand = [0.0, -0.3, 0.03];
    for (const [i, d] of bag.entries()) {
      rem(f.elbows[1], haand, d.hoved, [(i ? -1 : 1) * 0.073, -0.06, 0.22], 0.009, C.laeder, 0.25);
      rem(f.elbows[1], haand, d.krop, [0, 1.33, 0.18], 0.009, C.laeder, 0.3);
      rem(d.krop, [0, 1.33, 0.18], forrest[i].hoved, [(i ? -1 : 1) * 0.073, -0.06, 0.22], 0.009, C.laeder, 0.15);
    }
    return { root, kane, lygte, f, hue: spids, dyr };
  }

  // ---------------------------------------------------------------- merging into one skinned figure
  function bag(B) {
    const { root } = B; root.updateMatrixWorld(true);
    const leds = []; root.traverse(o => { if (o === root || o.userData.led) leds.push(o); });
    const nr = new Map(leds.map((j, i) => [j, i]));
    const ledAf = o => { for (let p = o; p; p = p.parent) if (nr.has(p)) return p; return root; };
    const bones = leds.map(j => { const b = new THREE.Bone(); b.name = j.name; j.userData.ben = b; return b; });
    const m4 = new THREE.Matrix4();
    leds.forEach((j, i) => {
      if (j === root) return;
      const pj = ledAf(j.parent); m4.copy(pj.matrixWorld).invert().multiply(j.matrixWorld);
      m4.decompose(bones[i].position, bones[i].quaternion, bones[i].scale); bones[nr.get(pj)].add(bones[i]);
    });
    const dele = []; root.traverse(o => { if (o.isMesh && o.userData.fig) dele.push(o); });
    const fyld = [], glod = [], streg = [], TYK = 0.018, col = new THREE.Color();
    function laeg(g, farve, ol, ben) {   // g in figure space; ben(i, pos) -> [b0, b1, w1]
      const p = g.attributes.position.array, nn = g.attributes.normal.array, n = p.length / 3;
      const c = new Float32Array(p.length), si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
      for (let k = 0; k < n; k++) { c[k * 3] = farve.r; c[k * 3 + 1] = farve.g; c[k * 3 + 2] = farve.b; const [b0, b1, w1] = ben(k, p); si[k * 4] = b0; si[k * 4 + 1] = b1; sw[k * 4] = 1 - w1; sw[k * 4 + 1] = w1; }
      const ud = { pos: p, nor: nn, col: c, si, sw };
      if (ol > 0) {   // the outline: every corner pushed out along the average normal of the corners in the same place
        const sum = new Map(), key = k => Math.round(p[k] * 2e4) + ',' + Math.round(p[k + 1] * 2e4) + ',' + Math.round(p[k + 2] * 2e4);
        for (let k = 0; k < p.length; k += 3) { const kk = key(k), a = sum.get(kk) || [0, 0, 0]; a[0] += nn[k]; a[1] += nn[k + 1]; a[2] += nn[k + 2]; sum.set(kk, a); }
        const o = new Float32Array(p.length);
        for (let k = 0; k < p.length; k += 3) { const a = sum.get(key(k)), l = Math.hypot(a[0], a[1], a[2]) || 1; o[k] = p[k] + a[0] / l * ol; o[k + 1] = p[k + 1] + a[1] / l * ol; o[k + 2] = p[k + 2] + a[2] / l * ol; }
        streg.push({ pos: o, si, sw });
      }
      return ud;
    }
    const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    for (const x of dele) {
      const g = x.geometry.index ? x.geometry.toNonIndexed() : x.geometry.clone();
      g.applyMatrix4(m4.multiplyMatrices(inv, x.matrixWorld)); if (!g.attributes.normal) g.computeVertexNormals();
      g.computeBoundingSphere();
      let ol = x.userData.ol; if (ol < 0) ol = Math.min(TYK, g.boundingSphere.radius * 0.22);
      col.copy(x.userData.col !== undefined ? new THREE.Color(x.userData.col) : x.material.color);
      const b = nr.get(ledAf(x.parent));
      (x.userData.glod ? glod : fyld).push(laeg(g, col, ol, () => [b, 0, 0]));
      g.dispose(); x.geometry.dispose();
    }
    for (const r of remme) {   // straps: each corner follows the two ends by how far along it lies
      const a = r.jA.localToWorld(new THREE.Vector3(...r.pA)), b = r.jB.localToWorld(new THREE.Vector3(...r.pB));
      const midt = a.clone().lerp(b, 0.5); midt.y -= r.sag;
      const g = slange([a.toArray(), a.clone().lerp(midt, 0.5).toArray(), midt.toArray(), midt.clone().lerp(b, 0.5).toArray(), b.toArray()], r.r, 14, 5).toNonIndexed();
      const ba = nr.get(ledAf(r.jA)), bb = nr.get(ledAf(r.jB)), d = b.clone().sub(a), l2 = d.lengthSq() || 1;
      fyld.push(laeg(g, col.set(r.col), r.r > 0.012 ? 0.005 : 0, (k, p) => { const t = ((p[k * 3] - a.x) * d.x + (p[k * 3 + 1] - a.y) * d.y + (p[k * 3 + 2] - a.z) * d.z) / l2; return [ba, bb, Math.max(0, Math.min(1, t))]; }));
      g.dispose();
    }
    function samlet(arr) {
      let n = 0; for (const a of arr) n += a.pos.length;
      const pos = new Float32Array(n), nor = arr[0].nor ? new Float32Array(n) : null, cc = arr[0].col ? new Float32Array(n) : null, si = new Uint16Array(n / 3 * 4), sw = new Float32Array(n / 3 * 4); let i = 0;
      for (const a of arr) { pos.set(a.pos, i); if (nor) nor.set(a.nor, i); if (cc) cc.set(a.col, i); si.set(a.si, i / 3 * 4); sw.set(a.sw, i / 3 * 4); i += a.pos.length; }
      const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      if (nor) bg.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); if (cc) bg.setAttribute('color', new THREE.BufferAttribute(cc, 3));
      bg.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); bg.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
      bg.computeBoundingSphere(); return bg;
    }
    const FYLD = tm('#ffffff').clone(); FYLD.vertexColors = true; FYLD.onBeforeCompile = () => {}; FYLD.userData.sne = true;   // no snow on Santa's shoulders
    const STREG = new THREE.MeshBasicMaterial({ color: '#231a22', side: THREE.BackSide }); STREG.userData.sne = true;
    const GLOD = new THREE.MeshBasicMaterial({ vertexColors: true }); GLOD.userData.sne = true;
    const skel = new THREE.Skeleton(bones);
    root.remove(...root.children);
    const holder = new THREE.Group(); holder.add(bones[0]); rig.add(holder);
    const meshes = [];
    for (const [arr, mat] of [[fyld, FYLD], [streg, STREG], [glod, GLOD]]) {
      if (!arr.length) continue;
      const m = new THREE.SkinnedMesh(samlet(arr), mat); holder.add(m); meshes.push(m);
    }
    holder.updateMatrixWorld(true);
    const sf = new THREE.Sphere(); meshes[0].geometry.computeBoundingSphere(); sf.copy(meshes[0].geometry.boundingSphere); sf.radius += 1.2;
    meshes[0].bind(skel);
    for (const m of meshes) { if (m !== meshes[0]) m.bind(skel, meshes[0].bindMatrix); m.boundingSphere = sf.clone(); m.castShadow = !lav && m.material !== GLOD; m.receiveShadow = false; }
    let tris = 0; for (const m of meshes) tris += m.geometry.attributes.position.count / 3;
    return { holder, meshes, bones, tris };
  }

  // ---------------------------------------------------------------- the routes
  // [x, y, z] in the world; y is the height of the runners. Each pass picks one route and a direction at random.
  const RUTER = [
    // from the east over Børsen, low over Slotspladsen, round past the Tower and over Rigsdagsgården, low over Ridebanen, away west
    [[430, 80, -70], [250, 50, -45], [150, 26, -25], [104, 17, -10], [80, 44, 38], [32, 62, 80], [-40, 52, 98], [-112, 24, 84], [-150, 22, 72], [-235, 62, 60], [-440, 85, 40]],
    // from the north over the canal by Højbro, over Slotskirken and the palace, low over the library garden, away south
    [[-80, 95, -440], [-42, 68, -268], [-12, 36, -168], [-28, 56, -100], [-26, 64, -40], [10, 64, 36], [48, 54, 92], [62, 26, 150], [70, 24, 182], [96, 46, 260], [140, 90, 450]],
  ];
  const kurver = RUTER.map(r => { const c = new THREE.CatmullRomCurve3(r.map(p => new THREE.Vector3(...p)), false, 'centripetal'); c.arcLengthDivisions = 400; return c; });

  // ---------------------------------------------------------------- glows and the sparkle trail
  let B = null, M = null, gnist = null, glod = [];
  const N_GN = lav ? 110 : 200;
  const gn = { p: new Float32Array(N_GN * 3), v: new Float32Array(N_GN * 3), liv: new Float32Array(N_GN), c: new Float32Array(N_GN * 3), farve: new Float32Array(N_GN * 3), i: 0, acc: 0 };
  function lavGlod(bone, x, y, z, farve, str, op) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: TX.glow, color: farve, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.position.set(x, y, z); s.scale.setScalar(str); s.userData.op = op; s.userData.str = str; bone.add(s); glod.push(s); return s;
  }
  function klar() {
    if (B) return;
    const t0 = performance.now();
    const b = byg(); const r = bag(b); B = b; M = r;
    const ben = j => j.userData.ben;
    B.ben = { kane: ben(B.kane), lygte: ben(B.lygte), krop: ben(B.f.g), hoved: ben(B.f.head), armH: ben(B.f.arms[0]), albueH: ben(B.f.elbows[0]), hue: ben(B.hue) };
    for (const d of B.dyr) Object.assign(d, { bk: ben(d.krop), bh: ben(d.hals), bhv: ben(d.hoved), bt: ben(d.hale), bb: d.ben.map(ben), bkn: d.knae.map(ben) });
    lavGlod(B.ben.lygte, 0, -0.22, 0, '#ffc46a', 1.6, 0.85);
    for (const d of B.dyr) if (d.rudolf) lavGlod(d.bhv, 0, -0.085, 0.36, '#ff3a2a', 0.55, 0.95);
    // the sparkles live in the world, not on the sleigh
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(gn.p, 3)); geo.setAttribute('color', new THREE.BufferAttribute(gn.c, 3));
    gnist = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.32, map: TX.glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    gnist.frustumCulled = false; gnist.visible = false; dyn.add(gnist);
    // rest pose of the moving parts, so the animation can add to it
    for (const b2 of [...M.bones]) b2.userData.r0 = b2.rotation.clone(), b2.userData.p0 = b2.position.clone();
    S.byggetMs = Math.round(performance.now() - t0);
  }

  // ---------------------------------------------------------------- state
  const S = { tur: false, s: 0, kurve: null, len: 0, ret: 1, vent: 50 + Math.random() * 40, fase: 0, vink: 0, sagt: false, ho: 0, klokke: 0, frys: false, manuel: null, ture: 0, byggetMs: 0, afst: 999 };
  const FART = 13;   // metres a second along the route
  function start(nr, ret) {
    klar();
    const k = kurver[nr ?? Math.floor(Math.random() * kurver.length)];
    Object.assign(S, { tur: true, kurve: k, len: k.getLength(), ret: ret ?? (Math.random() < 0.5 ? 1 : -1), s: 0, sagt: Math.random() < 0.35, ho: 0, ture: S.ture + 1 });
  }
  const P = new THREE.Vector3(), T = new THREE.Vector3(), T2 = new THREE.Vector3(), cam = new THREE.Vector3();
  const punkt = (s, ud, tan) => { const u = Math.max(0, Math.min(1, S.ret > 0 ? s / S.len : 1 - s / S.len)); S.kurve.getPointAt(u, ud); if (tan) { S.kurve.getTangentAt(u, tan); if (S.ret < 0) tan.negate(); } };
  const yawAf = t => Math.atan2(t.x, t.z);
  const vinkel = a => Math.atan2(Math.sin(a), Math.cos(a));

  // sounds: sleigh bells in little bursts with the gallop, louder when near; and now and then "Ho ho ho"
  function klokker(vol) {
    for (let k = 0; k < 4; k++) {
      const f0 = 2350 + Math.random() * 1100, t = k * 0.055 + Math.random() * 0.025;
      tone(f0, f0 * 1.004, t, 0.26, vol, 'sine'); tone(f0 * 2.76, f0 * 2.77, t, 0.12, vol * 0.3, 'sine');
    }
  }
  function hohoho(vol) {
    for (let k = 0; k < 3; k++) { const t = k * 0.34; tone(196, 150, t, 0.26, 0.07 * vol, 'triangle'); tone(392, 290, t, 0.22, 0.026 * vol, 'sine'); tone(98, 76, t, 0.26, 0.03 * vol, 'sawtooth'); }
  }

  // ---------------------------------------------------------------- animation of the team
  function poser(dt, t, naer) {
    const bn = B.ben;
    S.fase += dt * Math.PI * 2 * 1.45;
    const ph = S.fase;
    bn.kane.position.y = bn.kane.userData.p0.y + Math.sin(ph * 0.5) * 0.06;
    bn.kane.rotation.x = Math.sin(ph * 0.5 + 0.6) * 0.025; bn.kane.rotation.z = Math.sin(t * 0.9) * 0.03;
    bn.lygte.rotation.x = Math.sin(t * 2.3) * 0.22 - 0.1; bn.lygte.rotation.z = Math.sin(t * 1.7 + 1) * 0.12;
    bn.hue.rotation.z = bn.hue.userData.r0.z + Math.sin(t * 7) * 0.12; bn.hue.rotation.x = bn.hue.userData.r0.x + Math.sin(t * 5.3) * 0.08;
    // Santa waves with his right arm when someone is near, and laughs (head back, a little shake) when he says Ho ho ho
    S.vink += ((naer ? 1 : 0) - S.vink) * Math.min(1, dt * 2.5);
    const w = S.vink, vift = Math.sin(t * 7.5);
    const a0 = bn.armH.userData.r0, e0 = bn.albueH.userData.r0;
    bn.armH.rotation.set(a0.x + (-0.35 - a0.x) * w, 0, a0.z + (-2.45 - a0.z) * w + vift * 0.16 * w);
    bn.albueH.rotation.set(e0.x + (-0.35 - e0.x) * w, 0, vift * 0.35 * w);
    const grin = S.ho > 0 ? Math.sin(Math.min(1, S.ho / 1.1) * Math.PI) : 0;
    bn.hoved.rotation.x = bn.hoved.userData.r0.x - grin * 0.28 + Math.sin(t * 1.3) * 0.03; bn.hoved.rotation.y = Math.sin(t * 0.7) * 0.25 + (naer ? S.kig * 0.6 : 0);
    bn.krop.position.y = bn.krop.userData.p0.y + (grin > 0 ? Math.abs(Math.sin(t * 22)) * 0.02 * grin : 0);
    // the reindeer: a flying gallop, front legs tucked, hind legs reaching back, each a little after the one in front
    for (const [i, d] of B.dyr.entries()) {
      const p = ph - (i >= 2 ? 0 : 0.9) - (i % 2) * 0.35;
      d.bk.position.y = d.bk.userData.p0.y + Math.sin(p) * 0.07;
      d.bk.rotation.x = Math.sin(p + 0.8) * 0.07 - 0.05;
      d.bh.rotation.x = d.bh.userData.r0.x + Math.sin(p - 1.2) * 0.1;
      d.bhv.rotation.x = Math.sin(p - 0.4) * 0.08 + 0.1;
      d.bt.rotation.x = Math.sin(p * 2) * 0.25;
      for (let k = 0; k < 4; k++) {
        const fo = k < 2, q = p + (k % 2) * 0.3 + (fo ? 0 : Math.PI * 0.85);
        if (fo) { d.bb[k].rotation.x = -0.75 - Math.sin(q) * 0.6; d.bkn[k].rotation.x = 1.15 + Math.sin(q + 0.9) * 0.55; }
        else { d.bb[k].rotation.x = 0.75 + Math.sin(q) * 0.55; d.bkn[k].rotation.x = -0.25 - Math.max(0, Math.sin(q + 1.2)) * 0.9; }
      }
    }
  }

  function gnister(dt, pos, aktiv_) {
    const g = gn;
    if (aktiv_) {   // new sparkles from the back of the runners, and a few from the hooves
      g.acc += dt * (lav ? 32 : 60);
      while (g.acc >= 1) {
        g.acc -= 1; const i = g.i; g.i = (g.i + 1) % N_GN;
        const fra = Math.random() < 0.75 ? [(Math.random() - 0.5) * 1.1, 0.1 + Math.random() * 0.3, -1.4 - Math.random() * 0.2] : [(Math.random() - 0.5) * 1.2, 0.2, 2.9 + Math.random() * 2.2];
        P.set(...fra).multiplyScalar(SKALA).applyEuler(rig.rotation).add(rig.position);
        g.p.set([P.x, P.y, P.z], i * 3);
        g.v.set([(Math.random() - 0.5) * 0.6, -0.25 - Math.random() * 0.5, (Math.random() - 0.5) * 0.6], i * 3);
        g.liv[i] = 1;
        const guld = Math.random() < 0.55; g.farve.set(guld ? [1, 0.8, 0.42] : [0.85, 0.92, 1], i * 3);
      }
    }
    let lever = 0;
    for (let i = 0; i < N_GN; i++) {
      if (g.liv[i] <= 0) { g.c[i * 3] = g.c[i * 3 + 1] = g.c[i * 3 + 2] = 0; continue; }
      g.liv[i] -= dt / 2.6; lever++;
      for (let k = 0; k < 3; k++) g.p[i * 3 + k] += g.v[i * 3 + k] * dt;
      const a = Math.max(0, g.liv[i]) * (0.65 + 0.35 * Math.sin(i * 7.3 + g.liv[i] * 30));   // they twinkle as they fade
      for (let k = 0; k < 3; k++) g.c[i * 3 + k] = g.farve[i * 3 + k] * a;
    }
    gnist.visible = lever > 0;
    gnist.geometry.attributes.position.needsUpdate = true; gnist.geometry.attributes.color.needsUpdate = true;
  }

  // ---------------------------------------------------------------- every frame
  function update(dt, t, pos) {
    dt = Math.min(dt, 0.1);
    const ind = inde();
    if (!S.tur && !S.manuel) {
      rig.visible = false; if (gnist && gnist.visible) gnister(dt, pos, false);
      if (!aktiv() || ind) return;
      S.vent -= dt;
      if (S.vent <= 0 && fald() > 0.15) start();   // only sets out while it snows; the pass is then flown to the end
      return;
    }
    if (S.manuel) {   // for testing: a fixed place
      const m = S.manuel; rig.position.set(m[0], m[1], m[2]); rig.rotation.set(m[4] || 0, m[3], m[5] || 0, 'YXZ');
    } else {
      if (!S.frys) S.s += FART * dt;
      if (S.s >= S.len) { S.tur = false; rig.visible = false; S.vent = 150 + Math.random() * 120; return; }
      punkt(S.s, P, T); punkt(Math.min(S.len, S.s + 6), T2);
      const yaw = yawAf(T), yaw2 = Math.atan2(T2.x - P.x, T2.z - P.z), drej_ = vinkel(yaw2 - yaw);
      rig.position.copy(P); rig.position.y += Math.sin(t * 1.1) * 0.35;
      const hz = Math.hypot(T.x, T.z), pitch = -Math.atan2(T.y, hz) * 0.8, bank = Math.max(-0.38, Math.min(0.38, -drej_ * 1.6));
      rig.rotation.set(pitch, yaw, rig.rotation.z + (bank - rig.rotation.z) * Math.min(1, dt * 2), 'YXZ');
    }
    cam.copy(camera.position);
    const d = cam.distanceTo(rig.position); S.afst = d;
    const vis = !ind && d < 380;
    rig.visible = vis;
    if (!vis) { if (gnist.visible) gnister(dt, pos, false); return; }
    // Santa turns his head towards the camera when it is near
    const til = Math.atan2(cam.x - rig.position.x, cam.z - rig.position.z); S.kig = Math.max(-0.8, Math.min(0.8, vinkel(til - rig.rotation.y)));
    poser(dt, t, d < 90);
    if (M.meshes[1]) M.meshes[1].visible = d < 80;   // the outline is thinner than a pixel further away
    for (const s of glod) { const k = Math.min(1, d / 60); s.scale.setScalar(s.userData.str * (1 + k * 1.6)); }   // a little bigger far away, so the glow still shows
    gnister(dt, pos, true);
    // sound: bells with every stride, and Ho ho ho once on some passes when he comes close
    const vol = 0.045 * Math.pow(Math.max(0, 1 - d / 190), 2);
    S.klokke -= dt;
    if (S.klokke <= 0) { S.klokke = 1 / 1.45 * (0.85 + Math.random() * 0.3); if (vol > 0.002 && !S.frys) klokker(vol); }
    if (S.ho > 0) S.ho -= dt;
    if (!S.sagt && d < 55 && !S.manuel) {
      S.sagt = true; S.ho = 1.1; hohoho(Math.max(0.35, 1 - d / 90));
      const el = typeof document !== 'undefined' && document.getElementById('toast');
      if (el && el.hidden) toast('Ho ho ho! Glædelig jul!');
    }
  }

  // for testing: start a pass on a route (0 or 1) and direction (1 or -1) at a distance s along it, or place the team by hand
  const test = {
    S, RUTER, kurver,
    start: (nr = 0, ret = 1, s = 0) => { start(nr, ret); S.s = s; return { len: +S.len.toFixed(1) }; },
    stil: (x, y, z, yaw = 0, pitch = 0, roll = 0) => { klar(); S.manuel = [x, y, z, yaw, pitch, roll]; },
    slip: () => { S.manuel = null; },
    info: () => ({ tur: S.tur, s: +S.s.toFixed(1), len: +S.len.toFixed(1), vent: +S.vent.toFixed(1), afst: +S.afst.toFixed(1), vis: rig.visible, pos: rig.position.toArray().map(v => +v.toFixed(1)), tris: M ? M.tris : 0, ms: S.byggetMs, ture: S.ture }),
    punkt: (nr, u) => kurver[nr].getPointAt(u).toArray(),
  };
  return { update, test, rig };
}
