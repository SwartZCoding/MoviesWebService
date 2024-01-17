/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.getAllMovies');
  Route.get('/:name', 'MoviesController.getMovieByName');
  Route.get('/:category', 'MoviesController.getMoviesByCategory');
  Route.post('/:name', 'MoviesController.createMovie');
  Route.patch('/:name', 'MoviesController.editMovie');
  Route.delete('/:name', 'MoviesController.removeMovie');
}).prefix('movie').middleware("auth")


Route.group(() => {
  Route.get('/:name', 'CategoriesController.getCategoryMovies');
}).prefix('category')

Route.group(() => {
  Route.post('/register', 'AuthController.register');
  Route.post('/login', 'AuthController.login');
  Route.post('/logout', 'AuthController.logout').middleware(["auth"]);
  Route.post('/refresh-token/:refreshToken/token', 'AuthController.refresh');
  Route.get('/validate/:accessToken', 'AuthController.validate');
}).prefix('auth')

