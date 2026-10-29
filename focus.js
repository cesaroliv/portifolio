"use strict";
(function(){
const reduced=window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const preview=document.querySelector("[data-web-demo]");
if(preview){
 const image=preview.querySelector("[data-web-image]");
 const buttons=[...preview.querySelectorAll("[data-theme]")];
 const themes={botanical:"/assets/biotina/produto.png",night:"/assets/biotina/produto.png"};
 buttons.forEach(button=>button.addEventListener("click",()=>{
  const choice=button.dataset.theme;
  if(!Object.hasOwn(themes,choice))return;
  image.src=themes[choice];
  image.alt=choice==="night"?"Produto em conceito editorial noturno":"Produto em conceito editorial claro";
  preview.dataset.look=choice;
  buttons.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
 }));
}
const video=document.querySelector("[data-motion-video]");
const toggle=document.querySelector("[data-motion-toggle]");
if(video&&toggle){
 let manualPause=false;
 const reflect=()=>{
  const playing=!video.paused;
  video.classList.toggle("is-playing",playing);
  toggle.textContent=playing?"Ⅱ":"▶";
  toggle.setAttribute("aria-label",playing?toggle.dataset.pause:toggle.dataset.play);
  toggle.setAttribute("aria-pressed",String(playing));
 };
 toggle.addEventListener("click",async()=>{
  if(!video.paused){manualPause=true;video.pause();}
  else{manualPause=false;try{await video.play();}catch{}}
  reflect();
 });
 video.addEventListener("play",reflect);
 video.addEventListener("pause",reflect);
 reflect();
 if(!reduced&&"IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
   if(entries[0].isIntersecting && !manualPause){video.play().catch(()=>{});}
   else if(!entries[0].isIntersecting){video.pause();}
  },{threshold:.35});
  observer.observe(video);
 }
}
if(reduced||!window.gsap)return;
try{
 const gsap=window.gsap;
 if(window.ScrollTrigger)gsap.registerPlugin(window.ScrollTrigger);
 gsap.from(".hero-copy .eyebrow,.hero h1,.hero-intro,.actions",{opacity:0,y:25,duration:.85,stagger:.12,ease:"power3.out",clearProps:"all"});
 gsap.from(".hero-visual",{opacity:0,y:35,rotate:4,duration:1.15,delay:.2,ease:"power3.out",clearProps:"all"});
 if(window.ScrollTrigger){
  gsap.utils.toArray(".service,.section-heading,.contact>div").forEach(el=>{
   gsap.from(el,{opacity:0,y:28,duration:.85,ease:"power2.out",clearProps:"all",scrollTrigger:{trigger:el,start:"top 92%",once:true}});
  });
 }
}catch(error){console.warn("Animation enhancement skipped",error.message);}
})();
