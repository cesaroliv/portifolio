"use strict";
const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const {spawnSync}=require("node:child_process");
const {chromium}=require("H:/node_modules/playwright");
const root=path.resolve(__dirname,"..");
const port=8794;
const types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"application/javascript",".jpg":"image/jpeg",".webp":"image/webp",".png":"image/png"};
const server=http.createServer((req,res)=>{
 try{
  let f=path.resolve(root,"."+decodeURIComponent(new URL(req.url,"http://localhost").pathname));
  if(!f.startsWith(root+path.sep)&&f!==root){res.writeHead(403);res.end();return;}
  if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,"index.html");
  if(!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{"Content-Type":types[path.extname(f).toLowerCase()]||"application/octet-stream"});fs.createReadStream(f).pipe(res);
 }catch(e){res.writeHead(500);res.end()}
});
(async()=>{
 await new Promise(resolve=>server.listen(port,"127.0.0.1",resolve));
 const dir=path.join(root,"docs","screenshots","taste-motion");fs.mkdirSync(dir,{recursive:true});
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-gpu"]});
 const context=await browser.newContext({viewport:{width:720,height:1280},recordVideo:{dir,size:{width:720,height:1280}},deviceScaleFactor:1});
 const page=await context.newPage();
 const issues=[];page.on("pageerror",e=>issues.push(e.message));
 const response=await page.goto("http://127.0.0.1:"+port+"/atelier/taste/motion/reel-canvas.html",{waitUntil:"networkidle",timeout:20000});
 if(response.status()!==200)throw Error("Reel storyboard HTTP "+response.status());
 const t0=Date.now();
 for(const [target,name] of [[800,"shot1"],[3900,"shot2"],[6900,"shot3"],[10000,"shot4"]]){
  const delay=Math.max(0,target-(Date.now()-t0));
  await page.waitForTimeout(delay);
  await page.screenshot({path:path.join(dir,name+".png")});
  console.log("frame "+name+" t="+(Date.now()-t0));
 }
 await page.waitForTimeout(Math.max(0,12200-(Date.now()-t0)));
 const video=page.video();
 await page.close();await context.close();await browser.close();server.close();
 if(issues.length)throw Error("Browser errors: "+issues.join(" / "));
 const saved=await video.path();const dest=path.join(root,"atelier","taste","motion","rosa-mosqueta-motion.mp4");
 const encode=spawnSync("ffmpeg",["-y","-hide_banner","-loglevel","error","-i",saved,"-c:v","libx264","-crf","23","-preset","fast","-pix_fmt","yuv420p","-movflags","+faststart","-an",dest],{encoding:"utf8",timeout:120000});
 if(encode.status!==0)throw Error("ffmpeg: "+encode.stderr);
 const probe=spawnSync("ffprobe",["-v","error","-show_entries","format=duration,size","-of","json",dest],{encoding:"utf8"});
 console.log("VIDEO "+dest+" "+probe.stdout);
})().catch(e=>{console.error(e.stack);try{server.close()}catch{};process.exitCode=1});
