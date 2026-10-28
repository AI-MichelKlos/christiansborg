// Manuskript til mordgåden »Mord i Rigets midte«.
// Udarbejdet med AI (Claude) og med begrænset mennesketjek.
//
// Alle tekster i gåden står i denne fil, så de kan rettes uden at røre koden i index.html.
// Tjek filen efter hver rettelse med:   node dev/tjek-mordgaade.js
// Tjekket finder huller i logikken og skriver en læsbar udgave i dev/MANUSKRIPT.md.
//
// Betingelser (kraever) er en liste, hvor alt skal være opfyldt:
//   "spor:3"        sporet er fundet
//   "ting:briller"  Ida har tingen i rygsækken lige nu
//   "flag:x"        noget er sket i historien
//   "akt>=2"        akten er nået ("akt<=3" og "akt==2" findes også)
//   "sted:x"        Ida står på stedet (bruges ved begivenheder)
//   "lag1942"       ekstralaget med 1942 er slået til
//   "!..."          det modsatte
//   "a|b"           mindst én af dem
// Virkninger (giver) er en liste:
//   "spor:3"   "+ting:noegle"   "-ting:briller"   "flag:x"   "-flag:x"
// Replikker er [hvem, tekst]. Hvem er en person, "ida" eller "fortaeller".
// I tidsprøven skriver spillet den målte tid i stedet for {tid}. Er Ida længere om det end 8 minutter,
// bruges replikken i langsom i stedet for den sidste replik.
// Tekster må ikke indeholde tankestreg. Brug bindestreg.

const START = {
  sted: "marmorbroen",
  kl: "06.00",
  ting: ["blyant", "notesbog", "mobil", "studiekort"],
  replikker: [
    ["fortaeller", "Torsdag morgen kl. 06.00. Det regnede det meste af natten, og brostenene er stadig våde. Hestene damper på Ridebanen."],
    ["fortaeller", "Ida har aftalt at møde nattevagten Bente ved Folketingets indgang i Rigsdagsgården. Ingen kender huset bedre, og Ida skriver speciale om Christiansborg."],
    ["fortaeller", "Hun ved endnu ikke, at nogen er død i nat."],
  ],
};

const UR = {
  minutterPrSamtale: 5,
  minutterPrUndersoeg: 2,
  meterPrMinut: 80,
  tekst: "Uret kan ikke løbe ud. Det står stille 5 minutter før aktens slut, til de vigtigste spor er fundet. Når en begivenhed har et klokkeslæt, springer uret frem til det, hvis det er bagud.",
};

// hvor: korte linjer på aktens kort om, hvem der er hvor (valgfri).
const AKTER = [
  {
    nr: 1, navn: "Fundet", fra: "06.00", til: "07.00", kraever: [],
    intro: "En politiker er fundet død i Vandrehallen. Find ud af, hvad der skete i nat.",
  },
  {
    nr: 2, navn: "De mistænkte", fra: "07.00", til: "08.30",
    kraever: ["spor:1", "spor:2", "spor:3", "spor:4", "spor:5", "spor:6", "flag:bente_beder"],
    intro: "Fem mennesker havde en grund til at ønske Aksel Mørkeberg væk. Tal med dem, og find ud af, hvem der lyver.",
    hvor: [
      "Snapstinget har åbnet. Kasper Lindved spiser morgenmad, og Bodil står ved kaffen.",
      "Reformministeren holder morgenmøde med statsministeren i restauranten i tårnet.",
      "Jonas Fenger er på Kompaspartiets kontor ved Vandrehallen.",
      "Pernille Strandvig står blandt journalisterne på Slotspladsen.",
    ],
  },
  {
    nr: 3, navn: "Ud på Slotsholmen", fra: "08.30", til: "09.30",
    kraever: ["spor:7", "spor:8", "spor:10", "spor:18", "flag:ditte_renset", "flag:jonas_renset"],
    intro: "Sporene fører ud af Folketinget: over kanalen, ind i ministerierne og ned til vandet.",
    hvor: [
      "Reformministeriet over kanalen har åbnet, og hoffet dækker op i Riddersalen.",
      "Mogens Brask sætter pressemødet op i Landstingssalen.",
      "Svend står på Højbro med sit kamera. Gry er i staldene, og Aksel var inde i sadelkammeret i nat.",
    ],
  },
  {
    nr: 4, navn: "Afsløringen", fra: "09.30", til: "10.00",
    kraever: ["spor:9", "spor:11", "spor:12", "spor:14", "spor:15", "spor:20", "spor:22"],
    intro: "Om en halv time begynder pressemødet. Kommissæren vil sige, at Kasper Lindved er anholdt.",
  },
];

// spil: hvor stedet findes i index.html ("inde: <rum>" eller "ude: <stednavn>").
// status: "bygget" eller "skal bygges". laas og aaben er betingelser for at komme ind.
// aaben er historien (fx tidspunktet). laas er en lås, som Ida kan åbne med en ting eller en kode:
// knap er teksten på knappen, aabnet vises, når døren går op, og forkert vises ved en forkert kode.
const STEDER = {
  marmorbroen:      { navn: "Marmorbroen", spil: "ude: Marmorbroen", status: "bygget" },
  ridebanen:        { navn: "Ridebanen", spil: "ude: Ridebanen", status: "bygget" },
  stalden:          { navn: "De Kongelige Stalde", spil: "inde: stables", status: "bygget" },
  sadelkammeret:    { navn: "Sadelkammeret", inde_i: "stalden", spil: "inde: stables/sadel", status: "bygget",
                      laas: { kraever: ["flag:hesten_flyttet"], tekst: "Den store hvide hest Vega står foran døren og tygger hø. Hun flytter sig ikke." } },
  rigsdagsgaarden:  { navn: "Rigsdagsgården", spil: "ude: Rigsdagsgården", status: "bygget" },
  folketinget:      { navn: "Folketinget", spil: "inde: folketing", status: "bygget",
                      aaben: ["flag:moedt_bente"], lukketTekst: "Bente står i døren. Tal med hende først." },
  vandrehallen:     { navn: "Vandrehallen og Rigets midte", inde_i: "folketinget", spil: "inde: folketing/hall", status: "bygget" },
  betjentstuen:     { navn: "Betjentstuen", inde_i: "folketinget", spil: "inde: folketing/betjent", status: "bygget" },
  samtalevaerelset: { navn: "Samtaleværelset", inde_i: "folketinget", spil: "inde: folketing/samtale", status: "bygget",
                      laas: { kraever: ["ting:noegle_samtale"], tekst: "Døren er låst. Bente låser den på sin runde kl. 3, som hun plejer.",
                              knap: "Lås op med nøglen", aabnet: "Nøglen passer. Døren til Samtaleværelset går op." } },
  kompas_gang:      { navn: "Kompaspartiets gang", inde_i: "folketinget", spil: "inde: folketing/kompas", status: "bygget" },
  kompas_kontor:    { navn: "Kompaspartiets kontor", inde_i: "kompas_gang", spil: "inde: folketing/office1", status: "bygget" },
  kompas_moedelokale: { navn: "Kompaspartiets mødelokale", inde_i: "kompas_gang", spil: "inde: folketing/meeting", status: "bygget" },
  sekretariatet:    { navn: "Kompaspartiets sekretariat", inde_i: "kompas_gang", spil: "inde: folketing/secretariat", status: "bygget",
                      laas: { kraever: ["ting:kaspers_kort"], tekst: "Døren har en kortlæser. Studiekortet virker ikke her.",
                              knap: "Brug Kaspers gamle kort", aabnet: "Kortlæseren blinker grønt. Kaspers gamle kort virker stadig." } },
  snapstinget:      { navn: "Snapstinget", inde_i: "folketinget", spil: "inde: folketing/snap", status: "bygget",
                      aaben: ["akt>=2"], lukketTekst: "Snapstinget åbner kl. 7 til morgenmad." },
  landstingssalen:  { navn: "Landstingssalen", inde_i: "folketinget", spil: "inde: folketing/landsting", status: "bygget" },
  taarnet:          { navn: "Tårnets elevatorhal", spil: "inde: towerLobby", status: "bygget",
                      aaben: ["akt>=2"], lukketTekst: "Tårnet åbner kl. 7." },
  restauranten:     { navn: "Restauranten i tårnet", inde_i: "taarnet", spil: "inde: towerRestaurant", status: "bygget" },
  udsigten:         { navn: "Udsigten", inde_i: "taarnet", spil: "ude: Udsigten", status: "bygget" },
  proviantpassagen: { navn: "Proviantpassagen", spil: "ude: Proviantpassagen", status: "bygget" },
  slotspladsen:     { navn: "Slotspladsens presseområde", spil: "ude: Slotspladsens presseområde", status: "bygget" },
  prins_joergens_gaard: { navn: "Prins Jørgens Gård", spil: "ude: Prins Jørgens Gård", status: "bygget" },
  riddersalen:      { navn: "Riddersalen", spil: "inde: riddersal", status: "bygget",
                      aaben: ["akt>=3"], lukketTekst: "Riddersalen åbner kl. 8.30, når hoffet begynder at dække op til aftenens gallamiddag." },
  finansministeriet: { navn: "Finansministeriet", spil: "inde: finance", status: "bygget",
                      laas: { kraever: ["ting:gaestekort_fm"], tekst: "En vagt i foyeren: »Kun med adgangskort i dag. Forhandlingerne er ikke slut.«",
                              knap: "Vis vagten gæstekortet", aabnet: "Vagten ser Ditte Rosenvinges initialer på kortet og lukker Ida ind." } },
  fm_garderoben:    { navn: "Finansministeriets garderobe", inde_i: "finansministeriet", spil: "inde: finance/fm-wardrobe", status: "bygget" },
  fm_forhandlingsrummet: { navn: "Finansministeriets forhandlingsrum", inde_i: "finansministeriet", spil: "inde: finance/fm-meeting", status: "bygget" },
  reformministeriet: { navn: "Reformministeriet", spil: "inde: reform", status: "bygget",
                      aaben: ["akt>=3"], lukketTekst: "Hoveddøren er låst. Ministeriet åbner kl. 8.30." },
  valdorfs_kontor:  { navn: "Departementschefens kontor", inde_i: "reformministeriet", spil: "inde: reform/rm-office", status: "bygget",
                      laas: { kode: "1849", kraever: ["flag:kode_hint"], tekst: "En kodelås med fire cifre. Ida ved ikke, hvad koden er.",
                              knap: "Tast koden", aabnet: "Låsen klikker. Døren til departementschefens kontor går op.", forkert: "Lampen blinker rødt. Forkert kode." } },
  rm_printeren:     { navn: "Reformministeriets printerområde", inde_i: "reformministeriet", spil: "inde: reform/rm-print", status: "bygget" },
  rm_sidedoeren:    { navn: "Reformministeriets sidedør", inde_i: "reformministeriet", spil: "inde: reform/rm-side", status: "bygget" },
  kajen_reform:     { navn: "Kajen ved Reformministeriet", spil: "ude: Kajen ved Reformministeriet", status: "bygget" },
  kajen_slots:      { navn: "Kajen ved Slotspladsen", spil: "ude: Kajen ved Slotspladsen", status: "bygget" },
  kanalen:          { navn: "Kanalen ved den gamle fortøjningspæl", spil: "ude: Kanalen ved den gamle fortøjningspæl", status: "bygget",
                      aaben: ["flag:sejlet"], lukketTekst: "Fortøjningspælen står midt i kanalen. Man kan kun komme derud med båd." },
  hoejbro:          { navn: "Højbro", spil: "ude: Højbro", status: "bygget" },
  bibliotekshaven:  { navn: "Bibliotekshaven", spil: "ude: Bibliotekshaven", status: "bygget" },
  // Kun i ekstralaget med 1942. Man kommer dertil med radioen i betjentstuen.
  betjentstuen_1942: { navn: "Betjentstuen, juni 1942", spil: "inde: folketing/betjent", status: "bygget", lag1942: true,
                      aaben: ["lag1942", "flag:i_1942"] },
  ridebanen_1942:   { navn: "Ridebanen, juni 1942", spil: "ude: Ridebanen", status: "bygget", lag1942: true,
                      aaben: ["lag1942", "flag:i_1942"] },
};

// findes: hvor tingen ligger fra start ("start" = i rygsækken). tilbage: tingen skal afleveres igen.
const TING = {
  blyant:         { navn: "Blyant", findes: "start", tekst: "En blød blyant. Ida bruger den i arkiverne, hvor kuglepenne er forbudt." },
  notesbog:       { navn: "Notesbog", findes: "start", tekst: "Idas egen notesbog med spor, personer og en tidslinje." },
  mobil:          { navn: "Mobil", findes: "start", tekst: "Med lommelygte og stopur. 38 procent strøm." },
  studiekort:     { navn: "Studiekort", findes: "start", tekst: "Københavns Universitet, Saxo-Instituttet. Det åbner ingen døre på Christiansborg." },
  briller:        { navn: "Bentes læsebriller", tekst: "Læsebriller i rødt stel med en snor. På stangen står der »B.H.«" },
  noegle_samtale: { navn: "Nøglen til Samtaleværelset", tekst: "En gammel messingnøgle med et mærke: »Samtaleværelset«." },
  kaspers_kort:   { navn: "Kaspers gamle adgangskort", tekst: "Et vådt adgangskort til Folketinget: »Kasper Lindved, Kompaspartiet«. Det udløb for et år siden, men ingen har spærret det." },
  rapport_50000:  { navn: "50.000-rapporten", tekst: "»Arbejdsudbud uden besvær« fra konsulenthuset Prognosehuset Optima. På forsiden: »Op til 50.000 flere i arbejde«." },
  gaestekort_fm:  { navn: "Gæstekort til Finansministeriet", tekst: "Et hvidt gæstekort med nummer 31. Ditte Rosenvinge har skrevet sine initialer på bagsiden." },
  jonas_telefon:  { navn: "Jonas' telefon", tekst: "En telefon i et etui med Kompaspartiets kompasrose. Skærmen er låst, men beskederne kan ses." },
  guleroedder:    { navn: "Gulerødder", tekst: "Tre skrællede gulerødder i en papirpose fra Snapstinget." },
  elefantorden:   { navn: "Elefantordenen", tilbage: true, tekst: "Danmarks fornemste orden: en lille elefant af guld, emalje og diamanter med et tårn på ryggen. Den skal tilbage i Riddersalen før kl. 10." },
  baadnoegle:     { navn: "Bådnøglen", tekst: "En nøgle med en rød flyder: »Bådlauget ved Gammel Strand«." },
  handske:        { navn: "Kongens handske", lag1942: true, tekst: "En brun ridehandske i blødt læder." },
  kongens_noegle: { navn: "Kongens nøgle", lag1942: true, tekst: "En lille messingnøgle med en krone. Den har hængt bag en hestesko i over 80 år." },
};

// tekst er det, Ida skriver i notesbogen. opdatering kommer til, når betingelsen er opfyldt.
const SPOR = {
  1:  { titel: "Liget og termokanden", sted: "vandrehallen",
        tekst: "Aksel Mørkeberg sidder død i sofaen ved Rigets midte. Ingen tegn på kamp. Hans røde termokande, som han altid har med, er væk.",
        opdatering: { kraever: ["flag:retsmed"], tekst: "Retsmedicineren: Han fik noget i kaffen og døde mellem kl. 02 og 03." } },
  2:  { titel: "Koppen med læbestift", sted: "vandrehallen",
        tekst: "En kaffekop med rød læbestift på bordet ved sofaen. Nogen har siddet hos ham i nat." },
  3:  { titel: "Adgangsloggen", sted: "betjentstuen",
        tekst: "Pressekort 17 ind ad døren i Rigsdagsgården kl. 01.52 og ud kl. 02.24. Kasper Lindveds gamle kort ind ved Proviantpassagen kl. 01.30 og ud kl. 02.22." },
  4:  { titel: "Mødet kl. 2", sted: "betjentstuen",
        tekst: "Kl. 01.30 bad Mørkeberg Bente låse Samtaleværelset op. Han skulle mødes kl. 2 med »en fra den anden side af kanalen«. Kl. 3 sad han i sofaen, og Bente troede, han sov." },
  5:  { titel: "Samtaleværelset", sted: "samtalevaerelset",
        tekst: "To stole trukket ud. En kafferand på bordet, for stor til en kop og lige stor nok til en termokande. Under bordet våde fodspor med bølgemønster som fra sejlersko." },
  6:  { titel: "Notesbogen", sted: "vandrehallen",
        tekst: "En side er revet ud af Mørkebergs notesbog. Blyanten fik aftrykket frem: »11.000? Kun 4.000. Dept. har vidst det siden maj. Kl. 10 siger jeg det.«" },
  7:  { titel: "Pernille og pressekort 17", sted: "slotspladsen",
        tekst: "Pernille Strandvig var direkte i radioen fra Slotspladsen kl. 01.45-02.05, så hun kan ikke have brugt kortet kl. 01.52. Pressekort 17 er hendes. Det forsvandt fra hendes frakke i Finansministeriets garderobe under briefingen kl. 23 og lå i lommen igen i morges." },
  8:  { titel: "Jonas Fengers telefon", sted: "kompas_moedelokale",
        tekst: "Jonas glemte sin telefon i Kompaspartiets mødelokale efter et videomøde med hovedbestyrelsen kl. 01.45-02.40. En besked viser, at han mødte Pernille ved springvandet kl. 23.30. Han er hendes kilde. Han og Mørkeberg skændtes om lækket kl. 23.50." },
  9:  { titel: "Referatet", sted: "fm_forhandlingsrummet",
        tekst: "Finansministeriets referat: Kl. 23.40 beder Mørkeberg om at se departementets beregninger. Ditte er i forhandlingsrummet kl. 01.00-03.30. Valdorf går kl. 01.30 for at »regne på tallene« og kommer tilbage kl. 02.50." },
  10: { titel: "Kopimaskinens log", sted: "sekretariatet",
        tekst: "Kasper Lindveds kort kopierede 212 sider i Kompaspartiets sekretariat kl. 01.38-02.12. Han er tyv, ikke morder." },
  11: { titel: "Manden på trappen", sted: "snapstinget",
        tekst: "Kasper så kl. 02.20 en mand i våd, mørk sejlerjakke gå ned ad trappen mod udgangen i Rigsdagsgården med noget rødt under armen." },
  12: { titel: "Den røde båd", sted: "kajen_reform",
        tekst: "Bådlaugets lille røde båd fra Gammel Strand ligger ved kajen ved Reformministeriet. Den er bundet med et pænt pælestik. De andre både i bådlauget er bundet med sjuskede knob." },
  13: { titel: "Svends billeder", sted: "hoejbro",
        tekst: "Svend Lysholts nattebilleder fra Højbro viser lyset fra en lille båd over kanalen fra Ved Stranden mod Slotspladsen kl. 01.44 og tilbage kl. 02.31." },
  14: { titel: "Termokanden", sted: "kanalen",
        tekst: "Den røde termokande med Kompaspartiets kompasrose ligger på bunden ved den gamle fortøjningspæl midt i kanalen. Den kan kun ses fra båden. Nogen har smidt den." },
  15: { titel: "Valdorfs kontor", sted: "valdorfs_kontor",
        tekst: "Knobtavle på væggen, en fugtig sejlerjakke og sejlersko med bølgemønster. Mailen med de nye tal blev skrevet kl. 23.12 og sat til at sende sig selv kl. 02.05." },
  16: { titel: "Fortalelsen", sted: "udsigten",
        tekst: "På Udsigten sagde Valdorf, at politiet vel skal »rode hele kanalen igennem« efter Mørkebergs termokande. Ingen har sagt, at den ligger i kanalen. Det ved kun Ida, som har set den fra båden, og den, der smed den." },
  17: { titel: "Gry og den faste runde", sted: "ridebanen",
        tekst: "Mørkeberg gik sin faste runde på Ridebanen ved midnat og sagde: »I morgen kl. 10 falder der en bombe.« Han var inde i sadelkammeret et øjeblik. Det plejer han ikke." },
  18: { titel: "Bodil og termokanden", sted: "snapstinget",
        tekst: "Bodil fyldte termokanden kl. 21.30 med sort kaffe og to stykker sukker. Kun Mørkeberg drak af den. Hvis der kom noget i kaffen, kom det senere." },
  19: { titel: "Bentes runde", sted: "betjentstuen",
        tekst: "Kl. 02.25 hørte Bente gruset knase i gangen mod Bibliotekshaven. Hun gik derind, satte sig på bænken ved Kierkegaard for at læse en sms og glemte sine briller. Hun troede, det var en ræv." },
  20: { titel: "Papirerne i springvandet", sted: "bibliotekshaven",
        tekst: "Våde fodspor fra gangen hen bag Kierkegaard-statuen. Da springvandet sprang, flød den udrevne side og en tabel ud til kanten. Tabellen viser 4.000 job og er printet i går kl. 18.05 på departementschefens printer." },
  21: { titel: "Den gemte tabel", sted: "sadelkammeret",
        tekst: "I sadelkammeret har Mørkeberg gemt Reformministeriets tabel fra maj: 4.000 flere i job. I margenen står med hans håndskrift: »Kl. 10.«" },
  22: { titel: "Bådnøglen", sted: "valdorfs_kontor",
        tekst: "I lommen på Valdorfs sejlerjakke: nøglen med bådlaugets røde flyder. Den passer til hængelåsen på den røde båd ved kajen." },
};

// Tidslinjen i notesbogen. Hver linje kommer frem, når betingelsen er opfyldt.
const TIDSLINJE = [
  { kl: "21.30", tekst: "Bodil fylder Mørkebergs termokande i Snapstinget", kraever: ["spor:18"] },
  { kl: "22.00", tekst: "Det begynder at regne. Det holder op kl. 02.30", kraever: [] },
  { kl: "23.05", tekst: "Pressekort 17 forsvinder fra Pernilles frakke i Finansministeriet", kraever: ["spor:7"] },
  { kl: "23.12", tekst: "Mailen med de nye tal bliver skrevet på Valdorfs kontor", kraever: ["spor:15"] },
  { kl: "23.30", tekst: "Jonas møder Pernille ved springvandet i Bibliotekshaven", kraever: ["spor:8"] },
  { kl: "23.40", tekst: "Mørkeberg beder om at se departementets beregninger", kraever: ["spor:9"] },
  { kl: "23.50", tekst: "Jonas og Mørkeberg skændes på gangen i Finansministeriet", kraever: ["spor:8"] },
  { kl: "00.15", tekst: "Mørkeberg går sin faste runde på Ridebanen og er inde i sadelkammeret", kraever: ["spor:17"] },
  { kl: "00.30", tekst: "Ditte drikker kaffe med Mørkeberg ved Rigets midte til 00.55", kraever: ["flag:ditte_kop"] },
  { kl: "01.30", tekst: "Mørkeberg beder Bente låse Samtaleværelset op", kraever: ["spor:4"] },
  { kl: "01.30", tekst: "Kaspers gamle kort går ind ved Proviantpassagen", kraever: ["spor:3"] },
  { kl: "01.30", tekst: "Valdorf forlader forhandlingsrummet for at »regne på tallene«", kraever: ["spor:9"] },
  { kl: "01.38", tekst: "Kasper kopierer i sekretariatet til 02.12", kraever: ["spor:10"] },
  { kl: "01.44", tekst: "En lille båd krydser kanalen mod Slotspladsen", kraever: ["spor:13"] },
  { kl: "01.45", tekst: "Pernille er direkte i radioen fra Slotspladsen til 02.05", kraever: ["spor:7"] },
  { kl: "01.45", tekst: "Jonas er i videomøde med hovedbestyrelsen til 02.40", kraever: ["spor:8"] },
  { kl: "01.52", tekst: "Pressekort 17 går ind ad døren i Rigsdagsgården", kraever: ["spor:3"] },
  { kl: "02.00", tekst: "Mødet i Samtaleværelset", kraever: ["spor:4"] },
  { kl: "02.05", tekst: "Mailen med de nye tal sender sig selv", kraever: ["spor:15"] },
  { kl: "02.20", tekst: "En mand i våd sejlerjakke går ned ad trappen med noget rødt", kraever: ["spor:11"] },
  { kl: "02.22", tekst: "Kaspers kort går ud ved Proviantpassagen", kraever: ["spor:3"] },
  { kl: "02.24", tekst: "Pressekort 17 går ud ad døren i Rigsdagsgården", kraever: ["spor:3"] },
  { kl: "02.25", tekst: "Bente hører gruset knase i gangen mod Bibliotekshaven", kraever: ["spor:19"] },
  { kl: "02.31", tekst: "Den lille båd krydser kanalen tilbage", kraever: ["spor:13"] },
  { kl: "02.31", tekst: "Termokanden ryger i vandet ved den gamle fortøjningspæl", kraever: ["spor:13", "spor:14"] },
  { kl: "02.36", tekst: "Mogens ser Valdorf ved printeren, våd i håret", kraever: ["flag:valdorf_vaad"] },
  { kl: "02.50", tekst: "Valdorf er tilbage i forhandlingsrummet med nye tabeller", kraever: ["spor:9"] },
  { kl: "02-03", tekst: "Mørkeberg dør i sofaen", kraever: ["flag:retsmed"] },
  { kl: "03.00", tekst: "Bente låser Samtaleværelset og tror, Mørkeberg sover", kraever: ["spor:4"] },
  { kl: "05.50", tekst: "Rengøringen finder Mørkeberg", kraever: ["spor:1"] },
];

// Personerne. steder siger, hvor personen står i hver akt. kraever siger, hvornår personen er i spillet.
// Hvert emne er en knap i samtalen. spoerg er knappens tekst. Emner med kraever "ting:..." er at give eller vise en ting.
const PERSONER = {
  bente: {
    navn: "Bente Holmsgaard", alder: 59, rolle: "Folketingsbetjent på nattevagt",
    udseende: "Mørkeblå uniform, gråt hår sat op i en knold og en tom brillesnor om halsen.",
    steder: { 1: "betjentstuen", 2: "betjentstuen", 3: "betjentstuen", 4: "landstingssalen" },
    kraever: ["flag:moedt_bente"],
    noter: [
      { kraever: [], tekst: "Folketingsbetjent på nattevagt gennem 31 år. Hendes farfar var betjent her under krigen." },
      { kraever: ["flag:briller_givet"], tekst: "Fik sine briller tilbage. Hun sad på bænken ved Kierkegaard kl. 02.25." },
    ],
    emner: [
      { id: "nat", spoerg: "Hvad skete der i nat?", kraever: [], giver: [], replikker: [
        ["bente", "Rengøringen fandt ham kl. 05.50 i den grønne sofa ved Rigets midte. Han sad bare der med frakken på."],
        ["bente", "Aksel sov tit i Vandrehallen, når forhandlingerne trak ud. Men aldrig uden sin termokande. Den røde. Den er væk."],
      ] },
      { id: "briller", spoerg: "Kan vi se adgangsloggen?", kraever: ["!flag:briller_givet"], giver: ["flag:briller_hint"], replikker: [
        ["bente", "Det kan vi, hvis jeg kan se tasterne. Mine læsebriller er væk."],
        ["bente", "Jeg havde dem på min runde i nat. Jeg satte mig vist et øjeblik på bænken ved Kierkegaard-statuen i Bibliotekshaven. Mine knæ er ikke, hvad de har været."],
        ["bente", "Gå gennem den lille gang i Rigsdagsgården, så kommer du lige ned i haven."],
      ] },
      { id: "giv_briller", spoerg: "Giv Bente brillerne", kraever: ["ting:briller"], giver: ["-ting:briller", "flag:briller_givet", "spor:3"], replikker: [
        ["ida", "Jeg fandt dem på bænken ved Kierkegaard."],
        ["bente", "Mine briller! Og jeg kunne have svoret, at de lå i lommen."],
        ["fortaeller", "Bente taster sin kode. Nattens adgangslog fylder skærmen."],
        ["bente", "Der var ikke mange i huset i nat. To kort skiller sig ud."],
        ["bente", "Pressekort 17 kom ind ad døren her i Rigsdagsgården kl. 01.52 og gik igen kl. 02.24."],
        ["bente", "Og så Kasper Lindved. Ind ved Proviantpassagen kl. 01.30 og ud kl. 02.22. Han blev fyret for et år siden. Hans kort burde slet ikke virke."],
      ] },
      { id: "moedet", spoerg: "Hvad skete der omkring kl. 2?", kraever: ["spor:3", "!flag:fik_noeglen"], giver: ["spor:4", "+ting:noegle_samtale", "flag:fik_noeglen"], replikker: [
        ["bente", "Vent. Kl. halv to bad Aksel mig låse Samtaleværelset op. Han skulle mødes kl. 2 med »en fra den anden side af kanalen«, sagde han og blinkede."],
        ["bente", "Kl. 3 låste jeg igen, som jeg plejer. Aksel sad i sofaen ved Rigets midte. Jeg troede, han sov."],
        ["bente", "Her er nøglen. Jeg kiggede aldrig derind. Det var mørkt, og jeg var træt."],
        ["bente", "Dørene til Samtaleværelset er ved Rigets midte, på hver side af kaminen."],
      ] },
      { id: "runden", spoerg: "Hvordan gik din runde i nat?", kraever: ["flag:briller_givet"], giver: ["spor:19"], replikker: [
        ["bente", "Kl. 02.25 gik jeg gennem Rigsdagsgården med lommelygten. Gruset knasede i gangen ned mod Bibliotekshaven."],
        ["bente", "Jeg gik derind, men der var ingen. Så satte jeg mig på bænken ved Kierkegaard og læste en sms fra min datter. Det var nok der, brillerne blev liggende."],
        ["bente", "Jeg troede, det var en ræv. Der bor en i haven."],
      ] },
      { id: "kasper", spoerg: "Tror du, det var Kasper?", kraever: ["flag:kommissaer_kommet"], giver: [], replikker: [
        ["bente", "Kasper? Han kan ikke slå en flue ihjel. Han åbner vinduet og beder den pænt om at gå."],
        ["bente", "Han er en klovn med en dyr skjorte. Men han er ikke en morder."],
      ] },
      { id: "huset", spoerg: "Fortæl om huset", kraever: [], giver: ["flag:kender_radioen"], replikker: [
        ["bente", "31 år har jeg gået her om natten. Min farfar gik her før mig, også under krigen. Dengang hed det Rigsdagen."],
        ["ida", "Rigsdagen. Det hed det indtil grundloven i 1953."],
        ["bente", "Hans gamle radio står stadig derovre i hjørnet. Den virker ikke, men jeg kan ikke nænne at smide den ud."],
      ] },
      { id: "hjaelp", spoerg: "Hvad skal jeg gøre nu?", hjaelp: true, kraever: [], giver: [], replikker: [
        ["bente", "{hint}"],
      ] },
    ],
  },

  kommissaer: {
    navn: "Lone Hald", kort: "Hald", alder: 58, rolle: "Kriminalkommissær, Københavns Politi",
    udseende: "Våd trenchcoat, kort gråt hår og kaffe i papkrus.",
    steder: { 1: "vandrehallen", 2: "vandrehallen", 3: "vandrehallen", 4: "landstingssalen" },
    kraever: ["flag:kommissaer_kommet"],
    noter: [
      { kraever: [], tekst: "Kriminalkommissær. Vil sige på pressemødet kl. 10, at Kasper Lindved er anholdt." },
    ],
    emner: [
      { id: "kasper", spoerg: "Hvorfor tror De, det er Kasper Lindved?", kraever: [], giver: [], replikker: [
        ["kommissaer", "Loggen. Hans gamle kort gik ind kl. 01.30 og ud kl. 02.22. Det er lige i den tid, hvor det må være sket."],
        ["kommissaer", "Mørkeberg fyrede ham sidste år. Siden har Lindved skrevet grimme ting om ham på nettet. En fyret spindoktor med et kort, der ikke burde virke. Det er ikke raketvidenskab."],
      ] },
      { id: "kort17", spoerg: "Hvad med pressekort 17?", kraever: ["spor:3"], giver: [], replikker: [
        ["kommissaer", "Pressen render ud og ind hele natten med de kort. Journalister slår ikke folk ihjel. De skriver bare om det bagefter."],
      ] },
      { id: "termokanden", spoerg: "Hvad med termokanden?", kraever: [], giver: [], replikker: [
        ["kommissaer", "Den er væk. Det ved hele huset, for Bente har fortalt det til alle."],
        ["kommissaer", "Termokander forsvinder hver dag på Christiansborg. Det gør journalister desværre ikke."],
      ] },
      { id: "hjaelpe", spoerg: "Må jeg se mig omkring?", kraever: [], giver: [], replikker: [
        ["kommissaer", "De må gå, hvor De vil, så længe De ikke rører ved noget."],
        ["kommissaer", "Og De rører ikke ved noget."],
      ] },
      { id: "vis_log", spoerg: "Vis hende kopimaskinens log", kraever: ["spor:10"], giver: [], replikker: [
        ["kommissaer", "Så Lindved kopierede papirer, mens han var her. Det gør ham også til tyv. Det gør det ikke bedre."],
      ] },
      { id: "vis_manden", spoerg: "Fortæl om manden på trappen", kraever: ["spor:11"], giver: [], replikker: [
        ["kommissaer", "En mand i sejlerjakke. Halvdelen af Slotsholmen går i sejlerjakke, når det regner. Kom tilbage, når De har et navn."],
      ] },
      { id: "retsmed", spoerg: "Hvad sagde retsmedicineren?", kraever: ["flag:retsmed"], giver: [], replikker: [
        ["kommissaer", "Noget i kaffen. Død mellem kl. 2 og 3. Mere får pressen ikke, og mere får De heller ikke."],
      ] },
    ],
  },

  statsminister: {
    navn: "Statsministeren", alder: null, rolle: "Statsminister",
    udseende: "Mørkeblå frakke, rødt halstørklæde og to livvagter et skridt bagved.",
    steder: { 1: "vandrehallen", 2: "restauranten", 3: "restauranten", 4: "landstingssalen" },
    kraever: ["flag:beg_statsministeren"],
    noter: [
      { kraever: [], tekst: "Holder fast i pressemødet kl. 10 i Landstingssalen." },
    ],
    emner: [
      { id: "pressemoedet", spoerg: "Bliver pressemødet holdt?", kraever: [], giver: [], replikker: [
        ["statsminister", "Danmark venter på en reform, og kommissæren siger, hun har sin mand. Pressemødet holder kl. 10."],
        ["statsminister", "Hvis De ved noget, hun ikke ved, så har De til kl. 10."],
      ] },
      { id: "moerkeberg", spoerg: "Kendte De Aksel Mørkeberg?", kraever: [], giver: [], replikker: [
        ["statsminister", "Alle kendte Aksel. Han kunne trække et forlig ud i tre døgn for at få et ekstra kapitel i sine erindringer."],
        ["statsminister", "Men han regnede altid efter. Det kan man ikke sige om alle i det her hus."],
      ] },
    ],
  },

  gry: {
    navn: "Gry Strigle", alder: 34, rolle: "Beridder i De Kongelige Stalde",
    udseende: "Ridebukser, grøn vest og en hjelm under armen.",
    steder: { 1: "ridebanen", 2: "stalden", 3: "stalden" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Beridder med nattevagt i staldene." },
      { kraever: ["spor:17"], tekst: "Talte med Mørkeberg ved midnat. Han var inde i sadelkammeret." },
    ],
    emner: [
      { id: "hilsen", spoerg: "Godmorgen", kraever: ["!flag:moedt_bente"], giver: ["spor:17", "flag:sadelkammer_hint"], replikker: [
        ["gry", "Godmorgen! Du er tidligt oppe. Det var Aksel Mørkeberg også. Han gik sin faste runde her ved midnat, som han altid gør, når han skal tænke."],
        ["gry", "Han var i strålende humør. »I morgen kl. 10 falder der en bombe, Gry«, sagde han."],
        ["gry", "Og så gik han et øjeblik ind i sadelkammeret. Det plejer han ikke. Politikere."],
        ["ida", "En bombe kl. 10? Det skriver jeg ned. Det lyder som en god historie."],
        ["ida", "Jeg skal møde Bente fra nattevagten ved Folketingets dør. Kan jeg gå gennem slottet herfra?"],
        ["gry", "Nej, der er ingen vej igennem. Gå tilbage mod Marmorbroen, men ikke over den. Drej til venstre langs kanalen, og følg Tøjhusgade. For enden af gaden er porten ind til Rigsdagsgården."],
      ] },
      { id: "natten", spoerg: "Så du nogen i nat?", kraever: ["flag:moedt_bente"], giver: ["spor:17", "flag:sadelkammer_hint"], replikker: [
        ["gry", "Kun Aksel Mørkeberg. Han går altid en runde her ved midnat, når han skal tænke. Han siger, at hestene er de eneste på Slotsholmen, der ikke lækker."],
        ["gry", "I nat var han i strålende humør. »I morgen kl. 10 falder der en bombe, Gry«, sagde han."],
        ["gry", "Han gik også et øjeblik ind i sadelkammeret. Det plejer han ikke. Han kom ud uden noget i hænderne."],
      ] },
      { id: "hestene", spoerg: "Fortæl om hestene", kraever: [], giver: ["flag:vega_hint"], replikker: [
        ["gry", "Vi trækker dem ud, før byen vågner. Så får de ro, og vi får ro."],
        ["gry", "Vega er den store hvide. Hun er sød, men hun flytter sig ikke for nogen uden en gulerod. Køkkenet i Snapstinget plejer at sende nogle over."],
      ] },
      { id: "sadelkammeret", spoerg: "Kan jeg komme ind i sadelkammeret?", kraever: ["akt>=2", "flag:sadelkammer_hint", "!flag:hesten_flyttet"], giver: ["flag:vega_hint"], replikker: [
        ["gry", "Hvis du kan få Vega væk fra døren. Hun har stillet sig der i nat og vil ikke flytte sig."],
        ["gry", "Prøv med en gulerod. Bodil i Snapstinget har altid nogle."],
      ] },
      { id: "hestesko", spoerg: "Hvad er det for hestesko over porten?", kraever: ["lag1942", "flag:skab_laast"], giver: ["flag:hestesko_hint"], replikker: [
        ["gry", "De har hængt der siden Christian 10.s tid. Under krigen red han gennem byen hver morgen."],
        ["gry", "Man siger, han gemte noget bag en af dem. Men ingen tør pille ved dem."],
      ] },
    ],
  },

  bodil: {
    navn: "Bodil Kryddal", alder: 62, rolle: "Køkkenchef i Snapstinget",
    udseende: "Hvid kokkejakke, briller i panden og en kaffekande i hver hånd.",
    steder: { 2: "snapstinget", 3: "snapstinget" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Køkkenchef i Snapstinget. Fylder Mørkebergs termokande hver aften." },
    ],
    emner: [
      { id: "termokanden", spoerg: "Fyldte du Mørkebergs termokande i går?", kraever: [], giver: ["spor:18"], replikker: [
        ["bodil", "Kl. 21.30, som altid. Sort kaffe og to stykker sukker. Han sagde, at kaffen i Finansministeriet smager af regneark."],
        ["bodil", "Ingen andre drak af den kande. Han lod ikke engang mig smage."],
        ["bodil", "Så hvis der kom noget i den, kom det ikke fra mit køkken. Det kom senere."],
      ] },
      { id: "navnet", spoerg: "Hvorfor hedder det Snapstinget?", kraever: [], giver: [], replikker: [
        ["ida", "Jeg har læst, at navnet måske kommer fra et gammelt tingsted ved Viborg, som folk kaldte Snabstinget."],
        ["bodil", "Det har jeg aldrig hørt. Jeg troede, det var på grund af snapsen."],
      ] },
      { id: "guleroedder", spoerg: "Har du gulerødder til staldene?", kraever: ["flag:vega_hint|flag:hest_i_vejen|akt>=3", "!flag:fik_guleroedder"], giver: ["+ting:guleroedder", "flag:fik_guleroedder"], replikker: [
        ["bodil", "Selvfølgelig. Vi sender skrællerne over hver morgen, men hestene foretrækker de hele. Tag tre."],
        ["bodil", "Og sig til Vega, at hun skylder mig en tur i karet."],
      ] },
      { id: "kasper", spoerg: "Hvornår kom Kasper Lindved?", kraever: [], giver: [], replikker: [
        ["bodil", "Han sad der, da jeg låste op kl. 7. Han har spist fire rundstykker og ikke sagt et ord. Det ligner ham ikke."],
      ] },
    ],
  },

  ditte: {
    navn: "Ditte Rosenvinge", alder: 47, rolle: "Reformminister",
    udseende: "Mørkegrå dragt, rød læbestift og en telefon i hver hånd.",
    steder: { 2: "restauranten", 3: "restauranten", 4: "landstingssalen" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Reformminister. Fremtidsreformen er hendes livsværk. Mørkeberg truede med at stemme nej." },
      { kraever: ["flag:ditte_kop"], tekst: "Drak kaffe med Mørkeberg ved Rigets midte kl. 00.30-00.55." },
      { kraever: ["flag:ditte_renset"], tekst: "Lovede Mørkeberg et sidebrev med en post i EU. Var i forhandlingsrummet kl. 01.00-03.30. Renset." },
    ],
    emner: [
      { id: "natten", spoerg: "Hvor var De i nat?", kraever: [], giver: [], replikker: [
        ["ditte", "I forhandlingsrummet i Finansministeriet. Fra kl. 1 til halv fire uden pause. Spørg de ni andre, hvis de kan huske det."],
        ["ditte", "Undskyld mig. Jeg har et pressemøde at forberede."],
      ] },
      { id: "koppen", spoerg: "Vis hende koppen med læbestift", kraever: ["spor:2"], giver: ["flag:ditte_kop"], replikker: [
        ["ditte", "Det er min farve, ja. Jeg drak en kop kaffe med Aksel ved Rigets midte ved halv ettiden."],
        ["ditte", "Det er ikke forbudt at drikke kaffe med sin forhandlingspartner. Han var levende og irriterende, da jeg gik kl. 00.55."],
      ] },
      { id: "hvad_talte", spoerg: "Hvad talte I om?", kraever: ["flag:ditte_kop", "!flag:ditte_renset"], giver: ["flag:ditte_vil_have_rapport"], replikker: [
        ["ditte", "Forhandlinger er fortrolige."],
        ["ida", "Og hvis jeg havde noget, De gerne ville have?"],
        ["ditte", "Kompaspartiet har bestilt en rapport hos Prognosehuset Optima. Den har ingen vist mig. Den ville jeg gerne se før kl. 10."],
      ] },
      { id: "giv_rapport", spoerg: "Giv hende 50.000-rapporten", kraever: ["ting:rapport_50000"], giver: ["-ting:rapport_50000", "+ting:gaestekort_fm", "flag:ditte_renset"], replikker: [
        ["ditte", "»Arbejdsudbud uden besvær«. 50.000! Hvorfor har ingen vist mig den her?"],
        ["ditte", "Godt. Jeg lovede Aksel et sidebrev: en post i EU, hvis han stemte ja. Det er ikke pænt, men det er heller ikke mord."],
        ["ditte", "Jeg var i forhandlingsrummet fra kl. 1 til halv fire, og der er et referat. Her er mit gæstekort til Finansministeriet. Se selv."],
      ] },
      { id: "valdorf", spoerg: "Hvad lavede Deres departementschef i nat?", kraever: ["flag:ditte_renset"], giver: ["flag:valdorf_alibi_hoert"], replikker: [
        ["ditte", "Henrik? Han er min klippe. Han gik over i ministeriet kl. halv to for at regne tallene igennem en sidste gang."],
        ["ditte", "Kl. 02.05 kom mailen med de nye tal, og kl. 02.50 sad han ved bordet igen. Han arbejder, mens vi andre sover."],
      ] },
      { id: "tallene", spoerg: "Holder de 11.000 job?", kraever: [], giver: [], replikker: [
        ["ditte", "Elleve tusind. Regnet af Reformministeriet efter alle kunstens regler. Det har jeg sagt i tv, og det siger jeg igen kl. 10."],
      ] },
    ],
  },

  jonas: {
    navn: "Jonas Fenger", alder: 33, rolle: "Næstformand i Kompaspartiet",
    udseende: "Smal jakke, hvide sneakers og to telefoner. Han leder efter den tredje.",
    steder: { 2: "kompas_kontor", 3: "kompas_kontor", 4: "landstingssalen" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Næstformand og kronprins i Kompaspartiet. Mørkeberg ville være formand en periode til." },
      { kraever: ["spor:8"], tekst: "Pernilles kilde. I videomøde kl. 01.45-02.40. Renset." },
    ],
    emner: [
      { id: "moerkeberg", spoerg: "Hvordan var Mørkeberg som formand?", kraever: [], giver: [], replikker: [
        ["jonas", "Aksel var en legende. Og legender bliver ved, til nogen giver dem en pensionsgave. Han ville have en periode til."],
        ["jonas", "Jeg vil gerne være formand. Det er ingen hemmelighed. Men jeg ville slå ham på et landsmøde, ikke på den her måde."],
      ] },
      { id: "natten", spoerg: "Hvor var du i nat?", kraever: ["!flag:jonas_renset"], giver: [], replikker: [
        ["jonas", "Her på kontoret. Jeg arbejdede. Der er ikke mere at sige."],
      ] },
      { id: "skaenderiet", spoerg: "Hvad skændtes du og Mørkeberg om kl. 23.50?", kraever: ["flag:hoert_om_skaenderi"], giver: ["flag:jonas_alibi_hoert"], replikker: [
        ["jonas", "Hvem har sagt det? Fint. Han beskyldte mig for at lække til pressen. Det har jeg ikke gjort."],
        ["jonas", "Og fra kl. 01.45 til 02.40 sad jeg i videomøde med hele hovedbestyrelsen i mødelokalet. Optagelsen ligger på min telefon. Hvis jeg kunne finde den."],
      ] },
      { id: "giv_telefon", spoerg: "Giv ham telefonen fra mødelokalet", kraever: ["ting:jonas_telefon"], giver: ["-ting:jonas_telefon", "spor:8", "flag:jonas_renset"], replikker: [
        ["jonas", "Min telefon! Hvor var den?"],
        ["ida", "På bordet i mødelokalet. Der kom en besked, mens den lå der. Fra »P.S.«: »Tak for i går ved springvandet. Ring, når du kan.«"],
        ["ida", "P.S. Pernille Strandvig?"],
        ["jonas", "Okay. Ja. Jeg har lækket. Men jeg har ikke slået nogen ihjel."],
        ["jonas", "Se her: optagelsen af videomødet. Fra 01.45 til 02.40 sidder jeg i billedet hele tiden. Det er det kedeligste alibi i Danmarks historie."],
      ] },
    ],
  },

  pernille: {
    navn: "Pernille Strandvig", alder: 52, rolle: "Politisk kommentator på Dagbladet Nordlyset",
    udseende: "Lang regnfrakke, presseskilt om halsen og kaffe i en termokop.",
    steder: { 2: "slotspladsen", 3: "slotspladsen", 4: "landstingssalen" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Kommentator på Dagbladet Nordlyset. Mørkeberg truede med at afsløre hendes kilde." },
      { kraever: ["spor:7"], tekst: "Direkte i radioen fra Slotspladsen kl. 01.45-02.05. Hendes pressekort 17 blev stjålet i nat. Renset." },
    ],
    emner: [
      { id: "natten", spoerg: "Hvor var du i nat?", kraever: [], giver: ["flag:hoert_om_skaenderi", "flag:pernille_alibi"], replikker: [
        ["pernille", "Her, ved radiovognen. Jeg var direkte i nattens radioudsendelse fra kl. 01.45 til 02.05. Halvdelen af Danmark hørte mig gabe."],
        ["pernille", "Med projektørerne i øjnene kunne vi ikke se en meter ud i mørket. Men vi så departementschefen gå over broen til sit ministerium ved halv to-tiden. Han vinkede."],
        ["pernille", "Det sjoveste i nat skete kl. 23.50. Jonas Fenger og Mørkeberg råbte ad hinanden på gangen i Finansministeriet. Vi kunne høre det helt herud."],
      ] },
      { id: "kort17", spoerg: "Er pressekort 17 dit?", kraever: ["spor:3"], giver: ["spor:7", "flag:pernille_alibi"], replikker: [
        ["pernille", "Sytten? Ja, det er mit pressekort. Hvorfor?"],
        ["pernille", "Det forsvandt fra min frakke i Finansministeriets garderobe under briefingen kl. 23. Ved ettiden ville jeg over i Folketinget, og så var det væk. Jeg måtte låne en kollegas."],
        ["pernille", "Det mærkelige er, at det lå i min frakkelomme igen i morges. Og før du spørger: Jeg var direkte i radioen fra 01.45 til 02.05. Spørg teknikeren."],
      ] },
      { id: "kilden", spoerg: "Hvem er din kilde?", kraever: ["spor:8"], giver: [], replikker: [
        ["pernille", "Det siger jeg aldrig."],
        ["pernille", "Men hvis Jonas allerede har fortalt det, så er det jo ham, der har sagt det. Ikke mig."],
      ] },
    ],
  },

  kasper: {
    navn: "Kasper Lindved", alder: 44, rolle: "PR-rådgiver i Bro & Bølge Kommunikation",
    udseende: "Dyr skjorte, mørke rande under øjnene og et rundstykke i hånden.",
    steder: { 2: "snapstinget", 3: "snapstinget", 4: "landstingssalen" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Mørkebergs tidligere spindoktor, fyret sidste år. Nu PR-rådgiver. Kommissæren vil anholde ham." },
      { kraever: ["flag:kasper_indroemmer"], tekst: "Indrømmer, at han var i huset i nat." },
      { kraever: ["spor:10"], tekst: "Kopierede papirer kl. 01.38-02.12. Tyv, ikke morder." },
    ],
    emner: [
      { id: "natten", spoerg: "Var du i Folketinget i nat?", kraever: ["!flag:kasper_indroemmer"], giver: [], replikker: [
        ["kasper", "Nej. Jeg sov hjemme i Valby. Spørg min kat."],
      ] },
      { id: "kortet", spoerg: "Vis ham kortet fra vandpytten", kraever: ["ting:kaspers_kort"], giver: ["flag:kasper_indroemmer"], replikker: [
        ["kasper", "Det kan være faldet ud af min lomme for et år siden."],
        ["ida", "Det er stadig vådt."],
        ["kasper", "Fint. Jeg var her. Men jeg rørte ikke Aksel. Jeg var her for papirer, ikke for ham."],
      ] },
      { id: "vis_log", spoerg: "Vis ham kopimaskinens log", kraever: ["spor:10"], giver: ["spor:11", "flag:kasper_indroemmer"], replikker: [
        ["kasper", "212 sider. Ja. En kunde hos Bro & Bølge ville gerne vide, hvad Kompaspartiet egentlig mente om reformen. Det er dumt, ikke dødeligt."],
        ["kasper", "Og nu, hvor du ved det: Da jeg gik kl. 02.20, så jeg en mand på trappen. Mørk sejlerjakke, våd som en hund. Han gik ned mod udgangen i Rigsdagsgården med noget rødt under armen."],
        ["kasper", "Jeg sagde ikke noget til kommissæren. Så skulle jeg jo indrømme, at jeg var her."],
      ] },
      { id: "fyret", spoerg: "Hvorfor blev du fyret?", kraever: [], giver: [], replikker: [
        ["kasper", "Jeg skrev en tale, hvor Aksel kom til at love gratis tandlæge til alle. Han holdt den uden at læse den først. Det var hans fejl, men det var mig, der røg."],
      ] },
    ],
  },

  valdorf: {
    navn: "Henrik Valdorf", kort: "Valdorf", alder: 58, rolle: "Departementschef i Reformministeriet",
    udseende: "Gråt jakkesæt, gult slips og en mappe under armen. Solbrun som en, der sejler hver weekend.",
    steder: { 2: "vandrehallen", 3: "restauranten", 4: "udsigten" },
    kraever: ["flag:valdorf_her"],
    noter: [
      { kraever: [], tekst: "Departementschef i Reformministeriet. Har regnet reformen ud til 11.000 job. Meget hjælpsom." },
      { kraever: ["flag:valdorf_alibi_hoert"], tekst: "Siger, at han regnede i sit ministerium kl. 01.35-02.50. Mailen gik kl. 02.05, og Mogens så ham ved printeren." },
      { kraever: ["flag:valdorf_vaad"], tekst: "Var våd i håret ved printeren kl. 02.36. Det regner ikke indenfor." },
      { kraever: ["spor:16"], tekst: "Vidste, at termokanden ligger i kanalen, før nogen havde sagt det." },
    ],
    emner: [
      { id: "natten", spoerg: "Hvor var De i nat?", kraever: [], giver: ["flag:valdorf_alibi_hoert"], replikker: [
        ["valdorf", "I forhandlingsrummet til halv to. Så gik jeg over i Reformministeriet for at regne tallene igennem en sidste gang. Pressen så mig gå over broen."],
        ["valdorf", "Mailen med de nye tal gik kl. 02.05. Min kontorchef Mogens så mig ved printeren lidt over halv tre, og kl. 02.50 var jeg tilbage. En helt almindelig nat i staten."],
      ] },
      { id: "moerkeberg", spoerg: "Hvad tænkte De om Mørkeberg?", kraever: [], giver: ["flag:hoert_om_skaenderi"], replikker: [
        ["valdorf", "En dygtig mand. Han kunne læse et regnestykke bagfra og finde en fejl, der ikke var der."],
        ["valdorf", "Jeg vil gerne hjælpe. Har De talt med Jonas Fenger? Han og Aksel skændtes kl. 23.50. Og Kasper Lindved har længe haft et horn i siden på ham."],
      ] },
      { id: "tallene", spoerg: "Holder tallene i reformen?", kraever: [], giver: [], replikker: [
        ["valdorf", "11.000 flere i job. Regnet efter alle kunstens regler."],
        ["valdorf", "Jeg har lavet regnestykker for staten i 30 år. De holder."],
      ] },
      { id: "sejlads", spoerg: "De ser ud til at være meget ude i vejret", kraever: [], giver: ["flag:valdorf_sejler"], replikker: [
        ["valdorf", "Jeg er med i bådlauget ved Gammel Strand. Der er ingen mails på vandet."],
        ["valdorf", "Det er det eneste sted, hvor et knob betyder mere end en kommafejl."],
      ] },
      { id: "vis_baad", spoerg: "Fortæl ham om den røde båd", kraever: ["spor:12", "akt<=3"], giver: [], replikker: [
        ["valdorf", "En båd? Folk låner både hele tiden i den her by. Turister, mest."],
      ] },
      { id: "udsigten", spoerg: "Hvorfor ville De tale med mig?", kraever: ["akt>=4"], giver: ["spor:16"], replikker: [
        ["valdorf", "Bente siger, De har gået rundt hele morgenen. Jeg tænkte, De måske trængte til et overblik."],
        ["valdorf", "Se, derovre ligger mit ministerium. Og dernede Folketinget. Et kvarters gang over broen."],
        ["valdorf", "Forfærdeligt med Aksel. Han tog de tal alt for tungt."],
        ["fortaeller", "Valdorf ser ned på kanalen lidt for længe."],
        ["valdorf", "Og nu skal politiet vel rode hele kanalen igennem efter hans gamle termokande."],
        ["fortaeller", "Ida skriver i sin notesbog. Ingen har sagt, at termokanden ligger i kanalen. Det ved kun Ida, som har set den fra båden. Og den, der smed den."],
        ["valdorf", "Nå. Pressemødet venter. Vi ses i Landstingssalen."],
      ] },
    ],
  },

  mogens: {
    navn: "Mogens Brask", alder: 56, rolle: "Kontorchef i Reformministeriet",
    udseende: "Brun cardigan, DJØF-nål på reversen og tape på det ene brillestel.",
    steder: { 2: "landstingssalen", 3: "landstingssalen", 4: "landstingssalen" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Kontorchef i Reformministeriet og medlem af DJØF i 31 år. Sætter pressemødet op. Drømmer om Elefantordenen." },
      { kraever: ["flag:mogens_talt"], tekst: "Gav Mørkeberg de rigtige tal: 4.000 job. Kender koden til Valdorfs kontor." },
    ],
    emner: [
      { id: "hvad_laver", spoerg: "Hvad laver De?", kraever: [], giver: [], replikker: [
        ["mogens", "Jeg sætter navneskilte op til pressemødet. 31 år i staten, og jeg ender som skiltemand."],
        ["mogens", "De skal stå efter rang. Det tager tid, når ingen vil sidde ved siden af Kompaspartiet."],
      ] },
      { id: "natten", spoerg: "Var De på arbejde i nat?", kraever: [], giver: ["flag:valdorf_alibi_hoert"], replikker: [
        ["mogens", "Ja, i Reformministeriet. Jeg så Henrik ved printeren lidt over halv tre. Han arbejder altid, når andre sover."],
      ] },
      { id: "tallene", spoerg: "Holder tallene?", kraever: [], giver: ["flag:mogens_elefant"], replikker: [
        ["mogens", "Det er ikke mit bord. Henrik har tallene."],
        ["mogens", "Har De i øvrigt set, hvor få der har fået Elefantordenen? Kun fire borgerlige danskere siden 1900. Det er et bedre emne."],
      ] },
      { id: "orden", spoerg: "Vis ham Elefantordenen", kraever: ["ting:elefantorden"], giver: ["flag:mogens_talt", "flag:kode_hint", "flag:valdorf_vaad", "-ting:elefantorden", "-flag:orden_ude", "flag:orden_tilbage", "flag:mogens_baerer"], replikker: [
        ["mogens", "Må jeg? Bare et øjeblik."],
        ["fortaeller", "Mogens holder ordenen i flade hænder, som var den en fugleunge."],
        ["mogens", "Kun fire borgerlige danskere siden 1900. Og nu står en kontorchef her og holder den."],
        ["mogens", "Ved De hvad? Jeg har aldrig fortalt det til nogen. Det var mig, der gav Aksel tallene fra maj. 4.000 flere i job, ikke 11.000. Han havde ret til at vide det."],
        ["mogens", "Henrik har låst de rigtige tal inde på sit kontor. Koden er den samme på alle hans låse: året, hvor Danmark fik sin første grundlov."],
        ["mogens", "Og en ting mere. Da jeg så ham ved printeren i nat, var han våd i håret. Det regner ikke indenfor."],
        ["ida", "Tak. Nu skal ordenen tilbage til hoffoureren. Jeg har lovet ti minutter."],
        ["mogens", "Må jeg bære den derhen? Bare én gang i mit liv. Det er nok det nærmeste, jeg kommer."],
        ["fortaeller", "Ida nikker. Mogens lægger ordenen på sin mappe som på en sølvbakke og retter ryggen."],
      ] },
      { id: "rapporten", spoerg: "Hvad med 50.000-rapporten?", kraever: ["flag:ditte_renset"], giver: [], replikker: [
        ["mogens", "Den fra Prognosehuset Optima? Jeg så den på ministerens bord i morges."],
        ["mogens", "Der er en kommafejl på forsiden. Der skulle have stået 5.000,0."],
      ] },
    ],
  },

  hoffourer: {
    navn: "Viggo Aagaard", kort: "Hoffoureren", alder: 63, rolle: "Hoffourer",
    udseende: "Mørk livré, hvide handsker og en tyk protokol under armen.",
    steder: { 3: "riddersalen", 4: "riddersalen" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Hoffourer. Passer på Elefantordenen til aftenens gallamiddag." },
    ],
    emner: [
      { id: "etuiet", spoerg: "Hvad ligger der i etuiet?", kraever: [], giver: ["flag:hoffourer_spurgt"], replikker: [
        ["hoffourer", "Elefantordenen. Den skal ligge fremme til aftenens gallamiddag for en udenlandsk gæst."],
        ["ida", "Må jeg låne den? Ti minutter. Det er til et speciale."],
        ["hoffourer", "Ingen låner Elefantordenen."],
        ["hoffourer", "Medmindre det er en historiker, der kan fortælle mig, hvem der har lavet gobelinerne på væggene. Det ved ingen af dem, der kommer her."],
      ] },
      { id: "laan", spoerg: "Lån Elefantordenen", kraever: ["flag:hoffourer_spurgt", "flag:gobelin_kendt", "!ting:elefantorden", "!flag:mogens_baerer"], giver: ["+ting:elefantorden", "flag:orden_ude", "-flag:orden_tilbage"], replikker: [
        ["ida", "Bjørn Nørgaard. 17 gobeliner med Danmarks og verdens historie. De blev hængt op i 2000."],
        ["hoffourer", "Korrekt. Skriv Deres navn i protokollen. Ti minutter."],
        ["hoffourer", "Og er den ikke tilbage før kl. 10, finder jeg Dem. Hoffet tæller elefanter."],
      ] },
      { id: "aflever", spoerg: "Læg Elefantordenen tilbage", kraever: ["ting:elefantorden"], giver: ["-ting:elefantorden", "-flag:orden_ude", "flag:orden_tilbage"], replikker: [
        ["hoffourer", "Ni minutter og fyrre sekunder. Hoffet takker."],
      ] },
      { id: "mogens", spoerg: "Fik De ordenen tilbage?", kraever: ["flag:mogens_baerer"], giver: [], replikker: [
        ["hoffourer", "En kontorchef kom med den på en mappe. Han gik meget langsomt gennem Vandrehallen, så alle kunne se ham."],
        ["hoffourer", "Ni minutter og fyrre sekunder. Hoffet takker."],
      ] },
    ],
  },

  svend: {
    navn: "Svend Lysholt", alder: 67, rolle: "Pensioneret fotograf",
    udseende: "Uldhue, stativ over skulderen og et kamera med et langt objektiv.",
    steder: { 2: "hoejbro", 3: "hoejbro" },
    kraever: [],
    noter: [
      { kraever: [], tekst: "Pensioneret fotograf. Tager lange nattebilleder fra Højbro." },
    ],
    emner: [
      { id: "billederne", spoerg: "Hvad fotograferer De?", kraever: [], giver: ["spor:13"], replikker: [
        ["svend", "Natten. Lange billeder, et halvt minut hver. Lyset trækker streger, og byen står stille."],
        ["svend", "I nat var her næsten ingen. Bortset fra en lille båd."],
        ["ida", "Må jeg se?"],
        ["svend", "Her: kl. 01.44 krydser en lanterne kanalen fra Ved Stranden mod Slotspladsen. Og her kl. 02.31 tilbage igen."],
        ["svend", "Hvem sejler i en lille båd kl. 2 om natten i regnvejr? Det må være en, der ikke vil ses."],
      ] },
      { id: "havmanden", spoerg: "Kender De havmanden under broen?", kraever: [], giver: [], replikker: [
        ["ida", "Agnete og havmanden. Han ligger på bunden lige under os med sine syv sønner."],
        ["svend", "Ham har jeg fotograferet 400 gange. Han har aldrig sagt noget."],
      ] },
    ],
  },

  // Kun i ekstralaget med 1942.
  holger: {
    navn: "Holger Holmsgaard", alder: 52, rolle: "Betjent i Rigsdagen, Bentes farfar", lag1942: true,
    udseende: "Uniform med messingknapper, kasket og et stort overskæg.",
    steder: { 2: "betjentstuen_1942", 3: "betjentstuen_1942" },
    kraever: ["lag1942", "flag:i_1942"],
    noter: [
      { kraever: [], tekst: "Bentes farfar. Betjent i Rigsdagen i 1942." },
    ],
    emner: [
      { id: "hvem", spoerg: "Godmorgen", kraever: [], giver: ["flag:holger_talt"], replikker: [
        ["holger", "Godmorgen, frøken. Hvem har lukket Dem ind i Rigsdagen så tidligt?"],
        ["ida", "Jeg skriver om huset."],
        ["holger", "Så skulle De se kongen. Han rider forbi Ridebanen hver morgen, helt uden følge. Men pas på patruljerne. De har vel ingen papirer?"],
      ] },
    ],
  },

  kongen: {
    navn: "Christian 10.", kort: "Kongen", alder: 71, rolle: "Konge", lag1942: true,
    udseende: "En høj, ældre rytter i uniform på en lys hest. Ingen følge.",
    steder: { 2: "ridebanen_1942", 3: "ridebanen_1942" },
    kraever: ["lag1942", "flag:i_1942", "flag:handske_tabt"],
    noter: [
      { kraever: [], tekst: "Kongen red dagligt gennem København under besættelsen indtil oktober 1942." },
    ],
    emner: [
      { id: "handsken", spoerg: "Ræk handsken op til kongen", kraever: ["ting:handske"], giver: ["-ting:handske", "flag:kongen_takket"], replikker: [
        ["kongen", "Tak, unge dame. Det er ikke hver dag, nogen løber efter en gammel mand på en hest."],
        ["kongen", "De ser ud, som om De leder efter noget. Min reservenøgle til det gamle sadelskab derinde hænger bag den tredje hestesko over staldporten. Det ved kun staldmesteren og jeg."],
        ["kongen", "Og nu De. Godmorgen."],
      ] },
    ],
  },
};

// Ting, Ida kan undersøge. viden: true betyder, at Ida bruger det, hun ved om historien.
const UNDERSOEG = [
  // Vandrehallen og Rigets midte
  { id: "liget", sted: "vandrehallen", navn: "Se på Mørkeberg", kraever: [], giver: ["spor:1"], replikker: [
    ["fortaeller", "Aksel Mørkeberg sidder i den grønne sofa med frakken på og hovedet på skrå. Det ligner, at han er faldet i søvn midt i en sætning."],
    ["ida", "Ingen tegn på kamp. Og ingen termokande. Bente siger, han aldrig gik uden den."],
  ] },
  { id: "bordet", sted: "vandrehallen", navn: "Se på bordet ved sofaen", kraever: [], giver: ["spor:2"], replikker: [
    ["fortaeller", "På sofabordet står en kaffekop med et rødt mærke af læbestift på kanten."],
    ["ida", "Mørkeberg gik næppe med læbestift. Nogen har siddet hos ham i nat."],
  ] },
  { id: "under_sofaen", sted: "vandrehallen", navn: "Lys under sofaen", kraever: ["spor:1", "ting:mobil", "!flag:notesbog_fundet"], giver: ["flag:notesbog_fundet"], replikker: [
    ["fortaeller", "Ida lyser ind under sofaen med lygten på sin mobil. Derinde ligger Mørkebergs lille sorte notesbog."],
    ["fortaeller", "En side er revet ud. På den næste kan man ane trykket fra en kuglepen."],
  ] },
  { id: "blyanten", sted: "vandrehallen", navn: "Gnid blyanten over notesbogen", kraever: ["flag:notesbog_fundet", "ting:blyant"], giver: ["spor:6"], replikker: [
    ["fortaeller", "Ida gnider blyanten let hen over siden. Bogstaverne kommer frem som lyse streger i det grå."],
    ["fortaeller", "»11.000? Kun 4.000. Dept. har vidst det siden maj. Kl. 10 siger jeg det.«"],
    ["ida", "Fire tusind. Ikke elleve. Og kl. 10 er pressemødet."],
  ] },
  { id: "grundlovene", sted: "vandrehallen", navn: "Se grundlovene", viden: true, kraever: [], giver: ["flag:kender_1849"], replikker: [
    ["ida", "Grundlovene fra 1849, 1866, 1915 og 1953. Den første underskrev Frederik 7. den 5. juni 1849."],
  ] },

  // Betjentstuen
  { id: "skaermen", sted: "betjentstuen", navn: "Se på adgangsloggen", kraever: ["!flag:briller_givet"], giver: [], replikker: [
    ["fortaeller", "Skærmen beder om Bentes kode. Uden briller kan Bente ikke se tasterne."],
  ] },
  { id: "noegleskabet", sted: "betjentstuen", navn: "Se på nøgleskabet", kraever: [], giver: [], replikker: [
    ["fortaeller", "Rækker af nøgler med messingmærker. Én krog er markeret »Samtaleværelset«."],
  ] },
  { id: "radioen", sted: "betjentstuen", navn: "Se på den gamle radio", kraever: ["!lag1942"], giver: [], replikker: [
    ["fortaeller", "En gammel radio i mørkt træ med et skalahjul: London, Berlin, Kalundborg. Den virker ikke."],
  ] },

  // Samtaleværelset
  { id: "rummet", sted: "samtalevaerelset", navn: "Undersøg rummet", kraever: [], giver: ["spor:5"], replikker: [
    ["fortaeller", "To stole er trukket ud fra det runde bord, tæt på hinanden, som til en fortrolig samtale."],
    ["fortaeller", "På bordpladen er der en rund kafferand. Den er for stor til en kop. Den passer til en termokande."],
    ["fortaeller", "Under bordet er der indtørrede, våde fodspor med et mønster af små bølger. Sådan ser sålerne på sejlersko ud."],
    ["ida", "Mødet kl. 2 var her. Og nogen kom ind fra regnen."],
  ] },

  // Proviantpassagen og Kompaspartiet
  { id: "vandpytten", sted: "proviantpassagen", navn: "Se i vandpytten ved døren", kraever: ["flag:kommissaer_kommet", "!flag:kort_fundet"], giver: ["+ting:kaspers_kort", "flag:kort_fundet"], replikker: [
    ["fortaeller", "I en vandpyt ved sidedøren ligger et adgangskort med billedsiden nedad."],
    ["ida", "»Kasper Lindved, Kompaspartiet.« Udløbet for et år siden. Han har tabt det på vej ud i nat."],
  ] },
  { id: "kopiloggen", sted: "sekretariatet", navn: "Se på kopimaskinens skærm", kraever: [], giver: ["spor:10"], replikker: [
    ["fortaeller", "Kopimaskinens skærm viser nattens job: kort »K. Lindved«, 212 sider, kl. 01.38-02.12."],
    ["ida", "Han stod her i over en halv time og kopierede. Det er et alibi, ikke et motiv."],
  ] },
  { id: "rapporten", sted: "sekretariatet", navn: "Se på kopimaskinens låg", kraever: ["!flag:rapport_taget"], giver: ["+ting:rapport_50000", "flag:rapport_taget"], replikker: [
    ["fortaeller", "På låget ligger en glemt rapport: »Arbejdsudbud uden besvær«, Prognosehuset Optima. »Op til 50.000 flere i arbejde.«"],
    ["ida", "Den tager jeg med. Nogen vil nok gerne se den."],
  ] },
  { id: "telefonen", sted: "kompas_moedelokale", navn: "Se på bordet i mødelokalet", kraever: ["!flag:telefon_fundet"], giver: ["+ting:jonas_telefon", "flag:telefon_fundet"], replikker: [
    ["fortaeller", "På det lange bord ligger en telefon i et etui med Kompaspartiets kompasrose. En besked lyser på den låste skærm: »Tak for i går ved springvandet. Ring, når du kan. P.S.«"],
    ["ida", "Det må være Jonas'. Han har tre telefoner, og nu har han kun to."],
  ] },
  { id: "tavlen", sted: "kompas_kontor", navn: "Se på whiteboardet", kraever: [], giver: [], replikker: [
    ["fortaeller", "På whiteboardet står der med store bogstaver: »4 mandater = 100 % af magten«. Nogen har tegnet et hjerte om det."],
  ] },

  // Snapstinget og Landstingssalen
  { id: "buffeten", sted: "snapstinget", navn: "Se på buffeten", kraever: [], giver: [], replikker: [
    ["fortaeller", "Rundstykker, ost og en kaffemaskine, der brummer som en færge."],
  ] },
  { id: "navneskiltene", sted: "landstingssalen", navn: "Se på navneskiltene", kraever: [], giver: [], replikker: [
    ["fortaeller", "Navneskiltene står på rad til pressemødet. Ved Kompaspartiets plads står der stadig »A. Mørkeberg«."],
  ] },

  // Bibliotekshaven
  { id: "baenken", sted: "bibliotekshaven", navn: "Se på bænken ved Kierkegaard", kraever: ["!flag:briller_fundet"], giver: ["+ting:briller", "flag:briller_fundet"], replikker: [
    ["fortaeller", "På bænken ved statuen ligger et par læsebriller i rødt stel med en snor. På stangen står der »B.H.«"],
    ["ida", "Bente Holmsgaard. Hun har siddet her i nat."],
  ] },
  { id: "statuen", sted: "bibliotekshaven", navn: "Se på statuen", viden: true, kraever: [], giver: [], replikker: [
    ["ida", "Søren Kierkegaard i bronze fra 1918. Man siger, han kigger mod den mur, hvor Regine Olsen boede."],
  ] },
  { id: "ringen", sted: "bibliotekshaven", navn: "Se på ringen i muren", viden: true, kraever: [], giver: [], replikker: [
    ["ida", "En gammel fortøjningsring. Der var havn her engang, og den lille dam er en rest af den. Her lagde skibe til."],
  ] },
  { id: "gruset", sted: "bibliotekshaven", navn: "Se på gruset", kraever: ["flag:moedt_bente"], giver: ["flag:fodspor_haven"], replikker: [
    ["fortaeller", "Våde fodspor i gruset fra gangen og hen bag statuen. Sålerne har et mønster af små bølger."],
    ["ida", "Det regnede til halv tre i nat, så de er fra i nat. Nogen har stået gemt bag Kierkegaard."],
  ] },
  { id: "bassinet", sted: "bibliotekshaven", navn: "Se i bassinet", kraever: ["!flag:springvand_09"], giver: [], replikker: [
    ["fortaeller", "Vandet er mørkt og stille. Springvandet er slukket om natten og springer først kl. 9."],
  ] },
  { id: "papirerne", sted: "bibliotekshaven", navn: "Saml papirerne op ved kanten", kraever: ["flag:springvand_09", "!spor:20"], giver: ["spor:20"], replikker: [
    ["fortaeller", "Strømmen fra springvandet har skyllet to stykker papir ud til kanten."],
    ["fortaeller", "Det ene er en side revet ud af en lille sort notesbog. Det andet er en våd tabel: »Fremtidsreformen. Beskæftigelseseffekt: 4.000.« Nederst: »Printet 18.05, printer RM-DC-01.«"],
    ["ida", "RM-DC. Reformministeriet, departementschefen. Og siden passer til hullet i Mørkebergs notesbog."],
  ] },

  // Riddersalen
  { id: "gobelinerne", sted: "riddersalen", navn: "Se på gobelinerne", viden: true, kraever: [], giver: ["flag:gobelin_kendt"], replikker: [
    ["ida", "Bjørn Nørgaards gobeliner. 17 vævede billeder af Danmarks og verdens historie. De blev hængt op i 2000."],
  ] },
  { id: "etuiet", sted: "riddersalen", navn: "Se på etuiet", kraever: ["!ting:elefantorden"], giver: [], replikker: [
    ["fortaeller", "I et åbent etui på det dækkede langbord ligger Elefantordenen: en lille elefant af guld, emalje og diamanter med et tårn på ryggen."],
  ] },
  { id: "etuiet_tomt", sted: "riddersalen", navn: "Se på etuiet", kraever: ["ting:elefantorden"], giver: [], replikker: [
    ["fortaeller", "Etuiet er tomt. Kun det lyseblå bånd ligger tilbage, og hoffoureren holder øje med det."],
  ] },

  // Finansministeriet
  { id: "knagerne", sted: "fm_garderoben", navn: "Se på knagerne", kraever: [], giver: ["flag:presselisten"], replikker: [
    ["fortaeller", "Ved knagerne hænger nattens presseliste: »Strandvig, Dagbladet Nordlyset: pressekort 17«."],
  ] },
  { id: "referatet", sted: "fm_forhandlingsrummet", navn: "Læs referatet", kraever: [], giver: ["spor:9"], replikker: [
    ["fortaeller", "Nattens referat ligger stadig på det lange bord."],
    ["fortaeller", "»23.40: A. Mørkeberg beder om at se departementets beregninger. H. Valdorf: De kommer i nat.«"],
    ["fortaeller", "»01.00-03.30: Ministeren til stede. 01.30: Departementschefen forlader mødet for at regne. 02.50: Departementschefen tilbage med nye tabeller.«"],
    ["ida", "Han var væk i en time og tyve minutter."],
  ] },

  // Reformministeriet
  { id: "kontoret", sted: "valdorfs_kontor", navn: "Se dig om på kontoret", kraever: [], giver: ["spor:15"], replikker: [
    ["fortaeller", "På væggen hænger en tavle med sømandsknob: pælestik, råbåndsknob og dobbelt halvstik."],
    ["fortaeller", "Over stolen hænger en mørk sejlerjakke, der stadig er fugtig. Under skrivebordet står et par sejlersko med bølgemønster i sålen."],
    ["fortaeller", "På skærmen er mailen åben: »Nye beregninger til forhandlerne«. Skrevet kl. 23.12. Sat til at sende sig selv kl. 02.05."],
    ["ida", "Han var ikke her kl. 02.05. Mailen sendte sig selv."],
  ] },
  { id: "jakken", sted: "valdorfs_kontor", navn: "Se i jakkens lommer", kraever: ["spor:15", "!flag:baadnoegle_fundet"], giver: ["+ting:baadnoegle", "spor:22", "flag:baadnoegle_fundet"], replikker: [
    ["fortaeller", "I inderlommen ligger en nøgle med en rød flyder: »Bådlauget ved Gammel Strand«."],
  ] },
  { id: "printloggen", sted: "rm_printeren", navn: "Se på printerens log", kraever: [], giver: ["flag:printlog"], replikker: [
    ["fortaeller", "Printer RM-DC-01. I går kl. 18.05: 1 side. I nat kl. 02.36: 14 sider."],
  ] },
  { id: "kilen", sted: "rm_sidedoeren", navn: "Se på sidedøren", kraever: [], giver: ["flag:kile"], replikker: [
    ["fortaeller", "Ved sidedøren ligger en gummikile. Døren kan kun åbnes indefra, men med en kile kan den stå på klem."],
    ["ida", "Så kan man gå ud og ind uden kort og uden at stå i nogen log."],
  ] },

  // Kajerne og båden
  { id: "baaden", sted: "kajen_reform", navn: "Se på båden", kraever: ["flag:moedt_bente"], giver: ["spor:12"], replikker: [
    ["fortaeller", "Bådlaugets lille røde båd ligger ved kajen ved Reformministeriet. Den plejer at ligge ved Gammel Strand."],
    ["fortaeller", "Den er bundet til ringen med et pænt pælestik. De andre både i bådlauget er bundet med noget, der mest ligner en sløjfe."],
    ["fortaeller", "Om stævnen sidder en kæde med en hængelås."],
    ["ida", "Nogen, der kan sine knob, har sejlet den herover."],
  ] },
  { id: "sejl", sted: "kajen_reform", navn: "Sejl med båden", kraever: ["ting:baadnoegle", "!flag:sejlet"], giver: ["flag:sejlet"], replikker: [
    ["fortaeller", "Bådnøglen passer i hængelåsen. Kæden falder i vandet med et klask, og motoren starter."],
  ] },
  { id: "termokanden", sted: "kanalen", navn: "Kig ned i vandet ved fortøjningspælen", kraever: [], giver: ["spor:14"], replikker: [
    ["fortaeller", "Midt i kanalen står en gammel fortøjningspæl. Fra båden kan Ida se ned i det klare vand ved den."],
    ["fortaeller", "På bunden ligger en rød termokande med Kompaspartiets kompasrose."],
    ["ida", "Her kan ingen se den fra kajen. Han smed den på vej tilbage."],
  ] },
  { id: "tidsproeven", sted: "kajen_reform", navn: "Tag tid på turen til Folketinget", kraever: ["flag:sejlet"], giver: ["flag:tidsproeve"], replikker: [
    ["fortaeller", "Ida starter stopuret, sejler over kanalen, lægger til ved kajen ved Slotspladsen og går gennem porten til døren i Rigsdagsgården."],
    ["fortaeller", "Stopuret viser {tid}."],
    ["ida", "Fra 01.44 til 01.52 er der 8 minutter. Det kan nås."],
  ], langsom: ["ida", "Jeg tog en omvej. Men den lige vej kan nås på mindre end 8 minutter, fra 01.44 til 01.52."] },

  // Udsigten, Slotspladsen og Ridebanen
  { id: "kikkerten", sted: "udsigten", navn: "Kig gennem kikkerten", kraever: [], giver: ["flag:baad_set_oppefra"], replikker: [
    ["fortaeller", "Gennem kikkerten ser Ida ned over kanalen. Ved kajen over for Reformministeriet ligger en lille rød båd."],
    ["ida", "Den hører til ved Gammel Strand. Hvad laver den der?"],
  ] },
  { id: "radiovognen", sted: "slotspladsen", navn: "Se ind i radiovognen", kraever: [], giver: [], replikker: [
    ["fortaeller", "Teknikeren i radiovognen spoler nattens udsendelse frem. Pernille er på fra 01.45 til 02.05 uden pause."],
    ["ida", "Så kan hun ikke have været ved døren i Rigsdagsgården kl. 01.52."],
  ] },
  { id: "ridebanen", sted: "ridebanen", navn: "Se dig om på Ridebanen", viden: true, kraever: [], giver: [], replikker: [
    ["ida", "Ridebanen og fløjene omkring den er fra det første Christiansborg. De overlevede begge brande, i 1794 og 1884."],
  ] },

  // Staldene og sadelkammeret
  { id: "sadeldoeren", sted: "stalden", navn: "Gå hen til sadelkammeret", kraever: ["!flag:hesten_flyttet"], giver: ["flag:hest_i_vejen"], replikker: [
    ["fortaeller", "Den store hvide hest Vega står foran døren til sadelkammeret og tygger hø. Hun kigger på Ida og flytter sig ikke en centimeter."],
  ] },
  { id: "gulerod", sted: "stalden", navn: "Giv Vega en gulerod", kraever: ["ting:guleroedder", "!flag:hesten_flyttet"], giver: ["-ting:guleroedder", "flag:hesten_flyttet"], replikker: [
    ["fortaeller", "Vega tager guleroden med sin bløde mule og lunter et par skridt til siden. Døren til sadelkammeret er fri."],
  ] },
  { id: "skabet_laast", sted: "sadelkammeret", navn: "Prøv det gamle sadelskab", kraever: ["lag1942", "!ting:kongens_noegle", "!flag:skabet_aabnet"], giver: ["flag:skab_laast"], replikker: [
    ["fortaeller", "Inderst står et gammelt skab med en lille krone på lågen. Det er låst, og nøglehullet er lille og gammelt."],
  ] },
  { id: "skabet", sted: "sadelkammeret", navn: "Åbn det gamle sadelskab", kraever: ["!lag1942|ting:kongens_noegle"], giver: ["spor:21", "flag:skabet_aabnet"], replikker: [
    ["fortaeller", "Inderst står et gammelt skab med en lille krone på lågen. Mellem to sadeltæpper ligger en plastlomme."],
    ["fortaeller", "Indeni er en tabel fra Reformministeriet, dateret maj: »Beskæftigelseseffekt: 4.000.« I margenen står der med kuglepen: »Kl. 10.«"],
    ["ida", "Samme håndskrift som i notesbogen. Mørkeberg gemte en kopi, hvor ingen ville lede."],
  ] },

  // Ekstralaget med 1942
  { id: "radio_1942", sted: "betjentstuen", navn: "Drej radioen hen på London", lag1942: true, kraever: ["lag1942", "akt>=2", "!flag:i_1942"], giver: ["flag:i_1942"], replikker: [
    ["fortaeller", "Ida drejer skalahjulet hen på »London«. Radioen knitrer. Lyset i betjentstuen bliver gult og svagt, og kalenderen på væggen viser juni 1942."],
  ] },
  { id: "radio_tilbage", sted: "betjentstuen_1942", navn: "Drej radioen tilbage", lag1942: true, kraever: ["flag:i_1942"], giver: ["-flag:i_1942"], replikker: [
    ["fortaeller", "Radioen knitrer. Lyset bliver hvidt igen, og Bentes kaffekop står, hvor den stod. Det er 2026."],
  ] },
  { id: "handsken", sted: "ridebanen_1942", navn: "Saml handsken op", lag1942: true, kraever: ["flag:handske_tabt", "!flag:handske_samlet"], giver: ["+ting:handske", "flag:handske_samlet"], replikker: [
    ["fortaeller", "Ida samler handsken op. Den er af blødt brunt læder og stadig varm."],
  ] },
  { id: "hesteskoen", sted: "stalden", navn: "Se bag den tredje hestesko over porten", lag1942: true, kraever: ["lag1942", "flag:kongen_takket", "!flag:i_1942", "!flag:kongens_noegle_fundet"], giver: ["+ting:kongens_noegle", "flag:kongens_noegle_fundet"], replikker: [
    ["fortaeller", "Over staldporten hænger en række gamle hestesko. Bag den tredje sidder en lille messingnøgle med en krone, grøn af alder."],
    ["ida", "Den har hængt her siden 1942. Og Mørkeberg vidste det."],
  ] },
];

// Begivenheder sker af sig selv, så snart naar er opfyldt. Hver sker kun én gang.
// kl er det klokkeslæt, uret springer frem til, hvis det er bagud.
const BEGIVENHEDER = [
  { id: "moede_bente", titel: "Bente i døren", kl: "06.10", naar: ["sted:rigsdagsgaarden"], giver: ["flag:moedt_bente"], replikker: [
    ["fortaeller", "Bente står i døren til Folketinget. Hun er bleg og holder om en kop kaffe, hun har glemt at drikke."],
    ["bente", "Ida? Du kommer på en dårlig dag."],
    ["bente", "Aksel Mørkeberg er død. Rengøringen fandt ham for tyve minutter siden i sofaen ved Rigets midte. Politiet er på vej."],
    ["bente", "Kom indenfor. Men rør ikke ved noget."],
    ["bente", "Han sidder oppe i Vandrehallen. Trappen er lige herinde."],
  ] },
  { id: "kommissaeren", titel: "Kommissæren kommer", kl: "06.20", naar: ["spor:1"], giver: ["flag:kommissaer_kommet"], replikker: [
    ["fortaeller", "En kvinde i våd trenchcoat kommer op ad trappen med en kaffe i papkrus."],
    ["kommissaer", "Hald, Københavns Politi. Og hvem er De?"],
    ["ida", "Ida. Jeg læser historie. Jeg skriver om huset."],
    ["kommissaer", "Så skriv om noget andet i dag."],
    ["kommissaer", "Sikkerhedsafdelingen har sendt mig nattens log. Kasper Lindveds gamle kort gik ind kl. 01.30. Han blev fyret af Mørkeberg sidste år. Det er nok til mig."],
    ["kommissaer", "Og alle taler om en forsvundet termokande. Termokander forsvinder hver dag på Christiansborg."],
  ] },
  { id: "statsministeren", titel: "Statsministeren", kl: "06.30", naar: ["flag:kommissaer_kommet"], giver: ["flag:bente_beder"], replikker: [
    ["fortaeller", "Statsministeren kommer ind i Vandrehallen med to livvagter et skridt bagved. Hun stiller sig ved siden af Hald."],
    ["statsminister", "Hald. Hvad ved vi?"],
    ["kommissaer", "Vi har vores mand. Kasper Lindved. Jeg kan sige det på pressemødet kl. 10."],
    ["statsminister", "Så holder pressemødet. Danmark venter på en reform, ikke på en krimi."],
    ["fortaeller", "Bente er kommet op ad trappen. Hun trækker Ida til side."],
    ["bente", "Kasper er en klovn, men han er ikke en morder. Jeg har kendt ham, siden han var praktikant."],
    ["bente", "Du kender husets historie bedre end politiet, og du er god til at finde ting i gamle papirer. Hjælp mig. Vi har til kl. 10."],
    ["bente", "Se dig godt omkring heroppe først. Så kom ned til mig i betjentstuen til højre for indgangen, så kigger vi på nattens adgangslog."],
  ] },
  { id: "valdorf_kommer", titel: "Departementschefen", kl: "07.30", naar: ["akt>=2", "spor:7|spor:8|spor:10|spor:18"], giver: ["flag:valdorf_her"], replikker: [
    ["fortaeller", "En mand i gråt jakkesæt kommer op ad trappen med en mappe under armen. Han nikker venligt til alle."],
    ["valdorf", "Henrik Valdorf, departementschef i Reformministeriet. Ministeren har bedt mig hjælpe politiet med alt, hvad de har brug for."],
  ] },
  { id: "retsmed", titel: "Retsmedicineren", kl: "08.30", naar: ["akt>=3"], giver: ["flag:retsmed"], replikker: [
    ["fortaeller", "Kommissæren lægger sin telefon fra sig i Vandrehallen og hæver stemmen."],
    ["kommissaer", "Retsmedicineren har ringet. Mørkeberg fik noget i kaffen og døde mellem kl. 2 og 3. Ingen siger et ord til pressen."],
    ["fortaeller", "Reformministeriet åbner, og hoffet begynder at dække op i Riddersalen."],
  ] },
  { id: "springvandet", titel: "Springvandet", kl: "09.00", naar: ["akt>=3", "sted:bibliotekshaven"], giver: ["flag:springvand_09"], replikker: [
    ["fortaeller", "Springvandet i Bibliotekshaven springer for første gang i dag. Vandet løber ned over skålen og ud i bassinet."],
    ["fortaeller", "Ved kanten af bassinet flyder noget hvidt op."],
  ] },
  { id: "valdorf_venter", titel: "En opringning", kl: "09.30", naar: ["akt>=4"], giver: ["flag:valdorf_venter"], replikker: [
    ["fortaeller", "Idas mobil ringer. Det er Bente."],
    ["bente", "Departementschefen spørger efter dig. Han venter på Udsigten i tårnet. Han siger, han vil hjælpe."],
  ] },
  { id: "pressemoedet", titel: "Pressemødet", kl: "09.55", naar: ["spor:16"], giver: ["flag:pressemoede"], replikker: [
    ["fortaeller", "Idas mobil summer. En sms fra Bente: »Pressemødet begynder om fem minutter i Landstingssalen. Kommissæren har sit papir klar.«"],
  ] },
  { id: "kongen_rider", titel: "Kongen rider forbi", kl: null, lag1942: true, naar: ["lag1942", "flag:i_1942", "sted:ridebanen_1942"], giver: ["flag:handske_tabt"], replikker: [
    ["fortaeller", "En høj, ældre rytter kommer ridende uden følge. Folk på fortovet løfter hatten, og han hilser igen."],
    ["fortaeller", "Ved Ridebanen glider en handske ned fra hans hånd og lander i gruset."],
  ] },
];

// Teksten, når en tysk patrulje ser Ida i 1942. Spillet sender hende tilbage til 2026.
const FANGET_1942 = {
  giver: ["-flag:i_1942"],
  replikker: [
    ["fortaeller", "En tysk patrulje får øje på Ida. »Halt! Papiere!«"],
    ["fortaeller", "Ida løber tilbage til betjentstuen og drejer på radioen. Hun er i 2026 igen."],
  ],
};

// Hint fra Bente (og skiltet »Næste spor«). Spillet viser det første hint, hvis betingelse er opfyldt.
// tekst er Bentes hint. maal er det, der hele tiden står øverst på skærmen: hvad Ida skal nu, men ikke hvordan.
// hen er stedet for målet (et sted fra STEDER eller null). Udenfor peger en pil derhen, og stedet vises på kortet.
// ved (valgfri) er noget at undersøge udenfor (et id fra UNDERSOEG). Så peger pilen helt hen til det, også når Ida er nået til stedet.
const HINT = [
  { naar: ["!flag:moedt_bente"], tekst: "Gå til Folketingets indgang i Rigsdagsgården. Bente venter i døren.",
    maal: "Mød Bente ved Folketingets dør i Rigsdagsgården", hen: "rigsdagsgaarden" },
  { naar: ["flag:i_1942", "!flag:kongen_takket"], tekst: "Gå ud til Ridebanen. Kongen rider forbi hver morgen. Pas på patruljerne.",
    maal: "Find kongen på Ridebanen, og pas på patruljerne", hen: "ridebanen_1942" },
  { naar: ["flag:i_1942"], tekst: "Drej radioen tilbage for at komme hjem til 2026.",
    maal: "Gå tilbage til radioen i betjentstuen, og kom hjem til 2026", hen: "betjentstuen_1942" },
  // Sadelkammeret er et ekstra bevis (28. okt. 2026). Målene her kommer kun, når Ida står i staldene, eller når hun selv
  // har valgt rejsen til 1942 og mødt kongen. Ellers går målet videre med det, der skal til for at nå afsløringen.
  { naar: ["lag1942", "flag:kongen_takket", "!ting:kongens_noegle", "!spor:21"], tekst: "Kongen sagde: bag den tredje hestesko over staldporten.",
    maal: "Find kongens nøgle ved staldporten", hen: "ridebanen", ved: "hesteskoen" },
  { naar: ["sted:stalden", "!flag:hesten_flyttet", "ting:guleroedder"], tekst: "Giv Vega en gulerod. Så flytter hun sig fra døren til sadelkammeret.",
    maal: "Giv Vega en gulerod, så du kan komme ind i sadelkammeret", hen: "stalden" },
  { naar: ["sted:stalden", "akt>=2", "flag:hest_i_vejen", "!flag:hesten_flyttet", "!ting:guleroedder"], tekst: "Vega flytter sig kun for en gulerod. Bodil i Snapstinget har altid nogle.",
    maal: "Hent en gulerod til Vega hos Bodil i Snapstinget", hen: "snapstinget" },
  { naar: ["ting:kongens_noegle", "!spor:21"], tekst: "Kongens nøgle passer måske til det gamle sadelskab inderst i sadelkammeret.",
    maal: "Undersøg det gamle sadelskab i sadelkammeret", hen: "sadelkammeret" },
  { naar: ["sted:stalden", "lag1942", "flag:skab_laast", "!ting:kongens_noegle", "!spor:21"], tekst: "Er skabet låst? Min farfar sagde altid, at kongen gemte nøgler bag hestesko. Og hans gamle radio har altid været lidt mærkelig.",
    maal: "Find en nøgle til det gamle sadelskab", hen: null },
  { naar: ["sted:stalden", "flag:hesten_flyttet", "!spor:21"], tekst: "Se i det gamle sadelskab inderst i sadelkammeret.",
    maal: "Undersøg det gamle sadelskab i sadelkammeret", hen: "sadelkammeret" },
  { naar: ["!spor:1"], tekst: "Gå op i Vandrehallen. Han sidder i den grønne sofa ved Rigets midte.",
    maal: "Gå op i Vandrehallen, og se, hvad der er sket", hen: "vandrehallen" },
  { naar: ["!spor:2"], tekst: "Se på bordet ved sofaen. Der står noget, der ikke burde stå der.",
    maal: "Undersøg sofaen og bordet ved Rigets midte", hen: "vandrehallen" },
  { naar: ["!flag:notesbog_fundet"], tekst: "Aksel havde altid sin lille sorte notesbog på sig, men den er ikke i hans lommer. Lys under sofaen med din mobil.",
    maal: "Find Mørkebergs lille sorte notesbog", hen: "vandrehallen" },
  { naar: ["!spor:6"], tekst: "Når nogen skriver hårdt på en side, kan man se trykket på den næste. Har du ikke en blyant i rygsækken?",
    maal: "Find ud af, hvad Mørkeberg skrev i notesbogen ved sofaen", hen: "vandrehallen" },
  { naar: ["!flag:bente_beder"], tekst: "Kommissæren og statsministeren kommer om lidt. Lad os høre, hvad de siger.",
    maal: "Bliv i Vandrehallen. Politiet er på vej", hen: "vandrehallen" },
  { naar: ["ting:briller"], tekst: "Er det mine briller? Giv mig dem, så kan vi se loggen.",
    maal: "Giv Bente brillerne i betjentstuen", hen: "betjentstuen" },
  { naar: ["!flag:briller_givet", "!flag:briller_hint"], tekst: "Jeg har nattens adgangslog her i betjentstuen. Spørg mig, om vi kan se den.",
    maal: "Spørg Bente i betjentstuen om nattens adgangslog", hen: "betjentstuen" },
  { naar: ["!flag:briller_givet"], tekst: "Uden mine briller kan jeg ikke se tasterne. Jeg satte mig vist på bænken ved Kierkegaard-statuen i Bibliotekshaven på min runde.",
    maal: "Find Bentes briller på bænken ved Kierkegaard", hen: "bibliotekshaven", ved: "baenken" },
  { naar: ["!spor:4"], tekst: "Kl. 01.52? Spørg mig, hvad der skete omkring kl. 2. Der var noget med Samtaleværelset.",
    maal: "Spørg Bente, hvad der skete omkring kl. 2", hen: "betjentstuen" },
  { naar: ["!spor:5"], tekst: "Nøglen passer til Samtaleværelset. Dørene er midt i Vandrehallen.",
    maal: "Lås Samtaleværelset op, og se dig om derinde", hen: "samtalevaerelset" },
  { naar: ["akt>=2", "!spor:18"], tekst: "Bodil i Snapstinget fylder Aksels termokande hver aften. Spørg hende.",
    maal: "Spørg Bodil i Snapstinget om termokanden", hen: "snapstinget" },
  { naar: ["akt>=2", "!flag:kort_fundet"], tekst: "Kaspers kort gik ind ved Proviantpassagen. Det har regnet i nat. Se efter i vandpytterne.",
    maal: "Undersøg Proviantpassagen, hvor Kaspers kort gik ind", hen: "proviantpassagen", ved: "vandpytten" },
  { naar: ["akt>=2", "!spor:10"], tekst: "Kaspers gamle kort åbner nok stadig Kompaspartiets sekretariat. Ingen har spærret det.",
    maal: "Find ud af, hvad Kasper lavede i Folketinget i nat", hen: "kompas_gang" },
  { naar: ["akt>=2", "!spor:7"], tekst: "Pressen står på Slotspladsen. Spørg, hvem der havde pressekort 17.",
    maal: "Find ud af, hvem der havde pressekort 17", hen: "slotspladsen" },
  { naar: ["akt>=2", "!spor:8", "ting:jonas_telefon"], tekst: "Jonas leder efter sin telefon. Giv ham den, og hør, hvad han siger.",
    maal: "Giv Jonas hans telefon", hen: "kompas_kontor" },
  { naar: ["akt>=2", "!spor:8"], tekst: "Jonas holdt videomøde i Kompaspartiets mødelokale i nat. Måske har han glemt noget derinde.",
    maal: "Find ud af, hvor Jonas Fenger var i nat", hen: "kompas_gang" },
  { naar: ["akt>=2", "!flag:ditte_renset", "ting:rapport_50000"], tekst: "Ministeren er i restauranten i tårnet. Hun vil gøre meget for en god rapport.",
    maal: "Vis ministeren rapporten i restauranten i tårnet", hen: "restauranten" },
  { naar: ["akt>=2", "!flag:ditte_renset", "!flag:rapport_taget"], tekst: "Der lå vist en rapport på kopimaskinen i Kompaspartiets sekretariat.",
    maal: "Find noget, ministeren gerne vil have", hen: "sekretariatet" },
  { naar: ["akt>=2", "!flag:ditte_renset"], tekst: "Ministeren drak kaffe med Aksel i nat. Hun er i restauranten i tårnet.",
    maal: "Tal med ministeren i restauranten i tårnet", hen: "restauranten" },
  // Akt 3 går i en rute: Riddersalen tæt ved tårnet, hvor akt 2 slutter, så Folketinget (Kasper og Mogens),
  // Bibliotekshaven, Finansministeriet og til sidst Reformministeriet og båden. Målt 28. okt. 2026.
  { naar: ["akt>=3", "!flag:mogens_talt", "!ting:elefantorden", "!flag:hoffourer_spurgt"], tekst: "Aksel skrev, at departementet har vidst det siden maj. Mogens Brask er kontorchef i Reformministeriet, og han har drømt om Elefantordenen hele livet. Den ligger fremme i Riddersalen.",
    maal: "Tal med hoffoureren i Riddersalen om Elefantordenen", hen: "riddersalen" },
  { naar: ["akt>=3", "!flag:mogens_talt", "!ting:elefantorden", "!flag:gobelin_kendt"], tekst: "Hoffoureren låner kun ordenen ud til en, der ved, hvem der har lavet gobelinerne. Se godt på dem. Du er jo historiker.",
    maal: "Find ud af, hvem der har lavet gobelinerne i Riddersalen", hen: "riddersalen" },
  { naar: ["akt>=3", "!flag:mogens_talt", "!ting:elefantorden"], tekst: "Nu ved du, hvem der har lavet gobelinerne. Sig det til hoffoureren, og lån ordenen. Mogens taler, når han får den at se.",
    maal: "Lån Elefantordenen hos hoffoureren", hen: "riddersalen" },
  { naar: ["spor:10", "!spor:11"], tekst: "Vis Kasper kopimaskinens log. Så tør han måske fortælle, hvad han så.",
    maal: "Vis Kasper kopimaskinens log i Snapstinget", hen: "snapstinget" },
  { naar: ["akt>=3", "!flag:mogens_talt", "ting:elefantorden"], tekst: "Mogens Brask i Landstingssalen har drømt om den orden hele livet. Vis ham den.",
    maal: "Vis Mogens Brask Elefantordenen i Landstingssalen", hen: "landstingssalen" },
  { naar: ["akt>=3", "!spor:20"], tekst: "Springvandet i Bibliotekshaven springer om lidt. Gå derud, og se efter i bassinet.",
    maal: "Gå til springvandet i Bibliotekshaven", hen: "bibliotekshaven", ved: "papirerne" },
  { naar: ["akt>=3", "!spor:9"], tekst: "Med ministerens gæstekort kommer du ind i Finansministeriet. Referatet ligger i forhandlingsrummet.",
    maal: "Find referatet i Finansministeriet", hen: "fm_forhandlingsrummet" },
  { naar: ["akt>=3", "!spor:15"], tekst: "Året for den første grundlov. Det står i montrerne i Vandrehallen. Departementschefens kontor ligger i Reformministeriet.",
    maal: "Kom ind på departementschefens kontor i Reformministeriet", hen: "valdorfs_kontor" },
  { naar: ["spor:15", "!spor:22"], tekst: "Se i lommerne på den jakke.",
    maal: "Undersøg jakken på departementschefens kontor", hen: "valdorfs_kontor" },
  { naar: ["akt>=3", "!spor:12"], tekst: "En nøgle fra bådlauget ved Gammel Strand? Se på den røde båd ved kajen over for Reformministeriet. Hvem har bundet den?",
    maal: "Undersøg den røde båd ved kajen over for Reformministeriet", hen: "kajen_reform", ved: "baaden" },
  { naar: ["ting:baadnoegle", "!flag:sejlet"], tekst: "En bådnøgle? Den røde båd ligger ved kajen over for Reformministeriet.",
    maal: "Sejl ud med den røde båd ved Reformministeriet", hen: "kajen_reform" },
  { naar: ["flag:sejlet", "!spor:14"], tekst: "Sejl ud til den gamle fortøjningspæl midt i kanalen, og kig ned. Vandet er klart i dag.",
    maal: "Sejl ud til den gamle fortøjningspæl midt i kanalen", hen: "kanalen" },
  { naar: ["akt>=4", "!spor:16"], tekst: "Departementschefen venter på dig på Udsigten i tårnet.",
    maal: "Mød departementschefen på Udsigten i tårnet", hen: "udsigten" },
  { naar: ["spor:16"], tekst: "Pressemødet begynder i Landstingssalen. Gå derind, og ræk hånden op.",
    maal: "Gå til pressemødet i Landstingssalen", hen: "landstingssalen" },
  { naar: ["akt<=3", "!spor:13"], tekst: "Svend står på Højbro hver nat med sit kamera. Måske så han noget.",
    maal: "Tal med Svend på Højbro", hen: "hoejbro" },
];

// Afsløringen. For hvert spørgsmål vælger spilleren et svar og lægger mindst minSpor af de gyldige spor frem.
const AFSLOERING = {
  sted: "landstingssalen",
  kl: "10.00",
  kraever: ["flag:pressemoede"],
  intro: [
    ["fortaeller", "Landstingssalen er fuld. Kameraerne står bagerst, og de mistænkte sidder på forreste række. Bente står ved døren."],
    ["kommissaer", "Mine damer og herrer. Vi har anholdt en mand for mordet på Aksel Mørkeberg. Han hedder..."],
    ["ida", "Undskyld. Jeg tror, De tager fejl."],
    ["statsminister", "Lad hende tale, Hald. Vi har ventet hele morgenen. To minutter mere gør ingen forskel."],
  ],
  spoergsmaal: [
    { id: "hvem", tekst: "Hvem slog Aksel Mørkeberg ihjel?", gyldigeSpor: [11, 15, 16, 20, 22], minSpor: 2, svar: [
      { id: "valdorf", tekst: "Henrik Valdorf", rigtig: true },
      { id: "ditte", tekst: "Ditte Rosenvinge", protest: ["ditte", "Jeg sad i forhandlingsrummet fra kl. 1 til halv fire. Ni mennesker og et referat kan bekræfte det."] },
      { id: "jonas", tekst: "Jonas Fenger", protest: ["jonas", "Jeg sad i videomøde med hele hovedbestyrelsen fra 01.45 til 02.40. Der er en optagelse."] },
      { id: "pernille", tekst: "Pernille Strandvig", protest: ["pernille", "Jeg var jo i radioen kl. 01.52! Fra 01.45 til 02.05. Spørg teknikeren."] },
      { id: "kasper", tekst: "Kasper Lindved", protest: ["kasper", "Jeg stjal nogle papirer. Kopimaskinen kan bevise, hvor jeg var hele tiden."] },
    ] },
    { id: "hvordan", tekst: "Hvordan døde han?", gyldigeSpor: [1, 5, 14, 18], minSpor: 2, svar: [
      { id: "kaffen_moedet", tekst: "Der kom noget i kaffen fra termokanden under mødet i Samtaleværelset", rigtig: true },
      { id: "kaffen_snaps", tekst: "Der kom noget i kaffen i Snapstinget", protest: ["bodil", "Jeg fyldte kanden kl. 21.30, og han drak af den hele aftenen. Retsmedicineren siger, han døde mellem 2 og 3."] },
      { id: "koppen", tekst: "Der var noget i koppen med læbestift", protest: ["ditte", "Det var min kop. Jeg drak selv af den, og jeg står her endnu."] },
      { id: "slag", tekst: "Han blev slået ned ved Rigets midte", protest: ["kommissaer", "Der er ingen tegn på kamp. Det siger retsmedicineren også."] },
    ] },
    { id: "indogud", tekst: "Hvordan kom morderen ind og ud uden at blive set?", gyldigeSpor: [3, 7, 12, 13, 19, 22], minSpor: 2, svar: [
      { id: "baad_kort", tekst: "Med båden over kanalen og Pernilles stjålne pressekort 17", rigtig: true },
      { id: "kaspers_kort", tekst: "Med Kaspers gamle kort gennem Proviantpassagen", protest: ["kasper", "Det var mig, der brugte det kort. Kopimaskinen viser, at jeg stod i sekretariatet hele tiden."] },
      { id: "broen", tekst: "Over broen forbi pressen", protest: ["pernille", "Så havde vi set ham. Vi så ham gå over kl. halv to og komme tilbage kl. 02.50. Ikke ind imellem."] },
      { id: "aldrig_vaek", tekst: "Han var aldrig væk fra sit kontor", protest: ["mogens", "Jeg så ham ved printeren kl. 02.36, og han var våd i håret. Det regner ikke indenfor."] },
    ] },
    { id: "hvorfor", tekst: "Hvorfor?", gyldigeSpor: [6, 9, 17, 20, 21], minSpor: 2, svar: [
      { id: "tallene", tekst: "Mørkeberg ville sige kl. 10, at reformen giver 4.000 job og ikke 11.000", rigtig: true },
      { id: "nej", tekst: "Mørkeberg ville stemme nej til reformen", protest: ["ditte", "Han havde lige sagt ja til mit sidebrev. Han ville stemme ja."] },
      { id: "formand", tekst: "Mørkeberg ville være formand en periode til", protest: ["jonas", "Det var mit problem, ikke en departementschefs."] },
      { id: "kilde", tekst: "Mørkeberg ville afsløre en kilde i pressen", protest: ["pernille", "Det havde ramt Jonas og mig. Ikke Reformministeriet."] },
    ] },
  ],
  forkertSpor: ["kommissaer", "Det spor beviser ikke det, De siger. Prøv igen."],
  treForkerte: [
    ["kommissaer", "Nu er det nok. Kasper Lindved, De er anholdt."],
    ["valdorf", "Synd. Det var et godt forsøg."],
    ["fortaeller", "Kommissæren fører Kasper ud. Men Bente stiller sig i døren og ser på Ida. Prøv igen."],
  ],
  tilstaaelse: [
    ["fortaeller", "Der bliver helt stille i Landstingssalen. Valdorf retter på sit slips."],
    ["valdorf", "Jeg har lavet regnestykker for staten i 30 år. Ingen af dem har været forkerte. Ikke før det her."],
    ["valdorf", "I maj kom vi frem til 4.000. Ministeren havde allerede sagt 11.000 i tv. Så jeg lod tallet stå og troede, at ingen ville regne efter."],
    ["valdorf", "I går aftes sagde Aksel til mig på gangen: »Jeg har set jeres tal fra maj, Henrik. Vi taler sammen i nat, ellers siger jeg det kl. 10.« Mit navn står under hver eneste side."],
    ["valdorf", "Jeg ville have ham til at forstå. Det gjorde han ikke."],
    ["kommissaer", "Henrik Valdorf, De er anholdt for mordet på Aksel Mørkeberg."],
    ["kommissaer", "Godt gået. Men De rørte ved alt."],
    ["bente", "Jeg sagde jo, at du kender huset."],
  ],
  stjerner: {
    tre: { maksForkerte: 0, maksHint: 2, tekst: "Ingen forkerte svar og højst 2 hint" },
    to: { maksForkerte: 3, maksHint: 6, tekst: "Højst 3 forkerte svar og højst 6 hint" },
    en: { tekst: "Gåden er løst" },
  },
};

const EFTERSKRIFT = {
  replikker: [
    ["fortaeller", "Pressemødet bliver aflyst. Samme eftermiddag lægger Reformministeriet det rigtige regnestykke frem: 4.000 flere i job."],
    ["fortaeller", "Tre uger senere bliver Fremtidsreformen alligevel vedtaget med et nyt sidebrev og 4.100 flere i job."],
    ["fortaeller", "Jonas Fenger bliver formand for Kompaspartiet. Pernille Strandvig får sin forside. Kaspers gamle adgangskort bliver endelig spærret."],
    ["fortaeller", "Mogens Brask får aldrig Elefantordenen. Men han har båret den gennem Vandrehallen, og det fortæller han om resten af livet."],
    ["fortaeller", "Ida får et nyt kapitel til sit speciale. Hun kalder det »Rigets midte, kl. 02.00«."],
  ],
  // Kan ikke længere ske, fordi Mogens bærer ordenen tilbage (28. okt. 2026). Bliver stående, fordi spillet og tjekket læser den.
  ordenUde: {
    kraever: ["flag:orden_ude"],
    replikker: [
      ["fortaeller", "Ved aftenens gallamiddag mangler der en elefant. Hoffoureren finder den dagen efter i Idas rygsæk."],
      ["fortaeller", "Ida får aldrig lov at låne noget i Riddersalen igen."],
    ],
  },
};

export const MANUS = {
  titel: "Mord i Rigets midte",
  version: 1,
  opdateret: "2026-10-17",
  lag1942: {
    aktiv: true,
    forklaring: "Ekstralaget med 1942. Når aktiv er false, er sadelskabet ikke låst, radioen virker ikke, og resten af gåden er den samme. Spilleren kan også slå rejsen fra under Indstillinger, før et nyt spil.",
  },
  start: START,
  ur: UR,
  akter: AKTER,
  steder: STEDER,
  ting: TING,
  spor: SPOR,
  tidslinje: TIDSLINJE,
  personer: PERSONER,
  undersoeg: UNDERSOEG,
  begivenheder: BEGIVENHEDER,
  fanget1942: FANGET_1942,
  hint: HINT,
  afsloering: AFSLOERING,
  efterskrift: EFTERSKRIFT,
};
