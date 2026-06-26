# PRD — Home como Portfólio (Vitrine + Cases) + Case Biotina

> Reorganização do site criandocomia.com. Manter a identidade visual atual (roxo #5A3FE0, Space Grotesk + Mulish) e a qualidade de design — NÃO piorar nem "simplificar" o visual. Ao final, commit + push pra Vercel.

---

## Objetivo

Hoje o site é uma landing de UM case (rosa mosqueta). Transformar em **portfólio/vitrine** que:
1. Mostra os SERVIÇOS por categoria (vitrine de capacidade).
2. Tem uma GALERIA DE CASES (vários projetos), cada um abrindo em tela cheia com a história completa.
3. É CRESCÍVEL: adicionar um case novo = adicionar um card + um bloco de conteúdo, sem refazer o site.

Decisão de arquitetura: **página única**. Cada case abre em um **overlay em tela cheia que rola** (não é uma URL separada). Mais simples de manter.

---

## Nova estrutura da Home (ordem das seções)

1. **Header:** logo (clara) + navegação: Serviços · Cases · Pacotes · Falar comigo.
2. **Hero:** manter o atual ("De uma foto no celular a uma campanha inteira") — funciona como tagline da marca. CTA WhatsApp + "Ver os cases ↓".
3. **Serviços (NOVO):** 4 cards/itens, cada um com título, 1 linha de descrição e 1–2 imagens de exemplo (pode reaproveitar imagens dos cases):
   - **Fotos transformadas** — produto cru vira foto de e-commerce e cenas que vendem.
   - **Criação de influencers com IA** — personas consistentes, sem cachê nem agenda.
   - **Vídeos & criativos** — UGC e anúncios prontos pra Instagram/TikTok.
   - **Landing pages** — a página que transforma clique em venda.
   *(Cada serviço pode ter um link discreto "ver no case →" apontando para o case onde aquilo aparece.)*
4. **Cases (NOVO — galeria):** título da seção + grade de cards. Cada card = imagem de capa + nome do produto + 1 linha + selo de tipo. Cards iniciais:
   - **Rosa Mosqueta** (skincare)
   - **Biotina** (suplemento / beleza capilar)
   Clicar no card → abre o **overlay do case** (ver mecânica abaixo).
5. **Pacotes:** manter como está (com a oferta de 50% de lançamento já aplicada).
6. **Quem está por trás:** manter.
7. **Tag "Não é filtro de IA":** manter (texto de expertise já aplicado).
8. **Contato:** manter (WhatsApp https://wa.me/5511978230487).
9. **Rodapé:** manter (logo escura).

---

## Mecânica do overlay de case

- Ao clicar num card, abre um painel **em tela cheia** (cobrindo a página) com **rolagem própria** e um botão **fechar (X)** bem visível no topo.
- Fechar com o X, clicando fora, ou tecla ESC. Travar o scroll do fundo enquanto aberto.
- Acessível: foco vai para o overlay ao abrir e volta ao card ao fechar; respeitar `prefers-reduced-motion`.
- Cada case é um bloco de conteúdo já pronto no HTML (escondido) que o overlay exibe — assim, adicionar um case novo é só duplicar o bloco e o card.

---

## Conteúdo dos cases

### Case 1 — Rosa Mosqueta (refatorar o existente)
Mover TODO o conteúdo atual do case rosa mosqueta (o desafio → antes/depois → cenas → influencer Patricia → vídeo → depoimentos → landing → recap) para DENTRO do overlay do card "Rosa Mosqueta". Não recriar do zero — reaproveitar o que já existe, apenas movendo para o overlay. As imagens continuam em `assets/` (e os depoimentos em vídeo também).

### Case 2 — Biotina (NOVO)
Mesma narrativa, com os arquivos em `assets/biotina/`. Estrutura do overlay:
- **Capa/intro:** "Biotina — beleza capilar" + 1 parágrafo curto (produto de beleza/suplemento cuja embalagem comum não comunicava valor).
- **Antes → Depois (produto):** foto crua/embalagem → foto de produto profissional. (`produto.jpg`; se houver uma versão "antes", usar; senão, focar no resultado.)
- **Criativos de anúncio:** os criativos prontos (`criativo-1.jpg`, `antes-depois.jpg`, `ugc-1.jpg`) numa grade. Legenda: criativos prontos pra rodar.
- **Influencer com IA:** character sheet (`influencer-sheet.jpg`) + influencer com o produto (`influencer.jpg`). Legenda: persona criada do zero.
- **Landing page:** o mockup animado (`landing.gif`). Legenda: a página que converte.
- **Recap:** "De um produto comum, uma campanha completa."
- (Depoimentos: deixar um espaço comentado para adicionar quando houver.)

**Compliance:** linguagem de beleza/aparência (fios, cabelo, unhas), sem promessas médicas ("cura queda", "trata calvície"). Manter "não é medicamento" quando aplicável.

---

## Manifesto de assets — Biotina (pasta `assets/biotina/`)
Renomear os arquivos enviados para:
- `produto.jpg` — foto do produto (o pote de Biotina)
- `antes-depois.jpg` — o criativo de antes/depois
- `criativo-1.jpg` — o "criativo1"
- `ugc-1.jpg` — o "ugc1"
- `influencer-sheet.jpg` — o character sheet ("Influencer_Biotina")
- `influencer.jpg` — a influencer com o produto ("Influencer Biotina"/"download")
- `landing.gif` — o "gif landing page biotina"
> Se algum nome tiver espaço/acento, renomear sem espaço/acento. Se faltar algum, deixar espaço reservado e avisar.

---

## Como adicionar um case no futuro (documentar no código)
Deixar um comentário no HTML explicando: para adicionar um case novo, (1) duplicar um card na galeria, (2) duplicar um bloco de conteúdo de case, (3) colocar as imagens em `assets/nome-do-case/`. Sem mexer no resto.

---

## Requisitos técnicos
- HTML/CSS/JS puro, mantendo o padrão atual. NÃO instalar frameworks.
- Mobile-first (perfeito em 360px); overlay funciona bem no celular (tela cheia, rola, fecha fácil).
- Imagens `loading="lazy"` (menos as do topo); manter performance.
- Acessibilidade: alt em imagens, foco no teclado, ESC fecha overlay, reduced-motion.

## Critérios de aceite
- [ ] Home com seção de Serviços (4 categorias) e galeria de Cases.
- [ ] Cards de Rosa Mosqueta e Biotina abrindo o case em tela cheia, com fechar (X/ESC/clique fora).
- [ ] Conteúdo da rosa mosqueta migrado para o overlay (nada perdido).
- [ ] Case Biotina completo com os assets de `assets/biotina/`.
- [ ] Pacotes, Quem está por trás, tag de IA e contato preservados.
- [ ] Identidade visual mantida; nada feio/genérico.
- [ ] Comentário no código explicando como adicionar um case futuro.
- [ ] Site no ar em https após o deploy.
