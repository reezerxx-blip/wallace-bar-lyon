# À confirmer, Wallace Bar

Mis à jour le 21/10/2026 après l'audit (`audit/SYNTHESE.md`). Les horaires sont affichés « provisoires » sur la vitrine. Le JSON-LD, le tableau et le statut ouvert/fermé (`main.js`, `CONFIG.hours`) utilisent les mêmes horaires (vérifié par test automatique).
Règle appliquée : quand les sources divergent, la vitrine affiche la source la plus récente (voir `audit/verif-infos.md`) et le point reste ici jusqu'à validation du patron.

## Domaine (à remplacer avant mise en ligne)
- Placeholder : `https://[DOMAINE-A-DEFINIR]`. À remplacer partout par le vrai domaine (sans slash final) dans : `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD `@id`, `image`, `logo` et `url`), `mentions-legales.html` (canonical), `robots.txt`, `sitemap.xml`.
- `noindex, nofollow` volontaire pendant le test : à retirer à la mise en ligne.
- Pied de page : liens « Les autres Wallace » relatifs (`../snug/index.html`, `../pub-vaise/index.html`), valables tant que les 3 vitrines sont servies ensemble. À remplacer par les vrais domaines.

## Mentions légales (`mentions-legales.html`), champs à compléter
- [RAISON SOCIALE DE L'EXPLOITANT], forme juridique, capital, SIRET, TVA.
- Directeur de la publication.
- Crédits photos (auteur et licence de chaque photo), auteur du site.
- Email et téléphone repris de la carte de visite : à vérifier.

## Horaires (affichés)
Priorité des sources : Google Maps mis à jour par l'entreprise > post Instagram récent (2026) > site officiel > annuaires. Compléments du 21/10/2026 : `audit/verif-infos.md`.
- Bar : 11h-00h30 du dimanche au jeudi, 11h-02h30 vendredi et samedi (Google Maps ; vendredi-samedi confirmé aussi par la bio Instagram).
  - **B1 reste ouverte** : la bio Instagram dit « Sun - Thu 11h - 1h », Google Maps dit 00h30. Maps appliqué (règle de priorité), question gardée : 00h30 ou 01h du dimanche au jeudi ? Si 01h : tableau `11h-01h`, JSON-LD `"closes": "01:00"`, `main.js` `"0":[660,1500]` à `"4":[660,1500]`.
- Cuisine (Google Maps, onglet Cuisine) : 12h-14h30 du lundi au vendredi, 12h-15h le samedi, 11h-15h le dimanche ; soir 19h-22h tous les jours, dimanche compris.

## Corrigé d'après les sources, à faire valider
- Quiz du lundi : « Lundi, inscriptions dès 20h » (affiches et posts Instagram 09-10/2026 ; la bio dit 20h30, probablement le début du jeu). En français et en anglais. Heure exacte de début : question B6 résolue pour le jour, heure à confirmer au passage.
- Fléchettes : un mercredi par mois, 19h (Instagram : 23/09 et 28/10/2026). Dates publiées sur Instagram.
- Concerts : ponctuels, pas de jour fixe, programme sur Instagram (B7 résolue). « Live le vendredi » reste retiré.
- Brunch : week-end, samedi 12h-15h, dimanche 11h-15h (bio Instagram, Maps ; B5 résolue).
- Terrasse confirmée par Google Maps (B9 résolue). Nombre de places inconnu.
- Infos pratiques ajoutées (Google Maps, B15 résolue) : accès fauteuil roulant, Wi-Fi gratuit, réservations, menu enfant, chaises hautes, titres-restaurant, vente à emporter, happy hour jusqu'à 20h (Maps dit 11h-20h).
- Note Google (4,2/5) volontairement non affichée : elle bouge et ne doit pas figurer en données structurées self-serving.

## Prix
- Les prix de 2019 ont été retirés : « prix sur place ». Fournir la carte actuelle si le patron veut afficher des prix (Q9). `priceRange` omis du JSON-LD.

## Matchs
- `SHEET_CSV_URL` (`main.js`) est branché sur le **Sheet de test commun** (lu via l'adresse `gviz`, partage par lien), à remplacer par le Sheet définitif publié en CSV (voir `GUIDE-MATCHS.md`). Un seul Sheet sert au Bar et au Pub.
- Messages : « Chargement du programme… » pendant le chargement, « Programme à venir, appelez-nous » si le Sheet est vide, « Programme momentanément indisponible » s'il est injoignable (délai 4 s). Faux programme uniquement avec `?demo=1`.
- Q11 : la colonne `ecran` est commune aux deux bars (4 écrans au Bar, 2 au Pub). Écran générique ou colonne `lieu` ?
- « 4 grands écrans » (site officiel, octobre 2026) non affiché : attend la validation du patron (Q10).

## Autres points
- Chiffres « 200+ whiskies » et « 16 pressions » : à vérifier à la date de mise en ligne (Q10).
- La liste des plats vient de la carte officielle non datée : à vérifier.
- Liens : Instagram @wallacelyon, TikTok @wallacelyon (lien de la bio Instagram) et fiche Google Maps (itinéraire, `hasMap`, `sameAs`). **Aucun lien Facebook** : `facebook.com/wallace.bar.9` est un profil personnel, pas une Page. Question : le Bar a-t-il une Page Facebook officielle ?
- JSON-LD : `geo` absent, à ajouter avec les coordonnées de la fiche Google (Q14).
- Accès (métro, parking) non affiché : Q13.
- Photos : la plus récente date de 2019 (légende « Soirée Saint-Patrick », sans année). Demander des photos récentes (Q14).
- Image de partage : `img/og.jpg` (JPG 1200x630), droits des photos à valider.
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP `script-src 'self'` sans `unsafe-inline`, cache images 30 jours, css/js 1 jour). Polices hébergées dans `fonts/` (Barlow Condensed, Public Sans, licence OFL).
