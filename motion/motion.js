/* Motion Originals — automatic silent film playback; GSAP drives page transitions. */
(()=>{'use strict';
const videos=[...document.querySelectorAll('.intro-visual video, .work .frame video')];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData=Boolean(navigator.connection&&navigator.connection.saveData);
const enabled=!reduced&&!saveData;
const active=new WeakSet();
const prepare=(video)=>{
  video.controls=false;video.removeAttribute('controls');
  video.muted=true;video.defaultMuted=true;
  video.loop=true;video.playsInline=true;video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');video.autoplay=enabled;
  if(video.dataset.motionPrepared)return;
  video.dataset.motionPrepared='1';
  const source=video.querySelector('source[data-src]');
  if(!source)return;
  source.src=source.dataset.src;
  video.preload='auto';
  video.load();
};
const play=(video)=>{
 if(!enabled||document.hidden||!active.has(video))return;
 prepare(video);
 if(!video.paused)return;
 const result=video.play();
 if(result&&typeof result.catch==='function')result.catch(()=>{
   /* A browser policy can defer playback: retry when playable or after page activity. */
 });
};
const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
 for(const item of entries){
  const video=item.target;
  if(item.isIntersecting){
   active.add(video);play(video);
  }else{
   active.delete(video);video.pause();
  }
 }
},{threshold:.12,rootMargin:'70px 0px'}):null;
for(const video of videos){
 video.controls=false;video.removeAttribute('controls');
 video.muted=true;video.defaultMuted=true;video.playsInline=true;
 video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');
 video.setAttribute('loop','');
 if(enabled){
  video.addEventListener('canplay',()=>play(video));
  video.addEventListener('loadeddata',()=>play(video));
  if(observer)observer.observe(video);else {active.add(video);play(video)}
 }
}
document.addEventListener('visibilitychange',()=>{for(const video of videos){if(document.hidden)video.pause();else play(video)}});
window.addEventListener('pageshow',()=>{for(const video of videos)play(video)});
if(!reduced&&window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.from('.intro .intro-copy > *',{opacity:0,y:30,stagger:.12,duration:.95,ease:'power3.out'});
 gsap.from('.intro-visual',{opacity:0,scale:.96,duration:1.15,delay:.32,ease:'power3.out'});
 gsap.utils.toArray('.work').forEach(w=>{
  gsap.from(w.querySelector('.work-copy'),{opacity:0,y:35,duration:.9,ease:'power2.out',scrollTrigger:{trigger:w,start:'top 85%',once:true}});
  gsap.from(w.querySelector('.frame'),{opacity:0,y:23,duration:1,ease:'power2.out',scrollTrigger:{trigger:w,start:'top 85%',once:true}});
 });
}
})();
