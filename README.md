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
