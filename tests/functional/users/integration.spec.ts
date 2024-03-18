import {test} from '@japa/runner'
import User from "App/Models/User";
import Role from "App/Enums/Role";

test('Create user', async () => {
  const user = new User()
  user.email = 'email@email.com'
  user.password = 'secret'
  user.role = Role.USER
  await user.save()

})
