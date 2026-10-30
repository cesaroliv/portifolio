'use strict';
(()=>{
 const story=document.querySelector('[data-story]');if(!story)return;
 const scenes=[...document.querySelectorAll('[data-scene]')];
 const buttons=[...document.querySelectorAll('[data-scene-button]')];
 const indicator=document.querySelector('[data-stage-number]');
 const bar=document.querySelector('[data-progress-fill]');
 const progress=document.querySelector('[data-progress]');
 const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
 let current=-1, scheduled=false;
 function activate(index){
   if(index===current)return;current=index;
   scenes.forEach((s,i)=>{let active=i===index;s.classList.toggle('is-current',active);s.setAttribute('aria-hidden',String(!active));});
   buttons.forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
   if(indicator) indicator.textContent=`0${index+1} / 03`;
 }
 function update(){scheduled=false;if(reduced.matches)return;
  const rect=story.getBoundingClientRect();const amount=Math.max(1,story.offsetHeight-window.innerHeight);
  const ratio=Math.min(1,Math.max(0,-rect.top/amount));
  activate(Math.min(2,Math.floor(ratio*3)));
  if(bar)bar.style.width=(ratio*100).toFixed(1)+'%';
  if(progress)progress.setAttribute('aria-valuenow',String(Math.round(ratio*100)));
 }
 function onScroll(){if(scheduled)return;scheduled=true;requestAnimationFrame(update)}
 for(const [i,button] of buttons.entries())button.addEventListener('click',()=>{
  if(reduced.matches){scenes[i].scrollIntoView({block:'center'});return;}
  const start=window.scrollY+story.getBoundingClientRect().top;
  const distance=story.offsetHeight-window.innerHeight;
  const target=start+distance*Math.min(.98,(i+.12)/3);
  window.scrollTo({top:target,behavior:'smooth'});
 });
 function motionChanged(){if(reduced.matches){scenes.forEach(s=>{s.classList.add('is-current');s.setAttribute('aria-hidden','false')});}else{current=-1;update()}}
 reduced.addEventListener?.('change',motionChanged);
 window.addEventListener('scroll',onScroll,{passive:true});
 window.addEventListener('resize',onScroll,{passive:true});
 motionChanged();
 const video=document.querySelector('.film-device video');
 if(video&&reduced.matches){video.removeAttribute('autoplay')}
})();
