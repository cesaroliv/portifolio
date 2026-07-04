# PRD — Preços Unitários + Casting de Influencers (2 Tiers)

> Atualização do site criandocomia.com: (1) nova tabela de preços construída dos valores unitários, (2) dois tiers de influencer (Casting compartilhado e Exclusiva), (3) nova seção "O Casting" com a galeria de influencers reais. Manter identidade visual (roxo #5A3FE0, Space Grotesk + Mulish). Ao final, commit + push.

---

## 1. Nova seção: "O Casting" (diferencial da marca)

Inserir entre Serviços e Cases (ou dentro do bloco Influencers, o que ficar melhor).

**Título:** "Influencers reais. Não modelos perfeitas."
**Texto de abertura:**
> "O mercado está cheio de influencer de IA com cara de boneca: 25 anos, pele plastificada, corpo irreal. O público percebe — e não se conecta. Meu casting é diferente: mulheres e homens de verdade, de 22 a 68 anos, todos os tons de pele, corpos reais, estilos do Brasil real. Porque quem compra confia em quem se parece com ela."

**Galeria:** grade de cards das influencers disponíveis (foto de perfil + nome + idade + vibe/nichos). Usar os arquivos de `assets/casting/` (`[numero]-[nome]-perfil.jpg`). Exibir as personas que já existirem; deixar a grade preparada para crescer (comentário no código de como adicionar). Incluir card final "+ novas influencers em breve" (casting em expansão).
**Nota de transparência (visível na seção):** "As influencers do casting trabalham como influencers reais: podem aparecer com produtos de outras marcas (nunca concorrentes diretos). Quer uma só sua? Veja a opção Exclusiva."

## 2. Nova seção/tabela de preços (substituir os pacotes atuais)

Estrutura em DOIS blocos, mantendo o formato visual dos cards e o selo de lançamento se desejado (ver observação ao final).

### Bloco A — Avulsos (a conta aberta)
Tabela simples e clara:
- Foto transformada (celular → estúdio): **R$70/foto** (mínimo 3)
- Cena lifestyle adicional (mesmo produto): **R$45/foto**
- Vídeo 360° do produto: **R$130**
- Foto de influencer do casting com seu produto: **R$65/foto** (mínimo 3)
- Vídeo UGC com influencer do casting (até 30s): **R$220/vídeo**

### Bloco B — Influencer: dois caminhos
**Card 1 — Influencer do Casting** *(entrada acessível)*
> "Escolha uma influencer do casting e coloque seu produto nas mãos dela. Sem custo de criação — você paga só as peças."
> A partir de **R$195** (3 fotos com seu produto) · Vídeo UGC +R$220
> *Ela pode aparecer com outros produtos (nunca concorrentes diretos).*

**Card 2 — Influencer Exclusiva** *(Mais completo — destacar)*
> "Uma influencer criada do zero, só da sua marca. Ninguém mais usa."
> Criação da persona (character sheet): **R$450** + peças (fotos R$65 · vídeos R$220)
> Pacote de estreia sugerido: criação + 6 fotos + 1 vídeo UGC = **R$1.060**

**Card 3 — Mensalidade de Criativos** *(Melhor custo-benefício)*
> 8 fotos + 2 vídeos novos todo mês com sua influencer (casting ou exclusiva): **R$970/mês**
> *"Quem anuncia sabe: criativo repetido cansa e para de vender."*

**Linha ao final da seção:** "Precisa de algo maior (landing page, marca completa)? Me chama que a gente conversa."

### Observação sobre o desconto de lançamento
O 50% OFF anterior gerava preços abaixo do custo justo. Se mantiver oferta de lançamento, usar no máximo **-25%** sobre os valores acima, com o selo "Preço de lançamento · primeiros clientes · vira case". Deixar os dois números (cheio riscado + lançamento). Se preferir sem desconto, remover o selo. **Implementar COM o desconto de 25% por padrão** (o Cesar ajusta depois se quiser).

## 3. Ajustes de coerência
- Bloco de serviços "Influencers virtuais": mencionar o casting ("do casting pronto à exclusiva da sua marca").
- Hero/meta: sem mudanças além do já aplicado.
- Cases: sem mudanças.

## Requisitos técnicos
- HTML/CSS/JS puro; mobile-first; imagens lazy; alt em todas.
- Galeria do casting preparada pra crescer (duplicar card = adicionar persona).
- Não quebrar nada existente.

## Critérios de aceite
- [ ] Seção "O Casting" com posicionamento de influencers reais + galeria + nota de transparência.
- [ ] Preços avulsos visíveis (a conta aberta) + 2 tiers de influencer + mensalidade, com os valores deste PRD.
- [ ] Desconto de lançamento de 25% aplicado (cheio riscado + valor final).
- [ ] Identidade visual preservada; site publicado em https.
