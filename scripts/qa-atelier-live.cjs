"use strict";
const {chromium}=require("H:/node_modules/playwright");
const site="https://cesaroliv.github.io";
const items=[["index","/atelier/"],["landing","/atelier/landing/"],["motion","/atelier/motion/"]];
(async()=>{
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-gpu"]});
let failures=[];
for(const vp of [{name:"desktop",width:1440,height:900},{name:"mobile",width:390,height:844}]){
const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},reducedMotion:"reduce"});
const page=await context.newPage();
for(const [name,uri]of items){
const error=[];page.on("pageerror",e=>error.push(e.message));
const response=await page.goto(site+uri+"?build=17b4e5c",{waitUntil:"networkidle",timeout:28000});
const stats=await page.evaluate(()=>({h1:document.querySelector("h1")?.innerText,overflow:document.documentElement.scrollWidth>window.innerWidth+3,css:!!document.querySelector('link[href="/atelier/atelier.css"]'),scripts:!!document.querySelector('script[src="/atelier/atelier.js"]')}));
if(response.status()!==200||stats.overflow||!stats.h1||!stats.css||!stats.scripts||error.length)failures.push(name+"/"+vp.name+" "+JSON.stringify({status:response.status(),stats,error}));
if(name==="index"){await page.getByRole("button",{name:"Trocar idioma para inglês"}).click();if(!((await page.locator("h1").innerText()).includes("PAGES")))failures.push("language");}
if(name==="landing"){await page.locator("[data-morph-choice='contrair']").click();if(await page.locator("[data-morph-stage]").getAttribute("data-state")!=="contrair")failures.push("morph");}
if(name==="motion"){await page.locator("[data-reel-scene='2']").click();if(await page.locator("[data-reel-first]").innerText()!=="LEAVE")failures.push("motion");await page.locator("[data-reel-range]").fill("250");}
console.log("LIVE "+name+" "+vp.name+" "+JSON.stringify({status:response.status(),stats,error}));
page.removeAllListeners("pageerror");
}
await context.close();
}
await browser.close();
console.log("FAILURES="+failures.length);
if(failures.length){console.log(failures.join("\n"));process.exitCode=1;}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
