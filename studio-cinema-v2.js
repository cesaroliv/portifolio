"use strict";
(()=>{
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const saveData=navigator.connection?.saveData===true;
 const videos=[...document.querySelectorAll("[data-cinema-video]")];
 const sound=document.querySelector("[data-sound-toggle]");
 const noctis=document.querySelector(".video-vertical video");
 function stop(v){try{v.pause()}catch(e){}}
 function play(v){if(reduced||saveData)return;const p=v.play();if(p?.catch)p.catch(()=>{});}
 if("IntersectionObserver"in window){const watcher=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting){if(target.dataset.onDemand)target.preload="metadata";play(target)}else stop(target)})},{threshold:.22,rootMargin:"150px 0px"});videos.forEach(v=>watcher.observe(v));}
 else if(!reduced&&!saveData){videos.slice(0,1).forEach(play)}
 document.addEventListener("visibilitychange",()=>{if(document.hidden)videos.forEach(stop);else if(!reduced&&!saveData){videos.filter(v=>{const r=v.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).forEach(play)}});
 if(sound&&noctis){sound.addEventListener("click",()=>{if(noctis.muted){videos.filter(v=>v!==noctis).forEach(stop);noctis.muted=false;sound.setAttribute("aria-pressed","true");sound.setAttribute("aria-label","Desativar som do filme NOCTIS");sound.innerHTML='DESATIVAR SOM <span aria-hidden="true">♫</span>';noctis.play().catch(()=>{});}else{noctis.muted=true;sound.setAttribute("aria-pressed","false");sound.setAttribute("aria-label","Ativar som do filme NOCTIS");sound.innerHTML='ATIVAR SOM <span aria-hidden="true">♫</span>';}});}
 if(!reduced&&"IntersectionObserver"in window){document.querySelectorAll(".manifesto-copy,.portfolio-head,.project-copy,.offer-header,.offer-item,.contact h2").forEach(el=>el.setAttribute("data-reveal",""));const ro=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("is-visible");ro.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll("[data-reveal]").forEach(x=>ro.observe(x));document.body.classList.add("has-motion");}
})();