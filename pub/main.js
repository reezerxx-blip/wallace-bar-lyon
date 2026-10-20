(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var BAR = { 0: 1470, 1: 1470, 2: 1470, 3: 1470, 4: 1470, 5: 1590, 6: 1590 };
  var OPEN = 660;
  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

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

  function update() {
    var now = parisNow();
    var prev = (now.day + 6) % 7;
    var open = false, service = now.day;
    if (now.min < BAR[prev] - 1440) { open = true; service = prev; }
    else if (now.min >= OPEN && now.min < BAR[now.day]) { open = true; }

    var box = document.getElementById('status');
    var text = document.getElementById('status-text');
    if (box && text) {
      box.setAttribute('data-open', open ? 'true' : 'false');
      text.textContent = open
        ? 'Ouvert jusqu’à ' + fmt(BAR[service])
        : 'Fermé, ouvre à ' + fmt(OPEN);
    }

    var rows = document.querySelectorAll('tr[data-day]');
    for (var i = 0; i < rows.length; i++) {
      rows[i].setAttribute('data-today', String(parseInt(rows[i].getAttribute('data-day'), 10) === service));
    }
  }
  update();
  setInterval(update, 60000);

  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduced) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  for (var j = 0; j < items.length; j++) io.observe(items[j]);
})();
