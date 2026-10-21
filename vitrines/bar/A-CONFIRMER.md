# À confirmer, Wallace Bar

Les horaires diffèrent selon les sources (site officiel, Google, réseaux). Ils sont affichés comme « provisoires » sur la vitrine. Le JSON-LD, le tableau et le statut ouvert/fermé utilisent les mêmes horaires.

## Domaine (à remplacer avant mise en ligne)
- Placeholder : `https://[DOMAINE-A-DEFINIR]`. À remplacer partout par le vrai domaine (sans slash final) dans : `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD image et url), `mentions-legales.html` (canonical), `robots.txt`, `sitemap.xml`.
- Recherche : `[DOMAINE-A-DEFINIR]` dans le dossier.

## Mentions légales (`mentions-legales.html`), champs à compléter
- [RAISON SOCIALE DE L'EXPLOITANT], forme juridique, capital, SIRET, TVA.
- Directeur de la publication.
- Crédits photos (auteur et licence de chaque photo), auteur du site.
- Email et téléphone repris de la carte de visite : à vérifier.

## Horaires
- Bar : 11h-00h30 du dimanche au jeudi, 11h-02h30 vendredi et samedi (inchangé, d'après le site officiel).
- Cuisine : 12h-15h et 19h-22h du lundi au samedi, 11h-15h et 18h30-22h le dimanche.
- À valider avec le patron, ou par comparaison avec la fiche Google.

## Terrasse
- Terrasse couverte : affichée « à confirmer » (existence, nombre de places, période d'ouverture, chauffage).

## Brunch
- Jours (samedi ? dimanche ? les deux) et horaires. Le brunch n'est plus cité dans le JSON-LD tant que non confirmé.
- Le site officiel parle d'un brunch british ; carte et prix non repris.

## Prix
- Les prix de 2019 (fish & chips 18 €, burgers, etc.) ont été retirés : « prix sur place ».
- Fournir la carte actuelle si le patron veut afficher des prix. `priceRange` omis du JSON-LD.

## Matchs
- `SHEET_CSV_URL` dans `main.js` est un placeholder : tant qu'il n'est pas remplacé, la vitrine affiche « Programme à venir, appelez-nous ». Faux programme de test uniquement avec `?demo=1`.

## Autres points
- Chiffres « 200+ whiskies » et « 16 pressions » : à vérifier à la date de mise en ligne.
- Live du vendredi : type (concert, DJ), horaire. Quiz du lundi : 20h30 repris du site officiel.
- La liste des plats vient de l'ancienne carte : à vérifier.
- Liens sociaux : Instagram @wallacelyon et Facebook https://www.facebook.com/wallace.bar.9 (repris de l'ancien site, page à confirmer). Seuls ces liens sont dans `sameAs`.
- Image de partage : `img/og.jpg` (JPG 1200x630), droits des photos à valider.
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP). Polices hébergées dans `fonts/` (Barlow Condensed, Public Sans, licence OFL).
