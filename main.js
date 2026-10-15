/* ==========================================================================
   Wallace Bar · interactions & motion · V3
   GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.13
   ========================================================================== */
(function () {
  'use strict';

  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var motion = hasGSAP && !reduced;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  var lenis = null;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Recalcul des déclencheurs après tout changement de mise en page (debounce)
  var refreshTimer = null;
  function requestRefresh() {
    if (!hasGSAP) return;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 180);
  }

  /* ------------------------------------------------------------------------
     1. Horaires : source unique (PROVISOIRES, à confirmer par le client)
        Fermeture en minutes depuis minuit du jour d'ouverture (00h30 = 1470).
        Le JSON-LD du <head> reprend ces mêmes valeurs.
     ------------------------------------------------------------------------ */
  var HOURS = [
    { day: 1, short: 'Lun', open: 660, close: 1470 },
    { day: 2, short: 'Mar', open: 660, close: 1470 },
    { day: 3, short: 'Mer', open: 660, close: 1470 },
    { day: 4, short: 'Jeu', open: 660, close: 1470 },
    { day: 5, short: 'Ven', open: 660, close: 1590 },
    { day: 6, short: 'Sam', open: 660, close: 1590 },
    { day: 0, short: 'Dim', open: 660, close: 1470 }
  ];
  // Animations du soir (horaires à confirmer par le client)
  var TONIGHT = {
    1: 'Ce soir · Quiz à 20h30',
    2: 'Ce soir · after-work au comptoir',
    3: 'Ce soir · after-work au comptoir',
    4: 'Ce soir · after-work au comptoir',
    5: 'Ce soir · Live dès 21h',
    6: 'Ce soir · ouvert jusqu’à 2h30',
    0: 'Ce soir · l’étage au calme'
  };
  var byDay = {};
  HOURS.forEach(function (h) { byDay[h.day] = h; });
  var DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function parisNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      return { day: DAY_INDEX[o.weekday], minutes: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10), d: parseInt(o.day, 10), m: parseInt(o.month, 10) };
    } catch (e) {
      var n = new Date();
      return { day: n.getDay(), minutes: n.getHours() * 60 + n.getMinutes(), d: n.getDate(), m: n.getMonth() + 1 };
    }
  }

  function fmt(mins) {
    var m = mins % 1440;
    var h = Math.floor(m / 60);
    var mm = m % 60;
    return (h < 10 ? '0' : '') + h + 'h' + (mm ? (mm < 10 ? '0' : '') + mm : '');
  }

  function computeStatus() {
    var now = parisNow();
    var prev = (now.day + 6) % 7;
    var t = now.minutes;
    if (t < byDay[prev].close - 1440) return { open: true, serviceDay: prev, closeAt: byDay[prev].close, now: now };
    if (t >= byDay[now.day].open && t < byDay[now.day].close) return { open: true, serviceDay: now.day, closeAt: byDay[now.day].close, now: now };
    return { open: false, serviceDay: now.day, closeAt: byDay[now.day].close, now: now };
  }

  // Horaires groupés : jours consécutifs aux horaires identiques ("Lun → Jeu")
  function renderHours() {
    var list = $('#hours');
    if (!list) return;
    var groups = [];
    HOURS.forEach(function (h) {
      var g = groups[groups.length - 1];
      if (g && g.open === h.open && g.close === h.close) g.days.push(h);
      else groups.push({ open: h.open, close: h.close, days: [h] });
    });
    list.innerHTML = '';
    groups.forEach(function (g) {
      var li = document.createElement('li');
      li.className = 'rl';
      li.setAttribute('data-days', g.days.map(function (d) { return d.day; }).join(','));
      var label = g.days.length > 1 ? g.days[0].short + ' → ' + g.days[g.days.length - 1].short : g.days[0].short;
      li.innerHTML = '<span>' + label + '</span><span>' + fmt(g.open) + ' · ' + fmt(g.close) + '</span>';
      list.appendChild(li);
    });
  }
  renderHours();

  function renderStatus() {
    var s = computeStatus();
    var long = s.open ? 'Ouvert · jusqu’à ' + fmt(s.closeAt) : 'Fermé · ouvre à ' + fmt(byDay[s.now.day].open);
    var short = s.open ? 'Ouvert · ' + fmt(s.closeAt) : 'Fermé · ' + fmt(byDay[s.now.day].open);
    $$('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', s.open);
      el.classList.toggle('is-closed', !s.open);
      var label = $('.status__label', el);
      if (label) label.textContent = el.hasAttribute('data-short') ? short : long;
    });
    $$('#hours li').forEach(function (li) {
      var days = li.getAttribute('data-days').split(',').map(Number);
      li.classList.toggle('is-today', days.indexOf(s.serviceDay) !== -1);
    });
    var tonight = $('#tonight');
    if (tonight) tonight.textContent = TONIGHT[s.open ? s.serviceDay : s.now.day] || '';
    return s;
  }
  var status = renderStatus();
  setInterval(renderStatus, 60 * 1000);

  /* ------------------------------------------------------------------------
     2. Festivals : événement en cours ou prochain (?date=AAAA-MM-JJ pour prévisualiser)
     ------------------------------------------------------------------------ */
  (function festivalState() {
    var md = { m: status.now.m, d: status.now.d, dow: status.now.day };
    try {
      var q = new URLSearchParams(window.location.search).get('date');
      if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) {
        var p = q.split('-').map(Number);
        md = { m: p[1], d: p[2], dow: new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay() };
      }
    } catch (e) { /* ignore */ }
    var doy = function (m, d) { return (m - 1) * 31 + d; };
    var today = doy(md.m, md.d);
    // Dates indicatives, à vérifier chaque année
    var EVENTS = [
      { key: 'lumieres', name: 'Fête des Lumières', start: doy(12, 5), end: doy(12, 8) },
      { key: 'musique', name: 'Fête de la musique', start: doy(6, 21), end: doy(6, 21) },
      { key: 'fourviere', name: 'Nuits de Fourvière', start: doy(6, 1), end: doy(7, 31) }
    ];
    var current = EVENTS.filter(function (ev) { return today >= ev.start && today <= ev.end; });
    var featured = current[0];
    if (!featured) {
      var best = null;
      EVENTS.forEach(function (ev) {
        var delta = ev.start - today;
        if (delta < 0) delta += 12 * 31;
        if (!best || delta < best.delta) best = { ev: ev, delta: delta };
      });
      featured = best.ev;
    }
    current.forEach(function (ev) {
      var item = $('.fest__item[data-event="' + ev.key + '"]');
      if (!item) return;
      item.classList.add('is-now');
      var when = $('.fest__when', item);
      if (when && !$('.fest__now', when)) {
        var pill = document.createElement('span');
        pill.className = 'fest__now';
        pill.textContent = 'En ce moment';
        when.appendChild(pill);
      }
    });
    $$('.fest__item').forEach(function (it) { it.classList.toggle('is-feature', it.getAttribute('data-event') === featured.key); });
    // Sur mobile, l'événement mis en avant passe en premier dans la rangée glissable
    var list = $('#festList');
    var feat = $('.fest__item.is-feature');
    if (list && feat) {
      list.style.overflowAnchor = 'none';
      list.insertBefore(feat, list.firstChild);
      list.scrollLeft = 0;
      requestAnimationFrame(function () { list.scrollLeft = 0; });
    }
    var eyebrow = $('#heroEyebrow');
    if (current[0] && eyebrow) eyebrow.textContent = current[0].name + ' · on vous attend jusqu’à ' + fmt(byDay[md.dow].close);
  })();

  // Compteur "1 / 3" de la rangée festivals (mobile)
  (function festCounter() {
    var list = $('#festList');
    var out = $('#festIndex');
    if (!list || !out) return;
    list.addEventListener('scroll', function () {
      var items = $$('.fest__item', list);
      var x = list.scrollLeft;
      var idx = 0;
      items.forEach(function (it, i) { if (it.offsetLeft - list.offsetLeft - 24 <= x) idx = i; });
      if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 4) idx = items.length - 1;
      out.textContent = String(idx + 1);
    }, { passive: true });
  })();

  /* ------------------------------------------------------------------------
     3. Découpes de texte
     ------------------------------------------------------------------------ */
  function splitChars(el) {
    var text = el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    Array.prototype.forEach.call(text, function (ch) {
      var s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      frag.appendChild(s);
    });
    el.appendChild(frag);
    return $$('.char', el);
  }

  function splitWordsMasked(el) {
    var inners = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var mask = document.createElement('span');
            mask.className = 'w-mask';
            var inner = document.createElement('span');
            inner.className = 'w-inner';
            inner.textContent = p;
            mask.appendChild(inner);
            frag.appendChild(mask);
            inners.push(inner);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && !child.classList.contains('h2__rule')) {
          walk(child);
        }
      });
    })(el);
    return inners;
  }

  function splitWordsPlain(el) {
    var words = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (child) {
      if (child.nodeType !== 3) { if (child.classList && child.classList.contains('pill-img')) words.push(child); return; }
      var parts = child.textContent.split(/(\s+)/);
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
        var s = document.createElement('span');
        s.className = 'w';
        s.textContent = p;
        frag.appendChild(s);
        words.push(s);
      });
      el.replaceChild(frag, child);
    });
    return words;
  }

  /* ------------------------------------------------------------------------
     4. WALLACE ajusté à la largeur exacte du contenu
     ------------------------------------------------------------------------ */
  var heroEl = $('.hero');
  var heroTitle = $('.hero__title');
  var heroWord = $('.hero__word');
  function fitHero() {
    if (!heroTitle || !heroWord) return;
    heroTitle.style.fontSize = '';
    var fs = parseFloat(getComputedStyle(heroTitle).fontSize);
    var avail = heroTitle.clientWidth;
    var cur = heroWord.getBoundingClientRect().width;
    if (cur > 0 && avail > 0) heroTitle.style.fontSize = Math.min(fs * (avail / cur) * 0.995, window.innerHeight * 0.42) + 'px';
  }
  fitHero();
  var fitRaf;
  window.addEventListener('resize', function () { cancelAnimationFrame(fitRaf); fitRaf = requestAnimationFrame(fitHero); });

  /* ------------------------------------------------------------------------
     5. S1 · La lanterne : disque masqué déplacé en transform (composité)
     ------------------------------------------------------------------------ */
  var lantern = $('#lantern');
  var lamp = $('.hero__lamp');
  var warm = $('.hero__img--warm');
  var L = { x: 0.62, y: 0.42 };
  var lampGeo = { w: 0, h: 0, r: 0 };
  function measureLamp() {
    if (!lantern || !lamp || !warm) return;
    lampGeo.w = lantern.clientWidth;
    lampGeo.h = lantern.clientHeight;
    lampGeo.r = lamp.offsetWidth / 2;
    warm.style.width = lampGeo.w + 'px';
    warm.style.height = lampGeo.h + 'px';
    applyLamp();
  }
  function applyLamp() {
    if (!lamp || !warm) return;
    var x = L.x * lampGeo.w - lampGeo.r;
    var y = L.y * lampGeo.h - lampGeo.r;
    lamp.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    warm.style.transform = 'translate3d(' + (-x) + 'px,' + (-y) + 'px,0) scale(1.08)';
  }
  measureLamp();
  window.addEventListener('resize', measureLamp);

  /* ------------------------------------------------------------------------
     6. Onglets de la carte : panneaux empilés (hauteur stable) + fondu enchaîné
     ------------------------------------------------------------------------ */
  function initTabs() {
    var root = $('[data-tabs]');
    if (!root) return;
    var list = $('[role="tablist"]', root);
    var tabs = $$('[role="tab"]', root);
    var ink = $('.tabs__ink', root);
    var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    var running = null;

    function moveInk(tab, instant) {
      if (!ink) return;
      var cs = getComputedStyle(tab);
      var pl = parseFloat(cs.paddingLeft);
      var pr = parseFloat(cs.paddingRight);
      var x = tab.offsetLeft + pl;
      var w = tab.offsetWidth - pl - pr;
      if (motion && !instant) gsap.to(ink, { x: x, scaleX: w, duration: 0.5, ease: 'expo.out' });
      else if (hasGSAP) gsap.set(ink, { x: x, scaleX: w });
      else ink.style.transform = 'translateX(' + x + 'px) scaleX(' + w + ')';
    }

    function revealList(tab) {
      if (list.scrollWidth <= list.clientWidth) return;
      var left = tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2;
      list.scrollTo({ left: Math.max(0, left), behavior: reduced ? 'auto' : 'smooth' });
    }

    function finish(oldPanel) {
      oldPanel.classList.remove('is-leaving');
      if (hasGSAP) gsap.set(oldPanel, { clearProps: 'opacity,transform' });
      running = null;
      requestRefresh();
    }

    function select(tab, focus) {
      if (tab === current) { if (focus) tab.focus(); return; }
      var oldPanel = document.getElementById(current.getAttribute('aria-controls'));
      var newPanel = document.getElementById(tab.getAttribute('aria-controls'));
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      if (focus) tab.focus({ preventScroll: true });
      moveInk(tab);
      revealList(tab);
      current = tab;

      if (running) { var prevTl = running; running = null; prevTl.progress(1); prevTl.kill(); }
      $$('.tabs__panel', root).forEach(function (p) {
        if (p !== newPanel) { p.classList.remove('is-active'); p.setAttribute('inert', ''); }
        if (p !== oldPanel) p.classList.remove('is-leaving');
      });
      newPanel.classList.add('is-active');
      newPanel.removeAttribute('inert');

      if (!motion) { finish(oldPanel); return; }

      oldPanel.classList.add('is-leaving');
      var media = $('.tabs__media', newPanel);
      var img = media ? $('img', media) : null;
      var els = [$('.tabs__intro', newPanel)].concat($$('.item', newPanel));
      running = gsap.timeline({ onComplete: function () { finish(oldPanel); } })
        .to(oldPanel, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' }, 0)
        .fromTo(els, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out', stagger: { amount: 0.15 }, clearProps: 'transform' }, 0.1);
      if (media) running.fromTo(media, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' }, 0.1);
      if (img) running.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 0.6, ease: 'expo.out' }, 0.1);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var idx = null;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = tabs.length - 1;
        if (idx !== null) { e.preventDefault(); select(tabs[idx], true); }
      });
    });

    moveInk(current, true);
    var raf;
    window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { moveInk(current, true); }); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveInk(current, true); });
  }

  /* ------------------------------------------------------------------------
     7. S2 · Carte des saveurs : vrais boutons, flèches clavier, présélection
     ------------------------------------------------------------------------ */
  function initFlavour() {
    var wrap = $('#flavourDots');
    var card = $('#flavourCard');
    var hint = $('#flavourHint');
    var items = $$('#whiskyList .item[data-x]');
    if (!wrap || !card || !items.length) return;
    if (hint) hint.textContent = canHover ? 'Survolez un point de la carte' : 'Touchez un point de la carte';
    var dots = items.map(function (li, i) {
      var name = $('.item__name', li).textContent;
      var price = $('.item__price', li).textContent;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'flavour__dot';
      b.style.left = (parseFloat(li.getAttribute('data-x')) * 100) + '%';
      b.style.top = ((1 - parseFloat(li.getAttribute('data-y'))) * 100) + '%';
      b.setAttribute('aria-label', name + ', ' + (li.getAttribute('data-region') || '') + ', ' + price);
      b.setAttribute('tabindex', '-1');
      wrap.appendChild(b);
      return b;
    });
    var active = -1;
    function setActive(i, animate) {
      if (i === active) return;
      active = i;
      dots.forEach(function (d, k) {
        d.classList.toggle('is-hot', k === i);
        d.setAttribute('aria-pressed', k === i ? 'true' : 'false');
        d.setAttribute('tabindex', k === i ? '0' : '-1');
      });
      items.forEach(function (li, k) { li.classList.toggle('is-hot', k === i); });
      var li = items[i];
      $('.flavour__card-name', card).textContent = $('.item__name', li).textContent;
      $('.flavour__card-meta', card).textContent = $('.item__note', li).textContent;
      $('.flavour__card-price', card).textContent = $('.item__price', li).textContent + ' · 4 cl';
      if (motion && animate) gsap.fromTo([$('.flavour__card-name', card), $('.flavour__card-meta', card), $('.flavour__card-price', card)], { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out', stagger: 0.03 });
    }
    dots.forEach(function (d, i) {
      d.addEventListener('pointerenter', function () { setActive(i, true); });
      d.addEventListener('click', function () { setActive(i, true); });
      d.addEventListener('focus', function () { setActive(i, true); });
      d.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % dots.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + dots.length) % dots.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = dots.length - 1;
        if (n !== null) { e.preventDefault(); dots[n].focus(); }
      });
    });
    items.forEach(function (li, i) { li.addEventListener('pointerenter', function () { setActive(i, true); }); });
    var def = items.findIndex(function (li) { return li.hasAttribute('data-default'); });
    setActive(def >= 0 ? def : 0, false);
    if (motion && wrap.offsetParent) {
      gsap.from(dots, { scale: 0, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } });
    }
  }

  /* ------------------------------------------------------------------------
     8. Menu mobile plein écran
     ------------------------------------------------------------------------ */
  function initMenu() {
    var burger = $('#burger');
    var menu = $('#menu');
    if (!burger || !menu) return;
    var bg = $('.menu__bg', menu);
    var words = $$('.menu__list li > a', menu);
    var foot = $$('.menu__foot > *', menu);
    var isOpen = false;
    var tl = null;

    function open() {
      isOpen = true;
      menu.classList.add('is-open');
      html.classList.add('menu-open');
      menu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fermer le menu');
      $('#nav').classList.remove('is-hidden');
      if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
      if (motion) {
        if (tl) tl.kill();
        tl = gsap.timeline()
          .fromTo(bg, { yPercent: -101 }, { yPercent: 0, duration: 0.65, ease: 'expo.inOut' })
          .fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 }, '-=0.3')
          .fromTo(foot, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.04 }, '-=0.55');
      }
      setTimeout(function () { if (words[0]) words[0].focus({ preventScroll: true }); }, motion ? 420 : 0);
    }

    function close(cb) {
      if (!isOpen) { if (cb) cb(); return; }
      isOpen = false;
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
      var done = function () {
        menu.classList.remove('is-open');
        html.classList.remove('menu-open');
        menu.setAttribute('aria-hidden', 'true');
        if (lenis) lenis.start(); else document.body.style.overflow = '';
        if (cb) cb();
      };
      if (motion) {
        if (tl) tl.kill();
        tl = gsap.timeline({ onComplete: done })
          .to(words.concat(foot), { opacity: 0, duration: 0.2, ease: 'power2.in' })
          .to(bg, { yPercent: -101, duration: 0.55, ease: 'expo.inOut' }, '-=0.05')
          .set(words.concat(foot), { clearProps: 'opacity' });
      } else {
        done();
      }
    }

    burger.addEventListener('click', function () { if (isOpen) close(); else open(); });
    words.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = a.getAttribute('href');
        close(function () { scrollToTarget(target); });
      });
    });
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { close(); burger.focus(); return; }
      if (e.key === 'Tab') {
        var focusables = [burger].concat($$('a', menu));
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('resize', function () { if (isOpen && window.innerWidth >= 1024) close(); });
  }

  /* ------------------------------------------------------------------------
     9. Ancres
     ------------------------------------------------------------------------ */
  function scrollToTarget(hash) {
    var el = hash === '#top' ? 0 : document.querySelector(hash);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { offset: hash === '#top' ? 0 : -16, duration: 1.3 });
    else if (el === 0) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    if (el && el.focus && hash !== '#top') {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  }
  $$('a[href^="#"]').forEach(function (a) {
    if (a.closest('#menu')) return;
    var href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    a.addEventListener('click', function (e) {
      if (href !== '#top' && !document.querySelector(href)) return;
      e.preventDefault();
      scrollToTarget(href);
    });
  });

  /* ------------------------------------------------------------------------
     10. Après le hero : barre d'action mobile, statut compact, jauge
     ------------------------------------------------------------------------ */
  if (heroEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      html.classList.toggle('past-hero', !entries[0].isIntersecting);
    }, { rootMargin: '0px 0px -60% 0px' }).observe(heroEl);
  }

  initTabs();
  initFlavour();
  initMenu();

  // Images chargées tardivement, polices : on recalcule les déclencheurs
  $$('img').forEach(function (img) { if (!img.complete) img.addEventListener('load', requestRefresh, { once: true }); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitHero(); measureLamp(); requestRefresh(); });
  window.addEventListener('load', function () { measureLamp(); requestRefresh(); });

  /* ------------------------------------------------------------------------
     Sans GSAP ou en mouvement réduit : version statique et lisible
     ------------------------------------------------------------------------ */
  if (!motion) {
    var intro0 = $('#intro');
    if (intro0) intro0.remove();
    html.classList.remove('has-intro');
    var navEl = $('#nav');
    var liquid = $('.gauge__liquid');
    var onScroll = function () {
      navEl.classList.toggle('is-scrolled', window.scrollY > 40);
      if (liquid) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        liquid.style.transform = 'scaleY(' + (max > 0 ? window.scrollY / max : 0) + ')';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return;
  }

  /* ========================================================================
     MOTION
     ======================================================================== */
  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();

  /* 11. Lenis -------------------------------------------------------------- */
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* 12. Nav ---------------------------------------------------------------- */
  var nav = $('#nav');
  var lastY = 0;
  function onNavScroll(y) {
    nav.classList.toggle('is-scrolled', y > 40);
    if (!html.classList.contains('menu-open')) {
      if (y > 640 && y > lastY + 4) nav.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 640) nav.classList.remove('is-hidden');
    }
    lastY = y;
  }
  if (lenis) lenis.on('scroll', function (e) { onNavScroll(e.scroll); });
  else window.addEventListener('scroll', function () { onNavScroll(window.scrollY); }, { passive: true });
  nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); });

  /* 13. Intro de marque (≤ 0.8 s) + entrée du hero ------------------------- */
  var heroChars = heroWord ? splitChars(heroWord) : [];
  var tagline = $('.hero__tagline');
  gsap.set(heroChars, { yPercent: 112 });
  if (tagline) gsap.set(tagline, { opacity: 0 });
  var intro = $('#intro');
  var heroDelay = 0.05;
  if (intro && html.classList.contains('has-intro')) {
    var strokes = $$('.intro__stroke', intro);
    strokes.forEach(function (p) { var len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
    if (lenis) lenis.stop();
    gsap.timeline({ onComplete: function () { intro.remove(); html.classList.remove('has-intro'); if (lenis) lenis.start(); } })
      .to(strokes, { strokeDashoffset: 0, duration: 0.42, ease: 'power2.inOut', stagger: 0.08 }, 0)
      .from('.intro__word > span', { yPercent: 110, duration: 0.4, ease: 'expo.out' }, 0.08)
      .to(intro, { yPercent: -100, duration: 0.42, ease: 'expo.inOut' }, 0.38);
    heroDelay = 0.5;
  } else if (intro) {
    intro.remove();
  }
  gsap.to(heroChars, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.04, delay: heroDelay });
  if (tagline) gsap.to(tagline, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: heroDelay + 0.35 });

  /* 14. Lanterne : dérive, ou suit le curseur ------------------------------ */
  if (lamp) {
    var drift = gsap.timeline({ repeat: finePointer ? -1 : 1, defaults: { duration: 3, ease: 'sine.inOut', onUpdate: applyLamp } })
      .to(L, { x: 0.34, y: 0.36 })
      .to(L, { x: 0.46, y: 0.62 })
      .to(L, { x: 0.74, y: 0.56 })
      .to(L, { x: 0.62, y: 0.42 });
    ScrollTrigger.create({ trigger: heroEl, start: 'top top', end: 'bottom top', onToggle: function (self) { if (self.isActive && drift.progress() < 1) drift.play(); else drift.pause(); } });
    if (finePointer) {
      var lx = gsap.quickTo(L, 'x', { duration: 0.6, ease: 'power3.out', onUpdate: applyLamp });
      var ly = gsap.quickTo(L, 'y', { duration: 0.6, ease: 'power3.out', onUpdate: applyLamp });
      heroEl.addEventListener('pointermove', function (e) {
        drift.pause();
        var r = lantern.getBoundingClientRect();
        lx((e.clientX - r.left) / r.width);
        ly((e.clientY - r.top) / r.height);
      });
      heroEl.addEventListener('pointerleave', function () { drift.play(); });
    }
  }

  /* 15. Hero au scroll ----------------------------------------------------- */
  gsap.to('.hero__media', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__content', { yPercent: -10, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true } });

  /* 16. Marquee ------------------------------------------------------------ */
  var marquees = $$('[data-marquee]').map(function (track) {
    return gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 36, ease: 'none', repeat: -1 });
  });
  if (lenis && marquees.length) {
    var boost = { v: 1 };
    var applyBoost = function () { marquees.forEach(function (m) { m.timeScale(boost.v); }); };
    lenis.on('scroll', function (e) {
      gsap.to(boost, {
        v: 1 + Math.min(Math.abs(e.velocity) / 6, 4), duration: 0.2, overwrite: true, onUpdate: applyBoost,
        onComplete: function () { gsap.to(boost, { v: 1, duration: 1.2, ease: 'power2.out', onUpdate: applyBoost }); }
      });
    });
  }

  /* 17. Vocabulaire de révélation -------------------------------------------- */
  $$('[data-reveal-words]').forEach(function (el) {
    var inners = splitWordsMasked(el);
    gsap.from(inners, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
  });
  $$('.h2__rule').forEach(function (r) {
    gsap.fromTo(r, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.inOut', delay: 0.3, scrollTrigger: { trigger: r.parentElement, start: 'top 86%', once: true } });
  });
  $$('.kicker, .eyebrow').forEach(function (el) {
    if (el.closest('.hero')) return;
    gsap.from(el, { opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  function revealImage(frame, st) {
    if (!frame || !frame.offsetParent) return null;
    var img = $('img', frame);
    var tl = gsap.timeline({ scrollTrigger: st || { trigger: frame, start: 'top 88%', once: true } });
    tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut' }, 0);
    if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0.1);
    return tl;
  }
  $$('.mood__media, .g__frame').forEach(function (f) { revealImage(f); });
  mm.add('(min-width: 768px)', function () { $$('.fest__thumb').forEach(function (f) { if (f.offsetParent) revealImage(f); }); });
  revealImage($('#panel-whisky .tabs__media'));

  function revealList(items, trigger) {
    if (!items.length) return;
    var kids = [];
    items.forEach(function (li) { kids = kids.concat(Array.prototype.slice.call(li.children)); });
    gsap.timeline({ scrollTrigger: { trigger: trigger || items[0], start: 'top 88%', once: true } })
      .fromTo(items, { '--rule': 0 }, { '--rule': 1, duration: 0.8, ease: 'expo.inOut', stagger: 0.06 }, 0)
      .fromTo(kids, { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out', stagger: 0.025, clearProps: 'transform' }, 0.25);
  }
  revealList($$('#panel-whisky .item'), '#panel-whisky .items');
  revealList($$('#hours li'), '#hours');
  mm.add('(max-width: 767px)', function () { revealList($$('.day'), '.week__track'); });

  $$('.tabs__intro, .fest__lead, .mood__body p, .info__muted, .manifesto__sign, .note, .fest__desc, .info__address').forEach(function (el) {
    var panel = el.closest('.tabs__panel');
    if (panel && !panel.classList.contains('is-active')) return;
    gsap.from(el, { opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });

  /* 18. Manifeste ---------------------------------------------------------- */
  var manifestText = $('[data-scrub-words]');
  if (manifestText) {
    var mWords = splitWordsPlain(manifestText);
    var pillImgs = $$('.pill-img img', manifestText);
    gsap.set(mWords, { opacity: 0.14 });
    gsap.set($$('.pill-img', manifestText), { opacity: 1 });
    var buildScrub = function (st) {
      gsap.timeline({ scrollTrigger: st })
        .to(mWords, { opacity: 1, ease: 'none', stagger: 0.1, duration: 0.6 })
        .fromTo(pillImgs, { scale: 1.5 }, { scale: 1, ease: 'none', duration: 2, stagger: 1.2 }, 0);
    };
    mm.add('(min-width: 1024px)', function () { buildScrub({ trigger: '.manifesto__pin', start: 'center center', end: '+=70%', pin: true, scrub: 0.6, anticipatePin: 1 }); });
    mm.add('(max-width: 1023px)', function () { buildScrub({ trigger: manifestText, start: 'top 80%', end: 'bottom 50%', scrub: 0.6 }); });
    gsap.fromTo('.manifesto__year', { yPercent: 20 }, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* 19. La cave ------------------------------------------------------------ */
  $$('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var from = parseInt(el.getAttribute('data-count-from') || '0', 10);
    var out = $('.w-inner', el) || el;
    var obj = { v: from };
    out.textContent = String(from);
    gsap.to(obj, { v: target, duration: target > 1000 ? 2 : 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true }, onUpdate: function () { out.textContent = String(Math.round(obj.v)); } });
  });

  /* 20. La semaine : frise pinnée (desktop) --------------------------------- */
  var week = $('.week');
  var track = $('.week__track');
  if (week && track) {
    mm.add('(min-width: 1024px)', function () {
      week.classList.add('is-pinnable');
      var distance = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      var tween = gsap.to(track, {
        x: function () { return -distance(); }, ease: 'none',
        scrollTrigger: { trigger: week, start: 'top top', end: function () { return '+=' + distance(); }, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      $$('.day', track).forEach(function (day) {
        revealImage($('.day__media', day), { trigger: day, containerAnimation: tween, start: 'left 96%', once: true });
        gsap.from($$('.day__body > *', day), { opacity: 0, x: 12, duration: 0.6, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: day, containerAnimation: tween, start: 'left 90%', once: true } });
      });
      return function () { week.classList.remove('is-pinnable'); };
    });
    mm.add('(min-width: 768px) and (max-width: 1023px)', function () {
      $$('.day__media', track).forEach(function (f) { revealImage(f, { trigger: track, start: 'top 85%', once: true }); });
    });
  }

  /* 21. Parallax ----------------------------------------------------------- */
  $$('[data-parallax]').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: img.closest('.mood__media'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('.g').forEach(function (g) {
    var img = $('img', g);
    var speed = parseFloat(img.getAttribute('data-speed') || '0.1');
    gsap.fromTo(img, { yPercent: -speed * 50 }, { yPercent: speed * 50, ease: 'none', scrollTrigger: { trigger: g, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* 22. Festivals ---------------------------------------------------------- */
  gsap.fromTo('.fest__img', { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.fest', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  gsap.from('.fest__title [data-line]', { yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.fest__title', start: 'top 85%', once: true } });
  $$('.fest__item').forEach(function (it) {
    gsap.from([$('.fest__when', it), $('.fest__name', it)], { opacity: 0, x: 12, duration: 0.6, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: it, start: 'top 90%', once: true } });
  });
  var drift2 = $('[data-drift]');
  if (drift2) gsap.fromTo(drift2, { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.fest', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });

  /* 23. S3 · Santé : jauge, puis WALLACE qui se remplit avec un ménisque ----- */
  gsap.to('.gauge__liquid', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 } });
  var big = $('.footer__big');
  var meniscus = $('.footer__meniscus');
  if (big) {
    var fill = { p: 0 };
    var applyFill = function () {
      var p = fill.p;
      big.style.setProperty('--fill', ((1 - p) * 100) + '%');
      if (meniscus) {
        var h = big.offsetHeight;
        meniscus.style.transform = 'translate3d(0,' + ((1 - p) * h - 1) + 'px,0)';
        meniscus.style.opacity = p > 0.01 && p < 0.985 ? '0.6' : '0';
      }
    };
    big.style.setProperty('--fill', '100%');
    gsap.to(fill, { p: 1, ease: 'none', onUpdate: applyFill, scrollTrigger: { trigger: '.footer', start: 'top 80%', end: 'bottom bottom', scrub: 0.5 } });
  }
  var toast = $('.footer__toast');
  if (toast) {
    var toastWords = splitWordsMasked(toast);
    gsap.from(toastWords, { yPercent: 115, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: toast, start: 'top 95%', once: true } });
  }

  /* 24. Lien actif dans la nav ---------------------------------------------- */
  $$('.nav__links a').forEach(function (a) {
    var sec = document.querySelector(a.getAttribute('href'));
    if (!sec) return;
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: function (self) { a.classList.toggle('is-active', self.isActive); } });
  });

  /* 25. Curseur custom (desktop), réévalué au scroll ------------------------ */
  if (finePointer) {
    html.classList.add('has-cursor');
    var cursor = $('.cursor');
    var dot = $('.cursor__dot', cursor);
    var ring = $('.cursor__ring', cursor);
    var label = $('.cursor__label', cursor);
    var dxq = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    var dyq = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    var rxq = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    var ryq = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });
    var px = -100, py = -100;
    gsap.set([dot, ring], { x: -100, y: -100 });
    var evaluate = function (target) {
      if (!target || !target.closest) return;
      var media = target.closest('[data-cursor]');
      var link = target.closest('a, button, [role="tab"], summary');
      cursor.classList.toggle('is-media', !!media && !link);
      cursor.classList.toggle('is-link', !!link);
      if (media && !link) label.textContent = media.getAttribute('data-cursor');
    };
    window.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; dxq(px); dyq(py); rxq(px); ryq(py); }, { passive: true });
    document.addEventListener('pointerleave', function () { gsap.to(cursor, { opacity: 0, duration: 0.2 }); });
    document.addEventListener('pointerenter', function () { gsap.to(cursor, { opacity: 1, duration: 0.2 }); });
    document.addEventListener('pointerover', function (e) { evaluate(e.target); });
    var reEval = function () { if (px > 0) evaluate(document.elementFromPoint(px, py)); };
    if (lenis) lenis.on('scroll', reEval); else window.addEventListener('scroll', reEval, { passive: true });
  }

  /* 26. Boutons magnétiques (retour amorti, sans rebond) --------------------- */
  if (finePointer) {
    $$('.magnetic').forEach(function (btn) {
      var text = $('.btn__text', btn);
      var bx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      var by = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      var tx = text ? gsap.quickTo(text, 'x', { duration: 0.5, ease: 'power3.out' }) : null;
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        bx(mx * 0.25); by(my * 0.35);
        if (tx) tx(mx * 0.08);
      });
      btn.addEventListener('pointerleave', function () { bx(0); by(0); if (tx) tx(0); });
    });
  }

  /* 27. Détails des crédits : la hauteur change, on recalcule --------------- */
  var credits = $('.footer__credits');
  if (credits) credits.addEventListener('toggle', requestRefresh);
})();
