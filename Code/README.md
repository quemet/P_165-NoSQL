# P_165-NoSQL

## A- Importer les données et le schéma de la base de données

```docker
docker exec -i mongo mongorestore
    --uri=mongodb://root:admin@localhost:27017
    --authenticationDatabase=admin
    --db="db_mflix"
    --archive="/backupdb/P_165/data/db_mflix.gz"
    --gzip
```

- docker
- exec
- -i -> **paramètre pour spécifier le nom du conteneur**
- mongo -> **Spécifie le nom du containeur à utiliser**
- mongorestore -> **Indique la commande de mongo à utiliser**
- --uri=mongodb://root:admin@localhost:27017 -> **Spécifie l'URI**
- --authenticationDatabase=admin -> **spécifie le compte de l'utilisateur**
- --db="db_mflix" -> **Spécifie le nom de la db**
- --archive="/backupdb/P_165/data/db_mflix.gz" -> **Spécifie le chemin de l'archive**
- --gzip -> **Spécifie l'extension de l'archive**
  **Archive Zip Path : C:\165_docker\backupdb/P_165/db_mflix.gz**
  **CMD path : C:\165_docker\backupdb**

## B- Gestion des utilisateurs

### \* 1. Administrateur de db_mflix

1.1. Peux créer ou supprimer des collections ;
1.2. Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des
collections ;
1.3. Gérer les indexes pour toutes les collections ;
1.4. Gérer les rôles (et donc les utilisateurs) et leurs privilèges de cette base de données.

### \* 2. Utilisateur

2.1. Lire les informations sur les films et les commentaires ;
2.2. Ajouter ou supprimer un ou des commentaires.

### 3. Gestionnaire

3.1. Lire les informations sur tous les utilisateurs (pour savoir qui a fait un commentaire) ;
3.2. Mettre à jour, lire et supprimer des films ou des commentaires ;
3.3. Lire tous les commentaires.

## C- Requêtes de sélection

Lister tous les films selon les critères suivants :

- 1. Lister tout les films d’action

```javascript
use("db_mflix");

db.movies.find({
  genres: { $in: ["Action"] },
});
```

- 2. Lister tout les films sortis après l’an 2000

```javascript
use("db_mflix");

db.movies.find({ year: { $gt: 2000 } });
```

- 3. Lister tout les films réalisés après 2010 mais avant 2020

```javascript
use("db_mflix");

db.movies.find({
  year: { $gt: 2010 },
  year: { $lt: 2020 },
});
```

- 4. sortis dans les années 2000 mais ayant un style des années 1980

```javascript
use("db_mflix");
db.movies.find({
  year: { $gt: 2000 },
  fullplot: /1980s/,
});
```

- 5. réalisés par « Quentin Tarantino »

```javascript
use("db_mflix");

db.movies.find({ directors: { $in: ["Quentin Tarantino"] } });
```

- 6. de la série « Star Wars »

```javascript
use("db_mflix");

db.movies.find({ title: /Star Wars/ });
```

- 7. avec un score « IMDb » supérieur à 8

```javascript
use("db_mflix");

db.movies.find({ "imdb.rating": { $gt: 8 } });
```

- 8. qui ne sont pas de genre « Horror » ou « Sci-Fi »

```javascript
use("db_mflix");

db.movies.find({
  genres: {
    $not: /^Horror^/,
    $not: /^Sci-Fi^/,
  },
});
```

- 9. ayant exactement 3 différents genres

```javascript
use("db_mflix");

db.movies.find({ genres: { $size: 3 } });
```

10. dont le dernier genre est « Drama »

- 11. qui durent entre 1h30 et 2h

```javascript
use("db_mflix");

db.movies.find({
  $and: [{ runtime: { $gte: 90 } }, { runtime: { $lte: 120 } }],
});
```

- 12. avec plus de 100 commentaires

13. qui ne sont pas classés « R »
14. dont le titre commence par « The »
15. ayant reçu un certain nombre d’awards
16. où le réalisateur et le premier acteur sont les mêmes
17. dans lesquels « Brad Pitt » et « Angelina Jolie » sont acteurs
18. dans lesquels « Brad Pitt » est acteur et dont le nombre de commentaires est au
    moins égal à 100
19. où l’acteur principal est une « femme »
20. où « Tom Hanks » est acteur, mais pas « réalisateur »
21. mais doivent apparaître uniquement le titre et l’année de sortie de chaque film
22. Dans le cadre d’une pagination qui renvoie à chaque fois une liste de 10 films par
    page, quel est la requête permettant de renvoyer uniquement la liste des films de la
    3e page ?

## D- Agrégations

1. Compter le nombre de films par genre
2. Compter le nombre de films par classification (rated)
3. Calculer la durée moyenne des films par genre
4. Calculer la durée moyenne des films par décennie
5. Calculer la durée moyenne des films par acteur
6. Lister les 5 réalisateurs les plus fréquents
7. Lister les 5 acteurs les plus fréquents dans les films « PG-13 »
8. Quel est le nombre moyen de commentaires par film
9. Le genre le plus populaire par année
10. Lister les genres distincts des films
11. Lister les films par décennie avec le nombre total de films par décennie
12. Trouver le genre le plus courant dans chaque pays
13. Trouver le nombre de films par classification et par décennie
14. Calculer le nombre total de films et la durée moyenne des films par réalisateur

## E- Requêtes avec Recherche Textuelle

1. Recherche des films contenant le mot-clé « matrix »
2. Recherche tous les films contenant la phase « best movie ever »
3. Recherche des films contenant le terme « war », tout en excluant ceux contenant le
   terme « world »
4. Trouver des films où la description contient « space » mais pas « mars »
5. Trouver des films avec le mot exact « time travel » dans la description
6. Rechercher des films avec des mots commençant par « inter » dans le titre

## F- Création des index

Dans votre base de données db_mflix, identifiez les champs qui bénéficieraient le plus de la
création d'index.

- Expliquez pourquoi la création d'index sur ces champs serait pertinente et comment
  cela pourrait améliorer les performances des requêtes et l'efficacité globale de la
  base de données.
- Démontrez minimum 3 exemples avec ou sans les indexes ajoutés (collection,
  indexe(s), requêtes, temps de réponse avant/après).

## G- Backup/Restore

Nous souhaitons réaliser un backup complet de notre base de données db_mflix. Ensuite,
nous aimerions procéder à sa restauration. Nous aimerions que la sauvegarde prenne le mois
de place possible.

- Expliquez chaque étape de ces processus et les raisons pour lesquelles ces étapes
  sont importantes.
  docker exec -i mongo mongorestore --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin --db="db_mflix" --archive="/backupdb/P_165/data/db_mflix.gz" --gzip
