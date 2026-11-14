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
};
