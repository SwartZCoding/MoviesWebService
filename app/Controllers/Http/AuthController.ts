import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {res} from "pino-std-serializers";
import RegisterValidator from "App/Validators/RegisterValidator";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";

export default class AuthController {

  public async register ({ request, response } : HttpContextContract){
    const { email, password} = await request.validate (RegisterValidator);
     await User.create ({
       email: email,
       password: password
     })
    return response.ok({ message: "User created !"});
  }

  public async login ({ request, response, auth } : HttpContextContract){
    const { email, password} = await request.validate (LoginValidator);
    const userExist = User.findBy ("email", email);
    if (!userExist) {
      return response.notFound({ message: "Cette utilisateur n'éxiste pas avec cette email" });
    }
    const token = await auth.use("api").attempt(email, password);
    return response.ok (token)
  }

  public async logout ({ response, auth } : HttpContextContract){
    await auth.use("api").logout();
    return response.ok({ message: "Logout succesfully", revoked: true});
  }
}
