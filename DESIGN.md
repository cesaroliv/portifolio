# Criando com IA — Design system (provisório para validação visual)

<!-- Impeccable 4.8.0 direction / 2026-10-29. O usuário ainda não aprovou esta nova direção. -->

## Conceito

**PALCO DE LUZ / Gallery of experiences.** O estúdio é o palco; cada trabalho ocupa uma cena real. A interface não empilha cartões de serviços: abre uma experiência, deixa o visitante testar e retorna à vitrine para contratar.

A sexta direção fundamentada da rodada Impeccable: **mesa de iluminação de teatro + cartaz editorial de espetáculo**, reinterpretada como dois cenários digitais reais. A escolha é exploratória, não contrato visual aprovado.

## Direções fundamentadas consideradas

1. Folha de provas de direção criativa — controle crítico, prova e comparação
2. Revista cultural/editorial — ritmo de abertura, narrativas e tipografia
3. Montagem de película — sequência, cortes e transições
4. Envelope de disco — identidade, música e movimento
5. Amostruário material de impressão — cores e composição tangíveis
6. **Palco de iluminação** — cenas, progressão espacial, luz, entrada e saída (escolhido nesta rodada)
7. Instalação de museu — artefatos como prova navegável

## Avaliação das linguagens alternativas sorteadas

- Mesa de edição/filme — **competitiva** na interação, incorpora scrub e cronologia funcional sem copiar película nem perfurações
- HyperCard — **descartada** pela estética incompatível com portfólio premium; preserva a disciplina de navegação sempre reversível
- Têxtil em transformação — **descartada** por não remeter aos serviços; preserva o gesto transformar/interagir
- Colagem em camadas — **competitiva** em movimento, preserva camadas e composição íntegra sem colagem literal
- Areia cinética — **descartada** por linguagem sensorial alheia à marca; preserva toque como controle direto
- Cutaway ilustrado/busytown — **descartado** por estética infantil incoerente; preserva visibilidade de processos dentro da experiência

## Sistema visual

- Fundo carvão profundo `#101013`, superfície osso `#F5F1E8`, acento laranja de sinalização `#FE5C35` e leitura pálida `#E8E3DB`. A cor acende uma ação ou transição, não cada palavra.
- Títulos com **Barlow Condensed** de proporção teatral; corpo **DM Sans**. Medidas compactas e sem cabeçalhos falsos. Microtexto não se confunde com labels em fontes minúsculas.
- Fotografias reais ou demonstrações executáveis. Sem fingir screenshots de clientes, logos ou resultados.
- A vitrine é uma porta para duas experiências: **Landing page de conceito autoral** e **Kinetic motion studio**.
- Não existem cartões de igual tamanho em grade, métricas de vaidade, badges decorativos, nem labels acima de todos os títulos.
- Navegação: entrada -> ver trabalho -> interagir -> entender serviço -> pedir proposta. Ambos os cases possuem retorno visível.

## Motion

- Um grande movimento de abertura e momentos de interação reais, não `fade-up` repetido em todas as seções.
- Scroll com ritmo, transições de cortina e transformação por estados; GSAP quando disponível, CSS/JS como fallback.
- `prefers-reduced-motion` mantém todas as informações e controles utilizáveis.

## Conteúdo e integridade

- Somente landing pages e motion na oferta principal.
- Exemplos explicitamente `conceito autoral / speculative work`. Nenhum número, cliente ou testemunho inventado.
- WhatsApp existente é canal de consulta; nenhuma compra ou pagamento automático.
- PT/EN para a vitrine e demo de linguagem internacional quando houver conteúdo suficiente.
- Respeitar CSS sem vazamentos globais, focos visíveis, leitura em 390px e 1440px, imagens otimizadas e respeito ao usuário.

## Critério de publicação

1. Capturas antes/depois em desktop e celular revisadas criticamente.
2. Detector Impeccable + verificações funcionais + contraste/sem overflow.
3. Dois demos acessíveis, navegáveis, sem links inertes.
4. Revisão humana da direção visual; antes dela, trabalho permanece como `conceito` e não como qualidade aprovada.
