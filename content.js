(function (root, factory) {
  const data = factory();
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) root.SITE_DATA = data;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const site = {
    name: "Criando com IA",
    domain: "https://criandocomia.com",
    whatsapp: "5511978230487",
    owner: "Cesar C. Oliveira",
    role: "AI Builder",
    ownerSubtitle: "Especialista em criativos com IA e influencers virtuais.",
    logo: "/assets/logo-header.png",
    socialImage: "/assets/after-produt.jpg",
  };

  const routes = {
    home: "/",
    casting: "/casting/",
    productPhotos: "/servicos/fotos-de-produto-com-ia/",
    virtualInfluencers: "/servicos/influencers-virtuais/",
    virtualUgc: "/servicos/videos-ugc-com-ia/",
    product360: "/servicos/video-360-produto/",
    caseGotaNativa: "/cases/gota-nativa/",
    caseRosaMosqueta: "/cases/rosa-mosqueta/",
    caseBiotina: "/cases/biotina/",
    privacy: "/politica-de-privacidade/",
    terms: "/termos-de-uso/",
  };

  const navigation = [
    { label: "Serviços", href: "/#servicos" },
    { label: "Cases", href: "/#cases" },
    { label: "Preços", href: "/#precos" },
    { label: "Casting", href: routes.casting },
    { label: "Sobre", href: "/#sobre" },
  ];

  const whatsappMessages = {
    header: "Olá, César! Vi o site Criando com IA e quero conversar sobre criativos para o meu produto.",
    hero: "Olá, César! Vi o site Criando com IA e quero enviar uma foto do meu produto para receber ideias de criativos.",
    castingStarter: "Olá, César! Quero testar uma influencer do casting com o meu produto. Vi o pacote de 3 fotos no site e gostaria de saber os próximos passos.",
    exclusiveInfluencer: "Olá, César! Quero criar uma influencer exclusiva para a minha marca. Vi o pacote de estreia com criação da persona, 6 fotos e 1 vídeo.",
    monthlyPlan: "Olá, César! Vi o Plano Mensal no site Criando com IA. Quero saber como funciona a produção das 8 fotos e dos 2 vídeos para minha marca.",
    largeProject: "Olá, César! Preciso de um projeto maior com criativos e estrutura digital. Quero conversar sobre as possibilidades.",
    finalCta: "Olá, César! Quero enviar uma foto do meu produto e receber uma orientação inicial sobre os criativos mais indicados.",
    productPhotos: "Olá, César! Quero transformar fotos do meu produto em imagens profissionais e criativos para campanha.",
    virtualInfluencers: "Olá, César! Quero avaliar influencers virtuais para apresentar os produtos da minha marca.",
    virtualUgc: "Olá, César! Quero criar vídeos publicitários em formato UGC com personagens virtuais para minha marca.",
    product360: "Olá, César! Quero criar um vídeo 360° do meu produto e posso enviar as fotos de frente, laterais e verso.",
    caseRosaMosqueta: "Olá, César! Vi o case Rosa Mosqueta e quero avaliar uma transformação parecida para o meu produto.",
    caseBiotina: "Olá, César! Vi o case Biotina e quero conversar sobre criativos e vídeo para o meu produto.",
    caseGotaNativa: "Olá, César! Vi o projeto autoral Gota Nativa e quero conversar sobre um projeto completo para minha marca.",
  };

  const pricing = {
    transformedPhoto: { label: "Foto transformada", detail: "celular → estúdio · mínimo 3", regular: 70, current: 53, unit: "/foto" },
    lifestyleScene: { label: "Cena lifestyle adicional", detail: "mesmo produto", regular: 45, current: 34, unit: "/foto" },
    product360Video: { label: "Vídeo 360° do produto", detail: "quatro fotos de referência", regular: 130, current: 98, unit: "" },
    castingPhoto: { label: "Foto com influencer do casting", detail: "mínimo 3", regular: 65, current: 49, unit: "/foto" },
    castingVideo: { label: "Vídeo UGC com influencer do casting", detail: "até 30 segundos", regular: 220, current: 165, unit: "/vídeo" },
    castingStarter: {
      name: "Influencer do Casting",
      current: 147,
      regular: 195,
      production: ["3 fotos com seu produto"],
      videoExtra: 165,
      cta: "Testar uma influencer do casting",
      messageKey: "castingStarter",
    },
    exclusiveInfluencer: {
      name: "Influencer Exclusiva",
      current: 795,
      regular: 1060,
      creationCurrent: 340,
      creationRegular: 450,
      laterPhoto: 49,
      laterVideo: 165,
      production: ["Criação da persona", "Character sheet", "6 fotos", "1 vídeo UGC de até 30 segundos"],
      cta: "Criar minha influencer exclusiva",
      messageKey: "exclusiveInfluencer",
    },
    monthlyPlan: {
      name: "Plano Mensal",
      current: 730,
      subtitle: "Conteúdo recorrente para sua marca publicar com consistência.",
      production: ["8 fotos profissionais com IA", "2 vídeos com IA"],
      benefits: [
        "Planejamento mensal dos conteúdos",
        "Roteiro para os 2 vídeos",
        "Prioridade na produção",
        "Consistência visual do personagem",
        "1 rodada de ajustes por entrega",
        "Arquivos organizados para redes sociais",
      ],
      description: "Ideal para marcas que precisam de conteúdo novo todos os meses sem organizar cada produção separadamente.",
      cta: "Quero o plano mensal",
      messageKey: "monthlyPlan",
    },
  };

  const castingSeed = [
    ["patricia", "Patricia", 42, "feminino", "Mãe acolhedora, interior de SP.", "Skincare 40+ · casa · bem-estar", ["Beleza", "Casa", "Saúde e bem-estar"], "01-patricia-perfil.jpg", 800, 800, true],
    ["luana", "Luana", 27, "feminino", "Urbana, criativa, cabelo crespo natural.", "Beleza capilar · moda · tech", ["Beleza", "Moda", "Tecnologia"], "02-luana-perfil.jpg", 800, 800, true],
    ["marcia", "Márcia", 55, "feminino", "Elegante sem esforço, avó moderna.", "Saúde · suplementos · viagem · casa", ["Saúde e bem-estar", "Casa"], "03-marcia-perfil.jpg", 800, 800, true],
    ["camila", "Camila", 33, "feminino", "Plus size, confiante, bem resolvida.", "Moda plus · autoestima · beleza", ["Moda", "Beleza"], "04-camila-perfil.jpg", 800, 800, true],
    ["ricardo", "Ricardo", 38, "masculino", "Pai de família, direto, bem-humorado.", "Ferramentas · churrasco · finanças · pet", ["Casa", "Serviços", "Alimentos"], "05-ricardo-perfil.jpg", 800, 800, true],
    ["jessica", "Jéssica", 22, "feminino", "Geração Z, energética, gamer casual.", "Tech · cosméticos jovens · snacks", ["Tecnologia", "Beleza", "Alimentos"], "06-jessica-perfil.jpg", 800, 1000, false],
    ["dona-cida", "Dona Cida", 63, "feminino", "Vó carismática, cozinha de afeto.", "Alimentos · saúde 60+ · casa", ["Alimentos", "Saúde e bem-estar", "Casa"], "07-dona-cida-perfil.jpg", 800, 1000, false],
    ["thiago", "Thiago", 29, "masculino", "Fitness acessível, sem exagero.", "Suplementos · esporte · bem-estar masculino", ["Saúde e bem-estar", "Moda"], "08-thiago-perfil.jpg", 800, 800, false],
    ["fernanda", "Fernanda", 47, "feminino", "Executiva que virou empreendedora.", "Serviços · cursos · produtividade · moda 40+", ["Serviços", "Moda"], "09-fernanda-perfil.jpg", 800, 800, false],
    ["yasmin", "Yasmin", 25, "feminino", "Natural, consciente, clean girl BR.", "Naturais · sustentáveis · skincare clean", ["Beleza", "Saúde e bem-estar"], "10-yasmin-perfil.jpg", 800, 800, false],
    ["bruna", "Bruna", 35, "feminino", "Mãe de 2, rotina corrida, humor.", "Infantil · casa · praticidade", ["Casa", "Serviços"], "11-bruna-perfil.jpg", 800, 800, false],
    ["seu-antonio", "Seu Antônio", 58, "masculino", "Comerciante raiz, papo reto.", "Serviços locais · ferramentas · alimentos", ["Serviços", "Casa", "Alimentos"], "12-seu-antonio-perfil.jpg", 800, 800, false],
    ["larissa", "Larissa", 30, "feminino", "Recém-casada, organizada.", "Casa nova · decoração · financeiro", ["Casa", "Serviços"], "13-larissa-perfil.jpg", 800, 800, false],
    ["gabriel", "Gabriel", 24, "masculino", "Estudante/dev, nerd simpático.", "Tech · cursos · café · setup", ["Tecnologia", "Serviços", "Alimentos"], "14-gabriel-perfil.jpg", 800, 800, false],
    ["vera", "Vera", 50, "feminino", "Precisa e zen, professora.", "Educação · bem-estar · chás · organização", ["Serviços", "Saúde e bem-estar", "Alimentos", "Casa"], "15-vera-perfil.jpg", 800, 1000, false],
    ["diego", "Diego", 33, "masculino", "Barbeiro, estilo street, tatuado.", "Barba · moda masculina · tattoo care", ["Beleza", "Moda", "Serviços"], "16-diego-perfil.jpg", 800, 800, false],
    ["helena", "Helena", 68, "feminino", "Vitalidade na terceira idade.", "Saúde 60+ · mobilidade · hobbies", ["Saúde e bem-estar"], "17-helena-perfil.jpg", 800, 800, false],
    ["aline", "Aline", 28, "feminino", "Ativa, criadora de conteúdo, cadeirante.", "Acessibilidade · moda · lifestyle", ["Moda", "Serviços"], "18-aline-perfil.jpg", 800, 800, true],
    ["roberta", "Roberta", 40, "feminino", "Advogada, autoridade acolhedora.", "Serviços profissionais · finanças · moda social", ["Serviços", "Moda"], "19-roberta-perfil.jpg", 800, 800, false],
    ["mateus", "Mateus", 45, "masculino", "Pai suburbano, faz-tudo.", "Casa · jardim · auto · pet", ["Casa", "Serviços"], "20-mateus-perfil.jpg", 800, 800, false],
  ];

  const casting = castingSeed.map(function (item) {
    return {
      id: item[0],
      slug: item[0],
      name: item[1],
      age: item[2],
      gender: item[3],
      headline: item[4],
      description: item[5],
      niches: item[6],
      image: "/assets/casting/" + item[7],
      imageAlt: item[1] + ", personagem virtual de " + item[2] + " anos do casting da Criando com IA.",
      width: item[8],
      height: item[9],
      featured: item[10],
      whatsappMessage: "Olá, César! Vi a personagem " + item[1] + " no casting da Criando com IA e quero avaliar um conteúdo com ela para o meu produto.",
    };
  });

  const cases = [
    {
      slug: "rosa-mosqueta",
      name: "Rosa Mosqueta",
      badge: "Foto → campanha",
      description: "Uma foto simples virou imagem de produto, cenas, influencer virtual, vídeo e landing page.",
      route: routes.caseRosaMosqueta,
      image: "/assets/after-produt.jpg",
      imageAlt: "Foto profissional do produto Rosa Mosqueta após a transformação.",
      width: 1414,
      height: 2000,
      messageKey: "caseRosaMosqueta",
    },
    {
      slug: "biotina",
      name: "Biotina",
      badge: "Produto → criativos",
      description: "Da embalagem comum a uma campanha com criativos, influencer exclusiva e vídeo para redes sociais.",
      route: routes.caseBiotina,
      image: "/assets/biotina/produto.png",
      imageAlt: "Foto profissional do pote de Biotina criado para a campanha.",
      width: 1024,
      height: 1536,
      messageKey: "caseBiotina",
    },
    {
      slug: "gota-nativa",
      name: "Gota Nativa",
      badge: "Projeto autoral",
      description: "Marca, identidade, catálogo, criativos e e-commerce construídos do zero como projeto próprio da Criando com IA.",
      route: routes.caseGotaNativa,
      image: "/assets/gota-nativa/kit-marca.png",
      imageAlt: "Kit de identidade visual do projeto autoral Gota Nativa.",
      width: 1122,
      height: 1402,
      messageKey: "caseGotaNativa",
    },
  ];

  const faq = [
    ["Preciso enviar o produto fisicamente?", "Na maioria dos projetos, não. A produção é feita a partir de fotos de referência. Quando um serviço exigir material específico, isso será combinado no briefing."],
    ["Que fotos preciso enviar?", "Para fotos e criativos, envie imagens nítidas do produto e do rótulo. Para vídeo 360°, são necessárias quatro referências: frente, lateral esquerda, lateral direita e verso."],
    ["As influencers são pessoas reais?", "Não. São personagens virtuais criados com IA para uso em fotos e vídeos publicitários."],
    ["Posso escolher alguém do casting?", "Sim. Você pode começar com uma personagem já disponível ou contratar a criação de uma influencer exclusiva para sua marca."],
    ["A influencer do casting é exclusiva?", "Não. Ela pode participar de campanhas de outras marcas, mas não será usada com concorrentes diretos dentro da categoria acordada."],
    ["Quantos ajustes estão incluídos?", "A quantidade de ajustes depende do serviço. O Plano Mensal inclui uma rodada de ajustes por entrega. Nos demais projetos, a condição é informada antes do início."],
    ["Em quais formatos recebo os arquivos?", "Os formatos são definidos conforme o uso: feed, Stories, Reels, TikTok, anúncio, catálogo ou página de produto."],
    ["Vocês também criam landing pages e lojas?", "Sim. São projetos complementares, avaliados separadamente conforme a necessidade da marca."],
  ].map(function (item, index) { return { id: "faq-" + (index + 1), question: item[0], answer: item[1] }; });

  const metadata = {
    "/": { title: "Criando com IA | Fotos de produto e influencers virtuais", description: "Transformação de fotos de produtos, criativos para anúncios, vídeos e influencers virtuais com IA para marcas e pequenos negócios." },
    "/casting/": { title: "Casting de influencers virtuais brasileiras | Criando com IA", description: "Conheça personagens virtuais de diferentes idades, estilos e perfis para campanhas de produtos e marcas." },
    "/servicos/fotos-de-produto-com-ia/": { title: "Fotos de produto com IA | Criando com IA", description: "Transforme fotos simples em imagens profissionais, cenas lifestyle e criativos para anúncios, catálogos e páginas de produto." },
    "/servicos/influencers-virtuais/": { title: "Influencers virtuais para marcas | Criando com IA", description: "Crie fotos e vídeos com personagens virtuais realistas ou desenvolva uma influencer exclusiva para sua marca." },
    "/servicos/videos-ugc-com-ia/": { title: "Vídeos UGC com personagens virtuais | Criando com IA", description: "Conteúdo publicitário em formato UGC com personagens virtuais para anúncios, Reels e TikTok." },
    "/servicos/video-360-produto/": { title: "Vídeo 360° de produto com IA | Criando com IA", description: "Vídeos de apresentação 360° produzidos a partir de fotos frontal, laterais e verso do produto." },
    "/cases/rosa-mosqueta/": { title: "Case Rosa Mosqueta: de foto a campanha | Criando com IA", description: "Veja a transformação de uma foto simples em campanha com cenas, influencer virtual, vídeos demonstrativos e landing page." },
    "/cases/biotina/": { title: "Case Biotina: produto, criativos e vídeo | Criando com IA", description: "Veja como a embalagem de Biotina virou fotos, criativos, influencer virtual, vídeo publicitário e landing page." },
    "/cases/gota-nativa/": { title: "Gota Nativa: projeto autoral de marca e e-commerce | Criando com IA", description: "Projeto autoral da Criando com IA com nome, identidade, catálogo, criativos e e-commerce desenvolvido do zero." },
    "/politica-de-privacidade/": { title: "Política de Privacidade | Criando com IA", description: "Entenda quais dados técnicos podem ser tratados durante a navegação no site Criando com IA." },
    "/termos-de-uso/": { title: "Termos de Uso | Criando com IA", description: "Condições de uso do site e dos conteúdos publicados pela Criando com IA." },
  };

  return Object.freeze({ site, routes, navigation, whatsappMessages, pricing, casting, cases, faq, metadata });
});
