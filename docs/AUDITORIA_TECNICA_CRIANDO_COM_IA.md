# Auditoria técnica — Criando com IA

**Data da linha de base:** 15/07/2026  
**URL local auditada:** `http://127.0.0.1:8000/`

## Stack e execução

- Site estático em HTML5, CSS e JavaScript puro, sem framework e sem gerenciador de dependências.
- Arquivos-fonte públicos: `index.html`, `styles.css`, `script.js` e `assets/`.
- Desenvolvimento local documentado: `py -m http.server 8000`.
- O repositório não possuía comando de build nem suíte de testes.
- A publicação atual é compatível com GitHub Pages: branch `main`, arquivos públicos na raiz e `CNAME` com `criandocomia.com`. Não há workflow de deploy no repositório.

## Estrutura encontrada

- A home, as 20 pessoas do casting, os preços, os três cases e as galerias estavam concentrados em `index.html`.
- Preços: HTML hardcoded na seção `#pacotes`.
- Casting: 20 cards hardcoded em `index.html`; o arquivo `casting-20-influencers.md` contém a matriz editorial original.
- Cases: cards na home e conteúdos completos escondidos em `.case-sources`, todos no mesmo HTML.
- Estilos: arquivo único `styles.css`, com paleta, tipografia, responsividade, overlay, comparadores e galerias.
- Scripts: arquivo único `script.js`, responsável por contatos, ano do footer, comparadores, autoplay do vídeo 360° e overlay de cases.

## Contato e conversão

- WhatsApp confirmado no projeto: `5511978230487`.
- O link era montado em `script.js` com `https://wa.me/`, o número e `encodeURIComponent` de uma única mensagem genérica.
- O Instagram continha apenas o placeholder `seuestudio` e estava desativado no HTML; portanto, não é dado público confirmado.
- Não havia eventos de conversão, preservação de UTMs ou adaptador de analytics.

## Interações e mídia

- Cases: overlay próprio que movia o conteúdo oculto para um `role="dialog"`; fechava por botão, backdrop e Escape, mas não prendia o foco.
- Antes/depois: componente `.compare` controlado por mouse, toque e teclado no `script.js`.
- Vídeos: players HTML5 nativos. O vídeo 360° iniciava automaticamente por `IntersectionObserver`; os demais usavam controles e, em geral, `preload="metadata"`.
- A home mantinha o conteúdo completo de cases e casting no mesmo documento, aumentando o DOM e o risco de download antecipado.

## SEO e dados externos

- A home tinha apenas `title` e `meta description` básicos.
- Não havia canonical, Open Graph, Twitter Cards, JSON-LD, sitemap ou robots.
- Não existiam rotas públicas internas; cases e casting só eram acessíveis na home/overlay.
- Fontes externas: Google Fonts, famílias Mulish e Space Grotesk, pesos 400–700.
- Não foram encontrados GA4, Google Tag Manager, Meta Pixel, cookies, formulários, embeds, `localStorage` ou `sessionStorage`.

## Assets e linha de base de performance

- `assets/`: 120 arquivos, aproximadamente **262,43 MB** no disco, incluindo variantes não referenciadas.
- Maiores arquivos referenciados: `assets/biotina/landing.gif` (~31,50 MB), `assets/landing-mockup.gif` (~30,34 MB), `assets/video-ugc.mp4` (~12,71 MB) e demais vídeos de 3–6 MB.
- Home desktop, primeira carga em Chrome headless a 1366 × 900: 35 recursos e aproximadamente **23,7 MB transferidos**.
- Altura inicial: 12.026 px em desktop e 23.137 px em 390 px de largura.
- Não houve erro de console, falha de rede ou asset 404 durante a navegação auditada.
- Não houve rolagem horizontal em 390 px.
- Screenshots iniciais: `docs/screenshots/before/`.

## Estado funcional inicial

- O servidor local respondeu `200` para a home, com 71.045 bytes de HTML.
- Header sticky existente; no mobile, os links eram ocultados e apenas o CTA permanecia, sem menu expansível.
- A seção do Cesar usava `assets/Cesar.png`, que carregava corretamente, mas mantinha no DOM o fallback indexável “Falta a foto assets/cesar.jpg”.
- A comunicação do vídeo 360° dizia “de uma foto”.
- Conteúdo virtual era rotulado como “prova social” e “depoimentos”.
- O Plano Mensal aparecia como “Mensalidade de Criativos”, com preço riscado, percentual de desconto e selo “Melhor custo-benefício”.

## Restrições preservadas

- Identidade visual branca, preta e roxa; Mulish e Space Grotesk.
- Foto e conteúdo da seção de Cesar C. Oliveira.
- Todos os vídeos e cases existentes.
- Preços existentes, incluindo Plano Mensal de R$730.
- Link público da Gota Nativa.
- Arquivos não rastreados preexistentes não serão removidos nem sobrescritos sem necessidade.
