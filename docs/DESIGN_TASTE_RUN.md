# Criando com IA — Taste Skill / Direção e registro de execução

**Status:** estudos comerciais em avaliação, não aprovados para substituir a homepage.
**Instalação:** projeto `H:\portifolio`, `design-taste-frontend` via `skills@1.7.4` e repositório `Leonxlnx/taste-skill`. Registro em `skills-lock.json`. O Impeccable permanece como segunda revisão.

## Problema que a revisão corrige

O proprietário rejeitou os exemplos abstratos MORPH e KINETIC como prova de serviços premium. A vitrine deve mostrar **landing page comercial navegável** e **motion publicitário real**, não efeitos artísticos dissociados de uma marca/produto.

## Inventário do assunto (dados da Gota Nativa)

1. O nome Gota Nativa dá centralidade à **gota** e ao gesto de aplicar óleo.
2. Acervo existente do projeto: fotografias com frasco original e contexto de autocuidado.
3. Frasco do óleo Rosa Mosqueta fotografado com indicação visual de **30 ml** no rótulo.
4. O frasco fotografado possui rótulo **DNA da Amazônia**, não é inventado como fabricação da Gota Nativa.
5. Acervo mostra mãos, pele, superfície de pedra, sabonete, flores e ambiente doméstico.
6. A marca comercial Gota Nativa possui identidade em oliva, creme e ouro; tipografia Cormorant Garamond + Mulish.
7. A narrativa anterior do projeto já tratava de ritual noturno.
8. O catálogo existente contempla outros óleos; este estudo usa **somente Rosa Mosqueta**.
9. Documentos internos alertam para não inventar registro, composição, resultados médicos, preço, depoimento ou garantia sem validação.
10. A demanda atual é portfólio de serviços **Criando com IA**; nenhum checkout do varejo é alterado nem representado como verificado.

## Argumentos e provas que aparecem no site

- **O produto tem uma história visual:** frasco e mãos reais do acervo, sem screenshot com texto embutido.
- **A landing page é navegável:** editorial, responsiva, com galeria e um ritual de três gestos controlável por rolagem/teclado.
- **O estúdio executa motion:** arquivo de vídeo MP4 9:16 renderizado de um storyboard original usando material do próprio acervo.
- **Podemos atender uma marca:** contato direto para solicitar orçamento, sem tabelas fictícias ou propostas de performance.
- **É um estudo autoral:** não são clientes atendidos, vendas atribuídas, resultados ou depoimentos.

## Sorteio REAL via Taste Skill

Script executado: `.agents/skills/design-taste-frontend/scripts/draw.mjs`.

`--sector physical-product --sections intro,showcase,how-it-works,contact --tone editorial --have photography,product-photo --keep palette,type --options 3`

Direções retornadas:
- `sentence-as-layout` — manchete como estrutura
- `uneven-photographs` — fotografias com tamanhos distintos
- `name-as-monument` — nome monumental

Escolhida: **`uneven-photographs`**. Justificativa: o projeto já possui fotografias próprias de frasco, gesto e ambiente; a composição assimétrica tem relação com esse acervo, ao contrário da estética abstrata. A folha completa foi gerada com `--direction uneven-photographs` e persistida em `.taste-skill/direction.json`.

Ideia específica: *O gesto de aplicar algumas gotas, fotografado no acervo, vira uma sequência editorial que pode ser percorrida*. Diferencial: a materialidade do frasco rotulado, as fotos de mãos e o ritual já documentado, não promessas genéricas de skincare.

Mudanças conscientes na folha:
- `how-it-works` com 3 gestos, em vez de 6–9 cenas inventadas, pois só há três etapas documentadas.
- Mesmo projeto de marca conserva **sua paleta e tipografia** por `--keep palette,type`.
- Galeria tem 4 imagens do acervo e enquadramentos distintos; não adicionamos imagens aleatórias de outras empresas.
- Sem preços ou links de compra: estudo de agência, não catálogo de varejo.

## Arquivos criados

- `atelier/taste/index.html` — hub de portfólio focado em dois trabalhos.
- `atelier/taste/rosa-mosqueta/index.html` — landing page original com fotos reais, experiência editorial e ritual navegável.
- `atelier/taste/motion/index.html` — apresentação comercial de motion.
- `atelier/taste/motion/rosa-mosqueta-motion.mp4` — vídeo vertical original sem áudio, renderizado a partir do storyboard.
- `atelier/taste/motion/reel-canvas.html` — fonte original do storyboard renderizável.
- `atelier/taste/taste.css`, `atelier/taste/taste.js`.
- `scripts/render-taste-motion.cjs`, `scripts/qa-taste.cjs`.

Fotos copiadas de `H:\Projeto Gota Nativa\gota-nativa\gota-nativa\assets\img`, no subdiretório `atelier/taste/assets` do portfólio, com o rótulo original preservado. Uso comercial definitivo de imagens de pessoas e direitos/licenças do acervo ainda requer conferência antes de oferecer peças como licenciamento de banco de imagens.

## Critério de aprovação (Taste + Impeccable)

- Capturas desktop 1440, tablet 768, mobile 390; inspecionar visualmente e testar largura de conteúdo.
- `node .agents/skills/design-taste-frontend/scripts/inspect.mjs https://cesaroliv.github.io/atelier/taste/` depois da publicação.
- `npx impeccable detect atelier/taste` como revisão secundária.
- Teclado, slider, overflow, imagens quebradas, MP4 e botão WhatsApp devem ser testados.
- Não substituir `/` nem iniciar prospecção enquanto o proprietário não avaliar essa direção artística.
- Não gastar com anúncios, geração por API ou assinaturas.

## Propriedade e segurança

Versão pública é um **preview `noindex`**, separada de Gota Nativa e da homepage do estúdio. Não altera loja ativa, checkout, pixel Meta ou arquivos existentes não relacionados. Nenhuma venda atribuída a esses conceitos.
