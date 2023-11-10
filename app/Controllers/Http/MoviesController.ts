import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from "App/Models/Movie";

export default class MoviesController {

  public async getAllMovies ({ response } : HttpContextContract) {
    const movies = await Movie.all();
    if(movies.length >= 1) {
      response.status(200).json(movies);
    } else {
      return response.status(404).json({ message: 'Aucun film disponible' });
    }
  }
}
