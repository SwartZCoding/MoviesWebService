import { test } from '@japa/runner'

test.group('MoviesController Integration Tests', () => {
  test('creates a movie with valid data', async ({ assert , client }) => {
    const response = await client.post('/movies', {"name": "chibre" })
    assert.equal(response.status(), 200)
    console.log(response.body())
  })

  test('retrieves a movie by id', async ({ assert }, client ) => {
    const response = await client.get('/movies/{id}')
    assert.equal(response.status(), 200)
    // Assertions supplémentaires
  })
