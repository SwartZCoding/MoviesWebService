import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules} from "@adonisjs/validator/build/src/Rules";

export default class EditMovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([rules.maxLength(128)]),
    description: schema.string.optional([rules.maxLength(2048)]),
    note: schema.number.optional([rules.range(1, 5)]),
    releaseDate: schema.date.optional( { format: 'yyyy-MM-dd' } ),
  })

  public messages: CustomMessages = {}
}
