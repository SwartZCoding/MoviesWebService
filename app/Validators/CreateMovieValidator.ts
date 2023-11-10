import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules } from "@adonisjs/validator/build/src/Rules";

export default class CreateMovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */

  public schema = schema.create({
    name: schema.string([rules.maxLength(128)]),
    description: schema.string([rules.maxLength(2048)]),
    note: schema.number([rules.range(1, 5)]),
    releaseDate: schema.date( { format: 'yyyy-MM-dd HH:mm:ss' } ),
  })

  public messages: CustomMessages = {
      'name.required': 'Le nom du film est requis.',
      'name.maxLength': 'Le nom du film ne peut pas dépasser {{ options.maxLength }} caractères.',
      'description.required': 'La description du film est requise.',
      'description.maxLength': 'La description du film ne peut pas dépasser {{ options.maxLength }} caractères.',
      'note.required': 'La note du film est requise.',
      'note.range': 'La note du film doit être comprise entre 1 et 5.',
      'date.required': 'La date de sortie du film est requise.',
      'date.date': 'La date de sortie du film est requise.',
  };
}
