"use strict";

const fs = require("node:fs");
const path = require("node:path");
const data = require("../content.js");

const root = path.resolve(__dirname, "..");
const {
  site,
  routes,
  navigation,
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
  createWhatsAppUrl,
} = data;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function money(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

function canonical(route) {
  return site.domain + route;
}

function outputPath(route) {
  if (route === "/") return path.join(root, "index.html");
  return path.join(root, route.replace(/^\//, ""), "index.html");
}

function optimizedPath(src) {
  const relative = src.replace(/^\//, "").replace(/^assets\//, "");
  const candidate = "/assets/optimized/" + relative.replace(/\.(png|jpe?g)$/i, ".webp");
  return fs.existsSync(path.join(root, candidate.replace(/^\//, ""))) ? candidate : null;
}

function picture(src, alt, width, height, options = {}) {
  const optimized = optimizedPath(src);
  const optimizedSrcset = optimized ? [480, 800]
    .filter((candidateWidth) => candidateWidth < width)
    .map((candidateWidth) => ({
      width: candidateWidth,
      path: optimized.replace(/\.webp$/, `-${candidateWidth}.webp`),
    }))
    .filter((candidate) => fs.existsSync(path.join(root, candidate.path.replace(/^\//, ""))))
    .concat([{ width: Math.min(width, 1200), path: optimized }])
    .filter((candidate, index, list) => list.findIndex((item) => item.width === candidate.width) === index)
    .map((candidate) => `${candidate.path} ${candidate.width}w`)
    .join(", ") : "";
  const loading = options.eager ? "eager" : "lazy";
  const priority = options.eager ? ' fetchpriority="high"' : "";
  const className = options.className ? ` class="${escapeHtml(options.className)}"` : "";
  const sizes = options.sizes ? ` sizes="${escapeHtml(options.sizes)}"` : "";
  return `<picture${className}>${optimized ? `<source srcset="${optimizedSrcset}" type="image/webp"${sizes}>` : ""}<img src="${src}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" loading="${loading}" decoding="async"${priority}${sizes}></picture>`;
}

function whatsappLink(label, messageKey, location, className = "btn btn-primary", extra = "") {
  const message = whatsappMessages[messageKey];
  if (!message) throw new Error(`Mensagem de WhatsApp ausente: ${messageKey}`);
  return `<a class="${className}" href="${createWhatsAppUrl(message)}" target="_blank" rel="noopener noreferrer" data-whatsapp data-message-key="${messageKey}" data-location="${location}"${extra}>${escapeHtml(label)}</a>`;
}

function personWhatsappLink(person, location = "casting_card") {
  return `<a class="card-cta" href="${createWhatsAppUrl(person.whatsappMessage)}" target="_blank" rel="noopener noreferrer" data-whatsapp data-character-name="${escapeHtml(person.name)}" data-location="${location}">Quero criar com ${escapeHtml(person.name)}</a>`;
}

function header(pageType) {
  const links = navigation.map((item) => {
    const isCurrent = pageType === "case" && item.label === "Cases";
    return `<a href="${item.href}"${isCurrent ? ' class="nav-current" aria-current="location"' : ""}>${escapeHtml(item.label)}</a>`;
  }).join("");
  return `
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="topbar" data-header>
    <a class="brand" href="/" aria-label="Criando com IA — página inicial">
      ${picture(site.logo, "Criando com IA", 975, 350, { eager: true, sizes: "140px" })}
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Abrir menu" data-menu-toggle>
      <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
    </button>
    <nav class="topnav" id="site-menu" aria-label="Navegação principal" data-menu>
      ${links}
      <a href="/en/" hreflang="en" lang="en" aria-label="View in English">EN ↗</a>
      ${whatsappLink("Falar comigo", "header", "header", "btn btn-mini")}
    </nav>
    <button class="menu-backdrop" type="button" aria-label="Fechar menu" tabindex="-1" data-menu-backdrop></button>
  </header>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand-block">
        ${picture(site.logo, "Criando com IA", 975, 350, { className: "footer-logo", sizes: "140px" })}
        <p>Criativos com IA para produtos e marcas.</p>
      </div>
      <div>
        <h2 class="footer-heading">Navegação</h2>
        <nav class="footer-links" aria-label="Navegação do rodapé">
          ${navigation.map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join("")}
        </nav>
      </div>
      <div>
        <h2 class="footer-heading">Contato</h2>
        <div class="footer-links">
          ${whatsappLink("WhatsApp", "header", "footer", "footer-link")}
        </div>
      </div>
      <div>
        <h2 class="footer-heading">Transparência</h2>
        <p>As pessoas apresentadas no casting são personagens virtuais criadas com inteligência artificial.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span data-current-year>2026</span> Criando com IA.</p>
      <nav aria-label="Links institucionais"><a href="${routes.privacy}">Política de Privacidade</a><a href="${routes.terms}">Termos de Uso</a></nav>
    </div>
  </footer>`;
}

function breadcrumb(items) {
  return `<nav class="breadcrumbs" aria-label="Navegação estrutural"><ol>${items.map((item, index) => `<li>${index === items.length - 1 ? `<span aria-current="page">${escapeHtml(item.label)}</span>` : `<a href="${item.href}">${escapeHtml(item.label)}</a>`}</li>`).join("")}</ol></nav>`;
}

function breadcrumbJson(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: canonical(item.href),
    })),
  };
}

function htmlDocument({ route, body, pageType = "page", pageName = "", jsonLd = [], ogImage = site.socialImage }) {
  const meta = metadata[route];
  if (!meta) throw new Error(`Metadados ausentes para ${route}`);
  const url = canonical(route);
  const socialUrl = ogImage.startsWith("http") ? ogImage : site.domain + ogImage;
  const schemas = jsonLd.map((schema) => `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", ...schema }).replaceAll("<", "\\u003c")}</script>`).join("\n  ");
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <link rel="canonical" href="${url}">
  ${route === "/" ? '<link rel="alternate" hreflang="en" href="https://criandocomia.com/en/">' : ""}
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${socialUrl}">
  <meta property="og:image:alt" content="Criativo profissional de produto da Criando com IA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${socialUrl}">
  <link rel="icon" type="image/png" href="/assets/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/favicon-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap"></noscript>
  <link rel="stylesheet" href="/styles.min.css">
  ${pageType === "home" ? '<link rel="stylesheet" href="/showcase.css">' : ""}
  ${schemas}
</head>
<body data-page-type="${pageType}"${pageName ? ` data-page-name="${escapeHtml(pageName)}"` : ""}>
${header(pageType)}
${body}
${footer()}
  <script src="/content.js" defer></script>
  <script src="/script.js" defer></script>
  ${pageType === "home" ? '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script><script defer src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script><script defer src="https://unpkg.com/lenis@1.3.27/dist/lenis.min.js"></script><script defer src="/showcase.js"></script>' : ""}
</body>
</html>
`;
}

function renderCaseCard(item) {
  return `<article class="case-card">
    <a href="${item.route}" data-event="case_open" data-case-name="${escapeHtml(item.name)}" data-location="case_${item.slug.replaceAll("-", "_")}">
      <div class="case-card-cover">${picture(item.image, item.imageAlt, item.width, item.height, { sizes: "(max-width: 760px) 100vw, 33vw" })}<span class="case-card-tag">${escapeHtml(item.badge)}</span></div>
      <div class="case-card-body"><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><span class="case-card-open">Ver case completo <span aria-hidden="true">→</span></span></div>
    </a>
  </article>`;
}

function renderInfluencerExplainer(location) {
  const titleId = `influencer-explainer-${location.replaceAll("_", "-")}`;
  return `<section class="influencer-explainer section" aria-labelledby="${titleId}">
    <div class="influencer-explainer-grid">
      <div class="influencer-explainer-copy">
        <p class="section-label">${escapeHtml(influencerExplainer.eyebrow)}</p>
        <h2 id="${titleId}">${escapeHtml(influencerExplainer.title)}</h2>
        <p>${escapeHtml(influencerExplainer.text)}</p>
        <div class="inline-actions">${whatsappLink(influencerExplainer.cta, influencerExplainer.messageKey, `${location}_cta`, "btn btn-primary", ` data-event="video_cta_click" data-video-name="${influencerExplainer.videoName}"`)}</div>
      </div>
      <figure class="influencer-explainer-media">
        <video controls playsinline preload="metadata" poster="${influencerExplainer.poster}" width="${influencerExplainer.width}" height="${influencerExplainer.height}" aria-label="${escapeHtml(influencerExplainer.title)}" data-video-name="${influencerExplainer.videoName}">
          <source src="${influencerExplainer.src}" type="video/mp4">
          <span class="video-fallback">Vídeo explicativo sobre a criação de influencers virtuais.</span>
        </video>
        <figcaption>Explicação em vídeo · ${escapeHtml(influencerExplainer.duration)}</figcaption>
      </figure>
    </div>
  </section>`;
}

function renderCastingCard(person, compact = false) {
  return `<article class="casting-card" data-casting-card data-gender="${person.gender}" data-age="${person.age}" data-niches="${escapeHtml(person.niches.join("|"))}">
    ${picture(person.image, person.imageAlt, person.width, person.height, { sizes: compact ? "(max-width: 480px) 100vw, 16vw" : "(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw" })}
    <div class="casting-info"><h3>${escapeHtml(person.name)} <span>· ${person.age}</span></h3><p>${escapeHtml(person.headline)}</p><p class="casting-niches">${escapeHtml(person.description)}</p>${compact ? "" : `<p class="casting-tone"><strong>Tom de comunicação:</strong> ${escapeHtml(person.communicationTone)}</p>${personWhatsappLink(person)}`}</div>
  </article>`;
}

function renderPricing() {
  const singles = [pricing.transformedPhoto, pricing.lifestyleScene, pricing.product360Video, pricing.castingPhoto, pricing.castingVideo];
  return `<section class="pricing section" id="precos" aria-labelledby="pricing-title">
    <div class="section-heading"><p class="section-label">Preços</p><h2 id="pricing-title">Escolha por peça ou organize o mês.</h2><p>Valores claros para começar no formato que sua marca precisa.</p></div>
    <div class="single-prices" aria-label="Serviços avulsos">
      ${singles.map((item) => `<article><h3>${escapeHtml(item.label)}</h3><p>${escapeHtml(item.detail)}</p><div><strong>${money(item.current)}${escapeHtml(item.unit)}</strong></div></article>`).join("")}
    </div>
    <p class="single-price-note"><strong>${escapeHtml(pricing.lifestyleScene.label)}:</strong> ${escapeHtml(pricing.lifestyleScene.description)}</p>
    <div class="pricing-cards">
      <article class="price-card">
        <span class="card-badge">Entrada acessível</span><h3>${pricing.castingStarter.name}</h3>
        <p class="price"><strong>${money(pricing.castingStarter.current)}</strong></p>
        <ul class="production-list">${pricing.castingStarter.production.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p>Vídeo UGC opcional de até 30 segundos: +${money(pricing.castingStarter.videoExtra)}.</p>
        <p class="fineprint">${escapeHtml(copy.influencers.castingPolicy)}</p>
        ${whatsappLink(pricing.castingStarter.cta, pricing.castingStarter.messageKey, "pricing_casting", "btn btn-outline", ' data-event="pricing_cta_click" data-plan="casting"')}
      </article>
      <article class="price-card featured">
        <span class="card-badge">Exclusiva da marca</span><h3>${pricing.exclusiveInfluencer.name}</h3>
        <p class="price"><strong>${money(pricing.exclusiveInfluencer.current)}</strong></p>
        <ul class="production-list">${pricing.exclusiveInfluencer.production.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p class="fineprint">Só a criação: ${money(pricing.exclusiveInfluencer.creationCurrent)}. Depois, fotos a ${money(pricing.exclusiveInfluencer.laterPhoto)} e vídeos a ${money(pricing.exclusiveInfluencer.laterVideo)}.</p>
        ${whatsappLink(pricing.exclusiveInfluencer.cta, pricing.exclusiveInfluencer.messageKey, "pricing_exclusive", "btn btn-light", ' data-event="pricing_cta_click" data-plan="exclusive"')}
      </article>
      <article class="price-card monthly">
        <span class="card-badge">MAIS COMPLETO</span><h3>${pricing.monthlyPlan.name}</h3><p>${pricing.monthlyPlan.subtitle}</p>
        <p class="price"><strong>${money(pricing.monthlyPlan.current)}<small>/mês</small></strong></p>
        <ul class="production-list production-highlight">${pricing.monthlyPlan.production.map((item) => `<li>${item}</li>`).join("")}</ul>
        <ul class="benefit-list">${pricing.monthlyPlan.benefits.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p>${pricing.monthlyPlan.description}</p>
        ${whatsappLink(pricing.monthlyPlan.cta, pricing.monthlyPlan.messageKey, "pricing_monthly", "btn btn-primary", ' data-event="pricing_cta_click" data-plan="monthly"')}
      </article>
    </div>
    <div class="pricing-after"><p>Comece com uma pessoa do casting. Quando encontrar a persona — perfil, personalidade e posicionamento — ideal, você pode criar uma influencer exclusiva e manter novos conteúdos todos os meses.</p><p>${whatsappLink("Precisa de landing page — página de venda —, identidade ou e-commerce? Fale comigo sobre um projeto completo.", "largeProject", "pricing_large_project", "text-link")}</p></div>
  </section>`;
}

function homePage() {
  const organization = {
    "@type": "ProfessionalService",
    name: site.name,
    url: site.domain,
    logo: site.domain + site.logo,
    description: metadata["/"].description,
    founder: { "@type": "Person", name: site.owner, jobTitle: site.role, image: site.domain + "/assets/Cesar.png" },
  };
  const faqSchema = { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const featured = casting.filter((person) => ["patricia", "luana", "marcia", "camila", "ricardo", "aline"].includes(person.slug));
  const body = `<main id="conteudo">
    <section class="hero hero-atelier" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="cx-pulse" aria-hidden="true"></span> Criando com IA · Estúdio criativo · Brasil / Worldwide</p>
          <h1 id="hero-title">Do comum ao <em>inesquecível.</em></h1>
          <p class="hero-impact">Imagem. Movimento. Experiência digital.</p>
          <p class="hero-sub">Criamos visuais, campanhas e páginas que fazem as pessoas parar, explorar e pensar: <strong>“Quero um assim para a minha marca.”</strong></p>
          <p class="hero-audience">Fotos de produto · Vídeos comerciais · Influencers virtuais · Páginas com experiências interativas</p>
          <p class="sr-only">${escapeHtml(copy.home.audience)}</p>
          <div class="hero-actions">${whatsappLink("Quero uma experiência assim", "largeProject", "hero")}<a class="btn btn-ghost" href="#experiencias">Explorar experiências ↘</a></div>
          <p class="cta-proof">Projetos para marcas no Brasil e no exterior · Atendimento direto · ${whatsappLink("Enviar foto do produto", "hero", "hero_photo", "text-link")}</p>
        </div>
        <figure class="hero-before-after" aria-label="Comparação interativa de uma imagem simples com a produção comercial">
          <div class="cx-stage" data-reveal>
            <img src="/assets/after-produt.jpg" width="1414" height="2000" fetchpriority="high" alt="Imagem final de campanha do produto Rosa Mosqueta">
            <div class="cx-before"><img src="/assets/before-produto.jpg" width="1414" height="2000" alt="Foto simples original do produto antes da direção criativa"></div>
            <div class="cx-reveal-line" aria-hidden="true"></div>
            <input class="cx-range" type="range" min="0" max="100" value="48" aria-label="Arraste para comparar a foto original com a imagem de campanha">
            <div class="cx-stage-caption" aria-hidden="true"><span>FOTO ORIGINAL</span><span>DIREÇÃO CRIATIVA</span></div>
          </div>
          <span class="cx-stage-badge">Arraste & descubra</span><span class="cx-stage-note">BEFORE / AFTER</span>
        </figure>
      </div>
      <div class="cx-hero-bottom"><span>ESTÚDIO DE CRIAÇÃO E EXPERIÊNCIAS</span><strong>↓ EXPLORE OS PROJETOS</strong><span>01 / PORTFÓLIO</span></div>
    </section>
    <section class="capabilities" aria-label="Capacidades do estúdio"><p class="sr-only">Foto de produto, cenas de uso, vídeo 360°, influencer virtual, UGC publicitário, criativos de anúncio e landing page.</p><div class="ticker" aria-hidden="true"><span>FOTO DE PRODUTO → CENAS DE USO → VÍDEO 360° → INFLUENCER VIRTUAL → UGC PUBLICITÁRIO → CRIATIVOS DE ANÚNCIO → LANDING PAGE →&nbsp;</span><span>FOTO DE PRODUTO → CENAS DE USO → VÍDEO 360° → INFLUENCER VIRTUAL → UGC PUBLICITÁRIO → CRIATIVOS DE ANÚNCIO → LANDING PAGE →&nbsp;</span></div></section>
    <section class="cx-projects" id="experiencias" aria-labelledby="cx-projects-title">
      <div class="cx-projects-inner">
        <div class="cx-section-top"><div><p class="cx-kicker">O site é a primeira experiência</p><h2 id="cx-projects-title">Trabalhos que você <em>sente</em> antes de entender.</h2></div><p>Não são apenas imagens em uma galeria. Entre nas experiências e veja como ideias podem ganhar vida.</p></div>
        <div class="cx-project-grid">
          <a class="cx-project" href="/experiencias/ritual-botanico/" aria-label="Explorar a experiência Ritual Botânico">
            <div class="cx-project-visual"><img src="/assets/cena-1.jpg" width="1414" height="2000" loading="lazy" alt="Rosa Mosqueta em cena publicitária botânica"><span class="cx-project-number">01 / VISUAL STORYTELLING</span><span class="cx-project-go" aria-hidden="true">↗</span></div>
            <div class="cx-project-label"><h3>Ritual Botânico</h3><span>Direção de arte · Imagem · Interação</span></div>
            <p class="cx-project-desc">Uma foto simples transformada em um universo visual sensorial. Explore o antes e o depois.</p>
          </a>
          <a class="cx-project" href="/experiencias/biotina-motion/" aria-label="Explorar a experiência Biotina Motion">
            <div class="cx-project-visual"><img src="/assets/biotina/criativo-1.png" width="1200" height="1200" loading="lazy" alt="Criativo de campanha para Biotina"><span class="cx-project-number">02 / CAMPAIGN LAB</span><span class="cx-project-go" aria-hidden="true">↗</span></div>
            <div class="cx-project-label"><h3>Biotina / Motion</h3><span>Campanha · Vídeo · Variações</span></div>
            <p class="cx-project-desc">A mesma marca em vários ângulos. Uma campanha que o visitante pode explorar.</p>
          </a>
          <a class="cx-project" href="/experiencias/gota-nativa/" aria-label="Explorar a experiência Gota Nativa">
            <div class="cx-project-visual"><img src="/assets/gota-nativa/home-poster.jpg" width="1600" height="1000" loading="lazy" alt="Projeto autoral da marca Gota Nativa"><span class="cx-project-number">03 / BRAND EXPERIENCE</span><span class="cx-project-go" aria-hidden="true">↗</span></div>
            <div class="cx-project-label"><h3>Gota Nativa</h3><span>Marca · Loja · Experiência digital</span></div>
            <p class="cx-project-desc">Do conceito ao universo da marca. Uma prévia de como podemos dar presença a um produto.</p>
          </a>
        </div>
        <div class="cx-projects-foot"><span>Projetos conceituais e produções próprias · Sem métricas de vendas inventadas</span><a href="#contato">Sua marca pode ser a próxima ↗</a></div>
      </div>
    </section>
    <section class="services-main section" id="servicos" aria-labelledby="services-title">
      <div class="section-heading"><p class="section-label">Serviços principais</p><h2 id="services-title">Duas especialidades. Um objetivo: vender.</h2></div>
      <article class="specialty">
        <div><p class="step-tag">Especialidade 01</p><h3>Transformação de fotos em criativos</h3><p>Sua foto de celular vira imagem de campanha, cena de uso e criativo — peça de anúncio ou conteúdo publicitário — pronto para Instagram, TikTok, catálogo ou página de produto.</p><a class="text-link" href="${routes.productPhotos}">Ver fotos de produto <span aria-hidden="true">→</span></a></div>
        <div class="specialty-gallery">${picture("/assets/cena-1.jpg", "Produto Rosa Mosqueta em cena botânica de campanha.", 1414, 2000, { sizes: "(max-width:760px) 50vw, 20vw" })}${picture("/assets/cena-3.jpg", "Produto Rosa Mosqueta em cena dramática de campanha.", 1414, 2000, { sizes: "(max-width:760px) 50vw, 20vw" })}</div>
      </article>
      <article class="specialty specialty-360">
        <div class="demo-360-media">${picture("/assets/daruma/foto.jpg", "Foto frontal de referência de um boneco Daruma.", 738, 1600, { sizes: "(max-width:760px) 42vw, 18vw" })}<span aria-hidden="true">→</span><video controls muted playsinline preload="none" poster="/assets/optimized/daruma/foto.webp" data-video-name="video_360_daruma"><source src="/assets/daruma/video-360.mp4" type="video/mp4"><span class="video-fallback">Vídeo demonstrativo do produto em 360 graus.</span></video></div>
        <div><p class="step-tag">Vídeo 360°</p><h3>Quatro referências. Uma apresentação completa.</h3><p>A partir de quatro fotos de referência — frente, laterais e verso — crio um vídeo de apresentação 360° pronto para página de produto e anúncio.</p><a class="text-link" href="${routes.product360}">Ver vídeo 360° <span aria-hidden="true">→</span></a></div>
      </article>
      <article class="specialty reverse">
        <div><p class="step-tag">Especialidade 02</p><h3>Influencers virtuais. Realistas de verdade.</h3><p>Personagens virtuais criadas com IA para apresentar produtos em fotos e vídeos, sem cachê e sem agenda. O casting representa o Brasil real, com diferentes idades, tons de pele, corpos e estilos.</p><p>A mesma personagem pode manter consistência visual em fotos e vídeos, com produção disponível sem depender de agenda de modelo.</p><a class="text-link" href="${routes.virtualInfluencers}">Conhecer as influencers virtuais <span aria-hidden="true">→</span></a></div>
        <div class="specialty-gallery">${featured.slice(0, 2).map((person) => picture(person.image, person.imageAlt, person.width, person.height, { sizes: "(max-width:760px) 50vw, 20vw" })).join("")}</div>
      </article>
    </section>
    ${renderInfluencerExplainer("home_influencers")}
    <section class="cases section section-contrast" id="cases" aria-labelledby="cases-title"><div class="section-heading"><p class="section-label">Cases em destaque</p><h2 id="cases-title">Do produto cru à campanha pronta.</h2><p>Entregas reais do portfólio, organizadas para você ver o ponto de partida e o que foi criado.</p></div><div class="cases-grid">${cases.map(renderCaseCard).join("")}</div></section>
    <section class="process section" id="como-funciona" aria-labelledby="process-title"><div class="section-heading"><p class="section-label">Como funciona</p><h2 id="process-title">${escapeHtml(copy.home.processTitle)}</h2></div><ol class="process-grid">${copy.home.processSteps.map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></li>`).join("")}</ol></section>
    ${renderPricing()}
    <section class="casting-preview section" id="casting" aria-labelledby="casting-title"><div class="section-heading"><p class="section-label">Prévia do casting</p><h2 id="casting-title">${escapeHtml(copy.home.castingTitle)}</h2><p>Escolha um rosto já disponível ou crie uma influencer exclusiva para sua marca.</p></div><div class="casting-grid casting-grid-preview">${featured.map((person) => renderCastingCard(person, true)).join("")}</div><p class="casting-transparency">${escapeHtml(copy.casting.policy)}</p><div class="section-action"><a class="btn btn-outline" href="${routes.casting}" data-event="casting_open" data-location="home_casting">Ver casting completo com 20 personagens</a></div></section>
    <section class="why section" aria-labelledby="why-title"><div class="section-heading"><p class="section-label">Por que comigo</p><h2 id="why-title">${escapeHtml(copy.home.whyTitle)}</h2></div><div class="why-grid">${copy.home.whyPillars.map((pillar, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(pillar.title)}</h3><p>${escapeHtml(pillar.text)}</p></article>`).join("")}</div></section>
    <section class="about section" id="sobre" aria-labelledby="about-title"><div class="about-grid"><figure>${picture("/assets/Cesar.png", "Cesar C. Oliveira, AI Builder e especialista em criativos com IA", 1165, 1350, { sizes: "(max-width:760px) 90vw, 36vw" })}</figure><div><p class="section-label">Quem está por trás</p><h2 id="about-title">Cesar C. Oliveira <span>· AI Builder</span></h2><p class="about-sub">Especialista em criativos com IA e influencers virtuais.</p><p>${escapeHtml(about.paragraphs[0])}</p><p>${escapeHtml(about.paragraphs[1])}</p><p>${escapeHtml(about.paragraphs[2])} <strong>${escapeHtml(about.highlight)}</strong></p><p>${escapeHtml(about.portfolio)}</p><p><strong>${escapeHtml(about.reach)}</strong></p></div></div></section>
    <section class="faq section section-contrast" id="perguntas" aria-labelledby="faq-title"><div class="section-heading"><p class="section-label">Perguntas frequentes</p><h2 id="faq-title">${escapeHtml(copy.home.faqTitle)}</h2></div><div class="faq-list">${faq.map((item) => `<article class="faq-item"><h3><button type="button" aria-expanded="false" aria-controls="${item.id}" data-faq-button><span>${escapeHtml(item.question)}</span><span aria-hidden="true">+</span></button></h3><div id="${item.id}" class="faq-answer" hidden><p>${escapeHtml(item.answer)}</p></div></article>`).join("")}</div></section>
    <section class="cta" id="contato" aria-labelledby="cta-title"><div><p class="section-label">Vamos conversar</p><h2 id="cta-title">Envie uma foto. Eu mostro o que ela pode virar.</h2><p>${escapeHtml(copy.home.diagnosis)}</p>${whatsappLink("Enviar foto pelo WhatsApp", "finalCta", "final_cta", "btn btn-light")}<p class="cta-proof">${escapeHtml(copy.home.diagnosisNote)}</p></div></section>
  </main>`;
  return htmlDocument({ route: "/", body, pageType: "home", jsonLd: [organization, faqSchema] });
}

function servicePage(config) {
  const items = [{ label: "Início", href: "/" }, { label: "Serviços", href: "/#servicos" }, { label: config.shortTitle, href: config.route }];
  const schema = {
    "@type": "Service",
    name: config.title,
    description: metadata[config.route].description,
    provider: { "@type": "Organization", name: site.name, url: site.domain },
    areaServed: "Brasil",
    url: canonical(config.route),
  };
  const body = `<main id="conteudo">
    <section class="internal-hero"><div>${breadcrumb(items)}<p class="eyebrow">${escapeHtml(config.eyebrow)}</p><h1>${escapeHtml(config.title)}</h1><p>${escapeHtml(config.lead)}</p>${whatsappLink(config.cta, config.messageKey, config.location)}</div>${config.heroMedia}</section>
    ${config.content}
    <section class="related section"><div class="section-heading"><p class="section-label">Continue explorando</p><h2>Cases e caminhos relacionados.</h2></div><div class="related-links">${config.links.map((item) => `<a href="${item.href}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span><span aria-hidden="true">→</span></a>`).join("")}</div></section>
    <section class="cta compact"><div><h2>Vamos apresentar melhor o seu produto?</h2><p>Envie suas referências e converse diretamente com o Cesar sobre o formato mais indicado.</p>${whatsappLink(config.cta, config.messageKey, config.location + "_final", "btn btn-light")}</div></section>
  </main>`;
  return htmlDocument({ route: config.route, body, pageType: "service", pageName: config.shortTitle, jsonLd: [schema, breadcrumbJson(items)], ogImage: config.ogImage });
}

function productPhotosPage() {
  return servicePage({
    route: routes.productPhotos,
    shortTitle: "Fotos de produto",
    eyebrow: "Serviço principal",
    title: "Fotos de produto com IA",
    lead: copy.productPhotos.lead,
    cta: "Enviar uma foto do meu produto",
    messageKey: "productPhotos",
    location: "service_product_photos",
    ogImage: "/assets/after-produt.jpg",
    heroMedia: `<figure class="internal-visual split">${picture("/assets/before-produto.jpg", "Foto simples do produto antes da transformação.", 1414, 2000, { eager: true })}${picture("/assets/after-produt.jpg", "Foto profissional do produto depois da transformação.", 1414, 2000, { eager: true })}</figure>`,
    content: `<section class="section service-detail"><div class="section-heading"><p class="section-label">Fotos de produto com IA</p><h2>Da referência ao arquivo pronto para uso.</h2></div><div class="feature-grid two"><article><h3>O que você envia</h3><p>${escapeHtml(copy.productPhotos.input)}</p><p>${escapeHtml(copy.productPhotos.inputNote)}</p></article><article><h3>O que pode ser criado</h3><p>${escapeHtml(copy.productPhotos.possibilities)}</p></article><article><h3>O que você recebe</h3><p>${escapeHtml(copy.productPhotos.output)}</p></article><article><h3>Conferência antes da entrega</h3><p>${escapeHtml(copy.productPhotos.review)}</p></article></div><div class="media-grid three">${picture("/assets/cena-1.jpg", "Cena botânica de campanha com o produto.", 1414, 2000)}${picture("/assets/cena-2.jpg", "Cena de ritual de cuidado com o produto.", 1414, 2000)}${picture("/assets/cena-3.jpg", "Cena dramática de campanha com o produto.", 1414, 2000)}</div><div class="inline-actions"><a class="btn btn-outline" href="/#precos">Ver preços</a><a class="text-link" href="${routes.casting}">Combinar com uma pessoa do casting →</a></div></section>`,
    links: [{ href: routes.caseRosaMosqueta, title: "Case Rosa Mosqueta", text: "Uma foto virou campanha completa." }, { href: routes.caseBiotina, title: "Case Biotina", text: "Produto, criativos, influencer e vídeo." }, { href: routes.virtualInfluencers, title: "Influencers virtuais", text: "Coloque o produto nas mãos de uma personagem." }],
  });
}

function influencersPage() {
  const sample = casting.filter((person) => person.featured).slice(0, 4);
  return servicePage({
    route: routes.virtualInfluencers,
    shortTitle: "Influencers virtuais",
    eyebrow: "Serviço principal",
    title: "Influencers virtuais para marcas",
    lead: "Personagens realistas para apresentar produtos em fotos e vídeos, com consistência visual, sem cachê e sem depender de agenda.",
    cta: "Conhecer as possibilidades",
    messageKey: "virtualInfluencers",
    location: "service_virtual_influencers",
    ogImage: "/assets/influencer-1.jpg",
    heroMedia: `<div class="internal-visual portrait-grid">${sample.slice(0, 2).map((person) => picture(person.image, person.imageAlt, person.width, person.height, { eager: true })).join("")}</div>`,
    content: `<section class="section service-detail"><div class="section-heading"><p class="section-label">Dois caminhos</p><h2>Comece pelo casting ou crie uma influencer exclusiva.</h2></div><div class="feature-grid two"><article><h3>Influencer do casting</h3><p>Escolha uma personagem disponível para testar fotos e vídeos com o seu produto.</p><p>${escapeHtml(copy.influencers.castingPolicy)}</p><a class="text-link" href="${routes.casting}">Ver as 20 personagens →</a></article><article><h3>Influencer exclusiva</h3><p>${escapeHtml(copy.influencers.persona)}</p><p>${escapeHtml(copy.influencers.characterSheet)}</p>${whatsappLink("Criar minha influencer exclusiva", "exclusiveInfluencer", "service_exclusive", "text-link")}</article></div><div class="media-grid four">${sample.map((person) => picture(person.image, person.imageAlt, person.width, person.height)).join("")}</div></section><section class="section section-soft service-detail"><div class="section-heading"><p class="section-label">Criação personalizada</p><h2>${escapeHtml(copy.influencers.choicesTitle)}</h2><p>${escapeHtml(copy.influencers.choicesSupport)}</p></div><div class="feature-grid two"><article><h3>Suas escolhas</h3><ul class="production-list">${copy.influencers.choices.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article><article><h3>O que está incluído</h3><ul class="production-list">${copy.influencers.included.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><p>${escapeHtml(copy.influencers.voice)}</p></article></div></section><section class="section service-detail"><div class="section-heading"><p class="section-label">Uso e continuidade</p><h2>A personagem continua com a sua marca.</h2></div><div class="feature-grid two"><article><h3>Uso por prazo indeterminado</h3><p>${escapeHtml(copy.influencers.usage)}</p></article><article><h3>Guia para novas produções</h3><p>${escapeHtml(copy.influencers.sheetDelivery)}</p></article></div><div class="inline-actions"><a class="btn btn-outline" href="/#precos">Comparar os planos</a><a class="text-link" href="${routes.virtualUgc}">Ver vídeos UGC publicitários →</a></div></section>${renderInfluencerExplainer("service_influencers")}`,
    links: [{ href: routes.casting, title: "Casting completo", text: "20 personagens de diferentes perfis." }, { href: routes.virtualUgc, title: "Vídeos UGC", text: "Formatos publicitários com personagens virtuais." }, { href: routes.caseRosaMosqueta, title: "Case Rosa Mosqueta", text: "Conheça a personagem Patricia em campanha." }],
  });
}

function ugcPage() {
  return servicePage({
    route: routes.virtualUgc,
    shortTitle: "Vídeos UGC com IA",
    eyebrow: "Conteúdo publicitário demonstrativo",
    title: "Vídeos UGC com personagens virtuais",
    lead: copy.ugc.lead,
    cta: "Criar um vídeo publicitário",
    messageKey: "virtualUgc",
    location: "service_virtual_ugc",
    ogImage: "/assets/influencer-1.jpg",
    heroMedia: `<div class="internal-visual video-pair"><video controls playsinline preload="none" poster="/assets/optimized/influencer-1.webp" data-video-name="ugc_rosa_mosqueta"><source src="/assets/video-ugc.mp4" type="video/mp4"><span class="video-fallback">Vídeo UGC publicitário com personagem virtual.</span></video></div>`,
    content: `<section class="section service-detail"><div class="section-heading"><p class="section-label">Transparência</p><h2>Personagens virtuais. Formato publicitário.</h2><p>As pessoas apresentadas nos vídeos são personagens virtuais criadas com IA. O conteúdo demonstra abordagens de anúncio e apresentação do produto e não representa experiência real de consumidor.</p></div><div class="feature-grid"><article><h3>Roteiro</h3><p>A mensagem é organizada conforme o produto, o canal e a ação esperada. As inclusões são definidas no briefing.</p></article><article><h3>Personagem consistente</h3><p>A mesma persona pode aparecer em novas fotos e vídeos da campanha.</p></article><article><h3>Formatos sociais</h3><p>Entrega alinhada a Reels, TikTok, Stories ou criativo de anúncio.</p></article></div><div class="media-grid video-grid"><video controls playsinline preload="none" poster="/assets/optimized/depoimento-1.webp" data-video-name="ugc_demonstrativo_1"><source src="/assets/depoimento-video-1.mp4" type="video/mp4"><span class="video-fallback">Vídeo demonstrativo com personagem virtual.</span></video><video controls playsinline preload="none" poster="/assets/optimized/depoimento-2.webp" data-video-name="ugc_demonstrativo_2"><source src="/assets/depoimento-video-2.mp4" type="video/mp4"><span class="video-fallback">Vídeo demonstrativo com personagem virtual.</span></video></div><div class="inline-actions"><a class="btn btn-outline" href="/#precos">Ver preços</a><a class="text-link" href="${routes.casting}">Escolher uma personagem →</a></div></section>`,
    links: [{ href: routes.virtualInfluencers, title: "Influencers virtuais", text: "Casting ou persona exclusiva para a marca." }, { href: routes.casting, title: "Casting", text: "Encontre um perfil para o seu produto." }, { href: routes.caseRosaMosqueta, title: "Case Rosa Mosqueta", text: "Veja vídeos demonstrativos no contexto da campanha." }],
  });
}

function video360Page() {
  return servicePage({
    route: routes.product360,
    shortTitle: "Vídeo 360°",
    eyebrow: "Apresentação de produto",
    title: "Vídeo 360° de produto com IA",
    lead: copy.product360.lead,
    cta: "Quero um vídeo 360°",
    messageKey: "product360",
    location: "service_product_360",
    ogImage: "/assets/daruma/foto.jpg",
    heroMedia: `<div class="internal-visual video-pair"><video controls muted playsinline preload="none" poster="/assets/optimized/daruma/foto.webp" data-video-name="video_360_daruma"><source src="/assets/daruma/video-360.mp4" type="video/mp4"><span class="video-fallback">Vídeo demonstrativo do produto em 360 graus.</span></video></div>`,
    content: `<section class="section service-detail"><div class="section-heading"><p class="section-label">O que você envia</p><h2>Quatro vistas para representar o produto.</h2><p>${escapeHtml(copy.product360.input)}</p></div><ol class="reference-grid"><li><span>01</span><strong>Frente</strong></li><li><span>02</span><strong>Lateral esquerda</strong></li><li><span>03</span><strong>Lateral direita</strong></li><li><span>04</span><strong>Verso</strong></li></ol><div class="feature-grid two service-summary"><article><h3>O que você recebe</h3><p>${escapeHtml(copy.product360.output)}</p></article><article><h3>Fidelidade das referências</h3><p>${escapeHtml(copy.product360.fidelity)}</p></article></div><div class="inline-actions"><a class="btn btn-outline" href="/#precos">Ver preço do vídeo 360°</a><a class="text-link" href="${routes.productPhotos}">Conhecer fotos de produto →</a></div></section>`,
    links: [{ href: routes.productPhotos, title: "Fotos de produto", text: "Transformação e cenas de campanha." }, { href: routes.caseRosaMosqueta, title: "Case Rosa Mosqueta", text: "Veja uma transformação completa." }, { href: "/#precos", title: "Preços", text: "Compare peças avulsas e planos." }],
  });
}

function castingPage() {
  const items = [{ label: "Início", href: "/" }, { label: copy.casting.title, href: routes.casting }];
  const filters = ["Todos", "Feminino", "Masculino", "22–34", "35–49", "50+", "Beleza", "Casa", "Saúde e bem-estar", "Moda", "Tecnologia", "Alimentos", "Serviços"];
  const body = `<main id="conteudo"><section class="internal-hero casting-hero"><div>${breadcrumb(items)}<p class="eyebrow">20 personagens virtuais</p><h1>${escapeHtml(copy.casting.title)}</h1><p>Perfis de diferentes idades, estilos, corpos e nichos para apresentar produtos em fotos e vídeos publicitários.</p>${whatsappLink("Quero ajuda para escolher", "virtualInfluencers", "casting_hero")}</div><div class="casting-hero-stack">${casting.slice(0, 4).map((person) => picture(person.image, person.imageAlt, person.width, person.height, { eager: true })).join("")}</div></section><section class="section casting-page" aria-labelledby="casting-grid-title"><div class="section-heading"><p class="section-label">Encontre um perfil</p><h2 id="casting-grid-title">Casting completo</h2></div><div class="filter-list" role="group" aria-label="Filtrar casting">${filters.map((filter, index) => `<button type="button" class="filter-button${index === 0 ? " active" : ""}" data-casting-filter="${escapeHtml(filter)}" aria-pressed="${index === 0 ? "true" : "false"}">${escapeHtml(filter)}</button>`).join("")}</div><p class="filter-status" aria-live="polite" data-filter-status>20 personagens encontrados.</p><div class="casting-grid">${casting.map((person) => renderCastingCard(person)).join("")}</div><p class="casting-transparency">${escapeHtml(copy.casting.policy)}</p></section><section class="cta compact"><div><h2>Encontrou uma personagem para sua marca?</h2><p>Fale diretamente com o Cesar para avaliar fotos, vídeo ou um primeiro pacote.</p>${whatsappLink("Testar uma influencer do casting", "castingStarter", "casting_final", "btn btn-light")}</div></section></main>`;
  return htmlDocument({ route: routes.casting, body, pageType: "casting", jsonLd: [breadcrumbJson(items)], ogImage: casting[0].image });
}

function compareBlock(before, after, label) {
  return `<div class="compare" style="--pos:50%" data-compare><div class="compare-layer after">${picture(after.src, after.alt, after.width, after.height, { eager: true })}<span>DEPOIS</span></div><div class="compare-layer before">${picture(before.src, before.alt, before.width, before.height, { eager: true })}<span>ANTES</span></div><input class="compare-range" type="range" min="0" max="100" value="50" aria-label="${escapeHtml(label)}" data-compare-range></div>`;
}

function caseNavigation(currentSlug) {
  const index = cases.findIndex((item) => item.slug === currentSlug);
  const previous = cases[(index - 1 + cases.length) % cases.length];
  const next = cases[(index + 1) % cases.length];
  return `<nav class="case-navigation" aria-label="Navegação entre cases"><a href="${previous.route}"><span>Case anterior</span><strong>← ${escapeHtml(previous.name)}</strong></a><a href="/#cases"><span>Todos os cases</span><strong>Ver lista de projetos</strong></a><a href="${next.route}"><span>Próximo case</span><strong>${escapeHtml(next.name)} →</strong></a></nav>`;
}

function casePage(config) {
  const item = cases.find((entry) => entry.slug === config.slug);
  const items = [{ label: "Início", href: "/" }, { label: "Cases", href: "/#cases" }, { label: item.name, href: item.route }];
  const body = `<main id="conteudo"><article class="case-page">
    <section class="case-intro">
      <div class="case-intro-inner">
        ${breadcrumb(items)}
        <a class="case-back" href="/#cases"><span aria-hidden="true">←</span> Voltar para todos os cases</a>
        <header class="case-hero">
          <div class="case-hero-copy"><p class="eyebrow">${escapeHtml(item.badge)}</p><h1>${escapeHtml(config.title)}</h1><p>${escapeHtml(config.lead)}</p>${config.badge || ""}</div>
          <figure class="case-hero-media">${picture(item.image, item.imageAlt, item.width, item.height, { eager: true, sizes: "(max-width: 820px) 100vw, 42vw" })}</figure>
        </header>
        <section class="deliverables" aria-labelledby="deliverables-title"><div><p class="section-label">Resumo</p><h2 id="deliverables-title">O que foi entregue</h2></div><ul>${config.deliverables.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul></section>
      </div>
    </section>
    ${config.content}
    <section class="case-cta section"><div><p class="section-label">Seu próximo projeto</p><h2>${escapeHtml(config.ctaTitle)}</h2>${whatsappLink("Quero criar meu projeto", item.messageKey, `case_${item.slug.replaceAll("-", "_")}_final`, "btn btn-primary")}</div></section>
    ${caseNavigation(item.slug)}
  </article></main>`;
  return htmlDocument({ route: item.route, body, pageType: "case", pageName: item.name, jsonLd: [breadcrumbJson(items)], ogImage: item.image });
}

function rosaCasePage() {
  return casePage({
    slug: "rosa-mosqueta",
    title: "Rosa Mosqueta: de uma foto a uma campanha completa",
    lead: "Uma foto simples do produto virou imagem profissional, cenas de campanha, influencer virtual, vídeos publicitários demonstrativos e landing page.",
    ctaTitle: "Quer transformar uma foto simples em uma campanha como esta?",
    deliverables: ["Foto de produto tratada", "3 cenas de campanha", "Influencer virtual Patricia", "Vídeo publicitário com IA", "Conteúdos demonstrativos com personagens virtuais", "Landing page"],
    content: `<section class="case-section section"><div class="section-heading"><p class="section-label">O problema</p><h2>Uma boa oferta apresentada por uma foto fraca.</h2><p>O ponto de partida era uma foto tirada em prateleira, com luz ambiente e sem acabamento de campanha.</p></div>${compareBlock({ src: "/assets/before-produto.jpg", alt: "Antes: foto original do produto na prateleira.", width: 1414, height: 2000 }, { src: "/assets/after-produt.jpg", alt: "Depois: foto profissional do produto em fundo limpo.", width: 1414, height: 2000 }, "Revelar antes e depois da Rosa Mosqueta")}</section><section class="case-section section section-contrast"><div class="section-heading"><p class="section-label">A transformação</p><h2>Cenas que criam desejo, sem estúdio.</h2></div><div class="media-grid three">${picture("/assets/cena-1.jpg", "Cena botânica de campanha da Rosa Mosqueta.", 1414, 2000)}${picture("/assets/cena-2.jpg", "Cena de ritual de cuidado com Rosa Mosqueta.", 1414, 2000)}${picture("/assets/cena-3.jpg", "Cena dramática de campanha da Rosa Mosqueta.", 1414, 2000)}</div></section><section class="case-section section"><div class="section-heading"><p class="section-label">A influencer</p><h2>Patricia, a mesma personagem em fotos e vídeo.</h2><p>Uma persona consistente criada com IA, sem cachê e sem depender de agenda.</p></div><div class="media-grid four">${picture("/assets/influencer-sheet.png", "Character sheet da personagem virtual Patricia.", 1414, 2000)}${picture("/assets/influencer-1.jpg", "Patricia apresentando o produto Rosa Mosqueta.", 1414, 2000)}${picture("/assets/influencer-2.jpg", "Patricia em cena publicitária com o produto.", 1414, 2000)}${picture("/assets/influencer-3.jpg", "Patricia apresentando o produto para a câmera.", 1414, 2000)}</div><div class="media-grid video-grid single"><video controls playsinline preload="none" poster="/assets/optimized/influencer-1.webp" data-video-name="rosa_ugc"><source src="/assets/video-ugc.mp4" type="video/mp4"><span class="video-fallback">Vídeo UGC publicitário com a personagem Patricia.</span></video></div></section><section class="case-section section section-contrast"><div class="section-heading"><p class="section-label">UGC demonstrativo</p><h2>Conteúdo publicitário com personagens virtuais</h2><p>Estas pessoas são personagens virtuais criados com IA. Os vídeos simulam formatos populares de UGC para apresentar o produto em anúncios e peças de campanha, sem representar experiências reais de consumidores.</p></div><div class="media-grid video-grid"><video controls playsinline preload="none" poster="/assets/optimized/depoimento-1.webp" data-video-name="rosa_demonstrativo_1"><source src="/assets/depoimento-video-1.mp4" type="video/mp4"><span class="video-fallback">Primeiro vídeo demonstrativo com personagem virtual.</span></video><video controls playsinline preload="none" poster="/assets/optimized/depoimento-2.webp" data-video-name="rosa_demonstrativo_2"><source src="/assets/depoimento-video-2.mp4" type="video/mp4"><span class="video-fallback">Segundo vídeo demonstrativo com personagem virtual.</span></video></div><div class="media-grid four">${[1, 2, 3, 4].map((number) => picture(`/assets/depoimento-${number}.png`, `Peça publicitária demonstrativa ${number} com personagem virtual.`, 1414, 2000)).join("")}</div></section><section class="case-section section"><div class="section-heading"><p class="section-label">A página</p><h2>Todos os criativos reunidos para conduzir a próxima ação.</h2></div><div class="landing-demo"><video autoplay loop muted playsinline preload="none" poster="/assets/optimized/after-produt.webp" data-lazy-video data-video-name="rosa_landing"><source data-src="/assets/optimized/landing-mockup.mp4" type="video/mp4"><span class="video-fallback">Demonstração da landing page da Rosa Mosqueta.</span></video></div><div class="inline-actions"><a class="text-link" href="${routes.productPhotos}">Conhecer o serviço de fotos de produto →</a><a class="text-link" href="${routes.virtualUgc}">Conhecer vídeos UGC publicitários →</a></div></section>`,
  });
}

function biotinaCasePage() {
  return casePage({
    slug: "biotina",
    title: "Biotina: da embalagem comum aos criativos de campanha",
    lead: "A apresentação do produto ganhou foto profissional, peças de campanha, influencer virtual exclusiva, vídeos e landing page.",
    ctaTitle: "Quer transformar seu produto em uma campanha visual como esta?",
    badge: '<p class="compliance">Suplemento alimentar — não é medicamento.</p>',
    deliverables: ["Foto de produto tratada", "6 criativos de campanha", "Influencer virtual exclusiva", "2 vídeos publicitários com IA", "Landing page"],
    content: `<section class="case-section section"><div class="section-heading"><p class="section-label">O problema</p><h2>Uma embalagem que ainda não comunicava seu valor.</h2><p>A transformação começou com uma foto simples do pote e evoluiu para uma apresentação visual organizada.</p></div>${compareBlock({ src: "/assets/biotina/after_before.jpeg", alt: "Antes: foto original do pote de Biotina.", width: 738, height: 1600 }, { src: "/assets/biotina/produto.png", alt: "Depois: foto profissional do pote de Biotina.", width: 1024, height: 1536 }, "Revelar antes e depois da Biotina")}</section><section class="case-section section section-contrast"><div class="section-heading"><p class="section-label">Os criativos</p><h2>Peças para apresentar o produto em campanha.</h2><p>O conteúdo visual apresenta a proposta do suplemento sem acrescentar promessa médica ou resultado garantido.</p></div><div class="media-grid three">${picture("/assets/biotina/antes-depois.png", "Criativo publicitário de Biotina em formato antes e depois visual.", 941, 1672)}${[1, 2, 3, 4, 5].map((number) => picture(`/assets/biotina/criativo-${number}.png`, `Criativo publicitário ${number} da campanha de Biotina.`, 1122, 1402)).join("")}</div></section><section class="case-section section"><div class="section-heading"><p class="section-label">A influencer</p><h2>Uma persona exclusiva, consistente em foto e vídeo.</h2><p>A personagem apresenta o produto em peças publicitárias; o conteúdo não afirma uso real do suplemento.</p></div><div class="media-grid three">${picture("/assets/biotina/influencer-sheet.png", "Character sheet da influencer virtual exclusiva da Biotina.", 1536, 1024)}${picture("/assets/biotina/ugc-1.png", "Personagem virtual apresentando o pote de Biotina em conteúdo publicitário.", 941, 1672)}<video controls playsinline preload="none" poster="/assets/optimized/biotina/ugc-1.webp" data-video-name="biotina_influencer"><source src="/assets/biotina/influencer.mp4" type="video/mp4"><span class="video-fallback">Vídeo publicitário com a personagem virtual da Biotina.</span></video></div></section><section class="case-section section section-contrast"><div class="section-heading"><p class="section-label">O vídeo</p><h2>Peça em movimento pronta para redes sociais.</h2></div><div class="media-grid video-grid single"><video controls playsinline preload="none" poster="/assets/optimized/biotina/produto.webp" data-video-name="biotina_video"><source src="/assets/biotina/download.mp4" type="video/mp4"><span class="video-fallback">Vídeo publicitário da campanha de Biotina.</span></video></div></section><section class="case-section section"><div class="section-heading"><p class="section-label">A página</p><h2>Uma landing page para organizar a campanha.</h2></div><div class="landing-demo"><video autoplay loop muted playsinline preload="none" poster="/assets/optimized/biotina/produto.webp" data-lazy-video data-video-name="biotina_landing"><source data-src="/assets/optimized/biotina/landing.mp4" type="video/mp4"><span class="video-fallback">Demonstração da landing page da Biotina.</span></video></div><div class="inline-actions"><a class="text-link" href="${routes.productPhotos}">Conhecer fotos de produto →</a><a class="text-link" href="${routes.virtualInfluencers}">Conhecer influencers virtuais →</a></div></section>`,
  });
}

function gotaCasePage() {
  return casePage({
    slug: "gota-nativa",
    title: "Gota Nativa: marca e e-commerce construídos do zero",
    lead: "Projeto próprio desenvolvido para demonstrar uma operação completa: nome, identidade, catálogo, criativos e e-commerce no ar.",
    ctaTitle: "Quer construir uma presença visual completa para sua marca?",
    badge: '<p class="author-badge">Projeto autoral da Criando com IA</p>',
    deliverables: ["Nome e conceito", "Logo e identidade visual", "Organização de catálogo", "Criativos de marca", "E-commerce no ar"],
    content: `<section class="case-section section"><div class="section-heading"><p class="section-label">O desafio</p><h2>Construir uma marca coerente do conceito à loja.</h2><p>O projeto partiu de uma ideia autoral e precisava conectar posicionamento, identidade, catálogo, criativos e experiência de compra em um único sistema visual.</p></div></section><section class="case-section section section-soft"><div class="section-heading"><p class="section-label">A transformação</p><h2>Nome, logo e identidade criados do zero.</h2><p>Gota Nativa — natural por essência. Logo, paleta, tipografia e aplicações foram organizados em um kit coerente.</p></div><figure class="wide-media">${picture("/assets/gota-nativa/kit-marca.png", "Kit da marca Gota Nativa com logo, paleta, tipografia e aplicações.", 1122, 1402, { eager: true })}</figure></section><section class="case-section section section-contrast"><div class="section-heading"><p class="section-label">O resultado visual</p><h2>Um e-commerce de verdade, no ar.</h2><p>O projeto conectou identidade, catálogo, carrinho e página de compra em uma presença digital completa.</p></div><div class="landing-demo"><video controls muted playsinline preload="none" poster="/assets/gota-nativa/home-poster.jpg" data-video-name="gota_nativa_store"><source src="/assets/gota-nativa/home.mp4" type="video/mp4"><span class="video-fallback">Navegação pela loja Gota Nativa.</span></video></div><div class="live-link"><p>O projeto está publicado e pode ser visitado no endereço da marca.</p><a class="btn btn-outline" href="https://gotanativa.com.br" target="_blank" rel="noopener noreferrer">Visitar a loja ao vivo</a></div><div class="inline-actions"><a class="text-link" href="${routes.productPhotos}">Conhecer fotos de produto →</a>${whatsappLink("Falar sobre um projeto completo", "largeProject", "case_gota_services", "text-link")}</div></section>`,
  });
}

function institutionalPage(route, title, lead, content) {
  const items = [{ label: "Início", href: "/" }, { label: title, href: route }];
  const body = `<main id="conteudo"><article class="legal-page"><header>${breadcrumb(items)}<p class="eyebrow">Institucional</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(lead)}</p><p class="updated">Atualizado em 15 de julho de 2026.</p></header>${content}</article></main>`;
  return htmlDocument({ route, body, pageType: "legal", jsonLd: [breadcrumbJson(items)] });
}

function renderInstitutionalSections(sections) {
  return sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>`).join("");
}

function privacyPage() {
  const contact = `<section><h2>Contato</h2><p>Solicitações relacionadas a esta política podem ser feitas pelo canal de WhatsApp disponível no site.</p>${whatsappLink("Falar pelo WhatsApp", "header", "privacy", "text-link")}</section>`;
  return institutionalPage(routes.privacy, "Política de Privacidade", "Esta página descreve somente os tratamentos de dados identificados no site Criando com IA.", renderInstitutionalSections(institutional.privacy) + contact);
}

function termsPage() {
  const contact = `<section><h2>Contato</h2>${whatsappLink("Falar com o Cesar", "header", "terms", "text-link")}</section>`;
  return institutionalPage(routes.terms, "Termos de Uso e Condições dos Serviços", "Condições aplicáveis à navegação, à contratação e ao uso dos conteúdos produzidos pela Criando com IA.", renderInstitutionalSections(institutional.terms) + contact);
}

const pages = new Map([
  [routes.home, homePage()],
  [routes.casting, castingPage()],
  [routes.productPhotos, productPhotosPage()],
  [routes.virtualInfluencers, influencersPage()],
  [routes.virtualUgc, ugcPage()],
  [routes.product360, video360Page()],
  [routes.caseRosaMosqueta, rosaCasePage()],
  [routes.caseBiotina, biotinaCasePage()],
  [routes.caseGotaNativa, gotaCasePage()],
  [routes.privacy, privacyPage()],
  [routes.terms, termsPage()],
]);

for (const [route, html] of pages) {
  const destination = outputPath(route);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html.replace(/[ \t]+$/gm, ""), "utf8");
}

const showcaseRoutes = ["/en/", "/experiencias/ritual-botanico/", "/experiencias/biotina-motion/", "/experiencias/gota-nativa/"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages.keys(), ...showcaseRoutes].map((route) => `  <url><loc>${canonical(route)}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`, "utf8");

const sourceCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const minifiedCss = sourceCss
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,])\s*/g, "$1")
  .trim();
fs.writeFileSync(path.join(root, "styles.min.css"), minifiedCss, "utf8");

function fileSizeKb(publicPath) {
  const absolute = path.join(root, publicPath.replace(/^\//, ""));
  return fs.existsSync(absolute) ? (fs.statSync(absolute).size / 1024).toFixed(1) : "—";
}

function markdownCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

const imageInventory = new Map();
const videoInventory = new Map();
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<img src="([^"]+)" alt="([^"]*)" width="(\d+)" height="(\d+)"/g)) {
    const [src, alt, width, height] = match.slice(1);
    if (!src.startsWith("/assets/")) continue;
    const record = imageInventory.get(src) || { src, alt, width, height, routes: new Set() };
    record.routes.add(route);
    imageInventory.set(src, record);
  }
  for (const match of html.matchAll(/<video\b[^>]*data-video-name="([^"]+)"[^>]*>[\s\S]*?<source (?:src|data-src)="([^"]+\.mp4)"/g)) {
    const [, name, src] = match;
    const record = videoInventory.get(src) || { src, name, routes: new Set() };
    record.routes.add(route);
    videoInventory.set(src, record);
  }
}

const videoMetadata = {
  "/assets/daruma/video-360.mp4": ["720×1280", "16,1 s"],
  "/assets/video-ugc.mp4": ["720×1280", "29,7 s"],
  "/assets/depoimento-video-1.mp4": ["720×1280", "8,2 s"],
  "/assets/depoimento-video-2.mp4": ["720×1280", "10,0 s"],
  "/assets/biotina/influencer.mp4": ["720×1280", "13,9 s"],
  "/assets/biotina/download.mp4": ["720×1280", "11,7 s"],
  "/assets/gota-nativa/home.mp4": ["1920×1080", "28,0 s"],
  "/assets/optimized/landing-mockup.mp4": ["800×800", "17,5 s"],
  "/assets/optimized/biotina/landing.mp4": ["800×800", "12,5 s"],
};

const imageRows = [...imageInventory.values()]
  .sort((a, b) => a.src.localeCompare(b.src, "pt-BR"))
  .map((item) => {
    const optimized = optimizedPath(item.src) || "—";
    return `| \`${markdownCell(item.src.replace(/^\//, ""))}\` | ${markdownCell(item.alt || "Imagem decorativa/identidade")} | ${item.width}×${item.height} | ${path.extname(item.src).slice(1).toUpperCase()} | ${fileSizeKb(item.src)} KB | ${markdownCell([...item.routes].join(", "))} | ${optimized === "—" ? optimized : `\`${optimized.replace(/^\//, "")}\``} |`;
  });

const videoRows = [...videoInventory.values()]
  .sort((a, b) => a.src.localeCompare(b.src, "pt-BR"))
  .map((item) => {
    const details = videoMetadata[item.src] || ["—", "—"];
    const originalSubstitute = item.src.includes("/optimized/")
      ? (item.src.includes("biotina") ? "`assets/biotina/landing.gif` preservado" : "`assets/landing-mockup.gif` preservado")
      : "Arquivo original preservado; download adiado com `preload=none`";
    return `| \`${markdownCell(item.src.replace(/^\//, ""))}\` | ${markdownCell(item.name)} | ${details[0]} · ${details[1]} | MP4 | ${fileSizeKb(item.src)} KB | ${markdownCell([...item.routes].join(", "))} | ${originalSubstitute} |`;
  });

const assetsReport = `# Assets — Criando com IA

**Gerado pelo build em:** 15/07/2026  
**Escopo:** assets efetivamente publicados nas 11 páginas canônicas.

O diretório \`assets/\` contém variantes históricas e arquivos-fonte preservados. Nenhum asset foi removido. As páginas usam WebP responsivo em 480, 800 e até 1200 px quando aplicável; os GIFs de landing page foram convertidos para MP4 sob demanda, mantendo os originais.

## Imagens publicadas

| Caminho original | Uso | Dimensões | Formato | Tamanho | Rotas/componentes | Substituto otimizado |
|---|---|---:|---|---:|---|---|
${imageRows.join("\n")}

## Vídeos publicados

| Caminho servido | Uso | Dimensões/duração | Formato | Tamanho | Rotas/componentes | Otimização |
|---|---|---:|---|---:|---|---|
${videoRows.join("\n")}

## Observações

- \`assets/videos ADS.mp4\` já existia como arquivo não rastreado e não foi alterado nem publicado por falta de contexto confirmado.
- Os nomes históricos com “depoimento” permanecem apenas nos caminhos de arquivos legados; os rótulos e textos públicos usam “UGC demonstrativo” e “conteúdo publicitário com personagens virtuais”.
- As imagens sociais e favicons usam assets reais existentes: \`assets/after-produt.jpg\`, \`assets/favicon-32.png\` e \`assets/favicon-180.png\`.
`;
fs.writeFileSync(path.join(root, "docs", "ASSETS_CRIANDO_COM_IA.md"), assetsReport, "utf8");

console.log(`Build concluído: ${pages.size} páginas, sitemap.xml e robots.txt.`);
