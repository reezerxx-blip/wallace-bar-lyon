# Critique DA : bar/ vs pub/ (Wallace Bar Lyon)

Méthode : serveur local, rendu navigateur à 1440 et 375 px, défilement complet, lecture du HTML/CSS. Aucun fichier du site modifié.

## Verdict

- **bar/ : 3,5/10.** Le client a raison. Ce n'est pas un site de pub, c'est un document texte avec un logo. Rien ne donne envie de venir.
- **pub/ : 6,5/10.** Bonne direction (enseigne, affiche de match, ardoise), vraie personnalité, mais exécution inégale : photos trop petites, effet « sticker » répétitif, sections creuses (bière, presse), hero sans image forte.

## Notes /10

| Critère | bar/ | pub/ |
|---|---|---|
| Identité | 3 | 7 |
| Hiérarchie | 4 | 7 |
| Mise en page | 3 | 6 |
| Photos | 2 | 5 |
| Typographie | 5 | 8 |
| Ambiance pub whisky + bière + resto | 2 | 6 |
| Mobile | 5 | 7 |
| Impression « vrai site de pro » | 3 | 6 |

## bar/ : défauts précis

1. **Colonne de 640 px sur un écran de 1440** (`.wrap{max-width:40rem}`, styles.css l.54). Sur desktop, 55 % de l'écran est du papier vide à gauche et à droite. Toutes les sections sont dans cette bande. C'est ce qui donne « rien de fait ».
2. **Hero sans impact** : titre 40 px (`.hero h1`), « Your everyday pub » en Newsreader sobre, photo de 420x315 px (`figure{max-width:420px}`) alignée à gauche sous le texte, légende en italique. Aucun point d'attaque, aucune ambiance dès l'arrivée. Le titre est plus petit que le logo « enseigne » ne le laisse espérer.
3. **Logo de 28 px de haut** dans l'en-tête (`.top__logo img{height:28px}`) : illisible, l'identité visuelle du bar est écrasée. Statut « ouvert » en bout de ligne, minuscule.
4. **Palette papier crème + bordeaux discret** (#f6f3ec / #7b2e3b) : c'est celle d'une librairie ou d'un cabinet, pas d'un pub. Pas de bois, de vert, de tartan, de pierre. Aucune couleur du logo repris à part un bordeaux terne.
5. **Carte = liste de texte en une colonne** (`.menu`). 6 groupes empilés, pointillés fins, prix à droite : propre mais aucune photo entre les plats, une seule bannière de 420x112 px (fish & chips en panoramique 1224x325 réduit, quasi illisible). Pas de hiérarchie entre « plat star » et le reste, aucun Fish & Chips mis en avant alors que c'est le plat signature.
6. **Boissons : la bière maison est une liste de 4 noms** (Wallace IPA, Double IPA, Lager, NEIPA) en petites capitales, sans photo de cuve, sans description, sans mise en scène. Le whisky tient dans une ligne (« Wee whisky list »). Pour un pub à whisky et bière brassée, c'est le point le plus raté : les deux produits phares n'ont aucune présence.
7. **Soirées et sport** : liste de six lignes grises avec étiquettes (« Régulier », « Club », « Bière », « Concours ») sans heure ni jour sauf le quiz. Descriptions vides (« Un concours photo. », « Le club whisky du Wallace. »). Aucune photo de match, de concert ou d'événement alors que les fichiers sont dans assets/img/real/.
8. **Presse** : quatre noms (Rolling Stone, USA Today, Fox News, The Guardian) en liste texte, sans logo ni mise en page ni la vidéo virale. C'est pourtant le meilleur contenu du bar.
9. **Infos** : 4 blocs texte, pas de carte, pas de bouton fort. Seuls liens : soulignés bordeaux.
10. **Boutons absents** : appeler et itinéraire sont des liens soulignés (`.link`). Aucun appel à l'action visible.
11. **Rythme monotone** : mêmes sections `border-top`, mêmes étiquettes capitales de 12 px (`.kicker, .sub, h4, .agenda__when…`). Aucun moment fort, aucune rupture de fond, aucune échelle de titres.
12. **Mobile** : lisible, pas de débordement, dock bas OK. Mais le même vide : hero 100 % texte, une photo à la fin du premier écran, puis une longue page grise (5 950 px).
13. **Cohérence image** : la bannière du fish & chips à 87 px de haut sur mobile est un ruban illisible (`width="1224" height="325"` avec max-width 100 %).

## pub/ : forces

- Titres Archivo condensé en capitales, « EVERYDAY PUB » avec « PUB » en pastille rouge penchée : ça ressemble à une enseigne, c'est lisible, ça a une voix.
- Alternance de fonds (vert, bleu nuit, bois, rouge) : rythme marqué, vraies ruptures de section.
- Ardoise de menu cadrée en bois : la carte donne faim et se parcourt bien, 2 colonnes à 1440 px.
- Bières en grandes capitales décalées sur des filets : forte présence de la bière maison.
- Tableau sport/événements avec heure en rouge, bandeau 4 écrans / 20h30, presse en « unes » : informations utiles mises en scène.
- Mobile très correct : hero lisible, dock Appeler / Itinéraire solide, tableau d'événements recomposé en grille.

## pub/ : défauts précis

1. **Hero sans image forte** : à 1440x900 la photo (482x368 sur 720 natifs) est coupée par le pli, en bas à droite. Le premier écran est un titre géant sur fond vert, sans lieu ni bière ni plat. Sur mobile, la photo est repoussée après les CTA, hors du premier écran. C'est un site de pub sans image de pub à l'arrivée.
2. **Photos petites, cadrées en « polaroid »** : affiche des 16 pressions (280x447 natifs, rendue ~300 px), deux montages sport/concert (280x447, 295x456 rendus), brasserie 534x414. Elles flottent dans de grands fonds vides, avec rotation à chaque fois. Les affiches publicitaires (« 16 beers on draught », montage de concerts) sont des visuels de communication, pas des photos d'ambiance : elles font « flyer collé ».
3. **Effet répétitif** : ombre dure 8 px, rotation de 1 à 2 degrés, punaise rouge sur chaque photo, bordure épaisse crème sur chaque bloc (`--hard`, `.pin`, `.banner`, `.whisky img`, `.score__cell`, `.fixtures`, `.mast`). À l'usage, tout est « sticker ». Risque de lecture « style brutaliste généré » (voir signaux IA).
4. **Section Whisky maigre** : une photo noir et blanc surexposée (reflet blanc sur les bouteilles) et deux lignes de texte. Aucun nom de whisky (non fournis officiellement, donc normal), mais la mise en scène reste un simple bandeau avec une carte crème par-dessus. Le whisky n'est pas une section, c'est une légende.
5. **Bière maison** : bien en typo mais une seule photo (visite brasserie) ; le texte d'intro tient en une phrase (« Le Wallace brasse sa propre bière. »). Pas de couleur, de style, de niveau d'amertume (non fournis, à ne pas inventer), mais on peut mettre davantage de photos (cuves, IPA tee-shirt, drinks01/02) pour compenser.
6. **Bandeau tartan** : dégradés CSS (`.tartan`), reconnaissable comme motif mais plat, un peu « clipart ». Joue le rôle de séparateur 2 fois seulement.
7. **Bannière fish & chips** : ratio 1224x325 très étiré, plat de l'ardoise vu en gros plan flou. Pas assez d'appétence, et aucune autre photo de plat entre les prix alors que 4 photos de plats existent (cobb, fish salad, cheesecake, sliders).
8. **Presse** : quatre « unes » en cartouches crème à tailles différentes : visuellement fort, mais aucune citation, aucun logo. Fond rouge plein très lourd en pleine page, suit directement un bandeau tartan.
9. **Sport** : bloc de scores (4 / 20h30) joli mais un seul vrai événement horaire ; les 4 autres lignes affichent « à confirmer » (correct vis-à-vis des faits, mais le visiteur lit un planning vide). Les photos sport sont deux montages anciens en noir et blanc, rien de la salle en match.
10. **Infos** : texte et tableau bien, mais pas de carte ni de photo de façade. Tableau d'horaires du bar + cuisine OK.
11. **Typographie** : titres h2 jusqu'à 150 px (`clamp(56px,12vw,150px)`) : spectaculaires mais le contenu qui suit est maigre (une phrase). Disproportion titre / contenu.
12. **Lazy load** : certaines images (`affiche`, `drinks02`) ne se chargent qu'au défilement ; un écran vide peut se voir sur connexion lente.
13. **Contraste / accessibilité** : bon dans l'ensemble (crème sur vert, blanc sur rouge). Texte `--cream-dim` sur bleu nuit à vérifier. Reveal respecte `prefers-reduced-motion`.

## Diagnostic de fond : pourquoi bar/ déçoit

1. **Trop minimal, pas sobre.** « Éditorial sobre » demande de grandes images, de grands titres, du blanc maîtrisé. Ici, le blanc est du vide : colonne de 640 px, titre de 40 px, photos de 420 px. Une mise en page de journal sans journal.
2. **Aucune âme de pub.** Rien ne parle de whisky, de bière brassée, de match, de musique. Palette, serif et filets fins disent « bibliothèque ». Le pub est écrit dans les textes, jamais montré.
3. **Contenu maigre.** Les faits officiels sont tous là (carte, horaires, bières), mais ils sont présentés en liste brute, sans photo associée, sans hiérarchie, sans plat vedette, sans histoire (presse virale, brasserie).
4. **Pas de moment fort.** Même rythme du haut en bas, aucun fond coloré, aucune image pleine largeur, aucun bouton visible. Une page où on ne sait pas où regarder, ni pourquoi venir.
5. **Photos mal exploitées.** Les images sont petites (420 px) et sans mise en valeur : leur faible définition (~50 Ko) devient un défaut visible au lieu d'être contournée par le cadrage.

### Ce qu'il faut garder

- Structure de contenu de bar/ (carte complète, horaires bar + cuisine, mention « maquette non officielle », JSON-LD).
- Statut ouvert / fermé, dock mobile, skip-link, reduced-motion, focus visible.
- Newsreader pour les citations presse (si de vraies citations sont obtenues).
- Faits de PLAN-ANTI-IA §1 : aucun ajout.

### Ce qu'il faut jeter (de bar/)

- La colonne unique de 640 px, la palette papier + bordeaux, les titres de 40 px.
- Les listes de six lignes sans heure, les descriptions vides.
- Les liens soulignés comme seuls appels à l'action.

### Ce qu'il faut refaire

- **Choisir pub/ comme base** et corriger : hero avec grande photo (salle St-Patrick ou écrans de match) en fond ou en pleine largeur sous le titre, pas en coin.
- Alterner **grandes photos pleine largeur** (recadrées, légèrement assombries d'un voile, pas agrandies au-delà de leur définition) et fonds colorés.
- Remplacer l'effet punaise partout par **un seul traitement** : cadre simple ou pleine largeur ; réserver la rotation à un seul élément par page.
- **Bière** : ajouter photos cuves / drinks01 / drinks02 en bande ; mettre le fish & chips en vedette.
- **Whisky** : photo mieux cadrée (recadrer les bouteilles, réduire la surexposition), vraie section avec trois lignes officielles (Écosse, Irlande, monde, Whisky Club).
- **Presse** : un seul gros bloc avec la vidéo virale (photo du bar bondé pendant le Mondial) ; pas quatre cartouches.
- **Sport** : photo de salle avec écrans (hero ou sport) ; masquer les lignes « à confirmer » ou les regrouper en « Aussi au Wallace ».
- Boutons Appeler / Itinéraire dès le premier écran sur desktop.

## Contraintes

- **Photos officielles petites** : 15 à 170 Ko, largeur native 280 à 1224 px ; les affiches font 280x447. Éviter de les agrandir au-delà de leur taille native (pas de hero plein écran 1440 px brut) ; utiliser voile sombre, recadrage serré, bandes de 2 à 3 photos côte à côte ; ne pas flouter ni sur-compresser davantage.
- **Pas de photo générée par IA**, pas de stock. Aucune retouche trompeuse.
- **Pas d'infos inventées** : pas de « depuis 2005 », « 200 whiskies », noms de cocktails, horaires d'animation, noms de whiskies. Les « à confirmer » doivent rester tels quels ou disparaître.
- **Photos à valider par le patron** ; mention « maquette non officielle » obligatoire.
- **Signaux « look IA » à éviter** : trio Fraunces / DM Sans / mono, noir + or, grain, lueur, verre dépoli, compteur chiffré, triade de slogans, numérotation 01-06, italique sur un mot, cartes identiques en grille, ombres dures et rotations systématiques partout (pub/ s'en approche), tirets longs dans le texte, icônes mélangées.
- **Typo** : Archivo + Public Sans (+ Newsreader pour citations). Une seule famille d'icônes.
- **Accessibilité** : contraste AA, focus visible, `prefers-reduced-motion`, cibles 44 px.
