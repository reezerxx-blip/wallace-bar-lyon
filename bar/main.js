(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Horaires du bar : fermeture en minutes depuis minuit du jour d'ouverture */
  var BAR = { 0: [660, 1470], 1: [660, 1470], 2: [660, 1470], 3: [660, 1470], 4: [660, 1470], 5: [660, 1590], 6: [660, 1590] };
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

  function fmt(m) {
    m = m % 1440;
    var h = Math.floor(m / 60), mm = m % 60;
    return (h < 10 ? '0' : '') + h + 'h' + (mm ? (mm < 10 ? '0' : '') + mm : '');
  }

  function render() {
    var now = parisNow();
    var prev = (now.day + 6) % 7;
    var open = false, closeAt = BAR[now.day][1], serviceDay = now.day;
    if (now.min < BAR[prev][1] - 1440) { open = true; closeAt = BAR[prev][1]; serviceDay = prev; }
    else if (now.min >= BAR[now.day][0] && now.min < BAR[now.day][1]) { open = true; }

    var text = open ? 'Ouvert jusqu’à ' + fmt(closeAt) : 'Fermé, ouvre à ' + fmt(BAR[now.day][0]);
    $$('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      el.querySelector('.status__label').textContent = text;
    });
    $$('#hours li').forEach(function (li) {
      var days = li.getAttribute('data-days').split(',').map(Number);
      li.classList.toggle('is-today', days.indexOf(serviceDay) !== -1);
    });
  }
  render();
  setInterval(render, 60000);

  /* Fondu discret à l'apparition des sections */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = $$('.sec');
  if (!reduced && 'IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('fade'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
