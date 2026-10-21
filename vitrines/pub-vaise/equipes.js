/* Couleurs des equipes (couleurs officielles publiques, pas de logos).
   Les couleurs viennent d'ici, jamais du Google Sheet.
   Pour ajouter une equipe : une ligne [ [alias...], [couleurs...] ]. Alias en minuscules, sans accents,
   apostrophes et tirets remplaces par un espace (ex. "cote d ivoire"). Le premier alias trouve gagne.
   La recherche est tolerante : casse, accents, tirets, pluriel simple, prefixes (FC, AS, Olympique, Stade, Real...)
   et suffixes (FC, rugby, club...) sont ignores si le nom exact n'existe pas. */
(function () {
  'use strict';
  var T = [
    // ---- Selections : Europe ----
    [['france', 'equipe de france', 'les bleus', 'xv de france', 'fra'], ['#0055A4', '#FFFFFF', '#EF4135']],
    [['irlande', 'ireland', 'xv du trefle', 'eire'], ['#169B62', '#FFFFFF', '#FF883E']],
    [['ecosse', 'scotland'], ['#0A2A66', '#FFFFFF']],
    [['angleterre', 'england', 'xv de la rose'], ['#FFFFFF', '#CF142B']],
    [['pays de galles', 'galles', 'wales'], ['#C8102E', '#FFFFFF', '#00A651']],
    [['irlande du nord', 'northern ireland'], ['#1B7F3B', '#FFFFFF']],
    [['italie', 'italy', 'squadra azzurra'], ['#0A5CB8', '#FFFFFF']],
    [['espagne', 'spain', 'la roja'], ['#AA151B', '#F1BF00', '#AA151B']],
    [['allemagne', 'germany'], ['#1A1A1A', '#DD0000', '#FFCE00']],
    [['portugal'], ['#046A38', '#DA291C']],
    [['belgique', 'belgium', 'diables rouges'], ['#1A1A1A', '#FDDA24', '#EF3340']],
    [['pays bas', 'hollande', 'netherlands', 'holland'], ['#FF6F00', '#FFFFFF', '#21468B']],
    [['croatie', 'croatia'], ['#C8102E', '#FFFFFF']],
    [['pologne', 'poland'], ['#FFFFFF', '#DC143C']],
    [['russie', 'russia'], ['#FFFFFF', '#0039A6', '#D52B1E']],
    [['norvege', 'norway'], ['#BA0C2F', '#FFFFFF', '#00205B']],
    [['suede', 'sweden'], ['#006AA7', '#FECC00']],
    [['danemark', 'denmark'], ['#C8102E', '#FFFFFF']],
    [['suisse', 'switzerland'], ['#D52B1E', '#FFFFFF']],
    [['autriche', 'austria'], ['#ED2939', '#FFFFFF']],
    [['tchequie', 'republique tcheque', 'czech republic', 'czechia', 'rep tcheque'], ['#D7141A', '#FFFFFF', '#11457E']],
    [['slovaquie', 'slovakia'], ['#FFFFFF', '#0B4EA2', '#EE1C25']],
    [['hongrie', 'hungary'], ['#CE2939', '#FFFFFF', '#477050']],
    [['roumanie', 'romania'], ['#002B7F', '#FCD116', '#CE1126']],
    [['serbie', 'serbia'], ['#C6363C', '#0C4076', '#FFFFFF']],
    [['grece', 'greece'], ['#0D5EAF', '#FFFFFF']],
    [['turquie', 'turkey', 'turkiye'], ['#E30A17', '#FFFFFF']],
    [['ukraine'], ['#FFD500', '#0057B8']],
    [['finlande', 'finland'], ['#FFFFFF', '#003580']],
    [['islande', 'iceland'], ['#02529C', '#FFFFFF', '#DC1E35']],
    [['georgie', 'georgia'], ['#FFFFFF', '#FF0000']],
    [['albanie', 'albania'], ['#E41E20', '#1A1A1A']],
    [['slovenie', 'slovenia'], ['#FFFFFF', '#005DA4', '#ED1C24']],
    [['bulgarie', 'bulgaria'], ['#FFFFFF', '#00966E', '#D62612']],
    [['bosnie', 'bosnie herzegovine', 'bosnia', 'bosnia herzegovina'], ['#002F6C', '#FECB00']],
    [['montenegro'], ['#C40308', '#D4AF37']],
    [['macedoine du nord', 'north macedonia', 'macedoine'], ['#D20000', '#FFE600']],
    [['kosovo'], ['#244AA5', '#D0A650']],
    [['luxembourg'], ['#EF3340', '#FFFFFF', '#00A3E0']],
    [['chypre', 'cyprus'], ['#FFFFFF', '#D57800']],
    [['israel'], ['#FFFFFF', '#0038B8']],
    [['armenie', 'armenia'], ['#D90012', '#0033A0', '#F2A800']],
    [['azerbaidjan', 'azerbaijan'], ['#00B5E2', '#EF3340', '#509E2F']],
    [['bielorussie', 'belarus'], ['#C8313E', '#4AA657']],
    [['lettonie', 'latvia'], ['#9E3039', '#FFFFFF']],
    [['lituanie', 'lithuania'], ['#FDB913', '#006A44', '#C1272D']],
    [['estonie', 'estonia'], ['#0072CE', '#1A1A1A', '#FFFFFF']],
    [['malte', 'malta'], ['#FFFFFF', '#CF142B']],
    [['moldavie', 'moldova'], ['#0046AE', '#FFD200', '#CC092F']],
    [['kazakhstan'], ['#00AFCA', '#FEC50C']],
    // ---- Selections : Afrique ----
    [['afrique du sud', 'afrique', 'south africa', 'springboks', 'boks', 'bafana bafana'], ['#007A4D', '#FFB612']], // "Afrique" seul = Afrique du Sud
    [['cote d ivoire', 'ivory coast', 'les elephants', 'cote divoire'], ['#F77F00', '#FFFFFF', '#009E60']],
    [['cameroun', 'cameroon', 'lions indomptables'], ['#007A5E', '#CE1126', '#FCD116']],
    [['nigeria', 'super eagles'], ['#008751', '#FFFFFF']],
    [['ghana', 'black stars'], ['#CE1126', '#FCD116', '#006B3F']],
    [['egypte', 'egypt', 'pharaons'], ['#CE1126', '#FFFFFF', '#1A1A1A']],
    [['tunisie', 'tunisia', 'aigles de carthage'], ['#E70013', '#FFFFFF']],
    [['maroc', 'morocco', 'lions de l atlas'], ['#C1272D', '#006233']],
    [['algerie', 'algeria', 'fennecs'], ['#006233', '#FFFFFF', '#D21034']],
    [['senegal', 'lions de la teranga'], ['#00853F', '#FDEF42', '#E31B23']],
    [['rd congo', 'r d congo', 'rdc', 'congo rdc', 'congo kinshasa', 'dr congo', 'democratic republic of congo', 'republique democratique du congo', 'leopards'], ['#00A3DD', '#F7D618', '#CE1021']],
    [['congo', 'congo brazzaville'], ['#009543', '#FBDE4A', '#DC241F']],
    [['mali', 'aigles du mali'], ['#14B53A', '#FCD116', '#CE1126']],
    [['burkina faso', 'burkina', 'etalons'], ['#EF2B2D', '#009E49']],
    [['guinee', 'guinea'], ['#CE1126', '#FCD116', '#009460']],
    [['cap vert', 'cape verde', 'cabo verde'], ['#003893', '#FFFFFF', '#CF2027']],
    [['gabon'], ['#009E60', '#FCD116', '#3A75C4']],
    [['angola'], ['#CC092F', '#1A1A1A']],
    [['kenya'], ['#1A1A1A', '#BB0000', '#006600']],
    [['namibie', 'namibia'], ['#003580', '#D21034', '#009543']],
    [['madagascar'], ['#FFFFFF', '#FC3D32', '#007E3A']],
    [['togo'], ['#006A4E', '#FFCE00']],
    [['zimbabwe'], ['#006400', '#FFD200', '#D40000']],
    // ---- Selections : Ameriques ----
    [['argentine', 'argentina', 'albiceleste', 'los pumas', 'pumas'], ['#75AADB', '#FFFFFF']],
    [['bresil', 'brazil', 'selecao'], ['#009C3B', '#FFDF00', '#002776']],
    [['usa', 'etats unis', 'united states', 'america', 'us', 'eagles'], ['#FFFFFF', '#0A3161', '#B31942']],
    [['canada'], ['#D52B1E', '#FFFFFF']],
    [['mexique', 'mexico'], ['#006847', '#FFFFFF', '#CE1126']],
    [['uruguay', 'celeste'], ['#7BAFD4', '#FFFFFF']],
    [['colombie', 'colombia'], ['#FCD116', '#003893', '#CE1126']],
    [['chili', 'chile'], ['#D52B1E', '#FFFFFF', '#0039A6']],
    [['perou', 'peru'], ['#D91023', '#FFFFFF']],
    [['equateur', 'ecuador'], ['#FFDD00', '#034EA2', '#ED1C24']],
    [['paraguay'], ['#D52B1E', '#FFFFFF', '#0038A8']],
    [['costa rica'], ['#002B7F', '#FFFFFF', '#CE1126']],
    [['venezuela'], ['#FFCC00', '#00247D', '#CF142B']],
    [['bolivie', 'bolivia'], ['#D52B1E', '#F9E300', '#007934']],
    [['panama'], ['#DA121A', '#FFFFFF', '#072357']],
    [['jamaique', 'jamaica'], ['#009B3A', '#FED100', '#1A1A1A']],
    [['honduras'], ['#0073CF', '#FFFFFF']],
    [['haiti'], ['#00209F', '#D21034']],
    // ---- Selections : Asie / Oceanie ----
    [['japon', 'japan'], ['#1F3D8C', '#FFFFFF', '#BC002D']],
    [['coree du sud', 'coree', 'south korea', 'korea'], ['#CD2E3A', '#FFFFFF', '#0047A0']],
    [['chine', 'china'], ['#DE2910', '#FFDE00']],
    [['iran'], ['#239F40', '#FFFFFF', '#DA0000']],
    [['arabie saoudite', 'saudi arabia', 'arabie'], ['#006C35', '#FFFFFF']],
    [['australie', 'australia', 'wallabies', 'socceroos'], ['#FFC72C', '#00843D']],
    [['nouvelle zelande', 'new zealand', 'all blacks', 'kiwis'], ['#1A1A1A', '#FFFFFF']],
    [['fidji', 'fiji', 'iles fidji'], ['#FFFFFF', '#68BFE5']],
    [['samoa', 'manu samoa'], ['#CE1126', '#002B7F', '#FFFFFF']],
    [['tonga'], ['#C10000', '#FFFFFF']],
    [['qatar'], ['#8A1538', '#FFFFFF']],
    [['irak', 'iraq'], ['#CE1126', '#FFFFFF', '#1A1A1A']],
    [['ouzbekistan', 'uzbekistan'], ['#1EB53A', '#0099B5', '#FFFFFF']],
    [['inde', 'india'], ['#FF9933', '#FFFFFF', '#138808']],
    [['vietnam'], ['#DA251D', '#FFCD00']],
    [['hong kong'], ['#DE2910', '#FFFFFF']],

    // ---- Ligue 1 ----
    [['psg', 'paris', 'paris sg', 'paris saint germain'], ['#004170', '#DA291C', '#FFFFFF']], // "Paris" seul = PSG (pas Paris FC)
    [['om', 'marseille', 'olympique de marseille', 'olympique marseille'], ['#2FAEE0', '#FFFFFF']],
    [['ol', 'lyon', 'olympique lyonnais', 'olympique de lyon'], ['#FFFFFF', '#1C3F94', '#DA291C']], // "Lyon" = OL ; le rugby = LOU
    [['monaco', 'as monaco', 'asm'], ['#E2001A', '#FFFFFF']],
    [['lille', 'losc', 'lille osc'], ['#E01E13', '#1E2A55']],
    [['nice', 'ogc nice', 'ogcn'], ['#E2001A', '#1A1A1A']],
    [['lens', 'rc lens', 'rcl'], ['#F7C600', '#E2001A']],
    [['rennes', 'stade rennais', 'srfc'], ['#E2001A', '#1A1A1A']],
    [['saint etienne', 'st etienne', 'asse', 'as saint etienne', 'les verts'], ['#00A651', '#FFFFFF']],
    [['nantes', 'fc nantes', 'fcn'], ['#FCD116', '#00A651']],
    [['strasbourg', 'rc strasbourg', 'racing strasbourg', 'rcsa'], ['#009FE3', '#FFFFFF']],
    [['toulouse fc', 'tfc'], ['#5B2C83', '#FFFFFF']], // "Toulouse" seul = Stade Toulousain (rugby)
    [['reims', 'stade de reims'], ['#E2001A', '#FFFFFF']],
    [['montpellier', 'mhsc', 'montpellier herault'], ['#F58220', '#003B7B']], // "Montpellier" seul = foot ; rugby = MHR
    [['brest', 'stade brestois', 'sb29'], ['#E2001A', '#FFFFFF']],
    [['lorient', 'fc lorient'], ['#F58220', '#1A1A1A']],
    [['auxerre', 'aj auxerre', 'aja'], ['#FFFFFF', '#0057A8']],
    [['angers', 'angers sco', 'sco angers', 'sco'], ['#1A1A1A', '#FFFFFF']],
    [['le havre', 'havre', 'hac'], ['#6CB4E4', '#00355F']],
    [['metz', 'fc metz'], ['#7A1F2B', '#FFFFFF']],
    [['bordeaux foot', 'girondins', 'girondins de bordeaux', 'fcgb'], ['#0A2A66', '#FFFFFF']], // "Bordeaux" seul = UBB (rugby)
    [['sochaux', 'fc sochaux'], ['#FCD116', '#003A70']],
    [['guingamp', 'en avant guingamp', 'eag'], ['#E2001A', '#1A1A1A']],
    [['caen', 'sm caen', 'smc'], ['#003A70', '#E2001A']],
    [['paris fc', 'pfc'], ['#003A70', '#FFFFFF']],
    [['clermont foot', 'clermont foot 63'], ['#C8102E', '#00355F']],
    [['dijon', 'dijon fco', 'fco'], ['#E2001A', '#FFFFFF']],
    [['bastia', 'sc bastia', 'scb'], ['#0A4DA2', '#FFFFFF']],
    [['ajaccio', 'ac ajaccio', 'aca'], ['#E2001A', '#FFFFFF']],
    [['troyes', 'estac'], ['#0A4DA2', '#FFFFFF']],
    [['amiens', 'amiens sc'], ['#FFFFFF', '#1A1A1A']],
    [['nimes', 'nimes olympique'], ['#E2001A', '#FFFFFF']],
    [['rodez', 'rodez af'], ['#E2001A', '#FCD116']],
    [['pau fc'], ['#FCD116', '#003A70']], // "Pau" seul = Section Paloise (rugby)
    [['laval', 'stade lavallois'], ['#F58220', '#1A1A1A']],
    [['grenoble foot', 'gf38'], ['#003A70', '#FFFFFF']], // "Grenoble" seul = FC Grenoble (rugby)
    [['annecy', 'fc annecy'], ['#E2001A', '#FFFFFF']],
    [['red star', 'red star fc'], ['#00A651', '#FFFFFF']],
    [['dunkerque', 'usl dunkerque'], ['#0A4DA2', '#E2001A']],
    [['valenciennes', 'vafc'], ['#E2001A', '#FFFFFF']],
    [['quevilly', 'quevilly rouen', 'qrm'], ['#E2001A', '#1A1A1A']],
    [['nancy', 'as nancy', 'asnl'], ['#E2001A', '#FFFFFF']],
    [['le mans', 'le mans fc', 'mans'], ['#FCD116', '#E2001A']],

    // ---- Premier League et Championship ----
    [['manchester united', 'man united', 'man utd', 'united'], ['#DA291C', '#1A1A1A', '#FBE122']], // "United" seul = Man Utd
    [['manchester city', 'man city', 'city'], ['#6CABDD', '#FFFFFF']],
    [['liverpool', 'liverpool fc'], ['#C8102E', '#FFFFFF']],
    [['arsenal'], ['#EF0107', '#FFFFFF']],
    [['chelsea'], ['#034694', '#FFFFFF']],
    [['tottenham', 'spurs', 'tottenham hotspur'], ['#FFFFFF', '#132257']],
    [['newcastle', 'newcastle united'], ['#1A1A1A', '#FFFFFF']], // "Newcastle" = foot (Falcons = rugby)
    [['aston villa', 'villa'], ['#670E36', '#95BFE5']],
    [['brighton', 'brighton hove albion', 'brighton and hove albion'], ['#0057B8', '#FFFFFF']],
    [['brentford'], ['#E30613', '#FFFFFF']],
    [['crystal palace', 'palace'], ['#1B458F', '#C4122E']],
    [['everton'], ['#003399', '#FFFFFF']],
    [['fulham'], ['#FFFFFF', '#1A1A1A']],
    [['west ham', 'west ham united', 'hammers'], ['#7A263A', '#1BB1E7']],
    [['wolves', 'wolverhampton', 'wolverhampton wanderers'], ['#FDB913', '#1A1A1A']],
    [['nottingham forest', 'nottingham', 'forest'], ['#DD0000', '#FFFFFF']],
    [['bournemouth', 'afc bournemouth'], ['#DA291C', '#1A1A1A']],
    [['leeds', 'leeds united'], ['#FFFFFF', '#1D428A', '#FFCD00']],
    [['burnley'], ['#6C1D45', '#99D6EA']],
    [['sunderland'], ['#EB172B', '#FFFFFF']],
    [['leicester', 'leicester city', 'foxes'], ['#003090', '#FDBE11']], // "Leicester" seul = foot ; rugby = Tigers
    [['southampton', 'saints'], ['#D71920', '#FFFFFF']],
    [['ipswich', 'ipswich town'], ['#0044AA', '#FFFFFF']],
    [['sheffield united', 'sheffield utd'], ['#EE2737', '#FFFFFF', '#1A1A1A']],
    [['sheffield wednesday', 'sheffield'], ['#1B4E9B', '#FFFFFF']],
    [['west brom', 'west bromwich', 'west bromwich albion'], ['#122F67', '#FFFFFF']],
    [['norwich', 'norwich city'], ['#FFF200', '#00A650']],
    [['watford'], ['#FBEE23', '#ED2127', '#1A1A1A']],
    [['middlesbrough', 'boro'], ['#E2001A', '#FFFFFF']],
    [['luton', 'luton town'], ['#F78F1E', '#002D62']],
    [['coventry', 'coventry city'], ['#59CBE8', '#FFFFFF']],
    [['stoke', 'stoke city'], ['#E03A3E', '#FFFFFF']],
    [['blackburn', 'blackburn rovers'], ['#009EE0', '#FFFFFF']],
    [['derby', 'derby county'], ['#FFFFFF', '#1A1A1A']],
    [['swansea', 'swansea city'], ['#FFFFFF', '#1A1A1A']],

    // ---- Liga ----
    [['real madrid', 'real', 'madrid'], ['#FFFFFF', '#FEBE10', '#00529F']], // "Real" seul = Real Madrid
    [['barca', 'barcelone', 'barcelona', 'fc barcelone'], ['#A50044', '#004D98', '#EDBB00']],
    [['atletico', 'atletico madrid', 'atletico de madrid'], ['#CB3524', '#FFFFFF', '#272E61']],
    [['valence', 'valencia', 'valencia cf'], ['#FFFFFF', '#1A1A1A', '#F58220']],
    [['seville', 'sevilla', 'fc seville'], ['#FFFFFF', '#D71920']],
    [['villarreal', 'sous marin jaune'], ['#FBE122', '#005DAA']],
    [['bilbao', 'athletic bilbao', 'athletic club', 'athletic'], ['#EE2523', '#FFFFFF', '#1A1A1A']],
    [['real sociedad', 'sociedad', 'la real'], ['#0067B1', '#FFFFFF']],
    [['betis', 'real betis', 'betis seville'], ['#00954C', '#FFFFFF']],
    [['celta vigo', 'celta', 'vigo'], ['#8AC3EE', '#FFFFFF']],
    [['getafe'], ['#005999', '#FFFFFF']],
    [['osasuna'], ['#D91A21', '#0A346F']],
    [['espanyol', 'espanyol barcelone', 'rcd espanyol'], ['#007FC8', '#FFFFFF']],
    [['majorque', 'mallorca', 'real majorque'], ['#E20613', '#1A1A1A']],
    [['rayo vallecano', 'rayo'], ['#FFFFFF', '#E20613']],
    [['alaves', 'deportivo alaves'], ['#0761AF', '#FFFFFF']],
    [['gerone', 'girona', 'girona fc'], ['#E2001A', '#FFFFFF']],
    [['las palmas', 'ud las palmas'], ['#FFE600', '#0054A6']],
    [['levante', 'levante ud'], ['#B5121B', '#003A70']],
    [['elche', 'elche cf'], ['#FFFFFF', '#00873E']],
    [['oviedo', 'real oviedo'], ['#0A4DA2', '#FFFFFF']],
    [['valladolid', 'real valladolid'], ['#5E2A84', '#FFFFFF']],
    [['grenade', 'granada', 'granada cf'], ['#E2001A', '#FFFFFF']],
    [['cadix', 'cadiz', 'cadiz cf'], ['#FCD116', '#0A4DA2']],
    [['deportivo', 'la corogne', 'deportivo la corogne', 'deportivo la coruna'], ['#0A4DA2', '#FFFFFF']],
    [['malaga', 'malaga cf'], ['#4B9CD3', '#FFFFFF']],

    // ---- Serie A ----
    [['juventus', 'juve'], ['#1A1A1A', '#FFFFFF']],
    [['milan', 'ac milan'], ['#FB090B', '#1A1A1A']],
    [['inter', 'inter milan', 'internazionale'], ['#0068A8', '#1A1A1A']],
    [['naples', 'napoli', 'ssc naples'], ['#12A0D7', '#FFFFFF']],
    [['roma', 'as roma', 'rome'], ['#8E1F2F', '#F0BC42']],
    [['lazio', 'lazio rome', 'ss lazio'], ['#87D8F7', '#FFFFFF']],
    [['atalanta', 'atalanta bergame', 'atalanta bergamo'], ['#1E71B8', '#1A1A1A']],
    [['fiorentina', 'florence', 'acf fiorentina'], ['#5B2D8E', '#FFFFFF']],
    [['torino', 'turin'], ['#8B1E2D', '#FFFFFF']],
    [['bologne', 'bologna', 'bologna fc'], ['#A21C26', '#0A2A66']],
    [['genoa', 'genes'], ['#B01E2E', '#0A2A66']],
    [['sampdoria', 'samp'], ['#0A5CB8', '#FFFFFF', '#1A1A1A']],
    [['udinese', 'udine'], ['#1A1A1A', '#FFFFFF']],
    [['sassuolo'], ['#00A651', '#1A1A1A']],
    [['verone', 'verona', 'hellas verone', 'hellas verona'], ['#FCD116', '#0A2A66']],
    [['cagliari'], ['#B01E2E', '#0A2A66']],
    [['lecce', 'us lecce'], ['#FCD116', '#E2001A']],
    [['empoli'], ['#0A5CB8', '#FFFFFF']],
    [['parme', 'parma'], ['#FCD116', '#0A5CB8']],
    [['come', 'como'], ['#0A5CB8', '#FFFFFF']],
    [['monza'], ['#E2001A', '#FFFFFF']],
    [['cremonese', 'cremone'], ['#B01E2E', '#C0C0C0']],
    [['pise', 'pisa'], ['#0A2A66', '#1A1A1A']],
    [['venise', 'venezia', 'venice'], ['#1A1A1A', '#00A651', '#F58220']],
    [['palerme', 'palermo'], ['#F4A6C0', '#1A1A1A']],

    // ---- Bundesliga et Allemagne ----
    [['bayern', 'bayern munich', 'bayern munchen'], ['#DC052D', '#FFFFFF', '#0066B2']],
    [['dortmund', 'borussia dortmund', 'bvb'], ['#FDE100', '#1A1A1A']],
    [['leverkusen', 'bayer leverkusen', 'bayer'], ['#E32219', '#1A1A1A']],
    [['leipzig', 'rb leipzig'], ['#DD0741', '#FFFFFF', '#001F47']],
    [['francfort', 'frankfurt', 'eintracht', 'eintracht francfort', 'eintracht frankfurt'], ['#E1000F', '#1A1A1A']],
    [['stuttgart', 'vfb stuttgart', 'vfb'], ['#FFFFFF', '#E32219']],
    [['gladbach', 'monchengladbach', 'borussia monchengladbach', 'moenchengladbach'], ['#FFFFFF', '#1A1A1A', '#00A650']],
    [['schalke', 'schalke 04'], ['#004D9D', '#FFFFFF']],
    [['wolfsburg', 'vfl wolfsburg'], ['#65B32E', '#FFFFFF']],
    [['breme', 'bremen', 'werder breme', 'werder bremen', 'werder'], ['#1D9053', '#FFFFFF']],
    [['hoffenheim', 'tsg hoffenheim'], ['#1961B5', '#FFFFFF']],
    [['fribourg', 'freiburg', 'sc fribourg', 'sc freiburg'], ['#E2001A', '#1A1A1A']],
    [['mayence', 'mainz', 'mainz 05'], ['#C3141E', '#FFFFFF']],
    [['augsbourg', 'augsburg'], ['#BA3733', '#46714D', '#FFFFFF']],
    [['union berlin'], ['#EB1923', '#FFD700']],
    [['hertha', 'hertha berlin', 'hertha bsc'], ['#005CA9', '#FFFFFF']],
    [['cologne', 'koln', 'fc koln', 'fc cologne'], ['#E2001A', '#FFFFFF']],
    [['hambourg', 'hamburg', 'hsv', 'hambourg sv'], ['#0A5CB8', '#FFFFFF', '#1A1A1A']],
    [['heidenheim'], ['#E2001A', '#0A4DA2']],
    [['bochum', 'vfl bochum'], ['#005CA9', '#FFFFFF']],
    [['darmstadt'], ['#004E9E', '#FFFFFF']],
    [['saint pauli', 'st pauli', 'fc st pauli'], ['#5C3A21', '#FFFFFF']],
    [['dusseldorf', 'fortuna dusseldorf', 'fortuna'], ['#E2001A', '#FFFFFF']],
    [['nuremberg', 'nurnberg'], ['#A5262B', '#1A1A1A']],
    [['hanovre', 'hannover', 'hannover 96'], ['#00A651', '#1A1A1A']],
    [['kaiserslautern'], ['#E2001A', '#FFFFFF']],

    // ---- Autres clubs europeens et mondiaux ----
    [['benfica', 'sl benfica'], ['#E2001A', '#FFFFFF']],
    [['porto', 'fc porto'], ['#003A8F', '#FFFFFF']],
    [['sporting', 'sporting cp', 'sporting lisbonne', 'sporting portugal'], ['#00875A', '#FFFFFF']], // "Sporting" seul = Sporting CP
    [['braga', 'sc braga'], ['#E2001A', '#FFFFFF']],
    [['ajax', 'ajax amsterdam'], ['#D2122E', '#FFFFFF']],
    [['psv', 'psv eindhoven', 'eindhoven'], ['#ED1C24', '#FFFFFF']],
    [['feyenoord', 'feyenoord rotterdam'], ['#E2001A', '#FFFFFF', '#1A1A1A']],
    [['az alkmaar', 'az'], ['#E2001A', '#FFFFFF']],
    [['celtic', 'celtic glasgow'], ['#00A651', '#FFFFFF']],
    [['rangers', 'glasgow rangers'], ['#1B458F', '#FFFFFF', '#E2001A']],
    [['galatasaray', 'gala'], ['#A90432', '#FDB912']],
    [['fenerbahce', 'fener'], ['#FFED00', '#00205B']],
    [['besiktas'], ['#1A1A1A', '#FFFFFF']],
    [['trabzonspor', 'trabzon'], ['#7A1F3D', '#00A3E0']],
    [['anderlecht', 'rsc anderlecht'], ['#5B2C83', '#FFFFFF']],
    [['bruges', 'club bruges', 'brugge'], ['#0A4DA2', '#1A1A1A']],
    [['gand', 'gent', 'kaa gent'], ['#0A4DA2', '#FFFFFF']],
    [['standard de liege', 'standard liege', 'standard'], ['#E2001A', '#FFFFFF']],
    [['union saint gilloise', 'union sg', 'saint gilloise'], ['#FCD116', '#0A4DA2']],
    [['olympiakos', 'olympiacos', 'olympiakos le piree'], ['#E2001A', '#FFFFFF']],
    [['panathinaikos'], ['#00873E', '#FFFFFF']],
    [['aek athenes', 'aek', 'aek athens'], ['#FCD116', '#1A1A1A']],
    [['dynamo kiev', 'dynamo kyiv'], ['#FFFFFF', '#0A4DA2']],
    [['shakhtar', 'shakhtar donetsk', 'chakhtar donetsk'], ['#F58220', '#1A1A1A']],
    [['salzbourg', 'salzburg', 'red bull salzbourg', 'red bull salzburg'], ['#E2001A', '#FFFFFF', '#0A2A66']],
    [['young boys', 'young boys berne', 'bsc young boys'], ['#FCD116', '#1A1A1A']],
    [['bale', 'basel', 'fc bale', 'fc basel'], ['#E2001A', '#0A4DA2']],
    [['copenhague', 'copenhagen', 'fc copenhague'], ['#FFFFFF', '#0A4DA2']],
    [['sparta prague', 'sparta praha'], ['#8E1F2F', '#0A4DA2']],
    [['slavia prague', 'slavia praha'], ['#E2001A', '#FFFFFF']],
    [['etoile rouge', 'etoile rouge de belgrade', 'red star belgrade', 'crvena zvezda'], ['#E2001A', '#FFFFFF']],
    [['dinamo zagreb', 'dynamo zagreb'], ['#0A4DA2', '#FFFFFF']],
    [['hajduk split', 'hajduk'], ['#FFFFFF', '#0A4DA2']],
    [['boca juniors', 'boca'], ['#0A2A66', '#F5C400']],
    [['river plate', 'river'], ['#FFFFFF', '#E2001A']],
    [['flamengo'], ['#E2001A', '#1A1A1A']],
    [['palmeiras'], ['#00873E', '#FFFFFF']],
    [['santos'], ['#FFFFFF', '#1A1A1A']],
    [['inter miami'], ['#F7B5CD', '#1A1A1A']],
    [['la galaxy', 'galaxy'], ['#FFFFFF', '#00245D', '#FFD200']],
    [['al nassr'], ['#FCD116', '#0A2A66']],
    [['al hilal'], ['#0A5CB8', '#FFFFFF']],
    [['al ahly'], ['#E2001A', '#FFFFFF']],

    // ---- Top 14 et Pro D2 ----
    [['lou', 'lou rugby', 'lyon ou', 'lyon olympique universitaire', 'lyon rugby'], ['#C8102E', '#1A1A1A']],
    [['toulouse', 'stade toulousain', 'st toulousain'], ['#DA291C', '#1A1A1A']], // "Toulouse" seul = Stade Toulousain
    [['racing 92', 'racing', 'racing metro', 'racing metro 92', 'r92'], ['#6CB4E4', '#FFFFFF']],
    [['stade francais', 'stade francais paris', 'sfp'], ['#0A2A66', '#E6007E']],
    [['toulon', 'rc toulon', 'rct'], ['#DA291C', '#1A1A1A']],
    [['la rochelle', 'stade rochelais', 'rochelais'], ['#FFE600', '#1A1A1A']],
    [['clermont', 'asm clermont', 'asm', 'clermont auvergne', 'asm clermont auvergne'], ['#FFD100', '#003A70']],
    [['bordeaux begles', 'bordeaux', 'ubb', 'union bordeaux begles'], ['#7A1F3D', '#FFFFFF']], // "Bordeaux" seul = UBB
    [['castres', 'castres olympique', 'co'], ['#0A4DA2', '#FFFFFF']],
    [['montpellier rugby', 'mhr', 'montpellier herault rugby'], ['#0A2A66', '#F5C400']],
    [['bayonne', 'aviron bayonnais', 'bayonne rugby'], ['#0A4DA2', '#FFFFFF']],
    [['pau', 'section paloise', 'pau rugby'], ['#00873E', '#FFFFFF']], // "Pau" seul = Section Paloise
    [['perpignan', 'usap', 'usa perpignan'], ['#E2001A', '#FCD116']],
    [['oyonnax', 'us oyonnax', 'uso'], ['#1A1A1A', '#E2001A']],
    [['grenoble', 'fc grenoble', 'fcg', 'grenoble rugby'], ['#003A70', '#E2001A']],
    [['vannes', 'rc vannes', 'rcv'], ['#E2001A', '#1A1A1A']],
    [['agen', 'sua', 'su agen'], ['#0A2A66', '#FFFFFF']],
    [['brive', 'cab brive', 'cab'], ['#FFFFFF', '#1A1A1A']],
    [['biarritz', 'biarritz olympique', 'bopb'], ['#E2001A', '#FFFFFF']],
    [['colomiers', 'us colomiers'], ['#0A2A66', '#E2001A']],
    [['montauban', 'us montauban'], ['#E2001A', '#1A1A1A']],
    [['beziers', 'as beziers', 'asb'], ['#0A2A66', '#E2001A']],
    [['nevers', 'uson nevers'], ['#E2001A', '#1A1A1A']],
    [['mont de marsan', 'stade montois'], ['#FCD116', '#E2001A']],
    [['aurillac', 'stade aurillacois'], ['#E2001A', '#0A2A66']],

    // ---- Rugby : Irlande, Ecosse, Angleterre, Galles, Italie ----
    [['leinster', 'leinster rugby'], ['#1F3D8C', '#FFFFFF']],
    [['munster', 'munster rugby'], ['#E2001A', '#FFFFFF']],
    [['ulster', 'ulster rugby'], ['#E2001A', '#FFFFFF']],
    [['connacht', 'connacht rugby'], ['#00873E', '#1A1A1A']],
    [['glasgow', 'glasgow warriors', 'warriors'], ['#0A2A66', '#FFFFFF']], // "Glasgow" seul = Warriors (rugby)
    [['edimbourg', 'edinburgh', 'edinburgh rugby'], ['#1A1A1A', '#FFFFFF']],
    [['saracens', 'sarries'], ['#1A1A1A', '#E2001A']],
    [['leicester tigers', 'tigers'], ['#00873E', '#E2001A', '#FFFFFF']],
    [['harlequins', 'quins'], ['#E2001A', '#0A2A66', '#00873E']],
    [['bath', 'bath rugby'], ['#0A4DA2', '#1A1A1A', '#FFFFFF']],
    [['exeter', 'exeter chiefs'], ['#1A1A1A', '#FFFFFF']],
    [['northampton', 'northampton saints'], ['#1A1A1A', '#00873E', '#FCD116']],
    [['sale', 'sale sharks'], ['#0A4DA2', '#FFFFFF']],
    [['gloucester', 'gloucester rugby'], ['#E2001A', '#FFFFFF']],
    [['bristol', 'bristol bears'], ['#0A2A66', '#FFFFFF']],
    [['ospreys', 'osprey'], ['#1A1A1A', '#FFFFFF']],
    [['cardiff', 'cardiff rugby', 'cardiff blues'], ['#0A4DA2', '#1A1A1A']], // "Cardiff" seul = rugby (Cardiff City = bleu aussi)
    [['scarlets', 'llanelli scarlets'], ['#E2001A', '#FFFFFF']],
    [['dragons', 'dragons rfc', 'newport gwent dragons'], ['#E2001A', '#FFFFFF']],
    [['benetton', 'benetton treviso', 'treviso', 'trevise'], ['#00873E', '#FFFFFF']],
    [['zebre', 'zebre parma'], ['#1A1A1A', '#FFFFFF']],
    // ---- Rugby : hemisphere sud ----
    [['crusaders', 'canterbury crusaders'], ['#E2001A', '#1A1A1A']],
    [['auckland blues', 'blues'], ['#0A4DA2', '#FFFFFF']],
    [['chiefs', 'waikato chiefs'], ['#FCD116', '#E2001A', '#1A1A1A']],
    [['hurricanes', 'wellington hurricanes'], ['#FCD116', '#1A1A1A']],
    [['highlanders'], ['#0A2A66', '#FCD116']],
    [['brumbies', 'act brumbies'], ['#0A4DA2', '#FFD100']],
    [['queensland reds', 'reds'], ['#7A1F2B', '#FFFFFF']],
    [['waratahs', 'nsw waratahs'], ['#6CB4E4', '#FFFFFF']],
    [['bulls', 'blue bulls', 'taureaux'], ['#0A2A66', '#FFFFFF']],
    [['stormers', 'western stormers'], ['#0A2A66', '#FFFFFF']],
    [['sharks', 'natal sharks', 'requins'], ['#1A1A1A', '#FFFFFF']],
    [['lions', 'johannesburg lions', 'golden lions'], ['#E2001A', '#FFFFFF']],
    [['cheetahs'], ['#F58220', '#FFFFFF']]
  ];

  var INDEX = {}, COMPACT = {};
  function normName(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  T.forEach(function (e) {
    e[0].forEach(function (a) {
      a = normName(a);
      if (!(a in INDEX)) INDEX[a] = e[1];
      var c = a.replace(/ /g, '');
      if (!(c in COMPACT)) COMPACT[c] = e[1];
    });
  });

  // Mots ignores devant / derriere un nom quand le nom exact n'existe pas.
  var PRE = {}, SUF = {};
  'fc as ac rc sc us ss ssc ca cd ud sv vfl vfb tsg fk sk rcd ogc afc cf olympique stade real club equipe'
    .split(' ').forEach(function (w) { PRE[w] = 1; });
  'fc rugby club sc ac afc cf xv football foot'
    .split(' ').forEach(function (w) { SUF[w] = 1; });

  function lookup(s) {
    if (!s) return null;
    return INDEX[s] || COMPACT[s.replace(/ /g, '')] || null;
  }
  // Singulier / pluriel simples.
  function lookupLoose(s) {
    var r = lookup(s);
    if (r) return r;
    if (s.length > 3 && /[sx]$/.test(s)) { r = lookup(s.slice(0, -1)); if (r) return r; }
    return lookup(s + 's');
  }
  function resolve(n) {
    var r = lookupLoose(n);
    if (r) return r;
    var t = n.split(' '), a = 0, b = t.length;
    while (b - a > 1 && PRE[t[a]]) a++;
    while (b - a > 1 && SUF[t[b - 1]]) b--;
    if (a > 0 || b < t.length) {
      r = lookupLoose(t.slice(a, b).join(' '));
      if (r) return r;
    }
    if (a > 0) { r = lookupLoose(t.slice(a).join(' ')); if (r) return r; }
    if (b < t.length) { r = lookupLoose(t.slice(0, b).join(' ')); if (r) return r; }
    return null;
  }

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

  // Degrade en bandes nettes, a parts egales.
  function gradient(colors) {
    var n = colors.length, parts = colors.map(function (c, i) {
      return c + ' ' + (i * 100 / n).toFixed(3) + '% ' + ((i + 1) * 100 / n).toFixed(3) + '%';
    });
    return 'linear-gradient(90deg, ' + parts.join(', ') + ')';
  }

  window.WallaceTeams = {
    normName: normName,
    find: function (name) { var c = resolve(normName(name)); return c ? c.slice() : null; },
    textFor: textFor,
    gradient: gradient,
    LIGHT: LIGHT, DARK: DARK
  };
})();
