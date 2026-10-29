"use strict";
const fs = require("node:fs");
const path = require("node:path");
const src = "H:/portifolio";
const dst = "H:/CRIANDO_COM_IA_PUBLICO_GITHUB";
const oldHost = "https://criandocomia.com";
const newHost = "https://cesaroliv.github.io";
const pages = [
  "index.html","en/index.html",
  "experiencias/ritual-botanico/index.html",
  "experiencias/biotina-motion/index.html",
  "experiencias/gota-nativa/index.html",
  "cases/rosa-mosqueta/index.html",
  "cases/biotina/index.html",
  "cases/gota-nativa/index.html",
  "casting/index.html",
  "servicos/fotos-de-produto-com-ia/index.html",
  "servicos/influencers-virtuais/index.html",
  "servicos/videos-ugc-com-ia/index.html",
  "servicos/video-360-produto/index.html",
  "politica-de-privacidade/index.html",
  "termos-de-uso/index.html"
];
const support = ["styles.min.css","showcase.css","content.js","script.js","showcase.js","focus.css","focus.js","sitemap.xml","robots.txt"];
const assets = new Set();
function putFile(relative, transform=false) {
  const from = path.join(src, relative);
  const to = path.join(dst, relative);
  if (!fs.existsSync(from)) throw Error("Missing source: " + relative);
  fs.mkdirSync(path.dirname(to), {recursive:true});
  if(transform){
    let data = fs.readFileSync(from, "utf8");
    data = data.replaceAll(oldHost, newHost);
    fs.writeFileSync(to,data,"utf8");
  }else fs.copyFileSync(from,to);
}
if(!fs.existsSync(src)) throw Error("Original missing");
fs.mkdirSync(dst,{recursive:true});
for(const f of [...pages,...support]) putFile(f, f.endsWith(".html")||f.endsWith(".xml")||f.endsWith(".txt"));
fs.writeFileSync(path.join(dst,".nojekyll"),"","utf8");
const publicText = [...pages,...support].map(f=>fs.readFileSync(path.join(dst,f),"utf8")).join("\n");
const refRegex = /(?:\/assets\/|assets\/)(?:[a-zA-Z0-9_.%-]+\/)*[a-zA-Z0-9_.%-]+\.(?:png|jpe?g|gif|webp|svg|ico|mp4)/gi;
for (const m of publicText.matchAll(refRegex)) {
  let p = m[0];
  if(p.startsWith("/"))p=p.slice(1);
  assets.add(p);
}
let missing=[], sizes=0, limit=25*1024*1024;
for(const f of [...assets].sort()){
  const from=path.join(src,f);
  if(!fs.existsSync(from)){missing.push(f);continue;}
  const bytes=fs.statSync(from).size;
  if(bytes>limit) throw Error("Asset over hosting limit:"+f+" "+bytes);
  putFile(f);
  sizes+=bytes;
}
if(missing.length) throw Error("Missing assets: "+missing.join("\n"));
console.log(JSON.stringify({output:dst,pageCount:pages.length,assetCount:assets.size,bytes:sizes,missing,supportFiles:support.length},null,2));
