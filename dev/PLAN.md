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
- [x] 4. Slotskirken og Thorvaldsens Museum (5. okt. 2026)
  - Slotskirken: kirkens krop fra OpenStreetMap (hipped tag), kuppel på en rund tambur med små vinduer og en lille lanterne ved (-38.3, -108.9). Søjlegangen mod kanalen er bygget i hånden: seks hvide søjler, bjælke og trekantet gavl (`gableRoof`, `prismGeo` er nu kopieret fra skolespillet).
  - Thorvaldsens Museum: okker vægge, 16 m. Hovedfacaden (mod vest, der hvor quadrigaen står i OSM) har fem høje døre, der er smallere foroven. De andre facader har vinduer og en malet frise (`TX.frieze`) med skibet og mennesker med Dannebrog. Quadrigaen står på taget: Victoria i vognen og fire heste (`bronzeHorse`).
  - `edgesOf(ring)` giver væggene med deres retning udad. Brug den til facader fremover.
- [x] 5. Børsen med dragespiret, som den så ud før branden i 2024 (5. okt. 2026)
  - Bygget i hånden i en gruppe langs grundplanen (midte (253, 65), drejet -0.393, 127.8 x 20.6 m): røde mursten (`brickTex` fra skolespillet), sandstensbånd, grønt kobbertag til 18.75 m, høje hollandske gavle i begge ender (`dutch` med trin), 10 små gavle på hver langside og vinduer i to etager. Hoveddøren vender mod Christiansborg.
  - Dragespiret midt på taget: fire drager med hovederne ud mod hjørnerne, halerne snor sig op (`TubeGeometry`), tre guldkroner (`crownAt`) og en kugle i 56 m.
  - Børsens grundplan bruges kun som usynlig mur (listen `own` i bygningsløkken).
- [x] Ekstra: Højbro, den første bro (5. okt. 2026)
  - Bygget i hånden i sin egen ramme (`HB`: midte (-3.5, -165.25), retning over kanalen (-0.16, 0.987), 18.7 x 18.25 m). Kørebanen hæver sig 1.2 m på midten (`hbH`), og `archH` løfter pigen, når hun går over (lagt ind i `groundAt`). Grønne stålsider, fortove, jerngelænder (`TX.rail`), granitblokke med en lygte på hvert hjørne.
  - Den almindelige flade bro og vejstykket over Højbro tegnes ikke længere.
  - Et klart sted i vandet (`POOL` ved (-21, -167), radius 4: hul i jorden og i vandet, gennemsigtig overflade) viser havmanden og hans syv sønner af bronze på bunden (Suste Bonnén, 1992). De rækker armene op. På broen kommer knappen "Kig efter havmanden", som drejer kameraet ned mod dem, og de vinker.
  - Samme metode kan bruges til de andre broer i trin 7.
- [x] 6. Det Kongelige Bibliotek (Den Sorte Diamant) og Tøjhusmuseet (5. okt. 2026)
  - Det gamle bibliotek (huset med gårde, første punkt (154, 264) i OSM): røde mursten, buede vinduer i to rækker, rødt tegltag (skrå kant med huller til gårdene).
  - Den Sorte Diamant: to sorte, blanke blokke (`TX.diamond`, vinduesbånd der lyser om aftenen), som læner sig 4 m ud mod havnen, og en glasvæg i midten (midte (164, 297.5), drejet 0.585). Glasbro over Christians Brygge til det gamle bibliotek. Den lave østlige del er en mørk klods på 12 m.
  - Tøjhusmuseet (Krigsmuseet i OSM): bygget i hånden i en gruppe (midte (18.5, 204.5), drejet -0.985, 164.5 x 24.7 m), røde mursten, højt tegltag, hollandske gavle og vinduer i to rækker. To kanoner ved døren på havesiden skyder med konfetti (knappen "Skyd med konfetti").
- [x] 7. Kanalerne med både, broerne og Holmens Kirke (6. okt. 2026)
  - Vandet ligger nu 2.4 m under kajen (`WL`). Kanalerne og havnen er lagt sammen til ét omrids (`WATER_U`, regnet med shapely i Python), som er et hul i jorden. Kajmure af sten (`TX.quayWall`) går ned til vandet, og der er kantsten langs kanten. Små damme ligger stadig i jordhøjde.
  - Alle broer er buer (`archBridge(F, look)` med `BRIDGE_LOOK`: steel, iron, stone). Rammen findes ud fra OSM-omridset (`bridgeFrame`). Dækket hæver sig (`archDeck`), og undersiden buer ned til kajmuren (`archSoffit`). `archH` løfter pigen på alle broer (`ARCHES`). Marmorbroen og Prinsens Bro er af sandsten med balustrade. Vejbåndene over broerne tegnes ikke længere.
  - Tre kanalbåde sejler frem og tilbage ad `CANAL_ROUTE` (fra Børsgraven rundt om Slotsholmen til havnen) og vender ved enderne. Havnebussen sejler ad `HARBOUR_ROUTE`. Bådene er lagt sammen pr. materiale (`bakeGroup`), så der er færre ting at tegne. Knappen "Vink til båden" (inden for 22 m) får folkene og pigen til at vinke, og båden tuder.
  - Holmens Kirke: kors af røde mursten med grønne kobbertage, hollandske gavle på de fire ender, spir over korsets midte til 45 m (fra OSM-delene). Kapellet langs kanalen og våbenhuset mod vest er klodser.
  - Kanalens midte og ruten er fundet med `scratchpad`-scriptet `route.py` (shapely). Kanalen og havnen mødes uden for kortets kant, derfor vender bådene.
- [x] Ekstra: oplæsning er slået fra fra start (6. okt. 2026). Knappen "Læs op" slår den til og fra (`setVoice`). Valget gemmes under `readAloud`, så et gammelt gemt "til" ikke tænder den igen.
- [x] Ekstra: Christiansborg Slot flottere (6. okt. 2026)
  - Den store blok har granit på væggene (`GRANITE`, `TX.granite`: en flise er 4.8 x 2.4 m) og en grov sokkel af granit (`TX.granBase`) op til 5.4 m med et bånd over. Pilastre mellem vinduesfagene, en tung gesims under taget og kviste i kobbertaget over hvert andet fag. Skorstenene er firkantede af granit med kobberhat.
  - Ansigter af kendte danskere (små relieffer) over vinduerne i stueetagen.
  - Kongeporten (47, -28) og Dronningeporten (-31.4, -45.7) har en høj dør, fire søjler, en altan med balustrade og en guldkrone. Pigen går uden om søjlerne.
  - Fire bronzestatuer på granitsokler i Prins Jørgens Gård (fra OSM-punkterne). Nyt sted: Prins Jørgens Gård.
  - Ideer til senere: Folketingets indgang i Rigsdagsgården, figurer på taget, fløjene ved Ridebanen.
- [x] Ekstra: Beskæftigelsesministeriet, Ved Stranden 8 (6. okt. 2026)
  - Hele karréen mellem Ved Stranden, Boldhusgade, Admiralgade og Holmens Kanal (OSM-huset med første punkt (113, -122) og to gårde): Nordisk Genforsikrings tidligere hovedsæde (N. P. P. Gundstrup, 1932-38) bygget sammen med hjørnehuset fra 1796. Wikipedia nævner også Forsvarsministeriet i samme hus.
  - Lys sten (`TX.sandstone`), sokkel af granit, fem etager, gesims, grønt kobbertag med kviste. Hoveddøren midt på facaden mod kanalen med stenramme, et grønt skilt med guldbogstaver (`TX.ministrySign`) og Dannebrog på en skrå flagstang, der vajer (`MINISTRY.flag`). Facaden er gættet, da jeg ikke fandt billeder eller beskrivelser.
  - Nyt sted: Beskæftigelsesministeriet (138, -98).
- [x] Ekstra: veje, cykler og biler (9. okt. 2026)
  - Vejene tegnes nu i blokken `STREETS` ud fra `ROADS_TO_DRAW`: store veje med asfalt, stiplet midterlinje, kantlinjer, cykelsti med hvide cykler og fortov af fliser. Små veje har brosten (`TX.setts`), gågader lyse fliser. Fortov og cykelsti udelades, hvor de ville nå ud over vandet. 48 fodgængerfelter (`ZEBRAS`) ved kryds.
  - Hvide linjer stopper, hvor en anden vej krydser (`crossing()` med et gitter på 16 m, `markLine()`).
  - Blokken `TRAFFIC`: 4 ruter fra vejnettet (regnet i Python, to åbne og to sløjfer). 7 biler og 6 cyklister (hver tredje er en ladcykel med et barn) kører i højre side, holder afstand og stopper og venter, når pigen står foran dem (dyt eller ring-ring og en kort besked højst hvert 20. sekund). Pigen kan ikke gå igennem dem. `__cb.VEHICLES` og `__cb.frames(n)` til test.
  - 40 parkerede biler langs de små veje og gadelygter langs de store veje.
  - De åbne ruter går lidt ud over kanten af kortet og starter forfra, når de når enden.
- [ ] 8. Noget sjovt at finde og lave for en 5-årig
