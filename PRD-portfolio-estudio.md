# PRD — Site de Portfólio (Estúdio de Criativos com IA)

> Especificação para o Claude Code construir um site de portfólio de uma página, usado para captar clientes.
> Stack: HTML + CSS + JavaScript puro, página única, mobile-first, exportável em PDF.

---

## 1. Objetivo

Um site de uma página, com link compartilhável, que apresenta o trabalho de criação de criativos com IA e converte o prospecto em um contato (WhatsApp/Instagram). Não é uma galeria de imagens — é um **case study com história e oferta**, terminando em uma ação clara.

**Ação principal:** clicar para falar comigo (WhatsApp ou Instagram) / pedir um diagnóstico grátis.

---

## 2. Público

Donos de pequenos e-commerces, lojistas, dropshippers e infoprodutores que já vendem (ou querem vender) online e têm criativo fraco. Eles precisam acreditar, em 30 segundos de rolagem, que eu transformo o produto deles como transformei o da rosa mosqueta.

---

## 3. Identidade visual (seguir à risca — não usar template genérico)

Manter a identidade do deck de serviços, para coesão de marca.

- **Cores (hex nomeados):** fundo `#F5F4F1`; tinta `#1B1A20`; roxo `#5A3FE0`; roxo profundo `#3B2BA3`; roxo claro `#ECE9FC`; texto secundário `#6E6B76`; cartão `#FFFFFF`.
- **Tipografia:** display **Space Grotesk** (títulos, com peso); corpo **Mulish**.
- **Elemento-assinatura:** a **transformação "antes → depois"** com a seta (→) como motivo recorrente. É o que a página deve ser lembrada.
- **Tom:** confiante, moderno, criativo-tech. Bastante respiro, hierarquia forte, pouco texto por bloco. Imagem grande manda.
- **Evitar:** cara de template, cards genéricos, excesso de sombras/gradientes, tudo centralizado. Buscar layout editorial e intencional.

---

## 4. Estrutura da página (ordem das seções)

1. **Hero:** nome do estúdio + tagline ("De uma foto no celular a uma campanha inteira") + subtítulo curto + CTA (Falar comigo). Incluir um teaser visual do antes → depois.
2. **O case — rosa mosqueta** (o coração do site, contado como história):
   - **O desafio:** "O cliente tinha só isto" → a foto crua (prateleira verde). Texto curto sobre o problema (produto bom, foto que não vende).
   - **Antes → Depois (produto):** a foto crua e a trabalhada **lado a lado**, com a seta. Este é o bloco mais importante.
   - **As cenas:** as variações de foto de produto (botânica, ritual, dramática). Legenda: criar desejo sem estúdio.
   - **A influencer:** "O cliente pediu uma influenciadora. Criei a Patricia." → character sheet + fotos dela com o produto. Legenda: persona consistente, feita com IA.
   - **O vídeo:** o vídeo UGC (incorporado ou thumbnail que abre o vídeo). Legenda: vídeo pronto pra anúncio.
   - **Os depoimentos:** as fotos de clientes com o produto, em grade uniforme.
   - **A página:** o mockup da landing page. Legenda: a página que vira clique em venda.
   - **Recap:** "De uma foto, uma campanha completa." (síntese visual dos entregáveis)
3. **Serviços / pacotes:** Vitrine (a partir de R$197), Kit de Anúncio (a partir de R$697, destaque), Do Zero ao Ar (a partir de R$1.500), Mensalidade de Criativos (a partir de R$600/mês).
4. **Por que comigo:** (1) entendo de venda, não só imagem bonita; (2) entrega rápida com IA; (3) preço justo pra quem está começando.
5. **Contato / CTA final:** "Quer assim pro seu produto? Te mostro de graça o que dá pra fazer com o seu." Botões: WhatsApp e Instagram.
6. **Rodapé:** nome do estúdio, contato, ano.

---

## 5. Manifesto de arquivos (o que colocar na pasta `assets/`)

Nomear as imagens exatamente assim para o Claude Code encaixá-las:

- `before-produto.jpg` — a foto crua enviada pelo cliente (prateleira verde)
- `after-produto.jpg` — a melhor foto de produto trabalhada (fundo limpo)
- `cena-1.jpg`, `cena-2.jpg`, `cena-3.jpg` — as variações de cena (botânica, ritual, dramática)
- `influencer-sheet.jpg` — o character sheet da Patricia (rosto + corpo)
- `influencer-1.jpg`, `influencer-2.jpg`, `influencer-3.jpg` — Patricia com o produto
- `video-ugc.mp4` — o vídeo UGC (ou `video-thumb.jpg` se for só um link)
- `depoimento-1.jpg` a `depoimento-4.jpg` — as fotos de clientes
- `landing-mockup.jpg` — o print/mockup da landing page
- (opcional) `logo.png` — logo/nome do estúdio

> Se faltar algum arquivo, o Claude Code deve deixar um espaço reservado e avisar qual imagem colocar ali.

---

## 6. Requisitos técnicos

- Página única, em arquivos simples (HTML/CSS/JS puro). **Não** instalar frameworks sem perguntar.
- **Mobile-first**, perfeita em 360px, tablet e desktop.
- **Antes → depois** lado a lado (ou um slider simples de comparação, se ficar bom no mobile).
- **Vídeo** incorporado com `<video controls>` (ou thumbnail clicável que abre o vídeo).
- Imagens com `loading="lazy"` (menos a do hero) e otimizadas; carregamento rápido.
- **Acessibilidade:** `alt` em todas as imagens, foco visível no teclado, respeito a "reduzir movimento".
- **Exportável em PDF:** estilos de impressão para `Ctrl+P → Salvar como PDF` sair organizado.
- Centralizar contatos (WhatsApp, Instagram) numa parte fácil de editar.

---

## 7. Critérios de aceite

- [ ] Visual distinto e coeso (identidade da seção 3) — não parece template.
- [ ] Antes → depois justapostos e impactantes.
- [ ] A página conta uma história (desafio → transformação → resultado), não é só galeria.
- [ ] CTA claro e repetido (falar comigo).
- [ ] Perfeita no celular.
- [ ] Contatos fáceis de editar.

---

## 8. Como usar no Claude Code

Coloque este PRD e a pasta `assets/` (com as imagens nomeadas como na seção 5) na mesma pasta. Abra o Claude Code ali e use o prompt fornecido. Itere seção por seção depois ("melhore o hero", "deixe o antes/depois maior").
