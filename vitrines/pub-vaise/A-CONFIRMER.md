# À confirmer, Wallace Pub Vaise

Mis à jour le 21/10/2026 après l'audit (`audit/SYNTHESE.md`). Horaires affichés « provisoires ». Le JSON-LD, le tableau et le statut ouvert/fermé (`main.js`, `CONFIG.hours`) utilisent les mêmes horaires (vérifié par test automatique).
Règle appliquée : quand les sources divergent, la vitrine affiche la source la plus récente (voir `audit/verif-infos.md`) et le point reste ici jusqu'à validation du patron.

## Domaine (à remplacer avant mise en ligne)
- Placeholder : `https://[DOMAINE-A-DEFINIR]`. À remplacer partout par le vrai domaine (sans slash final) dans : `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD `@id`, `image` et `url`), `mentions-legales.html` (canonical), `robots.txt`, `sitemap.xml`.
- `noindex, nofollow` volontaire pendant le test : à retirer à la mise en ligne.
- Pied de page : liens « Les autres Wallace » relatifs (`../bar/index.html`, `../snug/index.html`), à remplacer par les vrais domaines.

## Mentions légales (`mentions-legales.html`), champs à compléter
- [RAISON SOCIALE DE L'EXPLOITANT], forme juridique, capital, SIRET, TVA.
- Directeur de la publication.
- Crédits photos (images actuelles = banque d'images générique), auteur du site.
- Email et téléphone repris de la carte de visite : à vérifier.

## Horaires (affichés)
- Lundi à samedi : bar 10h-01h (visiterlyon 16/06/2026, Privateaser).
- **Dimanche : fermé** (visiterlyon 2026 « du lundi au samedi », Schlouk « Dimanche fermé »). Le statut affiche désormais « Fermé, ouvre demain à 10h » au lieu de « à confirmer » (`CONFIG.hours["0"] = []`). Q6, avec les fermetures annuelles (1er janvier, 1er mai, 25 décembre selon visiterlyon 2026, non affichées).
- Cuisine : **12h-14h30** et 19h-22h du lundi au samedi (site officiel `food.html`). Q4 : 14h30 ou 15h ?

## Corrigé d'après les sources, à faire valider
- Bloc Brunch supprimé : aucune source ne cite un brunch à Vaise. Q5.
- Terrasse : « Terrasse » sans « couverte » (non vérifiable). Q7.
- Carte : fish & chips, burgers, pulled pork, grillades au four Josper, planches, menu enfant, desserts maison (site officiel `food.html`, non daté).
- Facebook : https://www.facebook.com/pubvaise.wallace (cité par visiterlyon 2026), ajouté en lien et dans `sameAs`. Q12 : page officielle ?
- Enseigne : H1 « Wallace Pub Vaise » (nom du JSON-LD et du logo). Q12 : « Wallace Pub » ou « Wallace Pub Vaise » ?

## Prix
- Aucun prix affiché : « prix sur place ». Plat du jour : prix. `priceRange` omis du JSON-LD (Q9).

## Matchs
- `SHEET_CSV_URL` (`main.js`) est branché sur le **Sheet de test commun** (lu via l'adresse `gviz`, partage par lien), à remplacer par le Sheet définitif publié en CSV (voir `GUIDE-MATCHS.md`). Un seul Sheet sert au Bar et au Pub.
- Messages : « Chargement du programme… », puis « Programme à venir, appelez-nous » (Sheet vide) ou « Programme momentanément indisponible » (Sheet injoignable, délai 4 s). Faux programme uniquement avec `?demo=1`.
- Q11 : la colonne `ecran` est commune aux deux bars (2 écrans au Pub, 4 au Bar).

## Autres points
- Les 2 écrans géants, le four Josper, la musique irlandaise le 1er lundi et les concerts sont confirmés (visiterlyon 2026).
- Chiffre whiskies (120 à 130 selon les sources) non affiché : Q10.
- Accès (métro D, Gare de Vaise) non affiché : Q13.
- Photos : images génériques de banque d'images, pas des photos du pub. Remplacer par des photos réelles de Vaise (Q14).
- JSON-LD : `geo` absent, à ajouter avec les coordonnées de la fiche Google (Q14). Pas de `logo` (aucun fichier logo).
- Image de partage : `img/og.jpg` (JPG 1200x630, recadrage de hero-1024.webp, image générique).
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP `script-src 'self'`, cache images 30 jours, css/js 1 jour). Polices hébergées dans `fonts/`.
