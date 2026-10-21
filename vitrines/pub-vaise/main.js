// Programme des matchs : un seul Google Sheet commun aux vitrines Bar et Pub.
// Test actuel : Sheet partagé par lien, lu via l’adresse gviz (format CSV).
// Production : Fichier > Partager > Publier sur le web > CSV, puis coller le lien ici (voir GUIDE-MATCHS.md).
// Valeur contenant "REMPLACER" : « Programme à venir, appelez-nous ». Échec du chargement : « Programme momentanément indisponible ».
// Pour tester avec un faux programme : ajouter ?demo=1 à l’URL (jamais montré au public sans ce paramètre).
var SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1PfIjnpxyIc2DXrZV7oFxkQfrHndJWJg_vLndx-q7QuE/gviz/tq?tqx=out:csv&gid=0';

// hours / kitchen : null = horaires à confirmer (statut neutre) ; [] = fermé ce jour-là.
var CONFIG = {"name":"Wallace Pub Vaise","phone":"04 72 09 97 93","tel":"+33472099793","hours":{"0":[],"1":[600,1500],"2":[600,1500],"3":[600,1500],"4":[600,1500],"5":[600,1500],"6":[600,1500]},"kitchen":{"0":[],"1":[[720,870],[1140,1320]],"2":[[720,870],[1140,1320]],"3":[[720,870],[1140,1320]],"4":[[720,870],[1140,1320]],"5":[[720,870],[1140,1320]],"6":[[720,870],[1140,1320]]},"matches":true,"extras":[{"day":1,"nth":1,"text":"Musique irlandaise ce soir"}],"kitchenTodayLabel":true};

(function () {
  'use strict';

  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  var matchList = null; // null = programme pas encore chargé (ou indisponible)

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
  function hm(h, mi) { return (h < 10 ? '0' : '') + h + 'h' + (mi ? (mi < 10 ? '0' : '') + mi : ''); }
  function setText(el, t) { if (el.textContent !== t) el.textContent = t; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function known(x) { return x !== null && x !== undefined; }
  function openDay(x) { return !!(x && x.length === 2); }

  /* ---------- Statut ouvert / fermé ---------- */
  function nextOpenText(H, now) {
    var t = H[now.day], i, d, x;
    if (openDay(t) && t[0] > now.min) return 'ouvre à ' + fmt(t[0]);
    for (i = 1; i <= 7; i++) {
      d = (now.day + i) % 7; x = H[d];
      if (!known(x)) return 'horaires de ' + NAMES[d] + ' à confirmer';
      if (openDay(x)) return 'ouvre ' + (i === 1 ? 'demain' : NAMES[d]) + ' à ' + fmt(x[0]);
    }
    return 'réouverture à confirmer';
  }

  // Renvoie null quand il n’y a rien à dire (cuisine inconnue après minuit).
  function kitchenLine(day, min, afterMidnight) {
    var K = CONFIG.kitchen, slots = K[day], i, nx;
    if (!afterMidnight) {
      if (!known(slots)) return 'Cuisine : horaires à confirmer';
      if (!slots.length) return 'Cuisine fermée aujourd’hui';
      for (i = 0; i < slots.length; i++) if (min >= slots[i][0] && min < slots[i][1]) return 'Cuisine ouverte jusqu’à ' + fmt(slots[i][1]);
      for (i = 0; i < slots.length; i++) if (min < slots[i][0]) return 'Cuisine fermée, reprend à ' + fmt(slots[i][0]);
      nx = K[(day + 1) % 7];
      if (!known(nx)) return 'Cuisine fermée, horaires de demain à confirmer';
      return nx.length ? 'Cuisine fermée, rouvre demain à ' + fmt(nx[0][0]) : 'Cuisine fermée, fermée aussi demain';
    }
    return slots && slots.length ? 'Cuisine fermée, ouvre à ' + fmt(slots[0][0]) : null;
  }

  function matchLines(now) {
    if (!CONFIG.matches || !matchList) return [];
    var today = split(matchList, now).today, out;
    out = today.slice(0, 3).map(function (m) {
      var t = m.teams && m.teams.length ? m.teams.join(' – ') : m.what;
      return '<a href="#matchs">' + hm(m.h, m.mi) + ' ' + esc(t) + (m.screen ? ' · ' + esc(m.screen) : '') + '</a>';
    });
    if (today.length > 3) out.push('<a href="#matchs">+ ' + (today.length - 3) + (today.length - 3 > 1 ? ' autres matchs' : ' autre match') + '</a>');
    return out;
  }

  function update() {
    var H = CONFIG.hours, now = parisNow(), prev = (now.day + 6) % 7, tH = H[now.day], pH = H[prev];
    var open = false, after = false, unknown = false, service = now.day, statusText, barLine;
    if (openDay(pH) && now.min < pH[1] - 1440) { open = true; after = true; service = prev; }
    else if (openDay(tH) && now.min >= tH[0] && now.min < tH[1]) { open = true; }
    else if (!known(tH) || (!known(pH) && now.min < 360)) { unknown = true; }
    if (open) {
      statusText = 'Ouvert jusqu’à ' + fmt(H[service][1]);
      barLine = 'Bar ouvert jusqu’à ' + fmt(H[service][1]);
    } else if (unknown) {
      statusText = 'Horaires du ' + NAMES[known(tH) ? prev : now.day] + ' à confirmer';
      barLine = 'Bar : horaires du ' + NAMES[known(tH) ? prev : now.day] + ' à confirmer, appelez-nous';
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
      var lines = [barLine], K = CONFIG.kitchen;
      var kl = K ? kitchenLine(now.day, now.min, after) : null;
      if (kl) lines.push(kl);
      if (!after) {
        CONFIG.extras.forEach(function (x) {
          if (x.day === now.day && (!x.nth || Math.ceil(now.d / 7) === x.nth)) lines.push(x.text);
        });
        if (K && now.day >= 1 && now.day <= 5 && openDay(H[now.day]) && K[now.day] && K[now.day].length && now.min < K[now.day][0][1]) lines.push('Plat du jour au déjeuner');
      }
      lines = lines.concat(matchLines(now));
      var html = lines.map(function (l) { return '<li>' + l + '</li>'; }).join('');
      if (list.getAttribute('data-html') !== html) { list.innerHTML = html; list.setAttribute('data-html', html); }
      var title = document.getElementById('today-title');
      if (title) setText(title, 'Aujourd’hui, ' + NAMES[service]);
    }
    var rows = document.querySelectorAll('tr[data-day]');
    for (var i = 0; i < rows.length; i++) rows[i].setAttribute('data-today', String(+rows[i].getAttribute('data-day') === service));
  }

  /* ---------- Navigation : fondu à droite tant qu'il reste des liens à faire défiler ---------- */
  var nav = document.querySelector('.top__nav');
  function navFade() {
    if (!nav) return;
    var fit = nav.scrollWidth <= nav.clientWidth + 1;
    nav.classList.toggle('is-fit', fit);
    nav.classList.toggle('is-end', !fit && nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 2);
  }
  if (nav) { nav.addEventListener('scroll', navFade, { passive: true }); window.addEventListener('resize', navFade); navFade(); }

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

  /* ---------- Matchs (Google Sheet en CSV) ---------- */
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

  // Colonnes : date, heure, equipe1, equipe2, ecran (toute autre colonne, comme jour, est ignorée).
  // Ancien format toujours accepté : colonne affiche « A - B » ou « A vs B ».
  // Date : AAAA-MM-JJ ou JJ/MM/AAAA. Heure : 20:45 ou 20h45.
  function splitAffiche(s) {
    var p = s.split(/\s+(?:-|–|—|vs\.?|v)\s+/i);
    return p.length === 2 && p[0].trim() && p[1].trim() ? [p[0].trim(), p[1].trim()] : null;
  }

  function toMatches(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(norm), ix = { date: head.indexOf('date'), heure: head.indexOf('heure'), e1: head.indexOf('equipe1'), e2: head.indexOf('equipe2'), affiche: head.indexOf('affiche'), ecran: head.indexOf('ecran') };
    if (ix.date < 0 || ix.heure < 0 || (ix.e1 < 0 && ix.e2 < 0 && ix.affiche < 0)) return [];
    var out = [];
    rows.slice(1).forEach(function (r) {
      var ds = (r[ix.date] || '').trim(), hs = (r[ix.heure] || '').trim(), m, y, mo, d, h, mi;
      if ((m = ds.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) { y = +m[1]; mo = +m[2]; d = +m[3]; }
      else if ((m = ds.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) { d = +m[1]; mo = +m[2]; y = +m[3]; }
      else return;
      if (!(m = hs.match(/^(\d{1,2})\s*[:hH]\s*(\d{0,2})$/))) return;
      h = +m[1]; mi = m[2] ? +m[2] : 0;
      var a = ix.e1 >= 0 ? (r[ix.e1] || '').trim() : '', b = ix.e2 >= 0 ? (r[ix.e2] || '').trim() : '', teams, sp;
      if (a && b) teams = [a, b];
      else if (a || b) teams = [a || b];
      else if (ix.affiche >= 0 && (sp = (r[ix.affiche] || '').trim())) teams = splitAffiche(sp) || [sp];
      else return;
      if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 29 || mi > 59) return;
      out.push({ y: y, mo: mo, d: d, h: h, mi: mi, teams: teams, what: teams.join(' - '), screen: ix.ecran >= 0 ? (r[ix.ecran] || '').trim() : '' });
    });
    return out;
  }

  function stamp(y, mo, d, h, mi) { return Date.UTC(y, mo - 1, d, h, mi) / 60000; }

  function demo(now) {
    var base = Date.UTC(now.y, now.mo - 1, now.d), list = [];
    [[0, 21, 0, 'France', 'Marseille', 'Écran 1'], [0, 21, 0, 'Lyon', 'PSG', 'Écran 2'], [1, 20, 45, 'Irlande', 'Écosse', 'Écran 1'], [3, 21, 0, 'Équipe inconnue', 'Italie', 'Écran 1'], [6, 18, 30, 'Toulouse', 'Racing 92', 'Les deux écrans']].forEach(function (x) {
      var t = new Date(base + x[0] * 86400000);
      list.push({ y: t.getUTCFullYear(), mo: t.getUTCMonth() + 1, d: t.getUTCDate(), h: x[1], mi: x[2], teams: [x[3], x[4]], what: x[3] + ' - ' + x[4], screen: x[5] });
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

  // Moitié de carte : les couleurs viennent uniquement du dictionnaire equipes.js ; le nom est toujours sur une pastille sombre.
  function half(name, full) {
    var el = document.createElement('div'), span = document.createElement('span'), T = window.WallaceTeams, colors = T ? T.find(name) : null;
    el.className = 'mlist__half' + (full ? ' mlist__half--full' : '');
    el.setAttribute('aria-hidden', 'true');
    span.className = 'mlist__team';
    span.textContent = name;
    if (colors) {
      el.style.background = T.gradient(colors);
      span.className += ' mlist__team--pill';
    } else el.className += ' is-neutral';
    el.appendChild(span);
    return el;
  }

  function card(m, tonight) {
    var li = document.createElement('li'), meta = document.createElement('div'), w = document.createElement('p'), sr = document.createElement('span'), s, teams = m.teams && m.teams.length ? m.teams : [m.what], label;
    var time = hm(m.h, m.mi), dateTxt = '';
    meta.className = 'mlist__meta';
    meta.setAttribute('aria-hidden', 'true');
    w.className = 'mlist__when';
    w.textContent = time;
    if (!tonight) {
      var dt = new Date(Date.UTC(m.y, m.mo - 1, m.d)), small = document.createElement('small');
      dateTxt = NAMES[dt.getUTCDay()] + ' ' + m.d + ' ' + MONTHS[m.mo - 1];
      small.textContent = dateTxt;
      w.appendChild(small);
    }
    meta.appendChild(w);
    if (m.screen) { s = document.createElement('span'); s.className = 'mlist__screen'; s.textContent = m.screen; meta.appendChild(s); }
    label = (dateTxt ? dateTxt + ', ' : '') + time + ', ' + teams.join(' contre ') + (m.screen ? ', ' + m.screen.toLowerCase() : '');
    sr.className = 'sr';
    sr.textContent = label;
    li.appendChild(sr);
    li.appendChild(meta);
    li.appendChild(half(teams[0], teams.length < 2));
    if (teams.length > 1) li.appendChild(half(teams[1], false));
    return li;
  }

  function els() {
    return { t: document.getElementById('matchs-today'), n: document.getElementById('matchs-next'), box: document.getElementById('matchs-box'), empty: document.getElementById('matchs-empty'), note: document.getElementById('matchs-demo') };
  }
  function telLink() { return '<a href="tel:' + CONFIG.tel + '">' + CONFIG.phone + '</a>'; }

  function render(list, isDemo) {
    var now = parisNow(), parts = split(list, now), E = els();
    if (!E.t || !E.n) return parts;
    E.t.innerHTML = ''; E.n.innerHTML = '';
    E.t.className = 'mlist mlist--tonight'; E.n.className = 'mlist';
    parts.today.forEach(function (m) { E.t.appendChild(card(m, true)); });
    parts.next.forEach(function (m) { E.n.appendChild(card(m, false)); });
    [[E.t, parts.today, 'Pas de match ce soir.'], [E.n, parts.next, 'Rien d’annoncé pour l’instant.']].forEach(function (x) {
      if (!x[1].length) { var li = document.createElement('li'); li.className = 'mlist__none'; li.textContent = x[2]; x[0].appendChild(li); x[0].classList.add('is-empty'); }
    });
    var none = !parts.today.length && !parts.next.length;
    if (E.box) { E.box.hidden = none; E.box.removeAttribute('aria-busy'); }
    if (E.empty) { E.empty.innerHTML = 'Programme à venir, appelez-nous au ' + telLink() + '.'; E.empty.hidden = !none; }
    if (E.note) E.note.hidden = !(isDemo && !none);
    matchList = list;
    update();
    return parts;
  }

  // Sheet injoignable (réseau, blocage, délai dépassé) : un seul message, distinct du programme vide.
  function renderError() {
    var E = els();
    if (E.box) { E.box.hidden = true; E.box.removeAttribute('aria-busy'); }
    if (E.empty) { E.empty.innerHTML = 'Programme momentanément indisponible. Appelez le ' + telLink() + ' pour savoir quel match passe ce soir.'; E.empty.hidden = false; }
    if (E.note) E.note.hidden = true;
    matchList = null;
    update();
    return null;
  }

  // ?demo=1 : faux programme pour les tests du développeur, jamais affiché au public sans ce paramètre.
  var DEMO = /[?&]demo=1(?:&|$)/.test(window.location.search);

  function loadMatches(url) {
    var placeholder = !url || /REMPLACER/.test(url);
    if (DEMO) { return Promise.resolve(render(demo(parisNow()), true)); }
    if (placeholder || typeof fetch !== 'function') { return Promise.resolve(render([], false)); }
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 4000) : null;
    return fetch(url, { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) { return render(toMatches(parseCSV(t)), false); })
      .catch(function () { return renderError(); })
      .then(function (p) { if (timer) clearTimeout(timer); return p; });
  }

  update();
  setInterval(update, 60000);

  window.WallaceMatches = { parseCSV: parseCSV, toMatches: toMatches, split: split, render: render, load: loadMatches };
  if (CONFIG.matches) loadMatches(SHEET_CSV_URL);
})();
