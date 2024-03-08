// 1.1. Peux créer ou supprimer des collections ;
// 1.2. Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des collections ;
// 1.3. Gérer les indexes pour toutes les collections ;
// 1.4. Gérer les rôles (et donc les utilisateurs) et leurs privilèges de cette base de données.

use('db_mflix');
db.createRole({
  role: "Admin",
  privileges: [],
  roles: ["dbOwner"]
});

// 2.1. Lire les informations sur les films et les commentaires ;
// 2.2. Ajouter ou supprimer un ou des commentaires.

use('db_mflix');
db.createUser({
  role: "User",
  privileges: [
    {
        resources: { db: "db_mflix", collection: "movies"},
        actions: ["find"]
    },
    {
        resources: { db: "db_mflix", collection: "comments"},
        actions: ["find", "insert", "delete"]
    }
  ],
  roles: [],
});

// 3.1. Lire les informations sur tous les utilisateurs (pour savoir qui a fait un commentaire) ;
// 3.2. Mettre à jour, lire et supprimer des films ou des commentaires ;
// 3.3. Lire tous les commentaires.

use('db_mflix');
db.createUser({
  role: "Gestionnaire",
  privileges: [
    {
        resources: { db: "db_mflix", collection: "users"},
        actions: ["find"]
    },
    {
        resources: { db: "db_mflix", collection: "comments"},
        actions: ["find", "insert"]
    },
    {
        resources: { db: "db_mflix", collection: "movies"},
        actions: ["find", "insert"]
    },
],
roles: []
});