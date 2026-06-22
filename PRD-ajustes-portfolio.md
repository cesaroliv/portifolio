# PRD — Ajustes no Site de Portfólio (v2)

> Alterações pontuais sobre o site já construído. NÃO redesenhar nada: manter a identidade visual atual (roxo #5A3FE0, Space Grotesk + Mulish, layout alinhado à esquerda). Apenas aplicar os ajustes abaixo.

---

## Ajuste 1 — Vídeos de depoimento na Prova Social

Na seção de prova social, além das fotos de clientes, inserir DOIS vídeos de depoimento que estão na pasta `assets/`:
- `Vídeo depoimento.mp4`
- `Vídeo depoimento1.mp4`

Requisitos:
- Inserir com `<video controls playsinline>` e `preload="metadata"` (não autoplay com som).
- Proporção vertical (9:16) — exibir lado a lado no desktop e empilhados no mobile, sem distorcer.
- Posicioná-los em destaque ANTES da grade de fotos (vídeo é prova mais forte) ou ao lado dela, o que ficar melhor no layout atual.
- Pequeno rótulo discreto: "Depoimentos em vídeo".
- Se os nomes de arquivo com espaço/acento derem problema, renomear para `depoimento-video-1.mp4` e `depoimento-video-2.mp4` e me avisar.

---

## Ajuste 2 — Seção de Pacotes: entregáveis concretos

Hoje os pacotes têm descrições vagas ("fotos que vendem"). Deixar QUANTIDADES claras em todos, mantendo o visual atual dos cards. Novos textos:

**Vitrine — a partir de R$197**
> 8 imagens de produto profissionais (1 foto limpa + variações de cena). O essencial pra renovar o catálogo.

**Kit de Anúncio — a partir de R$697** *(manter "Mais escolhido")*
> 8 imagens + 3 cenas + 1 influencer com IA + 1 vídeo UGC + copy dos criativos. O pacote pra começar a anunciar de verdade.

**Pacote Completo — a partir de R$1.500** *(renomear de "Do Zero ao Ar")*
> Tudo do Kit de Anúncio + landing page pronta. Entrega dos criativos e da página — a gestão dos anúncios fica por conta do cliente.

**Mensalidade de Criativos — a partir de R$600/mês**
> 8 imagens + 2 vídeos novos por mês, pra nunca cansar o público.

> IMPORTANTE (Ajuste 3): o "Pacote Completo" NÃO inclui gestão de tráfego/campanha. A entrega é de criativos + landing prontos para anunciar; quem sobe e gerencia os anúncios é o cliente. Garantir que nenhum texto do site prometa "subir campanha", "colocar no ar" ou "gerenciar anúncios". Revisar também o hero e o fechamento para remover qualquer promessa de gestão de anúncios.

---

## Critérios de aceite

- [ ] Vídeos de depoimento funcionando, responsivos, sem autoplay com som.
- [ ] Os 4 cards com entregáveis e quantidades concretas.
- [ ] "Do Zero ao Ar" renomeado para "Pacote Completo" e sem promessa de gestão de anúncios.
- [ ] Nenhuma promessa de "subir/gerenciar campanha" em nenhuma parte do site.
- [ ] Identidade visual e layout preservados (nada redesenhado).
