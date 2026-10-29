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
    whatsappEndpoint: "https://api.whatsapp.com/send",
    owner: "Cesar C. Oliveira",
    role: "AI Builder",
    ownerSubtitle: "Especialista em criativos com IA e influencers virtuais.",
    logo: "/assets/logo-header.png",
    socialImage: "/assets/after-produt.jpg",
  };

  function normalizeWhatsAppNumber(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function createWhatsAppUrl(message) {
    const phone = normalizeWhatsAppNumber(site.whatsapp);
    if (!phone) throw new Error("Número de WhatsApp ausente.");
    return `${site.whatsappEndpoint}?phone=${phone}&text=${encodeURIComponent(String(message || ""))}`;
  }

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
    header: "Olá, Cesar! Vi o site Criando com IA e quero conversar sobre criativos para o meu produto.",
    hero: "Olá, Cesar! Vi o site Criando com IA e quero enviar uma foto do meu produto para receber ideias de criativos.",
    castingStarter: "Olá, Cesar! Quero testar uma influencer do casting com o meu produto. Vi o pacote de 3 fotos no site e gostaria de saber os próximos passos.",
    exclusiveInfluencer: "Olá, Cesar! Quero criar uma influencer exclusiva para a minha marca. Vi o pacote de estreia com criação da persona, 6 fotos e 1 vídeo.",
    monthlyPlan: "Olá, Cesar! Vi o Plano Mensal no site Criando com IA. Quero saber como funciona a produção das 8 fotos e dos 2 vídeos para minha marca.",
    largeProject: "Olá, Cesar! Preciso de um projeto maior com criativos e estrutura digital. Quero conversar sobre as possibilidades.",
    finalCta: "Olá, Cesar! Quero enviar uma foto do meu produto e receber uma orientação inicial sobre os criativos mais indicados.",
    productPhotos: "Olá, Cesar! Quero transformar fotos do meu produto em imagens profissionais e criativos para campanha.",
    virtualInfluencers: "Olá, Cesar! Quero avaliar influencers virtuais para apresentar os produtos da minha marca.",
    virtualUgc: "Olá, Cesar! Quero criar vídeos publicitários em formato UGC com personagens virtuais para minha marca.",
    product360: "Olá, Cesar! Quero criar um vídeo 360° do meu produto e posso enviar as fotos de frente, laterais e verso.",
    caseRosaMosqueta: "Olá, Cesar! Vi o case Rosa Mosqueta e quero avaliar uma transformação parecida para o meu produto.",
    caseBiotina: "Olá, Cesar! Vi o case Biotina e quero conversar sobre criativos e vídeo para o meu produto.",
    caseGotaNativa: "Olá, Cesar! Vi o projeto autoral Gota Nativa e quero conversar sobre um projeto completo para minha marca.",
  };

  const about = {
    paragraphs: [
      "Sou Cesar C. Oliveira, fundador da Criando com IA. Especializo-me em transformar fotos simples de produtos em criativos profissionais, campanhas visuais e influencers virtuais consistentes para marcas que precisam apresentar e vender melhor sem depender de uma produção tradicional cara.",
      "Meu trabalho combina direção criativa, engenharia de prompt e produção com inteligência artificial para criar fotos, vídeos, personagens e páginas com aplicação comercial real. Cada projeto é desenvolvido com atenção à identidade da marca, à consistência visual e ao uso prático do conteúdo em anúncios, redes sociais e páginas de venda.",
      "Quando você me contrata, o projeto é conduzido diretamente por mim, do briefing à entrega.",
    ],
    highlight: "Atendimento direto, sem intermediários e com uma comunicação clara durante toda a produção.",
    portfolio: "Os projetos apresentados neste portfólio mostram esse processo na prática: da foto original à campanha, ao personagem e à página final.",
    reach: "Atendimento remoto para marcas de todo o Brasil.",
  };

  const copy = {
    home: {
      audience: "Para pequenas marcas, lojas virtuais e negócios que precisam apresentar seus produtos com padrão profissional sem montar um estúdio tradicional.",
      processTitle: "Você envia as fotos. Eu transformo em campanha.",
      processSteps: [
        { title: "Você envia as fotos e referências", text: "Fotos nítidas do produto, do rótulo e dos detalhes importantes ajudam a orientar a produção." },
        { title: "Definimos o formato mais indicado", text: "Foto profissional, cena de uso, influencer virtual, vídeo ou uma combinação de formatos." },
        { title: "A produção é apresentada", text: "O material é criado e apresentado para conferência conforme o briefing aprovado." },
        { title: "Os arquivos finais são organizados", text: "Após os ajustes previstos, os arquivos são preparados para o uso definido na contratação." },
      ],
      whyTitle: "Não é só imagem bonita. É conteúdo pensado para vender.",
      whyPillars: [
        { title: "Penso em venda", text: "Cada peça é criada para um canal e uma ação definidos no briefing." },
        { title: "Entrega rápida com IA", text: "A produção acontece sem estúdio presencial e sem depender de agenda de modelo." },
        { title: "Atendimento direto", text: "Você fala com a mesma pessoa que planeja, produz e acompanha a entrega do material." },
      ],
      diagnosis: "Envie uma foto do seu produto pelo WhatsApp. Eu analiso o material e indico quais formatos — foto profissional, cena de uso, vídeo ou influencer virtual — fazem mais sentido para sua marca.",
      diagnosisNote: "Análise inicial sem compromisso. Você fala diretamente com o Cesar.",
      faqTitle: "Dúvidas antes de começar",
      castingTitle: "Casting brasileiro de influencers virtuais",
    },
    productPhotos: {
      lead: "Transforme fotos simples em imagens profissionais, cenas de uso — também conhecidas como cenas lifestyle — e criativos, que são peças de anúncio ou conteúdos publicitários para diferentes canais.",
      input: "Fotos nítidas do produto, do rótulo e dos detalhes importantes.",
      inputNote: "A qualidade e a quantidade de detalhes visíveis nas referências influenciam o resultado.",
      output: "Arquivos finais no formato contratado, preparados para feed, Stories, anúncios, catálogo ou página de produto.",
      possibilities: "Foto de estúdio, fundo personalizado, cena de uso, composição publicitária ou variações para redes sociais.",
      review: "Rótulos, textos, cores e detalhes do produto são apresentados para conferência antes da entrega final.",
    },
    product360: {
      lead: "A partir de quatro fotos de referência — frontal, lateral esquerda, lateral direita e verso — o produto ganha um vídeo demonstrativo 360° em movimento.",
      input: "Quatro fotos nítidas do produto: frente, lateral esquerda, lateral direita e verso. Rótulos, formato, cores e detalhes importantes devem estar visíveis.",
      output: "Um vídeo demonstrativo do produto em movimento, no formato definido no briefing, pronto para ser utilizado em página de produto, redes sociais ou anúncio.",
      fidelity: "A fidelidade do resultado depende da qualidade e da consistência das quatro fotos de referência.",
    },
    influencers: {
      persona: "Persona — definição da personalidade, do perfil e do posicionamento da personagem.",
      characterSheet: "Character sheet — guia visual com rosto, corpo, roupa principal e referências para manter a personagem consistente.",
      castingPolicy: "Os personagens do casting não são exclusivos. A proteção por categoria ou concorrência direta depende das condições confirmadas na contratação.",
      choicesTitle: "O que você define na criação",
      choices: ["Idade", "Estilo", "Aparência", "Personalidade", "Roupa principal", "Nome, caso queira defini-lo"],
      choicesSupport: "A criação é desenvolvida a partir das escolhas do cliente. O nome é opcional e pode ser definido pelo cliente durante o briefing.",
      included: ["Definição visual da personagem", "Definição de personalidade", "Roupa principal", "Character sheet completo", "Arquivos do character sheet entregues ao cliente"],
      voice: "A personalidade da personagem é definida na criação. O tom de fala de cada vídeo é tratado separadamente no briefing do conteúdo.",
      usage: "Depois de criada e entregue, a influencer exclusiva fica destinada ao cliente para uso por prazo indeterminado, inclusive em anúncios pagos.",
      sheetDelivery: "O cliente recebe os arquivos do character sheet para utilizar como referência nas próximas produções.",
    },
    ugc: {
      lead: "Vídeos verticais no estilo criador de conteúdo, feitos para apresentar produtos em anúncios, Reels e TikTok.",
    },
    casting: {
      title: "Casting brasileiro de influencers virtuais",
      policy: "Os personagens do casting não são exclusivos. A proteção por categoria ou concorrência direta depende das condições confirmadas na contratação.",
    },
  };

  const influencerExplainer = {
    eyebrow: "COMO FUNCIONA",
    title: "Veja como uma influencer virtual é criada para sua marca",
    text: "Neste vídeo, eu explico como transformo uma ideia em uma personagem virtual consistente, preparada para aparecer em fotos, vídeos e campanhas da sua marca.",
    cta: "Quero criar minha influencer",
    messageKey: "exclusiveInfluencer",
    src: "/assets/optimized/video-influencer-explicativo.mp4",
    poster: "/assets/optimized/video-influencer-explicativo-poster.webp",
    width: 720,
    height: 1280,
    duration: "36 segundos",
    videoName: "influencer_explicativo",
  };

  const pricing = {
    transformedPhoto: { label: "Foto transformada", detail: "celular → estúdio · mínimo 3", current: 53, unit: "/foto" },
    lifestyleScene: {
      label: "Cena de uso adicional",
      detail: "Para clientes que já contrataram a foto transformada do mesmo produto.",
      description: "Criação de uma nova cena contextual com o produto já tratado, preparada para redes sociais, anúncios, catálogo ou página de produto.",
      current: 34,
      unit: "/foto",
    },
    product360Video: { label: "Vídeo 360° do produto", detail: "quatro fotos de referência", current: 98, unit: "" },
    castingPhoto: { label: "Foto com influencer do casting", detail: "mínimo 3", current: 49, unit: "/foto" },
    castingVideo: { label: "Vídeo UGC, no estilo criador de conteúdo", detail: "com influencer do casting · até 30 segundos", current: 165, unit: "/vídeo" },
    castingStarter: {
      name: "Influencer do Casting",
      current: 147,
      production: ["3 fotos com seu produto"],
      videoExtra: 165,
      cta: "Testar uma influencer do casting",
      messageKey: "castingStarter",
    },
    exclusiveInfluencer: {
      name: "Influencer Exclusiva",
      current: 595,
      creationCurrent: 340,
      laterPhoto: 49,
      laterVideo: 165,
      production: ["Criação da persona — perfil, personalidade e posicionamento", "Character sheet — guia visual da personagem", "6 fotos", "1 vídeo UGC de até 30 segundos"],
      cta: "Criar minha influencer exclusiva",
      messageKey: "exclusiveInfluencer",
    },
    monthlyPlan: {
      name: "Plano Mensal",
      current: 630,
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
    ["patricia", "Patricia", 42, "feminino", "Mãe acolhedora, interior de SP.", "Skincare 40+ · casa · bem-estar", ["Beleza", "Casa", "Saúde e bem-estar"], "01-patricia-perfil.jpg", 800, 800, true, "acolhedora e maternal"],
    ["luana", "Luana", 27, "feminino", "Urbana, criativa, cabelo crespo natural.", "Beleza capilar · moda · tech", ["Beleza", "Moda", "Tecnologia"], "02-luana-perfil.jpg", 800, 800, true, "urbana e criativa"],
    ["marcia", "Márcia", 55, "feminino", "Elegante sem esforço, avó moderna.", "Saúde · suplementos · viagem · casa", ["Saúde e bem-estar", "Casa"], "03-marcia-perfil.jpg", 800, 800, true, "elegante e moderna"],
    ["camila", "Camila", 33, "feminino", "Plus size, confiante, bem resolvida.", "Moda plus · autoestima · beleza", ["Moda", "Beleza"], "04-camila-perfil.jpg", 800, 800, true, "confiante e direta"],
    ["ricardo", "Ricardo", 38, "masculino", "Pai de família, direto, bem-humorado.", "Ferramentas · churrasco · finanças · pet", ["Casa", "Serviços", "Alimentos"], "05-ricardo-perfil.jpg", 800, 800, true, "direto e bem-humorado"],
    ["jessica", "Jéssica", 22, "feminino", "Geração Z, energética, gamer casual.", "Tech · cosméticos jovens · snacks", ["Tecnologia", "Beleza", "Alimentos"], "06-jessica-perfil.jpg", 800, 1000, false, "jovem e energética"],
    ["dona-cida", "Dona Cida", 63, "feminino", "Vó carismática, cozinha de afeto.", "Alimentos · saúde 60+ · casa", ["Alimentos", "Saúde e bem-estar", "Casa"], "07-dona-cida-perfil.jpg", 800, 1000, false, "carismática e acolhedora"],
    ["thiago", "Thiago", 29, "masculino", "Fitness acessível, sem exagero.", "Suplementos · esporte · bem-estar masculino", ["Saúde e bem-estar", "Moda"], "08-thiago-perfil.jpg", 800, 800, false, "acessível e direto"],
    ["fernanda", "Fernanda", 47, "feminino", "Executiva que virou empreendedora.", "Serviços · cursos · produtividade · moda 40+", ["Serviços", "Moda"], "09-fernanda-perfil.jpg", 800, 800, false, "profissional e confiante"],
    ["yasmin", "Yasmin", 25, "feminino", "Natural, consciente, clean girl BR.", "Naturais · sustentáveis · skincare clean", ["Beleza", "Saúde e bem-estar"], "10-yasmin-perfil.jpg", 800, 800, false, "natural e consciente"],
    ["bruna", "Bruna", 35, "feminino", "Mãe de 2, rotina corrida, humor.", "Infantil · casa · praticidade", ["Casa", "Serviços"], "11-bruna-perfil.jpg", 800, 800, false, "prática e bem-humorada"],
    ["seu-antonio", "Seu Antônio", 58, "masculino", "Comerciante raiz, papo reto.", "Serviços locais · ferramentas · alimentos", ["Serviços", "Casa", "Alimentos"], "12-seu-antonio-perfil.jpg", 800, 800, false, "direto e popular"],
    ["larissa", "Larissa", 30, "feminino", "Recém-casada, organizada.", "Casa nova · decoração · financeiro", ["Casa", "Serviços"], "13-larissa-perfil.jpg", 800, 800, false, "organizada e prática"],
    ["gabriel", "Gabriel", 24, "masculino", "Estudante/dev, nerd simpático.", "Tech · cursos · café · setup", ["Tecnologia", "Serviços", "Alimentos"], "14-gabriel-perfil.jpg", 800, 800, false, "jovem e simpático"],
    ["vera", "Vera", 50, "feminino", "Precisa e zen, professora.", "Educação · bem-estar · chás · organização", ["Serviços", "Saúde e bem-estar", "Alimentos", "Casa"], "15-vera-perfil.jpg", 800, 1000, false, "precisa e serena"],
    ["diego", "Diego", 33, "masculino", "Barbeiro, estilo street, tatuado.", "Barba · moda masculina · tattoo care", ["Beleza", "Moda", "Serviços"], "16-diego-perfil.jpg", 800, 800, false, "direto e urbano"],
    ["helena", "Helena", 68, "feminino", "Vitalidade na terceira idade.", "Saúde 60+ · mobilidade · hobbies", ["Saúde e bem-estar"], "17-helena-perfil.jpg", 800, 800, false, "positiva e ativa"],
    ["aline", "Aline", 28, "feminino", "Ativa, criadora de conteúdo, cadeirante.", "Acessibilidade · moda · lifestyle", ["Moda", "Serviços"], "18-aline-perfil.jpg", 800, 800, true, "ativa e espontânea"],
    ["roberta", "Roberta", 40, "feminino", "Advogada, autoridade acolhedora.", "Serviços profissionais · finanças · moda social", ["Serviços", "Moda"], "19-roberta-perfil.jpg", 800, 800, false, "profissional e acolhedora"],
    ["mateus", "Mateus", 45, "masculino", "Pai suburbano, faz-tudo.", "Casa · jardim · auto · pet", ["Casa", "Serviços"], "20-mateus-perfil.jpg", 800, 800, false, "prático e direto"],
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
      image: item[0] === "dona-cida" ? "/assets/optimized/casting/07-dona-cida-perfil.webp" : "/assets/casting/" + item[7],
      imageAlt: item[1] + ", personagem virtual de " + item[2] + " anos do casting da Criando com IA.",
      width: item[8],
      height: item[9],
      featured: item[10],
      communicationTone: item[11],
      whatsappMessage: "Olá, Cesar! Vi a personagem " + item[1] + " no casting da Criando com IA e quero avaliar um conteúdo com ela para o meu produto.",
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
    ["As influencers são pessoas reais?", "Não. São personagens virtuais criadas com IA para uso em fotos e vídeos publicitários."],
    ["Posso escolher alguém do casting?", "Sim. Você pode começar com uma personagem já disponível ou contratar a criação de uma influencer exclusiva para sua marca."],
    ["A influencer do casting é exclusiva?", "Não. Os personagens do casting não são exclusivos. A proteção por categoria ou concorrência direta depende das condições confirmadas na contratação."],
    ["Quantos ajustes estão incluídos?", "A quantidade de ajustes depende do serviço. O Plano Mensal inclui uma rodada de ajustes por entrega. Nos demais projetos, a condição é informada antes do início."],
    ["Em quais formatos recebo os arquivos?", "Os formatos são definidos conforme o uso: feed, Stories, Reels, TikTok, anúncio, catálogo ou página de produto."],
    ["Vocês também criam landing pages e lojas?", "Sim. Landing pages são páginas de venda e, assim como as lojas, são projetos complementares avaliados separadamente conforme a necessidade da marca."],
    ["Qual é o prazo de entrega?", "O prazo varia conforme o serviço, a quantidade de peças e a complexidade do projeto. A estimativa é informada no atendimento e confirmada antes do início da produção."],
    ["Posso usar os arquivos em anúncios pagos?", "Sim. Os arquivos podem ser utilizados em anúncios pagos, respeitando as condições do serviço contratado e eventuais regras específicas de uso de personagens do casting."],
    ["O roteiro, a voz, a música e as legendas estão incluídos no vídeo?", "As inclusões variam conforme o formato contratado. Roteiro, voz, música, legendas e demais elementos são definidos no briefing e confirmados antes da produção."],
    ["Como funciona o pagamento?", "As condições de pagamento são informadas no atendimento e confirmadas antes do início do projeto."],
    ["O que é considerado um ajuste?", "Ajustes são correções pontuais dentro do briefing aprovado. Mudanças completas de conceito, personagem, cenário, roteiro ou direção podem ser tratadas como uma nova solicitação."],
    ["A criação da influencer exclusiva está incluída no Plano Mensal?", "Não. O Plano Mensal utiliza uma personagem do casting ou uma influencer exclusiva já criada. A criação de uma nova influencer exclusiva é contratada separadamente, salvo quando uma proposta personalizada informar o contrário."],
    ["Posso escolher idade, estilo e aparência da influencer exclusiva?", "Sim. O cliente pode escolher idade, estilo, aparência, personalidade e roupa principal durante o briefing."],
    ["A criação inclui nome e tom de fala?", "O nome é opcional e pode ser escolhido pelo cliente. A personalidade é definida na criação, enquanto o tom de fala é tratado separadamente em cada conteúdo ou vídeo."],
    ["Por quanto tempo posso usar a influencer exclusiva?", "Depois de criada e entregue, a influencer exclusiva fica destinada ao cliente para uso por prazo indeterminado, inclusive em anúncios pagos, conforme as condições confirmadas na contratação."],
    ["Recebo o character sheet?", "Sim. O cliente recebe os arquivos do character sheet, que funcionam como guia visual para manter rosto, corpo, roupa e referências da personagem consistentes."],
  ].map(function (item, index) { return { id: "faq-" + (index + 1), question: item[0], answer: item[1] }; });

  const institutional = {
    privacy: [
      { title: "Dados tratados durante a navegação", paragraphs: ["O site não possui formulário, cadastro, login ou checkout."] },
      { title: "Dados técnicos e UTMs", paragraphs: ["O site pode preservar parâmetros de origem da visita, como UTMs, durante a sessão para identificar a origem de cliques e interações. Esse recurso não registra o conteúdo das mensagens enviadas pelo visitante."] },
      { title: "Analytics e cookies", paragraphs: ["Na data desta política, não foi identificado provedor de analytics, pixel publicitário ou cookie próprio configurado no projeto. O site possui um adaptador técnico de eventos que opera sem fornecedor, não captura textos digitados, mensagens ou dados pessoais e não envia dados por conta própria."] },
      { title: "Contato pelo WhatsApp", paragraphs: ["Ao clicar em um botão de contato, o visitante é direcionado ao WhatsApp. As informações enviadas na conversa passam a ser tratadas dentro da plataforma WhatsApp e conforme as políticas aplicáveis ao serviço."] },
      { title: "Serviços externos", paragraphs: ["As fontes Mulish e Space Grotesk são carregadas pelo Google Fonts, o que pode gerar uma conexão técnica com esse fornecedor.", "O site está hospedado por infraestrutura de terceiros, que pode manter registros técnicos, como endereço IP e horário de acesso, conforme as regras do serviço de hospedagem."] },
      { title: "Futuras ferramentas", paragraphs: ["Caso ferramentas externas de analytics, publicidade ou medição sejam ativadas no futuro, esta Política de Privacidade deverá ser atualizada antes ou no momento da ativação."] },
    ],
    terms: [
      { title: "Uso do site", paragraphs: ["O conteúdo apresenta o portfólio e os serviços da Criando com IA. A navegação é livre para fins informativos e de avaliação comercial."] },
      { title: "Conteúdo e propriedade", paragraphs: ["Textos, identidade visual, imagens, vídeos, personagens e cases publicados pertencem aos respectivos titulares e não devem ser reproduzidos, redistribuídos ou usados comercialmente sem autorização.", "As pessoas apresentadas no casting são personagens virtuais criadas com inteligência artificial."] },
      { title: "Uso comercial", paragraphs: ["Os arquivos entregues podem ser utilizados comercialmente nos canais definidos na contratação, incluindo redes sociais, páginas de produto, campanhas e anúncios pagos, quando aplicável."] },
      { title: "Materiais enviados pelo cliente", paragraphs: ["O cliente é responsável por possuir autorização para utilizar fotos, marcas, rótulos, textos e demais materiais enviados como referência."] },
      { title: "Conferência de produto e conteúdo", paragraphs: ["Antes da entrega final, o cliente deve conferir rótulos, textos, cores, características do produto e demais informações relevantes."] },
      { title: "Veracidade das informações", paragraphs: ["Informações sobre benefícios, composição, resultados, garantias ou características do produto são de responsabilidade do cliente."] },
      { title: "Ajustes", paragraphs: ["A quantidade de ajustes segue o serviço ou pacote contratado. Correções dentro do briefing aprovado são diferentes de mudanças completas de direção, conceito, personagem, cenário ou roteiro."] },
      { title: "Influencer exclusiva", paragraphs: ["Após a conclusão da criação e a confirmação das condições contratadas, a personagem exclusiva é entregue ao cliente para uso por prazo indeterminado, inclusive em campanhas e anúncios pagos."] },
      { title: "Personagens do casting", paragraphs: ["Personagens do casting são disponibilizados conforme as condições do serviço e não se tornam propriedade exclusiva do cliente. Restrições de concorrência direta ou categoria devem ser confirmadas na contratação."] },
      { title: "Portfólio", paragraphs: ["A exibição de trabalhos no portfólio poderá ocorrer quando houver autorização ou quando o projeto tiver sido desenvolvido como projeto autoral ou demonstrativo da Criando com IA."] },
      { title: "Pagamento e início", paragraphs: ["Valores, condições de pagamento, prazo, entregas e ajustes são confirmados antes do início da produção."] },
      { title: "Links externos", paragraphs: ["O site pode direcionar para WhatsApp e para projetos publicados em outros domínios. Cada serviço externo possui seus próprios termos e políticas."] },
    ],
  };

  const metadata = {
    "/": { title: "Criando com IA | Fotos de produto e influencers virtuais", description: "Transformação de fotos de produtos, criativos para anúncios, vídeos e influencers virtuais com IA para marcas e pequenos negócios." },
    "/casting/": { title: "Casting brasileiro de influencers virtuais | Criando com IA", description: "Conheça o casting brasileiro de personagens virtuais de diferentes idades, estilos e perfis para campanhas de produtos e marcas." },
    "/servicos/fotos-de-produto-com-ia/": { title: "Fotos de produto com IA | Criando com IA", description: "Transforme fotos simples em imagens profissionais e crie cenas de uso, também conhecidas como cenas lifestyle, para anúncios, catálogos e páginas de produto." },
    "/servicos/influencers-virtuais/": { title: "Influencers virtuais para marcas | Criando com IA", description: "Crie fotos e vídeos com personagens virtuais realistas ou desenvolva uma influencer exclusiva para sua marca." },
    "/servicos/videos-ugc-com-ia/": { title: "Vídeos UGC com personagens virtuais | Criando com IA", description: "Vídeos verticais no estilo criador de conteúdo com personagens virtuais para anúncios, Reels e TikTok." },
    "/servicos/video-360-produto/": { title: "Vídeo 360° de produto com IA | Criando com IA", description: "Vídeos de apresentação 360° produzidos a partir de fotos frontal, laterais e verso do produto." },
    "/cases/rosa-mosqueta/": { title: "Case Rosa Mosqueta: de foto a campanha | Criando com IA", description: "Veja a transformação de uma foto simples em campanha com cenas, influencer virtual, vídeos demonstrativos e landing page." },
    "/cases/biotina/": { title: "Case Biotina: produto, criativos e vídeo | Criando com IA", description: "Veja como a embalagem de Biotina virou fotos, criativos, influencer virtual, vídeo publicitário e landing page." },
    "/cases/gota-nativa/": { title: "Gota Nativa: projeto autoral de marca e e-commerce | Criando com IA", description: "Projeto autoral da Criando com IA com nome, identidade, catálogo, criativos e e-commerce desenvolvido do zero." },
    "/politica-de-privacidade/": { title: "Política de Privacidade | Criando com IA", description: "Entenda quais dados técnicos podem ser tratados durante a navegação no site Criando com IA." },
    "/termos-de-uso/": { title: "Termos de Uso | Criando com IA", description: "Condições de uso do site e dos conteúdos publicados pela Criando com IA." },
  };

  return Object.freeze({
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
    normalizeWhatsAppNumber,
    createWhatsAppUrl,
  });
});
