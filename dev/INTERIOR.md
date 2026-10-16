# Første interiør i Folketinget

15. oktober 2026. Første trin mod et spil for voksne: udforskning af interiør.

## Omfang

Ved hovedtrappen i Rigsdagsgården vises "Gå ind i Folketinget". E eller handlingsknappen åbner en separat 3D-model med en gangbar trappe og Vandrehallen. Telefon og computer bruger de eksisterende kontroller. Indendørs ses verden i øjenhøjde. Spilleren kan gå tilbage til døren eller bruge "Ud i gården". Startskærmen har en genvej til hovedtrappen.

Vandrehallens 80 meter lange akse, egetræspaneler, blomsterfrise, seks marmorsøjler, kamin og grundlovsmontrer bygger på Folketingets offentlige beskrivelser. Døre markerer Folketingssalen, Landstingssalen og Samtaleværelset. Folketingssalen og Landstingssalen er ikke bygget endnu; Samtaleværelset er tilføjet i runde 1. Frisen er en enkel, selvtegnet botanisk fortolkning, ikke en gengivelse af Rasmus Larsens kunstværk.

## Kilder

- Folketinget, Folketingets lokaler: https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/folketingets-lokaler
- Folketingets billedgalleri, Vandrehallen: https://www.ft.dk/da/billeder_fra_christiansborg/vandrehallen
- Google Arts & Culture, Tour the Danish Parliament, med materiale fra The Danish Parliament: https://artsandculture.google.com/story/FgXRqJzkjtx6wQ

## Grænser for nøjagtighed

Dette er en foreløbig fortolkning, ikke en opmålt digital kopi. Den indvendige trappes udformning, forbindelsen til hallen, bredder, etagehøjde, vinduers rytme og detaljers præcise placering er anslået. Den første trappe var ét lige løb. Runde 2 nedenfor erstatter den med to flugter i samme retning og en repos, stadig med anslåede mål og placering. Billedgalleriet kunne findes via søgning, men direkte billedvisning blev blokeret af et sikkerhedstjek. Google-rundvisningens tekst kunne læses; panoramaerne kunne ikke vises i testbrowseren. Ingen fotografier er kopieret ind i spillet.

Den faktiske forbindelse mellem hovedindgangen og Vandrehallen er fortsat ikke verificeret med en plantegning. Runde 2 bruger nu visuelt gennemsete fotos af trappe og hal. Portrætterne er endnu ikke modelleret. Voksenhistorie og gåder følger i senere trin.

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


## Runde 2: indgang, trappe og Vandrehallen

15. oktober 2026. Den indvendige trappe er ændret fra en enkelt lang stigning til to trappeløb i samme retning med en repos i 2,4 meters højde. Gulvet i Vandrehallen ligger stadig i 4,8 meters højde. Trappen har mørke trin, træhåndlister, drejede balustre og øvre gallerier. Galleriernes kanter er lukkede for gang, og højdekontrollen forhindrer, at spilleren pludselig kommer fra et lavt trappeløb op på galleriet eller falder ned fra det.

Vandrehallen har fået et hvælvet loft, tværgående hvide buer, ringformede messingkroner med lys, polstrede siddepladser i nicher, en mere detaljeret kamin med ur og en siddegruppe omkring et rundt bord. De seks marmorsøjler er bevaret og arrangeret omkring det centrale område. Sofaerne ved de øvrige borde er mere detaljerede. Der er stadig intet nyt mordgådespil, ingen figurer eller spor.

Folketingets beskrivelse angiver to døre til Samtaleværelset midt i Vandrehallen. Samtaleværelset er derfor flyttet fra den tidligere anslåede sideplacering til midten på modsatte side af trappen, med to åbne døre. Det er en forbedring af den relative placering, men ikke en verificeret gengivelse af den faktiske plantegning. Betjentstuen bliver liggende ved indgangen med adgang som før.

### Billedgrundlag

Disse tre fotos blev hentet og visuelt gennemset, kun som model for geometri og materialer:

- Kontrapunkt, eget projekt for Folketinget: https://kontrapunkt.com/work/bringing-history-into-the-future . Fotoet https://cdn.sanity.io/images/zmr0zdju/production/bd39602ed6551ba0d25d4e89723ac212ffee64e1-8000x4500.jpg viser træbalustrade, vægpaneler, blomsterfrise, marmorsøjler, hvide buer og messingkroner. Bruges som hovedreference for hallens materialer og arkitektoniske rytme.
- Trappefoto fundet via Mindtrip: https://mindtrip.ai/attraction/copenhagen-denmark/danish-parliament/at-XdOFhRQA . Billedadresse: https://d3fphkxyf5o5bm.cloudfront.net/image-resize/format%3Dwebp%2Cw%3D1200/QwRY54Li1HMwD7oNfohccYpWlVofn6EkZisyqicxLy . Fotoet viser to trappeløb i samme retning med repos, træbalustrader, gallerier og hvide buer. Det er ikke sikkert verificeret, hvilket af Vandrehallens trappeanlæg fotoet viser, eller hvordan hovedindgangen i Rigsdagsgården forbindes til det. Bruges som trappemotiv, ikke som dokumentation for en præcis rute.
- Rundt i Danmark, Vandrehallen: https://www.rundtidanmark.dk/vandrehallen-christiansborg/ . Foto https://www.rundtidanmark.dk/wp-content/uploads/2025/12/vandrehallen-christiansborg-768x512.jpg viser kamin med ur, en siddegruppe ved et rundt bord og hvælvinger. Rug og møbler i spillet er egne forenklinger.

Folketingets egen tekst: https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/folketingets-lokaler dokumenterer seks marmorsøjler, kamin, siddepladser i nicher, to døre til Samtaleværelset i midten og grundlovsmontrerne.

Supplerende fotofund, som ikke kunne hentes direkte: https://commons.wikimedia.org/wiki/File:Stairs_in_Vandrehallen,_Christiansborg_Palace,_Denmark.jpg , https://commons.wikimedia.org/wiki/File:Rigets_Midte_(54876716078).jpg og https://www.ft.dk/da/billeder_fra_christiansborg/vandrehallen/01 .

Ingen af referencefotografierne indgår i spillet som teksturer. Loftshøjde, søjlernes præcise opstilling, møbelplacering, trappebredde, antal trin, etagehøjde, gallerier og dørplacering er fortsat anslået. Den udvendige hovedtrappe er bevaret; runde 2 forbedrer den indvendige forbindelse.

### Kontrol af runde 2

Chromium ved 1280 x 800 og med touch ved 390 x 844: gang fra indgangen over første trappeløb, repos, andet trappeløb og ind i hallen; gang hele vejen ned igen; højdeforskel pr. trin højst 0,172 m. Begge døre til Samtaleværelset passeret i begge retninger. Galleriets gelænder og kaminen stopper spilleren. Betjentstuen, hjælp/fortsættelse og udgang fungerer. Mobilens joystick kan gå op ad trappen. Automatisk rutesøgning med gulvhøjdekontrol finder sammenhængende veje fra indgangen til begge døre til Samtaleværelset. Ingen JavaScript-fejl. Skærmbilleder på computer og telefon gennemset. Syntakskontrol og git diff --check bestået.


## Runde 3: Kompaspartiets område og Snapstinget

15. oktober 2026. Nye gangbare områder:

- Fra Vandrehallen mod Folketingssalen fører en åben dør til Kompaspartiets gang. Fire åbne døre fører til to kontorer med skriveborde og reoler, et sekretariat med kopimaskine og et mødelokale med U-bord og skærm. Alle ligger i spillet i Vandrehallens gulvniveau, 4,8 m.
- Til venstre ved indgangen, over for betjentstuen, fører en åben dør gennem en kort gang til Snapstinget. Spisesalen har borde, buffet, kaffemaskiner, lyse søjler med gulddetaljer, store buede vinduer, loftsfelter, mønsterparket og en ringlysekrone. To gulvniveauer forbindes med fire trin; niveauforskellen i modellen er 0,6 m. Rækværk af metal afskærmer resten af overgangen.

### Undersøgte billedreferencer

Disse fotos blev hentet og visuelt gennemset:

- Meyers' pressemeddelelse med fotos af Snapstinget: https://via.ritzau.dk/pressemeddelelse/13596315/meyers-kantiner-vinder-folketinget . Direkte rumfoto: https://via.ritzau.dk/data/images/00048/35b22ca0-6046-45da-ba66-074f8b059a43.jpg . Primær visuel reference til de lyse søjler med guldgesimser, vinduerne, loftet, ringlysekronen, træborde og stole, parket og to gulvniveauer.
- Hørning Parket, eget projekt ved Snapstinget: https://www.horningfloor.dk/christiansborg/ . Foto https://www.horningfloor.dk/wp-content/uploads/2021/01/Christinasborg_foto_2400x800px.jpg blev gennemset. Understøtter parketmønster, niveauforskel og metalrækværk. Leverandøren angiver mønsterparket, sildeben og firkantet mønster i eg.
- NB Økonomi, foto af et daværende gruppeværelse: https://www.nb-okonomi.dk/2019/06/18/df-blev-decimeret-ved-valget-og-overtager-las-gruppevaerelse/ . Direkte foto https://selvbetjening.nb-medier.dk/storage/media-library/2019/10/20190618151252269-1000-1570750989-nn2kb.jpg blev gennemset. Bruges som inspiration til lyst U-bord, mørkt tæppe og lette træstole. Kompaspartiets rum er ikke en kopi af det konkrete partiværelse. Vægbillederne er egne, enkle landskabsmotiver.

Supplerende kilder, som blev undersøgt, men hvis billedfiler ikke kunne hentes:

- Louis Poulsen, Folketingets formandskontor: https://www.louispoulsen.com/en-gb/professional/applications/projects-cases2/institutions--public-buildings/folketinget-the-chairmans-office . De fundne billedadresser gav HTTP 404.
- BASWA, Grønlandsværelset: https://baswa.dk/akustikloft-christiansborg-groenlandsvaerelset/ . Fotohentning gav HTTP 502.

### Placering og usikkerheder

Folketingets officielle beskrivelse fastslår, at Snapstinget vender ud mod Ridebanen og består af flere spiseområder og café: https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/folketingets-lokaler . Folketingets besøgsside: https://www.ft.dk/da/besoeg/planlaeg-dit-besoeg/snapstinget . God Adgang beskriver placeringen i stueetagen: https://godadgang.dk/faktaark/folketinget-snapstinget-5325/data?filter=1 .

Spillets restaurant ligger derfor i indgangens niveau, men gangens konkrete placering fra hovedindgangen, orientering i den virkelige bygning, antal trin, mål og møbelplacering er fortsat anslået. Fotoet viser ét af Snapstingets rum, ikke en fuld plantegning. Buffet og kaffemaskiner er fiktive placeringer af almindeligt kantineinventar, ikke aftegninger af en dokumenteret køkkenplan.

Kompaspartiet er opdigtet. Gang, etageplacering, kontorer og sekretariat er bygget til spillets rumlige behov. De må ikke beskrives som et bestemt eksisterende partis lokaler. Der er ingen personer, replikker, spor, logdata, puslespil eller andre mordgådefunktioner i dette trin. Kopimaskine og skærme er kun inventar. Ingen referencefotos er kopieret ind i spillet.

### Kontrol af runde 3

Kontrolleret i Chromium ved 1280 x 800 og i touchkontekst ved 390 x 844. Gang ind og ud af Kompaspartiets hoveddør og gennem alle fire rumdøre. Adgang fra indgangen til Snapstinget og gang begge veje over de fire trin mellem niveauerne. Mobilens joystick afprøvet på trinene. Kopimaskinen og gangens vægge stopper spilleren. Rutesøgning med gulvhøjdekontrol finder gangbare forbindelser fra hovedindgangen til begge kontorer, sekretariat, mødelokalets indre, buffet og øvre spiseområde samt de tidligere rum. Hjælp/fortsættelse og udgang fungerer. Ingen JavaScript-fejl. Skærmbilleder af begge nye områder på computer og telefon gennemset. Syntakskontrol og git diff --check bestået.

## Mobilkamera med automatisk følge

Joysticket er bevaret. Ved gang fremad eller til siden følger kameraet roligt gangretningen, højst 0,9 radian pr. sekund. Hver berøring fastholder en reference til kameraretningen ved berøringens start, så automatisk følge ikke skaber en spiral i gangretningen. Manuel kameratrækning på højre side har prioritet og opdaterer referencen; automatisk følge holder pause i 1,2 sekunder efter et manuelt træk. Baglæns gang vender ikke kameraet rundt. Kameraet bliver stående, når man slipper, og gangens vandrette hastighed nulstilles straks. Båd og løbehjul bevarer deres særskilte styring.

Kontrolleret med touch-events i Chromium på 390 x 844, udendørs og indendørs: kameraet følger en bevægelse til siden uden at spiralere ved fortsat berøring; højst 0,03 radian pr. simuleret trin på 1/30 sekund. Ved slip var både efterfølgende distance og kamerapanorering nul. Baglæns gang drejer ikke kameraet. Manuel kameratrækning tilsidesætter automatisk følge. Ingen JavaScript-fejl. Syntakskontrol og git diff --check bestået.

## Runde 4: Finansministeriet og Reformministeriet (16. oktober 2026)

### Finansministeriet
Den Røde Bygning har fået en særskilt model på den eksisterende OSM-grundplan: rødt murværk, stenfod, tre rækker hvide korspostvinduer, mørkt skifertag, gesimser og en rundbuet frontispice mod Børsen. Indgangen fra Slotspladsen har lys stenindfatning, skematiske putti og to permanent åbne dørfløje. Skulpturer og proportioner er forenklede.

Indenfor er en foyer, en garderobe med knager og bænk, en midtergang og et forhandlingsrum med langt træbord og fletinspirerede stole. Hvide vægge, fyldningsdøre, høje vinduer, radiatorer og mørk/lys flisegulv i foyeren bygger på billedreferencer. Planen, garderobens placering og forbindelsen til møderummet er lavet til spillet. Den er ikke en opmåling af ministeriet. Møderummets parket og det lange bords størrelse er en fortolkning. Der er ikke indsat kopier af portrætter eller andre originale kunstværker.

Visuelt gennemsete fotos, hentet 16. oktober 2026:
- Bygningsstyrelsen, Finn Christoffersen: [ministeriebygningerne i Slotsholmsgade](https://bygst.dk/udlejning/ejendomsportefoeljen/historiske-ejendomme/ministeriebygningerne-i-slotsholmsgade/). Foto: `https://bygst.dk/media/5i2bo33u/kancellibygningen_18_fuld_foto_finn_christoffersen.jpg?height=630&v=1d61312d2ce1ab0&width=1200`. Viser murværk, skifertag, vinduesrækker, hovedindgang og frontispice.
- Finansministeriet, [Økonomisk politik](https://fm.dk/arbejdsomraader/oekonomisk-politik/): `https://fm.dk/media/crdpvmzw/fm-6714.jpg`. Viser et møde ved blankt træbord, hvide vægge og hvid fyldningsdør med messinggreb. Fotoet dokumenterer ikke hele lokalets plan.
- Finansministeriet, [About us](https://en.fm.dk/about-us): `https://en.fm.dk/media/we2h4pfq/fm-6726.jpg`. Viser høje hvide vinduer, radiatorer, træmøbler med fletryg og mørkt/lyst flisegulv. Det runde bord i billedet er ikke model for det fiktive lange forhandlingsbord.
- Finansministeriets tekst om [Den Røde Bygning](https://fm.dk/ministeriet/finansministeriets-historie/den-roede-bygning/) dokumenterer indgangen fra Slotspladsen, putti, frontispicen mod Børsen og korridorsystemet.

### Reformministeriet
Reformministeriet er historiens fiktive institution ved Ved Stranden. Den eksisterende forenklede model af karréen er bevaret. Spillets indgang er flyttet mod hjørnet ved Boldhusgade og har åbne mørke fyldningsdøre og lys indfatning. Skiltet hedder nu Reformministeriet. Der er også en åben sidedør på karréens korte vestside. Denne sidedørs placering er opfundet til spillet.

Indretningen er fiktiv: foyer med siddeplads, gang, departementschefens kontor med skrivebord, reol og lille mødebord, separat printerområde med kopimaskine og papir samt en gennemgående forbindelse til sidedøren. Den gamle udvendige karrémodel er fortsat grov og gengiver ikke hjørneejendommens præcise etageantal eller opdeling i selvstændige huse.

Visuelt gennemsete fotos fra [Indenforvoldene: Admiralgade 28 / Holmens Kanal 42 / Ved Stranden 2-8 / Boldhusgade 1](https://www.indenforvoldene.dk/admiralgade-28-holmens-kanal-42-ved-stranden-2-8-boldhusgade-1), juli 2009:
- Foto `...her-Ved-Stranden-8-6.jpg`: pudset lys facade, hvide vinduer og kvaderpudset stueetage.
- Foto `...her-Ved-Stranden-8-7.jpg`: nærbillede af nr. 8 med mørk fyldningsdør, messinggreb, stenindfatning og trappetrin. Bruges som inspiration til portalens materialer, ikke som dokumentation for ministeriets indre eller præcis dørplacering i spillet.

Alle nye flader og møbler er lavet med geometri og proceduretegnede teksturer. Referencefotos er ikke indsat som spilaktiver. Man kan starte ved begge hovedindgange via valget på startskærmen, gå ind automatisk gennem dørtærsklen eller vælge handlingsknappen, og gå tilbage til den rigtige gade. Sidedøren kan bruges begge veje. Der er ingen nye personer, spor, dialoger eller historiefunktioner.

Kontrol: 10 sammenhængende ruter fundet gennem døre og omkring møbler, herunder garderobe, begge sider af forhandlingsbordet, kontor, printerområde og sidedør samt eksisterende Vandrehals-, Kompas- og Snapstingsruter. Alle tre udvendige dørtærskler og returrejser til den rigtige dør kontrolleret. Faktiske touch-events i Chromium kontrollerer gang og straks-stop; hovedindgangen er også testet ved at gå hen fra startvalget. Hjælp og sidedørens handlingsknap er kontrolleret. Skærmbilleder af interiører, begge hovedindgange samt stående og liggende telefonformat er gennemset. Ingen JavaScript-fejl under disse kontroller.

## Runde 5: de to kajer (16. oktober 2026)

### Udformning og adgang
To stentrapper er bygget langs spillets eksisterende kanalafgrænsning: ved Ved Stranden foran det fiktive Reformministerium og på den modsatte bred ved Slotspladsen. Begge har 12 trin på 15 cm til en 1,8 m lavere afsats, 60 cm over spillets vandstand. Disse mål og de præcise placeringer er valgt til spillet, ikke hentet fra en opmåling. Dokumentet kræver trapper ned til vandet, men de fundne billeder bekræfter ikke trapper på netop de to placeringer.

Kajerne har granittrin, vanger, håndlister, en lav afsats og fortøjningsring. På Slotspladssiden er der afrundede stenpiller med jernstænger efter billedreferencen. På Ved Stranden er der en enkel bænk og belægningsfelter. En lille afsats er ført ud foran hver kajmur. De øvrige stenkanter, vandfladen og bådenes ruter er bevaret. Både hoveddøren og sidedøren i Reformministeriet ligger i gåafstand fra kajen. Begge kajer kan vælges på startskærmen under "Vælg et startsted…".

### Fotos og kilder
Visuelt gennemsete referencebilleder, hentet 16. oktober 2026:
- [Indenforvoldene, Ved Stranden](https://www.indenforvoldene.dk/ved-stranden): "Ved Stranden set fra Christiansborg", april 2009. [Direkte foto](https://usercontent.one/wp/www.indenforvoldene.dk/wp-content/uploads/2015/05/Ved-Stranden-set-fra-Christiansborg-foto-fra-april-2009.jpg?media=1665154745). Oversigtsfoto med den eksisterende karré, promenaden, bænke, træer, lamper og en ubrudt kajkant. Bruges til byrummets materialer og sammenhæng, ikke som dokumentation for en trappe.
- [Go Guides / Hotels.com, Slotsholmen](https://uk.hotels.com/go/danmark/slotsholmen-kobenhavn). [Direkte foto](https://cdn.sanity.io/images/nxpteyfv/goguides/3739eefedc53b20bde390615aa7d834a2b1b3562-1600x1066.jpg). Viser Slotspladsen, slottet og Højbro fra kanalen. Grå stenblokke i kajmuren, afrundede lyse stenpiller og enkle metalstænger er brugt som model. Fotoet viser redningsstiger, ikke de to nye spiltrapper. Fotodato er ikke verificeret.
- [Københavns Kommune, Promenade langs Frederiksholms Kanal og Ved Stranden, 8. februar 2006](https://www.kk.dk/dagsordener-og-referater/Teknik-%20og%20Milj%C3%B8udvalget/m%C3%B8de-08022006/dagsorden/punkt-10). Beskriver promenade og belægningsmønstre ved Ved Stranden. [Bilag 2, skitseforslag](https://www.kk.dk/sites/default/files/agenda/44955c0a6e9a18652e771192994444090ef10e7f/10-bilag-2.pdf) findes som supplerende baggrund. Det er en historisk projektskitse, ikke dokumentation for nutidige trapper.

Et søgeresultat fra Danish Design Review viste en anden kaj end de to aktuelle områder ved billedgennemsyn og er ikke brugt som stedreference. Wikimedia-fotoet af kanalbådenes afgangssted kunne ikke hentes og er heller ikke brugt som model.

### Teknik og afgrænsning
Grundflade, kajmur, kantsten og overliggende vej-/fortovsflader er skåret fri i samme åbning. Ellers ville en usynlig eller synlig flade i gadeniveau dække trappen. Bevægelsen følger de negative gulvhøjder, og sidekanter og afsatsens forkant stopper spilleren. Vandet uden for afsatserne kan fortsat ikke betrædes. Det eksisterende mobilkamera kan følge med ned under gadeniveau. Den eksisterende båd kan lægge til og lade spilleren gå i land på de nye afsatser, men kan ikke sejle gennem dem. Båden starter fortsat ved Gammel Strand.

Referencefotos er ikke indsat som teksturer. Der er ingen termokande, særligt knob, nye personer, spor, stopur eller historiefunktioner i denne runde.

Kontrol: gang helt ned og op på begge trapper med den rigtige bevægelseskode; afsatsens forkant og sidevanger stopper spilleren. Lodrette stråler mod den renderede geometri kontrollerer 14 punkter på trin og afsatser, så hverken grundfladen eller vejbelægningen dækker åbningerne. Begge afsatser kan nås med den eksisterende båds landgangssøgning, og bådens kollisionskontrol afviser gennemsejling af afsatserne. Begge ministeriers ind- og udgang er genkontrolleret. Faktiske touch-events kontrollerer nedgang og stop midt på trappen. Computerbilleder fra begge trapper og telefonbilleder i stående og liggende format er gennemset. Ingen JavaScript-fejl under kontrollerne.

På telefon bruges kajernes fysiske skilte og det korte infokort til orientering. Der vises ingen stor, svævende velkomstetiket eller glimmer ved de nye kajer. En tidligere CSS-regel med højere specificitet holdt infokortet for langt nede; den er rettet, så kortets knapper respekterer det afsatte område til tommelfingerstyring i både stående og liggende format.

## Runde 6: Bibliotekshaven og De Kongelige Stalde (16. oktober 2026)

### Bibliotekshaven
Haven har fået et system af lyse grusstier, en sammenhængende kantsti rundt om det eksisterende bassin, blomsterbede, bænke og træer placeret fri af hovedstierne. Ved siden af bassinet står en forenklet, siddende Kierkegaard-statue på mørk sokkel: frakke, stol, bog, skrivehånd og navn. Der er en gangbar grusflade både foran, ved siden af og bag statuen. Figuren er bygget af geometri og gengiver ikke skulpturens ansigt eller detaljer nøjagtigt. Placeringer og mål er tilpasset spillets eksisterende OSM-grundplan.

Springvandets søjle har nu en smallere hals og en høj, udadskrånende skål samt mørkere bronzefarver efter billedreferencen. Det eksisterende bassin og den eksisterende springvandsfunktion er bevaret. Der er ingen nye fodspor, løse papirer, skjulte genstande eller begivenheder. Haveforløbet kan vælges på startskærmen, og de eksisterende passager fra området ved Rigsdagsgården er bevaret.

Visuelt gennemsete billeder:
- Slots- og Kulturstyrelsen, [Det Kongelige Biblioteks Have](https://slks.dk/omraader/slotte-og-ejendomme/andre-ejendomme/det-kongelige-biblioteks-have). Thomas Rahbeks [foto af haven](https://slks.dk/fileadmin/user_upload/SLKS/Biblioteksthaven_DSC_6918_Foto_Thomas_Rahbek.jpg) viser de brede grusgange, lave blomsterbede, træer og det centrale bassin. Hentet 16. oktober 2026; optagedato ikke verificeret.
- VisitCopenhagen, [Det Kongelige Biblioteks Have](https://www.visitcopenhagen.dk/koebenhavn/planlaeg-din-tur/det-kongelige-biblioteks-have-gdk642735). [Foto af bassin og springvand](https://files.guidedanmark.org/files/382/153466__MG_5033.jpg) viser stier, bedkanter og springvandets mørke søjle med udadskrånende skål og smal hals. Hentet 16. oktober 2026; optagedato ikke verificeret.
- Tripadvisor, [Søren Kierkegaard Statue i Bibliotekshaven](https://www.tripadvisor.dk/Attraction_Review-g189541-d3555469-Reviews-Soren_Kierkegaard_Statue_I_Bibliotekshaven-Copenhagen_Zealand.html). [Nærbillede](https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/e2/43/0b/photo0jpg.jpg?h=1200&s=1&w=1200) viser den siddende bronze, frakken, bogen, hånden og den mørke sokkel med navn. Hentet 16. oktober 2026; fotograf og optagedato ikke verificeret.

### Staldene
En eksisterende grøn stalddør i den sydlige fløj ved Ridebanen er brugt som indgang. Den har fået to åbne portfløje og et skilt. Porten fører ind i et kompakt staldinteriør med bred midtergang, gentagne marmorsøjler, lyse hvælv, høje vinduer, stenspiltove med mørke træskillerum og marmorkrybber. Fire statiske hvide heste står i spiltovene. Ved indgangen er en lille niche med seletøj. Den eksisterende udendørs ridebane og dens bevægelige heste er bevaret.

Interiørets længde, antal spiltove, placeringen af hestene og forbindelsen fra den valgte dør er anslået til spillet. Karetsamlingen, seletøjsmuseet og Hofteatret er ikke bygget i denne runde. Der er ingen staldvagt, samtaler, fodringsopgaver eller historiehændelser.

- [Den Kongelige Samling: De Kongelige Stalde](https://denkongeligesamling.dk/christiansborg-slot/sale-rum/de-kongelige-stalde/) beskriver marmorsøjler, marmorkrybber og den brede gang, hvor heste og vogne kan passere. Bruges som tekstlig reference. Sidens billedfiler kunne ikke hentes i det lokale billedgennemsyn.
- Visuelt gennemset: Ridehesten.com, [Den Kongelige Stald-Etat](https://www.ridehesten.com/nyheder/den-kongelige-stald-etat/38840), [foto af hvide heste i spiltovene](https://ridehesten.com/files/picture/cache/1200/1607bed6-641f-4c4e-9c83-e6c110837db0_cropped.jpg). Viser marmorerede søjler og vægpaneler, lyse vægge, stengulv, mørke træskillerum, dekorative delingsstolper og hvide heste. Hentet 16. oktober 2026; fotograf og optagedato ikke verificeret.

Alle nye overflader, figurer og møbler er lavet med geometri og proceduretegnede teksturer. Referencefotos er ikke indsat som spilaktiver.

Kontrol: fem sammenhængende udendørs ruter mellem havens startpunkt, statuefront, bagside, bassinets sider og den modsatte del af haven. Ruterne undgår vand, bygninger, statuen og bænkene. Den eksisterende bevægelseskode er brugt til at gå fra startpunktet gennem staldporten, gennem staldgangen og tilbage til den korrekte side af Ridebanen. Fri passage i tre spor langs midtergangen er kontrolleret. Faktiske touch-events kontrollerer gang og straks-stop inde i stalden; hjælpetekst og udgangsknap er også kontrolleret. Skærmbilleder af have, statue, stald og telefonformat er gennemset. Ingen JavaScript-fejl under kontrollerne.

## Runde 7: Tårnets indre og Udsigten (16. oktober 2026)

### Forbindelse gennem Tårnet
Ved Kongeporten kan man nu vælge "Gå ind i tårnet" og komme ind i en elevatorhal. Et etagevalg forbinder elevatorhallen i gadeniveau, restauranten ved 34 m og den eksisterende Udsigt ved 44 m. Etageskift bruger den eksisterende elevatorovergang med højdetæller. Etagevalget kan også bruges på Udsigten til at komme tilbage til restauranten eller elevatorhallen. Udgangen i elevatorhallen fører tilbage til Kongeporten. Tårnet kan vælges som startsted.

Elevatorhallens mål og placeringen af dør, skranke, bænk og elevator er lavet til spillet. Der er ikke fundet en verificeret plantegning af ankomsthallen. Etageskiftene er en forenkling af den virkelige adgang, hvor Folketinget beskriver elevator til niveau 2 og en trappe det sidste stykke. Spillets sidetrappe i restauranten stiger ca. 5 m til en lille repos, hvor man kan fortsætte til Udsigten gennem samme overgang. Den er ikke en fuld kopi af den virkelige trappeforbindelse.

### Restauranten
Et højt lokale med gulligt/brunt murværk, rå betonbjælker, et stort sprossevindue, mørke stole, lyse bordflader, væglamper og en gangbar betontrappe med mørke håndlister. To skematiske gipsfigurer står ved vinduet; reliefferne på væggene er abstrakte former. De er ikke præcise reproduktioner af de originale kunstværker. Bordantal, møblering, trappens placering og rummets mål er tilpasset spillet. Den virkelige restaurant har langt flere pladser.

Vinduet har et proceduretegnet motiv af tage og en fjern silhuet. Det er en illustration, ikke en præcis udsigt fra restauranten. På Udsigten vises fortsat selve spillets 3D-model af Slotsholmen med de eksisterende stednavne og kikkertzoom.

Visuelt gennemsete fotos, hentet 16. oktober 2026:
- [Storbycruise: Smørbrødene i Tårnet](https://storbycruise.no/2016/04/08/smorbrodene-i-tarnet/), 8. april 2016. [Direkte foto](https://storbycruise.no/content/uploads/2016/03/SAM_0526-1024x683.jpg). Viser gult/brunt murværk, højt betonloft, den diagonale betontrappe med mørkt gelænder, lyse vinduesnicher, dekorative modeller og restaurantmøbler. Billedet dokumenterer indretning i 2016, ikke nødvendigvis nutidens bordopstilling.
- [VisitCopenhagen: Tårnet](https://www.visitcopenhagen.com/copenhagen/planning/the-tower-christiansborg-palace-gdk917422), [direkte foto ved restaurantens store vindue](https://files.guidedanmark.org/files/382/231865_Meyers_i_Trnet_2.jpg). Viser det store rektangulære sprossevindue, murværket og to store gipsmodeller. Det er et billede fra restauranten, ikke fra den udvendige udsigtsplatform. Fotograf og optagedato ikke verificeret.

Tekstlige og supplerende referencer:
- [Folketinget: Restauranten](https://www.ft.dk/taarnet/restauranten/), [Udsigten](https://www.ft.dk/taarnet/udsigten) og [Planlæg dit besøg](https://www.ft.dk/taarnet/besoeg). Beskriver restaurantens store vindue, Udsigten ved 44 m og adgangen via elevator og trappe.
- [Troldtekt: Restaurant Tårnet](https://www.troldtekt.dk/referencer/hotel-restaurant/restaurant-taarnet/) beskriver det ca. 11 m høje rum og beton-/akustikfladerne. Fotografierne kunne ikke hentes til det lokale billedgennemsyn.
- [Glaseksperten: Tårnet, Christiansborg](https://www.glaseksperten.dk/referencer/taarnet-christiansborg/) og Folketingets offentlige billedresultater er supplerende referencer til glas ved adgang og udsigt. Disse billedfiler kunne heller ikke hentes lokalt. Udsigtens eksisterende balustrade er bevaret og suppleret med en enkel glasafskærmning og en orienteringstavle; dette er en skematisk fortolkning med anslåede mål.

### Afgrænsning
Udsigten beholder den eksisterende panoramastyring og kikkert, hvor man drejer blikket frem for at gå frit rundt på platformen. Etagevalg, højde og knapper er gjort tydelige på telefon. Indendørs bruger man den almindelige gangstyring, også op ad sidetrappen. Elevatorovergangen nulstiller input og holder spilleren stille under kørslen. Der er ingen gæster, politiske personer, morgenmøde, spor, samtaler eller nye historiehændelser.

Alle nye overflader og dekorationer er modelleret med geometri og proceduretegnede teksturer. Referencefotos er ikke indsat i spillet.

Kontrol: sammenhængende gangruter gennem elevatorhallen, rundt mellem restaurantens borde og til vindue og sidetrappe. Trappen er gået med spillets almindelige bevægelseskode til reposen ca. 5,1 m oppe. Etageskift mellem alle tre niveauer, korrekt højdetæller fra restaurant til hal, kikkertzoom, retur fra Udsigten og udgang ved Kongeporten er kontrolleret. Faktiske touch-events i telefonformat kontrollerer gang og straks-stop. Skærmbilleder af hal, restaurant, Udsigten og telefonformat er gennemset. Ingen JavaScript-fejl under kontrollerne.

## Runde 8: Landstingssalen og Slotspladsens presseområde (16. oktober 2026)

### Landstingssalen
Den tidligere lukkede dør i Vandrehallens vestlige ende står nu åben. Man går direkte gennem døren uden rumskift og kan bevæge sig mellem stolerækkerne, rundt langs væggene, op på den lave frontplatform og tilbage til hallen. Startvalget "Landstingssalen via Vandrehallen" stiller spilleren foran den åbne dør i hallen.

Rummet har hvide vægge, profilerede pilastre, gesimser, et forenklet kassetteloft, høje rundbuede sprossevinduer, gyldne pendler, mørke stole, en talerstol og en synlig bagloge med skematiske tolkebokse. Dokumentets halvcirkel er fortolket som let buede stolerækker med en bred midtergang. Syv stole med små borde står på en lav platform til den senere fortælling. De gennemsete fotos viser en anden, tættere konferenceopstilling; spillets møblering og alle mål er tilpasset fri passage og dokumentet. Ingen verificeret plantegning er brugt. Forbindelsen til Vandrehallen følger spillets eksisterende akse, ikke en opmålt plan.

Fire store farvefelter med originale, proceduretegnede blomstermotiver og ni lyse stregpaneler antyder udsmykningens skala. De gengiver ikke Erik A. Frandsens konkrete værker. Den virkelige udsmykning er beskrevet af Folketinget. Logen er kun synlig og har ikke en gangbar adgang.

Visuelt gennemsete referencer:
- [Arkitekt Johnny Gere: Landstingssalen](https://gereark.dk/portfolio-items/landstingssalen/), hentet 16. oktober 2026. [Oversigt](https://gereark.dk/wp-content/uploads/11-12.jpg) viser hvide vægge, buede vinduer, kassetteloft, gyldne lamper og møblering. [Detaljer](https://gereark.dk/wp-content/uploads/15-3.jpg) viser mørke stole på metalben, den lave platform, paneler og den modsatte loge. [Tolkebokse](https://gereark.dk/wp-content/uploads/13-5.jpg) viser mørke sæder bag en glasafskærmning. Siden beskriver renovering og integrerede tolkebokse. Siden har et tidsstempel fra maj 2023; de enkelte fotos' optagedatoer og fotograf er ikke verificeret.
- [Folketingets lokaler](https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/folketingets-lokaler) er tekstlig reference til salens hvide barokpræg, de fire store malerier og ni kultegninger samt forbindelsen gennem Vandrehallen. [Folketingets billedgalleri](https://www.ft.dk/da/billeder_fra_christiansborg/landstingssalen/01), fotograf David Kahr, er fundet som supplerende billedkilde. Det er arkitektens fotos ovenfor, der er gennemset lokalt.

### Presseområdet
En midlertidig opstilling på den eksisterende Slotsplads: to tv-vogne med paraboler, tre kameraer på stativer, to arbejdslys, et bord med computer og mikrofon, kabeltromler og PRESSE-skilte. Kameraer og lys har kollision; vognene har drejede kollisionsflader. Kablerne ligger fladt i belægningen. Der er fri passage gennem midten og rundt om vognene. Startvalget "Slotspladsens presseområde" fører til den åbne side af opstillingen. Der er ikke indsat journalister, politiske personer, radioindslag eller nye handlinger.

Placering, antal og udformning af udstyr er lavet til historien. Der er ikke fundet dokumentation for et fast presseområde på netop denne del af Slotspladsen. Opstillingen er ikke en kopi af en faktisk permanent installation. Vogne og skilte har neutrale betegnelser.

Visuelt gennemsete referencer:
- [AV CENTER: udlejning til valg og politiske arrangementer](https://www.avcenter.dk/udlejning/av-udlejning-til-valg-valgmoder-og-politiske-arrangementer/), [foto](https://www.avcenter.dk/media/zmkjdrvc/folketinget-med-avcenter-lastbil.jpg?width=1000), hentet 16. oktober 2026. Viser en stor arrangements-/AV-lastbil og lyse varevogne foran Christiansborg. Det er en reference til køretøjer og stedets skala, ikke dokumentation for sendevogne eller et fast presseområde. Fotograf og optagedato ikke verificeret.
- [Rasmus Flindt Pedersen: Covering the opening of the Danish Parliament](https://www.flindtpedersen.com/blog/2013/9/30/covering-the-opening-of-the-danish-parliament), september 2013, [foto](https://images.squarespace-cdn.com/content/v1/51aded31e4b0481a941e5672/1380708493672-QUDGV2B1J5DVFQ7UHLXR/_RFP5427%2Bcopy.JPG). Viser et professionelt tv-kamera, reportermikrofon og kabel ved Folketingets trappe. Fotoet er fra Rigsdagsgården, ikke fra Slotspladsen; det bruges alene som model for kamera og udstyr.
- [Folketinget: Slotspladsen](https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/slotspladsen) er supplerende reference til pladsen og dens omgivelser.

Alle nye genstande og flader er geometri eller proceduretegnede teksturer. Referencefotos er ikke indsat som spilaktiver. Kun fysiske steder er tilføjet i denne runde.

Kontrol: dørpassagen fra Vandrehallen er gået med den almindelige bevægelseskode til den lave platform. Fem sammenhængende ruter kontrollerer midtergang, begge sider af stolerækkerne, platformen og hele vejen tilbage til Folketingets udgang. Faktiske touch-events kontrollerer gang og straks-stop i salen og på Slotspladsen. Fri midterpassage gennem presseområdet og vognkollision er kontrolleret. Skærmbilleder af begge steder i stort format og telefonformat samt presseområdet i aftentilstand er gennemset. Ingen JavaScript-fejl under kontrollerne.

## Runde 9: Folketingssalen og Statsministeriets indgang (16. oktober 2026)

### Folketingssalen
Døren i Vandrehallens østlige ende står nu åben. Salen ligger i samme sammenhængende interiør som hallen og Landstingssalen. Startvalget "Folketingssalen via Vandrehallen" stiller spilleren foran døren.

Salen har grønt tæppe, grønne polstrede egetræsstole, seks buede rækker af skriveborde med mikrofoner, en afrundet egetræsfront ved formandspladsen, en lavere talerstol, skærme, Dannebrog og tre høje buede vinduer. Trægallerier, balustrader, hvide pilastre, skematiske gipsfigurer, loftsfelter og gyldne pendler antyder det høje rum. To originale, proceduretegnede landskaber ved indgangen angiver de store maleriers placering uden at kopiere Olaf Rudes værker.

De faktiske møbler og kunstværker er langt mere detaljerede. Spillet har færre sæder, bredere gangarealer og et fælles gulvniveau under rækkerne. Frontplatformen er kun ca. 15 cm høj. Gallerierne er synlige, men kan ikke betrædes. Højder, rummets rektangulære afgrænsning og forbindelsen til hallen er anslået. Der er ikke brugt en opmålt plantegning. Det er en genkendelig fortolkning til fri gang på mobil, ikke en pladsplan med alle Folketingets sæder.

Visuelt gennemsete referencer, hentet 16. oktober 2026:
- [Okholm Lighting: Folketinget, Christiansborg, København](https://www.okholm-lighting.dk/projekter/restaurering/folketinget-christiansborg-koebenhavn), [panoramafoto](https://www.okholm-lighting.dk/app/webroot/_resized/uploads/folketingssalen/skaermbillede-2025-01-21-kl--18-08-57-c8b34c4937d73f1458f2abaecc1c53c4.png). Viser frontens tre vinduer, sidegallerier, træbalustrader, hvide figurer og pendler. En supplerende detalje fra siden viser lampens konstruktion. Filnavnenes datoer er ikke behandlet som verificerede optagedatoer; fotograf ikke verificeret.
- [Lex: Anny Berntsen](https://lex.dk/Anny_Berntsen), [foto af formandsplads og talerstol](https://media.lex.dk/media/181297/standard_Anny_Berntsen_Folketingets_talerstol.jpg). Bruges til den afrundede egetræsfront, formandsstolen, mikrofoner og den lavere talerstol. Fotograf og optagedato ikke verificeret.
- [The Danish Club: Kunstomvisning i Folketinget](https://danishclub.dk/en/p/article/kunstomvisning-i-folketinget-og-middag-i-snapstinget), [foto](https://danishclub.dk/images/6676/lg.jpg). Viser buede bordrækker, grønne sæder, egetræspaneler, malerier ved indgangen og gallerier. Fotograf og optagedato ikke verificeret.
- [Folketinget: Om Folketingssalen](https://www.ft.dk/folketingssalen/om-folketingssalen) er tekstlig reference til egetræsmøbler, kunst, figurer, flag og loger. Folketingets officielle foto set fra de centrale tilhørerpladser blev fundet, men billedfilen gav HTTP 403 ved lokal hentning og er ikke brugt som lokalt gennemset reference.

### Statsministeriets indgang
Indgangen fra Prins Jørgens Gård har en lys, retvinklet stenramme, skiltet STATSMINISTERIET, nummer 11, to mørke fyldningsdøre, to grønlige væglamper, lave stentrin og håndlister. Dørbladene står åbne i spillet. Gang hen over trinene eller handlingsknappen fører til en lille forhal. Udgangen vender tilbage til samme indgang. Startstedet kan vælges direkte.

Den officielle adresse og gårdens side er verificeret. Placeringen langs spillets forenklede facade er anslået ud fra ministeriets kort, ved den vestlige del af palæfløjen mod Prins Jørgens Gård. Facadevinduer, der ellers ville overlappe dørens stenramme, er fjernet i stueetagen. Trinantal og mål er tilpasset spillet. Forhallen med en bænk er en spiltilpasning uden dokumenteret indretning. Ingen kontorer, sikkerhedsinstallationer eller interne adgangsveje er rekonstrueret.

Visuelt gennemsete referencer:
- [Statsministeriets engelske hjemmeside](https://english.stm.dk/the-prime-ministers-office/), [officielt foto af indgangen](https://english.stm.dk/media/o2jmlekj/statsministeriet-front.jpg), hentet 16. oktober 2026. Viser stenramme, skilt, nummer 11, lukkede mørke fyldningsdøre, parrede lamper og håndlister. Spillets åbne døre er en tilpasning til udforskning. Fotograf og optagedato ikke verificeret.
- [Statsministeriet: Kontakt](https://stm.dk/statsministeriet/kontakt/), [kort over indgangen](https://stm.dk/media/tmihwj5r/kontakt-kort1.gif). Bekræfter adressen Prins Jørgens Gård 11 og angiver indgangen med en cirkel. Kortet er skematisk, ikke en opmåling.

Alle nye møbler og flader er geometri eller proceduretegnede teksturer. Referencefotos er ikke indsat som spilaktiver. Der er ingen nye personer, historier, spor eller samtaler.

Kontrol: almindelig gang gennem den nye saldør og videre ad midtergangen; seks sammenhængende ruter langs begge sider, til frontplatformen, til Landstingssalen og tilbage til Folketingets udgang. To ruter i Statsministeriets forhal er kontrolleret. Faktiske touch-events i telefonformat kontrollerer gang og straks-stop i Folketingssalen. Indgang over stentrinene og retur til samme side af Prins Jørgens Gård er kontrolleret med bevægelseskoden. Stort format og telefonformat samt den lille forhal er gennemset på skærmbilleder. Facaden er kontrolleret igen efter fjernelse af overlappende stuevinduer. Ingen JavaScript-fejl under kontrollerne. Modulets syntaks og git diff --check er også kontrolleret.

## Runde 10: Højesterets indgang og vejvisere (16. oktober 2026)

### Højesterets indgang
Den tidligere klods ved Højesterets portal er erstattet med en lys søjleportal: fire store søjler med forenklede kapitæler, bjælkeværk, trekantgavl, buet overvindue med radiære sprosser, to lanternestolper, brede lave stentrin og åbne mørke fyldningsdøre. Skiltet HØJESTERET og nummer 13 gør indgangen tydelig. Søjlerne har kollision; midterpassagen og trappen er gangbare. Startvalget Højesterets indgang stiller spilleren foran trappen. Tærsklen eller handlingsknappen fører ind i et lille vindfang. Udgangen stiller spilleren foran hele trappen, så man ikke bliver fanget mellem trinfladernes kollisioner.

Portalens placering følger den tilsvarende mindre bygningsdel i spillets OSM-model, i den vestlige ende af Prins Jørgens Gård. Proportioner, afstande, trinhøjder og detaljer er tilpasset spillet, ikke opmålt på stedet. Vindfanget med bænke er en enkel spiltilpasning uden verificeret indretning. Der er ikke bygget retssale eller interne adgangsveje. Statsministeriets anslåede indgang er rykket lidt langs den samme gårdfacade for at give fri afstand til den nye søjleportal. Dens vinduer er tilpasset den nye placering. Flytningen er en korrektion af den forenklede model, ikke en ny påstand om den præcise placering i virkeligheden.

Visuelt gennemsete fotos, hentet 16. oktober 2026:
- [Nyhedsartikel med Ritzau-foto af Højesteret](https://ni.dk/ni-news/id/664ce5e2-fae5-4c99-ad34-dc5467e6caa0/Rigsadvokaten-vil-have-frifindelse-for-dobbeltdrab-i-H%C3%B8jesteret), [direkte foto](https://picture.ritzau.dk/ritzau/robpic/20260601095605860_1000.jpg). Viser fire søjler, kapitæler, trekantgavl, buet overvindue, mørke fyldningsdøre og parrede lanternestolper. Billedfilens dato er ikke behandlet som verificeret optagedato; fotograf ikke verificeret.
- [Sermitsiaqs artikel](https://www.sermitsiaq.ag/samfund/voldtaegtssag-fra-nuuk-kommer-for-hojesteret/2284059), [direkte detaljefoto](https://image.sermitsiaq.ag/2284068.jpg?width=1000&height=683). Bruges til dørens felter, overvindue, skilt og nummer. Fotograf og optagedato ikke verificeret.
- [Højesterets officielle besøgsside](https://domstoldk.euwest01.umbraco.io/hoejesteret/besoeg-1/) er tekstlig reference til adressen Prins Jørgens Gård 13. [God Adgang: Højesteret](https://godadgang.dk/faktaark/hoejesteret-6876) er supplerende tekstlig reference til hovedindgangen og den separate adgang til venstre. Spillets portal efterligner hovedindgangen; den separate adgang er ikke bygget i denne runde.
- Wikimedia Commons' oversigtsfoto af gården og fotoet Højesteret.jpg blev fundet i søgningen, men gav HTTP 403 ved lokal hentning. De er ikke angivet som lokalt gennemsete referencer.

### Vejvisere i spillet
Fire nye fritstående vejvisere står ved Slotspladsen, Prins Jørgens Gård, Rigsdagsgården og Ridebanen. To vægskilte står indenfor ved Folketingets indgang og i Vandrehallen. Skiltene har korte stednavne og pile på en mørkegrøn bund med lys ramme. Udendørsskiltene kan læses fra begge sider; pilene beregnes særskilt for hver side. Stolperne og skiltets tavle har kollision og står uden for de centrale passager. De indvendige skilte er vægmonterede.

Når man står tæt på et skilt, kan man vælge Læs vejviser. Et vindue med stor tekst viser korte anvisninger til portene, trapperne og de åbne døre. Spillet holder spilleren stille, mens vinduet er åbent. Tilbage til spillet eller Escape lukker vinduet; berøring og taster nulstilles, så man ikke fortsætter utilsigtet. Vinduet tilpasser sig telefonformat og kan rulles ved lav skærmhøjde.

Pilene angiver den næste passage eller retning i spillets model. Henvisningerne mellem Slotspladsen og Rigsdagsgården bruger de faktiske midtpunkter af spillets portudskæringer. Der vises ikke påståede gåafstande eller en fugleflugtsrute gennem bygninger. Henvisningen fra Ridebanen til Tøjhusgade går i spillets model mod Marmorbroen og rundt om staldenes sydside på slotsiden af kanalen; den peger ikke gennem palæets mur. Teksterne beskriver bl.a. turen gennem Kirkeløngangsbygningen, passagerne til Rigsdagsgården og forbindelserne mellem Vandrehallens rum.

Vejvisernes design, placering og ordlyd er lavet til spillet. De er ikke kopier af faktisk skiltning på Christiansborg. Fotoopslagene i denne runde vedrører Højesterets portal. Alle nye aktiver er geometri og proceduretegnede teksturer; referencefotos er ikke indsat i spillet. Der er ingen nye personer, spor, samtaler eller historiehændelser.

Kontrol: Højesterets trappe og indgang er gået med den almindelige bevægelseskode; vindfang og retur foran trappen er kontrolleret. Statsministeriets flyttede indgang og retur er kontrolleret igen. Fem indvendige ruter forbinder vindfang, indgang, vejviser, begge sale og Kompaspartiets dør. Sammenhængende udendørs ruter gennem Kirkeløngangsbygningen og begge passager til Rigsdagsgården er kontrolleret mod spillets kollisioner. Ruten rundt om staldenes sydside er også kontrolleret med mellempositioner og begrænset højdeforskel mellem trinene i rutesøgningen. Fire udendørs skiltes omgivelser er kontrolleret for vand og bygninger. Læsevisningen er åbnet med handlingsknappen ude og inde på telefonstørrelse; pause, tekst, luk-knap, Escape og genoptaget touchgang med straks-stop er kontrolleret. Skærmbilleder af portalen på afstand og tæt på, telefonformat, vindfang samt skiltenes læsevisning er gennemset. Ingen JavaScript-fejl under kontrollerne.
