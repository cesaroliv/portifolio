/* Device previews: genuine captured pages, no iframe/site embedding, no third-party dependency. */
(()=>{'use strict';
const en=document.documentElement.lang.startsWith('en');
const words=en?{pause:'Pause',play:'Play',pauseLabel:'Pause both previews',playLabel:'Play both previews',close:'Close preview',label:'RESPONSIVE EXPERIENCE',note:'Real page recordings. Use the project link to visit the website.',desktop:'Desktop',mobile:'Mobile'}:{pause:'Pausar',play:'Reproduzir',pauseLabel:'Pausar as duas prévias',playLabel:'Reproduzir as duas prévias',close:'Fechar prévia',label:'EXPERIÊNCIA RESPONSIVA',note:'Gravações reais da página. Use o link do projeto para visitar o site.',desktop:'Desktop',mobile:'Mobile'};
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const connection=navigator.connection;
const states=[...document.querySelectorAll('[data-device-stage]')].map(el=>({el,videos:[...el.querySelectorAll('video[data-preview-src]')],button:el.querySelector('[data-preview-toggle]'),ratio:0,pausedByUser:false,force:false}));
if(!states.length)return;
let dialog=null,modalVideo=null,activeState=null,previousFocus=null;
const pauseIcon='<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1" width="3" height="10" rx=".8"/><rect x="7" y="1" width="3" height="10" rx=".8"/></svg>';
const playIcon='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l8-4.5z"/></svg>';
function label(state){const on=state.videos.some(v=>!v.paused&&!v.ended);state.button.innerHTML=(on?pauseIcon:playIcon)+'<span>'+(on?words.pause:words.play)+'</span>';state.button.setAttribute('aria-label',on?words.pauseLabel:words.playLabel);state.button.setAttribute('aria-pressed',on?'true':'false');}
function halt(state){state.videos.forEach(v=>v.pause());label(state);}
function load(v){if(!v.getAttribute('src')){v.src=v.dataset.previewSrc;v.preload='metadata';v.load();}}
function play(state){state.videos.forEach(v=>{load(v);v.muted=true;const p=v.play();if(p)p.catch(()=>label(state));});}
function reconcile(){const candidates=states.filter(s=>s.ratio>.16&&!s.pausedByUser&&(s.force||(!reduced.matches&&!connection?.saveData))).sort((a,b)=>Number(b.force)-Number(a.force)||b.ratio-a.ratio).slice(0,2);states.forEach(s=>{if(!document.hidden&&!dialog?.open&&candidates.includes(s))play(s);else halt(s)});}
for(const state of states){state.videos.forEach(v=>{v.addEventListener('play',()=>label(state));v.addEventListener('pause',()=>label(state));v.addEventListener('error',()=>{v.pause();label(state)});});state.button.addEventListener('click',()=>{const wasPlaying=state.videos.some(v=>!v.paused);state.pausedByUser=wasPlaying;state.force=!wasPlaying;reconcile();});state.el.querySelector('[data-preview-expand]').addEventListener('click',()=>open(state));label(state);}
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{for(const e of entries){const s=states.find(x=>x.el===e.target);if(s)s.ratio=e.intersectionRatio;}reconcile();},{threshold:[0,.16,.3,.5,.75,1]});states.forEach(s=>io.observe(s.el));}
else{function visibility(){states.forEach(s=>{const r=s.el.getBoundingClientRect();s.ratio=r.bottom>0&&r.top<innerHeight ? 0.5 : 0});reconcile();}addEventListener('scroll',visibility,{passive:true});visibility();}
reduced.addEventListener?.('change',reconcile);connection?.addEventListener?.('change',reconcile);document.addEventListener('visibilitychange',()=>{if(document.hidden)modalVideo?.pause();reconcile();});
function createDialog(){
 dialog=document.createElement('dialog');dialog.className='device-dialog';dialog.setAttribute('aria-labelledby','device-dialog-title');
 dialog.innerHTML='<div class="device-dialog__bar"><h2 class="device-dialog__title" id="device-dialog-title"><small>'+words.label+'</small><span></span></h2><button class="device-dialog__close" type="button" aria-label="'+words.close+'">×</button></div><div class="device-dialog__toolbar" role="group" aria-label="'+(en?'Screen format':'Formato de tela')+'"><button type="button" data-dialog-format="desktop" aria-pressed="true">Desktop</button><button type="button" data-dialog-format="mobile" aria-pressed="false">Mobile</button></div><div class="device-dialog__media"><video muted loop playsinline controls preload="metadata"></video></div><p class="device-dialog__note">'+words.note+'</p>';
 document.body.append(dialog);modalVideo=dialog.querySelector('video');
 dialog.querySelector('.device-dialog__close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();document.body.classList.remove('has-device-dialog');previousFocus?.focus({preventScroll:true});reconcile();});
 dialog.querySelectorAll('[data-dialog-format]').forEach(b=>b.addEventListener('click',()=>format(b.dataset.dialogFormat)));
}
function format(mode){const source=activeState.videos.find(v=>v.dataset.previewFormat===mode);if(!source)return;modalVideo.pause();dialog.querySelector('.device-dialog__media').classList.toggle('is-mobile',mode==='mobile');dialog.querySelectorAll('[data-dialog-format]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dialogFormat===mode)));modalVideo.poster=source.poster;modalVideo.src=source.dataset.previewSrc;modalVideo.setAttribute('aria-label',activeState.el.dataset.projectName+' — '+mode);modalVideo.muted=true;modalVideo.load();if(!reduced.matches&&!connection?.saveData)modalVideo.play().catch(()=>{});}
function open(state){if(!dialog)createDialog();activeState=state;previousFocus=document.activeElement;states.forEach(halt);dialog.querySelector('.device-dialog__title>span').textContent=state.el.dataset.projectName;document.body.classList.add('has-device-dialog');dialog.showModal();format(innerWidth<=600?'mobile':'desktop');dialog.querySelector('.device-dialog__close').focus();}
})();
