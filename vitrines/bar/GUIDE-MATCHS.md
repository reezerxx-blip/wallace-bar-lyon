# Guide matchs, Wallace Bar

1. Créez un Google Sheet avec 4 colonnes en ligne 1, exactement : `date`, `heure`, `affiche`, `ecran`.
2. Une ligne par match. Date : `2026-11-14` ou `14/11/2026`. Heure : `21:00` ou `21h00`. Affiche : `France - Irlande`. Écran : `Écran 1`, `Écran 2` ou `Les deux`.
3. Ajouter : écrivez une nouvelle ligne. Modifier : changez la cellule. Supprimer : supprimez la ligne.
4. Pas besoin de trier ni de supprimer les anciens matchs : le site masque un match 2h30 après son début.
5. Publier : Fichier > Partager > Publier sur le web > choisir la feuille et le format **CSV** > Publier. Copiez le lien obtenu.
6. Collez ce lien dans `main.js`, ligne `var SHEET_CSV_URL = '...'`, puis redéployez (ou demandez à votre prestataire de le faire, une seule fois).
7. Ensuite, chaque modification du Sheet apparaît sur le site en quelques minutes (le cache de Google peut prendre jusqu'à 5 min).
8. Si le Sheet est injoignable, le site affiche un programme d'exemple, signalé comme tel : vérifiez alors le lien publié.
9. S'il n'y a aucun match à venir, le site affiche un message invitant à appeler le bar.
10. Ne mettez rien de confidentiel dans ce Sheet : il est public une fois publié.
