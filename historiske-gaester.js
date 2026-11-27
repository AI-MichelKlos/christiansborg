// To valgfrie møder i ?spor=jul. Folketingets portrætgalleri er kilde til placeringen
// og til Ankers ord ved afsløringen af Jørgen Bobergs portræt i 1998:
// https://www.ft.dk/da/folkestyret/folketinget-og-christiansborg/kunst-paa-borgen_statsministerportraetter
// Figurerne og rammen er frie fortolkninger. Staunings julereplik er skrevet til spillet.
export function historiskeGaester({ THREE, menneske, ctex, dyn, I, groundAt, horses, offerAction, scene, reduceMotion }) {
  function oval(part, material, parent, pos, size) {
    const form = part(new THREE.SphereGeometry(1, 14, 10), material, parent, ...pos, 0);
    form.scale.set(...size);
    return form;
  }

  function habit(g, part, m, foran, revers, skjorte, slips) {
    const felt = (punkter, farve, lag) => {
      const geo = new THREE.BufferGeometry().setFromPoints(punkter.map(([x,y]) => new THREE.Vector3(x, y, foran(y) + lag)));
      geo.setIndex([0, 1, 2]); geo.computeVertexNormals();
      // Both left and right lapels face outwards on the character.
      if (geo.attributes.normal.getZ(0) < 0) { geo.setIndex([2,1,0]); geo.computeVertexNormals(); }
      part(geo, m(farve), g, 0, 0, 0, 0);
    };
    // Follow the changing chest radius so the shirt and tie stay above the jacket.
    function kile(bredder, farve, lag) {
      for (let i=1; i<bredder.length; i++) {
        const [top,y]=bredder[i-1], [bund,ny]=bredder[i];
        felt([[-top,y],[top,y],[-bund,ny]],farve,lag);
        if(bund) felt([[top,y],[bund,ny],[-bund,ny]],farve,lag);
      }
    }
    kile([[.076,1.58],[.083,1.535],[.065,1.46],[.038,1.36],[0,1.27]],skjorte,.012);
    kile([[.028,1.535],[.015,1.49],[.020,1.46],[.022,1.36],[0,1.31]],slips,.022);
    for (const side of [-1,1]) {
      felt([[side*.077,1.57],[side*.157,1.48],[side*.09,1.44]], revers, .021);
      felt([[side*.09,1.49],[side*.133,1.40],[0,1.23]], revers, .025);
    }
  }

  const stauning = menneske({
    coat:'#292d34', trousers:'#34373d', shoes:'#252323', skin:'#e5b99d', hair:'#a69c92',
    hairStyle:'skaldet', bryn:'#8b8177', ingenKrave:true,
    grupper:f => [f.g, f.head, ...f.hips],
    extra(g, head, part, m, foran) {
      habit(g, part, m, foran, '#4c4d53', '#eee6d5', '#493641');
      const profil = [[.006,-.32],[.045,-.28],[.088,-.195],[.113,-.11],[.105,-.07],[.066,-.047]];
      const skaeg = part(new THREE.LatheGeometry(profil.map(([r,y]) => new THREE.Vector2(r,y)),20), m('#c5bcb0'), head, 0,0,.126,0);
      skaeg.scale.z=.75;
      skaeg.rotation.x=-.25; // The beard hangs in front of the shirt and clears the collar.
      oval(part,m('#e3b79d'),head,[0,-.019,.150],[.024,.029,.027]);
      for(const s of [-1,1]) {
        oval(part,m('#ded7c9'),head,[s*.044,-.056,.168],[.053,.021,.018]).rotation.z=-s*.18;
        oval(part,m('#b8aca0'),head,[s*.054,-.155,.191],[.033,.088,.014]).rotation.z=-s*.27;
        const ring = part(new THREE.TorusGeometry(.044,.005,7,24),m('#574633'),head,s*.051,.012,.150,0);
        ring.rotation.y=s*.12;
        const stang = part(new THREE.BoxGeometry(.007,.008,.105),m('#574633'),head,s*.099,.013,.105,0);
        stang.rotation.y=-s*.22;
      }
      part(new THREE.BoxGeometry(.025,.008,.009),m('#574633'),head,0,.015,.150,0);
    }
  });

  const anker = menneske({
    coat:'#655d4c', trousers:'#464443', skin:'#e2b49b', hair:'#b7b3ac', hairStyle:'skaldet',
    bryn:'#786d61', scale:.93, ingenKrave:true, grupper:f => [f.g,f.head],
    foer(f) { f.g.rotation.x=.045; f.elbows[0].rotation.x=-.28; f.elbows[1].rotation.x=-.47; },
    extra(g, head, part, m, foran) {
      habit(g, part, m, foran, '#80755f', '#e0dcca', '#794438');
      // Receding temples, waves swept back, small separate moustache and goatee.
      oval(part,m('#b7b3ac'),head,[0,.105,-.041],[.132,.076,.113]);
      oval(part,m('#c9c4b9'),head,[-.018,.134,-.004],[.088,.048,.075]).rotation.z=.20;
      oval(part,m('#d9ac92'),head,[0,-.021,.148],[.024,.024,.030]);
      for (const s of [-1,1]) {
        oval(part,m('#c5c1b9'),head,[s*.107,.058,-.023],[.040,.077,.112]).rotation.x=-.40;
        oval(part,m('#766b60'),head,[s*.049,.047,.126],[.032,.010,.009]).rotation.z=-s*.14;
        oval(part,m('#a29686'),head,[s*.027,-.045,.142],[.029,.010,.010]).rotation.z=-s*.12;
      }
      const hage = [[.002,-.160],[.023,-.146],[.046,-.114],[.039,-.099],[.018,-.095]];
      const spids=part(new THREE.LatheGeometry(hage.map(([r,y])=>new THREE.Vector2(r,y)),14),m('#9a9082'),head,0,0,.10,0);
      spids.scale.z=.51;
    }
  });

  // The figure itself is compressed into the painted surface when at rest.
  // Its feet line up with the bottom of the canvas, then come down onto the parquet.
  const ramme = new THREE.Group();
  ramme.name = 'Staunings portræt'; ramme.userData.keep = true;
  ramme.position.set(-31.5, I.floor, 4.39); ramme.rotation.y = Math.PI;
  I.group.add(ramme);
  const laerred = ctex(384,512,(c,w,h) => {
    const lys=c.createRadialGradient(w*.44,h*.29,4,w*.48,h*.40,h*.70);
    lys.addColorStop(0,'#647064'); lys.addColorStop(.62,'#354c47'); lys.addColorStop(1,'#192d2a');
    c.fillStyle=lys; c.fillRect(0,0,w,h);
    for(let y=0;y<h;y+=4){ c.fillStyle=y%8?'#efdbab0a':'#172b2a18'; c.fillRect(0,y,w,1); }
    for(const [inset,color,width] of [[7,'#4e3021',14],[16,'#b78846',8],[22,'#ebca80',4],[29,'#68472b',9],[35,'#dbb569',3]]) {
      c.strokeStyle=color;c.lineWidth=width;c.strokeRect(inset,inset,w-2*inset,h-2*inset);
    }
    for(const x of [26,w-26])for(const y of [26,h-26]){
      c.save();c.translate(x,y);c.rotate(Math.PI/4);c.fillStyle='#ebc984';c.fillRect(-5,-5,10,10);c.restore();
    }
  },{wrap:false});
  function panel(map,w,h,y,z) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map}));
    panel.position.set(0,y,z); ramme.add(panel);
  }
  panel(laerred,1.52,2.06,1.59,0);
  const messing = ctex(512,96,(c,w,h) => {
    c.fillStyle='#c5a76b';c.fillRect(0,0,w,h);c.strokeStyle='#795d37';c.lineWidth=4;c.strokeRect(5,5,w-10,h-10);
    c.fillStyle='#2b281e';c.font='bold 48px Georgia';c.textAlign='center';c.textBaseline='middle';c.fillText('THORVALD STAUNING',w/2,h/2+2,w-40);
  },{wrap:false});
  panel(messing,1.10,.20,.38,.012);
  ramme.add(stauning.root);
  anker.root.name='Anker ved Ridebanen';
  anker.root.position.set(-153, groundAt(-153,94,2), 94);
  const modBanen = Math.atan2(20,-6);
  anker.root.rotation.y=modBanen; dyn.add(anker.root);

  let trin=0, hilst=false, ankerHilst=false;
  const moedStauning = {id:'gaest-stauning', label:'Hils på Stauning', prio:8, run(){
    scene({eyebrow:'Vandrehallen · En opdigtet julehilsen', title:'Thorvald Stauning',
      lines:['“En rød hue? Tak, men jeg synes nu, skægget er rigeligt.”'], btn:'Tilbage til turen', efter:()=>{hilst=true;}});
  }};
  const moedAnker = {id:'gaest-anker', label:'Hils på Anker', prio:8, run(){
    scene({eyebrow:'Ved afsløringen af sit portræt i 1998', title:'Anker Jørgensen',
      lines:['“Jeg havde hellere set mig portrætteret på en fyrig hest. Jeg er jo gammel husar.”'], btn:'Tilbage til turen', efter:()=>{ankerHilst=true;}});
  }};

  function update(dt, pos, ude, aktiv) {
    const afstand = Math.hypot(pos.x-I.x-ramme.position.x,pos.z-ramme.position.z);
    ramme.visible=I.on && I.place==='folketing' && afstand<46;
    const iHallen = ramme.visible && I.roomAt(pos.x-I.x,pos.z)==='hall';
    if(!iHallen || afstand>4.8) hilst=false;
    const ud = iHallen && afstand<3.9 && !hilst;
    trin = reduceMotion ? Number(ud) : THREE.MathUtils.clamp(trin + (ud?1:-1)*dt*1.6,0,1);
    const t=trin*trin*(3-2*trin);
    stauning.root.position.set(0,.70*(1-t)+.07*Math.sin(t*Math.PI),.055+t*.79);
    stauning.root.scale.set(.86+.14*t,.86+.14*t,.08+.92*t);
    stauning.root.rotation.y=.20*(1-t);
    for (const [i,hofte] of stauning.hips.entries()) hofte.rotation.x=(i?1:-1)*.23*Math.sin(t*Math.PI*2);
    if(aktiv && iHallen && !hilst && afstand<3.3) offerAction(moedStauning);

    const p=anker.root.position, d=Math.hypot(pos.x-p.x,pos.z-p.z);
    anker.root.visible=ude && d<64;
    if(d>4.8 || !ude) ankerHilst=false;
    if(!anker.root.visible) return;
    const besoeg=d<3.5 && !ankerHilst;
    const retning=besoeg ? Math.atan2(pos.x-p.x,pos.z-p.z) : modBanen;
    const forskel=retning-anker.root.rotation.y;
    const kortDrej=Math.atan2(Math.sin(forskel),Math.cos(forskel));
    anker.root.rotation.y+=kortDrej*(reduceMotion ? 1 : 1-Math.exp(-3.5*dt));
    // Attend to the nearest passing horse; keep the turn comfortable and continuous.
    let hest=null, naermest=Infinity;
    for(const h of horses){
      const afstand=h.g.position.distanceToSquared(p);
      if(afstand<naermest){naermest=afstand;hest=h.g.position;}
    }
    if(hest && !reduceMotion){
      const vinkel=Math.atan2(hest.x-p.x,hest.z-p.z)-modBanen;
      const blik=besoeg ? 0 : THREE.MathUtils.clamp(Math.atan2(Math.sin(vinkel),Math.cos(vinkel)),-.7,.7);
      anker.head.rotation.y=THREE.MathUtils.damp(anker.head.rotation.y,blik,2,dt);
    }
    if(aktiv && !ankerHilst && d<3.2) offerAction(moedAnker);
  }
  return update;
}
