"use strict";
(function(){
 const track=document.querySelector("[data-ritual-track]");
 if(track){
  const prev=document.querySelector("[data-ritual-prev]");
  const next=document.querySelector("[data-ritual-next]");
  const progress=document.querySelector("[data-ritual-progress]");
  const cards=Array.from(track.querySelectorAll(".ritual-card"));
  const update=()=>{
   const range=Math.max(1,track.scrollWidth-track.clientWidth);
   const ratio=Math.max(0,Math.min(1,track.scrollLeft/range));
   progress.style.width=(33.333+ratio*66.667)+"%";
   if(prev)prev.disabled=track.scrollLeft<3;
   if(next)next.disabled=track.scrollLeft>=range-3;
  };
  const move=dir=>{
   const current=cards.reduce((best,c,i)=>{
    const dist=Math.abs(c.offsetLeft-track.offsetLeft-track.scrollLeft);
    return dist<best.dist?{i,dist}:best;
   },{i:0,dist:Infinity}).i;
   const index=Math.max(0,Math.min(cards.length-1,current+dir));
   track.scrollTo({left:cards[index].offsetLeft-cards[0].offsetLeft,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  prev?.addEventListener("click",()=>move(-1));
  next?.addEventListener("click",()=>move(1));
  track.addEventListener("scroll",update,{passive:true});
  window.addEventListener("resize",update,{passive:true});
  update();
 }
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 document.querySelectorAll("[data-preview-video]").forEach(video=>{
  if(reduced){video.pause();video.removeAttribute("autoplay");}
  else{video.play().catch(()=>{});}
 });
 if(!reduced&&window.gsap){
  try{
   const gsap=window.gsap;
   if(window.ScrollTrigger)gsap.registerPlugin(window.ScrollTrigger);
   const title=document.querySelector(".rosa-hero h1");
   if(title)gsap.from(title.children,{yPercent:15,opacity:0,duration:.85,stagger:.11,ease:"power3.out",clearProps:"all"});
   const hubTitle=document.querySelector(".hub-intro h1");
   if(hubTitle)gsap.from(hubTitle,{y:38,opacity:0,duration:.9,ease:"power3.out",clearProps:"all"});
   const heroPhoto=document.querySelector(".hub-right img");
   if(heroPhoto)gsap.from(heroPhoto,{scale:1.09,opacity:.6,duration:1.3,ease:"power2.out",clearProps:"all"});
   const targets=document.querySelectorAll(".hub-work-copy h2,.rosa-intro h2,.rosa-gallery h2,.rosa-ritual h2,.motion-process h2");
   if(targets.length&&"IntersectionObserver" in window){
    const obs=new IntersectionObserver(entries=>{
     entries.forEach(entry=>{if(entry.isIntersecting){
      obs.unobserve(entry.target);gsap.from(entry.target,{y:26,opacity:.3,duration:.8,ease:"power2.out",clearProps:"all"});
     }});
    },{threshold:.16});
    targets.forEach(el=>obs.observe(el));
   }
  }catch(err){console.warn("Motion enhancement unavailable",err.message)}
 }
})();
