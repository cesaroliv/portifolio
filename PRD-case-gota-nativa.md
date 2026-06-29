# PRD — Adicionar Case "Gota Nativa" (Marca/Loja Completa)

> Adição à galeria de cases do site criandocomia.com (estrutura de vitrine + cases em overlay já definida no PRD anterior). Manter identidade visual (roxo #5A3FE0, Space Grotesk + Mulish) e a qualidade de design. Ao final, commit + push pra Vercel.

---

## Contexto e objetivo

Gota Nativa é o case mais forte do portfólio: NÃO é "transformei uma foto", e sim "criei uma MARCA e uma LOJA inteira do zero" (nome, logo, identidade, catálogo, criativos e site de e-commerce no ar). Deve ser exibido como **case de destaque**, em um patamar acima dos demais, e permitir **visita ao vivo**.

---

## Como exibir na galeria de Cases

- Colocar a Gota Nativa como **primeiro card e em destaque** (card maior ou com marcação visual diferente).
- **Selo/etiqueta:** "Marca completa · Loja no ar" (diferente do selo dos outros cases, que são de criativos).
- O card abre o **overlay do case** (mesma mecânica dos outros: tela cheia, rola, fecha com X/ESC/clique fora).

## Conteúdo do overlay (narrativa diferente — "de um produto a uma marca")

A história NÃO é antes/depois de foto. É a construção de uma marca completa. Ordem:

1. **Intro/capa:** "Gota Nativa — uma marca de óleos naturais, criada do zero com IA." 1 parágrafo: o desafio de vender óleo natural sem identidade própria, e a solução de criar uma marca completa.
2. **A marca:** logo da Gota Nativa + identidade (cores, conceito "Natural por essência"). Legenda: nome, logo e identidade criados do zero.
3. **O catálogo/produtos:** print do catálogo de óleos (com os filtros Rosto/Cabelo/Corpo). Legenda: linha de produtos organizada e fotografada.
4. **Os criativos / influencer:** se houver imagens de criativos ou influencer desse projeto, exibir em grade. (Opcional — usar o que existir.)
5. **A loja completa:** print ou GIF da home/checkout. Legenda: e-commerce completo com pagamento e garantia.
6. **Prova ao vivo (destaque):** um botão grande **"Visitar a loja ao vivo →"** apontando para `https://gotanativa.com.br` (abrir em nova aba, `target="_blank" rel="noopener"`). Texto: "Não é mockup. É uma loja de verdade, no ar — criada do início ao fim."
7. **Recap:** "De um produto a uma marca completa, pronta pra vender."

> Compliance: manter linguagem cosmética/aparência (sem promessa médica), coerente com o próprio site da Gota Nativa.

---

## Manifesto de assets — pasta `assets/gota-nativa/`
Renomear o que você tiver para:
- `logo.png` — logo da Gota Nativa
- `home.jpg` (ou `home.gif`) — print/GIF da home da loja
- `catalogo.jpg` — print do catálogo de óleos
- `criativo-1.jpg`, `criativo-2.jpg` — criativos (se houver; opcional)
- `influencer.jpg` — influencer do projeto (se houver; opcional)
- `capa.jpg` — imagem de capa do card na galeria (pode ser a home ou a logo sobre fundo)
> Sem espaços/acentos nos nomes. Faltando algum, deixar espaço reservado e avisar. Os itens opcionais podem ser omitidos sem quebrar o layout.

---

## Ajuste na seção de Serviços (se já existir)
Como a Gota Nativa prova capacidade de "marca + loja completa", considerar adicionar/!ajustar um item de serviço **"Marca e loja completas"** (ou reforçar "Landing pages" para "Páginas e lojas"), apontando para este case. Não obrigatório — só se ficar coerente com o layout.

## Requisitos técnicos
- HTML/CSS/JS puro; manter padrão atual. Sem frameworks.
- Mobile-first; overlay e botão "visitar ao vivo" funcionando bem no celular.
- Link externo com `target="_blank" rel="noopener"`.
- Imagens `loading="lazy"`; acessibilidade (alt, foco, ESC, reduced-motion).

## Critérios de aceite
- [ ] Card da Gota Nativa em destaque na galeria, com selo "Marca completa · Loja no ar".
- [ ] Overlay com a narrativa de marca (não antes/depois) e botão "Visitar a loja ao vivo" para gotanativa.com.br em nova aba.
- [ ] Assets de `assets/gota-nativa/` aplicados; opcionais ausentes não quebram o layout.
- [ ] Identidade e qualidade visual preservadas.
- [ ] Site no ar em https após o deploy.
