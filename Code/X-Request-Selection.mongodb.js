// 1. Lister tout les films d’action

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve tout les films qui contienne le genre action
db.movies.find({
  // $in permet de passer un tableau et il vérifie si le genre Action est dans le tableau genres.
  genres: { $in: ["Action"] },
});

// 2. Lister tout les films sortis après l’an 2000

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films sorti après 2000
db.movies.find({ 
  // $gt permet de trouver toute les années qui sont supérieur à 2000
  year: { $gt: 2000 } 
});


// 3. Lister tout les films réalisés après 2010 mais avant 2020

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films sortis après 2010 mais avant 2020.
db.movies.find({
  // $gt permet de trouver tout les films dont l'années est supérieur à 2010
  year: { $gt: 2010 },
  // $lt permet de trouver tout les films dont l'année est inférieur à 2020
  year: { $lt: 2020 },
});

// 4. Lister tout les films sortis dans les années 2000 mais ayant un style des années 1980

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont l'année est supérieur à 2000 et ayant un style des années 80
db.movies.find({
  // $gt permet de trouver tout les films dont l'année est supérieur à 2000
  year: { $gt: 2000 },
  // Le regexs permet de faire des matchs comme celle là qui sélectionne uniquement les descriptions qui contienne "1980s";
  fullplot: /1980s/,
});

// 5. Lister tout les films réalisés par « Quentin Tarantino »

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films ou le réalisateur est "Quentin Tarantino"
db.movies.find({
  // $in permet de mettre un tableau et check une correspondance dans le tableau directors 
  directors: { $in: ["Quentin Tarantino"] } 
});

// 6. Lister tout les films de la série « Star Wars »

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films qui contienne dans leur titre "Star Wars"
db.movies.find({
  // Les Regex permet de faire des matchs dans ce case elle sélectionne les titre qui contienne Start Wars  
  title: /Star Wars/ 
});

// 7. Lister tout les films avec un score « IMDb » supérieur à 8

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont le score IMDb est supérieur à 8.
db.movies.find({
  // $gt permet de trouver les films dont le score IMDb est plus grand que 8 
  "imdb.rating": { $gt: 8 } 
});

// 8. Lister tout les films qui ne sont pas de genre « Horror » ou « Sci-Fi »

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont les genres ne sont pas Horror ou Sci-Fi
db.movies.find({
  // $not permet de faire le contraire de la consition dans ce cas ci les films dont les genres sont soi Horror ou Sci-Fi ne sont pas affiché
  genres: { $not: /^Horror^/, $not: /^Sci-Fi^/,},
});

// 9. Lister tout les films ayant exactement 3 différents genres

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films qui ont 3 genres.
db.movies.find({ 
  // $size permet d'avoir le length d'un tableau.
  genres: { $size: 3 } 
});

// 10. Lister tout les films dont le dernier genre est « Drama »

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films ou le dernier genre est équal à Drama
db.movies.find({
  // Fais une expression pour savoir si le dernier élément de genres est égal à Drama
  $expr: { $eq: [{ $last: "$genrs" }, "Drama"] } 
});

// 11. Lister tout les films qui durent entre 1h30 et 2h

// Utilise la base de donnle db_mflix
use("db_mflix");

// Trouve les films dont la durée est entre 1h30 et 2h.
db.movies.find({
  // $and permet qui si la condition 1 est fausse et la condition 2 est vrai alors il retourne fausse.
  $and: [{ runtime: { $gte: 90 } }, { runtime: { $lte: 120 } }],
});

// 12. Lister tout les films avec plus de 100 commentaires

// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films qui ont plus de 100 commenraires
db.movies.find({ 
  // $gt permet de trouver les films dont le nombre de commentaire est supérieur à 100. 
  num_mflix_comments: { $gt: 100 } 
});

// 13. Lister tout les films qui ne sont pas classés « R »

// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films qui ne sont pas classé "R"
db.movies.find({
  // Regex avec un $not donc trouver tout les rated avec un R dedans et faire le contraire
  rated: { $not: /^R^/ } 
});

// 14. Lister tout les films dont le titre commence par « The »

// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films dont le titre commence par "The"
db.movies.find({
  // Les Regexs sont utilisé pour savoir les films qui commence par "The" 
  title: /^The/
});

// 15. Lister tout les films ayant reçu un certain nombre d’awards

// Utilise la base de donnle db_mflix
use('db_mflix');

// Trouve les films dont le nombre de récompense est supérieur à 3
db.movies.find({
  // $gt permet de trouver les films dont le nombre de récompenses est supérieur à 3.
  "awards.wins" : { $gt: 3 }
});

// 16. Lister tout les films où le réalisateur et le premier acteur sont les mêmes

// Utilise la base de donnee db_mflix
use('db_mflix');

// Trouver les films ou le réalisateur et le premier acteur sont égal
db.movies.find({
  // Expression pour vérifier que le premier acteur est égal au réalisateur 
  $expr: { $eq: [ { $arrayElemAt: ["$directors", 0] }, { $arrayElemAt: ["$actors", 0] } ] } 
});

// 17. Lister tout les films dans lesquels « Brad Pitt » et « Angelina Jolie » sont acteurs

// Utiliser la base de données db_mflix
use('db_mflix');

// Trouver les films ou a joué Brad Pitt et Angelina Jolie
db.movies.find({
  // $and renvoie true uniquement si les deux conditions sont vrais dans ce case si Brad Piit et Angelina Jolie sont les deux dans le tableaux acterus
  $and: [ {cast: { $in: ["Brad Pitt"] }}, {cast: { $in: ["Angelina Jolie"] }} ], 
});

// 18. Lister tout les films dans lesquels « Brad Pitt » est acteur et dont le nombre de commentaires est au moins égal à 100

// Utiliser la base de donnée db_mflix
use('db_mflix');

// Trouve les films ou a joué Brad Pitt et qui a plus de 100 commentaires
db.movies.find({
    // $and renvoie true uniquement si les deux conditions sont vrais dans ce case si Brad Piit est acteur et si le nombre de commentaire est supérieur ou égal à 100
    $and: [ { cast: { $in: ["Brad Pitt"] } }, { num_mflix_comments: { $gte: 100 } } ], 
});

// 19. Lister tout les films où l’acteur principal est une « femme »

use("db_mflix");

db.movies.find({
  plot: /she/i
});

// 20. Lister tout les films où « Tom Hanks » est acteur, mais pas « réalisateur »

// Utiliser la base de données db_mflix
use('db_mflix');

// Trouver les films où Tom Hanks est acteur mais pas réalisateur
db.movies.find({
  // $and renvoie true uniquement si les deux conditions sont vrais dans ce case si Tom Hanks est acteur mais pas réalisateur
  $and: [ { cast: { $in: ["Tom Hanks"] } }, { direcors: { $not: { $in: ["Tom Hanks"] } } } ], 
});

// 21. Lister tout les films mais doivent apparaître uniquement le titre et l’année de sortie de chaque film

// Utiliser la base de données db_mflix
use('db_mflix');

// Trouver les films mais seulment le titre et 'année doivent apparaître
db.movies.find({}, {title: 1, year: 1, _id: 0 });

// 22. Dans le cadre d’une pagination qui renvoie à chaque fois une liste de 10 films par page, quel est la requête permettant de renvoyer uniquement la liste des films de la 3e page ?

// Utiliser la base de données db_mflix
use('db_mflix');

// Afficher dix films mais en sautant les 20 premiers
db.movies.find({}).limit(10).skip(20);

// 23. Rechercher les films qui ont au moins la langue « française » ou la langue « anglaise » disponible, qui sont sortis à partir de « 1980 » inclus, et qui ont une note « Rotten Tomatoe » de plus de 4 ou un score « IMDB » supérieur ou égal à 8. Nous voulons également que « Brad Pitt » joue dans le film. Nous souhaitons n'avoir que les titres pour pouvoir les afficher directement. Enfin, nous ne voulons pas que le « synopsis » du film parle de « nazis »

// Utiliser la base de données db_mflix
use('db_mflix');

// Trouver les films ou la langue française et anglaise sont disponible, le film est sorti après les années 80, que la note tomateos soit supérieur à 4 ou la note imdb soit supérieru à 8, que Brad Pitt soit acteur et que le film ne parle pas de nazis mais seulement afficher le titre
db.movies.find({
  // $and est utilisé pour lié toute les conditions
  $and: [ {
    // Dans ce case on utilise $or car le film doit être en anglais ou en français 
    $or: [ 
      { languages: { $in : ["English"] } }, 
      { languages: { $in: ["French"] } }
    ]},
    // $gte est utilisé dans ce cas pour s'assurrer que seulement les films sorti pendant ou après 1980 soit selectionné
    { year: { $gte : 1980 } },
    // Dans ce case $or est utilsé car le film doit avoir obtenu une note supérieur à 4 pour la note Tomatoes ou supérieur à 8 pour la note imdb
    { $or: [ 
      {"tomatoes.viewer.rating": { $gt: 4 } },
      { "imdb.rating": { $gt: 8 }} 
    ]},
    // Dans ce cas ci le $in permet de savoir si Brad Pitt est acteur dans ce film
    { cast: { $in: ["Brad Pitt"] } },
    // $not permet de savoir si le film parle de nazis dans la grande description
    { fullplot: { $not: /[nazis]/ } }
  ]
}, {_id: 0, title: 1});

// 24.  Nous voulons maintenant trier notre résultat suivant les « notes » attribués au film. D'abord par la note « Rotten Tomatoe », puis par la note « IMDB ».

// Utiliser la base de données db_mflix
use('db_mflix');

// Trouver les films ou la langue française et anglaise sont disponible, le film est sorti après les années 80, que la note tomateos soit supérieur à 4 ou la note imdb soit supérieru à 8, que Brad Pitt soit acteur et que le film ne parle pas de nazis mais seulement afficher le titre
db.movies.find({
  // $and est utilisé pour lié toute les conditions
  $and: [ {
    // Dans ce case on utilise $or car le film doit être en anglais ou en français 
    $or: [ 
      { languages: { $in : ["English"] } }, 
      { languages: { $in: ["French"] } }
    ]},
    // $gte est utilisé dans ce cas pour s'assurrer que seulement les films sorti pendant ou après 1980 soit selectionné
    { year: { $gte : 1980 } },
    // Dans ce case $or est utilsé car le film doit avoir obtenu une note supérieur à 4 pour la note Tomatoes ou supérieur à 8 pour la note imdb
    { $or: [ 
      {"tomatoes.viewer.rating": { $gt: 4 } },
      { "imdb.rating": { $gt: 8 }} 
    ]},
    // Dans ce cas ci le $in permet de savoir si Brad Pitt est acteur dans ce film
    { cast: { $in: ["Brad Pitt"] } },
    // $not permet de savoir si le film parle de nazis dans la grande description
    { fullplot: { $not: /[nazis]/ } }
  ]
}, {_id: 0, title: 1}).sort("tomatoes.viewer.rating", "imdb.rating"); // .sort permet de trier par ordre croissant par note tomateos et si il y a une égalité alors il triera par la note imdb