import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from "App/Models/Movie";
import CreateMovieValidator from "App/Validators/CreateMovieValidator";
import EditMovieValidator from "App/Validators/EditMovieValidator";
import MovieService from "App/Services/MovieService";

export default class MoviesController {

  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  public async getAllMovies ({ response } : HttpContextContract) {
    const movies = await Movie.all();
    try {
      if(movies.length >= 1) {
        return response.ok(movies);
      } else {
        return response.notFound({ message: 'Aucun film disponible' })
      }
    } catch (error) {
      console.log(error.message)
      return response.internalServerError({ message: 'Erreur serveur lors de la récupération des films' })
    }
  }

  public async getMovieByName ({ params, response } : HttpContextContract) {
    const movie = await Movie.findBy('name', params.name);
    try {
      if(movie) {
        return response.ok(movie);
      } else {
        return response.notFound({ message: 'Aucun film avec ce nom est disponible.' })
      }
    } catch (error) {
      console.log(error.message)
      return response.internalServerError({ message: 'Erreur serveur lors de la récupération du film' })
    }
  }

  public async createMovie(httpContextContract: HttpContextContract) {
    const movie = await httpContextContract.request.validate(CreateMovieValidator);
    await this.movieService.createMovie(movie, httpContextContract);
  }

  public async removeMovie(httpContextContract: HttpContextContract) {
    const movie = await Movie.findBy('name', httpContextContract.params.name);
    await this.movieService.removeMovie(movie!, httpContextContract);
  }

  public async editMovie(httpContextContract: HttpContextContract) {
    const movie = await httpContextContract.request.validate(EditMovieValidator);
    await this.movieService.editMovie(movie!, httpContextContract);
  }
}
