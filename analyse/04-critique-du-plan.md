# Critique du plan 03 (juge indépendant)

Sources lues : 01-critique, 02-references, 03-plan-refonte, titres de PLAN-ANTI-IA. Contrastes recalculés par script (formule WCAG 2.x).

## Verdict rapide
Plan solide, très au-dessus de l'état actuel : faits verrouillés, grille de juge mesurable, périmètres disjoints. Mais il reste trois faiblesses : (1) bar/ risque de tomber dans le « template craft brewery » généré, (2) le traitement des états vides multiplie les « à venir » et donne un site inachevé, (3) le processus coûte trop (3 tours de juges, Opus au mauvais endroit).

---

## 1. Directions

**Différence réelle : oui.** Sombre saturé + capitales condensées + ardoise (pub/) contre clair kraft + grotesque arrondie + étiquettes (bar/). Le tableau 2.4 est honnête. Les deux sont adaptées : pub/ colle au positionnement sport, bar/ met enfin bière et whisky au centre.

**Désirabilité**
- pub/ : bonne, à condition de réduire la palette. Vert + ardoise + bleu + bois + rouge + papier + craie = 6 couleurs de fond/accents, bien au-delà de la règle « 3 + 1 », et vert + rouge sur papier flirte avec Noël/drapeau italien. Garder : vert bouteille, ardoise, papier, craie ; rouge = accent unique (pastille, heures) ; bleu limité à la section Sport ; le bois seulement en cadre/bande whisky.
- bar/ : risque principal. Kraft + blanc cassé + vert houblon + Bricolage + coins arrondis 8 px + cadre Polaroid + étiquettes SVG est exactement ce que produit un LLM quand on dit « craft brewery, artisanal ». Les 4 étiquettes dessinées « à la main en SVG » par un modèle seront génériques (rectangle arrondi + nom + tampon) : c'est l'élément le plus exposé à l'effet IA, et il est placé dans le hero. Même défaut pour la silhouette de carte Écosse/Irlande/monde (un contour vectoriel fait par modèle sera faux ou naïf) : à supprimer.
- Les chiffres géants (4, 16, 20h30 en 150 px) et la grille « semaine en 7 colonnes » de cartes identiques sont des tropes de « stat row / bento » IA, listés pourtant dans les signaux à éviter (cartes identiques, compteurs). Ils sont ici posés comme remède aux petites photos. Les garder en nombre limité (un seul chiffre géant par page) et sous forme de vraie typographie de tableau, pas de tuiles.
- Le H1 de bar/ « Bière brassée maison, whisky, cuisine de pub » est une triade, interdite par le plan lui-même (§1.5). Proposer : « Le pub du Vieux-Lyon qui brasse sa bière » (un fait, une phrase).

**Risque bar/ « vide » :** réduit (largeur 1200+, images, matière), mais pas supprimé. Le vide revient par : section Whisky vide (3 onglets sans contenu), Brunch vide, ABV vides, Presse sans citation. Voir §2 pour le traitement. Mesure additionnelle : exiger qu'aucune section ne dépende d'une donnée absente pour avoir un titre + une image + un fait.

**Polices.** Bricolage Grotesque est devenue la police « startup/IA 2024-26 » par excellence (même constat pour Hanken Grotesk et Instrument/Plus Jakarta, tous cités dans le CLAUDE.md global comme « corrects » mais surutilisés). Pour bar/ elle trahit le template. Archivo en largeur 62-75 + Public Sans pour pub/ est acceptable, mais Archivo Black en capitales est aussi très vu. Propositions (toutes Google Fonts, hors liste interdite) :
- pub/ : titres **Barlow Condensed** 700-800 (vrai gabarit d'affiche sportive) ou **Oswald** ; texte **Public Sans** ou **Barlow** 400/600. Alternative plus signée : **Alfa Slab One** pour la seule enseigne « EVERYDAY PUB ».
- bar/ : titres **Young Serif** ou **Gloock** (sérif chaleureux d'étiquette, rompt avec la tendance grotesque arrondie et sépare nettement des deux sites), texte **Karla** ou **Libre Franklin** 400/600. Newsreader pour les citations devient redondant avec un sérif de titre : utiliser Young Serif aussi pour les citations, donc 2 familles seulement.
- Chiffres tabulaires : `font-variant-numeric: tabular-nums` fonctionne dans Public Sans/Libre Franklin ; à vérifier pour Barlow et Young Serif (sinon prix en police du texte).

## 2. Palettes, contrastes, honnêteté

Contrastes recalculés (WCAG) :

| Couple | Ratio | Verdict |
|---|---|---|
| `#A3322B` sur `#F1EADB` (rouge sur papier) | 5,75 | OK (plan : 5,7) |
| `#4F6B2E` sur `#F7F3EA` (houblon sur blanc cassé) | 5,46 | OK (plan : 5,5) |
| `#A9501F` sur `#F7F3EA` (orange texte) | 4,92 | OK, marge faible (plan : 5,0) |
| `#E8C547` sur `#2A2F2C` (craie sur ardoise) | 8,11 | OK |
| `#F1EADB` sur `#1F4D3A` / `#18325E` / `#5A3B22` | 8,04 / 10,58 / 8,42 | OK |
| `#D8C7A3` sur `#1C3A4F` (kraft sur bleu) | 7,14 | OK |
| **`#4F6B2E` sur kraft `#D8C7A3`** | **3,63** | **ÉCHEC** (sections 2 et 6 de bar/ sont sur kraft) |
| **`#A9501F` sur kraft** | **3,27** | **ÉCHEC** |
| **`#A3322B` sur ardoise `#2A2F2C`** | **1,98** | **ÉCHEC** (si une pastille rouge porte du texte rouge, ou rouge sur ardoise) |
| **gris « ABV : à venir » `#888` sur crème** | **3,20** | **ÉCHEC** (« discret » ne doit pas vouloir dire sous 4,5) |

Règle à ajouter : sur kraft, texte en encre `#26231E` (9,41) seulement ; houblon/orange interdits en texte sur kraft ; rouge sur ardoise interdit.

**Faits et honnêteté.** Aucune invention : très bien. Mais le plan affiche « à venir » à au moins 5 endroits par page (whisky vide, brunch, ABV x4, presse sans citation, horaires d'événements, « photo provisoire »). Devant un client, cela se lit « site inachevé », pas « honnête ». Traitement proposé :
1. **Whisky** : ne pas afficher d'onglets vides. Tant que `whisky.json` est vide, une seule section éditoriale : titre « Wee whisky list », trois lignes « Écosse. Irlande. Monde. » comme intertitres typographiques, Whisky Club (existence), photo, bouton « Demander la carte : 04 72 00 23 91 ». Les onglets n'apparaissent que lorsque les données existent (amélioration progressive). Pas de phrase « arrive bientôt ».
2. **Brunch** : pas d'onglet. Un bloc dans la carte : « Brunch british le week-end. La cuisine ouvre à 11h le dimanche. » (deux faits sûrs, §1 + horaires) + lien appeler. Pas de « carte à venir ».
3. **ABV** : ne rien afficher quand absent (supprimer la ligne grise). Les champs s'affichent quand remplis.
4. **« À fournir »** : un seul endroit, dans le message au client et `05-livraison.md`, jamais sur les pages (sauf mention de pied « maquette non officielle »).
5. « Photo provisoire » seulement en commentaire code, déjà prévu ; mais le plan interdit aussi les commentaires de code « remplacer par photo » (signal IA §5.3) : incohérence à lever.
6. « Le plus grand de Lyon », « verres gratuits » : déclarations promotionnelles du bar, à présenter entre guillemets comme texte officiel du site, pas comme fait de l'agence.
7. « Match ce soir » via JSON rempli par le patron : irréaliste pour un site statique non maintenu et fetch JSON échoue en `file://`. Retirer en v1 ; garder « Sport sur 4 écrans ».

## 3. Plan d'exécution

- **Trop de tours de juge.** J1, J2, J3 + J3b = 6 appels de juge ; E2 (composants) est séparé d'E1 alors que le juge « pas vide » ne peut pas évaluer E1 sans C1-C4. Fusionner E1+E2 en une seule étape de dev par site, un seul juge (J1), puis E3, puis J3 final. Économie estimée : un tiers des tokens.
- **Opus pour B1 : non justifié.** Le risque « retomber dans le vide » se traite par une spécification visuelle précise (déjà écrite) et un juge qui voit les captures, pas par un modèle plus cher qui écrit du CSS. Ramener B1 à Sonnet. Garder Opus pour **J3 seulement** (jugement de goût, arbitrage). Si budget limité : J3 en Sonnet avec checklist, Opus en relecture finale de 2 captures.
- **Seuil 8/10 pondéré** : bon, mais le critère « Anti-IA » est auto-évalué par un modèle de la même famille qui a écrit le code : biais. Ajouter un **point de contrôle humain** (le user regarde 4 captures) avant E3. « Écart de style ≥ 8/10 » est une mesure floue : remplacer par une checklist binaire (fond dominant, famille titres, hero, objet signature différents).
- **Boucle 3 itérations max** puis escalade : bien. Prévoir un budget de tokens par agent (plafond de relectures de captures : 3 tailles x 2 versions x 3 tours est lourd ; capturer uniquement premier écran + pleine page 1440 + 375 à chaque tour, 768 au tour final).
- **Parallélisme** : sûr (périmètres disjoints). Mais E0 doit figer le schéma de `data/*.json` avant B1/P1, et l'embarquer en JS inline ou `<script type="application/json">` pour éviter le fetch.
- **Photos dérivées** : l'étape qui les crée (E0 ou E1) n'est pas nommée de façon unique ; deux agents écrivant `pub/img` et `bar/img` indépendamment dupliquent le travail. Lui donner à A0 (un script de recadrage/export), sans modifier `assets/img/real/`.
- **Mesure « renderedWidth <= naturalWidth »** à DPR 1 : en retina tout est quand même flou. Plafonner par `max-width` en px (le hero pub/ à 50 % de 1920 px = 960 px > 720 natifs : prévoir `max-width:720px`) et ne pas promettre la netteté.
- **Lighthouse ≥ 85 perf** avec polices Google : prévoir `font-display:swap`, 2 familles seulement, préconnexion, ou auto-hébergement.

## 4. Trous

- **Mentions légales alcool/restauration** : message de santé (« L'abus d'alcool est dangereux pour la santé »), allergènes (obligation d'information, au moins « allergènes : demandez au comptoir »), prix TTC. Absents du plan.
- **Réservation** : le plan n'a que Appeler/courriel ; acceptable, mais l'afficher dans « à fournir » (présent #12) et ne pas écrire « Réserver ».
- **Section « le lieu »** : aucun contenu officiel sur le cadre (Vieux-Lyon, bord de Saône, façade) hors adresse. Éviter de la créer, mais le hero bar/ gagne à une photo de la salle, pas seulement de la brasserie.
- **SEO local** : JSON-LD prévu, mais manquent : `<title>` et H1 avec « pub Vieux-Lyon », `lang="fr"` et `lang="en"` sur « Everyday pub », NAP identique partout et identique à Google Business, `geo`/`hasMap`, `og:image` (≥ 1200x630 : aucune photo native assez grande, utiliser un montage 1200x630 de deux photos), `robots`/`noindex` tant que maquette non officielle (sinon duplication du contenu officiel : important), sitemap sans objet pour 1 page.
- **Accessibilité** : onglets ARIA ok ; ajouter lien d'évitement, tableaux avec `<th scope>`, ardoise craie à ≥ 16 px, ordre de focus, texte alternatif des affiches (lire le texte de l'affiche), annonce du statut ouvert/fermé (`aria-live="polite"` désactivé pour la mise à jour minute).
- **Mobile** : premier écran photo + titre + Appeler est bien spécifié ; manque la gestion des tableaux de pressions et de carte à points de conduite à 375 px, et la taille du dock bas sur iOS (`safe-area-inset-bottom`).
- **Anti-IA oublié** : (a) la grille de signaux §5.3 ne contient pas « Polaroid partout », « étiquettes SVG génériques », « chiffres géants en tuiles », « polices tendance (Bricolage, Instrument, Hanken) » ; (b) le plan impose le même cadre pour toutes les photos de bar/ : trop systématique, comme le sticker de pub/ qu'on reproche ; (c) textes : exiger du contenu rédigé à partir des seuls faits, longueur courte, pas de formules d'accroche ; (d) le fichier des commentaires de code et noms de classes (`.hero-section__container`) sont aussi un signal ; (e) tirets longs dans le HTML/JSON-LD et ellipses typographiques.
- **Photos petites** : les stratégies sont bonnes. Ajouter : ne pas recadrer l'affiche « 16 pressions » ni la lire comme photo ; version zoomable (lien vers l'image) pour lire le texte ; ne pas montrer les montages de concerts comme ambiance.

---

## CORRECTIONS PRÉCISES À APPLIQUER AU PLAN

1. §1.4 : remplacer Bricolage/Hanken (bar/) par **Young Serif ou Gloock + Karla ou Libre Franklin** ; pub/ : **Barlow Condensed 700-800 + Public Sans** (Archivo en repli). Supprimer Newsreader (2 familles max par page).
2. §1.3 pub/ : réduire à vert bouteille, ardoise, papier, craie + rouge unique ; bleu limité à Sport ; bois en cadre seulement.
3. §1.3 / §5 : règle de contraste explicite : sur kraft, texte `#26231E` uniquement ; houblon (3,63) et orange (3,27) interdits en texte sur kraft ; rouge sur ardoise interdit (1,98) ; texte « discret » ≥ 4,5:1.
4. §2.1 C2 : onglets whisky affichés seulement si données ; sinon section éditoriale (Écosse. Irlande. Monde. + Whisky Club + photo + Appeler). Supprimer « arrive bientôt ».
5. §2.1 C4 : supprimer l'onglet Brunch ; bloc « Brunch british le week-end. La cuisine ouvre à 11h le dimanche. ». Supprimer « ABV : à venir » ; limiter les « à venir » visibles à zéro (liste « à fournir » hors page).
6. §2.3 : supprimer la carte vectorielle des régions ; hero bar/ : H1 non triadique (« Le pub du Vieux-Lyon qui brasse sa bière ») ; étiquettes SVG réduites à un seul traitement typographique simple (nom + aplat), pas hero-centrées ; photos : cadres variés (pas un Polaroid universel).
7. §2.1 C1 / §3 : retirer « Match ce soir » (JSON patron) en v1 ; intégrer les JSON en inline/`application/json` (pas de fetch).
8. §2.2 / §2.3 : limiter les chiffres géants à un par page ; semaine bar/ en tableau typographique plutôt que 7 cartes.
9. §4 : fusionner E1+E2 ; un seul juge intermédiaire ; ajouter un point de contrôle humain avant E3 ; plafonner les captures par tour.
10. §4 : **B1 en Sonnet** ; Opus uniquement pour J3 ; critère « écart de style » remplacé par une checklist binaire de 5 différences.
11. §2/§5 : ajouter mention santé alcool, allergènes (« demandez au comptoir »), `noindex` tant que maquette, `lang`, `og:image` en montage 1200x630, `max-width` du hero plafonné à la largeur native.
12. §5.3 : ajouter aux signaux IA « Polaroid/sticker systématique », « étiquettes SVG génériques », « tuiles de chiffres géants », « polices tendance », et lever la contradiction commentaire « photo provisoire » / interdiction des commentaires de code.

## Verdict : 7,5/10
Plan cohérent et exécutable, avec des fondations factuelles très saines. Il perd des points sur les contrastes de bar/ (3 échecs), les « à venir » qui rendent le site inachevé, la dérive « template craft » de bar/ et un coût de process évitable.
