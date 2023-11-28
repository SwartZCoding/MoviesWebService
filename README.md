# Projet Movies Web Service

## Requirements

- NodeJs >= 14.0
- MariaDB (MySql can cause issues) 

## Installation
```
npm i
```
Remplacer .env.exemple par .env et compléter les informations SQL

Reset et remplir la base de donnée de données
```
node ace migration:fresh
```
```
node ace migration:run
```
```
node ace fill:database
```
Lancer le serveur de développement
```
npm run dev
```

## Routes disponibles

Tous les films : GET ```/movie ```

Voir un film par nom : GET ```/movie/:name ```

Créer un film : POST ```/movie/:name ```

Modifier un film par nom : PATCH ```/movie/:name```

Supprimer un film par nom : DELETE ```/movie/:name```

