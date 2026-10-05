// Henter kortdata fra OpenStreetMap (Overpass) og laver dem om til de korte linjer i konstanten OSM i index.html.
// Kør i browserens konsol på en side fra https://overpass-api.de (fx /api/status). Resultatet ligger i window.__txt.
// Udarbejdet med AI (Claude) og med begrænset mennesketjek. Kortdata: © OpenStreetMap-bidragydere (ODbL).
(async () => {
  const S = 55.6722, W = 12.5718, N = 55.6800, E = 12.5872, bb = `${S},${W},${N},${E}`;
  const q = `[out:json][timeout:60];(way["building"](${bb});relation["building"](${bb});way["natural"="water"](${bb});relation["natural"="water"](${bb});way["highway"](${bb});way["man_made"="bridge"](${bb});way["place"="square"](${bb});way["leisure"~"park|garden|pitch"](${bb});way["landuse"~"grass"](${bb}););out geom;`;
  const d = await (await fetch('/api/interpreter', { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })).json();
  // meter: x mod øst, z mod syd, (0,0) = 55.6761 N, 12.5800 E
  const lat0 = 55.6761, lon0 = 12.5800, ky = 111320, kx = 111320 * Math.cos(lat0 * Math.PI / 180);
  const P = g => g.map(p => [(p.lon - lon0) * kx, -(p.lat - lat0) * ky]);
  const X0 = (W - lon0) * kx, X1 = (E - lon0) * kx, Z0 = -(N - lat0) * ky, Z1 = -(S - lat0) * ky;
  const GAME = [-300, 330, -262, 345];   // bygninger tages med, hvis midten ligger her
  function clip(pts) { let out = pts; const ed = [[p => p[0] >= X0, (a, b) => [X0, a[1] + (X0 - a[0]) / (b[0] - a[0]) * (b[1] - a[1])]], [p => p[0] <= X1, (a, b) => [X1, a[1] + (X1 - a[0]) / (b[0] - a[0]) * (b[1] - a[1])]], [p => p[1] >= Z0, (a, b) => [a[0] + (Z0 - a[1]) / (b[1] - a[1]) * (b[0] - a[0]), Z0]], [p => p[1] <= Z1, (a, b) => [a[0] + (Z1 - a[1]) / (b[1] - a[1]) * (b[0] - a[0]), Z1]]]; for (const [inn, ix] of ed) { const inp = out; out = []; if (!inp.length) break; let s = inp[inp.length - 1]; for (const e of inp) { if (inn(e)) { if (!inn(s)) out.push(ix(s, e)); out.push(e); } else if (inn(s)) out.push(ix(s, e)); s = e; } } return out; }
  function dp(pts, tol) { if (pts.length < 3) return pts; const keep = pts.map(() => false); keep[0] = keep[pts.length - 1] = true; const st = [[0, pts.length - 1]]; while (st.length) { const [a, b] = st.pop(); let md = 0, mi = -1; const [ax, az] = pts[a], [bx, bz] = pts[b], L = Math.hypot(bx - ax, bz - az) || 1e-9; for (let i = a + 1; i < b; i++) { const dd = Math.abs((bx - ax) * (az - pts[i][1]) - (ax - pts[i][0]) * (bz - az)) / L; if (dd > md) { md = dd; mi = i; } } if (md > tol) { keep[mi] = true; st.push([a, mi], [mi, b]); } } return pts.filter((p, i) => keep[i]); }
  function simp(p, tol, closed) { if (closed && p.length > 3) { let fi = 0, fd = -1; p.forEach((q, i) => { const dd = Math.hypot(q[0] - p[0][0], q[1] - p[0][1]); if (dd > fd) { fd = dd; fi = i; } }); const a = dp(p.slice(0, fi + 1), tol), b = dp(p.slice(fi).concat([p[0]]), tol); return a.concat(b.slice(1, -1)); } return closed ? p : dp(p, tol); }
  const R = p => p.map(q => [Math.round(q[0]), Math.round(q[1])]).filter((q, i, a) => !i || q[0] !== a[i - 1][0] || q[1] !== a[i - 1][1]);
  const open = g => { const p = P(g); if (p.length > 2 && p[0][0] === p[p.length - 1][0] && p[0][1] === p[p.length - 1][1]) p.pop(); return p; };
  const ring = (g, tol, c) => { let p = open(g); if (c) p = clip(p); p = R(simp(p, tol, true)); if (p.length > 1 && p[0][0] === p[p.length - 1][0] && p[0][1] === p[p.length - 1][1]) p.pop(); return p; };
  const enc = p => p.map((q, i) => i ? (q[0] - p[i - 1][0]) + ',' + (q[1] - p[i - 1][1]) : q[0] + ',' + q[1]).join(' ');
  function join(ms) { const segs = ms.filter(m => m.geometry).map(m => m.geometry.slice()), out = []; while (segs.length) { let cur = segs.shift(); for (let g = 0; g < 500; g++) { const a = cur[0], b = cur[cur.length - 1]; if (a.lat === b.lat && a.lon === b.lon && cur.length > 3) break; const i = segs.findIndex(s => (s[0].lat === b.lat && s[0].lon === b.lon) || (s[s.length - 1].lat === b.lat && s[s.length - 1].lon === b.lon)); if (i < 0) break; const s = segs.splice(i, 1)[0]; cur = cur.concat((s[0].lat === b.lat && s[0].lon === b.lon ? s : s.slice().reverse()).slice(1)); } out.push(cur); } return out; }
  const cen = p => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
  const area = p => Math.abs(p.reduce((s, q, i) => { const r = p[(i + 1) % p.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0) / 2);
  const inG = ([x, z]) => x >= GAME[0] && x <= GAME[1] && z >= GAME[2] && z <= GAME[3];
  const SKIP = ['footway', 'path', 'steps', 'cycleway', 'corridor', 'platform', 'elevator', 'service'];
  const KIND = { residential: 'res', tertiary: 'ter', unclassified: 'unc', pedestrian: 'ped', living_street: 'liv' };
  const L = [];
  for (const el of d.elements) {
    const t = el.tags || {}, nm = t.name || '';
    if (t.building) {
      const rings = el.type === 'way' ? [el.geometry] : [...join(el.members.filter(m => m.role === 'outer')), ...join(el.members.filter(m => m.role === 'inner'))];
      const rr = rings.map(g => R(simp(open(g), nm ? 1.2 : 1.8, true))).filter(r => r.length > 2);
      if (!rr.length || !inG(cen(rr[0])) || (area(rr[0]) < 60 && !nm)) continue;
      L.push(['B', nm, t.height || '', t['building:levels'] || '', (el.type === 'way' ? rr.slice(0, 1) : rr).map(enc).join('|')].join(';'));
    } else if (t.natural === 'water') {
      for (const g of el.type === 'way' ? [el.geometry] : join(el.members.filter(m => m.role === 'outer'))) { const p = ring(g, 1.5, true); if (p.length > 2) L.push(['W', nm, enc(p)].join(';')); }
    } else if (t.highway && el.type === 'way') {
      const p = R(dp(P(el.geometry), 1.5)); if (!p.some(inG)) continue;
      if (!t.bridge && (!nm || SKIP.includes(t.highway) || t.area === 'yes')) continue;
      L.push(['R', nm, KIND[t.highway] || t.highway, t.bridge ? 1 : 0, enc(p)].join(';'));
    } else if (t.man_made === 'bridge' || t.place === 'square' || t.leisure || t.landuse) {
      const p = ring(el.geometry, 1.2, true); if (p.length < 3 || !p.some(inG)) continue;
      L.push(['A', t.man_made === 'bridge' ? 'bridge' : t.place === 'square' ? 'square' : (t.leisure || t.landuse), nm, enc(p)].join(';'));
    }
  }
  window.__txt = L.join('\n');
  console.log(L.length + ' linjer, ' + window.__txt.length + ' tegn. Kopier window.__txt ind i OSM i index.html.');
})();
