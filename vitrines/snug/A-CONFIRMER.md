# À confirmer, Wallace Snug

Mis à jour le 21/10/2026 après l'audit (`audit/SYNTHESE.md`). Horaires affichés « provisoires ». Le JSON-LD, le tableau et le statut ouvert/fermé (`main.js`, `CONFIG.hours`) utilisent les mêmes horaires (vérifié par test automatique).
Règle appliquée : quand les sources divergent, la vitrine affiche la source la plus récente (voir `audit/verif-infos.md`) et le point reste ici jusqu'à validation du patron.

## Domaine (à remplacer avant mise en ligne)
- Placeholder : `https://[DOMAINE-A-DEFINIR]`. À remplacer partout par le vrai domaine (sans slash final) dans : `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD `@id`, `image` et `url`), `mentions-legales.html` (canonical), `robots.txt`, `sitemap.xml`.
- `noindex, nofollow` volontaire pendant le test : à retirer à la mise en ligne.
- Pied de page : liens « Les autres Wallace » relatifs (`../bar/index.html`, `../pub-vaise/index.html`), à remplacer par les vrais domaines.

## Mentions légales (`mentions-legales.html`), champs à compléter
- [RAISON SOCIALE DE L'EXPLOITANT], forme juridique, capital, SIRET, TVA.
- Directeur de la publication.
- Crédits photos (images actuelles = banque d'images générique), auteur du site.
- Email et téléphone repris de la carte de visite : à vérifier.

## Horaires (affichés)
- Lundi à jeudi et dimanche : 16h-00h30. Vendredi : 16h-02h. Samedi : 15h-02h (wallacesnug.com et Privateaser concordent ; Schlouk Map indique une fermeture à 01h en semaine).
- Jour(s) de fermeture éventuels.

## Corrigé d'après les sources, à faire valider
- Accroche : « plus de 200 références, des gins, des cocktails et des pressions » (Privateaser « 200 whiskies », carte officielle). L'ancienne « carte courte » est retirée. Q10.
- Carte : ajout de « Gins » et « Planches et snacks » (Privateaser « snacking », site officiel « nibbles »).
- Terrasse : « Terrasse couverte, ouverte toute l'année » (Privateaser, site officiel). Q7.
- Facebook : https://www.facebook.com/wallace.snug.3 (cité par visiterlyon 2025 et le site officiel), ajouté en lien et dans `sameAs`. Q12 : page officielle ?

## Prix
- Aucun prix affiché : « prix sur place ». `priceRange` omis du JSON-LD (Q9).

## Autres points
- Matchs sur demande sur grand écran (site officiel, Schlouk) : non affiché, Q10.
- Décor : texte « d'inspiration écossaise, lumière basse » : à valider avec des photos réelles.
- Photos : images génériques, pas du Snug (Q14).
- Typographie : titres h1/h2 en Fraunces 600 (`fonts/fraunces-600.woff2`, licence OFL dans `fonts/Fraunces-OFL.txt`), le reste en Barlow Condensed / Public Sans.
- Phrase d'ambiance « Ici, on vient pour parler. » : formule éditoriale (pas une citation de client), à valider.
- JSON-LD : `geo` absent, à ajouter avec les coordonnées de la fiche Google (Q14). Pas de `logo` (aucun fichier logo).
- Accès (métro, parking) non affiché : Q13.
- Image de partage : `img/og.jpg` (JPG 1200x630, recadrage de g-a-1024.webp, image générique).
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP `script-src 'self'`, cache images 30 jours, css/js 1 jour). Polices hébergées dans `fonts/`.
