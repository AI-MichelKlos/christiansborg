// Et frivilligt glimt fra Margrethe II's nytårskur den 4. januar 2024.
// https://www.kongehuset.dk/foto-video/nytaarskur-paa-christiansborg-slot-2024
// Nissen, replikkerne og mødet med Anker er skrevet til spillet.
import { bygGuldkaret } from './guldkaret.js';

function hofFotograf({ THREE, menneske }) {
  const fotograf = menneske({
    scale:.72, coat:'#384f49', trousers:'#45404a', hair:'#f2e6ce', toerklaede:'#bb5145',
    grupper:f=>[f.g,f.head,...f.arms],
    foer(f) { f.elbows[0].rotation.x=-1.02; f.elbows[1].rotation.x=-1.16; },
    extra(g,head,part,m) {
      const hue=part(new THREE.ConeGeometry(.165,.32,16),m('#ad3936'),head,0,.20,0);
      hue.rotation.z=-.23;
      const kant=part(new THREE.TorusGeometry(.149,.026,7,18),m('#e5caac'),head,0,.062,0);
      kant.rotation.x=Math.PI/2;
      part(new THREE.SphereGeometry(.045,10,7),m('#e8d6ba'),head,.043,.36,0);
    },
    arm:[null,(sh,part,m,el)=>{
      const hus=part(new THREE.BoxGeometry(.22,.14,.09),m('#292d2f'),el,-.07,-.30,.02);
      hus.rotation.x=1.8;
      part(new THREE.BoxGeometry(.215,.023,.095),m('#b7ab91'),hus,0,.065,0,0);
      const linse=part(new THREE.CylinderGeometry(.051,.049,.071,14),m('#82929a'),hus,0,0,.07,0);
      linse.rotation.x=Math.PI/2;
      part(new THREE.SphereGeometry(.039,12,8),m('#223342'),hus,0,0,.103,0).scale.z=.20;
    }]
  });
  fotograf.root.name='Hoffotografen';
  return fotograf;
}

// One small exposure. Use an independent camera and restore the player's render target.
function tagBillede({ THREE, renderer, verden }, karet) {
  const bredde=300, hoejde=190;
  const kamera=new THREE.PerspectiveCamera(36,bredde/hoejde,.05,150);
  karet.updateWorldMatrix(true,false);
  kamera.position.set(2.35,1.42,2.10).applyMatrix4(karet.matrixWorld);
  kamera.lookAt(new THREE.Vector3(.80,1.20,4.0).applyMatrix4(karet.matrixWorld));
  const maal=new THREE.WebGLRenderTarget(bredde,hoejde);
  maal.texture.colorSpace=THREE.SRGBColorSpace;
  const pixels=new Uint8Array(bredde*hoejde*4);
  const foer=renderer.getRenderTarget(), skygger=renderer.shadowMap.autoUpdate;
  try {
    renderer.shadowMap.autoUpdate=false;
    renderer.setRenderTarget(maal);
    renderer.render(verden,kamera);
    renderer.readRenderTargetPixels(maal,0,0,bredde,hoejde,pixels);
  } finally {
    renderer.setRenderTarget(foer); renderer.shadowMap.autoUpdate=skygger; maal.dispose();
  }
  const foto=document.createElement('canvas'); foto.width=bredde; foto.height=hoejde;
  const ctx=foto.getContext('2d'), ark=ctx.createImageData(bredde,hoejde), rad=bredde*4;
  for(let y=0;y<hoejde;y++) ark.data.set(pixels.subarray(y*rad,(y+1)*rad),(hoejde-y-1)*rad);
  ctx.putImageData(ark,0,0);
  foto.setAttribute('role','img'); foto.setAttribute('aria-label','Fotografnissens skæve nærbillede af hestespandet');
  foto.style.cssText='display:block;width:min(78%,240px);height:auto;margin:6px auto 8px;border:6px solid #faf3df;box-shadow:0 2px 5px #322a2340;transform:rotate(-2deg)';
  return foto;
}

export function nytaarsoptog(H) {
  const {THREE,dyn,groundAt,tone,offerAction,scene,toast,reduceMotion}=H;
  // Centre of the road from Marmorbroen, through the twin pavilions, towards Ridebanen.
  const start=new THREE.Vector3(-196,0,129);
  const retning=new THREE.Vector3(23,0,-15).normalize(), kurs=Math.atan2(retning.x,retning.z);
  const side=new THREE.Vector3(retning.z,0,-retning.x);
  const plads=start.clone().addScaledVector(retning,27).addScaledVector(side,5);
  const fotograf=hofFotograf(H);
  fotograf.root.position.copy(plads); fotograf.root.position.y=groundAt(plads.x,plads.z,2);
  fotograf.root.rotation.y=kurs-Math.PI/2; fotograf.root.visible=false; dyn.add(fotograf.root);

  let vogn=null, sted=0, fase='venter', hovTid=0, fremkaldt=false, foto=null, arm=0;
  const sidste=44, kameraPunkt=new THREE.Vector3();
  function begynd() {
    sted=0;fase='koerer';hovTid=0;fremkaldt=false;foto=null;
    toast('Hovslag fra Marmorbroen · Margrethe II på vej til nytårskur');
  }
  function billede() {
    scene({eyebrow:'Fotografnissens arkiv · Nytårskur 2024',title:'Det officielle julefoto',
      billede:foto,lines:[['Hoffotografen','Hofreportage kræver lidt øvelse.'],['Bilags påtegning','Fire kroner på taget? Jeg havde ellers godkendt tre.']],btn:'Tilbage til turen'});
  }
  return function optog(dt,pos,ude,aktiv) {
    const afstand=Math.hypot(pos.x-plads.x,pos.z-plads.z);
    fotograf.root.visible=ude && afstand<62;
    if(!ude || afstand>65){
      if(vogn) vogn.root.visible=false;
      fase='venter';sted=0;fremkaldt=false;foto=null;arm=0;
      return null;
    }
    if(!vogn && afstand<46){
      vogn=bygGuldkaret(H);dyn.add(vogn.root);vogn.root.rotation.y=kurs;
    }
    if(!vogn) return null;
    vogn.root.visible=true;
    const vedAnker=Math.hypot(pos.x+153,pos.z-94)<6;
    if(fase==='venter' && aktiv && (afstand<12 || vedAnker)) begynd();
    const vinker=sted>20 && sted<37;
    let fart=0;
    if(fase==='koerer' && aktiv){
      const dx=pos.x-vogn.root.position.x,dz=pos.z-vogn.root.position.z;
      const frem=dx*retning.x+dz*retning.z, tvaers=dx*side.x+dz*side.z;
      const iVejen=Math.abs(tvaers)<1.35 && frem>10 && frem<15.5;
      if(!iVejen){
        const afslut=THREE.MathUtils.clamp((sidste-sted)/3,.18,1);
        fart=(vinker?2.05:3.85)*afslut;
        sted=Math.min(sidste,sted+fart*dt);
        if(sted===sidste){fase='fremme';fart=0;}
        hovTid-=dt*fart;
        if(hovTid<=0 && fart>0){
          hovTid=.97;
          const vol=.038*Math.max(0,1-Math.hypot(pos.x-vogn.root.position.x,pos.z-vogn.root.position.z)/55);
          if(vol>.001){tone(171,76,0,.075,vol,'triangle');tone(138,60,.115,.08,vol*.77,'triangle');}
        }
      }
    }
    const p=vogn.root.position.copy(start).addScaledVector(retning,sted);
    p.y=groundAt(p.x,p.z,2);
    vogn.opdater(dt,{fart,vinker,aktiv,reduceMotion});
    kameraPunkt.copy(p);kameraPunkt.y+=2;
    // As the coach passes, the photographer follows the last horse with the camera.
    if(aktiv){
      const loeft=sted>13 && !fremkaldt ? 1 : 0;
      arm=reduceMotion ? loeft : THREE.MathUtils.damp(arm,loeft,3,dt);
      fotograf.arms[1].rotation.x=-.35-arm*1.05;fotograf.arms[0].rotation.x=-.25-arm*.84;
      if(fase==='koerer')fotograf.root.rotation.y=Math.atan2(p.x-plads.x,p.z-plads.z);
      if(!fremkaldt && sted>35){
        fremkaldt=true;
        if(!H.renderer.getContext().isContextLost()) foto=tagBillede(H,vogn.root);
        if(afstand<18)tone(1150,240,0,.045,.024,'triangle');
      }
      if(fremkaldt && afstand<3.4) offerAction({id:'jul-hoffoto',label:'Se nissens foto',prio:8,run:billede});
    }
    return fase==='koerer' ? kameraPunkt : null;
  };
}
