"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=x=>fs.readFileSync(path.join(root,x),"utf8");
test("a vitrine oferece apenas landing pages e motion",()=>{
 for(const file of ["index.html","en/index.html"]){
  const html=read(file);
  assert.equal((html.match(/<article class="service"/g)||[]).length,2);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes("Landing pages"));
  assert.ok(html.includes("Motion"));
  assert.doesNotMatch(html,/<section[^>]+id="(?:casting|precos|perguntas|cases)"/i);
  assert.doesNotMatch(html,/<nav[^>]*>[\s\S]*?Influencers virtuais[\s\S]*?<\/nav>/i);
 }
});
test("a vitrine portuguesa e inglesa possuem metadados e alternates corretos",()=>{
 const pt=read("index.html"),en=read("en/index.html");
 assert.match(pt,/<html lang="pt-BR">/);
 assert.match(en,/<html lang="en">/);
 assert.match(pt,/<title>[^<]*Landing Pages &amp; Motion|<title>[^<]*Landing Pages & Motion/);
 assert.match(en,/rel="canonical" href="https:\/\/criandocomia.com\/en\/"/);
 for(const html of [pt,en]){
  assert.match(html,/rel="alternate" hreflang="pt-BR"/);
  assert.match(html,/rel="alternate" hreflang="en"/);
  assert.match(html,/meta name="description"/);
 }
});
test("dois CTAs específicos e um geral usam o WhatsApp existente",()=>{
 for(const file of ["index.html","en/index.html"]){
  const html=read(file);
  const urls=[...html.matchAll(/href="(https:\/\/api\.whatsapp\.com\/send\?[^"]+)"/g)].map(m=>m[1]);
  assert.ok(urls.length>=4);
  for(const url of urls){
   const q=new URL(url.replaceAll("&amp;","&"));
   assert.equal(q.searchParams.get("phone"),"5511978230487");
   assert.ok(q.searchParams.get("text"));
  }
 }
});
test("demos usam mídia existente, com interação, alternância e redução de movimento",()=>{
 const pt=read("index.html"),js=read("focus.js"),css=read("focus.css");
 for(const f of ["assets/biotina/produto.png","assets/gota-nativa/home-poster.jpg","assets/gota-nativa/home.mp4"]){
  assert.ok(fs.existsSync(path.join(root,f)),f);
 }
 assert.match(pt,/data-web-demo/);
 assert.match(pt,/data-motion-toggle/);
 assert.match(js,/aria-pressed/);
 assert.match(js,/IntersectionObserver/);
 assert.match(js,/prefers-reduced-motion/);
 assert.match(css,/prefers-reduced-motion/);
});
test("privacidade e termos continuam acessíveis",()=>{
 for(const file of ["politica-de-privacidade/index.html","termos-de-uso/index.html"]){
  assert.ok(fs.existsSync(path.join(root,file)));
  assert.match(read(file),/<main\b/);
 }
});
test("página inicial serve referências locais existentes",()=>{
 for(const file of ["index.html","en/index.html"]){
  const html=read(file);
  const matches=[...html.matchAll(/\s(?:src|href|poster)="(\/[^"#?]+)"/g)];
  for(const m of matches){
   const rel=m[1].replace(/^\//,"");
   assert.ok(fs.existsSync(path.join(root,rel))||fs.existsSync(path.join(root,rel,"index.html")),m[1]);
  }
 }
});
