// 1. Recherche des films contenant le mot-clé « matrix »
use("db_mflix");
db.movies.find({ $text: { $search: "matrix" } } );
// 2. Recherche tous les films contenant la phase « best movie ever »
use('db_mflix');
db.movies.find({ $text: { $search: "best movie ever" } } );
// 3. Recherche des films contenant le terme « war », tout en excluant ceux contenant le terme « world »
use('db_mflix');
db.movies.find({ $text: { $search: "war -world" } } );
// 4. Trouver des films où la description contient « space » mais pas « mars »
use('db_mflix');
db.movies.createIndex({ "description": "text" });
db.movies.find({ $text: { $search: "space -mars" } });
// 5. Trouver des films avec le mot exact « time travel » dans la description
use('db_mflix');
db.movies.find({ $text: { $search: "\"time travel\""}});
// 6. Rechercher des films avec des mots commençant par « inter » dans le titre
use('db_mflix');
db.movies.find({ title: { $regex: /^inter/i } });