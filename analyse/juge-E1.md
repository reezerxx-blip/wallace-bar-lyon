# Juge E1 (audit indépendant) : pub/ et bar/

Méthode : serveur `python -m http.server 8241`, Chromium via Playwright (1440, 768, 375, DPR 1) et navigateur intégré, lecture de toutes les sections en pleine page, scripts de mesure (images, contrastes WCAG, faits, horloge simulée sur 12 cas). Captures dans `analyse/captures/J1/` (`<site>-<largeur>-first|full.png`, `<site>-1440-focus.png`). Les zones vides sur les pleines pages viennent du lazy-loading et ont été revérifiées à part (aucun défaut réel). Aucun fichier de pub/ ni bar/ modifié.

## 1. Verdict

| | Note pondérée | Auto-note auteurs | Seuil 8 | Rédhibitoire (§5.2) |
|---|---|---|---|---|
| pub/ | **7,5 / 10** | ~8 | ÉCHEC (de peu) | aucun net ; 1 fait déduit non officiel (voir 4) |
| bar/ | **6,5 / 10** | ~8 | ÉCHEC | 1 fait absent du §1 affiché comme fait (« à la pression ») ; risque sur l'image presse |

Classement : **1. pub/, 2. bar/**. L'écart (1 point) est réel : pub/ a une voix et des objets (ardoise, tableau de prix, affiche) ; bar/ lit comme un « template brasserie artisanale ».

Ressemble-t-on à un vrai site de pub ? **pub/ : oui, à 70 %** (hero typographique franc, ardoise, prix en points de conduite, voix courte). **bar/ : non, plutôt landing page « craft brewery » soignée** : papier crème + kraft + vert houblon + serif chaleureux + coins arrondis + bloc kraft décalé derrière la photo + 4 cartes de couleur. C'est exactement le piège que `04-critique-du-plan.md` §1 annonçait.

## 2. Notes par critère (grille §5.1)

| Critère (poids) | pub/ | bar/ | Preuve |
|---|---|---|---|
| Anti-IA (20 %) | 6,5 | 5 | signaux §3 ci-dessous. Score « IA » estimé : pub 3,5/10, bar 5/10 (objectif ≤ 3) |
| Pas vide, pas plat (15 %) | 7,5 | 6,5 | pub : seule la presse est un bloc sans image (≈ 480 px). bar : vides latéraux (§5) |
| Contenu fidèle (15 %) | 8 | 7,5 | prix et horaires 100 % conformes ; écarts mineurs listés §4 |
| Piliers client (10 %) | 7 | 6,5 | bière : forte des deux côtés. whisky : titre géant + 2 lignes, aucune liste (état vide voulu), mais section maigre. brunch : 1 phrase des deux côtés |
| Identité et typo (10 %) | 8 | 7 | polices conformes aux corrections 1-2. pub : 5 aplats de fond (vert, ardoise, bleu, rouge, bois) > « 3+1 ». bar : cohérent mais générique |
| Photos (10 %) | 7,5 | 6 | 0 agrandissement (scale cover inclus, 6 combinaisons testées). pub : originaux référencés hors dossier. bar : voir §5 |
| Mobile (10 %) | 8,5 | 6,5 | 0 défilement horizontal, texte ≥ 14 px. bar : aucune navigation sous 900 px |
| Accessibilité/technique (10 %) | 8 | 8 | 0 erreur console, focus 3 px visible, reduced-motion, `th scope`, lien d'évitement, JSON-LD, `noindex` |
| **Total** | **7,5** | **6,5** | |

## 3. Signaux IA relevés (1 point chacun, grille §5.3 + critique §12)

pub/ (3 signaux, 7/10 « humain ») :
1. Section **Presse** = titre géant + une phrase + une ligne, sans image ni objet (`#presse`).
2. **Rouge + vert** en blocs adjacents (« 16 pressions » rouge à côté du vert whisky, bouton rouge sur vert) : lecture Noël/tartan italien ; palette au-delà de 3+1.
3. **Étiquette « PUB » en pastille rouge tournée** (`h1 b`, rotate -2deg) : un seul sticker, toléré, mais c'est le trope « sticker » de l'ancien pub/. Le bandeau `.tartan` lit comme une barrière de croix (pas un tartan).

bar/ (4-5 signaux) :
1. **4 cartes colorées identiques** (`.etiquettes .etq`, rectangles 4 px, « Brassée au Wallace » répété 4 fois) : c'est le « cartes identiques en grille répétée » et les « étiquettes SVG génériques » de la critique.
2. **Bloc kraft décalé derrière la photo** (`.hero__photo::before` ≥ 900 px) : effet « carte posée » typique.
3. **Palette crème / kraft / vert houblon / bleu nuit + coins 4 px + serif doux** = template craft brewery.
4. **Giant « 16 »** serif vert en tête de bloc (`.pressions__nombre`) et ligne `dl` Bar / Cuisine / Ce soir en « stat row » (`.today__liste`).
5. **Section Whisky = trois mots géants + deux phrases** (`.whisky__regions`), idem « titre géant sous lequel il n'y a presque rien ».
Aucun signal des listes dures (Fraunces/DM Sans/mono, noir + or, grain, lueur, dégradé violet, italique décoratif, numérotation 01-06, tiret long, `href="#"`, commentaire de code) : tous absents (grep + CSS).

## 4. Fidélité aux faits (script + relecture)

Vérifié : tous les prix (10, 11, 13, 15, 16, 17, 18, 20, 22, 8 à 11, 9, +2 €), toutes les heures (00h30, 02h30, 11h, 12h, 15h, 18h30, 19h, 20h30, 22h), noms de bières, Punk AF / Guinness 0.0, médias, adresse, téléphone, courriel, Facebook : **conformes au §1 dans les deux versions**. Grep interdits (`2005`, `200 whisk`, `30 gin`, `Penicillin`, `Macallan`, `Scotch egg`, `Lorem`, `TODO`, `href="#"`, tirets longs, « à venir », « à confirmer ») : **vide**. Mention « Maquette non officielle » : présente (pied) dans les deux. Mention santé alcool + allergènes : présentes.

Horloge simulée (12 cas : lun 00:29 / 00:31, sam 02:29 / 02:31, lun 20:31, lun 15:00, dim 11:30 / 15:30, mar 22:30, sam 23:00, ven 01:00, mar 10:00) : **12/12 corrects dans les deux** (bar ouvert/fermé, cuisine, quiz le lundi). Réserves mineures : « Quiz ce soir, 20h30 » reste affiché à 20h31 (les deux) ; bar/ surligne la ligne du jour civil (lun 00:29 surligne lundi alors que le service est celui de dimanche) ; pub/ gère bien (« Aujourd'hui, dimanche »).

Écarts (tout fait absent du §1 est un défaut) :

| Version | Texte / sélecteur | Problème | Correction |
|---|---|---|---|
| pub | `#evenements .events` « Wallace Craft Beer : La bière de la brasserie maison. » | description déduite, non officielle | supprimer la phrase, laisser le nom seul |
| pub | `.menu h3` « Pub classics », « Assiettes et salades », « Et aussi » | intertitres inventés (Poke, Tartare, Salmorejo rangés en « salades ») | libellés neutres ou aucun regroupement |
| pub | `.whisky__club`, `.events` « Le club whisky du Wallace. » (2 fois) | tautologie sans information | une seule mention, sans phrase creuse |
| pub | `#evenements .mosaic img:nth-child(2)` alt « public rassemblé près des fléchettes » | l'image montre un chanteur guitariste maquillé ; alt faux | décrire ce qui est visible |
| bar | `.biere__texte p` « Quatre bières maison **à la pression** » | « à la pression » absent du §1 | « Quatre bières brassées au Wallace : Wallace IPA, Double IPA, Lager, NEIPA. » |
| bar | `.jours .soir` « Sport » ×6 lignes | affirme du sport chaque soir, répétition = remplissage | cellule vide ou « Sport sur 4 écrans » une fois en note |
| bar | `.affiche img` alt qui liste 12 noms de bières | noms lus sur l'affiche, non §1 | alt court : « Affiche du bar : les 16 bières à la pression » |
| bar | `.presse__photo img` (presse.webp) | collage de tweets de tiers (dont George Takei) avec insulte et caricature politique | ne pas publier tel quel : recadrer sur l'article/la vidéo ou retirer tant que pas d'accord |

## 5. Défauts visuels précis

### pub/ (ordre de gravité)

1. **Dépendance hors dossier.** `index.html` référence `../assets/img/real/*` (logo + 13 images) ; `pub/img/` ne contient que `og.jpg`. Déployer `pub/` seul casse toutes les images, et les JPEG originaux (jusqu'à 1224 px) sont servis sans dérivés webp ni `srcset`. Correction : copier/convertir dans `pub/img/`, ajouter `srcset`.
2. **Section Presse** (`#presse`, `.press__lead`, `.press__more`, ≈ 480 px) : seul bloc sans photo ni objet ; phrase de 80 px puis paragraphe `--paper-dim`. Correction : ajouter un objet (liste des 4 médias en tableau façon scores, ou vignette de la photo du Mondial recadrée sur la salle), garder le texte ≥ 16 px.
3. **Whisky** (`.whisky`, `.regions li`) : 3 mots à 120 px + « Whisky Club » + bouton ; photo `drinks02.jpg` surexposée (reflet blanc au centre) cadrée dans un cadre bois de 14 px. À 375 px, le bouton « Demander la carte 04 72 00 23 91 » passe sur 2 lignes (`.btn` dans `.whisky__text`). Correction : recadrer `object-position` hors du flash (`.whisky__photo img` 30 % 50 % → ~75 % 50 %), raccourcir le libellé du bouton (« Demander la carte »), retirer `.nb` du texte du bouton.
4. **Palette trop large** (`:root` : green, slate, blue, red, wood, chalk, paper) : bloc rouge plein `.draught__text` collé à une section verte (Noël). Correction : `.draught__text` en `--slate` ou papier avec filet rouge ; réserver le rouge aux pastilles/CTA.
5. **Bandeau tartan** (`.tartan`, 40 px, SVG 48 px) : se lit comme une clôture à croix, pas comme un tartan. Correction : retirer, ou refaire un vrai tissage (3 bandes croisées avec transparence) à 24 px.
6. **Mosaïque événements** (`.mosaic img`, 282 × 280 px à 1440, `object-fit: cover` sur des bannières 1224 × 327) : recadrage très serré, visages coupés sur l'image 4 ; images dégradées en noir et blanc de basse qualité. Correction : passer à 2 colonnes × 2 de 560 px max ou 3 vignettes en 3:2, `object-position` par image.
7. **Navigation** : `aria-current` jamais retiré en haut de page (état « Bière » conservé après remontée, `main.js` IntersectionObserver). Correction : retirer `aria-current` quand aucune section n'est dans la bande.
8. **Hero** (`.hero__photo img`) : 517 × 520 depuis 720 × 540, cadrage 1:1 correct, mais photo sombre et bruitée à 1440 ; acceptable. À 768 px la photo passe **sous** le texte (plus de moment fort au 1er écran) : remettre `order:-1` jusqu'à 1099 px.
9. **Pied de `.draught`** : `.facts li` 14-16 px `font-weight:600` sur rouge, correct en contraste (5,75) mais très dense visuellement (4 lignes de 16 px sur 540 px).
10. **Lien d'évitement et focus** : bons ; rien à corriger.

### bar/ (ordre de gravité)

1. **Aucune navigation sous 900 px** (`.nav {display:none}`, `.top__status`, `.top__call` masqués jusqu'à `min-width:900px`). À 768 et 375 px l'en-tête = logo seul ; bière / whisky / carte / semaine ne sont atteignables que par défilement, et il n'y a pas de statut ouvert/fermé en haut. Le critère « piliers trouvables en 1 clic » échoue sur mobile. Correction : barre d'ancres défilante (comme pub/) ou menu simple, statut dans l'en-tête.
2. **Les 4 étiquettes** (`.etiquettes .etq`, 204 × 112 px) : quatre aplats identiques, aucun dessin, aucun ABV (donc rien à dire). Correction : un seul traitement typographique sobre (liste de 4 lignes, nom 56 px + style), ou une vraie variation par étiquette ; supprimer la répétition de « Brassée au Wallace ».
3. **Vides latéraux** : `.bande` (zinc, 960 px, alignée à gauche dans un conteneur de 1192 px) laisse ≈ 230 px vides à droite ; `.whisky__in` avec `align-items:end` laisse ≈ 250 px vides au-dessus du texte à droite ; sous le « 16 » (`.pressions__nombre`) colonne vide de ≈ 350 px. Correction : centrer ou pleine largeur (`max-width:100%`, 1192 < 1224 natifs), `align-items:start` sur le whisky, ranger affiche et marques sous le 16.
4. **Bande whisky** (`.bande--sombre`, `etagere.webp` 1224 × 327) : à 375 px elle tombe à **87 px de haut**, illisible ; même effet sur `.bande` zinc (92 px) et cornemuse. Correction : `object-fit:cover; height:200px` sous 700 px.
5. **Hero** : `.hero__photo::before` (kraft décalé) chevauche la légende (« Visite de la brasserie… » posée sur le bord du bloc) ; à 768 px la photo est recadrée à 240 px de haut et coupe le sommet de la tête (`.hero__photo img{height:240px}`, `object-position:50% 30%`). Correction : supprimer le bloc décalé ; hauteur 320 px et `object-position:50% 20%`.
6. **Image Presse** (`.presse__photo img`, 356 × 632) : collage de captures de réseaux sociaux de tiers + caricature politique + gros mot ; illisible à cette taille (texte ≈ 6 px), risque de droits et de réputation. Correction : remplacer par une photo du Wallace pendant le Mondial ou aucune image, et lier aux articles quand le patron les fournit.
7. **Whisky = 3 mots + 2 phrases** (`.whisky__regions` 120 px, `.whisky__texte`) ; le pilier n'a ni objet ni liste. « Une petite carte de whiskies, des trois origines » ré-énonce « Wee whisky list ». Correction : ajouter un objet vrai (photo cadrée sans flash, mention « Whisky Club » en vraie ligne), et plus de texte uniquement si fourni.
8. **Table « La semaine »** : colonnes Bar et Cuisine répétées 7 fois à l'identique + « Sport » ×6 ; seule la ligne lundi apporte de l'information. À 375 px, 7 blocs de 6 lignes (≈ 1 400 px de défilement). Correction : tableau horaires condensé (lun-jeu/dim, ven-sam), cartouche « Lundi : Quiz 20h30 », sport en une ligne.
9. **Brunch** : encart kraft de 2 lignes (`.brunch`) enfoui sous la colonne « Assiettes » à droite ; le pilier brunch est le moins visible de la page. Correction : bandeau pleine largeur sous la carte, titre 56 px, avec « La cuisine ouvre à 11h le dimanche ».
10. **Typo** : Young Serif + Karla correctement chargées, mais nav 16 px / eyebrow 15 px à 0,08 em en capitales : lisible ; titres 34-56 px, aucun titre ≥ 96 px hors « 16 » et régions. Le hero H1 est fort ; le reste de la page manque de hiérarchie entre `h2` 56 px et `h3` 24 px.

## 6. Contrastes (script Python, formule WCAG 2.x)

| Couple | Ratio | Verdict |
|---|---|---|
| pub : papier `#F1EADB` sur vert `#1F4D3A` | 8,04 | OK |
| pub : craie `#E8C547` sur ardoise `#2A2F2C` | 8,11 | OK |
| pub : papier sur rouge `#A3322B` (boutons, bloc « 16 pressions », 16 px) | 5,75 | OK |
| pub : gris texte `#4A5048` sur papier (14 px, légal) | 6,92 | OK |
| pub : papier-dim `#D3D8CB` sur vert (kicker 14 px) | 6,63 | OK |
| bar : encre `#26231E` sur papier `#F4EEDF` | 13,52 | OK |
| bar : houblon `#4F6B2E` sur papier (le « 16 », texte de bouton 16 px gras) | 5,22 | OK |
| bar : crème sur bleu `#1C3A4F` | 10,26 | OK |
| bar : crème sur rouille `#A44A19` (étiquette 14 px) | 5,08 | OK |
| bar : encre-douce `#51493D` sur kraft `#DCCBA5` (labels mobiles 14 px) | 5,54 | OK |
Autres couples du code (chalk sur bleu 7,55 ; papier-dim sur vert profond 8,50 ; kraft sur bleu 7,43 ; crème-douce sur bleu 7,88) : tous ≥ 4,5. Aucun échec de contraste texte. (Seuls les filets pointillés décoratifs sont < 4,5 : hors critère.)

## 7. Photos

0 photo affichée au-delà de sa largeur native (test sur 6 combinaisons site × largeur, scale `cover` pris en compte, lazy forcé). Traitements : pub/ cadre papier sur 2 photos, bande 3 photos à 3 px, cadre bois ; bar/ coins 4 px + filet, bloc kraft décalé : traitement unique plus homogène côté bar, plus « objet » côté pub. 0 photo IA, 0 stock. Alt réels (une erreur côté pub, deux alts trop longs côté bar). Poids : pub 209 Ko initial / 299 Ko après défilement à 1440 ; bar 124 / 360 Ko (webp). Pas de défilement horizontal (scrollWidth = largeur à 375 et 768).

## 8. Les deux versions sont-elles vraiment différentes ? (checklist de 5)

| # | Critère | Résultat |
|---|---|---|
| 1 | Fond dominant | **Différent** : vert/ardoise/bleu sombres vs crème/kraft (un seul bleu) |
| 2 | Famille de titres | **Différent** : Barlow Condensed capitales vs Young Serif casse mixte |
| 3 | Hero | **Semblable** : dans les deux, texte à gauche / photo à droite (1,05 fr / 0,95 fr), puis bandeau « Aujourd'hui ». Les images diffèrent (salle vs brasserie) |
| 4 | Objet signature | **Différent mais faible côté bar** : ardoise et tableau de prix (pub) vs cartes-étiquettes (bar) |
| 5 | Sport / rythme | **Différent** : gros « 4 » + photo (pub) vs tableau hebdomadaire (bar) |
Bilan : 4 sur 5, **mais le squelette de page est le même** : hero, aujourd'hui, bière (+ 16 pressions + affiche), whisky (3 mots géants + photo), carte (vedette fish & chips + 2 colonnes + brunch), sport/événements, presse, infos. 8 sections sur 9 dans le même ordre. Pas de critère rédhibitoire déclenché (palette, typo et compositions diffèrent), mais un client qui les met côte à côte verra deux habillages d'une même maquette. Écart de style : ~7/10 (cible 8). Pour creuser l'écart : bar/ devrait changer d'ordre ou de forme (carte en premier, semaine en grille, hero en mosaïque de 3 photos comme le plan §2.3), pas seulement de peau.

## 9. Corrections priorisées

### pub/ (≤ 10)
1. Copier les images dans `pub/img/` (dérivés webp + `srcset`) : plus de `../assets/`.
2. `#presse` : ajouter un objet visuel (liste des 4 médias en lignes de tableau, ou photo recadrée) et monter le texte secondaire à 16 px.
3. Supprimer « La bière de la brasserie maison. » (Craft Beer), les intertitres « Pub classics / Et aussi », la répétition « Le club whisky du Wallace. ».
4. `.draught__text` : abandonner le bloc rouge plein ; limiter le rouge aux CTA et pastilles ; réduire à 3 fonds + 1 accent (retirer au moins le bois ou le bleu).
5. `.whisky__photo img` : recadrer hors du flash ; `.whisky__text .btn` : libellé court (pas de numéro dans le bouton).
6. `.tartan` : refaire (tissage 3 bandes) ou supprimer ; ne pas l'utiliser pour souligner le hero.
7. `.mosaic` : 4 vignettes recadrées à la main, corriger l'alt de la 2e image (chanteur, pas fléchettes).
8. `main.js` : retirer `aria-current` quand aucune section active ; garder « Quiz ce soir » seulement avant 20h30 (sinon « Quiz ce soir, en cours »).
9. 768 px : remettre la photo du hero au-dessus du texte (`.hero__photo{order:-1}` jusqu'à 1099 px).
10. Ajouter les photos non utilisées à bon escient (écrans sport `wallace-lyon-football-rugby...2020`, affiche quiz) pour donner un second moment fort à Sport et Événements.

### bar/ (≤ 10)
1. Navigation et statut sous 900 px (barre d'ancres défilante + statut + Appeler dans l'en-tête).
2. Retirer `.hero__photo::before` (bloc kraft) ; hauteur et `object-position` du hero à 768 px.
3. Remplacer les 4 cartes de couleur par un traitement typographique simple, supprimer « Brassée au Wallace » ×4.
4. Retirer ou recadrer `presse.webp` (tweets de tiers, insulte, caricature) ; mettre une vraie photo du Mondial ou rien.
5. Corriger « à la pression » et l'alt de l'affiche ; ne plus écrire « Sport » six fois dans le tableau.
6. Supprimer les vides : `.bande` pleine largeur ou centrée, `.whisky__in{align-items:start}`, colonne gauche des pressions remplie.
7. Bandes d'image à 375 px : hauteur minimale 200 px avec `object-fit:cover`.
8. Whisky : lui donner un objet et du poids (photo recadrée, Whisky Club en vraie ligne) au lieu de 3 mots géants seuls.
9. Brunch : bandeau pleine largeur (titre ≥ 56 px) au lieu de l'encart de 2 lignes ; condenser le tableau « semaine ».
10. Différencier la structure de pub/ (ordre des sections, hero en mosaïque, semaine en grille) ; changer la palette crème + kraft + houblon (le « craft template ») au profit d'un parti pris propre au lieu.

## 10. Passage au tour suivant

pub/ : 7,5 → à reprendre (corrections 1 à 5 suffisent pour viser 8+). bar/ : 6,5 → refonte de la structure et de la navigation mobile avant tout polish. Pas de passage en E2 avant nouvelle capture.
