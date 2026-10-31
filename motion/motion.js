/* Motion Originals: GSAP for website interactions; all final video frames originate in Remotion. */
(()=>{'use strict';
const videos=[...document.querySelectorAll('video[data-src]')];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData=!!navigator.connection?.saveData;
const autoplay=!reduce&&!saveData;
const activate=(video)=>{
 if(!video.dataset.ready){const source=video.querySelector('source[data-src]');if(source){source.src=source.dataset.src;video.dataset.ready='1';video.load()}}
 if(autoplay){video.play().catch(()=>{});}
};
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const e of entries){
 const video=e.target;if(e.isIntersecting){activate(video)}else if(!video.paused){video.pause()}}
 },{rootMargin:'170px 0px',threshold:.15});
 videos.forEach(v=>observer.observe(v));
}else videos.forEach(activate);
document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(v=>v.pause())});
if(!reduce&&window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.from('.intro .intro-copy > *',{opacity:0,y:30,stagger:.12,duration:.95,ease:'power3.out'});
 gsap.from('.intro-visual',{opacity:0,scale:.96,duration:1.15,delay:.32,ease:'power3.out'});
 gsap.utils.toArray('.work').forEach(w=>{
  gsap.from(w.querySelector('.work-copy'),{opacity:0,y:35,duration:.9,ease:'power2.out',scrollTrigger:{trigger:w,start:'top 85%',once:true}});
  gsap.from(w.querySelector('.frame'),{opacity:0,y:23,duration:1,ease:'power2.out',scrollTrigger:{trigger:w,start:'top 85%',once:true}});
 });
}
})();
