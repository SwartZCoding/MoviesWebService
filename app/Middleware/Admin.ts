import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from "App/Enums/Role";

export default class Admin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {

    const user = auth.user

    if (user) {
      // Vérifiez si l'email de l'utilisateur est vérifié
      if (user.role != Role.ADMIN) {
        return response.unauthorized({ message: "You don't have the permission to do that !" })
      }
    } else {
      return response.unauthorized({ message: "You are not login." })
    }

    await next()
  }
}
