# P_165-NoSQL

## A- Importer les données et le schéma de la base de données

```powershell
docker exec -i mongo mongorestore
    --uri="mongodb://root:admin@localhost:27017"
    --authenticationDatabase="admin"
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

### 1. Administrateur de db_mflix

1.1. Peux créer ou supprimer des collections ;
1.2. Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des
collections ;
1.3. Gérer les indexes pour toutes les collections ;
1.4. Gérer les rôles (et donc les utilisateurs) et leurs privilèges de cette base de données.

### 2. Utilisateur

2.1. Lire les informations sur les films et les commentaires ;
2.2. Ajouter ou supprimer un ou des commentaires.

### 3. Gestionnaire

3.1. Lire les informations sur tous les utilisateurs (pour savoir qui a fait un commentaire) ;
3.2. Mettre à jour, lire et supprimer des films ou des commentaires ;
3.3. Lire tous les commentaires.

## C- Requêtes de sélection

Lister tous les films selon les critères suivants :

* 1. Lister tout les films d’action

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve tout les films qui contienne le genre action
db.movies.find({
  // $in permet de passer un tableau et il vérifie si le genre Action est dans le tableau genres.
  genres: { $in: ["Action"] },
});
```

* 2. Lister tout les films sortis après l’an 2000

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films sorti après 2000
db.movies.find({ 
  // $gt permet de trouver toute les années qui sont supérieur à 2000
  year: { $gt: 2000 } 
});
```

* 3. Lister tout les films réalisés après 2010 mais avant 2020

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films sortis après 2010 mais avant 2020.
db.movies.find({
  // $gt permet de trouver tout les films dont l'années est supérieur à 2010
  year: { $gt: 2010 },
  // $lt permet de trouver tout les films dont l'année est inférieur à 2020
  year: { $lt: 2020 },
});
```

* 4. Lister tout les films sortis dans les années 2000 mais ayant un style des années 1980

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont l'année est supérieur à 2000 et ayant un style des années 80
db.movies.find({
  // $gt permet de trouver tout les films dont l'année est supérieur à 2000
  year: { $gt: 2000 },
  // Le regexs permet de faire des matchs comme celle là qui sélectionne uniquement les descriptions qui contienne "1980s";
  fullplot: /1980s/,
});
```

* 5. Lister tout les films réalisés par « Quentin Tarantino »

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films ou le réalisateur est "Quentin Tarantino"
db.movies.find({
  // $in permet de mettre un tableau et check une correspondance dans le tableau directors 
  directors: { $in: ["Quentin Tarantino"] } 
});
```

* 6. Lister tout les films de la série « Star Wars »

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films qui contienne dans leur titre "Star Wars"
db.movies.find({
  // Les Regex permet de faire des matchs dans ce case elle sélectionne les titre qui contienne Start Wars  
  title: /Star Wars/ 
});
```

* 7. Lister tout les films avec un score « IMDb » supérieur à 8

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont le score IMDb est supérieur à 8.
db.movies.find({
  // $gt permet de trouver les films dont le score IMDb est plus grand que 8 
  "imdb.rating": { $gt: 8 } 
});
```

* 8. Lister tout les films qui ne sont pas de genre « Horror » ou « Sci-Fi »

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont les genres ne sont pas Horror ou Sci-Fi
db.movies.find({
  // $not permet de faire le contraire de la consition dans ce cas ci les films dont les genres sont soi Horror ou Sci-Fi ne sont pas affiché
  genres: { $not: /^Horror^/, $not: /^Sci-Fi^/,},
});
```

* 9. Lister tout les films ayant exactement 3 différents genres

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films qui ont 3 genres.
db.movies.find({ 
  // $size permet d'avoir le length d'un tableau.
  genres: { $size: 3 } 
});
```

* 10. Lister tout les films dont le dernier genre est « Drama »

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films ou le dernier genre est équal à Drama
db.movies.find({
  // ? 
  $expr: { $eq: [{ $last: "$genrs" }, "Drama"] } 
});
```

* 11. Lister tout les films qui durent entre 1h30 et 2h

```javascript
// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont la durée est entre 1h30 et 2h.
db.movies.find({
  // $and permet qui si la condition 1 est fausse et la condition 2 est vrai alors il retourne fausse.
  $and: [{ runtime: { $gte: 90 } }, { runtime: { $lte: 120 } }],
});
```

* 12. Lister tout les films avec plus de 100 commentaires

```javascript
// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films qui ont plus de 100 commenraires
db.movies.find({ 
  // $gt permet de trouver les films dont le nombre de commentaire est supérieur à 100. 
  num_mflix_comments: { $gt: 100 } 
});
```

* 13. Lister tout les films qui ne sont pas classés « R »

```javascript
// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films qui ne sont pas classé "R"
db.movies.find({
  // Regex avec un $not donc trouver tout les rated avec un R dedans et faire le contraire
  rated: { $not: /^R^/ } 
});
```

* 14. Lister tout les films dont le titre commence par « The »

```javascript
// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films dont le titre commence par "The"
db.movies.find({
  // Les Regexs sont utilisé pour savoir les films qui commence par "The" 
  title: /^The/
});
```
* 15. Lister tout les films ayant reçu un certain nombre d’awards

```javascript
// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films dont le nombre de récompense est supérieur à 3
db.movies.find({
  // $gt permet de trouver les films dont le nombre de récompenses est supérieur à 3.
  "awards.wins" : { $gt: 3 }
});
```

* 16. Lister tout les films où le réalisateur et le premier acteur sont les mêmes

```javascript
// Utilise la base de donnle db_mflix
use('db_mflix');

db.movies.find({
  // ? 
  $expr: {
    $eq: [
      { $arrayElemAt: ["$directors", 0] }, 
      { $arrayElemAt: ["$actors", 0] }
    ]
  } 
});
```

* 17. Lister tout les films dans lesquels « Brad Pitt » et « Angelina Jolie » sont acteurs

```javascript
use('db_mflix');

db.movies.find({
    $and: [
        {cast: { $in: ["Brad Pitt"] }},
        {cast: { $in: ["Angelina Jolie"] }}
    ], 
});
```

* 18. Lister tout les films dans lesquels « Brad Pitt » est acteur et dont le nombre de commentaires est au moins égal à 100

```javascript
use('db_mflix');

db.movies.find({
    $and: [
        { cast: { $in: ["Brad Pitt"] }},
        { num_mflix_comments: { $gt: 100 }}
    ], 
});
```

* 19. Lister tout les films où l’acteur principal est une « femme »

```javascript
use("db_mflix");

db.movies.find({
  plot: /she/i;
});
```

* 20. Lister tout les films où « Tom Hanks » est acteur, mais pas « réalisateur »

```javascript
use('db_mflix');

db.movies.find({
    $and: [
        { cast: { $in: ["Tom Hanks"] }},
        { direcors: { $not: { $in: ["Tom Hanks"] } }}
    ], 
});
```

* 21. Lister tout les films mais doivent apparaître uniquement le titre et l’année de sortie de chaque film

```javascript
use('db_mflix');

db.movies.find({}, {title: 1, year: 1, _id: 0 });
```

* 22. Dans le cadre d’une pagination qui renvoie à chaque fois une liste de 10 films par
    page, quel est la requête permettant de renvoyer uniquement la liste des films de la
    3e page ?

```javascript
use('db_mflix');

db.movies.find({}).limit(10).skip(20);
```

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

* Expliquez chaque étape de ces processus et les raisons pour lesquelles ces étapes sont importantes.
```bash
  docker exec -i mongo mongodump --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin --db="db_mflix" --gzip --out="./backudb/P_165"
```
```bash
docker exec -i mongo mongorestore --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin --db="db_mflix" --archive="/backupdb/P_165/data/db_mflix.gz" --gzip
```
