# À confirmer, Wallace Snug

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
- Lundi à jeudi et dimanche : 16h-00h30. Vendredi : 16h-02h. Samedi : 15h-02h (l'ancienne fermeture à 04h est supprimée).
- Jour(s) de fermeture éventuels. Le Snug sert-il à manger ?

## Terrasse
- Terrasse couverte : affichée « à confirmer » (existence, places, période d'ouverture).

## Brunch
- Pas de brunch affiché (non indiqué pour le Snug).

## Prix
- Aucun prix affiché : « prix sur place ». `priceRange` omis du JSON-LD.

## Autres points
- Contenu de la carte (whiskies, cocktails, bières, vins, sans alcool) : intitulés génériques, à remplacer par la vraie offre.
- Le nombre de références whisky n'est pas affiché faute de chiffre fiable.
- Décor : texte « d'inspiration écossaise, lumière basse » (plus de boiseries ni fauteuils en cuir) : à valider avec des photos réelles.
- Photos : images génériques, pas du Snug.
- Facebook : le lien de recherche Facebook a été retiré (page et JSON-LD `sameAs`). Fournir l'URL exacte de la page si elle existe. Seul Instagram @wallacesnug est conservé.
- Image de partage : `img/og.jpg` (JPG 1200x630, recadrage de g-a-1024.webp, image générique).
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP). Polices hébergées dans `fonts/`.
