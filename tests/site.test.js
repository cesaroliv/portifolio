"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const data = require("../content.js");

const root = path.resolve(__dirname, "..");
const {
  site,
  routes,
  whatsappMessages,
  about,
  copy,
  influencerExplainer,
  pricing,
  casting,
  cases,
  faq,
  institutional,
  metadata,
  normalizeWhatsAppNumber,
  createWhatsAppUrl,
} = data;
const publicRoutes = Object.values(routes);

function routeFile(route) {
  return route === "/" ? path.join(root, "index.html") : path.join(root, route.replace(/^\//, ""), "index.html");
}

function readRoute(route) {
  return fs.readFileSync(routeFile(route), "utf8");
}

function caseNarrativeHash(route) {
  const article = readRoute(route).match(/<article class="case-page">([\s\S]*?)<\/article>/)?.[1] || "";
  const text = article.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(text).digest("hex");
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

test("links de WhatsApp usam função central, endpoint robusto e codificação única", () => {
  assert.equal(normalizeWhatsAppNumber(`+${site.whatsapp.slice(0, 2)} (${site.whatsapp.slice(2, 4)}) ${site.whatsapp.slice(4, 9)}-${site.whatsapp.slice(9)}`), site.whatsapp);
  assert.equal(site.whatsappEndpoint, "https://api.whatsapp.com/send");
  const generatedPages = publicRoutes.map(readRoute).join("\n");

  for (const [key, message] of Object.entries(whatsappMessages)) {
    const expected = createWhatsAppUrl(message);
    if (["header", "hero", "castingStarter", "exclusiveInfluencer", "monthlyPlan", "largeProject", "finalCta", "productPhotos", "virtualInfluencers", "virtualUgc", "product360", "caseRosaMosqueta", "caseBiotina", "caseGotaNativa"].includes(key)) {
      assert.ok(generatedPages.includes(expected), `Link não gerado para ${key}`);
    }
    const parsed = new URL(expected);
    assert.equal(parsed.hostname, "api.whatsapp.com");
    assert.equal(parsed.pathname, "/send");
    assert.equal(parsed.searchParams.get("phone"), site.whatsapp);
    assert.equal(parsed.searchParams.get("text"), message);
    assert.ok(!expected.includes("%25C3"), `Texto duplamente codificado em ${key}`);
  }

  for (const person of casting) assert.ok(generatedPages.includes(createWhatsAppUrl(person.whatsappMessage)));
  for (const anchor of generatedPages.match(/<a\b[^>]*data-whatsapp[^>]*>/g) || []) {
    const href = anchor.match(/href="([^"]+)"/)?.[1] || "";
    assert.ok(href.startsWith(`${site.whatsappEndpoint}?phone=${site.whatsapp}&text=`), href);
    assert.ok(!/H:\\|localhost|wa\.me/i.test(href), href);
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noopener noreferrer"/);
  }

  const buildSource = fs.readFileSync(path.join(root, "scripts", "build.js"), "utf8");
  const browserSource = fs.readFileSync(path.join(root, "script.js"), "utf8");
  assert.ok(buildSource.includes("createWhatsAppUrl(message)"));
  assert.ok(browserSource.includes("data.createWhatsAppUrl(message)"));
  assert.ok(!/wa\.me|api\.whatsapp\.com/.test(buildSource));
  assert.ok(!/wa\.me|api\.whatsapp\.com/.test(browserSource));
});

test("mensagens específicas dos principais CTAs permanecem exatas", () => {
  assert.equal(whatsappMessages.hero, "Olá, Cesar! Vi o site Criando com IA e quero enviar uma foto do meu produto para receber ideias de criativos.");
  assert.equal(whatsappMessages.castingStarter, "Olá, Cesar! Quero testar uma influencer do casting com o meu produto. Vi o pacote de 3 fotos no site e gostaria de saber os próximos passos.");
  assert.equal(whatsappMessages.exclusiveInfluencer, "Olá, Cesar! Quero criar uma influencer exclusiva para a minha marca. Vi o pacote de estreia com criação da persona, 6 fotos e 1 vídeo.");
  assert.equal(whatsappMessages.monthlyPlan, "Olá, Cesar! Vi o Plano Mensal no site Criando com IA. Quero saber como funciona a produção das 8 fotos e dos 2 vídeos para minha marca.");
  assert.equal(whatsappMessages.finalCta, "Olá, Cesar! Quero enviar uma foto do meu produto e receber uma orientação inicial sobre os criativos mais indicados.");
});

test("casting e cases possuem slugs únicos", () => {
  assert.equal(casting.length, 20);
  assert.equal(new Set(casting.map((person) => person.slug)).size, casting.length);
  assert.equal(new Set(casting.map((person) => person.id)).size, casting.length);
  assert.equal(new Set(cases.map((item) => item.slug)).size, cases.length);
  casting.forEach((person) => {
    assert.ok(person.image && person.imageAlt && person.whatsappMessage && person.communicationTone);
    assert.ok(person.communicationTone.split(/\s+/).length <= 3);
    assert.ok(fs.existsSync(path.join(root, person.image.replace(/^\//, ""))), `Imagem ausente: ${person.image}`);
  });
});

test("preços preservam os valores aprovados", () => {
  assert.deepEqual(
    [pricing.transformedPhoto.current, pricing.lifestyleScene.current, pricing.product360Video.current, pricing.castingPhoto.current, pricing.castingVideo.current],
    [53, 34, 98, 49, 165]
  );
  assert.equal(pricing.castingStarter.current, 147);
  assert.equal(pricing.exclusiveInfluencer.current, 595);
  assert.equal(pricing.monthlyPlan.current, 630);
  assert.deepEqual(pricing.exclusiveInfluencer.production, [
    "Criação da persona — perfil, personalidade e posicionamento",
    "Character sheet — guia visual da personagem",
    "6 fotos",
    "1 vídeo UGC de até 30 segundos",
  ]);
  assert.equal(pricing.exclusiveInfluencer.creationCurrent, 340);
  assert.equal(pricing.exclusiveInfluencer.laterPhoto, 49);
  assert.equal(pricing.exclusiveInfluencer.laterVideo, 165);
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
  assert.equal(pricing.lifestyleScene.label, "Cena de uso adicional");
  assert.equal(pricing.lifestyleScene.detail, "Para clientes que já contrataram a foto transformada do mesmo produto.");
  assert.equal(pricing.lifestyleScene.description, "Criação de uma nova cena contextual com o produto já tratado, preparada para redes sociais, anúncios, catálogo ou página de produto.");
  for (const item of Object.values(pricing)) {
    assert.ok(!Object.hasOwn(item, "regular"));
    assert.ok(!Object.hasOwn(item, "creationRegular"));
  }
});

test("home exibe somente os preços atuais e a cena de uso adicional", () => {
  const html = readRoute("/");
  assert.ok(html.includes("R$\u00a0595"));
  assert.ok(html.includes("R$\u00a0630<small>/mês</small>"));
  assert.ok(html.includes("Cena de uso adicional"));
  assert.ok(html.includes("Para clientes que já contrataram a foto transformada do mesmo produto."));
  assert.ok(html.includes("Criação de uma nova cena contextual com o produto já tratado"));
  assert.doesNotMatch(html, /<(?:s|del)\b/i);
  assert.doesNotMatch(html, /R\$\u00a0(?:795|730|1\.060|450|195|220|130|70|65|45)\b/);
  assert.doesNotMatch(html, /\bde R\$/i);
});

test("home segue a ordem comercial e mostra seis pessoas", () => {
  const html = readRoute("/");
  const markers = [
    'class="hero"',
    'class="capabilities"',
    'id="servicos"',
    'class="influencer-explainer section"',
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

test("home aplica posicionamento, diagnóstico, processo e autoridade aprovados", () => {
  const home = readRoute("/");
  assert.ok(home.includes("Cesar C. Oliveira <span>· AI Builder</span>"));
  assert.ok(home.includes("Especialista em criativos com IA e influencers virtuais."));
  for (const paragraph of about.paragraphs) assert.ok(home.includes(paragraph));
  assert.ok(home.includes(`<strong>${about.highlight}</strong>`));
  assert.ok(home.includes(about.portfolio));
  assert.ok(home.includes(`<strong>${about.reach}</strong>`));
  assert.ok(home.includes(copy.home.audience));
  assert.ok(home.includes(copy.home.processTitle));
  for (const step of copy.home.processSteps) {
    assert.ok(home.includes(step.title));
    assert.ok(home.includes(step.text));
  }
  assert.ok(home.includes(copy.home.whyTitle));
  for (const pillar of copy.home.whyPillars) assert.ok(home.includes(pillar.text));
  assert.ok(home.includes(copy.home.diagnosis));
  assert.ok(home.includes(copy.home.diagnosisNote));
  assert.ok(home.includes(copy.home.faqTitle));
  assert.ok(!home.includes("Vim de fora do mundo do marketing"));
  assert.ok(!home.includes("Você envia o produto. Eu cuido da campanha."));
  assert.ok(!home.includes("Não é só imagem bonita. É venda."));
});

test("serviços explicam entradas, entregas e termos técnicos sem promessas extras", () => {
  const photos = readRoute(routes.productPhotos);
  for (const text of Object.values(copy.productPhotos)) assert.ok(photos.includes(text));
  assert.ok(photos.includes("cenas de uso — também conhecidas como cenas lifestyle"));
  assert.ok(photos.includes("criativos, que são peças de anúncio ou conteúdos publicitários"));

  const product360 = readRoute(routes.product360);
  for (const text of Object.values(copy.product360)) assert.ok(product360.includes(text));
  for (const view of ["Frente", "Lateral esquerda", "Lateral direita", "Verso"]) assert.ok(product360.includes(view));
  assert.ok(!product360.includes("uma única foto"));

  const influencers = readRoute(routes.virtualInfluencers);
  for (const text of [copy.influencers.persona, copy.influencers.characterSheet, copy.influencers.choicesSupport, copy.influencers.voice, copy.influencers.usage, copy.influencers.sheetDelivery]) {
    assert.ok(influencers.includes(text));
  }
  for (const item of [...copy.influencers.choices, ...copy.influencers.included]) assert.ok(influencers.includes(item));
  assert.ok(!influencers.includes("definição de tom de fala"));

  const ugc = readRoute(routes.virtualUgc);
  assert.ok(ugc.includes("Vídeos UGC com personagens virtuais"));
  assert.ok(ugc.includes(copy.ugc.lead));
  assert.ok(ugc.includes("não representa experiência real de consumidor"));
  const ugcVisibleText = ugc.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.ok(!ugcVisibleText.toLocaleLowerCase("pt-BR").includes("depoimento"));
});

test("casting usa título inclusivo, política aprovada e tom centralizado", () => {
  const home = readRoute("/");
  const page = readRoute(routes.casting);
  assert.ok(home.includes(copy.home.castingTitle));
  assert.ok(page.includes(`<h1>${copy.casting.title}</h1>`));
  assert.ok(page.includes(`<span aria-current="page">${copy.casting.title}</span>`));
  assert.ok(page.includes(copy.casting.policy));
  assert.ok(metadata[routes.casting].title.startsWith(copy.casting.title));
  assert.equal((page.match(/Tom de comunicação:<\/strong>/g) || []).length, casting.length);
  for (const person of casting) assert.ok(page.includes(person.communicationTone));
  assert.ok(!page.includes("Casting de influencers virtuais brasileiras"));
});

test("vídeo explicativo aparece uma vez na home e no serviço de influencers", () => {
  const original = path.join(root, "assets", "videos ADS.mp4");
  const optimized = path.join(root, influencerExplainer.src.replace(/^\//, ""));
  const poster = path.join(root, influencerExplainer.poster.replace(/^\//, ""));
  assert.ok(fs.existsSync(optimized), "Versão otimizada do vídeo ausente");
  assert.ok(fs.existsSync(poster), "Poster otimizado do vídeo ausente");
  if (fs.existsSync(original)) assert.ok(fs.statSync(optimized).size < fs.statSync(original).size);

  for (const route of [routes.home, routes.virtualInfluencers]) {
    const html = readRoute(route);
    const videos = html.match(new RegExp(`<video[^>]+data-video-name="${influencerExplainer.videoName}"[^>]*>`, "g")) || [];
    assert.equal(videos.length, 1, `Quantidade incorreta do vídeo em ${route}`);
    const video = videos[0];
    assert.match(video, /\scontrols(?:\s|>)/);
    assert.match(video, /\splaysinline(?:\s|>)/);
    assert.match(video, /\spreload="metadata"/);
    assert.match(video, /\sposter="\/assets\/optimized\/video-influencer-explicativo-poster\.webp"/);
    assert.doesNotMatch(video, /\s(?:autoplay|loop|muted)(?:\s|>)/);
    assert.ok(html.includes(`<source src="${influencerExplainer.src}" type="video/mp4">`));
    assert.ok(html.includes(influencerExplainer.title));
    assert.ok(html.includes(influencerExplainer.text));
    assert.ok(html.includes('data-event="video_cta_click"'));
  }
});

test("cases compartilham navegação, hero visual, resumo, CTA e continuidade", () => {
  cases.forEach((item, index) => {
    const html = readRoute(item.route);
    const previous = cases[(index - 1 + cases.length) % cases.length];
    const next = cases[(index + 1) % cases.length];
    assert.ok(html.includes('class="nav-current" aria-current="location">Cases</a>'));
    assert.ok(html.includes('class="case-back" href="/#cases"'));
    assert.ok(html.includes("Voltar para todos os cases"));
    assert.ok(html.includes('class="case-hero-media"'));
    assert.ok(html.includes('id="deliverables-title">O que foi entregue</h2>'));
    assert.ok(html.includes("Quero criar meu projeto"));
    assert.ok(html.includes(`href="${previous.route}"`));
    assert.ok(html.includes(`href="${next.route}"`));
    assert.equal((html.match(/<nav class="case-navigation"/g) || []).length, 1);
    assert.ok(html.includes('<footer class="footer">'));
  });
  assert.ok(readRoute(routes.caseGotaNativa).includes("Projeto autoral da Criando com IA"));
});

test("narrativa visível dos três cases permanece inalterada", () => {
  assert.deepEqual(
    {
      rosa: caseNarrativeHash(routes.caseRosaMosqueta),
      biotina: caseNarrativeHash(routes.caseBiotina),
      gota: caseNarrativeHash(routes.caseGotaNativa),
    },
    {
      rosa: "d296fa75ae74da3e1436926693e6ccd7d9045c20ddf91a0ace3f7cc7ee11ef9f",
      biotina: "355b0e5a9eeee02d06963e591586464a9c085ab3ad9f0cdf9a0907c928ffd88d",
      gota: "e0d349c4fa3bf47be38341ee51dc6d3075f9b6c3c567e0d05dde5b068fa1ec93",
    }
  );
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
  assert.equal(faq.length, 18);
  assert.equal((home.match(/data-faq-button/g) || []).length, faq.length);
  for (const item of faq) {
    assert.ok(home.includes(item.question));
    assert.ok(home.includes(item.answer));
  }
  const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
  for (const event of ["whatsapp_click", "case_open", "casting_open", "casting_profile_click", "pricing_cta_click", "video_play", "video_complete", "video_cta_click", "before_after_interaction", "service_page_view", "faq_open"]) {
    assert.ok(script.includes(`"${event}"`), `Evento ausente: ${event}`);
  }
});

test("política e termos refletem privacidade e condições aprovadas", () => {
  const privacy = readRoute(routes.privacy);
  const terms = readRoute(routes.terms);
  for (const section of institutional.privacy) {
    assert.ok(privacy.includes(section.title));
    for (const paragraph of section.paragraphs) assert.ok(privacy.includes(paragraph));
  }
  for (const section of institutional.terms) {
    assert.ok(terms.includes(section.title));
    for (const paragraph of section.paragraphs) assert.ok(terms.includes(paragraph));
  }
  const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
  assert.match(script, /message\|phone\|email\|conversation\|whatsapp_message/);
  assert.ok(!script.includes("localStorage"));
  assert.ok(script.includes("sessionStorage"));
});

test("nome profissional usa Cesar sem acento no conteúdo público", () => {
  const publicContent = publicRoutes.map(readRoute).join("\n");
  assert.ok(publicContent.includes("Cesar C. Oliveira"));
  assert.ok(!publicContent.includes("César"));
  for (const message of Object.values(whatsappMessages)) assert.ok(message.startsWith("Olá, Cesar!"));
  for (const person of casting) assert.ok(person.whatsappMessage.startsWith("Olá, Cesar!"));
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
