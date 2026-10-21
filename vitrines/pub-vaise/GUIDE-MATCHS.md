# Guide matchs, Wallace Pub Vaise

1. Créez un Google Sheet avec ces colonnes en ligne 1, exactement : `date`, `heure`, `equipe1`, `equipe2`, `ecran`. Une colonne en plus (par exemple `jour`) est ignorée : le jour s'affiche tout seul. Un modèle prêt à importer : `vitrines/modele-matchs.csv`.
2. Une ligne par match. Date : `2026-11-14` ou `14/11/2026`. Heure : `21:00` ou `21h00`. Équipes : `France` et `Marseille`. Écran : `Écran 1`, `Écran 2` ou `Les deux`.
3. Chaque carte est coupée en deux : la moitié gauche aux couleurs de `equipe1`, la droite à celles de `equipe2` (France = bleu, blanc, rouge ; Marseille = bleu ciel et blanc).
4. Noms reconnus (accents et majuscules sans importance, alias acceptés comme OM, PSG, OL, ASSE) :
   - Sélections : France, Irlande, Écosse, Angleterre, Pays de Galles, Italie, Espagne, Allemagne, Portugal, Belgique, Pays-Bas, Argentine, Brésil, Afrique du Sud, Nouvelle-Zélande, Australie, Maroc, Algérie, Sénégal, Croatie.
   - Ligue 1 : PSG, OM (Marseille), OL (Lyon), Monaco, Lille, Nice, Lens, Rennes, Saint-Étienne (ASSE), Nantes, Strasbourg, Toulouse FC (TFC).
   - Premier League : Manchester United, Manchester City, Liverpool, Arsenal, Chelsea, Tottenham, Newcastle.
   - Liga, Serie A, Bundesliga : Real Madrid, Barça, Atlético, Juventus, Milan, Inter, Naples, Bayern, Dortmund.
   - Top 14 : LOU, Toulouse (Stade Toulousain), Racing 92, Stade Français, Toulon, La Rochelle, Clermont, Bordeaux-Bègles.
5. Équipe inconnue : sa moitié reste verte (neutre), avec le nom écrit tel que saisi. Le match s'affiche quand même. Pour ajouter des couleurs à une équipe, demandez à votre prestataire (fichier `equipes.js`). Les couleurs ne viennent jamais du Sheet.
6. Ancien format toujours accepté : une colonne `affiche` avec `France - Irlande` ou `France vs Irlande` (séparateur entouré d'espaces). Sans séparateur, la carte est neutre avec le texte entier.
7. Ajouter : écrivez une nouvelle ligne. Modifier : changez la cellule. Supprimer : supprimez la ligne. Pas besoin de trier ni de supprimer les anciens matchs : le site masque un match 2h30 après son début.
8. Un seul Sheet commun sert au Bar et au Pub Vaise. **Phase de test (actuelle)** : le Sheet de test est partagé par lien (« Tous les utilisateurs disposant du lien : lecteur ») et le code le lit via l'adresse `gviz` (`.../gviz/tq?tqx=out:csv&gid=0`). **Production** : Fichier > Partager > Publier sur le web > choisir la feuille et le format **CSV** > Publier. Copiez le lien obtenu.
9. Collez ce lien dans `main.js` des deux vitrines (Bar et Pub), ligne `var SHEET_CSV_URL = '...'`, puis redéployez (une seule fois).
10. Ensuite, chaque modification du Sheet apparaît sur le site en quelques minutes (le cache de Google peut prendre jusqu'à 5 min).
11. Pendant le chargement, le site affiche « Chargement du programme… ». Si le Sheet est vide (ou ne contient que des matchs passés) : « Programme à venir, appelez-nous ». Si le Sheet est injoignable (lien faux, réseau, plus de 4 s) : « Programme momentanément indisponible. Appelez le … ». Vérifiez alors le lien.
12. Ne mettez rien de confidentiel dans ce Sheet : il est public une fois publié.