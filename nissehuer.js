// Julespil på Christiansborg: »Nissehuejagten«. Nisserne har gemt otte nissehuer på deres yndlingssteder på Slotsholmen.
// For hver hue, Ida finder, tænder de tre lys på det store juletræ i Rigsdagsgården. Når alle 24 lys brænder, er der fest.
// Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Alt indhold står i denne fil. Rammen ligger i index.html (afsnittet JULEKALENDER, spil: "huer").
//   - huer: i den rækkefølge, vejvisningen foreslår. Man kan tage dem i hvilken som helst rækkefølge.
//     ude: x, z og y er meter over jorden (eller absolut med abs: true). inde: place og x, z i rummets egne koordinater,
//     y over gulvet. taarn: f er den retning, Ida skal kigge fra Udsigten.
//   - hver hue har en nisse som vært. Man kan sige hej og høre en kort historie fra stedet, men man behøver ikke.
//     Kilderne til historierne står i dev/NISSEHUER.md.
// Tekster må ikke indeholde tankestreg. Brug bindestreg.

export const KALENDER = {
  id: "huer",
  spil: "huer",
  version: 1,
  overskrift: "Christiansborg",
  titel: "Nissehuejagten",
  forside: "Juletræet i Rigsdagsgården har 24 lys, og alle er slukket. Nisserne har gemt otte nissehuer på deres yndlingssteder på Slotsholmen. For hver hue, du finder, tænder de tre lys på træet.",
  gemTekst: "Spillet gemmer selv, så du kan fortsætte på denne telefon eller computer.",

  start: {
    ved: [-5, -212],       // Højbro Plads, ved Absalon
    kig: 180,              // mod Højbro og slottet
    eyebrow: "En aften i december",
    titel: "Otte huer og et træ",
    replikker: [
      ["fortaeller", "Det sner på Slotsholmen. Juletræet i Rigsdagsgården har 24 lys, og de er alle sammen slukket."],
      ["Pind", "Nisserne har gemt otte nissehuer på deres yndlingssteder. For hver hue, du finder, tænder vi tre lys på træet."],
      ["Pind", "Den første kan du se herfra. Den lyser ude på Højbro."],
    ],
  },

  hjaelpTitel: "Sådan finder du huerne",
  hjaelpKnap: "Find den første hue",
  hjaelp: [
    { b: "Find huerne.", t: "Gå hen til en hue, så tager Ida den. Øverst til venstre står, hvor den næste er, og pilen viser vejen." },
    { b: "Sig hej.", t: "Ved hver hue står en nisse. Gå hen og sig hej, hvis du vil høre en historie fra stedet. Du kan også bare gå videre." },
    { b: "Styring.", t: "Gå med venstre tommel eller W, A, S, D. Hold tommelen helt ude for at løbe. Knappen nederst bruger du til at tale og gå ind." },
  ],

  // juletræet i Rigsdagsgården, til venstre for trappen. Det står der hele tiden og tænder tre lys for hver hue
  juletrae: { ved: [17.1, 74.6], stor: true, praj: "Juletræet står i Rigsdagsgården, til venstre for trappen til Folketinget." },

  huer: [
    {
      id: "hoejbro", navn: "Huen på Højbro", sted: "Højbro",
      hvor: "Ude på Højbro, på gelænderet over havmanden.",
      ude: { x: -12.3, z: -166.7, y: 1.15, stor: 1.3 },   // på gelænderet midt på broen, lige over havmanden (y over broens dæk)
      farve: "#c8262d", kant: "#f4f1ea",
      nisse: "pind", vaert: { x: -10.2, z: -169.4, face: 250 },
      historie: [
        ["Pind", "Kig ned i vandet ved broen. Dernede ligger en havmand og hans syv sønner af bronze."],
        ["Pind", "Billedhuggeren Suste Bonnén lagde dem på bunden af kanalen i 1992. De rækker armene op efter Agnete fra folkevisen, som forlod dem og gik op på land."],
        ["Pind", "Jeg har spurgt, om de kunne flyttes op til et budgetår med bedre lys. De svarede ikke. Det tager jeg som et nej."],
      ],
    },
    {
      id: "riddersal", navn: "Huen i Riddersalen", sted: "Riddersalen",
      hvor: "Riddersalen. Indgangen ligger i Prins Jørgens Gård, mellem de to statuer.",
      indgang: "riddersal",
      inde: { place: "riddersal", x: 639.9, z: 0, y: 0.8 },   // for enden af det lange gallabord
      farve: "#2f7343", kant: "#f4f1ea", striber: "#f4f1ea",
      nisse: "kendelse", vaert: { x: 642.2, z: 1.5, face: 270 },
      historie: [
        ["Thyra", "De 17 vægtæpper her er Bjørn Nørgaards. Tilsammen fortæller de tusind års Danmarkshistorie."],
        ["Thyra", "De var en gave til Dronning Margrethe, da hun fyldte 50 i 1990. Men 30 vævere i Frankrig skulle bruge næsten ti år, så de blev først hængt op til hendes 60-års fødselsdag i 2000."],
        ["Thyra", "Det er den længste levering, jeg har oplevet. Og jeg har ventet på desserten i Riddersalen siden 1928."],
      ],
    },
    {
      id: "marmorbro", navn: "Huen på Marmorbroen", sted: "Marmorbroen",
      hvor: "Marmorbroen over Frederiksholms Kanal, for enden af Ridebanen.",
      ude: { x: -206.4, z: 127.2, y: 1.15 },   // på balustraden midt på broen (y over broens dæk)
      farve: "#2f5fa8", kant: "#f4f1ea",
      nisse: "bro", vaert: { x: -204.9, z: 129.6, face: 160 },
      historie: [
        ["Knud", "Marmorbroen er tegnet af Nicolai Eigtved og bygget fra 1739 til 1745. Den var vejen ind til det allerførste Christiansborg."],
        ["Knud", "Slottet brændte i 1794 og igen i 1884. Broen, pavillonerne og Ridebanen klarede begge brande."],
        ["Knud", "Jeg siger ikke, at det var mig, der stod vagt. Men jeg siger heller ikke, at det ikke var."],
      ],
    },
    {
      id: "stald", navn: "Huen i stalden", sted: "De Kongelige Stalde",
      hvor: "De Kongelige Stalde ved Ridebanen. Gå ind ad den åbne staldport.",
      indgang: "stables",
      inde: { place: "stables", x: 304.6, z: 12, y: 1.43, rot: 90, r: 4.3 },   // på skillevæggen til en bås, lige ved den hvide hest
      farve: "#b3262a", kant: "#f4f1ea", striber: "#2b2f36",
      nisse: "hov", vaert: { x: 297.6, z: 14.6, face: 90, balle: true },
      historie: [
        ["Gerda", "Da slottet brændte i 1794, var staldene næsten det eneste, der stod tilbage. Hestene havde stadig tag over hovedet. Kongefamilien måtte flytte til Amalienborg."],
        ["Gerda", "Hestene her er hvide kladrubere. Dem har staldene haft siden 1994, og de trækker kareterne, når der er fest."],
        ["Gerda", "De spiser mere end hele Folketinget. Men de holder kortere taler."],
      ],
    },
    {
      id: "have", navn: "Huen i Bibliotekshaven", sted: "Bibliotekshaven",
      hvor: "Bibliotekshaven bag Rigsdagsgården. Kig efter Kierkegaard ved bassinet.",
      ude: { x: 65.56, z: 184.95, y: 3.68, abs: true },   // på Søren Kierkegaards hoved
      farve: "#7a3f8f", kant: "#f4f1ea",
      nisse: "bog", vaert: { x: 63.4, z: 182.2, face: 40 },
      historie: [
        ["Ellen", "Du står på en havnebund. Her lå Christian 4.s krigshavn fra omkring år 1600, med Tøjhuset på den ene side og Proviantgården på den anden."],
        ["Ellen", "Havnen blev fyldt op i 1860'erne, og haven blev anlagt ovenpå i 1920."],
        ["Ellen", "Kierkegaard har lånt huen. Han har ikke sagt noget til det. Men han tænker nok over det."],
      ],
    },
    {
      id: "taarn", navn: "Huen i Tårnet", sted: "Udsigten",
      hvor: "Udsigten i Tårnet. Gå ind ad Kongeporten på Slotspladsen, og tag elevatoren op.",
      taarn: { f: 1.24 },   // på rækværket ud mod Børsen og dragespiret. Kongen til hest ses, når man drejer lidt til højre
      farve: "#d69a1f", kant: "#f4f1ea",
      nisse: "taarn",
      historie: [
        ["Sigurd", "Tårnet er 106 meter højt. Det er 40 centimeter højere end Rådhustårnet. Det gør vi ikke noget stort nummer ud af. Kun hver dag."],
        ["Sigurd", "Det har været åbent for alle siden juni 2014. Før den tid havde jeg udsigten for mig selv."],
        ["Sigurd", "Kig ned på Slotspladsen. Kongen til hest har også fået en hue."],
      ],
    },
    {
      id: "kongen", navn: "Kongens hue", sted: "Slotspladsen",
      hvor: "Kongen til hest på Slotspladsen. Gå helt hen til statuen.",
      ude: { x: 80.97, z: -50.98, y: 11.16, abs: true, r: 7.5, stor: 1.35 },   // på Frederik 7.s hoved
      farve: "#c8262d", kant: "#f4f1ea", striber: "#2f7343",
      nisse: "plads", vaert: { x: 85.3, z: -54.4, face: 300 },
      historie: [
        ["Frede", "Frederik 7. underskrev Grundloven den 5. juni 1849. Det er derfor, der overhovedet er et Folketing i huset bag ham."],
        ["Frede", "Statuen blev afsløret den 6. oktober 1873. Den dag ville han være fyldt 65."],
        ["Frede", "Huen sad ikke i protokollen. Men duerne siger, at den klæder ham."],
      ],
    },
    {
      id: "folketing", navn: "Huen på talerstolen", sted: "Folketingssalen",
      hvor: "Folketingssalen. Gå op ad trappen i Rigsdagsgården, og følg Vandrehallen til den østlige ende.",
      indgang: "folketing",
      inde: { place: "folketing", x: 72.1, z: -2.9, y: 1.12, gulv: true, r: 4.2, stor: 1.2,
        vej: [{ til: [0, 6.5], naar: (x, z) => z > 8.5 }, { til: [41.5, 0], naar: (x, z) => x < 40.5 }, { til: [69.5, 0], naar: (x, z) => x < 68.5 }] },   // op ad trappen, hen til døren til salen og ned ad midtergangen
      farve: "#c8262d", kant: "#f4f1ea", striber: "#f4f1ea",
      nisse: "ting", vaert: { x: 70.4, z: -5.4, face: 60, gulv: true },
      historie: [
        ["Elna", "Rigsdagen flyttede ind her på det nye Christiansborg i 1918. Det gamle slot var brændt 34 år før."],
        ["Elna", "Samme forår blev de første fire kvinder valgt til Folketinget. En af dem, Elna Munch, blev den første kvinde, der talte fra Folketingets talerstol."],
        ["Elna", "Jeg er opkaldt efter hende. Huen er ikke. Den har bare lånt talerstolen, og den har ikke bedt om ordet."],
      ],
    },
  ],

  // en kort besked, hver gang Ida finder en hue (n af alle). Teksten om næste sted kommer af sig selv
  fund: (n, alle) => n >= alle ? "Alle huerne er fundet. Gå til juletræet i Rigsdagsgården." : `Tre lys mere tændt på juletræet.`,

  traePraj: "Alle huerne er fundet. Gå til juletræet i Rigsdagsgården.",
  slut: {
    eyebrow: "24 af 24 lys",
    titel: "Glædelig jul på Borgen",
    tekst: [
      ["fortaeller", "Alle 24 lys brænder på juletræet i Rigsdagsgården, og stjernen i toppen lyser. Ovre fra Holmens Kirke ringer klokken julen ind."],
      ["Bilag", "24 lys. Jeg har talt dem to gange. Det stemmer begge gange."],
      ["Anker", "Der er risalamande i Tårnet. Kom op, hvis du vil finde mandlen."],
    ],
    knap: "Glædelig jul",
  },

  fest: {
    place: "towerRestaurant",
    overskrift: "Julefest i Tårnet",
    vej: "Gå til Kongeporten på Slotspladsen, gå ind, og tag elevatoren op til restauranten.",
    sekunder: 75,
    morgen: "Fyrværkeriet er slut, og det bliver lyst over en hvid Slotsholm. Glædelig jul.",
    // risalamanden med mandlen: tre skåle på et lille bord midt i restauranten. Mandlen ligger i en tilfældig skål.
    mandel: {
      at: [440, 3.2],
      knap: "Tag en skål risalamande",
      forbi: [
        [["fortaeller", "Risalamanden er kold og god. Der er ingen mandel."], ["Pind", "Det var forventet. Chancen var en ud af tre. Nu er den en ud af to."]],
        [["fortaeller", "Heller ingen mandel i den skål."], ["Knud", "Jeg har holdt øje med skålene hele aftenen. Ingen har flyttet mandlen. Tror jeg."]],
      ],
      fundet: [
        ["fortaeller", "Der er noget hårdt i risalamanden. Det er mandlen."],
        ["Anker", "Så er det dig, der får mandelgaven. Pind har allerede godkendt udgiften."],
        ["Bilag", "Jeg foreslog at dele mandlen i otte lige store stykker. Det blev ikke vedtaget."],
      ],
      igen: [["Anker", "Mandlen er fundet. Resten er bare risalamande. Der er nok til alle."]],
      gave: {
        navn: "Mandelgaven",
        billede: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="240" height="240">
  <ellipse cx="60" cy="104" rx="40" ry="7" fill="#e6dfcc" stroke="#2a2118" stroke-width="3"/>
  <path d="M38 88v12M50 90v12M70 90v12M82 88v12" stroke="#2a2118" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="60" cy="74" rx="34" ry="22" fill="#f2b8c0" stroke="#2a2118" stroke-width="3"/>
  <circle cx="90" cy="62" r="16" fill="#f2b8c0" stroke="#2a2118" stroke-width="3"/>
  <path d="M84 48l2-10 8 8z" fill="#e89aa6" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="102" cy="66" rx="6" ry="5" fill="#e89aa6" stroke="#2a2118" stroke-width="3"/>
  <circle cx="92" cy="58" r="1.8" fill="#2a2118"/>
  <path d="M26 70q-8-4-4-10" fill="none" stroke="#2a2118" stroke-width="3" stroke-linecap="round"/>
  <path d="M70 56l-6-6 0 12z M70 56l6-6 0 12z" fill="#b3262a" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/>
</svg>`,
      },
    },
    nisser: {
      pind: { at: [433.2, -6.2], face: 0, dy: 0.76, replik: "Jeg har regnet på det. 24 lys koster mindre end en evaluering af, om vi skal have 24 lys." },
      hov: { at: [433.2, 0.8], face: 0, dy: 0.76, replik: "Hestene fik også risalamande. De mente, der manglede havre i." },
      slev: { at: [433.2, 7.8], face: 0, dy: 0.76, replik: "Ingen spiser risalamande alene på Borgen. Sæt dig. Der er en mandel i en af skålene." },
      kendelse: { at: [445.8, 0.8], face: 0, dy: 0.76, replik: "Jeg har dækket op til 117 gallamiddage. Det her er den første, hvor jeg selv sidder ned." },
      ting: { at: [445.8, 7.8], face: 0, dy: 0.76, replik: "Jeg har bedt om ordet. Det fik jeg ikke. Så jeg spiser i stedet." },
      bilag: { at: [445.8, -6.2], face: 0, dy: 0.76, replik: "Næste år effektiviserer jeg ikke julen. Jeg sender den i høring. Med en meget lang høringsfrist." },
    },
  },

  nisser: {
    pind: { navn: "Kontorchef Pind", kort: "Pind", rolle: "Kontornisse i Finansministeriet siden 1849", hue: "#a8252b", toej: "#6f7780" },
    kendelse: { navn: "Hofdame Thyra", kort: "Thyra", pige: true, haar: "#5a3a26", rolle: "Taffelnisse i De Kongelige Repræsentationslokaler. Har dækket op til 117 gallamiddage", hue: "#7a1f24", toej: "#2b3a6a" },
    bro: { navn: "Brovogter Knud", kort: "Knud", rolle: "Nisse på Marmorbroen. Har holdt øje med pavillonerne i mere end 280 år", hue: "#2f5fa8", toej: "#5a4a3a", bukser: "#3a3a3a" },
    hov: { navn: "Staldmester Gerda", kort: "Gerda", pige: true, hoetyv: true, haar: "#b8743a", rolle: "Staldnisse i De Kongelige Stalde. Har aldrig haft fri en juleaften", hue: "#a8252b", toej: "#7a5a3a" },
    bog: { navn: "Bibliotekar Ellen", kort: "Ellen", pige: true, haar: "#d9d2c4", rolle: "Nisse i Det Kongelige Bibliotek. Har læst alle bøgerne og er begyndt forfra", hue: "#7a3f8f", toej: "#3f5a4a" },
    taarn: { navn: "Tårnnisse Sigurd", kort: "Sigurd", rolle: "Bor 44 meter oppe i Tårnet. Tager aldrig elevatoren", hue: "#d69a1f", toej: "#4a5560" },
    plads: { navn: "Pladsnisse Frede", kort: "Frede", rolle: "Nisse på Slotspladsen. Holder øje med duerne og kongen", hue: "#c8262d", toej: "#5b6570" },
    ting: { navn: "Folketingsnisse Elna", kort: "Elna", pige: true, haar: "#8a6a4a", rolle: "Nisse i Folketinget. Har hørt alle taler siden 1918, de fleste to gange", hue: "#a8252b", toej: "#3a4a5a" },
    slev: { navn: "Køkkenmester Anker", kort: "Anker", rolle: "Køkkennisse i Snapstinget. Har rørt i den samme gryde siden systemskiftet", hue: "#c22a2f", toej: "#8e1f24", bukser: "#3a2a20", forklaede: "#f4f1ea", slev: true },
    bilag: { navn: "Bilag", kort: "Bilag", rolle: "Nisse i Effektiviseringsstyrelsen. Den yngste nisse på Christiansborg", hue: "#59636d", toej: "#2b2f36" },
  },

  laager: [],
};
