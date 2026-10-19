# Mord i Rigets midte: manuskript

2026-10-17 · Michel

Udarbejdet med AI (Claude) og med begrænset mennesketjek.

Denne fil laves automatisk af `dev/tjek-mordgaade.js` ud fra `mordgaade.js`. Ret teksterne i `mordgaade.js`, ikke her. Planen for gåden står i `dev/MORDGAADE.md`.

## Tjek af logikken

- Uden 1942-laget: 2000 af 2000 tilfældige gennemspilninger nåede frem til afsløringen, 0 gik i stå. Den korteste brugte 63 skridt.
- Med 1942-laget: 2000 af 2000 tilfældige gennemspilninger nåede frem til afsløringen, 0 gik i stå. Den korteste brugte 75 skridt.
- Fejl: ingen. Advarsler: ingen.
- Steder, der skal bygges: Sadelkammeret (sadelkammeret), Kanalen ved den gamle fortøjningspæl (kanalen), Betjentstuen, juni 1942 (betjentstuen_1942), Ridebanen, juni 1942 (ridebanen_1942).
- Personer: 15. Spor: 22. Ting: 15. Ting at undersøge: 46. Replikker: 295.

## Start

Ida starter ved Marmorbroen kl. 06.00 med blyant, notesbog, mobil, studiekort i rygsækken.

*Torsdag morgen kl. 06.00. Det regnede det meste af natten, og brostenene er stadig våde. Hestene damper på Ridebanen.*  
*Ida har aftalt at møde nattevagten Bente ved Folketingets indgang i Rigsdagsgården. Ingen kender huset bedre, og Ida skriver speciale om Christiansborg.*  
*Hun ved endnu ikke, at nogen er død i nat.*

Uret kan ikke løbe ud. Det står stille 5 minutter før aktens slut, til de vigtigste spor er fundet. Når en begivenhed har et klokkeslæt, springer uret frem til det, hvis det er bagud.

## Akterne

| Akt | Navn | Tid | Begynder, når |
| --- | --- | --- | --- |
| 1 | Fundet | 06.00-07.00 | Spillet starter |
| 2 | De mistænkte | 07.00-08.30 | spor 1 (Liget og termokanden), spor 2 (Koppen med læbestift), spor 3 (Adgangsloggen), spor 4 (Mødet kl. 2), spor 5 (Samtaleværelset), spor 6 (Notesbogen), »bente beder« |
| 3 | Ud på Slotsholmen | 08.30-09.30 | spor 7 (Pernille og pressekort 17), spor 8 (Jonas Fengers telefon), spor 10 (Kopimaskinens log), spor 18 (Bodil og termokanden), »ditte renset«, »jonas renset« |
| 4 | Afsløringen | 09.30-10.00 | spor 9 (Referatet), spor 11 (Manden på trappen), spor 12 (Den røde båd), spor 14 (Termokanden), spor 15 (Valdorfs kontor), spor 20 (Papirerne i springvandet), spor 21 (Den gemte tabel), spor 22 (Bådnøglen) |

**Akt 1, Fundet.** En politiker er fundet død i Vandrehallen. Find ud af, hvad der skete i nat.

**Akt 2, De mistænkte.** Fem mennesker havde en grund til at ønske Aksel Mørkeberg væk. Tal med dem, og find ud af, hvem der lyver.

**Akt 3, Ud på Slotsholmen.** Sporene fører ud af Folketinget: over kanalen, ind i ministerierne og ned til vandet.

**Akt 4, Afsløringen.** Om en halv time begynder pressemødet. Kommissæren vil sige, at Kasper Lindved er anholdt.

## Eksempel på en gennemspilning

Den korteste af de tilfældige gennemspilninger uden 1942-laget. Den kan bruges, når spillet skal testes.

1. Gry Strigle: Godmorgen
2. Begivenhed: moede_bente
3. Bente Holmsgaard: Fortæl om huset
4. Bente Holmsgaard: Kan vi se adgangsloggen?
5. Vandrehallen og Rigets midte: Se på Mørkeberg
6. Begivenhed: kommissaeren
7. Begivenhed: statsministeren
8. De Kongelige Stalde: Gå hen til sadelkammeret
9. Proviantpassagen: Se i vandpytten ved døren
10. Kompaspartiets mødelokale: Se på bordet i mødelokalet
11. Kajen ved Reformministeriet: Se på båden
12. Kompaspartiets sekretariat: Se på kopimaskinens låg
13. Bibliotekshaven: Se på bænken ved Kierkegaard
14. Vandrehallen og Rigets midte: Se på bordet ved sofaen
15. Vandrehallen og Rigets midte: Se grundlovene
16. Vandrehallen og Rigets midte: Lys under sofaen
17. Kompaspartiets sekretariat: Se på kopimaskinens skærm
18. Vandrehallen og Rigets midte: Gnid blyanten over notesbogen
19. Bente Holmsgaard: Giv Bente brillerne
20. Gry Strigle: Kan jeg komme ind i sadelkammeret?
21. Bente Holmsgaard: Hvordan gik din runde i nat?
22. Bente Holmsgaard: Hvad skete der omkring kl. 2?
23. Samtaleværelset: Undersøg rummet
24. Akt 2 begynder: De mistænkte
25. Begivenhed: valdorf_kommer
26. Udsigten: Kig gennem kikkerten
27. Mogens Brask: Var De på arbejde i nat?
28. Pernille Strandvig: Hvor var du i nat?
29. Bibliotekshaven: Se på gruset
30. Pernille Strandvig: Er pressekort 17 dit?
31. Jonas Fenger: Giv ham telefonen fra mødelokalet
32. Bodil Kryddal: Fyldte du Mørkebergs termokande i går?
33. Henrik Valdorf: De ser ud til at være meget ude i vejret
34. Ditte Rosenvinge: Giv hende 50.000-rapporten
35. Akt 3 begynder: Ud på Slotsholmen
36. Begivenhed: retsmed
37. Ditte Rosenvinge: Vis hende koppen med læbestift
38. Begivenhed: springvandet
39. Svend Lysholt: Hvad fotograferer De?
40. Bibliotekshaven: Saml papirerne op ved kanten
41. Reformministeriets sidedør: Se på sidedøren
42. Kasper Lindved: Vis ham kopimaskinens log
43. Finansministeriets forhandlingsrum: Læs referatet
44. Bodil Kryddal: Har du gulerødder til staldene?
45. Reformministeriets printerområde: Se på printerens log
46. Finansministeriets garderobe: Se på knagerne
47. Mogens Brask: Holder tallene?
48. Riddersalen: Se på gobelinerne
49. Viggo Aagaard: Hvad ligger der i etuiet?
50. Jonas Fenger: Hvad skændtes du og Mørkeberg om kl. 23.50?
51. Viggo Aagaard: Lån Elefantordenen
52. De Kongelige Stalde: Giv Vega en gulerod
53. Sadelkammeret: Åbn det gamle sadelskab
54. Mogens Brask: Vis ham Elefantordenen
55. Departementschefens kontor: Se dig om på kontoret
56. Viggo Aagaard: Læg Elefantordenen tilbage
57. Departementschefens kontor: Se i jakkens lommer
58. Kajen ved Reformministeriet: Sejl med båden
59. Kanalen ved den gamle fortøjningspæl: Kig ned i vandet ved fortøjningspælen
60. Akt 4 begynder: Afsløringen
61. Begivenhed: valdorf_venter
62. Henrik Valdorf: Hvorfor ville De tale med mig?
63. Begivenhed: pressemoedet

## Personerne

### Bente Holmsgaard (59)

Folketingsbetjent på nattevagt. Mørkeblå uniform, gråt hår sat op i en knold og en tom brillesnor om halsen.

Hvor: akt 1: Betjentstuen, akt 2: Betjentstuen, akt 3: Betjentstuen, akt 4: Landstingssalen. Med i spillet, når: »mødt bente«.

I notesbogen: Folketingsbetjent på nattevagt gennem 31 år. Hendes farfar var betjent her under krigen. Fik sine briller tilbage. Hun sad på bænken ved Kierkegaard kl. 02.25.

#### Hvad skete der i nat?

**Bente:** Rengøringen fandt ham kl. 05.50 i den grønne sofa ved Rigets midte. Han sad bare der med frakken på.  
**Bente:** Aksel sov tit i Vandrehallen, når forhandlingerne trak ud. Men aldrig uden sin termokande. Den røde. Den er væk.

#### Kan vi se adgangsloggen?

<small>Kræver: endnu ikke »briller givet«. Giver: »briller hint«.</small>

**Bente:** Det kan vi, hvis jeg kan se tasterne. Mine læsebriller er væk.  
**Bente:** Jeg havde dem på min runde i nat. Jeg satte mig vist et øjeblik ude i Bibliotekshaven. Mine knæ er ikke, hvad de har været.

#### Giv Bente brillerne

<small>Kræver: har Bentes læsebriller. Giver: Ida afleverer Bentes læsebriller, »briller givet«, spor 3 (Adgangsloggen).</small>

**Ida:** Jeg fandt dem på bænken ved Kierkegaard.  
**Bente:** Mine briller! Og jeg kunne have svoret, at de lå i lommen.  
*Bente taster sin kode. Nattens adgangslog fylder skærmen.*  
**Bente:** Der var ikke mange i huset i nat. To kort skiller sig ud.  
**Bente:** Pressekort 17 kom ind ad døren her i Rigsdagsgården kl. 01.52 og gik igen kl. 02.24.  
**Bente:** Og så Kasper Lindved. Ind ved Proviantpassagen kl. 01.30 og ud kl. 02.22. Han blev fyret for et år siden. Hans kort burde slet ikke virke.

#### Hvad skete der omkring kl. 2?

<small>Kræver: spor 3 (Adgangsloggen), endnu ikke »fik nøglen«. Giver: spor 4 (Mødet kl. 2), Ida får Nøglen til Samtaleværelset, »fik nøglen«.</small>

**Bente:** Vent. Kl. halv to bad Aksel mig låse Samtaleværelset op. Han skulle mødes kl. 2 med »en fra den anden side af kanalen«, sagde han og blinkede.  
**Bente:** Kl. 3 låste jeg igen, som jeg plejer. Aksel sad i sofaen ved Rigets midte. Jeg troede, han sov.  
**Bente:** Her er nøglen. Jeg kiggede aldrig derind. Det var mørkt, og jeg var træt.

#### Hvordan gik din runde i nat?

<small>Kræver: »briller givet«. Giver: spor 19 (Bentes runde).</small>

**Bente:** Kl. 02.25 gik jeg gennem Rigsdagsgården med lommelygten. Gruset knasede i gangen ned mod Bibliotekshaven.  
**Bente:** Jeg gik derind, men der var ingen. Så satte jeg mig på bænken ved Kierkegaard og læste en sms fra min datter. Det var nok der, brillerne blev liggende.  
**Bente:** Jeg troede, det var en ræv. Der bor en i haven.

#### Tror du, det var Kasper?

<small>Kræver: »kommissær kommet«.</small>

**Bente:** Kasper? Han kan ikke slå en flue ihjel. Han åbner vinduet og beder den pænt om at gå.  
**Bente:** Han er en klovn med en dyr skjorte. Men han er ikke en morder.

#### Fortæl om huset

<small>Giver: »kender radiøn«.</small>

**Bente:** 31 år har jeg gået her om natten. Min farfar gik her før mig, også under krigen. Dengang hed det Rigsdagen.  
**Ida:** Rigsdagen. Det hed det indtil grundloven i 1953.  
**Bente:** Hans gamle radio står stadig derovre i hjørnet. Den virker ikke, men jeg kan ikke nænne at smide den ud.

#### Hvad skal jeg gøre nu?

Bente giver det første hint fra listen under »Bentes hint«, der passer.

### Torben Hald (60)

Kriminalkommissær, Københavns Politi. Våd trenchcoat, gråt overskæg og kaffe i papkrus.

Hvor: akt 1: Vandrehallen og Rigets midte, akt 2: Vandrehallen og Rigets midte, akt 3: Vandrehallen og Rigets midte, akt 4: Landstingssalen. Med i spillet, når: »kommissær kommet«.

I notesbogen: Kriminalkommissær. Vil sige på pressemødet kl. 10, at Kasper Lindved er anholdt.

#### Hvorfor tror De, det er Kasper Lindved?

**Hald:** Loggen. Hans gamle kort gik ind kl. 01.30 og ud kl. 02.22. Det er lige i den tid, hvor det må være sket.  
**Hald:** Mørkeberg fyrede ham sidste år. Siden har Lindved skrevet grimme ting om ham på nettet. En fyret spindoktor med et kort, der ikke burde virke. Det er ikke raketvidenskab.

#### Hvad med pressekort 17?

<small>Kræver: spor 3 (Adgangsloggen).</small>

**Hald:** Pressen render ud og ind hele natten med de kort. Journalister slår ikke folk ihjel. De skriver bare om det bagefter.

#### Hvad med termokanden?

**Hald:** Den er væk. Det ved hele huset, for Bente har fortalt det til alle.  
**Hald:** Termokander forsvinder hver dag på Christiansborg. Det gør journalister desværre ikke.

#### Må jeg se mig omkring?

**Hald:** De må gå, hvor De vil, så længe De ikke rører ved noget.  
**Hald:** Og De rører ikke ved noget.

#### Vis ham kopimaskinens log

<small>Kræver: spor 10 (Kopimaskinens log).</small>

**Hald:** Så Lindved kopierede papirer, mens han var her. Det gør ham også til tyv. Det gør det ikke bedre.

#### Fortæl om manden på trappen

<small>Kræver: spor 11 (Manden på trappen).</small>

**Hald:** En mand i sejlerjakke. Halvdelen af Slotsholmen går i sejlerjakke, når det regner. Kom tilbage, når De har et navn.

#### Hvad sagde retsmedicineren?

<small>Kræver: »retsmed«.</small>

**Hald:** Noget i kaffen. Død mellem kl. 2 og 3. Mere får pressen ikke, og mere får De heller ikke.

### Statsministeren

Statsminister. Mørkeblå frakke, rødt halstørklæde og to livvagter et skridt bagved.

Hvor: akt 2: Restauranten i tårnet, akt 3: Restauranten i tårnet, akt 4: Landstingssalen.

I notesbogen: Holder fast i pressemødet kl. 10 i Landstingssalen.

#### Bliver pressemødet holdt?

**Statsministeren:** Danmark venter på en reform, og kommissæren siger, han har sin mand. Pressemødet holder kl. 10.  
**Statsministeren:** Hvis De ved noget, han ikke ved, så har De til kl. 10.

#### Kendte De Aksel Mørkeberg?

**Statsministeren:** Alle kendte Aksel. Han kunne trække et forlig ud i tre døgn for at få et ekstra kapitel i sine erindringer.  
**Statsministeren:** Men han regnede altid efter. Det kan man ikke sige om alle i det her hus.

### Gry Strigle (34)

Beridder i De Kongelige Stalde. Ridebukser, grøn vest og en hjelm under armen.

Hvor: akt 1: Ridebanen, akt 2: De Kongelige Stalde, akt 3: De Kongelige Stalde.

I notesbogen: Beridder med nattevagt i staldene. Talte med Mørkeberg ved midnat. Han var inde i sadelkammeret.

#### Godmorgen

<small>Kræver: endnu ikke »mødt bente«. Giver: spor 17 (Gry og den faste runde), »sadelkammer hint«.</small>

**Gry:** Godmorgen! Du er tidligt oppe. Det var Aksel Mørkeberg også. Han gik sin faste runde her ved midnat, som han altid gør, når han skal tænke.  
**Gry:** Han var i strålende humør. »I morgen kl. 10 falder der en bombe, Gry«, sagde han.  
**Gry:** Og så gik han et øjeblik ind i sadelkammeret. Det plejer han ikke. Politikere.  
**Ida:** En bombe kl. 10? Det skriver jeg ned. Det lyder som en god historie.

#### Så du nogen i nat?

<small>Kræver: »mødt bente«. Giver: spor 17 (Gry og den faste runde), »sadelkammer hint«.</small>

**Gry:** Kun Aksel Mørkeberg. Han går altid en runde her ved midnat, når han skal tænke. Han siger, at hestene er de eneste på Slotsholmen, der ikke lækker.  
**Gry:** I nat var han i strålende humør. »I morgen kl. 10 falder der en bombe, Gry«, sagde han.  
**Gry:** Han gik også et øjeblik ind i sadelkammeret. Det plejer han ikke. Han kom ud uden noget i hænderne.

#### Fortæl om hestene

<small>Giver: »vega hint«.</small>

**Gry:** Vi trækker dem ud, før byen vågner. Så får de ro, og vi får ro.  
**Gry:** Vega er den store hvide. Hun er sød, men hun flytter sig ikke for nogen uden en gulerod. Køkkenet i Snapstinget plejer at sende nogle over.

#### Kan jeg komme ind i sadelkammeret?

<small>Kræver: »sadelkammer hint«, endnu ikke »hesten flyttet«. Giver: »vega hint«.</small>

**Gry:** Hvis du kan få Vega væk fra døren. Hun har stillet sig der i nat og vil ikke flytte sig.  
**Gry:** Prøv med en gulerod. Bodil i Snapstinget har altid nogle.

#### Hvad er det for hestesko over porten?

<small>Kræver: 1942-laget er slået til. Giver: »hestesko hint«.</small>

**Gry:** De har hængt der siden Christian 10.s tid. Under krigen red han gennem byen hver morgen.  
**Gry:** Man siger, han gemte noget bag en af dem. Men ingen tør pille ved dem.

### Bodil Kryddal (62)

Køkkenchef i Snapstinget. Hvid kokkejakke, briller i panden og en kaffekande i hver hånd.

Hvor: akt 2: Snapstinget, akt 3: Snapstinget.

I notesbogen: Køkkenchef i Snapstinget. Fylder Mørkebergs termokande hver aften.

#### Fyldte du Mørkebergs termokande i går?

<small>Giver: spor 18 (Bodil og termokanden).</small>

**Bodil:** Kl. 21.30, som altid. Sort kaffe og to stykker sukker. Han sagde, at kaffen i Finansministeriet smager af regneark.  
**Bodil:** Ingen andre drak af den kande. Han lod ikke engang mig smage.  
**Bodil:** Så hvis der kom noget i den, kom det ikke fra mit køkken. Det kom senere.

#### Hvorfor hedder det Snapstinget?

**Ida:** Jeg har læst, at navnet måske kommer fra et gammelt tingsted ved Viborg, som folk kaldte Snabstinget.  
**Bodil:** Det har jeg aldrig hørt. Jeg troede, det var på grund af snapsen.

#### Har du gulerødder til staldene?

<small>Kræver: »vega hint« eller »hest i vejen«, endnu ikke »fik gulerødder«. Giver: Ida får Gulerødder, »fik gulerødder«.</small>

**Bodil:** Selvfølgelig. Vi sender skrællerne over hver morgen, men hestene foretrækker de hele. Tag tre.  
**Bodil:** Og sig til Vega, at hun skylder mig en tur i karet.

#### Hvornår kom Kasper Lindved?

**Bodil:** Han sad der, da jeg låste op kl. 7. Han har spist fire rundstykker og ikke sagt et ord. Det ligner ham ikke.

### Ditte Rosenvinge (47)

Reformminister. Mørkegrå dragt, rød læbestift og en telefon i hver hånd.

Hvor: akt 2: Restauranten i tårnet, akt 3: Restauranten i tårnet, akt 4: Landstingssalen.

I notesbogen: Reformminister. Fremtidsreformen er hendes livsværk. Mørkeberg truede med at stemme nej. Drak kaffe med Mørkeberg ved Rigets midte kl. 00.30-00.55. Lovede Mørkeberg et sidebrev med en post i EU. Var i forhandlingsrummet kl. 01.00-03.30. Renset.

#### Hvor var De i nat?

**Ditte:** I forhandlingsrummet i Finansministeriet. Fra kl. 1 til halv fire uden pause. Spørg de ni andre, hvis de kan huske det.  
**Ditte:** Undskyld mig. Jeg har et pressemøde at forberede.

#### Vis hende koppen med læbestift

<small>Kræver: spor 2 (Koppen med læbestift). Giver: »ditte kop«.</small>

**Ditte:** Det er min farve, ja. Jeg drak en kop kaffe med Aksel ved Rigets midte ved halv ettiden.  
**Ditte:** Det er ikke forbudt at drikke kaffe med sin forhandlingspartner. Han var levende og irriterende, da jeg gik kl. 00.55.

#### Hvad talte I om?

<small>Kræver: »ditte kop«, endnu ikke »ditte renset«. Giver: »ditte vil have rapport«.</small>

**Ditte:** Forhandlinger er fortrolige.  
**Ida:** Og hvis jeg havde noget, De gerne ville have?  
**Ditte:** Kompaspartiet har bestilt en rapport hos Prognosehuset Optima. Den har ingen vist mig. Den ville jeg gerne se før kl. 10.

#### Giv hende 50.000-rapporten

<small>Kræver: har 50.000-rapporten. Giver: Ida afleverer 50.000-rapporten, Ida får Gæstekort til Finansministeriet, »ditte renset«.</small>

**Ditte:** »Arbejdsudbud uden besvær«. 50.000! Hvorfor har ingen vist mig den her?  
**Ditte:** Godt. Jeg lovede Aksel et sidebrev: en post i EU, hvis han stemte ja. Det er ikke pænt, men det er heller ikke mord.  
**Ditte:** Jeg var i forhandlingsrummet fra kl. 1 til halv fire, og der er et referat. Her er mit gæstekort til Finansministeriet. Se selv.

#### Hvad lavede Deres departementschef i nat?

<small>Kræver: »ditte renset«. Giver: »valdorf alibi hørt«.</small>

**Ditte:** Henrik? Han er min klippe. Han gik over i ministeriet kl. halv to for at regne tallene igennem en sidste gang.  
**Ditte:** Kl. 02.05 kom mailen med de nye tal, og kl. 02.50 sad han ved bordet igen. Han arbejder, mens vi andre sover.

#### Holder de 11.000 job?

**Ditte:** Elleve tusind. Regnet af Reformministeriet efter alle kunstens regler. Det har jeg sagt i tv, og det siger jeg igen kl. 10.

### Jonas Fenger (33)

Næstformand i Kompaspartiet. Smal jakke, hvide sneakers og to telefoner. Han leder efter den tredje.

Hvor: akt 2: Kompaspartiets kontor, akt 3: Kompaspartiets kontor, akt 4: Landstingssalen.

I notesbogen: Næstformand og kronprins i Kompaspartiet. Mørkeberg ville være formand en periode til. Pernilles kilde. I videomøde kl. 01.45-02.40. Renset.

#### Hvordan var Mørkeberg som formand?

**Jonas:** Aksel var en legende. Og legender bliver ved, til nogen giver dem en pensionsgave. Han ville have en periode til.  
**Jonas:** Jeg vil gerne være formand. Det er ingen hemmelighed. Men jeg ville slå ham på et landsmøde, ikke på den her måde.

#### Hvor var du i nat?

<small>Kræver: endnu ikke »jonas renset«.</small>

**Jonas:** Her på kontoret. Jeg arbejdede. Der er ikke mere at sige.

#### Hvad skændtes du og Mørkeberg om kl. 23.50?

<small>Kræver: »hørt om skænderi«. Giver: »jonas alibi hørt«.</small>

**Jonas:** Hvem har sagt det? Fint. Han beskyldte mig for at lække til pressen. Det har jeg ikke gjort.  
**Jonas:** Og fra kl. 01.45 til 02.40 sad jeg i videomøde med hele hovedbestyrelsen i mødelokalet. Optagelsen ligger på min telefon. Hvis jeg kunne finde den.

#### Giv ham telefonen fra mødelokalet

<small>Kræver: har Jonas' telefon. Giver: Ida afleverer Jonas' telefon, spor 8 (Jonas Fengers telefon), »jonas renset«.</small>

**Jonas:** Min telefon! Hvor var den?  
**Ida:** På bordet i mødelokalet. Der kom en besked, mens den lå der. Fra »P.S.«: »Tak for i går ved springvandet. Ring, når du kan.«  
**Ida:** P.S. Pernille Strandvig?  
**Jonas:** Okay. Ja. Jeg har lækket. Men jeg har ikke slået nogen ihjel.  
**Jonas:** Se her: optagelsen af videomødet. Fra 01.45 til 02.40 sidder jeg i billedet hele tiden. Det er det kedeligste alibi i Danmarks historie.

### Pernille Strandvig (52)

Politisk kommentator på Dagbladet Nordlyset. Lang regnfrakke, presseskilt om halsen og kaffe i en termokop.

Hvor: akt 2: Slotspladsens presseområde, akt 3: Slotspladsens presseområde, akt 4: Landstingssalen.

I notesbogen: Kommentator på Dagbladet Nordlyset. Mørkeberg truede med at afsløre hendes kilde. Direkte i radioen fra Slotspladsen kl. 01.45-02.05. Hendes pressekort 17 blev stjålet i nat. Renset.

#### Hvor var du i nat?

<small>Giver: »hørt om skænderi«, »pernille alibi«.</small>

**Pernille:** Her, ved radiovognen. Jeg var direkte i nattens radioudsendelse fra kl. 01.45 til 02.05. Halvdelen af Danmark hørte mig gabe.  
**Pernille:** Med projektørerne i øjnene kunne vi ikke se en meter ud i mørket. Men vi så departementschefen gå over broen til sit ministerium ved halv to-tiden. Han vinkede.  
**Pernille:** Det sjoveste i nat skete kl. 23.50. Jonas Fenger og Mørkeberg råbte ad hinanden på gangen i Finansministeriet. Vi kunne høre det helt herud.

#### Er pressekort 17 dit?

<small>Kræver: spor 3 (Adgangsloggen). Giver: spor 7 (Pernille og pressekort 17), »pernille alibi«.</small>

**Pernille:** Sytten? Ja, det er mit pressekort. Hvorfor?  
**Pernille:** Det forsvandt fra min frakke i Finansministeriets garderobe under briefingen kl. 23. Ved ettiden ville jeg over i Folketinget, og så var det væk. Jeg måtte låne en kollegas.  
**Pernille:** Det mærkelige er, at det lå i min frakkelomme igen i morges. Og før du spørger: Jeg var direkte i radioen fra 01.45 til 02.05. Spørg teknikeren.

#### Hvem er din kilde?

<small>Kræver: spor 8 (Jonas Fengers telefon).</small>

**Pernille:** Det siger jeg aldrig.  
**Pernille:** Men hvis Jonas allerede har fortalt det, så er det jo ham, der har sagt det. Ikke mig.

### Kasper Lindved (44)

PR-rådgiver i Bro & Bølge Kommunikation. Dyr skjorte, mørke rande under øjnene og et rundstykke i hånden.

Hvor: akt 2: Snapstinget, akt 3: Snapstinget, akt 4: Landstingssalen.

I notesbogen: Mørkebergs tidligere spindoktor, fyret sidste år. Nu PR-rådgiver. Kommissæren vil anholde ham. Indrømmer, at han var i huset i nat. Kopierede papirer kl. 01.38-02.12. Tyv, ikke morder.

#### Var du i Folketinget i nat?

<small>Kræver: endnu ikke »kasper indrømmer«.</small>

**Kasper:** Nej. Jeg sov hjemme i Valby. Spørg min kat.

#### Vis ham kortet fra vandpytten

<small>Kræver: har Kaspers gamle adgangskort. Giver: »kasper indrømmer«.</small>

**Kasper:** Det kan være faldet ud af min lomme for et år siden.  
**Ida:** Det er stadig vådt.  
**Kasper:** Fint. Jeg var her. Men jeg rørte ikke Aksel. Jeg var her for papirer, ikke for ham.

#### Vis ham kopimaskinens log

<small>Kræver: spor 10 (Kopimaskinens log). Giver: spor 11 (Manden på trappen), »kasper indrømmer«.</small>

**Kasper:** 212 sider. Ja. En kunde hos Bro & Bølge ville gerne vide, hvad Kompaspartiet egentlig mente om reformen. Det er dumt, ikke dødeligt.  
**Kasper:** Og nu, hvor du ved det: Da jeg gik kl. 02.20, så jeg en mand på trappen. Mørk sejlerjakke, våd som en hund. Han gik ned mod udgangen i Rigsdagsgården med noget rødt under armen.  
**Kasper:** Jeg sagde ikke noget til kommissæren. Så skulle jeg jo indrømme, at jeg var her.

#### Hvorfor blev du fyret?

**Kasper:** Jeg skrev en tale, hvor Aksel kom til at love gratis tandlæge til alle. Han holdt den uden at læse den først. Det var hans fejl, men det var mig, der røg.

### Henrik Valdorf (58)

Departementschef i Reformministeriet. Gråt jakkesæt, gult slips og en mappe under armen. Solbrun som en, der sejler hver weekend.

Hvor: akt 2: Vandrehallen og Rigets midte, akt 3: Restauranten i tårnet, akt 4: Udsigten. Med i spillet, når: »valdorf her«.

I notesbogen: Departementschef i Reformministeriet. Har regnet reformen ud til 11.000 job. Meget hjælpsom. Siger, at han regnede i sit ministerium kl. 01.35-02.50. Mailen gik kl. 02.05, og Mogens så ham ved printeren. Var våd i håret ved printeren kl. 02.36. Det regner ikke indenfor.

#### Hvor var De i nat?

<small>Giver: »valdorf alibi hørt«.</small>

**Valdorf:** I forhandlingsrummet til halv to. Så gik jeg over i Reformministeriet for at regne tallene igennem en sidste gang. Pressen så mig gå over broen.  
**Valdorf:** Mailen med de nye tal gik kl. 02.05. Min kontorchef Mogens så mig ved printeren lidt over halv tre, og kl. 02.50 var jeg tilbage. En helt almindelig nat i staten.

#### Hvad tænkte De om Mørkeberg?

<small>Giver: »hørt om skænderi«.</small>

**Valdorf:** En dygtig mand. Han kunne læse et regnestykke bagfra og finde en fejl, der ikke var der.  
**Valdorf:** Jeg vil gerne hjælpe. Har De talt med Jonas Fenger? Han og Aksel skændtes kl. 23.50. Og Kasper Lindved har længe haft et horn i siden på ham.

#### Holder tallene i reformen?

**Valdorf:** 11.000 flere i job. Regnet efter alle kunstens regler.  
**Valdorf:** Jeg har lavet regnestykker for staten i 30 år. De holder.

#### De ser ud til at være meget ude i vejret

<small>Giver: »valdorf sejler«.</small>

**Valdorf:** Jeg er med i bådlauget ved Gammel Strand. Der er ingen mails på vandet.  
**Valdorf:** Det er det eneste sted, hvor et knob betyder mere end en kommafejl.

#### Fortæl ham om den røde båd

<small>Kræver: spor 12 (Den røde båd), akt 3 eller før.</small>

**Valdorf:** En båd? Folk låner både hele tiden i den her by. Turister, mest.

#### Hvorfor ville De tale med mig?

<small>Kræver: akt 4 eller senere. Giver: spor 16 (Fortalelsen).</small>

**Valdorf:** Bente siger, De har gået rundt hele morgenen. Jeg tænkte, De måske trængte til et overblik.  
**Valdorf:** Se, derovre ligger mit ministerium. Og dernede Folketinget. Et kvarters gang over broen.  
**Valdorf:** Forfærdeligt med Aksel. Han tog de tal så tungt. Det er stadig en god reform, om den så giver 11.000 eller 4.000 job.  
*Ida skriver i sin notesbog. Ingen har sagt tallet 4.000 til Valdorf. Det står kun i Mørkebergs notesbog og i papirerne fra springvandet.*

### Mogens Brask (56)

Kontorchef i Reformministeriet. Brun cardigan, DJØF-nål på reversen og tape på det ene brillestel.

Hvor: akt 2: Landstingssalen, akt 3: Landstingssalen, akt 4: Landstingssalen.

I notesbogen: Kontorchef i Reformministeriet og medlem af DJØF i 31 år. Sætter pressemødet op. Drømmer om Elefantordenen. Gav Mørkeberg de rigtige tal: 4.000 job. Kender koden til Valdorfs kontor.

#### Hvad laver De?

**Mogens:** Jeg sætter navneskilte op til pressemødet. 31 år i staten, og jeg ender som skiltemand.  
**Mogens:** De skal stå efter rang. Det tager tid, når ingen vil sidde ved siden af Kompaspartiet.

#### Var De på arbejde i nat?

<small>Giver: »valdorf alibi hørt«.</small>

**Mogens:** Ja, i Reformministeriet. Jeg så Henrik ved printeren lidt over halv tre. Han arbejder altid, når andre sover.

#### Holder tallene?

<small>Giver: »mogens elefant«.</small>

**Mogens:** Det er ikke mit bord. Henrik har tallene.  
**Mogens:** Har De i øvrigt set, hvor få der har fået Elefantordenen? Kun fire borgerlige danskere siden 1900. Det er et bedre emne.

#### Vis ham Elefantordenen

<small>Kræver: har Elefantordenen. Giver: »mogens talt«, »kode hint«, »valdorf våd«.</small>

**Mogens:** Må jeg? Bare et øjeblik.  
*Mogens holder ordenen i flade hænder, som var den en fugleunge.*  
**Mogens:** Kun fire borgerlige danskere siden 1900. Og nu står en kontorchef her og holder den.  
**Mogens:** Ved De hvad? Jeg har aldrig fortalt det til nogen. Det var mig, der gav Aksel tallene fra maj. 4.000 flere i job, ikke 11.000. Han havde ret til at vide det.  
**Mogens:** Henrik har låst de rigtige tal inde på sit kontor. Koden er den samme på alle hans låse: året, hvor Danmark fik sin første grundlov.  
**Mogens:** Og en ting mere. Da jeg så ham ved printeren i nat, var han våd i håret. Det regner ikke indenfor.

#### Hvad med 50.000-rapporten?

<small>Kræver: »ditte renset«.</small>

**Mogens:** Den fra Prognosehuset Optima? Jeg så den på ministerens bord i morges.  
**Mogens:** Der er en kommafejl på forsiden. Der skulle have stået 5.000,0.

#### Hvad skal jeg gøre med ordenen nu?

<small>Kræver: har Elefantordenen, »mogens talt«.</small>

**Mogens:** Læg den tilbage i Riddersalen. Hoffet tæller elefanter.

### Viggo Aagaard (63)

Hoffourer. Mørk livré, hvide handsker og en tyk protokol under armen.

Hvor: akt 3: Riddersalen, akt 4: Riddersalen.

I notesbogen: Hoffourer. Passer på Elefantordenen til aftenens gallamiddag.

#### Hvad ligger der i etuiet?

<small>Giver: »hoffourer spurgt«.</small>

**Hoffoureren:** Elefantordenen. Den skal ligge fremme til aftenens gallamiddag for en udenlandsk gæst.  
**Ida:** Må jeg låne den? Ti minutter. Det er til et speciale.  
**Hoffoureren:** Ingen låner Elefantordenen.  
**Hoffoureren:** Medmindre det er en historiker, der kan fortælle mig, hvem der har lavet gobelinerne på væggene. Det ved ingen af dem, der kommer her.

#### Lån Elefantordenen

<small>Kræver: »hoffourer spurgt«, »gobelin kendt«, har ikke Elefantordenen. Giver: Ida får Elefantordenen, »orden ude«, slutter »orden tilbage«.</small>

**Ida:** Bjørn Nørgaard. 17 gobeliner med Danmarks og verdens historie. De blev hængt op i 2000.  
**Hoffoureren:** Korrekt. Skriv Deres navn i protokollen. Ti minutter.  
**Hoffoureren:** Og er den ikke tilbage før kl. 10, finder jeg Dem. Hoffet tæller elefanter.

#### Læg Elefantordenen tilbage

<small>Kræver: har Elefantordenen. Giver: Ida afleverer Elefantordenen, slutter »orden ude«, »orden tilbage«.</small>

**Hoffoureren:** Ni minutter og fyrre sekunder. Hoffet takker.

### Svend Lysholt (67)

Pensioneret fotograf. Uldhue, stativ over skulderen og et kamera med et langt objektiv.

Hvor: akt 2: Højbro, akt 3: Højbro.

I notesbogen: Pensioneret fotograf. Tager lange nattebilleder fra Højbro.

#### Hvad fotograferer De?

<small>Giver: spor 13 (Svends billeder).</small>

**Svend:** Natten. Lange billeder, et halvt minut hver. Lyset trækker streger, og byen står stille.  
**Svend:** I nat var her næsten ingen. Bortset fra en lille båd.  
**Ida:** Må jeg se?  
**Svend:** Her: kl. 01.44 krydser en lanterne kanalen fra Ved Stranden mod Slotspladsen. Og her kl. 02.31 tilbage igen.  
**Svend:** Hvem sejler i en lille båd kl. 2 om natten i regnvejr? Det må være en, der ikke vil ses.

#### Kender De havmanden under broen?

**Ida:** Agnete og havmanden. Han ligger på bunden lige under os med sine syv sønner.  
**Svend:** Ham har jeg fotograferet 400 gange. Han har aldrig sagt noget.

### Holger Holmsgaard (52), kun i 1942-laget

Betjent i Rigsdagen, Bentes farfar. Uniform med messingknapper, kasket og et stort overskæg.

Hvor: akt 2: Betjentstuen, juni 1942, akt 3: Betjentstuen, juni 1942. Med i spillet, når: 1942-laget er slået til, »i 1942«.

I notesbogen: Bentes farfar. Betjent i Rigsdagen i 1942.

#### Godmorgen

<small>Giver: »holger talt«.</small>

**Holger:** Godmorgen, frøken. Hvem har lukket Dem ind i Rigsdagen så tidligt?  
**Ida:** Jeg skriver om huset.  
**Holger:** Så skulle De se kongen. Han rider forbi Ridebanen hver morgen, helt uden følge. Men pas på patruljerne. De har vel ingen papirer?

### Christian 10. (71), kun i 1942-laget

Konge. En høj, ældre rytter i uniform på en lys hest. Ingen følge.

Hvor: akt 2: Ridebanen, juni 1942, akt 3: Ridebanen, juni 1942. Med i spillet, når: 1942-laget er slået til, »i 1942«, »handske tabt«.

I notesbogen: Kongen red dagligt gennem København under besættelsen indtil oktober 1942.

#### Ræk handsken op til kongen

<small>Kræver: har Kongens handske. Giver: Ida afleverer Kongens handske, »kongen takket«.</small>

**Kongen:** Tak, unge dame. Det er ikke hver dag, nogen løber efter en gammel mand på en hest.  
**Kongen:** De ser ud, som om De leder efter noget. Min reservenøgle til det gamle sadelskab derinde hænger bag den tredje hestesko over staldporten. Det ved kun staldmesteren og jeg.  
**Kongen:** Og nu De. Godmorgen.

## Steder og ting at undersøge

### Ridebanen

I spillet: ude: Ridebanen (bygget).

**Se dig om på Ridebanen** (Idas viden)

**Ida:** Ridebanen og fløjene omkring den er fra det første Christiansborg. De overlevede begge brande, i 1794 og 1884.

### De Kongelige Stalde

I spillet: inde: stables (bygget).

**Gå hen til sadelkammeret**

<small>Kræver: endnu ikke »hesten flyttet«. Giver: »hest i vejen«.</small>

*Den store hvide hest Vega står foran døren til sadelkammeret og tygger hø. Hun kigger på Ida og flytter sig ikke en centimeter.*

**Giv Vega en gulerod**

<small>Kræver: har Gulerødder, endnu ikke »hesten flyttet«. Giver: Ida afleverer Gulerødder, »hesten flyttet«.</small>

*Vega tager guleroden med sin bløde mule og lunter et par skridt til siden. Døren til sadelkammeret er fri.*

**Se bag den tredje hestesko over porten**

<small>Kræver: 1942-laget er slået til, »kongen takket«, endnu ikke »i 1942«, endnu ikke »kongens nøgle fundet«. Giver: Ida får Kongens nøgle, »kongens nøgle fundet«.</small>

*Over staldporten hænger en række gamle hestesko. Bag den tredje sidder en lille messingnøgle med en krone, grøn af alder.*  
**Ida:** Den har hængt her siden 1942. Og Mørkeberg vidste det.

### Sadelkammeret

I spillet: inde: stables (skal bygges). Ligger i De Kongelige Stalde.

Lås: »hesten flyttet«. »Den store hvide hest Vega står foran døren og tygger hø. Hun flytter sig ikke.«

**Prøv det gamle sadelskab**

<small>Kræver: 1942-laget er slået til, har ikke Kongens nøgle, endnu ikke »skabet åbnet«. Giver: »skab låst«.</small>

*Inderst står et gammelt skab med en lille krone på lågen. Det er låst, og nøglehullet er lille og gammelt.*

**Åbn det gamle sadelskab**

<small>Kræver: 1942-laget er slået fra eller har Kongens nøgle. Giver: spor 21 (Den gemte tabel), »skabet åbnet«.</small>

*Inderst står et gammelt skab med en lille krone på lågen. Mellem to sadeltæpper ligger en plastlomme.*  
*Indeni er en tabel fra Reformministeriet, dateret maj: »Beskæftigelseseffekt: 4.000.« I margenen står der med kuglepen: »Kl. 10.«*  
**Ida:** Samme håndskrift som i notesbogen. Mørkeberg gemte en kopi, hvor ingen ville lede.

### Folketinget

I spillet: inde: folketing (bygget).

Åben, når: »mødt bente«. Ellers: »Bente står i døren. Tal med hende først.«

### Vandrehallen og Rigets midte

I spillet: inde: folketing/hall (bygget). Ligger i Folketinget.

**Se på Mørkeberg**

<small>Giver: spor 1 (Liget og termokanden).</small>

*Aksel Mørkeberg sidder i den grønne sofa med frakken på og hovedet på skrå. Det ligner, at han er faldet i søvn midt i en sætning.*  
**Ida:** Ingen tegn på kamp. Og ingen termokande. Bente siger, han aldrig gik uden den.

**Se på bordet ved sofaen**

<small>Giver: spor 2 (Koppen med læbestift).</small>

*På sofabordet står en kaffekop med et rødt mærke af læbestift på kanten.*  
**Ida:** Mørkeberg gik næppe med læbestift. Nogen har siddet hos ham i nat.

**Lys under sofaen**

<small>Kræver: spor 1 (Liget og termokanden), har Mobil, endnu ikke »notesbog fundet«. Giver: »notesbog fundet«.</small>

*Ida lyser ind under sofaen med lygten på sin mobil. Derinde ligger Mørkebergs lille sorte notesbog.*  
*En side er revet ud. På den næste kan man ane trykket fra en kuglepen.*

**Gnid blyanten over notesbogen**

<small>Kræver: »notesbog fundet«, har Blyant. Giver: spor 6 (Notesbogen).</small>

*Ida gnider blyanten let hen over siden. Bogstaverne kommer frem som lyse streger i det grå.*  
*»11.000? Kun 4.000. Dept. har vidst det siden maj. Kl. 10 siger jeg det.«*  
**Ida:** Fire tusind. Ikke elleve. Og kl. 10 er pressemødet.

**Se grundlovene** (Idas viden)

<small>Giver: »kender 1849«.</small>

**Ida:** Grundlovene fra 1849, 1866, 1915 og 1953. Den første underskrev Frederik 7. den 5. juni 1849.

### Betjentstuen

I spillet: inde: folketing/betjent (bygget). Ligger i Folketinget.

**Se på adgangsloggen**

<small>Kræver: endnu ikke »briller givet«.</small>

*Skærmen beder om Bentes kode. Uden briller kan Bente ikke se tasterne.*

**Se på nøgleskabet**

*Rækker af nøgler med messingmærker. Én krog er markeret »Samtaleværelset«.*

**Se på den gamle radio**

<small>Kræver: 1942-laget er slået fra.</small>

*En gammel radio i mørkt træ med et skalahjul: London, Berlin, Kalundborg. Den virker ikke.*

**Drej radioen hen på London**

<small>Kræver: 1942-laget er slået til, akt 2 eller senere, endnu ikke »i 1942«. Giver: »i 1942«.</small>

*Ida drejer skalahjulet hen på »London«. Radioen knitrer. Lyset i betjentstuen bliver gult og svagt, og kalenderen på væggen viser juni 1942.*

### Samtaleværelset

I spillet: inde: folketing/samtale (bygget). Ligger i Folketinget.

Lås: har Nøglen til Samtaleværelset. »Døren er låst. Bente låser den på sin runde kl. 3, som hun plejer.«

**Undersøg rummet**

<small>Giver: spor 5 (Samtaleværelset).</small>

*To stole er trukket ud fra det runde bord, tæt på hinanden, som til en fortrolig samtale.*  
*På bordpladen er der en rund kafferand. Den er for stor til en kop. Den passer til en termokande.*  
*Under bordet er der indtørrede, våde fodspor med et mønster af små bølger. Sådan ser sålerne på sejlersko ud.*  
**Ida:** Mødet kl. 2 var her. Og nogen kom ind fra regnen.

### Kompaspartiets kontor

I spillet: inde: folketing/office1 (bygget). Ligger i Kompaspartiets gang.

**Se på whiteboardet**

*På whiteboardet står der med store bogstaver: »4 mandater = 100 % af magten«. Nogen har tegnet et hjerte om det.*

### Kompaspartiets mødelokale

I spillet: inde: folketing/meeting (bygget). Ligger i Kompaspartiets gang.

**Se på bordet i mødelokalet**

<small>Kræver: endnu ikke »telefon fundet«. Giver: Ida får Jonas' telefon, »telefon fundet«.</small>

*På det lange bord ligger en telefon i et etui med Kompaspartiets kompasrose. En besked lyser på den låste skærm: »Tak for i går ved springvandet. Ring, når du kan. P.S.«*  
**Ida:** Det må være Jonas'. Han har tre telefoner, og nu har han kun to.

### Kompaspartiets sekretariat

I spillet: inde: folketing/secretariat (bygget). Ligger i Kompaspartiets gang.

Lås: har Kaspers gamle adgangskort. »Døren har en kortlæser. Studiekortet virker ikke her.«

**Se på kopimaskinens skærm**

<small>Giver: spor 10 (Kopimaskinens log).</small>

*Kopimaskinens skærm viser nattens job: kort »K. Lindved«, 212 sider, kl. 01.38-02.12.*  
**Ida:** Han stod her i over en halv time og kopierede. Det er et alibi, ikke et motiv.

**Se på kopimaskinens låg**

<small>Kræver: endnu ikke »rapport taget«. Giver: Ida får 50.000-rapporten, »rapport taget«.</small>

*På låget ligger en glemt rapport: »Arbejdsudbud uden besvær«, Prognosehuset Optima. »Op til 50.000 flere i arbejde.«*  
**Ida:** Den tager jeg med. Nogen vil nok gerne se den.

### Snapstinget

I spillet: inde: folketing/snap (bygget). Ligger i Folketinget.

Åben, når: akt 2 eller senere. Ellers: »Snapstinget åbner kl. 7 til morgenmad.«

**Se på buffeten**

*Rundstykker, ost og en kaffemaskine, der brummer som en færge.*

### Landstingssalen

I spillet: inde: folketing/landsting (bygget). Ligger i Folketinget.

**Se på navneskiltene**

*Navneskiltene står på rad til pressemødet. Ved Kompaspartiets plads står der stadig »A. Mørkeberg«.*

### Tårnets elevatorhal

I spillet: inde: towerLobby (bygget).

Åben, når: akt 2 eller senere. Ellers: »Tårnet åbner kl. 7.«

### Udsigten

I spillet: ude: Udsigten (bygget). Ligger i Tårnets elevatorhal.

**Kig gennem kikkerten**

<small>Giver: »båd set oppefra«.</small>

*Gennem kikkerten ser Ida ned over kanalen. Ved kajen over for Reformministeriet ligger en lille rød båd.*  
**Ida:** Den hører til ved Gammel Strand. Hvad laver den der?

### Proviantpassagen

I spillet: ude: Proviantpassagen (bygget).

**Se i vandpytten ved døren**

<small>Kræver: »kommissær kommet«, endnu ikke »kort fundet«. Giver: Ida får Kaspers gamle adgangskort, »kort fundet«.</small>

*I en vandpyt ved sidedøren ligger et adgangskort med billedsiden nedad.*  
**Ida:** »Kasper Lindved, Kompaspartiet.« Udløbet for et år siden. Han har tabt det på vej ud i nat.

### Slotspladsens presseområde

I spillet: ude: Slotspladsens presseområde (bygget).

**Se ind i radiovognen**

*Teknikeren i radiovognen spoler nattens udsendelse frem. Pernille er på fra 01.45 til 02.05 uden pause.*  
**Ida:** Så kan hun ikke have været ved døren i Rigsdagsgården kl. 01.52.

### Riddersalen

I spillet: inde: riddersal (bygget).

Åben, når: akt 3 eller senere. Ellers: »Riddersalen åbner kl. 8.30, når hoffet begynder at dække op til aftenens gallamiddag.«

**Se på gobelinerne** (Idas viden)

<small>Giver: »gobelin kendt«.</small>

**Ida:** Bjørn Nørgaards gobeliner. 17 vævede billeder af Danmarks og verdens historie. De blev hængt op i 2000.

**Se på etuiet**

<small>Kræver: har ikke Elefantordenen.</small>

*I et åbent etui på det dækkede langbord ligger Elefantordenen: en lille elefant af guld, emalje og diamanter med et tårn på ryggen.*

**Se på etuiet**

<small>Kræver: har Elefantordenen.</small>

*Etuiet er tomt. Kun det lyseblå bånd ligger tilbage, og hoffoureren holder øje med det.*

### Finansministeriet

I spillet: inde: finance (bygget).

Lås: har Gæstekort til Finansministeriet. »En vagt i foyeren: »Kun med adgangskort i dag. Forhandlingerne er ikke slut.««

### Finansministeriets garderobe

I spillet: inde: finance/fm-wardrobe (bygget). Ligger i Finansministeriet.

**Se på knagerne**

<small>Giver: »presselisten«.</small>

*Ved knagerne hænger nattens presseliste: »Strandvig, Dagbladet Nordlyset: pressekort 17«.*

### Finansministeriets forhandlingsrum

I spillet: inde: finance/fm-meeting (bygget). Ligger i Finansministeriet.

**Læs referatet**

<small>Giver: spor 9 (Referatet).</small>

*Nattens referat ligger stadig på det lange bord.*  
*»23.40: A. Mørkeberg beder om at se departementets beregninger. H. Valdorf: De kommer i nat.«*  
*»01.00-03.30: Ministeren til stede. 01.30: Departementschefen forlader mødet for at regne. 02.50: Departementschefen tilbage med nye tabeller.«*  
**Ida:** Han var væk i en time og tyve minutter.

### Reformministeriet

I spillet: inde: reform (bygget).

Åben, når: akt 3 eller senere. Ellers: »Hoveddøren er låst. Ministeriet åbner kl. 8.30.«

### Departementschefens kontor

I spillet: inde: reform/rm-office (bygget). Ligger i Reformministeriet.

Lås: kode 1849, »kode hint«. »En kodelås med fire cifre. Ida ved ikke, hvad koden er.«

**Se dig om på kontoret**

<small>Giver: spor 15 (Valdorfs kontor).</small>

*På væggen hænger en tavle med sømandsknob: pælestik, råbåndsknob og dobbelt halvstik.*  
*Over stolen hænger en mørk sejlerjakke, der stadig er fugtig. Under skrivebordet står et par sejlersko med bølgemønster i sålen.*  
*På skærmen er mailen åben: »Nye beregninger til forhandlerne«. Skrevet kl. 23.12. Sat til at sende sig selv kl. 02.05.*  
**Ida:** Han var ikke her kl. 02.05. Mailen sendte sig selv.

**Se i jakkens lommer**

<small>Kræver: spor 15 (Valdorfs kontor), endnu ikke »bådnøgle fundet«. Giver: Ida får Bådnøglen, spor 22 (Bådnøglen), »bådnøgle fundet«.</small>

*I inderlommen ligger en nøgle med en rød flyder: »Bådlauget ved Gammel Strand«.*

### Reformministeriets printerområde

I spillet: inde: reform/rm-print (bygget). Ligger i Reformministeriet.

**Se på printerens log**

<small>Giver: »printlog«.</small>

*Printer RM-DC-01. I går kl. 18.05: 1 side. I nat kl. 02.36: 14 sider.*

### Reformministeriets sidedør

I spillet: inde: reform/rm-side (bygget). Ligger i Reformministeriet.

**Se på sidedøren**

<small>Giver: »kile«.</small>

*Ved sidedøren ligger en gummikile. Døren kan kun åbnes indefra, men med en kile kan den stå på klem.*  
**Ida:** Så kan man gå ud og ind uden kort og uden at stå i nogen log.

### Kajen ved Reformministeriet

I spillet: ude: Kajen ved Reformministeriet (bygget).

**Se på båden**

<small>Kræver: »mødt bente«. Giver: spor 12 (Den røde båd).</small>

*Bådlaugets lille røde båd ligger ved kajen ved Reformministeriet. Den plejer at ligge ved Gammel Strand.*  
*Den er bundet til ringen med et pænt pælestik. De andre både i bådlauget er bundet med noget, der mest ligner en sløjfe.*  
*Om stævnen sidder en kæde med en hængelås.*  
**Ida:** Nogen, der kan sine knob, har sejlet den herover.

**Sejl med båden**

<small>Kræver: har Bådnøglen. Giver: »sejlet«.</small>

*Bådnøglen passer i hængelåsen. Kæden falder i vandet med et klask, og motoren starter.*

**Tag tid på turen til Folketinget**

<small>Kræver: »sejlet«. Giver: »tidsprøve«.</small>

*Ida starter stopuret, sejler over kanalen, lægger til ved kajen ved Slotspladsen og går gennem porten til døren i Rigsdagsgården.*  
*Stopuret viser {tid}.*  
**Ida:** Fra 01.44 til 01.52 er der 8 minutter. Det kan nås.

### Kanalen ved den gamle fortøjningspæl

I spillet: ude: kanalen, fra båden (skal bygges).

Åben, når: »sejlet«. Ellers: »Fortøjningspælen står midt i kanalen. Man kan kun komme derud med båd.«

**Kig ned i vandet ved fortøjningspælen**

<small>Giver: spor 14 (Termokanden).</small>

*Midt i kanalen står en gammel fortøjningspæl. Fra båden kan Ida se ned i det klare vand ved den.*  
*På bunden ligger en rød termokande med Kompaspartiets kompasrose.*  
**Ida:** Her kan ingen se den fra kajen. Han smed den på vej tilbage.

### Bibliotekshaven

I spillet: ude: Bibliotekshaven (bygget).

**Se på bænken ved Kierkegaard**

<small>Kræver: endnu ikke »briller fundet«. Giver: Ida får Bentes læsebriller, »briller fundet«.</small>

*På bænken ved statuen ligger et par læsebriller i rødt stel med en snor. På stangen står der »B.H.«*  
**Ida:** Bente Holmsgaard. Hun har siddet her i nat.

**Se på statuen** (Idas viden)

**Ida:** Søren Kierkegaard i bronze fra 1918. Man siger, han kigger mod den mur, hvor Regine Olsen boede.

**Se på ringen i muren** (Idas viden)

**Ida:** En gammel fortøjningsring. Der var havn her engang, og den lille dam er en rest af den. Her lagde skibe til.

**Se på gruset**

<small>Kræver: »mødt bente«. Giver: »fodspor haven«.</small>

*Våde fodspor i gruset fra gangen og hen bag statuen. Sålerne har et mønster af små bølger.*  
**Ida:** Det regnede til halv tre i nat, så de er fra i nat. Nogen har stået gemt bag Kierkegaard.

**Se i bassinet**

<small>Kræver: endnu ikke »springvand 09«.</small>

*Vandet er mørkt og stille. Springvandet er slukket om natten og springer først kl. 9.*

**Saml papirerne op ved kanten**

<small>Kræver: »springvand 09«. Giver: spor 20 (Papirerne i springvandet).</small>

*Strømmen fra springvandet har skyllet to stykker papir ud til kanten.*  
*Det ene er en side revet ud af en lille sort notesbog. Det andet er en våd tabel: »Fremtidsreformen. Beskæftigelseseffekt: 4.000.« Nederst: »Printet 18.05, printer RM-DC-01.«*  
**Ida:** RM-DC. Reformministeriet, departementschefen. Og siden passer til hullet i Mørkebergs notesbog.

### Betjentstuen, juni 1942

I spillet: inde: folketing/betjent (1942) (skal bygges).

Åben, når: 1942-laget er slået til, »i 1942«.

**Drej radioen tilbage**

<small>Kræver: »i 1942«. Giver: slutter »i 1942«.</small>

*Radioen knitrer. Lyset bliver hvidt igen, og Bentes kaffekop står, hvor den stod. Det er 2026.*

### Ridebanen, juni 1942

I spillet: ude: Ridebanen (1942) (skal bygges).

Åben, når: 1942-laget er slået til, »i 1942«.

**Saml handsken op**

<small>Kræver: »handske tabt«, endnu ikke »handske samlet«. Giver: Ida får Kongens handske, »handske samlet«.</small>

*Ida samler handsken op. Den er af blødt brunt læder og stadig varm.*

## Ting i rygsækken

| Ting | Beskrivelse |
| --- | --- |
| Blyant (fra start) | En blød blyant. Ida bruger den i arkiverne, hvor kuglepenne er forbudt. |
| Notesbog (fra start) | Idas egen notesbog med spor, personer og en tidslinje. |
| Mobil (fra start) | Med lommelygte og stopur. 38 procent strøm. |
| Studiekort (fra start) | Københavns Universitet, Saxo-Instituttet. Det åbner ingen døre på Christiansborg. |
| Bentes læsebriller | Læsebriller i rødt stel med en snor. På stangen står der »B.H.« |
| Nøglen til Samtaleværelset | En gammel messingnøgle med et mærke: »Samtaleværelset«. |
| Kaspers gamle adgangskort | Et vådt adgangskort til Folketinget: »Kasper Lindved, Kompaspartiet«. Det udløb for et år siden, men ingen har spærret det. |
| 50.000-rapporten | »Arbejdsudbud uden besvær« fra konsulenthuset Prognosehuset Optima. På forsiden: »Op til 50.000 flere i arbejde«. |
| Gæstekort til Finansministeriet | Et hvidt gæstekort med nummer 31. Ditte Rosenvinge har skrevet sine initialer på bagsiden. |
| Jonas' telefon | En telefon i et etui med Kompaspartiets kompasrose. Skærmen er låst, men beskederne kan ses. |
| Gulerødder | Tre skrællede gulerødder i en papirpose fra Snapstinget. |
| Elefantordenen | Danmarks fornemste orden: en lille elefant af guld, emalje og diamanter med et tårn på ryggen. Den skal tilbage i Riddersalen før kl. 10. |
| Bådnøglen | En nøgle med en rød flyder: »Bådlauget ved Gammel Strand«. |
| Kongens handske (1942) | En brun ridehandske i blødt læder. |
| Kongens nøgle (1942) | En lille messingnøgle med en krone. Den har hængt bag en hestesko i over 80 år. |

## Sporene i notesbogen

| Nr. | Spor | Sted | I notesbogen |
| --- | --- | --- | --- |
| 1 | Liget og termokanden | Vandrehallen og Rigets midte | Aksel Mørkeberg sidder død i sofaen ved Rigets midte. Ingen tegn på kamp. Hans røde termokande, som han altid har med, er væk. Senere: Retsmedicineren: Han fik noget i kaffen og døde mellem kl. 02 og 03. |
| 2 | Koppen med læbestift | Vandrehallen og Rigets midte | En kaffekop med rød læbestift på bordet ved sofaen. Nogen har siddet hos ham i nat. |
| 3 | Adgangsloggen | Betjentstuen | Pressekort 17 ind ad døren i Rigsdagsgården kl. 01.52 og ud kl. 02.24. Kasper Lindveds gamle kort ind ved Proviantpassagen kl. 01.30 og ud kl. 02.22. |
| 4 | Mødet kl. 2 | Betjentstuen | Kl. 01.30 bad Mørkeberg Bente låse Samtaleværelset op. Han skulle mødes kl. 2 med »en fra den anden side af kanalen«. Kl. 3 sad han i sofaen, og Bente troede, han sov. |
| 5 | Samtaleværelset | Samtaleværelset | To stole trukket ud. En kafferand på bordet, for stor til en kop og lige stor nok til en termokande. Under bordet våde fodspor med bølgemønster som fra sejlersko. |
| 6 | Notesbogen | Vandrehallen og Rigets midte | En side er revet ud af Mørkebergs notesbog. Blyanten fik aftrykket frem: »11.000? Kun 4.000. Dept. har vidst det siden maj. Kl. 10 siger jeg det.« |
| 7 | Pernille og pressekort 17 | Slotspladsens presseområde | Pernille Strandvig var direkte i radioen fra Slotspladsen kl. 01.45-02.05, så hun kan ikke have brugt kortet kl. 01.52. Pressekort 17 er hendes. Det forsvandt fra hendes frakke i Finansministeriets garderobe under briefingen kl. 23 og lå i lommen igen i morges. |
| 8 | Jonas Fengers telefon | Kompaspartiets mødelokale | Jonas glemte sin telefon i Kompaspartiets mødelokale efter et videomøde med hovedbestyrelsen kl. 01.45-02.40. En besked viser, at han mødte Pernille ved springvandet kl. 23.30. Han er hendes kilde. Han og Mørkeberg skændtes om lækket kl. 23.50. |
| 9 | Referatet | Finansministeriets forhandlingsrum | Finansministeriets referat: Kl. 23.40 beder Mørkeberg om at se departementets beregninger. Ditte er i forhandlingsrummet kl. 01.00-03.30. Valdorf går kl. 01.30 for at »regne på tallene« og kommer tilbage kl. 02.50. |
| 10 | Kopimaskinens log | Kompaspartiets sekretariat | Kasper Lindveds kort kopierede 212 sider i Kompaspartiets sekretariat kl. 01.38-02.12. Han er tyv, ikke morder. |
| 11 | Manden på trappen | Snapstinget | Kasper så kl. 02.20 en mand i våd, mørk sejlerjakke gå ned ad trappen mod udgangen i Rigsdagsgården med noget rødt under armen. |
| 12 | Den røde båd | Kajen ved Reformministeriet | Bådlaugets lille røde båd fra Gammel Strand ligger ved kajen ved Reformministeriet. Den er bundet med et pænt pælestik. De andre både i bådlauget er bundet med sjuskede knob. |
| 13 | Svends billeder | Højbro | Svend Lysholts nattebilleder fra Højbro viser lyset fra en lille båd over kanalen fra Ved Stranden mod Slotspladsen kl. 01.44 og tilbage kl. 02.31. |
| 14 | Termokanden | Kanalen ved den gamle fortøjningspæl | Den røde termokande med Kompaspartiets kompasrose ligger på bunden ved den gamle fortøjningspæl midt i kanalen. Den kan kun ses fra båden. Nogen har smidt den. |
| 15 | Valdorfs kontor | Departementschefens kontor | Knobtavle på væggen, en fugtig sejlerjakke og sejlersko med bølgemønster. Mailen med de nye tal blev skrevet kl. 23.12 og sat til at sende sig selv kl. 02.05. |
| 16 | Fortalelsen | Udsigten | På Udsigten sagde Valdorf, at reformen er god, »om den så giver 11.000 eller 4.000 job«. Ingen har sagt tallet 4.000 til ham. Det står kun i Mørkebergs notesbog og i papirerne fra springvandet. |
| 17 | Gry og den faste runde | Ridebanen | Mørkeberg gik sin faste runde på Ridebanen ved midnat og sagde: »I morgen kl. 10 falder der en bombe.« Han var inde i sadelkammeret et øjeblik. Det plejer han ikke. |
| 18 | Bodil og termokanden | Snapstinget | Bodil fyldte termokanden kl. 21.30 med sort kaffe og to stykker sukker. Kun Mørkeberg drak af den. Hvis der kom noget i kaffen, kom det senere. |
| 19 | Bentes runde | Betjentstuen | Kl. 02.25 hørte Bente gruset knase i gangen mod Bibliotekshaven. Hun gik derind, satte sig på bænken ved Kierkegaard for at læse en sms og glemte sine briller. Hun troede, det var en ræv. |
| 20 | Papirerne i springvandet | Bibliotekshaven | Våde fodspor fra gangen hen bag Kierkegaard-statuen. Da springvandet sprang, flød den udrevne side og en tabel ud til kanten. Tabellen viser 4.000 job og er printet i går kl. 18.05 på departementschefens printer. |
| 21 | Den gemte tabel | Sadelkammeret | I sadelkammeret har Mørkeberg gemt Reformministeriets tabel fra maj: 4.000 flere i job. I margenen står med hans håndskrift: »Kl. 10.« |
| 22 | Bådnøglen | Departementschefens kontor | I lommen på Valdorfs sejlerjakke: nøglen med bådlaugets røde flyder. Den passer til hængelåsen på den røde båd ved kajen. |

## Begivenheder

### Kl. 06.10: moede bente

<small>Sker, når: Ida er ved Rigsdagsgården. Giver: »mødt bente«.</small>

*Bente står i døren til Folketinget. Hun er bleg og holder om en kop kaffe, hun har glemt at drikke.*  
**Bente:** Ida? Du kommer på en dårlig dag.  
**Bente:** Aksel Mørkeberg er død. Rengøringen fandt ham for tyve minutter siden i sofaen ved Rigets midte. Politiet er på vej.  
**Bente:** Kom indenfor. Men rør ikke ved noget.

### Kl. 06.20: kommissaeren

<small>Sker, når: spor 1 (Liget og termokanden). Giver: »kommissær kommet«.</small>

*En mand i våd trenchcoat kommer op ad trappen med en kaffe i papkrus.*  
**Hald:** Hald, Københavns Politi. Og hvem er De?  
**Ida:** Ida. Jeg læser historie. Jeg skriver om huset.  
**Hald:** Så skriv om noget andet i dag.  
**Hald:** Sikkerhedsafdelingen har sendt mig nattens log. Kasper Lindveds gamle kort gik ind kl. 01.30. Han blev fyret af Mørkeberg sidste år. Det er nok til mig.  
**Hald:** Og alle taler om en forsvundet termokande. Termokander forsvinder hver dag på Christiansborg.

### Kl. 06.30: statsministeren

<small>Sker, når: »kommissær kommet«. Giver: »bente beder«.</small>

*Tre sorte biler kører ind i Rigsdagsgården. Lidt efter står statsministeren i Vandrehallen med to livvagter bag sig.*  
**Statsministeren:** Hald. Hvad ved vi?  
**Hald:** Vi har vores mand. Kasper Lindved. Jeg kan sige det på pressemødet kl. 10.  
**Statsministeren:** Så holder pressemødet. Danmark venter på en reform, ikke på en krimi.  
*Hun går igen. Bente trækker Ida til side.*  
**Bente:** Kasper er en klovn, men han er ikke en morder. Jeg har kendt ham, siden han var praktikant.  
**Bente:** Du kender husets historie bedre end politiet, og du er god til at finde ting i gamle papirer. Hjælp mig. Vi har til kl. 10.

### Kl. 07.30: valdorf kommer

<small>Sker, når: akt 2 eller senere, spor 7 (Pernille og pressekort 17) eller spor 8 (Jonas Fengers telefon) eller spor 10 (Kopimaskinens log) eller spor 18 (Bodil og termokanden). Giver: »valdorf her«.</small>

*En mand i gråt jakkesæt kommer op ad trappen med en mappe under armen. Han nikker venligt til alle.*  
**Valdorf:** Henrik Valdorf, departementschef i Reformministeriet. Ministeren har bedt mig hjælpe politiet med alt, hvad de har brug for.

### Kl. 08.30: retsmed

<small>Sker, når: akt 3 eller senere. Giver: »retsmed«.</small>

*Kommissæren lægger sin telefon fra sig i Vandrehallen og hæver stemmen.*  
**Hald:** Retsmedicineren har ringet. Mørkeberg fik noget i kaffen og døde mellem kl. 2 og 3. Ingen siger et ord til pressen.  
*Reformministeriet åbner, og hoffet begynder at dække op i Riddersalen.*

### Kl. 09.00: springvandet

<small>Sker, når: akt 3 eller senere, Ida er ved Bibliotekshaven. Giver: »springvand 09«.</small>

*Springvandet i Bibliotekshaven springer for første gang i dag. Vandet løber ned over skålen og ud i bassinet.*  
*Ved kanten af bassinet flyder noget hvidt op.*

### Kl. 09.30: valdorf venter

<small>Sker, når: akt 4 eller senere. Giver: »valdorf venter«.</small>

*Idas mobil ringer. Det er Bente.*  
**Bente:** Departementschefen spørger efter dig. Han venter på Udsigten i tårnet. Han siger, han vil hjælpe.

### Kl. 09.55: pressemoedet

<small>Sker, når: spor 16 (Fortalelsen). Giver: »pressemøde«.</small>

*Idas mobil summer. En sms fra Bente: »Pressemødet begynder om fem minutter i Landstingssalen. Kommissæren har sit papir klar.«*

### orden paamindelse

<small>Sker, når: akt 4 eller senere, har Elefantordenen.</small>

*Elefantordenen ligger stadig i Idas rygsæk. Hoffoureren tæller elefanter, og Riddersalen er stadig åben.*

### kongen rider

<small>Sker, når: 1942-laget er slået til, »i 1942«, Ida er ved Ridebanen, juni 1942. Giver: »handske tabt«.</small>

*En høj, ældre rytter kommer ridende uden følge. Folk på fortovet løfter hatten, og han hilser igen.*  
*Ved Ridebanen glider en handske ned fra hans hånd og lander i gruset.*

### Hvis en patrulje ser Ida i 1942

*En tysk patrulje får øje på Ida. »Halt! Papiere!«*  
*Ida løber tilbage til betjentstuen og drejer på radioen. Hun er i 2026 igen.*

## Bentes hint

Spillet viser det første hint på listen, hvis betingelse passer.

1. Gå til Folketingets indgang i Rigsdagsgården. Bente venter i døren. <small>(endnu ikke »mødt bente«)</small>
2. Gå ud til Ridebanen. Kongen rider forbi hver morgen. Pas på patruljerne. <small>(»i 1942«, endnu ikke »kongen takket«)</small>
3. Drej radioen tilbage for at komme hjem til 2026. <small>(»i 1942«)</small>
4. Gå op i Vandrehallen. Han sidder i den grønne sofa ved Rigets midte. <small>(mangler spor 1 (Liget og termokanden))</small>
5. Se på bordet ved sofaen. Der står noget, der ikke burde stå der. <small>(mangler spor 2 (Koppen med læbestift))</small>
6. Aksel havde altid sin lille sorte notesbog på sig, men den er ikke i hans lommer. Lys under sofaen med din mobil. <small>(endnu ikke »notesbog fundet«)</small>
7. Når nogen skriver hårdt på en side, kan man se trykket på den næste. Har du ikke en blyant i rygsækken? <small>(mangler spor 6 (Notesbogen))</small>
8. Kommissæren og statsministeren kommer om lidt. Lad os høre, hvad de siger. <small>(endnu ikke »bente beder«)</small>
9. Er det mine briller? Giv mig dem, så kan vi se loggen. <small>(har Bentes læsebriller)</small>
10. Uden mine briller kan jeg ikke se tasterne. Jeg satte mig vist på en bænk i Bibliotekshaven på min runde. <small>(endnu ikke »briller givet«)</small>
11. Kl. 01.52? Spørg mig, hvad der skete omkring kl. 2. Der var noget med Samtaleværelset. <small>(mangler spor 4 (Mødet kl. 2))</small>
12. Nøglen passer til Samtaleværelset. Dørene er midt i Vandrehallen. <small>(mangler spor 5 (Samtaleværelset))</small>
13. Bodil i Snapstinget fylder Aksels termokande hver aften. Spørg hende. <small>(akt 2 eller senere, mangler spor 18 (Bodil og termokanden))</small>
14. Kaspers kort gik ind ved Proviantpassagen. Det har regnet i nat. Se efter i vandpytterne. <small>(akt 2 eller senere, endnu ikke »kort fundet«)</small>
15. Kaspers gamle kort åbner nok stadig Kompaspartiets sekretariat. Ingen har spærret det. <small>(akt 2 eller senere, mangler spor 10 (Kopimaskinens log))</small>
16. Pressen står på Slotspladsen. Spørg, hvem der havde pressekort 17. <small>(akt 2 eller senere, mangler spor 7 (Pernille og pressekort 17))</small>
17. Jonas leder efter sin telefon. Giv ham den, og hør, hvad han siger. <small>(akt 2 eller senere, mangler spor 8 (Jonas Fengers telefon), har Jonas' telefon)</small>
18. Jonas holdt videomøde i Kompaspartiets mødelokale i nat. Måske har han glemt noget derinde. <small>(akt 2 eller senere, mangler spor 8 (Jonas Fengers telefon))</small>
19. Ministeren er i restauranten i tårnet. Hun vil gøre meget for en god rapport. <small>(akt 2 eller senere, endnu ikke »ditte renset«, har 50.000-rapporten)</small>
20. Der lå vist en rapport på kopimaskinen i Kompaspartiets sekretariat. <small>(akt 2 eller senere, endnu ikke »ditte renset«, endnu ikke »rapport taget«)</small>
21. Ministeren drak kaffe med Aksel i nat. Hun er i restauranten i tårnet. <small>(akt 2 eller senere, endnu ikke »ditte renset«)</small>
22. Vis Kasper kopimaskinens log. Så tør han måske fortælle, hvad han så. <small>(spor 10 (Kopimaskinens log), mangler spor 11 (Manden på trappen))</small>
23. Med ministerens gæstekort kommer du ind i Finansministeriet. Referatet ligger i forhandlingsrummet. <small>(akt 3 eller senere, mangler spor 9 (Referatet))</small>
24. Springvandet i Bibliotekshaven springer om lidt. Gå derud, og se efter i bassinet. <small>(akt 3 eller senere, mangler spor 20 (Papirerne i springvandet))</small>
25. Se på båden ved kajen over for Reformministeriet. Hvem har bundet den? <small>(akt 3 eller senere, mangler spor 12 (Den røde båd))</small>
26. Mogens Brask i Landstingssalen har drømt om den orden hele livet. Vis ham den. <small>(akt 3 eller senere, endnu ikke »mogens talt«, har Elefantordenen)</small>
27. Hoffet dækker op i Riddersalen. Hoffoureren holder af folk, der kender hans gobeliner. <small>(akt 3 eller senere, endnu ikke »mogens talt«, endnu ikke »gobelin kendt«)</small>
28. Lån Elefantordenen hos hoffoureren i Riddersalen, og vis den til Mogens i Landstingssalen. <small>(akt 3 eller senere, endnu ikke »mogens talt«)</small>
29. Året for den første grundlov. Det står i montrerne i Vandrehallen. Departementschefens kontor ligger i Reformministeriet. <small>(akt 3 eller senere, mangler spor 15 (Valdorfs kontor))</small>
30. Se i lommerne på den jakke. <small>(spor 15 (Valdorfs kontor), mangler spor 22 (Bådnøglen))</small>
31. En bådnøgle? Den røde båd ligger ved kajen over for Reformministeriet. <small>(har Bådnøglen, endnu ikke »sejlet«)</small>
32. Sejl ud til den gamle fortøjningspæl midt i kanalen, og kig ned. Vandet er klart i dag. <small>(»sejlet«, mangler spor 14 (Termokanden))</small>
33. Giv Vega en gulerod. Hun står foran sadelkammeret i staldene. <small>(akt 3 eller senere, endnu ikke »hesten flyttet«, har Gulerødder)</small>
34. Gry siger, at Aksel var i sadelkammeret i nat. Men Vega står i vejen, og hun flytter sig kun for en gulerod fra Snapstinget. <small>(akt 3 eller senere, endnu ikke »hesten flyttet«)</small>
35. Kongen sagde: bag den tredje hestesko over staldporten. <small>(1942-laget er slået til, mangler spor 21 (Den gemte tabel), har ikke Kongens nøgle, »kongen takket«)</small>
36. Er skabet låst? Min farfar sagde altid, at kongen gemte nøgler bag hestesko. Og hans gamle radio har altid været lidt mærkelig. <small>(1942-laget er slået til, mangler spor 21 (Den gemte tabel), har ikke Kongens nøgle)</small>
37. Se i det gamle sadelskab inderst i sadelkammeret. <small>(mangler spor 21 (Den gemte tabel))</small>
38. Har du stadig Elefantordenen? Hoffoureren tæller elefanter. Riddersalen er åben. <small>(akt 4 eller senere, »orden ude«)</small>
39. Departementschefen venter på dig på Udsigten i tårnet. <small>(akt 4 eller senere, mangler spor 16 (Fortalelsen))</small>
40. Pressemødet begynder i Landstingssalen. Gå derind, og ræk hånden op. <small>(spor 16 (Fortalelsen))</small>
41. Svend står på Højbro hver nat med sit kamera. Måske så han noget. <small>(akt 3 eller før, mangler spor 13 (Svends billeder))</small>

## Afsløringen

I Landstingssalen kl. 10.00. Begynder, når: »pressemøde«.

*Landstingssalen er fuld. Kameraerne står bagerst, og de mistænkte sidder på forreste række. Bente står ved døren.*  
**Hald:** Mine damer og herrer. Vi har anholdt en mand for mordet på Aksel Mørkeberg. Han hedder...  
**Ida:** Undskyld. Jeg tror, De tager fejl.  
**Statsministeren:** Lad hende tale, Hald. Vi har ventet hele morgenen. To minutter mere gør ingen forskel.

### Hvem slog Aksel Mørkeberg ihjel?

Spilleren lægger mindst 2 af disse spor frem: spor 11 (Manden på trappen), spor 15 (Valdorfs kontor), spor 16 (Fortalelsen), spor 20 (Papirerne i springvandet), spor 22 (Bådnøglen).

- **Rigtigt:** Henrik Valdorf
- Ditte Rosenvinge. Ditte: »Jeg sad i forhandlingsrummet fra kl. 1 til halv fire. Ni mennesker og et referat kan bekræfte det.«
- Jonas Fenger. Jonas: »Jeg sad i videomøde med hele hovedbestyrelsen fra 01.45 til 02.40. Der er en optagelse.«
- Pernille Strandvig. Pernille: »Jeg var jo i radioen kl. 01.52! Fra 01.45 til 02.05. Spørg teknikeren.«
- Kasper Lindved. Kasper: »Jeg stjal nogle papirer. Kopimaskinen kan bevise, hvor jeg var hele tiden.«

### Hvordan døde han?

Spilleren lægger mindst 2 af disse spor frem: spor 1 (Liget og termokanden), spor 5 (Samtaleværelset), spor 14 (Termokanden), spor 18 (Bodil og termokanden).

- **Rigtigt:** Der kom noget i kaffen fra termokanden under mødet i Samtaleværelset
- Der kom noget i kaffen i Snapstinget. Bodil: »Jeg fyldte kanden kl. 21.30, og han drak af den hele aftenen. Retsmedicineren siger, han døde mellem 2 og 3.«
- Der var noget i koppen med læbestift. Ditte: »Det var min kop. Jeg drak selv af den, og jeg står her endnu.«
- Han blev slået ned ved Rigets midte. Hald: »Der er ingen tegn på kamp. Det siger retsmedicineren også.«

### Hvordan kom morderen ind og ud uden at blive set?

Spilleren lægger mindst 2 af disse spor frem: spor 3 (Adgangsloggen), spor 7 (Pernille og pressekort 17), spor 12 (Den røde båd), spor 13 (Svends billeder), spor 19 (Bentes runde), spor 22 (Bådnøglen).

- **Rigtigt:** Med båden over kanalen og Pernilles stjålne pressekort 17
- Med Kaspers gamle kort gennem Proviantpassagen. Kasper: »Det var mig, der brugte det kort. Kopimaskinen viser, at jeg stod i sekretariatet hele tiden.«
- Over broen forbi pressen. Pernille: »Så havde vi set ham. Vi så ham gå over kl. halv to og komme tilbage kl. 02.50. Ikke ind imellem.«
- Han var aldrig væk fra sit kontor. Mogens: »Jeg så ham ved printeren kl. 02.36, og han var våd i håret. Det regner ikke indenfor.«

### Hvorfor?

Spilleren lægger mindst 2 af disse spor frem: spor 6 (Notesbogen), spor 9 (Referatet), spor 17 (Gry og den faste runde), spor 20 (Papirerne i springvandet), spor 21 (Den gemte tabel).

- **Rigtigt:** Mørkeberg ville sige kl. 10, at reformen giver 4.000 job og ikke 11.000
- Mørkeberg ville stemme nej til reformen. Ditte: »Han havde lige sagt ja til mit sidebrev. Han ville stemme ja.«
- Mørkeberg ville være formand en periode til. Jonas: »Det var mit problem, ikke en departementschefs.«
- Mørkeberg ville afsløre en kilde i pressen. Pernille: »Det havde ramt Jonas og mig. Ikke Reformministeriet.«

Forkert spor: **Hald:** Det spor beviser ikke det, De siger. Prøv igen.

Efter tre forkerte svar:

**Hald:** Nu er det nok. Kasper Lindved, De er anholdt.  
**Valdorf:** Synd. Det var et godt forsøg.  
*Kommissæren fører Kasper ud. Men Bente stiller sig i døren og ser på Ida. Prøv igen.*

### Tilståelsen

*Der bliver helt stille i Landstingssalen. Valdorf retter på sit slips.*  
**Valdorf:** Jeg har lavet regnestykker for staten i 30 år. Ingen af dem har været forkerte. Ikke før det her.  
**Valdorf:** I maj kom vi frem til 4.000. Ministeren havde allerede sagt 11.000 i tv. Så jeg lod tallet stå og troede, at ingen ville regne efter.  
**Valdorf:** I går aftes sagde Aksel til mig på gangen: »Jeg har set jeres tal fra maj, Henrik. Vi taler sammen i nat, ellers siger jeg det kl. 10.« Mit navn står under hver eneste side.  
**Valdorf:** Jeg ville have ham til at forstå. Det gjorde han ikke.  
**Hald:** Henrik Valdorf, De er anholdt for mordet på Aksel Mørkeberg.  
**Hald:** Godt gået. Men De rørte ved alt.  
**Bente:** Jeg sagde jo, at du kender huset.

### Stjerner

- 3 stjerner: Ingen forkerte svar og højst 2 hint
- 2 stjerner: Højst 3 forkerte svar og højst 6 hint
- 1 stjerner: Gåden er løst

## Efterskrift

*Pressemødet bliver aflyst. Samme eftermiddag lægger Reformministeriet det rigtige regnestykke frem: 4.000 flere i job.*  
*Tre uger senere bliver Fremtidsreformen alligevel vedtaget med et nyt sidebrev og 4.100 flere i job.*  
*Jonas Fenger bliver formand for Kompaspartiet. Pernille Strandvig får sin forside. Kaspers gamle adgangskort bliver endelig spærret.*  
*Ida får et nyt kapitel til sit speciale. Hun kalder det »Rigets midte, kl. 02.00«.*

Hvis Elefantordenen ikke er lagt tilbage:

*Ved aftenens gallamiddag mangler der en elefant. Hoffoureren finder den dagen efter i Idas rygsæk.*  
*Ida får aldrig lov at låne noget i Riddersalen igen.*

## Tidslinjen i notesbogen

| Kl. | Hvad skete | Kommer frem, når |
| --- | --- | --- |
| 21.30 | Bodil fylder Mørkebergs termokande i Snapstinget | spor 18 (Bodil og termokanden) |
| 22.00 | Det begynder at regne. Det holder op kl. 02.30 |  |
| 23.05 | Pressekort 17 forsvinder fra Pernilles frakke i Finansministeriet | spor 7 (Pernille og pressekort 17) |
| 23.12 | Mailen med de nye tal bliver skrevet på Valdorfs kontor | spor 15 (Valdorfs kontor) |
| 23.30 | Jonas møder Pernille ved springvandet i Bibliotekshaven | spor 8 (Jonas Fengers telefon) |
| 23.40 | Mørkeberg beder om at se departementets beregninger | spor 9 (Referatet) |
| 23.50 | Jonas og Mørkeberg skændes på gangen i Finansministeriet | spor 8 (Jonas Fengers telefon) |
| 00.15 | Mørkeberg går sin faste runde på Ridebanen og er inde i sadelkammeret | spor 17 (Gry og den faste runde) |
| 00.30 | Ditte drikker kaffe med Mørkeberg ved Rigets midte til 00.55 | »ditte kop« |
| 01.30 | Mørkeberg beder Bente låse Samtaleværelset op | spor 4 (Mødet kl. 2) |
| 01.30 | Kaspers gamle kort går ind ved Proviantpassagen | spor 3 (Adgangsloggen) |
| 01.30 | Valdorf forlader forhandlingsrummet for at »regne på tallene« | spor 9 (Referatet) |
| 01.38 | Kasper kopierer i sekretariatet til 02.12 | spor 10 (Kopimaskinens log) |
| 01.44 | En lille båd krydser kanalen mod Slotspladsen | spor 13 (Svends billeder) |
| 01.45 | Pernille er direkte i radioen fra Slotspladsen til 02.05 | spor 7 (Pernille og pressekort 17) |
| 01.45 | Jonas er i videomøde med hovedbestyrelsen til 02.40 | spor 8 (Jonas Fengers telefon) |
| 01.52 | Pressekort 17 går ind ad døren i Rigsdagsgården | spor 3 (Adgangsloggen) |
| 02.00 | Mødet i Samtaleværelset | spor 4 (Mødet kl. 2) |
| 02.05 | Mailen med de nye tal sender sig selv | spor 15 (Valdorfs kontor) |
| 02.20 | En mand i våd sejlerjakke går ned ad trappen med noget rødt | spor 11 (Manden på trappen) |
| 02.22 | Kaspers kort går ud ved Proviantpassagen | spor 3 (Adgangsloggen) |
| 02.24 | Pressekort 17 går ud ad døren i Rigsdagsgården | spor 3 (Adgangsloggen) |
| 02.25 | Bente hører gruset knase i gangen mod Bibliotekshaven | spor 19 (Bentes runde) |
| 02.31 | Den lille båd krydser kanalen tilbage | spor 13 (Svends billeder) |
| 02.31 | Termokanden ryger i vandet ved den gamle fortøjningspæl | spor 13 (Svends billeder), spor 14 (Termokanden) |
| 02.36 | Mogens ser Valdorf ved printeren, våd i håret | »valdorf våd« |
| 02.50 | Valdorf er tilbage i forhandlingsrummet med nye tabeller | spor 9 (Referatet) |
| 02-03 | Mørkeberg dør i sofaen | »retsmed« |
| 03.00 | Bente låser Samtaleværelset og tror, Mørkeberg sover | spor 4 (Mødet kl. 2) |
| 05.50 | Rengøringen finder Mørkeberg | spor 1 (Liget og termokanden) |

## 1942-laget

Ekstralaget med 1942 bliver bygget til sidst. Når aktiv er false, er sadelskabet ikke låst, radioen virker ikke, og resten af gåden er den samme. Laget er slået fra.
