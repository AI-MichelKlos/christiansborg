// Tegninger af de genstande, der ligger bag lågerne i julekalenderen. De er fælles for alle udgaver.
// En låge peger på en tegning med ting: { navn, billede }, hvor billede er et af navnene herunder.
// En udgave kan også selv tegne: skriv da hele tegningen (den begynder med <svg) i billede.
// Alle tegninger er 120 x 120 og har samme mørke streg, så de passer sammen.
const S = 'stroke="#2a2118" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
const svg = indhold => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="240" height="240">${indhold}</svg>`;

export const TEGNINGER = {
  kaffekop: svg(`
    <path d="M44 30c-6-8 6-10 0-18M60 30c-6-8 6-10 0-18M76 30c-6-8 6-10 0-18" fill="none" stroke="#d8d2c4" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="58" cy="100" rx="42" ry="8" fill="#e6dfcc" ${S}/>
    <path d="M86 56c20-2 20 26 0 26" fill="none" stroke="#2a2118" stroke-width="9" stroke-linecap="round"/>
    <path d="M86 56c20-2 20 26 0 26" fill="none" stroke="#f6f1e4" stroke-width="4" stroke-linecap="round"/>
    <path d="M30 44h56v28a28 26 0 0 1-56 0z" fill="#f6f1e4" ${S}/>
    <ellipse cx="58" cy="44" rx="28" ry="7" fill="#5a3a22" ${S}/>
    <path d="M36 62c0 14 6 22 14 27" fill="none" stroke="#d9d1bd" stroke-width="3" stroke-linecap="round"/>`),
  mandarin: svg(`
    <ellipse cx="60" cy="104" rx="30" ry="5" fill="#000" opacity=".18"/>
    <circle cx="60" cy="68" r="36" fill="#f08a24" ${S}/>
    <path d="M36 62c2-12 10-20 20-22" fill="none" stroke="#f9b866" stroke-width="5" stroke-linecap="round"/>
    <path d="M60 34c2-10 12-18 26-16-2 12-12 18-26 16z" fill="#3f7d45" ${S}/>
    <path d="M60 36v-8" ${S} fill="none"/>
    <g fill="#d5731a"><circle cx="50" cy="80" r="1.6"/><circle cx="64" cy="88" r="1.6"/><circle cx="76" cy="74" r="1.6"/><circle cx="58" cy="66" r="1.6"/><circle cx="72" cy="58" r="1.6"/></g>`),
  briller: svg(`
    <path d="M22 60 8 50M98 60l14-10" fill="none" ${S}/>
    <path d="M52 60c4-6 12-6 16 0" fill="none" ${S}/>
    <circle cx="36" cy="64" r="18" fill="#cfe6ea" fill-opacity=".75" stroke="#2a2118" stroke-width="5"/>
    <circle cx="84" cy="64" r="18" fill="#cfe6ea" fill-opacity=".75" stroke="#2a2118" stroke-width="5"/>
    <path d="M27 58c3-5 8-7 13-6M75 58c3-5 8-7 13-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),
  papir: svg(`
    <path d="M26 18h60l10 10v70l-8 6-8-5-8 6-9-6-8 6-9-6-10 5z" fill="#fbf5e2" ${S}/>
    <path d="M86 18v10h10" fill="#e6dcc0" ${S}/>
    <path d="M38 40h42M38 52h46M38 64h34" fill="none" stroke="#8a8271" stroke-width="3" stroke-linecap="round"/>
    <circle cx="74" cy="82" r="10" fill="none" stroke="#b3262a" stroke-width="3"/>`),
  nissehue: svg(`
    <path d="M24 92c6-40 26-70 56-76 14 8 20 20 18 34-8-10-14-14-20-14 6 18 10 36 14 56z" fill="#b3262a" ${S}/>
    <circle cx="98" cy="52" r="9" fill="#f6f1e4" ${S}/>
    <rect x="16" y="88" width="84" height="16" rx="8" fill="#f6f1e4" ${S}/>`),
  lys: svg(`
    <path d="M60 14c10 12 12 20 0 30-12-10-10-18 0-30z" fill="#f2b73c" ${S}/>
    <path d="M60 28c4 5 4 9 0 13-4-4-4-8 0-13z" fill="#fff3c4"/>
    <path d="M60 44v8" fill="none" ${S}/>
    <rect x="46" y="52" width="28" height="48" rx="3" fill="#b3262a" ${S}/>
    <path d="M52 58v30" fill="none" stroke="#d4605f" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="60" cy="102" rx="30" ry="6" fill="#c9a35a" ${S}/>`),
  noegle: svg(`
    <circle cx="36" cy="44" r="20" fill="#d9b25a" ${S}/>
    <circle cx="36" cy="44" r="8" fill="#fbf5e2" ${S}/>
    <path d="M50 58l44 44M78 86l10-10M88 96l8-8" fill="none" stroke="#2a2118" stroke-width="11" stroke-linecap="round"/>
    <path d="M50 58l44 44M78 86l10-10M88 96l8-8" fill="none" stroke="#d9b25a" stroke-width="5" stroke-linecap="round"/>`),
  gave: svg(`
    <rect x="22" y="50" width="76" height="52" rx="3" fill="#2f6b3f" ${S}/>
    <rect x="16" y="36" width="88" height="18" rx="3" fill="#3f8a52" ${S}/>
    <rect x="52" y="36" width="16" height="66" fill="#b3262a" ${S}/>
    <path d="M60 36c-18-22-34-8-18 0zM60 36c18-22 34-8 18 0z" fill="#b3262a" ${S}/>`),
  hestesko: svg(`
    <path d="M28 104V58a32 32 0 0 1 64 0v46H74V58a14 14 0 0 0-28 0v46z" fill="#9aa3ad" ${S}/>
    <path d="M36 98V60a24 24 0 0 1 12-21" fill="none" stroke="#c9d0d8" stroke-width="4" stroke-linecap="round"/>
    <g fill="#2a2118"><circle cx="37" cy="88" r="2.6"/><circle cx="37" cy="68" r="2.6"/><circle cx="46" cy="42" r="2.6"/><circle cx="74" cy="42" r="2.6"/><circle cx="83" cy="68" r="2.6"/><circle cx="83" cy="88" r="2.6"/></g>`),
  groed: svg(`
    <path d="M46 34c-6-8 6-10 0-18M62 34c-6-8 6-10 0-18M78 34c-6-8 6-10 0-18" fill="none" stroke="#d8d2c4" stroke-width="3" stroke-linecap="round"/>
    <path d="M16 58h88c0 30-18 44-44 44S16 88 16 58z" fill="#b3262a" ${S}/>
    <ellipse cx="60" cy="58" rx="44" ry="12" fill="#fbf5e2" ${S}/>
    <rect x="52" y="50" width="16" height="11" rx="2" fill="#f2c94c" ${S}/>
    <g fill="#9a6a3a"><circle cx="38" cy="58" r="1.6"/><circle cx="46" cy="63" r="1.6"/><circle cx="76" cy="62" r="1.6"/><circle cx="84" cy="56" r="1.6"/><circle cx="72" cy="52" r="1.6"/></g>
    <path d="M30 76c4 10 12 16 22 18" fill="none" stroke="#d4605f" stroke-width="3" stroke-linecap="round"/>`),
  klokke: svg(`
    <path d="M60 14v10" fill="none" ${S}/>
    <circle cx="60" cy="14" r="5" fill="#d9b25a" ${S}/>
    <path d="M30 86c8-8 6-24 8-36a22 22 0 0 1 44 0c2 12 0 28 8 36z" fill="#d9b25a" ${S}/>
    <path d="M42 54c2-10 6-16 14-18" fill="none" stroke="#f3dea0" stroke-width="4" stroke-linecap="round"/>
    <rect x="24" y="84" width="72" height="9" rx="4.5" fill="#c9a35a" ${S}/>
    <circle cx="60" cy="100" r="7" fill="#b3262a" ${S}/>`),
  stjerne: svg(`
    <path d="M60 10l14 32 34 4-26 22 8 34-30-18-30 18 8-34L12 46l34-4z" fill="#f2c94c" ${S}/>
    <path d="M60 28l7 18" fill="none" stroke="#fff3c4" stroke-width="4" stroke-linecap="round"/>`),
  kuglepen: svg(`
    <g transform="rotate(-42 60 60)">
      <rect x="20" y="51" width="66" height="18" rx="5" fill="#2f5a8a" ${S}/>
      <rect x="20" y="51" width="14" height="18" rx="5" fill="#c9a35a" ${S}/>
      <path d="M86 51l20 9-20 9z" fill="#e6dfcc" ${S}/>
      <path d="M100 57.5l6 2.5-6 2.5z" fill="#2a2118"/>
      <path d="M34 47h34" fill="none" stroke="#2a2118" stroke-width="5" stroke-linecap="round"/>
      <path d="M40 57h36" fill="none" stroke="#7fa3cc" stroke-width="3" stroke-linecap="round"/>
    </g>`),
  mus: svg(`
    <path d="M90 84c18 2 22-12 12-20" fill="none" ${S}/>
    <ellipse cx="60" cy="76" rx="34" ry="24" fill="#b9b3ab" ${S}/>
    <circle cx="34" cy="50" r="12" fill="#b9b3ab" ${S}/>
    <circle cx="34" cy="50" r="6" fill="#e9b7b2"/>
    <circle cx="56" cy="44" r="11" fill="#b9b3ab" ${S}/>
    <circle cx="56" cy="44" r="5" fill="#e9b7b2"/>
    <path d="M30 60c-10 2-16 10-18 16 8 4 20 4 28-2z" fill="#b9b3ab" ${S}/>
    <circle cx="11" cy="76" r="3.5" fill="#2a2118"/>
    <circle cx="28" cy="66" r="2.6" fill="#2a2118"/>
    <path d="M38 98a16 16 0 0 1 32 0z" fill="#f08a24" ${S}/>
    <path d="M54 98v-14M46 98l-4-10M62 98l4-10" fill="none" stroke="#f9b866" stroke-width="3" stroke-linecap="round"/>`),
  kanon: svg(`
    <g transform="rotate(-18 60 60)">
      <rect x="26" y="44" width="78" height="24" rx="6" fill="#59636d" ${S}/>
      <rect x="96" y="40" width="12" height="32" rx="3" fill="#6f7a85" ${S}/>
      <rect x="20" y="40" width="12" height="32" rx="6" fill="#6f7a85" ${S}/>
      <path d="M40 50h44" fill="none" stroke="#8a95a0" stroke-width="4" stroke-linecap="round"/>
    </g>
    <path d="M22 96h62l10-22H38z" fill="#7a5a3a" ${S}/>
    <circle cx="46" cy="92" r="17" fill="#5b3d2a" ${S}/>
    <circle cx="46" cy="92" r="5" fill="#c9a35a" ${S}/>
    <path d="M46 75v34M29 92h34" fill="none" stroke="#2a2118" stroke-width="2"/>`),
  bog: svg(`
    <path d="M24 26h60a10 10 0 0 1 10 10v64H34a10 10 0 0 1-10-10z" fill="#7a1f24" ${S}/>
    <path d="M24 90a10 10 0 0 1 10-10h60v20H34a10 10 0 0 1-10-10z" fill="#fbf5e2" ${S}/>
    <path d="M38 87h52M38 94h52" fill="none" stroke="#b8ae96" stroke-width="2" stroke-linecap="round"/>
    <rect x="38" y="40" width="42" height="22" rx="2" fill="#f3d98a" ${S}/>
    <path d="M45 48h28M45 55h20" fill="none" stroke="#2a2118" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M70 80v30l6-6 6 6V80z" fill="#2f6b3f" ${S}/>`),
};
