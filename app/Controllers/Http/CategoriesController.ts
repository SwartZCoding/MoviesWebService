import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from "App/Models/Category";
import Movie from "App/Models/Movie";

export default class CategoriesController {

  public async getCategoryMovies({ response, params }: HttpContextContract) {
    const categoryName = params.name
    const category = await Category.findBy('name', categoryName)
    if(category) {
      const movies = await Movie.query().from('movies').where('category_id', category.id)
      return response.ok(movies)
    }
  }
}
