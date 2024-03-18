import {test} from '@japa/runner'
import User from "App/Models/User";
import Role from "App/Enums/Role";

test.group('Create user & create movie', () => {
  test('create user', async () => {

    const alreadyExist = await User.findBy('email', 'email@email.com')

    if(alreadyExist) {
      console.log("User already exist.")
      return
    }

    const user = new User()
    user.email = 'email@email.com'
    user.password = 'secret'
    user.role = Role.ADMIN
    await user.save()
  })

  test('create a movie', async ({ client }) => {
    const user = await User.findBy('email', 'email@email.com')
    const response = await client.post('/movie/NomTest').loginAs(user!)
    console.log(response.body())
  })
})
