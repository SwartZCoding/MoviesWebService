import { test } from '@japa/runner'

test.group('Movies E2E Tests', () => {
  test('full lifecycle of a movie', async ({ assert, client }) => {
    // Création
    let response = await client.post('/movies').json({ id: 13, name: 'bardus' })
    const movieId = response.().data.id
    assert.equal(response.status(), 200)

    // Lecture
    response = await client.get(`/movies/${movieId}`)
    assert.equal(response.status(), 200)

    // Mise à jour
    response = await client.put(`/movies/${movieId}`, {/* Nouvelles données du film */})
    assert.equal(response.status(), 200)

    // Suppression
    response = await client.delete(`/movies/${movieId}`)
    assert.equal(response.status(), 200)
  })

  // Vous pouvez ajouter plus de scénarios de test selon les cas d'utilisation spécifiques de votre application
})
