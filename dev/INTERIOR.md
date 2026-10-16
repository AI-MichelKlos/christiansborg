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
