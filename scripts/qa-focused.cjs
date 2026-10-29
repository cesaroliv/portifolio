"use strict";
const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const {chromium}=require("H:/node_modules/playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".jpg":"image/jpeg",".png":"image/png",".webp":"image/webp",".mp4":"video/mp4"};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
 let name=path.resolve(root,"."+pathname);
 if(!(name===root||name.startsWith(root+path.sep))){res.writeHead(403);res.end();return;}
 if(fs.existsSync(name)&&fs.statSync(name).isDirectory())name=path.join(name,"index.html");
 if(!fs.existsSync(name)||!fs.statSync(name).isFile()){res.writeHead(404);res.end();return;}
 res.writeHead(200,{"Content-Type":mime[path.extname(name)]||"application/octet-stream"});fs.createReadStream(name).pipe(res);
});
(async()=>{
 await new Promise(resolve=>server.listen(8791,"127.0.0.1",resolve));
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-gpu"]});
 const shots=path.join(root,"docs","screenshots","focus-local");fs.mkdirSync(shots,{recursive:true});
 let failures=[];
 for(const mode of [{name:"desktop",width:1440,height:900},{name:"mobile",width:390,height:844}]){
  const context=await browser.newContext({viewport:{width:mode.width,height:mode.height},reducedMotion:"reduce"});
  const page=await context.newPage();
  for(const route of [{name:"pt",path:"/"},{name:"en",path:"/en/"}]){
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const result=await page.goto("http://127.0.0.1:8791"+route.path,{waitUntil:"load"});
   const met=await page.evaluate(()=>({title:document.title,h1:document.querySelector("h1")?.innerText,bodyWidth:document.documentElement.scrollWidth,windowWidth:window.innerWidth,broken:[...document.images].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.src),videos:document.querySelectorAll("video").length,serviceCards:document.querySelectorAll("article.service").length,links:[...document.querySelectorAll(".service-link")].map(x=>x.href)}));
   if(result.status()!==200||met.bodyWidth>met.windowWidth+3||met.broken.length||met.serviceCards!==2||met.videos!==1)errors.push(JSON.stringify(met));
   await page.locator('[data-theme="night"]').click();
   const src=await page.locator("[data-web-image]").getAttribute("src");
   if(!src.endsWith("biotina/produto.png") || await page.locator('[data-theme="night"]').getAttribute("aria-pressed")!=="true")errors.push("Switch not functional");
   await page.locator('[data-theme="botanical"]').click();
   await page.screenshot({path:path.join(shots,route.name+"-"+mode.name+".png"),animations:"disabled",fullPage:true});
   console.log((errors.length?"FAIL":"PASS")+" "+route.name+" "+mode.name+" "+JSON.stringify({h1:met.h1,viewport:met.windowWidth,bodyWidth:met.bodyWidth,video:met.videos,services:met.serviceCards,broken:met.broken,errors}));
   if(errors.length)failures.push(route.name+"/"+mode.name+" "+errors.join(","));
   page.removeAllListeners("pageerror");
  }
  await context.close();
 }
 await browser.close();server.close();console.log("FAILURES="+failures.length);
 if(failures.length){console.log(failures.join("\n"));process.exitCode=1;}
})().catch(e=>{console.error(e.stack);server.close();process.exitCode=1;});
