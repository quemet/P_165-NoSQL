// 1. Compter le nombre de films par genre

// Utiliser la base de données db_mflix
use('db_mflix');

// Compter le nombre de film par genre
db.movies.aggregate([
  // $unwind permet de casser un tableau
  {
    $unwind: "$genres"
  },
  // On group sur les genres et compte le nombre de film par genre
  {
    $group: {
      _id: "$genres",
      "nbGenre": { $sum: 1 }
    }
  }
]);

// 2. Compter le nombre de films par classification (rated)

// Utiliser la base de données db_mflix
use('db_mflix');

// Compter le nombre de films par classification
db.movies.aggregate([
  {
    // On groupe sur la classification et compte le nombre de films par classification
    $group: {
      _id: "$rated",
      "NbRated": { $sum: 1 }
    }
  }
]);

// 3. Calculer la durée moyenne des films par genre

// Utiliser la base de données db_mflix
use('db_mflix');

// Calculer la durée moyenne des films par genre
db.movies.aggregate([
  // On casse le tableaux genres
  {
    $unwind: "$genres"
  },
  // On groupe sur genres et on calcule la moyenne de la durée moyenne des films de ce genre
  {
    $group: {
      _id: "$genres",
      "avgTime": { $avg: "$runtime" }
    }
  }
]);

// 4. Calculer la durée moyenne des films par décennie

// Utiliser la base de données db_mflix
use('db_mflix');

// Calculer la durée moyenne des films par décennie
db.movies.aggregate([
  // On prend uniquement les années ou les années sont des chiffres
  {
    $match: { "year": { $type: "int"} },
  },
  // On fait un $project pour connaître la durée moyenne par film et on divise par 10
  {
    $project: {
      year: { $divide: ["$year", 10] },
      "avgTime": { $avg: "$runtime" }
    }
  },
  // On fait un $project pour arrondir les années
  {
    $project: {
      year: { $round: ["$year", 0] },
      "avgTime": { $avg: "$avgTime" }
    }
  },
  // On fait un $project pour faire les décennies
  {
    $project: {
      year: { $multiply: ["$year", 10] },
      "avgTime": { $avg: "$avgTime" }
    }
  },
  // On groupe pas décennie et on affiche la durée moyenne par décennie
  {
    $group: {
      _id: "$year",
      "avgTime": { $avg: "$avgTime" }
    }
  }
]);

// 5. Calculer la durée moyenne des films par acteur

// Utiliser la base de données db_mflix
use('db_mflix');

// Calculer la durée moyenne des films par acteur
db.movies.aggregate([
  // Casser le tableau acteurs
  {
    $unwind: "$cast"
  },
  // Groupe par les acteurs et calcule la durée moyen par acteur
  {
    $group: {
      _id: "$cast",
      "avgTime": { $avg: "$runtime" }
    }
  }
]);

// 6. Lister les 5 réalisateurs les plus fréquents

// Utiliser la base de données db_mflix
use('db_mflix');

// Lister les 5 réalisateurs les plus fréquents
db.movies.aggregate([
  // Casse le tableaux des realisateurs
  {
    $unwind: "$directors"
  },
  // Groupe sur les réalisateurs et compte leur nombre de films
  {
    $group: {
      _id: "$directors",
      "NbFre": { $sum: 1 }
    }
  },
  // Trie de manière decroissante sur le nombre de film
  {
    $sort: {
      "NbFre": -1
    }
  },
  // Limiter le résultat à 5
  {
    $limit: 5
  }
]);

// 7. Lister les 5 acteurs les plus fréquents dans les films « PG-13 »

// Utiliser la base de données
use('db_mflix');

// Lister les 5 acteurs les plus fréquents dans les films PG-13
db.movies.aggregate([
  // Prend uniquement les films qui ont la classification PG-13
  {
    $match: {
      rated: "PG-13"
    }
  },
  // Casse le tableau des acteurs
  {
    $unwind: "$cast"
  },
  // Groupe par acteurs et calcule le nombre de film par acteurs
  {
    $group: {
      _id: "$cast",
      "NbFilm": { $sum: 1 }
    }
  },
  // Trie de manière decroissante nbFilm
  {
    $sort: {
      "NbFilm": -1
    }
  },
  // Limite le résultat à 5
  {
    $limit: 5
  }
])

// 8. Quel est le nombre moyen de commentaires par film

// Utiliser la base de données db_mflix
use('db_mflix');

// Quel est le nombre moyen de commentaires par film
db.movies.aggregate(
  // Groupe par les titres et calcule le nombre moyen de commentaires par films avec NumComment
  {
    $group: {
      _id: "$title",
      NumComment: { $avg: { $sum: ["$num_mflix_comments", "$tomatoes.viewer.numReviews", "tomatoes.critic.numReviews"] } }
    }
  }
);

// 9. Le genre le plus populaire par année

// Utilisation de la base de données db_mflix
use('db_mflix');

// Lister le genre le plus populaire par année
db.movies.aggregate([
  // permet de sélectionner uniquement les années avec des chiffres
  {
    $match: {
      year: { $type: "int" }
    }
  },
  // Casse le tableau genred
  {
    $unwind: "$genres"
  },
  // Groupe par genre et années et calcule le max de film par genre
  {
    $group: {
      _id:{ "genre":"$genres","year":"$year"},
      "maxi": { $sum: 1 }
    }
  },
  // Groupe l'année avec le genre avec le plus grand chiffre
  {
    $group:{
      _id:"$_id.year",
      genr_max:{$max:"$_id.genre"}
    }
  }
]);

// 10. Lister les genres distincts des films

// Utiliser la base de données db_mflix
use('db_mflix');

// Lister les genres distincts des films
db.movies.aggregate([
  // Permet de casser les genres
  {
    $unwind: "$genres"
  },
  // Groupe sur les genres
  {
    $group: {
      _id: "$genres",
    }
  }
]);

// 11. Lister les films par décennie avec le nombre total de films par décennie

// Utilise la base de données db_mflix
use('db_mflix');

// Lister les films par décennie avec le nombre total de films par décennie
db.movies.aggregate([
  // Prend uniuqement les années ou se sont des chiffres
  {
    $match: { "year": { $type: "int"} },
  },
  // On fait un $project pour connaître la durée moyenne par film et on divise par 10
  {
    $project: {
      year: { $divide: ["$year", 10] },
      "sumMovie": { $sum: "$title" }
    }
  },
    // On fait un $project pour arrondir les années
  {
    $project: {
      year: { $round: ["$year", 0] },
      "sumMovie": { $sum: "$sumMovie" }
    }
  },
  // On fait un $project pour faire les décennies
  {
    $project: {
      year: { $multiply: ["$year", 10] },
      "sumMovie": { $sum: "$sumMovie" }
    }
  },
  // On groupe pas décennie et on affiche la durée moyenne par décennie
  {
    $group: {
      _id: "$year",
      "sumMovie": { $sum: "$sumMovie" }
    }
  }
]);

// 12. Trouver le genre le plus courant dans chaque pays

// Utiliser la base de données db_mflix
use('db_mflix');

// Trouver le genre le plus courant dans chaque pays
db.movies.aggregate([
  // Casse le tableau des pays
  {
    $unwind: "$countries"
  },
  // Casse le tableau des genres
  {
    $unwind: "$genres"
  },
  // Groupe par les pays et les genres et compte le nombre de film par genre
  {
    $group: {
      _id: {country: "$countries", genre: "$genres"},
      count: { $sum: 1 }
    }
  },
  // Trie par le pays de mamnière croissante et le nombre de film par genre de manière décroissante 
  {
    $sort: {"_id.country": 1, "count": -1}
  },
  // Groupe par pays affiche le genre le plus populaire et le nombre
  {
    $group: {
      _id: "$_id.country",
      "Genre++": {$first: "$_id.genre"},
      "Nmb": {$first: "$count"}
    }
  }
]);

// 13. Trouver le nombre de films par classification et par décennie

// Utiliser la base de données db_mflix
use('db_mflix');

db.movies.aggregate([
  // Prend uniquement les années ou c'est en chiffre
  {
    $match: { "year": { $type: "int"} },
  },
  {
    // crée le système de décennies
    $project: {
      "year": {$multiply:[{$round: [{$divide: ["$year", 10]}, 0]},10]},
      "rated": 1
    }
  },
  {
    // Groupe les années et les classifications
    $group: {
      _id: { year:"$year", cassif:"$rated"},
      "sumMovieByRated": { $sum: 1 }
    }
  }
]);

// 14. Calculer le nombre total de films et la durée moyenne des films par réalisateur

// Utiliser la base de données db_mflix
use('db_mflix');

db.movies.aggregate([
  // Casse le tableaux des realisateurs
  {
    $unwind: "$directors",
  },
  // Groupe sur les relaisateurs, trouve la durée moyenne et le nombre de film par réalisateur
  {
    $group: {
      _id: "$directors",
      "myCount": { $sum: 1},
      "avgTime": { $avg: "$runtime" }
    },
  }
]);

// 15. Notre objectif est de créer des groupes par pays. Pour chaque pays, nous voulons créer des groupes de chaque genre et obtenir le nombre de films, la note moyenne des films et la part de marché (nombre de films d'un genre pour un pays / total de films du pays).

// Utiliser la base de données db_mflix
use('db_mflix');

// Pour chaque pays, nous voulons créer des groupes de chaque genre et obtenir le nombre de films, la note moyenne des films et la part de marché (nombre de films d'un genre pour un pays / total de films du pays)
db.movies.aggregate([
  // Casser le tableaux pays
  {
    $unwind: "$countries"
  },
  // Casser le tableaux genres
  {
    $unwind: "$genres"
  },
  // Calcule la note moyenne
  {
    $project: {
      genre: "$genres",
      country: "$countries",
      rating_average: {$avg: ["$imdb.rating", "$tomatoes.rating"]},
    }
  },
  // Fais le compte du nombre de film par genre est par pays
  {
    $group: {
      _id: {country: "$country",genre: "$genre"},
      average_rating: {$avg: "$rating_average"},
      count: {$sum: 1}
    }
  },
  {
    // Groupe sur les pays
    $group: {
      _id: "$_id.country",
     
      // compte le nombre de film par pays
      total_count: {
        $sum: "$count"
      },

      // Mets dans un tableau le genre la note moyenne le nombre de film par genre et par pays
      genres: {
        $push: {
          genre: "$_id.genre",
          average_rating: "$average_rating",
          count: "$count",
          marketpart: {$divide: ["$genre.count", "$total_count"]}
        }
      },
    }
  },
  {
    // Permet de calculer le marketpart
    $addFields: {
      genres: {
        $map: {
          input: "$genres",
          as: "genre",
          in: {
            genre: "$$genre.genre",
            average_rating: "$$genre.average_rating",
            count: "$$genre.count",
            marketpart: {$divide: ["$$genre.count", "$total_count"]}
          }
        }
      }
    }
  },
]);