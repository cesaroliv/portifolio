# Relatório visual — Criando com IA

**Data:** 15/07/2026  
**Viewports principais:** 1366 × 900 e 390 × 844

## Estado inicial

O estado anterior foi capturado antes das alterações em `docs/screenshots/before/`:

- hero: `desktop-hero.png`, `mobile-hero.png`;
- serviços: `desktop-servicos.png`, `mobile-servicos.png`;
- cases: `desktop-cases.png`, `mobile-cases.png`;
- preços: `desktop-precos.png`, `mobile-precos.png`;
- casting na home: `desktop-casting.png`, `mobile-casting.png`;
- quem está por trás: `desktop-quem-esta-por-tras.png`, `mobile-quem-esta-por-tras.png`;
- CTA final: `desktop-cta-final.png`, `mobile-cta-final.png`.

Não havia seção de FAQ, página de casting nem página indexável de case no estado inicial; portanto, não existe captura anterior equivalente para essas três áreas.

## Estado final

As capturas finais estão em `docs/screenshots/after/`:

- hero: `desktop-hero.png`, `mobile-hero.png`;
- serviços: `desktop-servicos.png`, `mobile-servicos.png`;
- cases: `desktop-cases.png`, `mobile-cases.png`;
- preços: `desktop-precos.png`, `mobile-precos.png`;
- prévia do casting: `desktop-casting.png`, `mobile-casting.png`;
- quem está por trás: `desktop-quem-esta-por-tras.png`, `mobile-quem-esta-por-tras.png`;
- FAQ: `desktop-faq.png`, `mobile-faq.png`;
- CTA final: `desktop-cta-final.png`, `mobile-cta-final.png`;
- página de casting: `desktop-pagina-casting.png`, `mobile-pagina-casting.png`;
- case Rosa Mosqueta: `desktop-case-rosa-mosqueta.png`, `mobile-case-rosa-mosqueta.png`;
- case completo: `desktop-case-rosa-mosqueta-full.png`, `mobile-case-rosa-mosqueta-full.png`.

## Alterações observadas

- A paleta branca, preta e roxa, as tipografias Mulish/Space Grotesk, os cantos arredondados e o estilo editorial foram preservados.
- O H1 passou a descrever diretamente os dois serviços principais, mantendo a frase “A foto que vende. O rosto que convence.” em destaque.
- Cases agora aparecem antes de preços e casting, com Rosa Mosqueta e Biotina priorizados e Gota Nativa identificada como projeto autoral.
- A home ficou menor porque exibe apenas seis personagens; o casting completo foi deslocado para uma página filtrável.
- O Plano Mensal ganhou hierarquia entre produção e benefícios operacionais, sem percentual ou comparação artificial.
- A foto e o texto de Cesar C. Oliveira foram preservados; o fallback indexável foi removido.
- FAQ e CTA final foram adicionados antes do rodapé reorganizado.
- Menu mobile, filtros, cards e CTAs permanecem dentro da largura útil em todos os viewports validados.

## Validação de responsividade

Foram verificados 360 × 800, 390 × 844, 768 × 1024, 1024 × 768, 1366 × 768, 1440 × 900 e 1920 × 1080. Em todos:

- `scrollWidth` foi igual a `clientWidth`;
- não houve imagem quebrada;
- não houve erro de console ou rede;
- menu e conteúdo permaneceram acessíveis;
- textos, cards e vídeos não ultrapassaram a largura.

O case completo foi recapturado com viewport da altura total após carregar todas as imagens lazy, evitando artefatos pretos do modo de captura longa do Chrome headless.
