/* Couleurs des équipes (couleurs officielles publiques, pas de logos).
   Les couleurs viennent d'ici, jamais du Google Sheet.
   Pour ajouter une équipe : une ligne [ [alias...], [couleurs...] ]. Alias en minuscules, sans accents. */
(function () {
  'use strict';
  var T = [
    // Sélections
    [['france', 'equipe de france', 'les bleus', 'xv de france', 'fra'], ['#0055A4', '#FFFFFF', '#EF4135']],
    [['irlande', 'ireland', 'xv du trefle', 'eire'], ['#169B62', '#FFFFFF', '#FF883E']],
    [['ecosse', 'scotland'], ['#0A2A66', '#FFFFFF']],
    [['angleterre', 'england', 'xv de la rose'], ['#FFFFFF', '#CF142B']],
    [['pays de galles', 'galles', 'wales'], ['#C8102E', '#FFFFFF', '#00A651']],
    [['italie', 'italy', 'squadra azzurra'], ['#0A5CB8', '#FFFFFF']],
    [['espagne', 'spain'], ['#AA151B', '#F1BF00', '#AA151B']],
    [['allemagne', 'germany'], ['#1A1A1A', '#DD0000', '#FFCE00']],
    [['portugal'], ['#046A38', '#DA291C']],
    [['belgique', 'belgium', 'diables rouges'], ['#1A1A1A', '#FDDA24', '#EF3340']],
    [['pays bas', 'hollande', 'netherlands', 'holland'], ['#FF6F00', '#FFFFFF', '#21468B']],
    [['argentine', 'argentina', 'albiceleste'], ['#75AADB', '#FFFFFF']],
    [['bresil', 'brazil', 'selecao'], ['#009C3B', '#FFDF00', '#002776']],
    [['afrique du sud', 'south africa', 'springboks', 'boks'], ['#007A4D', '#FFB612']],
    [['nouvelle zelande', 'new zealand', 'all blacks'], ['#1A1A1A', '#FFFFFF']],
    [['australie', 'australia', 'wallabies'], ['#FFC72C', '#00843D']],
    [['maroc', 'morocco'], ['#C1272D', '#006233']],
    [['algerie', 'algeria'], ['#006233', '#FFFFFF', '#D21034']],
    [['senegal'], ['#00853F', '#FDEF42', '#E31B23']],
    [['croatie', 'croatia'], ['#C8102E', '#FFFFFF']],
    // Ligue 1
    [['psg', 'paris', 'paris sg', 'paris saint germain'], ['#004170', '#DA291C', '#FFFFFF']],
    [['om', 'marseille', 'olympique de marseille', 'olympique marseille'], ['#2FAEE0', '#FFFFFF']],
    [['ol', 'lyon', 'olympique lyonnais', 'olympique de lyon'], ['#FFFFFF', '#1C3F94', '#DA291C']],
    [['monaco', 'as monaco', 'asm'], ['#E2001A', '#FFFFFF']],
    [['lille', 'losc', 'lille osc'], ['#E01E13', '#1E2A55']],
    [['nice', 'ogc nice', 'ogcn'], ['#E2001A', '#1A1A1A']],
    [['lens', 'rc lens', 'rcl'], ['#F7C600', '#E2001A']],
    [['rennes', 'stade rennais', 'srfc'], ['#E2001A', '#1A1A1A']],
    [['saint etienne', 'st etienne', 'asse', 'as saint etienne', 'les verts'], ['#00A651', '#FFFFFF']],
    [['nantes', 'fc nantes', 'fcn'], ['#FCD116', '#00A651']],
    [['strasbourg', 'rc strasbourg', 'racing strasbourg', 'rcsa'], ['#009FE3', '#FFFFFF']],
    [['toulouse fc', 'tfc'], ['#5B2C83', '#FFFFFF']],
    // Premier League
    [['manchester united', 'man united', 'man utd', 'united'], ['#DA291C', '#1A1A1A', '#FBE122']],
    [['manchester city', 'man city', 'city'], ['#6CABDD', '#FFFFFF']],
    [['liverpool', 'liverpool fc'], ['#C8102E', '#FFFFFF']],
    [['arsenal'], ['#EF0107', '#FFFFFF']],
    [['chelsea'], ['#034694', '#FFFFFF']],
    [['tottenham', 'spurs'], ['#FFFFFF', '#132257']],
    [['newcastle', 'newcastle united'], ['#1A1A1A', '#FFFFFF']],
    // Liga
    [['real madrid', 'real', 'madrid'], ['#FFFFFF', '#FEBE10', '#00529F']],
    [['barca', 'barcelone', 'barcelona', 'fc barcelone'], ['#A50044', '#004D98', '#EDBB00']],
    [['atletico', 'atletico madrid', 'atletico de madrid'], ['#CB3524', '#FFFFFF', '#272E61']],
    // Serie A et Bundesliga
    [['juventus', 'juve'], ['#1A1A1A', '#FFFFFF']],
    [['milan', 'ac milan'], ['#FB090B', '#1A1A1A']],
    [['inter', 'inter milan', 'internazionale'], ['#0068A8', '#1A1A1A']],
    [['naples', 'napoli', 'ssc naples'], ['#12A0D7', '#FFFFFF']],
    [['bayern', 'bayern munich', 'bayern munchen'], ['#DC052D', '#FFFFFF', '#0066B2']],
    [['dortmund', 'borussia dortmund', 'bvb'], ['#FDE100', '#1A1A1A']],
    // Top 14
    [['lou', 'lou rugby', 'lyon ou', 'lyon olympique universitaire'], ['#C8102E', '#1A1A1A']],
    [['toulouse', 'stade toulousain', 'st toulousain'], ['#DA291C', '#1A1A1A']],
    [['racing 92', 'racing', 'racing metro'], ['#6CB4E4', '#FFFFFF']],
    [['stade francais', 'stade francais paris'], ['#0A2A66', '#E6007E']],
    [['toulon', 'rc toulon', 'rct'], ['#DA291C', '#1A1A1A']],
    [['la rochelle', 'stade rochelais'], ['#FFE600', '#1A1A1A']],
    [['clermont', 'asm clermont', 'asm'], ['#FFD100', '#003A70']],
    [['bordeaux begles', 'bordeaux', 'ubb', 'union bordeaux begles'], ['#7A1F3D', '#FFFFFF']]
  ];

  var INDEX = {};
  function normName(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  T.forEach(function (e) { e[0].forEach(function (a) { if (!(a in INDEX)) INDEX[a] = e[1]; }); });

  function lum(hex) {
    var n = parseInt(hex.slice(1), 16), c = [n >> 16 & 255, n >> 8 & 255, n & 255].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  var LIGHT = '#FFFFFF', DARK = '#1A1A1A';
  // Texte clair ou sombre lisible (AA, 4.5:1) sur toutes les bandes ; sinon null (le rendu met une pastille).
  function textFor(colors) {
    var l = Math.min.apply(null, colors.map(function (c) { return ratio(LIGHT, c); }));
    var d = Math.min.apply(null, colors.map(function (c) { return ratio(DARK, c); }));
    if (l >= 4.5 && l >= d) return LIGHT;
    if (d >= 4.5) return DARK;
    return l >= 4.5 ? LIGHT : null;
  }

  // Dégradé en bandes nettes, à parts égales.
  function gradient(colors) {
    var n = colors.length, parts = colors.map(function (c, i) {
      return c + ' ' + (i * 100 / n).toFixed(3) + '% ' + ((i + 1) * 100 / n).toFixed(3) + '%';
    });
    return 'linear-gradient(90deg, ' + parts.join(', ') + ')';
  }

  window.WallaceTeams = {
    normName: normName,
    find: function (name) { var c = INDEX[normName(name)]; return c ? c.slice() : null; },
    textFor: textFor,
    gradient: gradient,
    LIGHT: LIGHT, DARK: DARK
  };
})();
