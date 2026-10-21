# À confirmer, Wallace Pub Vaise

Horaires provisoires selon des sources tierces, affichés « provisoires, à confirmer » sur la vitrine. Le JSON-LD, le tableau et le statut ouvert/fermé utilisent les mêmes horaires.

## Domaine (à remplacer avant mise en ligne)
- Placeholder : `https://[DOMAINE-A-DEFINIR]`. À remplacer partout par le vrai domaine (sans slash final) dans : `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD image et url), `mentions-legales.html` (canonical), `robots.txt`, `sitemap.xml`.
- Recherche : `[DOMAINE-A-DEFINIR]` dans le dossier.

## Mentions légales (`mentions-legales.html`), champs à compléter
- [RAISON SOCIALE DE L'EXPLOITANT], forme juridique, capital, SIRET, TVA.
- Directeur de la publication.
- Crédits photos (images actuelles = banque d'images générique), auteur du site.
- Email et téléphone repris de la carte de visite : à vérifier.

## Horaires (provisoires)
- Lundi à samedi : 10h-01h.
- Dimanche : à confirmer (affiché « À confirmer », statut neutre ni ouvert ni fermé). Les horaires de cuisine du dimanche sont supprimés.
- Horaires de la cuisine en semaine (12h-15h, 19h-22h) : à confirmer.

## Terrasse
- Terrasse couverte : affichée « à confirmer ». La photo `img/salle-1024.webp` (ex-terrasse) montre la salle : renommée et légendée « Salle du pub ». Fournir une vraie photo de terrasse si elle existe.

## Brunch
- Brunch : existence, jours et horaires à confirmer. Marqué « À confirmer » sur la page, retiré de la méta-description.

## Prix
- Aucun prix affiché : « prix sur place ». Plat du jour : prix et horaires. `priceRange` omis du JSON-LD.

## Matchs
- `SHEET_CSV_URL` dans `main.js` est un placeholder : tant qu'il n'est pas remplacé, la vitrine affiche « Programme à venir, appelez-nous ». Faux programme de test uniquement avec `?demo=1`.

## Autres points
- Les 2 écrans géants, le four Josper, la musique irlandaise le 1er lundi, les concerts et le plat du jour viennent du brief : ajouter jours, horaires et programme.
- Cuisine « de pub » et liste des bières : texte générique, à compléter avec la vraie carte.
- Photos : images génériques de banque d'images, pas des photos du pub. Remplacer par des photos réelles de Vaise.
- Facebook : le lien de recherche Facebook a été retiré (page et JSON-LD `sameAs`). Fournir l'URL exacte de la page. Seul Instagram @wallacepub est conservé.
- Image de partage : `img/og.jpg` (JPG 1200x630, recadrage de hero-1024.webp, image générique).
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP). Polices hébergées dans `fonts/`.
