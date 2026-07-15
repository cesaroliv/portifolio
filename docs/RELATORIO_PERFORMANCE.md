# Relatório de performance — Criando com IA

**Data:** 15/07/2026  
**Ambiente:** Chrome headless, servidor local `py -m http.server 8000`

## Comparação da home

| Medida | Antes | Depois | Variação |
|---|---:|---:|---:|
| Transferência inicial desktop | 23.728 KB | 424 KB | -98,2% |
| Recursos na primeira carga desktop | 35 | 11 | -68,6% |
| Altura da home desktop (1366 px) | 12.026 px | 11.131 px | -7,4% |
| Altura da home mobile (390 px) | 23.137 px | 16.120 px | -30,3% |
| Rolagem horizontal | não encontrada | não encontrada | estável |
| Erros de console/rede | 0 | 0 | estável |

A transferência mobile inicial não foi usada na comparação porque a primeira linha de base mobile reutilizou o cache da captura desktop. A comparação de bytes usa duas cargas desktop frias e reproduzíveis.

## Lighthouse final

Comando executado:

```text
npx --yes lighthouse@12.8.2 http://127.0.0.1:8000/ --only-categories=performance,accessibility,seo,best-practices --output=json --output-path=docs/lighthouse-final-3.json
```

Resultados:

- Performance: **89**;
- Acessibilidade: **100**;
- Boas Práticas: **100**;
- SEO: **100**;
- First Contentful Paint: 2.832 ms;
- Largest Contentful Paint: 3.132 ms;
- Total Blocking Time: 0 ms;
- Cumulative Layout Shift: 0,025;
- peso total medido pelo Lighthouse: 344 KB.

O processo do Lighthouse retornou erro `EPERM` ao tentar remover sua pasta temporária no Windows depois da auditoria. O relatório JSON foi concluído e validado antes desse erro de limpeza.

## Otimizações implementadas

- Home reduzida para seis pessoas do casting; as outras 14 ficaram somente na rota `/casting/`.
- Conteúdo completo dos cases removido do DOM da home e distribuído em páginas próprias.
- 50 imagens publicadas receberam WebP; variantes responsivas foram geradas em 480, 800 e até 1200 px.
- `width`, `height`, `sizes`, lazy loading e `decoding="async"` foram aplicados nas imagens.
- Imagens da primeira dobra usam carregamento eager e prioridade alta; as demais usam lazy loading.
- `assets/landing-mockup.gif` e `assets/biotina/landing.gif`, com mais de 61 MB juntos, foram substituídos na página por MP4 de 549 KB e 608,5 KB. Os GIFs originais permanecem preservados.
- Vídeos fora da primeira dobra usam `preload="none"`, poster e carregamento completo somente após interação ou proximidade da viewport.
- Posters pesados em PNG foram substituídos por WebP.
- CSS de edição permanece em `styles.css`; o build gera `styles.min.css` para publicação.
- Google Fonts é carregado sem bloquear a primeira pintura e mantém `display=swap`.
- Animações param com `prefers-reduced-motion`; o marquee também pausa quando a aba fica invisível.

## Limites do ambiente local

O servidor Python não configura cache de longa duração nem compressão Brotli/Gzip. Por isso o Lighthouse ainda registra oportunidades de cache e compressão. O hosting atual não foi alterado, conforme o escopo, e esses headers devem ser conferidos no domínio publicado após o deploy.

## Evidências

- Linha de base: `docs/AUDITORIA_TECNICA_CRIANDO_COM_IA.md`.
- Lighthouse intermediário: `docs/lighthouse-final.json` e `docs/lighthouse-final-2.json`.
- Lighthouse final: `docs/lighthouse-final-3.json`.
- Screenshots: `docs/screenshots/before/` e `docs/screenshots/after/`.
