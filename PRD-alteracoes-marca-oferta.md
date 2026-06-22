# PRD — Alterações no Site (logos, contato, oferta e tag de IA)

> Ajustes no site já publicado (criandocomia.com). NÃO redesenhar — manter identidade visual (roxo #5A3FE0, Space Grotesk + Mulish) e layout. Apenas aplicar os itens abaixo e, ao final, fazer commit/push pra Vercel publicar.

---

## 1. Inserir as logos

Na pasta `assets/` há três arquivos de logo:
- `logo1` — versão horizontal (símbolo + texto lado a lado)
- `logo2` — versão empilhada (símbolo em cima, texto embaixo)
- `logo dark` — versão para fundos escuros

Aplicar:
- **Topo/menu (header):** substituir o texto "ESTÚDIO." pela logo. Como o header tem fundo claro, usar `logo1` (horizontal). Tamanho adequado (altura ~32–40px), nítida, com link para o topo.
- **Rodapé:** o rodapé tem fundo escuro → usar `logo dark`. Substituir o "ESTÚDIO." atual.
- **Favicon (ícone da aba):** gerar/usar uma versão só do símbolo (o losango com a bolinha). Se não houver arquivo isolado do símbolo, recortar a partir de uma das logos ou me avisar para eu exportar.
- Conferir nomes exatos dos arquivos (maiúsculas/minúsculas e espaços; se "logo dark" tiver espaço no nome, renomear para `logo-dark` e avisar). Definir `alt="Criando com IA"`.

## 2. WhatsApp

Em TODOS os botões/links de contato (hero, seção de contato e rodapé), apontar para:
`https://wa.me/5511978230487`
Centralizar esse link num único ponto fácil de editar.

## 3. Instagram (remover por enquanto)

Ainda não há perfil no Instagram. Remover (ou ocultar) todos os botões/links de Instagram do site — não deixar link apontando para "#" (link morto passa amadorismo). Manter o layout equilibrado sem eles. Deixar comentado no código onde reativar depois.

## 4. Oferta de lançamento (50% OFF) nos pacotes

Reposicionar a seção de pacotes como OFERTA DE LANÇAMENTO, sem só baixar o número. Em cada card:
- Mostrar o **preço cheio riscado** e, em destaque, o **preço com 50% OFF**.
- Adicionar um selo/etiqueta no topo da seção: **"Preço de lançamento · 50% OFF"** e uma linha curta de justificativa/urgência: *"Condição para os primeiros clientes — em troca, autorização para usar o trabalho como case."*

Valores (preço cheio → com 50%):
- **Vitrine:** de R$197 por **R$98** — 8 imagens de produto profissionais (1 foto limpa + variações de cena).
- **Kit de Anúncio** (Mais escolhido): de R$697 por **R$348** — 8 imagens + 3 cenas + 1 influencer com IA + 1 vídeo UGC + copy dos criativos.
- **Pacote Completo:** de R$1.500 por **R$750** — tudo do Kit de Anúncio + landing page pronta. Entrega dos criativos e da página; a gestão dos anúncios fica por conta do cliente.
- **Mensalidade de Criativos:** de R$600/mês por **R$300/mês** — 8 imagens + 2 vídeos novos por mês.

(Manter "a partir de" antes dos preços.)

## 5. Reposicionar a tag "Tudo feito com IA"

Trocar o texto atual por um enquadramento que valorize a EXPERTISE (não a ferramenta), para não passar a impressão de que "qualquer um faz sozinho". Manter o visual do bloco atual.

**Novo título:** Não é "filtro de IA".
**Novo texto:**
> Cada imagem, vídeo e página aqui foi construído com engenharia de prompt e direção criativa — o tipo de resultado que a ferramenta sozinha não entrega, só quem sabe conduzi-la. É essa diferença que eu coloco no seu produto.

(Pode manter o selo "✦ IA" do bloco.)

---

## 6. Publicar
Após as alterações, fazer commit + push para o GitHub e confirmar que a Vercel republicou, com o site abrindo em https.

## Critérios de aceite
- [ ] Logo no header (clara) e no rodapé (escura); favicon com o símbolo.
- [ ] WhatsApp +55 11 97823-0487 funcionando em todos os botões.
- [ ] Nenhum link de Instagram/morto no site.
- [ ] Pacotes com preço cheio riscado + 50% OFF + selo de lançamento.
- [ ] Tag de IA com o novo texto (tom de expertise).
- [ ] Marca "Criando com IA" coerente em todo o site; nada redesenhado.
- [ ] Site no ar em https após o deploy.
