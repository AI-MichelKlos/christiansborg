# Plan for Christiansborg-spillet

Skrevet 5. oktober 2026.
Udarbejdet med AI (Claude) og med begrænset mennesketjek.

Et 3D-spil i browseren på Christiansborg og Slotsholmen, til børn på omkring 5 år. Teksterne i spillet er korte, enkle og bliver læst højt. Ingen tankestreger, kun bindestreg.

## Sådan arbejder vi
- Ét trin pr. samtale. Stop efter trinnet og vent på, at Michel skriver "fortsæt".
- Hold svarene korte. Brug ikke underagenter, medmindre Michel beder om det. Læs kun de dele af filerne, der skal bruges. Test med få skærmbilleder.
- Spillet er én fil: `index.html` med three.js 0.160 fra jsDelivr.
- Motoren er kopieret fra `skolen-paa-duevej`: pigen, kameraet bag hende, styring på computer og telefon, kortet i hjørnet, læs op, knapperne og sammenlægningen af statiske ting ("freeze static world").
- Nye ting kan bruge `HOOKS` (frame, ride, key, start), `FX` og handlingsknappen `offerAction({ id, label, run, prio })`.
- Commit som "Michel Klos". Når et trin er færdigt: opdater tjeklisten herunder med korte noter.
- Artefakt med spillet: https://claude.ai/artifact/RxC5FdxMhs3NH9xdf7zzej (opdater den ved at give url'en til Artifact-værktøjet). Artefaktens kopi af `index.html` skal være uden `<!doctype>`, `<html>`, `<head>` og `<body>`.

## Koordinater og data
- 1 enhed = 1 meter. x går mod øst, z går mod syd. (0, 0) er 55.6761 N, 12.5800 E, midt i Christiansborg.
- Kortdata fra OpenStreetMap ligger i konstanten `OSM` i `index.html` (B bygning, W vand, R vej, A område). De er hentet med `dev/hent-osm.js` i browseren via Overpass.
- Man kan gå i x -298 til 328 og z -262 til 343 (`BOUNDS`). Pigen starter på Højbro Plads (-6, -228) og kigger mod syd.
- Steder (x, z): Christiansborg (0, 40), Slotskirken (-30, -105), Thorvaldsens Museum (-100, -72), Ridebanen (-140, 85), Slotspladsen (100, -20), Børsen (250, 65), Holmens Kirke (215, -45), Tøjhusmuseet (20, 205), Det Kongelige Bibliotek (125, 250), Den Sorte Diamant (215, 255), Højbro (-5, -167), Marmorbroen (-206, 140).
- `building(rings, højde, væg, tag)` laver en klods med den rigtige grundplan. Højder og farver står i `NAMED`. Pigen støder ind i husene (`pcols`), og kameraet stopper foran dem (`rayPoly`).
- `waterAt(x, z)` stopper pigen ved vandet. Hun kan gå på broerne (`BRIDGES` og vejstykker, der er broer).
- `POIS` er navne og tekster. De vises og læses op, når hun kommer tæt på. Første gang kommer navnet også op over hende med stjerner.
- Test: headless Chromium (Playwright) med three.js fra npm. `window.__cb` har `tp(x, z, retning)`, `keys` og `step(n)` til at teste gang uden skærm.

## Tjekliste
- [x] 1. Enkel model af Slotsholmen (5. okt. 2026)
  - Flad jord, kanaler og havn som blå flader med kajkant, flade broer med lave mure, pladser, græs, gader og 244 huse som klodser.
  - 26 steder med navn og tekst. 16 træer i Bibliotekshaven.
  - Christiansborg er én grundplan i OpenStreetMap med både Ridebanens fløje og selve slottet. Lige nu er det hele 12 m højt, og slottet (øst for linjen fra (-82, -46) til (-107, 173)) er bygget ovenpå op til 26 m. Trin 2 og 3 skal erstatte det.
  - Tagene er flade, og broerne har ingen buer endnu. Absalon på Højbro Plads og kongen på Slotspladsen står i teksterne, men er ikke bygget.
- [x] 2. Christiansborg Slot med tårnet (5. okt. 2026)
  - Slottet og Ridebanens fløje tegnes nu fra 3D-delene i OpenStreetMap (`OSM_PARTS`: højde, tagform, farver) med `partBlock`. Skrå tage laves med `bevelRoof` (en skrå kant på en tynd klods). Slottets grundplan bruges kun som usynlig mur (`pcols`) og på kortet.
  - Vinduer fra skolespillet (`addWin`, lyser om aftenen) på den store blok, fire rækker. Kongeporten er en høj buet port på østsiden (47, -28).
  - Tårnet er bygget i hånden ved (25.5, -14.1), drejet 0.6: stentårn til 40 m, kobber til 72 m, lanterne, spir til 106 m og tre kroner af guld. Kobber er brunt (`COPPER`), sådan som taget ser ud efter renoveringen.
  - Frederik 7. til hest på Slotspladsen (81, -51). Nyt sted: Tårnet.
  - Hvis Overpass er optaget: hent rå data med `https://api.openstreetmap.org/api/0.6/map?bbox=...` i browseren (lille område) og find `building:part`.
  - Til test: `window.__camFix = [[x, y, z], [x, y, z]]` låser kameraet.
- [x] Ekstra: styring på telefon (5. okt. 2026). Touch-knapperne vises nu (venstre tommel går, højre tommel kigger, Hop-knap), og tekstkortene blokerer ikke fingrene (`pointer-events:none`). Testet med rigtige touch-events (Chrome DevTools `Input.dispatchTouchEvent`).
- [x] 3. Ridebanen og staldene (5. okt. 2026)
  - Vinduer på fløjene og de andre lave dele: én række pr. etage, ingen vinduer på vægge, som en nabodel dækker. Sydfløjens side mod sandet har grønne stalddøre, og der kigger heste ud over hver anden.
  - Tre heste går rundt på sandet (`HORSES`, cirkel om (-133, 88) med radius 17), den brune med en rytter i rød jakke. Kommer pigen tæt på, stopper de, vrinsker og kigger på hende. Knappen "Klap hesten" (E) får hesten til at nikke.
  - `rytter(x, z, retning)` laver en konge til hest. Christian 9. står ved (-73, 50), Frederik 7. ved (81, -51).
  - Nye steder: De Kongelige Stalde (med Hofteatret ovenpå) og Christian den Niende.
  - Dele, der deler en væg, flimrede. Nu rykkes lavere dele et par cm ind (`insetRing`), og skyggens bias er sat op, så store vægge ikke får striber.
- [ ] 4. Slotskirken og Thorvaldsens Museum (OSM har 3D-dele til Slotskirkens kuppel omkring (-38, -109))
- [ ] 5. Børsen med dragespiret (som den så ud før branden i 2024)
- [ ] 6. Det Kongelige Bibliotek (Den Sorte Diamant) og Tøjhusmuseet
- [ ] 7. Kanalerne med både, broerne og Holmens Kirke
- [ ] 8. Noget sjovt at finde og lave for en 5-årig
