"use strict";
(()=>{
 const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
 // International browsing is a convenience; source PT remains the default.
 const language=document.querySelector("[data-language]");
 if(language){
  let lang="pt";
  language.addEventListener("click",()=>{
   lang=lang==="pt"?"en":"pt";document.documentElement.lang=lang==="pt"?"pt-BR":"en";
   document.querySelectorAll("[data-copy-pt][data-copy-en]").forEach(el=>{
    const str=el.getAttribute("data-copy-"+lang);
    if(str.includes("<br>")){
     el.replaceChildren();
     str.split("<br>").forEach((part,i)=>{if(i)el.append(document.createElement("br"));el.append(document.createTextNode(part));});
    }else el.textContent=str;
   });
   language.textContent=lang==="pt"?"EN":"PT";
   language.setAttribute("aria-label",lang==="pt"?"Switch language to English":"Mudar idioma para português");
  });
 }
 const morph=document.querySelector("[data-morph-stage]");
 if(morph){
  const buttons=[...document.querySelectorAll("[data-morph-choice]")];
  buttons.forEach(b=>b.addEventListener("click",()=>{
   const state=b.getAttribute("data-morph-choice");
   if(!["contrair","expandir","orbitar"].includes(state))return;
   morph.dataset.state=state;
   morph.querySelector(".morph-stage-title").textContent=state.toUpperCase();
   buttons.forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
  }));
  const sculpture=document.querySelector(".morph-sculpture");
  if(sculpture&&!reduced&&window.matchMedia("(pointer:fine)").matches){
   let last=0;
   document.querySelector(".morph-hero")?.addEventListener("pointermove",e=>{
    if(performance.now()-last<35)return;last=performance.now();
    const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    sculpture.style.transform="translate("+(-x*24)+"px,"+(-y*18)+"px)";
   },{passive:true});
  }
 }
 const reel=document.querySelector("[data-reel]");
 if(reel){
  const range=document.querySelector("[data-reel-range]");
  const toggle=document.querySelector("[data-reel-toggle]");
  const toggleIcon=document.querySelector("[data-reel-toggle-icon]");
  const reset=document.querySelector("[data-reel-restart]");
  const clock=document.querySelector("[data-current-time]");
  const lines=[reel.querySelector("[data-reel-first]"),reel.querySelector("[data-reel-second]"),reel.querySelector("[data-reel-third]")];
  const bars=[...reel.querySelectorAll(".kinetic-wave span")];
  const buttons=[...document.querySelectorAll("[data-reel-scene]")];
  const script=[["MOVE","WITH","INTENT."],["FEEL","THE","RHYTHM."],["LEAVE","AN","ECHO."]];
  const duration=18;
  let seconds=0,playing=false,previous=null,frame=null,sceneBefore=-1;
  const ease=t=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);
  function render(){
   const scene=Math.max(0,Math.min(2,Math.floor(Math.min(seconds,17.999)/6)));
   const local=(seconds%6)/6;
   if(scene!==sceneBefore){
    sceneBefore=scene;reel.dataset.scene=String(scene);
    lines.forEach((line,i)=>line.textContent=script[scene][i]);
    reel.querySelector(".kinetic-overlay-number").textContent=String(scene+1).padStart(2,"0")+" / 03";
    buttons.forEach(b=>b.setAttribute("aria-pressed",b.dataset.reelScene===String(scene)?"true":"false"));
   }
   range.value=String(Math.round(seconds/duration*1000));
   clock.textContent="00:"+String(Math.floor(seconds)).padStart(2,"0");
   const s=Math.sin(local*Math.PI*2);
   lines.forEach((line,i)=>{
    const index=i-1;
    const x=scene===0?(index*90)*(1-ease(local*2)):(scene===1?Math.sin(local*Math.PI*3+index)*45:(index*30*Math.sin(local*Math.PI*2)));
    const y=scene===0?(index*55*(1-ease(local*1.4))):scene===1?Math.cos(local*Math.PI*2+i)*25:index*18*Math.cos(local*Math.PI*2);
    const rot=scene===1?(index*7*Math.sin(local*Math.PI*2)):scene===2?(-index*4*Math.sin(local*Math.PI*2)):0;
    const scale=scene===2?(1+.14*Math.sin(local*Math.PI*2+i)):(scene===0?.76+.24*ease(local*2):1+.045*Math.sin(local*Math.PI*2));
    line.style.transform="translate("+x+"px,"+y+"px) rotate("+rot+"deg) scale("+scale+")";
    line.style.opacity=String(Math.max(.55,Math.min(1,scene===0?.5+local*2:1)));
   });
   bars.forEach((bar,i)=>{
    const wave=Math.abs(Math.sin(local*Math.PI*4+i*.56))*.72+.2;
    bar.style.transform="scaleY("+wave.toFixed(3)+")";
   });
  }
  function setPlaying(flag){
   playing=flag;toggle.setAttribute("aria-pressed",String(flag));toggle.setAttribute("aria-label",flag?"Pausar animação":"Reproduzir animação");
   toggleIcon.textContent=flag?"Ⅱ":"▶";
   if(!flag && frame){cancelAnimationFrame(frame);frame=null;previous=null;}
   if(flag&&!frame){previous=null;frame=requestAnimationFrame(tick);}
  }
  function tick(now){
   if(!playing){frame=null;return;}
   if(previous!==null)seconds=Math.min(duration,seconds+(now-previous)/1000);
   previous=now;
   if(seconds>=duration){seconds=duration;setPlaying(false);}
   render();
   if(playing)frame=requestAnimationFrame(tick);
  }
  toggle?.addEventListener("click",()=>{if(seconds>=duration)seconds=0;setPlaying(!playing);});
  reset?.addEventListener("click",()=>{setPlaying(false);seconds=0;sceneBefore=-1;render();});
  range?.addEventListener("input",()=>{setPlaying(false);seconds=Number(range.value)/1000*duration;sceneBefore=-1;render();});
  buttons.forEach(b=>b.addEventListener("click",()=>{setPlaying(false);seconds=Number(b.dataset.reelScene)*6+.01;sceneBefore=-1;render();}));
  render();
 }
 // Progressive visual enhancement: page works without GSAP.
 if(!reduced&&window.gsap){
  try{
   const gsap=window.gsap;
   if(window.ScrollTrigger)gsap.registerPlugin(window.ScrollTrigger);
   const intro=document.querySelector(".curtain h1");
   if(intro)gsap.from(intro.children,{y:70,opacity:0,duration:1,stagger:.13,ease:"power3.out",clearProps:"all"});
   if(window.ScrollTrigger){
    document.querySelectorAll(".showpiece-description h2,.morph-copy h2,.kinetic-editorial h2").forEach(el=>gsap.from(el,{y:46,opacity:0,duration:.9,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:el,start:"top 89%",once:true}}));
    const heroOrb=document.querySelector(".morph-sculpture");
    if(heroOrb)gsap.to(heroOrb,{rotate:25,ease:"none",scrollTrigger:{trigger:".morph-hero",start:"top top",end:"bottom top",scrub:1}});
   }
  }catch(e){console.warn("GSAP enhancement skipped",e.message);}
 }
})();
