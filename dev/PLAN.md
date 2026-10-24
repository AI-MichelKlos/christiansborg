# Plan for Christiansborg-spillet

Skrevet 5. oktober 2026.
Udarbejdet med AI (Claude) og med begrænset mennesketjek.

Et 3D-spil i browseren på Christiansborg og Slotsholmen. Det begyndte som en gåtur for børn på omkring 5 år og er fra 16. oktober 2026 ved at blive mordgåden "Mord i Rigets midte" for voksne. Planen for gåden står i `dev/MORDGAADE.md`. Ingen tankestreger, kun bindestreg.

## Sådan arbejder vi
- Ét trin pr. samtale. Stop efter trinnet og vent på, at Michel skriver "fortsæt".
- Hold svarene korte. Brug ikke underagenter, medmindre Michel beder om det. Læs kun de dele af filerne, der skal bruges. Test med få skærmbilleder.
- Spillet er én fil: `index.html` med three.js 0.160 fra jsDelivr.
- Motoren er kopieret fra `skolen-paa-duevej`: pigen, kameraet bag hende, styring på computer og telefon, kortet i hjørnet, læs op, knapperne og sammenlægningen af statiske ting ("freeze static world").
- Nye ting kan bruge `HOOKS` (frame, ride, key, start), `FX` og handlingsknappen `offerAction({ id, label, run, prio })`.
- Commit som "Michel Klos". Når et trin er færdigt: opdater tjeklisten herunder med korte noter.
- Artefakt med spillet: https://claude.ai/artifact/G1qjW6PW6Rxo8TMneLCwsY (fra 13. okt. 2026; den gamle artefakt RxC5FdxMhs3NH9xdf7zzej er ikke opdateret). Opdater den ved at give url'en til Artifact-værktøjet. Artefaktens kopi af `index.html` skal være uden `<!doctype>`, `<html>`, `<head>` og `<body>`. Fra 17. okt. 2026 skal `mordgaade.js` med som ekstra fil. Artefakten viser stadig udgaven fra 13. okt., fordi den gamle kopi er for stor til at blive læst igennem før en opdatering. Spil i stedet på GitHub Pages, eller lav en ny artefakt.

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



## Mord i Rigets midte: fysiske steder, to ad gangen
- [x] Runde 1 (15. okt. 2026): betjentstuen med buet egetræsskranke, arbejdsplads og nøgleskab; Samtaleværelset med grønne vægge, mørke paneler, blå stole, runde borde, tæppe, høje vinduer, vaser og lysekrone. Åbne døre og sammenhængende gang fra det eksisterende interiør. Referencer og usikkerheder i dev/INTERIOR.md. Gang gennem døre, gulvhøjder, møbelkollision, hjælp, mobiljoystick og udgang kontrolleret i Chromium på computer og telefonstørrelse uden JavaScript-fejl.
- [x] Runde 2 (15. okt. 2026): to indvendige trappeløb med repos, træbalustrader og gallerier; hvælvinger, messingkroner, nicher, kamin med ur og forbedrede siddegrupper. Samtaleværelset har to åbne døre midt i Vandrehallen. Visuelt gennemsete fotoreferencer og fortsat anslået plantegning dokumenteret i dev/INTERIOR.md. Trappe op/ned, repos, galleri, begge døre, betjentstue, udgang og mobiljoystick kontrolleret uden JavaScript-fejl.
- [x] Runde 3 (15. okt. 2026): Kompaspartiets gang, to kontorer, sekretariat med kopimaskine og U-bord i mødelokale. Snapstinget i indgangens niveau med spiseborde, buffet, kaffeområde, lyse søjler og to gulvniveauer. Åbne døre, skilte og gangbare forbindelser. Billedreferencer og anslåede placeringer dokumenteret i dev/INTERIOR.md. Alle rumdøre, forbindelser fra indgangen, restaurantens trin, mobiljoystick, kollisioner og udgang kontrolleret på computer og telefonstørrelse uden JavaScript-fejl.
- [x] Runde 4 (16. okt. 2026): Finansministeriets facade med murværk, hvide vinduer, skifertag, frontispice og åben indgang; foyer, garderobe, midtergang og forhandlingsrum. Det fiktive Reformministerium med foyer, gang, departementschefens kontor, printerområde og gangbar sidedør. Startvalg til begge indgange. Billedreferencer og anslået plan dokumenteret i dev/INTERIOR.md.
- [x] Runde 5 (16. okt. 2026): to kajer med gangbare stentrapper, håndlister, afsatser over vandet, fortøjningsringe, belægning og skilte. Afrundede stenpiller og jernstænger ved Slotspladsen. Grund, kajmur og vej-/fortovsflader er skåret fri, så trapperne kan bruges under gadeniveau. Begge kajer kan vælges som startsted. Den eksisterende båds kollision og landgang tager hensyn til afsatserne. Billedreferencer og tilpasninger dokumenteret i dev/INTERIOR.md.
- [x] Runde 6 (16. okt. 2026): Bibliotekshaven med grusstier, blomsterbede, bænke, fri passage rundt om den siddende Kierkegaard-statue og forbedret søjle/skål på springvandet. Åben indgang fra Ridebanen til et staldinteriør med marmorsøjler, hvælv, træskillerum, krybber og fire hvide heste. Startvalg til haven og staldindgangen. Billedreferencer og anslåede forbindelser dokumenteret i dev/INTERIOR.md.
- [x] Runde 7 (16. okt. 2026): elevatorhal ved Kongeporten, restaurant med højt murstens-/betonrum, stort vindue, borde og gangbar sidetrappe. Etagevalg forbinder hal, restaurant ved 34 m og Udsigten ved 44 m med den eksisterende elevatorovergang. Udsigten har kikkert, supplerende glasafskærmning, orienteringstavle og tydelig adgang tilbage. Startvalg ved Tårnet. Billedreferencer og anslåede forbindelser dokumenteret i dev/INTERIOR.md.
- [x] Runde 8 (16. okt. 2026): åben forbindelse fra Vandrehallen til Landstingssalen med hvide vægge, høje buede vinduer, kassetteloft, gyldne pendler, buede stolerækker, talerstol og syv frontpladser. Slotspladsens midlertidige presseområde med to tv-vogne, tre kameraer, arbejdslys og bord. Startvalg til begge steder. Referencer, forenklinger og kontrol dokumenteret i dev/INTERIOR.md.

De otte runder med nødvendige fysiske steder er gennemført. Runde 9 er efterfølgende godkendt og gennemført: Folketingssalen og Statsministeriets indgang. Historie og nye spilfunktioner venter fortsat.

Kun fysiske steder i denne fase. Historie, personer, spor og nye spilfunktioner venter.

- [x] Mobilrettelse (15. okt. 2026): rettet fortegnet på joystickets sidelæns bevægelse. Venstre/højre var spejlet i forhold til kameraets faktiske højreakse, både ude og inde. Kontrolleret med faktiske touch-events mod renderkameraets højreakse: venstre og højre ved fire kameravinkler udendørs og indendørs, 16 beståede kontroller uden JavaScript-fejl.

- [x] Automatisk mobilkamera (15. okt. 2026): beholdt joystick, roligt kamerafølge under gang, straks-stop ved slip og valgfrit manuelt kig. Fastholdt gangretning under samme berøring for at undgå spiral. Kontrolleret ude og inde med faktiske touch-events: begrænset drejehastighed, følge og stabil retning ved lang berøring, nul bevægelse og kamerapanorering efter slip, baglæns gang uden kameravending og manuel kamerastyring med prioritet. Ingen JavaScript-fejl.

- [x] Runde 9 (16. okt. 2026): åben adgang fra Vandrehallen til Folketingssalen med grønne sæder, buede egetræsborde, formandsplads, talerstol, gallerier og tre høje vinduer. Statsministeriets indgang i Prins Jørgens Gård med lys stenramme, skilt, nummer 11, åbne fyldningsdøre, lamper, lave trin og en forenklet forhal. Startvalg til begge steder. Referencer og usikkerheder i dev/INTERIOR.md.

- [x] Runde 10 (16. okt. 2026): Højesterets søjleportal med fire søjler, trekantgavl, buet overvindue, lanternestolper, brede lave trin, åbne døre og et forenklet vindfang. Fire udendørs vejvisere og to indvendige vægskilte med en mobiltilpasset læsevisning. Portalens mål, Statsministeriets justerede placering og skiltningens spiltilpasninger er dokumenteret i dev/INTERIOR.md.

- [x] Runde 11 (16. okt. 2026): 22 ruter gennem de åbne rum er kontrolleret i begge retninger med bevægelseskoden. Seks ind-/udgange og Tårnets etageskift er kontrolleret. Større oversigtskort med 16 navngivne steder, valg via nummer eller liste, oplysninger om adgang og rumforbindelser samt markering af bygningens indgang, når man er indenfor. Kortet er tilgængeligt på mobil, computer, indenfor og på Udsigten. Dokumentation i dev/INTERIOR.md.

De planlagte fysiske steder foreligger nu i en første, gennemgået version. Næste fase kræver Michels valg, fordi historie og nye spilfunktioner hidtil har ventet: forslag om valg mellem børne-/voksenudgaven og en voksen hovedperson som de næste to opgaver.

## Mord i Rigets midte: gåden
Planen står i `dev/MORDGAADE.md`. Ét trin ad gangen efter dens rækkefølge, og vent på, at Michel skriver "fortsæt".
- [x] Børneudgaven fjernet (16. okt. 2026, første del af trin 2)
  - Den sidste børneudgave er gemt i grenen `boerneudgave` (git-tags kan ikke pushes herfra).
  - Fjernet: kronejagten med tæller, gule lys, fyrværkeri og krone på hovedet; stjerneopgaver og spørgsmål; oplæsning (Læs op); løbehjulet; knapperne Klap hesten, Giv ænderne brød, Vink til båden, Vink til statsministeren, Vink til svanerne, Kig efter havmanden og Skyd med konfetti; brødet til ænderne; "Hej!" fra de gående; stjerner og navn over hovedet første gang man kommer til et sted. Filen er 33 KB mindre.
  - Bevaret som byliv: heste, ænder, svaner, duer, havmanden, kanoner, både, trafik, ministerbilerne og springvandet ("Start springvandet" findes stadig).
  - Pigen er blevet til Ida (`buildKid`): en ung kvinde på ca. 1,7 m i gul regnjakke med grøn rygsæk, hestehale og mørke bukser. I båden sidder hun 0,2 m lavere (`kid.g.position.y = -0.2`).
  - Ny startskærm: "Mord i Rigets midte" med en kort tekst om, at gåden er under opbygning. Genvejene til startstederne vises kun med `?test` i adressen (`TESTMODE`).
  - Stedteksterne (`POIS`) er skrevet om til voksne. Beskeder i en voksen tone. Gemmes under en ny nøgle (`mordIRigetsMidte`) med kun dag/aften, lyd og minikort.
  - `setPoiH` er bevaret fra opgavekoden, så handlingsknappen stadig står over stedkortet. `#guide` er bevaret skjult til et senere "Næste spor".
  - Kontrolleret i Chromium på computer og telefonstørrelse: ingen JavaScript-fejl, ingen børneknapper ved Ridebanen, Tøjhusmuseet, Højbro, Gammel Strand og svanerne, gang ude og inde (`__cb.step`), båden, ministerbilerne, hjælpekortet og kortet. Bemærk: testbrowseren kører kun 1-2 billeder i sekundet, så gang skal testes med `__cb.step`, ikke med tastetryk i realtid.
- [x] Trin 1, manuskriptet (17. okt. 2026)
  - Hele gåden står som data i `mordgaade.js` ved siden af `index.html`: 15 personer med emner og replikker, 22 spor, 15 ting, 45 ting at undersøge, steder med låse, faste begivenheder, hint, tidslinje, afsløringen og efterskriften. 1942-laget kan slås til og fra (`lag1942`).
  - `node dev/tjek-mordgaade.js` tjekker logikken: alle betingelser kan nås, ingen fastlåsning i 2000 tilfældige gennemspilninger med og uden 1942, hint dækker alle trin, ingen tankestreg, og alle "bygget"-steder findes i spillet. Den skriver hele manuskriptet ud som `dev/MANUSKRIPT.md`. Kør den efter hver rettelse i `mordgaade.js`.
  - Planens nye valg er fulgt: pressekort 17, Pernille i radioen kl. 01.45-02.05, bådlauget, regn kl. 22-02.30, termokanden ved fortøjningspælen, notesbogen under sofaen, Jonas' telefon i mødelokalet, fortalelsen om 4.000 og hesten Vega.
  - Huller, som tjekket fandt, er rettet i både manuskript og plan: mailen sender sig selv kl. 02.05, Kaspers kort går ud kl. 02.22, Valdorf lægger pressekortet tilbage, springvandet er slukket til kl. 9, tårnet åbner kl. 7, kilen i sidedøren og bemærkningen på gangen kl. 21.45. Ny bifigur: hoffourer Viggo Aagaard.
  - Skal bygges ud over det eksisterende: sadelkammeret, Riddersalen, fortøjningspælen i kanalen og de to 1942-steder.
- [x] Resten af trin 2: ramme (17. okt. 2026)
  - Spillet henter historien fra `mordgaade.js` (`import { MANUS }`). Blokken `GAADE` i `index.html` holder hele spillerens tilstand i ét objekt: akt, klokkeslæt, spor, ting, ting givet væk, døre låst op, personer mødt og renset, flag, hint, forkerte svar og position. Betingelser og virkninger bruger samme lille sprog som manuskriptet (`GAADE.ok`, `GAADE.giv`).
  - Uret øverst starter kl. 06.00 og går 1 minut for hver 80 m, Ida går (`GAADE.tid` bruges senere til samtaler). Det står stille 5 minutter før aktens slut, til den næste akt åbner. En ny akt åbner af sig selv, når dens krav er opfyldt, og viser et kort med navn og klokkeslæt.
  - Notesbogen (N eller knappen) har fanerne Spor, Personer og Tidslinje og fylder sig selv ud fra tilstanden. Rygsækken (R eller knappen) viser tingene som små tegninger med navn og tekst. Elefantordenen er mærket "Skal tilbage". At give og bruge ting kommer med samtalerne.
  - Gemning under nøglen `mordIRigetsMidte.spil`: ved hvert nyt spor, hver ny ting og hvert aktskift, hvert 20. sekund og når siden lukkes. Fortsæt sætter Ida, hvor hun sidst gik udenfor (uden for døren, hvis hun var inde). Indstillinger (lyd, tekststørrelse, minikort) gemmes for sig under `mordIRigetsMidte`.
  - Startskærm: Nyt spil eller Fortsæt med klokkeslæt og akt, Nyt spil (spørger én gang til) og Indstillinger. Nyt spil starter på Marmorbroen kl. 06.00 med en kort tekst fra manuskriptets start. Med `?test` springes teksten over.
  - Dag/aften-knappen og N for aften er fjernet. Lyset er dag, indtil uret styrer lyset i det sidste trin.
  - Testgenveje i konsollen: `__cb.gaade.giv(['spor:3','+ting:briller'])`, `.akt(3)`, `.saetKl('08.15')`, `.moed('bente')`, `.alt()`, `.nulstil()`, `.paused`.
  - Kontrolleret i Chromium på computer (1280 x 800) og telefon (390 x 844 med touch) uden JavaScript-fejl: start, indstillinger, Nyt spil, uret under gang, notesbog og rygsæk tomme og fyldte, skift mellem dem med N og R, aktkort, gang efter lukning, Fortsæt efter genindlæsning og knapperne inde i Folketinget.
- [x] Trin 3: låse og ting (17. okt. 2026)
  - Blokken `LAAS` i `index.html` siger, hvor manuskriptets låste steder og ting at undersøge er i spillet. Tekster, betingelser og virkninger står i `mordgaade.js`.
  - Låste døre: Samtaleværelset (nøgle), Kompaspartiets sekretariat (kortlæser, Kaspers gamle kort), Finansministeriet efter foyeren (vagten vil se gæstekortet) og departementschefens kontor i Reformministeriet (kodelås, 1849). Ida kan ikke gå ind i et låst rum, men altid ud af det. Ved døren viser handlingsknappen "Døren er låst" eller, med den rigtige ting, fx "Lås op med nøglen". Tingen kan også bruges fra rygsækken (knappen Brug ... ved døren). En åbnet dør forbliver åben (`G.laast`).
  - Kodelåsen har et tastatur med fire cifre og kan bruges med mus, berøring og tastatur.
  - Manuskriptets laas har fået felterne knap, aabnet og forkert (teksten på knappen, når døren går op, og ved forkert kode).
  - Historiens egne lukketider (aaben: Folketinget først efter Bente, Snapstinget og Tårnet kl. 7, Reformministeriet kl. 8.30) er bygget, men slået fra (`HISTORIE_LAASE = false`), indtil personerne og akterne kan nås i trin 4.
  - Ting at undersøge: et punkt i verden viser manuskriptets navn på handlingsknappen, når betingelserne er opfyldt. Teksten vises på et kort med personernes navne, og virkningen (spor, ting, flag) sker, når kortet lukkes. Uret går 2 minutter.
  - Ting at samle op, med små modeller, der forsvinder, når de er taget: Bentes briller på en ny bænk ved Kierkegaard-statuen, Jonas' telefon i Kompaspartiets mødelokale, 50.000-rapporten på kopimaskinen, Kaspers kort i en vandpyt ved en sidedør med kortlæser i Proviantpassagen (først efter kommissæren) og bådnøglen i sejlerjakken på kontoret (efter "Se dig om på kontoret"). Kontoret har også fået knobtavle, stumtjener med jakke og kodelås ved døren.
  - Med `?test` kan alle låse åbnes med et flueben på startkortet. Konsol: `__cb.gaade.aabnAlle()`, `__cb.laas.status('sekretariatet')`.
  - At give ting til personer kommer med samtalerne i trin 4.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: alle fire låse, kodelås med forkert og rigtig kode, Brug fra rygsækken, opsamling af telefon, bådnøgle og briller, vandpytten og at Ida ikke kan gå ind i garderoben uden gæstekort.
- [x] Trin 4: personer og samtaler (17. okt. 2026)
  - Blokken `PERSONER` i `index.html` laver personerne som figurer i samme tegnestil som Ida (`figur()` med tøj, hår og ting i hånden) og stiller dem efter manuskriptets steder pr. akt. `SPOT` siger, hvor hvert sted er i spillet. Personerne drejer sig mod Ida, når hun er tæt på. Bygget nu: Bente (i døren til Folketinget, til hun har mødt Ida, derefter i betjentstuen), kommissær Hald (Vandrehallen fra kl. 06.20), statsministeren med to livvagter (restauranten i tårnet fra akt 2) og Gry (Ridebanen i akt 1, staldene i akt 2-3). Aksel Mørkeberg sidder død i en grøn sofa ved Rigets midte i akt 1-2.
  - Samtaler: "Tal med ..." åbner et vindue med personens emner fra manuskriptet. Et emne vises, når betingelserne er opfyldt. "Giv" og "Vis" har tingens billede, og en ting, der gives væk, forsvinder fra rygsækken. Et nyt emne tager 5 minutter. Spurgte emner er markeret. Bentes "Hvad skal jeg gøre nu?" giver det første hint, der passer, og tæller hint til stjernerne.
  - Begivenheder: manuskriptets begivenheder sker én gang, når betingelserne er opfyldt (flag `beg_<id>`), og flytter uret frem til deres klokkeslæt. Åbningsscenen: Bente i døren (kl. 06.10, når Ida kommer ind i Rigsdagsgården), kommissæren (kl. 06.20, når Ida har set på Mørkeberg) og statsministeren (kl. 06.30), hvor Bente beder Ida om hjælp. Begivenhederne har fået en titel i manuskriptet.
  - `GAADE.sted` ved nu, hvor Ida står (rum indenfor, områder udenfor), så betingelser som "sted:rigsdagsgaarden" virker.
  - Folketinget er lukket, til Ida har mødt Bente (`HISTORIE_LAASE` har nu "folketinget"). De andre åbningstider slås til i trin 5.
  - "Se på Mørkeberg" (spor 1) er lagt ind allerede nu, fordi åbningsscenen bygger på det.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: Bente i døren og lukket dør, de tre begivenheder, samtale med Hald, giv brillerne til Bente og få nøglen, hint og Gry på Ridebanen.
- [x] Trin 5: akt 1 (17. okt. 2026). Akt 1 kan nu spilles fra Marmorbroen til kortet "Akt 2 · De mistænkte".
  - Nye ting at undersøge med modeller: koppen med læbestift på bordet ved Mørkebergs sofa (spor 2), notesbogen under sofaen (med mobilens lygte), grundlovene, adgangsloggens skærm, nøgleskabet og Bentes farfars radio i betjentstuen, Samtaleværelset med kafferand, våde fodspor og to stole trukket ud (spor 5), Kierkegaard-statuen, fodspor i gruset bag statuen, bassinet, papirerne ved bassinkanten (først i akt 3), den gamle fortøjningsring ved dammen og Ridebanen.
  - Undersøg-visning: "Gnid blyanten over notesbogen" åbner siden fra notesbogen. Spilleren gnider med mus eller finger, og ordene kommer frem som lyse streger i det grå (spor 6). Knappen "Gnid hele siden" gør det samme med tastatur.
  - Ting, der giver noget nyt, vises før samtaler og før ting, man allerede har set, når flere står samme sted.
  - Historiens åbningstider er slået til (`HISTORIE_LAASE = true`): Snapstinget og Tårnet åbner i akt 2, Reformministeriet i akt 3.
  - Den gamle "Se grundlovene"-besked er erstattet af manuskriptets.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: hele akt 1 fra start til akt 2 med de rigtige spor, lukket tårn og Snapstinget i akt 1 og åbent Snapstinget i akt 2.
- [x] Pænere heste (17. okt. 2026, efter ønske fra Michel)
  - Én fælles hestemodel (`buildHorse`) bruges på Ridebanen, i staldene og over staldenes døre: rundere krop med bryst og højere kryds, en nakke, der bliver smallere opad, med manke, et hoved med mule, næsebor, øjne, ører og pandelok, ben med knæ og hove og en fyldigere hale. De brune heste har en hvid blis.
  - Over staldenes døre er den øverste halvdel nu åben og mørk, og hesten læner hoved og hals ud over den nederste halvdør i stedet for at stikke hovedet gennem glasset. Hovederne drejer og nikker lidt.
- [x] Trin 6: akt 2 (17. okt. 2026). Akt 2 kan nu spilles fra kortet "Akt 2 · De mistænkte" til kortet "Akt 3 · Ud på Slotsholmen".
  - Nye personer med eget udseende: Bodil (kokkejakke, briller i panden, en kaffekande i hver hånd) ved kaffen i Snapstinget, Kasper (lyseblå skjorte, mørke rande under øjnene, et rundstykke i hånden) på en stol ved bordet nærmest døren i Snapstinget, Ditte (mørkegrå dragt, rød læbestift, en telefon i hver hånd) ved sit bord i restauranten i tårnet, Jonas (smal jakke, hvide sneakers, to telefoner) på Kompaspartiets kontor 1, Pernille (lang regnfrakke, presseskilt, termokop) ved radiovognen på Slotspladsen og Valdorf (gråt jakkesæt, gult slips, mappe, solbrun) i Vandrehallen fra kl. 07.30. Valdorf står i restauranten i akt 3.
  - En person kan sidde (`dy` i `SPOT` og `sidder` i udseendet). Den, der sidder, drejer kun hovedet mod Ida. Står to personer tæt, svarer den nærmeste.
  - Nye ting at undersøge: kopimaskinens skærm i sekretariatet (spor 10), whiteboardet på Kompaspartiets kontor, buffeten i Snapstinget og radiovognen på Slotspladsen. Rapporten, telefonen og Kaspers kort fra trin 3 og 5 bruges nu i samtalerne.
  - Nye modeller: whiteboard med »4 mandater = 100 % af magten« og et hjerte, Kaspers tallerken med rundstykker og krummer, Dittes bord med bærbar, papirer og en kop med læbestift. Den ene tv-vogn på Slotspladsen er nu en radiovogn med åbne bagdøre og et oplyst bord.
  - Rettet: stolene i restauranten vendte ryggen mod bordet, frisuren "bob" dækkede ansigtet fra siden, og statsministerens røde tørklæde var skjult inde i frakken.
  - Når en akt skifter midt i en samtale, venter kortet med den nye akt, til samtalen er lukket, så man kan nå at læse svaret.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: hele akt 2 med alle fire mistænkte, Bodil, Valdorfs ankomst, rapporten til Ditte og telefonen til Jonas, til kortet for akt 3.
- [x] Trin 7: Riddersalen (19. okt. 2026). Riddersalen findes nu og åbner i akt 3. Mogens står i Landstingssalen fra akt 2.
  - Nyt rum: Riddersalen (`buildRiddersal`, sted `riddersal` i interiøret). Indgangen "De Kongelige Repræsentationslokaler" ligger på slottets facade i Prins Jørgens Gård mellem to statuer. Den er med i oversigtskortet, i hjælpen og på listen over startsteder. Se `dev/INTERIOR.md`, runde 12.
  - I salen: 17 vævede billeder med nye, abstrakte mønstre (ikke kopier af gobelinerne), syv vinduer, malet loft, tre lysekroner og et langbord dækket til gallamiddag med 44 stole. I bordets ende står etuiet med Elefantordenen og et lyseblåt bånd. Elefanten forsvinder fra etuiet, mens Ida har lånt den.
  - Hoffoureren (mørk livré med guldknapper, hvide handsker og en tyk rød protokol under armen) står ved bordets ende. Mogens (brun cardigan, briller med tape, DJØF-nål og et navneskilt i hånden) står ved podiet i Landstingssalen, hvor der nu står navneskilte på bordene.
  - Nye ting at undersøge: gobelinerne, etuiet og navneskiltene. Manuskriptet har fået teksten "Etuiet er tomt", når Ida har ordenen.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: lukket i akt 2, åben i akt 3, hoffoureren, gobelinerne, lån ordenen, vis den til Mogens (koden og det våde hår), læg den tilbage og gå ud igen.
- [x] Trin 8: akt 3 (20. okt. 2026). Akt 3 kan nu spilles fra kortet "Akt 3 · Ud på Slotsholmen" til kortet "Akt 4 · Afsløringen".
  - Finansministeriet: presselisten på en knage i garderoben og nattens referat på det lange bord (spor 9).
  - Reformministeriet: mailen på Valdorfs skærm, sejlersko under skrivebordet, printerens log og en gummikile ved sidedøren. Kodelåsen, kontoret (spor 15) og bådnøglen i jakken (spor 22) fra trin 3 virker nu i historien.
  - Båden: bådlaugets lille røde båd (den båd, man kunne sejle i før) ligger nu ved kajen ved Reformministeriet og er låst med en hængelås, til Ida har bådnøglen. "Se på båden" (spor 12) og "Sejl med båden" ligger øverst på kajtrappen. Når hængelåsen er åben, sætter Ida sig i båden.
  - Kanalen: en gammel fortøjningspæl af træ midt i kanalen mellem de to kajer, med et rødt skær på bunden. Fra båden kan Ida kigge ned og finde termokanden (spor 14). Båden kan ikke sejle gennem pælen.
  - Tidsprøven: "Tag tid på turen til Folketinget" starter et stopur, som står under uret. Det måler vejen i båd og til fods og stopper ved døren i Rigsdagsgården. Tiden skrives i scenen. Manuskriptet har fået en replik til den, der bruger mere end 8 minutter.
  - Svend (rød hue, stativ over skulderen og kamera med langt objektiv) står på Højbro med sine nattebilleder (spor 13).
  - Springvandet i Bibliotekshaven springer først kl. 09.00 i historien (knappen "Start springvandet" er fjernet), og så flyder papirerne ud til kanten (spor 20).
  - Staldene: sadelkammeret er bygget bag staldgangens ende med sadler, hovedtøj og det gamle skab med en krone (spor 21). Den hvide hest Vega står foran døren og går et par skridt til side, når hun får en gulerod fra Bodil.
  - Udsigten: "Kig gennem kikkerten" kan bruges én gang og viser den røde båd.
  - En lås uden nøgle eller kode går op af sig selv, når betingelsen er opfyldt (fx når hesten har flyttet sig).
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: hele akt 3 med referatet, Riddersalen og Mogens, kodelåsen (forkert og rigtig kode), kontoret og jakken, båden, termokanden, tidsprøven, Svend, springvandet og papirerne, hesten og sadelskabet til kortet for akt 4.
- [x] Trin 9: afsløringen (21. okt. 2026). Gåden kan nu spilles til ende: Udsigten, pressemødet, tilståelsen, stjernerne og efterskriften.
  - Udsigten: i akt 4 kan Ida tale med Valdorf, når hun er oppe på Udsigten. Han står ved siden af hende ved rækværket, men tegnes ikke, fordi kameraet altid kigger ud over byen. Hans fortalelse giver spor 16, og så kommer sms'en om pressemødet. "Kig gennem kikkerten" kommer efter samtalen.
  - Pressemødet begynder, når Ida går ind i Landstingssalen efter sms'en. Kommissæren står bag talerstolen, statsministeren og Valdorf sidder ved bordene med navneskilte, Ditte, Kasper, Pernille og Jonas sidder på forreste række, Bente står i døren og Mogens ved siden af. Personer kan nu både stå og sidde, alt efter stedet.
  - Afsløringen er et vindue med fire spørgsmål. Ida vælger et svar (svarene står i tilfældig rækkefølge) og lægger mindst to spor frem fra notesbogen. Et forkert svar giver en protest fra den, det går ud over, og et forkert spor giver kommissærens "Det spor beviser ikke det, De siger". Tre fejl i træk, og kommissæren anholder Kasper, til Bente stopper ham, og Ida prøver igen. Lægger hun for få spor frem, får hun bare en besked. Lukker hun vinduet, venter det, til hun kommer ind i salen igen. Notesbogen kan åbnes undervejs.
  - Til sidst: tilståelsen, 1-3 stjerner efter forkerte svar og hint, efterskriften (med elefanten, hvis den ikke er lagt tilbage) og knappen "Spil igen", der starter et nyt spil. Et løst spil kan ikke fortsættes fra startskærmen.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: akt 4 fra Udsigten til pressemødet, forkerte svar og spor, tre fejl i træk, alle fire rigtige svar, stjerner, efterskrift og "Spil igen".
- [x] Trin 10: det sidste (21. okt. 2026). Mordgåden er færdig og kan spilles fra start til slut.
  - Lys: lyset følger historiens ur. Kl. 06.00 er der blåt morgenlys med tændte vinduer og gadelamper, og kl. 08.15 er det fuldt dagslys. Indenfor er lamperne altid tændt. Det gamle aftenlys er lavet om til morgengry med en lav sol i øst-sydøst.
  - Lyd: en lille klang ved nyt spor og ved nye ting, klare skridt på marmor og parket indenfor, de sidste dråber af nattens regn, der stilner af til kl. 06.15, og Holmens Kirkes klokke, der slår hele timer (7, 8, 9 og 10 slag).
  - Hjælp: efter 10 minutters spil uden noget nyt tilbyder spillet et hint fra Bente ("Vis hint" eller "Nej tak"). Under Indstillinger kan "Vis næste spor" slås til. Så står næste hint i notesbogen og på computeren i et lille skilt nederst til venstre (på telefonen som en kort besked). Hvert nyt hint tæller med i stjernerne.
  - Teksterne på startkortet og i hjælpen fortæller ikke længere, at gåden er under opbygning.
  - Kontrolleret: en hel gennemspilning i Chromium på computer og telefon fra Marmorbroen kl. 06.00 til efterskriften med tre stjerner, uden JavaScript-fejl. Undervejs blev hint-tilbuddet, "Næste spor" og lyset kl. 06.00 og 09.30 prøvet.
- [x] Trin 11 (ekstra): 1942-laget (21. okt. 2026). Rejsen til 1942 er slået til i `mordgaade.js` (`lag1942.aktiv`).
  - Radioen: fra akt 2 kan Ida dreje Bentes farfars radio i betjentstuen hen på London. Så står hun i samme rum en morgen i juni 1942. Billedet bliver gulbrunt som et gammelt foto, et skilt med "Juni 1942" står øverst (på telefonen nederst), kalenderen på væggen viser juni 1942, computeren er væk, og Bentes farfar Holger står bag skranken i uniform med kasket og overskæg. Samme radio bringer hende tilbage til 2026.
  - Slotsholmen i 1942: Den Sorte Diamant, glasbroen, presseområdet, bilerne, turbådene, turisterne og havmanden ved Højbro er væk, og personerne fra 2026 er der ikke. Tre tyske patruljer med hjelm og gevær går frem og tilbage ved rytterstatuen foran slottet, på Ridebanen og ved Marmorbroen. Når Ida kommer tæt på, kommer en advarsel. Ser en patrulje hende forfra på mindre end 9 meters afstand, siger de "Halt!", og hun er tilbage i betjentstuen i 2026. Så kan hun bare dreje radioen igen.
  - Kongen til hest: første gang Ida kommer ud på Ridebanen i 1942, rider kongen forbi på en lys hest og taber sin handske. Ida samler den op og rækker den op til ham. Til tak fortæller han, at nøglen til det gamle sadelskab hænger bag den tredje hestesko over staldporten. Kongens plads på Ridebanen er digtet.
  - Nøglen og skabet: over porten til De Kongelige Stalde hænger fem gamle hestesko. Tilbage i 2026 finder Ida nøglen bag den tredje. Uden nøglen er skabet i sadelkammeret låst, og med den finder hun tabellen (spor 21).
  - Uden laget: under Indstillinger kan "Rejsen til 1942" slås fra. Det gælder fra næste nye spil. Så er sadelskabet ikke låst, og radioen er bare en gammel radio.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: radioen begge veje, Holger, kongen, handsken, hesteskoen, skabet med og uden nøgle, en patrulje, der fanger Ida, og et spil uden laget. Den hele gennemspilning fra start til efterskrift går nu også gennem 1942.

### Nyt design af personerne
- [x] Ida (21. okt. 2026). Ida er bygget om med en blødere krop, et oval ansigt med store øjne, øjenbryn, næse, smil og røde kinder, hår med pandehår og en hestehale, der svinger, når hun går. Den gule regnfrakke har knebel-knapper, lommeklapper, snor i livet og en hætte, der ligger nede på ryggen. Hun har et rustrødt halstørklæde, jeans med opslag og hvide sneakers med rød hæl. Den grønne rygsæk har afrundede hjørner, en klap med to remme og spænder, en forlomme med lynlås, en sidelomme med en sammenfoldet paraply, et lille mærke og skulderremme med brystrem. Albuerne bøjer, når hun svinger med armene.
  - Hver del af kroppen er nu samlet i én figur med én omrids-skal, så hun tegnes med 26 dele i stedet for 50.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: hele gennemspilningen, at gå, hoppe og sidde i båden.
- [x] De andre personer i samme stil (22. okt. 2026). Alle mennesker i spillet bygges nu af den samme figur som Ida: personerne i mordgåden, statsministeren og livvagterne, turisterne og deres børn, folk i turbådene og havnebussen, cyklisterne (også barnet i ladcyklen), rytteren på Ridebanen og soldaterne i 1942.
  - Hver figur har et ansigt med øjne, lysglimt, øjenbryn, næse og mund, ører og en af seks frisurer (kort, skaldet, knold, hestehale, bob og langt hår). Kvinder har vipper og røde kinder. Kroppen er formet med skuldre, talje og hofter, og en lang frakke går ned over lårene. Armene har albuer og hænder med tommelfinger, og skoene har sål.
  - Personerne i mordgåden holder kopper, telefoner, kander og kamera i en bøjet arm. Ditte og Jonas har nu kun én telefon hver. Statsministeren har et rigtigt halstørklæde, livvagterne solbriller, og Mørkeberg har lukkede øjne. Knapper, pressekort og slips sidder på brystet, uanset hvordan kroppen er formet.
  - Statsministeren, der kommer i den sorte bil, ligner nu statsministeren i historien.
  - Folk i byen har forskellig hudfarve og hårfarve, og turisterne har en taske over skulderen. De, der tager billeder, holder telefonen op foran ansigtet med begge hænder.
  - Folk langt væk er bygget med færre hjørner. Spillet tegner lidt færre ting end før, men med cirka en femtedel flere trekanter.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: hele gennemspilningen med 1942, personerne i mordgåden, byens folk, bådene, cyklisterne og rytteren.

### Udsynet og de første bygninger
- [x] Færre skilte og pænere bygninger ved Marmorbroen (22. okt. 2026).
  - Skilte: de kort med stednavn og tekst, der kommer frem nederst på skærmen, vises nu kun ved steder med betydning for mordgåden (Ridebanen, staldene, Rigsdagsgården, Proviantpassagen, Prins Jørgens Gård, ministerierne, Tårnet, Højbro, Bibliotekshaven, presseområdet, kajerne, indgangene og båden). Seværdighederne, broerne og kanalerne har ikke længere et kort, heller ikke Marmorbroen. De står i `POI_HIDE` og kan slås til igen derfra.
  - Et kort forsvinder af sig selv efter 6 sekunder, så det ikke dækker udsynet. Det kommer først igen, når Ida har været et andet sted med et kort. Trykker man Læs mere, bliver det stående, til man går videre.
  - Marmorbroens pavilloner er bygget i hånden: lys sandsten med kvadre, hjørnepilastre, en bue på tre sider og en blind bue mod fløjen, rocaille over buerne, frise og gesims, et svungent kobbertag og en guldkrone på en sokkel. Smedejernslågerne er lukket, og en lygte brænder inde i hver pavillon. Grundplan og højder er fra OpenStreetMap, formen efter beskrivelsen i Den Store Danske (lex.dk, Marmorbroen), og resten er forenklet.
  - Fløjene omkring Ridebanen har fået en lidt varmere puds, en sokkel og en gesims. Soklen stopper ved staldportene.
  - Kontrolleret i Chromium på computer og telefon uden JavaScript-fejl: startstedet kl. 06.00, pavillonerne fra broen og fra Ridebanen, Ridebanen og kortene ved Rigsdagsgården og presseområdet.

## Gør spillet lettere at forstå (fra 23. okt. 2026)
Michel: efter samtalen med Gry vidste man ikke, hvor man skulle hen, og det var uklart, hvad man egentlig skal. Det tages i bidder, én ad gangen.
- [x] 1. Hvad Ida skal nu (23. okt. 2026)
  - Et kort øverst til venstre (`MAAL`, `#maal`) viser hele tiden målet fra det første af Bentes hint, der passer. Hvert hint i `mordgaade.js` har fået `maal` (hvad, ikke hvordan) og `hen` (et sted fra `STEDER` eller null). Et nyt hint før brillerne: spørg Bente om adgangsloggen. Målet tæller ikke som hint og kan slås fra under Indstillinger (`visMaal`, gemt som `maal`).
  - Udenfor peger en pil langs den korteste vej, man kan gå, og viser afstanden. Vejen findes i et gitter på 2,5 m over hele kortet (`fri`, bygget lidt ad gangen efter indlæsning, ca. 0,2 s i alt), og for hvert mål regnes afstanden ud fra målet (`flod`, ca. 15 ms). Pilen sigter så langt frem ad vejen, som Ida kan se, op til 35 m. Fra Gry: ud ved Marmorbroen, langs kanalen, ad Tøjhusgade og gennem porten til Rigsdagsgården (ca. 390 m). I båden og over vandet peger pilen lige derhen.
  - Indenfor står rummets navn eller "Du er her". Målet har en gul ring på minikortet og på oversigtskortet (`FX.maal.punkt`).
  - Gry fortæller nu, at der ikke er nogen vej gennem slottet, og hvordan man går til Rigsdagsgården. Efter startscenen siger en besked, at målet står øverst til venstre.
  - `dev/tjek-mordgaade.js` tjekker, at alle hint har et mål og et kendt sted.
- [x] 2. Tydeligere samtaler (24. okt. 2026)
  - Samtalevinduet (`visEmner`): emner, Ida ikke har spurgt om, står øverst. Et emne, der er kommet til, siden hun sidst så personens liste, er mærket Nyt (`G.emneSet` husker, hvad hun har set). Emner, hun har spurgt om, ligger under "Spurgt før (n)" og kan læses igen. Er der ikke flere, står der "Ida har ikke flere spørgsmål til ... lige nu."
  - Efter et svar står det nederst i svaret, hvis Ida fik et nyt spor eller en ting, og "Det skal Ida nu: ..." fra målet, hvis målet skiftede eller hun fik noget (`giv(list, stille)` giver nu en liste over det, hun fik, og viser ingen besked øverst, når samtalen er åben).
  - Manuskriptet: Gry spørges først om sadelkammeret i akt 2 (Snapstinget med gulerødderne åbner kl. 7), og om hesteskoene først når det gamle sadelskab er låst (`flag:skab_laast`). Bente siger, hvor man skal hen: Vandrehallen fra døren, betjentstuen efter statsministeren, gangen i Rigsdagsgården til Bibliotekshaven og dørene ved kaminen til Samtaleværelset.
  - Aktens kort har fået linjer om, hvem der er hvor (`hvor` i `AKTER`, akt 2 og 3). Notesbogen viser under hver person, hvor de er nu ("Er nu: Betjentstuen").
  - Et mål i vand (dammen i Bibliotekshaven, kanalen) peger nu på det nærmeste tørre sted inden for 25 m, så pilen også følger vejen dertil.
- [x] 3. Begynderhjælp (24. okt. 2026)
  - Ved nyt spil kommer kortet "Sådan opklarer du mordet" efter "Torsdag morgen": målet, tal med folk, undersøg ting, spor og ting, hvad nu og uret (`opklarTrin()`, teksten passer til computer eller telefon). En linje i en scene kan nu være `{ b, t }`: et ord med fed og en tekst.
  - Hjælp-knappen viser de samme punkter over tasterne (`#introTrin`, `visTrin`). Udenfor hedder kortet nu "Sådan opklarer du mordet".
  - Små tips første gang (`TIPS`, `FX.tip`): ved kortet med målet efter start, første gang knappen nederst kommer (forsvinder, når den bruges), første spor og første ting (i samtalevinduet, hvis det sker i en samtale) og første gang et emne har et billede (giv eller vis). Hvert tip kommer én gang og huskes med indstillingerne (`tipsSet`, gemt som `tips`). Et tip venter, til der ikke er et kort eller vindue åbent, og forsvinder efter 15 sekunder eller med OK.
  - Kortet med målet og tippet ligger nu under kort og vinduer (ingen z-index), så de ikke dækker teksten på telefonen.
- [x] 4. Ridebanen (24. okt. 2026): Michel valgte at beholde den rigtige vej. Man kommer kun ud ved Marmorbroen og går rundt ad Tøjhusgade til Rigsdagsgården (ca. 390 m fra Gry). Pilen og Gry viser vejen. Jeg har ikke fundet en port mellem Ridebanen og Rigsdagsgården i virkeligheden (Altinget nævner kun Tøjhusgade og Slotspladsen).

## Til senere
- [ ] Pænere heste. Michel synes, de er meget grimme (Ridebanen, staldene, Vega, kongens hest i 1942).
- [ ] Bygningerne rundt omkring flottere, én ad gangen. Spørg Michel om den næste, når der ikke er andre opgaver i gang.

