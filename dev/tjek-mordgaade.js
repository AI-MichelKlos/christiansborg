// Checks mordgaade.js for holes in the logic and writes a readable copy to dev/MANUSKRIPT.md.
// Run from the repository root or anywhere:   node dev/tjek-mordgaade.js
// Options:  --runs=N   number of random playthroughs per mode (default 2000)
//           --seed=N   seed for the random playthroughs (default 1)
// The playthroughs pick random available actions until the reveal can start. A playthrough that runs
// out of actions before that is a "fastlåsning" (the player is stuck), and the check fails.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const arg = (k, d) => { const a = process.argv.find(s => s.startsWith(`--${k}=`)); return a ? Number(a.split('=')[1]) : d; };
const RUNS = arg('runs', 2000), SEED = arg('seed', 1);
// --fil=sti lets the check run on another copy of the manuscript (used to test the check itself)
const filArg = process.argv.find(s => s.startsWith('--fil='));
const kilde = filArg ? resolve(filArg.slice(6)) : join(root, 'mordgaade.js');
// mordgaade.js is a browser module. It is loaded as text so Node needs no package.json to read it.
const { MANUS } = await import('data:text/javascript;charset=utf-8,' + encodeURIComponent(readFileSync(kilde, 'utf8')));
const skrivMd = !filArg;

const M = MANUS;
const fejl = [], advarsler = [];
const F = (s) => fejl.push(s), A = (s) => advarsler.push(s);

// ------------------------------------------------------------------ conditions and effects
function parseTerm(raw) {
  let s = raw.trim(), neg = false;
  if (s.startsWith('!')) { neg = true; s = s.slice(1); }
  if (s === 'lag1942') return { neg, kind: 'lag', raw };
  let m = s.match(/^akt(>=|<=|==)(\d)$/);
  if (m) return { neg, kind: 'akt', op: m[1], val: +m[2], raw };
  m = s.match(/^(spor|ting|flag|sted):([\w]+)$/);
  if (m) return { neg, kind: m[1], val: m[1] === 'spor' ? +m[2] : m[2], raw };
  F(`Ukendt betingelse: "${raw}"`);
  return { neg, kind: 'ukendt', raw };
}
const condCache = new WeakMap(), effCache = new WeakMap();
function parseCond(list) {
  if (!list) return [];
  let c = condCache.get(list);
  if (!c) { c = list.map(item => String(item).split('|').map(parseTerm)); condCache.set(list, c); }
  return c;
}
function parseEffects(list) {
  if (!list) return [];
  let c = effCache.get(list);
  if (!c) { c = list.map(parseEffect).filter(Boolean); effCache.set(list, c); }
  return c;
}
function parseEffect(raw) {
  const m = raw.match(/^([+-]?)(spor|ting|flag|akt):([\w]+)$/);
  if (!m) { F(`Ukendt virkning: "${raw}"`); return null; }
  const [, sign, kind, v] = m;
  if (kind === 'ting' && !sign) F(`Virkning på ting skal have + eller -: "${raw}"`);
  return { sign, kind, val: kind === 'spor' || kind === 'akt' ? +v : v, raw };
}

// Requirements to be at a place: its own and its parents' aaben and laas.
const stedCache = new Map();
function stedReq(id) {
  if (!stedCache.has(id)) stedCache.set(id, stedReqRaw(id));
  return stedCache.get(id);
}
function stedReqRaw(id, seen = new Set()) {
  const s = M.steder[id];
  if (!s) { F(`Ukendt sted: "${id}"`); return []; }
  if (seen.has(id)) { F(`Stedet "${id}" ligger inde i sig selv`); return []; }
  seen.add(id);
  const own = [...(s.aaben || []), ...((s.laas && s.laas.kraever) || [])];
  return s.inde_i ? [...stedReqRaw(s.inde_i, seen), ...own] : own;
}

function newState(lag) {
  return { akt: 1, spor: new Set(), ting: new Set(M.start.ting), flag: new Set(), lag };
}
const clone = s => ({ akt: s.akt, spor: new Set(s.spor), ting: new Set(s.ting), flag: new Set(s.flag), lag: s.lag });
const sig = s => `${s.akt}|${[...s.spor].sort((a, b) => a - b)}|${[...s.ting].sort()}|${[...s.flag].sort()}`;

function termTrue(t, s) {
  let v;
  switch (t.kind) {
    case 'lag': v = s.lag; break;
    case 'akt': v = t.op === '>=' ? s.akt >= t.val : t.op === '<=' ? s.akt <= t.val : s.akt === t.val; break;
    case 'spor': v = s.spor.has(t.val); break;
    case 'ting': v = s.ting.has(t.val); break;
    case 'flag': v = s.flag.has(t.val); break;
    case 'sted': v = condTrue(stedReq(t.val), s); break;
    default: v = false;
  }
  return t.neg ? !v : v;
}
function condTrue(list, s) { return parseCond(list).every(alts => alts.some(t => termTrue(t, s))); }
function changes(effects, s) {
  for (const e of parseEffects(effects)) {
    if (e.kind === 'spor' && !s.spor.has(e.val)) return true;
    if (e.kind === 'akt' && s.akt !== e.val) return true;
    if (e.kind === 'ting' && (e.sign === '-') === s.ting.has(e.val)) return true;
    if (e.kind === 'flag' && (e.sign === '-') === s.flag.has(e.val)) return true;
  }
  return false;
}
function apply(effects, s) {
  for (const e of parseEffects(effects)) {
    if (e.kind === 'spor') s.spor.add(e.val);
    else if (e.kind === 'akt') s.akt = e.val;
    else if (e.kind === 'ting') { if (e.sign === '-') s.ting.delete(e.val); else s.ting.add(e.val); }
    else if (e.kind === 'flag') { if (e.sign === '-') s.flag.delete(e.val); else s.flag.add(e.val); }
  }
}

// ------------------------------------------------------------------ all actions in the story
const actions = [];
for (const [pid, p] of Object.entries(M.personer)) {
  for (const [akt, sted] of Object.entries(p.steder || {})) {
    for (const e of p.emner || []) {
      if (e.hjaelp) continue;
      actions.push({ type: 'emne', navn: `${p.navn}: ${e.spoerg}`, akt: +akt, kraever: [`akt==${akt}`, ...(p.kraever || []), ...stedReq(sted), ...(e.kraever || [])], giver: e.giver || [] });
    }
  }
}
for (const u of M.undersoeg) actions.push({ type: 'undersoeg', navn: `${M.steder[u.sted]?.navn || u.sted}: ${u.navn}`, kraever: [...stedReq(u.sted), ...(u.kraever || [])], giver: u.giver || [] });
for (const b of M.begivenheder) {
  const hasSted = (b.naar || []).some(x => /(^|\|)!?sted:/.test(x));
  actions.push({ type: 'begivenhed', auto: !hasSted, navn: `Begivenhed: ${b.id}`, kraever: [...(b.naar || []), `!flag:beg_${b.id}`], giver: [...(b.giver || []), `flag:beg_${b.id}`] });
}
M.akter.forEach((a, i) => { if (i > 0) actions.push({ type: 'akt', auto: true, navn: `Akt ${a.nr} begynder: ${a.navn}`, kraever: [`akt==${a.nr - 1}`, ...a.kraever], giver: [`akt:${a.nr}`] }); });

const finalCond = [...(M.afsloering.kraever || []), ...stedReq(M.afsloering.sted)];
function revealReady(s) {
  if (!condTrue(finalCond, s)) return false;
  return M.afsloering.spoergsmaal.every(q => q.gyldigeSpor.filter(n => s.spor.has(n)).length >= q.minSpor);
}

// ------------------------------------------------------------------ static checks
// 1. texts: no dash, no double spaces, not too long
function walk(o, path, f) {
  if (typeof o === 'string') f(o, path);
  else if (Array.isArray(o)) o.forEach((x, i) => walk(x, `${path}[${i}]`, f));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`, f);
}
walk(M, 'MANUS', (s, path) => {
  if (/[–—]/.test(s)) F(`Tankestreg i ${path}: "${s.slice(0, 60)}"`);
  if (/ {2}/.test(s)) A(`Dobbelt mellemrum i ${path}`);
  if (s !== s.trim()) A(`Mellemrum i starten eller slutningen af ${path}`);
});
// 2. lines: known speakers and sensible length
const speakers = new Set([...Object.keys(M.personer), 'ida', 'fortaeller']);
const allLines = [];
function lines(list, where) {
  for (const r of list || []) {
    if (!Array.isArray(r) || r.length !== 2) { F(`Replik har forkert form i ${where}`); continue; }
    if (!speakers.has(r[0])) F(`Ukendt person "${r[0]}" i ${where}`);
    if (r[1].length > 240) A(`Lang replik (${r[1].length} tegn) i ${where}: "${r[1].slice(0, 50)}..."`);
    allLines.push(r);
  }
}
lines(M.start.replikker, 'start');
for (const [pid, p] of Object.entries(M.personer)) for (const e of p.emner) lines(e.replikker, `${pid}.${e.id}`);
for (const u of M.undersoeg) lines(u.replikker, `undersoeg ${u.id}`);
for (const b of M.begivenheder) lines(b.replikker, `begivenhed ${b.id}`);
lines(M.fanget1942.replikker, 'fanget1942');
lines(M.afsloering.intro, 'afsløringens intro'); lines(M.afsloering.tilstaaelse, 'tilståelsen'); lines(M.afsloering.treForkerte, 'tre forkerte');
lines([M.afsloering.forkertSpor], 'forkert spor');
for (const q of M.afsloering.spoergsmaal) for (const a of q.svar) if (a.protest) lines([a.protest], `protest ${q.id}.${a.id}`);
lines(M.efterskrift.replikker, 'efterskrift'); lines(M.efterskrift.ordenUde.replikker, 'efterskrift, ordenen');
// 3. ids: unique and known
const ids = new Set();
for (const u of M.undersoeg) { if (ids.has(u.id)) F(`Undersøg-id bruges to gange: ${u.id}`); ids.add(u.id); if (!M.steder[u.sted]) F(`Ukendt sted for ${u.id}: ${u.sted}`); }
for (const [pid, p] of Object.entries(M.personer)) {
  const e2 = new Set(); for (const e of p.emner) { if (e2.has(e.id)) F(`Emne-id bruges to gange hos ${pid}: ${e.id}`); e2.add(e.id); }
  for (const s of Object.values(p.steder || {})) if (!M.steder[s]) F(`Ukendt sted for ${pid}: ${s}`);
}
for (const [id, s] of Object.entries(M.steder)) if (s.inde_i && !M.steder[s.inde_i]) F(`Stedet ${id} ligger i ukendt sted ${s.inde_i}`);
for (const n of Object.keys(M.spor)) if (!(+n >= 1)) F(`Mærkeligt spor-nummer: ${n}`);
// 4. every condition and effect: known spor, ting, places and flags
const condLists = [], effectLists = [];
const pushC = (l, w) => condLists.push([l || [], w]), pushE = (l, w) => effectLists.push([l || [], w]);
for (const a of actions) { pushC(a.kraever, a.navn); pushE(a.giver, a.navn); }
for (const [pid, p] of Object.entries(M.personer)) for (const n of p.noter || []) pushC(n.kraever, `noter ${pid}`);
for (const t of M.tidslinje) pushC(t.kraever, `tidslinje ${t.kl}`);
for (const [n, s] of Object.entries(M.spor)) if (s.opdatering) pushC(s.opdatering.kraever, `spor ${n}`);
for (const h of M.hint) pushC(h.naar, `hint "${h.tekst.slice(0, 30)}"`);
// every hint also has a goal for the corner of the screen (maal) and a place (hen) for the arrow, or null
for (const h of M.hint) {
  if (typeof h.maal !== 'string' || !h.maal.trim()) F(`Hint uden mål: "${h.tekst.slice(0, 40)}"`);
  else if (h.maal.length > 70) A(`Langt mål (${h.maal.length} tegn): "${h.maal}"`);
  if (h.hen !== null && !M.steder[h.hen]) F(`Ukendt sted "${h.hen}" i målet "${h.maal}"`);
}
pushC(M.efterskrift.ordenUde.kraever, 'efterskrift');
pushC(M.afsloering.kraever, 'afsløringen');
pushE(M.fanget1942.giver, 'fanget1942');
const flagUsed = new Map(), flagMade = new Map(), sporMade = new Set(), tingMade = new Set(M.start.ting), tingUsed = new Set();
for (const [list, w] of condLists) for (const alts of parseCond(list)) for (const t of alts) {
  if (t.kind === 'spor' && !M.spor[t.val]) F(`Ukendt spor ${t.val} i ${w}`);
  if (t.kind === 'ting') { if (!M.ting[t.val]) F(`Ukendt ting "${t.val}" i ${w}`); tingUsed.add(t.val); }
  if (t.kind === 'sted' && !M.steder[t.val]) F(`Ukendt sted "${t.val}" i ${w}`);
  if (t.kind === 'flag') { if (!flagUsed.has(t.val)) flagUsed.set(t.val, w); }
}
for (const [list, w] of effectLists) for (const raw of list) {
  const e = parseEffect(raw); if (!e) continue;
  if (e.kind === 'spor') { if (!M.spor[e.val]) F(`Ukendt spor ${e.val} i ${w}`); sporMade.add(e.val); }
  if (e.kind === 'ting') { if (!M.ting[e.val]) F(`Ukendt ting "${e.val}" i ${w}`); if (e.sign === '+') tingMade.add(e.val); }
  if (e.kind === 'flag' && e.sign !== '-' && !flagMade.has(e.val)) flagMade.set(e.val, w);
}
for (const [f, w] of flagUsed) if (!flagMade.has(f) && !f.startsWith('beg_')) F(`Flaget "${f}" bruges i ${w}, men intet sætter det`);
const flagOnlyInfo = [...flagMade.keys()].filter(f => !flagUsed.has(f) && !f.startsWith('beg_'));
for (const n of Object.keys(M.spor)) if (!sporMade.has(+n)) F(`Spor ${n} kan ikke findes nogen steder`);
for (const id of Object.keys(M.ting)) { if (!tingMade.has(id)) F(`Tingen "${id}" kan ikke fås nogen steder`); if (!tingUsed.has(id) && !M.start.ting.includes(id)) A(`Tingen "${id}" bruges ikke til noget`); }
// 5. places in the game: is every "bygget" place really in index.html?
const html = readFileSync(join(root, 'index.html'), 'utf8');
const mangler = [], skalBygges = [];
for (const [id, s] of Object.entries(M.steder)) {
  if (s.status === 'skal bygges') { skalBygges.push(`${s.navn} (${id})`); continue; }
  const [kind, rest] = s.spil.split(':').map(x => x.trim());
  const tokens = kind === 'inde' ? rest.split('/') : [rest];
  for (const t of tokens) if (!html.includes(`'${t}'`) && !html.includes(`"${t}"`)) mangler.push(`${s.navn}: "${t}" findes ikke i index.html`);
}
for (const m of mangler) F(m);
// 6. persons: present in act n but gone in act n+1 (before the last act) is a risk
for (const [pid, p] of Object.entries(M.personer)) {
  const akts = Object.keys(p.steder).map(Number).sort();
  for (let a = akts[0]; a < Math.min(3, Math.max(...akts)); a++) if (!p.steder[a + 1] && p.steder[a]) A(`${p.navn} er med i akt ${a}, men ikke i akt ${a + 1}`);
}

// ------------------------------------------------------------------ reachability and random playthroughs
let seed = SEED;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const hintFor = s => M.hint.find(h => condTrue(h.naar, s));

function forced(s, steps) {
  for (let guard = 0; guard < 100; guard++) {
    let moved = false;
    for (const a of actions) if (a.auto && changes(a.giver, s) && condTrue(a.kraever, s)) {
      apply(a.giver, s); steps.push(a.navn); moved = true;
    }
    if (!moved) return;
  }
}
function playthrough(lag) {
  const s = newState(lag), steps = [], seen = new Set();
  let manglerHint = null;
  for (let i = 0; i < 4000; i++) {
    forced(s, steps);
    if (revealReady(s)) return { ok: true, steps, s, manglerHint };
    if (!manglerHint && !hintFor(s)) manglerHint = { state: sig(s), efter: steps.slice(-3) };
    seen.add(sig(s));
    const opts = [];
    for (const a of actions) if (!a.auto && changes(a.giver, s) && condTrue(a.kraever, s)) {
      const t = clone(s); apply(a.giver, t);
      opts.push({ a, fresh: !seen.has(sig(t)) });
    }
    if (!opts.length) return { ok: false, grund: 'fastlåst', steps, s };
    const fresh = opts.filter(o => o.fresh), pool = fresh.length ? fresh : opts;
    const pick = pool[Math.floor(rnd() * pool.length)].a;
    apply(pick.giver, s); steps.push(pick.navn);
  }
  return { ok: false, grund: 'for mange skridt', steps, s };
}
// optimistic reachability: everything that can ever be found, ignoring that things are given away
function reachable(lag) {
  const s = newState(lag); const acts = new Set([1]);
  const opt = (list) => parseCond(list).every(alts => alts.some(t => t.neg || (t.kind === 'akt' ? [...acts].some(a => t.op === '>=' ? a >= t.val : t.op === '<=' ? a <= t.val : a === t.val) : t.kind === 'sted' ? opt(stedReq(t.val)) : termTrue(t, s))));
  for (let changed = true; changed;) {
    changed = false;
    for (const a of actions) if (opt(a.kraever)) {
      const before = sig(s) + [...acts];
      for (const raw of a.giver) { const e = parseEffect(raw); if (!e || e.sign === '-') continue; if (e.kind === 'akt') acts.add(e.val); else apply([raw], s); }
      if (sig(s) + [...acts] !== before) changed = true;
    }
  }
  return { s, acts };
}

const modes = [{ lag: false, navn: 'uden 1942-laget' }, { lag: true, navn: 'med 1942-laget' }];
const resultater = [];
for (const mode of modes) {
  const r = reachable(mode.lag);
  const sporMiss = Object.keys(M.spor).map(Number).filter(n => !r.s.spor.has(n));
  const tingMiss = Object.entries(M.ting).filter(([id, t]) => (mode.lag || !t.lag1942) && !r.s.ting.has(id)).map(([id]) => id);
  const aktMiss = M.akter.map(a => a.nr).filter(n => !r.acts.has(n));
  if (sporMiss.length) F(`${mode.navn}: spor der aldrig kan findes: ${sporMiss.join(', ')}`);
  if (tingMiss.length) F(`${mode.navn}: ting der aldrig kan fås: ${tingMiss.join(', ')}`);
  if (aktMiss.length) F(`${mode.navn}: akter der aldrig begynder: ${aktMiss.join(', ')}`);
  let ok = 0, best = null; const stuck = [], noHint = [];
  for (let i = 0; i < RUNS; i++) {
    const p = playthrough(mode.lag);
    if (p.ok) { ok++; if (!best || p.steps.length < best.steps.length) best = p; if (p.manglerHint) noHint.push(p.manglerHint); }
    else stuck.push(p);
  }
  if (stuck.length) {
    const p = stuck[0];
    F(`${mode.navn}: ${stuck.length} af ${RUNS} gennemspilninger gik i stå (${p.grund}). Første gang efter: ${p.steps.slice(-6).join(' → ')}. Tilstand: ${sig(p.s)}`);
  }
  if (noHint.length) F(`${mode.navn}: ${noHint.length} gennemspilninger nåede en tilstand uden hint, fx efter ${noHint[0].efter.join(' → ')} (${noHint[0].state})`);
  resultater.push({ ...mode, ok, stuck: stuck.length, best });
}

// ------------------------------------------------------------------ the readable manuscript
const P = M.personer;
const who = id => id === 'ida' ? 'Ida' : P[id] ? (P[id].kort || P[id].navn.split(' ')[0]) : id;
const sporNavn = n => `spor ${n} (${M.spor[n]?.titel || '?'})`;
const tingNavn = id => M.ting[id]?.navn || id;
// flag names are written without æ, ø and å; put them back for the readable copy
const flagNavn = f => `»${f.replace(/_/g, ' ').replace(/aa/g, 'å').replace(/oe/g, 'ø').replace(/ae/g, 'æ')}«`;
function termTxt(t) {
  const n = t.neg;
  switch (t.kind) {
    case 'lag': return n ? '1942-laget er slået fra' : '1942-laget er slået til';
    case 'akt': return t.op === '>=' ? `akt ${t.val} eller senere` : t.op === '<=' ? `akt ${t.val} eller før` : `akt ${t.val}`;
    case 'spor': return (n ? 'mangler ' : '') + sporNavn(t.val);
    case 'ting': return (n ? 'har ikke ' : 'har ') + tingNavn(t.val);
    case 'flag': return (n ? 'endnu ikke ' : '') + flagNavn(t.val);
    case 'sted': return `Ida er ved ${M.steder[t.val]?.navn || t.val}`;
    default: return t.raw;
  }
}
const condTxt = list => parseCond(list).map(alts => alts.map(termTxt).join(' eller ')).join(', ');
function effTxt(list) {
  return (list || []).map(raw => { const e = parseEffect(raw); if (!e) return raw;
    if (e.kind === 'spor') return sporNavn(e.val);
    if (e.kind === 'ting') return e.sign === '-' ? `Ida afleverer ${tingNavn(e.val)}` : `Ida får ${tingNavn(e.val)}`;
    if (e.kind === 'flag') return (e.sign === '-' ? 'slutter ' : '') + flagNavn(e.val);
    return raw; }).join(', ');
}
const rep = list => (list || []).map(([h, t]) => h === 'fortaeller' ? `*${t}*` : `**${who(h)}:** ${t}`).join('  \n');
const meta = (k, g) => { const parts = []; if (k && k.length) parts.push(`Kræver: ${condTxt(k)}.`); if (g && g.length) parts.push(`Giver: ${effTxt(g)}.`); return parts.length ? `<small>${parts.join(' ')}</small>\n\n` : ''; };
const out = [];
const o = s => out.push(s);
o(`# ${M.titel}: manuskript\n`);
o(`${M.opdateret} · Michel\n`);
o(`Udarbejdet med AI (Claude) og med begrænset mennesketjek.\n`);
o(`Denne fil laves automatisk af \`dev/tjek-mordgaade.js\` ud fra \`mordgaade.js\`. Ret teksterne i \`mordgaade.js\`, ikke her. Planen for gåden står i \`dev/MORDGAADE.md\`.\n`);
o(`## Tjek af logikken\n`);
for (const r of resultater) o(`- ${r.navn[0].toUpperCase() + r.navn.slice(1)}: ${r.ok} af ${RUNS} tilfældige gennemspilninger nåede frem til afsløringen, ${r.stuck} gik i stå. Den korteste brugte ${r.best ? r.best.steps.length : '?'} skridt.`);
o(`- Fejl: ${fejl.length ? fejl.length : 'ingen'}. Advarsler: ${advarsler.length ? advarsler.length : 'ingen'}.`);
o(`- Steder, der skal bygges: ${skalBygges.join(', ')}.`);
o(`- Personer: ${Object.keys(P).length}. Spor: ${Object.keys(M.spor).length}. Ting: ${Object.keys(M.ting).length}. Ting at undersøge: ${M.undersoeg.length}. Replikker: ${allLines.length}.\n`);
if (fejl.length) { o('Fejl:\n'); for (const f of fejl) o(`- ${f}`); o(''); }
if (advarsler.length) { o('Advarsler:\n'); for (const a of advarsler) o(`- ${a}`); o(''); }
o(`## Start\n`);
o(`Ida starter ved ${(M.steder[M.start.sted]?.navn || M.start.sted)} kl. ${M.start.kl} med ${M.start.ting.map(tingNavn).join(', ').toLowerCase()} i rygsækken.\n`);
o(rep(M.start.replikker) + '\n');
o(`${M.ur.tekst}\n`);
o(`## Akterne\n`);
o(`| Akt | Navn | Tid | Begynder, når |\n| --- | --- | --- | --- |`);
for (const a of M.akter) o(`| ${a.nr} | ${a.navn} | ${a.fra}-${a.til} | ${a.kraever.length ? condTxt(a.kraever) : 'Spillet starter'} |`);
o('');
for (const a of M.akter) o(`**Akt ${a.nr}, ${a.navn}.** ${a.intro}\n`);
const best = resultater[0].best;
if (best) {
  o(`## Eksempel på en gennemspilning\n`);
  o(`Den korteste af de tilfældige gennemspilninger uden 1942-laget. Den kan bruges, når spillet skal testes.\n`);
  best.steps.forEach((s, i) => o(`${i + 1}. ${s}`));
  o('');
}
o(`## Personerne\n`);
for (const [pid, p] of Object.entries(P)) {
  o(`### ${p.navn}${p.alder ? ` (${p.alder})` : ''}${p.lag1942 ? ', kun i 1942-laget' : ''}\n`);
  o(`${p.rolle}. ${p.udseende}\n`);
  o(`Hvor: ${Object.entries(p.steder).map(([a, s]) => `akt ${a}: ${(M.steder[s]?.navn || s)}`).join(', ')}.${p.kraever && p.kraever.length ? ` Med i spillet, når: ${condTxt(p.kraever)}.` : ''}\n`);
  o(`I notesbogen: ${p.noter.map(n => n.tekst).join(' ')}\n`);
  for (const e of p.emner) {
    o(`#### ${e.spoerg}\n`);
    if (e.hjaelp) { o(`Bente giver det første hint fra listen under »Bentes hint«, der passer.\n`); continue; }
    o(meta(e.kraever, e.giver) + rep(e.replikker) + '\n');
  }
}
o(`## Steder og ting at undersøge\n`);
for (const [id, s] of Object.entries(M.steder)) {
  const us = M.undersoeg.filter(u => u.sted === id);
  const lock = [];
  if (s.aaben) lock.push(`Åben, når: ${condTxt(s.aaben)}.${s.lukketTekst ? ` Ellers: »${s.lukketTekst}«` : ''}`);
  if (s.laas) lock.push(`Lås: ${s.laas.kode ? `kode ${s.laas.kode}, ` : ''}${condTxt(s.laas.kraever)}. »${s.laas.tekst}«`);
  if (!us.length && !lock.length) continue;
  o(`### ${s.navn}\n`);
  o(`I spillet: ${s.spil} (${s.status}).${s.inde_i ? ` Ligger i ${(M.steder[s.inde_i]?.navn || s.inde_i)}.` : ''}\n`);
  for (const l of lock) o(`${l}\n`);
  for (const u of us) o(`**${u.navn}**${u.viden ? ' (Idas viden)' : ''}\n\n` + meta(u.kraever, u.giver) + rep(u.replikker) + '\n');
}
o(`## Ting i rygsækken\n`);
o(`| Ting | Beskrivelse |\n| --- | --- |`);
for (const [id, t] of Object.entries(M.ting)) o(`| ${t.navn}${t.findes === 'start' ? ' (fra start)' : ''}${t.lag1942 ? ' (1942)' : ''} | ${t.tekst} |`);
o('');
o(`## Sporene i notesbogen\n`);
o(`| Nr. | Spor | Sted | I notesbogen |\n| --- | --- | --- | --- |`);
for (const [n, s] of Object.entries(M.spor)) o(`| ${n} | ${s.titel} | ${M.steder[s.sted]?.navn || s.sted} | ${s.tekst}${s.opdatering ? ` Senere: ${s.opdatering.tekst}` : ''} |`);
o('');
o(`## Begivenheder\n`);
for (const b of M.begivenheder) o(`### ${b.kl ? `Kl. ${b.kl}: ` : ''}${b.id.replace(/_/g, ' ')}\n\n<small>Sker, når: ${condTxt(b.naar)}.${b.giver && b.giver.length ? ` Giver: ${effTxt(b.giver)}.` : ''}</small>\n\n${rep(b.replikker)}\n`);
o(`### Hvis en patrulje ser Ida i 1942\n\n${rep(M.fanget1942.replikker)}\n`);
o(`## Bentes hint\n`);
o(`Spillet viser det første hint på listen, hvis betingelse passer. Målet i fed skrift står hele tiden øverst på skærmen, og en pil peger hen til stedet.\n`);
M.hint.forEach((h, i) => o(`${i + 1}. **${h.maal}**${h.hen ? ` (${M.steder[h.hen]?.navn || h.hen})` : ''}. ${h.tekst} <small>(${condTxt(h.naar)})</small>`));
o('');
o(`## Afsløringen\n`);
o(`I ${(M.steder[M.afsloering.sted]?.navn || M.afsloering.sted)} kl. ${M.afsloering.kl}. Begynder, når: ${condTxt(M.afsloering.kraever)}.\n`);
o(rep(M.afsloering.intro) + '\n');
for (const q of M.afsloering.spoergsmaal) {
  o(`### ${q.tekst}\n`);
  o(`Spilleren lægger mindst ${q.minSpor} af disse spor frem: ${q.gyldigeSpor.map(sporNavn).join(', ')}.\n`);
  for (const a of q.svar) o(`- ${a.rigtig ? '**Rigtigt:** ' : ''}${a.tekst}${a.protest ? `. ${who(a.protest[0])}: »${a.protest[1]}«` : ''}`);
  o('');
}
o(`Forkert spor: **${who(M.afsloering.forkertSpor[0])}:** ${M.afsloering.forkertSpor[1]}\n`);
o(`Efter tre forkerte svar:\n\n${rep(M.afsloering.treForkerte)}\n`);
o(`### Tilståelsen\n\n${rep(M.afsloering.tilstaaelse)}\n`);
o(`### Stjerner\n`);
for (const [k, v] of Object.entries(M.afsloering.stjerner)) o(`- ${k === 'tre' ? 3 : k === 'to' ? 2 : 1} stjerner: ${v.tekst}`);
o('');
o(`## Efterskrift\n\n${rep(M.efterskrift.replikker)}\n`);
o(`Hvis Elefantordenen ikke er lagt tilbage:\n\n${rep(M.efterskrift.ordenUde.replikker)}\n`);
o(`## Tidslinjen i notesbogen\n`);
o(`| Kl. | Hvad skete | Kommer frem, når |\n| --- | --- | --- |`);
for (const t of M.tidslinje) o(`| ${t.kl} | ${t.tekst} | ${condTxt(t.kraever)} |`);
o('');
o(`## 1942-laget\n\n${M.lag1942.forklaring} Laget er ${M.lag1942.aktiv ? 'slået til' : 'slået fra'}.\n`);
if (skrivMd) writeFileSync(join(here, 'MANUSKRIPT.md'), out.join('\n'));

// ------------------------------------------------------------------ report
console.log(`Manuskript: ${Object.keys(P).length} personer, ${Object.keys(M.spor).length} spor, ${Object.keys(M.ting).length} ting, ${M.undersoeg.length} ting at undersøge, ${allLines.length} replikker.`);
for (const r of resultater) console.log(`${r.navn}: ${r.ok}/${RUNS} gennemspilninger nåede afsløringen, ${r.stuck} gik i stå, korteste ${r.best ? r.best.steps.length : '?'} skridt.`);
if (flagOnlyInfo.length) console.log(`Flag der sættes, men ikke bruges i nogen betingelse (kun til spillet): ${flagOnlyInfo.join(', ')}`);
console.log(`Skal bygges: ${skalBygges.join(', ')}`);
for (const a of advarsler) console.log(`ADVARSEL: ${a}`);
for (const f of fejl) console.log(`FEJL: ${f}`);
console.log(fejl.length ? `\n${fejl.length} fejl.` : `\nIngen fejl.${skrivMd ? ' dev/MANUSKRIPT.md er skrevet.' : ''}`);
process.exit(fejl.length ? 1 : 0);
