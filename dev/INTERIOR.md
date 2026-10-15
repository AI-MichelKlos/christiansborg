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


## Runde 1: betjentstuen og Samtaleværelset

15. oktober 2026. To åbne, gangbare rum er føjet til det eksisterende interiør. Betjentstuen ligger til højre for indgangen ved trappens fod. Samtaleværelset nås fra Vandrehallen. Der er sammenhængende gulve og rigtige åbninger i væggene, så spilleren går gennem dørene uden teleportering. Rummenes møbler stopper spilleren. Kamera, hjælp og mobilstyring fungerer som i den øvrige indvendige model.

### Visuelle referencer, som blev undersøgt

- Mie Mørkebergs egen side: https://miemoerkeberg.dk/selected-works/paintings . Rumbilledet https://miemoerkeberg.dk/uploads/images/Gallery/paintings/2024/_G6A8070.jpg blev hentet og visuelt gennemset. Det viser lysegrønne vægge med hvide lister, mørke træpaneler, høje vinduer, blåt stolebetræk, rundt træbord, lyst mønstret tæppe og stort gruppeportræt. Disse rumlige træk er brugt som model.
- Folketinget, Kunsten i Samtaleværelset: https://www.ft.dk/da/aktuelt/tema/samtalevaerelset_2022 . Dokumenterer salonindretningen, de to store gruppeportrætter på modstående vægge og mindevaserne. Spillets vægbilleder er egne skematiske gruppescener uden portrætlighed, ikke gengivelser af de originale kunstværker.
- Folketingets billedgalleri: https://www.ft.dk/da/billeder_fra_christiansborg/samtalevaerelset/03 . Fotograf Anders Hviid. Billedsiden blev fundet, men selve fotohentningen blev blokeret.
- Supplerende fotoreferencer fundet på Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Samtalev%C3%A6relset_at_Christiansborg_Palace,_Denmark.jpg (Peter Leth, 2013) og https://commons.wikimedia.org/wiki/File:M%C3%B8blement,_Samtalev%C3%A6relset_(54876796209).jpg (Christian Ursilva, 2025). Billedfilerne kunne ikke hentes i arbejdsmiljøet og bruges ikke som teksturer.
- JJI, eget inventarprojekt for Folketinget: https://www.jji.as/referencer/folketinget . Billedet https://www.jji.as/images/bagallery/original/skranke-i-bejdset-eg.jpg blev hentet og visuelt gennemset. Den buede fyldningsskranke af eg er brugt som reference for betjentstuens skranke. Kilden dokumenterer inventar i Folketinget, men dokumenterer ikke, at skranken står i en betjentstue ved hovedindgangen.

### Hvad der fortsat er anslået

Der blev ikke fundet et sikkert interiørfoto eller en verificeret plantegning af betjentstuen. Dens placering, størrelse, nøgleskab, opslagstavle, arbejdsplads og stole er derfor en fortolkning af manuskriptets fysiske behov, med inspiration fra den dokumenterede egetræsskranke. Det samme gælder rummenes mål og deres forbindelser til det eksisterende, anslåede trapperum. Samtaleværelsets farver og møbeltyper bygger på et gennemset foto, men møbelplacering, vinduesretning, antal borde og mål er ikke opmålt. Der er ikke kopieret fotos ind i spillet.

Dette trin bygger kun steder og almindeligt inventar. Ingen figurer, spor, adgangslog, samtaler eller mordgådefunktioner er tilføjet.

### Kontrol af runde 1

Kontrolleret i Chromium i desktopformat (1280 x 800) og mobilformat med touch (390 x 844). Gået begge veje gennem begge døråbninger. Gulvet i Samtaleværelset bliver på 4,8 m, mens betjentstuen har gulv i indgangens niveau. Vægge og borde stopper spilleren, og en søgning gennem de gangbare områder finder veje fra indgangen til begge rums gangarealer. Mobilens joystick blev afprøvet i Samtaleværelset. Hjælp, fortsættelse og udgang til gården er kontrolleret. Ingen JavaScript-fejl; skærmbilleder i begge formater gennemset. JavaScript-syntaks og git diff --check bestået.
