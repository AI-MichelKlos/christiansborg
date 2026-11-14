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
//   indgang   kun store låger: den bygning, lågen fører ind i (finance, reform, riddersal, stables,
//             courtEntry, pmEntry). Skiltet med tallet sættes ved bygningens egen dør.
//   farve     (kan udelades) dørens farve.
//   praj      hvor lågen er. Vises øverst til venstre, når det er den næste låge.
//   bag       det, der er bag lågen: replikker som [hvem, tekst]. Hvem er "fortaeller", "ida" eller et navn.
//   ting      { navn, billede }: genstanden bag lågen. billede er navnet på en tegning i tegninger.js
//             (kaffekop, mandarin, briller, papir, nissehue, lys, noegle, gave) eller en hel tegning, der begynder med <svg.
//   stykke    det stykke af protokollen, lågen giver.
// En stor låge har også:
//   nisse     en af nisserne i listen nisser.
//   inde      { place, at: [x, z], face, dy }: hvor nissen står inde i bygningen. dy løfter ham, fx op på et bord.
//   gaade     { foer: replikker, spoergsmaal, svar: [{ t, rigtig, replik }], efter: replikker }
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
    { b: "Går du i stå?", t: "På kalenderkortet kan du slå Vis vej til, så en pil peger mod den næste låge." },
  ],

  soendage: [
    { navn: "1. søndag i advent", tekst: "Det første lys er tændt i Vandrehallen. Ingen ved, hvem der tændte det." },
    { navn: "2. søndag i advent", tekst: "To lys brænder nu. Betjentene er holdt op med at spørge." },
    { navn: "3. søndag i advent", tekst: "Det tredje lys er tændt. Protokollen er snart til at læse." },
    { navn: "4. søndag i advent", tekst: "Alle fire lys brænder. Nu mangler kun underskriften." },
  ],

  // vises, når alle lågerne i filen er åbnet, men der endnu ikke er skrevet 24
  proeve: {
    titel: "Det var prøvelågerne",
    tekst: ["Resten af kalenderen er ikke skrevet endnu. Du kan gå rundt på Slotsholmen og se lågerne igen, eller starte forfra fra forsiden."],
  },
  slut: {
    titel: "Protokollen er samlet",
    tekst: ["Alle 24 stykker ligger i rækkefølge. Nisserne kan gå i gang, og der bliver jul på Borgen i år."],
  },

  nisser: {
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
      inde: { place: "finance", at: [100.5, -10.7], face: 0, dy: 0.8 },   // han står på forhandlingsbordet
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
  ],
};
