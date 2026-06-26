/* =========================================================================
   ⚙️  EDITE AQUI OS SEUS CONTATOS  ⚙️
   -------------------------------------------------------------------------
   Esta é a ÚNICA parte que você precisa mexer. Troque os valores entre aspas.
   Depois de salvar este arquivo, é só atualizar a página no navegador (F5).
   ========================================================================= */
const CONTATO = {
  // WhatsApp: só números, com código do país (55) + DDD + número.
  // Exemplo: (11) 91234-5678  ->  "5511912345678"
  whatsapp: "5511978230487",

  // Mensagem que já vem escrita quando o cliente abre seu WhatsApp:
  whatsappMensagem: "Olá! Vi seu portfólio e quero meu diagnóstico grátis.",

  // Instagram: só o seu @ (sem o arroba e sem link).
  // Exemplo: instagram.com/seuestudio  ->  "seuestudio"
  instagram: "seuestudio",
};
/* ===== Daqui pra baixo não precisa mexer em nada. ======================== */


// Monta os links a partir do que você preencheu acima
const linkWhatsApp = "https://wa.me/" + CONTATO.whatsapp +
  "?text=" + encodeURIComponent(CONTATO.whatsappMensagem);
const linkInstagram = "https://instagram.com/" + CONTATO.instagram;

// Aplica os links em todos os botões marcados com data-cta="whatsapp" / "instagram"
document.querySelectorAll('[data-cta="whatsapp"]').forEach(function (el) {
  // Se for um botão dentro de uma seção (âncora #contato), mantém a rolagem;
  // os botões finais (com href="#") recebem o link direto do WhatsApp.
  if (el.getAttribute("href") === "#" || el.classList.contains("btn-wpp")) {
    el.setAttribute("href", linkWhatsApp);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  }
});
document.querySelectorAll('[data-cta="instagram"]').forEach(function (el) {
  el.setAttribute("href", linkInstagram);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

// Ano automático no rodapé
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();


/* =========================================================================
   Comparador ANTES → DEPOIS (arrastar para revelar)
   ========================================================================= */
(function () {
  // Funciona para QUALQUER comparador .compare na página (rosa, biotina, etc.)
  document.querySelectorAll(".compare").forEach(function (compare) {
    const handle = compare.querySelector(".compare-handle");
    if (!handle) return;

    let dragging = false;

    function apply(pct) {
      pct = Math.max(0, Math.min(100, pct));
      compare.style.setProperty("--pos", pct + "%"); // controla clip-path + alça
      handle.setAttribute("aria-valuenow", Math.round(pct));
    }
    function setFromX(clientX) {
      const rect = compare.getBoundingClientRect();
      apply(((clientX - rect.left) / rect.width) * 100);
    }
    function startDrag(x) { dragging = true; compare.classList.add("dragging"); setFromX(x); }
    function moveDrag(x) { if (dragging) setFromX(x); }
    function endDrag() { dragging = false; compare.classList.remove("dragging"); }

    // Mouse
    compare.addEventListener("mousedown", (e) => { e.preventDefault(); startDrag(e.clientX); });
    window.addEventListener("mousemove", (e) => moveDrag(e.clientX));
    window.addEventListener("mouseup", endDrag);

    // Toque (celular)
    compare.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX), { passive: true });
    compare.addEventListener("touchmove", (e) => moveDrag(e.touches[0].clientX), { passive: true });
    compare.addEventListener("touchend", endDrag);

    // Teclado (acessibilidade): setas movem a alça
    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
      let next = current;
      if (e.key === "ArrowLeft") next = current - 4;
      else if (e.key === "ArrowRight") next = current + 4;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = 100;
      else return;
      e.preventDefault();
      apply(next);
    });

    apply(50); // posição inicial (meio)
  });
})();


/* =========================================================================
   Overlay de Cases — abre o case em tela cheia (X, ESC, clique fora)
   ========================================================================= */
(function () {
  const overlay = document.getElementById("caseOverlay");
  const scroll = document.getElementById("caseOverlayScroll");
  const panel = document.getElementById("caseOverlayPanel");
  const sources = document.querySelector(".case-sources");
  if (!overlay || !scroll || !panel || !sources) return;

  let activeContent = null; // bloco de conteúdo atualmente exibido
  let lastTrigger = null;   // card/botão que abriu (pra devolver o foco ao fechar)

  function openById(id, trigger) {
    const content = document.getElementById(id);
    if (!content) return;
    activeContent = content;
    lastTrigger = trigger || null;
    scroll.appendChild(content);                  // move o conteúdo pro overlay
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");  // trava o scroll do fundo
    scroll.scrollTop = 0;
    panel.focus();                                // foco vai pro overlay
  }

  function closeCase() {
    if (!overlay.classList.contains("is-open")) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
    if (activeContent) { sources.appendChild(activeContent); activeContent = null; } // devolve à origem
    if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus(); // volta o foco ao card
    lastTrigger = null;
  }

  // Resolve o id do bloco-alvo a partir do data-attribute:
  //  - data-open-case="rosa"      -> #case-rosa     (overlay do projeto inteiro)
  //  - data-open-gallery="fotos"  -> #gallery-fotos (overlay de um serviço, por projeto)
  function targetId(el) {
    if (el.hasAttribute("data-open-case")) return "case-" + el.getAttribute("data-open-case");
    if (el.hasAttribute("data-open-gallery")) return "gallery-" + el.getAttribute("data-open-gallery");
    return null;
  }

  document.querySelectorAll("[data-open-case], [data-open-gallery]").forEach(function (el) {
    el.addEventListener("click", function () { const id = targetId(el); if (id) openById(id, el); });
    // cards usam role="button": ativar com Enter/Espaço
    el.addEventListener("keydown", function (e) {
      if (el.getAttribute("role") === "button" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        const id = targetId(el); if (id) openById(id, el);
      }
    });
  });

  // Fechar: botão X, fundo (backdrop) — tudo que tem data-close-case
  overlay.querySelectorAll("[data-close-case]").forEach(function (el) {
    el.addEventListener("click", closeCase);
  });
  // Fechar com ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCase();
  });
})();
