# Christiansborg: Mord i Rigets midte

En mordgåde for voksne i 3D på Christiansborg og Slotsholmen i København. Hele gåden kan spilles fra porten i Tøjhusgade kl. 06.00 til afsløringen ved pressemødet kl. 10. Et spil tager 60-90 minutter og kan stoppes og fortsættes på computer og telefon.

Med et ekstra lag kan Ida dreje på en gammel radio i betjentstuen og stå på Slotsholmen en sommermorgen i juni 1942, hvor kongen rider forbi Ridebanen, og tyske soldater går patrulje. Laget kan slås fra under Indstillinger før et nyt spil.

Spil det her: https://ai-michelklos.github.io/christiansborg/

## Historien
En politiker findes død i Vandrehallen natten før et stort pressemøde. Ida, en historiestuderende med rygsæk, skal finde morderen mellem kl. 06 og pressemødet kl. 10. Planen for gåden står i [dev/MORDGAADE.md](dev/MORDGAADE.md).

## Det kan du
Gå rundt på Slotsholmen og ind i Folketinget, Finansministeriet, det fiktive Reformministerium, De Kongelige Stalde, Tårnet og indgangene til Statsministeriet og Højesteret. Ved kajen ved Reformministeriet ligger en lille rød båd. Ida kan sejle i den, når hun har fundet nøglen. Byen lever med duer, ænder, svaner, heste, kanalbåde, trafik og gående, og i Rigsdagsgården kommer statsministeren i en sort bil.

Gå op ad trappen i Rigsdagsgården og ind gennem den åbne hoveddør, eller vælg Gå ind i Folketinget (E på computer). Indenfor fører trappen op til Vandrehallen, og Ud i gården bringer dig tilbage. Rummene er fortolkninger efter billeder, ikke præcise bygningsmodeller. Se [kilder og begrænsninger](dev/INTERIOR.md).

## Startsteder til test
Skriv `?test` efter adressen, altså https://ai-michelklos.github.io/christiansborg/?test, for at få genveje på startskærmen til Folketingets indgang og de andre startsteder, som afsnittene nedenfor nævner. Spillere ser ikke genvejene.

## Børneudgaven
Spillet begyndte som en gåtur for børn med kronejagt, stjerneopgaver, oplæsning og løbehjul. Det blev fjernet 16. oktober 2026, da spillet blev til en mordgåde. Den sidste børneudgave ligger i grenen [boerneudgave](https://github.com/AI-MichelKlos/christiansborg/tree/boerneudgave).

## Styring
- Computer: W eller pil op for at gå, A og D eller pilene for at dreje, Shift for at løbe, mellemrum for at hoppe og E for at gå ind, undersøge eller bruge det, knappen viser. Træk med musen for at kigge. N åbner notesbogen, R rygsækken og M oversigtskortet.
- Telefon: venstre tommel styrer (hold den helt ude et øjeblik for at løbe), højre tommel kigger, og der er en hop-knap og en handlingsknap. Uret, notesbogen, rygsækken og kortet ligger som knapper øverst.
- Tårnet: gå hen til Kongeporten, og vælg Gå ind i tårnet. Vælg derefter etage til restauranten eller Udsigten. Deroppe drejer pilene eller tommelen dig rundt, og mellemrum eller knappen Kikkert zoomer ind.

## Om spillet
- Spillet er `index.html` med three.js 0.160. Motoren er den samme som i [Skolen på Duevej](https://github.com/AI-MichelKlos/skolen-paa-duevej).
- Hele historien står i `mordgaade.js` ved siden af spillet. Ret teksterne der, og kør `node dev/tjek-mordgaade.js` bagefter. Spillet skal hentes fra en webserver (fx GitHub Pages), ikke åbnes direkte som fil, fordi det henter `mordgaade.js`.
- Spillet gemmer selv i browseren, og startskærmen tilbyder Fortsæt og Nyt spil.
- Husene er enkle klodser med den rigtige grundplan. Spillet er bygget trin for trin. Tjeklisten står i `dev/PLAN.md`, og planen for gåden i `dev/MORDGAADE.md`.
- Kortdata: © OpenStreetMap-bidragydere, ODbL (https://www.openstreetmap.org/copyright).

Udarbejdet med AI (Claude) og med begrænset mennesketjek.

### Mobilstyring
Træk med venstre tommel nederst til venstre for at gå i den ønskede retning på skærmen. Et lille træk giver langsom gang. Holder du tommelen helt ude ved kanten et øjeblik, begynder Ida at løbe, og knappen bliver orange. Hun går igen, når tommelen kommer længere ind, og stopper, når du slipper. Træk med højre tommel for at kigge dig omkring. Handlingsknappen nederst til højre viser, hvad du kan gøre tæt på. Inde i Folketinget kan du gå sidelæns, mens du kigger fremad. Båden bruger fortsat joysticket til fart og drejning.

### Første to siderum i Folketinget
Betjentstuen er åben til højre ved foden af den indvendige trappe. Samtaleværelset har to åbne døre midt i Vandrehallen og har salonindretning med grønne vægge, mørke paneler og blå stole. Billedreferencer og forskellen mellem dokumenterede træk og anslået indretning står i `dev/INTERIOR.md`.

### Trappe og Vandrehallen
Indvendigt fører to trappeløb med repos op til Vandrehallen. Træbalustrader, hvide hvælvinger, messingkroner, siddepladser i nicher og kamin med ur bygger på billedreferencer. Mål og den præcise forbindelse til indgangen er fortsat anslået.

### Kompaspartiet og Snapstinget
Ved Vandrehallen mod Folketingssalen kan man gå ind i det fiktive Kompaspartiets gang med to kontorer, sekretariat og mødelokale. Snapstinget nås gennem den åbne dør til venstre ved indgangen, over for betjentstuen. Spisesalen har to gulvniveauer, borde, buffet og kaffeområde. Referencer og usikkerheder står i `dev/INTERIOR.md`. I mordgåden står Jonas på kontoret, Kasper og Bodil i Snapstinget, og sekretariatet er låst med et adgangskort.

### Kamera på telefon
Joysticket styrer gangretning og hastighed. Kameraet følger roligt gangretningen, og spilleren stopper straks, når joysticket slippes. Træk på højre side for selv at kigge; den manuelle kamerastyring får prioritet. Når man går baglæns, bliver kameraet i sin retning.

### Finansministeriet og Reformministeriet
På startskærmen kan du vælge et ministerium at starte ved. Finansministeriet ligger i Den Røde Bygning ved Slotspladsen og har foyer, garderobe og forhandlingsrum. Reformministeriet er fiktivt og ligger ved Ved Stranden. Her kan man udforske departementschefens kontor, printerområdet og sidedøren. Begge hoveddøre står åbne. Ved sidedøren bringer handlingsknappen dig ud på den side af bygningen. Indretningen og rummenes forbindelser er tilpasset spillet; billedreferencer og begrænsninger står i `dev/INTERIOR.md`.

### To kajer med trapper
Under "Vælg et startsted…" kan du starte ved kajen på Ved Stranden foran Reformministeriet eller ved kajen på den modsatte bred ved Slotspladsen. Gå ned ad stentrappen til afsatsen over vandet, stop op undervejs og gå op igen. Der er håndlister, fortøjningsringe og forskellige detaljer på de to bredder. Den eksisterende båd kan lægge til ved afsatserne. Materialer og kajkanter bygger på fotos; trappernes placering og mål er tilpasset spillet. Se `dev/INTERIOR.md`.

### Bibliotekshaven og staldene
Vælg Bibliotekshaven på startskærmen for at gå ad grusstierne mellem blomsterbede til bassinet og den siddende Kierkegaard-statue. Man kan gå hele vejen rundt om statuen. De Kongelige Stalde kan også vælges som startsted: gå gennem den åbne port fra Ridebanen og udforsk den brede gang mellem marmorsøjler og spiltove med hvide heste. Gå tilbage til porten eller vælg Gå udenfor for at vende tilbage til Ridebanen. Referencer og de anslåede mål står i `dev/INTERIOR.md`.

### Tårnet indvendig og Udsigten
Vælg Tårnet ved Kongeporten som startsted, og gå ind via handlingsknappen. Elevatorhallen, restauranten ved 34 m og Udsigten ved 44 m er forbundet gennem Vælg etage. I restauranten kan du gå mellem bordene og op ad sidetrappen, hvor du kan fortsætte til Udsigten. Her drejer du blikket og bruger Kikkert. Etagevalget fører tilbage til restauranten eller elevatorhallen, og fra hallen kan du gå ud til Kongeporten. Rummenes indretning bygger på billedreferencer; mål og forbindelser er tilpasset spillet.

### Landstingssalen og presseområdet
Vælg Landstingssalen via Vandrehallen som startsted, eller gå til hallens modsatte ende fra Folketingssalen. Døren står åben, og man kan gå mellem de buede stolerækker, rundt langs væggene og op til talerstolen og de syv frontpladser. Vælg Slotspladsens presseområde for at udforske opstillingen med tv-vogne, kameraer og arbejdslys. Møblering og presseopstilling er tilpasset spillet; referencer og usikkerheder står i `dev/INTERIOR.md`.

### Folketingssalen og Statsministeriets indgang
Vælg Folketingssalen via Vandrehallen, og gå gennem den åbne dør. Der er fri passage mellem de buede bordrækker og rundt til den lave platform ved talerstolen. Statsministeriets indgang kan vælges som startsted i Prins Jørgens Gård. Gå op over de lave trin og ind gennem de åbne fyldningsdøre til en lille forhal. Gå udenfor fører tilbage til samme indgang. Detaljer og forenklinger er dokumenteret i `dev/INTERIOR.md`.

### Højesteret og vejvisere
Vælg Højesterets indgang for at starte foran den brede trappe. Gå mellem de fire søjler og ind i det lille vindfang. Udgangen fører tilbage foran trappen. Vejvisere står på Slotspladsen, i Prins Jørgens Gård, Rigsdagsgården og på Ridebanen samt indenfor ved Folketingets indgang og i Vandrehallen. Stå tæt på og vælg Læs vejviser for at få anvisninger med stor tekst. Spillet står stille imens; luk med Tilbage til spillet eller Escape. Skiltene beskriver spillets model. Kilder og forenklinger står i `dev/INTERIOR.md`.

### Oversigtskort med stednavne
Kort-knappen, M eller et tryk på minikortet åbner et større oversigtskort med 16 navngivne steder. Vælg et nummer eller stednavn for at se indgang og forbindelser til rummene. Indenfor viser den orange positionsmarkering bygningens indgang, og teksten fortæller, hvilket rum man er i. Kort-knappen er også tilgængelig indenfor og på Udsigten. Vis minikort under gang kan slås til eller fra i kortvinduet. Spillet står stille, mens kortet er åbent. Luk kort eller Escape vender tilbage til gangstyringen.
