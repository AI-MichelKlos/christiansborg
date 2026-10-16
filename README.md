# Christiansborg

En hyggelig 3D-gåtur i tegnefilmsstil på Christiansborg og Slotsholmen i København. Lavet til børn på omkring 5 år. Teksterne kan læses højt på dansk: tryk på knappen Læs op for at slå det til og fra (det er slået fra fra start).

Spil det her: https://ai-michelklos.github.io/christiansborg/

Kongen har tabt 10 guldkroner rundt på Slotsholmen. Følg de gule lys og find dem alle. På Slotspladsen letter duerne i flok, når man nærmer sig dem. Ved kanalerne kan man give ænderne brød. Ved Gammel Strand ligger en lille rød båd, som man selv kan sejle i. Mange steder har en lille opgave, som giver en stjerne. Man kan køre op i tårnet og kigge ud over byen. I havnen ved Den Sorte Diamant bor en svanefamilie, og i Bibliotekshaven er der et springvand. I Rigsdagsgården kommer statsministeren i en sort bil. Bilerne holder ved trappen, dørene åbner, og hun stiger ud og går op ad trappen til Folketinget.

## Nyt: gå ind i Folketinget

På startskærmen kan du vælge "Start ved Folketingets indgang". Gå op ad trappen i Rigsdagsgården og ind gennem den åbne hoveddør. Du kan også vælge "Gå ind i Folketinget" (E på computer). Indenfor kan du gå op til Vandrehallen og udforske Rigets midte. "Ud i gården" bringer dig tilbage. Interiøret er første trin mod en mere voksen spiloplevelse. Det er en foreløbig fortolkning med anslået trappeforbindelse, ikke en præcis bygningsmodel. Se [kilder og begrænsninger](dev/INTERIOR.md).

## Styring
- Computer: W eller pil op for at gå, A og D eller pilene for at dreje, Shift for at løbe, mellemrum for at hoppe. Træk med musen for at kigge. N skifter mellem dag og aften, M viser eller skjuler kortet.
- Telefon: venstre tommel styrer, højre tommel kigger, og der er en hop-knap.
- Tårnet: gå hen til Kongeporten, og tryk på E for at køre op. Deroppe drejer pilene eller tommelen dig rundt, og mellemrum eller knappen Kikkert zoomer ind.

## Om spillet
- Én fil (`index.html`) med three.js 0.160. Motoren er den samme som i [Skolen på Duevej](https://github.com/AI-MichelKlos/skolen-paa-duevej).
- Husene er enkle klodser med den rigtige grundplan. Spillet bygges op lidt efter lidt. Planen står i `dev/PLAN.md`.
- Kortdata: © OpenStreetMap-bidragydere, ODbL (https://www.openstreetmap.org/copyright).

Udarbejdet med AI (Claude) og med begrænset mennesketjek.

### Mobilstyring
Træk med venstre tommel nederst til venstre for at gå i den ønskede retning på skærmen. Et lille træk giver langsom gang. Træk med højre tommel for at kigge dig omkring. Handlingsknappen nederst til højre viser, hvad du kan gøre tæt på. Inde i Folketinget kan du gå sidelæns, mens du kigger fremad. Båd og løbehjul bruger fortsat joysticket til fart og drejning.

### Første to siderum i Folketinget
Betjentstuen er åben til højre ved foden af den indvendige trappe. Samtaleværelset har to åbne døre midt i Vandrehallen og har salonindretning med grønne vægge, mørke paneler og blå stole. Billedreferencer og forskellen mellem dokumenterede træk og anslået indretning står i `dev/INTERIOR.md`.

### Trappe og Vandrehallen
Indvendigt fører to trappeløb med repos op til Vandrehallen. Træbalustrader, hvide hvælvinger, messingkroner, siddepladser i nicher og kamin med ur bygger på billedreferencer. Mål og den præcise forbindelse til indgangen er fortsat anslået.

### Kompaspartiet og Snapstinget
Ved Vandrehallen mod Folketingssalen kan man gå ind i det fiktive Kompaspartiets gang med to kontorer, sekretariat og mødelokale. Snapstinget nås gennem den åbne dør til venstre ved indgangen, over for betjentstuen. Spisesalen har to gulvniveauer, borde, buffet og kaffeområde. Referencer og usikkerheder står i `dev/INTERIOR.md`. Rummene er til udforskning; mordgådens personer og funktioner følger senere.

### Kamera på telefon
Joysticket styrer gangretning og hastighed. Kameraet følger roligt gangretningen, og spilleren stopper straks, når joysticket slippes. Træk på højre side for selv at kigge; den manuelle kamerastyring får prioritet. Når man går baglæns, bliver kameraet i sin retning.

### Finansministeriet og Reformministeriet
På startskærmen kan du vælge et ministerium at starte ved. Finansministeriet ligger i Den Røde Bygning ved Slotspladsen og har foyer, garderobe og forhandlingsrum. Reformministeriet er fiktivt og ligger ved Ved Stranden. Her kan man udforske departementschefens kontor, printerområdet og sidedøren. Begge hoveddøre står åbne. Ved sidedøren bringer handlingsknappen dig ud på den side af bygningen. Indretningen og rummenes forbindelser er tilpasset spillet; billedreferencer og begrænsninger står i `dev/INTERIOR.md`.

### To kajer med trapper
Under "Vælg et startsted…" kan du starte ved kajen på Ved Stranden foran Reformministeriet eller ved kajen på den modsatte bred ved Slotspladsen. Gå ned ad stentrappen til afsatsen over vandet, stop op undervejs og gå op igen. Der er håndlister, fortøjningsringe og forskellige detaljer på de to bredder. Den eksisterende båd kan lægge til ved afsatserne. Materialer og kajkanter bygger på fotos; trappernes placering og mål er tilpasset spillet. Se `dev/INTERIOR.md`.

### Bibliotekshaven og staldene
Vælg Bibliotekshaven på startskærmen for at gå ad grusstierne mellem blomsterbede til bassinet og den siddende Kierkegaard-statue. Man kan gå hele vejen rundt om statuen. De Kongelige Stalde kan også vælges som startsted: gå gennem den åbne port fra Ridebanen og udforsk den brede gang mellem marmorsøjler og spiltove med hvide heste. Gå tilbage til porten eller vælg Gå udenfor for at vende tilbage til Ridebanen. Referencer og de anslåede mål står i `dev/INTERIOR.md`.
