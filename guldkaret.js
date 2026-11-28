// Inspireret af Margrethe II's tur til nytårskur den 4. januar 2024:
// https://www.kongehuset.dk/foto-video/nytaarskur-paa-christiansborg-slot-2024
// Vognens lange akse er +z. Det store vindue og dronningens hilsen vender mod +x.
export function bygGuldkaret({ THREE, menneske, buildHorse, figKit }) {
  const root = new THREE.Group();
  root.name = 'Guldkareten';
  const vogn = new THREE.Group();
  root.add(vogn);
  const kit = figKit();
  const guld = '#d9a746', lys = '#ffe4a0', skygge = '#92652b', mahogni = '#441e25';
  const lak = '#23384d', fløjl = '#581d2d', læder = '#352b2c', jern = '#302d33';
  const add = (g, geo, col, x, y, z, o = {}) => kit.add(g, geo, col, x, y, z, { ol: 0, ...o });
  function boks(g, col, x, y, z, w, h, d) {
    add(g, new THREE.BoxGeometry(w,h,d), col,x,y,z);
  }
  function oval(g,col,x,y,z,a,b,c) {
    add(g,new THREE.SphereGeometry(1,12,8),col,x,y,z,{s:[a,b,c]});
  }
  function stang(g,col,a,b,r,top=r) {
    const fra = new THREE.Vector3(...a), til = new THREE.Vector3(...b);
    const ret = til.clone().sub(fra), midt = fra.clone().lerp(til,.5);
    const geo = new THREE.CylinderGeometry(top,r,ret.length(),8);
    geo.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),ret.normalize()));
    add(g,geo,col,midt.x,midt.y,midt.z);
  }
  function bue(g,col,punkter,r) {
    const curve = new THREE.CatmullRomCurve3(punkter.map(p => new THREE.Vector3(...p)));
    add(g,new THREE.TubeGeometry(curve,12,r,6,false),col,0,0,0);
  }
  function krone(x,y,z,scale) {
    const parent = new THREE.Group(); parent.position.set(x,y,z); parent.scale.setScalar(scale); vogn.add(parent);
    // Build directly into the coach batch in world-of-coach coordinates.
    const p = (a,b,c) => [x+a*scale,y+b*scale,z+c*scale];
    oval(vogn,'#812437',x,y+.095*scale,z,.143*scale,.114*scale,.143*scale);
    for(const [h,r,col] of [[.045,.155,guld],[.018,.147,lys],[.069,.151,lys]]) {
      add(vogn,new THREE.TorusGeometry(r*scale,.014*scale,6,20),col,x,y+h*scale,z,{rx:Math.PI/2});
    }
    for(let i=0;i<4;i++){
      const a=i*Math.PI/2,c=Math.cos(a),s=Math.sin(a);
      bue(vogn,lys,[p(.13*c,.07,.13*s),p(.148*c,.17,.148*s),p(.080*c,.228,.080*s),p(0,.24,0)],.014*scale);
    }
    oval(vogn,lys,...p(0,.25,0),.03*scale,.03*scale,.03*scale);
    boks(vogn,guld,...p(0,.315,0),.021*scale,.09*scale,.025*scale);
    boks(vogn,guld,...p(0,.324,0),.025*scale,.024*scale,.080*scale);
    vogn.remove(parent);
  }

  // Lofted, curved lower body and domed roof. Corner cuts preserve the coach's oval silhouette.
  function lag(yb,yt,wb,wt,lb,lt,col) {
    const ring = (w,l,y) => {
      const dx=w*.25,dz=l*.19;
      return [[w,y,l-dz],[w-dx,y,l],[-w+dx,y,l],[-w,y,l-dz],[-w,y,-l+dz],[-w+dx,y,-l],[w-dx,y,-l],[w,y,-l+dz]];
    };
    const lo = ring(wb,lb,yb), hi = ring(wt,lt,yt), arr=[];
    for(let i=0;i<lo.length;i++) {
      const j=(i+1)%lo.length;
      arr.push(...lo[i],...hi[i],...lo[j],...hi[i],...hi[j],...lo[j]);
      arr.push(0,yt,0,...hi[j],...hi[i]);
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(arr,3)); geo.computeVertexNormals();
    add(vogn,geo,col,0,0,0);
  }
  lag(.86,1.02,.40,.55,.64,.93,skygge);
  lag(1.02,1.22,.55,.74,.93,1.18,guld);
  lag(1.22,1.72,.74,.83,1.18,1.28,'#d9ae59');
  lag(1.72,1.77,.83,.85,1.28,1.30,lys);
  // Window posts, door carving and two lamps leave the middle of the broad window uninterrupted.
  for (const x of [-1,1]) {
    for (const z of [-1,1]) {
      stang(vogn,skygge,[x*.80,1.76,z*1.05],[x*.89,2.82,z*1.11],.064);
      stang(vogn,lys,[x*.836,1.76,z*1.05],[x*.925,2.82,z*1.11],.023);
      stang(vogn,'#293747',[x*.79,2.78,z*.99],[x*.77,1.78,z*.99],.034);
      for(let fold=0;fold<4;fold++){
        const stof=fold%2?'#758295':'#929ea9';
        stang(vogn,stof,[x*.79,2.76,z*(.68+.10*fold)],[x*.79,2.19,z*(.92+.033*fold)],.044,.074);
        stang(vogn,stof,[x*.79,2.19,z*(.92+.033*fold)],[x*.79,1.80,z*(.84+.052*fold)],.037,.044);
      }
      boks(vogn,lys,x*.83,2.19,z*.974,.04,.033,.18);
      bue(vogn,lys,[[x*.79,1.57,z*.95],[x*.78,1.42,z*.80],[x*.754,1.35,z*.59]],.021);
    }
    // Coach door, crowned oval cartouche and lacquered step.
    for(const z of [-.45,.45])stang(vogn,skygge,[x*.752,1.24,z*.83],[x*.832,1.70,z],.014);
    oval(vogn,skygge,x*.815,1.485,0,.022,.201,.166);
    oval(vogn,lys,x*.834,1.49,0,.018,.178,.145);
    oval(vogn,'#243d58',x*.85,1.49,0,.016,.133,.103);
    for(let i=0;i<3;i++)boks(vogn,lys,x*.869,1.53-i*.042,0,.01,.017,.101-i*.018);
    boks(vogn,skygge,x*.828,1.65,-.33,.034,.034,.14);
    boks(vogn,mahogni,x*.85,.76,0,.36,.07,.98);
    boks(vogn,lys,x*1.02,.765,0,.030,.045,.96);
    boks(vogn,mahogni,x*.97,.49,0,.27,.075,.76);
    for(const z of [-.30,.30])stang(vogn,skygge,[x*.85,.77,z],[x*1.02,.49,z],.025);
    // Corner lamps: a bright warm core with solid dark cap and brass stem.
    for(const z of [-1.19,1.19]){
      const lx=x*.98;
      stang(vogn,guld,[x*.80,1.73,z],[lx,1.86,z],.028);
      add(vogn,new THREE.CylinderGeometry(.114,.066,.24,6), '#ffdf98',lx,1.99,z);
      add(vogn,new THREE.ConeGeometry(.15,.105,6),mahogni,lx,2.16,z);
      add(vogn,new THREE.CylinderGeometry(.103,.075,.042,6),guld,lx,1.86,z);
    }
  }
  // The dark, upholstered far side makes the silver hair and white glove legible.
  boks(vogn,fløjl,-.73,2.19,-.1,.10,.83,2.03);
  boks(vogn,'#872e44',-.666,2.20,-.1,.027,.67,1.86);
  for(const z of [-.79,-.43,-.07,.29,.65])oval(vogn,'#ad6871',-.64,2.20,z,.015,.021,.021);
  boks(vogn,fløjl,.12,1.61,-.06,1.19,.16,1.33);
  lag(2.77,2.83,.91,.96,1.37,1.44,skygge);
  lag(2.83,2.89,.96,.95,1.44,1.44,lys);
  lag(2.89,3.04,.95,.79,1.44,1.27,'#4a252d');
  lag(3.04,3.10,.79,.55,1.27,1.01,'#683b3c');
  for(const side of [-1,1])for(const end of [-1,1])krone(side*.78,2.96,end*1.22,1.0);

  // Springs, underframe, driver's perch and rear footboard.
  boks(vogn,mahogni,0,.78,.18,.42,.16,3.42);
  boks(vogn,lak,0,1.35,1.56,1.36,.30,.56);
  boks(vogn,'#821d30',0,1.51,1.54,1.41,.09,.64);
  for(const side of [-1,1]){
    bue(vogn,lak,[[side*.65,.76,-1.32],[side*.68,.53,-.70],[side*.68,.49,.48],[side*.61,.68,1.34]],.068);
    bue(vogn,guld,[[side*.71,.90,-1.26],[side*.68,.61,-.70],[side*.68,.57,.44],[side*.63,.75,1.30]],.029);
    boks(vogn,lys,side*.685,1.38,1.54,.032,.06,.56);
    for(const z of [1.37,1.54,1.71])oval(vogn,guld,side*.68,1.22,z,.025,.095,.025);
    stang(vogn,guld,[side*.52,.72,-1.11],[side*.51,.72,-1.99],.047);
    stang(vogn,guld,[side*.51,.72,-1.98],[side*.51,1.49,-1.91],.026);
  }
  boks(vogn,mahogni,0,.73,-1.78,1.31,.10,.55);
  boks(vogn,skygge,0,.76,1.97,1.27,.09,.49);
  const hjul=[];
  for (const [z,r] of [[-1.20,.82],[1.42,.62]]) {
    stang(vogn,jern,[-1.08,r,z],[1.08,r,z],.066);
    for(const s of [-1,1]){
      const pivot=new THREE.Group();pivot.position.set(s*.98,r,z);root.add(pivot);
      add(pivot,new THREE.TorusGeometry(r-.032,.036,7,36),jern,0,0,0,{ry:Math.PI/2});
      add(pivot,new THREE.TorusGeometry(r-.071,.043,7,36),guld,0,0,0,{ry:Math.PI/2});
      for(let i=0;i<12;i++){
        const a=i*Math.PI/6,c=Math.cos(a),sn=Math.sin(a);
        stang(pivot,guld,[s*.018,.08*c,.08*sn],[0,(r-.07)*c,(r-.07)*sn],.024,.016);
      }
      add(pivot,new THREE.CylinderGeometry(.103,.103,.2,12),skygge,0,0,0,{rz:Math.PI/2});
      oval(pivot,lys,s*.104,0,0,.043,.085,.085);
      hjul.push({pivot,r});
    }
  }
  function livrist(sidder) {
    return menneske({sidder,statisk:true,detalje:'lav',coat:sidder?'#9a2936':'#32303a',
      trousers:'#eee1c5',shoes:jern,hair:'#514641',skin:'#d7af94',
      foer(f) {for(const a of f.arms)a.rotation.x=sidder?-.66:-.15;for(const e of f.elbows)e.rotation.x=sidder?-.80:-.47;},
      extra(g,head,part,m,foran){
        part(new THREE.CylinderGeometry(.153,.164,.21,14),m('#25262d'),head,0,.164,-.009);
        part(new THREE.CylinderGeometry(.198,.196,.017,16),m('#26262c'),head,0,.067,.004);
        part(new THREE.CylinderGeometry(.162,.163,.026,14),m('#c1a05e'),head,0,.092,-.009);
        for(const s of [-1,1]){
          const lapel=part(new THREE.BoxGeometry(.031,.21,.016),m('#d9c18d'),g,s*.073,1.44,foran(1.44)+.003,0);
          lapel.rotation.z=-s*.28;
        }
      }
    });
  }
  const kusk=livrist(true); kusk.root.position.set(0,.75,1.58); vogn.add(kusk.root);
  for(const side of [-1,1]){
    const f=livrist(false); f.root.position.set(side*.32,.78,-1.82); f.root.rotation.y=side*.18;vogn.add(f.root);
  }
  const dronning=menneske({
    kvinde:true,detalje:'lav',levende:true,skin:'#f3cdb9',coat:'#764f42',trousers:'#483332',hair:'#d7d5ce',
    hairStyle:'knold',bryn:'#82736b',mund:'#9d4a4a',sidder:true,scale:1.07,
    grupper:f=>[f.g,f.head,f.arms[1],f.elbows[1]],
    foer(f){f.head.scale.set(.94,1.10,1);for(const eye of f.eyes)eye.scale.set(.82,.70,1);f.arms[0].rotation.x=-.43;f.elbows[0].rotation.x=-.83;},
    extra(g,head,part,m,foran){
      // Silver chignon, profile, cheekbones and pearls remain visible over the sill.
      const o=(parent,c,x,y,z,a,b,d)=>{
        const p=part(new THREE.SphereGeometry(1,14,10),m(c),parent,x,y,z,0);p.scale.set(a,b,d);return p;
      };
      o(head,'#e6e2d7',0,.092,-.136,.103,.100,.078);
      o(head,'#e3dfd6',0,.132,.006,.125,.065,.115);
      for(const s of [-1,1]){
        o(head,'#dedbd3',s*.108,.088,-.040,.047,.063,.101).rotation.x=-.30;
        o(head,'#fff3da',s*.140,-.055,-.005,.015,.019,.015);
        const krave=o(g,'#916b59',s*.09,1.52,.08,.075,.148,.080);krave.rotation.z=-s*.44;
      }
      o(head,'#edc4b1',0,-.01,.147,.017,.040,.030).rotation.x=-.23;
      o(head,'#f1c9b6',0,-.033,.171,.021,.024,.025);
      o(g,lys,-.102,1.49,foran(1.49)+.029,.032,.027,.012);
      o(g,'#728d91',-.102,1.49,foran(1.49)+.040,.019,.019,.010);
    },
    arm:[null,(sh,part,m,el)=>{
      const glove=part(new THREE.SphereGeometry(1,12,9),m('#fff5db'),el,0,-.30,.007,0);glove.scale.set(.052,.083,.04);
      part(new THREE.CylinderGeometry(.054,.049,.068,10),m('#f2e6cd'),el,0,-.238,0,0);
    }]
  });
  dronning.root.name='Margrethe II'; dronning.root.position.set(.06,.57,-.06);
  dronning.root.rotation.y=.77; vogn.add(dronning.root);

  // Thin reins and traces stay attached to the team. The harness uses gold bosses and dark leather.
  for(const side of [-1,1]){
    bue(vogn,læder,[[side*.22,1.94,1.99],[side*.42,1.50,2.70],[side*.50,1.60,3.85],[side*.69,1.80,4.88]],.015);
    stang(vogn,skygge,[side*.48,.76,1.45],[side*.40,.91,4.20],.035);
    for(let row=0;row<3;row++){
      const cx=side*.72,z=3.75+row*2.82;
      bue(vogn,læder,[[cx-.30,1.39,z+.47],[cx-.31,1.23,z+.66],[cx,1.15,z+.84],[cx+.31,1.23,z+.66],[cx+.30,1.39,z+.47]],.04);
      for(const s of [-1,1]){
        bue(vogn,læder,[[cx+s*.32,1.34,z+.46],[cx+s*.39,1.10,z-.10],[cx+s*.34,1.03,z-.96]],.022);
        oval(vogn,guld,cx+s*.34,1.33,z+.47,.029,.049,.049);
        if(row>0)stang(vogn,læder,[cx+s*.34,1.03,z-.94],[cx+s*.33,1.25,z-2.31],.018);
      }
    }
  }
  kit.bake(false);
  // Six instances per animated horse part share its geometry, rig, material and draw call.
  const hest=buildHorse('#eee8d9','#c9c4b7',{nose:'#bfae9e',ben:'#ded9cc',skygge:false});
  const net=[];
  hest.g.traverse(del=>{
    if(!del.isMesh)return;
    const instans=new THREE.InstancedMesh(del.geometry,del.material,6);
    instans.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // The whole procession is culled by its route; poses change the bounds of individual parts.
    instans.frustumCulled=false; root.add(instans);net.push([del,instans]);
  });
  let fase=0,vink=0;
  function opdater(dt,{fart=0,vinker=false,aktiv=true,reduceMotion=false}={}) {
    if(!aktiv)return;
    const meter=dt*fart;
    fase+=meter*3.3;
    for(const {pivot,r} of hjul)pivot.rotation.x+=meter/r;
    const maal=Number(vinker);
    vink=reduceMotion?maal:THREE.MathUtils.damp(vink,maal,5,dt);
    dronning.head.rotation.y=.07+vink*.72;
    dronning.arms[1].rotation.z=.12+vink*.97;
    dronning.arms[1].rotation.x=-.36-vink*.19;
    dronning.elbows[1].rotation.z=vink*(1.25+(reduceMotion?0:.15*Math.sin(fase*1.35)));
    dronning.elbows[1].rotation.x=-.55-vink*.15;
    for(let i=0;i<6;i++){
      const side=i%2?1:-1, row=Math.floor(i/2), ph=fase+i*1.29;
      const spring=reduceMotion?0:Math.min(1, Math.abs(fart));
      hest.g.position.set(side*.72,0,3.75+row*2.82);
      for(let j=0;j<4;j++){
        const sign=j<2?1:-1, s=Math.sin(ph)*sign;
        hest.legs[j].rotation.x=.31*s*spring;
        hest.knees[j].rotation.x=Math.max(0,-Math.cos(ph)*sign)*spring*(j%2?-.52:.68);
      }
      hest.body.position.y=.019*Math.abs(Math.cos(ph))*spring;
      hest.neck.rotation.x=.041*Math.sin(ph)*spring;
      hest.tail.rotation.z=.085*Math.cos(ph*.62)*spring;
      hest.g.updateMatrixWorld(true);
      for(const [del,instans] of net)instans.setMatrixAt(i,del.matrixWorld);
    }
    for(const [,instans] of net)instans.instanceMatrix.needsUpdate=true;
  }
  opdater(0,{});
  return { root, opdater };
}
