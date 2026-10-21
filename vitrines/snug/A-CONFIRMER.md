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
- **16h-01h tous les jours** (Google Maps ; la bio Instagram dit « Everyday from 4pm » et un post du 15/10/2026 parle de « till one in the morning »). Règle de priorité : Maps > Instagram > site officiel > annuaires.
- **S1 reste ouverte** : le site officiel et Privateaser disent 00h30 en semaine, 02h le vendredi et le samedi, samedi dès 15h. Maps appliqué partout (tableau, statut, bloc Aujourd'hui, JSON-LD). Si le patron confirme 02h ven.-sam. : tableau, `"closes"` et `main.js` (`"5"` et `"6"` à `1560`) à modifier.
- Jour(s) de fermeture éventuels.
- Happy hour **16h-20h tous les jours** (Maps ; Instagram : « 4 hours of happy hour »). Maps affiche 18h-20h le jeudi : probable erreur, non reprise.

## Corrigé d'après les sources, à faire valider
- Accroche : « plus de 200 références, des gins, des cocktails et des pressions » (Privateaser « 200 whiskies », carte officielle). L'ancienne « carte courte » est retirée. Q10.
- Carte : « Gins » et « Snacks » (bio Instagram « Snacks » ; S3 résolue, « planches » non vu, retiré).
- Terrasse couverte confirmée par Google Maps (S4 résolue).
- Écrans : 2 écrans (Instagram : Ligue des champions, Premier League, matchs de la France ; S5 résolue). Formulation prudente « quelques matchs ».
- Infos pratiques ajoutées (Maps) : entrée accessible en fauteuil roulant, Wi-Fi gratuit, chiens acceptés.
- Liens : Instagram @wallacesnug et fiche Google Maps (itinéraire, `hasMap`, `sameAs`). **Aucun lien Facebook** : `facebook.com/wallace.snug.3` est un profil personnel. Question : le Snug a-t-il une Page Facebook officielle ?
- Note Google (4,3/5) volontairement non affichée.
- Instagram : plusieurs visuels récents sont générés par IA ; ne pas les reprendre comme photos du lieu (C11).

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
