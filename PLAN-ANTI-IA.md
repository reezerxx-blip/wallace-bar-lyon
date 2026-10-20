# Wallace Bar Lyon : plan « anti-site-IA »

Source de vérité : le site officiel http://www.wallacebarlyon.com/ (relevé le 2026-10-20).

## 1. Le vrai Wallace (faits relevés, à utiliser tels quels)

- **Positionnement officiel** : « Your everyday pub for fish & chips, burgers, sports, food, music, friends, whisky, beer, cocktails, rugby, darts, football ». C'est un **pub vivant et sportif**, pas un bar à whisky de luxe. Le ton « noir + or, lumière basse » est donc faux sur le fond.
- **Adresse** : 2 Rue Octavio Mey, 69005 Lyon (Vieux-Lyon, bord de Saône) · 04 72 00 23 91 · wallacelyon@wanadoo.fr
- **Horaires bar** : 11h-00h30 dim-jeu, 11h-02h30 ven-sam. **Cuisine** : lun-sam 12h-15h et 19h-22h, dim 11h-15h et 18h30-22h.
- **Bières** : brasserie maison (Wallace IPA, Double IPA, Lager, NEIPA), 16 pressions (Brewdog, Guinness, Galway Bay, La Chouffe, Lagunitas…), bouteilles, canettes, sans alcool (Punk AF, Guinness 0.0). « Wee whisky list » (Écosse, Irlande, monde), gins Fever-Tree à +2 €, vins.
- **Cuisine (prix officiels)** : Fish & Chips 18 € · Wallace Burger bœuf 18 / poulet 16 / fish 17 / veggie 16 · Double Burger 22 · Haggis Burger 20 · Pulled Pork 16 · Club 16 · Wings 10 · Sliders 11 · Loaded Fries 8-11 · Saumon confit 18 · Tartare 18 · Cobb 15 · Buddha Bowl 15 · Poke saumon 18 · Salmorejo 13 · menu enfant 9 · desserts maison · planches. Plat du jour midi lun-ven.
- **Sport** : tous les grands sports en direct sur **4 grands écrans**.
- **Événements** : Quiz du lundi 20h30 (« le plus grand de Lyon », verres gratuits), Wallace Craft Beer, Wallace on Tour (concours photo), concerts réguliers (Fête de la Musique), Whisky Club.
- **Presse (vraie, c'est le meilleur contenu)** : vidéo virale du Mondial féminin 2019 relayée par Rolling Stone, USA Today, Fox News, The Guardian ; Le Progrès, ExitMag, Spot Web, Découvrir Auvergne-Rhône-Alpes, brunch british.
- **Facebook** : https://www.facebook.com/wallace.bar.9
- À NE PLUS AFFICHER sauf confirmation : « depuis 2005 », « 200 whiskies / 30 gins », Penicillin / Macallan / Scotch eggs, horaires d'animation inventés, GPS approximatif.

## 2. Photos : vraies, jamais du stock

Le site officiel héberge des photos réelles du bar : `/images/photos/` (visite de la brasserie, St Patrick's 2019, Six Nations 2019), `/images/wallaceevent1.jpg`… `wallaceevents04.jpg`, `food-slider-*.jpg`, `drinks01/02.jpg`, `wallace-bar-16-beers-on-draught.jpg`, visuels presse. Utilisation : **seulement avec l'accord du patron** (ce sont ses photos). Si l'accord n'est pas encore donné : les utiliser en maquette marquée « non officielle » et le dire. Sinon, l'utilisateur fournit un dossier de photos. Recherche web complémentaire : Facebook du bar, Google Maps, presse (Le Progrès) en créditant la source. Aucune image générée par IA.

## 3. Typographie (changement demandé)

Retirer Fraunces + DM Sans + JetBrains Mono (trio clichés « site de luxe IA »).
- **Titres** : Archivo, axe de largeur condensé, graisse 800-900, capitales : l'allure d'une enseigne de pub et d'une affiche de match. Pas d'italique décoratif sur un mot.
- **Texte** : Public Sans (ou Hanken Grotesk), 400/600, neutre et lisible.
- **Citations presse uniquement** : Newsreader (serif éditorial), pour le côté journal.
- Plus de monospace. Une seule échelle (ex. 14 / 16 / 20 / 32 / 56 / 96 px), line-height 1.5 texte, 1.0-1.1 titres.

## 4. Identité visuelle

- Palette tirée du lieu : à relever sur le logo `wallacebarlogo.png` du site officiel et sur les photos (bois, pierre du Vieux-Lyon, tartan, vert/bleu écossais). Fond clair ou mixte, pas de noir + ambre par défaut. 3 couleurs + 1 accent.
- Ton visuel : affiche de match, ardoise de bar, tartan réel : franc, un peu brut, imparfait. Pas de grain animé, pas de lueur, pas de verre dépoli.

## 5. Plan d'action en 4 lots

**Lot 0 : cadrage (30 min)**
Valider l'orientation « pub vivant » avec l'utilisateur ; accord sur les photos officielles ; vérifier qu'on garde bien le statut « maquette non officielle ».

**Lot 1 : nettoyage (impact fort, effort faible)**
Supprimer : intro logo, curseur custom, boutons magnétiques, lampe souris, jauge-verre, grain animé, marquee, compteurs 200/30/16, manifeste mot à mot, numérotation 01-06, sections festivals et galerie stock, Lenis, parallaxe généralisée. Retirer les commentaires « remplacer par photo réelle », « V2/V3 », les liens `#`.

**Lot 2 : contenu 100 % officiel**
Réécrire carte (vrais plats, vrais prix), bières (vraie liste), horaires bar + cuisine, événements (quiz du lundi, Whisky Club, concerts, craft beer), sport (4 écrans), presse (section forte). Textes courts, concrets, voix de pub (anglais/français comme sur le site officiel), zéro triade ni slogan.

**Lot 3 : identité et mise en page**
Nouvelle typo (§3), nouvelle palette (§4), photos réelles, structure plus sobre : Hero (vraie photo + « Everyday pub ») · Boire (bières maison) · Manger (carte) · Sport + Événements (planning) · Presse · Infos pratiques. Un seul effet de scroll assumé.

**Lot 4 : vérification**
Playwright desktop 1440 / tablette 768 / mobile 375, contraste AA, focus visible, `prefers-reduced-motion`, Lighthouse, JSON-LD (Restaurant/BarOrPub, horaires officiels, `servesCuisine`, `sameAs` Facebook), domaine canonique, passe finale « paraît-il IA ? » avec la grille d'audit.

## 6. Skills et MCP adaptés (vérifiés dans la liste de la session)

| Besoin | Outil | Verdict |
|---|---|---|
| Défaire le look IA | `redesign-existing-projects` | Principal |
| Critique + polish | `impeccable` | Principal |
| Typo, espacements, anti-défauts LLM | `high-end-visual-design`, `design-taste-frontend` | Appoint |
| Directions « brut / éditorial » | `industrial-brutalist-ui` (affiche/ardoise), `minimalist-ui` | Pour choisir une direction |
| Évaluation finale du rendu | `huashu-design` (revue 5 axes, liste anti-slop), `anthropic-skills:web-design-guidelines` | Revue |
| Tests navigateur | `playwright-cli`, MCP `Claude_Browser` (déjà utilisé) | Vérification |
| SEO local + schéma | `seo-local`, `seo-schema`, `seo-images` | Lot 4 |
| Inspiration de composants | MCP `21st` | Optionnel |
| À ÉVITER | génération d'images (MCP Alexya `generate_image`, `imagegen-*`), `brandkit`, `gpt-taste` (GSAP lourd), `ckm-*` | Recréent l'effet IA |
| Icônes | MCP `iconify` (reconnecté) : une seule famille, exportée en SVG inline | Utile, peu d'icônes (tél, itinéraire, horloge, sport) |
| shadcn / radix-ui | MCP reconnectés, mais le site est du HTML/CSS/JS statique | Non utilisés sauf si migration React |
| heroicons | Ne se connecte pas : abandonné | Remplacé par iconify |

## 7. Prompt ultime (à donner tel quel à l'agent d'exécution)

> **Rôle** : tu es designer-développeur front senior. Mission : reprendre le site statique `C:\Users\rumin\Documents\claudePro\wallace-bar-lyon` (index.html, styles.css, main.js, assets/) pour qu'il ne ressemble plus à un site généré par IA et soit fidèle au vrai Wallace Bar (Vieux-Lyon). Un manager l'a jugé « fait par IA ».
>
> **Source de vérité** : `PLAN-ANTI-IA.md` §1 (faits relevés sur wallacebarlyon.com). N'invente AUCUNE info : horaires, plats, prix, bières, événements, chiffres, dates. Si une info manque, ne l'écris pas.
>
> **Positionnement** : pub vivant « everyday pub » (fish & chips, burgers, sport sur 4 écrans, bière maison, concerts, quiz du lundi, Whisky Club), pas bar de luxe.
>
> **À faire, dans l'ordre** :
> 1. Invoque `redesign-existing-projects` et `impeccable`. Crée une branche git.
> 2. Supprimer tous les effets listés au Lot 1 du plan, y compris Lenis et GSAP si plus utilisés. Garder : statut ouvert/fermé (horaires officiels bar), dock mobile Appeler/Itinéraire, skip-link, onglets ARIA, reduced-motion.
> 3. Typographie : Archivo condensé 800-900 en capitales pour les titres, Public Sans pour le texte, Newsreader pour les citations presse. Pas de Fraunces/DM Sans/Inter/mono. Aucun mot en italique décoratif.
> 4. Palette : tirée du logo officiel et des photos ; pas de noir+ambre par défaut, pas de grain/glow/glass. Rayons et ombres cohérents.
> 5. Contenu : carte, bières, horaires, événements, sport, presse = uniquement ceux du plan §1. Textes courts, concrets, sans triades, antithèses ni slogans. Zéro tiret long.
> 6. Images : uniquement des photos réelles du bar (téléchargées depuis le site officiel dans `assets/img/real/`, avec accord à confirmer, sinon `PHOTO-A-FOURNIR` visible) ; supprimer tout le stock et le filtre CSS uniforme ; webp responsive, alt descriptifs réels. Aucune image générée.
> 7. Structure : Hero · Bière · Cuisine · Sport & événements · Presse · Infos pratiques. Un seul effet de scroll.
> 8. Liens : vrai Facebook, pas de `#`. Mention claire « maquette non officielle » en pied de page. JSON-LD limité aux faits officiels.
> 9. Nettoyer le code : plus de commentaires méta, noms de classes simples.
>
> **Vérifications** : serveur local + captures Playwright à 1440, 768, 375 px ; contraste AA ; aucune erreur console ; liens fonctionnels ; liste de toutes les infos de contenu avec leur source (page du site officiel). Re-passe la grille « signaux IA » du plan et donne un nouveau score /10 (objectif ≤ 3).
>
> **Réponse** : ≤ 300 mots : ce qui a changé, ce qui reste à fournir (photos, validations du patron), captures, score.
