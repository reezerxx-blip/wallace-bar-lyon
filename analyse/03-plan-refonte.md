# Plan de refonte : Wallace Bar Lyon (pub/ amélioré, bar/ refait)

Sources : `analyse/01-critique.md`, `analyse/02-references.md`, `PLAN-ANTI-IA.md` §1 (seule source de contenu). Aucun fichier du site n'est modifié par ce document.

Règle d'or : toute information absente de PLAN-ANTI-IA §1 n'est pas écrite. Quand elle manque, une zone « à venir » honnête la remplace (voir §3).

---

## 1. Diagnostic et décisions

### 1.1 Diagnostic en 6 lignes
- pub/ (6,5/10) : bonne voix (enseigne, ardoise, affiche), mais hero sans image, effet « sticker » répété (ombre dure + rotation + punaise partout), whisky et bière maison maigres, presse en 4 cartouches, sport rempli de « à confirmer ».
- bar/ (3,5/10) : colonne de 640 px, titre de 40 px, logo de 28 px, palette librairie, bière réduite à 4 noms, whisky à une ligne, aucun bouton. Sobre n'est pas vide : il faut du contenu, de l'image et des moments forts.
- Le client veut trois piliers : **whisky, bière brassée maison, restauration (midi, soir, brunch week-end)**, plus sport et événements. Les deux sites actuels les traitent en légendes.
- Contrainte forte : photos officielles petites (280 à 1224 px de large natifs), pas de photo IA, pas de stock, pas de faits inventés.
- Les deux versions doivent être **vraiment différentes** : pas deux thèmes du même squelette.

### 1.2 Décision par version

| | **pub/ (version préférée, améliorée)** | **bar/ (refaite de zéro)** |
|---|---|---|
| Direction | **Fusion A + B : « Ardoise & affiche de match »** | **C : « Brasserie & étiquettes »**, enrichie d'un carnet de dégustation whisky |
| Intention | Le pub bruyant et sportif : enseigne, ardoise de comptoir, affiche de match. Fonds sombres et colorés, capitales géantes. | La brasserie-distillerie de quartier : étiquettes de fût, cahier de brassage, carnet de whisky. Fond clair kraft, calme, dense en contenu. |
| Ambiance | Nuit de match, voix haute | Après-midi de dégustation, voix posée |
| Pourquoi | Cohérent avec le positionnement officiel (pub vivant et sportif), déjà préféré par le client, on corrige l'exécution au lieu de repartir. | La plus éloignée de pub/ (clair vs sombre, grotesque arrondie vs capitales condensées, étiquettes vs ardoise). Met la bière maison et le whisky au centre, ce qui répare le plus gros défaut de bar/. Sobre par la palette et le calme, riche par la matière (étiquettes, carnet, mosaïques). |
| Rejeté | A seule (trop proche du pub/ actuel), B seule (le sport domine, or le client demande bière, whisky, cuisine). | A ou B (ressembleraient à pub/). Palette papier + bordeaux actuelle de bar/. |

### 1.3 Palettes (hex, contrastes à vérifier par script, AA 4,5:1 texte)

**pub/** (3 dominantes + 1 accent, pas de #000 ni #fff) :
| Rôle | Hex |
|---|---|
| Vert bouteille (fond hero, sections) | `#1F4D3A` |
| Ardoise (carte, aujourd'hui) | `#2A2F2C` |
| Bleu écossais (sport) | `#18325E` |
| Rouge tartan (accent, pastilles) | `#A3322B` (texte sur papier : 5,7:1) |
| Papier (texte clair, fond doux) | `#F1EADB` |
| Craie (accent unique sur ardoise) | `#E8C547` |
| Bois (cadre ardoise, bandeau whisky) | `#5A3B22`, à ajuster sur la photo du logo |
Le rouge plein en pleine page est limité à une section courte (la presse devient bleue ou papier).

**bar/** :
| Rôle | Hex |
|---|---|
| Blanc cassé (fond principal) | `#F7F3EA` |
| Kraft (étiquettes, bandes) | `#D8C7A3` |
| Vert houblon (titres, accent bière) | `#4F6B2E` (sur `#F7F3EA` : 5,5:1) |
| Bleu brasserie (section whisky, pied) | `#1C3A4F` (le `#274B63` du rapport est assombri pour porter du texte kraft) |
| Encre (texte) | `#26231E` |
| Accent orange brûlé, rare | fond/filets `#C4602A` ; **texte** seulement en `#A9501F` (5,0:1), car `#C4602A` sur crème n'a que 3,8:1 |
Pas de noir + or, pas de dégradé lumineux. Une couleur d'aplat par bière maison (houblon, bleu, kraft foncé, orange) comme chez Cloudwater.

### 1.4 Polices (Google Fonts, hors liste interdite : Fraunces, DM Sans, Inter, Roboto, JetBrains Mono, tout mono)

| | pub/ | bar/ |
|---|---|---|
| Titres | **Archivo** (width 62-75, graisse 800-900, capitales) | **Bricolage Grotesque** 700, casse mixte, arrondie et chaleureuse |
| Texte | **Public Sans** 400/600 | **Hanken Grotesk** 400/600 |
| Citations presse | **Newsreader** | **Newsreader** (italique autorisé ici, citations seulement) |
| Chiffres | `font-variant-numeric: tabular-nums` partout (prix, heures, ABV) | idem |
Échelle commune : 14 / 16 / 20 / 32 / 56 / 96 px. Titres line-height 1,0 à 1,1, texte 1,5. Aucun italique décoratif sur un mot. Maximum 2 familles par page + Newsreader.

### 1.5 Ton rédactionnel

| | pub/ | bar/ |
|---|---|---|
| Voix | Parlée, humour de comptoir, phrases de 3 à 8 mots, anglais/français comme sur le site officiel | Précise, descriptive, curieuse, sans pompe |
| Exemple | « Quiz le lundi, 20h30. Le plus grand de Lyon. Verres gratuits à gagner. » | « Quatre bières brassées au Wallace : Wallace IPA, Double IPA, Lager, NEIPA. » |
| Interdit commun | Triades, antithèses, slogans, adjectifs creux (« unique », « authentique »), tirets longs, chiffres inventés, « depuis 2005 », « 200 whiskies », noms de cocktails ou de whiskies |

### 1.6 Contraintes photos (valables pour les deux)
- **Jamais afficher une photo à plus que sa largeur native** (en px CSS, DPR 1). Un script du juge contrôle `renderedWidth <= naturalWidth`.
- Hero plein écran en photo unique : interdit. Alternatives : demi-écran (une photo de 720 px à 50 % de 1440 px passe 1:1), mosaïque de 3 photos, ou photo cadrée avec grand titre à côté.
- Pas de flou, grain, lueur, duotone sur nourriture. Voile sombre léger autorisé sur 1 photo décorative maximum.
- Alt réels et descriptifs. Légende de type presse (« St Patrick 2019 ») quand la date est connue par le nom de fichier.
- Photos affichant des affiches publicitaires (16 pressions, montages concerts, quiz) : à présenter comme des **affiches**, avec une légende « Affiche du bar », jamais comme photo d'ambiance.
- Dérivés webp : créés dans `pub/img/` et `bar/img/` (une copie par site), sources lues dans `assets/img/real/` (jamais modifiées).

---

## 2. Structure détaillée

Contenu officiel de référence pour les deux : adresse 2 Rue Octavio Mey, 69005 Lyon, Vieux-Lyon, bord de Saône ; 04 72 00 23 91 ; wallacelyon@wanadoo.fr ; Facebook https://www.facebook.com/wallace.bar.9. Bar : 11h-00h30 dim-jeu, 11h-02h30 ven-sam. Cuisine : lun-sam 12h-15h et 19h-22h, dim 11h-15h et 18h30-22h. Le fichier unique de données (étape E0) alimente les deux sites ; les prix et horaires ne sont jamais retapés à la main sans passer par un contrôle de diff.

### 2.1 Composants communs (spécifiés une fois, habillés différemment)

**C1. « Aujourd'hui »** (barre/bandeau en haut de page)
- Ouvert / fermé calculé par JS à l'heure de Lyon (`Europe/Paris`) à partir des horaires bar officiels, en tenant compte de la fermeture après minuit (dim-jeu jusqu'à 00h30, ven-sam jusqu'à 02h30). Texte : « Ouvert jusqu'à 00h30 » / « Fermé, ouvre à 11h ». Fallback sans JS : tableau d'horaires lisible.
- Cuisine ouverte ou non (créneaux officiels), affiché à part.
- Selon le jour : **lundi** → « Quiz ce soir, 20h30 » (officiel) ; **lun-ven** → « Plat du jour au déjeuner » (le contenu du plat n'est pas fourni : « à l'ardoise ») ; **tous les jours** → « Sport sur 4 écrans ».
- Ligne « Match ce soir » : alimentée par `data/aujourdhui.json` que le patron remplit ; si le fichier est vide ou absent, la ligne n'est pas affichée (pas de « à confirmer »).

**C2. Liste whisky navigable (« Wee whisky list »)**
- Trois onglets ARIA (`role=tablist`) : **Écosse / Irlande / Monde**, plus un quatrième bloc « Whisky Club ». Flèches clavier, focus visible, cibles 44 px, fonctionne sans JS (3 sections empilées).
- Données dans `data/whisky.json` : `{ "ecosse": [], "irlande": [], "monde": [] }`, chaque entrée `{nom, region, prix, note}` avec `note` facultatif. **Les tableaux sont vides tant que le patron n'a rien fourni. Aucune bouteille inventée, aucun exemple.**
- État vide (honnête, voir §3) : « La liste complète arrive bientôt. En attendant, demandez la carte au comptoir. » + bouton Appeler.
- Texte officiel seul : « Wee whisky list : Écosse, Irlande, monde. » + Whisky Club (l'existence, sans date ni fréquence).

**C3. Tableau bières**
- **Les 4 maison** (Wallace IPA, Double IPA, Lager, NEIPA) : nom ; style = ce que le nom dit (IPA, double IPA, lager, NEIPA) ; ABV et description = champs `abv`, `note` de `data/bieres.json`, **affichés seulement s'ils sont remplis** (sinon ligne « ABV : à venir » en gris discret, jamais un chiffre inventé).
- **16 pressions** : « 16 pressions, dont Brewdog, Guinness, Galway Bay, La Chouffe, Lagunitas. » Le tableau liste uniquement ces 5 noms officiels, plus une ligne « Les autres pressions changent : demandez au comptoir » (pas de nombre « 11 autres »). Un champ `en_ce_moment` (vide par défaut) permet au patron d'afficher la rotation.
- Bouteilles, canettes (mention officielle, sans noms). Sans alcool : **Punk AF, Guinness 0.0**. Gins Fever-Tree à +2 €. Vins (mention).

**C4. Carte midi / soir / brunch**
- Une carte unique sur trois onglets d'horaires (midi, soir, brunch week-end). Les données officielles ne séparent pas midi et soir : les onglets **midi** et **soir** affichent la même carte complète avec l'horaire de cuisine correspondant (12h-15h / 19h-22h ; dim 11h-15h / 18h30-22h) et la mention « Plat du jour midi lun-ven » sur midi uniquement.
- Onglet **brunch** : horaires et carte non fournis. Seul fait : la cuisine ouvre à 11h le dimanche, et la presse parle d'un « brunch british ». Contenu affiché : « Brunch british le week-end. Carte et horaires à venir. » (voir §3). Pas de prix, pas de plat.
- Prix officiels : Fish & Chips 18 € ; Wallace Burger bœuf 18 / poulet 16 / fish 17 / veggie 16 ; Double Burger 22 ; Haggis Burger 20 ; Pulled Pork 16 ; Club 16 ; Wings 10 ; Sliders 11 ; Loaded Fries 8-11 ; Saumon confit 18 ; Tartare 18 ; Cobb 15 ; Buddha Bowl 15 ; Poke saumon 18 ; Salmorejo 13 ; menu enfant 9 ; desserts maison ; planches (sans prix, prix « sur demande » non écrit : ligne sans prix).
- Plats vedettes mis en avant : Fish & Chips (photo `food-slider-fish-and-chips`) et Wallace Burger.
- Texte de carte en vraies lignes de texte (copiable), jamais image.

**C5. Sport et événements**
- Sport : « Tous les grands sports en direct sur 4 écrans. Rugby, football, darts. » (liste officielle de l'accroche).
- Événements : Quiz du lundi 20h30 (« le plus grand de Lyon », verres gratuits) ; Wallace Craft Beer ; Wallace on Tour (concours photo) ; concerts réguliers (Fête de la Musique) ; Whisky Club.
- **Aucune ligne « à confirmer »** sur les pages : un événement sans horaire officiel est affiché sans horaire.

**C6. Presse**
- Vidéo virale du Mondial féminin 2019 relayée par Rolling Stone, USA Today, Fox News, The Guardian ; puis Le Progrès, ExitMag, Spot Web, Découvrir Auvergne-Rhône-Alpes, brunch british. Photo : `wallace-bar-lyon-womens-world-cup-2019...jpg`.
- Pas de citation inventée. Les citations réelles arrivent avec les URLs d'articles (voir §3).

**C7. Infos pratiques** : tableaux horaires bar + cuisine, adresse, téléphone `tel:`, courriel `mailto:`, itinéraire (lien OpenStreetMap ou Google Maps), Facebook réel. Mention fixe : « Maquette non officielle, photos du site wallacebarlyon.com utilisées en attente de l'accord du patron. »

### 2.2 Version pub/ : « Ardoise & affiche de match »

Principe : **un seul traitement de photo** (cadre papier simple, pas de punaise ni de rotation) ; la rotation est réservée à 1 élément par page (la pastille « PUB »). Ombre unique et sobre : `0 2px 0 rgba(0,0,0,.25)` en référence. Tartan : motif SVG tissé (vrai croisement de bandes) à la place du dégradé plat, utilisé 2 fois (haut du hero et pied).

| # | Section | Fond | Contenu et composition | Photos |
|---|---|---|---|---|
| 0 | En-tête collant | papier | Logo officiel 56 px de haut, nav (Bière, Whisky, Carte, Sport, Presse, Infos), statut C1 court, bouton **Appeler** | logo |
| 1 | **Hero** | vert `#1F4D3A` | Moitié gauche : « EVERYDAY PUB » (Archivo 96 px, pastille rouge sur PUB), ligne d'accroche officielle abrégée (« Fish & chips, burgers, sport, bière maison, whisky »), boutons Appeler + Itinéraire visibles au 1er écran. Moitié droite : **grande photo sport/écrans pleine hauteur à 50 % de la largeur** (1:1 avec sa résolution native) | `wallace-lyon-football-rugby...2020`, repli `2019-six-nations` |
| 2 | **Aujourd'hui** | ardoise, cadre bois | C1 écrit à la craie (Archivo, craie jaune `#E8C547`) : ouvert, cuisine, quiz du lundi, plat du jour midi lun-ven | aucune |
| 3 | **Bières** (titre « BIÈRE MAISON ») | papier | Intro d'une phrase : « Le Wallace brasse sa propre bière. » Tableau C3 en lignes de tableau de scores : 4 maison en grand (nom 56 px, style à droite), pressions en colonnes. Bande de **3 photos** alignées sans rotation : visite brasserie 01, 05, `drinks01`. L'affiche « 16 pressions » à part en légende « Affiche du bar » | brewery visit 01/05, drinks01/02, affiche 16 beers |
| 4 | **Whisky** | bois `#5A3B22` | Titre « WEE WHISKY LIST ». C2 en onglets craie sur panneau ardoise. À gauche, photo whisky recadrée (réduire la surexposition par recadrage, pas par filtre). Bloc « Whisky Club » en pastille | photo whisky existante (à choisir par E1 après revue) |
| 5 | **Carte** | ardoise | C4 sur ardoise 2 colonnes à 1440 px, prix alignés en points de conduite, onglets Midi / Soir / Brunch. Fish & Chips en bandeau-vedette avec sa photo à taille native | fish & chips, cobb, fish salad, cheesecake (vignettes 280-320 px) |
| 6 | **Sport** | bleu écossais `#18325E` | Bloc de scores « 4 ÉCRANS » (chiffre en 150 px), liste des sports (rugby, football, darts), ligne « Match ce soir » si renseignée | photo écrans (autre que le hero), six nations |
| 7 | **Événements** | papier | Tableau calendrier : Lundi 20h30 QUIZ en tête, puis Craft Beer, Wallace on Tour, Concerts, Whisky Club (sans heure) | quiz, concert, events 1 à 4 en mosaïque 3 x 2 sans marge |
| 8 | **Presse** | papier (le rouge plein est supprimé) | **Un bloc unique** : la photo du bar pendant le Mondial 2019, grand titre « La vidéo qui a fait le tour du monde » reformulé factuellement (« Mondial féminin 2019 : la vidéo du Wallace relayée par Rolling Stone, USA Today, Fox News, The Guardian »), puis ligne secondaire Le Progrès, ExitMag, etc. | photo viral |
| 9 | **Infos** | vert | C7, tableaux horaires, Facebook, bouton Appeler | aucune ou façade si fournie |
| 10 | Pied | ardoise | Mention « maquette non officielle », liens | |

Éléments tangibles non-IA : ardoise avec cadre bois (texture bois en vrai CSS, pas d'image IA), craie jaune, pastille de prix, sous-bock rond en SVG pour « 4 écrans », ticket de pression pour les horaires, tampon « OUVERT » vectoriel, motif tartan tissé en SVG.

Petites photos : bandes de 3, vignettes de 280-320 px sur l'ardoise, cadre papier de 6 px, légende de presse ; chiffres géants (16, 4, 20h30) pour tenir la page quand l'image est faible.

Micro-interactions (2 maximum, toutes utiles) :
1. Onglets Écosse / Irlande / Monde et Midi / Soir / Brunch : changement de panneau en 150 ms, état conservé dans le hash.
2. Statut ouvert/fermé en direct dans l'en-tête, mis à jour chaque minute.
Pas d'autre animation de scroll. `prefers-reduced-motion` coupe le fondu.

Mobile (375 px) : hero en une colonne **photo d'abord** (hauteur 40 vh), titre 56 px, deux boutons pleine largeur ; dock bas Appeler / Itinéraire conservé ; ardoise en une colonne ; onglets défilables avec indices de bord ; calendrier événements en grille 2 colonnes.

### 2.3 Version bar/ : « Brasserie & étiquettes » (refonte complète)

Principe : conteneur large (1200 à 1280 px) et grille de 12 colonnes ; **aucune section sans image ni objet visuel** ; titres 56 à 96 px ; rythme de fonds clair / kraft / bleu pour créer des moments forts. Étiquettes de bière dessinées en SVG à la main (rectangles à coins arrondis, nom en Bricolage, aplat de couleur par bière, tampon « Brassé au Wallace »). Rayon unique : 8 px. Une icône famille (via iconify, set unique, SVG inline) : téléphone, itinéraire, horloge, écran.

| # | Section | Fond | Contenu et composition | Photos |
|---|---|---|---|---|
| 0 | En-tête | blanc cassé | Logo 56 px, nav, statut C1, bouton Appeler (plein, houblon) | logo |
| 1 | **Hero** | blanc cassé | Gauche : H1 descriptif « Bière brassée maison, whisky, cuisine de pub », sous-titre « Pub du Vieux-Lyon, au bord de la Saône », Appeler + Itinéraire. Droite : **mosaïque de 3 photos** (une grande, deux petites) en cadre blanc. Dessous : **frise des 4 étiquettes** SVG (Wallace IPA, Double IPA, Lager, NEIPA) alignées | brewery visit 01/05, drinks01 |
| 2 | **Aujourd'hui** | kraft | Bandeau pleine largeur : ouvert/fermé, cuisine, quiz si lundi, plat du jour midi lun-ven, match ce soir si renseigné ; style « carnet » (fiche cartonnée) | aucune |
| 3 | **Brasserie** (« Nos bières ») | blanc cassé | Deux colonnes : fiche par bière (étiquette à gauche, texte à droite, ABV/note seulement si fournis). Bande de 3 photos de la visite de brasserie. Puis tableau des pressions (C3), bouteilles, canettes, sans alcool | brewery visit 01/05, drinks01/02, brewdog, affiche 16 beers |
| 4 | **Whisky** | bleu brasserie `#1C3A4F`, texte kraft et blanc cassé | « Le carnet de dégustation » : C2 présenté comme pages d'un carnet (3 onglets + page « Whisky Club »), à côté d'une photo recadrée et d'une grande carte de la région (silhouette Écosse/Irlande/monde vectorielle simple, non cliquable décoration) qui s'illumine avec l'onglet actif ; état vide honnête en attendant la liste | photo whisky choisie par E1 |
| 5 | **Cuisine** (« À table ») | blanc cassé | Plat vedette Fish & Chips en grand (photo + prix) ; carte C4 en deux colonnes à points de conduite ; onglets Midi / Soir / Brunch, chaque onglet commence par ses horaires de cuisine ; bloc Brunch en carte kraft « À venir » | fish & chips, cobb, fish salad, cheesecake |
| 6 | **Sport et soirées** (« La semaine au Wallace ») | kraft | **Semaine en 7 colonnes** (lundi : Quiz 20h30 ; autres jours : « Sport sur 4 écrans » ; événements sans jour fixé listés sous la grille : Craft Beer, Wallace on Tour, concerts, Whisky Club). Photo écrans + photo quiz + photo concert en trio | sport, quiz, concert, events 1 à 4 |
| 7 | **Presse** | blanc cassé | Grand bloc éditorial : photo Mondial 2019 à gauche, texte à droite, noms des quatre médias en Newsreader (pas de logos), liens fournis par le patron ensuite ; ligne Le Progrès, ExitMag, Spot Web, Découvrir AURA, brunch british | photo viral |
| 8 | **Infos** | bleu | Horaires bar + cuisine en deux tableaux, adresse, plan (iframe OpenStreetMap chargé au clic pour ne pas charger de tiers par défaut), Appeler, Itinéraire, Facebook | façade si fournie |
| 9 | Pied | bleu | « Maquette non officielle », liens | |

Éléments tangibles non-IA : étiquettes SVG avec tampon « lot » (sans numéro de lot inventé : le tampon dit « Brassé au Wallace »), cadre blanc type Polaroid unique pour toutes les photos, fiches cartonnées kraft, carnet à reliure pour le whisky, bouchons et sous-bocks en pictos vectoriels.

Petites photos : mosaïques serrées de 3, recadrage de détails (cuves, robinets, assiette), jamais plus de 2 colonnes de large pour une image de 280 px, étiquettes et chiffres comme substitut d'image.

Micro-interactions (2 maximum) :
1. Carnet whisky : changement de page (onglets) avec fondu 150 ms, la carte de région suit l'onglet.
2. Nav collante avec soulignement de la section active (observer d'intersection), sans effet de défilement.
`prefers-reduced-motion` respecté.

Mobile (375 px) : hero image d'abord (la mosaïque devient une photo + deux vignettes), étiquettes en défilement horizontal avec arrêt de scroll, semaine en liste verticale par jour, carnet whisky en onglets défilables, dock bas Appeler / Itinéraire.

### 2.4 Pourquoi elles ne se ressemblent pas

| Critère | pub/ | bar/ |
|---|---|---|
| Fond dominant | sombre et saturé (vert, ardoise, bleu) | clair (blanc cassé, kraft), une seule section sombre |
| Titres | capitales condensées 800-900 | casse mixte arrondie 700 |
| Objet signature | ardoise et affiche | étiquette et carnet |
| Photos | cadre papier + chiffres géants | mosaïques Polaroid + étiquettes |
| Hero | split, photo droite pleine hauteur | texte + mosaïque + frise d'étiquettes |
| Rythme | contrastes de fond, bruyant | aération + matière, calme |
| Sport | scores géants | grille de la semaine |

---

## 3. Ce que le patron doit fournir, et comment le site attend

| # | À fournir | Pourquoi | Emplacement en attendant (texte honnête, jamais de faux contenu) |
|---|---|---|---|
| 1 | **Liste whisky** (nom, région, prix, une note facultative) par Écosse / Irlande / monde, et ce qu'est le Whisky Club (jour, fréquence) | Remplit C2 | « La liste complète arrive bientôt. En attendant, demandez la carte au comptoir. » + Appeler |
| 2 | **Bières maison** : ABV, style précis, une phrase par bière, tirées-ce-mois-ci | Fiches C3 | Nom + style du nom ; « ABV : à venir » discret |
| 3 | **Pressions du moment** (16) | Tableau C3 | Les 5 marques officielles + « demandez au comptoir » |
| 4 | **Brunch week-end** : jours, horaires, carte, prix | Onglet brunch | « Brunch british le week-end. Carte et horaires à venir. » |
| 5 | **Midi / soir** : une carte différente ? plat du jour du moment | C4 / C1 | Carte unique ; « Plat du jour à l'ardoise » |
| 6 | **Calendrier sport** (matchs de la semaine) | « Match ce soir » | Ligne cachée si vide ; « Sport sur 4 écrans » |
| 7 | Horaires réels de Craft Beer, Wallace on Tour, concerts, Whisky Club | Événements | Nom seul, sans horaire |
| 8 | **10 à 15 photos récentes** ≥ 1600 px : comptoir, pressions, fish & chips, burger, écrans un soir de match, brunch, whisky étagère, cuves, façade | Photos trop petites | Photos officielles en maquette, légende « Photo provisoire » dans le code (pas à l'écran) ; accord du patron requis |
| 9 | **Accord écrit** pour l'usage des photos de wallacebarlyon.com | Droits | Mention « maquette non officielle » en pied |
| 10 | **URL des articles de presse** + 1 citation par média | C6 | Noms de médias sans citation ni lien |
| 11 | Logo vectoriel (SVG) | Logo net à 56 px | `wallacebarlogo.png` |
| 12 | Nom de domaine, e-mail de réservation, outil de réservation éventuel | Bouton « Réserver » | Boutons Appeler / courriel uniquement |
| 13 | Photo de façade et du cadre (bord de Saône) | Infos / confiance | Pas d'image ; texte d'adresse |

Les champs en attente sont dans `data/*.json` de chaque site : le patron (ou le développeur) remplit, aucun code à changer. Une page `/a-fournir.md` n'est pas publiée ; la liste est dans ce document et dans le message au client.

---

## 4. Plan d'exécution multi-agents

Règles : max 2 agents en parallèle ; **jamais deux agents sur les mêmes fichiers** (pub/ et bar/ sont deux périmètres disjoints ; `assets/img/real/` et `PLAN-ANTI-IA.md` sont en lecture seule) ; Sonnet par défaut ; Opus seulement avec raison écrite dans le brief ; branche git `refonte/anti-ia-2-versions` ; un commit par étape validée ; serveurs de test : `python -m http.server 8081` (pub/) et `8082` (bar/) ; captures dans `analyse/captures/<etape>/<site>-<1440|768|375>.png` ; chaque juge écrit un seul fichier `analyse/juge-<etape>-<site>.md`.

Seuil de passage : **≥ 8/10 pondéré et aucun critère rédhibitoire (§5.2) échoué**. Sinon itération par le même agent de dev (max 3 boucles par étape) ; au-delà, escalade au directeur de projet.

| Étape | Agent (modèle) | Fichiers en écriture | Livrable | Critères d'acceptation mesurables |
|---|---|---|---|---|
| **E0 Données et photos** | A0 « Archiviste » (Sonnet) | `analyse/04-contenu.json`, `analyse/04-photos.md`, `pub/data/*.json`, `bar/data/*.json` (créer, vides de faits non fournis) | JSON unique de faits officiels avec source (§1 du plan) ; tableau des 21 photos : dimensions natives, usage conseillé, recadrage, légende, alt | 100 % des prix et horaires du §1 présents ; 0 fait hors §1 ; chaque photo a largeur native mesurée ; `whisky.json` avec 3 tableaux vides ; liste de 13 « à fournir » reprise |
| **E1 Dév structure et DA** (2 en parallèle) | B1 « Dev bar » (**Opus**, raison : refonte complète à partir de zéro, risque principal = retomber dans le vide ou le template ; il faut arbitrer composition, étiquettes SVG et rythme sans modèle de départ) ; P1 « Dev pub » (Sonnet, amélioration d'un site existant avec spécification précise) | B1 : `bar/**` seulement. P1 : `pub/**` seulement | Pages complètes statiques : tokens CSS, polices, sections 0 à 10 / 0 à 9, contenu officiel, photos dérivées webp, états vides, hero, mobile | Voir juge J1 ; plus : polices = celles du §1.4, 0 police interdite ; 0 `#000`/`#fff` pur ; photos affichées ≤ taille native ; tous les liens réels (pas de `#`) ; HTML valide |
| **J1 Juge structure** (2 en parallèle) | J1a (Sonnet) pub/ ; J1b (Sonnet) bar/ | `analyse/juge-E1-pub.md`, `analyse/juge-E1-bar.md`, captures | Notes /10 par critère, captures 1440 / 768 / 375, liste de défauts avec sélecteur CSS et correction demandée | Grille §5, seuil ≥ 8. Si échec : retour à B1 ou P1 avec la liste, nouvelle capture |
| **E2 Composants et interactions** (2 en parallèle) | B2 (Sonnet, **même périmètre `bar/**`**, reprend après B1) ; P2 (Sonnet, `pub/**`) | `bar/**` ou `pub/**` | C1 « Aujourd'hui » (JS Europe/Paris), C2 whisky ARIA, C3 tableau, C4 onglets, 2 micro-interactions ; données lues depuis `data/*.json` ; fallback sans JS | Test Playwright : horloge simulée aux 14 cas limites (dim 00h29 ouvert, ven 02h29 ouvert, ven 02h31 fermé, lundi 20h31, etc.) → 100 % corrects ; onglets au clavier (flèches, Home, End) ; sans JS les 3 régions whisky sont visibles ; 0 erreur console ; cibles ≥ 44 px |
| **J2 Juge composants** (2 en parallèle) | J2a, J2b (Sonnet) | `analyse/juge-E2-*.md` | Même format, vérification fonctionnelle + captures de chaque état (vide, rempli de données de test **jetables** hors dépôt) | ≥ 8 ; test de données : remplir `whisky.json` en scratch → rendu correct puis retirer |
| **E3 Polish, accessibilité, SEO** (2 en parallèle) | B3 (Sonnet, `bar/**`) ; P3 (Sonnet, `pub/**`) | idem | Contrastes, focus, reduced-motion, JSON-LD `BarOrPub`/`Restaurant` limité aux faits officiels (`sameAs` Facebook, horaires, `servesCuisine`), meta/OG, perf images (srcset, lazy sous le pli, `fetchpriority` hero), `alt` | Contraste AA 100 % par script ; Lighthouse mobile : accessibilité ≥ 95, SEO ≥ 95, performance ≥ 85 ; poids initial ≤ 1,5 Mo ; CLS ≤ 0,1 ; 0 tiret long dans le texte visible ; grep interdits vide (§5.2) |
| **J3 Juge final croisé** | J3 « Directeur artistique » (**Opus**, raison : jugement de goût et arbitrage entre deux versions, détection fine des signaux « IA » ; seul poste où Opus apporte un gain net) ; en parallèle J3b « Auditeur technique » (Sonnet) | `analyse/juge-final.md`, `analyse/juge-final-tech.md` | Notes finales des deux versions sur la grille §5 complète, comparaison côte à côte, liste des « à fournir » restants, recommandation de présentation au client | Chaque version ≥ 8 ; écart de style entre versions ≥ 8/10 au critère « versions distinctes » ; 0 critère rédhibitoire |
| **E4 Clôture** | A4 (Sonnet) | `analyse/05-livraison.md`, mise à jour du graphe `graphify update .` | Récap pour le client, captures finales, liste « à fournir » | Tous les points de contrôle verts, commits propres |

Ordre : E0 → (B1 ‖ P1) → (J1a ‖ J1b) → (B2 ‖ P2) → (J2a ‖ J2b) → (B3 ‖ P3) → (J3 ‖ J3b) → E4. Boucles d'itération intégrées : chaque étape de dev reste ouverte jusqu'au passage du juge.

Contenu minimal du brief de chaque agent de dev : ce plan §1, §2 (sa version), §5 ; chemin des fichiers autorisés ; interdiction de toucher les fichiers de l'autre site ; liste des skills à invoquer (`impeccable`, `design-taste-frontend`, `playwright-cli` ; pas de générateur d'images, `brandkit`, `gpt-taste`) ; critères d'acceptation de l'étape.

---

## 5. Grille de jugement (identique pour tous les juges)

### 5.1 Notation /10 (pondérée, seuil global ≥ 8)

| Critère | Poids | Ce qu'on mesure (preuve exigée) |
|---|---|---|
| Anti-IA | 20 % | Aucun signal de la liste ci-dessous ; verdict « un humain pourrait-il croire que c'est fait main ? » avec 3 raisons concrètes. Objectif : score IA ≤ 3/10 |
| Pas vide, pas plat | 15 % | Capture pleine page à 1440 : aucune bande > 400 px sans contenu ni image ; contenu dans une largeur ≥ 1100 px ; chaque section a un moment fort (titre ≥ 56 px, ou photo, ou objet) |
| Contenu fidèle | 15 % | Diff automatique avec `04-contenu.json` : 0 écart de prix, d'horaire, de nom ; 0 fait inventé ; états vides honnêtes |
| Piliers client | 10 % | Bière maison, whisky navigable, restauration (midi, soir, brunch) trouvables en 1 clic depuis l'accueil et chacun a sa section complète |
| Identité et typographie | 10 % | Polices et palette conformes au §1 ; hiérarchie claire ; un seul rayon, une seule ombre |
| Photos | 10 % | Largeur affichée ≤ native ; traitement unique ; aucune étirée ni floue ; alt corrects |
| Mobile | 10 % | À 375 px : 0 défilement horizontal, texte ≥ 16 px, cibles ≥ 44 px, premier écran = photo + titre + Appeler |
| Accessibilité et technique | 10 % | Contraste AA, focus visible, reduced-motion, 0 erreur console, Lighthouse seuils E3 |

### 5.2 Critères rédhibitoires (un seul échec = refus, quelle que soit la note)
- Une information absente de PLAN-ANTI-IA §1 affichée comme un fait (whisky nommé, ABV, horaire de brunch, « depuis 2005 », « 200 whiskies », compteurs inventés).
- Contraste texte < 4,5:1 (3:1 pour texte ≥ 24 px ou gras ≥ 19 px).
- Photo agrandie au-delà de sa résolution native.
- Photo ou texte généré par IA, image stock.
- Défilement horizontal à 375 px.
- Police interdite (Fraunces, DM Sans, Inter, Roboto, mono).
- Mention « maquette non officielle » absente.
- Lien `#` ou bouton mort.
- Les deux versions utilisent la même structure de page ou la même palette.

### 5.3 Signaux « IA » (liste de contrôle du juge, 1 point retiré par signal)
Trio Fraunces/DM Sans/mono ; noir + or ; grain, lueur, verre dépoli ; compteur chiffré animé ; triade de slogans ; numérotation 01-06 ; italique décoratif sur un mot ; cartes identiques en grille répétée ; ombre dure et rotation sur tout ; dégradés violet/bleu ; tirets longs dans le texte ; icônes de familles mélangées ; texte du type « Découvrez notre univers » ; sections qui ne contiennent qu'une phrase sous un titre géant ; faux témoignages ; placeholders type « Lorem » ; commentaires de code « remplacer par photo ».

### 5.4 Fidélité aux faits : méthode
Le juge extrait par script tous les nombres (prix, heures) et noms propres du HTML rendu et les compare à `analyse/04-contenu.json` ; tout écart est un défaut. Grep d'interdits sur le HTML/JS/JSON : `2005`, `200 whisk`, `30 gin`, `Penicillin`, `Macallan`, `Scotch egg`, `Lorem`, `TODO`, `href="#"`.

### 5.5 Rendu des captures exigées par juge
Pour chaque version : 1440 (pleine page + premier écran), 768, 375 (pleine page + premier écran), états : onglet whisky vide, carte brunch « à venir », « Aujourd'hui » ouvert et fermé (horloge simulée), focus clavier sur un bouton.

Verdict final présenté au client : pub/ comme proposition principale, bar/ comme alternative claire et posée, avec la liste §3 de ce qu'il faut fournir pour passer de maquette à site final.
