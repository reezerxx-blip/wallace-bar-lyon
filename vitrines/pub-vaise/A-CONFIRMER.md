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
Priorité des sources : Google Maps mis à jour par l'entreprise > post Instagram récent (2026) > site officiel > annuaires.
- Lundi à samedi : bar 10h-01h (Google Maps, mis à jour par l'entreprise ; P1 résolue).
- **Dimanche : ouvert 17h30-00h** (Google Maps, horaires principaux) ; Instagram 09/10/2026 : « Notre cuisine est désormais ouverte tous les dimanches soirs ». Remplace « Dimanche fermé » (visiterlyon, Schlouk, périmés). `CONFIG.hours["0"] = [1050,1440]`, JSON-LD `Sunday` 17:30-00:00. Fermetures annuelles (1er janvier, 1er mai, 25 décembre) non affichées.
- Cuisine : 12h-14h30 et 19h-22h du lundi au samedi. **Dimanche soir : 19h-22h par défaut** (créneau du soir de semaine) car Instagram ne donne pas l'heure. Question : heure de la cuisine le dimanche soir ?

## Corrigé d'après les sources, à faire valider
- Bloc Brunch supprimé : aucune source ne cite un brunch à Vaise. Q5.
- Terrasse : « Terrasse » sans « couverte » (non vérifiable). Q7.
- Carte : fish & chips, burgers, pulled pork, grillades au four Josper, planches, menu enfant, desserts maison (site officiel `food.html`, non daté).
- Facebook : `pubvaise.wallace` retiré des liens et du `sameAs` (contenu indisponible, peut-être mort). Liens actuels : Instagram @wallacepub et fiche Google Maps (itinéraire, `hasMap`, `sameAs`). Question : le Pub a-t-il une Page Facebook officielle encore active ? (`facebook.com/wallacepub` est un autre établissement, ne pas l'utiliser.)
- Quiz : « Certains lundis, 20h, sur réservation » (Instagram : 12/10, 09/11, 30/11/2026), dates sur Instagram. Question : quiz tous les lundis ou seulement certains ?
- Carte de saison (automne) citée ; réservation 04 72 09 97 93 et accès métro D / Gare de Vaise (5 min à pied) ajoutés (P14 résolue). Services Maps ajoutés : accessibilité, parking payant dans la rue, Wi-Fi, chiens.
- Note Google (4,3/5) volontairement non affichée.
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
- Photos : images génériques de banque d'images, pas des photos du pub. Remplacer par des photos réelles de Vaise (Q14).
- JSON-LD : `geo` absent, à ajouter avec les coordonnées de la fiche Google (Q14). Pas de `logo` (aucun fichier logo).
- Image de partage : `img/og.jpg` (JPG 1200x630, recadrage de hero-1024.webp, image générique).
- Hébergement : `vercel.json` (en-têtes de sécurité, CSP `script-src 'self'`, cache images 30 jours, css/js 1 jour). Polices hébergées dans `fonts/`.
