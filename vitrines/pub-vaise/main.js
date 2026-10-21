// URL du Google Sheet publié en CSV (Fichier > Partager > Publier sur le web > CSV).
// Tant que la valeur contient "REMPLACER" (ou si le chargement échoue), le message « Programme à venir, appelez-nous » est affiché.
// Pour tester avec un faux programme : ajouter ?demo=1 à l’URL (jamais montré au public sans ce paramètre).
var SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZbGmvgfvKbp20_jOTr84_171LJNhIWo6N6pVOVn847v9BpAOv7b-ZMMrBGGCf1z16roSu5lZq0S8m/pub?gid=1710696598&single=true&output=csv';

var CONFIG = {"name":"Wallace Pub Vaise","hours":{"0":null,"1":[600,1500],"2":[600,1500],"3":[600,1500],"4":[600,1500],"5":[600,1500],"6":[600,1500]},"kitchen":{"0":null,"1":[[720,900],[1140,1320]],"2":[[720,900],[1140,1320]],"3":[[720,900],[1140,1320]],"4":[[720,900],[1140,1320]],"5":[[720,900],[1140,1320]],"6":[[720,900],[1140,1320]]},"matches":true,"extras":[{"day":1,"nth":1,"text":"Musique irlandaise ce soir"}],"kitchenTodayLabel":true};

(function () {
  'use strict';

  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  var tonightCount = null; // null = programme pas encore chargé

  /* ---------- Heure de Paris ---------- */
  function parisNow() {
    try {
      var o = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
      return { day: DAYS[o.weekday], y: +o.year, mo: +o.month, d: +o.day, min: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
    } catch (e) {
      var n = new Date();
      return { day: n.getDay(), y: n.getFullYear(), mo: n.getMonth() + 1, d: n.getDate(), min: n.getHours() * 60 + n.getMinutes() };
    }
  }

  function fmt(mins) {
    var m = mins % 1440, h = Math.floor(m / 60), mm = m % 60;
    return (h < 10 ? '0' : '') + h + 'h' + (mm ? (mm < 10 ? '0' : '') + mm : '');
  }
  function setText(el, t) { if (el.textContent !== t) el.textContent = t; }

  /* ---------- Statut ouvert / fermé ---------- */
  function nextOpenText(H, now) {
    var t = H[now.day], n = H[(now.day + 1) % 7];
    if (t && t[0] > now.min) return 'ouvre à ' + fmt(t[0]);
    if (n) return 'ouvre à ' + fmt(n[0]);
    return 'horaires de ' + NAMES[(now.day + 1) % 7] + ' à confirmer';
  }

  // Renvoie null quand il n’y a rien à dire (cuisine inconnue après minuit).
  function kitchenLine(day, min, afterMidnight) {
    var K = CONFIG.kitchen, slots = K[day], i, nx;
    if (!afterMidnight) {
      if (!slots) return 'Cuisine : horaires à confirmer';
      for (i = 0; i < slots.length; i++) if (min >= slots[i][0] && min < slots[i][1]) return 'Cuisine ouverte jusqu’à ' + fmt(slots[i][1]);
      for (i = 0; i < slots.length; i++) if (min < slots[i][0]) return 'Cuisine fermée, reprend à ' + fmt(slots[i][0]);
      nx = K[(day + 1) % 7];
      return nx ? 'Cuisine fermée, rouvre demain à ' + fmt(nx[0][0]) : 'Cuisine fermée, horaires de demain à confirmer';
    }
    return slots ? 'Cuisine fermée, ouvre à ' + fmt(slots[0][0]) : null;
  }

  // Jours à null dans CONFIG.hours = horaires à confirmer : statut neutre, jamais « ouvert » ni « fermé » inventé.
  function update() {
    var H = CONFIG.hours, now = parisNow(), prev = (now.day + 6) % 7, tH = H[now.day], pH = H[prev];
    var open = false, after = false, unknown = false, service = now.day, statusText, barLine;
    if (pH && now.min < pH[1] - 1440) { open = true; after = true; service = prev; }
    else if (tH && now.min >= tH[0] && now.min < tH[1]) { open = true; }
    else if (!tH || (!pH && now.min < 360)) { unknown = true; }
    if (open) {
      statusText = 'Ouvert jusqu’à ' + fmt(H[service][1]);
      barLine = 'Bar ouvert jusqu’à ' + fmt(H[service][1]);
    } else if (unknown) {
      statusText = 'Horaires du ' + NAMES[tH ? prev : now.day] + ' à confirmer';
      barLine = 'Bar : horaires du ' + NAMES[tH ? prev : now.day] + ' à confirmer, appelez-nous';
    } else {
      statusText = 'Fermé, ' + nextOpenText(H, now);
      barLine = 'Bar fermé, ' + nextOpenText(H, now);
    }
    var box = document.getElementById('status'), text = document.getElementById('status-text');
    if (box && text) {
      box.setAttribute('data-open', open ? 'true' : (unknown ? '' : 'false'));
      setText(text, statusText);
    }

    var list = document.getElementById('today-lines');
    if (list) {
      var lines = [barLine];
      var kl = CONFIG.kitchen ? kitchenLine(now.day, now.min, after) : null;
      if (kl) lines.push(kl);
      if (!after) {
        CONFIG.extras.forEach(function (x) {
          if (x.day === now.day && (!x.nth || Math.ceil(now.d / 7) === x.nth)) lines.push(x.text);
        });
        if (CONFIG.kitchen && now.day >= 1 && now.day <= 5 && now.min < 900) lines.push('Plat du jour au déjeuner');
      }
      if (CONFIG.matches && tonightCount) lines.push(tonightCount + (tonightCount > 1 ? ' matchs ce soir' : ' match ce soir'));
      var html = lines.map(function (l) { return '<li>' + l + '</li>'; }).join('');
      if (list.getAttribute('data-html') !== html) { list.innerHTML = html; list.setAttribute('data-html', html); }
      var title = document.getElementById('today-title');
      if (title) setText(title, 'Aujourd’hui, ' + NAMES[service]);
    }
    var rows = document.querySelectorAll('tr[data-day]');
    for (var i = 0; i < rows.length; i++) rows[i].setAttribute('data-today', String(+rows[i].getAttribute('data-day') === service));
  }
  update();
  setInterval(update, 60000);

  /* ---------- Navigation active ---------- */
  var links = document.querySelectorAll('.top__nav a');
  if ('IntersectionObserver' in window && links.length) {
    var map = {}, seen = {}, a, id;
    for (a = 0; a < links.length; a++) map[links[a].getAttribute('href').slice(1)] = links[a];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (map[e.target.id]) seen[e.target.id] = e.isIntersecting; });
      for (var k in map) { if (seen[k]) map[k].setAttribute('aria-current', 'true'); else map[k].removeAttribute('aria-current'); }
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (id in map) { var sec = document.getElementById(id); if (sec) io.observe(sec); }
  }

  /* ---------- Matchs (Google Sheet publié en CSV) ---------- */
  // Parseur CSV : guillemets, guillemets doublés, virgules et retours à la ligne dans les champs.
  function parseCSV(text) {
    var rows = [], row = [], cur = '', q = false, i, c;
    text = String(text).replace(/^﻿/, '');
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
        else cur += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cur); cur = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else cur += c;
    }
    if (cur !== '' || row.length) { row.push(cur); if (row.length > 1 || row[0] !== '') rows.push(row); }
    return rows;
  }

  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }

  // Colonnes attendues : date, heure, affiche, écran. Date : AAAA-MM-JJ ou JJ/MM/AAAA. Heure : 20:45 ou 20h45.
  function toMatches(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(norm), ix = { date: head.indexOf('date'), heure: head.indexOf('heure'), affiche: head.indexOf('affiche'), ecran: head.indexOf('ecran') };
    if (ix.date < 0 || ix.heure < 0 || ix.affiche < 0) return [];
    var out = [];
    rows.slice(1).forEach(function (r) {
      var ds = (r[ix.date] || '').trim(), hs = (r[ix.heure] || '').trim(), m, y, mo, d, h, mi;
      if ((m = ds.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) { y = +m[1]; mo = +m[2]; d = +m[3]; }
      else if ((m = ds.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) { d = +m[1]; mo = +m[2]; y = +m[3]; }
      else return;
      if (!(m = hs.match(/^(\d{1,2})\s*[:hH]\s*(\d{0,2})$/))) return;
      h = +m[1]; mi = m[2] ? +m[2] : 0;
      var what = (r[ix.affiche] || '').trim();
      if (!what || mo < 1 || mo > 12 || d < 1 || d > 31 || h > 29 || mi > 59) return;
      out.push({ y: y, mo: mo, d: d, h: h, mi: mi, what: what, screen: ix.ecran >= 0 ? (r[ix.ecran] || '').trim() : '' });
    });
    return out;
  }

  function stamp(y, mo, d, h, mi) { return Date.UTC(y, mo - 1, d, h, mi) / 60000; }

  function demo(now) {
    var base = Date.UTC(now.y, now.mo - 1, now.d), list = [];
    [[0, 21, 0, 'Match de démonstration A - B', 'Écran 1'], [0, 21, 0, 'Match de démonstration C - D', 'Écran 2'], [1, 20, 45, 'Match de démonstration E - F', 'Écran 1'], [3, 21, 0, 'Match de démonstration G - H', 'Écran 1'], [6, 18, 30, 'Match de démonstration I - J', 'Les deux écrans']].forEach(function (x) {
      var t = new Date(base + x[0] * 86400000);
      list.push({ y: t.getUTCFullYear(), mo: t.getUTCMonth() + 1, d: t.getUTCDate(), h: x[1], mi: x[2], what: x[3], screen: x[4] });
    });
    return list;
  }

  // Sépare ce soir / à venir, masque les matchs terminés (début + 2h30).
  function split(list, now) {
    var nowS = stamp(now.y, now.mo, now.d, 0, now.min), today = [], next = [];
    list.filter(function (m) { return stamp(m.y, m.mo, m.d, m.h, m.mi) + 150 >= nowS; })
      .sort(function (a, b) { return stamp(a.y, a.mo, a.d, a.h, a.mi) - stamp(b.y, b.mo, b.d, b.h, b.mi); })
      .forEach(function (m) { (m.y === now.y && m.mo === now.mo && m.d === now.d ? today : next).push(m); });
    return { today: today, next: next.slice(0, 12) };
  }

  function card(m, tonight) {
    var li = document.createElement('li'), w = document.createElement('p'), t = document.createElement('p'), s;
    w.className = 'mlist__when';
    w.textContent = (m.h < 10 ? '0' : '') + m.h + 'h' + (m.mi ? (m.mi < 10 ? '0' : '') + m.mi : '');
    if (!tonight) {
      var dt = new Date(Date.UTC(m.y, m.mo - 1, m.d)), small = document.createElement('small');
      small.textContent = NAMES[dt.getUTCDay()] + ' ' + m.d + ' ' + MONTHS[m.mo - 1];
      w.appendChild(small);
    }
    t.className = 'mlist__what';
    t.textContent = m.what;
    li.appendChild(w); li.appendChild(t);
    if (m.screen) { s = document.createElement('span'); s.className = 'mlist__screen'; s.textContent = m.screen; li.appendChild(s); }
    return li;
  }

  function render(list, isDemo) {
    var now = parisNow(), parts = split(list, now);
    var tEl = document.getElementById('matchs-today'), nEl = document.getElementById('matchs-next');
    var box = document.getElementById('matchs-box'), empty = document.getElementById('matchs-empty'), note = document.getElementById('matchs-demo');
    if (!tEl || !nEl) return parts;
    tEl.innerHTML = ''; nEl.innerHTML = '';
    tEl.className = 'mlist mlist--tonight';
    parts.today.forEach(function (m) { tEl.appendChild(card(m, true)); });
    parts.next.forEach(function (m) { nEl.appendChild(card(m, false)); });
    [[tEl, parts.today, 'Pas de match ce soir.'], [nEl, parts.next, 'Rien d’annoncé pour l’instant.']].forEach(function (x) {
      if (!x[1].length) { var li = document.createElement('li'); li.className = 'mlist__none'; li.textContent = x[2]; x[0].appendChild(li); x[0].classList.add('is-empty'); }
    });
    var none = !parts.today.length && !parts.next.length;
    if (box) box.hidden = none;
    if (empty) empty.hidden = !none;
    if (note) note.hidden = !(isDemo && !none);
    tonightCount = parts.today.length;
    update();
    return parts;
  }

  // ?demo=1 : faux programme pour les tests du développeur, jamais affiché au public sans ce paramètre.
  var DEMO = /[?&]demo=1(?:&|$)/.test(window.location.search);

  function loadMatches(url) {
    var placeholder = !url || /REMPLACER/.test(url);
    if (DEMO) { return Promise.resolve(render(demo(parisNow()), true)); }
    if (placeholder || typeof fetch !== 'function') { return Promise.resolve(render([], false)); }
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 7000) : null;
    return fetch(url, { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) { return render(toMatches(parseCSV(t)), false); })
      .catch(function () { return render([], false); })
      .then(function (p) { if (timer) clearTimeout(timer); return p; });
  }

  window.WallaceMatches = { parseCSV: parseCSV, toMatches: toMatches, split: split, load: loadMatches };
  if (CONFIG.matches) loadMatches(SHEET_CSV_URL);
})();
