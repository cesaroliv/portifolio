"use strict";

(function () {
  const data = window.SITE_DATA;
  if (!data) return;

  const allowedEvents = new Set([
    "whatsapp_click",
    "case_open",
    "casting_open",
    "casting_profile_click",
    "pricing_cta_click",
    "video_play",
    "video_complete",
    "video_cta_click",
    "before_after_interaction",
    "service_page_view",
    "faq_open",
  ]);

  const allowedUtmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function readUtms() {
    const current = {};
    const params = new URLSearchParams(window.location.search);
    allowedUtmKeys.forEach(function (key) {
      const value = params.get(key);
      if (value) current[key] = value.slice(0, 160);
    });

    try {
      if (Object.keys(current).length) {
        window.sessionStorage.setItem("criando_utm", JSON.stringify(current));
        return current;
      }
      const stored = window.sessionStorage.getItem("criando_utm");
      return stored ? JSON.parse(stored) : {};
    } catch (_error) {
      return current;
    }
  }

  const sessionUtms = readUtms();

  function cleanProperties(properties) {
    const clean = { page_path: window.location.pathname };
    Object.entries({ ...sessionUtms, ...properties }).forEach(function ([key, value]) {
      if (value === undefined || value === null || value === "") return;
      if (/^(message|phone|email|conversation|whatsapp_message)$/i.test(key)) return;
      clean[key] = typeof value === "string" ? value.slice(0, 180) : value;
    });
    return clean;
  }

  function trackEvent(name, properties) {
    if (!allowedEvents.has(name)) return;
    const payload = cleanProperties(properties || {});

    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...payload });
    }

    window.dispatchEvent(new CustomEvent("criando:event", { detail: { name, properties: payload } }));
  }

  window.CriandoAnalytics = Object.freeze({ trackEvent });

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-message-key]").forEach(function (link) {
    const key = link.dataset.messageKey;
    const message = data.whatsappMessages[key];
    if (!message) return;
    link.href = data.createWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
    link.addEventListener("click", function () {
      const properties = {
        location: link.dataset.location || "unknown",
        plan: link.dataset.plan,
        character_name: link.dataset.characterName,
        cta_text: link.textContent.trim(),
      };
      if (link.dataset.characterName) {
        trackEvent("casting_profile_click", properties);
      }
      trackEvent("whatsapp_click", properties);
    });
  });

  document.querySelectorAll("[data-event]").forEach(function (element) {
    element.addEventListener("click", function () {
      const eventName = element.dataset.event;
      trackEvent(eventName, {
        location: element.dataset.location,
        plan: element.dataset.plan,
        case_name: element.dataset.caseName,
        character_name: element.dataset.characterName,
        video_name: element.dataset.videoName,
        cta_text: element.textContent.trim(),
      });
    });
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const menuBackdrop = document.querySelector("[data-menu-backdrop]");
  let menuWasOpened = false;

  function menuFocusable() {
    return [menuToggle].concat(Array.from(menu ? menu.querySelectorAll("a[href]") : []));
  }

  function closeMenu(restoreFocus) {
    if (!menuToggle || !menu || menuToggle.getAttribute("aria-expanded") !== "true") return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
    document.querySelectorAll("main, footer").forEach(function (element) { element.removeAttribute("inert"); });
    if (restoreFocus) menuToggle.focus();
  }

  function openMenu() {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("menu-open");
    document.querySelectorAll("main, footer").forEach(function (element) { element.setAttribute("inert", ""); });
    menuWasOpened = true;
    const firstLink = menu.querySelector("a[href]");
    if (firstLink) firstLink.focus();
  }

  if (menuToggle && menu && menuBackdrop) {
    menuToggle.addEventListener("click", function () {
      if (menuToggle.getAttribute("aria-expanded") === "true") closeMenu(true);
      else openMenu();
    });
    menuBackdrop.addEventListener("click", function () { closeMenu(true); });
    menu.querySelectorAll("a[href]").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (menuToggle.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = menuFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820 && menuWasOpened) closeMenu(false);
    });
  }

  document.querySelectorAll("[data-faq-button]").forEach(function (button) {
    button.addEventListener("click", function () {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      if (!panel) return;
      const opening = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(opening));
      panel.hidden = !opening;
      if (opening) {
        trackEvent("faq_open", { location: "home_faq", cta_text: button.querySelector("span")?.textContent.trim() });
      }
    });
  });

  document.querySelectorAll("[data-compare]").forEach(function (compare) {
    const range = compare.querySelector("[data-compare-range]");
    if (!range) return;
    let tracked = false;
    function update() {
      compare.style.setProperty("--pos", `${range.value}%`);
      if (!tracked) {
        tracked = true;
        trackEvent("before_after_interaction", { location: "case_compare", service: document.body.dataset.pageName });
      }
    }
    range.addEventListener("input", update);
    range.addEventListener("change", update);
  });

  document.querySelectorAll("video[data-video-name]").forEach(function (video) {
    video.addEventListener("play", function () {
      if (video.dataset.playTracked === "true") return;
      video.dataset.playTracked = "true";
      trackEvent("video_play", { location: document.body.dataset.pageType, video_name: video.dataset.videoName });
    });
    video.addEventListener("ended", function () {
      if (video.dataset.completeTracked === "true") return;
      video.dataset.completeTracked = "true";
      trackEvent("video_complete", { location: document.body.dataset.pageType, video_name: video.dataset.videoName });
    });
  });

  const lazyVideos = document.querySelectorAll("[data-lazy-video]");
  if (lazyVideos.length) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadVideo = function (video) {
      video.querySelectorAll("source[data-src]").forEach(function (source) {
        source.src = source.dataset.src;
        source.removeAttribute("data-src");
      });
      video.load();
      video.removeAttribute("data-lazy-video");
      if (!reducedMotion && video.autoplay) video.play().catch(function () {});
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          loadVideo(entry.target);
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "300px 0px", threshold: 0.01 });
      lazyVideos.forEach(function (video) { observer.observe(video); });
    } else {
      lazyVideos.forEach(loadVideo);
    }
  }

  const filterButtons = document.querySelectorAll("[data-casting-filter]");
  const castingCards = document.querySelectorAll("[data-casting-card]");
  const filterStatus = document.querySelector("[data-filter-status]");

  function matchesFilter(card, filter) {
    if (filter === "Todos") return true;
    if (filter === "Feminino" || filter === "Masculino") return card.dataset.gender === filter.toLowerCase();
    const age = Number(card.dataset.age);
    if (filter === "22–34") return age >= 22 && age <= 34;
    if (filter === "35–49") return age >= 35 && age <= 49;
    if (filter === "50+") return age >= 50;
    return (card.dataset.niches || "").split("|").includes(filter);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.castingFilter;
      let visible = 0;
      filterButtons.forEach(function (item) {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      castingCards.forEach(function (card) {
        const show = matchesFilter(card, filter);
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (filterStatus) filterStatus.textContent = `${visible} ${visible === 1 ? "personagem encontrada" : "personagens encontrados"}.`;
    });
  });

  document.addEventListener("visibilitychange", function () {
    document.documentElement.classList.toggle("page-hidden", document.hidden);
  });

  if (document.body.dataset.pageType === "service") {
    trackEvent("service_page_view", { service: document.body.dataset.pageName, location: "direct" });
  }
  if (document.body.dataset.pageType === "casting") {
    trackEvent("casting_open", { location: "direct" });
  }
})();
