import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SessionsController.create').as('sessions.create')
  Route.post('/sessions', 'SessionsController.store').as('sessions.store')

  Route.get('/gitlab', 'GitlabController.create').as('gitlab.create')
  Route.get('/gitlab/callback', 'GitlabController.store').as('gitlab.store')
})
  .as('auth')
  .namespace('App/Controllers/Http/Auth')

Route.get('/logged', ({ auth }) => {
  return {
    loggedIn: auth.isLoggedIn,
    user: auth.user,
  }
}).middleware('auth')