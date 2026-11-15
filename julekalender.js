// Julekalender på Christiansborg: udgaven »Nissernes protokol« (politik og Christiansborg).
// Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Alt indhold i kalenderen står i denne fil. Rammen (dørene, kalenderkortet, stemplerne, gemningen)
// ligger i index.html og er fælles for alle udgaver. En ny udgave, fx om dagpenge, er en kopi af denne
// fil med andre tekster og en linje mere i listen SPOR øverst i scriptet i index.html.
// Tjek filen efter hver rettelse med:   node dev/tjek-kalender.js
//
// En låge har:
//   nr        1-24. Lågerne åbnes i rækkefølge.
//   type      "stor" (et rum med en nisse og en gåde), "lille" (en dør, man åbner udefra)
//             eller "mini" (en luge med en overraskelse).
//   navn      overskriften, når lågen åbnes.
//   ved       [x, z]: der, hvor Ida står foran væggen. Spillet sætter selv døren på den nærmeste væg.
//             x peger mod øst og z mod syd, målt i meter fra midten af Christiansborg.
//   retning   (kan udelades) den vej, væggen ligger fra "ved", i grader: 0 er nord, 90 øst, 180 syd, 270 vest.
//   indgang   kun store låger: den bygning, lågen fører ind i (folketing, finance, reform, riddersal, stables,
//             courtEntry, pmEntry). Skiltet med tallet sættes ved bygningens egen dør.
//   farve     (kan udelades) dørens farve.
//   praj      hvor lågen er. Vises øverst til venstre, når det er den næste låge.
//   bag       det, der er bag lågen: replikker som [hvem, tekst]. Hvem er "fortaeller", "ida" eller et navn.
//   ting      { navn, billede }: genstanden bag lågen. billede er navnet på en tegning i tegninger.js
//             (kaffekop, mandarin, briller, papir, nissehue, lys, noegle, gave, hestesko, groed, klokke, stjerne,
//             kuglepen, mus, kanon, bog, regneark, slips, vaegt, mappe, stempel) eller en hel tegning, der begynder med <svg.
//   stykke    det stykke af protokollen, lågen giver.
// En stor låge har også:
//   nisse     en af nisserne i listen nisser.
//   inde      { place, at: [x, z], face, dy, ting: [x, z] }: hvor nissen står inde i bygningen. dy løfter ham, fx op på et bord.
//             ting er der, hvor genstanden ligger ved siden af ham (kan udelades).
//   gaade     { foer: replikker, spoergsmaal, svar: [{ t, rigtig, replik }], efter: replikker }
// Udgaven har også:
//   juletrae      { ved: [x, z] }: her står juletræet. Der tændes et lys på det for hver låge, der åbnes.
//   adventskrans  { ved: [x, z] }: her står adventskransen. Der tændes et lys på den for hver sjette låge.
// Lyset følger også kalenderen: skumring ved den første låge, mørk aften ved anden søndag, nat fra tredje søndag,
// og når låge 24 er åbnet, bliver det morgen.
// Vejret følger kalenderen: sneen bliver liggende, lidt mere for hver låge. Efter låge 12 sner det mindre og mindre,
// og efter låge 18 er det holdt op. Den sidste søndag er en klar nat med stjerner.
// Tekster må ikke indeholde tankestreg. Brug bindestreg.

export const KALENDER = {
  id: "jul",
  version: 1,
  overskrift: "Christiansborg · en julekalender for voksne",
  titel: "Nissernes protokol",
  forside: "I mange år har nisserne på Christiansborg ordnet det sidste på finansloven om natten. I år er deres protokol revet i 24 stykker og gemt bag 24 låger på Slotsholmen. Uden den bliver der ingen jul på Borgen. Find lågerne i rækkefølge, og saml protokollen.",
  gemTekst: "Spillet gemmer selv, hver gang du åbner en låge. Du kan fortsætte på denne telefon eller computer.",

  start: {
    ved: [-17.3, 119.1],   // porten i Tøjhusgade
    kig: 329,              // ind mod Rigsdagsgården
    eyebrow: "1. december",
    titel: "En seddel i rygsækken",
    replikker: [
      ["fortaeller", "Det sner over Slotsholmen. Ida er på vej hjem fra arkivet, da hun finder en seddel i rygsækken. Den er skrevet med meget små bogstaver."],
      ["fortaeller", "»Protokollen er revet over. Find lågerne med tal på. Begynd i Rigsdagsgården, ved den store trappe. Sig det ikke til nogen med slips.«"],
      ["ida", "Hvem har været i min rygsæk?"],
    ],
  },

  hjaelp: [
    { b: "Find lågen.", t: "Øverst til venstre står, hvilken låge du skal finde, og et praj om, hvor den er. Den næste låge lyser svagt." },
    { b: "Åbn den.", t: "Gå hen til døren med tallet, og tryk på knappen nederst. Lågerne åbnes i rækkefølge." },
    { b: "Tre slags låger.", t: "Bag de store låger er der et rum med en nisse og en gåde. De små er døre og luger, man åbner udefra." },
    { b: "Kalenderkortet.", t: "Hver låge giver et stempel og et stykke af protokollen. Kortet ligger under knappen Kalender øverst." },
    { b: "Juletræet.", t: "For hver låge, du åbner, tændes et lys på juletræet i Rigsdagsgården. For hver sjette låge tændes et lys på adventskransen." },
    { b: "Går du i stå?", t: "På kalenderkortet kan du slå Vis vej til, så en pil peger mod den næste låge." },
  ],

  soendage: [
    { navn: "1. søndag i advent", tekst: "Det første lys er tændt på adventskransen i Rigsdagsgården. Ingen ved, hvem der tændte det." },
    { navn: "2. søndag i advent", tekst: "To lys brænder nu på adventskransen. Betjentene er holdt op med at spørge, hvem der tænder dem." },
    { navn: "3. søndag i advent", tekst: "Det tredje lys er tændt. Det er holdt op med at sne, og der er helt stille på Slotsholmen." },
    { navn: "4. søndag i advent", tekst: "Alle fire lys brænder under en klar stjernehimmel. Nu mangler kun underskriften." },
  ],

  // vises, når alle lågerne i filen er åbnet, men der endnu ikke er skrevet 24
  proeve: {
    titel: "Så langt er kalenderen skrevet",
    tekst: ["De næste låger er ikke skrevet endnu. Du kan gå rundt på Slotsholmen, se lågerne igen og kigge på juletræet i Rigsdagsgården, eller starte forfra fra forsiden."],
  },
  slut: {
    titel: "Protokollen er samlet",
    tekst: ["Alle 24 stykker ligger i rækkefølge. Nisserne kan gå i gang, og der bliver jul på Borgen i år.", "Det bliver lyst over en hvid Slotsholm. Det er den 24. december."],
  },

  juletrae: { ved: [17.1, 74.6] },       // i Rigsdagsgården, til venstre for trappen
  adventskrans: { ved: [36.6, 50.4] },   // ved trappen, til højre

  nisser: {
    kendelse: { navn: "Dommer Kendelse", kort: "Kendelse", rolle: "Retsnisse i Højesteret. Har aldrig tabt en sag, for han har aldrig ført en", hue: "#7a1f24", toej: "#2b2a30" },
    stempel: { navn: "Sekretær Stempel", kort: "Stempel", rolle: "Forkontorsnisse i Statsministeriet. Intet gælder, før han har stemplet det", hue: "#a8252b", toej: "#3a4a5a" },
    slev: { navn: "Køkkenmester Slev", kort: "Slev", rolle: "Køkkennisse i Snapstinget. Har rørt i den samme gryde siden systemskiftet", hue: "#a8252b", toej: "#d9d2c2" },
    hov: { navn: "Staldmester Hov", kort: "Hov", rolle: "Staldnisse i De Kongelige Stalde. Har aldrig haft fri en juleaften", hue: "#a8252b", toej: "#7a5a3a" },
    pind: { navn: "Kontorchef Pind", kort: "Pind", rolle: "Kontornisse i Finansministeriet siden 1849", hue: "#a8252b", toej: "#6f7780" },
  },

  laager: [
    {
      nr: 1, type: "lille", navn: "Ved den store trappe",
      ved: [22.4, 58.8], retning: 327, farve: "#7a1f24",
      praj: "Rigsdagsgården. Kig ved den store trappe op til Folketinget.",
      bag: [
        ["fortaeller", "Bag døren står en kaffekop, der stadig er varm, og en stak gule sedler med et stempel på."],
        ["fortaeller", "På den øverste står: »Stykkerne er gemt, hvor ingen embedsmand kigger: bag døre med tal på. Gå videre til dem, der tæller pengene. Pind.«"],
        ["ida", "Dem, der tæller pengene. Det må være Den Røde Bygning."],
      ],
      ting: { navn: "En kop kaffe, der stadig er varm", billede: "kaffekop" },
      stykke: "§ 1. Der skal være jul. Også i år.",
    },
    {
      nr: 2, type: "stor", navn: "Dem, der tæller pengene",
      indgang: "finance", nisse: "pind",
      inde: { place: "finance", at: [100.5, -10.7], face: 0, dy: 0.8, ting: [101.2, -10.4] },   // han står på forhandlingsbordet
      praj: "Finansministeriet i Den Røde Bygning ved Slotspladsen. Der, hvor de tæller pengene.",
      bag: [
        ["fortaeller", "Der er lys i forhandlingslokalet, selv om huset er lukket. Nogen rømmer sig derinde. Det lyder som en meget lille mand."],
      ],
      gaade: {
        foer: [
          ["Pind", "Du er hende fra arkivet. Godt. Jeg har talt finansloven efter hver jul siden 1849, og den har aldrig stemt, før vi rettede den."],
          ["ida", "Hvem har revet protokollen over?"],
          ["Pind", "Det ved jeg ikke endnu. Men jeg giver ikke mit stykke til en, der ikke kan huset. Svar mig på én ting."],
        ],
        spoergsmaal: "Hvor mange gange skal finansloven behandles i Folketingssalen, før den er vedtaget?",
        svar: [
          { t: "Én gang", replik: ["Pind", "Det ville være nemt for os alle. Prøv igen."] },
          { t: "To gange", replik: ["Pind", "Så var vi aldrig blevet færdige med at rette. Prøv igen."] },
          { t: "Tre gange", rigtig: true },
        ],
        efter: [
          ["Pind", "Tre. Første, anden og tredje. Og natten mellem anden og tredje kommer vi."],
          ["Pind", "Her er mit stykke, og tag en mandarin med. Du får brug for den. Det næste ligger på den anden side af kanalen, ved Gammel Strand. Ministeriet bor i det gamle pantelånerhus. Kig efter en luge i muren."],
        ],
      },
      ting: { navn: "En mandarin fra Pinds skuffe", billede: "mandarin" },
      stykke: "§ 2. Regnestykket skal gå op inden tredjebehandlingen. Går det ikke op, lægges en mandarin imellem.",
    },
    {
      nr: 3, type: "mini", navn: "Lukket for i år",
      ved: [-214, -55.4], retning: 310, farve: "#2f5a43",
      praj: "Over kanalen ved Gammel Strand. Kulturministeriet i det gamle pantelånerhus i Nybrogade. Kig efter en luge i muren.",
      bag: [
        ["fortaeller", "Lugen går op på klem. En nisse med læsebriller ser på Ida uden at sige noget i lang tid."],
        ["Nissen", "Vi har lukket for i år. Ansøgningsfristen var i september."],
        ["fortaeller", "Lugen smækker så hårdt, at hans læsebriller falder af. De ligger tilbage i sprækken sammen med et stykke papir."],
      ],
      ting: { navn: "Et par læsebriller", billede: "briller" },
      stykke: "§ 3. Kulturen holder åbent, når nogen banker pænt på.",
    },
    {
      nr: 4, type: "lille", navn: "En hue for meget",
      ved: [-87, -53], retning: 327, farve: "#7a1f24",
      praj: "Thorvaldsens Museum ved kanalen. Kig på den lange mur, der vender ind mod slottet.",
      bag: [
        ["fortaeller", "Bag døren står en gipsbuste af en alvorlig mand. Nogen har trukket en nissehue ned over ørerne på ham."],
        ["fortaeller", "I huen ligger en seddel: »Jeg så en lille en gå forbi med en mappe under armen den nat. Han hilste ikke. Spørg i kirken. De hører alt.«"],
        ["ida", "En nisse med mappe. Det lyder ikke som en, der er her for at hygge."],
      ],
      ting: { navn: "En nissehue på en gipsbuste", billede: "nissehue" },
      stykke: "§ 4. Ingen statue må stå barhovedet i december.",
    },
    {
      nr: 5, type: "mini", navn: "Nøglen i kirken",
      ved: [-30, -92.5], retning: 0, farve: "#2f5a43",
      praj: "Slotskirken ved siden af slottet. Kig efter en luge på muren ind mod Prins Jørgens Gård.",
      bag: [
        ["fortaeller", "Bag lugen hænger en stor nøgle på et søm. Den er varm, som om nogen lige har holdt den."],
        ["fortaeller", "På mærkesedlen står: »Staldene. Afleveres til staldmester Hov. Hestene må ikke få mandariner.«"],
        ["ida", "Så ved jeg, hvor jeg skal hen. Og hvad jeg ikke skal gøre."],
      ],
      ting: { navn: "Nøglen til De Kongelige Stalde", billede: "noegle" },
      stykke: "§ 5. Den, der låser, skal også huske at låse op.",
    },
    {
      nr: 6, type: "stor", navn: "Staldmester Hov",
      indgang: "stables", nisse: "hov",
      inde: { place: "stables", at: [302.6, -13.6], face: 300, dy: 1.22 },
      praj: "De Kongelige Stalde ved Ridebanen. Gå ind ad den åbne staldport.",
      bag: [
        ["fortaeller", "Der lugter af hø og varm hest. Inde mellem marmorsøjlerne er der en, der nynner."],
      ],
      gaade: {
        foer: [
          ["Hov", "Nå, du har nøglen. Så er det dig, Pind har sendt. Hestene har været urolige, siden protokollen forsvandt."],
          ["ida", "Så du, hvem der tog den?"],
          ["Hov", "Jeg så en lille skikkelse med en mappe gå over Ridebanen. Men først skal jeg vide, om du kan tælle. Grøden skal række til alle i salen."],
        ],
        spoergsmaal: "Hvor mange medlemmer har Folketinget?",
        svar: [
          { t: "175", replik: ["Hov", "Du glemmer de fire fra Nordatlanten. Det gør de fleste. Prøv igen."] },
          { t: "179", rigtig: true },
          { t: "189", replik: ["Hov", "Så mange stole er der ikke i salen. Prøv igen."] },
        ],
        efter: [
          ["Hov", "179. To fra Færøerne, to fra Grønland og resten herfra. Så ved jeg, hvor meget grød der skal koges."],
          ["Hov", "Her er mit stykke og en hestesko. Den bringer held, og det får du brug for. Ham med mappen gik tværs over Ridebanen, mens hestene sov. Kig på fløjen ud mod kanalen."],
        ],
      },
      ting: { navn: "En hestesko fra stalden", billede: "hestesko" },
      stykke: "§ 6. Hestene skal have grød før ministrene.",
    },
    // ---------------------------------------------------------------- 2. søndag i advent
    {
      nr: 7, type: "lille", navn: "Spor i gruset",
      ved: [-184, 80], farve: "#7a1f24",
      praj: "Ridebanen uden for staldene. Kig på den lange fløj ud mod kanalen.",
      bag: [
        ["fortaeller", "Bag døren ligger en meget lille kuglepen. På siden står med guldtryk: »Effektiviseringsenheden. Vi gør det enklere.«"],
        ["ida", "Det har aldrig betydet noget godt."],
        ["fortaeller", "I gruset uden for døren går små fodspor ud mod Marmorbroen. De går i en helt lige linje."],
      ],
      ting: { navn: "En kuglepen fra Effektiviseringsenheden", billede: "kuglepen" },
      stykke: "§ 7. Gruset på Ridebanen rives hver morgen. Også efter nisser.",
    },
    {
      nr: 8, type: "mini", navn: "Et vidne",
      ved: [-184.5, 121.9], farve: "#2f5a43",
      praj: "Marmorbroen for enden af Ridebanen. Kig på de to små pavilloner ved broen.",
      bag: [
        ["fortaeller", "Lugen går op. Derinde sidder en mus med en halv mandarin og ser skyldig ud."],
        ["fortaeller", "Den skubber et stykke papir ud med snuden. Med meget små bogstaver står der: »Han gik ind i Tøjhuset uden billet. Han målte kanonerne.«"],
        ["fortaeller", "Musen lukker selv lugen."],
      ],
      ting: { navn: "En mus med en halv mandarin", billede: "mus" },
      stykke: "§ 8. Mus tæller ikke som embedsmænd, men de må gerne spise med.",
    },
    {
      nr: 9, type: "lille", navn: "Udkast 14",
      ved: [38, 205], retning: 236, farve: "#7a1f24",
      praj: "Tøjhusmuseet, det lange hus syd for slottet. Kig på muren ud mod Bibliotekshaven.",
      bag: [
        ["fortaeller", "Bag døren står en meget lille kanon. I løbet sidder en sammenrullet seddel."],
        ["fortaeller", "»Julestrategi 2030, udkast 14. Protokollen udgår og erstattes af et regneark. Høringsfrist: ingen. Bilag.«"],
        ["ida", "Så har han et navn. Bilag."],
        ["fortaeller", "Nederst står med blyant: »Husk at aflevere bogen.«"],
      ],
      ting: { navn: "En kanon ladt med et udkast", billede: "kanon" },
      stykke: "§ 9. I december skydes der kun med konfetti.",
    },
    {
      nr: 10, type: "lille", navn: "Lånt og ikke afleveret",
      ved: [98, 208], retning: 146, farve: "#2f5a43",
      praj: "Det Kongelige Bibliotek, det gamle hus af røde mursten. Kig på muren ud mod Bibliotekshaven.",
      bag: [
        ["fortaeller", "Bag døren står en bog: »Sådan afskaffer man en tradition på tolv trin«. På lånerkortet står: Bilag. Afleveres: for længst."],
        ["fortaeller", "Som bogmærke ligger en kvittering fra Snapstinget. Én portion risengrød, hver aften i tre uger."],
        ["ida", "Han spiser grød alene hver aften. Det er næsten synd for ham. Den korteste vej til Snapstinget går gennem Proviantpassagen."],
      ],
      ting: { navn: "En bog, der skulle have været afleveret", billede: "bog" },
      stykke: "§ 10. Bøger om at afskaffe julen udlånes kun til dem, der lover at fortryde.",
    },
    {
      nr: 11, type: "mini", navn: "Til tredjebehandlingen",
      ved: [82, 74], farve: "#7a1f24",
      praj: "Proviantpassagen, porten mellem Proviantgården og Rigsdagsgården. Kig efter en luge i muren.",
      bag: [
        ["fortaeller", "Lugen går op. Derinde sover en nisse oven på en stak finanslovsforslag. Ved siden af ham står et lys, der er brændt næsten ned."],
        ["Nissen", "Til tredjebehandlingen."],
        ["fortaeller", "Han vender sig om på den anden side og sover videre. Under hans hue stikker et stykke papir ud."],
      ],
      ting: { navn: "Et lys, der er brændt næsten ned", billede: "lys" },
      stykke: "§ 11. Den, der falder i søvn på arbejdet i december, vækkes først, når grøden er klar.",
    },
    {
      nr: 12, type: "stor", navn: "Grød for én",
      indgang: "folketing", nisse: "slev",
      inde: { place: "folketing", at: [-17.6, 25.5], face: 90, dy: 0.83, ting: [-17.0, 24.7] },   // han står på bordet lige inden for døren
      praj: "Folketinget i Rigsdagsgården. Gå op ad den store trappe, og find Snapstinget til venstre for indgangen.",
      bag: [
        ["fortaeller", "Der er mørkt i huset, men fra Snapstinget kommer der lys og en lugt af kanel."],
      ],
      gaade: {
        foer: [
          ["Slev", "Du kommer på grund af ham med mappen. Bilag. Han sidder derovre hver aften og spiser grød alene."],
          ["ida", "Ved du, hvorfor han rev protokollen over?"],
          ["Slev", "Han siger, at den ikke kan stå i et regneark. Men jeg siger ikke mere til en, der ikke kender huset. Svar mig på én ting."],
        ],
        spoergsmaal: "Hvor længe kan der højst gå mellem to folketingsvalg?",
        svar: [
          { t: "Tre år", replik: ["Slev", "Så travlt har selv de ikke. Prøv igen."] },
          { t: "Fire år", rigtig: true },
          { t: "Fem år", replik: ["Slev", "Det er i andre lande. Prøv igen."] },
        ],
        efter: [
          ["Slev", "Fire år. Og grøden skal koges hver jul, uanset hvem der vinder."],
          ["Slev", "Bilag ville gøre julen enklere. Nu kan han ikke samle protokollen igen, og han tør ikke sige det til nogen. Tag en skål grød med. Du finder ham ikke i dag, men han går altid hjem over Slotspladsen."],
        ],
      },
      ting: { navn: "En skål risengrød med smørklat", billede: "groed" },
      stykke: "§ 12. Ingen spiser grød alene på Borgen.",
    },
    // ---------------------------------------------------------------- 3. søndag i advent
    {
      nr: 13, type: "lille", navn: "Julen, version 2",
      ved: [39.8, -41.2], retning: 225, farve: "#7a1f24",
      praj: "Slotspladsen foran slottet. Kig på slottets mur lige ved foden af tårnet.",
      bag: [
        ["fortaeller", "Bag døren hænger et regneark, sat op med tape. »Julen, version 2. Gaver: 0. Grød: udgår. Stearinlys: erstattes af ét fælles lys. Besparelse: 100 procent.«"],
        ["fortaeller", "Nederst har nogen skrevet med rød tusch og en anden håndskrift: »Hvor er glæden? Den står ikke i nogen kolonne.«"],
        ["ida", "Så er der i hvert fald én til, der har læst det. Fodsporene går over Slotspladsen mod Børsen."],
      ],
      ting: { navn: "Et regneark med julen i version 2", billede: "regneark" },
      stykke: "§ 13. Glæde kan ikke stå i en kolonne. Den føres for sig.",
    },
    {
      nr: 14, type: "mini", navn: "Bundet forkert",
      ved: [250, 48], retning: 180, farve: "#2f5a43",
      praj: "Børsen med dragespiret, øst for Slotspladsen. Kig efter en luge på den lange mur, der vender mod Holmens Kirke.",
      bag: [
        ["fortaeller", "Lugen sidder i den gamle børsmur. Derinde ligger et meget lille slips. Det er bundet forkert, og knuden er våd af sne."],
        ["fortaeller", "En nisse fra Effektiviseringsenheden tager kun slipset af, når han er begyndt at tvivle."],
        ["ida", "Sedlen sagde, at jeg ikke skulle sige det til nogen med slips. Nu har han ikke noget."],
      ],
      ting: { navn: "Et meget lille slips", billede: "slips" },
      stykke: "§ 14. Slips er frivilligt fra den 1. december.",
    },
    {
      nr: 15, type: "lille", navn: "Klokken, der ikke ringer",
      ved: [205.1, -54.9], retning: 135, farve: "#7a1f24",
      praj: "Holmens Kirke på den anden side af Holmens Bro. Kig på muren, der vender mod broen.",
      bag: [
        ["fortaeller", "Bag døren hænger en lille klokke. På en seddel står: »Kirkenissen ringer først julen ind, når protokollen er hel. Sådan står der i § 15.«"],
        ["fortaeller", "I sneen under klokken er der små fodspor. De har stået her længe, og så er de gået tilbage over broen mod slottet."],
        ["ida", "Han har stået og kigget på en klokke, han selv har gjort stum. Tilbage over broen, altså."],
      ],
      ting: { navn: "Kirkenissens klokke", billede: "klokke" },
      stykke: "§ 15. Julen ringes ind, når protokollen er hel. Ikke før.",
    },
    {
      nr: 16, type: "stor", navn: "Julen mod Bilag",
      indgang: "courtEntry", nisse: "kendelse",
      inde: { place: "courtEntry", at: [544, -1.5], face: 270, dy: 0.6, ting: [544, -0.4] },   // han står på bænken til højre
      praj: "Højesteret i Prins Jørgens Gård. Gå gennem porten i Kirkeløngangen fra Slotspladsen og op ad trappen mellem de fire søjler.",
      bag: [
        ["fortaeller", "Der er lys bag søjlerne. Inde i vindfanget står en lille skikkelse i sort kappe og venter, som om sagen allerede er berammet."],
      ],
      gaade: {
        foer: [
          ["Kendelse", "Sagen Julen mod Bilag. Retten har ventet på et vidne. Det er dig."],
          ["ida", "Kan han bare afskaffe protokollen?"],
          ["Kendelse", "Det afgør retten. Men først skal vidnet vise, at hun kender ordningen. Svar på én ting."],
        ],
        spoergsmaal: "Hvem har den dømmende magt efter grundloven?",
        svar: [
          { t: "Regeringen", replik: ["Kendelse", "Det ville regeringen gerne. Prøv igen."] },
          { t: "Folketinget", replik: ["Kendelse", "De laver lovene. De dømmer ikke efter dem. Prøv igen."] },
          { t: "Domstolene", rigtig: true },
        ],
        efter: [
          ["Kendelse", "Domstolene. Så kan retten sættes."],
          ["Kendelse", "En protokol kan kun ændres af dem, der har skrevet under på den. Det har Bilag ikke. Altså gælder den stadig, også i 24 stykker."],
          ["Kendelse", "Tag vægten med som bevis. Og kig på Kirkeløngangens mur, når du går ud. Han har glemt noget."],
        ],
      },
      ting: { navn: "Rettens lille vægt", billede: "vaegt" },
      stykke: "§ 16. Protokollen kan kun ændres af dem, der har skrevet under.",
    },
    {
      nr: 17, type: "lille", navn: "Nederst i mappen",
      ved: [-17.5, -86.5], retning: 90, farve: "#2f5a43",
      praj: "Prins Jørgens Gård. Kig på Kirkeløngangens mur på den anden side af gården fra Højesteret.",
      bag: [
        ["fortaeller", "Bag døren står Bilags mappe. Den er ikke låst."],
        ["fortaeller", "Øverst ligger udkast 1 til 14. Nederst, under dem alle, ligger en barnetegning af et juletræ med alt for mange lys på. I hjørnet står: »Bilag, 6 år.«"],
        ["ida", "Den har han haft med i mappen hele tiden."],
      ],
      ting: { navn: "Bilags mappe", billede: "mappe" },
      stykke: "§ 17. Et juletræ kan ikke have for mange lys.",
    },
    {
      nr: 18, type: "stor", navn: "Forkontoret",
      indgang: "pmEntry", nisse: "stempel",
      inde: { place: "pmEntry", at: [500, -3.25], face: 0, dy: 0.55, ting: [501, -3.2] },   // han står på disken
      praj: "Statsministeriet i Prins Jørgens Gård, ved siden af Højesteret. Indgangen har nummer 11.",
      bag: [
        ["fortaeller", "I forhallen brænder en enkelt lampe. På disken står en nisse med ærmeholdere og stempler i papirer, der ikke er der."],
      ],
      gaade: {
        foer: [
          ["Stempel", "Du behøver ikke sige noget. Jeg har hørt det hele gennem væggen. Højesteret taler højt."],
          ["ida", "Hvor er Bilag?"],
          ["Stempel", "Han var her og ville have protokollen stemplet som ophævet. Det ville jeg ikke. Men du får heller ikke noget, før du har svaret."],
        ],
        spoergsmaal: "Hvem udnævner statsministeren?",
        svar: [
          { t: "Folketingets formand", replik: ["Stempel", "Formanden leder møderne. Mere bliver det ikke til. Prøv igen."] },
          { t: "Kongen", rigtig: true },
          { t: "Højesteret", replik: ["Stempel", "De har travlt nok ovre på den anden side af gården. Prøv igen."] },
        ],
        efter: [
          ["Stempel", "Kongen. Sådan står der, og sådan har jeg stemplet det hver gang."],
          ["Stempel", "Bilag gik op i tårnet med de sidste stykker. Han tør ikke komme ned. Tag stemplet med. Protokollen gælder først, når den er samlet, underskrevet og stemplet."],
        ],
      },
      ting: { navn: "Statsministeriets stempel", billede: "stempel" },
      stykke: "§ 18. Intet gælder, før det er stemplet. Heller ikke julen.",
    },
  ],
};
