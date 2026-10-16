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
- Artefakt med spillet: https://claude.ai/artifact/G1qjW6PW6Rxo8TMneLCwsY (fra 13. okt. 2026; den gamle artefakt RxC5FdxMhs3NH9xdf7zzej er ikke opdateret). Opdater den ved at give url'en til Artifact-værktøjet. Artefaktens kopi af `index.html` skal være uden `<!doctype>`, `<html>`, `<head>` og `<body>`.

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
- [x] 8. Noget sjovt at finde og lave for en 5-årig (9. okt. 2026)
  - Kronejagt: 10 guldkroner (`CROWN_SPOTS`, `CROWNS`) ved Højbro Plads, Slotskirken, Thorvaldsens Museum, Prins Jørgens Gård, Slotspladsen, Ved Stranden, Børsen, Bibliotekshaven, Ridebanen og Marmorbroen. De drejer rundt, har et gult lys over sig og en gul prik på kortet. Hun tager en krone ved at gå ind i den. Tælleren øverst til venstre viser "3 af 10".
  - Når alle 10 er fundet: fanfare, fyrværkeri, en lille krone på pigens hoved og et kort med "Gå videre rundt" eller "Gem kronerne igen". De fundne kroner gemmes i localStorage (`crowns` i `christiansborg3d`).
  - Ænder: to familier (en mor og fire gule ællinger på række) i kanalen ved Gammel Strand (-70, -152) og ved Børsen (215, -15). Ved vandet kommer knappen "Giv ænderne brød". Brødet flyver ud i vandet, ænderne svømmer hen og spiser det og siger rap rap.
  - Startbeskeden og introteksten fortæller om kronerne. Hjælp-kortet viser, hvor mange kroner hun har fundet. Fejl rettet: Lyd-knappen kaldte en lyd, der ikke fandtes.
  - Test: `__cb.CROWNS`, `__cb.FAMILIES`, `__cb.found`, `__cb.spot(x, z)` (0 betyder fri plads) og `__cb.bigMap(1260)` (stort kort til at finde steder).
  - Ideer til senere: flere ting at gøre (fx vagtskifte, klokkerne i tårnet), en lille opgave pr. sted, svaner ved Sorte Diamant.
- [x] Ekstra: sejl selv i en lille båd (9. okt. 2026)
  - En lille rød båd (`MYBOAT`) ligger ved kajen ved Gammel Strand (-37.5, -170.6). Nyt sted: Den lille båd (stedet følger båden, og båden er en rød prik på kortet).
  - "Sejl med båden" (E) når hun står ved den. Så styrer de samme taster og den samme tommel båden (`HOOKS.ride`), og Hop-knappen hedder Dyt og dytter. Hun sidder på bænken med hænderne på rattet og dukker sig under broerne. Motorlyd og hvidt skum bag båden.
  - Båden kan ikke sejle på land eller under de lave ender af buebroerne (`lowAt`, under WL + 2.0) og glider langs kajen, hvis hun sejler ind i den. De store kanalbåde og havnebussen stopper og venter, når hun ligger foran dem.
  - "Gå i land" kommer, når der er en fri plads på kajen tæt på (`landSpot`). Båden bliver liggende, hvor hun går i land. Står hun stille ude på vandet, får hun at vide, at hun skal sejle hen til kajen.
  - Test: `__cb.MYBOAT`, `__cb.boatFits(x, z, h)`. Hele kanalruten fra Børsen til Marmorbroen passer til båden. Bemærk at `__cb.step(n)` ikke flytter de store både.
- [x] Ekstra: små opgaver med stjerner (9. okt. 2026)
  - 12 opgaver i `TASKS` (nu 13, se Slotskirken), hver knyttet til et eller flere steder (`at` er stedernes navne). Tre slags: gør noget med E-knappen (`act`: havmand, hest, brod, kanon, baad), gå et bestemt sted hen (`test`: Herkules, toppen af Marmorbroen, sejl under Højbro) eller svar på et spørgsmål med tre store knapper (`quiz`: kronerne på tårnet, dragerne på Børsen, hestene på Thorvaldsens Museum, farven på Holmens Kirkes spir).
  - Opgaven står nederst på stedets kort og bliver læst op med det. Ved spørgsmål kommer knappen "Svar på opgaven". Forkert svar: "Næsten! Prøv igen", og knappen bliver grå.
  - Stjerne-tælleren står under kronerne (`#counters`, klassen `.ctr`). Tryk på den viser hjælpekortet med alle opgaverne som små mærker. De klarede opgaver gemmes (`tasks` i localStorage). Når alle 12 er klaret, kommer der fyrværkeri.
  - E-knappen flytter sig nu op over stedets kort, når kortet er højt (`--poiH`).
  - Test: `__cb.TASKS`, `__cb.tasksDone`, `__cb.taskAct(id)`, `__cb.openQuiz(task)`.
- [x] Ekstra: Slotskirken flottere (10. okt. 2026)
  - Bygget efter beskrivelsen på lex.dk (C.F. Hansen, 1813-26): lyse pudsede mure, en sokkel, en kordongesims 3/8 nede ad facaden (13,1 m) og en gesims under det næsten flade kobbertag (21 m). Vinduer med små ruder i to bånd (ny vinduestype `pane`). Midt på hver langside en risalit, der træder lidt frem, med et stort halvrundt vindue over kordongesimsen (ny vinduestype `lunette`).
  - Portikoen mod Højbro har nu fire joniske søjler (før seks) med sokler og snegle på kapitælerne, bjælke, gesims og trekantgavl. Bagved en stribet pudset mur og en stor brun dør med stenramme. Pigen kan gå op ad trappen til døren (mange små runde `colCirc` med top 0,2, 0,4 og 0,6), men ikke gennem søjlerne. Kirkens usynlige mur (`pcols`) bruger nu kun kirkekroppen uden portikoen.
  - Kuplen er flad, af kobber, på en tambur uden vinduer (med små pilastre) og har et rundt vindue i toppen. Lanternen og vinduerne i tamburen er fjernet.
  - Teksten om Slotskirken er rettet. Ny opgave: "Hvor mange søjler står der foran kirken?" (4). Nu er der 13 opgaver.
- [x] Ekstra: Kirkeløngangsbygningen (10. okt. 2026)
  - Fløjen mellem slottet og Slotskirken på østsiden af Prins Jørgens Gård (OSM-huset uden navn med første punkt (-22, -100), 40,5 x 13 m). Den er fra det første Christiansborg (Elias David Häusser, 1733-41), jf. indenforvoldene.dk. Udseendet er gættet: lys puds, stribet stueetage, tre rækker vinduer med små ruder, gesims og kobbertag (`LOENGANG`).
  - Kirkeløngangsporten midt i fløjen er en hvælvet port med brosten, som pigen kan gå igennem fra Slotspladsen til Prins Jørgens Gård. Over porten mod pladsen sidder en guldkrone. Den usynlige mur er delt i to dele plus et stykke over porten med `bot: 5.6`.
  - Slotskirkens vinduer på det stykke af sydøstmuren, hvor fløjen er bygget på, er fjernet. Nyt sted: Kirkeløngangsbygningen. Ny opgave: "Gå gennem porten" (nu 14 opgaver).
- [x] Ekstra: Folketingets indgang og statsministeren (10. okt. 2026)
  - Indgangen midt på slottets sydfacade mod Rigsdagsgården (`FT`, facadelinjen fra (-23.4, 86.5) til (78.1, 20.9), midten (27.4, 53.7)): en bred granittrappe med fem trin og repos (pigen kan gå op, små `colCirc`), tre døre med stenrammer (den midterste åbner), et grønt skilt med FOLKETINGET i guld og to lygter. Facadens stuevinduer og hoveder i de to midterste fag er fjernet (`FT_DOOR`). Placeringen bygger på, at Folketingets store trappe ligger i Rigsdagsgården, og at ministerbilerne må køre ind ad Tøjhusgade (Altinget). Dørenes udseende er gættet.
  - Rigsdagsgården var lukket helt inde i kortdataene. Der er nu en port gennem den lave fløj mod Tøjhusgade (`FT_GATE`: fløjen er skåret i to dele og et stykke over porten med `mh: 5.5`, et hul i slottets usynlige mur, `c.cut`). Hvor den rigtige åbning er, er gættet.
  - Når pigen er inden for 45 m af trappen, kommer tre sorte biler ind fra Tøjhusgade og holder ved trappen. To livvagter stiger ud, så statsministeren (en kvinde i blåt med rødt halstørklæde) og en livvagt mere. Hun vinker til pigen, hvis hun er tæt på, går op ad trappen og ind ad døren, og livvagterne følger efter. Bilerne kører rundt i gården og ud igen. Det sker igen efter 90 sekunder. Bilerne venter, hvis pigen står foran dem.
  - "Vink til statsministeren" (E) og en ny opgave om det (nu 15 opgaver). Teksten om Rigsdagsgården er udvidet. `carBody` har fået en farve til ruderne.
- [x] Ekstra: portene ind til Rigsdagsgården (10. okt. 2026)
  - Tjekket i OpenStreetMap (Overpass): stien Rigsdagsgården går fra Tøjhusgade gennem en port (building_passage ved (0, 112)-(8, 108)) og ud til Christiansborg Slotsplads gennem en port i den lave fløj i nordøst (building_passage ved (74, 49)-(85, 42)). Trappen til Folketinget ligger fra (27, 54) ud til (36, 67) med 8 + 6 trin, så indgangen sidder det rigtige sted.
  - Begge fløje skæres nu med `cutGate(x, z, d0, d1)` (porten mod Tøjhusgade d 31-38, porten mod Slotspladsen d 18-25 i `FT`-koordinater) og får hvælving, stenbuer, sokkel, bånd og gesims. Ingen vinduer i portene. Slottets usynlige mur har en liste af huller (`c.cut`).
  - Ideer til senere: Proviantpassagen (service-vej gennem Centraladministrationen ved (78, 68)-(86, 80) mod Proviantgården) og gangen ved (37, 95)-(45, 107) mod Bibliotekshaven er også porte i virkeligheden. Trappen kunne gøres længere (to løb).
- [x] Ekstra: flottere ministerbiler (12. okt. 2026)
  - De tre sorte biler ved Folketinget er nu lange, lave sedaner (`ministerCar`, 5 m): skrå motorhjelm og bagagerum (en sideprofil, der er gjort tyk, med runde kanter og hjulkasser), tonede ruder, tag, stolpe mellem ruderne, krom langs ruderne, kromgrill med sorte tremmer, forlygter, baglygter, hvide nummerplader, spejle og lyse kantlinjer (`CAR_EDGE`), så det sorte viser formen. Fælgene er af krom med en mørk streg, så man kan se hjulene dreje. Næsen dykker lidt, når bilen bremser.
  - De to døre i højre side (mod trappen) kan åbne. Bag dem er der en mørkebrun åbning. Venstre side har tegnede dørstreger og håndtag.
  - Ny vej (en blød kurve, `CatmullRomCurve3`): ind fra Tøjhusgade gennem porten, langs den fjerne side af gården, rundt for enden og tilbage langs slottet, så trappen er på bilernes højre side, når de holder. Så ud igen gennem samme port. Bilerne holder på række med 7,5 m imellem, og statsministerens bil holder lige ud for trappen (`FT.stopS`).
  - Ved trappen: forreste og bageste bil åbner fordøren, og en livvagt stiger ud af hver. Så stiger livvagten i den midterste bil ud, lukker sin dør og åbner bagdøren, og statsministeren stiger ud. Dørene lukker igen. Lyd: motor, et lille klik når en dør åbner, og et blødt bump når den lukker (svagere langt væk).
  - Bilerne er stadig 3 grupper i `dyn`. `__cb.FT_CARS` er nu objekter med `g`, `body`, `doors`, `wheels` og `want`.
- [x] Ekstra: lavet uden for planen 10.-13. okt. 2026 (skrevet ind her 13. okt.)
  - Duer på Slotspladsen omkring Frederik 7. (`PIGEONS`): de letter i bølger, når pigen kommer tæt på, og lander igen, når hun er gået. Fem duer på Højbro Plads. Rytterstatuen af Frederik 7. er gjort flottere.
  - Vejvisning: skiltet "Nærmeste krone" under tællerne peger mod den nærmeste krone (`updGuide`). Stedkortene viser først en kort tekst med "Læs mere".
  - Gående folk på Højbro Plads (`START_WALKERS`), som siger "Hej!", når pigen kommer tæt på.
  - Et løbehjul at låne på Højbro Plads (`SCOOTER`, `FX.scooter`). Hop-knappen stiller det fra sig.
  - Fodgængerlys ved overgangen over Vindebrogade efter Højbro (`HOJBRO_LIGHT`, `FX.hojbroLight`): hun venter ved rødt.
  - Flottere facade og tårn på Christiansborg (stenrammer om vinduerne, `palaceWindowSurround`).
  - Mere liv på Christiansborg Slotsplads: små granitbrosten (`TX.slotsSetts`, `SLOTSPLADS_RING`), granitkugler langs gaden og turister, der tager billeder eller går frem og tilbage (`TOURISTS`).
- [x] Ekstra: op i tårnet (13. okt. 2026)
  - Ved Kongeporten kommer knappen "Kør op i tårnet" (`TOWER.door`). Besøgende går ind ad Kongeporten under tårnet (european-traveler.com), og Udsigten ligger 44 m oppe (ft.dk, Lonely Planet).
  - Elevatoren: et lyst kort dækker skærmen, og meterne tæller op til 44 (ned igen på vej ned), så siger det ding (`#lift`).
  - Oppe står hun ved et rækværk (`rail`, kun synligt deroppe) på en firkantet gang rundt om tårnet (`TOWER.gallery(f)`). Pilene eller tommelen drejer hende rundt, op og ned kigger op og ned (`cam.pitch`, `TOWER.look()`), og at trække virker også. Kigger hun langt ned, læner hun sig ud over rækværket. Kameraet sættes i en `HOOKS.frame` efter det almindelige kamera.
  - Navneskilte over de store steder (`SIGHTS`, kun synlige i tårnet). Mellemrum eller knappen Kikkert zoomer ind. Tågen er længere væk deroppe.
  - Nyt sted: Udsigten (midt i tårnet, kun når hun er deroppe). Ny opgave: "Drej rundt, til du kan se Børsens drager" (`TOWER.sees(x, z)`). "Kør ned igen" sætter hende uden for Kongeporten.
  - Mens elevatoren kører, kan hun ikke gøre andet (`FX.tower.busy` i `updActions`).
- [x] Ekstra: svaner og springvand (13. okt. 2026)
  - En svanefamilie i havnen foran Den Sorte Diamant (`SWANS`, hjem (242, 290)): to hvide knopsvaner og tre grå unger, lidt større end i virkeligheden. "Vink til svanerne" ved kajen: forældrene løfter vingerne, og familien svømmer hen til hende. Nyt sted: Svanerne. Ny opgave.
  - Springvandet i Bibliotekshaven (`FOUNTAIN`): dammen (OSM-vand med første punkt (67, 163)) har fået en lav stenkant, og i midten står en høj skulptur af kobber (8 m, Mogens Møller, jf. Wikipedia). Vandet løber ned fra skålen på toppen (`THREE.Points`) med ringe på vandet. Det sker af sig selv en gang imellem, og "Start springvandet" sætter det i gang. Skulpturens form er gættet. Ny opgave.
- [x] Ekstra: de sidste porte (13. okt. 2026)
  - Det lange hus "Slotsholmen" (OSM, første punkt (107, 66)) er skåret i stykker af `passageHouse`: Proviantpassagen (s 92,8-97,8 i Rigsdagsgårdens ramme, 5 m bred) og gangen mod Bibliotekshaven (s 44,2-48,2). Over portene er der et stykke hus fra 4,6 m, og portene har brosten og en stenramme. Pigen kan gå igennem begge. Nyt sted: Proviantpassagen.
- [x] Ekstra: tjek på telefonen (13. okt. 2026)
  - Målt i en telefonstørrelse (390 x 844, touch): tegnekald pr. billede på Slotspladsen 379 før, 258 nu. Rigsdagsgården 316 før, 234 nu. Højbro Plads 138 før, 126 nu.
  - `bakeColored(root)` lægger de faste dele af små ting sammen til én mesh med farverne i hjørnerne. Bruges på duer, turister og gående folk (ben, arme og vinger bliver for sig selv, de er mærket `keep`). Turister, der tager billeder, er én mesh.
  - `hideWhenFar(objs, x, z, r)` skjuler duer, turister, gående folk, ænder, svaner og havmanden, når kameraet er langt væk.
  - På telefon kaster de små mennesker ingen skygge.
  - Ideer til senere: folkene ved Folketinget (statsministeren og livvagterne) er mange små dele og kunne også lægges sammen.

- [x] Ekstra: par, familier og hundeluftere (15. okt. 2026)
  - De gående på Højbro Plads og Slotspladsen går nu i tre par, to familier med to børn hver, to hundeluftere og én person alene. Flere af de voksne er kvinder med forskellige frisurer og almindeligt, varieret tøj. Børnene er mindre og tager hurtigere skridt.
  - Par og familier deler rute og vender sammen. To små hunde går i snor med bevægelige ben og logrende hale. De nye figurer bruger den eksisterende sammenlægning af geometri og skjules på afstand.
  - Kontrolleret i Chromium: ingen JavaScript-fejl; alle gruppemedlemmers og hundes ruter er fri for vand, bygninger og trafik gennem hele turen i begge retninger. To skærmbilleder gennemset.

## Nyt spor: interiør og voksenspil
- [x] Første interiør (15. okt. 2026): indgang fra Rigsdagsgården, gangbar foreløbig trappe, Vandrehallen med Rigets midte, grundlovsmontrer og navngivne døre. Genvej til hovedtrappen på startskærmen. Realisme, kilder og resterende usikkerheder er beskrevet i `dev/INTERIOR.md`. Første trin handler om at kunne udforske rummene; voksenhistorien er endnu ikke indført.

- [x] Hoveddøren står nu permanent åben, også under ministerbilernes besøg. Går man hen til åbningen øverst på trappen, kommer man automatisk ind. Handlingsknappen er også bevaret.

- [x] Mobilstyring (15. okt. 2026): analogt joystick med dødzone og gradvis ganghastighed. Udendørs går figuren i retningen i forhold til kameraet; indendørs kan man gå sidelæns uden at dreje blikket. Kameraet styres roligere med højre tommel og bliver stående i valgt retning under gang. Båd og løbehjul beholder deres kørestyring.
  - Handlingsknap nederst til højre med stor trykflade, særskilt layout til stående og liggende telefon. Joystickhint vises også inde i Folketinget. Hjælp, tab af fokus og afbrudt berøring nulstiller input. Kontrolleret i Chromium med touch-events: dødzone, analog hastighed, retning i forhold til kamera, to fingre samtidig, sidelæns gang, pause og knapplacering i stående og liggende format. Ingen JavaScript-fejl.

## Næste idé
- Følg statsministeren ind: en enkel Folketingssal bag døren i Rigsdagsgården, som pigen kan gå ind ad efter hende. Michel har bedt om at gemme den til senere.


## Mord i Rigets midte: fysiske steder, to ad gangen
- [x] Runde 1 (15. okt. 2026): betjentstuen med buet egetræsskranke, arbejdsplads og nøgleskab; Samtaleværelset med grønne vægge, mørke paneler, blå stole, runde borde, tæppe, høje vinduer, vaser og lysekrone. Åbne døre og sammenhængende gang fra det eksisterende interiør. Referencer og usikkerheder i dev/INTERIOR.md. Gang gennem døre, gulvhøjder, møbelkollision, hjælp, mobiljoystick og udgang kontrolleret i Chromium på computer og telefonstørrelse uden JavaScript-fejl.
- [x] Runde 2 (15. okt. 2026): to indvendige trappeløb med repos, træbalustrader og gallerier; hvælvinger, messingkroner, nicher, kamin med ur og forbedrede siddegrupper. Samtaleværelset har to åbne døre midt i Vandrehallen. Visuelt gennemsete fotoreferencer og fortsat anslået plantegning dokumenteret i dev/INTERIOR.md. Trappe op/ned, repos, galleri, begge døre, betjentstue, udgang og mobiljoystick kontrolleret uden JavaScript-fejl.
- [x] Runde 3 (15. okt. 2026): Kompaspartiets gang, to kontorer, sekretariat med kopimaskine og U-bord i mødelokale. Snapstinget i indgangens niveau med spiseborde, buffet, kaffeområde, lyse søjler og to gulvniveauer. Åbne døre, skilte og gangbare forbindelser. Billedreferencer og anslåede placeringer dokumenteret i dev/INTERIOR.md. Alle rumdøre, forbindelser fra indgangen, restaurantens trin, mobiljoystick, kollisioner og udgang kontrolleret på computer og telefonstørrelse uden JavaScript-fejl.
- [x] Runde 4 (16. okt. 2026): Finansministeriets facade med murværk, hvide vinduer, skifertag, frontispice og åben indgang; foyer, garderobe, midtergang og forhandlingsrum. Det fiktive Reformministerium med foyer, gang, departementschefens kontor, printerområde og gangbar sidedør. Startvalg til begge indgange. Billedreferencer og anslået plan dokumenteret i dev/INTERIOR.md.
- [ ] Runde 5: kajen ved Reformministeriet og kajen ved Slotspladsen.
- [ ] Runde 6: Bibliotekshaven og staldene.
- [ ] Runde 7: tårnets indre og Udsigten.
- [ ] Runde 8: Landstingssalen og Slotspladsens presseområde.

Kun fysiske steder i denne fase. Historie, personer, spor og nye spilfunktioner venter.

- [x] Mobilrettelse (15. okt. 2026): rettet fortegnet på joystickets sidelæns bevægelse. Venstre/højre var spejlet i forhold til kameraets faktiske højreakse, både ude og inde. Kontrolleret med faktiske touch-events mod renderkameraets højreakse: venstre og højre ved fire kameravinkler udendørs og indendørs, 16 beståede kontroller uden JavaScript-fejl.

- [x] Automatisk mobilkamera (15. okt. 2026): beholdt joystick, roligt kamerafølge under gang, straks-stop ved slip og valgfrit manuelt kig. Fastholdt gangretning under samme berøring for at undgå spiral. Kontrolleret ude og inde med faktiske touch-events: begrænset drejehastighed, følge og stabil retning ved lang berøring, nul bevægelse og kamerapanorering efter slip, baglæns gang uden kameravending og manuel kamerastyring med prioritet. Ingen JavaScript-fejl.
