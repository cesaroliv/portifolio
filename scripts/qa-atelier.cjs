"use strict";
const fs=require("node:fs"),path=require("node:path"),http=require("node:http");
const {chromium}=require("H:/node_modules/playwright");
const root=path.resolve(__dirname,"..");
const mim={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".png":"image/png",".jpg":"image/jpeg"};
const server=http.createServer((req,res)=>{
 try{
 let filename=path.resolve(root,"."+decodeURIComponent(new URL(req.url,"http://localhost").pathname));
 if(!filename.startsWith(root+path.sep)&&filename!==root){res.writeHead(403);res.end();return;}
 if(fs.existsSync(filename)&&fs.statSync(filename).isDirectory())filename=path.join(filename,"index.html");
 if(!fs.existsSync(filename)){res.writeHead(404);res.end();return;}
 res.writeHead(200,{"Content-Type":mim[path.extname(filename)]||"application/octet-stream"});
 fs.createReadStream(filename).pipe(res);
 }catch(e){res.writeHead(500);res.end();}
});
(async()=>{
 await new Promise(resolve=>server.listen(8792,"127.0.0.1",resolve));
 const browser=await chromium.launch({headless:true,channel:"chrome",args:["--disable-gpu"]});
 const shot=path.join(root,"docs","screenshots","atelier");fs.mkdirSync(shot,{recursive:true});
 const modes=[{name:"desktop",width:1440,height:900},{name:"mobile",width:390,height:844}];
 const pages=[{name:"home",path:"/atelier/"},{name:"landing",path:"/atelier/landing/"},{name:"motion",path:"/atelier/motion/"}];
 let fails=[];
 for(const mode of modes){
  const context=await browser.newContext({viewport:{width:mode.width,height:mode.height},reducedMotion:"reduce"});
  const page=await context.newPage();
  for(const item of pages){
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const response=await page.goto("http://127.0.0.1:8792"+item.path,{waitUntil:"domcontentloaded",timeout:20000});
   await page.waitForTimeout(180);
   const metric=await page.evaluate(()=>({title:document.title,h1:document.querySelector("h1")?.innerText,scroll:document.documentElement.scrollWidth,win:window.innerWidth,links:[...document.querySelectorAll("a[href]")].length}));
   if(response.status()!==200||!metric.h1||metric.scroll>metric.win+3||errors.length)fails.push(item.name+"-"+mode.name+" "+JSON.stringify({status:response.status(),metric,errors}));
   if(item.name==="home"){
    if(await page.locator('a[href="/atelier/landing/"]').count()!==1 ||await page.locator('a[href="/atelier/motion/"]').count()!==1)fails.push("home links");
    await page.locator("[data-language]").click();
    const label=await page.locator("#page-title").innerText();
    if(!label.includes("PAGES"))fails.push("language toggle");
   }
   if(item.name==="landing"){
    await page.locator("[data-morph-choice=orbitar]").click();
    const state=await page.locator("[data-morph-stage]").getAttribute("data-state");
    if(state!=="orbitar")fails.push("landing switch");
   }
   if(item.name==="motion"){
    await page.locator("[data-reel-scene='1']").click();
    const label=await page.locator("[data-reel-first]").innerText();
    if(label!=="FEEL")fails.push("motion scene switch");
    await page.locator("[data-reel-range]").fill("850");
    const time=await page.locator("[data-current-time]").innerText();
    if(!time.startsWith("00:1"))fails.push("motion scrubbing "+time);
   }
   const file=path.join(shot,item.name+"-"+mode.name+".png");
   await page.screenshot({path:file,fullPage:false,animations:"disabled"});
   console.log("VIEW "+item.name+" "+mode.name+" "+JSON.stringify(metric)+" pageErrors="+JSON.stringify(errors));
   page.removeAllListeners("pageerror");
  }
  await context.close();
 }
 await browser.close();server.close();
 console.log("FAILURES="+fails.length);
 if(fails.length){console.log(fails.join("\n"));process.exitCode=1;}
})().catch(e=>{console.error(e.stack);server.close();process.exitCode=1;});
