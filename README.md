# Criando com IA — site comercial

Site estático em HTML, CSS e JavaScript puro para apresentar fotos de produto, influencers virtuais, vídeos e cases da Criando com IA.

O build mantém páginas reais e indexáveis na raiz do repositório, compatíveis com o deploy atual via GitHub Pages.

## Como ver localmente

Com Python instalado, na pasta do projeto:

```bash
py -m http.server 8000
```

Depois abra **http://localhost:8000** no navegador.

## Build e testes

Requer Node.js 20 ou superior, sem dependências externas do projeto:

```bash
npm run build
npm test
```

Para executar os dois em sequência:

```bash
npm run validate
```

## Onde editar os contatos

Edite `content.js`. O endpoint e o número do WhatsApp, as mensagens, textos compartilhados, preços, casting, cases, FAQ, rotas e metadados estão centralizados nesse arquivo.

## Estrutura

- `content.js` — fonte única de dados e conteúdo compartilhado;
- `scripts/build.js` — gerador das páginas estáticas, sitemap, robots, CSS minificado e inventário de assets;
- `index.html` — home gerada;
- `casting/`, `servicos/`, `cases/` — rotas estáticas geradas;
- `styles.css` — identidade visual e layout em formato editável;
- `styles.min.css` — folha publicada, gerada pelo build;
- `script.js` — menu, FAQ, filtros, comparadores, mídia e eventos;
- `tests/` — validações automatizadas;
- `docs/` — auditorias e relatórios;
- `assets/` — imagens e vídeos originais;
- `assets/optimized/` — variantes WebP e MP4 otimizadas.


## Padrão mínimo de qualidade das landing pages
Consultar `docs/LANDING_PAGE_QUALITY_FLOOR.md` antes de criar nova landing. Por decisão do proprietário em 2026-11-01, Papelería Creativa (https://lumenanima.com/papelaria-criativa/) é o **piso mínimo de qualidade**, não um template para copiar. Verificar materiais reais, direção autoral, narrativa, motion, responsividade e QA técnico E visual.
