
"use strict";
(function () {
  // Every interaction works without GSAP/Lenis; animations are progressive enhancement.
  document.querySelectorAll("[data-reveal]").forEach(function (root) {
    const input = root.querySelector('input[type="range"]');
    if (!input) return;
    const update = function () {
      root.style.setProperty("--reveal", String(input.value) + "%");
      input.setAttribute("aria-valuenow", String(input.value));
    };
    input.addEventListener("input", update, { passive: true });
    input.addEventListener("change", update);
    update();
  });

  document.querySelectorAll("[data-switcher]").forEach(function (root) {
    const target = root.querySelector("[data-switcher-image]");
    if (!target) return;
    const buttons = Array.from(root.querySelectorAll("[data-switch-image]"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const path = button.getAttribute("data-switch-image");
        if (!path || !/^\/assets\/[a-z0-9/_-]+\.(?:png|jpe?g|webp)$/i.test(path)) return;
        target.src = path;
        target.alt = button.getAttribute("data-image-alt") || "Variação de campanha";
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === button ? "true" : "false"); });
      });
    });
  });

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !window.gsap) return;

  try {
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    const hero = document.querySelector(".hero-atelier");
    if (hero) {
      const parts = [hero.querySelector(".eyebrow"), hero.querySelector("h1"), hero.querySelector(".hero-impact"), hero.querySelector(".hero-sub"), hero.querySelector(".hero-actions")].filter(Boolean);
      gsap.from(parts, { y: 28, opacity: 0, duration: 0.85, stagger: 0.11, ease: "power3.out", clearProps: "all" });
      const visual = hero.querySelector(".hero-before-after");
      if (visual) gsap.from(visual, { y: 42, opacity: 0, rotate: 6, duration: 1.2, delay: 0.22, ease: "power3.out", clearProps: "all" });
    }

    if (window.ScrollTrigger) {
      gsap.utils.toArray(".cx-project").forEach(function (el, index) {
        gsap.from(el, {
          y: 70, opacity: 0, duration: 1, delay: Math.min(index * 0.04, .12),
          ease: "power3.out", clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 90%", once: true }
        });
      });
      gsap.utils.toArray(".cx-room .room-section-header, .cx-room .room-proof-copy, .cx-room .room-copy").forEach(function (el) {
        gsap.from(el, { y: 38, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray(".cx-room .room-hero-image img, .cx-room .room-hero-image video").forEach(function (el) {
        gsap.from(el, { scale: 1.08, duration: 1.3, ease: "power2.out", clearProps: "all" });
      });
    }

    // Only enable smooth scrolling on devices with hover/fine pointer, respecting accessibility.
    if (window.Lenis && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const lenis = new window.Lenis({ anchors: true, duration: 1.05 });
      if (window.ScrollTrigger) {
        lenis.on("scroll", window.ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = function (time) { lenis.raf(time); window.requestAnimationFrame(raf); };
        window.requestAnimationFrame(raf);
      }
    }
  } catch (error) {
    // Do not hide content or block leads if animation libraries are unavailable.
    if (window.console && window.console.warn) console.warn("Showcase enhancement disabled:", error.message);
  }
})();
