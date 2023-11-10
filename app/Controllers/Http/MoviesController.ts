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

  public async getAllMovies(httpContextContract: HttpContextContract) {
    await this.movieService.getAllMovies(httpContextContract);
  }

  public async getMovieByName(httpContextContract: HttpContextContract) {
    const movie = httpContextContract.params.name
    await this.movieService.getMovieByName(movie, httpContextContract);
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
