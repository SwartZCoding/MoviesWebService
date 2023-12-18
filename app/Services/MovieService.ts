import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movie from "App/Models/Movie";

export default class MovieService {
  public async createMovie(data: any, { response } : HttpContextContract) {
    try {
      if(data){
        const alreadyExist = await Movie.findBy('name', data.name);
        if(alreadyExist) {
          return response.conflict( { message: 'Un film avec ce nom existe déjà' });
        }
        await Movie.create(data);
        return response.created(data);
      }
    } catch (error) {
      console.error(error.message);
      return response.internalServerError({ message: 'Erreur serveur lors de la création du film' })
    }
  }

  public async removeMovie(movie: Movie, { response } : HttpContextContract) {
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

  public async editMovie(data: any, { response } : HttpContextContract) {
    try {
      if(data) {
        const existMovie = await Movie.findBy('name', data.name);
        if(!existMovie) {
          return response.notFound( { message:  'Aucun film avec ce nom est disponible.'} );
        }
        await existMovie.merge(data).save();
        return response.ok({ message: 'Film modifié avec succès !', existMovie });
      } else {
        return response.badRequest({ message: 'Aucune donnée modifiée.' })
      }
    } catch (error) {
      console.log(error.messages)
      return response.badRequest({ error: error.messages });
    }
  }

  public async getMovieByName(movieName: string, { request, response }: HttpContextContract) {
    const movie = await Movie.findBy('name', movieName);
    // Check for /movie?format=xml, else it's json by default
    const contentType = request.input('format', 'json');

    try {
      if (movie) {
        if (contentType === 'json') {
          return response.ok(movie);
        } else if (contentType === 'xml') {
          const xml = `<movie>${movie.toXML()}</movie>`;
          return response.type('application/xml').send(xml);
        } else {
          return response.status(406).send({ message: "Format non pris en compte (json & xml only)"});
        }
      } else {
        return response.notFound({ message: 'Aucun film avec ce nom est disponible.' });
      }
    } catch (error) {
      console.log(error.message);
      return response.internalServerError({ message: 'Erreur serveur lors de la récupération du film' });
    }
  }

  public async getMoviesByCategory({ request, response }: HttpContextContract) {
    const category = request.input('category');
    const movie = await Movie.query().from('movies').where('category_id', category).select('*');
    // Check for /movie?format=xml, else it's json by default
    const contentType = request.input('format', 'json');

    try {
      let xml: string = '';
      if (movie) {
        if (contentType === 'json') {
          return response.ok(movie);
        } else if (contentType === 'xml') {

          movie.forEach(movie => {
            xml = `<movie>${movie.toXML()}</movie>`;
          })

          return response.type('application/xml').send(xml);
        } else {
          return response.status(406).send({ message: "Format non pris en compte (json & xml only)"});
        }
      } else {
        return response.notFound({ message: 'Aucun film avec ce nom est disponible.' });
      }
    } catch (error) {
      console.log(error.message);
      return response.internalServerError({ message: 'Erreur serveur lors de la récupération du film' });
    }
  }

  public async getAllMovies({ request, response } : HttpContextContract) {
    const page = request.input('page', 1)
    const movies = await Movie.query().paginate(page, 10);
    // Check for /movie?format=xml, else it's json by default
    const contentType = request.input('format', 'json');
    if(contentType === 'json') {
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
    } else if(contentType === 'xml') {
      const xml = `<movies>${movies.map(movie => movie.toXML()).join('')}</movies>`;
      return response.type('application/xml').send(xml);
    } else {
      return response.status(406).send({ message: "Format non pris en compte (json & xml only)"});
    }
  }
}
