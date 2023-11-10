import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from "App/Models/Movie";

export default class MoviesController {

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

  public async createMovie({ request, response } : HttpContextContract) {

  }

  public async removeMovie({ params, response } : HttpContextContract) {
    const movie = await Movie.findBy('name', params.name);
    try {
      if(movie) {
        await movie.delete();
        return response.ok({message: 'Film supprimé avec succès !'});
      } else {
        return response.notFound({ message: 'Aucun film avec ce nom est disponible.' })
      }
    } catch (error) {
      console.log(error.message)
      return response.internalServerError({ message: 'Erreur serveur lors de la suppression du film' })
    }
  }

  public async editMovie({ request, response } : HttpContextContract) {

  }
}
