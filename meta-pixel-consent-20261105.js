/* Criando com IA — Meta Pixel com consentimento explícito | 2026-11-05 */
(function () {
  'use strict';
  var PIXEL_ID = '1174868448316419';
  var STORAGE_KEY = 'cia_meta_measurement_consent_v1';
  var lang = document.documentElement.lang === 'en' ? 'en' : 'pt';
  var enabled = false;
  var contactListenerAdded = false;
  var texts = lang === 'en' ? {
    title: 'Privacy preferences',
    details: 'May we use the Meta Pixel to measure visits and clicks to WhatsApp? Optional. No message content is collected.',
    allow: 'Allow measurement',
    reject: 'Decline',
    privacy: 'Privacy policy'
  } : {
    title: 'Sua privacidade',
    details: 'Podemos usar o Pixel da Meta para medir visitas e cliques no WhatsApp? É opcional. Não coletamos o conteúdo das mensagens.',
    allow: 'Permitir medição',
    reject: 'Recusar',
    privacy: 'Política de Privacidade'
  };

  function readChoice() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (error) { return null; }
  }

  function writeChoice(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (error) { /* Somente esta sessão */ }
  }

  function removeMetaCookies() {
    ['_fbp', '_fbc'].forEach(function (name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax';
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=criandocomia.com;SameSite=Lax';
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.criandocomia.com;SameSite=Lax';
    });
  }

  function onContactClick(event) {
    if (!enabled || !window.fbq) return;
    var anchor = event.target && event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    try {
      var url = new URL(anchor.href, document.baseURI);
      if ((url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com' || url.hostname === 'web.whatsapp.com') &&
        /^(https?):$/.test(url.protocol)) {
        window.fbq('trackCustom', 'WhatsAppClick', {channel: 'WhatsApp', source: 'CriandoComIA'});
      }
    } catch (error) { /* URL inválida: não registrar */ }
  }

  function enableMeasurement() {
    if (enabled) return;
    enabled = true;
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;
        n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
        t=b.createElement(e);t.async=!0;t.src=v;
        s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    if (!contactListenerAdded) {
      document.addEventListener('click', onContactClick, {capture: true});
      contactListenerAdded = true;
    }
  }

  function closeBanner() {
    var banner = document.getElementById('cia-privacy-prompt');
    if (banner) banner.remove();
  }

  function choose(value) {
    writeChoice(value);
    closeBanner();
    if (value === 'granted') {
      enableMeasurement();
    } else {
      if (window.fbq) window.fbq('consent', 'revoke');
      removeMetaCookies();
      if (enabled) {
        enabled = false;
        window.location.reload(); // Descarrega a biblioteca já ativada
      }
    }
  }

  function showChoices() {
    closeBanner();
    var banner = document.createElement('aside');
    banner.id = 'cia-privacy-prompt';
    banner.className = 'cia-privacy-prompt';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', texts.title);
    var head = document.createElement('strong');
    head.className = 'cia-privacy-title';
    head.textContent = texts.title;
    var description = document.createElement('p');
    description.textContent = texts.details;
    var link = document.createElement('a');
    link.href = '/politica-de-privacidade/';
    link.textContent = texts.privacy;
    link.className = 'cia-privacy-policy';
    var actions = document.createElement('div');
    actions.className = 'cia-privacy-actions';
    var reject = document.createElement('button');
    reject.type = 'button';
    reject.textContent = texts.reject;
    reject.className = 'cia-privacy-reject';
    reject.addEventListener('click', function(){ choose('denied'); });
    var grant = document.createElement('button');
    grant.type = 'button';
    grant.textContent = texts.allow;
    grant.className = 'cia-privacy-accept';
    grant.addEventListener('click', function(){ choose('granted'); });
    actions.appendChild(reject);
    actions.appendChild(grant);
    banner.appendChild(head);
    banner.appendChild(description);
    banner.appendChild(link);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  document.addEventListener('click', function(event) {
    var action = event.target && event.target.closest && event.target.closest('[data-cia-privacy-settings]');
    if (!action) return;
    event.preventDefault();
    showChoices();
  });

  window.CIAPixelConsent = Object.freeze({
    preferences: showChoices,
    isEnabled: function(){ return enabled; },
    pixelId: PIXEL_ID
  });

  if (readChoice() === 'granted') enableMeasurement();
  else if (readChoice() !== 'denied') showChoices();
})();