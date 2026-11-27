// Checks the hat hunt (nissehuer.js) for mistakes: the fields the game reads, the hats, the nisser and the texts.
// Run from anywhere:   node dev/tjek-nissehuer.js
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..'), kilde = join(root, 'nissehuer.js');
const { KALENDER: K } = await import(pathToFileURL(kilde).href);
const fejl = [], tekst = readFileSync(kilde, 'utf8');
if (/[–—]/.test(tekst)) fejl.push('Filen indeholder tankestreg. Brug bindestreg.');
if (K.spil !== 'huer') fejl.push('spil skal være "huer".');
for (const k of ['id', 'titel', 'overskrift', 'forside', 'gemTekst', 'start', 'hjaelp', 'hjaelpTitel', 'juletrae', 'huer', 'nisser', 'slut', 'traePraj']) if (!K[k]) fejl.push('Mangler: ' + k);
const replikker = (r, hvor) => { if (!Array.isArray(r) || !r.length || r.some(x => !Array.isArray(x) || x.length !== 2 || typeof x[1] !== 'string')) fejl.push(hvor + ': replikker skal være en liste af [hvem, tekst].'); };
replikker(K.start?.replikker, 'Start'); replikker(K.slut?.tekst, 'Slut');
if (!K.juletrae?.stor || !Array.isArray(K.juletrae?.ved)) fejl.push('Juletræet skal have ved: [x, z] og stor: true.');
const huer = K.huer || [];
if (!huer.length || 24 % huer.length) fejl.push('Antallet af huer skal gå op i 24 (fx 6 eller 8). Nu: ' + huer.length);
const ids = new Set(), STEDER = ['riddersal', 'stables', 'folketing', 'finance', 'reform', 'courtEntry', 'pmEntry'];
for (const h of huer) {
  const n = 'Hue ' + (h.id || '?');
  if (!h.id || ids.has(h.id)) fejl.push(n + ': id mangler eller er brugt to gange.'); ids.add(h.id);
  for (const k of ['navn', 'sted', 'hvor', 'farve', 'nisse']) if (!h[k]) fejl.push(n + ': mangler ' + k + '.');
  const slags = ['ude', 'inde', 'taarn'].filter(k => h[k]);
  if (slags.length !== 1) fejl.push(n + ': skal have præcis én af ude, inde eller taarn.');
  if (h.ude && !(Number.isFinite(h.ude.x) && Number.isFinite(h.ude.z) && Number.isFinite(h.ude.y))) fejl.push(n + ': ude skal have x, z og y.');
  if (h.inde) {
    if (!STEDER.includes(h.inde.place)) fejl.push(n + ': inde.place kendes ikke: ' + h.inde.place);
    if (!h.indgang) fejl.push(n + ': en hue indenfor skal have en indgang (den dør, der skal være åben).');
    for (const w of h.inde.vej || []) if (!Array.isArray(w.til) || typeof w.naar !== 'function') fejl.push(n + ': inde.vej skal være { til: [x, z], naar: (x, z) => ... }.');
  }
  if (h.taarn && !Number.isFinite(h.taarn.f)) fejl.push(n + ': taarn skal have f (retningen fra Udsigten).');
  if (!K.nisser?.[h.nisse]) fejl.push(n + ': nissen ' + h.nisse + ' findes ikke i nisser.');
  if (!h.taarn && !(h.vaert && Number.isFinite(h.vaert.x) && Number.isFinite(h.vaert.z))) fejl.push(n + ': mangler vaert { x, z } (hvor nissen står).');
  replikker(h.historie, n + ' (historie)');
}
for (const id of Object.keys(K.fest?.nisser || {})) if (!K.nisser[id]) fejl.push('Festen: nissen ' + id + ' findes ikke i nisser.');
for (const [id, ns] of Object.entries(K.nisser || {})) if (!ns.navn || !ns.rolle) fejl.push('Nissen ' + id + ': mangler navn eller rolle.');
console.log(`${huer.length} huer, ${Object.keys(K.nisser || {}).length} nisser, ${24 / (huer.length || 1)} lys pr. hue.`);
if (fejl.length) { console.log('Fejl:\n- ' + fejl.join('\n- ')); process.exit(1); } else console.log('Ingen fejl.');
