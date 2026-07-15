"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const data = require("../content.js");

const root = path.resolve(__dirname, "..");
const { site, routes, whatsappMessages, pricing, casting, cases, faq, metadata } = data;
const publicRoutes = Object.values(routes);

function routeFile(route) {
  return route === "/" ? path.join(root, "index.html") : path.join(root, route.replace(/^\//, ""), "index.html");
}

function readRoute(route) {
  return fs.readFileSync(routeFile(route), "utf8");
}

function whatsappUrl(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

test("todas as rotas possuem HTML estático e metadados", () => {
  for (const route of publicRoutes) {
    assert.ok(fs.existsSync(routeFile(route)), `HTML ausente para ${route}`);
    assert.ok(metadata[route], `Metadados ausentes para ${route}`);
    const html = readRoute(route);
    assert.match(html, new RegExp(`<title>${metadata[route].title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`));
    assert.ok(html.includes(`name="description" content="${metadata[route].description}"`));
    assert.ok(html.includes(`rel="canonical" href="${site.domain + route}"`));
    assert.ok(html.includes('property="og:title"'));
    assert.ok(html.includes('name="twitter:card"'));
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1 incorreto em ${route}`);
  }
});

test("links de WhatsApp usam o número central e codificação correta", () => {
  for (const [key, message] of Object.entries(whatsappMessages)) {
    const expected = whatsappUrl(message);
    const generatedPages = publicRoutes.map(readRoute).join("\n");
    if (["header", "hero", "castingStarter", "exclusiveInfluencer", "monthlyPlan", "largeProject", "finalCta", "productPhotos", "virtualInfluencers", "virtualUgc", "product360", "caseRosaMosqueta", "caseBiotina", "caseGotaNativa"].includes(key)) {
      assert.ok(generatedPages.includes(expected), `Link não gerado para ${key}`);
    }
    assert.equal(decodeURIComponent(new URL(expected).searchParams.get("text")), message);
  }
});

test("mensagens específicas dos principais CTAs permanecem exatas", () => {
  assert.equal(whatsappMessages.hero, "Olá, César! Vi o site Criando com IA e quero enviar uma foto do meu produto para receber ideias de criativos.");
  assert.equal(whatsappMessages.castingStarter, "Olá, César! Quero testar uma influencer do casting com o meu produto. Vi o pacote de 3 fotos no site e gostaria de saber os próximos passos.");
  assert.equal(whatsappMessages.exclusiveInfluencer, "Olá, César! Quero criar uma influencer exclusiva para a minha marca. Vi o pacote de estreia com criação da persona, 6 fotos e 1 vídeo.");
  assert.equal(whatsappMessages.monthlyPlan, "Olá, César! Vi o Plano Mensal no site Criando com IA. Quero saber como funciona a produção das 8 fotos e dos 2 vídeos para minha marca.");
  assert.equal(whatsappMessages.finalCta, "Olá, César! Quero enviar uma foto do meu produto e receber uma orientação inicial sobre os criativos mais indicados.");
});

test("casting e cases possuem slugs únicos", () => {
  assert.equal(casting.length, 20);
  assert.equal(new Set(casting.map((person) => person.slug)).size, casting.length);
  assert.equal(new Set(casting.map((person) => person.id)).size, casting.length);
  assert.equal(new Set(cases.map((item) => item.slug)).size, cases.length);
  casting.forEach((person) => {
    assert.ok(person.image && person.imageAlt && person.whatsappMessage);
    assert.ok(fs.existsSync(path.join(root, person.image.replace(/^\//, ""))), `Imagem ausente: ${person.image}`);
  });
});

test("preços preservam os valores aprovados", () => {
  assert.deepEqual(
    [pricing.transformedPhoto.current, pricing.lifestyleScene.current, pricing.product360Video.current, pricing.castingPhoto.current, pricing.castingVideo.current],
    [53, 34, 98, 49, 165]
  );
  assert.equal(pricing.castingStarter.current, 147);
  assert.equal(pricing.exclusiveInfluencer.current, 795);
  assert.equal(pricing.monthlyPlan.current, 730);
  assert.deepEqual(pricing.monthlyPlan.production, ["8 fotos profissionais com IA", "2 vídeos com IA"]);
  assert.equal(pricing.monthlyPlan.benefits.length, 6);
  assert.deepEqual(pricing.monthlyPlan.benefits, [
    "Planejamento mensal dos conteúdos",
    "Roteiro para os 2 vídeos",
    "Prioridade na produção",
    "Consistência visual do personagem",
    "1 rodada de ajustes por entrega",
    "Arquivos organizados para redes sociais",
  ]);
});

test("home segue a ordem comercial e mostra seis pessoas", () => {
  const html = readRoute("/");
  const markers = [
    'class="hero"',
    'class="capabilities"',
    'id="servicos"',
    'id="cases"',
    'id="como-funciona"',
    'id="precos"',
    'id="casting"',
    'class="why section"',
    'id="sobre"',
    'id="perguntas"',
    'id="contato"',
    'class="footer"',
  ];
  let last = -1;
  for (const marker of markers) {
    const position = html.indexOf(marker);
    assert.ok(position > last, `Ordem incorreta: ${marker}`);
    last = position;
  }
  const preview = html.match(/<div class="casting-grid casting-grid-preview">([\s\S]*?)<\/div><p class="casting-transparency">/)[1];
  assert.equal((preview.match(/data-casting-card/g) || []).length, 6);
  for (const name of ["Patricia", "Luana", "Márcia", "Camila", "Ricardo", "Aline"]) assert.ok(preview.includes(name));
});

test("casting completo possui filtros e vinte cards", () => {
  const html = readRoute(routes.casting);
  assert.equal((html.match(/data-casting-card/g) || []).length, 20);
  for (const filter of ["Todos", "Feminino", "Masculino", "22–34", "35–49", "50+", "Beleza", "Casa", "Saúde e bem-estar", "Moda", "Tecnologia", "Alimentos", "Serviços"]) {
    assert.ok(html.includes(`data-casting-filter="${filter}"`));
  }
});

test("FAQ e analytics incluem todos os comportamentos obrigatórios", () => {
  const home = readRoute("/");
  assert.equal((home.match(/data-faq-button/g) || []).length, faq.length);
  for (const item of faq) {
    assert.ok(home.includes(item.question));
    assert.ok(home.includes(item.answer));
  }
  const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
  for (const event of ["whatsapp_click", "case_open", "casting_open", "casting_profile_click", "pricing_cta_click", "video_play", "before_after_interaction", "service_page_view", "faq_open"]) {
    assert.ok(script.includes(`"${event}"`), `Evento ausente: ${event}`);
  }
});

test("sitemap lista somente as rotas públicas", () => {
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  assert.equal((sitemap.match(/<url>/g) || []).length, publicRoutes.length);
  for (const route of publicRoutes) assert.ok(sitemap.includes(`<loc>${site.domain + route}</loc>`));
  assert.ok(!sitemap.includes("assets/"));
  assert.ok(!sitemap.includes("docs/"));
});

test("conteúdo público não usa nomenclatura virtual proibida", () => {
  const publicContent = publicRoutes.map(readRoute).join("\n");
  for (const expression of ["Até a prova social eu crio com IA", "Depoimentos em vídeo — pessoas criadas com IA", "Mensalidade de Criativos", "Melhor custo-benefício", "Falta a foto"]) {
    assert.ok(!publicContent.toLocaleLowerCase("pt-BR").includes(expression.toLocaleLowerCase("pt-BR")), `Expressão proibida: ${expression}`);
  }
  assert.ok(publicContent.includes("A partir de quatro fotos de referência — frente, laterais e verso"));
  assert.ok(publicContent.includes("Projeto autoral da Criando com IA"));
});

test("imagens e vídeos publicados possuem atributos de estabilidade e carregamento", () => {
  for (const route of publicRoutes) {
    const html = readRoute(route);
    for (const image of html.match(/<img\b[^>]*>/g) || []) {
      assert.match(image, /\salt="[^"]*"/);
      assert.match(image, /\swidth="\d+"/);
      assert.match(image, /\sheight="\d+"/);
    }
    for (const video of html.match(/<video\b[^>]*>/g) || []) {
      assert.match(video, /\sposter="[^"]+"/);
      assert.match(video, /\spreload="(?:none|metadata)"/);
      if (/\sautoplay(?:\s|>)/.test(video)) assert.match(video, /\smuted(?:\s|>)/);
    }
  }
});

test("referências locais publicadas apontam para arquivos existentes", () => {
  const htmlFiles = publicRoutes.map(routeFile);
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const attributes = [...html.matchAll(/\s(?:href|src|srcset|poster|data-src)="(\/[^"]+)"/g)].map((match) => match[1].split(" ")[0]);
    for (const url of attributes) {
      const pathname = url.split(/[?#]/)[0];
      if (pathname === "/") continue;
      const destination = path.join(root, pathname.replace(/^\//, ""));
      const exists = fs.existsSync(destination) || fs.existsSync(path.join(destination, "index.html"));
      assert.ok(exists, `${path.relative(root, file)} referencia caminho ausente: ${url}`);
    }
  }
});

test("estrutura básica de acessibilidade está presente em todas as páginas", () => {
  for (const route of publicRoutes) {
    const html = readRoute(route);
    assert.ok(html.startsWith("<!doctype html>"));
    assert.ok(html.includes('<html lang="pt-BR">'));
    assert.ok(html.includes('class="skip-link" href="#conteudo"'));
    assert.ok(html.includes('id="conteudo"'));
    assert.ok(html.includes('aria-expanded="false" aria-controls="site-menu"'));
    assert.ok(html.includes('<main id="conteudo">'));
    assert.ok(html.includes('<footer class="footer">'));
  }
});
