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
- Bar : 11h-00h30 du dimanche au jeudi, 11h-02h30 vendredi et samedi (site officiel).
  - **Question Q1 en attente** : PagesJaunes (01/10/2026) dit 02h le vendredi et le samedi. Non modifié : point classé « en attente du patron ». Si 02h : tableau `11h-02h`, JSON-LD `"closes": "02:00"`, `main.js` `"5":[660,1560],"6":[660,1560]`.
  - Dimanche : 00h30 ou minuit (une fiche de juillet 2025 dit 23h59).
- Cuisine : 12h-15h et 19h-22h du lundi au samedi, 11h-15h et 18h30-22h le dimanche (site officiel `food.html`). Variante 12h-14h30 sur la page d'accueil officielle (Q4).

## Corrigé d'après les sources, à faire valider
- Quiz du lundi : **20h** (programme officiel `sports.html` d'octobre 2026 ; l'ancienne page `events.html` disait 20h30). Q2.
- « Live le vendredi » retiré (aucune source) : remplacé par « Concerts, régulièrement, programme sur Facebook et Instagram ». Q3 : y a-t-il un jour fixe ?
- Brunch : « Samedi 12h-15h, dimanche 11h-15h » (site officiel `food.html`, non daté). Q5.
- Terrasse : « Grande terrasse couverte face à la Saône » (visiterlyon 2025). Nombre de places inconnu. Q7.

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
- Liens sociaux : Instagram @wallacelyon et Facebook https://www.facebook.com/wallace.bar.9 (confirmés par visiterlyon 2025). Seuls ces liens sont dans `sameAs`.
- JSON-LD : `geo` absent, à ajouter avec les coordonnées de la fiche Google (Q14).
- Accès (métro, parking) non affiché : Q13.
- Photos : la plus récente date de 2019 (légende « Soirée Saint-Patrick », sans année). Demander des photos récentes (Q14).
- Image de partage : `img/og.jpg` (JPG 1200x630), droits des photos à valider.
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP `script-src 'self'` sans `unsafe-inline`, cache images 30 jours, css/js 1 jour). Polices hébergées dans `fonts/` (Barlow Condensed, Public Sans, licence OFL).
