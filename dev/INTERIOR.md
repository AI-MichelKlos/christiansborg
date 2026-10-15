# Første interiør i Folketinget

15. oktober 2026. Første trin mod et spil for voksne: udforskning af interiør.

## Omfang

Ved hovedtrappen i Rigsdagsgården vises "Gå ind i Folketinget". E eller handlingsknappen åbner en separat 3D-model med en gangbar trappe og Vandrehallen. Telefon og computer bruger de eksisterende kontroller. Indendørs ses verden i øjenhøjde. Spilleren kan gå tilbage til døren eller bruge "Ud i gården". Startskærmen har en genvej til hovedtrappen.

Vandrehallens 80 meter lange akse, egetræspaneler, blomsterfrise, seks marmorsøjler, kamin og grundlovsmontrer bygger på Folketingets offentlige beskrivelser. Døre markerer Folketingssalen, Landstingssalen og Samtaleværelset. Salene er ikke bygget endnu. Frisen er en enkel, selvtegnet botanisk fortolkning, ikke en gengivelse af Rasmus Larsens kunstværk.

## Kilder

- Folketinget, Folketingets lokaler: https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/folketingets-lokaler
- Folketingets billedgalleri, Vandrehallen: https://www.ft.dk/da/billeder_fra_christiansborg/vandrehallen
- Google Arts & Culture, Tour the Danish Parliament, med materiale fra The Danish Parliament: https://artsandculture.google.com/story/FgXRqJzkjtx6wQ

## Grænser for nøjagtighed

Dette er en foreløbig fortolkning, ikke en opmålt digital kopi. Den indvendige trappes udformning, forbindelsen til hallen, bredder, etagehøjde, vinduers rytme og detaljers præcise placering er anslået. Trappen er foreløbig et lige løb og må ikke beskrives som en korrekt gengivelse af Folketingets hovedtrappe. Billedgalleriet kunne findes via søgning, men direkte billedvisning blev blokeret af et sikkerhedstjek. Google-rundvisningens tekst kunne læses; panoramaerne kunne ikke vises i testbrowseren. Ingen fotografier er kopieret ind i spillet.

Næste arbejde med realisme bør prioritere dokumentation af trappen og den faktiske forbindelse til Vandrehallen samt sammenligning med tilgængelige interiørfotos. Portrætterne er endnu ikke modelleret. Voksenhistorie og gåder følger i senere trin.

## Teknik

INTERIOR er en separat, skjult gruppe uden for udendørskortets koordinater. Den bygges ved første besøg. Udendørs geometri og bevægelige figurer skjules under besøget. En separat navigationsfunktion håndterer trappehøjde, grænser og møbler. Udgang gendanner kort, tåge og kamera. Modellen bruger proceduregenererede teksturer og eksisterende three.js, uden nye netværksafhængigheder.

## Kontrol

Kontrolleret i headless Chromium ved 1280 x 800 og med telefonkontekst på 390 x 844 med touch. Testen åbnede døren via den synlige handlingsknap, gik fra indgangen op til 4,8 meters gulvhøjde og fortsatte 33 meter langs hallen. Udgang via knap, hjælp og fortsættelse samt telefonens venstre touch-styring og udgang blev kontrolleret. Ingen JavaScript-fejl i den gennemførte gennemgang. To indvendige skærmbilleder er gennemset. JavaScript-syntaks og git diff --check er kontrolleret.
