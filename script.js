/* =========================================================================
   ⚙️  EDITE AQUI OS SEUS CONTATOS  ⚙️
   -------------------------------------------------------------------------
   Esta é a ÚNICA parte que você precisa mexer. Troque os valores entre aspas.
   Depois de salvar este arquivo, é só atualizar a página no navegador (F5).
   ========================================================================= */
const CONTATO = {
  // WhatsApp: só números, com código do país (55) + DDD + número.
  // Exemplo: (11) 91234-5678  ->  "5511912345678"
  whatsapp: "5511999999999",

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
  const compare = document.getElementById("compare");
  const before = document.getElementById("compareBefore");
  const handle = document.getElementById("compareHandle");
  if (!compare || !before || !handle) return;

  let dragging = false;

  function setPos(clientX) {
    const rect = compare.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    before.style.width = pct + "%";
    handle.style.left = pct + "%";
    handle.setAttribute("aria-valuenow", Math.round(pct));
  }

  function startDrag(x) { dragging = true; compare.classList.add("dragging"); setPos(x); }
  function moveDrag(x) { if (dragging) setPos(x); }
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
    next = Math.max(0, Math.min(100, next));
    before.style.width = next + "%";
    handle.style.left = next + "%";
    handle.setAttribute("aria-valuenow", Math.round(next));
  });
})();
