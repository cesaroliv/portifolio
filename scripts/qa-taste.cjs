"use strict";
const fs=require("node:fs"),path=require("node:path"),http=require("node:http");
const {chromium}=require("H:/node_modules/playwright");
const root=path.resolve(__dirname,".."),port=8795;
const mime={".html":"text/html; charset=utf-8",".css":"text/css",".js":"application/javascript",".jpg":"image/jpeg",".webp":"image/webp",".png":"image/png",".mp4":"video/mp4"};
const server=http.createServer((req,res)=>{try{
 let f=path.resolve(root,"."+decodeURIComponent(new URL(req.url,"http://localhost").pathname));
 if(!(f===root||f.startsWith(root+path.sep))){res.writeHead(403);res.end();return;}
 if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,"index.html");
 if(!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);res.end();return;}
 res.writeHead(200,{"Content-Type":mime[path.extname(f)]||"application/octet-stream"});fs.createReadStream(f).pipe(res);
}catch(e){res.writeHead(500);res.end();}});
(async()=>{
 await new Promise(resolve=>server.listen(port,"127.0.0.1",resolve));
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-gpu"]});
 const out=path.join(root,"docs","screenshots","taste-qa");fs.mkdirSync(out,{recursive:true});
 let failures=0;
 for(const vp of [{name:"desktop",width:1440,height:900},{name:"tablet",width:768,height:1024},{name:"mobile",width:390,height:844}]){
  const ctx=await browser.newContext({viewport:{width:vp.width,height:vp.height},reducedMotion:"reduce"});
  const page=await ctx.newPage();
  for(const [name,route] of [["hub","/atelier/taste/"],["landing","/atelier/taste/rosa-mosqueta/"],["motion","/atelier/taste/motion/"]]){
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const res=await page.goto("http://127.0.0.1:"+port+route,{waitUntil:"networkidle",timeout:25000});
   const info=await page.evaluate(()=>({h1:document.querySelector("h1")?.textContent.trim(),vw:window.innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),buttons:document.querySelectorAll("button").length,links:[...document.querySelectorAll("a[href]")].length,video:document.querySelector("video")?.readyState??null}));
   if(name==="landing"){
    if(vp.width>620){await page.locator("[data-ritual-next]").click();}
    else {await page.locator("[data-ritual-track]").evaluate(el=>el.scrollLeft=el.scrollWidth-el.clientWidth);}
    await page.waitForTimeout(160);
    const width=await page.locator("[data-ritual-progress]").evaluate(el=>getComputedStyle(el).width);
    if(!width)errors.push("progress not rendered");
   }
   if(res.status()!==200||!info.h1||info.scroll>info.vw+4||info.images.length||errors.length){failures++;console.log("FAIL "+name+" "+vp.name+" "+JSON.stringify({status:res.status(),info,errors}));}
   else console.log("PASS "+name+" "+vp.name+" "+JSON.stringify(info));
   await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
   await page.screenshot({path:path.join(out,name+"-"+vp.name+".png"),fullPage:false,animations:"disabled"});
   page.removeAllListeners("pageerror");
  }
  await ctx.close();
 }
 await browser.close();server.close();
 console.log("FAILURES="+failures);if(failures)process.exitCode=1;
})().catch(e=>{console.error(e.stack);server.close();process.exitCode=1;});
