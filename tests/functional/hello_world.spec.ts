import { test } from '@japa/runner'

test('All movies', async ({ client }) => {
  const response = await client.get('/movie/')

  response.assertStatus(500)
})
