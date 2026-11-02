/* Transitions over original logo video; accessibility and CTAs preserved. */
(()=>{"use strict";const stage=document.querySelector(".cia-film-hero__stage"),v=document.getElementById("cia-brand-film");if(!stage||!v)return;
const reduce=matchMedia("(prefers-reduced-motion: reduce)"),dataSaver=navigator.connection?.saveData===true;
const pause=()=>{if(!v.paused)v.pause()};
let raf=0;
function state(){stage.classList.toggle("is-brand-reveal",!reduce.matches&&!dataSaver&&!v.paused&&v.readyState>=2&&v.currentTime>=3.15&&v.currentTime<9.85)}
function loop(){state();raf=requestAnimationFrame(loop)}
function begin(){if(reduce.matches||dataSaver){pause();return}if(!raf)loop()}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}state()}
v.addEventListener("play",begin);v.addEventListener("playing",begin);v.addEventListener("pause",stop);
document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else if(!v.paused)begin()});
if(reduce.addEventListener)reduce.addEventListener("change",()=>{if(reduce.matches){pause();stop()}else state()});
if(reduce.matches||dataSaver)pause();else if(!v.paused)begin();
})();