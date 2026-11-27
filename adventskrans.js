// Julespil på Christiansborg: »Nissernes adventskrans«. Fire nisser har reddet hver sit lys, og Ida tænder dem på kransen.
// Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Alt indhold står i denne fil. Rammen ligger i index.html (afsnittet JULEKALENDER) og er den samme som i julekalenderen
// med de 24 låger, som ligger i arkiv/julekalender-24-laager.js til næste år. spil: "krans" gør den til et spil med lys:
//   - hvert "lys" er en stor låge: et skilt ved bygningens dør og en nisse derinde, der giver Ida et lys
//   - gaade har kun foer og efter (ingen spoergsmaal): nissen fortæller, og Ida tager imod lyset
//   - bagefter tænder Ida lyset på adventskransen. Hvert tændt lys tæller som en søndag for vejret og lyset
//   - når alle fire brænder: klokker, fyrværkeri og fest i Tårnet
// Tjek filen efter hver rettelse med:   node dev/tjek-kalender.js
// Tekster må ikke indeholde tankestreg. Brug bindestreg.

const S = 'stroke="#2a2118" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
// et kalenderlys med tal på, og en lille ting, der fortæller, hvor det har været gemt
const lys = (nr, ekstra) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="240" height="240">
  <ellipse cx="60" cy="106" rx="36" ry="8" fill="#e6dfcc" ${S}/>
  <path d="M60 30v-10" ${S}/>
  <rect x="44" y="30" width="32" height="74" rx="4" fill="#b3262a" ${S}/>
  <path d="M44 40q6 0 6 8t6 0 6-8" fill="none" stroke="#8e1c20" stroke-width="3" stroke-linecap="round"/>
  <text x="60" y="84" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="30" fill="#f6e6b8">${nr}</text>
  ${ekstra}</svg>`;

export const KALENDER = {
  id: "krans",
  spil: "krans",
  version: 1,
  overskrift: "Christiansborg · et julespil for voksne",
  titel: "Nissernes adventskrans",
  forside: "Adventskransen i Rigsdagsgården er blevet effektiviseret, og alle fire lys er væk. Men fire nisser har gemt hver sit lys på Slotsholmen. Find dem, og tænd kransen igen, før det bliver jul.",
  gemTekst: "Spillet gemmer selv, så du kan fortsætte på denne telefon eller computer.",

  start: {
    ved: [-5, -212],       // Højbro Plads, ved Absalon
    kig: 180,              // mod Højbro og slottet
    eyebrow: "En aften i december",
    titel: "En krans uden lys",
    replikker: [
      ["fortaeller", "Det sner over Slotsholmen. På Højbro Plads står kontorchef S. Pind fra Finansministeriet og venter på Ida."],
      ["Pind", "Adventskransen i Rigsdagsgården er blevet effektiviseret. Bilag fra Effektiviseringsstyrelsen har fjernet de fire lys."],
      ["Pind", "Heldigvis nåede fire nisser at redde hver sit. Find dem, og tænd lysene på kransen. Begynd hos Anker i køkkenet i Folketinget."],
    ],
  },

  hjaelpTitel: "Sådan tænder du kransen",
  hjaelpKnap: "Find det første lys",
  hjaelp: [
    { b: "Find lysene.", t: "Øverst til venstre står, hvor du skal hen, og pilen viser vejen. Gå ind, hvor skiltet med tallet står, og tal med nissen." },
    { b: "Tænd dem.", t: "Tag lyset med til adventskransen ved den store trappe i Rigsdagsgården. Når alle fire brænder, skal du op i Tårnet." },
    { b: "Styring.", t: "Gå med venstre tommel eller W, A, S, D. Knappen nederst bruger du til at gå ind og tale (E på tastaturet)." },
  ],

  // ét for hvert lys, der tændes. Navnet er overskriften, og teksten vises, når lyset er tændt
  soendage: [
    { navn: "Det første lys", tekst: "Det første lys brænder på adventskransen. En betjent ser det fra vagten og skriver et notat om det. Han ved ikke, hvem notatet skal til." },
    { navn: "Det andet lys", tekst: "To lys brænder nu. Det er blevet mørkt over Slotsholmen, og sneen bliver liggende på trappen." },
    { navn: "Det tredje lys", tekst: "Tre lys brænder. Det er holdt op med at sne, og der er helt stille i Rigsdagsgården." },
    { navn: "Det fjerde lys", tekst: "Alle fire lys brænder under en klar stjernehimmel. Kransen er tændt igen, og ingen har lavet en konsekvensanalyse." },
  ],

  proeve: { titel: "Ikke flere lys", tekst: ["Der er ikke flere lys at finde."] },
  slut: {
    titel: "Glædelig jul på Borgen",
    ting: "Juletræets stjerne", billede: "stjerne",
    tekst: [
      "Bilag står for foden af trappen med sin mappe og ser på de fire flammer. Så tager han et regneark op af mappen, krøller det sammen og putter det i lommen.",
      "Ovre fra Holmens Kirke ringer klokken julen ind, og over Slotsholmen går fyrværkeriet til vejrs. Stjernen på juletræet lyser.",
      "Nisserne er gået op i restauranten i Tårnet. Gå til Kongeporten på Slotspladsen, og tag elevatoren op. Der er grød til dig.",
    ],
  },

  juletrae: { ved: [17.1, 74.6] },       // i Rigsdagsgården, til venstre for trappen
  adventskrans: { ved: [36.6, 50.4], praj: "Adventskransen står ved den store trappe i Rigsdagsgården." },

  fest: {
    place: "towerRestaurant",
    overskrift: "Juleaften i Tårnet",
    vej: "Gå til Kongeporten på Slotspladsen, gå ind, og tag elevatoren op til restauranten.",
    sekunder: 75,
    morgen: "Fyrværkeriet er slut, og det bliver lyst over en hvid Slotsholm. Glædelig jul.",
    nisser: {
      pind: { at: [433.2, -6.2], face: 0, dy: 0.76, replik: "Jeg har regnet på det. Fire lys koster mindre end en evaluering af, om vi skal have fire lys. Det skriver jeg et notat om." },
      hov: { at: [433.2, 0.8], face: 0, dy: 0.76, replik: "Mit lys lå i havrekassen hele ugen. Hestene lod det være. De ved godt, hvad der er vigtigt." },
      slev: { at: [433.2, 7.8], face: 0, dy: 0.76, replik: "Ingen spiser grød alene på Borgen. Sæt dig. Der er en mandel i en af skålene." },
      kendelse: { at: [445.8, 0.8], face: 0, dy: 0.76, replik: "Retten konstaterer, at kransen er tændt på lovlig vis. Sagen er afsluttet. Retten går over til grøden." },
      stempel: { at: [445.8, 7.8], face: 0, dy: 0.76, replik: "Stemplet og godkendt. Jeg har også stemplet grøden. Det var nok ikke nødvendigt." },
      bilag: { at: [445.8, -6.2], face: 0, dy: 0.76, replik: "Næste år effektiviserer jeg ikke julen. Jeg sender den i høring. Med en meget lang høringsfrist." },
    },
  },

  nisser: {
    bilag: { navn: "Bilag", kort: "Bilag", rolle: "Nisse i Effektiviseringsstyrelsen. Den yngste nisse på Christiansborg", hue: "#59636d", toej: "#2b2f36" },
    kendelse: { navn: "Dommer Thyra", kort: "Thyra", pige: true, rolle: "Retsnisse i Højesteret. Har aldrig tabt en sag, for hun har aldrig ført en", hue: "#7a1f24", toej: "#2b2a30" },
    stempel: { navn: "Sekretær Elna", kort: "Elna", pige: true, rolle: "Forkontorsnisse i Statsministeriet. Intet gælder, før hun har stemplet det", hue: "#a8252b", toej: "#3a4a5a" },
    slev: { navn: "Køkkenmester Anker", kort: "Anker", rolle: "Køkkennisse i Snapstinget. Har rørt i den samme gryde siden systemskiftet", hue: "#a8252b", toej: "#d9d2c2" },
    hov: { navn: "Staldmester Gerda", kort: "Gerda", pige: true, rolle: "Staldnisse i De Kongelige Stalde. Har aldrig haft fri en juleaften", hue: "#a8252b", toej: "#7a5a3a" },
    pind: { navn: "Kontorchef Pind", kort: "Pind", rolle: "Kontornisse i Finansministeriet siden 1849", hue: "#a8252b", toej: "#6f7780" },
  },

  laager: [
    {
      nr: 1, type: "stor", navn: "Lyset i grydeskabet",
      indgang: "folketing", nisse: "slev",
      inde: { place: "folketing", at: [-17.6, 25.5], face: 90, dy: 0.83, ting: [-17.0, 24.7],   // han står på bordet lige inden for døren
        // Efter samtalen skal Ida selv åbne grydeskabet ved kaffedisken
        skab: { at: [-21.8, 31.35], knap: "Åbn grydeskabet", hvor: "Grydeskabet ved kaffedisken",
          fund: [
            ["fortaeller", "Bag lågen står tre gryder, en suppeske og et rødt lys med tallet 1. Det lugter af kanel."],
            ["Anker", "Der kan du se. Tænd det på kransen ude ved trappen."],
            ["Anker", "Det næste lys har Gerda i De Kongelige Stalde ved Ridebanen. Hun har gemt det et sted, hvor hestene passer på det."],
          ] } },
      praj: "Folketinget i Rigsdagsgården. Gå op ad den store trappe, og find Snapstinget til venstre for indgangen.",
      bag: [
        ["fortaeller", "Der er mørkt i huset, men fra Snapstinget kommer der lys og en lugt af kanel."],
      ],
      gaade: {
        foer: [
          ["Anker", "Goddag. Du er hende, Pind har sendt. Bilag var her i går. Han ville skære grøden ned til en halv skål om dagen og kalde det et omprioriteringsbidrag."],
          ["ida", "Har du et af lysene?"],
          ["Anker", "Jeg gemte det i grydeskabet. Der kigger ingen fra Effektiviseringsstyrelsen. De har aldrig været i et køkken."],
        ],
        efter: [
          ["Anker", "Grydeskabet står ved kaffedisken. Åbn det selv. Jeg har lovet Effektiviseringsstyrelsen ikke at løfte mere end højst nødvendigt."],
        ],
        knap: "Hvor er grydeskabet?",
      },
      ting: { navn: "Det første lys", billede: lys(1, `<path d="M18 98l30-14" stroke="#7a4a26" stroke-width="7" stroke-linecap="round"/><path d="M22 96l26-12" stroke="#a8693a" stroke-width="2" stroke-linecap="round"/>`) },
    },
    {
      nr: 2, type: "stor", navn: "Lyset i havrekassen",
      indgang: "stables", nisse: "hov",
      inde: { place: "stables", at: [302.6, -13.6], face: 300, dy: 1.22 },
      praj: "De Kongelige Stalde ved Ridebanen. Gå ind ad den åbne staldport.",
      bag: [
        ["fortaeller", "Der lugter af hø og varm hest. Inde mellem marmorsøjlerne er der en, der nynner."],
      ],
      gaade: {
        foer: [
          ["Gerda", "Nå, Pind har sendt dig. Bilag kom forbi med et måleskema. Han ville vide, om hestene kunne nøjes med tre ben hver i december."],
          ["ida", "Hvad sagde du til ham?"],
          ["Gerda", "At det ville jeg vende tilbage på. Det sagde han også, så vi forstod hinanden."],
        ],
        efter: [
          ["Gerda", "Lyset ligger i havrekassen. Hestene har passet på det hele ugen. Tag det, og tænd det på kransen i Rigsdagsgården."],
          ["Gerda", "Det tredje lys har Thyra i Højesteret. Hun har gjort det til bevismateriale, og hun giver det ikke fra sig uden en kendelse."],
        ],
      },
      ting: { navn: "Det andet lys", billede: lys(2, `<path d="M16 100l18-16M22 104l20-14M30 104l12-18M86 102l16-18M80 104l22-10" stroke="#d9b25a" stroke-width="3" stroke-linecap="round"/>`) },
    },
    {
      nr: 3, type: "stor", navn: "Bevismateriale",
      indgang: "courtEntry", nisse: "kendelse",
      inde: { place: "courtEntry", at: [544, -1.5], face: 270, dy: 0.6, ting: [544, -0.4] },   // hun står på bænken til højre
      praj: "Højesteret i Prins Jørgens Gård. Gå gennem porten i Kirkeløngangen fra Slotspladsen og op ad trappen mellem de fire søjler.",
      bag: [
        ["fortaeller", "Der er lys bag søjlerne. Inde i vindfanget står en lille skikkelse i sort kappe ved siden af et stearinlys med et mærkat på."],
      ],
      gaade: {
        foer: [
          ["Thyra", "Retten har beslaglagt et stearinlys. Bilag ville have det kasseret som en overflødig driftsudgift."],
          ["ida", "Må jeg få det?"],
          ["Thyra", "Retten har vurderet sagen. Et lys, der brænder i december, er ikke en driftsudgift. Det er en tradition, og den kan ikke spares væk ved et notat."],
        ],
        efter: [
          ["Thyra", "Lyset er hermed frigivet. Tænd det på kransen."],
          ["Thyra", "Det sidste lys har Elna i Statsministeriet, lige ved siden af. Hun vil nok have noget stemplet, før hun giver det fra sig."],
        ],
      },
      ting: { navn: "Det tredje lys", billede: lys(3, `<circle cx="82" cy="52" r="12" fill="#7a1f24" ${S}/><path d="M76 52l4 4 8-8" fill="none" stroke="#f6e6b8" stroke-width="3" stroke-linecap="round"/>`) },
    },
    {
      nr: 4, type: "stor", navn: "Til orientering",
      indgang: "pmEntry", nisse: "stempel",
      inde: { place: "pmEntry", at: [500, -3.25], face: 0, dy: 0.55, ting: [501, -3.2] },   // hun står på disken
      praj: "Statsministeriet i Prins Jørgens Gård, ved siden af Højesteret. Indgangen har nummer 11.",
      bag: [
        ["fortaeller", "I forhallen brænder en enkelt lampe. På disken står en nisse med ærmeholdere og stempler i papirer, der ikke er der."],
      ],
      gaade: {
        foer: [
          ["Elna", "Bilag lagde sit papir her: »Adventskransen udgår. Fire lys erstattes af ét fælles lys efter udbud.« Han ville have det stemplet."],
          ["ida", "Gjorde du det?"],
          ["Elna", "Nej. Der var ikke vedlagt en konsekvensanalyse. Kun et notat om, at den var på vej. Så jeg stemplede det »Til orientering« og lagde det nederst i bunken."],
        ],
        efter: [
          ["Elna", "Her er det sidste lys. Jeg har stemplet det, så nu gælder det. Tænd det, så er kransen hel."],
        ],
      },
      ting: { navn: "Det fjerde lys", billede: lys(4, `<rect x="70" y="46" width="34" height="16" rx="2" fill="none" stroke="#2f5fa8" stroke-width="3" transform="rotate(-14 87 54)"/><path d="M76 56l22-6" stroke="#2f5fa8" stroke-width="3" stroke-linecap="round"/>`) },
    },
  ],
};
