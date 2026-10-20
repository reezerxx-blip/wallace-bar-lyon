(function () {
  var FIN_BAR = { 0: 1470, 1: 1470, 2: 1470, 3: 1470, 4: 1470, 5: 1590, 6: 1590 };
  var OUVERTURE_BAR = 660;
  var CUISINE = {
    std: [[720, 900], [1140, 1320]],
    dim: [[660, 900], [1110, 1320]]
  };
  var JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  function heure(min) {
    var m = min % 1440;
    var h = Math.floor(m / 60);
    var r = m % 60;
    return (h < 10 ? '0' + h : h) + 'h' + (r ? (r < 10 ? '0' + r : r) : '');
  }

  function fenetres(jour) {
    return jour === 0 ? CUISINE.dim : CUISINE.std;
  }

  function statutBar(jour, min) {
    var veille = (jour + 6) % 7;
    if (FIN_BAR[veille] > 1440 && min < FIN_BAR[veille] - 1440) {
      return { ouvert: true, texte: "Ouvert jusqu'à " + heure(FIN_BAR[veille]) };
    }
    if (min >= OUVERTURE_BAR) {
      return { ouvert: true, texte: "Ouvert jusqu'à " + heure(FIN_BAR[jour]) };
    }
    return { ouvert: false, texte: 'Fermé, ouvre à 11h' };
  }

  function statutCuisine(jour, min) {
    var f = fenetres(jour);
    var i;
    for (i = 0; i < f.length; i++) {
      if (min >= f[i][0] && min < f[i][1]) {
        return { ouvert: true, texte: "Cuisine ouverte jusqu'à " + heure(f[i][1]) };
      }
    }
    for (i = 0; i < f.length; i++) {
      if (min < f[i][0]) {
        return { ouvert: false, texte: 'Cuisine fermée, reprend à ' + heure(f[i][0]) };
      }
    }
    var demain = fenetres((jour + 1) % 7)[0][0];
    return { ouvert: false, texte: 'Cuisine fermée, reprend demain à ' + heure(demain) };
  }

  function jourService(jour, min) {
    var veille = (jour + 6) % 7;
    return (FIN_BAR[veille] > 1440 && min < FIN_BAR[veille] - 1440) ? veille : jour;
  }

  function programme(jour, min) {
    var s = 'Sport en direct sur 4 écrans.';
    if (jourService(jour, min) === 1) {
      return (min < 1230 ? 'Quiz ce soir, 20h30. ' : 'Quiz ce soir, depuis 20h30. ') + s;
    }
    return s;
  }

  function statut(jour, min) {
    return { bar: statutBar(jour, min), cuisine: statutCuisine(jour, min), soir: programme(jour, min) };
  }

  function maintenant() {
    var p = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var o = {};
    p.forEach(function (x) { o[x.type] = x.value; });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { jour: map[o.weekday], min: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
  }

  function afficher(jour, min) {
    var s = statut(jour, min);
    var haut = document.getElementById('statut-haut-texte');
    var dot = document.querySelector('#statut-haut .dot');
    var bar = document.getElementById('a-bar');
    var cui = document.getElementById('a-cuisine');
    var soir = document.getElementById('a-soir');
    if (haut) haut.textContent = s.bar.texte;
    if (dot) dot.className = 'dot ' + (s.bar.ouvert ? 'dot--ouvert' : 'dot--ferme');
    if (bar) bar.textContent = s.bar.texte;
    if (cui) cui.textContent = s.cuisine.texte;
    if (soir) soir.textContent = s.soir;
    var lignes = document.querySelectorAll('#jours tbody tr');
    for (var i = 0; i < lignes.length; i++) {
      var actif = (' ' + lignes[i].getAttribute('data-j') + ' ').indexOf(' ' + jourService(jour, min) + ' ') !== -1;
      lignes[i].classList.toggle('est-aujourdhui', actif);
      if (actif) lignes[i].setAttribute('aria-current', 'date');
      else lignes[i].removeAttribute('aria-current');
    }
  }

  window.wallaceStatut = statut;

  function tick() {
    var n = maintenant();
    afficher(n.jour, n.min);
  }
  tick();
  setInterval(tick, 60000);

  var liens = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window && liens.length) {
    var cibles = [];
    for (var i = 0; i < liens.length; i++) {
      var el = document.querySelector(liens[i].getAttribute('href'));
      if (el) cibles.push({ el: el, lien: liens[i] });
    }
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        cibles.forEach(function (c) {
          if (c.el !== e.target) return;
          if (e.isIntersecting) c.lien.setAttribute('aria-current', 'true');
          else c.lien.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    cibles.forEach(function (c) { obs.observe(c.el); });
  }
})();
