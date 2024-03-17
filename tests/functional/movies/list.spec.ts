import { test } from '@japa/runner'

test.group('Movies list', () => {
  test('get a list of movies', async ({ client }) => {
    const response = await client.get('/movie')
    console.log(response.body())
})
})
