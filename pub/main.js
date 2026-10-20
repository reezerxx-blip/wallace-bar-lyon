(function () {
  'use strict';

  var BAR_CLOSE = { 0: 1470, 1: 1470, 2: 1470, 3: 1470, 4: 1470, 5: 1590, 6: 1590 };
  var BAR_OPEN = 660;
  var KITCHEN = {
    0: [[660, 900], [1110, 1320]],
    1: [[720, 900], [1140, 1320]],
    2: [[720, 900], [1140, 1320]],
    3: [[720, 900], [1140, 1320]],
    4: [[720, 900], [1140, 1320]],
    5: [[720, 900], [1140, 1320]],
    6: [[720, 900], [1140, 1320]]
  };
  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  function parisNow() {
    try {
      var o = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
      return { day: DAYS[o.weekday], min: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
    } catch (e) {
      var n = new Date();
      return { day: n.getDay(), min: n.getHours() * 60 + n.getMinutes() };
    }
  }

  function fmt(mins) {
    var m = mins % 1440, h = Math.floor(m / 60), mm = m % 60;
    return (h < 10 ? '0' : '') + h + 'h' + (mm ? (mm < 10 ? '0' : '') + mm : '');
  }

  function kitchenLine(day, min, afterMidnight) {
    var slots = KITCHEN[day], i;
    if (!afterMidnight) {
      for (i = 0; i < slots.length; i++) {
        if (min >= slots[i][0] && min < slots[i][1]) return 'Cuisine ouverte jusqu’à ' + fmt(slots[i][1]);
      }
      for (i = 0; i < slots.length; i++) {
        if (min < slots[i][0]) return 'Cuisine fermée, reprend à ' + fmt(slots[i][0]);
      }
      return 'Cuisine fermée, rouvre demain à ' + fmt(KITCHEN[(day + 1) % 7][0][0]);
    }
    return 'Cuisine fermée, ouvre à ' + fmt(slots[0][0]);
  }

  function setText(el, text) {
    if (el.textContent !== text) el.textContent = text;
  }

  function update() {
    var now = parisNow();
    var prev = (now.day + 6) % 7;
    var open = false, after = false;
    var service = now.day;
    if (now.min < BAR_CLOSE[prev] - 1440) { open = true; after = true; service = prev; }
    else if (now.min >= BAR_OPEN && now.min < BAR_CLOSE[now.day]) { open = true; }

    var box = document.getElementById('status');
    var text = document.getElementById('status-text');
    var barLine = open ? 'Bar ouvert jusqu’à ' + fmt(BAR_CLOSE[service]) : 'Bar fermé, ouvre à ' + fmt(BAR_OPEN);
    if (box && text) {
      box.setAttribute('data-open', open ? 'true' : 'false');
      setText(text, open ? 'Ouvert jusqu’à ' + fmt(BAR_CLOSE[service]) : 'Fermé, ouvre à ' + fmt(BAR_OPEN));
    }

    var list = document.getElementById('today-lines');
    if (list) {
      var lines = [barLine, kitchenLine(now.day, now.min, after)];
      if (now.day === 1 && !after) lines.push(now.min < 1230 ? 'Quiz ce soir, <b>20h30</b>' : 'Quiz ce soir, en cours');
      if (now.day >= 1 && now.day <= 5 && !after && now.min < 900) lines.push('Plat du jour au déjeuner');
      lines.push('Sport sur 4 écrans');
      var html = '';
      for (var k = 0; k < lines.length; k++) html += '<li>' + lines[k] + '</li>';
      if (list.getAttribute('data-html') !== html) {
        list.innerHTML = html;
        list.setAttribute('data-html', html);
      }
      var title = document.getElementById('today-title');
      if (title) setText(title, 'Aujourd’hui, ' + NAMES[service]);
    }

    var rows = document.querySelectorAll('tr[data-day]');
    for (var i = 0; i < rows.length; i++) {
      rows[i].setAttribute('data-today', String(parseInt(rows[i].getAttribute('data-day'), 10) === service));
    }
  }
  update();
  setInterval(update, 60000);

  var links = document.querySelectorAll('.top__nav a');
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    for (var a = 0; a < links.length; a++) map[links[a].getAttribute('href').slice(1)] = links[a];
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (map[e.target.id]) seen[e.target.id] = e.isIntersecting;
      });
      for (var id in map) {
        if (seen[id]) map[id].setAttribute('aria-current', 'true');
        else map[id].removeAttribute('aria-current');
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (var id in map) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    }
  }

  var dataEl = document.getElementById('data-whisky');
  var host = document.getElementById('whisky-list');
  var data = null;
  try { data = JSON.parse(dataEl.textContent); } catch (e) { data = null; }
  if (data && host) {
    var groups = [['ecosse', 'Écosse'], ['irlande', 'Irlande'], ['monde', 'Monde']].filter(function (g) {
      return data[g[0]] && data[g[0]].length;
    });
    if (groups.length) {
      var wrap = document.createElement('div');
      wrap.className = 'whisky-tabs';
      var tabs = document.createElement('div');
      tabs.setAttribute('role', 'tablist');
      tabs.setAttribute('aria-label', 'Whiskies par origine');
      wrap.appendChild(tabs);
      var buttons = [], panels = [];
      groups.forEach(function (g, n) {
        var b = document.createElement('button');
        b.type = 'button';
        b.id = 'wt-' + g[0];
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-controls', 'wp-' + g[0]);
        b.textContent = g[1];
        tabs.appendChild(b);
        var p = document.createElement('ul');
        p.id = 'wp-' + g[0];
        p.setAttribute('role', 'tabpanel');
        p.setAttribute('aria-labelledby', b.id);
        data[g[0]].forEach(function (w) {
          var li = document.createElement('li');
          var name = document.createElement('span');
          name.textContent = w.nom + (w.region ? ', ' + w.region : '');
          var price = document.createElement('span');
          price.textContent = w.prix || '';
          li.appendChild(name);
          li.appendChild(price);
          p.appendChild(li);
        });
        wrap.appendChild(p);
        buttons.push(b);
        panels.push(p);
      });
      var select = function (n, focus) {
        buttons.forEach(function (b, k) {
          b.setAttribute('aria-selected', k === n ? 'true' : 'false');
          b.tabIndex = k === n ? 0 : -1;
          panels[k].hidden = k !== n;
        });
        if (focus) buttons[n].focus();
      };
      buttons.forEach(function (b, n) {
        b.addEventListener('click', function () { select(n, false); });
        b.addEventListener('keydown', function (ev) {
          var to = null;
          if (ev.key === 'ArrowRight') to = (n + 1) % buttons.length;
          else if (ev.key === 'ArrowLeft') to = (n + buttons.length - 1) % buttons.length;
          else if (ev.key === 'Home') to = 0;
          else if (ev.key === 'End') to = buttons.length - 1;
          if (to !== null) { ev.preventDefault(); select(to, true); }
        });
      });
      select(0, false);
      host.appendChild(wrap);
      var regions = document.querySelector('.regions');
      if (regions) regions.hidden = true;
    }
  }
})();
