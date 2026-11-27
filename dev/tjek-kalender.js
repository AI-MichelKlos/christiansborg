// Checks a calendar edition (arkiv/adventskrans-4-lys.js, or another file given as --fil=..., fx arkiv/julekalender-24-laager.js) for mistakes.
// The hat hunt (nissehuer.js) has its own check: node dev/tjek-nissehuer.js
// Run from anywhere:   node dev/tjek-kalender.js
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const filArg = process.argv.find(a => a.startsWith('--fil='));
const kilde = filArg ? resolve(filArg.slice(6)) : join(root, 'arkiv', 'adventskrans-4-lys.js');
const { KALENDER: K } = await import(pathToFileURL(kilde).href);
const { TEGNINGER } = await import(pathToFileURL(join(root, 'tegninger.js')).href);
const fejl = [], bem = [];
const tekst = readFileSync(kilde, 'utf8');
if (/[–—]/.test(tekst)) fejl.push('Filen indeholder tankestreg. Brug bindestreg.');
for (const k of ['id', 'titel', 'overskrift', 'forside', 'gemTekst', 'start', 'hjaelp', 'soendage', 'proeve', 'slut', 'laager']) if (!K[k]) fejl.push('Mangler: ' + k);
if ((K.soendage || []).length !== 4) fejl.push('Der skal være fire søndage.');
const KR = K.spil === 'krans', MAX = KR ? (K.laager || []).length : 24;
if (KR && !(K.adventskrans && Array.isArray(K.adventskrans.ved))) fejl.push('Et spil med lys skal have en adventskrans { ved }.');
const set = new Set(), INDGANGE = ['folketing', 'tower', 'finance', 'reform', 'reformSide', 'riddersal', 'stables', 'courtEntry', 'pmEntry'];
const replikker = (r, hvor) => { if (!Array.isArray(r) || !r.length || r.some(x => !Array.isArray(x) || x.length !== 2)) fejl.push(hvor + ': replikker skal være en liste af [hvem, tekst].'); };
for (const l of K.laager || []) {
  const h = 'Låge ' + l.nr;
  if (!Number.isInteger(l.nr) || l.nr < 1 || l.nr > MAX) fejl.push(h + ': nr skal være 1-' + MAX + '.');
  if (set.has(l.nr)) fejl.push(h + ': nummeret er brugt to gange.'); set.add(l.nr);
  if (!['stor', 'lille', 'mini'].includes(l.type)) fejl.push(h + ': type skal være stor, lille eller mini.');
  for (const k of KR ? ['navn', 'praj'] : ['navn', 'praj', 'stykke']) if (!l[k]) fejl.push(h + ': mangler ' + k + '.');
  replikker(l.bag, h + ' (bag)');
  if (!l.ting || !l.ting.navn || !l.ting.billede) fejl.push(h + ': mangler ting { navn, billede }. Der skal ligge en genstand bag hver låge.');
  else if (!l.ting.billede.startsWith('<svg') && !TEGNINGER[l.ting.billede]) fejl.push(h + ': tegningen ' + l.ting.billede + ' findes ikke i tegninger.js. Vælg en af ' + Object.keys(TEGNINGER).join(', ') + '.');
  if (l.type === 'stor') {
    if (!INDGANGE.includes(l.indgang)) fejl.push(h + ': indgang skal være en af ' + INDGANGE.join(', ') + '.');
    if (!K.nisser || !K.nisser[l.nisse]) fejl.push(h + ': nissen ' + l.nisse + ' findes ikke i nisser.');
    if (!l.inde || !l.inde.place || !Array.isArray(l.inde.at)) fejl.push(h + ': mangler inde { place, at }.');
    const g = l.gaade;
    if (KR && g && !g.spoergsmaal) { replikker(g.foer, h + ' (gaade.foer)'); replikker(g.efter, h + ' (gaade.efter)'); }
    else if (!g || !g.spoergsmaal || !Array.isArray(g.svar)) fejl.push(h + ': mangler gaade med spoergsmaal og svar.');
    else {
      replikker(g.foer, h + ' (gaade.foer)'); replikker(g.efter, h + ' (gaade.efter)');
      if (g.svar.filter(s => s.rigtig).length !== 1) fejl.push(h + ': præcis ét svar skal være rigtigt.');
      for (const s of g.svar) if (!s.rigtig && (!Array.isArray(s.replik) || s.replik.length !== 2)) fejl.push(h + ': et forkert svar mangler en replik.');
    }
  } else if (!Array.isArray(l.ved) || l.ved.length !== 2) fejl.push(h + ': mangler ved [x, z].');
}
for (const id of Object.keys((K.fest && K.fest.nisser) || {})) if (!K.nisser[id]) fejl.push('Festen: nissen ' + id + ' findes ikke i nisser.');
const max = Math.max(0, ...set);
for (let n = 1; n <= max; n++) if (!set.has(n)) fejl.push('Låge ' + n + ' mangler. Lågerne åbnes i rækkefølge, så der må ikke være huller.');
const antal = t => (K.laager || []).filter(l => l.type === t).length;
bem.push(KR ? `${set.size} lys, hvert hos sin nisse.` : `${set.size} af 24 låger er skrevet: ${antal('stor')} store, ${antal('lille')} små og ${antal('mini')} mini.`);
for (const b of bem) console.log(b);
if (fejl.length) { console.log('\nFejl:'); for (const f of fejl) console.log('- ' + f); process.exit(1); }
console.log('Ingen fejl.');
