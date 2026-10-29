# Criando com IA — Impeccable + Qualidade Visual

## Escopo operacional

A integração do Impeccable é **local ao repositório** `H:\\portifolio`, não uma instalação global do Lumen. O instalador criou as skills de agente em `.agents/`, `.codex/` e `.hermes/`. O hook de detecção reportou `enabled`.

Versão instalada e verificada em 29/10/2026: npm `impeccable@4.8.0`, engine `0.1.18` para Windows.

## Reproduzir o ambiente

```powershell
cd H:\portifolio
npm run design:install
npm run design:detect
node scripts/qa-atelier.cjs
```

O script `design:install` restringe instalação ao projeto, usa provedores Codex/Hermes e não altera globalmente as ferramentas. Se o instalador mudar comandos, consultar o README oficial de `pbakaus/impeccable` antes de executar.

## Contexto obrigatório

- `PRODUCT.md`: o que é verdadeiro sobre serviços, público, canais e restrições.
- `DESIGN.md`: experimento de direção criativa, ainda sujeito à avaliação do proprietário.
- `atelier/index.html`: nova vitrine em avaliação.
- `atelier/landing/index.html`: MORPH — experiência autoral de landing page.
- `atelier/motion/index.html`: KINETIC — motion autoral e interativo.
- `atelier/atelier.css` e `atelier/atelier.js`: estilo, estados, acessibilidade e movimento.

## Gate antes de publicar/mercado

1. Conectar o agente ao contexto via `.agents/skills/impeccable/scripts/impeccable.cmd context --target atelier/index.html` em sessão nova. Não apenas citar os comandos.
2. Criticar a proposta com `critique`, usar `bolder`, `distill`, `polish` conforme diagnóstico; não adicionar efeitos sem função.
3. Detector de padrões anti-IA e contraste: `npm run design:detect`. Exceções precisam ser explicadas, nunca ignoradas silenciosamente.
4. Testar 1440x900 e 390x844; conferir capturas e erros de JavaScript. `node scripts/qa-atelier.cjs`.
5. Confirmar teclado, controles de cenas, timeline, idioma, WhatsApp, `prefers-reduced-motion`, responsividade, 404 e dados estruturados.
6. O dono aprova a qualidade visual antes do novo portfólio substituir a página principal.
7. Depois da aprovação, iniciar pesquisa de canais e propostas comerciais. **Nenhum anúncio pago** sem economia validada.

## Estado de revisão inicial

- Detector anterior sobre a antiga home encontrou contrastes baixos.
- Detector inicial do novo `atelier/`: 44 findings, muitos de brilho, legibilidade e padding.
- Após uma rodada de refinamento: 16 findings; alguns avisos de composição full-bleed são intencionais.
- 6 verificações de navegador concluídas sem erro no protótipo local após correção de overflow mobile.
- Não há demonstração de receita, aprovação estética final ou clientes reais atribuídos aos dois conceitos.

## Segurança e preservação

- Não publicar `.agents/`, binários da engine, artefatos do hook, relatórios brutos de execução, credenciais, nem outros arquivos do notebook.
- Não alterar a campanha Meta, catálogos ou outros projetos.
- Protótipos autorais são rotulados como conceitos. Não criar prova social fictícia.
- Não copiar o código ou design do Impeccable como identidade do cliente; usá-lo como método de crítica e refinamento.
